import { pipedriveEnabled, pushContactToPipedrive } from '../../../lib/pipedrive';
const NEEDS = { installation: 'Installation', entretien: 'Entretien', question: 'Une question' };

function clean(value, max = 500) {
  return String(value ?? '').trim().slice(0, max);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Honeypot: real visitors never see this field.
  if (clean(body.website)) {
    return Response.json({ ok: true });
  }

  const lead = {
    need: NEEDS[body.need] ? body.need : 'question',
    name: clean(body.name, 120),
    phone: clean(body.phone, 30),
    email: clean(body.email, 160),
    city: clean(body.city, 80),
    message: clean(body.message, 2000),
    consent: body.consent === true,
    source: clean(body.source, 80) || 'contact',
    page: clean(body.page, 200),
    receivedAt: new Date().toISOString(),
    userAgent: request.headers.get('user-agent') || '',
    referer: request.headers.get('referer') || '',
  };

  if (!lead.name || !lead.email || !lead.phone || !lead.city || !lead.consent) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) {
    return Response.json({ ok: false, error: 'invalid_email' }, { status: 422 });
  }

  // CRM : la demande est poussée dans Pipedrive si le jeton est configuré.
  let crm = false;
  if (pipedriveEnabled()) {
    try {
      await pushContactToPipedrive(lead);
      crm = true;
    } catch (err) {
      console.error('[contact] Pipedrive', err.message);
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || 'Bellechasse Énergie <site@bellechasseenergie.ca>';

  if (apiKey && to) {
    const subject = `Nouvelle demande (${NEEDS[lead.need]}) — ${lead.name}, ${lead.city}`;
    const text = [
      `Besoin : ${NEEDS[lead.need]}`,
      `Nom : ${lead.name}`,
      `Téléphone : ${lead.phone}`,
      `Courriel : ${lead.email}`,
      `Ville : ${lead.city}`,
      '',
      'Projet :',
      lead.message || '(aucun détail)',
      '',
      `Reçu le : ${lead.receivedAt}`,
      `Source : ${lead.source}`,
      `Page : ${lead.page || lead.referer}`,
    ].join('\n');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: to.split(',').map((s) => s.trim()), reply_to: lead.email, subject, text }),
    });

    if (!res.ok) {
      console.error('[contact] email send failed', res.status, await res.text());
      return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
    }
  } else if (!crm) {
    // Ni CRM ni courriel configurés : on garde la demande dans les journaux du serveur.
    console.log('[contact] lead received', JSON.stringify(lead));
  }

  return Response.json({ ok: true, crm });
}
