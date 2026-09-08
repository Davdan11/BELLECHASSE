"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './SolutionsCentral.module.css';

const MODELS = [
  { name: 'Daikin Fit', href: '/produits/thermopompe-centrale#daikin-fit' },
  { name: 'Daikin Skyair', href: '/produits/thermopompe-centrale#daikin-skyair' },
];

export default function SolutionsCentral() {
  return (
    <section id="thermopompes-centrales" className={styles.section}>
      <div className={`container ${styles.grid}`}>

        <motion.div
          className={styles.imageCol}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className={styles.imageLabel}>SYSTÈMES CENTRAUX</span>
          <img src="/solution-centrale.png" alt="Thermopompes centrales Daikin" className={styles.image} />
        </motion.div>

        <motion.div
          className={styles.textCol}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <span className={styles.eyebrow}>01 / THERMOPOMPES CENTRALES</span>
          <h2 className={styles.title}>
            Un confort qui<br />
            fait toute la maison.
          </h2>
          <p className={styles.desc}>
            Explorez les thermopompes centrales et les<br />
            solutions adaptées aux maisons avec conduits.
          </p>

          <ul className={styles.list}>
            {MODELS.map((m) => (
              <li key={m.name}>
                <Link href={m.href} className={styles.item}>
                  <span>{m.name}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 19L19 5M19 5v14M19 5H5" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/produits/thermopompe-centrale" className={styles.button}>
            Découvrir les systèmes centraux
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 19L19 5M19 5v14M19 5H5" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
