import EditorialNavbar from '../../components/EditorialNavbar';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import ContactHero from '../../components/ContactHero';
import ContactTerritory from '../../components/ContactTerritory';
import ContactCTA from '../../components/ContactCTA';
import { ADDRESS, EMAIL } from '../../lib/site';

export const metadata = {
  title: 'Contact et soumission gratuite',
  description:
    'Soumission gratuite pour thermopompe, climatisation ou chauffage. Grand Montréal, Laval, Rive-Nord et Rive-Sud. Appelez au (514) 494-0400 ou écrivez-nous.',
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
  ...(ADDRESS ? { location: { '@type': 'Place', name: 'Bellechasse Énergie', address: { '@type': 'PostalAddress', streetAddress: ADDRESS.street, addressLocality: ADDRESS.city, addressRegion: ADDRESS.region, postalCode: ADDRESS.postalCode, addressCountry: 'CA' } } } : {}),
  mainEntity: {
    '@type': 'ContactPoint',
    email: EMAIL,
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
      <main id="contenu">
        <ContactHero />
        <ContactTerritory />
        <ContactCTA />
      </main>
      <EditorialFooterFull />
    </>
  );
}
