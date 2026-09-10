import EditorialNavbar from '../../components/EditorialNavbar';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import SolutionsHero from '../../components/SolutionsHero';
import SolutionsTabs from '../../components/SolutionsTabs';
import SolutionsCentral from '../../components/SolutionsCentral';
import SolutionsWall from '../../components/SolutionsWall';
import SolutionsComplete from '../../components/SolutionsComplete';
import SolutionsCTA from '../../components/SolutionsCTA';

export const metadata = {
  title: 'Nos solutions chauffage et climatisation',
  description:
    "Thermopompe centrale ou murale, climatisation, fournaise, échangeur d'air : la bonne solution selon votre maison, installée par des experts depuis 1962.",
  alternates: {
    canonical: 'https://bellechasseenergie.com/nos-solutions',
  },
  openGraph: {
    title: 'Nos solutions de chauffage et climatisation | Bellechasse Énergie',
    description:
      "À chaque maison, la bonne solution. Thermopompes, climatisation, chauffage et ventilation dans le Grand Montréal.",
    url: 'https://bellechasseenergie.com/nos-solutions',
  },
};

export default function NosSolutionsPage() {
  return (
    <>
      <EditorialNavbar theme="light" />
      <main id="contenu">
        <SolutionsHero />
        <SolutionsTabs />
        <SolutionsCentral />
        <SolutionsWall />
        <SolutionsComplete />
        <SolutionsCTA />
      </main>
      <EditorialFooterFull />
    </>
  );
}
