"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './EditorialDaikin.module.css';

export default function EditorialDaikin() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.content}`}>
        
        {/* Left Column: Image */}
        <motion.div 
          className={styles.leftCol}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image src="/section-5-img.webp" alt="Deux unités extérieures de thermopompes centrales Daikin" width={754} height={551} sizes="(max-width: 1024px) 100vw, 55vw" className={styles.image} />
        </motion.div>

        {/* Right Column: Content */}
        <motion.div 
          className={styles.rightCol}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className={styles.sectionLabel}>04 / L&apos;EXPERTISE DAIKIN</span>
          <Image src="/daikin-12-ans.webp" alt="Daikin – garantie 12 ans" width={488} height={72} className={styles.logo} />
          
          <h2 className={styles.title}>
            Détaillant autorisé.<br />Confort maîtrisé.
          </h2>
          
          <p className={styles.desc}>
            Service d&apos;installation de thermopompes dans le Grand Montréal.
          </p>
          
          <Link href="/produits/thermopompe-centrale" className={styles.btn}>
            Découvrir Daikin
            <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 19L19 5M19 5v14M19 5H5" />
            </svg>
          </Link>
          
          <div className={styles.process}>
            <span>Conseil</span>
            <div className={styles.processLine}></div>
            <span>Installation</span>
            <div className={styles.processLine}></div>
            <span>Entretien</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
