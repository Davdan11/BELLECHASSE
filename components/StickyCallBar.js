"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './StickyCallBar.module.css';

export default function StickyCallBar() {
  const pathname = usePathname();
  if (pathname === '/contact' || pathname === '/rendez-vous') return null;

  return (
    <div className={styles.bar} role="complementary" aria-label="Nous joindre">
      <a href="tel:+15144940400" className={styles.call}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
        Appeler
      </a>
      <Link href="/rendez-vous" className={styles.quote}>
        Prendre rendez-vous
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>
      </Link>
    </div>
  );
}
