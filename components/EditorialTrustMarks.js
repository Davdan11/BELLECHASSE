"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GOOGLE_RATING, SOCIAL } from '../lib/site';
import styles from './EditorialTrustMarks.module.css';

export default function EditorialTrustMarks() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.content}`}>
        <span className={styles.label}>DES MARQUES DE CONFIANCE</span>
        
        <motion.div 
          className={styles.logos}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Moovair */}
          <Image src="/marqee-7.webp" alt="Logo Moovair, thermopompes" width={418} height={87} />
          
          {/* Tosot */}
          <Image src="/marqee-2.webp" alt="Logo Tosot, climatisation" width={139} height={87} className={styles.scaleUp} />
          
          {/* Daikin */}
          <Image src="/marqee-3.webp" alt="Logo Daikin, détaillant autorisé" width={319} height={67} />
          
          {/* Aldes */}
          <Image src="/marqee-6.webp" alt="Logo Aldes, ventilation" width={290} height={87} className={styles.scaleUp} />
          
          {/* CMMTQ */}
          <Image src="/logo-cmmtq.webp" alt="Logo CMMTQ, Corporation des maîtres mécaniciens en tuyauterie du Québec" width={186} height={64} />
          
          <span className={styles.rbq}>RBQ 8103-2112-33</span>

          {GOOGLE_RATING.value && (
            <a href={GOOGLE_RATING.url || SOCIAL.googleBusiness} className={styles.google} target="_blank" rel="noopener noreferrer" aria-label={`Note Google ${String(GOOGLE_RATING.value).replace('.', ',')} sur 5, ${GOOGLE_RATING.count} avis`}>
              <span className={styles.googleValue}>{String(GOOGLE_RATING.value).replace('.', ',')}</span>
              <span className={styles.googleStars} aria-hidden="true">★★★★★</span>
              <span className={styles.googleCount}>{GOOGLE_RATING.count} avis Google</span>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
