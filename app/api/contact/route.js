/* ==================================================================
   POST /api/contact — formulaire de demande (installation, entretien, question)

   Ordre volontaire, pour ne jamais perdre un lead :
   1. validation, pot de miel
   2. journal local (data/leads/AAAA-MM.jsonl) — avant tout appel externe
   3. Pipedrive : personne → affaire [BE] → note (non bloquant)
   4. courriel interne par Resend (non bloquant)
   5. succès si au moins une trace existe (journal, affaire ou courriel)
   ================================================================== */

import { pipedriveEnabled, pushContactToPipedrive } from '../../../lib/pipedrive';
import { journalLead, journalOutcome } from '../../../lib/lead-journal';

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

  // Pot de miel : un vrai visiteur ne voit jamais ce champ.
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
    referer: request.headers.get('referer') || '',
  };

  if (!lead.name || !lead.email || !lead.phone || !lead.city || !lead.consent) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) {
    return Response.json({ ok: false, error: 'invalid_email' }, { status: 422 });
  }

  // 2. Journal local d'abord : même si tout le reste tombe, la demande existe.
  const { entry, written } = await journalLead('contact', lead);
  lead.journalId = entry.id;

  // 3. Pipedrive, non bloquant.
  let crm = { ok: false, reason: 'non-configure' };
  if (pipedriveEnabled()) {
    try {
      const { dealId } = await pushContactToPipedrive(lead);
      crm = { ok: true, dealId };
    } catch (err) {
      console.error('[contact] Pipedrive', err.message);
      crm = { ok: false, reason: 'erreur', error: err.message };
    }
  }

  // 4. Courriel interne, non bloquant.
  const emailed = await sendInternalEmail(lead, crm);

  await journalOutcome(entry, {
    pipedrive: crm.ok ? 'ok' : crm.reason,
    dealId: crm.dealId,
    error: crm.error,
    alertEmail: emailed,
  });

  // 5. La demande est reçue dès qu'une trace existe quelque part.
  if (!written && !crm.ok && !emailed) {
    console.error('[contact] AUCUNE trace conservée pour', entry.id, crm);
    return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }
  if (!crm.ok) console.warn(`[contact] ${entry.id} reçu sans CRM (${crm.reason}) — voir data/leads.`);

  return Response.json({ ok: true, crm: crm.ok });
}

async function sendInternalEmail(lead, crm) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || 'Bellechasse Énergie <site@bellechasseenergie.ca>';
  if (!apiKey || !to) {
    console.log('[contact] courriel non configuré (RESEND_API_KEY / CONTACT_TO_EMAIL) — demande', lead.journalId);
    return false;
  }

  const needLabel = NEEDS[lead.need];
  const subject = `${crm.ok ? '' : '[CRM À SAISIR] '}Nouvelle demande (${needLabel}) — ${lead.name}, ${lead.city}`;
  const text = [
    crm.ok ? `Pipedrive : affaire ${crm.dealId}` : `PIPEDRIVE NON SYNCHRONISÉ (${crm.reason}) : à saisir à la main. Référence journal : ${lead.journalId}`,
    '',
    `Besoin : ${needLabel}`,
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

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: to.split(',').map((s) => s.trim()), reply_to: lead.email, subject, text }),
    });
    if (!res.ok) {
      console.error('[contact] courriel échoué', res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error('[contact] courriel échoué', e);
    return false;
  }
}
