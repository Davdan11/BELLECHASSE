"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './EditorialProducts.module.css';

export default function EditorialProducts() {
  const [activeTab, setActiveTab] = useState("Thermopompe centrale");

  const tabs = [
    "Thermopompe centrale",
    "Thermopompe murale",
    "Air climatisé central",
    "Air climatisé mural",
    "Fournaise à air pulsé",
    "Échangeur d'air"
  ];

  const categorySlug = {
    "Thermopompe centrale": "thermopompe-centrale",
    "Thermopompe murale": "thermopompe-murale",
    "Air climatisé central": "air-climatise-central",
    "Air climatisé mural": "air-climatise-mural",
    "Fournaise à air pulsé": "fournaise-air-pulse",
    "Échangeur d'air": "echangeur-air"
  };

  const productsMap = {
    "Thermopompe centrale": [
      { name: "Daikin Fit", img: "/tab-daikin-fit.webp", w: 450, h: 308, alt: "Thermopompe centrale Daikin Fit, unité extérieure compacte" },
      { name: "Daikin SkyAir", img: "/tab-daikin-skyair.webp", w: 450, h: 308, alt: "Thermopompe centrale Daikin SkyAir, unité extérieure" },
      { name: "Moovair Centrale", img: "/tab-moovair.webp", w: 530, h: 324, alt: "Thermopompe centrale Moovair, unité extérieure" }
    ],
    "Thermopompe murale": [
      { name: "Daikin Atmosphera", img: "/tab-daikin-atmosphera.webp", w: 450, h: 308, alt: "Thermopompe murale Daikin Atmosphera, unité intérieure" },
      { name: "Daikin Oterra", img: "/tab-oterra.webp", w: 450, h: 324, alt: "Thermopompe murale Daikin Oterra, unité intérieure" },
      { name: "Daikin Multi-Zone", img: "/tab-daikin-multi-zone-mxlh.webp", w: 450, h: 276, alt: "Thermopompe murale Daikin Multi-Zone MXLH, unité extérieure" }
    ],
    "Air climatisé central": [
      { name: "Daikin DX14SA", img: "/tab-daikin-dx-14sa.webp", w: 450, h: 324, alt: "Climatiseur central Daikin DX14SA, unité extérieure" },
      { name: "Daikin DX16SA", img: "/tab-daikin-dx-16sa.webp", w: 450, h: 324, alt: "Climatiseur central Daikin DX16SA, unité extérieure" },
      { name: "Daikin FDMQ", img: "/tab-daikin-fdmq.webp", w: 450, h: 308, alt: "Unité gainable Daikin FDMQ pour climatisation par conduits" }
    ],
    "Air climatisé mural": [
      { name: "Daikin Entra", img: "/tab-daikin-entra.webp", w: 418, h: 308, alt: "Climatiseur mural Daikin Entra, unité intérieure" },
      { name: "Mainline", img: "/tab-mainline.webp", w: 530, h: 348, alt: "Climatiseur mural Mainline, unité intérieure" },
      { name: "Mainline Multi-Zone", img: "/tab-mainline-multi-zone.webp", w: 450, h: 348, alt: "Climatiseur mural Mainline Multi-Zone, unité extérieure" }
    ],
    "Fournaise à air pulsé": [
      { name: "Fournaise Steffes", img: "/tab-steffes.webp", w: 450, h: 388, alt: "Fournaise électrique Steffes à accumulation" },
      { name: "Daikin MBVC", img: "/tab-daikin-mbvc.webp", w: 450, h: 324, alt: "Fournaise à air pulsé Daikin MBVC" }
    ],
    "Échangeur d'air": [
      { name: "Échangeur d'air Aldes", img: "/tab-aldes.webp", w: 450, h: 324, alt: "Échangeur d'air Aldes, unité de ventilation résidentielle" }
    ]
  };

  const currentProducts = productsMap[activeTab] || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        
        <div className={styles.topRow}>
          <div className={styles.titleArea}>
            <span className={styles.sectionLabel}>03 / NOS PRODUITS</span>
            <h2 className={styles.title}>
              La performance,<br />
              à votre mesure.
            </h2>
          </div>
          
          <Link href="/produits" className={styles.viewAll}>
            Voir tous nos produits
            <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 19L19 5M19 5v14M19 5H5" />
            </svg>
          </Link>
        </div>

        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button 
              key={tab} 
              type="button"
              className={`${styles.tabBtn} ${activeTab === tab ? styles.active : ''}`}
              aria-pressed={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.controls}>
          <button type="button" className={`${styles.controlBtn} ${styles.disabled}`} aria-label="Produit précédent" aria-disabled="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
          </button>
          <button type="button" className={styles.controlBtn} aria-label="Produit suivant">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{color: "var(--primary-red)"}} aria-hidden="true">
              <path d="M5 12h14M19 12l-7-7M19 12l-7 7" />
            </svg>
          </button>
        </div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible" /* Use animate instead of whileInView so it re-triggers on tab change */
          key={activeTab} /* Re-mount to trigger animation when tab changes */
        >
          {currentProducts.map((product, i) => (
            <motion.div variants={itemVariants} key={product.name}>
              <Link href={`/produits/${categorySlug[activeTab]}#${product.name.toLowerCase().replace(/ /g, '-')}`} className={styles.productCard}>
                <div className={styles.imgWrapper}>
                  <Image src={product.img} alt={product.alt} width={product.w} height={product.h} sizes="(max-width: 768px) 90vw, 30vw" />
                </div>
                <h3 className={styles.productName}>{product.name}</h3>
                <span className={styles.discover}>
                  Découvrir
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 19L19 5M19 5v14M19 5H5" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
