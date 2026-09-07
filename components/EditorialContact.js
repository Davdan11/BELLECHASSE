"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './EditorialContact.module.css';

export default function EditorialContact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={`container ${styles.content}`}>
        
        <div className={styles.topRow}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Parlons de<br />votre confort.
          </motion.h2>
          <motion.svg 
            className={styles.bigArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: "backOut" }}
          >
            <path d="M5 19L19 5M19 5v14M19 5H5" />
          </motion.svg>
        </div>

        <motion.div 
          className={styles.bottomRow}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        >
          <Link href="#soumission" className={styles.btn}>
            Demander une soumission
            <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </Link>
          <a href="tel:(514)494-0400" className={styles.phone}>(514) 494-0400</a>
        </motion.div>
        
      </div>
    </section>
  );
}
