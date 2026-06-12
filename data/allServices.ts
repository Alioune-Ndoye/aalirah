import type { AllService } from '@/types';

export const servicePageUrls: Record<string, string> = {
  residential:   '/residential-cleaning',
  commercial:    '/commercial-cleaning',
  moveinout:     '/move-out-cleaning',
  airbnb:        '/airbnb-cleaning',
  postconstruct: '/post-construction-cleaning',
  estate:        '/luxury-estate-cleaning',
  condo:         '/residential-cleaning',
  event:         '/event-prep-cleaning',
  recurring:     '/recurring-cleaning',
};

const allServices: Record<string, AllService> = {
  residential:   { icon: '🏠', title: 'Residential Deep Clean',       desc: 'Room-by-room transformation. Every surface, baseboard, appliance, and hidden corner — done right.' },
  condo:         { icon: '🏙', title: 'Condo & Apartment Cleaning',    desc: 'Specialist cleaning for condos, apartments, and multi-unit properties. HOA-compliant and review-ready.' },
  commercial:    { icon: '🏢', title: 'Office & Commercial',           desc: 'Professional cleaning for offices, retail, medical suites, and commercial spaces. Discreet and efficient.' },
  airbnb:        { icon: '🛎', title: 'Airbnb & Short-Term Rental',    desc: 'Fast, thorough turnover cleaning between guests. Linen-ready, photo-ready, five-star-review-ready.' },
  moveinout:     { icon: '📦', title: 'Move In / Move Out',            desc: 'Full property reset for tenants, landlords, and buyers. Every cabinet, drawer, and appliance included.' },
  postconstruct: { icon: '🔨', title: 'Post-Construction',             desc: 'Specialist dust, debris, and fine-particle removal after renovations or new construction.' },
  estate:        { icon: '✨', title: 'Luxury Estate Care',            desc: 'White-glove bespoke cleaning for high-value properties. Dedicated account manager, premium products.' },
  event:         { icon: '🎉', title: 'Event Preparation',             desc: 'Pre and post-event cleaning for private gatherings, galas, and corporate affairs.' },
  recurring:     { icon: '🔄', title: 'Recurring Maintenance',         desc: 'Weekly, bi-weekly, or monthly plans. Consistency you can count on — up to 15% off every visit.' },
};

export default allServices;
