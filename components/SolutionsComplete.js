"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './SolutionsComplete.module.css';

const ITEMS = [
  { id: 'climatisation', num: '03', title: 'Climatisation', desc: 'Systèmes centraux et muraux.', href: '/produits/air-climatise-central' },
  { id: 'chauffage', num: '04', title: 'Chauffage', desc: 'Fournaises à air pulsé.', href: '/produits/fournaise-air-pulse' },
  { id: 'ventilation', num: '05', title: 'Ventilation', desc: "Échangeurs d'air et qualité de l'air intérieur.", href: '/produits/echangeur-air' },
];

export default function SolutionsComplete() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>

        <div className={styles.left}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.eyebrow}>Compléter<br />votre confort</span>
            <h2 className={styles.title}>
              L&apos;équilibre, jusque<br />
              dans les détails.
            </h2>
          </motion.div>

          <ul className={styles.list}>
            {ITEMS.map((item, i) => (
              <motion.li
                key={item.id}
                id={item.id}
                className={styles.row}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <Link href={item.href} className={styles.rowLink}>
                  <span className={styles.num}>{item.num}</span>
                  <span className={styles.rowTitle}>{item.title}</span>
                  <span className={styles.rowDesc}>{item.desc}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 19L19 5M19 5v14M19 5H5" />
                  </svg>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image src="/tab-aldes.webp" alt="Échangeur d'air Aldes, unité de ventilation résidentielle" width={450} height={324} sizes="(max-width: 768px) 100vw, 460px" className={styles.image} />
          <span className={styles.caption}>ÉCHANGEUR D&apos;AIR</span>
        </motion.div>

      </div>
    </section>
  );
}
