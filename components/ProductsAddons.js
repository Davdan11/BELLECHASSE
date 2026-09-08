"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './ProductsAddons.module.css';

export default function ProductsAddons() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>

        {/* Left Column */}
        <motion.div
          className={styles.leftColumn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <div className={styles.header}>
            <span className={styles.label}>COMPLÉTER<br />VOTRE SYSTÈME</span>
            <h2 className={styles.title}>
              La chaleur.<br />Et le bon air.
            </h2>
          </div>

          <div className={styles.list}>
            {/* Item 05 */}
            <div className={styles.listItem}>
              <span className={styles.number}>05</span>
              <div className={styles.icon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h11a3 3 0 1 0-3-3" />
                  <path d="M3 13h15a3 3 0 1 1-3 3" />
                  <path d="M3 18h7a2 2 0 1 1-2 2" />
                </svg>
              </div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>Fournaise à air pulsé</h3>
                <p className={styles.itemDesc}>Un chauffage distribué par le<br />réseau de conduits.</p>
              </div>
              <Link href="/produits/fournaise-air-pulse" className={styles.link}>
                <span>Explorer les fournaises</span>
                <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 19L19 5M19 5v14M19 5H5" />
                </svg>
              </Link>
            </div>

            {/* Item 06 */}
            <div className={styles.listItem}>
              <span className={styles.number}>06</span>
              <div className={styles.icon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12a8 8 0 0 1-14.5 4.6" />
                  <path d="M4 12a8 8 0 0 1 14.5-4.6" />
                  <path d="M18.5 3.5v4h-4" />
                  <path d="M5.5 20.5v-4h4" />
                </svg>
              </div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>Échangeur d&apos;air</h3>
                <p className={styles.itemDesc}>Renouveler l&apos;air à l&apos;intérieur<br />de votre maison.</p>
              </div>
              <Link href="/produits/echangeur-air" className={styles.link}>
                <span>Explorer les échangeurs<br />d&apos;air</span>
                <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 19L19 5M19 5v14M19 5H5" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          className={styles.rightColumn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <div className={styles.imageWrapper}>
            <img src="/tab-aldes.webp" alt="Échangeur d'air Aldes" />
          </div>
          <div className={styles.imageCaption}>
            VENTILATION &middot; ÉCHANGEUR D&apos;AIR
          </div>
        </motion.div>

      </div>
    </section>
  );
}
