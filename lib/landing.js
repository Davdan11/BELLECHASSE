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
    metaTitle: `Thermopompe ${area.name} | Installation et soumission gratuite`,
    metaDescription: `Installation de thermopompes murales et centrales à ${area.name} par Bellechasse Énergie, détaillant autorisé Daikin depuis 1962. Climat froid, subventions, soumission gratuite. (514) 494-0400.`,
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
    metaTitle: 'Installation de thermopompe Montréal, Laval, Rive-Nord, Rive-Sud',
    metaDescription:
      "Installation professionnelle de thermopompes murales et centrales par des frigoristes certifiés. Détaillant autorisé Daikin, RBQ, CMMTQ. Grand Montréal, Laval, Rive-Nord et Rive-Sud. Soumission gratuite.",
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
    metaTitle: 'Climatisation Montréal | Installation air climatisé central et mural',
    metaDescription:
      "Installation d'air climatisé central, de climatiseurs muraux et de thermopompes à Montréal, Laval, Rive-Nord et Rive-Sud. Daikin, Moovair, Mainline. Installé rapidement, soumission gratuite.",
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
    metaTitle: 'Chauffage Montréal | Thermopompe, fournaise électrique, conversion mazout',
    metaDescription:
      "Systèmes de chauffage résidentiel à Montréal, Laval, Rive-Nord et Rive-Sud : thermopompes climat froid, fournaises électriques à air pulsé, conversion du mazout et du gaz. Depuis 1962. Soumission gratuite.",
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
    metaTitle: 'Remplacement fournaise mazout Montréal | Conversion thermopompe, subventions',
    metaDescription:
      "Conversion de votre chauffage au mazout vers une thermopompe centrale ou une fournaise électrique. Retrait du réservoir coordonné, subventions LogisVert et Rénoclimat. Montréal, Laval, Rive-Nord, Rive-Sud.",
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
    metaTitle: 'Entretien et réparation de thermopompe Montréal, Laval, Rives',
    metaDescription:
      "Entretien annuel et réparation de thermopompes, climatiseurs et fournaises par des frigoristes certifiés. Toutes marques courantes. Montréal, Laval, Rive-Nord et Rive-Sud. (514) 494-0400.",
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
    image: '/installation-hands.png',
  }),
  servicePage({
    slug: 'thermopompe-centrale-montreal',
    service: 'Thermopompe centrale',
    h1: 'Thermopompe centrale à Montréal : installation et prix',
    metaTitle: 'Thermopompe centrale Montréal | Installation Daikin Fit, Moovair',
    metaDescription:
      "Installation de thermopompes centrales climat froid Daikin Fit, Skyair et Moovair à Montréal, Laval, Rive-Nord et Rive-Sud. Remplace le mazout et le gaz, climatise l'été. Soumission gratuite.",
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
    metaTitle: 'Thermopompe murale Montréal | Daikin Atmosphera, multizone, installation 1 jour',
    metaDescription:
      "Installation de thermopompes murales sans conduits à Montréal, Laval, Rive-Nord et Rive-Sud. Daikin Atmosphera, Oterra, multizones. Remplace les plinthes, climatise l'été. Installée en une journée.",
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
    metaTitle: "Échangeur d'air Montréal | Installation VRC Aldes, qualité de l'air",
    metaDescription:
      "Installation et remplacement d'échangeurs d'air à récupération de chaleur (VRC) Aldes à Montréal, Laval, Rive-Nord et Rive-Sud. Moins d'humidité, meilleur air, moins de pertes de chaleur. Soumission gratuite.",
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

export function getLanding(slug) {
  return LANDING_PAGES.find((p) => p.slug === slug) || null;
}
