"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './EditorialFinancing.module.css';

export default function EditorialFinancing() {
  return (
    <section id="financement" className={styles.section}>
      <div className={`container ${styles.content}`}>
        
        <motion.div 
          className={styles.leftCol}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className={styles.sectionLabel}>06 / FINANCEMENT</span>
          <h2 className={styles.title}>
            Votre confort.<br />À votre rythme.
          </h2>
          <motion.svg 
            className={styles.bigArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: "backOut" }}
          >
            <path d="M5 19L19 5M19 5v14M19 5H5" />
          </motion.svg>
        </motion.div>

        <motion.div 
          className={styles.rightCol}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p className={styles.desc}>
            Découvrez les options de financement, les subventions et nos promotions pour concrétiser votre projet.
          </p>

          <div className={styles.actions}>
            <Link href="/financement" className={styles.btn}>
              Financement et subventions
              <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </Link>
            
            <Link href="/blogue/subventions-thermopompe-quebec" className={styles.link}>
              Comprendre les subventions
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 19L19 5M19 5v14M19 5H5" />
              </svg>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
