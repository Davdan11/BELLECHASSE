import Link from 'next/link';
import EditorialNavbar from '../../components/EditorialNavbar';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import FAQBlock from '../../components/FAQBlock';
import SubsidyCalculator from '../../components/SubsidyCalculator';
import { SITE_URL, PHONE_DISPLAY, PHONE_TEL, breadcrumbSchema, faqSchema, graph, ORGANIZATION_ID } from '../../lib/site';
import styles from '../guide.module.css';

const URL = `${SITE_URL}/calculateur-subventions`;
const TITLE = 'Calculateur de subventions thermopompe';
const DESCRIPTION = 'Estimez en 30 secondes les subventions LogisVert et Rénoclimat pour votre thermopompe murale ou centrale au Québec, selon votre chauffage actuel.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: `${TITLE} | Bellechasse Énergie`,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: `${SITE_URL}/section-9.webp`, alt: 'Calcul des subventions pour thermopompe' }],
  },
};

const FAQ = [
  { q: 'Le montant affiché par le calculateur est-il garanti?', a: "Non. Il s'agit d'une estimation indicative fondée sur des fourchettes générales. Le montant réel dépend de la capacité de chauffage de l'appareil choisi, de son inscription sur les listes de modèles admissibles, du système remplacé et des budgets disponibles au moment de la demande. Nous confirmons l'admissibilité à la soumission." },
  { q: 'Puis-je cumuler LogisVert et Rénoclimat?', a: "Dans certains cas, oui, notamment une aide provinciale et une aide d'Hydro-Québec, ou une aide et un tarif avantageux. Les règles de cumul varient d'un programme à l'autre et changent dans le temps; nous les vérifions pour votre projet avant que vous signiez." },
  { q: 'Que faut-il pour être admissible?', a: "Un appareil inscrit sur la liste des modèles admissibles du programme, une installation par un entrepreneur licencié RBQ, une facture détaillée avec le modèle et le numéro de série, et une demande déposée dans les délais. Pour Rénoclimat, une évaluation énergétique avant et après les travaux." },
  { q: 'Qui s’occupe de la demande?', a: "Nous préparons les documents techniques requis (facture détaillée, fiches, numéros de série, photos) et vous guidons pas à pas dans la demande en ligne. Vous n'avez pas à devenir un expert des formulaires." },
];

export default function CalculateurSubventionsPage() {
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
    },
    breadcrumbSchema([
      { name: 'Accueil', href: '/' },
      { name: 'Financement et subventions', href: '/financement' },
      { name: 'Calculateur de subventions', href: '/calculateur-subventions' },
    ]),
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
              <Link href="/">Accueil</Link><span>/</span>
              <Link href="/financement">Financement et subventions</Link><span>/</span>
              <span className={styles.current}>Calculateur</span>
            </nav>
            <div className={styles.heroRow}>
              <div>
                <span className={styles.eyebrow}>OUTIL GRATUIT</span>
                <h1 className={styles.title}>Calculateur de subventions pour thermopompe au Québec</h1>
              </div>
              <div>
                <p className={styles.lead}>
                  Quatre réponses suffisent pour obtenir un ordre de grandeur de l’aide LogisVert et Rénoclimat à laquelle
                  votre projet pourrait donner droit. Rien n’est envoyé, rien n’est enregistré : le calcul se fait dans votre
                  navigateur.
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

        <section className={styles.sectionAlt}>
          <div className="container">
            <SubsidyCalculator />
          </div>
        </section>

        <section className={styles.section}>
          <div className={`container ${styles.twoCol}`}>
            <div className={styles.prose}>
              <span className={styles.eyebrow}>COMMENT LIRE LE RÉSULTAT</span>
              <h2 className={styles.sectionTitle}>Une estimation, puis un chiffre ferme à la soumission</h2>
              <p>
                Les programmes calculent leur aide à partir de données que seul un conseiller peut confirmer sur place : la
                capacité de chauffage réellement requise, le modèle exact et son inscription sur les listes admissibles, l’état
                du système remplacé et du bâtiment. Le calculateur vous donne donc une fourchette; la soumission, un montant
                précis par programme.
              </p>
              <h3>Ce qui fait grimper l’aide</h3>
              <ul>
                <li>Remplacer une fournaise au mazout, au gaz ou au propane plutôt que des plinthes électriques.</li>
                <li>Choisir un appareil certifié climat froid de grande capacité, inscrit sur les listes des programmes.</li>
                <li>Faire évaluer la maison par Rénoclimat et combiner la thermopompe avec de l’isolation ou de l’étanchéité.</li>
              </ul>
              <h3>Ce qui peut la réduire ou l’annuler</h3>
              <ul>
                <li>Un installateur sans licence RBQ : la demande est refusée, et la garantie du fabricant peut l’être aussi.</li>
                <li>Un modèle qui n’est pas sur la liste, même s’il est excellent.</li>
                <li>Une demande déposée hors délai ou après l’épuisement du budget du programme.</li>
              </ul>
              <p>
                Pour comprendre chaque programme en détail, lisez notre article sur les{' '}
                <Link href="/blogue/subventions-thermopompe-quebec">subventions pour thermopompe au Québec</Link>, puis
                consultez le <Link href="/prix-thermopompe">guide des prix 2026</Link> pour situer le coût brut de votre projet.
              </p>
            </div>
            <aside className={styles.aside}>
              <div className={styles.asideBlock}>
                <span className={styles.asideLabel}>Prochaine étape</span>
                <ul className={styles.asideList}>
                  {[
                    ['/rendez-vous', 'Réserver une évaluation gratuite'],
                    ['/contact', 'Nous écrire'],
                    ['/financement', 'Financement et subventions'],
                    ['/prix-thermopompe', 'Prix d’une thermopompe en 2026'],
                    ['/remplacement-fournaise-mazout', 'Conversion du mazout'],
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
            </aside>
          </div>
        </section>

        <FAQBlock faq={FAQ} title="Questions fréquentes sur les subventions" />

        <section className={styles.finalCta}>
          <div className={`container ${styles.finalRow}`}>
            <div>
              <h2>Faites confirmer vos subventions.</h2>
              <p>Un conseiller vérifie votre admissibilité et indique chaque montant dans la soumission.</p>
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
