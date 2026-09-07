"use client";
import { motion } from 'framer-motion';
import styles from './EditorialCharity.module.css';

export default function EditorialCharity() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.content}`}>
        
        <motion.div 
          className={styles.leftCol}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src="/logo-fondation-bruneau.webp" alt="Fondation Charles-Bruneau" className={styles.logo} />
          
          <div className={styles.textWrapper}>
            <h2 className={styles.title}>Un geste qui compte.</h2>
            <p className={styles.desc}>
              Pour chaque produit Daikin vendu, nous remettons 5 $ à la Fondation Charles-Bruneau.
            </p>
          </div>
        </motion.div>

        <motion.div 
          className={styles.amount}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 50, damping: 10, delay: 0.2 }}
        >
          5$
        </motion.div>

      </div>
    </section>
  );
}
