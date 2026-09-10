import ExpertiseHero from '../../components/ExpertiseHero';
import ExpertiseHistory from '../../components/ExpertiseHistory';
import ExpertiseTimeline from '../../components/ExpertiseTimeline';
import ExpertiseMethod from '../../components/ExpertiseMethod';
import ExpertiseSolutions from '../../components/ExpertiseSolutions';
import ExpertiseCTA from '../../components/ExpertiseCTA';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import EditorialNavbar from '../../components/EditorialNavbar';
import Testimonials from '../../components/Testimonials';
import { SITE_URL, ORGANIZATION_ID, breadcrumbSchema, graph } from '../../lib/site';

export const metadata = {
  title: 'Notre expertise depuis 1962',
  description: "Entreprise familiale depuis 1962 : trois générations, des milliers d'installations de thermopompes et de climatisation à Montréal, Laval et sur les rives.",
  alternates: { canonical: `${SITE_URL}/notre-expertise` },
  openGraph: {
    title: 'Notre expertise | Bellechasse Énergie',
    description: "Entreprise familiale depuis 1962. Trois générations, des milliers d'installations, une seule exigence : que ça fonctionne, hiver comme été.",
    url: `${SITE_URL}/notre-expertise`,
  },
};

const schema = graph(
  {
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/notre-expertise#page`,
    url: `${SITE_URL}/notre-expertise`,
    name: 'Notre expertise | Bellechasse Énergie',
    inLanguage: 'fr-CA',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': ORGANIZATION_ID },
  },
  breadcrumbSchema([{ name: 'Accueil', href: '/' }, { name: 'Notre expertise', href: '/notre-expertise' }])
);

export default function NotreExpertise() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <EditorialNavbar theme="light" />
      <main id="contenu">
        <ExpertiseHero />
        <ExpertiseHistory />
        <ExpertiseTimeline />
        <ExpertiseMethod />
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'var(--bg-main)' }}>
          <div style={{ width: '100%', maxWidth: '1400px', height: '2px', backgroundColor: 'rgba(0, 0, 0, 0.15)' }}></div>
        </div>
        <ExpertiseSolutions />
        <Testimonials />
        <ExpertiseCTA />
      </main>
      <EditorialFooterFull />
    </>
  );
}
