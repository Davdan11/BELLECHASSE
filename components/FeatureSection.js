import Image from 'next/image';
import Link from 'next/link';
import styles from './FeatureSection.module.css';

export default function FeatureSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.subtitle}>LE CONFORT, À VOTRE FAÇON</h3>
          <h2 className={styles.title}>
            Bien chez vous.<br />
            À votre manière.
          </h2>
        </div>
        <p className={styles.desc}>
          Des solutions pensées pour votre maison et votre quotidien.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Left Card: Murales */}
        <div className={`${styles.card} ${styles.cardLeft}`}>
          {/* Using produit-1.webp for the indoor unit as a guess. If incorrect, the user can upload a new one. */}
          <img src="/produit-1.webp" alt="Thermopompe murale" className={styles.cardImgLeft} />
          
          <div className={styles.cardContent}>
            <div>
              <h3 className={styles.cardTitleLeft}>Thermopompes murales</h3>
              <p className={styles.cardSubtitleLeft}>Le confort, pièce par pièce.</p>
            </div>
            <Link href="#murales" className={styles.btnRed} aria-label="Voir thermopompes murales">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Card: Centraux */}
        <div className={`${styles.card} ${styles.cardRight}`}>
          <div className={styles.cardRightOverlay}></div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitleRight}>Systèmes centraux</h3>
            <Link href="#centraux" className={styles.btnWhite} aria-label="Voir systèmes centraux">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.bottomLinkContainer}>
        <Link href="#solutions" className={styles.linkAll}>
          Toutes nos solutions
          <span className={styles.linkArrow}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
