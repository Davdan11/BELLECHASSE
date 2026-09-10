import { AREAS } from './site';

/**
 * Configuration des rendez-vous (visite d'un conseiller à domicile).
 *
 * À ajuster par l'équipe :
 *  - ADVISORS : les conseillers, leurs secteurs et leur horaire hebdomadaire.
 *  - SLOTS : les plages horaires proposées.
 *  - BLACKOUT_DATES : vacances, formations, journées fermées (format AAAA-MM-JJ).
 */

export const TIMEZONE = 'America/Toronto'; // heure de Montréal
export const LEAD_HOURS = 24; // délai minimal avant une visite
export const HORIZON_DAYS = 28; // nombre de jours ouverts à la réservation
export const VISIT_DURATION_MIN = 90;

export const SLOTS = [
  { id: '08:00', start: '08:00', end: '10:00', label: '8 h à 10 h' },
  { id: '10:00', start: '10:00', end: '12:00', label: '10 h à 12 h' },
  { id: '13:00', start: '13:00', end: '15:00', label: '13 h à 15 h' },
  { id: '15:00', start: '15:00', end: '17:00', label: '15 h à 17 h' },
];

const ALL = SLOTS.map((s) => s.id);
const MORNING = ['08:00', '10:00'];
const WEEK = { lun: ALL, mar: ALL, mer: ALL, jeu: ALL, ven: ALL };

export const ADVISORS = [
  {
    id: 'montreal-laval',
    name: 'Conseiller Montréal / Laval',
    areas: ['montreal', 'laval'],
    schedule: { ...WEEK },
  },
  {
    id: 'rive-nord',
    name: 'Conseiller Rive-Nord',
    areas: ['rive-nord', 'laval'],
    schedule: { ...WEEK, mer: MORNING },
  },
  {
    id: 'rive-sud',
    name: 'Conseiller Rive-Sud',
    areas: ['rive-sud', 'montreal'],
    schedule: { ...WEEK },
  },
];

export const BLACKOUT_DATES = [];

export const NEEDS = {
  installation: 'Installation neuve',
  remplacement: 'Remplacement d’un appareil',
  entretien: 'Entretien ou réparation',
};

const DAY_KEYS = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'];
const AREA_BY_SLUG = Object.fromEntries(AREAS.map((a) => [a.slug, a]));

/* ---------- Dates (toutes les fonctions travaillent en AAAA-MM-JJ) ---------- */

export function isYmd(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ''));
}

function parts(ymd) {
  const [y, m, d] = ymd.split('-').map(Number);
  return { y, m, d };
}

function toYmd(y, m, d) {
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

export function addDays(ymd, n) {
  const { y, m, d } = parts(ymd);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return toYmd(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
}

/** 0 = dimanche … 6 = samedi */
export function weekdayOf(ymd) {
  const { y, m, d } = parts(ymd);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function todayInMontreal(now = new Date()) {
  const f = new Intl.DateTimeFormat('en-CA', { timeZone: TIMEZONE, year: 'numeric', month: '2-digit', day: '2-digit' });
  return f.format(now); // en-CA donne AAAA-MM-JJ
}

function tzOffsetMinutes(dateUtc) {
  const f = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE, hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
  });
  const p = Object.fromEntries(f.formatToParts(dateUtc).map((x) => [x.type, x.value]));
  const local = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute);
  return (local - dateUtc.getTime()) / 60000;
}

/** Instant UTC correspondant à une heure locale de Montréal. */
export function localToUtc(ymd, hhmm) {
  const { y, m, d } = parts(ymd);
  const [h, mi] = hhmm.split(':').map(Number);
  const guess = new Date(Date.UTC(y, m - 1, d, h, mi));
  return new Date(guess.getTime() - tzOffsetMinutes(guess) * 60000);
}

export function formatDateFr(ymd, opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) {
  const { y, m, d } = parts(ymd);
  return new Intl.DateTimeFormat('fr-CA', { ...opts, timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, d)));
}

/* ---------- Jours fériés du Québec ---------- */

function nthMonday(y, month, n) {
  const first = new Date(Date.UTC(y, month - 1, 1));
  const offset = (8 - first.getUTCDay()) % 7; // jours jusqu'au premier lundi
  return toYmd(y, month, 1 + offset + (n - 1) * 7);
}

function easterMonday(y) {
  // Algorithme de Meeus/Jones/Butcher
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return addDays(toYmd(y, month, day), 1);
}

function patriotesDay(y) {
  // Lundi qui précède le 25 mai
  let d = toYmd(y, 5, 24);
  while (weekdayOf(d) !== 1) d = addDays(d, -1);
  return d;
}

export function holidaysFor(y) {
  return new Set([
    toYmd(y, 1, 1),
    toYmd(y, 1, 2),
    easterMonday(y),
    patriotesDay(y),
    toYmd(y, 6, 24),
    toYmd(y, 7, 1),
    nthMonday(y, 9, 1),
    nthMonday(y, 10, 2),
    toYmd(y, 12, 24),
    toYmd(y, 12, 25),
    toYmd(y, 12, 26),
    toYmd(y, 12, 31),
  ]);
}

export function isClosedDay(ymd) {
  return BLACKOUT_DATES.includes(ymd) || holidaysFor(parts(ymd).y).has(ymd);
}

/* ---------- Disponibilités ---------- */

export function getArea(slug) {
  return AREA_BY_SLUG[slug] || null;
}

export function getSlot(id) {
  return SLOTS.find((s) => s.id === id) || null;
}

function isActive(b) {
  return b && b.status !== 'cancelled';
}

function worksAt(advisor, ymd, slotId) {
  const day = advisor.schedule[DAY_KEYS[weekdayOf(ymd)]];
  return Array.isArray(day) && day.includes(slotId);
}

function isBusy(advisor, ymd, slotId, bookings) {
  return bookings.some((b) => isActive(b) && b.advisorId === advisor.id && b.date === ymd && b.slot === slotId);
}

export function freeAdvisors(areaSlug, ymd, slotId, bookings) {
  if (isClosedDay(ymd)) return [];
  return ADVISORS.filter(
    (a) => a.areas.includes(areaSlug) && worksAt(a, ymd, slotId) && !isBusy(a, ymd, slotId, bookings)
  );
}

/**
 * Choisit le conseiller le plus logique : celui qui est déjà dans ce secteur
 * ce jour-là, sinon celui qui n'a pas encore de déplacement ailleurs.
 */
export function assignAdvisor(areaSlug, ymd, slotId, bookings) {
  const free = freeAdvisors(areaSlug, ymd, slotId, bookings);
  if (free.length === 0) return null;
  const dayBookings = (a) => bookings.filter((b) => isActive(b) && b.advisorId === a.id && b.date === ymd);
  const sameArea = free.find((a) => dayBookings(a).some((b) => b.area === areaSlug));
  if (sameArea) return sameArea;
  const untouched = free.find((a) => dayBookings(a).length === 0);
  return untouched || free[0];
}

export function isTooSoon(ymd, slotId, now = new Date()) {
  const slot = getSlot(slotId);
  if (!slot) return true;
  return localToUtc(ymd, slot.start).getTime() - now.getTime() < LEAD_HOURS * 3600 * 1000;
}

export function isWithinHorizon(ymd, now = new Date()) {
  const today = todayInMontreal(now);
  return ymd >= today && ymd <= addDays(today, HORIZON_DAYS);
}

/** Calendrier des prochains jours pour un secteur, avec l'état de chaque plage. */
export function buildAvailability(areaSlug, bookings, now = new Date()) {
  const today = todayInMontreal(now);
  const days = [];
  for (let i = 0; i <= HORIZON_DAYS; i++) {
    const date = addDays(today, i);
    const closed = isClosedDay(date);
    const slots = SLOTS.map((slot) => ({
      id: slot.id,
      label: slot.label,
      available: !closed && !isTooSoon(date, slot.id, now) && freeAdvisors(areaSlug, date, slot.id, bookings).length > 0,
    }));
    days.push({ date, weekday: weekdayOf(date), closed, slots });
  }
  return { today, from: today, to: addDays(today, HORIZON_DAYS), days };
}
