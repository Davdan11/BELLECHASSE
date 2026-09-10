import Link from 'next/link';
import EditorialNavbar from '../../components/EditorialNavbar';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import { SITE_URL, SITE_NAME, FOUNDED, PHONE_DISPLAY, PHONE_TEL, EMAIL, breadcrumbSchema, graph, ORGANIZATION_ID } from '../../lib/site';
import styles from '../guide.module.css';

const URL = `${SITE_URL}/carrieres`;
const TITLE = 'Carrières : installateur CVAC, technicien';
const DESCRIPTION = 'Bellechasse Énergie recrute installateurs CVAC, frigoristes, techniciens et conseillers dans le Grand Montréal. Entreprise familiale depuis 1962. Postulez.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: `${SITE_URL}/installation.jpg`, alt: 'Installation de thermopompe par un technicien' }],
  },
};

const ROLES = [
  { title: 'Installateur ou installatrice en CVAC', text: "Installation de thermopompes murales, multizones et centrales, de climatiseurs, de fournaises électriques et d'échangeurs d'air. Supports, conduites de réfrigérant, drains, goulottes, mise en marche. Expérience résidentielle et souci du travail propre." },
  { title: 'Frigoriste', text: "Mise sous vide, charge de réfrigérant selon les spécifications, détection de fuites, diagnostics et réparations sur les marques courantes. Carte de compétence et certification pour la manipulation des halocarbures requises." },
  { title: 'Technicien ou technicienne de service', text: "Entretiens annuels, appels de service, lecture des codes d'erreur, remplacement de composants, réclamations de garantie. Bonne communication avec les clients : vous expliquez ce que vous avez trouvé et ce que vous proposez." },
  { title: 'Conseiller ou conseillère technique', text: "Visites d'évaluation à domicile, calcul de charge, choix de l'équipement et de l'emplacement, préparation des soumissions et des dossiers de subvention. Sens du service et rigueur plutôt que vente sous pression." },
];

const OFFER = [
  { title: 'Une entreprise familiale', text: "Fondée en 1962, dirigée aujourd'hui par la troisième génération. Une petite équipe où l'on se connaît, où les décisions se prennent vite et où le travail bien fait est remarqué." },
  { title: 'Un territoire proche', text: "Grand Montréal, Laval, Rive-Nord et Rive-Sud. Des chantiers résidentiels, une journée ou deux par installation, et le retour à la maison le soir." },
  { title: 'Des équipements reconnus', text: "Détaillant autorisé Daikin, avec Moovair, Mainline, Tosot, Steffes et Aldes. Des produits que vous êtes fiers d'installer et qui vous donnent accès à la formation des fabricants." },
  { title: 'La formation continue', text: "Formation technique sur les nouveaux modèles climat froid, les réfrigérants et les outils de diagnostic. On progresse avec l'entreprise." },
];

export default function CarrieresPage() {
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
    },
    breadcrumbSchema([{ name: 'Accueil', href: '/' }, { name: 'Carrières', href: '/carrieres' }])
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <EditorialNavbar theme="light" />
      <main id="contenu">
        <section className={styles.hero}>
          <div className="container">
            <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
              <Link href="/">Accueil</Link><span>/</span><span className={styles.current}>Carrières</span>
            </nav>
            <div className={styles.heroRow}>
              <div>
                <span className={styles.eyebrow}>CARRIÈRES</span>
                <h1 className={styles.title}>Carrières chez Bellechasse Énergie : installateur CVAC, frigoriste, technicien, conseiller</h1>
              </div>
              <div>
                <p className={styles.lead}>
                  Nous installons et entretenons des thermopompes dans le Grand Montréal depuis {FOUNDED}. Nous cherchons des
                  gens de métier qui aiment le travail propre, les clients satisfaits et une équipe à taille humaine.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <span className={styles.eyebrow}>LES POSTES QUE NOUS POURVOYONS</span>
            <h2 className={styles.sectionTitle}>Quatre métiers, un même chantier : le confort des maisons du Grand Montréal</h2>
            <div className={styles.cards2}>
              {ROLES.map((r, i) => (
                <article key={r.title} className={styles.card}>
                  <span className={styles.num}>0{i + 1}</span>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </article>
              ))}
            </div>
            <p className={styles.note} style={{ marginTop: '1.5rem' }}>
              Les besoins varient selon la saison. Même si aucun poste précis n’est affiché, une candidature spontanée est
              toujours lue et conservée pour les prochaines embauches.
            </p>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className="container">
            <span className={styles.eyebrow}>CE QUE NOUS OFFRONS</span>
            <h2 className={styles.sectionTitle}>Une entreprise où l’on reste</h2>
            <div className={styles.cards2}>
              {OFFER.map((o, i) => (
                <article key={o.title} className={styles.card}>
                  <span className={styles.num}>0{i + 1}</span>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.sectionDark}>
          <div className={`container ${styles.twoCol}`}>
            <div className={styles.prose}>
              <span className={styles.eyebrow}>POSTULER</span>
              <h2 className={styles.sectionTitle}>Candidature spontanée</h2>
              <p>
                Envoyez-nous un court message qui présente votre parcours, vos cartes de compétence et vos certifications,
                le poste qui vous intéresse et vos disponibilités. Un curriculum vitae est bienvenu mais pas obligatoire :
                quelques lignes honnêtes suffisent pour un premier contact.
              </p>
              <ul>
                {EMAIL && <li>Par courriel, à <a href={`mailto:${EMAIL}?subject=Candidature`}>{EMAIL}</a>, avec « Candidature » en objet.</li>}
                <li>Par téléphone, au {PHONE_DISPLAY}, du lundi au vendredi de 8 h à 17 h.</li>
                <li>Par notre <Link href="/contact">page contact</Link>, en choisissant « Une question » et en précisant « Candidature » dans votre message.</li>
              </ul>
              <p>
                Nous répondons à chaque candidature reçue. Les entrevues se déroulent en personne ou par visioconférence et, pour les
                postes de terrain, souvent directement sur un chantier.
              </p>
              <div className={styles.ctaRow}>
                <a href={`tel:${PHONE_TEL}`} className={styles.button}>
                  Appeler le {PHONE_DISPLAY}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>
                </a>
                <Link href="/contact" className={styles.buttonGhost}>Écrire via la page contact</Link>
              </div>
            </div>
            <aside>
              <div className={styles.prose}>
                <h3 style={{ color: 'white' }}>Ce que nous regardons</h3>
                <ul>
                  <li>Le soin du détail : une goulotte droite, un drain incliné, un chantier propre.</li>
                  <li>La franchise avec les clients, y compris quand la nouvelle n’est pas bonne.</li>
                  <li>L’envie d’apprendre les nouveaux appareils climat froid.</li>
                  <li>Un permis de conduire valide et la ponctualité.</li>
                </ul>
                <p>
                  Pour mieux nous connaître, lisez la page <Link href="/equipe">Notre équipe</Link> et{' '}
                  <Link href="/notre-expertise">Notre expertise</Link>.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <EditorialFooterFull />
    </>
  );
}
