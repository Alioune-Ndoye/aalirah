import { site } from './site';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire an analytics event (no-op until a GA4 id is configured in site.ts). */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!site.gaId || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}
