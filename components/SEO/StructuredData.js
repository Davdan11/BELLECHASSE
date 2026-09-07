import React from 'react';

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HVACBusiness",
        "@id": "https://bellechasseenergie.com/#organization",
        "name": "Bellechasse Énergie",
        "url": "https://bellechasseenergie.com",
        "logo": "https://bellechasseenergie.com/logo-png.png",
        "image": "https://bellechasseenergie.com/hvac-hero.jpg",
        "description": "Entreprise familiale spécialisée en vente, installation, et réparation de thermopompes, systèmes de climatisation et chauffage à Montréal depuis 1962.",
        "telephone": "+1-514-494-0400",
        "email": "info@bellechasseenergie.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Montréal",
          "addressLocality": "Montréal",
          "addressRegion": "QC",
          "addressCountry": "CA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "45.5017",
          "longitude": "-73.5673"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "17:00"
          }
        ],
        "sameAs": [
          "https://www.facebook.com/bellechasseenergie"
        ],
        "priceRange": "$$",
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "45.5017",
            "longitude": "-73.5673"
          },
          "geoRadius": "50000"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://bellechasseenergie.com/#website",
        "url": "https://bellechasseenergie.com",
        "name": "Bellechasse Énergie",
        "publisher": {
          "@id": "https://bellechasseenergie.com/#organization"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
