'use client';

import { motion } from 'framer-motion';
import styles from './ExpertiseTimeline.module.css';

const timelineData = [
  {
    year: "1962",
    title: "Les débuts",
    desc: "Jacques fonde l'entreprise."
  },
  {
    year: "3",
    yearSubtitle: "générations",
    title: "La transmission",
    desc: "Jacques, Daniel, Nicolas."
  },
  {
    year: "2025",
    title: "Un nouveau chapitre",
    desc: "La fin du mazout, la poursuite de notre engagement."
  }
];

export default function ExpertiseTimeline() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.eyebrow}>02 / NOTRE PARCOURS</p>
          <h2>Évoluer, sans perdre l'essentiel.</h2>
        </motion.div>

        <div className={styles.timelineWrapper}>
          <div className={styles.line}></div>
          <div className={styles.points}>
            {timelineData.map((item, index) => (
              <motion.div 
                key={index} 
                className={styles.point}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.2) }}
              >
                <div className={styles.dot}></div>
                <div className={styles.yearWrapper}>
                  <span className={styles.year}>{item.year}</span>
                  {item.yearSubtitle && <span className={styles.yearSubtitle}>{item.yearSubtitle}</span>}
                </div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.desc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
