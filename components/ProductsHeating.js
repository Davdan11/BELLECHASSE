"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './ProductsHeating.module.css';

export default function ProductsHeating() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>

        {/* Left: header + card 01 */}
        <div className={styles.leftCol}>
          <motion.div
            className={styles.header}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <span className={styles.label}>CHAUFFER ET CLIMATISER</span>
            <h2 className={styles.title}>
              Deux façons de trouver<br />
              votre équilibre.
            </h2>
          </motion.div>

          <motion.div
            className={styles.cardLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className={styles.cardContentLeft}>
              <span className={styles.number}>01</span>
              <h3 className={styles.cardTitle}>Thermopompe<br />centrale</h3>
              <p className={styles.cardDesc}>Un système central<br />pour toute la maison.</p>

              <Link href="/produits/thermopompe-centrale" className={styles.link}>
                <span>Voir les thermopompes<br />centrales</span>
                <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 19L19 5M19 5v14M19 5H5" />
                </svg>
              </Link>
            </div>
            <div className={styles.imageWrapperLeft}>
              <Image src="/produit-1.webp" alt="Thermopompe centrale Daikin, unités extérieures" width={672} height={250} sizes="(max-width: 768px) 100vw, 520px" />
            </div>
          </motion.div>
        </div>

        {/* Right: card 02 */}
        <motion.div
          className={styles.cardRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <div className={styles.imageWrapperRight}>
            <Image src="/produit-2.webp" alt="Thermopompe murale Daikin, unité intérieure" width={672} height={250} sizes="(max-width: 768px) 100vw, 380px" />
          </div>
          <div className={styles.cardContentRight}>
            <span className={styles.number}>02</span>
            <h3 className={styles.cardTitle}>Thermopompe murale</h3>
            <p className={styles.cardDesc}>Une solution pour les<br />espaces sans conduits.</p>

            <Link href="/produits/thermopompe-murale" className={styles.link}>
              <span>Voir les thermopompes<br />murales</span>
              <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 19L19 5M19 5v14M19 5H5" />
              </svg>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
