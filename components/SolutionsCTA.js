"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './SolutionsCTA.module.css';

export default function SolutionsCTA() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.row}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>
            Le bon système commence<br />
            par une conversation.
          </h2>
          <p className={styles.desc}>Parlez-nous de votre maison. Notre équipe vous aidera à choisir.</p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.button}>
              Demander une soumission
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 19L19 5M19 5v14M19 5H5" />
              </svg>
            </Link>
            <a href="tel:+15144940400" className={styles.phone}>(514) 494-0400</a>
          </div>
        </motion.div>

        <motion.svg
          className={styles.arrow}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "backOut" }}
          aria-hidden="true"
        >
          <path d="M5 19L19 5M19 5v14M19 5H5" />
        </motion.svg>
      </div>
    </section>
  );
}
