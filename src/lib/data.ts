import type { IconName } from '../components/Icon';

export type Service = {
  slug: string;
  title: string;
  em: string; // emphasised second line on the services page
  tag: string;
  shortTitle: string;
  icon: IconName;
  image: string;
  desc: string;
  longDesc: string;
  includes: string[];
};

const U = (id: string, w = 800, q = 72) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const services: Service[] = [
  {
    slug: 'residential-deep-clean',
    shortTitle: 'Residential Deep Clean',
    title: 'Residential',
    em: 'Deep Clean',
    tag: 'From 4 hrs',
    icon: 'home',
    image: U('1558618666-fcd25c85cd64'),
    desc: 'Room-by-room transformation. No corner missed, no surface unpolished. Your home reset to perfection.',
    longDesc:
      'Our flagship service. A meticulous, room-by-room transformation of your home. We tackle every surface, every corner, every hidden nook — with the precision of craftspeople who take their work personally.',
    includes: [
      'Deep clean of all rooms',
      'Inside appliances (oven, fridge, microwave)',
      'Baseboards, light fixtures, vents',
      'Interior windows and tracks',
      'Bathroom detailing & grout treatment',
      'All floors vacuumed, mopped, and buffed',
    ],
  },
  {
    slug: 'office-commercial',
    shortTitle: 'Office & Commercial',
    title: 'Office',
    em: '& Commercial',
    tag: 'Custom Plans',
    icon: 'monitor',
    image: U('1497366216548-37526070297c'),
    desc: 'Elevate your workspace to match your brand. First impressions start with a spotless environment.',
    longDesc:
      'Your workspace is a statement. We ensure it reflects the standard of your brand. Discreet, efficient, and comprehensive — from boardrooms to bathrooms, every inch immaculate.',
    includes: [
      'Full office cleaning & sanitisation',
      'Reception & lobby detailing',
      'Restroom deep clean',
      'Kitchen & break room service',
      'Desk and surface disinfection',
      'Floor care and entrance treatment',
    ],
  },
  {
    slug: 'move-in-move-out',
    shortTitle: 'Move In / Move Out',
    title: 'Move In',
    em: '/ Move Out',
    tag: 'Full Property',
    icon: 'box',
    image: U('1560185893-a55cbc8c57e8'),
    desc: 'A fresh start deserves a spotless space. We prepare every corner for the next chapter.',
    longDesc:
      'A fresh chapter deserves a spotless stage. We prepare every room for a perfect first impression — or leave the property in pristine condition for the next occupant.',
    includes: [
      'Full property deep clean',
      'Inside all cabinets and drawers',
      'Inside all appliances',
      'Window and blind cleaning',
      'Carpet and floor detailing',
      'Garage sweep if applicable',
    ],
  },
  {
    slug: 'post-construction',
    shortTitle: 'Post-Construction',
    title: 'Post-',
    em: 'Construction',
    tag: 'Specialist Team',
    icon: 'sparkle',
    image: U('1504307651254-35680f356dfd'),
    desc: 'Specialist dust, debris, and detail cleaning after renovations or new construction.',
    longDesc:
      'Construction leaves a trail invisible to the untrained eye. Our specialist team removes dust, debris, residue, and the finest particles — revealing the space exactly as it was designed to be.',
    includes: [
      'Construction dust removal',
      'Paint & adhesive residue removal',
      'Window track and sill detail',
      'All surface wipe-down and polish',
      'Floor scrub and finish',
      'Ventilation and fixture cleaning',
    ],
  },
  {
    slug: 'luxury-estate-care',
    shortTitle: 'Luxury Estate Care',
    title: 'Luxury',
    em: 'Estate Care',
    tag: 'By Appointment',
    icon: 'heart',
    image: U('1616486338812-3dadae4b4ace'),
    desc: 'White-glove service for high-value properties with bespoke care programs tailored to your home.',
    longDesc:
      'Our highest-tier service. A fully bespoke, white-glove care programme for high-value properties. We work around your schedule, your preferences, and your standards — which we promise to exceed.',
    includes: [
      'Bespoke cleaning programme',
      'Dedicated account manager',
      'Premium product selection',
      'Flexible scheduling',
      'Discretion & NDA available',
      'Regular estate maintenance',
    ],
  },
  {
    slug: 'event-preparation',
    shortTitle: 'Event Preparation',
    title: 'Event',
    em: 'Preparation',
    tag: 'Same-Day Avail.',
    icon: 'camera',
    image: U('1519167758481-83f550bb49b3'),
    desc: 'Pre and post-event cleaning for private gatherings, galas, and corporate affairs.',
    longDesc:
      'First impressions are made before a word is spoken. We prepare your venue — or restore it — with speed and elegance. Pre-event sparkle, post-event reset.',
    includes: [
      'Pre-event deep clean',
      'Surface polish and sanitisation',
      'Restroom preparation',
      'Post-event full cleanup',
      'Linen & surface reset',
      'Same-day scheduling available',
    ],
  },
  {
    slug: 'recurring-cleaning',
    shortTitle: 'Recurring Cleaning',
    title: 'Recurring',
    em: 'Maid Service',
    tag: 'Weekly · Bi-Weekly',
    icon: 'calendar',
    image: U('1556909114-f6e7ad7d3136'),
    desc: 'A spotless home, on repeat. The same trusted team on a schedule that fits your life — and you save up to 15%.',
    longDesc:
      'The easiest way to keep your home effortlessly clean. We assign you a consistent, vetted team and a recurring slot — weekly, bi-weekly, or monthly — so your space stays guest-ready without you lifting a finger. Recurring clients save up to 15% and lock in priority scheduling.',
    includes: [
      'Same trusted team each visit',
      'Kitchens & bathrooms detailed',
      'Dusting, vacuuming & mopping',
      'Up to 15% off vs. one-time',
      'Easy reschedule any time',
      'Priority booking windows',
    ],
  },
  {
    slug: 'apartment-cleaning',
    shortTitle: 'Apartment Cleaning',
    title: 'Apartment',
    em: '& Condo',
    tag: 'Studios to 3-Bed',
    icon: 'building',
    image: U('1560185893-a55cbc8c57e8'),
    desc: 'Right-sized cleaning for apartments and condos — thorough, fast, and priced for smaller footprints.',
    longDesc:
      'Apartment and condo living deserves a clean tailored to the space — not a one-size-fits-all package. From studios near Blue Back Square to three-bedroom condos, we move efficiently through every room, paying special attention to the high-traffic kitchen and bath, with flexible access for buildings and concierge desks.',
    includes: [
      'Full kitchen & bath detail',
      'All living spaces & bedrooms',
      'Interior windows & sills',
      'Building / concierge access friendly',
      'Eco-friendly, low-odor products',
      'Flexible same-day windows',
    ],
  },
  {
    slug: 'airbnb-cleaning',
    shortTitle: 'Airbnb & Rental Cleaning',
    title: 'Airbnb',
    em: '& Short-Term Rental',
    tag: 'Fast Turnovers',
    icon: 'key',
    image: U('1616486338812-3dadae4b4ace'),
    desc: 'Spotless turnovers between guests — staged, restocked, and photo-ready on a tight timeline.',
    longDesc:
      'Your reviews depend on the clean. We handle fast, reliable turnovers for Airbnb and short-term rentals — stripping and remaking beds, restocking essentials, staging the space to your listing photos, and flagging any damage or low supplies. Built for tight same-day checkout-to-checkin windows.',
    includes: [
      'Full turnover between guests',
      'Linens & towels stripped/remade',
      'Restock essentials & amenities',
      'Staged to your listing photos',
      'Damage & low-supply reporting',
      'Same-day checkout turnarounds',
    ],
  },
];

export type Reason = { n: string; icon: IconName; title: string; body: string };

export const reasons: Reason[] = [
  {
    n: '01',
    icon: 'users',
    title: 'Vetted & Trained Specialists',
    body: 'Every team member passes a background check and hands-on training before setting foot in your home.',
  },
  {
    n: '02',
    icon: 'leaf',
    title: 'Eco-Friendly Products',
    body: 'We use only premium, non-toxic solutions that protect your surfaces, your family, and the planet — no harsh chemicals, ever.',
  },
  {
    n: '03',
    icon: 'shield',
    title: '100% Satisfaction Guaranteed',
    body: "If anything doesn't meet your expectations, we return within 24 hours to make it right — completely free of charge, no questions asked.",
  },
  {
    n: '04',
    icon: 'clock',
    title: 'Always On Time',
    body: 'We respect your schedule. Our teams arrive in the promised window every time — and we send you a reminder the day before.',
  },
  {
    n: '05',
    icon: 'star',
    title: 'Locally Owned & Operated',
    body: 'A West Hartford business, not a franchise. The owner stands behind every clean — our reputation is built one spotless space at a time.',
  },
  {
    n: '06',
    icon: 'monitor',
    title: 'Seamless Digital Experience',
    body: 'Book in 60 seconds, track your team in real time, and manage everything from your phone. No paperwork, no hassle.',
  },
];

export type Value = { n: string; title: string; body: string };

export const values: Value[] = [
  { n: '01', title: 'Integrity', body: 'We enter your home with the same respect we would want for our own. Every promise we make is kept.' },
  { n: '02', title: 'Artisanship', body: 'Our work is not mechanical — it is considered. Every surface, every corner, approached with precision.' },
  { n: '03', title: 'Discretion', body: 'Your home is your sanctuary. We operate silently, professionally, and with the utmost respect for your privacy.' },
  { n: '04', title: 'Sustainability', body: "Luxury should never come at the planet's expense. We use only eco-friendly, non-toxic premium products." },
  { n: '05', title: 'Excellence', body: 'Good enough is never enough. We set the standard and then exceed it — every single visit.' },
  { n: '06', title: 'Warmth', body: 'Behind every clean home is a person we care about. We bring genuine warmth to everything we do.' },
];

export type Testimonial = {
  name: string;
  role: string;
  rating: number;
  text: string;
  /** Optional video testimonial. Accepts a direct file (.mp4/.webm/.mov),
   *  a YouTube watch/share link, or a Facebook video URL. */
  video?: string;
  /** Optional thumbnail image shown before the video plays.
   *  Falls back to an auto-generated thumbnail for YouTube, or a styled placeholder. */
  poster?: string;
  /** Where the review came from. 'google' = synced from Google Business Profile. */
  source?: 'google' | 'site';
  /** Reviewer photo URL (Google reviews include one). */
  photo?: string;
  /** Link to the review on the source platform (e.g. Google). */
  url?: string;
  /** Human-readable time, e.g. "2 weeks ago" (from Google). */
  when?: string;
};

// No seeded/fake testimonials. Reviews appear ONLY when real customers submit
// them (via /review) or once Google Business reviews are synced. This array
// stays empty so nothing fabricated is shown before launch.
export const testimonials: Testimonial[] = [];

export type Showcase = { title: string; sub: string; before: string; after: string };

export const showcases: Showcase[] = [
  {
    title: 'Luxury Kitchen Restoration',
    sub: 'West Hartford, CT',
    before: U('1585771724684-38269d6639fd'),
    after: U('1556909114-f6e7ad7d3136'),
  },
  {
    title: 'Executive Office Deep Clean',
    sub: 'Hartford, CT',
    before: U('1560185893-a55cbc8c57e8'),
    after: U('1497366216548-37526070297c'),
  },
  {
    title: 'Post-Construction Reveal',
    sub: 'Farmington, CT',
    before: U('1504307651254-35680f356dfd'),
    after: U('1519167758481-83f550bb49b3'),
  },
];

export type TrustItem = { icon: IconName; label: string; fill?: boolean };

export const trustItems: TrustItem[] = [
  { icon: 'home', label: 'Locally Owned & Operated' },
  { icon: 'shield', label: 'Fully Insured' },
  { icon: 'leaf', label: 'Eco-Friendly Products' },
  { icon: 'users', label: 'Background-Checked Team' },
  { icon: 'clock', label: 'Same-Day Availability' },
  { icon: 'check-circle', label: '100% Satisfaction Guarantee' },
  { icon: 'monitor', label: 'Book Online in 60 Seconds' },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'How much does professional house cleaning cost in West Hartford, CT?',
    a: 'Our residential deep cleaning starts from $160 for spaces under 1,000 sq ft. Pricing varies by space size, cleaning type, and frequency. Get a free instant estimate online in under 60 seconds — no commitment required.',
  },
  {
    q: 'Are your cleaning products eco-friendly and safe for children and pets?',
    a: 'Yes. We use only premium, eco-friendly, non-toxic cleaning solutions that are completely safe for your family, pets, and the environment. No harsh chemicals — ever.',
  },
  {
    q: 'Are your cleaners background-checked and insured?',
    a: 'Absolutely. Every team member passes a rigorous background check, is fully insured and bonded, and completes hands-on training before entering any client home.',
  },
  {
    q: 'Do you offer a satisfaction guarantee?',
    a: "Yes. If anything doesn't meet your expectations, we return within 24 hours to make it right — completely free of charge, no questions asked.",
  },
  {
    q: 'How quickly can I book a cleaning appointment?',
    a: 'You can book online in under 60 seconds. Choose your service, pick a date and time, and we will confirm availability within 2 hours. Same-day appointments may be available.',
  },
];

// NOTE: The hero stat counters were removed pre-launch — a day-one business
// can't back "X spaces cleaned / X% happy clients / 5★" claims, and the SSG
// snapshot rendered them as "0+/0%/0★". Reintroduce real numbers once earned.

/* Booking: residential pricing is driven by bedroom count (not fixed buckets).
   Anchored so 3 bedrooms = $240 to match the legacy rate. Tweak these to reprice. */
export const bedroomRate = { studio: 130, base: 150, perBedroom: 45, max: 8 };

/** Residential starting rates by home size — mirrors the booking calculator's
    square-footage tiers so the Pricing page and the booking tool agree. */
export const residentialTiers = [
  { label: 'Under 1,000 sq ft', price: 137 },
  { label: '1,000 – 1,500 sq ft', price: 167 },
  { label: '1,500 – 2,000 sq ft', price: 197 },
  { label: '2,000 – 2,500 sq ft', price: 227 },
];

/** Starting price for a residential deep clean by bedroom count (0 = studio). */
export function bedroomPrice(beds: number) {
  if (beds <= 0) return bedroomRate.studio;
  return bedroomRate.base + bedroomRate.perBedroom * (beds - 1);
}

/** Human label for a bedroom count. */
export function bedroomLabel(beds: number) {
  return beds <= 0 ? 'Studio' : `${beds} Bedroom${beds > 1 ? 's' : ''}`;
}

/** Typical floor area for a bedroom count, in ft² or m² (rounded). */
export function typicalSqft(beds: number, unit: 'ft' | 'm' = 'ft') {
  const ft = beds <= 0 ? 500 : 600 + 300 * (beds - 1); // 1→600, 3→1200, 5→1800…
  return unit === 'm' ? Math.round((ft * 0.092903) / 5) * 5 : ft;
}

export const addons = [
  { id: 'fridge', label: 'Inside Fridge', price: 30 },
  { id: 'oven', label: 'Inside Oven', price: 30 },
  { id: 'windows', label: 'Interior Windows', price: 40 },
  { id: 'laundry', label: 'Laundry & Linens', price: 25 },
  { id: 'cabinets', label: 'Inside Cabinets', price: 35 },
  { id: 'pets', label: 'Pet Hair Detail', price: 20 },
  { id: 'restocking', label: 'Restocking', price: 30 },
  { id: 'silver', label: 'Silver Polishing', price: 45 },
  { id: 'chandelier', label: 'Chandelier Cleaning', price: 60 },
  { id: 'inspection', label: 'White-Glove Inspection', price: 40 },
];

/** Starting price by service. Residential is driven by bedroom count (see bedroomPrice). */
export const serviceBasePrice: Record<string, number> = {
  'residential-deep-clean': 0,
  'office-commercial': 220,
  'move-in-move-out': 280,
  'post-construction': 320,
  'luxury-estate-care': 420,
  'event-preparation': 260,
  'recurring-cleaning': 130,
  'apartment-cleaning': 120,
  'airbnb-cleaning': 110,
};

export type Special = { icon: IconName; title: string; detail: string; terms: string; badge?: string };

/** Promotions shown on /specials. Edit freely — these mirror common local offers. */
export const specials: Special[] = [
  {
    icon: 'tag',
    title: '$40 Off Your First Clean',
    detail: 'New customers save $40 on a first deep clean or move-out service. Just mention code SPARK40 when you book.',
    terms: 'New clients only. One per household. Min. service $160.',
    badge: 'Most Popular',
  },
  {
    icon: 'users',
    title: 'Refer a Friend, Get $25',
    detail: 'Love us? Refer a friend — when they book their first clean, you each get $25 off your next service.',
    terms: 'Credit applied after the referred clean is completed.',
  },
  {
    icon: 'calendar',
    title: 'Save up to 15% Recurring',
    detail: 'Switch to a recurring plan and save 5% monthly, 10% bi-weekly, or 15% weekly — automatically.',
    terms: 'Discount applied to every recurring visit.',
  },
  {
    icon: 'gift',
    title: 'Gift Cards Available',
    detail: 'Give the gift of a spotless home. Digital gift cards in any amount — perfect for new parents, movers, and busy friends.',
    terms: 'Redeemable on any service. No expiration.',
  },
];

/** Cleaning process steps shown on /how-it-works. */
export const processSteps = [
  { n: '01', icon: 'monitor' as IconName, title: 'Get Your Instant Quote', body: 'Pick your service and space online and see a transparent estimate in under 60 seconds — no phone tag, no waiting.' },
  { n: '02', icon: 'calendar' as IconName, title: 'Confirm & Schedule', body: "Choose a date and time that suits you. We confirm availability within 2 hours and send a reminder the day before." },
  { n: '03', icon: 'sparkle' as IconName, title: 'We Make It Spotless', body: 'Your vetted, background-checked team arrives on time with eco-friendly products and works through our detailed checklist.' },
  { n: '04', icon: 'shield' as IconName, title: 'Love It — Guaranteed', body: "Walk through the results. If anything isn't perfect, we return within 24 hours to make it right, free of charge." },
];

export const frequencies = [
  { id: 'once', label: 'One-Time', mult: 1, note: '' },
  { id: 'monthly', label: 'Monthly', mult: 0.95, note: 'Save 5%' },
  { id: 'biweekly', label: 'Bi-Weekly', mult: 0.9, note: 'Save 10%' },
  { id: 'weekly', label: 'Weekly', mult: 0.85, note: 'Save 15%' },
];
