"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactRequestForm from './ContactRequestForm';
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, ADDRESS, MAPS_EMBED_URL, MAPS_LINK_URL } from '../lib/site';
import styles from './ContactHero.module.css';

export default function ContactHero() {
  return (
    <section className={styles.section}>
      <div className="container">

        <div className={styles.breadcrumb}>
          <Link href="/">Accueil</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Contact</span>
        </div>

        <div className={styles.headerRow}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className={styles.eyebrow}>PARLONS DE VOTRE PROJET</span>
            <h1 className={styles.title}>
              Le confort commence<br />
              par une conversation.
            </h1>
          </motion.div>

          <motion.svg
            className={styles.bigArrow}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "backOut" }}
            aria-hidden="true"
          >
            <path d="M5 19L19 5M19 5v14M19 5H5" />
          </motion.svg>
        </div>

        <div className={styles.grid}>
          {/* Left column: info */}
          <motion.aside
            className={styles.info}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <p className={styles.intro}>
              Une question, un projet ou besoin d&apos;un conseil?<br />
              Notre équipe est là pour vous accompagner.
            </p>

            <span className={styles.label}>01 / NOUS JOINDRE</span>
            <a href={`tel:${PHONE_TEL}`} className={styles.phone}>{PHONE_DISPLAY}</a>
            <p className={styles.phoneNote}>
              Échangez avec notre équipe.
              {EMAIL && <><br /><a href={`mailto:${EMAIL}`} className={styles.inlineLink}>{EMAIL}</a></>}
            </p>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Nos horaires</h2>
              <p className={styles.blockText}>
                Lundi au vendredi <span className={styles.dot}>·</span> 8 h à 17 h<br />
                Samedi et dimanche : fermé
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Vous préférez choisir votre plage horaire?</h2>
              <p className={styles.blockText}>
                <Link href="/rendez-vous" className={styles.inlineLink}>Réservez en ligne la visite d&apos;un conseiller</Link>, selon les horaires de votre secteur.
              </p>
            </div>

            {ADDRESS && (
              <div className={styles.block}>
                <h2 className={styles.blockTitle}>Notre adresse</h2>
                <p className={styles.blockText}>
                  <a href={MAPS_LINK_URL} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                    {ADDRESS.street}<br />{ADDRESS.city} (Québec) {ADDRESS.postalCode}
                  </a>
                  {ADDRESS.borough && <><br />{ADDRESS.borough}</>}
                </p>
              </div>
            )}

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Notre territoire</h2>
              <p className={styles.blockText}>Nous nous déplaçons chez vous : Montréal, Laval, Rive-Nord et Rive-Sud.</p>
            </div>

            <div className={styles.map}>
              <iframe
                src={MAPS_EMBED_URL}
                title="Carte : Bellechasse Énergie, 9257 rue de Marseille, Montréal"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.aside>

          {/* Right column: form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          >
            <ContactRequestForm />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
