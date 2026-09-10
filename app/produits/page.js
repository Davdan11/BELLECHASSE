import EditorialNavbar from '../../components/EditorialNavbar';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import ProductsHero from '../../components/ProductsHero';
import ProductsCategoryNav from '../../components/ProductsCategoryNav';
import ProductsHeating from '../../components/ProductsHeating';
import ProductsCooling from '../../components/ProductsCooling';
import ProductsAddons from '../../components/ProductsAddons';
import ProductsCTA from '../../components/ProductsCTA';
import { SITE_URL, ORGANIZATION_ID, breadcrumbSchema, graph } from '../../lib/site';

export const metadata = {
  title: 'Produits : thermopompes et climatisation',
  description:
    "Thermopompes centrales et murales Daikin, air climatisé, fournaises électriques et échangeurs d'air. Vente et installation à Montréal, Laval et sur les rives.",
  alternates: { canonical: `${SITE_URL}/produits` },
  openGraph: {
    title: 'Nos produits | Bellechasse Énergie',
    description: "Thermopompes, climatisation, chauffage et ventilation : les appareils que nous installons, avec les marques que nous avons choisies.",
    url: `${SITE_URL}/produits`,
  },
};

const schema = graph(
  {
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/produits#page`,
    url: `${SITE_URL}/produits`,
    name: 'Nos produits | Bellechasse Énergie',
    inLanguage: 'fr-CA',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': ORGANIZATION_ID },
  },
  breadcrumbSchema([{ name: 'Accueil', href: '/' }, { name: 'Produits', href: '/produits' }])
);

export default function ProduitsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <EditorialNavbar theme="light" />
      <main id="contenu">
        <ProductsHero />
        <ProductsCategoryNav />
        <ProductsHeating />
        <ProductsCooling />
        <ProductsAddons />
        <ProductsCTA />
      </main>
      <EditorialFooterFull />
    </>
  );
}
