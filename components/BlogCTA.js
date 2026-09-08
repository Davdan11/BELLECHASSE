"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './BlogCTA.module.css';

export default function BlogCTA({ eyebrow = '02 / PASSER À L’ACTION' }) {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.row}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>
            Une question?<br />
            Parlons de votre confort.
          </h2>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className={styles.text}>
            Notre équipe vous accompagne<br />
            pour trouver une solution adaptée<br />
            à votre maison.
          </p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.button}>
              Parler à un conseiller
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 19L19 5M19 5v14M19 5H5" />
              </svg>
            </Link>
            <a href="tel:+15144940400" className={styles.phone}>(514) 494-0400</a>
          </div>
        </motion.div>

        <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
          <path d="M5 19L19 5M19 5v14M19 5H5" />
        </svg>
      </div>
    </section>
  );
}
