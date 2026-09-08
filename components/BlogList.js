"use client";
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './BlogList.module.css';

const CATEGORIES = {
  thermopompes: 'Thermopompes',
  entretien: 'Entretien',
  chauffage: 'Chauffage',
  financement: 'Financement',
  conseils: 'Conseils',
};
const FILTERS = ['thermopompes', 'entretien', 'chauffage', 'financement'];

function formatDate(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('fr-CA', { day: 'numeric', month: 'long', year: 'numeric' });
}

function normalize(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 19L19 5M19 5v14M19 5H5" />
  </svg>
);

const Play = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8.5v7l5.5-3.5z" fill="currentColor" stroke="none" />
  </svg>
);

function Meta({ post }) {
  return (
    <p className={styles.meta}>
      {post.author} <span>·</span> {formatDate(post.date)}
    </p>
  );
}

function Card({ post, index = 0 }) {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.08 * index }}
    >
      <Link href={post.url} className={styles.cardImage}>
        <img src={post.image} alt={post.imageAlt} style={{ objectFit: post.imageFit }} loading="lazy" />
      </Link>
      <span className={styles.cat}>{post.categoryLabel}</span>
      <h3 className={styles.cardTitle}>
        <Link href={post.url}>{post.title}</Link>
      </h3>
      <Meta post={post} />
      <p className={styles.excerpt}>{post.excerpt}</p>
      <Link href={post.url} className={styles.readLink}>
        {post.video ? 'Voir la vidéo' : "Consulter l'article"}
        <Arrow />
        {post.video && <span className={styles.play}><Play /></span>}
      </Link>
    </motion.article>
  );
}

function Featured({ post }) {
  return (
    <motion.article
      className={styles.featured}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      <Link href={post.url} className={styles.featuredImage}>
        <img src={post.image} alt={post.imageAlt} style={{ objectFit: post.imageFit }} />
      </Link>
      <div className={styles.featuredBody}>
        <span className={styles.featuredCat}>
          À LA UNE <span>/</span> {post.categoryLabel.toUpperCase()}
        </span>
        <h2 className={styles.featuredTitle}>
          <Link href={post.url}>{post.title}</Link>
        </h2>
        <p className={styles.featuredMeta}>
          {post.author} <span>·</span> {formatDate(post.date)}
        </p>
        <p className={styles.featuredExcerpt}>{post.excerpt}</p>
        <Link href={post.url} className={styles.featuredLink}>
          Consulter l&apos;article
          <Arrow />
        </Link>
      </div>
    </motion.article>
  );
}

function Wide({ post }) {
  return (
    <motion.article
      className={styles.wide}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      <Link href={post.url} className={styles.wideImage}>
        <img src={post.image} alt={post.imageAlt} style={{ objectFit: post.imageFit }} loading="lazy" />
      </Link>
      <div className={styles.wideBody}>
        <div className={styles.wideTop}>
          <div>
            <span className={styles.cat}>{post.categoryLabel}</span>
            <h3 className={styles.wideTitle}>
              <Link href={post.url}>{post.title}</Link>
            </h3>
            <Meta post={post} />
          </div>
          <svg className={styles.wideArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
            <path d="M5 19L19 5M19 5v14M19 5H5" />
          </svg>
        </div>
        <div className={styles.wideBottom}>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <Link href={post.url} className={styles.readLink}>
            Consulter l&apos;article
            <Arrow />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function BlogList({ posts }) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return posts.filter((p) => {
      if (filter !== 'all' && p.category !== filter) return false;
      if (!q) return true;
      const hay = normalize([p.title, p.excerpt, p.categoryLabel, ...p.tags].join(' '));
      return hay.includes(q);
    });
  }, [posts, filter, query]);

  const isDefault = filter === 'all' && !query.trim();
  const featured = isDefault ? (posts.find((p) => p.featured) || posts[0]) : null;
  const rest = isDefault ? posts.filter((p) => p !== featured) : filtered;
  const pair = isDefault ? rest.slice(0, 2) : [];
  const wide = isDefault ? rest[2] : null;
  const more = isDefault ? rest.slice(3) : rest;

  return (
    <section className={styles.section}>
      <div className="container">

        <div className={styles.toolbar}>
          <div className={styles.filters} role="tablist" aria-label="Catégories">
            <button
              type="button"
              className={`${styles.filter} ${filter === 'all' ? styles.filterActive : ''}`}
              onClick={() => setFilter('all')}
              aria-pressed={filter === 'all'}
            >
              Tous les articles
            </button>
            {FILTERS.map((key) => (
              <button
                key={key}
                type="button"
                className={`${styles.filter} ${filter === key ? styles.filterActive : ''}`}
                onClick={() => setFilter(key)}
                aria-pressed={filter === key}
              >
                {CATEGORIES[key]}
              </button>
            ))}
          </div>

          <label className={styles.search}>
            <span className={styles.srOnly}>Rechercher un article</span>
            <input
              type="search"
              placeholder="Rechercher"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
          </label>
        </div>

        {featured && <Featured post={featured} />}

        {isDefault ? (
          <>
            {pair.length > 0 && (
              <>
                <div className={styles.sectionHead}>
                  <span className={styles.eyebrow}>01 / CONSEILS ET ACTUALITÉS</span>
                  <h2 className={styles.sectionTitle}>À lire aussi.</h2>
                </div>
                <div className={styles.grid}>
                  {pair.map((p, i) => <Card key={p.slug} post={p} index={i} />)}
                </div>
              </>
            )}
            {wide && <Wide post={wide} />}
            {more.length > 0 && (
              <div className={`${styles.grid} ${styles.gridMore}`}>
                {more.map((p, i) => <Card key={p.slug} post={p} index={i} />)}
              </div>
            )}
          </>
        ) : (
          <>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>
                {filter === 'all' ? 'RÉSULTATS' : CATEGORIES[filter].toUpperCase()}
              </span>
              <h2 className={styles.sectionTitle}>
                {filtered.length === 0
                  ? 'Aucun article trouvé.'
                  : `${filtered.length} article${filtered.length > 1 ? 's' : ''}.`}
              </h2>
            </div>
            {filtered.length > 0 && (
              <div className={`${styles.grid} ${styles.gridMore}`}>
                {filtered.map((p, i) => <Card key={p.slug} post={p} index={i} />)}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
