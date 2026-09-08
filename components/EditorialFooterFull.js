import Link from 'next/link';
import styles from './EditorialFooterFull.module.css';

export default function EditorialFooterFull() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        
        <div className={styles.grid}>
          {/* Col 1 */}
          <div className={styles.logoCol}>
            <p className={styles.desc}>
              Trois générations au service de votre confort.
            </p>
            <img src="/logo-png.png" alt="Bellechasse Énergie" className={styles.logo} />
            <p className={styles.address}>
              Grand Montréal - Laval<br />
              Rive-Nord - Rive-Sud
            </p>
          </div>

          {/* Col 2 */}
          <div className={styles.col}>
            <span className={styles.colTitle}>Nos solutions</span>
            <div className={styles.links}>
              <Link href="/produits" className={styles.link}>Nos produits</Link>
              <Link href="/nos-solutions#thermopompes-centrales" className={styles.link}>Thermopompes centrales</Link>
              <Link href="/nos-solutions#thermopompes-murales" className={styles.link}>Thermopompes murales</Link>
              <Link href="/produits/air-climatise-central" className={styles.link}>Climatisation</Link>
              <Link href="/produits/fournaise-air-pulse" className={styles.link}>Fournaises</Link>
              <Link href="/produits/echangeur-air" className={styles.link}>Échangeurs d&apos;air</Link>
            </div>
          </div>

          {/* Col 3 */}
          <div className={styles.col}>
            <span className={styles.colTitle}>À découvrir</span>
            <div className={styles.links}>
              <Link href="/notre-expertise" className={styles.link}>Notre expertise</Link>
              <Link href="/financement" className={styles.link}>Financement et subventions</Link>
              <Link href="/thermopompe-montreal" className={styles.link}>Thermopompe Montréal</Link>
              <Link href="/thermopompe-laval" className={styles.link}>Thermopompe Laval</Link>
              <Link href="/thermopompe-rive-nord" className={styles.link}>Thermopompe Rive-Nord</Link>
              <Link href="/thermopompe-rive-sud" className={styles.link}>Thermopompe Rive-Sud</Link>
              <Link href="/blogue" className={styles.link}>Blogue</Link>
              <Link href="/contact" className={styles.link}>Contact</Link>
            </div>
          </div>

          {/* Col 4 */}
          <div className={styles.col}>
            <span className={styles.colTitle}>Nous joindre</span>
            <a href="tel:+15144940400" className={styles.phone}>(514) 494-0400</a>
            <p className={styles.hours}>
              Lundi au vendredi<br />
              8 h à 17 h<br />
              Samedi et dimanche: fermé
            </p>
            <Link href="/contact" className={styles.btn}>
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
          <span>© 2026 Bellechasse Énergie. Tous droits réservés. RBQ 8103-2112-33</span>
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
