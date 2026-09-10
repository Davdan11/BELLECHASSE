'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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
            <Image src="/section-5-img.webp" alt="Unités extérieures de thermopompes centrales Daikin" width={754} height={551} sizes="(max-width: 1024px) 100vw, 50vw" className={styles.image} />
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
              <Image src="/marqee-3.webp" alt="Logo Daikin" width={319} height={67} className={styles.daikinLogo} style={{ width: '150px', height: 'auto', objectFit: 'contain' }} />
            </div>

            <h2>Détaillant autorisé Daikin.</h2>
            
            <div className={styles.content}>
              <p>Des équipements sélectionnés<br />pour les besoins de votre maison.</p>
            </div>

            <div className={styles.certifications}>
              <div className={styles.certifItem}>
                <Image src="/logo-cmmtq.webp" alt="Logo CMMTQ, Corporation des maîtres mécaniciens en tuyauterie du Québec" width={186} height={64} className={styles.certifIcon} />
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
