import { SITE_URL, ALL_CITIES, PHONE_SCHEMA, RBQ, EMAIL, ADDRESS, SOCIAL, GOOGLE_RATING } from '../../lib/site';
import { reviewSchemas } from '../../lib/reviews';

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['HVACBusiness', 'LocalBusiness', 'Organization'],
        '@id': `${SITE_URL}/#organization`,
        name: 'Bellechasse Énergie',
        alternateName: 'Bellechasse Energie',
        legalName: 'Bellechasse Énergie',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo-png.png`,
          width: 1024,
          height: 341,
        },
        image: `${SITE_URL}/hero.jpg`,
        description:
          "Entreprise familiale depuis 1962 spécialisée dans la vente, l'installation, l'entretien et la réparation de thermopompes, systèmes de climatisation, fournaises et échangeurs d'air dans le Grand Montréal, à Laval, sur la Rive-Nord et la Rive-Sud. Détaillant autorisé Daikin.",
        slogan: 'Le confort, maîtrisé.',
        foundingDate: '1962',
        founder: { '@type': 'Person', name: 'Jacques' },
        telephone: PHONE_SCHEMA,
        email: EMAIL,
        priceRange: '$$',
        currenciesAccepted: 'CAD',
        paymentAccepted: 'Cash, Credit Card, Debit Card, Financing',
        address: {
          '@type': 'PostalAddress',
          ...(ADDRESS ? { streetAddress: ADDRESS.street, postalCode: ADDRESS.postalCode } : {}),
          addressLocality: ADDRESS ? ADDRESS.city : 'Montréal',
          addressRegion: 'QC',
          addressCountry: 'CA',
        },
        ...(ADDRESS && ADDRESS.lat ? { geo: { '@type': 'GeoCoordinates', latitude: ADDRESS.lat, longitude: ADDRESS.lng } } : {}),
        ...(SOCIAL.googleBusiness ? { hasMap: SOCIAL.googleBusiness } : {}),
        ...(GOOGLE_RATING.value
          ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: GOOGLE_RATING.value, reviewCount: GOOGLE_RATING.count, bestRating: 5, worstRating: 1 } }
          : {}),
        review: reviewSchemas(`${SITE_URL}/#organization`, 10),
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Grand Montréal' },
          { '@type': 'City', name: 'Laval' },
          { '@type': 'AdministrativeArea', name: 'Rive-Nord' },
          { '@type': 'AdministrativeArea', name: 'Rive-Sud' },
          ...ALL_CITIES.map((n) => ({ '@type': 'City', name: n })),
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '17:00',
          },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '00:00', closes: '00:00' },
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: PHONE_SCHEMA,
            contactType: 'sales',
            areaServed: 'CA-QC',
            availableLanguage: ['fr', 'en'],
          },
          {
            '@type': 'ContactPoint',
            telephone: PHONE_SCHEMA,
            contactType: 'customer service',
            areaServed: 'CA-QC',
            availableLanguage: ['fr', 'en'],
          },
        ],
        sameAs: Object.values(SOCIAL).filter(Boolean),
        brand: [
          { '@type': 'Brand', name: 'Daikin' },
          { '@type': 'Brand', name: 'Moovair' },
          { '@type': 'Brand', name: 'Tosot' },
          { '@type': 'Brand', name: 'Aldes' },
          { '@type': 'Brand', name: 'Mainline' },
          { '@type': 'Brand', name: 'Steffes' },
        ],
        knowsAbout: [
          'Thermopompe', 'Thermopompe centrale', 'Thermopompe murale', 'Climatisation', 'Air climatisé central',
          'Fournaise électrique', 'Conversion du mazout', "Échangeur d'air", 'Subventions LogisVert', 'Rénoclimat',
        ],
        memberOf: { '@type': 'Organization', name: 'Corporation des maîtres mécaniciens en tuyauterie du Québec (CMMTQ)' },
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Licence RBQ',
          name: `Licence RBQ ${RBQ}`,
          recognizedBy: { '@type': 'Organization', name: 'Régie du bâtiment du Québec' },
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services de chauffage, climatisation et ventilation',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Installation de thermopompe', url: `${SITE_URL}/installation-thermopompe` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Thermopompe centrale', url: `${SITE_URL}/thermopompe-centrale-montreal` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Thermopompe murale', url: `${SITE_URL}/thermopompe-murale-montreal` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Climatisation', url: `${SITE_URL}/climatisation-montreal` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Chauffage résidentiel', url: `${SITE_URL}/chauffage-montreal` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remplacement de fournaise au mazout', url: `${SITE_URL}/remplacement-fournaise-mazout` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Entretien et réparation de thermopompe', url: `${SITE_URL}/entretien-reparation-thermopompe` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: "Installation d'échangeur d'air", url: `${SITE_URL}/echangeur-air-montreal` } },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Bellechasse Énergie',
        inLanguage: 'fr-CA',
        publisher: { '@id': `${SITE_URL}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/blogue?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
