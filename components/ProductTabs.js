"use client";
import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './ProductTabs.module.css';

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('thermo-central');
  const carouselRef = useRef(null);

  const tabs = [
    { id: 'thermo-central', label: 'Thermopompe Centrale' },
    { id: 'thermo-murale', label: 'Thermopompe Murale' },
    { id: 'clim-central', label: 'Air Climatisé Central' },
    { id: 'clim-mural', label: 'Air Climatisé Mural' },
    { id: 'fournaise-air', label: 'Fournaise à Air pulsé' },
    { id: 'echangeur', label: 'Échangeur d\'air' },
  ];

  const products = {
    'thermo-central': [
      { name: 'Daikin Fit', img: '/tab-daikin-fit.webp' },
      { name: 'Daikin FDMQ', img: '/tab-daikin-fdmq.webp' },
      { name: 'Daikin Skyair', img: '/tab-daikin-skyair.webp' },
      { name: 'Moovair', img: '/tab-moovair.webp' },
      { name: 'Mainline', img: '/tab-mainline.webp' },
    ],
    'thermo-murale': [
      { name: 'Daikin Entra', img: '/tab-daikin-entra.webp' },
      { name: 'Daikin Oterra', img: '/tab-oterra.webp' },
      { name: 'Daikin Atmosphera', img: '/tab-daikin-atmosphera.webp' },
      { name: 'Daikin Multi-zone MXLH', img: '/tab-daikin-multi-zone-mxlh.webp' },
    ],
    'clim-central': [
      { name: 'Daikin DX 14SA', img: '/tab-daikin-dx-14sa.webp' },
      { name: 'Daikin DX 16SA', img: '/tab-daikin-dx-16sa.webp' },
    ],
    'clim-mural': [
      { name: 'PTAC', img: '/tab-ptac.webp' },
    ],
    'fournaise-air': [
      { name: 'Daikin MBVC', img: '/tab-daikin-mbvc.webp' },
      { name: 'Steffes', img: '/tab-steffes.webp' },
    ],
    'echangeur': [
      { name: 'Aldes', img: '/tab-aldes.webp' },
    ]
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="produits" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nos Solutions Confort</h2>
          <p className={styles.desc}>
            Découvrez nos gammes de produits fiables et performants, conçus pour affronter les hivers québécois.
          </p>
        </div>
        
        {/* Horizontal Pill Filters */}
        <div className={styles.filters}>
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              className={`${styles.pillBtn} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                // Reset scroll position when changing tabs
                if (carouselRef.current) {
                  carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Carousel Container */}
        <div className={styles.carouselContainer}>
          <button className={`${styles.navBtn} ${styles.navBtnLeft}`} onClick={scrollLeft} aria-label="Défiler vers la gauche">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className={styles.carouselTrack} ref={carouselRef}>
            {products[activeTab]?.map((product, index) => (
              <a 
                key={index} 
                href={`/pdfs/${product.name.toLowerCase().replace(/ /g, '-')}.pdf`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.productCard}
              >
                <div className={styles.imgBox}>
                  <img src={product.img} alt={product.name} onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
                <div>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <span className={styles.productLink}>
                    Fiche technique
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>

          <button className={`${styles.navBtn} ${styles.navBtnRight}`} onClick={scrollRight} aria-label="Défiler vers la droite">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
