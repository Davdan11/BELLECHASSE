import { AREAS } from './site';

const AREA_BY_SLUG = Object.fromEntries(AREAS.map((a) => [a.slug, a]));

const COMMON_FAQ = {
  soumission: {
    q: 'La soumission est-elle vraiment gratuite et sans engagement?',
    a: "Oui. Un conseiller se déplace chez vous, mesure la maison, calcule la charge de chauffage et de climatisation, et vous remet un prix ferme. Vous décidez ensuite, sans pression.",
  },
  delai: {
    q: 'Quel est le délai pour une installation?',
    a: "Selon la saison, de quelques jours à deux semaines après l'acceptation de la soumission. Nous conseillons de planifier au printemps ou à l'automne, avant les pointes de l'été et de l'hiver.",
  },
  garantie: {
    q: 'Quelle garantie offrez-vous?',
    a: "La garantie complète du fabricant, jusqu'à 12 ans sur les pièces pour Daikin avec enregistrement, plus notre garantie sur l'installation. Nous sommes détaillant autorisé, ce qui protège votre garantie.",
  },
  subventions: {
    q: 'Vous occupez-vous des subventions?',
    a: "Oui. Nous vérifions votre admissibilité aux programmes en vigueur, comme LogisVert d'Hydro-Québec et Rénoclimat, et nous fournissons les documents requis pour votre demande.",
  },
};

function cityPage(areaSlug, extra) {
  const area = AREA_BY_SLUG[areaSlug];
  return {
    slug: `thermopompe-${areaSlug}`,
    type: 'city',
    area,
    service: 'Thermopompe',
    h1: `Thermopompe à ${area.name} : installation, vente et entretien`,
    metaTitle: `Thermopompe ${area.name} : installation`,
    metaDescription: `Installation de thermopompes murales et centrales à ${area.name}. Détaillant Daikin depuis 1962, subventions, soumission gratuite. (514) 494-0400.`,
    eyebrow: `THERMOPOMPE ${area.name.toUpperCase()}`,
    intro: extra.intro,
    answer: extra.answer,
    sections: extra.sections,
    faq: [...extra.faq, COMMON_FAQ.soumission, COMMON_FAQ.subventions, COMMON_FAQ.delai],
    products: ['thermopompe-centrale', 'thermopompe-murale', 'air-climatise-central'],
    image: extra.image || '/hero.jpg',
    imageAlt: `Installation de thermopompe à ${area.name}`,
  };
}

function servicePage(def) {
  return {
    type: 'service',
    area: null,
    faq: [...def.faq, COMMON_FAQ.soumission, COMMON_FAQ.garantie],
    image: def.image || '/hero.jpg',
    ...def,
  };
}

export const LANDING_PAGES = [
  cityPage('montreal', {
    intro:
      "Bellechasse Énergie installe, vend et entretient des thermopompes à Montréal depuis 1962. Trois générations, des milliers de maisons, de plex et de condos équipés, et une seule exigence : que ça fonctionne, hiver comme été.",
    answer:
      "Pour une maison de Montréal, la meilleure thermopompe est un modèle climat froid, installé par un détaillant autorisé, dimensionné selon un calcul de charge fait sur place. Comptez une installation en une journée pour une murale et une à deux journées pour une centrale.",
    sections: [
      {
        title: 'Des solutions pour chaque type d’habitation montréalaise',
        text:
          "Montréal, c'est des duplex et triplex de Rosemont et de Villeray avec leurs plinthes électriques, des bungalows d'Ahuntsic et de Saint-Léonard chauffés au mazout ou au gaz, des condos du Plateau et de Griffintown sans place pour une unité extérieure, et des maisons de l'Ouest-de-l'Île avec conduits. Nous avons une réponse pour chacun : thermopompe murale ou multizone pour les plex et les condos, thermopompe centrale pour les maisons avec conduits, conversion complète pour les maisons au mazout.",
      },
      {
        title: 'Règlements municipaux et voisinage',
        text:
          "Les arrondissements de Montréal encadrent l'emplacement et le bruit des unités extérieures. Nos conseillers connaissent ces règles et choisissent avec vous un emplacement conforme, discret et respectueux des voisins : loin des chambres, à bonne distance des limites de terrain, sur un support solide. Nous nous occupons des détails techniques pour que vous n'ayez pas à le faire.",
      },
      {
        title: 'Pourquoi les Montréalais nous choisissent',
        text:
          "Parce que nous sommes d'ici. Notre entreprise est née à Montréal en 1962 et n'a jamais quitté le Grand Montréal. Nos frigoristes sont certifiés, nous sommes membres de la CMMTQ et détenteurs de la licence RBQ 8103-2112-33. Nous sommes détaillant autorisé Daikin, ce qui vous donne la garantie complète du fabricant. Et pour chaque appareil Daikin vendu, nous remettons 5 $ à la Fondation Charles-Bruneau.",
      },
    ],
    faq: [
      { q: 'Installez-vous des thermopompes dans les condos à Montréal?', a: "Oui, sous réserve du règlement de copropriété pour l'unité extérieure. Nous préparons avec vous les documents pour le syndicat et proposons des unités compactes qui s'installent sur un balcon ou une toiture." },
      { q: 'Faites-vous les conversions du mazout à Montréal?', a: "Oui. C'est l'une de nos spécialités. Nous installons la thermopompe centrale ou la fournaise électrique, coordonnons le retrait du réservoir et vous guidons pour les subventions." },
    ],
  }),
  cityPage('laval', {
    intro:
      "Bellechasse Énergie dessert Laval, de Chomedey à Saint-François, depuis des décennies. Bungalows des années 60 et 70, maisons de Sainte-Rose et de Fabreville, condos de Laval-des-Rapides : nous connaissons vos maisons et ce qui les chauffe bien.",
    answer:
      "À Laval, la majorité des maisons ont des conduits, ce qui rend la thermopompe centrale climat froid particulièrement avantageuse. Elle remplace la fournaise au mazout ou au gaz, climatise l'été, et donne accès aux subventions en vigueur.",
    sections: [
      {
        title: 'Les maisons de Laval et la thermopompe centrale',
        text:
          "Une grande partie du parc résidentiel lavallois a été construite avec un système à air pulsé. C'est une chance : le réseau de conduits est déjà là. Une thermopompe centrale Daikin Fit ou Moovair s'y raccorde, chauffe toute la maison l'hiver, climatise l'été, et la fournaise existante ou une nouvelle fournaise électrique sert d'appoint. Pour les maisons chauffées aux plinthes, la thermopompe murale ou multizone reste la solution la plus rapide.",
      },
      {
        title: 'Un service de proximité',
        text:
          "Nos équipes se déplacent à Laval toute l'année pour l'évaluation, l'installation et l'entretien annuel. Vous parlez aux mêmes personnes avant, pendant et après les travaux. Pas de sous-traitance, pas de surprise.",
      },
      {
        title: 'Subventions et financement à Laval',
        text:
          "Les résidents de Laval ont accès aux programmes provinciaux et d'Hydro-Québec pour les thermopompes efficaces, avec des montants plus élevés lors du remplacement d'un système au mazout ou au gaz. Nous vérifions votre admissibilité et vous remettons les documents nécessaires. Des options de financement mensuel sont aussi disponibles.",
      },
    ],
    faq: [
      { q: 'Combien de temps pour une installation à Laval?', a: "Une thermopompe murale s'installe en une journée. Une centrale demande une à deux journées. Nous planifions la date avec vous dès l'acceptation de la soumission." },
    ],
  }),
  cityPage('rive-nord', {
    intro:
      "De Terrebonne à Saint-Jérôme, de Repentigny à Saint-Eustache, Bellechasse Énergie installe des thermopompes sur toute la Rive-Nord. Des maisons plus récentes, plus grandes, souvent bien isolées : la thermopompe y donne d'excellents résultats.",
    answer:
      "Sur la Rive-Nord, où les maisons sont souvent récentes et munies de conduits, une thermopompe centrale climat froid jumelée à une fournaise électrique offre le meilleur confort et le coût d'exploitation le plus bas. Pour les maisons sans conduits, le système multizone est la référence.",
    sections: [
      {
        title: 'Terrebonne, Mascouche, Blainville, Repentigny et les environs',
        text:
          "Nous desservons Terrebonne, Mascouche, Repentigny, L'Assomption, Blainville, Boisbriand, Sainte-Thérèse, Rosemère, Lorraine, Bois-des-Filion, Saint-Eustache, Deux-Montagnes, Mirabel, Sainte-Anne-des-Plaines et Saint-Jérôme. Les délais de déplacement sont inclus dans nos prix : aucun frais supplémentaire pour la Rive-Nord.",
      },
      {
        title: 'Des hivers plus froids, des appareils choisis en conséquence',
        text:
          "Les nuits d'hiver sont souvent quelques degrés plus froides sur la Rive-Nord qu'au centre-ville. Nous ne proposons donc que des modèles conçus pour le climat froid, capables de maintenir leur capacité de chauffage bien en dessous de -20 °C, avec un appoint dimensionné pour les extrêmes. Votre confort ne dépend jamais d'un seul appareil.",
      },
      {
        title: 'Maisons neuves et échangeurs d’air',
        text:
          "Les maisons récentes sont étanches. Une thermopompe seule ne suffit pas : il faut renouveler l'air. Nous installons des échangeurs d'air Aldes qui récupèrent la chaleur, réduisent l'humidité et améliorent la qualité de l'air, en complément de votre système de chauffage et de climatisation.",
      },
    ],
    faq: [
      { q: 'Y a-t-il des frais de déplacement pour la Rive-Nord?', a: "Non. Nos soumissions pour la Rive-Nord incluent le déplacement, l'installation et la mise en marche." },
    ],
  }),
  cityPage('rive-sud', {
    intro:
      "Longueuil, Brossard, Boucherville, Saint-Hubert, La Prairie, Châteauguay, Chambly : Bellechasse Énergie installe et entretient des thermopompes sur toute la Rive-Sud, avec la même équipe et les mêmes exigences qu'à Montréal.",
    answer:
      "Pour une maison de la Rive-Sud, une thermopompe climat froid installée par un détaillant autorisé et dimensionnée sur place est la solution la plus rentable pour chauffer et climatiser. Les conversions du mazout et le remplacement des plinthes électriques sont nos demandes les plus fréquentes.",
    sections: [
      {
        title: 'Longueuil, Brossard, Boucherville et au-delà',
        text:
          "Nous couvrons Longueuil, Saint-Lambert, Greenfield Park, Saint-Hubert, Brossard, Boucherville, Sainte-Julie, Varennes, Saint-Bruno-de-Montarville, La Prairie, Candiac, Delson, Saint-Constant, Châteauguay, Chambly, Beloeil et Mont-Saint-Hilaire. Nos équipes sont sur la Rive-Sud chaque semaine.",
      },
      {
        title: 'Du bungalow au plex, une solution adaptée',
        text:
          "Les bungalows de Saint-Hubert et de Longueuil avec fournaise et conduits sont parfaits pour une thermopompe centrale. Les maisons de ville de Brossard et les plex du Vieux-Longueuil chauffés à l'électricité gagnent à passer à une murale ou à un multizone. Nous regardons votre maison avant de recommander quoi que ce soit.",
      },
      {
        title: 'Entretien et service après-vente sur la Rive-Sud',
        text:
          "Une thermopompe bien entretenue dure 15 à 20 ans. Nous offrons l'entretien annuel et le service de réparation sur toute la Rive-Sud, pour les appareils que nous avons installés comme pour les autres marques courantes.",
      },
    ],
    faq: [
      { q: 'Réparez-vous les thermopompes installées par d’autres entreprises sur la Rive-Sud?', a: "Oui, pour la plupart des marques courantes. Appelez-nous avec le modèle et le symptôme, nous vous dirons rapidement si nous pouvons intervenir." },
    ],
  }),

  servicePage({
    slug: 'installation-thermopompe',
    service: 'Installation de thermopompe',
    h1: 'Installation de thermopompe dans le Grand Montréal',
    metaTitle: 'Installation de thermopompe à Montréal',
    metaDescription:
      'Installation de thermopompe murale ou centrale à Montréal, Laval, Rive-Nord et Rive-Sud. Détaillant Daikin depuis 1962, calcul de charge, subventions, prix ferme.',
    eyebrow: 'INSTALLATION',
    intro:
      "La thermopompe la plus performante ne vaut rien si elle est mal installée. Depuis 1962, nous faisons une chose avant tout : des installations propres, conformes et durables, par nos propres techniciens.",
    answer:
      "Une installation de thermopompe conforme comprend un calcul de charge, le choix de l'emplacement des unités, des raccords de réfrigérant soudés et testés sous vide, le raccordement électrique par un électricien licencié, la mise en marche et l'enregistrement de la garantie. Comptez une journée pour une murale, une à deux pour une centrale.",
    sections: [
      {
        title: 'Notre méthode en cinq étapes',
        text:
          "1. Évaluation à domicile et calcul de charge thermique. 2. Soumission détaillée avec les subventions applicables. 3. Installation par nos frigoristes certifiés : supports, conduites de réfrigérant, drain, électricité, unités. 4. Mise sous vide, charge de réfrigérant et tests de fonctionnement. 5. Explication du thermostat, de l'entretien et enregistrement de la garantie du fabricant.",
      },
      {
        title: 'Ce qui distingue une bonne installation',
        text:
          "L'unité extérieure est de niveau, surélevée pour la neige, éloignée des chambres. Les conduites sont isolées et protégées dans une goulotte. Le drain de condensat est incliné et testé. Le circuit électrique est dédié et conforme. Le réfrigérant est chargé selon les spécifications du fabricant, pas au jugé. Ces détails font la différence entre 8 ans et 20 ans de service.",
      },
      {
        title: 'Détaillant autorisé, garantie protégée',
        text:
          "Les fabricants comme Daikin réservent leur garantie complète aux installations faites par un détaillant autorisé. En choisissant Bellechasse Énergie, vous obtenez la garantie maximale, jusqu'à 12 ans sur les pièces, et un seul interlocuteur pour toute la durée de vie de l'appareil.",
      },
    ],
    faq: [
      { q: 'Faut-il un électricien pour installer une thermopompe?', a: "Oui. Le raccordement électrique doit être fait par un électricien licencié. Il est inclus dans notre soumission et coordonné par nous." },
      { q: "Que se passe-t-il le jour de l'installation?", a: "Nos techniciens arrivent le matin, protègent les planchers, installent les unités et les conduites, font les tests, nettoient et vous expliquent le fonctionnement. Vous n'avez rien à préparer, sinon dégager l'accès." },
    ],
    products: ['thermopompe-centrale', 'thermopompe-murale', 'echangeur-air'],
  }),
  servicePage({
    slug: 'climatisation-montreal',
    service: 'Climatisation',
    h1: 'Climatisation à Montréal : centrale, murale et thermopompe',
    metaTitle: 'Climatisation à Montréal : installation',
    metaDescription:
      'Air climatisé central ou mural à Montréal, Laval et sur les rives. Installation par des experts depuis 1962, modèles Daikin silencieux, soumission gratuite.',
    eyebrow: 'CLIMATISATION',
    intro:
      "Les étés montréalais sont de plus en plus chauds et humides. Une climatisation bien choisie rend la maison vivable en juillet, protège votre sommeil et, avec une thermopompe, réduit aussi votre chauffage l'hiver.",
    answer:
      "Pour climatiser une maison de Montréal, trois options : l'air climatisé central si vous avez des conduits, le climatiseur mural pour une pièce ou un espace, et la thermopompe qui climatise l'été et chauffe l'hiver. Dans la grande majorité des cas, la thermopompe est le meilleur investissement.",
    sections: [
      {
        title: 'Central, mural ou thermopompe?',
        text:
          "Vous avez une fournaise et des conduits : l'air climatisé central Daikin se raccorde à votre système et rafraîchit toute la maison. Vous n'avez pas de conduits : le climatiseur mural rafraîchit une pièce en quelques heures d'installation. Vous voulez aussi économiser sur le chauffage : la thermopompe murale ou centrale fait les deux, pour un supplément modeste à l'achat.",
      },
      {
        title: 'La déshumidification, la clé du confort',
        text:
          "À Montréal, c'est souvent l'humidité qui rend l'été pénible, plus que la température. Un appareil bien dimensionné fonctionne assez longtemps pour retirer l'humidité de l'air. Un appareil trop puissant refroidit vite, s'arrête, et laisse l'air moite. C'est pourquoi nous calculons la capacité sur place plutôt que de deviner.",
      },
      {
        title: 'Installé avant la canicule',
        text:
          "Les délais s'allongent dès la première vague de chaleur. Planifiez votre installation au printemps : vous obtenez la date de votre choix, souvent de meilleures promotions, et un été tranquille.",
      },
    ],
    faq: [
      { q: 'Combien de BTU pour climatiser mon salon?', a: "En règle générale, environ 20 BTU par pied carré pour une pièce bien isolée, davantage si elle est très ensoleillée ou au dernier étage. Un conseiller confirme la capacité lors de la visite." },
      { q: 'Un climatiseur mural est-il bruyant?', a: "Non. Les unités intérieures modernes produisent autour de 20 à 25 dB au réglage bas. L'unité extérieure est installée loin des chambres et des voisins." },
    ],
    products: ['air-climatise-central', 'air-climatise-mural', 'thermopompe-murale'],
    image: '/hvac-hero.jpg',
  }),
  servicePage({
    slug: 'chauffage-montreal',
    service: 'Chauffage',
    h1: 'Chauffage résidentiel à Montréal : thermopompe, fournaise et conversion',
    metaTitle: 'Chauffage résidentiel à Montréal',
    metaDescription:
      'Thermopompe climat froid, fournaise électrique ou conversion du mazout : le bon système de chauffage pour votre maison à Montréal. Soumission gratuite.',
    eyebrow: 'CHAUFFAGE',
    intro:
      "Chauffer une maison au Québec, c'est la dépense énergétique numéro un. Le bon système fait la différence entre une facture qui grimpe et un confort qui coûte moins cher chaque année. Nous avons commencé en livrant du mazout en 1962. Nous savons ce qui chauffe.",
    answer:
      "Le système de chauffage le plus économique pour une maison de Montréal est une thermopompe climat froid, jumelée à un appoint électrique pour les grands froids. Elle remplace avantageusement le mazout, le gaz et les plinthes électriques, et donne accès aux subventions.",
    sections: [
      {
        title: 'Thermopompe : chauffer pour une fraction du coût',
        text:
          "Une thermopompe ne produit pas de chaleur, elle la déplace. Même à -20 °C, elle extrait de la chaleur de l'air extérieur et la transfère dans la maison, avec un rendement bien supérieur aux plinthes ou à une fournaise électrique. Sur une saison de chauffage, l'écart sur la facture est important.",
      },
      {
        title: 'Fournaise électrique et bi-énergie',
        text:
          "La fournaise électrique à air pulsé chauffe par les conduits et remplace directement une fournaise au mazout ou au gaz. Jumelée à une thermopompe centrale, elle devient l'appoint pour les nuits les plus froides. Le tarif bi-énergie d'Hydro-Québec peut rendre cette combinaison encore plus avantageuse.",
      },
      {
        title: 'Conversion du mazout et du gaz',
        text:
          "Depuis le 31 décembre 2023, il est interdit de remplacer un appareil au mazout par un autre au mazout dans un bâtiment résidentiel existant. Nous prenons en charge la conversion complète : nouveau système, coordination du retrait du réservoir, documents pour les subventions. Consultez notre page dédiée au remplacement de fournaise au mazout.",
      },
    ],
    faq: [
      { q: 'Une thermopompe suffit-elle pour chauffer à -30 °C?', a: "Les modèles climat froid continuent de chauffer à -25 °C et parfois -30 °C, avec une capacité réduite. Un appoint électrique dimensionné prend le relais pour les heures les plus froides. Vous ne manquez jamais de chaleur." },
      { q: 'Quelle est la durée de vie d’une fournaise électrique?', a: "Généralement 20 à 25 ans, avec peu d'entretien. C'est l'appoint idéal pour une thermopompe centrale." },
    ],
    products: ['thermopompe-centrale', 'fournaise-air-pulse', 'thermopompe-murale'],
    image: '/section-5-img.webp',
  }),
  servicePage({
    slug: 'remplacement-fournaise-mazout',
    service: 'Conversion du mazout',
    h1: 'Remplacement de fournaise au mazout dans le Grand Montréal',
    metaTitle: 'Remplacement de fournaise au mazout',
    metaDescription:
      'Remplacez votre fournaise au mazout par une thermopompe ou une fournaise électrique. Subventions LogisVert et Rénoclimat, retrait du réservoir, prix ferme.',
    eyebrow: 'CONVERSION DU MAZOUT',
    intro:
      "Votre fournaise au mazout arrive en fin de vie, ou vous voulez arrêter de payer le plein? Depuis 2023, elle ne peut plus être remplacée par un autre appareil au mazout. Nous faisons la conversion de A à Z, comme nous le faisons pour des centaines de maisons du Grand Montréal.",
    answer:
      "Pour remplacer une fournaise au mazout, la solution la plus courante est une thermopompe centrale climat froid raccordée aux conduits existants, avec une fournaise électrique en appoint. La conversion prend une à deux journées, le réservoir est retiré par une entreprise spécialisée, et le projet est admissible aux subventions majorées pour les conversions.",
    sections: [
      {
        title: 'Ce que dit la loi',
        text:
          "Le Règlement sur les appareils de chauffage au mazout interdit, depuis le 31 décembre 2023, de remplacer un appareil au mazout par un autre appareil au mazout dans un bâtiment résidentiel existant, et depuis la fin de 2021 d'en installer dans une construction neuve. Votre appareil actuel peut fonctionner jusqu'à la fin de sa vie, mais son remplacement devra se faire par une autre énergie.",
      },
      {
        title: 'Les étapes de la conversion',
        text:
          "1. Évaluation gratuite de la maison et des conduits. 2. Choix du système : thermopompe centrale avec appoint, ou fournaise électrique seule. 3. Vérification des subventions et de l'entrée électrique, mise à niveau si nécessaire. 4. Installation en une à deux journées. 5. Retrait, nettoyage et disposition du réservoir par une entreprise spécialisée que nous coordonnons. 6. Documents pour vos demandes de subvention.",
      },
      {
        title: 'Pourquoi ne pas attendre la panne',
        text:
          "Une fournaise au mazout qui lâche en janvier vous laisse sans chauffage et sans marge de manœuvre. Planifier la conversion à la belle saison vous donne le choix du système, de la date, et vous fait profiter des subventions avant tout changement de programme. Dès le premier hiver, vous économisez.",
      },
    ],
    faq: [
      { q: 'Dois-je changer mon entrée électrique pour une thermopompe centrale?', a: "Parfois, si votre panneau est ancien ou déjà chargé. Nous le vérifions lors de l'évaluation et l'incluons dans la soumission au besoin." },
      { q: 'Qui retire le réservoir à mazout?', a: "Une entreprise spécialisée dans le retrait de réservoirs, que nous coordonnons avec l'installation. Le réservoir doit être vidé, nettoyé et retiré selon les normes." },
    ],
    products: ['thermopompe-centrale', 'fournaise-air-pulse', 'echangeur-air'],
    image: '/section-5-img.webp',
  }),
  servicePage({
    slug: 'entretien-reparation-thermopompe',
    service: 'Entretien et réparation',
    h1: 'Entretien et réparation de thermopompe dans le Grand Montréal',
    metaTitle: 'Entretien et réparation de thermopompe',
    metaDescription:
      'Entretien annuel, diagnostic et réparation de thermopompes et climatiseurs à Montréal, Laval, Rive-Nord et Rive-Sud. Techniciens certifiés, rappel rapide.',
    eyebrow: 'ENTRETIEN ET RÉPARATION',
    intro:
      "Une thermopompe entretenue chaque année consomme moins, tombe moins souvent en panne et dure jusqu'à deux fois plus longtemps. Nos frigoristes entretiennent et réparent les appareils que nous installons et la plupart des marques courantes.",
    answer:
      "L'entretien annuel d'une thermopompe comprend le nettoyage des serpentins et des filtres, la vérification du réfrigérant, des connexions électriques, du drain et des cycles de dégivrage. Il est requis par la plupart des fabricants pour maintenir la garantie et se fait idéalement au printemps ou à l'automne.",
    sections: [
      {
        title: "Ce que comprend l'entretien annuel",
        text:
          "Nettoyage des serpentins intérieur et extérieur, nettoyage ou remplacement des filtres, vérification de la pression du réfrigérant et détection de fuites, inspection des connexions électriques et du condensateur, nettoyage du drain de condensat et de la turbine, vérification du thermostat et des cycles de dégivrage. Vous recevez un rapport et nos recommandations.",
      },
      {
        title: 'Réparation rapide, diagnostic honnête',
        text:
          "Air tiède en climatisation, glace persistante sur l'unité extérieure, bruit nouveau, eau qui coule de l'unité murale, code d'erreur au thermostat : appelez-nous avec le modèle et le symptôme. Nous vous dirons franchement si une réparation vaut la peine ou si l'appareil approche de sa fin de vie.",
      },
      {
        title: 'Entre les visites : ce que vous pouvez faire',
        text:
          "Nettoyez les filtres de l'unité murale toutes les deux à quatre semaines en saison. Gardez 60 cm dégagés autour de l'unité extérieure. Ne cassez jamais la glace sur les ailettes. Et évitez les grands écarts de température au thermostat. Notre article sur l'entretien de votre thermopompe détaille chaque geste.",
      },
    ],
    faq: [
      { q: "À quelle fréquence faire l'entretien professionnel?", a: 'Une fois par année, au printemps ou à l’automne. Les maisons avec animaux ou beaucoup de poussière peuvent bénéficier de deux visites.' },
      { q: 'Entretenez-vous les thermopompes d’autres marques?', a: "Oui, la plupart des marques courantes installées au Québec. Indiquez-nous le modèle lors de votre appel." },
    ],
    products: ['thermopompe-murale', 'thermopompe-centrale', 'echangeur-air'],
    image: '/installation-hands.webp',
  }),
  servicePage({
    slug: 'thermopompe-centrale-montreal',
    service: 'Thermopompe centrale',
    h1: 'Thermopompe centrale à Montréal : installation et prix',
    metaTitle: 'Thermopompe centrale à Montréal',
    metaDescription:
      'Thermopompe centrale climat froid pour chauffer et climatiser toute la maison par vos conduits. Daikin Fit et Moovair, installation en 1 à 2 jours, subventions.',
    eyebrow: 'THERMOPOMPE CENTRALE',
    intro:
      "Une seule machine, toute la maison. La thermopompe centrale chauffe l'hiver et climatise l'été par vos conduits, avec un thermostat et rien de visible dans les pièces. C'est le système que nous installons le plus dans les maisons du Grand Montréal.",
    answer:
      "Une thermopompe centrale convient à toute maison munie de conduits d'air pulsé. Elle remplace la fournaise au mazout ou au gaz, climatise l'été, et un appoint électrique prend le relais lors des grands froids. Le prix dépend de la capacité, du modèle et de l'état des conduits ; une évaluation sur place donne un chiffre ferme.",
    sections: [
      {
        title: 'Ce qui influence le prix',
        text:
          "La capacité requise, calculée selon la superficie et l'isolation. Le modèle et sa performance en climat froid. L'état de vos conduits et de votre entrée électrique. Le besoin ou non d'une nouvelle unité intérieure ou d'une fournaise d'appoint. Et les subventions, qui peuvent réduire le coût net de façon importante. Nous détaillons chaque poste dans la soumission.",
      },
      {
        title: 'Daikin Fit, Skyair ou Moovair?',
        text:
          "Daikin Fit pour les terrains étroits et les maisons de ville, grâce à son unité extérieure mince et silencieuse. Daikin Skyair pour les grandes surfaces et les plex. Moovair pour le meilleur rapport qualité-prix avec une performance climat froid éprouvée. Nos conseillers vous orientent selon votre maison, pas selon un catalogue.",
      },
      {
        title: 'Centrale ou multizone?',
        text:
          "Si votre maison n'a pas de conduits, construire un réseau coûte cher et demande des travaux. Un système mural multizone offre alors un confort comparable, pièce par pièce, sans ouvrir les murs. Nous vous le dirons si c'est votre cas.",
      },
    ],
    faq: [
      { q: 'Puis-je garder ma fournaise actuelle avec une thermopompe centrale?', a: "Souvent, oui, si elle est en bon état et compatible. Elle devient l'appoint. Sinon, nous proposons une unité intérieure ou une fournaise électrique adaptée." },
      { q: 'La thermopompe centrale est-elle admissible aux subventions?', a: "Les modèles climat froid certifiés le sont généralement, avec des montants majorés lors d'une conversion du mazout ou du gaz. Nous vérifions pour vous." },
    ],
    products: ['thermopompe-centrale', 'fournaise-air-pulse', 'air-climatise-central'],
  }),
  servicePage({
    slug: 'thermopompe-murale-montreal',
    service: 'Thermopompe murale',
    h1: 'Thermopompe murale à Montréal : installée en une journée',
    metaTitle: 'Thermopompe murale à Montréal',
    metaDescription:
      'Thermopompe murale Daikin Atmosphera ou multizone, installée en une journée à Montréal et sur les rives. Remplace les plinthes, chauffe à -25 °C, subventions.',
    eyebrow: 'THERMOPOMPE MURALE',
    intro:
      "Pas de conduits? Pas de problème. La thermopompe murale chauffe et climatise sans gros travaux, s'installe en une journée et remplace avantageusement les plinthes électriques des plex, condos et maisons de Montréal.",
    answer:
      "Une thermopompe murale s'installe en une journée : une unité extérieure sur le mur ou au sol, une unité intérieure par pièce, reliées par une petite ouverture. Elle chauffe efficacement jusqu'à -25 °C avec un modèle climat froid et climatise l'été. Pour plusieurs pièces fermées, un système multizone partage une seule unité extérieure.",
    sections: [
      {
        title: 'La solution des plex et des condos',
        text:
          "Duplex de Rosemont, triplex de Villeray, condos du Plateau ou de Verdun : ces habitations n'ont pas de conduits et sont chauffées aux plinthes. La thermopompe murale y réduit la facture d'électricité l'hiver et rend l'été vivable, sans toucher aux murs ni aux plafonds. Pour les copropriétés, nous préparons les documents pour le syndicat.",
      },
      {
        title: 'Une pièce ou toute la maison',
        text:
          "Une unité murale suffit pour un espace ouvert. Pour couvrir les chambres et le sous-sol, le système multizone raccorde jusqu'à cinq unités intérieures à une seule unité extérieure, chacune avec sa télécommande. Les unités peuvent être murales, au plafond ou encastrées selon la pièce.",
      },
      {
        title: 'Daikin Atmosphera : la murale climat froid',
        text:
          "L'Atmosphera est conçue pour maintenir sa capacité de chauffage par grand froid, avec un fonctionnement presque silencieux et une filtration avancée. C'est notre recommandation pour qui veut une murale comme chauffage principal. L'Oterra offre un excellent équilibre entre prix et performance pour une pièce.",
      },
    ],
    faq: [
      { q: 'Où passe la tuyauterie entre les deux unités?', a: "Par une ouverture d'environ 7 cm dans le mur extérieur, cachée par une goulotte. Le tout est discret et étanche." },
      { q: 'Une murale peut-elle chauffer un sous-sol?', a: "Oui. C'est même une excellente application : une unité au sous-sol chauffe l'hiver et déshumidifie l'été." },
    ],
    products: ['thermopompe-murale', 'air-climatise-mural', 'echangeur-air'],
    image: '/hvac-hero.jpg',
  }),
  servicePage({
    slug: 'echangeur-air-montreal',
    service: "Échangeur d'air",
    h1: "Échangeur d'air à Montréal : installation et remplacement",
    metaTitle: "Échangeur d'air à Montréal : VRC",
    metaDescription:
      "Installation d'échangeurs d'air VRC et VRE Aldes à Montréal, Laval et sur les rives. Air neuf, moins d'humidité, maison conforme. Soumission gratuite.",
    eyebrow: 'VENTILATION',
    intro:
      "Buée dans les fenêtres, odeurs qui restent, air lourd le matin : votre maison manque d'air neuf. L'échangeur d'air renouvelle l'air en continu tout en récupérant la chaleur, pour une maison plus saine sans gaspiller d'énergie.",
    answer:
      "Un échangeur d'air à récupération de chaleur (VRC) évacue l'air vicié et l'humidité, fait entrer de l'air neuf filtré et transfère la chaleur de l'air sortant à l'air entrant. Il est indispensable dans les maisons récentes ou bien isolées et se raccorde à vos conduits ou à ses propres bouches.",
    sections: [
      {
        title: "Les signes qu'il vous en faut un",
        text:
          "Condensation sur les fenêtres l'hiver, moisissure dans les coins de salle de bain, odeurs de cuisine persistantes, air sec et lourd, allergies qui s'aggravent à la maison. Une maison isolée ou rénovée retient tout : la chaleur, mais aussi l'humidité et les polluants.",
      },
      {
        title: 'VRC ou VRE?',
        text:
          "Le ventilateur récupérateur de chaleur (VRC) convient à la plupart des maisons du Québec et évacue efficacement l'humidité hivernale. Le ventilateur récupérateur d'énergie (VRE) transfère aussi une partie de l'humidité et convient aux maisons trop sèches l'hiver. Nous recommandons selon votre maison et vos symptômes.",
      },
      {
        title: 'Remplacement d’un appareil existant',
        text:
          "Un échangeur d'air de plus de 15 ans est souvent bruyant, inefficace, et ses filtres ne sont plus disponibles. Le remplacement par un modèle Aldes certifié HVI se fait en quelques heures en réutilisant vos conduits, avec un gain immédiat en silence et en efficacité.",
      },
    ],
    faq: [
      { q: "Faut-il faire fonctionner l'échangeur d'air en continu?", a: "Oui, à basse vitesse, avec des pointes lors de la douche ou de la cuisson. C'est ce pour quoi il est conçu et sa consommation est faible." },
      { q: "Combien de temps prend l'installation?", a: "Une demi-journée pour un remplacement, une journée pour une nouvelle installation avec conduits." },
    ],
    products: ['echangeur-air', 'thermopompe-centrale', 'fournaise-air-pulse'],
    image: '/tab-aldes.webp',
  }),
];

/* -------------------------------------------------------------------------- */
/* Pages programmatiques par secteur (arrondissements et municipalités)        */
/* -------------------------------------------------------------------------- */

export function slugifySector(name) {
  return String(name)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** « à Brossard », « au Plateau-Mont-Royal », « à L'Assomption ». */
export function locative(name) {
  if (name.startsWith('Le ')) return `au ${name.slice(3)}`;
  if (name.startsWith('Les ')) return `aux ${name.slice(4)}`;
  return `à ${name}`;
}

const pick = (arr, i) => arr[i % arr.length];

const SECTOR_INTROS = {
  montreal: [
    (n, l) => `Bellechasse Énergie installe, vend et entretient des thermopompes ${l} depuis trois générations. Nous connaissons les plex, les condos et les maisons de l'arrondissement, leurs contraintes d'espace et de voisinage, et ce qui les chauffe bien à -25 °C.`,
    (n, l) => `Vous cherchez une thermopompe ${l}? Nous sommes une entreprise montréalaise fondée en 1962, détaillant autorisé Daikin, et nos propres frigoristes font chaque installation dans l'arrondissement, de l'évaluation à la mise en marche.`,
    (n, l) => `Chauffer et climatiser un logement ${l} demande un appareil conçu pour le climat froid et une installation qui respecte les règles de l'arrondissement. C'est notre métier depuis 1962, et nous le faisons sans sous-traitance.`,
    (n, l) => `De la murale pour un étage de plex à la centrale pour une maison avec conduits, Bellechasse Énergie propose ${l} une thermopompe dimensionnée sur place, installée par des frigoristes certifiés et couverte par la garantie complète du fabricant.`,
  ],
  laval: [
    (n, l) => `Bellechasse Énergie installe des thermopompes ${l} depuis des décennies. Bungalows des années 60 et 70, cottages, jumelés et condos : nous connaissons les maisons du secteur et le système qui convient à chacune.`,
    (n, l) => `Une thermopompe ${l}, c'est le plus souvent une centrale climat froid raccordée aux conduits existants, ou une murale pour remplacer les plinthes. Nos conseillers évaluent votre maison gratuitement et vous remettent un prix ferme.`,
    (n, l) => `Nos équipes sont ${l} chaque semaine pour des évaluations, des installations et des entretiens. Entreprise familiale depuis 1962, détaillant autorisé Daikin, licence RBQ 8103-2112-33 : vous savez à qui vous avez affaire.`,
    (n, l) => `Remplacer une fournaise au mazout, retirer des plinthes électriques trop gourmandes, enfin climatiser l'été : voilà les trois raisons qui nous amènent le plus souvent ${l}. Dans chaque cas, la thermopompe climat froid est la solution la plus rentable.`,
  ],
  'rive-nord': [
    (n, l) => `Bellechasse Énergie installe des thermopompes ${l} et dans toute la Rive-Nord. Des maisons souvent récentes, bien isolées, munies de conduits : le terrain idéal pour une thermopompe centrale climat froid.`,
    (n, l) => `Vous habitez ${l} et vous voulez chauffer pour moins cher tout en climatisant l'été? Nos conseillers se déplacent sans frais pour évaluer votre maison et vous proposer le bon appareil, installé par nos propres frigoristes.`,
    (n, l) => `Les hivers sont un peu plus froids ${l} qu'au centre de Montréal. Nous n'y installons donc que des thermopompes conçues pour le climat froid, avec un appoint dimensionné pour les nuits extrêmes. Depuis 1962, c'est notre façon de faire.`,
    (n, l) => `De l'évaluation gratuite à l'entretien annuel, Bellechasse Énergie accompagne les propriétaires ${l} avec la même équipe et les mêmes exigences qu'à Montréal. Détaillant autorisé Daikin, membre CMMTQ, licence RBQ.`,
  ],
  'rive-sud': [
    (n, l) => `Bellechasse Énergie installe, entretient et répare des thermopompes ${l} et sur toute la Rive-Sud. Bungalows avec fournaise, maisons de ville aux plinthes, condos : nous avons une solution éprouvée pour chaque type d'habitation.`,
    (n, l) => `Une thermopompe ${l} bien choisie chauffe l'hiver pour une fraction du coût des plinthes ou du mazout, et climatise l'été. Nos conseillers calculent la charge de votre maison sur place et vous remettent un prix ferme, subventions incluses.`,
    (n, l) => `Nos équipes traversent le fleuve chaque semaine pour installer et entretenir des thermopompes ${l}. Entreprise familiale montréalaise depuis 1962, détaillant autorisé Daikin, aucune sous-traitance.`,
    (n, l) => `Conversion du mazout, remplacement des plinthes, climatisation centrale : les propriétaires ${l} nous appellent surtout pour ces trois projets. Nous les réalisons en une à deux journées, avec la garantie complète du fabricant.`,
  ],
};

const SECTOR_ANSWERS = {
  montreal: [
    (n, l) => `Pour un plex ou un condo ${l}, la thermopompe murale climat froid est généralement la meilleure solution : installée en une journée, sans conduits, elle remplace les plinthes et climatise l'été. Pour une maison avec conduits, la thermopompe centrale reste le choix le plus confortable.`,
    (n, l) => `La meilleure thermopompe ${l} est un modèle climat froid, dimensionné par un calcul de charge fait sur place et installé par un détaillant autorisé, avec une unité extérieure placée conformément au règlement de l'arrondissement. Comptez une journée pour une murale, une à deux pour une centrale.`,
    (n, l) => `${n} est un secteur dense : l'emplacement de l'unité extérieure, le bruit et l'accord du syndicat de copropriété comptent autant que la marque. Une murale ou un multizone Daikin climat froid, installé dans les règles, répond à la grande majorité des besoins.`,
    (n, l) => `Une thermopompe ${l} coûte moins cher à faire fonctionner que des plinthes ou une fournaise au mazout, donne accès aux subventions en vigueur et s'installe en une journée pour une murale. L'évaluation gratuite à domicile permet de fixer le prix exact.`,
  ],
  laval: [
    (n, l) => `Pour la plupart des maisons ${l}, munies de conduits d'air pulsé, une thermopompe centrale climat froid avec appoint électrique est la solution la plus économique. Pour les maisons aux plinthes, la murale ou le multizone s'installe en une journée.`,
    (n, l) => `Une thermopompe ${l} doit être conçue pour le climat froid, dimensionnée selon un calcul de charge et installée par un entrepreneur licencié RBQ pour être admissible aux subventions. C'est la base de chaque soumission que nous remettons.`,
    (n, l) => `Bungalow des années 60 avec fournaise au mazout ou au gaz : thermopompe centrale et conversion complète. Maison aux plinthes : murale ou multizone. Condo : murale compacte avec l'accord du syndicat. Voilà les trois scénarios les plus fréquents ${l}.`,
    (n, l) => `Installer une thermopompe ${l} prend une journée pour une murale et une à deux journées pour une centrale. Les résidents de Laval ont accès aux programmes provinciaux et d'Hydro-Québec, avec des montants majorés pour les conversions du mazout.`,
  ],
  'rive-nord': [
    (n, l) => `Dans une maison récente ${l}, la thermopompe centrale climat froid jumelée à une fournaise électrique offre le meilleur confort et le coût d'exploitation le plus bas. Pour les maisons sans conduits, le système multizone est la référence.`,
    (n, l) => `Une thermopompe ${l} doit conserver sa capacité de chauffage bien en dessous de -20 °C. Nous proposons uniquement des modèles climat froid, avec un appoint dimensionné pour les extrêmes, et nos soumissions incluent le déplacement.`,
    (n, l) => `Pour chauffer et climatiser une maison ${l}, la combinaison la plus rentable est une thermopompe centrale climat froid raccordée aux conduits existants, souvent complétée par un échangeur d'air dans les constructions récentes, plus étanches.`,
    (n, l) => `Le meilleur moment pour installer une thermopompe ${l} est le printemps ou l'automne, avant les pointes. L'installation prend une à deux journées et l'appareil est admissible aux subventions en vigueur lorsqu'il est certifié climat froid et installé par un entrepreneur licencié.`,
  ],
  'rive-sud': [
    (n, l) => `Pour une maison ${l}, une thermopompe climat froid installée par un détaillant autorisé et dimensionnée sur place est le moyen le plus rentable de chauffer et de climatiser. Les conversions du mazout et le remplacement des plinthes sont nos demandes les plus fréquentes.`,
    (n, l) => `Bungalow avec fournaise et conduits : thermopompe centrale. Maison de ville ou plex chauffé aux plinthes : murale ou multizone. Condo : murale compacte avec l'accord du syndicat. Nous regardons votre maison ${l} avant de recommander quoi que ce soit.`,
    (n, l) => `Une thermopompe ${l} s'installe en une journée pour une murale, une à deux pour une centrale, et donne accès aux subventions en vigueur lorsque le modèle est certifié climat froid. Le déplacement sur la Rive-Sud est inclus dans nos prix.`,
    (n, l) => `Les modèles climat froid que nous installons ${l} continuent de chauffer à -25 °C, avec un appoint électrique pour les nuits les plus froides. Une thermopompe bien installée et entretenue chaque année dure 15 à 20 ans.`,
  ],
};

const AREA_SECTIONS = {
  montreal: [
    { title: 'Plex, duplex et triplex : la thermopompe murale', text: (n, l) => `Les duplex et triplex ${l} sont presque toujours chauffés aux plinthes électriques et n'ont pas de conduits. La thermopompe murale climat froid s'y installe en une journée, sans ouvrir les murs, et réduit la facture d'électricité de l'hiver tout en climatisant l'été. Pour un logement de plusieurs pièces fermées, le système multizone raccorde jusqu'à cinq unités intérieures à une seule unité extérieure, placée en cour arrière ou sur un balcon avec un support adapté.` },
    { title: 'Bruit, emplacement et règlement de l\'arrondissement', text: (n, l) => `Dans un quartier dense comme ${n}, l'unité extérieure ne se place pas n'importe où. L'arrondissement encadre les distances par rapport aux limites de terrain, l'installation en façade et le niveau sonore aux limites de propriété. Nos conseillers choisissent avec vous un emplacement conforme et discret, loin des chambres des voisins, sur un support solide et surélevé pour la neige. Les modèles Daikin que nous installons comptent parmi les plus silencieux du marché.` },
    { title: 'Condos et copropriétés', text: (n, l) => `Installer une thermopompe dans un condo ${l} demande l'accord du syndicat de copropriété pour l'unité extérieure, qui touche souvent une partie commune (mur, balcon, toiture). Nous préparons les fiches techniques, le plan d'installation et les données sonores pour votre demande, et nous proposons des unités compactes qui s'intègrent à un balcon ou à une toiture sans nuire aux voisins.` },
    { title: 'Conversion du mazout et du gaz', text: (n, l) => `Les maisons unifamiliales et les cottages plus anciens ${l} sont parfois encore chauffés au mazout ou au gaz par une fournaise à air pulsé. Depuis la fin de 2023, une fournaise au mazout ne peut plus être remplacée par une autre au mazout. Nous faisons la conversion complète vers une thermopompe centrale climat froid avec appoint électrique, coordonnons le retrait du réservoir et fournissons les documents pour les subventions majorées.` },
    { title: 'Subventions et réseau d\'Hydro-Québec', text: (n, l) => `Les propriétaires ${l} ont accès aux programmes LogisVert d'Hydro-Québec et Rénoclimat pour les thermopompes efficaces certifiées climat froid, avec des montants plus élevés lors du remplacement d'un système au mazout ou au gaz. Nous vérifions votre admissibilité à chaque soumission et fournissons la facture détaillée, les fiches techniques et les numéros de série exigés par les programmes.` },
  ],
  laval: [
    { title: 'Bungalows et cottages : la thermopompe centrale', text: (n, l) => `Une grande partie des maisons ${l} a été construite entre 1960 et 1985 avec un système à air pulsé. Le réseau de conduits est déjà là : une thermopompe centrale climat froid Daikin Fit ou Moovair s'y raccorde, chauffe toute la maison l'hiver, climatise l'été, et la fournaise électrique sert d'appoint pour les grands froids. C'est le projet que nous réalisons le plus souvent à Laval.` },
    { title: 'Fournaise au mazout ou au gaz : la conversion', text: (n, l) => `Beaucoup de bungalows ${l} ont encore une fournaise au mazout ou au gaz. Depuis le 31 décembre 2023, un appareil au mazout ne peut plus être remplacé par un autre au mazout. Nous prenons en charge la conversion complète : thermopompe centrale ou fournaise électrique, vérification de l'entrée électrique, coordination du retrait du réservoir et documents pour les subventions majorées.` },
    { title: 'Maisons aux plinthes et condos', text: (n, l) => `Les maisons chauffées aux plinthes et les condos ${l} n'ont pas de conduits. La thermopompe murale climat froid s'y installe en une journée, et le système multizone couvre plusieurs pièces fermées avec une seule unité extérieure. En copropriété, nous préparons les documents pour le syndicat et choisissons une unité compacte et silencieuse.` },
    { title: 'Subventions et tarif bi-énergie', text: (n, l) => `Les résidents ${l} ont accès à LogisVert d'Hydro-Québec et à Rénoclimat pour les thermopompes efficaces, avec des montants majorés pour les conversions du mazout ou du gaz. Si vous conservez un appoint, le tarif bi-énergie d'Hydro-Québec peut réduire votre coût d'électricité une bonne partie de l'année. Nous vérifions tout cela à la soumission.` },
    { title: 'Entretien annuel et service à Laval', text: (n, l) => `Nos frigoristes se déplacent ${l} toute l'année pour l'entretien annuel et les réparations, sur les appareils que nous installons comme sur la plupart des marques courantes. Un entretien documenté chaque année maintient la garantie du fabricant et prolonge la vie de l'appareil.` },
  ],
  'rive-nord': [
    { title: 'Maisons récentes et thermopompe centrale', text: (n, l) => `Les développements résidentiels ${l} datent en bonne partie des années 1990 à aujourd'hui : maisons bien isolées, conduits d'air pulsé, fournaise électrique. Une thermopompe centrale climat froid s'y raccorde en une à deux journées, chauffe la maison la majeure partie de l'hiver et climatise l'été, la fournaise ne servant plus que d'appoint.` },
    { title: 'Des hivers plus froids, des appareils choisis en conséquence', text: (n, l) => `Les nuits d'hiver sont souvent quelques degrés plus froides ${l} qu'au centre de Montréal. Nous ne proposons que des modèles conçus pour le climat froid, capables de maintenir leur capacité de chauffage bien en dessous de -20 °C, avec un appoint dimensionné pour les extrêmes. Votre confort ne dépend jamais d'un seul appareil.` },
    { title: 'Échangeur d\'air pour les maisons étanches', text: (n, l) => `Les maisons récentes ${l} sont étanches. Une thermopompe seule ne suffit pas : il faut renouveler l'air. Nous installons et remplaçons des échangeurs d'air à récupération de chaleur Aldes qui réduisent l'humidité, améliorent la qualité de l'air et limitent les pertes de chaleur, en complément du système de chauffage et de climatisation.` },
    { title: 'Maisons plus anciennes et conversion du mazout', text: (n, l) => `Dans les secteurs plus anciens ${l}, on trouve encore des fournaises au mazout ou au propane. Leur remplacement par une thermopompe centrale avec appoint électrique donne droit aux subventions majorées pour les conversions. Nous coordonnons le retrait du réservoir et fournissons les documents requis.` },
    { title: 'Déplacement inclus, mêmes exigences qu\'à Montréal', text: (n, l) => `Nos soumissions pour ${n} incluent le déplacement, l'installation et la mise en marche. Les mêmes frigoristes certifiés, la même licence RBQ 8103-2112-33 et la même garantie du fabricant que pour nos clients de Montréal. L'entretien annuel et le service se font aussi sur place.` },
  ],
  'rive-sud': [
    { title: 'Bungalows des années 60 et 70 : la thermopompe centrale', text: (n, l) => `Les bungalows et cottages ${l} construits entre 1960 et 1980 ont généralement une fournaise et des conduits d'air pulsé. Une thermopompe centrale climat froid s'y raccorde, remplace la fournaise au mazout ou au gaz, climatise l'été, et une fournaise électrique prend le relais lors des grands froids. C'est notre installation la plus fréquente sur la Rive-Sud.` },
    { title: 'Maisons de ville, plex et condos', text: (n, l) => `Les maisons de ville, jumelés et plex ${l} chauffés aux plinthes gagnent à passer à une thermopompe murale ou multizone, installée en une journée sans conduits. Dans les copropriétés, nous préparons les documents pour le syndicat et sélectionnons une unité extérieure compacte et silencieuse.` },
    { title: 'Conversion du mazout et subventions majorées', text: (n, l) => `Depuis le 31 décembre 2023, une fournaise au mazout ne peut plus être remplacée par un autre appareil au mazout. Pour les maisons ${l} encore chauffées au mazout, nous faisons la conversion complète vers une thermopompe centrale avec appoint électrique, coordonnons le retrait du réservoir et fournissons les documents pour LogisVert et Rénoclimat.` },
    { title: 'Bruit et voisinage', text: (n, l) => `Les municipalités de la Rive-Sud encadrent l'emplacement et le niveau sonore des unités extérieures aux limites de propriété. Nos conseillers choisissent avec vous un emplacement conforme ${l} : loin des chambres des voisins, à bonne distance des limites de terrain, sur un support surélevé pour la neige.` },
    { title: 'Entretien et service après-vente', text: (n, l) => `Une thermopompe bien entretenue dure 15 à 20 ans. Nous offrons l'entretien annuel et le service de réparation ${l}, pour les appareils que nous avons installés comme pour la plupart des marques courantes. Vous parlez aux mêmes personnes avant, pendant et après les travaux.` },
  ],
};

/* Paragraphes propres aux secteurs les plus importants : caractère général du parc
   résidentiel, sans statistiques. */
const CITY_NOTES = {
  'Rosemont–La Petite-Patrie': `Rosemont–La Petite-Patrie, c'est le royaume du duplex et du triplex des années 1910 à 1940, avec escaliers extérieurs, ruelles et cours arrière. Les logements y sont presque tous chauffés aux plinthes électriques. La thermopompe murale s'y installe naturellement, l'unité extérieure en cour arrière ou sur un balcon arrière avec support, hors de la façade. Les propriétaires-occupants qui louent un ou deux logements nous demandent souvent d'équiper chaque étage avec sa propre unité.`,
  'Villeray–Saint-Michel–Parc-Extension': `Villeray aligne ses triplex à balcons, Saint-Michel ses duplex et bungalows des années 1950 et 1960, Parc-Extension ses immeubles serrés. Les besoins diffèrent d'une rue à l'autre : murale pour un étage de triplex, multizone pour un duplex occupé par une même famille, centrale pour les rares maisons avec conduits. Dans ces secteurs denses, le choix de l'emplacement de l'unité extérieure fait toute la différence pour le voisinage.`,
  'Ahuntsic-Cartierville': `Ahuntsic mêle plex autour de la rue Fleury et cottages ou bungalows des années 1950 et 1960, dont plusieurs ont encore une fournaise au mazout ou au gaz. La conversion vers une thermopompe centrale y est l'un de nos projets les plus courants. Cartierville, plus récente par endroits, compte beaucoup de maisons avec conduits et de copropriétés en bordure de la rivière des Prairies.`,
  'Le Plateau-Mont-Royal': `Le Plateau est l'un des quartiers les plus denses du pays : plex à balcons et corniches, façades protégées, cours arrière étroites. L'arrondissement encadre strictement ce qui est visible depuis la rue. Nous installons donc l'unité extérieure en cour arrière, sur un balcon arrière ou sur la toiture, avec des modèles compacts et silencieux. Les copropriétés divises, très nombreuses, demandent l'accord du syndicat, que nous aidons à obtenir.`,
  'Mercier–Hochelaga-Maisonneuve': `Hochelaga-Maisonneuve est un quartier de plex ouvriers chauffés aux plinthes, où la murale et le multizone sont rois. Mercier et Tétreaultville offrent davantage de maisons unifamiliales et de duplex avec cour, parfois avec fournaise à air pulsé. Nous adaptons la solution à chaque bâtiment, de la murale d'un logement à la centrale d'un cottage.`,
  Anjou: `Anjou s'est développé surtout dans les années 1960 et 1970 : bungalows, cottages et jumelés à air pulsé. Le réseau de conduits est déjà en place, ce qui rend la thermopompe centrale climat froid particulièrement rentable. Plusieurs maisons ont encore une fournaise au mazout ou au gaz, que nous remplaçons avec la subvention majorée pour conversion.`,
  'Saint-Léonard': `Saint-Léonard est fait de duplex et de bungalows des années 1960 et 1970, souvent solidement construits, avec sous-sol aménagé et parfois une fournaise. Pour les maisons avec conduits, la centrale s'impose. Pour les duplex aux plinthes, un multizone par logement, avec les unités extérieures regroupées à l'arrière, donne un excellent résultat.`,
  'Montréal-Nord': `Montréal-Nord compte surtout des duplex et triplex des années 1950 et 1960 chauffés aux plinthes, ainsi que des bungalows le long de la rivière des Prairies. La thermopompe murale y réduit la facture d'électricité et rend l'été vivable dans des logements souvent exposés au soleil. Nous y installons aussi des multizones pour les propriétaires qui équipent tout leur immeuble.`,
  'Rivière-des-Prairies–Pointe-aux-Trembles': `Rivière-des-Prairies et Pointe-aux-Trembles sont parmi les secteurs les plus récents de l'île : maisons unifamiliales et jumelés des années 1980 à 2000, en majorité avec conduits d'air pulsé et fournaise électrique. La thermopompe centrale climat froid s'y raccorde simplement, et l'échangeur d'air complète souvent l'installation dans ces maisons plus étanches.`,
  'Côte-des-Neiges–Notre-Dame-de-Grâce': `Notre-Dame-de-Grâce aligne des cottages et des duplex des années 1920 à 1940, souvent avec une vieille fournaise au gaz ou au mazout et des conduits à moderniser. Côte-des-Neiges est plus dense, avec beaucoup d'immeubles et de condos. Conversion complète pour les maisons de NDG, murale compacte avec accord du syndicat pour les copropriétés : nous faisons les deux.`,
  Verdun: `Verdun, c'est des rangées de duplex et de triplex à balcons chauffés aux plinthes, où la murale s'installe en une journée avec l'unité extérieure à l'arrière. L'Île-des-Sœurs, elle, est un secteur de tours et de copropriétés où chaque installation passe par le syndicat. Nous connaissons les deux réalités.`,
  LaSalle: `LaSalle combine des bungalows et des duplex des années 1950 et 1960, plusieurs avec fournaise et conduits, et des copropriétés plus récentes près du canal de Lachine et du fleuve. Centrale climat froid pour les maisons, murale ou multizone pour les duplex et les condos : nous choisissons avec vous après avoir vu la maison.`,
  Lachine: `Lachine mêle un vieux noyau près du canal, des bungalows des années 1950 et 1960 et des secteurs plus récents. Beaucoup de maisons ont un système à air pulsé, ce qui favorise la thermopompe centrale. Les conversions de fournaises au mazout y sont encore fréquentes.`,
  'Saint-Laurent': `Saint-Laurent est vaste : bungalows des années 1950 et 1960 dans les quartiers établis, maisons de ville et condos récents dans Bois-Franc et près du REM. Les bungalows avec conduits sont parfaits pour une centrale; les habitations récentes, souvent bien isolées, profitent d'une centrale ou d'un multizone et d'un échangeur d'air.`,
  Outremont: `Outremont est un arrondissement de grandes maisons anciennes, de duplex cossus et d'immeubles d'appartements, avec des règles strictes sur ce qui est visible depuis la rue. Nous installons l'unité extérieure à l'arrière ou sur la toiture, et nous remplaçons régulièrement des systèmes au gaz ou au mazout par des thermopompes centrales dans les maisons avec conduits.`,
  Westmount: `Westmount est une ville de maisons patrimoniales, souvent encore chauffées au gaz ou au mazout, avec un règlement d'urbanisme qui encadre de près les équipements extérieurs. Nos conseillers connaissent les exigences en matière d'emplacement et de bruit, et proposent des solutions discrètes : centrale climat froid dans les maisons avec conduits, multizone à unités cachées dans les autres.`,
  'Mont-Royal': `Ville de Mont-Royal compte surtout des maisons unifamiliales des années 1940 à 1960, avec conduits d'air pulsé et souvent une fournaise au gaz, ainsi que des règlements précis sur l'apparence des propriétés. Nous y installons des thermopompes centrales climat froid avec une unité extérieure placée hors de la vue de la rue, dans le respect des règles municipales.`,
  'Pointe-Claire': `Pointe-Claire est typique de l'Ouest-de-l'Île : bungalows et cottages des années 1950 à 1970 avec fournaise et conduits, sur des terrains qui laissent de la place pour l'unité extérieure. La thermopompe centrale climat froid y remplace le mazout, le gaz ou une vieille fournaise électrique et climatise toute la maison l'été.`,
  Dorval: `Dorval aligne des bungalows et des jumelés des années 1950 et 1960, la plupart avec un système à air pulsé. La thermopompe centrale y donne d'excellents résultats, et nous y faisons régulièrement des conversions de fournaises au mazout. Les copropriétés près du lac Saint-Louis demandent l'accord du syndicat pour l'unité extérieure.`,
  'Dollard-des-Ormeaux': `Dollard-des-Ormeaux s'est construit dans les années 1960 à 1980 : cottages et bungalows à air pulsé, souvent avec sous-sol fini et plusieurs chambres à l'étage. Une thermopompe centrale climat froid raccordée aux conduits existants y chauffe et climatise toute la maison, et le zonage du réseau peut corriger les écarts entre les étages.`,
  Kirkland: `Kirkland compte des maisons plus grandes, des années 1970 à 1990, avec conduits d'air pulsé et souvent deux zones de chauffage. Une thermopompe centrale de bonne capacité, parfois un système à deux unités pour les grandes surfaces, y offre le meilleur confort. L'échangeur d'air est fréquemment ajouté dans les maisons rénovées et bien isolées.`,
  Beaconsfield: `Beaconsfield est fait de maisons des années 1950 à 1970 sur de grands terrains, avec fournaise et conduits. Il reste plusieurs systèmes au mazout que nous convertissons vers une thermopompe centrale avec appoint électrique, en coordonnant le retrait du réservoir et les demandes de subvention.`,
  'Pierrefonds-Roxboro': `Pierrefonds-Roxboro mêle des bungalows des années 1960 et 1970 et des développements plus récents. La plupart des maisons ont des conduits d'air pulsé, ce qui rend la thermopompe centrale climat froid particulièrement avantageuse. Dans les secteurs plus anciens, la conversion du mazout reste une demande courante.`,
  Chomedey: `Chomedey est le secteur le plus dense de Laval : bungalows et jumelés des années 1960 et 1970, immeubles à logements et copropriétés près du Carrefour Laval et du Centropolis. Centrale pour les bungalows avec conduits, murale ou multizone pour les jumelés aux plinthes et les condos. La proximité des voisins rend l'emplacement de l'unité extérieure déterminant.`,
  'Sainte-Rose': `Sainte-Rose combine un vieux village au bord de la rivière des Mille Îles, des bungalows des années 1970 et 1980 et des développements récents. Les maisons plus anciennes ont parfois encore une fournaise au mazout; les plus récentes, des conduits et une fournaise électrique. Dans les deux cas, la thermopompe centrale climat froid est la solution la plus rentable.`,
  Vimont: `Vimont est un secteur résidentiel de bungalows et de cottages des années 1970 à 1990, en très grande majorité avec système à air pulsé. Une thermopompe centrale climat froid s'y raccorde aux conduits existants et remplace avantageusement une fournaise électrique ou au gaz vieillissante.`,
  Auteuil: `Auteuil est un quartier familial de bungalows et de cottages des années 1970 et 1980, avec conduits d'air pulsé et souvent une piscine dans la cour. Nous y installons surtout des thermopompes centrales, en choisissant un emplacement d'unité extérieure qui respecte le voisinage et laisse l'espace de vie extérieur libre.`,
  Duvernay: `Duvernay mêle des cottages des années 1960 et 1970 et des maisons plus grandes et plus récentes dans Duvernay-Est. Les conduits sont presque toujours présents : la centrale climat froid est le choix naturel, avec un échangeur d'air dans les maisons récentes plus étanches.`,
  'Pont-Viau': `Pont-Viau est l'un des plus anciens secteurs de Laval, face à Montréal, avec des duplex, des bungalows des années 1950 et 1960 et des immeubles près du métro Cartier. Les logements aux plinthes passent à la murale; les bungalows avec fournaise, à la centrale, souvent dans le cadre d'une conversion du mazout.`,
  'Laval-des-Rapides': `Laval-des-Rapides combine des bungalows des années 1950 et 1960, des duplex et de nombreuses copropriétés récentes autour des stations de métro. Centrale pour les maisons avec conduits, murale compacte avec accord du syndicat pour les condos : nous adaptons la solution à chaque immeuble.`,
  Fabreville: `Fabreville est un grand secteur de bungalows et de cottages des années 1960 à 1990, avec conduits d'air pulsé, et des développements plus récents à l'ouest. La thermopompe centrale climat froid y remplace la fournaise existante et climatise toute la maison. Les conversions du mazout y sont encore fréquentes dans les rues les plus anciennes.`,
  'Sainte-Dorothée': `Sainte-Dorothée a gardé un caractère plus aéré, avec des terrains plus grands, d'anciennes maisons de campagne et beaucoup de constructions récentes. Les maisons neuves, étanches et bien isolées, profitent d'une thermopompe centrale et d'un échangeur d'air; les plus anciennes, d'une conversion complète de leur fournaise au mazout ou au propane.`,
  Terrebonne: `Terrebonne est l'une des villes qui ont le plus grandi de la Rive-Nord : maisons récentes de Lachenaie et de La Plaine, quartiers des années 1970 et 1980, et Vieux-Terrebonne avec ses maisons anciennes. Les développements récents ont presque tous des conduits et une fournaise électrique, parfaits pour une centrale climat froid. Dans le vieux noyau, nous travaillons plus souvent en murale et en multizone.`,
  Mascouche: `Mascouche s'est développée surtout depuis les années 1990 : maisons unifamiliales bien isolées, conduits d'air pulsé, fournaise électrique. Une thermopompe centrale climat froid y réduit fortement la facture de chauffage et climatise l'été, et l'échangeur d'air y est presque toujours utile.`,
  Repentigny: `Repentigny compte des bungalows des années 1960 à 1980 avec fournaise et conduits, et des secteurs plus récents vers Le Gardeur. Les conversions de fournaises au mazout y restent courantes, et la thermopompe centrale climat froid est le remplacement le plus demandé.`,
  Blainville: `Blainville, avec Fontainebleau et ses autres quartiers récents, est une ville de maisons unifamiliales spacieuses des années 1990 à aujourd'hui, bien isolées, avec conduits. La thermopompe centrale climat froid, parfois en deux zones pour les grandes maisons, y offre un confort optimal, complétée par un échangeur d'air.`,
  Boisbriand: `Boisbriand mêle des bungalows des années 1970 et 1980 et des développements récents. Les conduits d'air pulsé sont la norme, ce qui rend la thermopompe centrale climat froid particulièrement simple à installer. L'entretien annuel et le service se font sur place.`,
  'Sainte-Thérèse': `Sainte-Thérèse a un centre plus ancien, avec des maisons du début du siècle dernier et des immeubles à logements, entouré de quartiers de bungalows. Murale et multizone pour les logements aux plinthes, centrale pour les maisons avec conduits, conversion pour les fournaises au mazout encore en service.`,
  'Saint-Eustache': `Saint-Eustache combine un vieux centre, des quartiers de bungalows des années 1970 et 1980 et des secteurs plus récents. La plupart des maisons ont un système à air pulsé; la thermopompe centrale climat froid y est notre installation la plus fréquente, souvent en remplacement d'une fournaise au mazout ou au propane.`,
  Mirabel: `Mirabel est l'une des villes en plus forte croissance du Québec, avec des quartiers neufs à Saint-Canut, Saint-Janvier et ailleurs. Ces maisons étanches et bien isolées, avec conduits, sont idéales pour une thermopompe centrale climat froid jumelée à un échangeur d'air. Dans les secteurs ruraux, nous convertissons encore des systèmes au mazout et au propane.`,
  'Saint-Jérôme': `Saint-Jérôme, porte des Laurentides, a un centre ancien de maisons et d'immeubles à logements, des quartiers de bungalows et des développements récents. Les hivers y sont plus rudes : nous n'y installons que des modèles climat froid avec un appoint bien dimensionné. Murale pour les logements, centrale pour les maisons avec conduits.`,
  Rosemère: `Rosemère est une ville établie de maisons sur grands terrains boisés, des années 1950 à 1990, avec conduits et souvent une fournaise au mazout ou au gaz. La conversion vers une thermopompe centrale climat froid avec appoint électrique y est un projet fréquent, avec un emplacement d'unité extérieure choisi pour préserver le terrain.`,
  Longueuil: `Longueuil, c'est le Vieux-Longueuil avec ses plex et ses maisons anciennes, et les quartiers de bungalows des années 1950 et 1960 vers Saint-Hubert et Greenfield Park. Murale ou multizone pour les plex aux plinthes, centrale pour les bungalows avec fournaise, conversion complète pour les maisons encore au mazout : nous faisons les trois chaque semaine.`,
  Brossard: `Brossard mêle des maisons de ville et des jumelés des années 1970 et 1980 chauffés aux plinthes, des bungalows avec conduits et de nombreuses copropriétés récentes près du REM et du Quartier DIX30. Murale ou multizone pour les maisons de ville, centrale pour les bungalows, murale compacte avec accord du syndicat pour les condos.`,
  'Saint-Lambert': `Saint-Lambert est une ville de maisons anciennes et de cottages des années 1920 à 1950, souvent avec fournaise au gaz et conduits, et de règles d'urbanisme attentives à l'apparence des propriétés. Nous y remplaçons régulièrement des systèmes au gaz ou au mazout par des thermopompes centrales, avec l'unité extérieure placée à l'arrière.`,
  Boucherville: `Boucherville combine le Vieux-Boucherville et de grands quartiers de cottages des années 1970 à 1990, avec conduits et fournaise électrique ou au gaz. La thermopompe centrale climat froid y est le choix le plus courant, et les maisons plus récentes gagnent à ajouter un échangeur d'air.`,
  'Saint-Hubert': `Saint-Hubert est un secteur de bungalows et de jumelés des années 1960 et 1970, avec fournaise et conduits, où la thermopompe centrale climat froid remplace avantageusement le mazout, le gaz ou une vieille fournaise électrique. Les plex plus récents chauffés aux plinthes passent à la murale.`,
  'Greenfield Park': `Greenfield Park est un quartier établi de bungalows des années 1950 et 1960 sur des rues tranquilles, avec conduits d'air pulsé. Nous y installons surtout des thermopompes centrales, souvent dans le cadre d'une conversion du mazout, et des murales dans les duplex.`,
  'La Prairie': `La Prairie a un noyau historique de maisons anciennes et de vastes quartiers récents vers le sud. Les maisons neuves, étanches, avec conduits, profitent d'une centrale climat froid et d'un échangeur d'air; les maisons du vieux village, d'une murale ou d'un multizone quand elles n'ont pas de conduits.`,
  Candiac: `Candiac est une ville en croissance de maisons unifamiliales et de maisons de ville récentes, bien isolées, avec conduits d'air pulsé. La thermopompe centrale climat froid y est un choix naturel, et les copropriétés demandent l'accord du syndicat pour l'unité extérieure.`,
  Châteauguay: `Châteauguay est faite de bungalows et de cottages des années 1960 à 1980 avec fournaise et conduits, et de quartiers plus récents. La conversion du mazout y est encore une demande courante, et la thermopompe centrale climat froid le remplacement le plus fréquent.`,
  'Saint-Bruno-de-Montarville': `Saint-Bruno-de-Montarville compte des cottages des années 1960 à 1980 sur des terrains boisés, avec conduits, et des règles municipales attentives au bruit. Nous y installons des thermopompes centrales climat froid en choisissant un emplacement d'unité extérieure discret et conforme.`,
  'Sainte-Julie': `Sainte-Julie s'est développée surtout des années 1980 à 2000 : maisons unifamiliales avec conduits et fournaise électrique. La thermopompe centrale climat froid y réduit la facture de chauffage, climatise l'été, et un échangeur d'air complète souvent l'installation.`,
  Chambly: `Chambly mêle un centre historique près du bassin, des quartiers de bungalows et des développements récents. Murale ou multizone pour les maisons anciennes sans conduits, centrale pour les maisons à air pulsé, avec un modèle climat froid dans tous les cas.`,
  Beloeil: `Beloeil et le Vieux-Beloeil, au bord du Richelieu, combinent maisons anciennes, bungalows des années 1970 et 1980 et quartiers récents. La thermopompe centrale climat froid est le choix le plus courant dans les maisons avec conduits, et la murale dans les logements aux plinthes.`,
};

/* Banque de questions par secteur : 12 variantes par territoire. Chaque page en reçoit trois. */
const SECTOR_FAQ_POOL = {
  montreal: [
    { q: (n, l) => `Installez-vous des thermopompes dans les condos ${l}?`, a: (n) => `Oui, sous réserve du règlement de copropriété pour l'unité extérieure. Nous préparons les fiches techniques et les données sonores pour le syndicat et proposons des unités compactes qui s'installent sur un balcon, un mur arrière ou une toiture.` },
    { q: (n, l) => `Peut-on installer l'unité extérieure en façade ${l}?`, a: (n) => `Dans la plupart des arrondissements de Montréal, l'installation en façade est interdite ou fortement encadrée. Nous privilégions la cour arrière, un balcon arrière ou la toiture, et nous vérifions les règles de l'arrondissement avant de proposer un emplacement.` },
    { q: (n, l) => `Une thermopompe murale suffit-elle pour chauffer un logement de plex ${l}?`, a: (n) => `Pour un logement à aire ouverte, une murale climat froid bien dimensionnée chauffe la majorité de l'hiver, les plinthes servant d'appoint lors des grands froids. Pour plusieurs pièces fermées, un multizone donne un confort uniforme.` },
    { q: (n, l) => `Faites-vous les conversions du mazout ${l}?`, a: (n) => `Oui. Nous installons la thermopompe centrale ou la fournaise électrique, coordonnons le retrait du réservoir avec une entreprise spécialisée et fournissons les documents pour les subventions majorées.` },
    { q: (n, l) => `Combien de temps prend une installation ${l}?`, a: (n) => `Une journée pour une thermopompe murale, une à deux journées pour une centrale ou un multizone. Nos techniciens protègent les planchers, nettoient et vous expliquent le fonctionnement avant de partir.` },
    { q: (n, l) => `La thermopompe sera-t-elle bruyante pour mes voisins ${l}?`, a: (n) => `Les unités extérieures Daikin que nous installons comptent parmi les plus silencieuses du marché. Nous respectons les niveaux sonores permis aux limites de propriété et les éloignons des chambres, des fenêtres et des voisins.` },
    { q: (n, l) => `Faut-il un permis pour installer une thermopompe ${l}?`, a: (n) => `Selon l'arrondissement et l'emplacement choisi, une déclaration ou un permis peut être requis, notamment pour une installation en toiture ou visible de la rue. Nous vous indiquons ce qui s'applique à votre cas lors de l'évaluation.` },
    { q: (n, l) => `Ai-je droit aux subventions pour une thermopompe ${l}?`, a: (n) => `Si le modèle est certifié climat froid et inscrit sur les listes des programmes, et que l'installation est faite par un entrepreneur licencié RBQ, vous êtes généralement admissible à LogisVert d'Hydro-Québec, avec un montant majoré si vous remplacez un système au mazout ou au gaz. Nous le vérifions à la soumission.` },
    { q: (n, l) => `Pouvez-vous équiper les trois logements de mon triplex ${l}?`, a: (n) => `Oui. Nous proposons souvent une unité extérieure par logement, regroupées à l'arrière, ou un multizone par étage, selon la configuration. Chaque locataire garde le contrôle de sa température.` },
    { q: (n, l) => `Réparez-vous les thermopompes installées par d'autres entreprises ${l}?`, a: (n) => `Oui, pour la plupart des marques courantes. Appelez-nous avec le modèle et le symptôme; nous vous dirons rapidement si nous pouvons intervenir et à quel coût.` },
    { q: (n, l) => `Quelle thermopompe pour un condo au dernier étage ${l}?`, a: (n) => `Un logement au dernier étage chauffe beaucoup l'été. Une murale climat froid bien dimensionnée, avec l'unité extérieure sur la toiture ou le balcon selon l'accord du syndicat, règle à la fois la climatisation et le chauffage.` },
    { q: (n, l) => `Faites-vous l'entretien annuel ${l}?`, a: (n) => `Oui. Nos frigoristes font l'entretien annuel et les réparations dans tout l'arrondissement, sur nos installations comme sur la plupart des marques courantes. Un entretien documenté chaque année protège la garantie.` },
  ],
  laval: [
    { q: (n, l) => `Combien de temps pour une installation ${l}?`, a: (n) => `Une thermopompe murale s'installe en une journée. Une centrale demande une à deux journées. Nous planifions la date avec vous dès l'acceptation de la soumission.` },
    { q: (n, l) => `Ma maison a une fournaise au mazout : que proposez-vous ${l}?`, a: (n) => `Une thermopompe centrale climat froid raccordée à vos conduits, avec une fournaise électrique en appoint. Nous coordonnons le retrait du réservoir et fournissons les documents pour les subventions majorées.` },
    { q: (n, l) => `Puis-je garder ma fournaise actuelle avec une thermopompe centrale ${l}?`, a: (n) => `Souvent, oui, si elle est en bon état et compatible. Elle devient l'appoint pour les grands froids. Sinon, nous proposons une fournaise électrique adaptée.` },
    { q: (n, l) => `Les subventions s'appliquent-elles ${l}?`, a: (n) => `Oui. Les résidents de Laval ont accès aux programmes provinciaux et d'Hydro-Québec pour les thermopompes efficaces certifiées climat froid installées par un entrepreneur licencié. Nous vérifions votre admissibilité à la soumission.` },
    { q: (n, l) => `Y a-t-il des frais de déplacement pour ${n}?`, a: (n) => `Non. Nos soumissions pour Laval incluent le déplacement, l'installation et la mise en marche.` },
    { q: (n, l) => `Quelle thermopompe pour une maison aux plinthes ${l}?`, a: (n) => `Une murale climat froid pour un espace ouvert, un multizone pour couvrir les chambres et le sous-sol. Les deux s'installent sans conduits, en une journée.` },
    { q: (n, l) => `Faut-il changer mon entrée électrique ${l}?`, a: (n) => `Parfois, si votre panneau est ancien ou déjà chargé. Nous le vérifions lors de l'évaluation gratuite et l'incluons dans la soumission au besoin.` },
    { q: (n, l) => `Installez-vous dans les condos ${l}?`, a: (n) => `Oui, avec l'accord du syndicat de copropriété pour l'unité extérieure. Nous préparons les documents techniques et choisissons une unité compacte et silencieuse.` },
    { q: (n, l) => `Où placer l'unité extérieure sur un terrain de bungalow ${l}?`, a: (n) => `Sur le côté ou à l'arrière de la maison, à bonne distance des limites de terrain et des chambres des voisins, sur un support surélevé pour la neige. Nous choisissons l'emplacement avec vous.` },
    { q: (n, l) => `Une thermopompe suffit-elle pour chauffer à -30 °C ${l}?`, a: (n) => `Les modèles climat froid continuent de chauffer à -25 °C et parfois -30 °C, avec une capacité réduite. Un appoint électrique dimensionné prend le relais pour les heures les plus froides.` },
    { q: (n, l) => `Faites-vous l'entretien annuel ${l}?`, a: (n) => `Oui. Nos frigoristes se déplacent à Laval toute l'année pour l'entretien et les réparations, sur nos installations comme sur la plupart des marques courantes.` },
    { q: (n, l) => `Quel est le meilleur moment pour installer une thermopompe ${l}?`, a: (n) => `Le printemps ou l'automne, avant les pointes de l'été et de l'hiver. Vous obtenez la date de votre choix et souvent de meilleures promotions.` },
  ],
  'rive-nord': [
    { q: (n, l) => `Y a-t-il des frais de déplacement pour ${n}?`, a: (n) => `Non. Nos soumissions pour la Rive-Nord incluent le déplacement, l'installation et la mise en marche.` },
    { q: (n, l) => `Une thermopompe chauffe-t-elle vraiment par -25 °C ${l}?`, a: (n) => `Oui, les modèles climat froid que nous installons maintiennent une capacité de chauffage importante à -25 °C. Un appoint électrique, dimensionné pour votre maison, prend le relais lors des nuits extrêmes.` },
    { q: (n, l) => `Ma maison est neuve : ai-je besoin d'un échangeur d'air ${l}?`, a: (n) => `Très probablement. Une maison récente est étanche et doit renouveler son air. Un échangeur à récupération de chaleur réduit l'humidité, la condensation et les odeurs, sans gaspiller la chaleur.` },
    { q: (n, l) => `Combien de temps prend l'installation ${l}?`, a: (n) => `Une journée pour une thermopompe murale, une à deux journées pour une centrale. Nous fixons la date avec vous dès l'acceptation de la soumission.` },
    { q: (n, l) => `Ma fournaise est au propane ou au mazout : que faire ${l}?`, a: (n) => `Nous la remplaçons par une thermopompe centrale climat froid avec appoint électrique, coordonnons le retrait du réservoir et fournissons les documents pour les subventions majorées pour conversion.` },
    { q: (n, l) => `Les subventions s'appliquent-elles ${l}?`, a: (n) => `Oui. Les programmes provinciaux et d'Hydro-Québec s'appliquent sur toute la Rive-Nord pour les thermopompes efficaces certifiées climat froid installées par un entrepreneur licencié.` },
    { q: (n, l) => `Ma maison est grande : une seule thermopompe suffit-elle ${l}?`, a: (n) => `Souvent oui, avec une centrale de bonne capacité. Pour les très grandes maisons ou celles à deux zones de chauffage, nous proposons parfois deux appareils ou un zonage du réseau de conduits.` },
    { q: (n, l) => `Faites-vous l'entretien annuel ${l}?`, a: (n) => `Oui. Nos frigoristes couvrent toute la Rive-Nord pour l'entretien annuel et les réparations, sur nos installations comme sur la plupart des marques courantes.` },
    { q: (n, l) => `Quelle marque recommandez-vous ${l}?`, a: (n) => `Daikin Fit ou Skyair pour la performance en climat froid et le silence, Moovair pour le meilleur rapport qualité-prix. Nous recommandons selon votre maison, pas selon un catalogue.` },
    { q: (n, l) => `Le tarif bi-énergie est-il intéressant ${l}?`, a: (n) => `Si vous conservez un appoint, le tarif bi-énergie d'Hydro-Québec peut réduire votre coût d'électricité une bonne partie de l'année. Nous en discutons lors de l'évaluation.` },
    { q: (n, l) => `Où placer l'unité extérieure quand il neige beaucoup ${l}?`, a: (n) => `Sur un support surélevé, à l'abri des chutes de neige et de glace du toit, avec un dégagement de 60 cm tout autour. Nous choisissons l'emplacement pour que l'appareil respire tout l'hiver.` },
    { q: (n, l) => `Quel est le meilleur moment pour installer ${l}?`, a: (n) => `Le printemps ou l'automne. Les délais s'allongent dès la première canicule et le premier grand froid.` },
  ],
  'rive-sud': [
    { q: (n, l) => `Réparez-vous les thermopompes installées par d'autres entreprises ${l}?`, a: (n) => `Oui, pour la plupart des marques courantes. Appelez-nous avec le modèle et le symptôme, nous vous dirons rapidement si nous pouvons intervenir.` },
    { q: (n, l) => `Y a-t-il des frais de déplacement pour ${n}?`, a: (n) => `Non. Nos soumissions pour la Rive-Sud incluent le déplacement, l'installation et la mise en marche.` },
    { q: (n, l) => `Ma maison a une fournaise au mazout : que proposez-vous ${l}?`, a: (n) => `Une thermopompe centrale climat froid raccordée à vos conduits, avec une fournaise électrique en appoint. Nous coordonnons le retrait du réservoir et fournissons les documents pour les subventions majorées.` },
    { q: (n, l) => `Quelle thermopompe pour une maison de ville aux plinthes ${l}?`, a: (n) => `Une murale climat froid pour l'aire ouverte, ou un multizone pour couvrir aussi les chambres à l'étage. Installation en une journée, sans conduits.` },
    { q: (n, l) => `Installez-vous dans les condos ${l}?`, a: (n) => `Oui, avec l'accord du syndicat de copropriété pour l'unité extérieure. Nous préparons les documents techniques et choisissons une unité compacte et silencieuse.` },
    { q: (n, l) => `Combien de temps prend l'installation ${l}?`, a: (n) => `Une journée pour une murale, une à deux journées pour une centrale. Nous planifions la date avec vous dès l'acceptation de la soumission.` },
    { q: (n, l) => `Les subventions s'appliquent-elles ${l}?`, a: (n) => `Oui. Les programmes provinciaux et d'Hydro-Québec s'appliquent sur la Rive-Sud pour les thermopompes efficaces certifiées climat froid installées par un entrepreneur licencié RBQ.` },
    { q: (n, l) => `La thermopompe sera-t-elle bruyante pour mes voisins ${l}?`, a: (n) => `Les unités extérieures que nous installons sont parmi les plus silencieuses du marché, et nous respectons les niveaux sonores permis aux limites de propriété. Nous les éloignons des chambres et des voisins.` },
    { q: (n, l) => `Puis-je garder ma fournaise actuelle ${l}?`, a: (n) => `Souvent, oui, si elle est en bon état et compatible. Elle devient l'appoint. Sinon, nous proposons une fournaise électrique adaptée.` },
    { q: (n, l) => `Faites-vous l'entretien annuel ${l}?`, a: (n) => `Oui. Nos frigoristes couvrent toute la Rive-Sud pour l'entretien annuel et les réparations, sur nos installations comme sur la plupart des marques courantes.` },
    { q: (n, l) => `Une thermopompe suffit-elle pour chauffer à -30 °C ${l}?`, a: (n) => `Les modèles climat froid continuent de chauffer à -25 °C et parfois -30 °C, avec une capacité réduite. Un appoint électrique dimensionné prend le relais pour les heures les plus froides.` },
    { q: (n, l) => `Faut-il changer mon entrée électrique ${l}?`, a: (n) => `Parfois, si votre panneau est ancien ou déjà chargé. Nous le vérifions lors de l'évaluation gratuite et l'incluons dans la soumission au besoin.` },
  ],
};

const SECTOR_PRODUCTS = {
  montreal: ['thermopompe-murale', 'thermopompe-centrale', 'air-climatise-mural'],
  laval: ['thermopompe-centrale', 'thermopompe-murale', 'fournaise-air-pulse'],
  'rive-nord': ['thermopompe-centrale', 'thermopompe-murale', 'echangeur-air'],
  'rive-sud': ['thermopompe-centrale', 'thermopompe-murale', 'air-climatise-central'],
};

const SECTOR_IMAGES = {
  montreal: ['/montreal-skyline.jpg', '/hero.jpg', '/hvac-hero.jpg', '/installation.jpg'],
  laval: ['/hero.jpg', '/installation.jpg', '/hvac-hero.jpg'],
  'rive-nord': ['/installation.jpg', '/hero.jpg', '/hvac-hero.jpg'],
  'rive-sud': ['/hvac-hero.jpg', '/installation.jpg', '/hero.jpg'],
};

function sectorPage(area, name, i) {
  const l = locative(name);
  const isMtl = area.slug === 'montreal';
  const areaSections = AREA_SECTIONS[area.slug];
  const cityNote = CITY_NOTES[name];

  const rotating = [pick(areaSections, i), pick(areaSections, i + 2)].map((s) => ({ title: s.title, text: s.text(name, l) }));
  const sections = cityNote
    ? [{ title: isMtl ? `${name} : le quartier et ses maisons` : `${name} : les maisons du secteur`, text: cityNote }, ...rotating]
    : [...rotating, { ...pick(areaSections, i + 4), text: pick(areaSections, i + 4).text(name, l) }];

  const pool = SECTOR_FAQ_POOL[area.slug];
  const faqIdx = [i % pool.length, (i + 4) % pool.length, (i + 8) % pool.length];
  const faq = faqIdx.map((k) => ({ q: pool[k].q(name, l), a: pool[k].a(name, l) }));

  const where = isMtl ? `${name}, Montréal` : `${name} (${area.name})`;
  const image = pick(SECTOR_IMAGES[area.slug], i);

  return {
    slug: `thermopompe-${slugifySector(name)}`,
    type: 'sector',
    area,
    sector: name,
    service: 'Thermopompe',
    h1: `Thermopompe ${l} : installation, vente et entretien`,
    metaTitle: name.length > 16 ? `Thermopompe ${name}` : `Thermopompe ${name} : installation`,
    metaDescription: name.length > 16
      ? `Thermopompes murales et centrales ${l}. Détaillant Daikin depuis 1962, subventions, soumission gratuite. (514) 494-0400.`
      : `Installation de thermopompes murales et centrales ${l} (${isMtl ? 'Montréal' : area.name}). Détaillant Daikin depuis 1962, subventions, soumission gratuite. (514) 494-0400.`,
    eyebrow: `THERMOPOMPE ${name.toUpperCase()}`,
    intro: pick(SECTOR_INTROS[area.slug], i)(name, l),
    answer: pick(SECTOR_ANSWERS[area.slug], i + 1)(name, l),
    sections,
    faq: [...faq, COMMON_FAQ.soumission, COMMON_FAQ.subventions, COMMON_FAQ.delai],
    products: SECTOR_PRODUCTS[area.slug],
    image,
    imageAlt: `Installation de thermopompe ${l}, ${where}`,
  };
}

const RESERVED = new Set(LANDING_PAGES.map((p) => p.slug));

export const SECTOR_PAGES = AREAS.flatMap((area) =>
  area.sectors.map((name, i) => sectorPage(area, name, i))
).filter((p, idx, arr) => !RESERVED.has(p.slug) && arr.findIndex((o) => o.slug === p.slug) === idx);

LANDING_PAGES.push(...SECTOR_PAGES);

export function getLanding(slug) {
  return LANDING_PAGES.find((p) => p.slug === slug) || null;
}

/** Six secteurs voisins du même territoire (ordre de la liste, de part et d'autre). */
export function getNeighbouringSectors(slug, count = 6) {
  const page = getLanding(slug);
  if (!page || page.type !== 'sector') return [];
  const list = page.area.sectors;
  const idx = list.indexOf(page.sector);
  // Fenêtre centrée sur le secteur, sans retour au début de la liste.
  let lo = idx;
  let hi = idx;
  while (hi - lo < count && (lo > 0 || hi < list.length - 1)) {
    if (lo > 0) lo -= 1;
    if (hi - lo < count && hi < list.length - 1) hi += 1;
  }
  return list
    .slice(lo, hi + 1)
    .filter((name) => name !== page.sector)
    .map((name) => ({ name, slug: `thermopompe-${slugifySector(name)}` }))
    .filter((o) => getLanding(o.slug))
    .slice(0, count);
}

/** Tous les secteurs d'un territoire avec leur page, pour les pages « hub ». */
export function getAreaSectorLinks(areaSlug) {
  return SECTOR_PAGES.filter((p) => p.area.slug === areaSlug).map((p) => ({ name: p.sector, slug: p.slug }));
}
