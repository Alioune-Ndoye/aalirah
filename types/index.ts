export interface City {
  name: string;
  county: string;
  zip: string;
  lat: number;
  lng: number;
  intro: string;
  highlights: string[];
  featured: string[];
  areas: string[];
  nearby: { name: string; slug: string }[];
  faq_extra: { q: string; a: string }[];
}

export interface ServicePage {
  title: string;
  headline: string;
  tagline: string;
  icon: string;
  hero_desc: string;
  includes: { heading: string; items: string[] }[];
  process: { n: string; title: string; body: string }[];
  pricing: { tier: string; price: string }[];
  cities: string[];
  city_label: string;
  faq: { q: string; a: string }[];
}

export interface AllService {
  icon: string;
  title: string;
  desc: string;
}

export interface Booking {
  svc: string | null;
  freq: string;
  bed: number;
  bath: number;
  sqftTier: number | null;
  clutter: number;
  pets: number;
  extras: Record<string, string>;
  date: string | null;
  time: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  apt: string;
  city: string;
  stateVal: string;
  zip: string;
  entry: string;
  notes: string;
  estimatedTotal?: number;
  createdAt?: Date;
}

export interface SiteConfig {
  SITE_NAME: string;
  SITE_TAGLINE: string;
  SITE_DESC: string;
  SITE_EMAIL: string;
  SITE_PHONE: string;
  SITE_PHONE_RAW: string;
  SITE_ADDRESS: string;
  SITE_IG: string;
  SITE_FB: string;
  SITE_LI: string;
  SITE_URL: string;
  SITE_CITY: string;
  SITE_STATE: string;
  SITE_STATE_FULL: string;
  SITE_ZIP: string;
  SITE_COUNTRY: string;
  SITE_LAT: string;
  SITE_LNG: string;
  SITE_PRICE_RANGE: string;
  SITE_RATING: string;
  SITE_REVIEW_COUNT: string;
  SITE_OG_IMAGE: string;
}
