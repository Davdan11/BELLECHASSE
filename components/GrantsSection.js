import Link from 'next/link';
import styles from './GrantsSection.module.css';

export default function GrantsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.icon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        
        <h2 className={styles.title}>Profitez des subventions gouvernementales</h2>
        
        <p className={styles.desc}>
          Faites des économies importantes sur l&apos;achat et l&apos;installation de votre nouvelle thermopompe ou système de chauffage grâce aux programmes d&apos;aide financière comme <span className={styles.highlight}>LogisVert</span> et <span className={styles.highlight}>Thermopompes efficaces</span>.
        </p>
        
        <Link href="/subventions" className={styles.btn}>
          Vérifier mon admissibilité
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
