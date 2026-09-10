"use client";
import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import styles from './CookieConsent.module.css';

export const CONSENT_KEY = 'be-consent';
export const CONSENT_EVENT = 'be-consent-change';

/** Lit le choix enregistré : 'granted' | 'denied' | null. */
export function readConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed.analytics === true ? 'granted' : 'denied';
  } catch {
    return null;
  }
}

function saveConsent(analytics) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics, at: new Date().toISOString(), v: 1 }));
  } catch {
    /* stockage indisponible : on garde le choix pour la session seulement */
  }
  const state = analytics ? 'granted' : 'denied';
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: state,
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
    });
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

/**
 * Bannière de témoins (Loi 25). Aucun témoin non essentiel n'est déposé avant un choix
 * explicite ; Google Consent Mode v2 est mis à jour en conséquence.
 */
let forceOpen = false;
const listeners = new Set();
const notify = () => listeners.forEach((l) => l());

function subscribe(listener) {
  listeners.add(listener);
  const reopen = () => { forceOpen = true; notify(); };
  window.addEventListener('be-consent-open', reopen);
  window.addEventListener('storage', notify);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('be-consent-open', reopen);
    window.removeEventListener('storage', notify);
  };
}

const getSnapshot = () => (forceOpen || readConsent() === null ? 'open' : 'closed');
const getServerSnapshot = () => 'closed';

export default function CookieConsent() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (state !== 'open') return null;

  const choose = (analytics) => {
    forceOpen = false;
    saveConsent(analytics);
    notify();
  };

  return (
    <div className={styles.banner} role="region" aria-label="Témoins et confidentialité">
      <div className={styles.inner}>
        <p className={styles.text}>
          Nous utilisons des témoins essentiels au fonctionnement du site et, avec votre accord, des témoins de mesure
          d&apos;audience pour améliorer nos services. Vous pouvez changer d&apos;avis à tout moment.{' '}
          <Link href="/confidentialite#temoins" className={styles.link}>Politique de confidentialité</Link>
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.secondary} onClick={() => choose(false)}>Refuser</button>
          <button type="button" className={styles.primary} onClick={() => choose(true)}>Accepter</button>
        </div>
      </div>
    </div>
  );
}

/** Petit lien « Gérer les témoins » réutilisable (pied de page). */
export function ManageCookiesButton({ className }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event('be-consent-open'))}>
      Gérer les témoins
    </button>
  );
}
