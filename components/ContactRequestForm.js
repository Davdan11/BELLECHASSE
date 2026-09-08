"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './ContactRequestForm.module.css';

const NEEDS = [
  {
    value: 'installation',
    label: 'Installation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5.5 10v10h13V10" />
        <path d="M10 20v-5h4v5" />
      </svg>
    ),
  },
  {
    value: 'entretien',
    label: 'Entretien',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 6.5a4 4 0 0 0 5.2 5.2L9.4 22 6 18.6 16.3 8.3" />
        <path d="M14.5 6.5 19.7 11.7A4 4 0 0 0 14.5 6.5Z" />
      </svg>
    ),
  },
  {
    value: 'question',
    label: 'Une question',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 4v-4H5.5A1.5 1.5 0 0 1 4 14.5Z" />
        <path d="M9.8 8.6a2.2 2.2 0 1 1 3.1 2c-.6.3-.9.7-.9 1.4" />
        <path d="M12 14.2h.01" />
      </svg>
    ),
  },
];

const EMPTY = { need: 'installation', name: '', phone: '', email: '', city: '', message: '', consent: false, website: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Entrez votre nom.';
  if (!/^[\d\s()+.-]{10,}$/.test(values.phone.trim())) errors.phone = 'Entrez un numéro valide.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Entrez un courriel valide.';
  if (!values.city.trim()) errors.city = 'Entrez votre ville.';
  if (!values.consent) errors.consent = 'Veuillez accepter la politique de confidentialité.';
  return errors;
}

export default function ContactRequestForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className={styles.card}>
        <span className={styles.eyebrow}>DEMANDE ENVOYÉE</span>
        <h2 className={styles.title}>Merci, {values.name.split(' ')[0]}.</h2>
        <p className={styles.subtitle}>
          Un membre de notre équipe vous rappelle au {values.phone} dans les plus brefs délais,
          du lundi au vendredi de 8 h à 17 h.
        </p>
        <p className={styles.sentNote}>
          Besoin de nous joindre plus vite? <a href="tel:+15144940400">(514) 494-0400</a>
        </p>
      </div>
    );
  }

  return (
    <form className={styles.card} onSubmit={handleSubmit} noValidate>
      <span className={styles.eyebrow}>FAISONS LE PREMIER PAS</span>
      <h2 className={styles.title}>Comment peut-on<br />vous aider?</h2>
      <p className={styles.subtitle}>Quelques détails pour mieux vous conseiller.</p>

      <fieldset className={styles.fieldset}>
        <legend className={styles.groupLabel}>Votre besoin</legend>
        <div className={styles.needs}>
          {NEEDS.map((n) => {
            const active = values.need === n.value;
            return (
              <label key={n.value} className={`${styles.need} ${active ? styles.needActive : ''}`}>
                <input
                  type="radio"
                  name="need"
                  value={n.value}
                  checked={active}
                  onChange={update('need')}
                  className={styles.srOnly}
                />
                <span className={styles.needCheck} aria-hidden="true">
                  {active && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  )}
                </span>
                <span className={styles.needIcon}>{n.icon}</span>
                <span className={styles.needLabel}>{n.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <span className={styles.groupLabel}>Vos coordonnées</span>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Nom complet <span className={styles.req}>*</span></label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Prénom et nom"
            value={values.name}
            onChange={update('name')}
            aria-invalid={!!errors.name}
            className={errors.name ? styles.inputError : ''}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-phone">Téléphone <span className={styles.req}>*</span></label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="(514) 000-0000"
            value={values.phone}
            onChange={update('phone')}
            aria-invalid={!!errors.phone}
            className={errors.phone ? styles.inputError : ''}
          />
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-email">Courriel <span className={styles.req}>*</span></label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="vous@exemple.ca"
            value={values.email}
            onChange={update('email')}
            aria-invalid={!!errors.email}
            className={errors.email ? styles.inputError : ''}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-city">Ville <span className={styles.req}>*</span></label>
          <input
            id="contact-city"
            type="text"
            autoComplete="address-level2"
            placeholder="Votre ville"
            value={values.city}
            onChange={update('city')}
            aria-invalid={!!errors.city}
            className={errors.city ? styles.inputError : ''}
          />
          {errors.city && <span className={styles.error}>{errors.city}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message">Votre projet <span className={styles.optional}>(facultatif)</span></label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="Ce que vous aimeriez améliorer chez vous..."
          value={values.message}
          onChange={update('message')}
        />
      </div>

      {/* Honeypot: hidden from humans, bots tend to fill it */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Site web</label>
        <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={update('website')} />
      </div>

      <label className={styles.consent}>
        <input type="checkbox" checked={values.consent} onChange={update('consent')} />
        <span>
          J&apos;accepte la <Link href="/confidentialite">politique de confidentialité</Link>.
        </span>
      </label>
      {errors.consent && <span className={styles.error}>{errors.consent}</span>}

      <button type="submit" className={styles.submit} disabled={status === 'sending'}>
        {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma demande'}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 19L19 5M19 5v14M19 5H5" />
        </svg>
      </button>

      {status === 'error' && (
        <p className={styles.errorBox} role="alert">
          Une erreur est survenue. Réessayez ou appelez-nous au <a href="tel:+15144940400">(514) 494-0400</a>.
        </p>
      )}

      <p className={styles.required}><span className={styles.req}>*</span> Champs obligatoires</p>
    </form>
  );
}
