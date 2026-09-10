// Domaine officiel du nouveau site (acheté chez Hostinger le 2026-09-09). Le .ca historique
// redirige vers lui dès qu'il pointera vers le VPS.
export const SITE_URL = 'https://bellechasseenergie.com';
export const SITE_NAME = 'Bellechasse Énergie';
export const PHONE_DISPLAY = '(514) 494-0400';
export const PHONE_TEL = '+15144940400';
export const PHONE_SCHEMA = '+1-514-494-0400';
export const EMAIL = 'info@bellechasseenergie.ca';
export const RBQ = '8103-2112-33';
export const FOUNDED = '1962';
export const HOURS_LABEL = 'Lundi au vendredi, 8 h à 17 h';

/**
 * Adresse civique. Laisser `null` tant que l'entreprise ne souhaite pas la publier :
 * le pied de page, la page Contact et les données structurées s'adaptent.
 * Exemple : { street: '1234 rue Bellechasse', city: 'Montréal', region: 'QC', postalCode: 'H1H 1H1', lat: 45.55, lng: -73.58 }
 */
export const ADDRESS = {
  street: '9257, rue de Marseille',
  city: 'Montréal',
  borough: 'Mercier–Hochelaga-Maisonneuve',
  region: 'QC',
  postalCode: 'H1L 1T2',
  lat: 45.6087,
  lng: -73.5232,
};
export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.city} (Québec) ${ADDRESS.postalCode}`;
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(`${ADDRESS.street}, ${ADDRESS.city}, ${ADDRESS.region} ${ADDRESS.postalCode}`)}&z=15&hl=fr&output=embed`;
export const MAPS_LINK_URL = 'https://share.google/yZ7qXUPdDGskSlDGl';

/** Profils officiels (utilisés dans les données structurées `sameAs` et le pied de page). */
export const SOCIAL = {
  facebook: 'https://www.facebook.com/p/Bellechasse-%C3%89nergie-1962-100057337995312/',
  youtube: null,
  instagram: null,
  linkedin: null,
  /** Fiche Google Business Profile. */
  googleBusiness: 'https://share.google/yZ7qXUPdDGskSlDGl',
};

/**
 * Note Google. À renseigner depuis la fiche Google Business Profile ; tant que `value`
 * est null, aucune note n'est publiée dans les données structurées (on n'invente rien).
 */
export const GOOGLE_RATING = { value: 4.7, count: 193, url: 'https://share.google/yZ7qXUPdDGskSlDGl' };

export const AREAS = [
  {
    slug: 'montreal',
    name: 'Montréal',
    label: 'Grand Montréal',
    sectors: [
      'Rosemont–La Petite-Patrie', 'Villeray–Saint-Michel–Parc-Extension', 'Ahuntsic-Cartierville',
      'Le Plateau-Mont-Royal', 'Mercier–Hochelaga-Maisonneuve', 'Anjou', 'Saint-Léonard',
      'Montréal-Nord', 'Rivière-des-Prairies–Pointe-aux-Trembles', 'Côte-des-Neiges–Notre-Dame-de-Grâce',
      'Verdun', 'LaSalle', 'Lachine', 'Saint-Laurent', 'Outremont', 'Westmount', 'Mont-Royal',
      'Pointe-Claire', 'Dorval', 'Dollard-des-Ormeaux', 'Kirkland', 'Beaconsfield', 'Pierrefonds-Roxboro',
    ],
  },
  {
    slug: 'laval',
    name: 'Laval',
    label: 'Laval',
    sectors: [
      'Chomedey', 'Sainte-Rose', 'Vimont', 'Auteuil', 'Duvernay', 'Saint-Vincent-de-Paul',
      'Pont-Viau', 'Laval-des-Rapides', 'Fabreville', 'Sainte-Dorothée', 'Laval-Ouest', 'Saint-François',
    ],
  },
  {
    slug: 'rive-nord',
    name: 'Rive-Nord',
    label: 'Rive-Nord',
    sectors: [
      'Terrebonne', 'Mascouche', 'Repentigny', 'Blainville', 'Boisbriand', 'Sainte-Thérèse',
      'Saint-Eustache', 'Mirabel', 'Rosemère', 'Lorraine', 'Bois-des-Filion', 'Sainte-Anne-des-Plaines',
      'Deux-Montagnes', 'Saint-Jérôme', "L'Assomption", 'Charlemagne',
    ],
  },
  {
    slug: 'rive-sud',
    name: 'Rive-Sud',
    label: 'Rive-Sud',
    sectors: [
      'Longueuil', 'Brossard', 'Saint-Lambert', 'Boucherville', 'Saint-Hubert', 'Greenfield Park',
      'La Prairie', 'Candiac', 'Châteauguay', 'Saint-Bruno-de-Montarville', 'Sainte-Julie', 'Varennes',
      'Chambly', 'Saint-Constant', 'Delson', 'Beloeil', 'Mont-Saint-Hilaire',
    ],
  },
];

export const ALL_CITIES = AREAS.flatMap((a) => (a.slug === 'montreal' ? ['Montréal'] : a.sectors));

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.href}`,
    })),
  };
}

export function faqSchema(faq) {
  if (!faq || faq.length === 0) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema({ name, description, url, areaNames, serviceType }) {
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    serviceType: serviceType || name,
    description,
    url,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: areaNames.map((n) => ({ '@type': 'City', name: n })),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${SITE_URL}/contact`,
      servicePhone: { '@type': 'ContactPoint', telephone: PHONE_SCHEMA, contactType: 'sales' },
    },
    hasOfferCatalog: undefined,
  };
}

export function graph(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) };
}
