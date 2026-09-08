import { getPostSummaries } from '../lib/blog';
import { PRODUCT_CATEGORIES } from '../lib/products';
import { LANDING_PAGES } from '../lib/landing';
import { SITE_URL } from '../lib/site';

export default function sitemap() {
  const now = new Date();
  const entry = (path, priority, changeFrequency = 'monthly', lastModified = now) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry('/', 1, 'weekly'),
    entry('/contact', 0.9, 'monthly'),
    entry('/nos-solutions', 0.9, 'monthly'),
    entry('/produits', 0.8, 'monthly'),
    ...PRODUCT_CATEGORIES.map((c) => entry(`/produits/${c.slug}`, 0.8)),
    ...LANDING_PAGES.map((p) => entry(`/${p.slug}`, p.type === 'city' ? 0.9 : 0.8)),
    entry('/financement', 0.8),
    entry('/notre-expertise', 0.7),
    entry('/blogue', 0.8, 'weekly'),
    ...getPostSummaries().map((p) => entry(p.url, 0.7, 'monthly', new Date(p.updated || p.date))),
    entry('/confidentialite', 0.2, 'yearly'),
  ];
}
