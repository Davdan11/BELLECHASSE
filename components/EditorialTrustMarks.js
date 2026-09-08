"use client";
import { motion } from 'framer-motion';
import styles from './EditorialTrustMarks.module.css';

export default function EditorialTrustMarks() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.content}`}>
        <span className={styles.label}>DES MARQUES DE CONFIANCE</span>
        
        <motion.div 
          className={styles.logos}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Moovair */}
          <img src="/marqee-7.webp" alt="Moovair" />
          
          {/* Tosot */}
          <img src="/marqee-2.webp" alt="Tosot" className={styles.scaleUp} />
          
          {/* Daikin */}
          <img src="/marqee-3.webp" alt="Daikin" />
          
          {/* Aldes */}
          <img src="/marqee-6.webp" alt="Aldes" className={styles.scaleUp} />
          
          {/* CMMTQ */}
          <img src="/logo-cmmtq.webp" alt="CMMTQ" />
          
          <span className={styles.rbq}>RBQ 8103-2112-33</span>
        </motion.div>
      </div>
    </section>
  );
}
