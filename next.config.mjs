/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
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
        ],
      },
    ];
  },
};

export default nextConfig;
