"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './EditorialSolutions.module.css';

export default function EditorialSolutions() {
  const [activeIndex, setActiveIndex] = useState(0);

  const solutions = [
    {
      title: "Thermopompes centrales",
      desc: "Le confort dans toute la maison.",
    },
    {
      title: "Thermopompes murales",
      desc: "Le confort pièce par pièce.",
    },
    {
      title: "Climatisation",
      desc: "Fraîcheur optimale pour l'été.",
    },
    {
      title: "Ventilation",
      desc: "Une qualité d'air exceptionnelle.",
    }
  ];

  return (
    <section id="solutions" className={styles.section}>
      <div className={`container ${styles.content}`}>
        
        {/* Left Column: Title and Image */}
        <motion.div 
          className={styles.leftCol}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className={styles.sectionLabel}>01 / NOS SOLUTIONS</span>
          <h2 className={styles.title}>
            Chaque maison.<br />Son système.
          </h2>
          
          <div className={styles.imageWrapper}>
            <span className={styles.imageLabel}>DAIKIN / SYSTÈME CENTRAL</span>
            <img src="/section-5-img.webp" alt="Système central Daikin" className={styles.image} />
          </div>
        </motion.div>

        {/* Right Column: Description and List */}
        <motion.div 
          className={styles.rightCol}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p className={styles.desc}>
            Le bon équipement commence par une bonne compréhension de votre maison.
          </p>

          <div className={styles.list}>
            {solutions.map((item, idx) => (
              <Link 
                key={idx} 
                href={`#${item.title.toLowerCase().replace(/ /g, '-')}`}
                className={`${styles.listItem} ${activeIndex === idx ? styles.active : ''}`}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                <div className={styles.itemLeft}>
                  <span className={styles.number}>0{idx + 1}</span>
                  <div className={styles.itemText}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    {activeIndex === idx && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className={styles.itemDesc}
                      >
                        {item.desc}
                      </motion.p>
                    )}
                  </div>
                </div>
                <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
