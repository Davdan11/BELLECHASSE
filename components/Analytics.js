"use client";
import { useEffect } from 'react';
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

/**
 * Google Analytics 4 (and optionally Google Ads) loaded only when the IDs
 * are set in the environment. Also tracks every click on a phone link as
 * a "phone_call" conversion event, on every page.
 */
export default function Analytics() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="tel:"]');
      if (!a) return;
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'phone_call', {
          phone: a.getAttribute('href').replace('tel:', ''),
          page: window.location.pathname,
        });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!GA_ID && !ADS_ID) return null;
  const primary = GA_ID || ADS_ID;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${primary}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${GA_ID ? `gtag('config', '${GA_ID}');` : ''}
          ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ''}
        `}
      </Script>
    </>
  );
}
