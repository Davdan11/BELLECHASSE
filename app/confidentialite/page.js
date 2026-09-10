import Link from 'next/link';
import EditorialNavbar from '../../components/EditorialNavbar';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import { SITE_URL } from '../../lib/site';
import styles from './confidentialite.module.css';

export const metadata = {
  title: 'Politique de confidentialité',
  description: "Comment Bellechasse Énergie recueille, utilise et protège vos renseignements personnels, conformément à la Loi 25 du Québec.",
  alternates: { canonical: `${SITE_URL}/confidentialite` },
  robots: { index: true, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <>
      <EditorialNavbar theme="light" />
      <main id="contenu" className={styles.page}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link><span>/</span><span className={styles.current}>Politique de confidentialité</span>
          </nav>
          <span className={styles.eyebrow}>VOS RENSEIGNEMENTS</span>
          <h1 className={styles.title}>Politique de confidentialité</h1>
          <p className={styles.updated}>Dernière mise à jour : septembre 2026</p>

          <div className={styles.prose}>
            <h2>1. Qui nous sommes</h2>
            <p>
              Bellechasse Énergie (« nous ») exploite le site bellechasseenergie.com. Nous sommes responsables de la protection
              des renseignements personnels que vous nous confiez, conformément à la Loi sur la protection des renseignements
              personnels dans le secteur privé du Québec (Loi 25).
            </p>

            <h2>2. Renseignements que nous recueillons</h2>
            <p>Lorsque vous remplissez un formulaire sur notre site ou nous appelez, nous pouvons recueillir :</p>
            <ul>
              <li>votre nom, votre numéro de téléphone, votre adresse courriel et votre ville;</li>
              <li>la nature de votre demande (installation, entretien, question) et les détails de votre projet;</li>
              <li>la page depuis laquelle la demande a été envoyée.</li>
            </ul>
            <p>
              Nous recueillons aussi des données de navigation anonymisées (pages visitées, appareil, source de visite) au moyen
              d&apos;outils d&apos;analyse, afin d&apos;améliorer le site.
            </p>

            <h2>3. Pourquoi nous les utilisons</h2>
            <ul>
              <li>Pour vous rappeler, planifier une évaluation et préparer une soumission.</li>
              <li>Pour assurer le suivi de votre dossier, de l&apos;installation à l&apos;entretien.</li>
              <li>Pour préparer, avec votre accord, les documents de demande de subvention.</li>
              <li>Pour mesurer et améliorer la performance de notre site et de nos campagnes publicitaires.</li>
            </ul>
            <p>Nous ne vendons jamais vos renseignements personnels.</p>

            <h2>4. Partage</h2>
            <p>
              Vos renseignements peuvent être partagés uniquement avec les fournisseurs nécessaires à notre service : hébergement du
              site, envoi de courriels, outils d&apos;analyse, partenaires de financement si vous en faites la demande, et fabricants
              pour l&apos;enregistrement de la garantie. Ces fournisseurs sont tenus de protéger vos données.
            </p>

            <h2>5. Conservation et sécurité</h2>
            <p>
              Nous conservons vos renseignements le temps nécessaire aux fins décrites ci-dessus et selon nos obligations légales.
              Ils sont protégés par des mesures raisonnables contre l&apos;accès non autorisé.
            </p>

            <h2 id="temoins">6. Témoins (cookies)</h2>
            <p>
              Notre site utilise des témoins essentiels à son fonctionnement (par exemple pour mémoriser votre choix de
              consentement) et, uniquement avec votre accord, des témoins de mesure d&apos;audience et de campagnes
              (Google Analytics, Google Ads). Aucun témoin non essentiel n&apos;est déposé avant votre choix dans la
              bannière affichée à votre première visite. Vous pouvez modifier ce choix à tout moment via le lien
              « Gérer les témoins » au bas de chaque page, ou dans les paramètres de votre navigateur, sans nuire au
              fonctionnement du site.
            </p>

            <h2>7. Vos droits</h2>
            <p>
              Vous pouvez demander l&apos;accès à vos renseignements, leur rectification ou leur suppression, et retirer votre
              consentement à tout moment. Écrivez-nous à{' '}
              <a href="mailto:info@bellechasseenergie.ca">info@bellechasseenergie.ca</a> ou appelez au{' '}
              <a href="tel:+15144940400">(514) 494-0400</a>.
            </p>

            <h2>8. Responsable de la protection des renseignements personnels</h2>
            <p>
              La personne responsable de la protection des renseignements personnels chez Bellechasse Énergie peut être jointe à{' '}
              <a href="mailto:info@bellechasseenergie.ca">info@bellechasseenergie.ca</a>.
            </p>
          </div>
        </div>
      </main>
      <EditorialFooterFull />
    </>
  );
}
