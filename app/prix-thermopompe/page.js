import Link from 'next/link';
import EditorialNavbar from '../../components/EditorialNavbar';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import FAQBlock from '../../components/FAQBlock';
import ContactRequestForm from '../../components/ContactRequestForm';
import { SITE_URL, PHONE_DISPLAY, PHONE_TEL, breadcrumbSchema, faqSchema, graph, ORGANIZATION_ID } from '../../lib/site';
import styles from '../guide.module.css';

const URL = `${SITE_URL}/prix-thermopompe`;
const TITLE = "Prix d'une thermopompe au Québec en 2026";
const DESCRIPTION = 'Fourchettes de prix installées pour thermopompe murale, centrale et climatisation au Québec, ce qui fait varier la facture, subventions et financement.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: `${TITLE} | Bellechasse Énergie`,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: `${SITE_URL}/hvac-hero.jpg`, alt: 'Installation de thermopompe murale au Québec' }],
  },
};

/* Fourchettes indicatives, installation incluse, avant taxes et avant subventions,
   pour une maison du Grand Montréal. Un prix ferme exige une évaluation sur place. */
const PRICE_ROWS = [
  { type: 'Thermopompe murale mono-zone', cap: '9 000 à 18 000 BTU/h', range: '3 500 $ à 7 000 $', note: 'Un espace ouvert ou une grande pièce. Les modèles climat froid (ex. Daikin Atmosphera) sont dans le haut de la fourchette.' },
  { type: 'Thermopompe murale multizone', cap: '2 à 4 unités intérieures', range: '7 000 $ à 15 000 $', note: 'Une seule unité extérieure, une tête par pièce. Le prix dépend surtout du nombre de têtes et de la longueur des conduites.' },
  { type: 'Thermopompe centrale climat froid', cap: '2 à 4 tonnes', range: '9 000 $ à 18 000 $', note: 'Raccordée aux conduits existants. Ajoutez 2 500 $ à 4 500 $ si l’unité intérieure ou la fournaise doit être remplacée.' },
  { type: 'Air climatisé central', cap: '2 à 4 tonnes', range: '5 000 $ à 9 000 $', note: 'Climatisation seulement, sur conduits existants. Pour un supplément modeste, la centrale chauffe aussi l’hiver.' },
  { type: 'Fournaise électrique à air pulsé', cap: '10 à 20 kW', range: '4 000 $ à 7 500 $', note: 'Souvent installée comme appoint d’une thermopompe centrale ou pour remplacer une fournaise au mazout.' },
  { type: 'Échangeur d’air (VRC)', cap: 'Selon la superficie', range: '2 500 $ à 5 500 $', note: 'Remplacement d’un appareil existant dans le bas de la fourchette, nouvelle installation avec conduits dans le haut.' },
];

const DRIVERS = [
  { title: 'Capacité (BTU ou tonnage)', text: "Plus la maison est grande, mal isolée ou exposée, plus la capacité requise est élevée, et plus l'appareil coûte cher. Un calcul de charge fait sur place évite de payer pour une capacité inutile, ou de se retrouver avec un appareil qui peine à -20 °C." },
  { title: 'Efficacité : SEER2 et HSPF2', text: "Le SEER2 mesure l'efficacité en climatisation, le HSPF2 en chauffage. Un appareil plus efficace coûte plus cher à l'achat mais moins à faire fonctionner chaque année, et il est plus souvent admissible aux subventions." },
  { title: 'Performance en climat froid', text: "Une thermopompe « climat froid » garde une bonne capacité de chauffage à -25 °C. C'est ce qui permet de s'en servir comme chauffage principal au Québec. Cette technologie a un coût, largement compensé par les économies et les aides financières." },
  { title: 'Marque et gamme', text: "Daikin, Moovair, Mainline, Tosot : chaque fabricant a des gammes d'entrée, de milieu et de haut de gamme. Le silence, la filtration, la connectivité et la durée de la garantie font une partie de l'écart de prix." },
  { title: "Complexité de l'installation", text: "Longueur des conduites de réfrigérant, passage dans un mur de brique ou de pierre, installation sur toiture ou balcon, support surélevé, accès difficile : chaque contrainte ajoute des heures de travail." },
  { title: 'Électricité', text: "Le raccordement par un électricien licencié est toujours inclus dans nos soumissions. Une mise à niveau de l'entrée électrique ou du panneau, parfois nécessaire pour une centrale, s'ajoute au coût du projet." },
];

const FAQ = [
  { q: 'Combien coûte une thermopompe murale installée au Québec?', a: "Pour une murale mono-zone installée, comptez généralement entre 3 500 $ et 7 000 $ avant taxes et subventions, selon la capacité, la performance en climat froid et la complexité de l'installation. Une évaluation sur place permet de fixer un prix ferme." },
  { q: 'Quel est le prix d’une thermopompe centrale?', a: "Entre 9 000 $ et 18 000 $ installée sur des conduits existants, à titre indicatif. Le remplacement de la fournaise ou de l'unité intérieure, ou une mise à niveau électrique, peut s'ajouter. Les subventions pour conversion du mazout réduisent souvent le coût net de façon importante." },
  { q: 'Les prix incluent-ils l’installation et l’électricité?', a: "Les fourchettes de ce guide incluent l'appareil, l'installation par nos frigoristes et le raccordement électrique par un électricien licencié. Elles excluent les taxes, les subventions et les travaux imprévus, comme une mise à niveau du panneau électrique." },
  { q: 'Comment obtenir un prix exact pour ma maison?', a: "En réservant une évaluation gratuite à domicile. Un conseiller mesure la maison, calcule la charge, vérifie l'électricité et l'emplacement des unités, puis vous remet une soumission détaillée avec les subventions applicables. Le prix est ferme." },
  { q: 'Une thermopompe est-elle rentable au Québec?', a: "Dans la très grande majorité des cas, oui. Une thermopompe climat froid chauffe pour une fraction du coût des plinthes électriques, du mazout ou du gaz, climatise l'été et dure 15 à 20 ans lorsqu'elle est entretenue. Les subventions raccourcissent encore le délai de récupération." },
];

export default function PrixThermopompePage() {
  const schema = graph(
    {
      '@type': 'WebPage',
      '@id': `${URL}#page`,
      url: URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'fr-CA',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': ORGANIZATION_ID },
      datePublished: '2026-09-09',
      dateModified: '2026-09-09',
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.answer'] },
    },
    breadcrumbSchema([{ name: 'Accueil', href: '/' }, { name: "Prix d'une thermopompe", href: '/prix-thermopompe' }]),
    faqSchema(FAQ)
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <EditorialNavbar theme="light" />
      <main id="contenu">
        <section className={styles.hero}>
          <div className="container">
            <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
              <Link href="/">Accueil</Link><span>/</span><span className={styles.current}>Prix d’une thermopompe</span>
            </nav>
            <div className={styles.heroRow}>
              <div>
                <span className={styles.eyebrow}>GUIDE DES PRIX 2026</span>
                <h1 className={styles.title}>Prix d’une thermopompe au Québec en 2026 : guide complet</h1>
              </div>
              <div>
                <p className={styles.lead}>
                  Des fourchettes honnêtes pour chaque type d’appareil, ce qui fait monter ou baisser la facture, et
                  comment les subventions et le financement changent le coût réel. Écrit par une entreprise qui installe
                  des thermopompes dans le Grand Montréal depuis 1962.
                </p>
                <div className={styles.heroActions}>
                  <a href={`tel:${PHONE_TEL}`} className={styles.phone}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
                    {PHONE_DISPLAY}
                  </a>
                  <span className={styles.hours}>Lundi au vendredi, 8 h à 17 h</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={`${styles.prose} answer`}>
              <p>
                <strong>En bref :</strong> en 2026, une thermopompe murale installée coûte généralement de 3 500 $ à 7 000 $, un système
                multizone de 7 000 $ à 15 000 $ et une thermopompe centrale climat froid de 9 000 $ à 18 000 $, avant taxes et
                subventions. Les programmes LogisVert et Rénoclimat peuvent réduire ce coût de plusieurs milliers de dollars,
                surtout lors d’une conversion du mazout ou du gaz. Seule une évaluation sur place donne un prix ferme.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className="container">
            <span className={styles.eyebrow}>TABLEAU COMPARATIF</span>
            <h2 className={styles.sectionTitle}>Fourchettes de prix installés, par type d’appareil</h2>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Type d’appareil</th>
                    <th scope="col">Capacité typique</th>
                    <th scope="col">Prix installé (indicatif)</th>
                    <th scope="col">Ce qu’il faut savoir</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICE_ROWS.map((r) => (
                    <tr key={r.type}>
                      <td><strong>{r.type}</strong></td>
                      <td>{r.cap}</td>
                      <td><strong>{r.range}</strong></td>
                      <td>{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.tableNote}>
              Fourchettes indicatives pour une résidence du Grand Montréal, de Laval, de la Rive-Nord ou de la Rive-Sud, en
              date de septembre 2026. Elles comprennent l’appareil, l’installation par nos frigoristes et le raccordement
              électrique, et excluent les taxes, les subventions, le retrait d’un réservoir à mazout et les mises à niveau
              électriques. Les prix des fabricants et les programmes changent; votre soumission fait foi.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`container ${styles.twoCol}`}>
            <div>
              <span className={styles.eyebrow}>CE QUI FAIT VARIER LE PRIX</span>
              <h2 className={styles.sectionTitle}>Six facteurs expliquent presque tout l’écart entre deux soumissions</h2>
              <div className={styles.cards2}>
                {DRIVERS.map((d, i) => (
                  <article key={d.title} className={styles.card}>
                    <span className={styles.num}>0{i + 1}</span>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </article>
                ))}
              </div>
            </div>
            <aside className={styles.aside}>
              <div className={styles.formCol}>
                <ContactRequestForm compact source="prix-thermopompe" />
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className="container">
            <span className={styles.eyebrow}>SUBVENTIONS</span>
            <h2 className={styles.sectionTitle}>LogisVert et Rénoclimat : ce qui réduit vraiment la facture</h2>
            <div className={styles.cards}>
              <article className={styles.card}>
                <span className={styles.num}>01</span>
                <h3>LogisVert d’Hydro-Québec</h3>
                <p>
                  Aide financière pour l’installation d’une thermopompe efficace inscrite sur la liste des modèles admissibles,
                  installée par un entrepreneur licencié RBQ. Le montant dépend de la capacité de chauffage de l’appareil et
                  est majoré lorsque vous remplacez un système au mazout, au gaz ou au propane.
                </p>
              </article>
              <article className={styles.card}>
                <span className={styles.num}>02</span>
                <h3>Rénoclimat</h3>
                <p>
                  Programme du gouvernement du Québec. Une évaluation énergétique de la maison avant et après les travaux
                  donne accès à une aide pour le remplacement du système de chauffage par une thermopompe, cumulable avec
                  d’autres mesures comme l’isolation et l’étanchéité.
                </p>
              </article>
              <article className={styles.card}>
                <span className={styles.num}>03</span>
                <h3>Tarif bi-énergie et municipalités</h3>
                <p>
                  Si vous conservez un appoint, le tarif bi-énergie d’Hydro-Québec réduit votre coût d’électricité une
                  bonne partie de l’année. Certaines municipalités offrent ponctuellement une aide pour le retrait d’un
                  réservoir à mazout.
                </p>
              </article>
            </div>
            <p className={styles.note} style={{ marginTop: '1.5rem' }}>
              Les montants et conditions changent régulièrement et dépendent de votre situation. Utilisez notre{' '}
              <Link href="/calculateur-subventions">calculateur de subventions</Link> pour une estimation, lisez notre article sur les{' '}
              <Link href="/blogue/subventions-thermopompe-quebec">subventions pour thermopompe au Québec</Link>, et consultez la page{' '}
              <Link href="/financement">financement et subventions</Link>. Votre admissibilité exacte est confirmée à la soumission.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`container ${styles.twoCol}`}>
            <div className={styles.prose}>
              <span className={styles.eyebrow}>FINANCEMENT</span>
              <h2 className={styles.sectionTitle}>Payer par mois plutôt que d’un coup</h2>
              <p>
                La plupart de nos clients financent leur thermopompe par l’entremise de nos partenaires financiers, avec des
                paiements mensuels sur plusieurs durées possibles, sujets à l’approbation de crédit. Dans bien des cas, la
                mensualité est inférieure aux économies réalisées sur le chauffage, surtout lors d’une conversion du mazout.
                Les détails sont présentés avec la soumission. <Link href="/financement">Voir les options de financement</Link>.
              </p>
              <h3>Ce qui peut s’ajouter au prix de l’appareil</h3>
              <ul>
                <li>Retrait, nettoyage et disposition d’un réservoir à mazout par une entreprise spécialisée.</li>
                <li>Mise à niveau du panneau ou de l’entrée électrique, si le panneau est ancien ou déjà chargé.</li>
                <li>Réparation ou modification de conduits d’air pulsé en mauvais état.</li>
                <li>Support de toit ou de balcon, goulottes longues, passage dans la maçonnerie.</li>
                <li>Documents pour le syndicat de copropriété et, selon l’arrondissement, un permis.</li>
              </ul>
              <h3>Ce qui ne devrait jamais s’ajouter</h3>
              <ul>
                <li>Des frais de déplacement pour Laval, la Rive-Nord ou la Rive-Sud : ils sont inclus.</li>
                <li>Une « mise en marche » ou un « enregistrement de garantie » facturés à part.</li>
                <li>Une surprise le jour de l’installation : la soumission est un prix ferme.</li>
              </ul>
              <p className={styles.note}>
                <strong>Avertissement.</strong> Les prix de cette page sont des repères, pas une offre. Chaque maison est différente :
                seule une évaluation gratuite à domicile, avec calcul de charge et vérification de l’électricité, permet de vous
                remettre un prix ferme. Aucun prix n’est donné par téléphone sans avoir vu la maison.
              </p>
            </div>
            <aside className={styles.aside}>
              <div className={styles.asideBlock}>
                <span className={styles.asideLabel}>Pour aller plus loin</span>
                <ul className={styles.asideList}>
                  {[
                    ['/rendez-vous', 'Réserver une évaluation gratuite'],
                    ['/calculateur-subventions', 'Calculateur de subventions'],
                    ['/financement', 'Financement et subventions'],
                    ['/thermopompe-murale-montreal', 'Thermopompe murale à Montréal'],
                    ['/thermopompe-centrale-montreal', 'Thermopompe centrale à Montréal'],
                    ['/remplacement-fournaise-mazout', 'Conversion du mazout'],
                    ['/blogue/thermopompe-murale-ou-centrale', 'Murale ou centrale : laquelle choisir?'],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <Link href={href}>
                        {label}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.asideBlock}>
                <span className={styles.asideLabel}>Pourquoi Bellechasse</span>
                <ul className={styles.asideList}>
                  <li><span>Trois générations d’installateurs depuis 1962</span></li>
                  <li><span>Détaillant autorisé Daikin, garantie jusqu’à 12 ans</span></li>
                  <li><span>Licence RBQ 8103-2112-33, membre CMMTQ</span></li>
                  <li><span>Prix ferme, subventions vérifiées</span></li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <FAQBlock faq={FAQ} title="Questions fréquentes sur le prix d’une thermopompe" />

        <section className={styles.finalCta}>
          <div className={`container ${styles.finalRow}`}>
            <div>
              <h2>Un prix ferme pour votre maison.</h2>
              <p>Évaluation gratuite à domicile, subventions vérifiées, financement offert.</p>
            </div>
            <div className={styles.finalActions}>
              <Link href="/rendez-vous" className={styles.button}>
                Prendre rendez-vous
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>
              </Link>
              <a href={`tel:${PHONE_TEL}`} className={styles.finalPhone}>{PHONE_DISPLAY}</a>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooterFull />
    </>
  );
}
