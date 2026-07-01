/* ═══════════════════════════════════════════════
   Site identity & contact — single source of truth
   (ported from config/config.php, branding unified
   to "Aliraah" and timezone corrected to ET)
════════════════════════════════════════════════ */
export const site = {
  name: 'Aliraah',
  tagline: 'The Spark of Clean',
  desc:
    'Professional cleaning services for homes and businesses in West Hartford, CT. Eco-certified products, background-checked team, 100% satisfaction guarantee.',
  email: 'hello@aliraah.com',
  phone: '+1 (860) 555-0190',
  phoneRaw: '+18605550190',
  address: 'Prospect Ave, West Hartford, CT',
  hours: 'Mon–Sat, 7am–7pm ET',
  city: 'West Hartford',
  state: 'CT',
  stateFull: 'Connecticut',
  zip: '06117',
  lat: '41.7715',
  lng: '-72.7482',
  url: 'https://aliraah.com',
  ogImage:
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&h=630&q=80',
  social: {
    instagram: '#',
    facebook: '#',
    linkedin: '#',
  },
  rating: '5.0',
  reviewCount: '100',

  /* ── Integrations — fill these in to go live ──────────────
     Leads: set ONE of these so form submissions reach you.
       • web3formsKey — free, no backend. Get a key at https://web3forms.com
       • formEndpoint — or POST to your own backend instead.
     With neither set, forms fall back to opening the visitor's email client.
     Analytics: paste a GA4 Measurement ID (G-XXXXXXX) to enable analytics. */
  web3formsKey: '',
  formEndpoint: '',
  gaId: '',

  /* ── Client portal & review profiles (optional) ───────────
     portalUrl: link to your booking/scheduling system (e.g. Booking Koala,
     Launch27, ZenMaid). Leave '' to hide the Client Login link.
     googleReviewUrl / yelpUrl: your public review profiles for the Reviews page. */
  portalUrl: '',
  googleReviewUrl: '',
  yelpUrl: '',
} as const;

export const tel = `tel:${site.phoneRaw}`;
export const mailto = `mailto:${site.email}`;
