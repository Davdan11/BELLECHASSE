"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { REVIEWS } from '../lib/reviews';
import { GOOGLE_RATING, SOCIAL } from '../lib/site';
import styles from './Testimonials.module.css';

const INITIAL = 6;

export default function Testimonials({ eyebrow = 'ILS NOUS FONT CONFIANCE', title = <>Nos clients parlent<br />de leur expérience.</> }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? REVIEWS : REVIEWS.slice(0, INITIAL);
  const hasRating = GOOGLE_RATING.value && GOOGLE_RATING.count;

  return (
    <section className={styles.section} id="temoignages" aria-labelledby="temoignages-title">
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <h2 id="temoignages-title" className={styles.title}>{title}</h2>
          </div>
          <div className={styles.aside}>
            {hasRating ? (
              <a href={GOOGLE_RATING.url || SOCIAL.googleBusiness || '#'} className={styles.rating} target="_blank" rel="noopener noreferrer">
                <span className={styles.ratingValue}>{String(GOOGLE_RATING.value).replace('.', ',')}</span>
                <span className={styles.stars} aria-hidden="true">★★★★★</span>
                <span className={styles.ratingCount}>{GOOGLE_RATING.count} avis Google</span>
              </a>
            ) : (
              <p className={styles.asideText}>
                {REVIEWS.length} témoignages de clients du Grand Montréal, de Laval et des deux rives.
              </p>
            )}
            {SOCIAL.googleBusiness && (
              <a href={SOCIAL.googleBusiness} className={styles.reviewLink} target="_blank" rel="noopener noreferrer">
                Laisser un avis Google
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>
              </a>
            )}
          </div>
        </div>

        <ul className={styles.grid}>
          {shown.map((r, i) => (
            <motion.li
              key={r.name + i}
              className={styles.card}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: Math.min(i % INITIAL, 5) * 0.05 }}
            >
              <svg className={styles.quote} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.2 6C4.9 7.3 3.5 9.5 3.5 12.6V18h6v-6H6.3c.2-1.6 1-2.8 2.6-3.7L7.2 6Zm9 0c-2.3 1.3-3.7 3.5-3.7 6.6V18h6v-6h-3.2c.2-1.6 1-2.8 2.6-3.7L16.2 6Z" /></svg>
              <blockquote className={styles.text}>{r.text}</blockquote>
              <footer className={styles.meta}>
                <span className={styles.name}>{r.name}</span>
                {r.product && <span className={styles.product}>{r.product}</span>}
              </footer>
            </motion.li>
          ))}
        </ul>

        <div className={styles.actions}>
          {REVIEWS.length > INITIAL && (
            <button type="button" className={styles.more} onClick={() => setExpanded((e) => !e)} aria-expanded={expanded} aria-controls="temoignages">
              {expanded ? 'Voir moins' : `Voir les ${REVIEWS.length} témoignages`}
            </button>
          )}
          <Link href="/rendez-vous" className={styles.cta}>
            Planifier une visite gratuite
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
