"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './EditorialVideos.module.css';

export default function EditorialVideos() {
  const videos = [
    { title: "Daikin Fit Central Air", img: "/section-6-1.webp" },
    { title: "Daikin Emura", img: "/section-6-2.webp" },
    { title: "Daikin Témoignage", img: "/section-6-3.webp" },
    { title: "Daikin Texas", img: "/section-6-4.webp" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        
        <span className={styles.sectionLabel}>05 / DÉCOUVRIR DAIKIN</span>
        <h2 className={styles.title}>
          L'innovation, en images.
        </h2>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {videos.map((video, idx) => (
            <motion.div variants={itemVariants} key={idx}>
              <Link href="#video" className={styles.card}>
                <div className={styles.imgWrapper}>
                  <img src={video.img} alt={video.title} />
                  <div className={styles.overlay}>
                    <div className={styles.playBtn}>
                      <svg className={styles.playIcon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className={styles.cardTitle}>{video.title}</h3>
                <span className={styles.watchLink}>
                  Voir la vidéo
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 19L19 5M19 5v14M19 5H5" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
