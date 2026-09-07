import './globals.css';
import StructuredData from '../components/SEO/StructuredData';

export const metadata = {
  metadataBase: new URL('https://bellechasseenergie.com'),
  title: {
    default: 'Bellechasse Énergie | Chauffage et Climatisation à Montréal',
    template: '%s | Bellechasse Énergie'
  },
  description: 'Experts en installation de thermopompes, systèmes de climatisation et chauffage (Daikin, Moovair) à Montréal depuis 1962. Obtenez une soumission gratuite.',
  keywords: ['thermopompe', 'climatisation', 'chauffage', 'Montréal', 'Daikin', 'Moovair', 'Bellechasse Énergie', 'fournaise', 'échangeur d\'air'],
  authors: [{ name: 'Bellechasse Énergie' }],
  creator: 'Bellechasse Énergie',
  publisher: 'Bellechasse Énergie',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Bellechasse Énergie | Chauffage et Climatisation à Montréal',
    description: 'Experts en installation de thermopompes, systèmes de climatisation et chauffage (Daikin, Moovair) à Montréal depuis 1962.',
    url: 'https://bellechasseenergie.com',
    siteName: 'Bellechasse Énergie',
    images: [
      {
        url: '/hvac-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Bellechasse Énergie - Experts CVC à Montréal',
      },
    ],
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bellechasse Énergie | Chauffage et Climatisation à Montréal',
    description: 'Experts en installation de thermopompes, climatisation et chauffage depuis 1962.',
    images: ['/hvac-hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://bellechasseenergie.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <head>
        <StructuredData />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
