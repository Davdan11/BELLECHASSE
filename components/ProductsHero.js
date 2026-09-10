"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './ProductsHero.module.css';

export default function ProductsHero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.content}`}>

        {/* Left Column - Text */}
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.breadcrumb}>
            <Link href="/">Accueil</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>Produits</span>
          </div>

          <span className={styles.label}>LE CONFORT, BIEN ÉQUIPÉ</span>

          <h1 className={styles.title}>
            Thermopompes, climatisation<br />
            et chauffage pour votre maison.
          </h1>

          <p className={styles.desc}>
            Chauffage, climatisation et ventilation :<br />
            explorez les systèmes adaptés à votre espace.
          </p>
        </motion.div>

        {/* Right Column - Composed product images */}
        <motion.div
          className={styles.imageContent}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <Image src="/produit-2.webp" alt="Thermopompe murale Daikin, unité intérieure" width={672} height={250} sizes="(max-width: 768px) 46vw, 25vw" className={styles.wallUnit} />
          <Image src="/produit-1.webp" alt="Thermopompes centrales Daikin, unités extérieures" width={672} height={250} sizes="(max-width: 768px) 100vw, 50vw" className={styles.outdoorUnits} loading="eager" />
        </motion.div>

      </div>
    </section>
  );
}
