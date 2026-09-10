"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './EditorialVideos.module.css';

const SITE_URL = 'https://bellechasseenergie.com';

const videos = [
  {
    id: 'Wf0jUPLHVi0',
    title: 'Daikin Fit Central Air',
    description: "Présentation de la thermopompe centrale Daikin Fit : un système compact et silencieux, installé par Bellechasse Énergie dans le Grand Montréal.",
    img: '/section-6-1.webp',
    alt: 'Vignette de la vidéo sur la thermopompe centrale Daikin Fit',
  },
  {
    id: 'eEcX5fuHp28',
    title: 'Daikin Emura',
    description: "Découvrez la thermopompe murale Daikin Emura, au design épuré, pour chauffer et climatiser pièce par pièce.",
    img: '/section-6-2.webp',
    alt: 'Vignette de la vidéo sur la thermopompe murale Daikin Emura',
  },
  {
    id: 'fe09A5mzMQg',
    title: 'Daikin Témoignage',
    description: "Témoignage de M. Charbonneau, client de Bellechasse Énergie, sur son installation de thermopompe Daikin.",
    img: '/section-6-3.webp',
    alt: 'Vignette de la vidéo témoignage de M. Charbonneau, client Daikin de Bellechasse Énergie',
  },
  {
    id: 'tKj_b-NQd3E',
    title: 'Daikin Texas',
    description: "Visite des installations Daikin au Texas, où sont conçues et assemblées les thermopompes vendues par Bellechasse Énergie.",
    img: '/section-6-4.webp',
    alt: 'Vignette de la vidéo sur les installations Daikin au Texas',
  },
];

const videoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "L'innovation Daikin en images",
  itemListElement: videos.map((video, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    item: {
      '@type': 'VideoObject',
      name: video.title,
      description: video.description,
      thumbnailUrl: `${SITE_URL}${video.img}`,
      contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
    },
  })),
};

export default function EditorialVideos() {
  const [activeId, setActiveId] = useState(null);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <div className="container">

        <span className={styles.sectionLabel}>05 / DÉCOUVRIR DAIKIN</span>
        <h2 className={styles.title}>
          L&apos;innovation, en images.
        </h2>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {videos.map((video) => {
            const isActive = activeId === video.id;
            const label = `Lire la vidéo : ${video.title}`;
            return (
              <motion.div variants={itemVariants} key={video.id}>
                <article className={styles.card}>
                  <div className={styles.imgWrapper}>
                    {isActive ? (
                      <iframe
                        className={styles.player}
                        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                        title={video.title}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        className={styles.thumbBtn}
                        aria-label={label}
                        onClick={() => setActiveId(video.id)}
                      >
                        <Image
                          src={video.img}
                          alt={video.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                        <div className={styles.overlay}>
                          <div className={styles.playBtn}>
                            <svg className={styles.playIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                  <h3 className={styles.cardTitle}>{video.title}</h3>
                  <button
                    type="button"
                    className={styles.watchLink}
                    aria-label={label}
                    onClick={() => setActiveId(video.id)}
                  >
                    Voir la vidéo
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 19L19 5M19 5v14M19 5H5" />
                    </svg>
                  </button>
                </article>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
