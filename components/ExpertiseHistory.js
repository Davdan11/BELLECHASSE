'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './ExpertiseHistory.module.css';

export default function ExpertiseHistory() {
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
          <img src="/section-2.webp" alt="L'équipe Bellechasse Énergie au comptoir" className={styles.image} />
        </motion.div>

        <div className={styles.textColumn}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className={styles.eyebrow}>01 / UNE HISTOIRE DE FAMILLE</p>
            <h2>Des racines solides.<br />Le regard tourné vers demain.</h2>
            
            <div className={styles.content}>
              <p>Jacques fonde Bellechasse en 1962. Daniel poursuit l'aventure, puis Nicolas prend le relais.</p>
              <p>La proximité et le travail bien fait restent au cœur de notre métier.</p>
            </div>

            <Link href="/#temoignages" className={styles.link}>
              Découvrir les témoignages
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
