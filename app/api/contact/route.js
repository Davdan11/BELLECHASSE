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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || 'Bellechasse Énergie <site@bellechasseenergie.com>';

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
      `Page : ${lead.referer}`,
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
  } else {
    // No email provider configured yet: keep the lead in the server logs.
    console.log('[contact] lead received', JSON.stringify(lead));
  }

  return Response.json({ ok: true });
}
