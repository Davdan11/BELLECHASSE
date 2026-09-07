import Image from 'next/image';
import Link from 'next/link';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Left: Image with Badge */}
        <div className={styles.imageWrapper}>
          <img src="/section-2.webp" alt="L'équipe de Bellechasse Énergie en action" />
          <div className={styles.badge}>
            <span>60+</span>
            Ans d'expertise
          </div>
        </div>

        {/* Right: Text Content */}
        <div className={styles.textContent}>
          <span className={styles.subtitle}>Notre Histoire</span>
          <h2 className={styles.title}>Une expertise de confiance depuis 1962</h2>
          
          <p className={styles.desc}>
            Fondée il y a plus de 60 ans, Bellechasse Énergie s'est imposée comme une référence incontournable en matière de chauffage et de climatisation au Québec. 
          </p>
          <p className={styles.desc}>
            Notre mission est simple : vous offrir le meilleur confort possible grâce à des équipements performants, installés selon les plus hautes normes de l'industrie, et un service à la clientèle irréprochable.
          </p>

          <ul className={styles.list}>
            <li className={styles.listItem}>
              <div className={styles.listIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              Installateurs certifiés et professionnels
            </li>
            <li className={styles.listItem}>
              <div className={styles.listIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              Partenaire certifié Daikin et grandes marques
            </li>
            <li className={styles.listItem}>
              <div className={styles.listIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              Service après-vente rapide et fiable
            </li>
          </ul>

          <div className={styles.btnGroup}>
            <Link href="#contact" className={styles.btnPrimary}>
              Contactez-nous
            </Link>
            <Link href="/a-propos" className={styles.btnSecondary}>
              En savoir plus
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
