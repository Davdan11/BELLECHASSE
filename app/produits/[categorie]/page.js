import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditorialNavbar from '../../../components/EditorialNavbar';
import EditorialFooterFull from '../../../components/EditorialFooterFull';
import ProductsCTA from '../../../components/ProductsCTA';
import FAQBlock from '../../../components/FAQBlock';
import { PRODUCT_CATEGORIES, getCategory } from '../../../lib/products';
import { SITE_URL, ALL_CITIES, breadcrumbSchema, faqSchema, graph, ORGANIZATION_ID } from '../../../lib/site';
import styles from './category.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((c) => ({ categorie: c.slug }));
}

export async function generateMetadata({ params }) {
  const { categorie } = await params;
  const cat = getCategory(categorie);
  if (!cat) return {};
  const url = `${SITE_URL}/produits/${cat.slug}`;
  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${cat.metaTitle} | Bellechasse Énergie`,
      description: cat.metaDescription,
      url,
      images: [{ url: `${SITE_URL}${cat.image}`, alt: cat.name }],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { categorie } = await params;
  const cat = getCategory(categorie);
  if (!cat) notFound();

  const url = `${SITE_URL}/produits/${cat.slug}`;
  const related = cat.related.map(getCategory).filter(Boolean);

  const schema = graph(
    {
      '@type': 'CollectionPage',
      '@id': `${url}#page`,
      url,
      name: cat.metaTitle,
      description: cat.metaDescription,
      inLanguage: 'fr-CA',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': ORGANIZATION_ID },
    },
    {
      '@type': 'ItemList',
      name: cat.plural,
      itemListElement: cat.models.map((m, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: m.name,
          brand: { '@type': 'Brand', name: m.brand },
          image: `${SITE_URL}${m.image}`,
          description: m.summary,
          url: `${url}#${m.id}`,
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'CAD',
            url: `${SITE_URL}/contact`,
            seller: { '@id': ORGANIZATION_ID },
            areaServed: ALL_CITIES.slice(0, 12).map((n) => ({ '@type': 'City', name: n })),
          },
        },
      })),
    },
    breadcrumbSchema([
      { name: 'Accueil', href: '/' },
      { name: 'Produits', href: '/produits' },
      { name: cat.name, href: `/produits/${cat.slug}` },
    ]),
    faqSchema(cat.faq)
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <EditorialNavbar theme="light" />
      <main id="contenu">
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div>
              <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
                <Link href="/">Accueil</Link><span>/</span>
                <Link href="/produits">Produits</Link><span>/</span>
                <span className={styles.current}>{cat.name}</span>
              </nav>
              <span className={styles.eyebrow}>{cat.num} / {cat.eyebrow}</span>
              <h1 className={styles.title}>{cat.title}</h1>
              <p className={styles.intro}>{cat.intro}</p>
              <div className={styles.actions}>
                <Link href="/contact" className={styles.button}>
                  Obtenir une soumission gratuite
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>
                </Link>
                <a href="tel:+15144940400" className={styles.phone}>(514) 494-0400</a>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img src={cat.image} alt={cat.plural} style={{ objectFit: cat.imageFit }} fetchPriority="high" />
            </div>
          </div>
        </section>

        <section className={styles.benefits}>
          <div className={`container ${styles.benefitsGrid}`}>
            {cat.benefits.map((b, i) => (
              <div key={b.title} className={styles.benefit}>
                <span className={styles.benefitNum}>0{i + 1}</span>
                <h2 className={styles.benefitTitle}>{b.title}</h2>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.models} id="modeles">
          <div className="container">
            <span className={styles.eyebrow}>NOS MODÈLES</span>
            <h2 className={styles.sectionTitle}>{cat.plural} que nous installons.</h2>
            <div className={styles.modelList}>
              {cat.models.map((m) => (
                <article key={m.id} id={m.id} className={styles.model}>
                  <div className={styles.modelImage}>
                    <img src={m.image} alt={m.name} loading="lazy" />
                  </div>
                  <div className={styles.modelBody}>
                    <span className={styles.brand}>{m.brand}</span>
                    <h3 className={styles.modelName}>{m.name}</h3>
                    <p className={styles.modelSummary}>{m.summary}</p>
                    <ul className={styles.points}>
                      {m.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                    <Link href={`/contact?produit=${encodeURIComponent(m.name)}`} className={styles.modelLink}>
                      Demander un prix pour {m.name}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.trust}>
          <div className={`container ${styles.trustRow}`}>
            <div><strong>Depuis 1962</strong><span>Trois générations d’installateurs</span></div>
            <div><strong>Détaillant autorisé Daikin</strong><span>Garantie complète du fabricant</span></div>
            <div><strong>RBQ 8103-2112-33</strong><span>Membre CMMTQ, frigoristes certifiés</span></div>
            <div><strong>Grand Montréal</strong><span>Laval, Rive-Nord et Rive-Sud</span></div>
          </div>
        </section>

        <FAQBlock faq={cat.faq} title={`Questions fréquentes sur les ${cat.plural.toLowerCase()}`} />

        <section className={styles.related}>
          <div className="container">
            <span className={styles.eyebrow}>À DÉCOUVRIR AUSSI</span>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <Link key={r.slug} href={`/produits/${r.slug}`} className={styles.relatedCard}>
                  <span className={styles.relatedNum}>{r.num}</span>
                  <span className={styles.relatedName}>{r.name}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ProductsCTA />
      </main>
      <EditorialFooterFull />
    </>
  );
}
