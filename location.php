<?php
require_once 'config/config.php';

/* ═══════════════════════════════════════════════
   Service page URL map — for cross-linking
   city pages ↔ service pages
════════════════════════════════════════════════ */
$service_page_urls = [
  'residential'   => '/residential-cleaning',
  'commercial'    => '/commercial-cleaning',
  'moveinout'     => '/move-out-cleaning',
  'airbnb'        => '/airbnb-cleaning',
  'postconstruct' => '/post-construction-cleaning',
  'estate'        => '/luxury-estate-cleaning',
  'condo'         => '/residential-cleaning',   // condos → residential page
  'event'         => '/event-prep-cleaning',
  'recurring'     => '/recurring-cleaning',
];

/* ═══════════════════════════════════════════════
   Full service catalogue
════════════════════════════════════════════════ */
$all_services = [
  'residential'  => ['icon'=>'🏠','title'=>'Residential Deep Clean',       'desc'=>'Room-by-room transformation. Every surface, baseboard, appliance, and hidden corner — done right.'],
  'condo'        => ['icon'=>'🏙','title'=>'Condo & Apartment Cleaning',    'desc'=>'Specialist cleaning for condos, apartments, and multi-unit properties. HOA-compliant and review-ready.'],
  'commercial'   => ['icon'=>'🏢','title'=>'Office & Commercial',           'desc'=>'Professional cleaning for offices, retail, medical suites, and commercial spaces. Discreet and efficient.'],
  'airbnb'       => ['icon'=>'🛎','title'=>'Airbnb & Short-Term Rental',    'desc'=>'Fast, thorough turnover cleaning between guests. Linen-ready, photo-ready, five-star-review-ready.'],
  'moveinout'    => ['icon'=>'📦','title'=>'Move In / Move Out',            'desc'=>'Full property reset for tenants, landlords, and buyers. Every cabinet, drawer, and appliance included.'],
  'postconstruct'=> ['icon'=>'🔨','title'=>'Post-Construction',             'desc'=>'Specialist dust, debris, and fine-particle removal after renovations or new construction.'],
  'estate'       => ['icon'=>'✨','title'=>'Luxury Estate Care',            'desc'=>'White-glove bespoke cleaning for high-value properties. Dedicated account manager, premium products.'],
  'event'        => ['icon'=>'🎉','title'=>'Event Preparation',             'desc'=>'Pre and post-event cleaning for private gatherings, galas, and corporate affairs.'],
  'recurring'    => ['icon'=>'🔄','title'=>'Recurring Maintenance',         'desc'=>'Weekly, bi-weekly, or monthly plans. Consistency you can count on — up to 15% off every visit.'],
];

/* ═══════════════════════════════════════════════
   City data — unique content per city
════════════════════════════════════════════════ */
$cities = [

  /* ─── West Hartford ─── */
  'west-hartford-ct' => [
    'name'    => 'West Hartford',
    'county'  => 'Hartford County',
    'zip'     => '06107',
    'lat'     => 41.7715, 'lng' => -72.7482,
    'intro'   => 'West Hartford blends suburban charm with urban convenience — Blue Back Square brings luxury condos, boutique offices, and an upscale lifestyle to this sought-after community. From Elmwood\'s craftsman homes to Bishops Corner\'s family neighborhoods, ' . SITE_NAME . ' delivers the spotless clean your West Hartford property deserves.',
    'highlights' => [
      'Blue Back Square condos & luxury apartments',
      'Elmwood, Bishops Corner & West Hartford Center neighborhoods',
      'Condo association-compliant cleaning for HOA properties',
    ],
    'featured'=> ['condo','residential','commercial'],
    'areas'   => ['Blue Back Square','Elmwood','Bishops Corner','West Hartford Center','Trout Brook'],
    'nearby'  => [['name'=>'Hartford','slug'=>'hartford-ct'],['name'=>'Farmington','slug'=>'farmington-ct'],['name'=>'Bloomfield','slug'=>'bloomfield-ct'],['name'=>'Newington','slug'=>'newington-ct']],
    'faq_extra' => [
      ['q'=>'Do you clean condos near Blue Back Square in West Hartford?',
       'a'=>'Yes. We specialize in condo and apartment cleaning throughout West Hartford, including the Blue Back Square area. Our teams are familiar with HOA requirements and building access protocols.'],
      ['q'=>'Can you handle recurring cleaning for a busy West Hartford household?',
       'a'=>'Absolutely. Many West Hartford clients choose our weekly or bi-weekly recurring plans — saving up to 15% per visit while keeping their home consistently spotless.'],
    ],
  ],

  /* ─── Hartford ─── */
  'hartford-ct' => [
    'name'    => 'Hartford',
    'county'  => 'Hartford County',
    'zip'     => '06103',
    'lat'     => 41.7658, 'lng' => -72.6851,
    'intro'   => 'Connecticut\'s capital city pulses with energy — from the historic downtown and XL Center to the vibrant Asylum Hill and West End neighborhoods. Whether you manage offices near Capitol Avenue, run an Airbnb near the convention center, or own apartments throughout Hartford, ' . SITE_NAME . ' keeps your property in flawless condition.',
    'highlights' => [
      'Downtown office & commercial spaces near Capitol Avenue',
      'Airbnb & short-term rental turnover near XL Center & convention venues',
      'Apartment & condo cleaning across Hartford\'s diverse neighborhoods',
    ],
    'featured'=> ['commercial','airbnb','condo'],
    'areas'   => ['Downtown Hartford','Asylum Hill','West End','Parkville','Frog Hollow','South End'],
    'nearby'  => [['name'=>'West Hartford','slug'=>'west-hartford-ct'],['name'=>'Bloomfield','slug'=>'bloomfield-ct'],['name'=>'Wethersfield','slug'=>'wethersfield-ct'],['name'=>'Newington','slug'=>'newington-ct']],
    'faq_extra' => [
      ['q'=>'Do you offer office and commercial cleaning in downtown Hartford?',
       'a'=>'Yes. We serve offices, retail spaces, medical suites, and commercial buildings throughout downtown Hartford and surrounding neighborhoods. We can schedule early morning or after-hours visits to avoid disrupting your business.'],
      ['q'=>'Can you handle Airbnb turnover cleaning in Hartford?',
       'a'=>'Yes — rapid Airbnb and short-term rental turnover is one of our most popular Hartford services. We work around your guest schedule, change linens, restock supplies, and leave the property photo-ready for your next booking.'],
    ],
  ],

  /* ─── Newington ─── */
  'newington-ct' => [
    'name'    => 'Newington',
    'county'  => 'Hartford County',
    'zip'     => '06111',
    'lat'     => 41.6959, 'lng' => -72.7237,
    'intro'   => 'Newington is the quintessential Connecticut suburb — convenient to Hartford via I-91 and Route 9, packed with family homes, and valued for its quiet, tree-lined streets. From the Willard Avenue corridor to Cedar Mountain Road, ' . SITE_NAME . ' serves Newington\'s busy households with reliable, recurring cleaning you can count on.',
    'highlights' => [
      'Family-friendly recurring cleaning for busy commuter households',
      'Move-in / move-out for Newington\'s active rental market',
      'Single-family home deep cleans from $160',
    ],
    'featured'=> ['residential','recurring','moveinout'],
    'areas'   => ['Newington Center','Willard Avenue area','Cedar Mountain','Merry Lane area','Robbins Avenue corridor'],
    'nearby'  => [['name'=>'West Hartford','slug'=>'west-hartford-ct'],['name'=>'Berlin','slug'=>'berlin-ct'],['name'=>'Wethersfield','slug'=>'wethersfield-ct'],['name'=>'Hartford','slug'=>'hartford-ct']],
    'faq_extra' => [
      ['q'=>'Do you offer weekly cleaning for families in Newington?',
       'a'=>'Yes. Our recurring maintenance plans (weekly, bi-weekly, or monthly) are our most popular service with Newington families. You get a consistent, trusted team each visit and save up to 15% versus one-time bookings.'],
      ['q'=>'How quickly can you fit in a move-out clean in Newington?',
       'a'=>'We typically have move-out appointments available within 48–72 hours. Same-day or next-day service may be available — book online or call us to check availability.'],
    ],
  ],

  /* ─── Berlin ─── */
  'berlin-ct' => [
    'name'    => 'Berlin',
    'county'  => 'Hartford County',
    'zip'     => '06037',
    'lat'     => 41.6212, 'lng' => -72.7459,
    'intro'   => 'Berlin\'s central location makes it one of Connecticut\'s most convenient commuter towns — easy access to I-91, Route 9, and the Meriden–Hartford corridor. For commuter households that need a clean home waiting after a long day, or families navigating a move-in or move-out, ' . SITE_NAME . ' is your dependable Berlin cleaning partner.',
    'highlights' => [
      'Move-in / move-out cleaning for Berlin\'s growing residential market',
      'Flexible scheduling for commuter households',
      'Post-construction cleans for new builds around Route 9',
    ],
    'featured'=> ['moveinout','recurring','postconstruct'],
    'areas'   => ['Kensington','Berlin Center','East Berlin','Christian Lane area','Timberlin Park area'],
    'nearby'  => [['name'=>'New Britain','slug'=>'new-britain-ct'],['name'=>'Newington','slug'=>'newington-ct'],['name'=>'Southington','slug'=>'southington-ct'],['name'=>'Plainville','slug'=>'plainville-ct']],
    'faq_extra' => [
      ['q'=>'Do you offer move-in and move-out cleaning in Berlin, CT?',
       'a'=>'Move-in / move-out cleaning is one of our most requested Berlin services. We handle the full property — every room, cabinet, appliance, and bathroom — so you can hand back keys or receive them with total confidence.'],
      ['q'=>'Can you work around a commuter\'s schedule in Berlin?',
       'a'=>'Absolutely. We offer early-morning, evening, and weekend appointments to fit around busy commuter schedules. You can even book a key drop-off clean and arrive home to a spotless house.'],
    ],
  ],

  /* ─── Farmington ─── */
  'farmington-ct' => [
    'name'    => 'Farmington',
    'county'  => 'Hartford County',
    'zip'     => '06032',
    'lat'     => 41.7198, 'lng' => -72.8368,
    'intro'   => 'Farmington is synonymous with Connecticut luxury — the historic Farmington River Valley, equestrian estates, and the prestigious Miss Porter\'s School define this exceptional community. ' . SITE_NAME . '\'s white-glove estate cleaning and premium recurring services are designed for the exacting standards Farmington homeowners expect.',
    'highlights' => [
      'Estate cleaning for Farmington River Valley\'s large properties',
      'Premium recurring service for high-value homes',
      'Discreet, professional teams — NDA available for high-profile clients',
    ],
    'featured'=> ['estate','residential','recurring'],
    'areas'   => ['Farmington Center','Unionville','Farmington River Valley','Avon Mountain foothills','Horseshoe Drive area'],
    'nearby'  => [['name'=>'West Hartford','slug'=>'west-hartford-ct'],['name'=>'Avon','slug'=>'avon-ct'],['name'=>'Plainville','slug'=>'plainville-ct'],['name'=>'Bristol','slug'=>'bristol-ct']],
    'faq_extra' => [
      ['q'=>'Do you offer estate and large-home cleaning in Farmington?',
       'a'=>'Yes. Farmington\'s large properties are a specialty. Our Luxury Estate Care programme includes a dedicated account manager, bespoke cleaning schedule, premium product selection, and full discretion. NDA available on request.'],
      ['q'=>'Can you clean a home in Farmington while I\'m away?',
       'a'=>'Absolutely. Many Farmington clients provide keybox access or a spare key. We handle everything independently, send a completion notification, and lock up securely when done.'],
    ],
  ],

  /* ─── Wethersfield ─── */
  'wethersfield-ct' => [
    'name'    => 'Wethersfield',
    'county'  => 'Hartford County',
    'zip'     => '06109',
    'lat'     => 41.7137, 'lng' => -72.6526,
    'intro'   => 'One of Connecticut\'s oldest towns, Wethersfield is celebrated for its stunning Historic District, beautifully preserved colonial homes, and tight-knit community. Preserving that heritage takes care — ' . SITE_NAME . ' uses only premium, non-toxic products that protect historic surfaces, original hardwood, and period finishes.',
    'highlights' => [
      'Non-toxic cleaning safe for Wethersfield\'s historic colonial homes',
      'Old Wethersfield Historic District specialist care',
      'Recurring maintenance keeping classic homes consistently pristine',
    ],
    'featured'=> ['residential','recurring','moveinout'],
    'areas'   => ['Old Wethersfield','Wethersfield Center','Wolcott Hill','Jordan Lane area','Nott Street Historic District'],
    'nearby'  => [['name'=>'Hartford','slug'=>'hartford-ct'],['name'=>'Glastonbury','slug'=>'glastonbury-ct'],['name'=>'Newington','slug'=>'newington-ct'],['name'=>'Rocky Hill','slug'=>'rocky-hill-ct']],
    'faq_extra' => [
      ['q'=>'Are your cleaning products safe for historic homes in Wethersfield?',
       'a'=>'Yes. We use only eco-certified, non-toxic solutions that are gentle on original hardwood floors, period plasterwork, and antique surfaces — while still delivering a thorough, deep clean.'],
      ['q'=>'Do you clean rental properties in Wethersfield\'s Historic District?',
       'a'=>'Yes. We handle both owner-occupied homes and rental properties throughout Wethersfield, including the Historic District. Move-in/move-out and recurring maintenance are both available.'],
    ],
  ],

  /* ─── Glastonbury ─── */
  'glastonbury-ct' => [
    'name'    => 'Glastonbury',
    'county'  => 'Hartford County',
    'zip'     => '06033',
    'lat'     => 41.7023, 'lng' => -72.6082,
    'intro'   => 'Glastonbury\'s eastern hills are home to some of Connecticut\'s largest and most elegant residences — from expansive family estates in South Glastonbury to distinguished neighborhoods along Hebron Avenue and New London Turnpike. When your property demands more than a standard clean, ' . SITE_NAME . '\'s estate care programme delivers.',
    'highlights' => [
      'Estate cleaning for Glastonbury\'s large and luxury homes',
      'South Glastonbury farm properties and rural estates',
      'Recurring deep-clean programmes for high-end properties',
    ],
    'featured'=> ['estate','residential','moveinout'],
    'areas'   => ['South Glastonbury','Glastonbury Center','Minnechaug area','Hebron Ave corridor','New London Turnpike area'],
    'nearby'  => [['name'=>'Wethersfield','slug'=>'wethersfield-ct'],['name'=>'Manchester','slug'=>'manchester-ct'],['name'=>'Rocky Hill','slug'=>'rocky-hill-ct'],['name'=>'Hartford','slug'=>'hartford-ct']],
    'faq_extra' => [
      ['q'=>'Do you clean large homes and estates in South Glastonbury?',
       'a'=>'South Glastonbury is a regular service area for us. We handle properties of all sizes — from 2,000 sq ft family homes to 6,000+ sq ft estates — with tiered pricing that reflects the scope of work accurately.'],
      ['q'=>'Do you offer move-out cleaning for Glastonbury landlords?',
       'a'=>'Yes. We work with Glastonbury landlords to prepare properties for new tenants — full deep clean, appliance interiors, windows, and more. We coordinate around your schedule and can provide a cleaning report on request.'],
    ],
  ],

  /* ─── Manchester ─── */
  'manchester-ct' => [
    'name'    => 'Manchester',
    'county'  => 'Hartford County',
    'zip'     => '06040',
    'lat'     => 41.7759, 'lng' => -72.5215,
    'intro'   => 'Manchester is a dynamic city east of Hartford — where the historic Cheney Brothers National Historic District meets a growing food and arts scene. From downtown commercial offices and retail to apartment turnovers and Airbnb properties near city attractions, ' . SITE_NAME . ' covers every Manchester property type.',
    'highlights' => [
      'Commercial & office cleaning in downtown Manchester',
      'Airbnb & short-term rental turnover for Manchester hosts',
      'Apartment cleaning in the Cheney Brothers historic buildings',
    ],
    'featured'=> ['commercial','airbnb','condo'],
    'areas'   => ['Cheney Brothers Historic District','Downtown Manchester','Buckland area','South Manchester','Center Springs Park area'],
    'nearby'  => [['name'=>'Glastonbury','slug'=>'glastonbury-ct'],['name'=>'Hartford','slug'=>'hartford-ct'],['name'=>'Bloomfield','slug'=>'bloomfield-ct'],['name'=>'Newington','slug'=>'newington-ct']],
    'faq_extra' => [
      ['q'=>'Do you offer commercial cleaning for offices in Manchester?',
       'a'=>'Yes. We clean offices, retail spaces, and commercial properties throughout Manchester, including the downtown corridor. Early-morning and after-hours scheduling available to keep your business running smoothly.'],
      ['q'=>'Can you handle Airbnb turnovers in the Cheney Brothers area of Manchester?',
       'a'=>'Yes — Cheney Brothers loft conversions are a popular Airbnb category and we know the buildings well. We handle rapid turnover between guests, including linen service, restocking, and a full property check.'],
    ],
  ],

  /* ─── Bloomfield ─── */
  'bloomfield-ct' => [
    'name'    => 'Bloomfield',
    'county'  => 'Hartford County',
    'zip'     => '06002',
    'lat'     => 41.8301, 'lng' => -72.7279,
    'intro'   => 'Bloomfield\'s proximity to Bradley International Airport makes it a natural hub for short-term rentals and business travel accommodations. Whether you host guests on Airbnb, manage a corporate rental, or own a family home, ' . SITE_NAME . ' brings five-star professional cleaning to every Bloomfield property.',
    'highlights' => [
      'Airbnb & corporate rental turnover near Bradley International Airport',
      'Residential cleaning across Bloomfield\'s growing neighborhoods',
      'Move-in / move-out for Bloomfield\'s active property market',
    ],
    'featured'=> ['airbnb','residential','moveinout'],
    'areas'   => ['Bloomfield Center','Blue Hills area','Laurel Hills','Wintonbury area','Duncaster Road corridor'],
    'nearby'  => [['name'=>'West Hartford','slug'=>'west-hartford-ct'],['name'=>'Enfield','slug'=>'enfield-ct'],['name'=>'Hartford','slug'=>'hartford-ct'],['name'=>'Farmington','slug'=>'farmington-ct']],
    'faq_extra' => [
      ['q'=>'Do you offer Airbnb and short-term rental cleaning near Bradley Airport in Bloomfield?',
       'a'=>'Yes. We specialize in rapid Airbnb and corporate rental turnovers near Bradley International Airport. We work around your guest schedule, handle linens, and make sure every property is guest-ready for that five-star review.'],
      ['q'=>'How quickly can you clean between guests in Bloomfield?',
       'a'=>'We typically complete a standard turnover in 2–4 hours depending on property size. For same-day turnovers, book as early as possible and we\'ll do our best to accommodate — especially for our recurring Bloomfield clients.'],
    ],
  ],

  /* ─── Avon ─── */
  'avon-ct' => [
    'name'    => 'Avon',
    'county'  => 'Hartford County',
    'zip'     => '06001',
    'lat'     => 41.8012, 'lng' => -72.8340,
    'intro'   => 'Avon sits in the Farmington River Valley at the base of Talcott Mountain — home to some of Connecticut\'s most enviable residential properties. With large lots, custom-built homes, and a discerning homeowner base, Avon is where ' . SITE_NAME . '\'s luxury estate care and premium recurring services truly shine.',
    'highlights' => [
      'Luxury estate cleaning for Avon\'s large custom-built homes',
      'Premium recurring maintenance — weekly, bi-weekly, or monthly',
      'Post-construction cleaning for Avon\'s new construction projects',
    ],
    'featured'=> ['estate','residential','recurring'],
    'areas'   => ['Avon Center','Avon Mountain','Nod Road area','West Avon','Fisher Meadows area'],
    'nearby'  => [['name'=>'Farmington','slug'=>'farmington-ct'],['name'=>'West Hartford','slug'=>'west-hartford-ct'],['name'=>'Simsbury','slug'=>'simsbury-ct'],['name'=>'Plainville','slug'=>'plainville-ct']],
    'faq_extra' => [
      ['q'=>'Do you clean large homes on large lots in Avon, CT?',
       'a'=>'Avon\'s custom homes and estates are a regular part of our service area. We price by square footage tier, so larger Avon homes receive accurate estimates — no surprises. Our estate programme includes a dedicated team and account manager.'],
      ['q'=>'Do you offer post-construction cleaning in Avon for new builds?',
       'a'=>'Yes. New construction and renovation are active in Avon, and our post-construction cleaning team removes fine dust, adhesive residue, debris, and construction particles — leaving your brand-new home genuinely move-in ready.'],
    ],
  ],

  /* ─── Rocky Hill ─── */
  'rocky-hill-ct' => [
    'name'    => 'Rocky Hill',
    'county'  => 'Hartford County',
    'zip'     => '06067',
    'lat'     => 41.6626, 'lng' => -72.6526,
    'intro'   => 'Rocky Hill sits along the Connecticut River with a mix of long-established families and working professionals tied to nearby state agencies and insurance-sector offices. The town\'s active rental and relocation market creates a steady need for move-in and move-out cleaning — and ' . SITE_NAME . '\'s teams are ready on short notice.',
    'highlights' => [
      'Move-in / move-out cleaning for Rocky Hill\'s active rental market',
      'Flexible scheduling for government and insurance-sector professionals',
      'Recurring home maintenance with same-team consistency',
    ],
    'featured'=> ['moveinout','residential','recurring'],
    'areas'   => ['Rocky Hill Center','West Street area','Dividend area','Elmwood Drive corridor','Cromwell Ave area'],
    'nearby'  => [['name'=>'Wethersfield','slug'=>'wethersfield-ct'],['name'=>'Glastonbury','slug'=>'glastonbury-ct'],['name'=>'Cromwell','slug'=>'cromwell-ct'],['name'=>'Berlin','slug'=>'berlin-ct']],
    'faq_extra' => [
      ['q'=>'Do you handle move-in and move-out cleaning in Rocky Hill for renters?',
       'a'=>'Yes. Rocky Hill has a strong rental market and we regularly work with both tenants and landlords. We can provide a detailed checklist report after the clean — useful for security deposit disputes or property inspections.'],
      ['q'=>'Can you accommodate last-minute cleaning requests in Rocky Hill?',
       'a'=>'We maintain availability for short-notice bookings in Rocky Hill. Book online and we\'ll confirm within 2 hours. Same-day appointments are subject to team availability.'],
    ],
  ],

  /* ─── Southington ─── */
  'southington-ct' => [
    'name'    => 'Southington',
    'county'  => 'Hartford County',
    'zip'     => '06489',
    'lat'     => 41.5987, 'lng' => -72.8779,
    'intro'   => 'Southington is famous for its Apple Harvest Festival, but it\'s also one of Central Connecticut\'s fastest-growing towns for new residential construction. Whether you need post-construction cleaning for your brand-new home, a thorough move-in clean, or a regular maintenance schedule, ' . SITE_NAME . ' handles Southington properties with precision.',
    'highlights' => [
      'Post-construction cleaning for Southington\'s booming new-build market',
      'Move-in deep clean for new homeowners in growing developments',
      'Family recurring maintenance in Southington\'s established neighborhoods',
    ],
    'featured'=> ['postconstruct','moveinout','residential'],
    'areas'   => ['Southington Center','Plantsville','Marion area','Milldale','Queen Street corridor'],
    'nearby'  => [['name'=>'Berlin','slug'=>'berlin-ct'],['name'=>'Plainville','slug'=>'plainville-ct'],['name'=>'Bristol','slug'=>'bristol-ct'],['name'=>'New Britain','slug'=>'new-britain-ct']],
    'faq_extra' => [
      ['q'=>'Do you offer post-construction cleaning for new homes in Southington?',
       'a'=>'Yes — post-construction cleaning is one of our most requested Southington services. New builds accumulate fine drywall dust, adhesive residue, and construction debris that standard cleaning misses. Our specialist team ensures your new home is genuinely clean before you move in.'],
      ['q'=>'How do you price post-construction cleaning in Southington?',
       'a'=>'Post-construction is priced by square footage starting at $240 for under 1,000 sq ft. Get an instant quote online in 60 seconds. Discounts available for recurring clients who continue with us after the construction clean.'],
    ],
  ],

  /* ─── Plainville ─── */
  'plainville-ct' => [
    'name'    => 'Plainville',
    'county'  => 'Hartford County',
    'zip'     => '06062',
    'lat'     => 41.6737, 'lng' => -72.8593,
    'intro'   => 'Plainville\'s compact, community-minded character makes it one of Central Connecticut\'s best-kept secrets — accessible, affordable, and growing. ' . SITE_NAME . ' serves Plainville homeowners and renters with straightforward, high-quality cleaning at transparent, competitive prices.',
    'highlights' => [
      'Transparent, no-surprise pricing for Plainville households',
      'Move-in / move-out cleaning for Plainville\'s rental properties',
      'Recurring maintenance starting from $160 per visit',
    ],
    'featured'=> ['residential','moveinout','recurring'],
    'areas'   => ['Plainville Center','Washington Street area','Linden Street corridor','East Farmington area'],
    'nearby'  => [['name'=>'Southington','slug'=>'southington-ct'],['name'=>'Berlin','slug'=>'berlin-ct'],['name'=>'New Britain','slug'=>'new-britain-ct'],['name'=>'Farmington','slug'=>'farmington-ct']],
    'faq_extra' => [
      ['q'=>'What is the cost of house cleaning in Plainville, CT?',
       'a'=>'Residential deep cleaning in Plainville starts at $160 for homes under 1,000 sq ft. Use our free online quote tool for an instant estimate. No hidden fees, no commitment required.'],
      ['q'=>'Do you offer rental property cleaning in Plainville?',
       'a'=>'Yes. We work with both tenants and landlords in Plainville for move-in, move-out, and between-tenant cleaning. Quick turnaround available — often within 48 hours.'],
    ],
  ],

  /* ─── Bristol ─── */
  'bristol-ct' => [
    'name'    => 'Bristol',
    'county'  => 'Hartford County',
    'zip'     => '06010',
    'lat'     => 41.6718, 'lng' => -72.9493,
    'intro'   => 'Bristol combines small-city character with major attractions — from Lake Compounce, America\'s oldest amusement park, to ESPN\'s global headquarters. The result is a thriving short-term rental market alongside significant commercial cleaning needs, and ' . SITE_NAME . ' is uniquely positioned to serve both.',
    'highlights' => [
      'Airbnb & short-term rental turnover near Lake Compounce',
      'Commercial & office cleaning for Bristol\'s business community',
      'Residential deep clean for Bristol\'s established family neighborhoods',
    ],
    'featured'=> ['airbnb','commercial','residential'],
    'areas'   => ['Downtown Bristol','Federal Hill','Forestville','Chippens Hill','Lake Compounce area'],
    'nearby'  => [['name'=>'Southington','slug'=>'southington-ct'],['name'=>'Plainville','slug'=>'plainville-ct'],['name'=>'Farmington','slug'=>'farmington-ct'],['name'=>'New Britain','slug'=>'new-britain-ct']],
    'faq_extra' => [
      ['q'=>'Do you offer Airbnb cleaning near Lake Compounce in Bristol?',
       'a'=>'Yes. The Lake Compounce area drives strong short-term rental demand in Bristol, and we provide rapid, reliable turnover cleaning that keeps your listing earning five-star reviews. We work around your guest schedule.'],
      ['q'=>'Do you clean commercial offices and businesses in Bristol?',
       'a'=>'Yes. We serve offices, retail spaces, and commercial facilities throughout Bristol, including the Route 6 corridor. Evening and weekend scheduling available to minimize business disruption.'],
    ],
  ],

  /* ─── Canton ─── */
  'canton-ct' => [
    'name'    => 'Canton',
    'county'  => 'Hartford County',
    'zip'     => '06019',
    'lat'     => 41.8568, 'lng' => -72.8998,
    'intro'   => 'Canton is a picturesque town along the Farmington River in northwestern Hartford County — home to the charming Collinsville Village, scenic hiking trails, and beautiful properties ranging from cozy colonials to expansive modern homes. ' . SITE_NAME . ' brings five-star cleaning to Canton\'s discerning homeowners.',
    'highlights' => [
      'Estate and large-property cleaning for Canton\'s wooded residences',
      'Recurring maintenance for Collinsville Village homes',
      'Eco-friendly products safe for Canton\'s natural surroundings',
    ],
    'featured'=> ['residential','estate','recurring'],
    'areas'   => ['Collinsville','Canton Center','North Canton','Cherry Brook'],
    'nearby'  => [['name'=>'Simsbury','slug'=>'simsbury-ct'],['name'=>'Avon','slug'=>'avon-ct'],['name'=>'Burlington','slug'=>'burlington-ct'],['name'=>'Farmington','slug'=>'farmington-ct']],
    'faq_extra' => [
      ['q'=>'Do you offer cleaning services in Collinsville and Canton Center?',
       'a'=>'Yes. We serve all of Canton including Collinsville Village, Canton Center, and North Canton. Our teams are familiar with the area and can accommodate flexible scheduling including key-drop appointments.'],
      ['q'=>'Can you clean large wooded-lot properties in Canton?',
       'a'=>'Absolutely. Many Canton homes sit on large, private lots and our estate cleaning programme is designed exactly for this. We bring the right team size and equipment for properties of any scale.'],
    ],
  ],

  /* ─── Simsbury ─── */
  'simsbury-ct' => [
    'name'    => 'Simsbury',
    'county'  => 'Hartford County',
    'zip'     => '06070',
    'lat'     => 41.8787, 'lng' => -72.8109,
    'intro'   => 'Simsbury consistently ranks among Connecticut\'s most desirable towns — scenic horse country along the Farmington River, stunning properties around Talcott Mountain State Park, and some of the state\'s finest residential addresses. ' . SITE_NAME . '\'s luxury estate care and premium recurring services are built for Simsbury.',
    'highlights' => [
      'White-glove estate cleaning for Simsbury\'s premium properties',
      'Recurring premium maintenance starting weekly, bi-weekly, or monthly',
      'Equestrian estate and large-lot specialist cleaning',
    ],
    'featured'=> ['estate','residential','recurring'],
    'areas'   => ['Simsbury Center','Weatogue','Tariffville','Simsbury Farms area','Talcott Mountain area'],
    'nearby'  => [['name'=>'Canton','slug'=>'canton-ct'],['name'=>'Avon','slug'=>'avon-ct'],['name'=>'Farmington','slug'=>'farmington-ct'],['name'=>'West Hartford','slug'=>'west-hartford-ct']],
    'faq_extra' => [
      ['q'=>'Do you clean large estate properties in Simsbury?',
       'a'=>'Yes. Simsbury is one of our most active estate cleaning markets. We handle properties from 3,000 to 8,000+ sq ft with dedicated, background-checked senior teams and premium eco-certified products.'],
      ['q'=>'Can you provide a recurring cleaning programme for a Simsbury home?',
       'a'=>'Absolutely. Many Simsbury clients choose weekly or bi-weekly recurring plans — consistent teams, predictable pricing, and up to 15% off every visit. We\'ll match your schedule and home standards.'],
    ],
  ],

  /* ─── Windsor ─── */
  'windsor-ct' => [
    'name'    => 'Windsor',
    'county'  => 'Hartford County',
    'zip'     => '06095',
    'lat'     => 41.8523, 'lng' => -72.6442,
    'intro'   => 'Windsor is Connecticut\'s oldest English settlement — a historic town with a strong residential community, growing commercial base, and proximity to Bradley International Airport. Whether you manage rental properties, run an Airbnb for business travelers, or need a recurring clean for your family home, ' . SITE_NAME . ' serves all of Windsor.',
    'highlights' => [
      'Airbnb & short-term rental cleaning near Bradley International Airport',
      'Residential and commercial cleaning across Windsor\'s neighborhoods',
      'Move-in / move-out for Windsor\'s active housing market',
    ],
    'featured'=> ['airbnb','residential','commercial'],
    'areas'   => ['Windsor Center','Poquonock','Hayden Station','Wilson area','Day Hill Road corridor'],
    'nearby'  => [['name'=>'Bloomfield','slug'=>'bloomfield-ct'],['name'=>'Hartford','slug'=>'hartford-ct'],['name'=>'East Hartford','slug'=>'east-hartford-ct'],['name'=>'South Windsor','slug'=>'south-windsor-ct']],
    'faq_extra' => [
      ['q'=>'Do you offer Airbnb cleaning for short-term rentals near Bradley Airport in Windsor?',
       'a'=>'Yes — Windsor\'s proximity to Bradley Airport makes it a strong Airbnb market and we handle rapid turnovers for hosts throughout Windsor. We work around your guest schedule and leave properties review-ready.'],
      ['q'=>'Do you clean commercial properties in Windsor, CT?',
       'a'=>'Yes. We serve Windsor\'s growing commercial corridor including offices, retail, and light industrial spaces on Day Hill Road and throughout the town. After-hours scheduling available.'],
    ],
  ],

  /* ─── East Hartford ─── */
  'east-hartford-ct' => [
    'name'    => 'East Hartford',
    'county'  => 'Hartford County',
    'zip'     => '06108',
    'lat'     => 41.7820, 'lng' => -72.6129,
    'intro'   => 'East Hartford sits directly across the Connecticut River from Hartford — home to Pratt & Whitney\'s global headquarters, a dense residential community, and significant commercial corridors. From apartment turnovers to office cleaning, ' . SITE_NAME . ' keeps East Hartford properties in flawless condition.',
    'highlights' => [
      'Commercial & office cleaning near Pratt & Whitney and Silver Lane',
      'Apartment and condo cleaning across East Hartford\'s dense housing stock',
      'Move-in / move-out for East Hartford\'s active rental market',
    ],
    'featured'=> ['commercial','condo','moveinout'],
    'areas'   => ['Silver Lane','Forbes Street area','Burnside Avenue corridor','Main Street','Charter Oak Bridge area'],
    'nearby'  => [['name'=>'Hartford','slug'=>'hartford-ct'],['name'=>'Manchester','slug'=>'manchester-ct'],['name'=>'Glastonbury','slug'=>'glastonbury-ct'],['name'=>'South Windsor','slug'=>'south-windsor-ct']],
    'faq_extra' => [
      ['q'=>'Do you clean commercial offices and businesses in East Hartford?',
       'a'=>'Yes. We serve East Hartford\'s commercial district including offices, retail, and industrial spaces around Silver Lane and beyond. We offer early-morning and after-hours scheduling to avoid disrupting operations.'],
      ['q'=>'Do you clean apartments and condos in East Hartford?',
       'a'=>'Absolutely. East Hartford has a large multi-unit housing market and we work with both tenants and property managers for move-in/move-out, unit turnovers, and recurring maintenance.'],
    ],
  ],

  /* ─── South Windsor ─── */
  'south-windsor-ct' => [
    'name'    => 'South Windsor',
    'county'  => 'Hartford County',
    'zip'     => '06074',
    'lat'     => 41.8198, 'lng' => -72.5848,
    'intro'   => 'South Windsor balances suburban convenience with a strong agricultural heritage — wide-open landscapes, quality family neighborhoods, and a growing residential community east of Hartford. ' . SITE_NAME . ' serves South Windsor families with reliable, recurring home cleaning that fits your schedule.',
    'highlights' => [
      'Family recurring cleaning for South Windsor\'s established neighborhoods',
      'Move-in / move-out for South Windsor\'s growing housing market',
      'Post-construction cleaning for new residential developments',
    ],
    'featured'=> ['residential','recurring','moveinout'],
    'areas'   => ['South Windsor Center','Wapping','Pleasant Valley','Rye Street area','Ellington Road corridor'],
    'nearby'  => [['name'=>'Windsor','slug'=>'windsor-ct'],['name'=>'East Hartford','slug'=>'east-hartford-ct'],['name'=>'Manchester','slug'=>'manchester-ct'],['name'=>'Glastonbury','slug'=>'glastonbury-ct']],
    'faq_extra' => [
      ['q'=>'Do you offer recurring cleaning for South Windsor families?',
       'a'=>'Yes. Weekly, bi-weekly, and monthly recurring plans are our most popular option with South Windsor families. You get the same trusted team each visit, consistent results, and save up to 15% versus one-time bookings.'],
      ['q'=>'Do you cover new residential developments in South Windsor?',
       'a'=>'Yes. South Windsor has seen strong residential growth and we handle post-construction cleaning for builders and move-in cleans for new homeowners across the town.'],
    ],
  ],

  /* ─── Cheshire ─── */
  'cheshire-ct' => [
    'name'    => 'Cheshire',
    'county'  => 'New Haven County',
    'zip'     => '06410',
    'lat'     => 41.4990, 'lng' => -72.9000,
    'intro'   => 'Cheshire is one of New Haven County\'s most sought-after communities — known for excellent schools, large residential properties, and a strong sense of community pride. From spacious family colonials to executive estates, ' . SITE_NAME . ' delivers the white-glove cleaning Cheshire homeowners expect.',
    'highlights' => [
      'Large-home and estate cleaning for Cheshire\'s premium properties',
      'Family recurring maintenance in Cheshire\'s established neighborhoods',
      'Eco-certified products safe for Cheshire\'s natural surroundings',
    ],
    'featured'=> ['residential','estate','recurring'],
    'areas'   => ['Cheshire Center','Cheshire Village','Highland area','Mixville','Butternut Farms area'],
    'nearby'  => [['name'=>'Southington','slug'=>'southington-ct'],['name'=>'Plainville','slug'=>'plainville-ct'],['name'=>'New Britain','slug'=>'new-britain-ct'],['name'=>'Bristol','slug'=>'bristol-ct']],
    'faq_extra' => [
      ['q'=>'Do you offer cleaning for large homes in Cheshire, CT?',
       'a'=>'Yes. Cheshire\'s large residential properties are a regular part of our service area. We price by square footage tier, ensuring accurate quotes for 3,000, 4,000, and 5,000+ sq ft homes.'],
      ['q'=>'Are your products safe for families and pets in Cheshire?',
       'a'=>'Absolutely. We use only eco-certified, non-toxic cleaning solutions — no harsh chemicals. Perfect for Cheshire families with children, pets, and a commitment to a healthy home environment.'],
    ],
  ],

  /* ─── Burlington ─── */
  'burlington-ct' => [
    'name'    => 'Burlington',
    'county'  => 'Hartford County',
    'zip'     => '06013',
    'lat'     => 41.7723, 'lng' => -72.9748,
    'intro'   => 'Burlington is one of Central Connecticut\'s most tranquil communities — wooded lots, expansive properties, and a quiet rural character that makes it a hidden gem for privacy seekers. With large homes set back from tree-lined roads, Burlington is perfectly suited for ' . SITE_NAME . '\'s luxury estate and deep-clean services.',
    'highlights' => [
      'Estate cleaning for Burlington\'s large wooded-lot properties',
      'Premium recurring service for private, rural residences',
      'Eco-certified products aligned with Burlington\'s natural setting',
    ],
    'featured'=> ['estate','residential','recurring'],
    'areas'   => ['Burlington Center','Collinsville Road area','George Washington Turnpike corridor','Beecher Road area'],
    'nearby'  => [['name'=>'Canton','slug'=>'canton-ct'],['name'=>'Farmington','slug'=>'farmington-ct'],['name'=>'Avon','slug'=>'avon-ct'],['name'=>'Plainville','slug'=>'plainville-ct']],
    'faq_extra' => [
      ['q'=>'Do you travel to Burlington, CT for cleaning services?',
       'a'=>'Yes. Burlington is within our service area. For rural and wooded properties we recommend booking recurring visits for the best value and scheduling priority. Call to confirm availability for your specific address.'],
      ['q'=>'Can you handle large or multi-building properties in Burlington?',
       'a'=>'Yes. Burlington\'s rural residential market often includes larger structures and outbuildings. We scale our team to fit the scope — contact us for a custom quote.'],
    ],
  ],

  /* ─── Cromwell ─── */
  'cromwell-ct' => [
    'name'    => 'Cromwell',
    'county'  => 'Middlesex County',
    'zip'     => '06416',
    'lat'     => 41.5968, 'lng' => -72.6471,
    'intro'   => 'Cromwell sits along the Connecticut River between Middletown and Rocky Hill — a quietly growing suburb with family neighborhoods, convenient I-91 access, and an active real estate market. ' . SITE_NAME . ' serves Cromwell homeowners and renters with professional cleaning built around your schedule.',
    'highlights' => [
      'Move-in / move-out cleaning for Cromwell\'s growing housing market',
      'Family recurring maintenance in Cromwell\'s established neighborhoods',
      'Convenient I-91 access makes same-day visits possible',
    ],
    'featured'=> ['residential','moveinout','recurring'],
    'areas'   => ['Cromwell Center','West Cromwell','Main Street corridor','Nooks Hill Road area','Connecticut River waterfront'],
    'nearby'  => [['name'=>'Rocky Hill','slug'=>'rocky-hill-ct'],['name'=>'Middletown','slug'=>'middletown-ct'],['name'=>'Berlin','slug'=>'berlin-ct'],['name'=>'Glastonbury','slug'=>'glastonbury-ct']],
    'faq_extra' => [
      ['q'=>'Do you offer move-in and move-out cleaning in Cromwell, CT?',
       'a'=>'Yes. Cromwell has an active rental and real estate market and move-in/move-out cleaning is a frequent request. We can typically schedule within 48–72 hours and provide a cleaning checklist on completion.'],
      ['q'=>'Can you do same-day cleaning in Cromwell?',
       'a'=>'Same-day service is available depending on team availability. Cromwell\'s I-91 accessibility makes it easy for our teams to reach on short notice. Book online and we\'ll confirm within 2 hours.'],
    ],
  ],

  /* ─── New Britain ─── */
  'new-britain-ct' => [
    'name'    => 'New Britain',
    'county'  => 'Hartford County',
    'zip'     => '06050',
    'lat'     => 41.6612, 'lng' => -72.7795,
    'intro'   => 'New Britain — Connecticut\'s "Hardware City" — is a resilient urban community undergoing significant renovation and revitalization. With active construction, a dense apartment and condo market, and a growing commercial corridor on Main Street, ' . SITE_NAME . '\'s post-construction, commercial, and apartment cleaning services are in high demand here.',
    'highlights' => [
      'Post-construction & renovation cleaning for New Britain\'s revitalization projects',
      'Commercial cleaning for Main Street offices, retail & healthcare',
      'Apartment & condo cleaning across New Britain\'s multi-unit properties',
    ],
    'featured'=> ['commercial','postconstruct','condo'],
    'areas'   => ['Downtown New Britain','Broad Street','West End','East Side','Stanley Quarter Park area'],
    'nearby'  => [['name'=>'Berlin','slug'=>'berlin-ct'],['name'=>'Southington','slug'=>'southington-ct'],['name'=>'Plainville','slug'=>'plainville-ct'],['name'=>'Bristol','slug'=>'bristol-ct']],
    'faq_extra' => [
      ['q'=>'Do you offer post-construction and renovation cleaning in New Britain?',
       'a'=>'Yes — renovation cleaning is one of our most-requested New Britain services. We clear fine dust, adhesive residue, grout haze, and construction debris from newly renovated apartments, commercial spaces, and homes.'],
      ['q'=>'Do you clean apartments and multi-unit properties in New Britain?',
       'a'=>'Yes. We work with New Britain landlords, property managers, and tenants for apartment turnovers, move-in/move-out cleans, and recurring maintenance across multi-unit buildings. Volume discounts available for property managers.'],
    ],
  ],

];

/* ═══════════════════════════════════════════════
   Routing
════════════════════════════════════════════════ */
$slug = preg_replace('/[^a-z0-9-]/', '', strtolower($_GET['slug'] ?? ''));
if (!isset($cities[$slug])) {
  http_response_code(404);
  header('Location: /');
  exit;
}
$city      = $cities[$slug];
$city_name = $city['name'];
$county    = $city['county'];
$url_path  = '/cleaning-services-' . $slug . '/';

/* ─── Per-service paragraphs (city name woven in for each service) ─── */
$svc_body = [
  'residential'   => $city_name . "'s homes — from established family neighborhoods to newly built developments — deserve more than a surface wipe. " . SITE_NAME . "'s residential deep clean delivers a meticulous room-by-room transformation of your " . $city_name . " home. Every counter, baseboard, appliance exterior, bathroom, and floor is addressed. Whether it's your first professional clean or a seasonal reset, we bring all supplies and leave nothing overlooked.",
  'condo'         => "Condos and apartments throughout " . $city_name . " come with their own challenges: building access protocols, HOA requirements, and shared-building consideration. " . SITE_NAME . " is experienced cleaning condos and multi-unit properties across " . $city_name . " — efficient, respectful of neighbors, and fully compliant with building standards.",
  'commercial'    => "Your " . $city_name . " office, retail space, or commercial facility reflects directly on your brand. " . SITE_NAME . " provides professional commercial cleaning throughout " . $city_name . " — covering offices, waiting rooms, conference rooms, restrooms, and break areas. We offer early-morning, after-hours, and overnight scheduling so your " . $city_name . " business is never interrupted.",
  'airbnb'        => "Short-term rental hosts in " . $city_name . " know that cleanliness drives five-star reviews — and five-star reviews drive bookings. " . SITE_NAME . "'s Airbnb and short-term rental turnover service handles the complete " . $city_name . " property between guests: full clean, linen change, supply check, and photo confirmation. We work around your check-in and check-out windows so your " . $city_name . " listing is always guest-ready.",
  'moveinout'     => "Whether you're vacating a rental in " . $city_name . ", handing back keys to a landlord, or moving into your new " . $city_name . " home, " . SITE_NAME . " provides thorough move-in and move-out cleaning that covers the full property — every room, inside every cabinet, inside every appliance, and every bathroom. We clean to the standard " . $city_name . " landlords and property managers expect, and we provide a completed cleaning checklist on request.",
  'postconstruct' => "Renovation and new construction in " . $city_name . " always leave behind what you can't easily see: fine drywall dust settled in vents, adhesive residue on surfaces, paint overspray on glass, and construction debris in corners. " . SITE_NAME . "'s post-construction cleaning team arrives with HEPA-filter vacuums and specialist products to bring your " . $city_name . " property to a genuinely move-in or open-for-business standard — not just swept.",
  'estate'        => $city_name . "'s finest homes require a different level of care. " . SITE_NAME . "'s Luxury Estate Care service is available by appointment throughout " . $city_name . " and includes a dedicated account manager, a bespoke room-by-room cleaning programme, the same senior background-checked team at every visit, and premium eco-certified product selection matched to your specific surfaces. Full discretion and NDA available.",
  'event'         => "Hosting a private gathering, corporate event, or formal occasion in " . $city_name . "? " . SITE_NAME . " handles both pre-event preparation — full venue clean, surface polish, restroom prep — and post-event cleanup and reset for properties throughout " . $city_name . ". Same-day event cleaning is available and we coordinate around your guest schedule.",
  'recurring'     => "The most consistently clean " . $city_name . " homes and offices are on a recurring maintenance plan. " . SITE_NAME . "'s weekly, bi-weekly, and monthly recurring service assigns you the same trusted team each visit, keeps your " . $city_name . " property in year-round pristine condition, and saves you up to 15% versus one-time bookings. Pause or adjust your plan anytime.",
];

/* ─── Page meta ─── */
$page_title    = 'Cleaning Services in ' . $city_name . ', CT — ' . SITE_NAME;
$page_desc     = 'Professional cleaning in ' . $city_name . ', CT. Residential, condo, commercial, Airbnb, move-in/out & more. Eco-certified, fully insured, background-checked. 100% satisfaction guarantee. Instant online booking.';
$page_canonical = SITE_URL . $url_path;

/* ─── Schema ─── */
$page_schema = json_encode([
  '@context' => 'https://schema.org',
  '@graph'   => [
    [
      '@type'      => 'Service',
      '@id'        => $page_canonical . '#service',
      'name'       => 'Professional Cleaning Services in ' . $city_name . ', CT',
      'provider'   => ['@id' => SITE_URL . '/#business'],
      'areaServed' => ['@type' => 'City', 'name' => $city_name, 'containedIn' => ['@type' => 'State', 'name' => 'Connecticut']],
      'url'        => $page_canonical,
      'description'=> $page_desc,
      'offers'     => array_values(array_map(fn($k,$s) => ['@type'=>'Offer','name'=>$s['title'],'itemOffered'=>['@type'=>'Service','name'=>$s['title'].' in '.$city_name.', CT']], array_keys($all_services), $all_services)),
    ],
    [
      '@type'           => 'BreadcrumbList',
      'itemListElement' => [
        ['@type'=>'ListItem','position'=>1,'name'=>'Home',   'item'=> SITE_URL . '/'],
        ['@type'=>'ListItem','position'=>2,'name'=>'Services','item'=> SITE_URL . '/services.php'],
        ['@type'=>'ListItem','position'=>3,'name'=>$city_name . ' Cleaning','item'=> $page_canonical],
      ],
    ],
    [
      '@type'      => 'FAQPage',
      'mainEntity' => array_map(fn($faq) => [
        '@type'          => 'Question',
        'name'           => $faq['q'],
        'acceptedAnswer' => ['@type' => 'Answer', 'text' => $faq['a']],
      ], array_merge($city['faq_extra'], [
        ['q'=>'How much does cleaning cost in '.$city_name.', CT?', 'a'=>'Pricing starts from $160 for homes under 1,000 sq ft. Use our free online quote tool for an instant estimate based on your space, service type, and frequency.'],
        ['q'=>'Are your cleaners background-checked and insured in '.$city_name.'?', 'a'=>'Yes. Every '.SITE_NAME.' team member is fully insured, bonded, and passes a rigorous background check before serving any '.$city_name.' client.'],
        ['q'=>'Do you use eco-friendly products in '.$city_name.'?', 'a'=>'Absolutely. We use only premium, eco-certified, non-toxic solutions — safe for children, pets, and the environment. No harsh chemicals, ever.'],
      ])),
    ],
  ],
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

$page_head_extra = '<link rel="preload" as="image" href="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=90" fetchpriority="high"/>';

require_once 'includes/header.php';
require_once 'includes/navbar.php';
?>

<main>

<!-- ══════════════════════════════════════════════
     HERO
══════════════════════════════════════════════ -->
<section class="relative flex flex-col overflow-hidden" style="min-height:65vh;background:var(--forest)">

  <div class="hero-photo-bg"    aria-hidden="true"></div>
  <div class="hero-video-overlay" aria-hidden="true"></div>
  <div class="hero-bg-grid"    aria-hidden="true" style="opacity:.45"></div>
  <div class="orb orb-1"       aria-hidden="true"></div>
  <div class="orb orb-2"       aria-hidden="true"></div>

  <div class="flex-1 flex items-end pb-24">
    <div class="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10 pt-36">

      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" class="mb-6">
        <ol class="flex flex-wrap items-center gap-2" style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35)">
          <li><a href="/" style="color:rgba(255,255,255,0.5);transition:color .2s" onmouseover="this.style.color='var(--mint)'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">Home</a></li>
          <li aria-hidden="true" style="color:rgba(255,255,255,0.2)">›</li>
          <li><a href="/services.php" style="color:rgba(255,255,255,0.5);transition:color .2s" onmouseover="this.style.color='var(--mint)'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">Services</a></li>
          <li aria-hidden="true" style="color:rgba(255,255,255,0.2)">›</li>
          <li style="color:var(--mint)"><?= htmlspecialchars($city_name) ?>, CT</li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">

        <!-- Left: headline -->
        <div>
          <div class="section-label mb-5">
            <span class="label-line"></span>
            <span><?= htmlspecialchars($county) ?></span>
          </div>
          <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-weight:400;font-size:clamp(2.8rem,6vw,5rem);line-height:1.06;letter-spacing:-0.01em;color:#fff;margin-bottom:20px">
            Professional Cleaning<br>in <em style="color:var(--mint);font-style:italic"><?= htmlspecialchars($city_name) ?>, CT</em>
          </h1>
          <p style="color:rgba(255,255,255,0.60);font-size:1rem;line-height:1.8;font-family:'Inter',sans-serif;max-width:480px;margin-bottom:32px">
            <?= htmlspecialchars($city['intro']) ?>
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="/book.php" class="btn-primary">
              Get a Free Quote
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="/services.php" class="btn-ghost">All Services</a>
          </div>
        </div>

        <!-- Right: highlights -->
        <div class="hidden lg:block">
          <div style="background:rgba(255,255,255,0.05);backdrop-filter:blur(12px);border:1px solid rgba(200,132,90,0.2);border-radius:20px;padding:28px">
            <p style="font-family:'Space Grotesk',sans-serif;font-size:0.62rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--mint);margin-bottom:16px">Why <?= htmlspecialchars($city_name) ?> Chooses Us</p>
            <?php foreach ($city['highlights'] as $h): ?>
            <div class="flex items-start gap-3 mb-3" style="font-size:0.88rem;color:rgba(255,255,255,0.75);font-family:'Inter',sans-serif;line-height:1.5">
              <svg style="color:var(--mint);flex-shrink:0;margin-top:3px" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
              <?= htmlspecialchars($h) ?>
            </div>
            <?php endforeach; ?>
            <div class="flex flex-wrap gap-3 mt-5 pt-5" style="border-top:1px solid rgba(200,132,90,0.15)">
              <?php foreach (['500+ Homes Cleaned','4.9★ Google Rating','100% Satisfaction','Fully Insured'] as $b): ?>
              <span style="font-family:'Space Grotesk',sans-serif;font-size:0.62rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.45)"><?= $b ?></span>
              <?php endforeach; ?>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div class="absolute bottom-0 inset-x-0 z-10">
    <?php require_once 'includes/trust-marquee.php'; ?>
  </div>
</section>


<!-- ══════════════════════════════════════════════
     FEATURED SERVICES (city-specific)
══════════════════════════════════════════════ -->
<section style="background:var(--surface);padding:6rem 0">
  <div class="max-w-7xl mx-auto px-6 md:px-10">

    <div class="mb-12 reveal-up">
      <div class="section-label mb-4">
        <span class="label-line"></span>
        <span>Most Requested in <?= htmlspecialchars($city_name) ?></span>
      </div>
      <h2 class="section-heading">Top Services for <em><?= htmlspecialchars($city_name) ?></em></h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <?php foreach ($city['featured'] as $key):
        $svc = $all_services[$key];
      ?>
      <div class="reveal-up" style="background:var(--forest);border-radius:20px;padding:32px;border:1px solid rgba(200,132,90,0.15);position:relative;overflow:hidden">
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--mint),var(--mint-light))"></div>
        <div style="font-size:2.2rem;margin-bottom:16px;line-height:1"><?= $svc['icon'] ?></div>
        <h3 style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1rem;color:#fff;margin-bottom:8px"><?= htmlspecialchars($svc['title']) ?></h3>
        <p style="font-size:0.85rem;color:rgba(255,255,255,0.55);line-height:1.7;margin-bottom:20px"><?= htmlspecialchars($svc['desc']) ?></p>
        <div class="flex gap-4 flex-wrap">
          <a href="<?= htmlspecialchars($service_page_urls[$key] ?? '/book.php') ?>"
             style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--mint);display:inline-flex;align-items:center;gap:6px;text-decoration:none;transition:color .2s"
             onmouseover="this.style.color='var(--mint-light)'" onmouseout="this.style.color='var(--mint)'">
            Learn More
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="/book.php"
             style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.45);display:inline-flex;align-items:center;gap:5px;text-decoration:none;transition:color .2s"
             onmouseover="this.style.color='rgba(255,255,255,0.8)'" onmouseout="this.style.color='rgba(255,255,255,0.45)'">
            Book Now →
          </a>
        </div>
      </div>
      <?php endforeach; ?>
    </div>

  </div>
</section>


<!-- ══════════════════════════════════════════════
     ALL SERVICES — descriptive blocks with city name
     woven into each paragraph for SEO co-occurrence
══════════════════════════════════════════════ -->
<section style="background:#fff;padding:5rem 0 6rem">
  <div class="max-w-4xl mx-auto px-6 md:px-10">

    <div class="mb-12 reveal-up">
      <div class="section-label mb-4">
        <span class="label-line"></span>
        <span>Every Service in <?= htmlspecialchars($city_name) ?></span>
      </div>
      <h2 class="section-heading">Complete Cleaning Services <em>in <?= htmlspecialchars($city_name) ?></em></h2>
      <p style="color:var(--text-soft);font-family:'Inter',sans-serif;font-size:0.95rem;line-height:1.75;margin-top:12px;max-width:600px">
        <?= SITE_NAME ?> offers every type of professional cleaning in <?= htmlspecialchars($city_name) ?>, CT. Click any service to see full details, checklists, and pricing.
      </p>
    </div>

    <div class="space-y-0">
      <?php foreach ($all_services as $key => $svc):
        $svc_url = $service_page_urls[$key] ?? '/book.php';
        $body    = $svc_body[$key] ?? $svc['desc'] . ' Available throughout ' . $city_name . ', CT.';
      ?>
      <div class="reveal-up" style="padding:28px 0;border-bottom:1px solid rgba(200,132,90,0.14)">
        <div class="flex items-start gap-5">

          <!-- Icon -->
          <div style="font-size:1.8rem;line-height:1;flex-shrink:0;margin-top:4px;width:2.2rem;text-align:center"><?= $svc['icon'] ?></div>

          <!-- Content -->
          <div style="flex:1;min-width:0">
            <h3 style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1rem;color:var(--forest);margin-bottom:8px;line-height:1.3">
              <a href="<?= htmlspecialchars($svc_url) ?>" style="color:var(--forest);text-decoration:none;transition:color .2s" onmouseover="this.style.color='var(--mint-dark)'" onmouseout="this.style.color='var(--forest)'">
                <?= htmlspecialchars($svc['title']) ?> in <?= htmlspecialchars($city_name) ?>
              </a>
            </h3>
            <p style="font-size:0.88rem;color:var(--text-soft);line-height:1.75;font-family:'Inter',sans-serif;margin-bottom:14px">
              <?= htmlspecialchars($body) ?>
            </p>
            <div class="flex flex-wrap gap-4 items-center">
              <a href="<?= htmlspecialchars($svc_url) ?>" style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--mint-dark);text-decoration:none;display:inline-flex;align-items:center;gap:5px;transition:color .2s" onmouseover="this.style.color='var(--forest)'" onmouseout="this.style.color='var(--mint-dark)'">
                Full Service Details
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="/book.php" style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);text-decoration:none;transition:color .2s" onmouseover="this.style.color='var(--forest)'" onmouseout="this.style.color='var(--text-muted)'">
                Book in <?= htmlspecialchars($city_name) ?> →
              </a>
            </div>
          </div>

        </div>
      </div>
      <?php endforeach; ?>
    </div>

    <div class="mt-10 text-center">
      <a href="/book.php" class="btn-primary inline-flex">
        Book a Cleaning in <?= htmlspecialchars($city_name) ?>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>

  </div>
</section>


<!-- ══════════════════════════════════════════════
     WHY CHOOSE US
══════════════════════════════════════════════ -->
<section style="background:var(--forest);padding:6rem 0;position:relative;overflow:hidden">
  <div class="absolute inset-0 pointer-events-none" style="background-image:linear-gradient(rgba(200,132,90,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(200,132,90,0.05) 1px,transparent 1px);background-size:64px 64px"></div>
  <div class="max-w-7xl mx-auto px-6 md:px-10 relative z-10">

    <div class="text-center mb-14 reveal-up">
      <div class="section-label justify-center mb-5" style="color:var(--mint)">
        <span class="label-line"></span>
        <span>Why <?= htmlspecialchars($city_name) ?> Trusts Us</span>
        <span class="label-line"></span>
      </div>
      <h2 class="section-heading-white">The <?= SITE_NAME ?> <em>Difference</em></h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <?php
      $reasons = [
        ['n'=>'01','title'=>'Vetted & Background-Checked','body'=>'Every team member passes a full background check and 40-hour training before entering any '.$city_name.' property.'],
        ['n'=>'02','title'=>'Eco-Certified Products',    'body'=>'Non-toxic, eco-certified solutions — safe for your family, pets, and the Connecticut environment.'],
        ['n'=>'03','title'=>'100% Satisfaction Guarantee','body'=>'Not satisfied? We return within 24 hours and make it right — completely free. No questions asked.'],
        ['n'=>'04','title'=>'Fully Insured & Bonded',    'body'=>'Every job is backed by full liability insurance and bonding. Your '.$city_name.' property is protected.'],
        ['n'=>'05','title'=>'Transparent Online Booking', 'body'=>'Book in 60 seconds, get instant pricing, and manage everything from your phone. No paperwork.'],
        ['n'=>'06','title'=>'Always On Time',             'body'=>'We respect your schedule. Our teams arrive in the promised window with a same-day reminder.'],
      ];
      foreach ($reasons as $r): ?>
      <div class="step-card reveal-up" style="background:rgba(255,255,255,0.04);border:1px solid rgba(200,132,90,0.12)">
        <span class="step-num" style="color:rgba(200,132,90,0.10)"><?= $r['n'] ?></span>
        <h3 class="step-title" style="color:#fff;margin-bottom:8px"><?= htmlspecialchars($r['title']) ?></h3>
        <p style="font-size:0.88rem;line-height:1.7;color:rgba(255,255,255,0.50)"><?= htmlspecialchars($r['body']) ?></p>
      </div>
      <?php endforeach; ?>
    </div>

  </div>
</section>


<!-- ══════════════════════════════════════════════
     SERVICE AREA & NEARBY CITIES
══════════════════════════════════════════════ -->
<section style="background:var(--surface);padding:5rem 0">
  <div class="max-w-7xl mx-auto px-6 md:px-10">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      <div class="reveal-left">
        <div class="section-label mb-4">
          <span class="label-line"></span>
          <span>Service Coverage</span>
        </div>
        <h2 class="section-heading mb-6">
          Serving All of <em><?= htmlspecialchars($city_name) ?></em>
        </h2>
        <p style="color:var(--text-soft);line-height:1.8;font-family:'Inter',sans-serif;font-size:0.95rem;margin-bottom:20px">
          We cover every neighborhood in <?= htmlspecialchars($city_name) ?>, including
          <?= implode(', ', array_map('htmlspecialchars', $city['areas'])) ?>.
          Our local teams know the area and take pride in serving their neighbors.
        </p>

        <?php if (!empty($city['nearby'])): ?>
        <div style="margin-top:28px">
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.62rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--mint);margin-bottom:12px">We Also Serve Nearby</p>
          <div class="flex flex-wrap gap-2">
            <?php foreach ($city['nearby'] as $nb): ?>
            <a href="/cleaning-services-<?= htmlspecialchars($nb['slug']) ?>/"
               style="padding:6px 16px;border-radius:100px;background:#fff;border:1px solid rgba(200,132,90,0.22);font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;color:var(--forest);text-decoration:none;transition:all .2s;display:inline-block"
               onmouseover="this.style.borderColor='var(--mint)';this.style.color='var(--mint-dark)'"
               onmouseout="this.style.borderColor='rgba(200,132,90,0.22)';this.style.color='var(--forest)'">
              <?= htmlspecialchars($nb['name']) ?>, CT
            </a>
            <?php endforeach; ?>
          </div>
        </div>
        <?php endif; ?>
      </div>

      <div class="reveal-right">
        <div style="background:var(--forest);border-radius:24px;padding:36px;border:1px solid rgba(200,132,90,0.15)">
          <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.5rem;font-weight:400;color:#fff;margin-bottom:24px">
            Trusted by <em style="color:var(--mint)">500+</em> Connecticut Clients
          </h3>
          <div class="grid grid-cols-2 gap-4 mb-6">
            <?php foreach (['4.9★ Google Rating','500+ Spaces Cleaned','100% Satisfaction','8+ Years in CT'] as $s): ?>
            <div style="padding:14px;background:rgba(255,255,255,0.04);border-radius:12px;border:1px solid rgba(200,132,90,0.1)">
              <div style="font-family:'Space Grotesk',sans-serif;font-size:0.78rem;font-weight:700;color:var(--mint);line-height:1.2"><?= explode(' ',$s,2)[0] ?></div>
              <div style="font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-top:4px"><?= explode(' ',$s,2)[1] ?></div>
            </div>
            <?php endforeach; ?>
          </div>
          <a href="/book.php" class="btn-primary" style="display:inline-flex">
            Book in <?= htmlspecialchars($city_name) ?>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>

    </div>
  </div>
</section>


<!-- ══════════════════════════════════════════════
     FAQ (city-specific)
══════════════════════════════════════════════ -->
<section style="background:#fff;padding:6rem 0">
  <div class="max-w-3xl mx-auto px-6 md:px-10">

    <div class="text-center mb-12 reveal-up">
      <div class="section-label justify-center mb-4">
        <span class="label-line"></span>
        <span>FAQ — <?= htmlspecialchars($city_name) ?></span>
        <span class="label-line"></span>
      </div>
      <h2 class="section-heading">
        Questions About Cleaning in <em><?= htmlspecialchars($city_name) ?>?</em>
      </h2>
    </div>

    <?php
    $faqs = array_merge($city['faq_extra'], [
      ['q'=>'How much does cleaning cost in '.$city_name.', CT?',
       'a'=>'Residential cleaning starts from $160 for homes under 1,000 sq ft. Pricing varies by space size, service type, and frequency. Use our free online quote tool for an instant estimate — no commitment required.'],
      ['q'=>'Are your cleaners background-checked and insured in '.$city_name.'?',
       'a'=>'Yes. Every '.SITE_NAME.' team member is fully insured, bonded, and passes a rigorous background check before entering any '.$city_name.' home or business.'],
      ['q'=>'Do you use eco-friendly products in '.$city_name.'?',
       'a'=>'Absolutely. We use only premium, eco-certified, non-toxic cleaning solutions — safe for children, pets, and the Connecticut environment. No harsh chemicals, ever.'],
    ]);
    ?>

    <div class="space-y-3">
      <?php foreach ($faqs as $i => $faq): ?>
      <div class="reveal-up" style="border:1px solid rgba(200,132,90,0.18);border-radius:14px;overflow:hidden">
        <button
          onclick="var b=this.nextElementSibling;var a=this.querySelector('.faq-arr');b.style.display=b.style.display==='block'?'none':'block';a.textContent=b.style.display==='block'?'−':'+';"
          style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:18px 22px;background:#fff;border:none;cursor:pointer;font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:600;color:var(--forest);text-align:left;gap:12px"
          onmouseover="this.style.background='var(--surface)'" onmouseout="this.style.background='#fff'">
          <?= htmlspecialchars($faq['q']) ?>
          <span class="faq-arr" style="font-size:1.2rem;flex-shrink:0;color:var(--mint);font-weight:400;line-height:1">+</span>
        </button>
        <div style="display:none;padding:0 22px 18px;background:#fff">
          <p style="font-size:0.88rem;line-height:1.75;color:var(--text-soft);font-family:'Inter',sans-serif;border-top:1px solid rgba(200,132,90,0.12);padding-top:14px"><?= htmlspecialchars($faq['a']) ?></p>
        </div>
      </div>
      <?php endforeach; ?>
    </div>

  </div>
</section>


<!-- ══════════════════════════════════════════════
     FINAL CTA
══════════════════════════════════════════════ -->
<section style="background:var(--forest);padding:6rem 0;text-align:center;position:relative;overflow:hidden">
  <div class="absolute inset-0 pointer-events-none" style="background-image:linear-gradient(rgba(200,132,90,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(200,132,90,0.06) 1px,transparent 1px);background-size:64px 64px"></div>
  <div class="relative z-10 max-w-2xl mx-auto px-6">
    <div class="section-label justify-center mb-6" style="color:var(--mint)">
      <span class="label-line"></span>
      <span><?= htmlspecialchars($city_name) ?>, <?= $city['county'] ?></span>
      <span class="label-line"></span>
    </div>
    <h2 class="section-heading-white mb-4">
      Ready for a Spotless <em><?= htmlspecialchars($city_name) ?>?</em>
    </h2>
    <p style="font-family:'Inter',sans-serif;font-size:0.95rem;color:rgba(255,255,255,0.55);font-style:italic;margin-bottom:36px">
      Book online in 60 seconds. No commitment — we confirm within 2 hours.
    </p>
    <div class="flex flex-wrap gap-4 justify-center">
      <a href="/book.php" class="btn-primary">
        Get a Free Quote
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
      <a href="tel:<?= preg_replace('/[^0-9+]/', '', SITE_PHONE) ?>" class="btn-ghost">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.72 10.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.63 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 7.61a16 16 0 006.29 6.29l.98-.87a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
        <?= SITE_PHONE ?>
      </a>
    </div>
  </div>
</section>

</main>

<?php require_once 'includes/footer.php'; ?>
