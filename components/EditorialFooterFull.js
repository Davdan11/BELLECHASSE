import Link from 'next/link';
import styles from './EditorialFooterFull.module.css';

export default function EditorialFooterFull() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        
        <div className={styles.grid}>
          {/* Col 1 */}
          <div className={styles.col}>
            <img src="/logo-png.png" alt="Bellechasse Énergie" className={styles.logo} />
            <p className={styles.desc}>
              Trois générations au service de votre confort.
            </p>
            <p className={styles.address}>
              Grand Montréal - Laval<br />
              Rive-Nord - Rive-Sud
            </p>
          </div>

          {/* Col 2 */}
          <div className={styles.col}>
            <span className={styles.colTitle}>Nos solutions</span>
            <div className={styles.links}>
              <Link href="/thermopompes-centrales" className={styles.link}>Thermopompes centrales</Link>
              <Link href="/thermopompes-murales" className={styles.link}>Thermopompes murales</Link>
              <Link href="/climatisation" className={styles.link}>Climatisation</Link>
              <Link href="/fournaises" className={styles.link}>Fournaises</Link>
              <Link href="/ventilation" className={styles.link}>Ventilation</Link>
            </div>
          </div>

          {/* Col 3 */}
          <div className={styles.col}>
            <span className={styles.colTitle}>À découvrir</span>
            <div className={styles.links}>
              <Link href="/financement" className={styles.link}>Financement et subventions</Link>
              <Link href="/promotions" className={styles.link}>Promotions</Link>
              <Link href="/manuels" className={styles.link}>Manuels</Link>
              <Link href="/temoignages" className={styles.link}>Témoignages</Link>
              <Link href="/blogue" className={styles.link}>Blogue</Link>
              <Link href="#contact" className={styles.link}>Contact</Link>
            </div>
          </div>

          {/* Col 4 */}
          <div className={styles.col}>
            <span className={styles.colTitle}>Nous joindre</span>
            <a href="tel:(514)494-0400" className={styles.phone}>(514) 494-0400</a>
            <p className={styles.hours}>
              Lundi au vendredi<br />
              8 h à 17 h<br />
              Samedi et dimanche: fermé
            </p>
            <Link href="#soumission" className={styles.btn}>
              Demander une soumission
              <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 19L19 5M19 5v14M19 5H5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContent}`}>
          <span>© 2026 Bellechasse Energie. Tous droits réservés.</span>
          <Link href="/confidentialite" className={styles.bottomLink}>
            Politique de confidentialité
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 19L19 5M19 5v14M19 5H5" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
