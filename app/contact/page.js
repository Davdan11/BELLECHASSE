import EditorialNavbar from '../../components/EditorialNavbar';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import ContactHero from '../../components/ContactHero';
import ContactTerritory from '../../components/ContactTerritory';
import ContactCTA from '../../components/ContactCTA';

export const metadata = {
  title: 'Contact et soumission gratuite',
  description:
    "Demandez une soumission gratuite pour l'installation, l'entretien ou la réparation de thermopompes, climatisation et chauffage. Grand Montréal, Laval, Rive-Nord et Rive-Sud. (514) 494-0400.",
  alternates: {
    canonical: 'https://bellechasseenergie.com/contact',
  },
  openGraph: {
    title: 'Contact et soumission gratuite | Bellechasse Énergie',
    description:
      "Parlons de votre projet de thermopompe, climatisation ou chauffage. Soumission gratuite dans le Grand Montréal, Laval, Rive-Nord et Rive-Sud.",
    url: 'https://bellechasseenergie.com/contact',
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://bellechasseenergie.com/contact#page',
  url: 'https://bellechasseenergie.com/contact',
  name: 'Contact et soumission gratuite | Bellechasse Énergie',
  isPartOf: { '@id': 'https://bellechasseenergie.com/#website' },
  about: { '@id': 'https://bellechasseenergie.com/#organization' },
  mainEntity: {
    '@type': 'ContactPoint',
    telephone: '+1-514-494-0400',
    contactType: 'customer service',
    areaServed: ['Montréal', 'Laval', 'Rive-Nord', 'Rive-Sud'],
    availableLanguage: ['fr-CA'],
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <EditorialNavbar theme="light" />
      <main>
        <ContactHero />
        <ContactTerritory />
        <ContactCTA />
      </main>
      <EditorialFooterFull />
    </>
  );
}
