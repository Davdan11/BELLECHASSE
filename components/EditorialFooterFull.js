import Link from 'next/link';
import Image from 'next/image';
import { ManageCookiesButton } from './CookieConsent';
import { EMAIL, ADDRESS, SOCIAL, PHONE_DISPLAY, PHONE_TEL, RBQ, MAPS_LINK_URL } from '../lib/site';
import styles from './EditorialFooterFull.module.css';

const GROUPS = [
  {
    title: 'Nos solutions',
    links: [
      ['/produits', 'Nos produits'],
      ['/nos-solutions#thermopompes-centrales', 'Thermopompes centrales'],
      ['/nos-solutions#thermopompes-murales', 'Thermopompes murales'],
      ['/produits/air-climatise-central', 'Climatisation'],
      ['/produits/fournaise-air-pulse', 'Fournaises'],
      ['/produits/echangeur-air', 'Échangeurs d’air'],
    ],
  },
  {
    title: 'Services et outils',
    links: [
      ['/rendez-vous', 'Prendre rendez-vous'],
      ['/prix-thermopompe', 'Prix d’une thermopompe'],
      ['/calculateur-subventions', 'Calculateur de subventions'],
      ['/financement', 'Financement et subventions'],
      ['/depannage-reparation', 'Réparation et dépannage'],
      ['/blogue', 'Blogue'],
    ],
  },
  {
    title: 'Secteurs',
    links: [
      ['/thermopompe-montreal', 'Montréal'],
      ['/thermopompe-laval', 'Laval'],
      ['/thermopompe-rive-nord', 'Rive-Nord'],
      ['/thermopompe-rive-sud', 'Rive-Sud'],
    ],
  },
  {
    title: 'Entreprise',
    links: [
      ['/notre-expertise', 'Notre expertise'],
      ['/equipe', 'Notre équipe'],
      ['/carrieres', 'Carrières'],
      ['/contact', 'Contact'],
    ],
  },
];

export default function EditorialFooterFull() {
  return (
    <footer className={styles.footer}>
      <div className="container">

        {/* Rangée 1 : marque + coordonnées */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logoLink} aria-label="Bellechasse Énergie, accueil">
              <Image src="/logo.webp" alt="" width={1024} height={341} loading="lazy" className={styles.logo} />
            </Link>
            <p className={styles.desc}>Trois générations au service de votre confort, depuis 1962.</p>
            <p className={styles.address}>
              {ADDRESS && (
                <a href={MAPS_LINK_URL} target="_blank" rel="noopener noreferrer">
                  {ADDRESS.street}, {ADDRESS.city} (Québec) {ADDRESS.postalCode}
                </a>
              )}
              {ADDRESS && <br />}
              Grand Montréal, Laval, Rive-Nord et Rive-Sud
            </p>
            <div className={styles.social}>
              {SOCIAL.facebook && (
                <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Bellechasse Énergie sur Facebook" className={styles.socialLink}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3Z" /></svg>
                </a>
              )}
              {SOCIAL.googleBusiness && (
                <a href={SOCIAL.googleBusiness} target="_blank" rel="noopener noreferrer" aria-label="Fiche Google de Bellechasse Énergie" className={styles.socialLink}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
                </a>
              )}
            </div>
          </div>

          <div className={styles.contact}>
            <span className={styles.groupTitle}>Nous joindre</span>
            <a href={`tel:${PHONE_TEL}`} className={styles.phone}>{PHONE_DISPLAY}</a>
            {EMAIL && <a href={`mailto:${EMAIL}`} className={styles.email}>{EMAIL}</a>}
            <p className={styles.hours}>Lundi au vendredi, 8 h à 17 h<br />Samedi et dimanche : fermé</p>
            <Link href="/rendez-vous" className={styles.btn}>
              Prendre rendez-vous
              <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 19L19 5M19 5v14M19 5H5" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Rangée 2 : liens */}
        <nav className={styles.groups} aria-label="Plan du site">
          {GROUPS.map((g) => (
            <div key={g.title} className={styles.group}>
              <span className={styles.groupTitle}>{g.title}</span>
              <ul className={styles.links}>
                {g.links.map(([href, label]) => (
                  <li key={href}><Link href={href} className={styles.link}>{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContent}`}>
          <span>© {new Date().getFullYear()} Bellechasse Énergie. Tous droits réservés. Licence RBQ {RBQ}</span>
          <span className={styles.bottomLinks}>
            <Link href="/confidentialite" className={styles.bottomLink}>Politique de confidentialité</Link>
            <ManageCookiesButton className={styles.bottomLink} />
          </span>
        </div>
      </div>
    </footer>
  );
}
