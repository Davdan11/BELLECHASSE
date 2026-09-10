'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './ExpertiseMethod.module.css';

const steps = [
  {
    num: "01",
    title: "Comprendre votre maison",
    desc: "Échanger sur votre espace, vos besoins et votre projet."
  },
  {
    num: "02",
    title: "Choisir et installer",
    desc: "Vous orienter vers une solution de chauffage, de climatisation ou de ventilation adaptée."
  },
  {
    num: "03",
    title: "Prendre soin du système",
    desc: "Vous accompagner pour l'entretien et le nettoyage."
  }
];

export default function ExpertiseMethod() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className={styles.eyebrow}>03 / NOTRE FAÇON DE FAIRE</p>
            <h2 className={styles.mainTitle}>
              Bien conseiller.<br />
              Bien installer.<br />
              Bien accompagner.
            </h2>
          </motion.div>
          
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image src="/installation-hands.webp" alt="Mains d'un technicien de Bellechasse Énergie pendant l'installation d'une thermopompe" width={1024} height={491} sizes="(max-width: 1024px) 100vw, 50vw" className={styles.image} />
          </motion.div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.stepsList}>
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className={styles.stepCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              >
                <div className={styles.stepContent}>
                  <div className={styles.numWrapper}>
                    <span className={styles.num}>{step.num}</span>
                    <span className={styles.slash}>/</span>
                  </div>
                  <div className={styles.textWrapper}>
                    <h3 className={styles.title}>{step.title}</h3>
                    <p className={styles.desc}>{step.desc}</p>
                  </div>
                </div>
                <div className={styles.arrow}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="5" y1="19" x2="19" y2="5"></line>
                    <polyline points="9 5 19 5 19 15"></polyline>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
