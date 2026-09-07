"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './EditorialExpertise.module.css';

export default function EditorialExpertise() {
  return (
    <section id="expertise" className={styles.section}>
      {/* Absolute image on the far left */}
      <motion.img 
        src="/section-2.webp" 
        alt="Expertise Bellechasse" 
        className={styles.sideImage}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      <div className={`container ${styles.content}`}>
        
        {/* Left Column */}
        <motion.div 
          className={styles.leftColumn}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.yearText}>1962</div>
          <p className={styles.leftDesc}>Une histoire de famille.</p>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          className={styles.rightColumn}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className={styles.sectionLabel}>02 / L'EXPERTISE BELLECHASSE</span>
          <h2 className={styles.title}>
            Trois générations.<br />La même exigence.
          </h2>
          <p className={styles.desc}>
            Une entreprise familiale au service du confort des foyers du Grand Montréal.
          </p>
          
          <div className={styles.process}>
            <span>Conseiller</span>
            <div className={styles.processLine}></div>
            <span>Installer</span>
            <div className={styles.processLine}></div>
            <span>Entretenir</span>
          </div>
          
          <Link href="/a-propos" className={styles.link}>
            Rencontrer Bellechasse
            <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
