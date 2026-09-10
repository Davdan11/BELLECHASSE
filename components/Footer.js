import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>Bellechasse Énergie</h4>
            <p>
              Votre partenaire de confiance pour un confort résidentiel optimal depuis plus de 60 ans.
            </p>
          </div>
          <div>
            <h4>Produits</h4>
            <ul>
              <li><Link href="#produits">Thermopompes Centrales</Link></li>
              <li><Link href="#produits">Thermopompes Murales</Link></li>
              <li><Link href="#produits">Climatisation</Link></li>
              <li><Link href="#produits">Échangeurs d&apos;air</Link></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><Link href="/subventions">Subventions</Link></li>
              <li><Link href="/financement">Financement</Link></li>
              <li><Link href="/contact">Entretien et Réparation</Link></li>
            </ul>
          </div>
          <div id="contact">
            <h4>Contact</h4>
            <ul>
              <li>Tél: (514) 494-0400</li>
              <li>Courriel: info@bellechasseenergie.ca</li>
              <li>Grand-Montréal, QC</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Bellechasse Énergie. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
