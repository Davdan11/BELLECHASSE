/* ==================================================================
   POST /api/contact — formulaire de demande (installation, entretien, question)

   Ordre volontaire, pour ne jamais perdre un lead :
   1. validation, pot de miel
   2. journal local (data/leads/AAAA-MM.jsonl) — avant tout appel externe
   3. Pipedrive : personne → affaire [BE] → note (non bloquant)
   4. courriel interne par Resend (non bloquant)
   5. succès si au moins une trace existe (journal, affaire ou courriel)
   ================================================================== */

import { captureLead, FIELDS, regionOptionId } from '../../../lib/pipedrive';
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
    referer: request.headers.get('referer') || '',
  };

  if (!lead.name || !lead.email || !lead.phone || !lead.city || !lead.consent) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) {
    return Response.json({ ok: false, error: 'invalid_email' }, { status: 422 });
  }

  // 2. Journal local d'abord.
  const { entry, written } = await journalLead('contact', lead);

  // 3. Pipedrive, non bloquant.
  const needLabel = NEEDS[lead.need];
  const crm = await captureLead({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    title: `${lead.name} - ${needLabel}`,
    customFields: { [FIELDS.REGION]: regionOptionId(lead.city) },
    noteLines: [
      ['Besoin', needLabel],
      ['Ville', lead.city],
      ['Projet', lead.message || '(aucun détail)'],
      ["Page d'origine", lead.page || lead.referer || lead.source],
      ['Consentement', `oui, ${lead.receivedAt}`],
      ['Référence journal', entry.id],
    ],
  });
  const dealId = crm.ok ? crm.dealId : undefined;

  // 4. Courriel interne, non bloquant.
  const emailSent = await sendInternalEmail(lead, needLabel, crm, entry.id);

  await journalOutcome(entry, {
    pipedrive: crm.ok ? 'ok' : crm.reason,
    dealId,
    error: crm.ok ? undefined : crm.error,
    alertEmail: emailSent,
  });

  // 5. Le lead est reçu dès qu'une trace existe quelque part.
  if (!written && !crm.ok && !emailSent) {
    console.error('[contact] AUCUNE trace conservée pour', entry.id, { crm });
    return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }
  if (!crm.ok) console.warn(`[contact] ${entry.id} reçu sans CRM (${crm.reason}) — voir data/leads.`);

  return Response.json({ ok: true });
}

async function sendInternalEmail(lead, needLabel, crm, journalId) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || 'Bellechasse Énergie <site@bellechasseenergie.com>';
  if (!apiKey || !to) {
    console.log('[contact] courriel non configuré (RESEND_API_KEY / CONTACT_TO_EMAIL) — lead', journalId);
    return false;
  }

  const crmWarning = crm.ok ? '' : '[CRM À SAISIR] ';
  const subject = `${crmWarning}Nouvelle demande (${needLabel}) — ${lead.name}, ${lead.city}`;
  const text = [
    crm.ok ? `Pipedrive : affaire ${crm.dealId}` : `PIPEDRIVE NON SYNCHRONISÉ (${crm.reason}) : à saisir à la main. Référence journal : ${journalId}`,
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
      console.error('[contact] email send failed', res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error('[contact] email send failed', e);
    return false;
  }
}
