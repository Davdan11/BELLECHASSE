import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditorialNavbar from '../../components/EditorialNavbar';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import ContactRequestForm from '../../components/ContactRequestForm';
import FAQBlock from '../../components/FAQBlock';
import { LANDING_PAGES, getLanding } from '../../lib/landing';
import { getCategory } from '../../lib/products';
import { SITE_URL, AREAS, ALL_CITIES, breadcrumbSchema, faqSchema, serviceSchema, graph, ORGANIZATION_ID } from '../../lib/site';
import styles from './landing.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getLanding(slug);
  if (!page) return {};
  const url = `${SITE_URL}/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${page.metaTitle} | Bellechasse Énergie`,
      description: page.metaDescription,
      url,
      images: [{ url: `${SITE_URL}${page.image}`, alt: page.imageAlt || page.h1 }],
    },
  };
}

export default async function LandingPage({ params }) {
  const { slug } = await params;
  const page = getLanding(slug);
  if (!page) notFound();

  const url = `${SITE_URL}/${page.slug}`;
  const areaNames = page.area
    ? (page.area.slug === 'montreal' ? ['Montréal', ...page.area.sectors.slice(0, 8)] : page.area.sectors)
    : ALL_CITIES;
  const products = page.products.map(getCategory).filter(Boolean);
  const otherCities = AREAS.filter((a) => !page.area || a.slug !== page.area.slug);

  const schema = graph(
    {
      '@type': 'WebPage',
      '@id': `${url}#page`,
      url,
      name: page.metaTitle,
      description: page.metaDescription,
      inLanguage: 'fr-CA',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': ORGANIZATION_ID },
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.answer'] },
    },
    serviceSchema({
      name: page.area ? `${page.service} à ${page.area.name}` : page.service,
      serviceType: page.service,
      description: page.metaDescription,
      url,
      areaNames,
    }),
    breadcrumbSchema([
      { name: 'Accueil', href: '/' },
      { name: page.h1, href: `/${page.slug}` },
    ]),
    faqSchema(page.faq)
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <EditorialNavbar theme="light" />
      <main>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroText}>
              <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
                <Link href="/">Accueil</Link><span>/</span>
                <span className={styles.current}>{page.service}{page.area ? ` · ${page.area.name}` : ''}</span>
              </nav>
              <span className={styles.eyebrow}>{page.eyebrow}</span>
              <h1 className={styles.title}>{page.h1}</h1>
              <p className={styles.intro}>{page.intro}</p>

              <ul className={styles.badges}>
                <li>Depuis 1962</li>
                <li>Détaillant autorisé Daikin</li>
                <li>RBQ 8103-2112-33</li>
                <li>Membre CMMTQ</li>
              </ul>

              <div className={styles.heroActions}>
                <a href="tel:+15144940400" className={styles.phone}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
                  (514) 494-0400
                </a>
                <span className={styles.hours}>Lundi au vendredi, 8 h à 17 h</span>
              </div>
            </div>

            <div className={styles.heroForm}>
              <ContactRequestForm compact source={page.slug} />
            </div>
          </div>
        </section>

        <section className={styles.answerSection}>
          <div className="container">
            <div className={`${styles.answer} answer`}>
              <span className={styles.answerLabel}>EN BREF</span>
              <p>{page.answer}</p>
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <div className={`container ${styles.contentGrid}`}>
            <div className={styles.sections}>
              {page.sections.map((s, i) => (
                <div key={s.title} className={styles.block}>
                  <span className={styles.blockNum}>0{i + 1}</span>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
            <aside className={styles.side}>
              <div className={styles.sideImage}>
                <img src={page.image} alt={page.imageAlt || page.h1} loading="lazy" style={page.image.endsWith('.webp') && page.image.includes('section-5') ? { objectFit: 'contain', background: '#f6f7f9' } : undefined} />
              </div>
              <div className={styles.sideBlock}>
                <span className={styles.sideLabel}>Produits recommandés</span>
                <ul className={styles.sideList}>
                  {products.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/produits/${p.slug}`}>
                        <span>{p.num}</span> {p.name}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.sideBlock}>
                <span className={styles.sideLabel}>Pourquoi Bellechasse</span>
                <ul className={styles.why}>
                  <li>Trois générations d’installateurs depuis 1962</li>
                  <li>Frigoristes certifiés, aucune sous-traitance</li>
                  <li>Garantie du fabricant jusqu’à 12 ans</li>
                  <li>Soumission gratuite, prix ferme</li>
                  <li>Aide avec les subventions</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {page.area && (
          <section className={styles.areas}>
            <div className="container">
              <span className={styles.eyebrow}>SECTEURS DESSERVIS</span>
              <h2 className={styles.areasTitle}>
                {page.area.slug === 'montreal' ? 'Tous les arrondissements de Montréal' : `Partout ${page.area.slug === 'laval' ? 'à Laval' : `sur la ${page.area.name}`}`}
              </h2>
              <ul className={styles.sectorList}>
                {page.area.sectors.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
          </section>
        )}

        <FAQBlock faq={page.faq} title={page.area ? `Questions fréquentes à ${page.area.name}` : `Questions fréquentes : ${page.service.toLowerCase()}`} />

        <section className={styles.otherAreas}>
          <div className="container">
            <span className={styles.eyebrow}>NOUS DESSERVONS AUSSI</span>
            <div className={styles.areaLinks}>
              {otherCities.map((a) => (
                <Link key={a.slug} href={`/thermopompe-${a.slug}`}>
                  Thermopompe {a.name}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>
                </Link>
              ))}
              {page.type === 'city' && (
                <>
                  <Link href="/installation-thermopompe">Installation de thermopompe<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg></Link>
                  <Link href="/remplacement-fournaise-mazout">Conversion du mazout<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg></Link>
                </>
              )}
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={`container ${styles.finalRow}`}>
            <div>
              <h2>Parlons de votre maison.</h2>
              <p>Évaluation gratuite à domicile, prix ferme, subventions vérifiées.</p>
            </div>
            <div className={styles.finalActions}>
              <Link href="/contact" className={styles.button}>
                Demander une soumission
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>
              </Link>
              <a href="tel:+15144940400" className={styles.finalPhone}>(514) 494-0400</a>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooterFull />
    </>
  );
}
