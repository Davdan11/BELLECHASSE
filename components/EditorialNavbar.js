"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './EditorialNavbar.module.css';

export default function EditorialNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.wrapper} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navbar}`}>
        
        <div className={styles.logo}>
          <Link href="/">
            <img src="/logo-png.png" alt="Bellechasse Énergie" className={styles.logoImg} />
          </Link>
        </div>
        
        <nav className={styles.links}>
          <Link href="#solutions" className={styles.link}>Nos solutions</Link>
          <Link href="#expertise" className={styles.link}>Notre expertise</Link>
          <Link href="#financement" className={styles.link}>Financement</Link>
          <Link href="#contact" className={styles.link}>Contact</Link>
        </nav>
        
        <div className={styles.actions}>
          <a href="tel:(514)494-0400" className={styles.phone}>(514) 494-0400</a>
          <Link href="#soumission" className={styles.btn}>
            Obtenir une soumission
            <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </Link>
        </div>
        
      </div>
    </header>
  );
}
