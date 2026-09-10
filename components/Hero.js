import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <div className={styles.heroWrapper}>
      <section className={styles.heroCard}>
        <div className={styles.heroOverlay}></div>
        
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            L&apos;expertise<br />
            et le confort<br />
            depuis 1962.
          </h1>
          <p className={styles.subtitle}>
            Bellechasse Énergie : Votre partenaire de confiance en chauffage et climatisation. Un service professionnel garanti.
          </p>
          
          <Link href="#soumission" className={styles.ctaButton}>
            Soumission gratuite
            <div className={styles.ctaIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 19L19 5" />
                <path d="M9 5H19V15" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Scroll down button */}
        <div className={styles.bottomLeftBtn}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14" />
            <path d="M19 12l-7 7-7-7" />
          </svg>
        </div>

        {/* Floating badge */}
        <div className={styles.bottomRightBadge}>
          <div className={styles.windIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
            </svg>
          </div>
          Votre confort, toute l&apos;année.
        </div>
      </section>
    </div>
  );
}
