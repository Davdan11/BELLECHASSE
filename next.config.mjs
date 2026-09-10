// Politique de sécurité du contenu. 'unsafe-inline' reste nécessaire pour les scripts
// gtag/GTM et les blocs JSON-LD injectés par Next ; tout le reste est verrouillé.
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://*.google.com https://*.googleusercontent.com https://i.ytimg.com https://*.gstatic.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.google.com https://*.doubleclick.net",
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com https://www.google.com https://maps.google.com https://www.googletagmanager.com https://td.doubleclick.net",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  'upgrade-insecure-requests',
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build autonome seulement pour Docker (le Dockerfile définit NEXT_OUTPUT=standalone) ;
  // sur le VPS, le site tourne avec `next start` sous PM2.
  ...(process.env.NEXT_OUTPUT === 'standalone' ? { output: 'standalone' } : {}),
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Le stockage des rendez-vous lit un fichier dont le chemin dépend de l'environnement ;
  // on évite que le traçage embarque tout le projet dans ces deux routes.
  outputFileTracingExcludes: {
    '/api/rendez-vous': ['./public/**/*', './content/**/*', './components/**/*', './.git/**/*'],
    '/api/rendez-vous/disponibilites': ['./public/**/*', './content/**/*', './components/**/*', './.git/**/*'],
  },
  async redirects() {
    return [
      // Le second domaine (copie du site actuel) doit renvoyer vers le domaine principal,
      // sinon Google voit deux sites identiques. À compléter par une redirection DNS/hébergeur.
      ...['chauffagethermopompeclimatisation.ca', 'www.chauffagethermopompeclimatisation.ca', 'bellechasseenergie.ca', 'www.bellechasseenergie.ca', 'www.bellechasseenergie.com'].map((host) => ({
        source: '/:path*',
        has: [{ type: 'host', value: host }],
        destination: 'https://bellechasseenergie.com/:path*',
        permanent: true,
      })),
      { source: '/a-propos', destination: '/notre-expertise', permanent: true },
      { source: '/soumission', destination: '/contact', permanent: true },
      { source: '/promotions', destination: '/financement', permanent: true },
      { source: '/subventions', destination: '/financement', permanent: true },
      { source: '/produits/daikin', destination: '/produits/thermopompe-centrale', permanent: true },
      { source: '/thermopompes-centrales', destination: '/produits/thermopompe-centrale', permanent: true },
      { source: '/thermopompes-murales', destination: '/produits/thermopompe-murale', permanent: true },
      { source: '/climatisation', destination: '/climatisation-montreal', permanent: true },
      { source: '/fournaises', destination: '/produits/fournaise-air-pulse', permanent: true },
      { source: '/ventilation', destination: '/produits/echangeur-air', permanent: true },
      { source: '/blog', destination: '/blogue', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()' },
          { key: 'Content-Security-Policy', value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;
