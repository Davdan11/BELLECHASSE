'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './ExpertiseHero.module.css';

export default function ExpertiseHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/">Accueil</Link>
          <span className={styles.separator}>/</span>
          <span>Notre expertise</span>
        </div>

        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <motion.p 
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              L&apos;EXPERTISE BELLECHASSE
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Le savoir-faire en chauffage et climatisation<br />
              se transmet depuis 1962.
            </motion.h1>
            <motion.p 
              className={styles.description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Une entreprise familiale. Trois générations.<br />
              Un même engagement envers votre confort.
            </motion.p>
          </div>

          <div className={styles.rightColumn}>
            <motion.div 
              className={styles.yearWrapper}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className={styles.depuis}>DEPUIS</span>
              <span className={styles.year}>1962</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
