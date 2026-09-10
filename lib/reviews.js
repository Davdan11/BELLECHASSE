/**
 * Témoignages clients publiés par Bellechasse Énergie (repris de bellechasseenergie.ca/temoignages).
 * Aucune note chiffrée n'est associée : on ne publie pas d'étoiles inventées.
 * Pour ajouter un avis : { name, text, product?, city?, source? }.
 */
export const REVIEWS = [
  { name: 'Jérôme Moisan', text: "La rencontre avec le représentant Nicolas Matte s'est très bien passée. Discours honnête, installation rapide et de bonne qualité. Respect du contrat et bon service après-vente." },
  { name: 'Martin Girard', text: "Très bon service! La première interaction et la soumission étaient conviviales. L'installation a été rapide et professionnelle. Le soutien après-vente est hors pair, je ne suis pas déçu." },
  { name: 'Jean Wbattet', text: "Travail vite et bien fait. William a été poli et nous a tout expliqué à mesure. Mon épouse Sophie et moi sommes très contents et recommandons hautement Bellechasse Énergie." },
  { name: 'Chantal Lalumière', text: "Je suis très satisfaite du service de Bellechasse Énergie. Équipe professionnelle, installateur courtois et travail impeccable. Rapidité d'installation après l'achat, je recommande sans hésiter." },
  { name: 'Arnaud', text: "Très belle expérience du début à la fin. L'équipe s'est montrée professionnelle, compétente et sympathique. Conseils adaptés, installation rapide et suivi sérieux après l'installation." },
  { name: 'Gilles Ruiz', product: 'Daikin Atmosphera', text: "Installation de ma thermopompe Daikin Atmosphera réalisée en quelques jours seulement. Belle équipe pour l'installation, travail soigné et efficace. Je recommande cette compagnie sans problème." },
  { name: 'Michel Boulerice', product: 'Thermopompe murale', text: "Nous avons remplacé notre vieille thermopompe murale par un nouvel appareil. Bellechasse Énergie a fait un travail rapide et professionnel. Nous recommandons chaudement cette entreprise." },
  { name: 'Burelle Pierre', product: 'Thermopompe centrale', text: "Je suis ravie de l'installation de ma nouvelle thermopompe centrale. Service personnalisé, attention portée à mes besoins et travail impeccable. Bellechasse Énergie a dépassé mes attentes." },
  { name: 'Oli', text: "Je suis plus que satisfait du service offert par Bellechasse Énergie. Compétences techniques, rapidité d'installation et professionnalisme. Je les recommande vivement." },
  { name: 'Marie-Ève Gringas', text: "Nous avons eu une très bonne expérience de la soumission à l'installation. Équipe disponible pour répondre aux questions, conseils pertinents et délai rapide. Merci pour vos services!" },
  { name: 'Valérie Crevier', text: "Les installateurs étaient gentils et polis. Ils ont pris la peine de me demander où je voulais les différents éléments, ce que j'ai trouvé très respectueux et professionnel." },
  { name: 'Line Lalonde', text: "Je croyais qu'il n'était plus possible d'obtenir cette qualité de service. Moins de 48 heures pour installer mon système après la soumission. Superbe expérience du début à la fin." },
  { name: 'François Larouche', text: "Expérience positive de la visite du représentant à celle des installateurs. Merci à toute l'équipe pour votre courtoisie, votre expertise et votre professionnalisme. Bon choix assuré." },
  { name: 'Pierre Veronneau', text: "Après vérification, meilleur prix trouvé. Installation de qualité par des professionnels, ponctuelle et proprement faite. Bravo à toute l'équipe, je recommande fortement Bellechasse Énergie." },
  { name: 'Raymond Flynn', text: "J'ai fait installer une thermopompe par Bellechasse Énergie. M. Matte a été patient pour tout expliquer. Installateurs polis, travail propre et aide précieuse pour la subvention." },
  { name: 'Vincent Archambault', product: 'Réparation', text: "J'ai obtenu un service hors pair dès la prise de rendez-vous. Diagnostic précis, explications claires et technicien attentif. Bien content d'avoir trouvé une entreprise fiable et professionnelle." },
  { name: 'Claude Morin', text: "Diego et William ont effectué un travail propre et professionnel. L'installation présentait un défi relevé avec succès. Résultat impeccable, mes attentes élevées ont été pleinement satisfaites." },
];

/** Nœuds schema.org Review (sans note chiffrée) à rattacher à l'organisation. */
export function reviewSchemas(organizationId, limit = REVIEWS.length) {
  return REVIEWS.slice(0, limit).map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    reviewBody: r.text,
    itemReviewed: { '@id': organizationId },
    inLanguage: 'fr-CA',
  }));
}
