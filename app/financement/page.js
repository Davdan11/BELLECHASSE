import Link from 'next/link';
import EditorialNavbar from '../../components/EditorialNavbar';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import FAQBlock from '../../components/FAQBlock';
import BlogCTA from '../../components/BlogCTA';
import { SITE_URL, breadcrumbSchema, faqSchema, graph, ORGANIZATION_ID } from '../../lib/site';
import styles from './financement.module.css';

const FAQ = [
  { q: 'Quelles subventions sont disponibles pour une thermopompe au Québec?', a: "Principalement LogisVert d'Hydro-Québec pour les thermopompes efficaces, avec des montants majorés lors du remplacement d'un système au mazout ou au gaz, et Rénoclimat du gouvernement du Québec, qui commence par une évaluation énergétique de la maison. Les montants et conditions changent régulièrement ; nous les vérifions pour chaque soumission." },
  { q: 'Puis-je financer ma thermopompe avec des paiements mensuels?', a: "Oui. Nous offrons des options de financement par l'entremise de partenaires financiers, avec des paiements mensuels adaptés à votre budget. Les détails vous sont présentés avec la soumission." },
  { q: 'Les subventions sont-elles déduites de la facture?', a: "Selon le programme, l'aide est versée après l'installation sur présentation des documents, ou appliquée directement. Nous vous précisons le fonctionnement pour chaque programme." },
  { q: 'Qui remplit les formulaires?', a: "Nous préparons les documents techniques requis (facture détaillée, fiches, numéros de série) et vous guidons pas à pas dans la demande." },
];

export const metadata = {
  title: 'Financement et subventions pour thermopompe et climatisation',
  description:
    "Subventions LogisVert et Rénoclimat, tarif bi-énergie, financement mensuel : réduisez le coût de votre thermopompe, climatisation ou chauffage. Nous vérifions votre admissibilité. Grand Montréal, Laval, Rives.",
  alternates: { canonical: `${SITE_URL}/financement` },
  openGraph: {
    title: 'Financement et subventions | Bellechasse Énergie',
    description: 'Subventions, tarifs avantageux et financement mensuel pour concrétiser votre projet de confort.',
    url: `${SITE_URL}/financement`,
  },
};

export default function FinancementPage() {
  const schema = graph(
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/financement#page`,
      url: `${SITE_URL}/financement`,
      name: metadata.title,
      description: metadata.description,
      inLanguage: 'fr-CA',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': ORGANIZATION_ID },
    },
    breadcrumbSchema([{ name: 'Accueil', href: '/' }, { name: 'Financement et subventions', href: '/financement' }]),
    faqSchema(FAQ)
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <EditorialNavbar theme="light" />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
              <Link href="/">Accueil</Link><span>/</span><span className={styles.current}>Financement et subventions</span>
            </nav>
            <div className={styles.heroRow}>
              <div>
                <span className={styles.eyebrow}>FINANCEMENT ET SUBVENTIONS</span>
                <h1 className={styles.title}>Votre confort.<br />À votre rythme.</h1>
              </div>
              <p className={styles.lead}>
                Une thermopompe est un investissement, mais vous n&apos;avez pas à en porter tout le coût. Entre les programmes
                d&apos;aide, les tarifs avantageux et le financement mensuel, le coût net est souvent bien plus bas que le prix affiché.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.grid}>
          <div className={`container ${styles.cards}`}>
            <article className={styles.card}>
              <span className={styles.num}>01</span>
              <h2>LogisVert d&apos;Hydro-Québec</h2>
              <p>
                Le programme d&apos;efficacité énergétique résidentielle d&apos;Hydro-Québec offre une aide financière pour
                l&apos;installation de thermopompes efficaces, avec des montants plus élevés pour les modèles climat froid
                et pour les conversions d&apos;un système au mazout, au gaz ou au propane.
              </p>
              <ul>
                <li>Appareil inscrit sur la liste des modèles admissibles</li>
                <li>Installation par un entrepreneur licencié RBQ</li>
                <li>Demande en ligne avec la facture et les fiches techniques</li>
              </ul>
            </article>
            <article className={styles.card}>
              <span className={styles.num}>02</span>
              <h2>Rénoclimat</h2>
              <p>
                Le programme du gouvernement du Québec pour les rénovations écoénergétiques. Une évaluation de votre maison
                par un conseiller accrédité, avant et après les travaux, donne accès à une aide pour le remplacement du
                système de chauffage, l&apos;isolation et l&apos;étanchéité.
              </p>
              <ul>
                <li>Portrait complet de la maison</li>
                <li>Cumulable avec d&apos;autres mesures</li>
                <li>Nous vous aidons à préparer la visite</li>
              </ul>
            </article>
            <article className={styles.card}>
              <span className={styles.num}>03</span>
              <h2>Tarif bi-énergie</h2>
              <p>
                Si vous conservez une source d&apos;appoint, le tarif bi-énergie d&apos;Hydro-Québec réduit votre coût
                d&apos;électricité la majeure partie de l&apos;année. Le système bascule automatiquement vers l&apos;appoint
                pendant les grands froids. Une aide qui se renouvelle chaque hiver.
              </p>
            </article>
            <article className={styles.card}>
              <span className={styles.num}>04</span>
              <h2>Financement mensuel</h2>
              <p>
                Des paiements mensuels adaptés à votre budget par l&apos;entremise de nos partenaires financiers.
                Réponse rapide, aucune surprise, et souvent une mensualité inférieure à ce que vous économisez sur le chauffage.
              </p>
              <ul>
                <li>Demande simple avec la soumission</li>
                <li>Plusieurs durées offertes</li>
                <li>Sujet à l&apos;approbation de crédit</li>
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.steps}>
          <div className="container">
            <span className={styles.eyebrow}>COMMENT ÇA MARCHE</span>
            <h2 className={styles.stepsTitle}>Nous nous occupons des formulaires.</h2>
            <ol className={styles.stepList}>
              <li><strong>Évaluation gratuite.</strong> Un conseiller visite votre maison et calcule vos besoins.</li>
              <li><strong>Soumission avec subventions.</strong> Chaque programme admissible est indiqué avec le montant estimé.</li>
              <li><strong>Installation par nos frigoristes.</strong> Facture détaillée, fiches techniques et numéros de série fournis.</li>
              <li><strong>Demande guidée.</strong> Nous vous accompagnons pour la demande jusqu&apos;au versement.</li>
            </ol>
            <p className={styles.note}>
              Les programmes, montants et conditions changent régulièrement. Les informations sur cette page servent de repères ;
              votre admissibilité exacte est confirmée lors de la soumission. Pour en savoir plus, lisez notre article sur les{' '}
              <Link href="/blogue/subventions-thermopompe-quebec">subventions pour thermopompe au Québec</Link>.
            </p>
          </div>
        </section>

        <FAQBlock faq={FAQ} title="Questions fréquentes sur le financement" />
        <BlogCTA eyebrow="PASSER À L'ACTION" />
      </main>
      <EditorialFooterFull />
    </>
  );
}
