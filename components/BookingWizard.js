"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { AREAS, PHONE_DISPLAY, PHONE_TEL, SITE_NAME } from '../lib/site';
import styles from './BookingWizard.module.css';

const NEEDS = [
  { value: 'installation', label: 'Installation neuve' },
  { value: 'remplacement', label: 'Remplacement' },
  { value: 'entretien', label: 'Entretien ou réparation' },
];

const STEPS = ['Secteur', 'Date et heure', 'Coordonnées'];
const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const FIELD_LABELS = { name: 'Nom complet', phone: 'Téléphone', email: 'Courriel', address: 'Adresse de la visite', consent: 'Politique de confidentialité' };

const EMPTY = { need: 'installation', name: '', phone: '', email: '', address: '', postalCode: '', notes: '', consent: false, website: '' };

const Icon = {
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-6-5.2-6-10.5a6 6 0 0 1 12 0C18 15.8 12 21 12 21Z" /><circle cx="12" cy="10.5" r="2.2" /></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>,
  bolt: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 3 5 13.5h6L11 21l8-10.5h-6L13 3Z" /></svg>,
  alert: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v4.5M12 16h.01" /></svg>,
};

/* ---------- Dates ---------- */
function ymdParts(ymd) {
  const [y, m, d] = ymd.split('-').map(Number);
  return { y, m, d };
}

function fmt(ymd, opts) {
  const { y, m, d } = ymdParts(ymd);
  return new Intl.DateTimeFormat('fr-CA', { ...opts, timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, d)));
}

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function groupByMonth(days) {
  const months = [];
  for (const day of days) {
    const { y, m } = ymdParts(day.date);
    const key = `${y}-${m}`;
    let month = months.find((x) => x.key === key);
    if (!month) {
      month = { key, label: cap(fmt(day.date, { month: 'long', year: 'numeric' })), days: [] };
      months.push(month);
    }
    month.days.push(day);
  }
  return months;
}

/** La première plage libre des trois prochaines journées ouvertes, pour réserver en un clic. */
function nextOpenings(days, max = 3) {
  const out = [];
  for (const day of days) {
    const first = day.slots.find((s) => s.available);
    if (first) out.push({ date: day.date, slot: first.id, label: first.label });
    if (out.length >= max) break;
  }
  return out;
}

function googleCalendarUrl({ start, end, address, city, id }) {
  const stamp = (iso) => iso.replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Visite d'un conseiller ${SITE_NAME}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: `Référence ${id}. Pour modifier : ${PHONE_DISPLAY}`,
    location: `${address}, ${city}`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

/* ---------- Validation ---------- */
const RULES = {
  name: (v) => (v.trim() ? '' : 'Entrez votre nom complet.'),
  phone: (v) => (/^[\d\s()+.-]{10,}$/.test(v.trim()) ? '' : 'Entrez un numéro à 10 chiffres, par exemple (514) 000-0000.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Entrez un courriel valide, par exemple vous@exemple.ca.'),
  address: (v) => (v.trim() ? '' : 'Entrez le numéro et la rue de la visite.'),
  consent: (v) => (v ? '' : 'Cochez la case pour accepter la politique de confidentialité.'),
};

function validateAll(values) {
  const errors = {};
  for (const key of Object.keys(RULES)) {
    const msg = RULES[key](values[key]);
    if (msg) errors[key] = msg;
  }
  return errors;
}

/* ---------- Calendrier ---------- */
function MonthGrid({ month, today, selected, onPick }) {
  const first = month.days[0];
  const dayOfMonth = ymdParts(first.date).d;
  const weekdayOfFirst = (((first.weekday - (dayOfMonth - 1)) % 7) + 7) % 7;
  const pad = (weekdayOfFirst + 6) % 7;
  const cells = [];
  for (let i = 0; i < pad; i++) cells.push(<span key={`p${i}`} className={styles.calEmpty} />);
  for (let d = 1; d < dayOfMonth; d++) cells.push(<span key={`b${d}`} className={`${styles.calDay} ${styles.calPast}`} aria-hidden="true">{d}</span>);
  for (const day of month.days) {
    const open = day.slots.some((s) => s.available);
    const active = day.date === selected;
    const isToday = day.date === today;
    cells.push(
      <button
        key={day.date}
        type="button"
        className={`${styles.calDay} ${open ? styles.calOpen : ''} ${active ? styles.calActive : ''} ${isToday ? styles.calToday : ''}`}
        disabled={!open}
        aria-pressed={active}
        aria-label={`${fmt(day.date, { weekday: 'long', day: 'numeric', month: 'long' })}${open ? '' : ', aucune disponibilité'}`}
        onClick={() => onPick(day.date)}
      >
        {ymdParts(day.date).d}
      </button>
    );
  }
  return <div className={styles.calGrid}>{WEEKDAYS.map((w, i) => <span key={i} className={styles.calWeekday} aria-hidden="true">{w}</span>)}{cells}</div>;
}

function CalendarSkeleton() {
  return (
    <div className={styles.calendar} aria-busy="true" aria-label="Chargement des disponibilités">
      <div className={styles.calHeader}><span className={`${styles.skeleton} ${styles.skelTitle}`} /></div>
      <div className={styles.calGrid}>
        {Array.from({ length: 35 }).map((_, i) => <span key={i} className={`${styles.calEmpty} ${styles.skeleton}`} />)}
      </div>
    </div>
  );
}

/* ---------- Assistant ---------- */
export default function BookingWizard({ source = 'rendez-vous' }) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [area, setArea] = useState(null);
  const [city, setCity] = useState('');
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [monthIndex, setMonthIndex] = useState(0);
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error | taken
  const [result, setResult] = useState(null);
  const headingRef = useRef(null);
  const summaryRef = useRef(null);
  const cardRef = useRef(null);
  const visited = useRef(false);

  const areaData = useMemo(() => AREAS.find((a) => a.slug === area) || null, [area]);
  const months = useMemo(() => (availability ? groupByMonth(availability.days) : []), [availability]);
  const openings = useMemo(() => (availability ? nextOpenings(availability.days) : []), [availability]);
  const selectedDay = useMemo(() => availability?.days.find((d) => d.date === date) || null, [availability, date]);
  const slotLabel = selectedDay?.slots.find((s) => s.id === slot)?.label || '';
  const placeLabel = city === 'Autre' ? areaData?.label : city;

  // Au changement d'étape : focus sur le titre et carte visible.
  useEffect(() => {
    if (!visited.current) { visited.current = true; return; }
    headingRef.current?.focus({ preventScroll: true });
    cardRef.current?.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [step, reduceMotion]);

  // Après un envoi refusé : focus sur le résumé des erreurs.
  useEffect(() => {
    if (submitAttempt > 0) summaryRef.current?.focus();
  }, [submitAttempt]);

  const loadAvailability = async (slug) => {
    setLoading(true);
    setLoadError(false);
    try {
      const res = await fetch(`/api/rendez-vous/disponibilites?secteur=${encodeURIComponent(slug)}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('bad status');
      const data = await res.json();
      setAvailability(data);
      setMonthIndex(0);
    } catch {
      setAvailability(null);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  const chooseArea = (slug) => {
    if (slug === area) return;
    setArea(slug);
    setCity('');
    setDate('');
    setSlot('');
    loadAvailability(slug);
  };

  const goTo = (n) => {
    setStatus('idle');
    setStep(n);
  };

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validateField = (field) => () => {
    if (!RULES[field]) return;
    const msg = RULES[field](values[field]);
    setErrors((er) => ({ ...er, [field]: msg || undefined }));
  };

  const pickDate = (d) => {
    setDate(d);
    setSlot('');
    // Affiche le mois de la date choisie (utile pour les « prochaines disponibilités »).
    const idx = months.findIndex((m) => m.days.some((x) => x.date === d));
    if (idx >= 0) setMonthIndex(idx);
  };

  const pickOpening = (o) => {
    pickDate(o.date);
    setSlot(o.slot);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validateAll(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setShowSummary(true);
      setSubmitAttempt((n) => n + 1);
      return;
    }
    setShowSummary(false);
    setStatus('sending');
    try {
      const res = await fetch('/api/rendez-vous', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, area, city, date, slot, source, page: typeof window !== 'undefined' ? window.location.pathname : '' }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 409) {
        setStatus('taken');
        setSlot('');
        setStep(1);
        loadAvailability(area);
        return;
      }
      if (!res.ok || !data.ok) throw new Error('bad status');
      setResult(data);
      setStatus('sent');
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { source, need: values.need, area });
      }
    } catch {
      setStatus('error');
    }
  };

  const errorList = Object.entries(errors).filter(([, msg]) => msg);
  const fieldProps = (field) => ({
    'aria-invalid': !!errors[field],
    'aria-describedby': errors[field] ? `rv-${field}-error` : undefined,
    className: errors[field] ? styles.inputError : '',
    onBlur: validateField(field),
  });

  // Entrée animée seulement : pas d'attente de sortie, l'étape suivante apparaît tout de suite.
  const anim = reduceMotion
    ? { initial: false }
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.25, ease: 'easeOut' } };

  /* ---------- Confirmation ---------- */
  if (status === 'sent' && result) {
    return (
      <motion.div className={`${styles.card} ${styles.cardDone}`} ref={cardRef} {...anim}>
        <div className={styles.doneIcon} aria-hidden="true">{Icon.check}</div>
        <span className={styles.eyebrow}>RENDEZ-VOUS CONFIRMÉ</span>
        <h2 className={styles.title} tabIndex={-1} ref={headingRef}>Merci, {values.name.trim().split(' ')[0]}.</h2>
        <p className={styles.subtitle}>Un conseiller passera chez vous :</p>
        <dl className={styles.summary}>
          <div><dt>{Icon.calendar} Date</dt><dd>{cap(result.dateLabel || fmt(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))}</dd></div>
          <div><dt>{Icon.clock} Heure</dt><dd>{result.slot || slotLabel}</dd></div>
          <div><dt>{Icon.pin} Adresse</dt><dd>{values.address}, {placeLabel}</dd></div>
          <div><dt>Référence</dt><dd className={styles.ref}>{result.id}</dd></div>
        </dl>
        {result.start && result.end && (
          <a
            className={styles.calendarLink}
            href={googleCalendarUrl({ start: result.start, end: result.end, address: values.address, city: placeLabel, id: result.id })}
            target="_blank"
            rel="noopener noreferrer"
          >
            {Icon.calendar} Ajouter à Google Agenda
          </a>
        )}
        <p className={styles.sentNote}>
          {result.emailed
            ? <>Une confirmation vous a été envoyée à <strong>{values.email.trim()}</strong>, avec l&apos;événement à ajouter à votre calendrier.</>
            : <>Notre équipe vous confirmera la visite par téléphone au <strong>{values.phone.trim()}</strong>.</>}
        </p>
        <p className={styles.sentNote}>
          Pour modifier ou annuler : <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>, en mentionnant votre référence.
        </p>
      </motion.div>
    );
  }

  const canGoToDate = !!area && !!city;
  const canGoToForm = !!date && !!slot;

  return (
    <form className={styles.card} onSubmit={handleSubmit} noValidate ref={cardRef}>
      <ol className={styles.steps} aria-label="Étapes de la réservation">
        {STEPS.map((label, i) => {
          const done = i < step;
          const cls = `${styles.step} ${i === step ? styles.stepActive : ''} ${done ? styles.stepDone : ''}`;
          return (
            <li key={label} className={cls} aria-current={i === step ? 'step' : undefined}>
              {done ? (
                <button type="button" className={styles.stepBtn} onClick={() => goTo(i)} aria-label={`Revenir à l’étape ${i + 1}, ${label}`}>
                  <span className={styles.stepNum}>{Icon.check}</span>
                  <span className={styles.stepLabel}>{label}</span>
                </button>
              ) : (
                <span className={styles.stepBtn}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <span className={styles.stepLabel}>{label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <p className={styles.srOnly} aria-live="polite">Étape {step + 1} de {STEPS.length} : {STEPS[step]}</p>

      {/* ---------- Étape 1 : secteur ---------- */}
        {step === 0 && (
          <motion.div key="s0" {...anim}>
            <span className={styles.eyebrow}>01 / VOTRE SECTEUR</span>
            <h2 className={styles.title} tabIndex={-1} ref={headingRef}>Où se trouve<br />votre maison?</h2>
            <p className={styles.subtitle}>Nos conseillers se déplacent par secteur. Cela nous permet de vous proposer les bonnes journées.</p>

            <fieldset className={styles.fieldset}>
              <legend className={styles.groupLabel}>Région</legend>
              <div className={styles.areas}>
                {AREAS.map((a) => {
                  const active = area === a.slug;
                  const count = a.slug === 'montreal' ? `${a.sectors.length} arrondissements et villes` : `${a.sectors.length} villes`;
                  return (
                    <label key={a.slug} className={`${styles.area} ${active ? styles.areaActive : ''}`}>
                      <input type="radio" name="area" value={a.slug} checked={active} onChange={() => chooseArea(a.slug)} className={styles.srOnly} />
                      <span className={styles.areaIcon}>{Icon.pin}</span>
                      <span className={styles.areaText}>
                        <span className={styles.areaLabel}>{a.label}</span>
                        <span className={styles.areaMeta}>{count}</span>
                      </span>
                      <span className={styles.areaCheck} aria-hidden="true">{active && Icon.check}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {areaData && (
              <motion.div className={styles.field} {...(reduceMotion ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 } })}>
                <label htmlFor="rv-city">{areaData.slug === 'montreal' ? 'Arrondissement ou ville' : 'Ville'} <span className={styles.req}>*</span></label>
                <select id="rv-city" value={city} onChange={(e) => setCity(e.target.value)} autoFocus={!city}>
                  <option value="">Choisir…</option>
                  {areaData.slug === 'montreal' && <option value="Montréal">Montréal (centre)</option>}
                  {areaData.sectors.map((s) => <option key={s} value={s}>{s}</option>)}
                  <option value="Autre">Autre secteur de {areaData.label}</option>
                </select>
                <span className={styles.hint}>Vous indiquerez l&apos;adresse exacte à la dernière étape.</span>
              </motion.div>
            )}

            <div className={styles.actions}>
              <button type="button" className={styles.primary} disabled={!canGoToDate} onClick={() => goTo(1)}>
                Choisir une date {Icon.arrow}
              </button>
            </div>
            <ul className={styles.trust} aria-label="Ce qui est inclus">
              <li>{Icon.check} Gratuit</li>
              <li>{Icon.check} Sans engagement</li>
              <li>{Icon.check} Confirmation immédiate</li>
            </ul>
          </motion.div>
        )}

        {/* ---------- Étape 2 : date et heure ---------- */}
        {step === 1 && (
          <motion.div key="s1" {...anim}>
            <span className={styles.eyebrow}>02 / DATE ET HEURE</span>
            <h2 className={styles.title} tabIndex={-1} ref={headingRef}>Quand pouvons-nous<br />passer?</h2>

            <div className={styles.recap}>
              <span className={styles.recapItem}>{Icon.pin} {placeLabel}</span>
              <button type="button" className={styles.linkBtn} onClick={() => goTo(0)}>Modifier le secteur</button>
            </div>

            {status === 'taken' && (
              <p className={styles.errorBox} role="alert">
                {Icon.alert} Cette plage vient d&apos;être réservée par quelqu&apos;un d&apos;autre. Choisissez-en une autre ci-dessous.
              </p>
            )}

            {loadError && (
              <p className={styles.errorBox} role="alert">
                {Icon.alert} Impossible de charger les disponibilités.{' '}
                <button type="button" className={styles.linkBtn} onClick={() => loadAvailability(area)}>Réessayer</button> ou appelez-nous au <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>.
              </p>
            )}

            {loading && <CalendarSkeleton />}

            {!loading && availability && (
              <>
                {openings.length > 0 && (
                  <div className={styles.openings}>
                    <span className={styles.groupLabel}>{Icon.bolt} Prochaines disponibilités</span>
                    <div className={styles.openingList}>
                      {openings.map((o) => {
                        const active = o.date === date && o.slot === slot;
                        return (
                          <button key={`${o.date}-${o.slot}`} type="button" className={`${styles.opening} ${active ? styles.openingActive : ''}`} aria-pressed={active} onClick={() => pickOpening(o)}>
                            <span className={styles.openingDay}>{cap(fmt(o.date, { weekday: 'short', day: 'numeric', month: 'short' }))}</span>
                            <span className={styles.openingSlot}>{o.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {months[monthIndex] && (
                  <div className={styles.calendar}>
                    <div className={styles.calHeader}>
                      <button type="button" className={styles.calNav} onClick={() => setMonthIndex((i) => i - 1)} disabled={monthIndex === 0} aria-label="Mois précédent">‹</button>
                      <span className={styles.calMonth} aria-live="polite">{months[monthIndex].label}</span>
                      <button type="button" className={styles.calNav} onClick={() => setMonthIndex((i) => i + 1)} disabled={monthIndex >= months.length - 1} aria-label="Mois suivant">›</button>
                    </div>
                    <MonthGrid month={months[monthIndex]} today={availability.today} selected={date} onPick={pickDate} />
                    <div className={styles.legend} aria-hidden="true">
                      <span><i className={styles.legendOpen} /> Disponible</span>
                      <span><i className={styles.legendClosed} /> Complet ou fermé</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {selectedDay && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.groupLabel}>{Icon.clock} {cap(fmt(date, { weekday: 'long', day: 'numeric', month: 'long' }))}</legend>
                <div className={styles.slots}>
                  {selectedDay.slots.map((s) => {
                    const active = slot === s.id;
                    return (
                      <label key={s.id} className={`${styles.slot} ${active ? styles.slotActive : ''} ${s.available ? '' : styles.slotOff}`}>
                        <input type="radio" name="slot" value={s.id} disabled={!s.available} checked={active} onChange={() => setSlot(s.id)} className={styles.srOnly} />
                        <span>{s.label}</span>
                        {s.available ? <span className={styles.slotCheck} aria-hidden="true">{active && Icon.check}</span> : <span className={styles.slotNote}>Complet</span>}
                      </label>
                    );
                  })}
                </div>
                <span className={styles.hint}>Le conseiller se présente à l&apos;intérieur de la plage choisie. Comptez environ 90 minutes.</span>
              </fieldset>
            )}

            <div className={styles.actions}>
              <button type="button" className={styles.secondary} onClick={() => goTo(0)}>Retour</button>
              <button type="button" className={styles.primary} disabled={!canGoToForm} onClick={() => goTo(2)}>
                Continuer {Icon.arrow}
              </button>
            </div>
          </motion.div>
        )}

        {/* ---------- Étape 3 : coordonnées ---------- */}
        {step === 2 && (
          <motion.div key="s2" {...anim}>
            <span className={styles.eyebrow}>03 / VOS COORDONNÉES</span>
            <h2 className={styles.title} tabIndex={-1} ref={headingRef}>Presque terminé.</h2>

            <div className={styles.recap}>
              <span className={styles.recapItem}>{Icon.calendar} {cap(fmt(date, { weekday: 'long', day: 'numeric', month: 'long' }))}</span>
              <span className={styles.recapItem}>{Icon.clock} {slotLabel}</span>
              <span className={styles.recapItem}>{Icon.pin} {placeLabel}</span>
              <button type="button" className={styles.linkBtn} onClick={() => goTo(1)}>Modifier</button>
            </div>

            {showSummary && errorList.length > 0 && (
              <div className={styles.errorSummary} role="alert" tabIndex={-1} ref={summaryRef} aria-labelledby="rv-error-title">
                <p id="rv-error-title" className={styles.errorTitle}>{Icon.alert} Vérifiez {errorList.length === 1 ? 'ce champ' : `ces ${errorList.length} champs`} :</p>
                <ul>
                  {errorList.map(([field, msg]) => (
                    <li key={field}><a href={`#rv-${field}`}>{FIELD_LABELS[field]}</a> : {msg}</li>
                  ))}
                </ul>
              </div>
            )}

            <fieldset className={styles.fieldset}>
              <legend className={styles.groupLabel}>Objet de la visite</legend>
              <div className={styles.needs}>
                {NEEDS.map((n) => {
                  const active = values.need === n.value;
                  return (
                    <label key={n.value} className={`${styles.need} ${active ? styles.needActive : ''}`}>
                      <input type="radio" name="need" value={n.value} checked={active} onChange={update('need')} className={styles.srOnly} />
                      {n.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="rv-name">Nom complet <span className={styles.req}>*</span></label>
                <input id="rv-name" type="text" autoComplete="name" placeholder="Prénom et nom" value={values.name} onChange={update('name')} {...fieldProps('name')} />
                {errors.name && <span id="rv-name-error" className={styles.error}>{errors.name}</span>}
              </div>
              <div className={styles.field}>
                <label htmlFor="rv-phone">Téléphone <span className={styles.req}>*</span></label>
                <input id="rv-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(514) 000-0000" value={values.phone} onChange={update('phone')} {...fieldProps('phone')} />
                {errors.phone && <span id="rv-phone-error" className={styles.error}>{errors.phone}</span>}
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="rv-email">Courriel <span className={styles.req}>*</span></label>
              <input id="rv-email" type="email" inputMode="email" autoComplete="email" placeholder="vous@exemple.ca" value={values.email} onChange={update('email')} {...fieldProps('email')} />
              {errors.email
                ? <span id="rv-email-error" className={styles.error}>{errors.email}</span>
                : <span className={styles.hint}>Pour la confirmation et l&apos;événement à ajouter à votre calendrier.</span>}
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="rv-address">Adresse de la visite <span className={styles.req}>*</span></label>
                <input id="rv-address" type="text" autoComplete="street-address" placeholder="Numéro et rue" value={values.address} onChange={update('address')} {...fieldProps('address')} />
                {errors.address && <span id="rv-address-error" className={styles.error}>{errors.address}</span>}
              </div>
              <div className={styles.field}>
                <label htmlFor="rv-postal">Code postal <span className={styles.optional}>(facultatif)</span></label>
                <input id="rv-postal" type="text" autoComplete="postal-code" placeholder="H1H 1H1" value={values.postalCode} onChange={update('postalCode')} />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="rv-notes">Précisions <span className={styles.optional}>(facultatif)</span></label>
              <textarea id="rv-notes" rows={3} placeholder="Type de maison, appareil actuel, accès, stationnement…" value={values.notes} onChange={update('notes')} />
            </div>

            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="rv-website">Site web</label>
              <input id="rv-website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={update('website')} />
            </div>

            <label className={`${styles.consent} ${errors.consent ? styles.consentError : ''}`}>
              <input id="rv-consent" type="checkbox" checked={values.consent} onChange={update('consent')} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'rv-consent-error' : undefined} />
              <span>J&apos;accepte la <Link href="/confidentialite">politique de confidentialité</Link>. <span className={styles.req}>*</span></span>
            </label>
            {errors.consent && <span id="rv-consent-error" className={styles.error}>{errors.consent}</span>}

            <div className={styles.actions}>
              <button type="button" className={styles.secondary} onClick={() => goTo(1)}>Retour</button>
              <button type="submit" className={styles.primary} disabled={status === 'sending'} aria-busy={status === 'sending'}>
                {status === 'sending' ? <><span className={styles.spinner} aria-hidden="true" /> Réservation en cours…</> : <>Confirmer le rendez-vous {Icon.arrow}</>}
              </button>
            </div>

            {status === 'error' && (
              <p className={styles.errorBox} role="alert">
                {Icon.alert} Une erreur est survenue. Réessayez ou appelez-nous au <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>.
              </p>
            )}

            <p className={styles.required}><span className={styles.req}>*</span> Champs obligatoires. Visite gratuite et sans engagement.</p>
          </motion.div>
        )}
    </form>
  );
}
