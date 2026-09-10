import Link from 'next/link';
import EditorialNavbar from '../../components/EditorialNavbar';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import { SITE_URL, SITE_NAME, FOUNDED, RBQ, PHONE_DISPLAY, PHONE_TEL, breadcrumbSchema, graph, ORGANIZATION_ID } from '../../lib/site';
import styles from '../guide.module.css';

const URL = `${SITE_URL}/equipe`;
const TITLE = 'Notre équipe : trois générations';
const DESCRIPTION = 'Jacques, Daniel, Nicolas : une entreprise familiale depuis 1962. Conseillers, installateurs certifiés et service après-vente à Montréal et sur les rives.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: `${SITE_URL}/section-2.webp`, alt: "L'équipe Bellechasse Énergie au comptoir" }],
  },
};

const GENERATIONS = [
  { year: '1962', name: 'Jacques', text: "Jacques fonde Bellechasse à Montréal. À l'époque, l'entreprise livre du mazout et entretient les fournaises. Le métier s'apprend sur le terrain, un client à la fois, et la réputation se construit à force de rappels honorés et de travail propre." },
  { year: 'Deuxième génération', name: 'Daniel', text: "Daniel poursuit l'aventure. L'entreprise suit l'évolution du chauffage résidentiel québécois : de la fournaise au mazout vers l'électricité, puis vers les premières thermopompes et la climatisation centrale. La proximité avec les clients reste la règle." },
  { year: 'Aujourd’hui', name: 'Nicolas', text: "Nicolas prend le relais. Thermopompes climat froid, conversions du mazout, échangeurs d'air, détaillant autorisé Daikin : les produits ont changé, pas l'exigence. Chaque installation est faite par nos propres techniciens, et l'on répond au téléphone." },
];

const ROLES = [
  { title: 'Conseillers techniques', text: "Ils se déplacent chez vous pour l'évaluation gratuite : mesure de la maison, calcul de charge, vérification de l'électricité et de l'emplacement des unités. Ils préparent la soumission, indiquent les subventions applicables et restent votre interlocuteur jusqu'à la fin des travaux." },
  { title: 'Installateurs et frigoristes certifiés', text: "Ce sont nos employés, pas des sous-traitants. Ils installent supports, conduites, drains et unités, font la mise sous vide et la charge de réfrigérant selon les spécifications du fabricant, coordonnent l'électricien licencié et vous expliquent le fonctionnement avant de partir." },
  { title: 'Service après-vente', text: "Entretien annuel, diagnostics, réparations et réclamations de garantie auprès du fabricant. L'équipe qui a installé votre appareil est celle qui l'entretient, sur les modèles que nous vendons comme sur la plupart des marques courantes." },
  { title: 'Bureau et coordination', text: "Prise d'appels du lundi au vendredi, planification des visites et des installations, préparation des documents pour les subventions et suivi des dossiers. Une petite équipe qui vous connaît par votre nom." },
];

export default function EquipePage() {
  const schema = graph(
    {
      '@type': 'AboutPage',
      '@id': `${URL}#page`,
      url: URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'fr-CA',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': ORGANIZATION_ID },
      mainEntity: { '@id': ORGANIZATION_ID },
    },
    breadcrumbSchema([
      { name: 'Accueil', href: '/' },
      { name: 'Notre expertise', href: '/notre-expertise' },
      { name: 'Notre équipe', href: '/equipe' },
    ])
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
              <Link href="/notre-expertise">Notre expertise</Link><span>/</span>
              <span className={styles.current}>Notre équipe</span>
            </nav>
            <div className={styles.heroRow}>
              <div>
                <span className={styles.eyebrow}>NOTRE ÉQUIPE</span>
                <h1 className={styles.title}>Notre équipe : trois générations au service de votre confort</h1>
              </div>
              <div>
                <p className={styles.lead}>
                  Bellechasse Énergie est une entreprise familiale montréalaise fondée en {FOUNDED}. Trois générations, un seul
                  territoire, le Grand Montréal, et une conviction : une thermopompe vaut ce que vaut son installation.
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
            <span className={styles.eyebrow}>UNE HISTOIRE DE FAMILLE</span>
            <h2 className={styles.sectionTitle}>Jacques, Daniel, Nicolas : la même exigence depuis 1962</h2>
            <div className={styles.cards}>
              {GENERATIONS.map((g, i) => (
                <article key={g.name} className={styles.card}>
                  <span className={styles.num}>0{i + 1} · {g.year}</span>
                  <h3>{g.name}</h3>
                  <p>{g.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={`container ${styles.twoCol}`}>
            <div>
              <span className={styles.eyebrow}>QUI FAIT QUOI</span>
              <h2 className={styles.sectionTitle}>Les gens que vous rencontrerez</h2>
              <div className={styles.cards2}>
                {ROLES.map((r, i) => (
                  <article key={r.title} className={styles.card}>
                    <span className={styles.num}>0{i + 1}</span>
                    <h3>{r.title}</h3>
                    <p>{r.text}</p>
                  </article>
                ))}
              </div>
            </div>
            <aside className={styles.aside}>
              <div className={styles.asideBlock}>
                <span className={styles.asideLabel}>Nos accréditations</span>
                <ul className={styles.asideList}>
                  <li><span>Licence RBQ {RBQ}</span></li>
                  <li><span>Membre de la CMMTQ (Corporation des maîtres mécaniciens en tuyauterie du Québec)</span></li>
                  <li><span>Détaillant autorisé Daikin : garantie complète du fabricant</span></li>
                  <li><span>Raccordements électriques par un électricien licencié</span></li>
                </ul>
              </div>
              <div className={styles.asideBlock}>
                <span className={styles.asideLabel}>Notre engagement</span>
                <ul className={styles.asideList}>
                  <li><span>Pour chaque appareil Daikin vendu, 5 $ remis à la Fondation Charles-Bruneau</span></li>
                  <li><span>Aucune sous-traitance pour l’installation</span></li>
                  <li><span>Soumission gratuite, prix ferme</span></li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`container ${styles.twoCol}`}>
            <div className={styles.prose}>
              <span className={styles.eyebrow}>NOTRE FAÇON DE FAIRE</span>
              <h2 className={styles.sectionTitle}>Ce qui n’a pas changé en soixante ans</h2>
              <p>
                Nous avons commencé en livrant du mazout. Nous convertissons aujourd’hui les dernières fournaises au mazout du
                Grand Montréal vers des thermopompes climat froid. Entre les deux, le chauffage résidentiel québécois a été
                réinventé plusieurs fois. Ce qui n’a pas bougé, c’est la manière : une visite chez vous avant tout chiffre, un
                calcul plutôt qu’une estimation au jugé, une installation faite par nos gens, un téléphone auquel on répond.
              </p>
              <p>
                Nous sommes détaillant autorisé Daikin, ce qui nous permet d’offrir la garantie complète du fabricant, jusqu’à
                12 ans sur les pièces avec enregistrement. Nous installons aussi Moovair, Mainline, Tosot, Steffes et les
                échangeurs d’air Aldes, selon ce qui convient à votre maison. Vous en saurez plus sur notre méthode sur la page{' '}
                <Link href="/notre-expertise">Notre expertise</Link>.
              </p>
              <p>
                L’équipe grandit avec l’entreprise. Si vous êtes installateur en CVAC, frigoriste, technicien de service ou
                conseiller technique, consultez notre page <Link href="/carrieres">Carrières</Link>.
              </p>
            </div>
            <aside className={styles.aside}>
              <div className={styles.asideBlock}>
                <span className={styles.asideLabel}>Nous rencontrer</span>
                <ul className={styles.asideList}>
                  {[
                    ['/rendez-vous', 'Réserver une évaluation gratuite'],
                    ['/contact', 'Nous écrire'],
                    ['/notre-expertise', 'Notre expertise'],
                    ['/carrieres', 'Carrières'],
                    ['/blogue', 'Le journal Bellechasse'],
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

        <section className={styles.finalCta}>
          <div className={`container ${styles.finalRow}`}>
            <div>
              <h2>Parlons de votre maison.</h2>
              <p>Un conseiller se déplace gratuitement, à Montréal, Laval, sur la Rive-Nord et la Rive-Sud.</p>
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
