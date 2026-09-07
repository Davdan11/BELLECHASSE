"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './ProductsCTA.module.css';

export default function ProductsCTA() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        
        <motion.div 
          className={styles.leftCol}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <h2 className={styles.title}>
            Lequel convient<br />à votre maison?
          </h2>
          
          <div className={styles.actions}>
            <Link href="/soumission" className={styles.button}>
              Demander une soumission
              <svg className={styles.btnArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 19L19 5M19 5v14M19 5H5" />
              </svg>
            </Link>
            <a href="tel:5144940400" className={styles.phone}>
              (514) 494-0400
            </a>
          </div>
        </motion.div>

        <motion.div 
          className={styles.rightCol}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <p className={styles.text}>
            Notre équipe vous accompagne<br />dans le choix de votre système.
          </p>
          
          <div className={styles.bigArrowContainer}>
            <svg className={styles.bigArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
              <path d="M5 19L19 5M19 5v14M19 5H5" />
            </svg>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
