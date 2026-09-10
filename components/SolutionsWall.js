"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './SolutionsWall.module.css';

export default function SolutionsWall() {
  return (
    <section id="thermopompes-murales" className={styles.section}>
      <div className={`container ${styles.grid}`}>

        <motion.div
          className={styles.textCol}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className={styles.eyebrow}>02 / THERMOPOMPES MURALES</span>
          <h2 className={styles.title}>
            Le confort,<br />
            pièce par pièce.
          </h2>
          <p className={styles.desc}>
            Découvrez les systèmes muraux<br />
            pour les espaces sans conduits.
          </p>

          <div className={styles.models}>
            <Link href="/produits/thermopompe-murale#daikin-atmosphera" className={styles.model}>Daikin Atmosphera</Link>
            <Link href="/produits/thermopompe-murale#multizones" className={styles.model}>Systèmes multizones</Link>
          </div>

          <Link href="/produits/thermopompe-murale" className={styles.button}>
            Voir les thermopompes murales
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 19L19 5M19 5v14M19 5H5" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          className={styles.imageCol}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <Image src="/solution-murale.png" alt="Thermopompe murale Daikin, unité intérieure" width={423} height={233} sizes="(max-width: 768px) 100vw, 560px" className={styles.image} />
          <span className={styles.giant} aria-hidden="true">02</span>
          <span className={styles.caption}>
            Un système pensé<br />pour votre espace
          </span>
        </motion.div>

      </div>
    </section>
  );
}
