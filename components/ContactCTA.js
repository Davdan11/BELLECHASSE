"use client";
import { motion } from 'framer-motion';
import styles from './ContactCTA.module.css';

export default function ContactCTA() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.row}`}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          Bien vous conseiller.<br />
          Bien vous accompagner.
        </motion.h2>

        <motion.p
          className={styles.text}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          De votre première question<br />
          à votre installation.
        </motion.p>

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
