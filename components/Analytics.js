"use client";
import { useEffect } from 'react';
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_ADS_LEAD_LABEL; // ex. AW-123/AbCdEf (conversion « lead »)

/**
 * Mesure d'audience conforme à la Loi 25 :
 *  - Google Consent Mode v2 démarre en « denied » (aucun témoin non essentiel).
 *  - La bannière CookieConsent met à jour le consentement ; le choix est relu au chargement.
 *  - Charge Google Tag Manager (NEXT_PUBLIC_GTM_ID) et/ou gtag GA4 / Google Ads.
 *  - Convertit les clics téléphone et les envois de formulaire (generate_lead) en conversions Ads.
 */
export default function Analytics() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="tel:"]');
      if (!a) return;
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'phone_call', { phone: a.getAttribute('href').replace('tel:', ''), page: window.location.pathname });
        if (ADS_LEAD_LABEL) window.gtag('event', 'conversion', { send_to: ADS_LEAD_LABEL, event_category: 'phone_call' });
      }
      if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: 'phone_call', page: window.location.pathname });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!GA_ID && !ADS_ID && !GTM_ID) return null;
  const primary = GA_ID || ADS_ID;

  return (
    <>
      {/* Script inline exécuté au parsing, donc avant gtag/GTM : consentement par défaut refusé. */}
      <script
        id="consent-default"
        dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
            functionality_storage: 'granted', security_storage: 'granted', wait_for_update: 500
          });
          try {
            var c = JSON.parse(localStorage.getItem('be-consent') || 'null');
            if (c && c.analytics === true) {
              gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
            }
          } catch (e) {}
          gtag('set', 'url_passthrough', true);
          gtag('set', 'ads_data_redaction', true);
        ` }}
      />
      {GTM_ID && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
      {primary && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${primary}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              gtag('js', new Date());
              ${GA_ID ? `gtag('config', '${GA_ID}');` : ''}
              ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ''}
              ${ADS_LEAD_LABEL ? `
              window.addEventListener('be-lead', function (e) {
                gtag('event', 'conversion', { send_to: '${ADS_LEAD_LABEL}', event_category: (e.detail && e.detail.source) || 'form' });
              });` : ''}
            `}
          </Script>
        </>
      )}
    </>
  );
}
