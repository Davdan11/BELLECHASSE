"use client";
import Link from 'next/link';
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
            Les bons produits.<br />
            Pour votre maison.
          </h1>
          
          <p className={styles.desc}>
            Chauffage, climatisation et ventilation :<br />
            explorez les systèmes adaptés à votre espace.
          </p>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div 
          className={styles.imageContent}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <img src="/produit-1.webp" alt="Thermopompes centrales Daikin" className={styles.image} />
        </motion.div>
        
      </div>
    </section>
  );
}
