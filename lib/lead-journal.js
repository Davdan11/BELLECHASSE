/* ==================================================================
   Journal local des leads — filet de sécurité, même format que
   thermopompesavendre.ca : un objet JSON par ligne, un fichier par mois
   (data/leads/2026-09.jsonl), écrit AVANT tout appel externe.
   Dossier hors dépôt. Variable : LEAD_JOURNAL_DIR.
   ================================================================== */

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export function journalDir() {
  return process.env.LEAD_JOURNAL_DIR || path.join(process.cwd(), "data", "leads");
}

async function append(entry) {
  try {
    const dir = journalDir();
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, `${entry.at.slice(0, 7)}.jsonl`), JSON.stringify(entry) + "\n", "utf8");
    return true;
  } catch (e) {
    console.error("[lead-journal] écriture impossible :", e);
    return false;
  }
}

/** Enregistre la réception d'un lead. Ne lance jamais. */
export async function journalLead(kind, lead) {
  const entry = { id: randomUUID(), at: new Date().toISOString(), kind, lead };
  const written = await append(entry);
  return { entry, written };
}

/** Ajoute une ligne de résultat sous le même identifiant. */
export function journalOutcome(entry, outcome) {
  return append({ id: entry.id, at: new Date().toISOString(), kind: entry.kind, lead: {}, outcome });
}
