export default function manifest() {
  return {
    name: 'Bellechasse Énergie',
    short_name: 'Bellechasse',
    description: "Thermopompes, climatisation et chauffage à Montréal, Laval, Rive-Nord et Rive-Sud depuis 1962.",
    start_url: '/',
    display: 'browser',
    lang: 'fr-CA',
    background_color: '#ffffff',
    theme_color: '#0055a4',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
