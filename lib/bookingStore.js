import { promises as fs } from 'fs';
import path from 'path';

/**
 * Stockage des rendez-vous.
 *  - Par défaut : fichier JSON local (data/rendez-vous.json). Parfait en développement
 *    ou sur un serveur avec disque persistant.
 *  - En production sans disque (Vercel, etc.) : définir UPSTASH_REDIS_REST_URL et
 *    UPSTASH_REDIS_REST_TOKEN, les réservations sont alors conservées dans Redis.
 */

// Chemin relatif au dossier du projet (process.cwd() au démarrage de Next).
// Un chemin absolu peut être imposé avec BOOKINGS_FILE.
function bookingsFile() {
  return process.env.BOOKINGS_FILE || path.resolve('data/rendez-vous.json');
}
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const REDIS_KEY = process.env.BOOKINGS_REDIS_KEY || 'bellechasse:rendez-vous';

async function redis(...command) {
  const res = await fetch(REDIS_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

async function readFile() {
  try {
    const raw = await fs.readFile(bookingsFile(), 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeFile(list) {
  const file = bookingsFile();
  await fs.mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(list, null, 2));
  await fs.rename(tmp, file);
}

export function storageKind() {
  return REDIS_URL && REDIS_TOKEN ? 'redis' : 'file';
}

export async function listBookings() {
  if (storageKind() === 'redis') {
    const items = await redis('LRANGE', REDIS_KEY, 0, -1);
    return (items || []).map((s) => JSON.parse(s));
  }
  return readFile();
}

export async function appendBooking(booking) {
  if (storageKind() === 'redis') {
    await redis('RPUSH', REDIS_KEY, JSON.stringify(booking));
    return booking;
  }
  const list = await readFile();
  list.push(booking);
  await writeFile(list);
  return booking;
}

// Sérialise les écritures d'un même processus pour éviter deux réservations
// simultanées sur la même plage.
let queue = Promise.resolve();
export function withLock(fn) {
  const run = queue.then(fn, fn);
  queue = run.catch(() => {});
  return run;
}
