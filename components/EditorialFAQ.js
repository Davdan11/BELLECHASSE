'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './EditorialFAQ.module.css';

const faqs = [
  {
    question: "Quelle est la meilleure thermopompe pour le climat québécois ?",
    answer: "Pour les hivers froids du Québec, nous recommandons fortement les systèmes Daikin (comme la Daikin Fit ou Atmosfera) et Moovair. Ces appareils sont conçus avec la technologie Inverter pour chauffer efficacement même à des températures atteignant -30°C."
  },
  {
    question: "Est-ce qu'une soumission chez Bellechasse Énergie est gratuite ?",
    answer: "Absolument. Nous offrons une évaluation complète et gratuite à domicile dans la région du Grand-Montréal, Laval, la Rive-Sud et la Rive-Nord. L'un de nos experts analysera vos besoins et vous proposera la solution la plus économique et performante."
  },
  {
    question: "Quelles sont les subventions disponibles (LogisVert, Thermopompes efficaces) ?",
    answer: "Plusieurs programmes de subventions (comme LogisVert au Québec ou la subvention canadienne pour des maisons plus vertes) peuvent couvrir une part importante du coût de votre nouvelle thermopompe certifiée ENERGY STAR. Nous nous occupons de vous guider à travers les démarches."
  },
  {
    question: "Quelle est la durée de vie moyenne d'un système de chauffage central Daikin ?",
    answer: "Un système de chauffage et climatisation central Daikin, lorsqu'il est bien entretenu par des professionnels certifiés comme ceux de Bellechasse Énergie, a une durée de vie moyenne de 15 à 20 ans. De plus, Daikin offre une garantie exceptionnelle allant jusqu'à 12 ans sur les pièces."
  },
  {
    question: "Combien de temps prend l'installation d'une thermopompe murale ou centrale ?",
    answer: "Une thermopompe murale standard s'installe généralement en moins d'une journée (4 à 6 heures). Pour un système central complet, il faut compter entre 1 et 2 jours d'installation par nos techniciens frigoristes certifiés, afin de garantir un travail impeccable."
  }
];

export default function EditorialFAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Construct JSON-LD for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className={styles.faqSection}>
      {/* Invisible JSON-LD for Google's "People Also Ask" */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.p 
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Foire Aux Questions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Vous avez des questions ?<br />
            Nous avons l&apos;expertise.
          </motion.h2>
        </div>

        <div className={styles.accordionList}>
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div 
                key={index} 
                className={styles.accordionItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <button 
                  className={styles.accordionHeader} 
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isActive}
                >
                  <span className={styles.question}>{faq.question}</span>
                  <span className={`${styles.icon} ${isActive ? styles.iconActive : ''}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      className={styles.accordionContentWrapper}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className={styles.accordionContent}>
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
