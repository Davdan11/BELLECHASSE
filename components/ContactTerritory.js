"use client";
import { motion } from 'framer-motion';
import styles from './ContactTerritory.module.css';

const CITIES = ['Montréal', 'Laval', 'Rive-Nord', 'Rive-Sud'];

export default function ContactTerritory() {
  return (
    <section className={styles.section} id="territoire">
      <div className={styles.grid}>
        <motion.div
          className={styles.text}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className={styles.eyebrow}>02 / PRÈS DE CHEZ VOUS</span>
          <h2 className={styles.title}>
            Le Grand Montréal.<br />
            Notre terrain de confiance.
          </h2>
          <p className={styles.desc}>Installation, chauffage, climatisation et ventilation.</p>
        </motion.div>

        <motion.div
          className={styles.photo}
          role="img"
          aria-label="Vue du centre-ville de Montréal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className={styles.cities}>
        <div className={`container ${styles.citiesRow}`}>
          {CITIES.map((c, i) => (
            <span key={c} className={styles.city}>
              {c}
              {i < CITIES.length - 1 && <span className={styles.dot} aria-hidden="true">·</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
