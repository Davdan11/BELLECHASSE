import { ADVISORS, NEEDS as BOOKING_NEEDS, VISIT_DURATION_MIN, getSlot, getArea, localToUtc, formatDateFr } from './booking';

/**
 * Envoi des demandes vers Pipedrive — même compte et même pipeline que
 * thermopompesavendre.ca. Chaque affaire porte le champ « Site web » =
 * bellechasseenergie.com et le préfixe de titre [BE] pour distinguer les
 * deux sites sur le tableau.
 *
 * Variables d'environnement :
 *  - PIPEDRIVE_API_TOKEN   : jeton personnel (Pipedrive → Paramètres → Personnel → API).
 *  - PIPEDRIVE_PIPELINE_ID : pipeline des ventes (défaut 3, « 1. VENTES (Acquisition) »).
 *  - PIPEDRIVE_OWNER_ID    : facultatif, propriétaire des personnes et affaires.
 *
 * Ce que ça crée :
 *  - une Personne (retrouvée par courriel puis téléphone si elle existe déjà),
 *  - une Affaire « [BE] Nom - Besoin » dans la première étape du pipeline,
 *  - une Note avec tous les détails,
 *  - pour un rendez-vous : une Activité de type réunion à la date et l'heure choisies.
 */

// PIPEDRIVE_API_BASE ne sert qu'aux tests (serveur factice).
const API = process.env.PIPEDRIVE_API_BASE || 'https://api.pipedrive.com/v1';
const CONTACT_NEEDS = { installation: 'Installation', entretien: 'Entretien', question: 'Une question' };

/** Clés des champs personnalisés de l'affaire (identiques dans les deux sites). */
export const FIELDS = {
  SITE: '8f8731ca2d5f38191c457538fb31051581a8af58',
  SOURCE: '2b1f6469368a060fc7d77e8a5d8555b27c8371b6',
  TYPE_PROJET: '314be84f2d8c0f3b264ec3cff8740f80fef6f60a',
  REGION: '880eda1c5ddba59c5bc2258f9d898be1762405a4',
};

/** Options des listes déroulantes (relevées par l'API le 2026-09-09). */
export const OPTIONS = {
  SITE: { 'bellechasseenergie.com': 253, 'thermopompesavendre.ca': 252 },
  SOURCE: { 'Meta Ads': 55, 'Google Ads': 56, SEO: 57, Direct: 58, 'Référence': 59 },
  TYPE_PROJET: { 'Murale 1 tête': 60, 'Multizone 2+ têtes': 61, Centrale: 62, "Échangeur d'air": 63 },
  REGION: { 'Montréal': 68, Laval: 69, 'Rive-Nord': 70, 'Rive-Sud': 71, Estrie: 72, 'Montérégie': 73, Laurentides: 74, 'Lanaudière': 75, Autre: 76 },
};

export const THIS_SITE = { option: OPTIONS.SITE['bellechasseenergie.com'], prefix: '[BE]' };

export function pipedriveEnabled() {
  return Boolean(process.env.PIPEDRIVE_API_TOKEN);
}

function pipelineId() {
  const n = parseInt(process.env.PIPEDRIVE_PIPELINE_ID ?? '', 10);
  return Number.isFinite(n) && n > 0 ? n : 3;
}

function ownerId() {
  return process.env.PIPEDRIVE_OWNER_ID ? Number(process.env.PIPEDRIVE_OWNER_ID) : undefined;
}

function fold(s) {
  return String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

/** Région Pipedrive à partir du nom de ville saisi (Grand Montréal). */
export function regionOptionId(city) {
  const c = fold(city);
  if (!c) return undefined;
  const R = OPTIONS.REGION;
  if (/^montreal|^mtl|anjou|lasalle|verdun|lachine|pointe-claire|dorval|kirkland|beaconsfield|dollard|pierrefonds|saint-laurent|saint-leonard|montreal-nord|ahuntsic|rosemont|hochelaga|plateau|outremont|westmount|mont-royal|cote-saint-luc|hampstead|ile-bizard|sainte-anne-de-bellevue|baie-d'urfe|senneville|montreal-est|montreal-ouest/.test(c)) return R['Montréal'];
  if (/laval|chomedey|sainte-rose|vimont|duvernay|fabreville|sainte-dorothee|auteuil/.test(c)) return R['Laval'];
  if (/longueuil|brossard|boucherville|saint-lambert|saint-hubert|greenfield|chateauguay|candiac|la prairie|delson|sainte-catherine|saint-constant|varennes|sainte-julie|beloeil|mcmasterville|saint-bruno|chambly|carignan|saint-basile|mont-saint-hilaire|otterburn|vaudreuil|ile-perrot|pincourt|saint-lazare|hudson|rigaud|salaberry|valleyfield|mercier|beauharnois|saint-jean-sur-richelieu|marieville|richelieu/.test(c)) return R['Rive-Sud'];
  if (/terrebonne|mascouche|blainville|boisbriand|saint-eustache|rosemere|sainte-therese|mirabel|deux-montagnes|sainte-marthe|lorraine|bois-des-filion|saint-jerome|prevost|saint-sauveur|sainte-adele|sainte-agathe|mont-tremblant|saint-colomban|saint-lin|oka|pointe-calumet|sainte-anne-des-plaines/.test(c)) return R['Rive-Nord'];
  if (/repentigny|lachenaie|l'assomption|lavaltrie|joliette|saint-charles-borromee|rawdon|saint-roch|l'epiphanie|charlemagne|berthierville/.test(c)) return R['Lanaudière'];
  if (/sherbrooke|magog|granby|bromont|cowansville|coaticook|lac-megantic|orford|waterloo|sutton/.test(c)) return R['Estrie'];
  return R['Autre'];
}

async function call(method, path, body) {
  const token = process.env.PIPEDRIVE_API_TOKEN;
  const res = await fetch(`${API}${path}`, {
    method,
    // Jeton en en-tête : jamais dans l'URL (journaux de proxy, historiques).
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'x-api-token': token },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
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
  if (phone) {
    const found = await call('GET', `/persons/search?term=${encodeURIComponent(phone)}&fields=phone&limit=1`);
    const hit = found?.items?.[0]?.item;
    if (hit?.id) return hit.id;
  }
  const person = await call('POST', '/persons', {
    name,
    email: email ? [{ value: email, primary: true, label: 'work' }] : undefined,
    phone: phone ? [{ value: phone, primary: true, label: 'mobile' }] : undefined,
    owner_id: ownerId(),
    visible_to: 3,
  });
  return person.id;
}

/** Affaire dans la première étape du pipeline des ventes ; les champs vides ne sont pas envoyés. */
async function createDeal({ title, personId, customFields }) {
  const fields = Object.fromEntries(
    Object.entries({ [FIELDS.SITE]: THIS_SITE.option, ...(customFields ?? {}) }).filter(([, v]) => v !== undefined && v !== ''),
  );
  const deal = await call('POST', '/deals', {
    title: `${THIS_SITE.prefix} ${title}`,
    person_id: personId,
    pipeline_id: pipelineId(),
    user_id: ownerId(),
    visible_to: 3,
    ...fields,
  });
  return deal.id;
}

function lines(rows) {
  return rows.filter(([, v]) => v).map(([k, v]) => `<b>${k}</b> : ${String(v).replace(/</g, '&lt;')}`).join('<br>');
}

/** Demande de contact (formulaire « Soumission »). */
export async function pushContactToPipedrive(lead) {
  const personId = await findOrCreatePerson(lead);
  const dealId = await createDeal({
    title: `${lead.name} - ${CONTACT_NEEDS[lead.need] || lead.need}`,
    personId,
    customFields: { [FIELDS.REGION]: regionOptionId(lead.city) },
  });
  await call('POST', '/notes', {
    deal_id: dealId,
    content: lines([
      ['Besoin', CONTACT_NEEDS[lead.need] || lead.need],
      ['Ville', lead.city],
      ['Téléphone', lead.phone],
      ['Courriel', lead.email],
      ['Projet', lead.message || '(aucun détail)'],
      ["Page d'origine", `${lead.source}${lead.page ? ` — ${lead.page}` : ''}`],
      ['Reçu le', lead.receivedAt],
      ['Référence journal', lead.journalId],
    ]),
  });
  return { personId, dealId };
}

/** Rendez-vous réservé en ligne : affaire + activité « réunion » au bon moment. */
export async function pushBookingToPipedrive(booking) {
  const slot = getSlot(booking.slot);
  const area = getArea(booking.area);
  const advisor = ADVISORS.find((a) => a.id === booking.advisorId);
  const when = `${formatDateFr(booking.date)}, ${slot ? slot.label : booking.slot}`;
  const cityLabel = booking.city === 'Autre' ? area?.label : booking.city;
  const address = `${booking.address}${booking.postalCode ? `, ${booking.postalCode}` : ''}, ${cityLabel}`;

  const personId = await findOrCreatePerson(booking);
  const dealId = await createDeal({
    title: `${booking.name} - Rendez-vous ${when}`,
    personId,
    customFields: { [FIELDS.REGION]: regionOptionId(cityLabel) },
  });

  await call('POST', '/notes', {
    deal_id: dealId,
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
      ["Page d'origine", booking.page || booking.referer],
    ]),
  });

  if (slot) {
    const startUtc = localToUtc(booking.date, slot.start);
    const dueDate = startUtc.toISOString().slice(0, 10);
    const dueTime = startUtc.toISOString().slice(11, 16); // Pipedrive attend l'heure en UTC
    const h = String(Math.floor(VISIT_DURATION_MIN / 60)).padStart(2, '0');
    const m = String(VISIT_DURATION_MIN % 60).padStart(2, '0');
    await call('POST', '/activities', {
      subject: `Visite — ${booking.name} (${cityLabel}) — ${slot.label}`,
      type: 'meeting',
      due_date: dueDate,
      due_time: dueTime,
      duration: `${h}:${m}`,
      person_id: personId,
      deal_id: dealId,
      user_id: ownerId(),
      location: address,
      note: `Référence ${booking.id}. Plage ${slot.label}. Conseiller : ${advisor ? advisor.name : booking.advisorId}.`,
    });
  }

  return { personId, dealId };
}
