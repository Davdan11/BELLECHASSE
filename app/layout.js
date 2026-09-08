import { Outfit } from 'next/font/google';
import './globals.css';
import StructuredData from '../components/SEO/StructuredData';
import Analytics from '../components/Analytics';
import StickyCallBar from '../components/StickyCallBar';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  metadataBase: new URL('https://bellechasseenergie.com'),
  title: {
    default: 'Bellechasse Énergie | Thermopompe, chauffage et climatisation à Montréal',
    template: '%s | Bellechasse Énergie'
  },
  description: "Installation de thermopompes, climatisation, chauffage et échangeurs d'air à Montréal, Laval, Rive-Nord et Rive-Sud depuis 1962. Détaillant autorisé Daikin. Soumission gratuite : (514) 494-0400.",
  keywords: ['thermopompe', 'thermopompe Montréal', 'climatisation', 'chauffage', 'Montréal', 'Laval', 'Rive-Nord', 'Rive-Sud', 'Daikin', 'Moovair', 'Bellechasse Énergie', 'fournaise', 'échangeur d\'air', 'installation thermopompe'],
  authors: [{ name: 'Bellechasse Énergie' }],
  creator: 'Bellechasse Énergie',
  publisher: 'Bellechasse Énergie',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Bellechasse Énergie | Thermopompe, chauffage et climatisation à Montréal',
    description: "Installation de thermopompes, climatisation et chauffage dans le Grand Montréal depuis 1962. Détaillant autorisé Daikin. Soumission gratuite.",
    url: 'https://bellechasseenergie.com',
    siteName: 'Bellechasse Énergie',
    images: [
      {
        url: '/hero.jpg',
        width: 1376,
        height: 768,
        alt: 'Thermopompe Daikin installée par Bellechasse Énergie à Montréal',
      },
    ],
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bellechasse Énergie | Thermopompe, chauffage et climatisation à Montréal',
    description: 'Experts en installation de thermopompes, climatisation et chauffage depuis 1962.',
    images: ['/hero.jpg'],
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

export const viewport = {
  themeColor: '#0055a4',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr-CA" data-scroll-behavior="smooth" className={outfit.variable}>
      <head>
        <StructuredData />
      </head>
      <body>
        {children}
        <StickyCallBar />
        <Analytics />
      </body>
    </html>
  );
}
