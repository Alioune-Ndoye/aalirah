import { site } from './site';
import { services, faqs } from './data';
import type { Service } from './data';
import type { Area } from './areas';

export const SITE_URL = site.url.replace(/\/$/, '');
export const abs = (path: string) => SITE_URL + (path.startsWith('/') ? path : `/${path}`);

/* ── Per-page meta ──────────────────────────────────────── */
export type PageMeta = { title: string; description: string; path: string };

export const meta: Record<string, PageMeta> = {
  home: {
    title: `${site.name} — Professional Cleaning Services in ${site.city}, ${site.state}`,
    description:
      `Top-rated professional cleaning in ${site.city}, CT. Eco-certified, fully insured, background-checked team. ` +
      'Residential, commercial, move-out & more. 100% satisfaction guaranteed. Book online in 60 seconds.',
    path: '/',
  },
  services: {
    title: `Cleaning Services in ${site.city}, ${site.state} — ${site.name}`,
    description:
      `Explore our professional cleaning services in ${site.city}, CT: residential deep clean, office cleaning, ` +
      'move-out, post-construction, luxury estate care & event prep. Eco-certified, fully insured.',
    path: '/services',
  },
  about: {
    title: `About Us — ${site.name}`,
    description: `Learn about ${site.name}'s philosophy, team, and commitment to luxury cleaning artistry in ${site.city}, CT.`,
    path: '/about',
  },
  book: {
    title: `Book a Cleaning — Free Quote in 60 Seconds | ${site.name}`,
    description:
      `Book your ${site.city}, CT cleaning online in under 60 seconds. Choose your service, get an instant estimate, ` +
      "and we'll confirm availability within 2 hours. No deposit required.",
    path: '/book',
  },
  pricing: {
    title: `Cleaning Prices in ${site.city}, ${site.state} — Transparent Rates | ${site.name}`,
    description:
      `See ${site.name}'s upfront cleaning prices in ${site.city}, CT. Residential rates by home size, ` +
      'commercial quotes, add-ons, and recurring discounts up to 15%. No hidden fees.',
    path: '/pricing',
  },
  reviews: {
    title: `Reviews — ${site.name} | ${site.city}, ${site.state}`,
    description:
      `Read reviews from ${site.name} customers in ${site.city}, CT. ` +
      `Had a clean with us? Share your experience and help your neighbors find us.`,
    path: '/reviews',
  },
  howItWorks: {
    title: `How It Works — Book a Cleaning in 4 Easy Steps | ${site.name}`,
    description:
      `Booking ${site.name} is simple: get an instant online quote, pick a time, we clean to a detailed checklist, ` +
      'and back it with a 100% satisfaction guarantee.',
    path: '/how-it-works',
  },
  guarantee: {
    title: `Our 100% Satisfaction Guarantee | ${site.name}`,
    description:
      `Every ${site.name} clean is backed by our 100% satisfaction guarantee. If anything isn't perfect, ` +
      'we return within 24 hours to make it right — free of charge.',
    path: '/guarantee',
  },
  specials: {
    title: `Specials & Offers — Save on Cleaning in ${site.city}, ${site.state} | ${site.name}`,
    description:
      `Current ${site.name} promotions: $40 off your first clean, refer-a-friend credit, recurring discounts up to 15%, ` +
      'and gift cards. Limited-time savings for Connecticut clients.',
    path: '/specials',
  },
  privacy: {
    title: `Privacy Policy — ${site.name}`,
    description: `How ${site.name} collects, uses, and protects your personal information.`,
    path: '/privacy',
  },
  terms: {
    title: `Terms of Service — ${site.name}`,
    description: `The terms governing your use of the ${site.name} website and services.`,
    path: '/terms',
  },
};

/* ── Individual service pages ───────────────────────────── */
export const servicePath = (slug: string) => `/services/${slug}`;

export function serviceMeta(s: Service): PageMeta {
  return {
    title: `${s.shortTitle} in ${site.city}, ${site.state} | ${site.name}`,
    description: `${s.desc} ${site.name} — eco-certified, insured & bonded, satisfaction guaranteed in ${site.city}, CT.`,
    path: servicePath(s.slug),
  };
}

export function serviceLd(s: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${s.shortTitle} — ${site.city}, ${site.state}`,
    description: s.longDesc,
    serviceType: s.shortTitle,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'City', name: site.city },
    url: abs(servicePath(s.slug)),
  };
}

/* ── Structured data (JSON-LD) ──────────────────────────── */
export function businessLd() {
  return {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE_URL}/#business`,
    name: site.name,
    description: site.desc,
    url: SITE_URL,
    telephone: site.phone,
    email: site.email,
    image: site.ogImage,
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Prospect Ave',
      addressLocality: site.city,
      addressRegion: site.state,
      postalCode: site.zip,
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.lat, longitude: site.lng },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '19:00',
      },
    ],
    // NOTE: No aggregateRating / Review structured data is emitted on purpose.
    // Google's guidelines prohibit marking up fake/unverifiable ratings, and doing
    // so risks a manual action. Re-add this ONLY once real reviews are synced from
    // Google Business Profile (see server/src/services/googleReviews.js).
    areaServed: ['West Hartford', 'Hartford', 'Farmington', 'Avon'].map((name) => ({ '@type': 'City', name })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Professional Cleaning Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.shortTitle, description: s.desc },
      })),
    },
  };
}

export function websiteLd() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: site.name,
    description: site.desc,
    publisher: { '@id': `${SITE_URL}/#business` },
  };
}

/** Site-wide graph rendered on every page. */
export function globalLd() {
  return { '@context': 'https://schema.org', '@graph': [businessLd(), websiteLd()] };
}

export function faqLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function servicesLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Professional Cleaning Services — ${site.name}`,
    url: abs('/services'),
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.shortTitle,
        url: abs(servicePath(s.slug)),
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: `${site.city}, ${site.state}`,
        description: s.desc,
      },
    })),
  };
}

export const areaPath = (slug: string) => `/cleaning/${slug}`;

export function areaMeta(area: Area): PageMeta {
  return {
    title: `Cleaning Services in ${area.town}, ${site.state} — ${site.name}`,
    description: area.blurb,
    path: areaPath(area.slug),
  };
}

export function areaLd(area: Area) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Cleaning Services in ${area.town}, ${site.state}`,
    description: area.blurb,
    serviceType: 'House and commercial cleaning',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'City', name: area.town },
    url: abs(areaPath(area.slug)),
    offers: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.shortTitle } })),
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}
