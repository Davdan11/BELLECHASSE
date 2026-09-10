"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './SolutionsHero.module.css';

export default function SolutionsHero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.content}`}>

        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.breadcrumb}>
            <Link href="/">Accueil</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>Nos solutions</span>
          </div>

          <span className={styles.label}>LE CONFORT, SUR MESURE</span>

          <h1 className={styles.title}>
            À chaque maison,<br />
            la bonne solution.
          </h1>

          <p className={styles.desc}>
            Thermopompes, climatisation, chauffage<br />
            et ventilation. Découvrez les systèmes<br />
            qui répondent aux besoins de votre maison.
          </p>

          <p className={styles.territory}>
            Grand Montréal <span>·</span> Laval <span>·</span> Rive-Nord <span>·</span> Rive-Sud
          </p>
        </motion.div>

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
