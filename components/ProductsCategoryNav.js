"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './ProductsCategoryNav.module.css';

const categories = [
  { id: "01", name: "Thermopompe centrale", link: "/produits/thermopompe-centrale" },
  { id: "02", name: "Thermopompe murale", link: "/produits/thermopompe-murale" },
  { id: "03", name: "Air climatisé central", link: "/produits/air-climatise-central" },
  { id: "04", name: "Air climatisé mural", link: "/produits/air-climatise-mural" },
  { id: "05", name: "Fournaise à air pulsé", link: "/produits/fournaise-air-pulse" },
  { id: "06", name: "Échangeur d'air", link: "/produits/echangeur-air" },
];

export default function ProductsCategoryNav() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section className={styles.navSection}>
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categories.map((cat, i) => (
            <motion.div variants={itemVariants} key={cat.id}>
              <Link href={cat.link} className={styles.card}>
                <div className={styles.leftSide}>
                  <span className={styles.number}>{cat.id}</span>
                  <span className={styles.name}>{cat.name}</span>
                </div>
                <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 19L19 5M19 5v14M19 5H5" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
