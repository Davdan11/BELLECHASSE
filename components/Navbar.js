"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`navbar-wrapper ${scrolled ? 'scrolled' : 'transparent'}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: scrolled ? 'white' : 'transparent',
        boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
      }}
    >
      <nav className="navbar" style={{ padding: scrolled ? '1rem 2rem' : '1.5rem 2rem', transition: 'padding 0.3s ease' }}>
        <div className="menu-logo">
          <Link href="/">
            <Image src="/logo-highres.png" alt="Logo de Bellechasse Énergie" width={200} height={56} style={{ width: 'auto', height: 'auto', maxHeight: '50px' }} />
          </Link>
        </div>
        
        <div className="menu-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { href: '#produits', label: 'Nos produits' },
            { href: '/a-propos', label: 'À propos' },
            { href: '/subventions', label: 'Financement' },
            { href: '/manuels', label: 'Trouver un installateur' },
            { href: '/blogue', label: 'Blogue' }
          ].map((link) => (
            <Link 
              key={link.label}
              href={link.href} 
              style={{ 
                color: scrolled ? '#000000' : '#0b1b24', 
                fontWeight: 500, 
                fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
            >
              {link.label}
            </Link>
          ))}
          
          <a href="tel:(514)494-0400" className="phone-link" style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#fff', 
            fontWeight: 500, 
            fontSize: '0.95rem',
            textDecoration: 'none',
            padding: '0.4rem 0.4rem 0.4rem 1.25rem',
            borderRadius: '999px',
            backgroundColor: '#174B60', // Dark blue from Bellechasse theme
            transition: 'all 0.3s ease',
            marginLeft: '1rem'
          }}>
            (514) 494-0400
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              backgroundColor: '#fff',
              borderRadius: '50%',
              color: '#174B60'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </nav>
    </header>
  );
}
