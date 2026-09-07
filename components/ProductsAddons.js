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
            <span className={styles.label}>COMPLÉTER VOTRE SYSTÈME</span>
            <h2 className={styles.title}>
              La chaleur.<br />Et le bon air.
            </h2>
          </div>

          <div className={styles.list}>
            {/* Item 05 */}
            <div className={styles.listItem}>
              <div className={styles.itemHeader}>
                <span className={styles.number}>05</span>
                <div className={styles.icon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                    <path d="M12 12v9"></path>
                    <path d="m8 17 4 4 4-4"></path>
                  </svg>
                </div>
              </div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>Fournaise à air pulsé</h3>
                <p className={styles.itemDesc}>Un chauffage distribué par le réseau de conduits.</p>
              </div>
              <Link href="/produits/fournaise-air-pulse" className={styles.link}>
                Explorer les fournaises
                <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 19L19 5M19 5v14M19 5H5" />
                </svg>
              </Link>
            </div>

            {/* Item 06 */}
            <div className={styles.listItem}>
              <div className={styles.itemHeader}>
                <span className={styles.number}>06</span>
                <div className={styles.icon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                  </svg>
                </div>
              </div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>Échangeur d'air</h3>
                <p className={styles.itemDesc}>Renouveler l'air à l'intérieur de votre maison.</p>
              </div>
              <Link href="/produits/echangeur-air" className={styles.link}>
                Explorer les échangeurs<br />d'air
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
            <img src="/produit-5.webp" alt="Échangeur d'air Aldes" />
          </div>
          <div className={styles.imageCaption}>
            VENTILATION &bull; ÉCHANGEUR D'AIR
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
