import { randomBytes } from 'crypto';
import {
  ADVISORS, NEEDS, SLOTS, VISIT_DURATION_MIN, TIMEZONE,
  getArea, getSlot, isYmd, isWithinHorizon, isTooSoon, isClosedDay,
  assignAdvisor, localToUtc, formatDateFr,
} from '../../../lib/booking';
import { listBookings, appendBooking, withLock } from '../../../lib/bookingStore';
import { SITE_NAME, PHONE_DISPLAY } from '../../../lib/site';
import { pipedriveEnabled, pushBookingToPipedrive } from '../../../lib/pipedrive';

function clean(value, max = 500) {
  return String(value ?? '').trim().slice(0, max);
}

function makeId() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = randomBytes(6);
  let out = '';
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return `RV-${out}`;
}

function icsStamp(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function buildIcs(booking, slot) {
  const start = localToUtc(booking.date, slot.start);
  const end = new Date(start.getTime() + VISIT_DURATION_MIN * 60000);
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bellechasse Energie//Rendez-vous//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${booking.id}@bellechasseenergie.ca`,
    `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(start)}`,
    `DTEND:${icsStamp(end)}`,
    `SUMMARY:Visite d'un conseiller ${SITE_NAME}`,
    `DESCRIPTION:Plage prévue : ${slot.label}. Référence ${booking.id}. Pour modifier : ${PHONE_DISPLAY}`,
    `LOCATION:${booking.address}\\, ${booking.city}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.join('\r\n');
}

async function sendEmails(booking, slot, area) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RENDEZVOUS_TO_EMAIL || process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || 'Bellechasse Énergie <site@bellechasseenergie.ca>';
  if (!apiKey || !to) {
    console.log('[rendez-vous] réservation reçue', JSON.stringify(booking));
    return { emailed: false };
  }

  const advisor = ADVISORS.find((a) => a.id === booking.advisorId);
  const when = `${formatDateFr(booking.date)}, ${slot.label}`;
  const send = (payload) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, ...payload }),
    });

  const teamText = [
    `Nouveau rendez-vous : ${when}`,
    `Référence : ${booking.id}`,
    `Conseiller : ${advisor ? advisor.name : booking.advisorId}`,
    `Secteur : ${area.label} — ${booking.city}`,
    `Adresse : ${booking.address}${booking.postalCode ? `, ${booking.postalCode}` : ''}`,
    '',
    `Besoin : ${NEEDS[booking.need]}`,
    `Nom : ${booking.name}`,
    `Téléphone : ${booking.phone}`,
    `Courriel : ${booking.email}`,
    '',
    'Notes :',
    booking.notes || '(aucune)',
    '',
    `Reçu le : ${booking.createdAt}`,
    `Page : ${booking.page || booking.referer}`,
  ].join('\n');

  const clientText = [
    `Bonjour ${booking.name},`,
    '',
    `Votre rendez-vous avec un conseiller ${SITE_NAME} est confirmé.`,
    '',
    `Quand : ${when}`,
    `Où : ${booking.address}, ${booking.city}`,
    `Référence : ${booking.id}`,
    '',
    `Le conseiller se présente à l'intérieur de cette plage. La visite dure environ ${VISIT_DURATION_MIN} minutes : il mesure la maison, évalue vos besoins et vous remet une soumission gratuite, sans engagement.`,
    '',
    `Pour modifier ou annuler, appelez-nous au ${PHONE_DISPLAY} en mentionnant votre référence.`,
    '',
    `À bientôt,`,
    `L'équipe ${SITE_NAME}`,
  ].join('\n');

  const [teamRes, clientRes] = await Promise.all([
    send({
      to: to.split(',').map((s) => s.trim()),
      reply_to: booking.email,
      subject: `Rendez-vous ${booking.id} — ${booking.name}, ${booking.city}, ${when}`,
      text: teamText,
    }),
    send({
      to: [booking.email],
      subject: `Votre rendez-vous ${SITE_NAME} — ${when}`,
      text: clientText,
      attachments: [
        { filename: `rendez-vous-${booking.id}.ics`, content: Buffer.from(buildIcs(booking, slot)).toString('base64') },
      ],
    }),
  ]);

  if (!teamRes.ok) console.error('[rendez-vous] courriel équipe échoué', teamRes.status, await teamRes.text());
  if (!clientRes.ok) console.error('[rendez-vous] courriel client échoué', clientRes.status, await clientRes.text());
  return { emailed: clientRes.ok };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Pot de miel : un vrai visiteur ne voit jamais ce champ.
  if (clean(body.website)) {
    return Response.json({ ok: true, id: makeId(), emailed: false });
  }

  const area = getArea(clean(body.area, 40));
  const slot = getSlot(clean(body.slot, 10));
  const date = clean(body.date, 10);
  const draft = {
    area: area ? area.slug : '',
    city: clean(body.city, 80),
    date,
    slot: slot ? slot.id : '',
    need: NEEDS[body.need] ? body.need : '',
    name: clean(body.name, 120),
    phone: clean(body.phone, 30),
    email: clean(body.email, 160),
    address: clean(body.address, 200),
    postalCode: clean(body.postalCode, 12).toUpperCase(),
    notes: clean(body.notes, 2000),
    consent: body.consent === true,
    source: clean(body.source, 80) || 'rendez-vous',
    page: clean(body.page, 200),
  };

  if (!area || !slot || !isYmd(date) || !draft.need) {
    return Response.json({ ok: false, error: 'invalid_slot' }, { status: 422 });
  }
  const cityOk = draft.city === 'Autre' || area.sectors.includes(draft.city) || (area.slug === 'montreal' && draft.city === 'Montréal');
  if (!cityOk) {
    return Response.json({ ok: false, error: 'invalid_city' }, { status: 422 });
  }
  if (!draft.name || !draft.phone || !draft.email || !draft.address || !draft.consent) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(draft.email)) {
    return Response.json({ ok: false, error: 'invalid_email' }, { status: 422 });
  }
  if (!/^[\d\s()+.-]{10,}$/.test(draft.phone)) {
    return Response.json({ ok: false, error: 'invalid_phone' }, { status: 422 });
  }
  if (!isWithinHorizon(date) || isClosedDay(date) || isTooSoon(date, slot.id)) {
    return Response.json({ ok: false, error: 'slot_unavailable' }, { status: 409 });
  }

  let booking;
  try {
    booking = await withLock(async () => {
      const bookings = await listBookings();
      // Un même client ne peut pas réserver deux fois la même plage.
      const duplicate = bookings.find(
        (b) => b.status !== 'cancelled' && b.date === date && b.slot === slot.id && b.email.toLowerCase() === draft.email.toLowerCase()
      );
      if (duplicate) return duplicate;

      const advisor = assignAdvisor(area.slug, date, slot.id, bookings);
      if (!advisor) return null;

      const record = {
        id: makeId(),
        status: 'confirmed',
        ...draft,
        advisorId: advisor.id,
        timezone: TIMEZONE,
        createdAt: new Date().toISOString(),
        userAgent: request.headers.get('user-agent') || '',
        referer: request.headers.get('referer') || '',
      };
      await appendBooking(record);
      return record;
    });
  } catch (err) {
    console.error('[rendez-vous] enregistrement impossible', err);
    return Response.json({ ok: false, error: 'storage_failed' }, { status: 503 });
  }

  if (!booking) {
    return Response.json({ ok: false, error: 'slot_taken' }, { status: 409 });
  }

  // CRM et courriels en parallèle ; un échec CRM n'annule jamais la réservation.
  const [crmResult, { emailed }] = await Promise.all([
    pipedriveEnabled()
      ? pushBookingToPipedrive(booking).then(() => true).catch((err) => { console.error('[rendez-vous] Pipedrive', err.message); return false; })
      : Promise.resolve(false),
    sendEmails(booking, slot, area),
  ]);

  return Response.json({
    ok: true,
    id: booking.id,
    emailed,
    crm: crmResult,
    date: booking.date,
    dateLabel: formatDateFr(booking.date),
    slot: SLOTS.find((s) => s.id === booking.slot)?.label,
    start: localToUtc(booking.date, slot.start).toISOString(),
    end: localToUtc(booking.date, slot.end).toISOString(),
  });
}
