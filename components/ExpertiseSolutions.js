'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './ExpertiseSolutions.module.css';

export default function ExpertiseSolutions() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.imageColumn}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.imageWrapper}>
            <img src="/section-5-img.webp" alt="Machine Daikin" className={styles.image} />
          </div>
        </motion.div>

        <div className={styles.textColumn}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className={styles.eyebrow}>04 / DES SOLUTIONS RECONNUES</p>
            
            <div className={styles.daikinLogoWrapper}>
              <img src="/marqee-3.webp" alt="Daikin" className={styles.daikinLogo} style={{ width: '150px', objectFit: 'contain' }} />
            </div>

            <h2>Détaillant autorisé Daikin.</h2>
            
            <div className={styles.content}>
              <p>Des équipements sélectionnés<br />pour les besoins de votre maison.</p>
            </div>

            <div className={styles.certifications}>
              <div className={styles.certifItem}>
                <img src="/logo-cmmtq.webp" alt="CMMTQ" className={styles.certifIcon} />
              </div>
              <div className={styles.certifText}>
                RBQ 8103-2112-33
              </div>
            </div>

            <Link href="/produits" className={styles.link}>
              Explorer nos produits
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="19" x2="19" y2="5"></line>
                <polyline points="9 5 19 5 19 15"></polyline>
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
