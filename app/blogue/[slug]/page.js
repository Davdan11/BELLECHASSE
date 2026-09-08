import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditorialNavbar from '../../../components/EditorialNavbar';
import EditorialFooterFull from '../../../components/EditorialFooterFull';
import BlogCTA from '../../../components/BlogCTA';
import { getAllPosts, getPostBySlug, getRelatedPosts, formatDate, SITE_URL } from '../../../lib/blog';
import styles from './article.module.css';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}${post.url}`;
  const image = `${SITE_URL}${post.image}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      siteName: 'Bellechasse Énergie',
      locale: 'fr_CA',
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      section: post.categoryLabel,
      tags: post.tags,
      images: [{ url: image, alt: post.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const url = `${SITE_URL}${post.url}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: url,
        headline: post.title,
        description: post.description,
        image: `${SITE_URL}${post.image}`,
        datePublished: post.date,
        dateModified: post.updated || post.date,
        inLanguage: 'fr-CA',
        articleSection: post.categoryLabel,
        keywords: post.tags.join(', '),
        wordCount: post.content.split(/\s+/).length,
        author: { '@type': 'Organization', name: post.author, '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        isPartOf: { '@id': `${SITE_URL}/blogue#blog` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blogue', item: `${SITE_URL}/blogue` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
      ...(post.faq.length > 0
        ? [{
            '@type': 'FAQPage',
            mainEntity: post.faq.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <EditorialNavbar theme="light" />
      <main>
        <article className={styles.article}>
          <header className={`container ${styles.header}`}>
            <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
              <Link href="/">Accueil</Link>
              <span>/</span>
              <Link href="/blogue">Blogue</Link>
              <span>/</span>
              <span className={styles.current}>{post.categoryLabel}</span>
            </nav>

            <div className={styles.headerGrid}>
              <div>
                <span className={styles.cat}>{post.categoryLabel}</span>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.meta}>
                  {post.author} <span>·</span> {formatDate(post.date)} <span>·</span> {post.readingTime} min de lecture
                </p>
              </div>
              <p className={styles.lead}>{post.excerpt}</p>
            </div>
          </header>

          <div className={`container ${styles.heroImage}`}>
            <img src={post.image} alt={post.imageAlt} style={{ objectFit: post.imageFit }} />
          </div>

          <div className={`container ${styles.bodyGrid}`}>
            <aside className={styles.aside}>
              <div className={styles.asideBlock}>
                <span className={styles.asideLabel}>Sujets</span>
                <ul className={styles.tags}>
                  {post.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
              <div className={styles.asideBlock}>
                <span className={styles.asideLabel}>Besoin d&apos;un conseil?</span>
                <a href="tel:+15144940400" className={styles.asidePhone}>(514) 494-0400</a>
                <Link href="/contact" className={styles.asideLink}>
                  Demander une soumission
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 19L19 5M19 5v14M19 5H5" />
                  </svg>
                </Link>
              </div>
            </aside>

            <div className={styles.prose} dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>

          {post.faq.length > 0 && (
            <section className={`container ${styles.faq}`} aria-labelledby="faq-title">
              <span className={styles.eyebrow}>QUESTIONS FRÉQUENTES</span>
              <h2 id="faq-title" className={styles.faqTitle}>On nous demande souvent…</h2>
              <div className={styles.faqList}>
                {post.faq.map((f) => (
                  <details key={f.q} className={styles.faqItem}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </article>

        {related.length > 0 && (
          <section className={`container ${styles.related}`}>
            <span className={styles.eyebrow}>À LIRE AUSSI</span>
            <h2 className={styles.relatedTitle}>Continuer la lecture.</h2>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <Link key={r.slug} href={r.url} className={styles.relatedCard}>
                  <div className={styles.relatedImage}>
                    <img src={r.image} alt={r.imageAlt} style={{ objectFit: r.imageFit }} loading="lazy" />
                  </div>
                  <span className={styles.cat}>{r.categoryLabel}</span>
                  <h3>{r.title}</h3>
                  <p>{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <BlogCTA eyebrow="PASSER À L'ACTION" />
      </main>
      <EditorialFooterFull />
    </>
  );
}
