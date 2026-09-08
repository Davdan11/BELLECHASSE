import ExpertiseHero from '../../components/ExpertiseHero';
import ExpertiseHistory from '../../components/ExpertiseHistory';
import ExpertiseTimeline from '../../components/ExpertiseTimeline';
import ExpertiseMethod from '../../components/ExpertiseMethod';
import ExpertiseSolutions from '../../components/ExpertiseSolutions';
import ExpertiseCTA from '../../components/ExpertiseCTA';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import EditorialNavbar from '../../components/EditorialNavbar';

export const metadata = {
  title: 'Notre Expertise',
  description: 'Découvrez l\'histoire de Bellechasse Énergie. Une entreprise familiale depuis 1962, trois générations d\'expertise en chauffage et climatisation à Montréal.',
  alternates: {
    canonical: 'https://bellechasseenergie.com/notre-expertise',
  },
};

export default function NotreExpertise() {
  return (
    <>
      <EditorialNavbar theme="light" />
      <main>
        <ExpertiseHero />
        <ExpertiseHistory />
        <ExpertiseTimeline />
        <ExpertiseMethod />
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'var(--bg-main)' }}>
          <div style={{ width: '100%', maxWidth: '1400px', height: '2px', backgroundColor: 'rgba(0, 0, 0, 0.15)' }}></div>
        </div>
        <ExpertiseSolutions />
        <ExpertiseCTA />
      </main>
      <EditorialFooterFull />
    </>
  );
}
