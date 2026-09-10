import { getPostSummaries } from '../lib/blog';
import { PRODUCT_CATEGORIES } from '../lib/products';
import { LANDING_PAGES } from '../lib/landing';
import { SITE_URL } from '../lib/site';

/* Date fixe pour les pages statiques : à mettre à jour lors d'une refonte de contenu,
   pour que le signal lastModified reste stable et significatif. */
const STATIC_DATE = new Date('2026-09-09');

const LANDING_PRIORITY = { city: 0.9, sector: 0.7, service: 0.8 };

export default function sitemap() {
  const entry = (path, priority, changeFrequency = 'monthly', lastModified = STATIC_DATE) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry('/', 1, 'weekly'),
    entry('/contact', 0.9, 'monthly'),
    entry('/rendez-vous', 0.9, 'monthly'),
    entry('/nos-solutions', 0.9, 'monthly'),
    entry('/prix-thermopompe', 0.9, 'monthly'),
    entry('/depannage-reparation', 0.9, 'monthly'),
    entry('/produits', 0.8, 'monthly'),
    ...PRODUCT_CATEGORIES.map((c) => entry(`/produits/${c.slug}`, 0.8)),
    ...LANDING_PAGES.map((p) => entry(`/${p.slug}`, LANDING_PRIORITY[p.type] ?? 0.8)),
    entry('/financement', 0.8),
    entry('/calculateur-subventions', 0.8),
    entry('/notre-expertise', 0.7),
    entry('/equipe', 0.6),
    entry('/carrieres', 0.5),
    entry('/blogue', 0.8, 'weekly'),
    ...getPostSummaries().map((p) => entry(p.url, 0.7, 'monthly', new Date(p.updated || p.date))),
    entry('/confidentialite', 0.2, 'yearly'),
  ];
}
