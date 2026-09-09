/* ==================================================================
   Pipedrive — même compte et même pipeline que thermopompesavendre.ca.
   L'affaire porte le champ « Site web » = bellechasseenergie.com et le
   préfixe de titre [BE] pour distinguer les deux sites sur le tableau.

   Variables : PIPEDRIVE_API_TOKEN (obligatoire pour synchroniser),
   PIPEDRIVE_PIPELINE_ID (défaut 3, « 1. VENTES (Acquisition) »).
   Sans jeton, captureLead() renvoie { ok: false, reason: "non-configure" }
   et l'appelant continue : le lead reste dans le journal local.
   ================================================================== */

const API_BASE = "https://api.pipedrive.com/v1";

/** Clés des champs personnalisés de l'affaire (identiques dans les deux sites). */
export const FIELDS = {
  SITE: "8f8731ca2d5f38191c457538fb31051581a8af58",
  SOURCE: "2b1f6469368a060fc7d77e8a5d8555b27c8371b6",
  TYPE_PROJET: "314be84f2d8c0f3b264ec3cff8740f80fef6f60a",
  REGION: "880eda1c5ddba59c5bc2258f9d898be1762405a4",
};

/** Options des listes déroulantes (relevées par l'API le 2026-09-09). */
export const OPTIONS = {
  SITE: { "bellechasseenergie.com": 253, "thermopompesavendre.ca": 252 },
  SOURCE: { "Meta Ads": 55, "Google Ads": 56, SEO: 57, Direct: 58, "Référence": 59 },
  TYPE_PROJET: { "Murale 1 tête": 60, "Multizone 2+ têtes": 61, Centrale: 62, "Échangeur d'air": 63 },
  REGION: { "Montréal": 68, Laval: 69, "Rive-Nord": 70, "Rive-Sud": 71, Estrie: 72, "Montérégie": 73, Laurentides: 74, "Lanaudière": 75, Autre: 76 },
};

export const THIS_SITE = { option: OPTIONS.SITE["bellechasseenergie.com"], prefix: "[BE]" };

function token() {
  return process.env.PIPEDRIVE_API_TOKEN || undefined;
}

export function isPipedriveConfigured() {
  return Boolean(token());
}

function pipelineId() {
  const n = parseInt(process.env.PIPEDRIVE_PIPELINE_ID ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : 3;
}

function fold(s) {
  return String(s ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

/** Région Pipedrive à partir du nom de ville saisi (Grand Montréal). */
export function regionOptionId(city) {
  const c = fold(city);
  if (!c) return undefined;
  const R = OPTIONS.REGION;
  if (/^montreal|^mtl|anjou|lasalle|verdun|lachine|pointe-claire|dorval|kirkland|beaconsfield|dollard|pierrefonds|saint-laurent|saint-leonard|montreal-nord|ahuntsic|rosemont|hochelaga|plateau|outremont|westmount|mont-royal|cote-saint-luc|hampstead|ile-bizard|sainte-anne-de-bellevue|baie-d'urfe|senneville|montreal-est|montreal-ouest/.test(c)) return R["Montréal"];
  if (/laval|chomedey|sainte-rose|vimont|duvernay|fabreville|sainte-dorothee|auteuil/.test(c)) return R["Laval"];
  if (/longueuil|brossard|boucherville|saint-lambert|saint-hubert|greenfield|chateauguay|candiac|la prairie|delson|sainte-catherine|saint-constant|varennes|sainte-julie|beloeil|mcmasterville|saint-bruno|chambly|carignan|saint-basile|mont-saint-hilaire|otterburn|vaudreuil|ile-perrot|pincourt|saint-lazare|hudson|rigaud|salaberry|valleyfield|mercier|beauharnois|saint-jean-sur-richelieu|marieville|richelieu/.test(c)) return R["Rive-Sud"];
  if (/terrebonne|mascouche|blainville|boisbriand|saint-eustache|rosemere|sainte-therese|mirabel|deux-montagnes|sainte-marthe|lorraine|bois-des-filion|saint-jerome|prevost|saint-sauveur|sainte-adele|sainte-agathe|mont-tremblant|saint-colomban|saint-lin|oka|pointe-calumet|sainte-anne-des-plaines/.test(c)) return R["Rive-Nord"];
  if (/repentigny|lachenaie|l'assomption|lavaltrie|joliette|saint-charles-borromee|rawdon|saint-roch|l'epiphanie|charlemagne|berthierville/.test(c)) return R["Lanaudière"];
  if (/sherbrooke|magog|granby|bromont|cowansville|coaticook|lac-megantic|orford|waterloo|sutton/.test(c)) return R["Estrie"];
  return R["Autre"];
}

async function apiCall(endpoint, method = "GET", body) {
  const t = token();
  if (!t) throw new Error("PIPEDRIVE_API_TOKEN absent");
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json", Accept: "application/json", "x-api-token": t },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(`[pipedrive] ${method} ${endpoint} → ${res.status}`, text.slice(0, 300));
    throw new Error(`Pipedrive ${res.status}`);
  }
  return res.json();
}

async function findOrCreatePerson({ email, phone, name }) {
  if (email) {
    const r = await apiCall(`/persons/search?term=${encodeURIComponent(email)}&exact_match=true&fields=email`);
    const hit = r.data?.items?.[0]?.item;
    if (hit) return hit;
  }
  if (phone) {
    const r = await apiCall(`/persons/search?term=${encodeURIComponent(phone)}&fields=phone`);
    const hit = r.data?.items?.[0]?.item;
    if (hit) return hit;
  }
  const created = await apiCall("/persons", "POST", {
    name: name || phone || email,
    email: email ? [{ value: email, primary: true }] : [],
    phone: phone ? [{ value: phone, primary: true }] : [],
  });
  return created.data;
}

function escapeHtml(v) {
  return String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/**
 * Personne → affaire → note. Ne lance jamais.
 * @param {{ name: string, email?: string, phone?: string, title: string, customFields?: Record<string, string|number|undefined>, noteLines: Array<[string, string]> }} input
 * @returns {Promise<{ ok: true, dealId: number, personId: number } | { ok: false, reason: "non-configure"|"erreur", error?: string }>}
 */
export async function captureLead(input) {
  if (!isPipedriveConfigured()) return { ok: false, reason: "non-configure" };
  try {
    const person = await findOrCreatePerson(input);
    const fields = Object.fromEntries(
      Object.entries({ [FIELDS.SITE]: THIS_SITE.option, ...(input.customFields ?? {}) }).filter(([, v]) => v !== undefined && v !== ""),
    );
    const deal = (await apiCall("/deals", "POST", {
      title: `${THIS_SITE.prefix} ${input.title}`,
      person_id: person.id,
      pipeline_id: pipelineId(),
      ...fields,
    })).data;
    const html = `<ul>${input.noteLines.map(([k, v]) => `<li><b>${escapeHtml(k)} :</b> ${escapeHtml(v).replace(/\n/g, "<br/>")}</li>`).join("")}</ul>`;
    await apiCall("/notes", "POST", { deal_id: deal.id, content: html }).catch((e) => console.error("[pipedrive] note non créée :", e));
    return { ok: true, dealId: deal.id, personId: person.id };
  } catch (e) {
    console.error("[pipedrive] captureLead :", e);
    return { ok: false, reason: "erreur", error: e instanceof Error ? e.message : String(e) };
  }
}
