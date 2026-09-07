"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './EditorialHero.module.css';

export default function EditorialHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className={styles.hero}>
      {/* Background Image */}
      <img src="/hero.jpg" alt="Le confort maîtrisé - Bellechasse Énergie" className={styles.bg} />
      <div className={styles.overlay}></div>

      {/* Main Content */}
      <motion.div 
        className={`container ${styles.content}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={itemVariants} className={styles.subtitle}>CHAUFFAGE. CLIMATISATION. VENTILATION.</motion.span>
        
        <motion.h1 variants={itemVariants} className={styles.title}>
          Le confort,<br />
          maîtrisé.
        </motion.h1>
        
        <motion.p variants={itemVariants} className={styles.desc}>
          Des systèmes bien choisis.<br />
          Une installation qui fait la différence.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <Link href="#solutions" className={styles.btn}>
            Découvrir nos solutions
            <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div 
        className={styles.bottomBar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className={`container ${styles.bottomContent}`}>
          <div>BELLECHASSE ÉNERGIE</div>
          <div>Le Grand Montréal, depuis 1962.</div>
          <motion.svg 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className={styles.downArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </motion.svg>
        </div>
      </motion.div>
    </section>
  );
}
