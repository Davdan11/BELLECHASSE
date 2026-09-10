import { ADVISORS, NEEDS as BOOKING_NEEDS, VISIT_DURATION_MIN, getSlot, getArea, localToUtc, formatDateFr } from './booking';

/**
 * Envoi des demandes vers Pipedrive.
 *
 * Variables d'environnement :
 *  - PIPEDRIVE_API_TOKEN : jeton personnel (Pipedrive → Paramètres → Personnel → API).
 *  - PIPEDRIVE_OWNER_ID  : facultatif, identifiant de l'utilisateur propriétaire des prospects.
 *  - PIPEDRIVE_LEAD_LABEL_ID : facultatif, identifiant d'une étiquette de prospect (ex. « Site web »).
 *
 * Ce que ça crée :
 *  - une Personne (retrouvée par courriel si elle existe déjà),
 *  - un Prospect (lead) « Rendez-vous — … » ou « Demande — … »,
 *  - une Note avec tous les détails,
 *  - pour un rendez-vous : une Activité de type réunion à la date et l'heure choisies.
 */

// PIPEDRIVE_API_BASE ne sert qu'aux tests (serveur factice).
const API = process.env.PIPEDRIVE_API_BASE || 'https://api.pipedrive.com/v1';
const CONTACT_NEEDS = { installation: 'Installation', entretien: 'Entretien', question: 'Une question' };

export function pipedriveEnabled() {
  return Boolean(process.env.PIPEDRIVE_API_TOKEN);
}

async function call(method, path, body) {
  const token = process.env.PIPEDRIVE_API_TOKEN;
  const sep = path.includes('?') ? '&' : '?';
  const res = await fetch(`${API}${path}${sep}api_token=${encodeURIComponent(token)}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    throw new Error(`Pipedrive ${method} ${path} → ${res.status} ${data.error || ''} ${data.error_info || ''}`.trim());
  }
  return data.data;
}

async function findOrCreatePerson({ name, email, phone }) {
  if (email) {
    const found = await call('GET', `/persons/search?term=${encodeURIComponent(email)}&fields=email&exact_match=true&limit=1`);
    const hit = found?.items?.[0]?.item;
    if (hit?.id) return hit.id;
  }
  const owner = process.env.PIPEDRIVE_OWNER_ID ? Number(process.env.PIPEDRIVE_OWNER_ID) : undefined;
  const person = await call('POST', '/persons', {
    name,
    email: email ? [{ value: email, primary: true, label: 'work' }] : undefined,
    phone: phone ? [{ value: phone, primary: true, label: 'mobile' }] : undefined,
    owner_id: owner,
    visible_to: 3,
  });
  return person.id;
}

async function createLead({ title, personId }) {
  const owner = process.env.PIPEDRIVE_OWNER_ID ? Number(process.env.PIPEDRIVE_OWNER_ID) : undefined;
  const label = process.env.PIPEDRIVE_LEAD_LABEL_ID;
  const lead = await call('POST', '/leads', {
    title,
    person_id: personId,
    owner_id: owner,
    label_ids: label ? [label] : undefined,
    visible_to: 3,
  });
  return lead.id;
}

function lines(rows) {
  return rows.filter(([, v]) => v).map(([k, v]) => `<b>${k}</b> : ${String(v).replace(/</g, '&lt;')}`).join('<br>');
}

/** Demande de contact (formulaire « Soumission »). */
export async function pushContactToPipedrive(lead) {
  const personId = await findOrCreatePerson(lead);
  const leadId = await createLead({ title: `Demande — ${lead.name}, ${lead.city} (${CONTACT_NEEDS[lead.need] || lead.need})`, personId });
  await call('POST', '/notes', {
    lead_id: leadId,
    content: lines([
      ['Besoin', CONTACT_NEEDS[lead.need] || lead.need],
      ['Ville', lead.city],
      ['Téléphone', lead.phone],
      ['Courriel', lead.email],
      ['Projet', lead.message || '(aucun détail)'],
      ['Source', `${lead.source}${lead.page ? ` — ${lead.page}` : ''}`],
      ['Reçu le', lead.receivedAt],
    ]),
  });
  return { personId, leadId };
}

/** Rendez-vous réservé en ligne : prospect + activité « réunion » au bon moment. */
export async function pushBookingToPipedrive(booking) {
  const slot = getSlot(booking.slot);
  const area = getArea(booking.area);
  const advisor = ADVISORS.find((a) => a.id === booking.advisorId);
  const when = `${formatDateFr(booking.date)}, ${slot ? slot.label : booking.slot}`;
  const address = `${booking.address}${booking.postalCode ? `, ${booking.postalCode}` : ''}, ${booking.city === 'Autre' ? area?.label : booking.city}`;

  const personId = await findOrCreatePerson(booking);
  const leadId = await createLead({ title: `Rendez-vous — ${booking.name}, ${booking.city} — ${when}`, personId });

  await call('POST', '/notes', {
    lead_id: leadId,
    content: lines([
      ['Référence', booking.id],
      ['Quand', when],
      ['Conseiller', advisor ? advisor.name : booking.advisorId],
      ['Secteur', `${area?.label || booking.area} — ${booking.city}`],
      ['Adresse', address],
      ['Besoin', BOOKING_NEEDS[booking.need] || booking.need],
      ['Téléphone', booking.phone],
      ['Courriel', booking.email],
      ['Notes du client', booking.notes || '(aucune)'],
      ['Page', booking.page || booking.referer],
    ]),
  });

  if (slot) {
    const startUtc = localToUtc(booking.date, slot.start);
    const dueDate = startUtc.toISOString().slice(0, 10);
    const dueTime = startUtc.toISOString().slice(11, 16); // Pipedrive attend l'heure en UTC
    const h = String(Math.floor(VISIT_DURATION_MIN / 60)).padStart(2, '0');
    const m = String(VISIT_DURATION_MIN % 60).padStart(2, '0');
    const owner = process.env.PIPEDRIVE_OWNER_ID ? Number(process.env.PIPEDRIVE_OWNER_ID) : undefined;
    await call('POST', '/activities', {
      subject: `Visite — ${booking.name} (${booking.city}) — ${slot.label}`,
      type: 'meeting',
      due_date: dueDate,
      due_time: dueTime,
      duration: `${h}:${m}`,
      person_id: personId,
      lead_id: leadId,
      user_id: owner,
      location: address,
      note: `Référence ${booking.id}. Plage ${slot.label}. Conseiller : ${advisor ? advisor.name : booking.advisorId}.`,
    });
  }

  return { personId, leadId };
}
