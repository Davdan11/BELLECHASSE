import EditorialNavbar from '../../components/EditorialNavbar';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import ProductsHero from '../../components/ProductsHero';
import ProductsCategoryNav from '../../components/ProductsCategoryNav';
import ProductsHeating from '../../components/ProductsHeating';
import ProductsCooling from '../../components/ProductsCooling';
import ProductsAddons from '../../components/ProductsAddons';
import ProductsCTA from '../../components/ProductsCTA';

export const metadata = {
  title: 'Nos Produits | Bellechasse Énergie',
  description: 'Explorez nos systèmes de chauffage, climatisation et ventilation adaptés à votre espace.',
};

export default function ProduitsPage() {
  return (
    <>
      <EditorialNavbar />
      <main>
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
