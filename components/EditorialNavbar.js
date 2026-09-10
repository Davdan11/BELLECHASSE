"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './EditorialNavbar.module.css';

export default function EditorialNavbar({ theme = 'dark' }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = theme === 'light' && !scrolled;

  const links = [
    { href: '/nos-solutions', label: 'Nos solutions' },
    { href: '/produits', label: 'Produits' },
    { href: '/notre-expertise', label: 'Notre expertise' },
    { href: '/financement', label: 'Financement' },
    { href: '/blogue', label: 'Blogue' },
    { href: '/contact', label: 'Contact' },
    { href: '/rendez-vous', label: 'Prendre rendez-vous' },
  ];

  return (
    <header className={`${styles.wrapper} ${scrolled || open ? styles.scrolled : ''} ${isLight ? styles.lightTheme : ''}`}>
      <div className={`container ${styles.navbar}`}>
        
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/logo.webp" alt="Bellechasse Énergie, accueil" width={1024} height={341} priority className={styles.logoImg} />
          </Link>
        </div>
        
        <nav className={styles.links}>
          <Link href="/nos-solutions" className={`${styles.link} ${pathname === '/nos-solutions' ? styles.activeLink : ''}`}>Nos solutions</Link>
          <Link href="/produits" className={`${styles.link} ${pathname === '/produits' ? styles.activeLink : ''}`}>Produits</Link>
          <Link href="/notre-expertise" className={`${styles.link} ${pathname === '/notre-expertise' ? styles.activeLink : ''}`}>Notre expertise</Link>
          <Link href="/financement" className={`${styles.link} ${pathname === '/financement' ? styles.activeLink : ''}`}>Financement</Link>
          <Link href="/blogue" className={`${styles.link} ${pathname?.startsWith('/blogue') ? styles.activeLink : ''}`}>Blogue</Link>
          <Link href="/contact" className={`${styles.link} ${pathname === '/contact' ? styles.activeLink : ''}`}>Contact</Link>
        </nav>
        
        <div className={styles.actions}>
          <a href="tel:+15144940400" className={styles.phone}>(514) 494-0400</a>
          <Link href="/rendez-vous" className={styles.btn}>
            Prendre rendez-vous
            <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </Link>
          <button
            type="button"
            className={styles.burger}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`${styles.burgerLine} ${open ? styles.burgerOpen1 : ''}`} />
            <span className={`${styles.burgerLine} ${open ? styles.burgerOpen2 : ''}`} />
            <span className={`${styles.burgerLine} ${open ? styles.burgerOpen3 : ''}`} />
          </button>
        </div>
        
      </div>

      <div id="mobile-menu" className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ''}`} hidden={!open}>
        <nav className={styles.mobileLinks} aria-label="Navigation mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.mobileLink} ${pathname === l.href || (l.href !== '/' && pathname?.startsWith(l.href + '/')) ? styles.mobileLinkActive : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>
            </Link>
          ))}
        </nav>
        <div className={styles.mobileFooter}>
          <a href="tel:+15144940400" className={styles.mobilePhone}>(514) 494-0400</a>
          <span>Lundi au vendredi, 8 h à 17 h</span>
          <div className={styles.mobileAreas}>
            <Link href="/thermopompe-montreal">Montréal</Link>
            <Link href="/thermopompe-laval">Laval</Link>
            <Link href="/thermopompe-rive-nord">Rive-Nord</Link>
            <Link href="/thermopompe-rive-sud">Rive-Sud</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
