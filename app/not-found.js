import Link from 'next/link';
import EditorialNavbar from '../components/EditorialNavbar';
import EditorialFooterFull from '../components/EditorialFooterFull';
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/site';

export const metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: '/produits', label: 'Nos produits' },
  { href: '/nos-solutions', label: 'Nos solutions' },
  { href: '/thermopompe-montreal', label: 'Thermopompe à Montréal' },
  { href: '/financement', label: 'Financement et subventions' },
  { href: '/blogue', label: 'Blogue' },
  { href: '/rendez-vous', label: 'Prendre rendez-vous' },
];

export default function NotFound() {
  return (
    <>
      <EditorialNavbar theme="light" />
      <main id="contenu" style={{ padding: '9rem 0 5rem', backgroundColor: 'var(--bg-main)' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <span style={{ display: 'block', color: 'var(--primary-red)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>ERREUR 404</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--navy)', marginBottom: '1rem' }}>
            Cette page n&apos;existe pas<br />ou a été déplacée.
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--navy)', marginBottom: '2rem' }}>
            Pas de panique : voici les pages les plus utiles, ou appelez-nous au <a href={`tel:${PHONE_TEL}`} style={{ color: 'var(--primary-red)', fontWeight: 500 }}>{PHONE_DISPLAY}</a>.
          </p>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem', listStyle: 'none', padding: 0, margin: '0 0 2.5rem' }}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.1rem', backgroundColor: '#f6f7f9', border: '1px solid #dde2e9', borderRadius: 6, color: 'var(--navy)', fontWeight: 500 }}>
                  {l.label}
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/" style={{ color: 'var(--primary-red)', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: 3 }}>Retour à l&apos;accueil</Link>
        </div>
      </main>
      <EditorialFooterFull />
    </>
  );
}
