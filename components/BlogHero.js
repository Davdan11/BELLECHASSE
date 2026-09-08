"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './BlogHero.module.css';

export default function BlogHero() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href="/">Accueil</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Blogue</span>
        </div>

        <div className={styles.row}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className={styles.eyebrow}>LE JOURNAL BELLECHASSE</span>
            <h1 className={styles.title}>
              Le confort,<br />
              ça se comprend.
            </h1>
          </motion.div>

          <motion.div
            className={styles.aside}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <p className={styles.desc}>
              Des conseils et des repères<br />
              pour choisir, entretenir et<br />
              mieux connaître votre système.
            </p>
            <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
              <path d="M5 19L19 5M19 5v14M19 5H5" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
