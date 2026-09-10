"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import BookingWizard from './BookingWizard';
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/site';
import styles from './ContactHero.module.css';
import own from './BookingHero.module.css';

const STEPS = [
  { n: '01', title: 'Vous choisissez', text: 'Votre secteur, la journée et la plage horaire qui vous conviennent.' },
  { n: '02', title: 'Le conseiller se déplace', text: 'Il mesure la maison, examine l’installation actuelle et écoute vos besoins. Environ 90 minutes.' },
  { n: '03', title: 'Vous recevez un prix ferme', text: 'Une soumission détaillée, les subventions applicables et nos options de financement. Sans engagement.' },
];

export default function BookingHero() {
  return (
    <section className={styles.section}>
      <div className="container">

        <div className={styles.breadcrumb}>
          <Link href="/">Accueil</Link>
          <span className={styles.separator}>/</span>
          <Link href="/contact">Contact</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Rendez-vous</span>
        </div>

        <div className={styles.headerRow}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
            <span className={styles.eyebrow}>VISITE D’UN CONSEILLER</span>
            <h1 className={styles.title}>
              Choisissez le moment.<br />
              On s’occupe du reste.
            </h1>
          </motion.div>

          <motion.svg
            className={styles.bigArrow}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'backOut' }}
            aria-hidden="true"
          >
            <path d="M5 19L19 5M19 5v14M19 5H5" />
          </motion.svg>
        </div>

        <div className={styles.grid}>
          <motion.aside
            className={styles.info}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            <p className={styles.intro}>
              Réservez en ligne la visite gratuite d&apos;un conseiller, selon nos horaires dans votre secteur.
              Vous recevez une confirmation immédiate.
            </p>

            <ol className={own.how}>
              {STEPS.map((s) => (
                <li key={s.n} className={own.howItem}>
                  <span className={own.howNum}>{s.n}</span>
                  <div>
                    <h2 className={own.howTitle}>{s.title}</h2>
                    <p className={own.howText}>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Horaires des visites</h2>
              <p className={styles.blockText}>
                Lundi au vendredi <span className={styles.dot}>·</span> 8 h à 17 h<br />
                Plages de deux heures, réservation au moins 24 h à l&apos;avance.
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Vous préférez parler à quelqu&apos;un?</h2>
              <p className={styles.blockText}>
                <a href={`tel:${PHONE_TEL}`} className={own.phone}>{PHONE_DISPLAY}</a><br />
                ou <Link href="/contact" className={own.link}>demandez qu&apos;on vous rappelle</Link>.
              </p>
            </div>
          </motion.aside>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}>
            <BookingWizard />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
