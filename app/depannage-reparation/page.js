import Link from 'next/link';
import EditorialNavbar from '../../components/EditorialNavbar';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import FAQBlock from '../../components/FAQBlock';
import ContactRequestForm from '../../components/ContactRequestForm';
import { SITE_URL, ALL_CITIES, PHONE_DISPLAY, PHONE_TEL, breadcrumbSchema, faqSchema, serviceSchema, graph, ORGANIZATION_ID } from '../../lib/site';
import styles from '../guide.module.css';

const URL = `${SITE_URL}/depannage-reparation`;
const TITLE = 'Réparation de thermopompe à Montréal';
const DESCRIPTION = "Thermopompe qui ne chauffe plus, climatiseur en panne, code d'erreur : vérifications à faire et intervention rapide de nos techniciens. (514) 494-0400.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: `${TITLE} | Bellechasse Énergie`,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: `${SITE_URL}/installation-hands.webp`, alt: 'Technicien réparant une thermopompe' }],
  },
};

const CHECKLIST = [
  { title: 'Le disjoncteur', text: "Vérifiez au panneau électrique que le disjoncteur de la thermopompe (souvent un double, 15 à 40 A) n'est pas déclenché. Réenclenchez-le une fois. S'il saute de nouveau, n'insistez pas : appelez." },
  { title: 'Le filtre', text: "Un filtre encrassé bloque le débit d'air : l'appareil souffle peu, gèle ou s'arrête. Nettoyez les filtres de l'unité murale ou remplacez le filtre de la fournaise, puis laissez l'appareil repartir." },
  { title: 'Le mode de la télécommande ou du thermostat', text: "Un appareil en mode « ventilation » ou « déshumidification » ne chauffe pas et ne refroidit pas. Vérifiez que le mode est bien « chauffage » ou « climatisation » et que la consigne est plus haute (ou plus basse) que la température de la pièce." },
  { title: 'Le dégivrage, normal en hiver', text: "Par temps froid et humide, l'unité extérieure se couvre de givre puis s'arrête quelques minutes pour se dégivrer; de la vapeur peut s'en échapper et l'unité intérieure souffle de l'air tiède ou s'arrête. C'est normal. Si la glace persiste des heures ou recouvre l'appareil, c'est un problème." },
  { title: "L'unité extérieure bloquée par la neige", text: "Dégagez la neige tout autour et sur le dessus de l'unité extérieure, avec un balai, jamais avec un outil qui pourrait plier les ailettes. Ne cassez pas la glace. Assurez-vous que rien ne bloque l'entrée et la sortie d'air." },
  { title: 'Le code d’erreur', text: "Notez le code affiché sur l'unité murale, le thermostat ou la télécommande (par exemple une lettre et un chiffre qui clignotent). Coupez l'alimentation au disjoncteur 5 minutes, puis rallumez. Si le code revient, transmettez-le-nous avec le modèle de l'appareil : cela accélère le diagnostic." },
];

const SYMPTOMS = [
  { title: 'La thermopompe ne chauffe plus', text: "Air tiède ou froid en mode chauffage, appareil qui tourne sans arrêt : filtre encrassé, unité extérieure bloquée, manque de réfrigérant, vanne d'inversion ou capteur défectueux. Par grand froid, une capacité réduite est normale; une absence de chaleur ne l'est pas." },
  { title: 'Le climatiseur ne refroidit pas', text: "Air à peine frais, compresseur qui ne démarre pas, unité intérieure qui gèle : filtre, serpentin sale, condensateur ou fuite de réfrigérant. Un appareil qui a perdu du réfrigérant a une fuite; rajouter du gaz sans la réparer ne règle rien." },
  { title: 'Bruit nouveau ou vibration', text: "Grincement, cliquetis, bourdonnement : ventilateur déséquilibré, roulement usé, support desserré, contacteur qui colle. Certains bruits annoncent une panne plus grave; mieux vaut faire vérifier tôt." },
  { title: 'Eau qui coule de l’unité murale', text: "Drain de condensat bouché, pente mal réglée ou serpentin gelé qui dégèle. Éteignez l'appareil et appelez : l'eau peut abîmer le mur et le plancher." },
  { title: 'Codes d’erreur et arrêts répétés', text: "La plupart des codes d'erreur pointent vers un composant précis : capteur, communication entre les unités, surchauffe, pression. Avec le code et le modèle, nous arrivons souvent avec la bonne pièce." },
  { title: 'Odeurs', text: "Odeur de moisi : serpentin ou drain encrassé, à nettoyer. Odeur de brûlé ou de plastique chaud : coupez l'alimentation et appelez, il peut s'agir d'un problème électrique." },
];

const FAQ = [
  { q: 'Offrez-vous un service d’urgence 24 h sur 24?', a: "Non. Notre service fonctionne du lundi au vendredi, de 8 h à 17 h. Nous rappelons rapidement pendant ces heures et priorisons les pannes de chauffage en hiver et les pannes de climatisation en canicule. Hors de ces heures, laissez un message avec le modèle, le symptôme et le code d'erreur : nous vous rappelons dès l'ouverture." },
  { q: 'Réparez-vous les thermopompes d’autres marques?', a: "Oui, la plupart des marques courantes installées au Québec, que nous les ayons installées ou non. Indiquez-nous la marque, le modèle et le symptôme lors de votre appel; nous vous dirons franchement si nous pouvons intervenir." },
  { q: 'Combien coûte un appel de service?', a: "Les frais de déplacement et de diagnostic, s'il y a lieu, vous sont précisés au moment de la prise de rendez-vous, avant la visite. Les pièces et la main-d'œuvre s'ajoutent après votre accord sur le diagnostic. Aucune réparation n'est faite sans votre autorisation." },
  { q: 'Ma thermopompe est sous garantie : que faire?', a: "Si nous l'avons installée, nous gérons la réclamation avec le fabricant. Sinon, ayez en main la facture d'installation et le numéro de série; la garantie sur les pièces s'applique généralement, la main-d'œuvre selon les conditions du fabricant et de l'installateur." },
  { q: 'Réparer ou remplacer?', a: "Un appareil de moins de 10 ans, bien entretenu, se répare presque toujours. Passé 12 à 15 ans, avec un compresseur défectueux ou une fuite importante, le remplacement par un modèle climat froid subventionné est souvent plus économique. Nous vous donnons un avis honnête, chiffres à l'appui." },
];

export default function DepannageReparationPage() {
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
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.answer'] },
    },
    serviceSchema({
      name: 'Réparation et dépannage de thermopompe et climatisation',
      serviceType: 'Réparation de thermopompe',
      description: DESCRIPTION,
      url: URL,
      areaNames: ALL_CITIES,
    }),
    breadcrumbSchema([{ name: 'Accueil', href: '/' }, { name: 'Réparation et dépannage', href: '/depannage-reparation' }]),
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
              <Link href="/">Accueil</Link><span>/</span><span className={styles.current}>Réparation et dépannage</span>
            </nav>
            <div className={styles.heroRow}>
              <div>
                <span className={styles.eyebrow}>SERVICE ET RÉPARATION</span>
                <h1 className={styles.title}>Réparation et dépannage de thermopompe et climatisation à Montréal</h1>
              </div>
              <div>
                <p className={styles.lead}>
                  Votre thermopompe ne chauffe plus, votre climatiseur ne refroidit pas, un code d’erreur clignote? Nos
                  frigoristes certifiés interviennent à Montréal, Laval, sur la Rive-Nord et la Rive-Sud. Avant d’appeler,
                  cinq vérifications règlent une panne sur trois.
                </p>
                <div className={styles.heroActions}>
                  <a href={`tel:${PHONE_TEL}`} className={styles.phone}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
                    {PHONE_DISPLAY}
                  </a>
                  <span className={styles.hours}>Lundi au vendredi, 8 h à 17 h · rappel rapide</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={`${styles.prose} answer`}>
              <p>
                <strong>En bref :</strong> avant d’appeler pour une réparation de thermopompe, vérifiez le disjoncteur, le filtre,
                le mode de la télécommande, l’unité extérieure (neige, glace, dégagement) et notez le code d’erreur. Si le problème
                persiste, appelez-nous au {PHONE_DISPLAY} du lundi au vendredi, 8 h à 17 h, avec la marque, le modèle et le symptôme :
                nous rappelons rapidement et arrivons souvent avec la bonne pièce.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.sectionDark}>
          <div className="container">
            <span className={styles.eyebrow}>AVANT D’APPELER</span>
            <h2 className={styles.sectionTitle}>Six vérifications qui évitent souvent un appel de service</h2>
            <ol className={styles.checklist}>
              {CHECKLIST.map((c) => (
                <li key={c.title}>
                  <strong>{c.title}</strong>
                  <p>{c.text}</p>
                </li>
              ))}
            </ol>
            <p className={styles.note} style={{ marginTop: '1.5rem' }}>
              N’ouvrez jamais le boîtier de l’unité extérieure ni le panneau électrique de l’appareil : les condensateurs
              restent chargés même hors tension et le réfrigérant est sous pression. Ces interventions sont réservées à un
              frigoriste certifié.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`container ${styles.twoCol}`}>
            <div>
              <span className={styles.eyebrow}>LES PANNES LES PLUS FRÉQUENTES</span>
              <h2 className={styles.sectionTitle}>Ce que le symptôme nous dit, et ce que nous faisons</h2>
              <div className={styles.cards2}>
                {SYMPTOMS.map((s, i) => (
                  <article key={s.title} className={styles.card}>
                    <span className={styles.num}>0{i + 1}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </article>
                ))}
              </div>
            </div>
            <aside className={styles.aside}>
              <div className={styles.formCol}>
                <ContactRequestForm compact source="depannage-reparation" />
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={`container ${styles.twoCol}`}>
            <div className={styles.prose}>
              <span className={styles.eyebrow}>NOTRE INTERVENTION</span>
              <h2 className={styles.sectionTitle}>Ce que fait le technicien lors d’un appel de service</h2>
              <ol>
                <li><strong>Diagnostic complet.</strong> Lecture des codes, mesure des pressions et des températures, vérification électrique (condensateur, contacteur, connexions), inspection des serpentins, du ventilateur et du drain.</li>
                <li><strong>Explication et prix avant de réparer.</strong> Vous savez ce qui est brisé, ce que coûte la réparation et si elle vaut la peine par rapport à l’âge de l’appareil. Rien n’est fait sans votre accord.</li>
                <li><strong>Réparation.</strong> Remplacement de la pièce, réparation de fuite et recharge de réfrigérant selon les spécifications du fabricant, nettoyage, tests de fonctionnement en chauffage et en climatisation.</li>
                <li><strong>Prévention.</strong> Conseils d’entretien et, si l’appareil n’a pas été vu depuis plus d’un an, proposition d’un entretien annuel pour éviter la prochaine panne.</li>
              </ol>
              <h3>Nos heures et notre territoire</h3>
              <p>
                Le service fonctionne du lundi au vendredi, de 8 h à 17 h. Nous ne publions pas de service d’urgence 24 h sur 24,
                mais nous rappelons rapidement pendant nos heures d’ouverture et donnons priorité aux pannes de chauffage
                l’hiver et de climatisation en canicule. Nous couvrons Montréal et ses arrondissements, Laval, la Rive-Nord et
                la Rive-Sud, sans frais de déplacement supplémentaires pour les rives.
              </p>
              <p>
                Pour éviter les pannes, consultez notre page sur l’<Link href="/entretien-reparation-thermopompe">entretien annuel de thermopompe</Link>{' '}
                et nos conseils pour <Link href="/blogue/comment-entretenir-votre-thermopompe">entretenir votre thermopompe</Link>. Si votre
                appareil approche de sa fin de vie, notre <Link href="/prix-thermopompe">guide des prix 2026</Link> vous aidera à comparer.
              </p>
            </div>
            <aside className={styles.aside}>
              <div className={styles.asideBlock}>
                <span className={styles.asideLabel}>Appelez avec ces informations</span>
                <ul className={styles.asideList}>
                  <li><span>Marque et modèle (étiquette sur l’unité intérieure)</span></li>
                  <li><span>Symptôme et depuis quand</span></li>
                  <li><span>Code d’erreur affiché, s’il y a lieu</span></li>
                  <li><span>Année d’installation et installateur</span></li>
                  <li><span>Votre ville ou arrondissement</span></li>
                </ul>
              </div>
              <div className={styles.asideBlock}>
                <span className={styles.asideLabel}>Pages liées</span>
                <ul className={styles.asideList}>
                  {[
                    ['/entretien-reparation-thermopompe', 'Entretien et réparation'],
                    ['/rendez-vous', 'Prendre rendez-vous'],
                    ['/thermopompe-montreal', 'Thermopompe Montréal'],
                    ['/thermopompe-laval', 'Thermopompe Laval'],
                    ['/thermopompe-rive-nord', 'Thermopompe Rive-Nord'],
                    ['/thermopompe-rive-sud', 'Thermopompe Rive-Sud'],
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

        <FAQBlock faq={FAQ} title="Questions fréquentes sur la réparation" />

        <section className={styles.finalCta}>
          <div className={`container ${styles.finalRow}`}>
            <div>
              <h2>Une panne? Appelez-nous.</h2>
              <p>Frigoristes certifiés, diagnostic honnête, du lundi au vendredi de 8 h à 17 h.</p>
            </div>
            <div className={styles.finalActions}>
              <a href={`tel:${PHONE_TEL}`} className={styles.button}>
                Appeler le {PHONE_DISPLAY}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19L19 5M19 5v14M19 5H5" /></svg>
              </a>
              <Link href="/contact" className={styles.finalPhone} style={{ fontSize: '1rem', textDecoration: 'underline', textUnderlineOffset: 3 }}>Demander un rappel</Link>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooterFull />
    </>
  );
}
