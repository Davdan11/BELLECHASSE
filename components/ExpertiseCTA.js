'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './ExpertiseCTA.module.css';

export default function ExpertiseCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Votre projet mérite<br />notre expérience.
          </motion.h2>

          <motion.div 
            className={styles.actions}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/contact" className={styles.button}>
              Parlons de votre projet
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="19" x2="19" y2="5"></line>
                <polyline points="9 5 19 5 19 15"></polyline>
              </svg>
            </Link>
            <span className={styles.phone}>(514) 494-0400</span>
          </motion.div>

          <motion.div 
            className={styles.locations}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Grand Montréal <span className={styles.dot}>•</span> Laval <span className={styles.dot}>•</span> Rive-Nord <span className={styles.dot}>•</span> Rive-Sud
          </motion.div>
        </div>

        <motion.div 
          className={styles.rightContent}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <svg className={styles.bigArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <line x1="2" y1="22" x2="22" y2="2"></line>
            <polyline points="10 2 22 2 22 14"></polyline>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
