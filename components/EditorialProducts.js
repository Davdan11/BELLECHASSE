"use client";
import { useState } from 'react';
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

  const productsMap = {
    "Thermopompe centrale": [
      { name: "Daikin Fit", img: "/tab-daikin-fit.webp" },
      { name: "Daikin SkyAir", img: "/tab-daikin-skyair.webp" },
      { name: "Moovair Centrale", img: "/tab-moovair.webp" }
    ],
    "Thermopompe murale": [
      { name: "Daikin Atmosphera", img: "/tab-daikin-atmosphera.webp" },
      { name: "Daikin Oterra", img: "/tab-oterra.webp" },
      { name: "Daikin Multi-Zone", img: "/tab-daikin-multi-zone-mxlh.webp" }
    ],
    "Air climatisé central": [
      { name: "Daikin DX14SA", img: "/tab-daikin-dx-14sa.webp" },
      { name: "Daikin DX16SA", img: "/tab-daikin-dx-16sa.webp" },
      { name: "Daikin FDMQ", img: "/tab-daikin-fdmq.webp" }
    ],
    "Air climatisé mural": [
      { name: "Daikin Entra", img: "/tab-daikin-entra.webp" },
      { name: "Mainline", img: "/tab-mainline.webp" },
      { name: "Mainline Multi-Zone", img: "/tab-mainline-multi-zone.webp" }
    ],
    "Fournaise à air pulsé": [
      { name: "Fournaise Steffes", img: "/tab-steffes.webp" },
      { name: "Daikin MBVC", img: "/tab-daikin-mbvc.webp" }
    ],
    "Échangeur d'air": [
      { name: "Échangeur d'air Aldes", img: "/tab-aldes.webp" }
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
              className={`${styles.tabBtn} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.controls}>
          <button className={`${styles.controlBtn} ${styles.disabled}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
          </button>
          <button className={styles.controlBtn}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{color: "var(--primary-red)"}}>
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
              <Link href={`/produits/${product.name.toLowerCase().replace(/ /g, '-')}`} className={styles.productCard}>
                <div className={styles.imgWrapper}>
                  <img src={product.img} alt={product.name} />
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
