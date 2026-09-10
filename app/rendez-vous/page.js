import EditorialNavbar from '../../components/EditorialNavbar';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import BookingHero from '../../components/BookingHero';
import ContactCTA from '../../components/ContactCTA';
import { SITE_URL, ORGANIZATION_ID, PHONE_SCHEMA, breadcrumbSchema, faqSchema, graph } from '../../lib/site';
import FAQBlock from '../../components/FAQBlock';

const URL = `${SITE_URL}/rendez-vous`;

export const metadata = {
  title: 'Prendre rendez-vous avec un conseiller',
  description:
    "Réservez en ligne la visite gratuite d'un conseiller, selon les horaires de votre secteur : Montréal, Laval, Rive-Nord, Rive-Sud. Confirmation immédiate.",
  alternates: { canonical: URL },
  openGraph: {
    title: 'Prendre rendez-vous avec un conseiller | Bellechasse Énergie',
    description:
      "Choisissez votre secteur, la date et la plage horaire. Un conseiller se déplace chez vous pour une évaluation gratuite et une soumission ferme.",
    url: URL,
  },
};

const FAQ = [
  {
    q: 'Combien de temps dure la visite?',
    a: "Environ 90 minutes. Le conseiller mesure la maison, examine votre système actuel, calcule la charge de chauffage et de climatisation et répond à vos questions.",
  },
  {
    q: 'La visite est-elle vraiment gratuite?',
    a: "Oui, gratuite et sans engagement. Vous recevez une soumission détaillée avec un prix ferme et vous décidez ensuite, à votre rythme.",
  },
  {
    q: 'Dois-je être présent?',
    a: "Oui. Le conseiller a besoin d'accéder à l'intérieur et à l'extérieur de la maison, et de discuter de vos attentes avec vous.",
  },
  {
    q: 'Comment modifier ou annuler mon rendez-vous?',
    a: "Appelez-nous au (514) 494-0400 en mentionnant le numéro de référence reçu à la réservation. Nous trouverons une autre plage.",
  },
];

const schema = graph(
  {
    '@type': 'WebPage',
    '@id': `${URL}#page`,
    url: URL,
    name: 'Prendre rendez-vous avec un conseiller | Bellechasse Énergie',
    inLanguage: 'fr-CA',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': ORGANIZATION_ID },
    potentialAction: {
      '@type': 'ScheduleAction',
      target: { '@type': 'EntryPoint', urlTemplate: URL, actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'] },
      object: { '@type': 'Service', name: 'Visite et soumission gratuite à domicile', provider: { '@id': ORGANIZATION_ID } },
    },
    mainEntity: {
      '@type': 'ContactPoint',
      telephone: PHONE_SCHEMA,
      contactType: 'sales',
      areaServed: ['Montréal', 'Laval', 'Rive-Nord', 'Rive-Sud'],
      availableLanguage: ['fr-CA'],
    },
  },
  breadcrumbSchema([
    { name: 'Accueil', href: '/' },
    { name: 'Contact', href: '/contact' },
    { name: 'Rendez-vous', href: '/rendez-vous' },
  ]),
  faqSchema(FAQ)
);

export default function RendezVousPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <EditorialNavbar theme="light" />
      <main id="contenu">
        <BookingHero />
        <FAQBlock faq={FAQ} title="Questions sur la visite" />
        <ContactCTA />
      </main>
      <EditorialFooterFull />
    </>
  );
}
