"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './ProductsCooling.module.css';

export default function ProductsCooling() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        
        {/* Left Side: Header & Giant Text */}
        <motion.div 
          className={styles.leftColumn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <div className={styles.headerArea}>
            <span className={styles.label}>CLIMATISATION</span>
            <h2 className={styles.title}>
              L'été, à la bonne<br />température.
            </h2>
          </div>
          <div className={styles.giantText}>AIR</div>
        </motion.div>

        {/* Right Side: Two Cards */}
        <div className={styles.rightColumn}>
          {/* Card 03 */}
          <motion.div 
            className={styles.card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className={styles.cardText}>
              <span className={styles.number}>03</span>
              <h3 className={styles.cardTitle}>Air climatisé central</h3>
              <p className={styles.cardDesc}>La climatisation distribuée par conduits.</p>
              
              <Link href="/produits/air-climatise-central" className={styles.link}>
                Découvrir les systèmes<br />centraux
                <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 19L19 5M19 5v14M19 5H5" />
                </svg>
              </Link>
            </div>
            <div className={styles.imageWrapper}>
              <img src="/produit-3.webp" alt="Air climatisé central" />
            </div>
          </motion.div>

          {/* Card 04 */}
          <motion.div 
            className={`${styles.card} ${styles.cardLast}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className={styles.cardText}>
              <span className={styles.number}>04</span>
              <h3 className={styles.cardTitle}>Air climatisé mural</h3>
              <p className={styles.cardDesc}>La fraîcheur dans une pièce ou un espace.</p>
              
              <Link href="/produits/air-climatise-mural" className={styles.link}>
                Découvrir les systèmes<br />muraux
                <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 19L19 5M19 5v14M19 5H5" />
                </svg>
              </Link>
            </div>
            <div className={styles.imageWrapper}>
              <img src="/produit-4-new.png" alt="Air climatisé mural" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
