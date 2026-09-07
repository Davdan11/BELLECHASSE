import './globals.css';

export const metadata = {
  title: 'Bellechasse Énergie | Installation Thermopompes Grand-Montréal',
  description: 'Entreprise familiale depuis 1962, spécialisée en vente et installation de thermopompes, systèmes de climatisation et chauffage Daikin à Montréal, Laval, Rive-Sud et Rive-Nord. Confort, qualité et service professionnel garantis.',
  keywords: 'Bellechasse Énergie, thermopompe, climatisation, chauffage, Daikin, Grand-Montréal',
  openGraph: {
    title: 'Bellechasse Énergie | Installation Thermopompes Grand-Montréal',
    description: 'Entreprise familiale depuis 1962, spécialisée en vente et installation de thermopompes, systèmes de climatisation et chauffage.',
    url: 'https://chauffagethermopompeclimatisation.ca',
    siteName: 'Bellechasse Énergie',
    locale: 'fr_CA',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
