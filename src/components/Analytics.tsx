import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '../lib/site';

/** Loads GA4 once a Measurement ID is set, and tracks SPA page views. */
export default function Analytics() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!site.gaId) return;
    if (document.getElementById('ga4-src')) return;

    const s = document.createElement('script');
    s.id = 'ga4-src';
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${site.gaId}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', site.gaId, { send_page_view: false });
  }, []);

  // SPA page view on route change
  useEffect(() => {
    if (!site.gaId || !window.gtag) return;
    window.gtag('event', 'page_view', { page_path: pathname });
  }, [pathname]);

  return null;
}
