/* Local service-area landing pages. Each has hand-written, distinct intro
   copy + neighborhoods so the pages aren't thin/duplicate content. */
export type Area = {
  slug: string;
  town: string;
  intro: string;
  blurb: string;
  neighborhoods: string[];
};

export const areas: Area[] = [
  {
    slug: 'west-hartford-ct',
    town: 'West Hartford',
    intro:
      'West Hartford is our home turf. From the colonials around Elizabeth Park to the condos near Blue Back Square, we keep homes and offices across town spotless — and we know the area well enough to work around your block, your parking, and your schedule.',
    blurb: 'Professional house & office cleaning in West Hartford, CT — eco-friendly, insured, and background-checked.',
    neighborhoods: ['West Hartford Center', 'Blue Back Square', 'Elizabeth Park', 'Bishops Corner', 'Elmwood', 'The Center'],
  },
  {
    slug: 'hartford-ct',
    town: 'Hartford',
    intro:
      "From downtown high-rises to the historic homes of the West End, Hartford spaces deserve a clean that matches the city's character. We handle everything from executive offices to family apartments with the same discreet, detailed care.",
    blurb: 'Trusted residential & commercial cleaning in Hartford, CT. Same-day availability and a 100% satisfaction guarantee.',
    neighborhoods: ['Downtown', 'West End', 'Asylum Hill', 'Frog Hollow', 'South End', 'Parkville'],
  },
  {
    slug: 'farmington-ct',
    town: 'Farmington',
    intro:
      'Farmington estates and the offices along the Farmington Avenue corridor are some of our favorite spaces to care for. Whether it’s a riverside home or a medical suite near UConn Health, we bring a white-glove standard to every visit.',
    blurb: 'Luxury home & estate cleaning in Farmington, CT. Bespoke programs, dedicated care, fully insured.',
    neighborhoods: ['Farmington Village', 'Unionville', 'Devonwood', 'Farmington Woods', 'Tunxis Mead'],
  },
  {
    slug: 'avon-ct',
    town: 'Avon',
    intro:
      'Avon’s hillside homes and busy professional offices keep us on our toes — and we love it. From Avon Mountain to the shops on Route 44, we deliver dependable, thorough cleaning that gives you your weekends back.',
    blurb: 'Reliable house cleaning & office cleaning in Avon, CT. Eco-friendly products, on-time every time.',
    neighborhoods: ['Avon Center', 'Avon Mountain', 'Lofgren', 'Secret Lake', 'Northington'],
  },
  {
    slug: 'bloomfield-ct',
    town: 'Bloomfield',
    intro:
      'Bloomfield blends quiet residential streets with major corporate campuses — and both need a cleaning partner they can rely on. We serve family homes and commercial spaces across town with flexible scheduling and consistent results.',
    blurb: 'Home & commercial cleaning in Bloomfield, CT. Flexible scheduling, background-checked team.',
    neighborhoods: ['Bloomfield Center', 'Wintonbury', 'Blue Hills', 'Scottland', 'Terry Plains'],
  },
  {
    slug: 'newington-ct',
    town: 'Newington',
    intro:
      'Newington’s tidy neighborhoods and small businesses are a perfect fit for our detail-first approach. From move-outs on Cedar Street to recurring office cleans near the Berlin Turnpike, we keep Newington sparkling.',
    blurb: 'Move-out, recurring & deep cleaning in Newington, CT. Transparent pricing, satisfaction guaranteed.',
    neighborhoods: ['Newington Center', 'Elmwood line', 'Cedar Mountain', 'Mill Pond', 'Stoddard'],
  },
  {
    slug: 'east-hartford-ct',
    town: 'East Hartford',
    intro:
      'Just across the river, East Hartford pairs busy commercial corridors with close-knit residential streets. We keep both spotless — from offices near Founders Plaza to family homes in Hockanum — with the reliability the area runs on.',
    blurb: 'Dependable home & office cleaning in East Hartford, CT. Insured, eco-friendly, satisfaction guaranteed.',
    neighborhoods: ['Hockanum', 'Burnside', 'Mayberry Village', 'Silver Lane', 'Founders Plaza'],
  },
  {
    slug: 'glastonbury-ct',
    town: 'Glastonbury',
    intro:
      "From the riverfront estates to the orchards on the east side, Glastonbury homes are built for gracious living — and we help keep them that way. We bring an upscale, detail-first clean to one of the valley's most beautiful towns.",
    blurb: 'Premium house & estate cleaning in Glastonbury, CT. White-glove care, fully insured & bonded.',
    neighborhoods: ['Glastonbury Center', 'South Glastonbury', 'Eastbury', 'Buckingham', 'Addison'],
  },
  {
    slug: 'windsor-ct',
    town: 'Windsor',
    intro:
      "Connecticut's oldest town blends historic homes with modern corporate campuses along the I-91 corridor. We clean both with equal care — preserving character in older homes and projecting polish in professional spaces.",
    blurb: 'Residential & commercial cleaning in Windsor, CT. Background-checked team, flexible scheduling.',
    neighborhoods: ['Windsor Center', 'Poquonock', 'Wilson', 'Hayden Station', 'Rainbow'],
  },
  {
    slug: 'simsbury-ct',
    town: 'Simsbury',
    intro:
      'Nestled against Talcott Mountain, Simsbury is all leafy streets and refined homes. We deliver a meticulous, respectful clean that suits the town’s relaxed elegance — whether it’s a historic colonial or a new build off Hopmeadow.',
    blurb: 'Luxury home cleaning in Simsbury, CT. Eco-friendly products, dedicated care, guaranteed results.',
    neighborhoods: ['Simsbury Center', 'Weatogue', 'Tariffville', 'West Simsbury', 'Hopmeadow'],
  },
  {
    slug: 'wethersfield-ct',
    town: 'Wethersfield',
    intro:
      'Old Wethersfield’s historic homes deserve a careful hand, and the newer neighborhoods deserve a thorough one. We bring both — gentle on heritage finishes, relentless on grime — across one of New England’s oldest communities.',
    blurb: 'Careful, thorough cleaning in Wethersfield, CT. Insured, eco-friendly, 100% satisfaction guarantee.',
    neighborhoods: ['Old Wethersfield', 'Griswoldville', 'Rocky Hill line', 'Goff Brook', 'Silas Deane'],
  },
  {
    slug: 'rocky-hill-ct',
    town: 'Rocky Hill',
    intro:
      'Rocky Hill’s riverside neighborhoods and corporate offices keep us busy year-round. From condos near the ferry to professional suites off the Silas Deane Highway, we deliver consistent, on-time cleaning you can set your calendar by.',
    blurb: 'Home & office cleaning in Rocky Hill, CT. On-time, insured, recurring discounts available.',
    neighborhoods: ['Rocky Hill Center', 'Dividend', 'Ferry Crossing', 'Cromwell line', 'West Hill'],
  },
  {
    slug: 'south-windsor-ct',
    town: 'South Windsor',
    intro:
      'South Windsor’s spacious subdivisions and tobacco-valley farmhouses call for a clean that scales. We handle large family homes and busy offices alike, with flexible scheduling that works around school runs and shift work.',
    blurb: 'House & commercial cleaning in South Windsor, CT. Flexible scheduling, background-checked team.',
    neighborhoods: ['Wapping', 'Pleasant Valley', 'Avery Heights', 'Buckland line', 'Nevers Road'],
  },
  {
    slug: 'manchester-ct',
    town: 'Manchester',
    intro:
      'From the shops at Buckland Hills to the historic mill homes downtown, Manchester is one of the region’s liveliest towns. We keep its homes and storefronts sparkling with dependable, detail-first service.',
    blurb: 'Reliable residential & retail cleaning in Manchester, CT. Eco-friendly, fully insured.',
    neighborhoods: ['Downtown Manchester', 'Buckland', 'Highland Park', 'Verplanck', 'Lakewood Circle'],
  },
  {
    slug: 'cheshire-ct',
    town: 'Cheshire',
    intro:
      'Cheshire’s tree-lined neighborhoods and well-kept homes set a high bar, and we’re glad to meet it. We bring a thorough, considerate clean to the "Bedding Plant Capital of Connecticut," from Mixville to the town center.',
    blurb: 'Thorough home cleaning in Cheshire, CT. Eco-friendly products, satisfaction guaranteed.',
    neighborhoods: ['Cheshire Center', 'Mixville', 'West Cheshire', 'South Cheshire', 'Cheshire Street'],
  },
  {
    slug: 'vernon-ct',
    town: 'Vernon',
    intro:
      'Vernon and Rockville mix historic charm with everyday practicality, and our cleaning fits right in — thorough, friendly, and fairly priced. From homes near Talcottville to offices off Route 30, we keep Vernon fresh.',
    blurb: 'Affordable, thorough cleaning in Vernon, CT. Insured, background-checked, recurring plans.',
    neighborhoods: ['Rockville', 'Talcottville', 'Dobsonville', 'Vernon Center', 'Lake Street'],
  },
  {
    slug: 'enfield-ct',
    town: 'Enfield',
    intro:
      'Up at the Massachusetts line, Enfield blends quiet residential streets with the busy Hazard Avenue retail strip. We serve homes and businesses across town with the same eco-friendly, satisfaction-backed standard.',
    blurb: 'Home & business cleaning in Enfield, CT. Eco-friendly, insured, same-day availability.',
    neighborhoods: ['Thompsonville', 'Hazardville', 'Scitico', 'Shaker Pines', 'North Thompsonville'],
  },
  {
    slug: 'southington-ct',
    town: 'Southington',
    intro:
      'Southington’s apple orchards and family neighborhoods give it a true small-town feel, and our service matches it — personal, dependable, and detailed. From Plantsville to Milldale, we keep homes ready for whatever the season brings.',
    blurb: 'Dependable house cleaning in Southington, CT. Eco-friendly, insured, 100% guarantee.',
    neighborhoods: ['Plantsville', 'Milldale', 'Marion', 'Southington Center', 'Mount Vernon'],
  },
  {
    slug: 'suffield-ct',
    town: 'Suffield',
    intro:
      'Suffield’s historic homes and rolling farmland make for some of the most distinctive properties in the valley. We treat each with care — thorough on the everyday spaces, gentle on the heritage details.',
    blurb: 'Careful home & estate cleaning in Suffield, CT. White-glove care, fully insured & bonded.',
    neighborhoods: ['Suffield Center', 'West Suffield', 'Suffield Depot', 'Boston Neck', 'Hastings Hill'],
  },
  {
    slug: 'new-britain-ct',
    town: 'New Britain',
    intro:
      'The "Hardware City" is dense, diverse, and always moving — and its homes and businesses deserve a cleaning partner who shows up. We serve apartments, multi-families, and offices across New Britain with reliable, eco-friendly service.',
    blurb: 'Apartment, multi-family & office cleaning in New Britain, CT. Insured, eco-friendly, reliable.',
    neighborhoods: ['Downtown', 'Broad Street', 'Belvedere', 'East Side', 'Corbin Heights'],
  },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);
