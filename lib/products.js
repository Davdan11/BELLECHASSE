export const PRODUCT_CATEGORIES = [
  {
    slug: 'thermopompe-centrale',
    num: '01',
    name: 'Thermopompe centrale',
    plural: 'Thermopompes centrales',
    eyebrow: 'SYSTÈMES CENTRAUX',
    title: 'Un confort qui fait toute la maison.',
    intro:
      "La thermopompe centrale chauffe l'hiver et climatise l'été en utilisant le réseau de conduits de votre maison. Une seule unité extérieure, un seul thermostat, une température uniforme dans chaque pièce.",
    image: '/solution-centrale.png',
    imageFit: 'contain',
    metaTitle: 'Thermopompe centrale à Montréal : Daikin Fit, Skyair, Moovair',
    metaDescription:
      "Installation de thermopompes centrales climat froid à Montréal, Laval, Rive-Nord et Rive-Sud. Daikin Fit, Daikin Skyair et Moovair. Soumission gratuite, détaillant autorisé Daikin.",
    benefits: [
      { title: 'Toute la maison, une seule machine', text: "L'air chauffé ou climatisé est distribué par vos conduits existants dans chaque pièce." },
      { title: 'Conçue pour nos hivers', text: 'Les modèles climat froid maintiennent leur capacité de chauffage bien en dessous de -20 °C.' },
      { title: 'Invisible et silencieuse', text: "L'unité intérieure se cache au sous-sol ou dans un placard. Rien à voir, rien à entendre dans les pièces de vie." },
      { title: 'Remplace le mazout et le gaz', text: 'La solution la plus courante pour convertir une fournaise au mazout, avec appoint électrique intégré.' },
    ],
    models: [
      {
        id: 'daikin-fit',
        name: 'Daikin Fit',
        brand: 'Daikin',
        image: '/tab-daikin-fit.webp',
        summary: 'Le système central compact et silencieux, parfait pour les terrains étroits et les maisons de ville.',
        points: ['Unité extérieure mince, installable dans un passage étroit', 'Technologie Inverter à vitesse variable', 'Très faible niveau sonore', "Jusqu'à 12 ans de garantie sur les pièces avec enregistrement"],
      },
      {
        id: 'daikin-skyair',
        name: 'Daikin Skyair',
        brand: 'Daikin',
        image: '/tab-daikin-skyair.webp',
        summary: 'La solution robuste pour les grandes surfaces, les plex et les petits commerces.',
        points: ['Grande capacité de chauffage et de climatisation', 'Fonctionnement fiable par grand froid', 'Compatible avec plusieurs types d’unités intérieures', 'Idéale pour les bâtiments à usage mixte'],
      },
      {
        id: 'moovair-centrale',
        name: 'Moovair Centrale',
        brand: 'Moovair',
        image: '/tab-moovair.webp',
        summary: "La thermopompe centrale canadienne pensée pour le climat d'ici, au meilleur rapport qualité-prix.",
        points: ['Conçue pour le climat canadien', 'Excellent rapport qualité-prix', 'Chauffage efficace à très basse température', 'Admissible aux programmes de subvention en vigueur'],
      },
    ],
    faq: [
      { q: 'Ma maison doit-elle avoir des conduits pour une thermopompe centrale?', a: "Oui. La thermopompe centrale utilise un réseau de conduits pour distribuer l'air. Si votre maison n'en a pas, une thermopompe murale ou un système multizone est généralement plus avantageux." },
      { q: 'Une thermopompe centrale chauffe-t-elle vraiment en janvier?', a: "Oui, à condition de choisir un modèle climat froid. Ces appareils gardent une bonne capacité de chauffage jusqu'à -25 °C, voire -30 °C selon le modèle. Une source d'appoint prend le relais lors des nuits extrêmes." },
      { q: "Combien de temps prend l'installation?", a: 'En général une à deux journées pour un remplacement complet, incluant la mise en marche et les explications.' },
    ],
    related: ['thermopompe-murale', 'air-climatise-central', 'fournaise-air-pulse'],
  },
  {
    slug: 'thermopompe-murale',
    num: '02',
    name: 'Thermopompe murale',
    plural: 'Thermopompes murales',
    eyebrow: 'SYSTÈMES MURAUX',
    title: 'Le confort, pièce par pièce.',
    intro:
      "La thermopompe murale, aussi appelée sans conduits ou mini-split, chauffe et climatise sans travaux majeurs. Une unité extérieure, une ou plusieurs unités intérieures, chacune avec sa propre température.",
    image: '/solution-murale.png',
    imageFit: 'contain',
    metaTitle: 'Thermopompe murale à Montréal : Daikin Atmosphera, Oterra, multizone',
    metaDescription:
      "Installation de thermopompes murales climat froid à Montréal, Laval, Rive-Nord et Rive-Sud. Daikin Atmosphera, Oterra et systèmes multizones. Installation en une journée, soumission gratuite.",
    benefits: [
      { title: 'Sans conduits, sans gros travaux', text: 'Une ouverture de quelques centimètres dans le mur suffit. Installation souvent terminée en une journée.' },
      { title: 'Chaque pièce à sa température', text: 'Chaque unité intérieure a sa propre télécommande. Chambres fraîches, salon confortable.' },
      { title: 'Remplace les plinthes électriques', text: 'Réduction importante de la facture de chauffage par rapport aux plinthes.' },
      { title: 'Multizone pour toute la maison', text: "Jusqu'à cinq unités intérieures sur une seule unité extérieure." },
    ],
    models: [
      {
        id: 'daikin-atmosphera',
        name: 'Daikin Atmosphera',
        brand: 'Daikin',
        image: '/tab-daikin-atmosphera.webp',
        summary: 'La murale climat froid haut de gamme de Daikin, conçue pour chauffer efficacement même par grand froid.',
        points: ['Chauffage maintenu à très basse température', 'Fonctionnement ultra silencieux', 'Filtration avancée de l’air', 'Design mince et discret'],
      },
      {
        id: 'daikin-oterra',
        name: 'Daikin Oterra',
        brand: 'Daikin',
        image: '/tab-oterra.webp',
        summary: "L'équilibre entre performance, fiabilité et prix pour une pièce ou un espace ouvert.",
        points: ['Technologie Inverter', 'Fiabilité Daikin', 'Bon rapport qualité-prix', 'Installation rapide'],
      },
      {
        id: 'multizones',
        name: 'Daikin Multi-Zone',
        brand: 'Daikin',
        image: '/tab-daikin-multi-zone-mxlh.webp',
        summary: 'Plusieurs pièces, une seule unité extérieure. La solution pour les maisons sans conduits sur deux étages et les plex.',
        points: ['De 2 à 5 unités intérieures', 'Contrôle indépendant par pièce', 'Une seule unité extérieure sur le terrain', 'Combinable avec des unités murales, au plafond ou encastrées'],
      },
    ],
    faq: [
      { q: 'Une thermopompe murale peut-elle chauffer toute ma maison?', a: "Une seule unité chauffe surtout la pièce où elle est installée et les espaces ouverts adjacents. Pour couvrir plusieurs pièces fermées, on choisit un système multizone." },
      { q: 'Est-ce bruyant?', a: "Non. Une unité murale de qualité produit autour de 20 à 25 dB au réglage le plus bas, moins qu'un chuchotement." },
      { q: 'Où installe-t-on l’unité extérieure?', a: "Sur un support mural ou au sol, à un endroit qui respecte le règlement municipal et la tranquillité des voisins. Nos conseillers choisissent l'emplacement avec vous lors de la visite." },
    ],
    related: ['thermopompe-centrale', 'air-climatise-mural', 'echangeur-air'],
  },
  {
    slug: 'air-climatise-central',
    num: '03',
    name: 'Air climatisé central',
    plural: 'Systèmes de climatisation centrale',
    eyebrow: 'CLIMATISATION CENTRALE',
    title: "L'été, à la bonne température.",
    intro:
      "L'air climatisé central rafraîchit et déshumidifie toute la maison par vos conduits existants. Il se jumelle à une fournaise pour un confort complet toute l'année.",
    image: '/produit-3-skyair.png',
    imageFit: 'contain',
    metaTitle: 'Air climatisé central à Montréal : Daikin DX14SA, DX16SA, FDMQ',
    metaDescription:
      "Installation de climatisation centrale Daikin à Montréal, Laval, Rive-Nord et Rive-Sud. Modèles DX14SA, DX16SA et FDMQ. Confort uniforme, air déshumidifié, soumission gratuite.",
    benefits: [
      { title: 'Fraîcheur uniforme', text: "Chaque pièce reçoit de l'air frais par le réseau de conduits, sans zone chaude." },
      { title: 'Déshumidification', text: "Un air moins humide est plus confortable à une température plus élevée, donc moins de consommation." },
      { title: 'Se jumelle à votre fournaise', text: 'Le serpentin intérieur se pose sur la fournaise existante. Un seul système de distribution.' },
      { title: 'Silencieux à l’extérieur', text: "Les unités Daikin à vitesse variable sont parmi les plus discrètes du marché." },
    ],
    models: [
      { id: 'daikin-dx14sa', name: 'Daikin DX14SA', brand: 'Daikin', image: '/tab-daikin-dx-14sa.webp', summary: "Le climatiseur central fiable et abordable pour la plupart des maisons.", points: ['Efficacité éprouvée', 'Fonctionnement silencieux', 'Compatible avec la majorité des fournaises', 'Garantie Daikin'] },
      { id: 'daikin-dx16sa', name: 'Daikin DX16SA', brand: 'Daikin', image: '/tab-daikin-dx-16sa.webp', summary: 'Plus efficace, pour réduire la facture des étés chauds.', points: ['Efficacité supérieure', 'Compresseur haute performance', 'Confort stable', 'Garantie Daikin'] },
      { id: 'daikin-fdmq', name: 'Daikin FDMQ', brand: 'Daikin', image: '/tab-daikin-fdmq.webp', summary: "L'unité gainable compacte pour climatiser par conduits sans fournaise.", points: ['Installation dans un plafond ou un placard', 'Idéale pour les condos et les rénovations', 'Distribution discrète', 'Technologie Inverter'] },
    ],
    faq: [
      { q: 'Air climatisé central ou thermopompe centrale?', a: "Un air climatisé central ne fait que rafraîchir. Une thermopompe centrale rafraîchit et chauffe. Si votre fournaise est récente et que vous voulez seulement climatiser, l'air climatisé central est plus économique à l'achat." },
      { q: "Faut-il changer ma fournaise pour ajouter la climatisation centrale?", a: "Pas nécessairement. Si votre fournaise et son ventilateur sont en bon état, on ajoute simplement un serpentin et une unité extérieure." },
    ],
    related: ['thermopompe-centrale', 'air-climatise-mural', 'echangeur-air'],
  },
  {
    slug: 'air-climatise-mural',
    num: '04',
    name: 'Air climatisé mural',
    plural: 'Climatiseurs muraux',
    eyebrow: 'CLIMATISATION MURALE',
    title: 'La fraîcheur dans une pièce ou un espace.',
    intro:
      "Le climatiseur mural rafraîchit une pièce ou un espace ouvert sans conduits. Simple à installer, discret et efficace, il s'installe en quelques heures.",
    image: '/tab-oterra.webp',
    imageFit: 'contain',
    metaTitle: 'Air climatisé mural à Montréal : Daikin Entra, Mainline',
    metaDescription:
      "Installation de climatiseurs muraux sans conduits à Montréal, Laval, Rive-Nord et Rive-Sud. Daikin Entra, Mainline et systèmes multizones. Installé en quelques heures, soumission gratuite.",
    benefits: [
      { title: 'Installé en quelques heures', text: 'Aucun conduit, une petite ouverture dans le mur, et votre pièce est fraîche le jour même.' },
      { title: 'Idéal pour les condos et les étages', text: "Là où un système central n'est pas possible, le mural fait le travail." },
      { title: 'Économique', text: "Vous ne climatisez que l'espace utilisé." },
      { title: 'Évolutif', text: "Les systèmes multizones permettent d'ajouter des pièces plus tard." },
    ],
    models: [
      { id: 'daikin-entra', name: 'Daikin Entra', brand: 'Daikin', image: '/tab-daikin-entra.webp', summary: 'Le climatiseur mural Daikin accessible, fiable et silencieux.', points: ['Technologie Inverter', 'Mode déshumidification', 'Télécommande complète', 'Garantie Daikin'] },
      { id: 'mainline', name: 'Mainline', brand: 'Mainline', image: '/tab-mainline.webp', summary: 'Une solution simple et économique pour une pièce, un sous-sol ou un solarium.', points: ['Prix accessible', 'Installation rapide', 'Entretien facile', 'Idéal pour un espace secondaire'] },
      { id: 'mainline-multi-zone', name: 'Mainline Multi-Zone', brand: 'Mainline', image: '/tab-mainline-multi-zone.webp', summary: 'Plusieurs pièces climatisées avec une seule unité extérieure.', points: ['2 à 4 unités intérieures', 'Une seule unité extérieure', 'Contrôle indépendant', 'Rapport qualité-prix'] },
    ],
    faq: [
      { q: 'Climatiseur mural ou thermopompe murale?', a: "La thermopompe murale chauffe et climatise, le climatiseur mural ne fait que climatiser. Pour quelques centaines de dollars de plus, la thermopompe murale réduit aussi votre facture de chauffage l'hiver. C'est presque toujours le meilleur choix au Québec." },
      { q: 'Puis-je installer un climatiseur mural dans un condo?', a: "Oui, dans la plupart des cas, sous réserve du règlement de votre copropriété pour l'unité extérieure. Nous vous aidons à préparer la demande." },
    ],
    related: ['thermopompe-murale', 'air-climatise-central', 'echangeur-air'],
  },
  {
    slug: 'fournaise-air-pulse',
    num: '05',
    name: 'Fournaise à air pulsé',
    plural: 'Fournaises à air pulsé',
    eyebrow: 'CHAUFFAGE CENTRAL',
    title: 'Un chauffage distribué par le réseau de conduits.',
    intro:
      "La fournaise électrique à air pulsé chauffe toute la maison par les conduits. Seule ou jumelée à une thermopompe, elle remplace la fournaise au mazout ou au gaz de façon simple et fiable.",
    image: '/tab-steffes.webp',
    imageFit: 'contain',
    metaTitle: 'Fournaise électrique à air pulsé à Montréal : Steffes, Daikin MBVC',
    metaDescription:
      "Remplacement de fournaise au mazout ou au gaz par une fournaise électrique à air pulsé à Montréal, Laval, Rive-Nord et Rive-Sud. Steffes, Daikin MBVC, jumelage avec thermopompe. Soumission gratuite.",
    benefits: [
      { title: 'Remplace le mazout', text: "La solution directe pour se conformer à la réglementation et éliminer le réservoir." },
      { title: 'Se jumelle à une thermopompe', text: "La fournaise devient l'appoint pour les grands froids. La thermopompe fait le reste." },
      { title: 'Chaleur uniforme', text: 'Distribution par les conduits existants dans toutes les pièces.' },
      { title: 'Fiable et durable', text: 'Peu de pièces mobiles, entretien simple.' },
    ],
    models: [
      { id: 'steffes', name: 'Fournaise Steffes', brand: 'Steffes', image: '/tab-steffes.webp', summary: 'La fournaise électrique robuste, conçue pour être jumelée à une thermopompe centrale.', points: ['Éléments électriques modulants', 'Excellente compatibilité thermopompe', 'Construction durable', 'Fabriquée en Amérique du Nord'] },
      { id: 'daikin-mbvc', name: 'Daikin MBVC', brand: 'Daikin', image: '/tab-daikin-mbvc.webp', summary: "L'unité intérieure à ventilateur modulant qui optimise votre thermopompe centrale Daikin.", points: ['Ventilateur à vitesse variable', 'Éléments d’appoint intégrés', 'Silencieuse', 'Conçue pour les systèmes Daikin Fit'] },
    ],
    faq: [
      { q: 'Puis-je remplacer ma fournaise au mazout par une fournaise électrique?', a: "Oui. C'est même obligatoire depuis le 31 décembre 2023 de remplacer un appareil au mazout par une autre source d'énergie dans un bâtiment résidentiel existant." },
      { q: 'Fournaise électrique ou thermopompe?', a: "Les deux ensemble. La thermopompe chauffe efficacement la majeure partie de l'hiver et la fournaise prend le relais lors des grands froids. C'est la combinaison la plus économique à l'usage." },
    ],
    related: ['thermopompe-centrale', 'air-climatise-central', 'echangeur-air'],
  },
  {
    slug: 'echangeur-air',
    num: '06',
    name: "Échangeur d'air",
    plural: "Échangeurs d'air",
    eyebrow: 'VENTILATION',
    title: "Renouveler l'air à l'intérieur de votre maison.",
    intro:
      "L'échangeur d'air évacue l'air vicié, l'humidité et les polluants, et fait entrer de l'air neuf filtré en récupérant la chaleur. Indispensable dans une maison bien isolée.",
    image: '/tab-aldes.webp',
    imageFit: 'contain',
    metaTitle: "Échangeur d'air à Montréal : VRC et VRE Aldes",
    metaDescription:
      "Installation et remplacement d'échangeurs d'air (VRC, VRE) Aldes à Montréal, Laval, Rive-Nord et Rive-Sud. Meilleure qualité d'air, moins d'humidité, récupération de chaleur. Soumission gratuite.",
    benefits: [
      { title: 'Un air plus sain', text: 'Évacue les polluants, les odeurs et le CO2. Fait entrer de l’air neuf filtré.' },
      { title: 'Moins de condensation', text: "Contrôle l'humidité, réduit la buée dans les fenêtres et prévient la moisissure." },
      { title: 'Récupération de chaleur', text: "L'air sortant réchauffe l'air entrant. Ventiler sans gaspiller." },
      { title: 'Compatible avec votre système', text: "Se raccorde à vos conduits ou fonctionne avec ses propres bouches." },
    ],
    models: [
      { id: 'aldes', name: "Échangeur d'air Aldes", brand: 'Aldes', image: '/tab-aldes.webp', summary: 'Les ventilateurs récupérateurs de chaleur Aldes, certifiés HVI, silencieux et efficaces.', points: ['Certifié HVI', 'Récupération de chaleur élevée', 'Fonctionnement silencieux', 'Filtres faciles à entretenir'] },
    ],
    faq: [
      { q: "Ai-je besoin d'un échangeur d'air?", a: "Si votre maison est récente ou bien isolée, oui. Sans ventilation mécanique, l'humidité et les polluants s'accumulent. Les signes : buée dans les fenêtres, odeurs persistantes, air lourd." },
      { q: 'VRC ou VRE?', a: "Le VRC (récupérateur de chaleur) convient à la plupart des maisons du Québec. Le VRE (récupérateur d'énergie) transfère aussi l'humidité et peut convenir aux maisons très sèches l'hiver. Nous vous conseillons selon votre maison." },
    ],
    related: ['thermopompe-centrale', 'thermopompe-murale', 'fournaise-air-pulse'],
  },
];

export function getCategory(slug) {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug) || null;
}
