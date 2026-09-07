import Link from 'next/link';
import styles from './EditorialFooter.module.css';

export default function EditorialFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.content}`}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/logo-highres.png" alt="Bellechasse Énergie" />
          </Link>
        </div>
        
        <div className={styles.info}>
          <div>
            Montréal <span className={styles.separator}>•</span> Laval <span className={styles.separator}>•</span> Rive-Nord <span className={styles.separator}>•</span> Rive-Sud
          </div>
          <div>
            Lun-ven <span className={styles.separator}>•</span> 8 h à 17 h
          </div>
        </div>
      </div>
    </footer>
  );
}
