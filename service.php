<?php
require_once 'config/config.php';

/* ═══════════════════════════════════════════════
   Service page definitions
════════════════════════════════════════════════ */
$services = [

  /* ── Residential ── */
  'residential-cleaning' => [
    'title'     => 'Residential Deep Cleaning',
    'headline'  => 'Residential <em>Deep Cleaning</em>',
    'tagline'   => 'Every room. Every surface. Guaranteed.',
    'icon'      => '🏠',
    'hero_desc' => 'Our flagship residential deep clean is a meticulous, room-by-room transformation of your home. Whether it\'s a seasonal reset, a pre-sale preparation, or your first professional clean, we leave no surface unpolished and no corner overlooked.',
    'includes'  => [
      ['heading'=>'Kitchen','items'=>['Appliance exteriors, handles & knobs','Sink, faucet & surrounding tile','Countertops & backsplash','Cabinet faces & drawer fronts','Microwave interior & exhaust fan','Stovetop, burners & drip pans']],
      ['heading'=>'Bathrooms','items'=>['Toilet inside & out (bowl, tank, base)','Shower, tub & grout scrub','Vanity, mirror & fixtures','Floor mopped & sanitized','Towel bars & accessories wiped']],
      ['heading'=>'Living Areas & Bedrooms','items'=>['Dust all surfaces & furniture','Vacuum upholstery & under cushions','Baseboards, trim & door frames','Interior windows & sills','Ceiling fans & light fixtures','Floors vacuumed and/or mopped']],
      ['heading'=>'Add-Ons Available','items'=>['Inside oven (+$30)','Inside fridge (+$25)','Inside cabinets (+$40)','Interior windows (+$50)','Laundry & fold (+$35)','Garage sweep (+$60)']],
    ],
    'process'   => [
      ['n'=>'01','title'=>'Book Online in 60 Seconds','body'=>'Choose your space size, select add-ons, pick a date — get an instant price estimate. No commitment until you confirm.'],
      ['n'=>'02','title'=>'We Arrive & Transform','body'=>'A trained, background-checked team arrives in the promised window. We bring all supplies and equipment — you don\'t need to provide anything.'],
      ['n'=>'03','title'=>'Walk Through & Approve','body'=>'We\'ll walk through the home with you at the end. Anything that\'s not perfect, we fix on the spot. Your satisfaction is guaranteed.'],
    ],
    'pricing'   => [
      ['tier'=>'Under 1,000 sq ft','price'=>'from $160'],
      ['tier'=>'1,001 – 1,500 sq ft','price'=>'from $210'],
      ['tier'=>'1,500+ sq ft','price'=>'from $270'],
    ],
    'cities'    => ['west-hartford-ct','hartford-ct','newington-ct','berlin-ct','farmington-ct','wethersfield-ct','glastonbury-ct','manchester-ct','bloomfield-ct','avon-ct','rocky-hill-ct','southington-ct','plainville-ct','bristol-ct','new-britain-ct','canton-ct','simsbury-ct','windsor-ct','east-hartford-ct','south-windsor-ct','cheshire-ct','burlington-ct','cromwell-ct'],
    'city_label'=> 'Residential Cleaning Near You',
    'faq' => [
      ['q'=>'What is included in a residential deep clean?','a'=>'Our residential deep clean covers every room: kitchen (appliances, counters, sink, stovetop), all bathrooms (toilet, tub, shower, vanity), living areas (dusting, vacuuming, mopping), and bedrooms. Baseboards, door frames, ceiling fans, and interior windows are included. See the full checklist above for all details.'],
      ['q'=>'How long does a residential deep clean take?','a'=>'A typical 3-bedroom home takes 3–4 hours with a 2-person team. Larger homes or heavily soiled spaces take longer. We give you an estimated duration when you book and update you if it changes.'],
      ['q'=>'Do I need to be home during the cleaning?','a'=>'No. Many clients provide keybox or lockbox access. We\'ll send a completion notification when we\'re done and lock up securely. If you\'re home, we\'re happy to work around you.'],
      ['q'=>'How often should I get a deep clean?','a'=>'Most clients do a deep clean every 3–6 months alongside regular maintenance visits. First-time clients often get a deep clean as a one-off, then transition to bi-weekly recurring maintenance at a 10% discount.'],
      ['q'=>'Do you bring your own cleaning supplies?','a'=>'Yes. We bring all equipment and eco-certified, non-toxic cleaning products. You don\'t need to provide anything — just let us in.'],
    ],
  ],

  /* ── Commercial ── */
  'commercial-cleaning' => [
    'title'     => 'Office & Commercial Cleaning',
    'headline'  => 'Office <em>& Commercial</em> Cleaning',
    'tagline'   => 'A spotless workspace. A stronger first impression.',
    'icon'      => '🏢',
    'hero_desc' => 'Your workspace is a direct reflection of your brand. ' . SITE_NAME . '\'s commercial cleaning service covers offices, retail spaces, medical suites, restaurants, and commercial facilities throughout Central Connecticut — discreet, efficient, and thorough.',
    'includes'  => [
      ['heading'=>'Office Cleaning','items'=>['Desk surfaces, phones & equipment wiped','Reception area detailed & sanitized','Conference rooms cleaned & reset','Break room / kitchen deep cleaned','Restrooms disinfected & restocked','Floors vacuumed and/or mopped']],
      ['heading'=>'Common Areas','items'=>['Lobbies & entry ways detailed','Elevator interiors (if applicable)','Stairwells and corridors','Window sills and ledges','Trash removal & liner replacement','High-touch surface disinfection']],
      ['heading'=>'Retail & Specialty','items'=>['Display areas dusted & polished','Fitting rooms cleaned','Back-of-house & stockrooms','Glass storefronts & displays','Floor buffing & polishing','Restroom deep clean & restock']],
      ['heading'=>'Scheduling Options','items'=>['Daily, weekly, or monthly contracts','Early morning (before 7am) service','After-hours & overnight service','Same-day emergency cleans','Certificate of insurance on request','HIPAA-aware protocols for medical']],
    ],
    'process'   => [
      ['n'=>'01','title'=>'Free Walk-Through & Quote','body'=>'We visit your property, assess scope, and provide a transparent flat-rate or per-visit quote — no hidden charges, no surprises.'],
      ['n'=>'02','title'=>'Scheduled Service Begins','body'=>'Your dedicated team arrives at the agreed time — before, during, or after business hours. We\'re discreet and professional around your staff and clients.'],
      ['n'=>'03','title'=>'Consistent Quality, Every Visit','body'=>'The same team returns each scheduled visit. You get consistency, reliability, and a direct contact for any changes or requests.'],
    ],
    'pricing'   => [
      ['tier'=>'Small office (up to 1,000 sq ft)','price'=>'from $140/visit'],
      ['tier'=>'Medium office (1,001–1,500 sq ft)','price'=>'from $185/visit'],
      ['tier'=>'Large commercial (1,500+ sq ft)','price'=>'Custom quote'],
    ],
    'cities'    => ['hartford-ct','west-hartford-ct','manchester-ct','new-britain-ct','bristol-ct','east-hartford-ct','bloomfield-ct','windsor-ct','newington-ct','southington-ct'],
    'city_label'=> 'Commercial Cleaning — Connecticut Locations',
    'faq' => [
      ['q'=>'Do you offer after-hours commercial cleaning in Connecticut?','a'=>'Yes. We offer early-morning (before 7am), evening, and overnight cleaning for businesses that need service outside business hours. This is included in all commercial agreements at no extra scheduling fee.'],
      ['q'=>'Can you provide a certificate of insurance for our property manager?','a'=>'Yes. We carry full general liability insurance and are bonded. A certificate of insurance can be provided to property managers, building owners, or tenants upon request.'],
      ['q'=>'Do you have experience with medical or dental offices?','a'=>'Yes. We follow HIPAA-aware cleaning protocols for medical and dental offices — proper disposal, surface disinfection standards, and professional discretion around patient areas.'],
      ['q'=>'What is the minimum contract length for commercial cleaning?','a'=>'We offer month-to-month agreements with no long-term contract required. Recurring clients receive priority scheduling and locked-in rates. Most clients sign 3-month agreements once they see the results.'],
      ['q'=>'Do you clean retail and restaurant spaces?','a'=>'Yes. We clean retail stores, showrooms, and restaurant dining areas (pre-opening or post-close). Kitchen deep cleans are available as a separate specialist service.'],
    ],
  ],

  /* ── Move-Out ── */
  'move-out-cleaning' => [
    'title'     => 'Move In / Move Out Cleaning',
    'headline'  => 'Move In <em>/ Move Out</em> Cleaning',
    'tagline'   => 'Get your deposit back. Leave nothing behind.',
    'icon'      => '📦',
    'hero_desc' => 'Moving is stressful enough. Our move-in / move-out cleaning service handles the full property — every room, cabinet, appliance, baseboard, and bathroom — so you can hand back keys with confidence or move into a truly clean home.',
    'includes'  => [
      ['heading'=>'Every Room','items'=>['Walls spot-cleaned','Baseboards & door frames wiped','Light switches & outlet covers cleaned','Windows & sills interior','Ceiling fans & light fixtures','Floors vacuumed & mopped']],
      ['heading'=>'Kitchen','items'=>['Inside oven, including racks','Inside fridge & freezer','Inside all cabinets & drawers','Sink, faucet & garbage disposal','Counters & backsplash','Stovetop, burners & hood']],
      ['heading'=>'Bathrooms','items'=>['Toilet (bowl, tank, base, seat)','Shower & tub — grout scrubbed','Vanity, mirror & medicine cabinet','Floor sanitized','Exhaust fan dusted']],
      ['heading'=>'Extras Included','items'=>['All closets vacuumed & wiped','Garage sweep (if applicable)','Laundry room wiped down','Blinds dusted','Carpet vacuumed thoroughly','Cleaning checklist report provided']],
    ],
    'process'   => [
      ['n'=>'01','title'=>'Book Up to 48 Hours in Advance','body'=>'Select your move date, property size, and any add-ons. Same-day and next-day appointments are often available. We confirm within 2 hours.'],
      ['n'=>'02','title'=>'Full Property Clean','body'=>'Our team works through the entire property — top to bottom, room by room — using our comprehensive 60-point move-out checklist. Nothing is skipped.'],
      ['n'=>'03','title'=>'Checklist & Walkthrough','body'=>'We provide a completed cleaning checklist that you can share with your landlord or property manager. If anything doesn\'t pass inspection, we return free of charge.'],
    ],
    'pricing'   => [
      ['tier'=>'Under 1,000 sq ft','price'=>'from $200'],
      ['tier'=>'1,001 – 1,500 sq ft','price'=>'from $260'],
      ['tier'=>'1,500+ sq ft','price'=>'from $330'],
    ],
    'cities'    => ['west-hartford-ct','hartford-ct','newington-ct','berlin-ct','farmington-ct','wethersfield-ct','glastonbury-ct','manchester-ct','bloomfield-ct','avon-ct','rocky-hill-ct','southington-ct','plainville-ct','bristol-ct','new-britain-ct','canton-ct','simsbury-ct','windsor-ct','east-hartford-ct','south-windsor-ct','cheshire-ct','burlington-ct','cromwell-ct'],
    'city_label'=> 'Move-Out Cleaning Available in These CT Cities',
    'faq' => [
      ['q'=>'Will your move-out clean help me get my security deposit back?','a'=>'Our 60-point move-out checklist is specifically designed to meet standard landlord inspection requirements in Connecticut. We cover every line item — and if anything doesn\'t pass your landlord\'s inspection, we return within 24 hours to make it right at no charge.'],
      ['q'=>'Do you provide a cleaning certificate or checklist for my landlord?','a'=>'Yes. We provide a completed cleaning checklist after every move-out clean. Many Connecticut landlords and property managers recognize our checklists and accept them as documentation.'],
      ['q'=>'How far in advance do I need to book a move-out clean?','a'=>'We recommend booking at least 48 hours in advance, but same-day and next-day appointments are often available. The earlier you book, the more scheduling flexibility you\'ll have around your moving day.'],
      ['q'=>'Do you clean the inside of appliances during a move-out clean?','a'=>'Yes — inside oven, inside fridge, and inside microwave are all included in our standard move-out package. Cabinet interiors are also included at no extra charge.'],
      ['q'=>'Can landlords book move-out cleaning directly?','a'=>'Absolutely. We work with landlords and property managers across Connecticut to prepare units between tenants. Volume discounts available for property managers with multiple units.'],
    ],
  ],

  /* ── Airbnb ── */
  'airbnb-cleaning' => [
    'title'     => 'Airbnb & Short-Term Rental Cleaning',
    'headline'  => 'Airbnb <em>& Short-Term Rental</em> Cleaning',
    'tagline'   => 'Guest-ready in hours. Five-star reviews every time.',
    'icon'      => '🛎',
    'hero_desc' => 'Your Airbnb rating depends on cleanliness above everything else. ' . SITE_NAME . '\'s short-term rental turnover service is built for speed and precision — rapid guest-to-guest turnaround, linen-ready, photo-ready, and review-worthy every single time.',
    'includes'  => [
      ['heading'=>'Full Turnover Clean','items'=>['All rooms vacuumed, mopped & dusted','Bathroom deep clean & sanitize','Kitchen wiped, sanitized & restocked','All linens changed & made hotel-style','Towels fresh-folded & placed','Trash removed & bins relined']],
      ['heading'=>'Guest-Ready Details','items'=>['Welcome area tidied & reset','Fridge checked — expired items removed','Dishes washed & stored','Mirrors & glass streak-free','Windows & sills wiped','Shower & tub scrubbed to gleaming']],
      ['heading'=>'Host Support','items'=>['Damage & maintenance reporting','Supply inventory check','Guest amenity restocking (on request)','Photo confirmation on completion','Key-box and smart-lock compatible','Flexible same-day scheduling']],
      ['heading'=>'Integration Options','items'=>['iCal / Airbnb calendar sync support','Automated booking reminders','WhatsApp / text completion updates','Emergency same-day availability','Multi-property management discounts','Regular host rates & priority slots']],
    ],
    'process'   => [
      ['n'=>'01','title'=>'Sync Your Booking Calendar','body'=>'Share your Airbnb or VRBO calendar with us. We auto-schedule turnovers around your guest check-ins — no manual booking needed for regular clients.'],
      ['n'=>'02','title'=>'Rapid Expert Turnover','body'=>'Our Airbnb-specialist team arrives within the check-out/check-in window. We complete the full turnover — typically 2–3 hours for a 2-bedroom listing.'],
      ['n'=>'03','title'=>'Photo Confirmation Sent','body'=>'We send a photo report when the property is ready. You can check in remotely and greet your guests with total confidence in the state of the listing.'],
    ],
    'pricing'   => [
      ['tier'=>'Studio / 1-bed','price'=>'from $95/turnover'],
      ['tier'=>'2–3 bedroom','price'=>'from $145/turnover'],
      ['tier'=>'4+ bedroom / house','price'=>'Custom rate'],
    ],
    'cities'    => ['hartford-ct','bloomfield-ct','manchester-ct','bristol-ct','west-hartford-ct','windsor-ct','east-hartford-ct','south-windsor-ct','newington-ct','glastonbury-ct'],
    'city_label'=> 'Airbnb Cleaning — Connecticut Cities We Serve',
    'faq' => [
      ['q'=>'How quickly can you turn over an Airbnb in Connecticut?','a'=>'Most 1-2 bedroom turnovers are completed in 2–3 hours. Larger properties take 3–5 hours. For same-day turnovers with tight check-in/check-out windows, book us as your first-priority cleaning service — we keep slots reserved for active Airbnb hosts.'],
      ['q'=>'Do you handle linen changes and towel folding?','a'=>'Yes. Fresh linen changes, hotel-style bed-making, and towel folding are all included in our standard Airbnb turnover. We can also manage linen logistics (washing on-site or via laundry service) for an additional fee.'],
      ['q'=>'Can I book recurring turnovers for my Airbnb property?','a'=>'Yes — and we recommend it. Regular Airbnb clients get priority scheduling, locked-in rates, and a dedicated team familiar with your property. We can sync with your Airbnb or VRBO calendar to auto-schedule.'],
      ['q'=>'Do you check for damage and report it to the host?','a'=>'Yes. Our team does a basic condition check during every turnover and will report any visible damage, maintenance issues, or unusual guest activity via text or WhatsApp immediately after the clean.'],
      ['q'=>'What areas of Connecticut do you cover for Airbnb cleaning?','a'=>'We cover Hartford, Bloomfield, Manchester, Bristol, West Hartford, Windsor, East Hartford, South Windsor, Newington, Glastonbury, and surrounding towns. Contact us to confirm availability for your specific address.'],
    ],
  ],

  /* ── Post-Construction ── */
  'post-construction-cleaning' => [
    'title'     => 'Post-Construction Cleaning',
    'headline'  => 'Post-<em>Construction</em> Cleaning',
    'tagline'   => 'The dust stops here. Your new space, finally revealed.',
    'icon'      => '🔨',
    'hero_desc' => 'Construction and renovation leave behind fine dust, adhesive residue, paint overspray, and debris invisible to the untrained eye. ' . SITE_NAME . '\'s specialist post-construction cleaning team uses professional equipment to reveal your new or renovated space exactly as it was designed.',
    'includes'  => [
      ['heading'=>'Rough & Detail Phase','items'=>['Construction debris & waste removal','Drywall dust from all surfaces','Window frame & sill cleaning','Vent covers cleaned or replaced','Ceiling fan & fixture installation dust','Sticker, label & tape residue removal']],
      ['heading'=>'Fine-Finish Phase','items'=>['All floors: deep scrub, polish & seal','Paint overspray & splatter removal','Grout haze removal (tile areas)','Cabinet interiors wiped & vacuumed','Appliance installation cleaning','All glass & mirrors streak-free']],
      ['heading'=>'Final Walkthrough','items'=>['Room-by-room inspection with checklist','Touch-up cleaning on any missed areas','Handover ready for move-in or staging','Documentation for general contractor','Builder-grade or white-glove level','Available on short builder timelines']],
      ['heading'=>'Who It\'s For','items'=>['New home builds in CT','Kitchen & bathroom renovations','Basement finishing projects','Commercial fit-outs & office renovations','Additions & extensions','Multi-unit development turnovers']],
    ],
    'process'   => [
      ['n'=>'01','title'=>'Schedule After Final Trades','body'=>'Book us for after your last contractor leaves. We handle the complete cleanup — you don\'t need to pre-clean or remove debris before our arrival.'],
      ['n'=>'02','title'=>'Specialist Team & Equipment','body'=>'Our post-construction team arrives with HEPA-filter vacuums, professional floor equipment, and specialist products for paint, adhesive, and grout residue.'],
      ['n'=>'03','title'=>'Move-In Ready','body'=>'We deliver the space genuinely clean — not just swept. Your new home or renovated commercial space is ready for photography, staging, or immediate occupancy.'],
    ],
    'pricing'   => [
      ['tier'=>'Under 1,000 sq ft','price'=>'from $240'],
      ['tier'=>'1,001 – 1,500 sq ft','price'=>'from $310'],
      ['tier'=>'1,500+ sq ft','price'=>'from $400'],
    ],
    'cities'    => ['southington-ct','new-britain-ct','avon-ct','berlin-ct','bristol-ct','canton-ct','burlington-ct','south-windsor-ct','manchester-ct','east-hartford-ct'],
    'city_label'=> 'Post-Construction Cleaning — Connecticut Locations',
    'faq' => [
      ['q'=>'What makes post-construction cleaning different from regular cleaning?','a'=>'Construction creates fine drywall dust, adhesive residue, paint overspray, grout haze, and debris that regular cleaning equipment simply cannot remove effectively. Our post-construction team uses HEPA vacuums, professional floor machines, and specialist solvents for true construction-grade cleanup.'],
      ['q'=>'When should I schedule post-construction cleaning?','a'=>'Schedule after the last trade has left and before any furniture is moved in or photography takes place. A day or two after final walkthrough is ideal. We can work to your builder or contractor timeline.'],
      ['q'=>'Do you work directly with builders and general contractors?','a'=>'Yes. We regularly work with Connecticut GCs, builders, and developers as their preferred post-construction cleaning partner. We provide documentation for project closeouts and can be invoiced directly by the GC.'],
      ['q'=>'Do you clean after kitchen and bathroom renovations specifically?','a'=>'Yes. Kitchen and bathroom renovations are our most common post-construction requests. Grout haze removal, cabinet interior cleaning, tile polishing, and appliance installation dust are all included.'],
      ['q'=>'How long does post-construction cleaning take?','a'=>'A standard 2,000 sq ft home typically takes 6–8 hours with a 2-person team. Heavy construction or multi-story homes may require a full day or two visits. We\'ll assess and confirm timing when you book.'],
    ],
  ],

  /* ── Deep Cleaning ── */
  'deep-cleaning' => [
    'title'     => 'Deep Cleaning Service',
    'headline'  => 'Professional <em>Deep Cleaning</em>',
    'tagline'   => 'Beyond the surface. Down to spotless.',
    'icon'      => '🧹',
    'hero_desc' => 'A deep clean goes far beyond routine maintenance — it\'s a top-to-bottom reset that tackles built-up grime, neglected corners, grout, inside appliances, and every surface that regular cleaning misses. ' . SITE_NAME . '\'s deep cleaning service is the ideal first-time clean, spring clean, post-illness sanitization, or pre-listing preparation for any Connecticut home.',
    'includes'  => [
      ['heading'=>'Surfaces & Details','items'=>['Inside oven — racks, walls, door glass','Inside fridge & freezer — full wipe-out','Inside all cabinets & drawers','Grout scrub in all tile areas','Baseboards hand-wiped throughout','Blinds & shutter slats cleaned']],
      ['heading'=>'Rooms & Floors','items'=>['All ceiling fans & light fixtures','Tops of all cabinets & furniture','Under and behind furniture (moved)','Window sills & tracks inside','Interior windows streak-free','Floors scrubbed & polished (not just mopped)']],
      ['heading'=>'Bathrooms Deep','items'=>['Toilet base, tank, seat & bowl','Shower/tub grout & caulk scrub','Mineral deposit removal on fixtures','Exhaust fan housing cleaned','Vanity interior wiped','Mirror & glass streak-free']],
      ['heading'=>'Who It\'s For','items'=>['First-time professional cleaning clients','Spring and seasonal deep clean','Pre-sale or pre-listing preparation','Post-illness or post-renovation sanitization','Moving into a previously occupied home','Any home that hasn\'t had a professional clean in 3+ months']],
    ],
    'process'   => [
      ['n'=>'01','title'=>'Book Online with Instant Price','body'=>'Choose your space size and any specific add-ons. Get an instant price estimate — no commitment. We confirm within 2 hours of booking.'],
      ['n'=>'02','title'=>'Expert Team Arrives Fully Equipped','body'=>'Our deep clean team brings all professional equipment and eco-certified products. We follow a 60-point checklist so nothing is forgotten, no matter the size of the property.'],
      ['n'=>'03','title'=>'Walk Through & Guarantee','body'=>'At the end of your deep clean, we walk through the home together. Anything that doesn\'t meet your standard, we address immediately. Your satisfaction is fully guaranteed.'],
    ],
    'pricing'   => [
      ['tier'=>'Under 1,000 sq ft','price'=>'from $180'],
      ['tier'=>'1,001 – 1,500 sq ft','price'=>'from $235'],
      ['tier'=>'1,500+ sq ft','price'=>'from $300'],
    ],
    'cities'    => ['west-hartford-ct','hartford-ct','newington-ct','berlin-ct','farmington-ct','wethersfield-ct','glastonbury-ct','manchester-ct','bloomfield-ct','avon-ct','rocky-hill-ct','southington-ct','plainville-ct','bristol-ct','new-britain-ct','canton-ct','simsbury-ct','windsor-ct','east-hartford-ct','south-windsor-ct','cheshire-ct','burlington-ct','cromwell-ct'],
    'city_label'=> 'Deep Cleaning Service — Connecticut Locations',
    'faq' => [
      ['q'=>'What is the difference between a deep clean and a regular clean?','a'=>'A regular clean maintains an already-clean home — dusting, wiping, vacuuming, mopping. A deep clean goes much further: inside ovens and fridges, inside cabinets and drawers, grout scrubbing, blind cleaning, under and behind furniture, and every surface that regular maintenance skips. We recommend a deep clean before starting any recurring maintenance plan.'],
      ['q'=>'How long does a deep clean take in Connecticut?','a'=>'A typical 3-bedroom home takes 4–6 hours with a 2-person team. Larger homes or heavily soiled spaces take longer. We provide an estimated duration when you book and keep you updated if it changes.'],
      ['q'=>'Do I need a deep clean before starting a recurring maintenance plan?','a'=>'We recommend it, but it\'s not required. Starting with a deep clean gives us a clean baseline, which means your ongoing maintenance visits take less time and cost less. Many clients start with a deep clean and then move to bi-weekly or monthly maintenance.'],
      ['q'=>'How often should I get a professional deep clean?','a'=>'Most Connecticut homeowners deep-clean every 3–6 months alongside regular maintenance, or once annually as a full seasonal reset. High-traffic households, pet owners, or allergy sufferers may benefit from deep cleaning every 2–3 months.'],
      ['q'=>'Do you bring your own equipment for the deep clean?','a'=>'Yes. We bring all professional equipment, HEPA-filter vacuums, and eco-certified, non-toxic cleaning products. You don\'t need to provide anything.'],
    ],
  ],

  /* ── Event Prep ── */
  'event-prep-cleaning' => [
    'title'     => 'Event Preparation Cleaning',
    'headline'  => 'Event <em>Preparation Cleaning</em>',
    'tagline'   => 'Before every guest arrives. After every guest leaves.',
    'icon'      => '🎉',
    'hero_desc' => 'First impressions at any event begin the moment guests arrive. ' . SITE_NAME . '\'s event preparation and post-event cleaning service ensures your home, estate, or venue in Connecticut is immaculate before your gathering — and fully reset after. Private dinners, galas, corporate events, holiday parties — we handle every size and style.',
    'includes'  => [
      ['heading'=>'Pre-Event Preparation','items'=>['Full property or venue clean','All surfaces polished & streak-free','Restrooms fully stocked & sparkling','Entry areas & arrival spaces detailed','Dining and entertaining areas set','Outdoor areas swept (if applicable)']],
      ['heading'=>'Post-Event Cleanup','items'=>['Full venue clean after all guests leave','Catering and food waste removal','Glassware & dishes collected & washed','Linen collection & laundry coordination','Furniture reset to original arrangement','Final inspection & condition report']],
      ['heading'=>'Special Services','items'=>['White-glove silver & crystal polishing','Floral removal & disposal coordination','Marquee or tent interior cleaning','Damage documentation for event insurance','Rush turnaround for back-to-back events','Overnight teams available']],
      ['heading'=>'Event Types We Serve','items'=>['Private dinner parties & celebrations','Wedding receptions & rehearsal dinners','Corporate galas & holiday parties','Charity events & fundraisers','Estate open house preparations','Short-notice same-day event cleaning']],
    ],
    'process'   => [
      ['n'=>'01','title'=>'Book Your Event Dates Early','body'=>'Event cleaning slots fill quickly around holidays and weekends. Book as soon as your event date is confirmed. We can hold both pre-event and post-event slots together.'],
      ['n'=>'02','title'=>'Pre-Event Team Arrives','body'=>'We arrive at your specified time before guests — typically 2–4 hours prior. The full property is cleaned, polished, and ready. We leave quietly before guests arrive.'],
      ['n'=>'03','title'=>'Post-Event Full Reset','body'=>'After your event ends, our team returns for the full cleanup and reset. We handle everything — you wake up to a home that looks exactly as it did before your guests arrived.'],
    ],
    'pricing'   => [
      ['tier'=>'Pre-event only','price'=>'from $175'],
      ['tier'=>'Post-event only','price'=>'from $195'],
      ['tier'=>'Full (pre + post)','price'=>'from $325'],
    ],
    'cities'    => ['hartford-ct','west-hartford-ct','farmington-ct','glastonbury-ct','simsbury-ct','avon-ct','canton-ct','wethersfield-ct','manchester-ct','cheshire-ct'],
    'city_label'=> 'Event Cleaning — Connecticut Venues & Private Homes',
    'faq' => [
      ['q'=>'How far in advance should I book event cleaning in Connecticut?','a'=>'As soon as your event date is confirmed. Weekend and holiday slots fill 2–4 weeks in advance for larger events. For smaller gatherings (under 20 guests), 1 week\'s notice is usually sufficient. For same-day event cleaning, call us directly to check availability.'],
      ['q'=>'Do you offer both pre-event and post-event cleaning?','a'=>'Yes. We offer pre-event only, post-event only, or both combined at a discounted package rate. Most clients who book pre-event cleaning also book the post-event reset — it means you can enjoy your event without worrying about cleanup.'],
      ['q'=>'Can you clean a large estate or private venue for an event?','a'=>'Yes. We regularly handle large estate events in Farmington, Glastonbury, Simsbury, Avon, and throughout Hartford County. Our estate cleaning team is experienced with high-value properties and can coordinate around caterers, florists, and other event vendors.'],
      ['q'=>'Do you handle catering and food waste cleanup after events?','a'=>'Yes. Post-event cleanup includes catering waste removal, food disposal, dish and glassware collection, and any spill treatment. We coordinate with your caterer if needed.'],
      ['q'=>'Is same-day event cleaning available?','a'=>'Yes for smaller events with short-notice availability. Call us directly for same-day bookings — we keep emergency slots available in our schedule for last-minute requests.'],
    ],
  ],

  /* ── Recurring Maintenance ── */
  'recurring-cleaning' => [
    'title'     => 'Recurring Cleaning Service',
    'headline'  => 'Recurring <em>Cleaning Service</em>',
    'tagline'   => 'Same team. Every visit. Always spotless.',
    'icon'      => '🔄',
    'hero_desc' => 'The most consistently clean homes and offices in Connecticut share one thing: a recurring maintenance plan with ' . SITE_NAME . '. Weekly, bi-weekly, or monthly visits from the same trusted team — predictable scheduling, locked-in pricing, and up to 15% savings versus one-time bookings. Set it once. Enjoy it forever.',
    'includes'  => [
      ['heading'=>'Every Visit Includes','items'=>['All rooms vacuumed and/or mopped','Kitchen surfaces wiped & sanitized','Bathroom cleaned & disinfected','Trash emptied & bins relined','Surfaces dusted throughout','Glass, mirrors & stovetop streak-free']],
      ['heading'=>'Plan Flexibility','items'=>['Weekly, bi-weekly, or monthly plans','Same assigned team at every visit','Easy pause or reschedule with 24hrs notice','Add deep-clean extras anytime','Key & access management handled securely','Online account to manage your plan']],
      ['heading'=>'Savings Structure','items'=>['Weekly plan — save 15% per visit','Bi-weekly plan — save 10% per visit','Monthly plan — save 5% per visit','First deep clean discount for new plans','Referral credit for each friend you refer','No long-term contract required']],
      ['heading'=>'Works For','items'=>['Busy families and professional households','Second homes & seasonal properties','Small offices and commercial suites','Rental properties between tenants','Airbnb hosts on regular cleaning schedules','Anyone who wants a consistently clean space']],
    ],
    'process'   => [
      ['n'=>'01','title'=>'Choose Your Plan & Book','body'=>'Select weekly, bi-weekly, or monthly. Book your first visit online — we confirm within 2 hours. Your recurring schedule is automatically set from that first date.'],
      ['n'=>'02','title'=>'Meet Your Dedicated Team','body'=>'Your first visit assigns you a specific team. They learn your home, your preferences, and your standards. Every subsequent visit, the same team returns — no re-explaining, no surprises.'],
      ['n'=>'03','title'=>'Consistent Quality, Every Time','body'=>'Each visit follows a standard checklist plus any custom preferences you\'ve set. Your account manager checks in quarterly, and you can adjust or pause your plan at any time with 24 hours\' notice.'],
    ],
    'pricing'   => [
      ['tier'=>'Monthly (5% off)','price'=>'from $152/visit'],
      ['tier'=>'Bi-weekly (10% off)','price'=>'from $144/visit'],
      ['tier'=>'Weekly (15% off)','price'=>'from $136/visit'],
    ],
    'cities'    => ['west-hartford-ct','hartford-ct','newington-ct','berlin-ct','farmington-ct','wethersfield-ct','glastonbury-ct','manchester-ct','bloomfield-ct','avon-ct','rocky-hill-ct','southington-ct','plainville-ct','bristol-ct','new-britain-ct','canton-ct','simsbury-ct','windsor-ct','east-hartford-ct','south-windsor-ct','cheshire-ct','burlington-ct','cromwell-ct'],
    'city_label'=> 'Recurring Cleaning Plans — All Connecticut Cities',
    'faq' => [
      ['q'=>'Is there a long-term contract for recurring cleaning in Connecticut?','a'=>'No long-term contract is required. Our recurring plans are month-to-month. You can pause, reschedule, or cancel with 24 hours\' notice. Most clients stay because of the results — not because they\'re locked in.'],
      ['q'=>'Will I get the same cleaning team every visit?','a'=>'Yes. We assign a dedicated team to your home from your first visit. They learn your property, your preferences, and your standards. If your team is ever unavailable, we notify you in advance and send a trained substitute who is fully briefed.'],
      ['q'=>'What is included in a recurring maintenance visit vs. a deep clean?','a'=>'A recurring visit covers the standard maintenance tasks: all rooms vacuumed/mopped, kitchen and bathroom cleaned, surfaces dusted, trash emptied, glass streak-free. It maintains an already-clean home. A deep clean goes further (inside appliances, grout, inside cabinets) and is recommended as a starting point before any recurring plan begins.'],
      ['q'=>'Can I add deep-clean tasks to a recurring visit?','a'=>'Yes. You can add individual deep-clean extras (inside oven, inside fridge, inside cabinets, windows, etc.) to any recurring visit at standard add-on pricing. You can request add-ons through your account or by contacting your account manager.'],
      ['q'=>'How do you handle key and access management for recurring clients?','a'=>'Many recurring clients provide a key, lockbox code, or building access. All access information is stored securely, shared only with your assigned team, and destroyed immediately if you cancel. We carry full liability insurance covering any access-related incidents.'],
    ],
  ],

  /* ── Luxury Estate ── */
  'luxury-estate-cleaning' => [
    'title'     => 'Luxury Estate Cleaning',
    'headline'  => 'Luxury <em>Estate Cleaning</em>',
    'tagline'   => 'White-glove care. For homes that demand it.',
    'icon'      => '✨',
    'hero_desc' => 'High-value properties require a different level of care — precision-trained staff, premium products, total discretion, and a tailored programme built around your specific home, your schedule, and your standards. ' . SITE_NAME . '\'s Luxury Estate Care is available by appointment throughout Central Connecticut.',
    'includes'  => [
      ['heading'=>'White-Glove Standard','items'=>['Dedicated account manager assigned','Same senior team every visit','Bespoke cleaning programme for your home','Premium eco-certified product selection','Separate equipment set per property','Pre-visit walkthrough with homeowner']],
      ['heading'=>'Full-Home Care','items'=>['All rooms, including staff areas','Fine art & antique surface protocols','Silver, crystal & specialty surface care','Marble, limestone & natural stone care','Hardwood floor specialist treatment','Exterior entry & mudroom cleaning']],
      ['heading'=>'Discretion & Security','items'=>['Full background-check & NDA available','Key & access code management','No subcontractors — our team only','Insurance certificate on request','Alarm system management protocol','Pet care awareness during visit']],
      ['heading'=>'Flexible Scheduling','items'=>['Weekly, bi-weekly, or monthly visits','Seasonal deep-clean add-ons','Pre-event preparation available','Post-event cleanup & reset','Multiple-property management','Primary & secondary home coordination']],
    ],
    'process'   => [
      ['n'=>'01','title'=>'Consultation & Home Walkthrough','body'=>'We begin with an in-person walkthrough. Your account manager documents every room, surface material, and special requirement before a single clean begins.'],
      ['n'=>'02','title'=>'Bespoke Programme Delivered','body'=>'We build a room-by-room cleaning programme tailored to your home. Premium products are selected specifically for your surfaces. The same senior team is assigned to your property.'],
      ['n'=>'03','title'=>'Ongoing Care & Communication','body'=>'Your account manager is your direct contact. We report any maintenance concerns, check in after every visit, and adjust the programme as your needs evolve.'],
    ],
    'pricing'   => [
      ['tier'=>'Under 3,000 sq ft','price'=>'from $300/visit'],
      ['tier'=>'3,000 – 5,000 sq ft','price'=>'from $390/visit'],
      ['tier'=>'5,000+ sq ft / estate','price'=>'Custom programme'],
    ],
    'cities'    => ['farmington-ct','glastonbury-ct','avon-ct','west-hartford-ct','simsbury-ct','canton-ct','burlington-ct','cheshire-ct','wethersfield-ct','southington-ct'],
    'city_label'=> 'Luxury Estate Cleaning — Serving Connecticut\'s Premier Communities',
    'faq' => [
      ['q'=>'What makes your luxury estate service different from a standard clean?','a'=>'Luxury Estate Care includes a dedicated account manager, the same senior background-checked team at every visit, a bespoke room-by-room cleaning programme, premium product selection matched to your specific surfaces, and full discretion. It\'s a professional relationship, not a one-off booking.'],
      ['q'=>'Do you sign NDAs for high-profile or celebrity clients?','a'=>'Yes. Non-disclosure agreements are available for any client who requires them. Discretion is fundamental to our estate service — we do not discuss our clients, their properties, or their schedules.'],
      ['q'=>'Can you care for fine art, antiques, and specialty surfaces?','a'=>'Yes. Our estate team is trained in surface-specific protocols for marble, limestone, natural stone, original hardwood, antique furniture, silver, crystal, and fine art. We will not use any product on a specialty surface without confirming suitability first.'],
      ['q'=>'Do you service secondary homes and seasonal properties in Connecticut?','a'=>'Yes. We regularly handle seasonal open-up and close-down cleans for second homes in Connecticut, as well as recurring maintenance during occupancy. Multiple-property coordination is available under a single account.'],
      ['q'=>'How do I get started with luxury estate cleaning?','a'=>'Contact us to arrange an initial home consultation and walkthrough. Your account manager will assess the property, discuss your requirements, and provide a bespoke programme proposal — typically within 48 hours.'],
    ],
  ],

];

/* ═══════════════════════════════════════════════
   City name lookup (for "Cities We Serve" section)
════════════════════════════════════════════════ */
$city_names = [
  'west-hartford-ct'=>'West Hartford','hartford-ct'=>'Hartford','newington-ct'=>'Newington',
  'berlin-ct'=>'Berlin','farmington-ct'=>'Farmington','wethersfield-ct'=>'Wethersfield',
  'glastonbury-ct'=>'Glastonbury','manchester-ct'=>'Manchester','bloomfield-ct'=>'Bloomfield',
  'avon-ct'=>'Avon','rocky-hill-ct'=>'Rocky Hill','southington-ct'=>'Southington',
  'plainville-ct'=>'Plainville','bristol-ct'=>'Bristol','new-britain-ct'=>'New Britain',
  'canton-ct'=>'Canton','simsbury-ct'=>'Simsbury','windsor-ct'=>'Windsor',
  'east-hartford-ct'=>'East Hartford','south-windsor-ct'=>'South Windsor',
  'cheshire-ct'=>'Cheshire','burlington-ct'=>'Burlington','cromwell-ct'=>'Cromwell',
];

/* ═══════════════════════════════════════════════
   Routing
════════════════════════════════════════════════ */
$slug = preg_replace('/[^a-z0-9-]/', '', strtolower($_GET['slug'] ?? ''));
if (!isset($services[$slug])) {
  http_response_code(404);
  header('Location: /services.php');
  exit;
}
$svc = $services[$slug];
$url_path = '/' . $slug . '/';

/* ─── Page meta ─── */
$page_title     = $svc['title'] . ' in Connecticut — ' . SITE_NAME;
$page_desc      = strip_tags($svc['headline']) . ' serving West Hartford, Hartford, Farmington, and Central Connecticut. Eco-certified, fully insured, 100% satisfaction guaranteed. Book online instantly.';
$page_canonical = SITE_URL . $url_path;

/* ─── Schema ─── */
$page_schema = json_encode([
  '@context' => 'https://schema.org',
  '@graph'   => [
    [
      '@type'       => 'Service',
      '@id'         => $page_canonical . '#service',
      'name'        => $svc['title'] . ' — ' . SITE_NAME,
      'provider'    => ['@id' => SITE_URL . '/#business'],
      'areaServed'  => ['@type' => 'State', 'name' => 'Connecticut'],
      'url'         => $page_canonical,
      'description' => strip_tags($svc['hero_desc']),
    ],
    [
      '@type'           => 'BreadcrumbList',
      'itemListElement' => [
        ['@type'=>'ListItem','position'=>1,'name'=>'Home',    'item'=> SITE_URL . '/'],
        ['@type'=>'ListItem','position'=>2,'name'=>'Services','item'=> SITE_URL . '/services.php'],
        ['@type'=>'ListItem','position'=>3,'name'=>$svc['title'],'item'=> $page_canonical],
      ],
    ],
    [
      '@type'      => 'FAQPage',
      'mainEntity' => array_map(fn($f) => [
        '@type'          => 'Question',
        'name'           => $f['q'],
        'acceptedAnswer' => ['@type' => 'Answer', 'text' => $f['a']],
      ], $svc['faq']),
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
<section class="relative flex flex-col overflow-hidden" style="min-height:60vh;background:var(--forest)">

  <div class="hero-photo-bg"     aria-hidden="true"></div>
  <div class="hero-video-overlay" aria-hidden="true"></div>
  <div class="hero-bg-grid"     aria-hidden="true" style="opacity:.4"></div>
  <div class="orb orb-1"        aria-hidden="true"></div>
  <div class="orb orb-2"        aria-hidden="true"></div>

  <div class="flex-1 flex items-end pb-24">
    <div class="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10 pt-36">

      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" class="mb-6">
        <ol class="flex flex-wrap items-center gap-2" style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35)">
          <li><a href="/" style="color:rgba(255,255,255,0.5);transition:color .2s" onmouseover="this.style.color='var(--mint)'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">Home</a></li>
          <li style="color:rgba(255,255,255,0.2)">›</li>
          <li><a href="/services.php" style="color:rgba(255,255,255,0.5);transition:color .2s" onmouseover="this.style.color='var(--mint)'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">Services</a></li>
          <li style="color:rgba(255,255,255,0.2)">›</li>
          <li style="color:var(--mint)"><?= htmlspecialchars($svc['title']) ?></li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
        <div>
          <div class="section-label mb-5">
            <span class="label-line"></span>
            <span>Connecticut</span>
          </div>
          <h1 class="section-heading-white mb-5" style="font-size:clamp(2.6rem,5.5vw,4.5rem)">
            <?= $svc['headline'] ?>
          </h1>
          <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.35rem;font-weight:400;font-style:italic;color:var(--mint-light);margin-bottom:20px"><?= $svc['tagline'] ?></p>
          <p style="color:rgba(255,255,255,0.60);font-size:0.95rem;line-height:1.8;font-family:'Inter',sans-serif;max-width:500px;margin-bottom:32px"><?= $svc['hero_desc'] ?></p>
          <div class="flex flex-wrap gap-4">
            <a href="/book.php" class="btn-primary">
              Get a Free Quote
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="tel:<?= preg_replace('/[^0-9+]/', '', SITE_PHONE) ?>" class="btn-ghost">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.72 10.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.63 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 7.61a16 16 0 006.29 6.29l.98-.87a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              <?= SITE_PHONE ?>
            </a>
          </div>
        </div>

        <!-- Trust sidebar -->
        <div class="hidden lg:block">
          <div style="background:rgba(255,255,255,0.05);backdrop-filter:blur(12px);border:1px solid rgba(200,132,90,0.2);border-radius:20px;padding:28px 28px 24px">
            <p style="font-family:'Space Grotesk',sans-serif;font-size:0.62rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--mint);margin-bottom:16px">Why Choose <?= SITE_NAME ?></p>
            <?php foreach (['Eco-certified, non-toxic products','Fully insured & background-checked team','100% satisfaction guarantee','Same-team consistency every visit','Book online — instant price estimate','Serving all of Central Connecticut'] as $t): ?>
            <div class="flex items-center gap-3 mb-3" style="font-size:0.88rem;color:rgba(255,255,255,0.72);font-family:'Inter',sans-serif">
              <svg style="color:var(--mint);flex-shrink:0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
              <?= $t ?>
            </div>
            <?php endforeach; ?>
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
     WHAT'S INCLUDED
══════════════════════════════════════════════ -->
<section style="background:#fff;padding:6rem 0">
  <div class="max-w-7xl mx-auto px-6 md:px-10">

    <div class="mb-12 reveal-up">
      <div class="section-label mb-4">
        <span class="label-line"></span>
        <span>Full Checklist</span>
      </div>
      <h2 class="section-heading">What's <em>Included</em></h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <?php foreach ($svc['includes'] as $block): ?>
      <div class="reveal-up p-6 rounded-2xl" style="border:1px solid rgba(200,132,90,0.18);background:var(--surface)">
        <h3 style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.78rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--mint);margin-bottom:16px"><?= htmlspecialchars($block['heading']) ?></h3>
        <ul class="space-y-2">
          <?php foreach ($block['items'] as $item): ?>
          <li class="flex items-start gap-2.5" style="font-size:0.875rem;color:var(--text-soft);font-family:'Inter',sans-serif;line-height:1.55">
            <svg style="color:var(--mint);flex-shrink:0;margin-top:3px" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            <?= htmlspecialchars($item) ?>
          </li>
          <?php endforeach; ?>
        </ul>
      </div>
      <?php endforeach; ?>
    </div>

  </div>
</section>


<!-- ══════════════════════════════════════════════
     HOW IT WORKS
══════════════════════════════════════════════ -->
<section style="background:var(--forest);padding:6rem 0;position:relative;overflow:hidden">
  <div class="absolute inset-0 pointer-events-none" style="background-image:linear-gradient(rgba(200,132,90,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(200,132,90,0.05) 1px,transparent 1px);background-size:64px 64px"></div>
  <div class="max-w-7xl mx-auto px-6 md:px-10 relative z-10">

    <div class="text-center mb-14 reveal-up">
      <div class="section-label justify-center mb-5" style="color:var(--mint)">
        <span class="label-line"></span>
        <span>The Process</span>
        <span class="label-line"></span>
      </div>
      <h2 class="section-heading-white">How It <em>Works</em></h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <?php foreach ($svc['process'] as $step): ?>
      <div class="step-card reveal-up" style="background:rgba(255,255,255,0.04);border:1px solid rgba(200,132,90,0.12)">
        <span class="step-num" style="color:rgba(200,132,90,0.10)"><?= $step['n'] ?></span>
        <h3 class="step-title" style="color:#fff;margin-bottom:8px"><?= htmlspecialchars($step['title']) ?></h3>
        <p style="font-size:0.88rem;line-height:1.7;color:rgba(255,255,255,0.55)"><?= htmlspecialchars($step['body']) ?></p>
      </div>
      <?php endforeach; ?>
    </div>

  </div>
</section>


<!-- ══════════════════════════════════════════════
     PRICING
══════════════════════════════════════════════ -->
<section style="background:var(--surface);padding:5rem 0">
  <div class="max-w-4xl mx-auto px-6 md:px-10 text-center">

    <div class="mb-10 reveal-up">
      <div class="section-label justify-center mb-4">
        <span class="label-line"></span>
        <span>Pricing</span>
        <span class="label-line"></span>
      </div>
      <h2 class="section-heading">Transparent <em>Pricing</em></h2>
      <p style="color:var(--text-soft);font-family:'Inter',sans-serif;font-size:0.95rem;margin-top:12px">Instant estimate online — no commitment until you confirm. No hidden fees.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-<?= count($svc['pricing']) ?> gap-5 mb-8">
      <?php foreach ($svc['pricing'] as $i => $tier): ?>
      <div class="reveal-up p-6 rounded-2xl <?= $i===1?'ring-2 ring-offset-2':'' ?>" style="background:#fff;border:1px solid rgba(200,132,90,<?= $i===1?'0.45':'0.18' ?>);<?= $i===1?'box-shadow:0 8px 32px rgba(200,132,90,0.18)':'' ?>">
        <?php if($i===1): ?><div style="font-family:'Space Grotesk',sans-serif;font-size:0.6rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--mint);margin-bottom:10px">Most Popular</div><?php endif; ?>
        <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:0.95rem;font-weight:500;font-style:italic;color:var(--text-soft);margin-bottom:8px"><?= htmlspecialchars($tier['tier']) ?></div>
        <div style="font-family:'Space Grotesk',sans-serif;font-size:1.8rem;font-weight:800;letter-spacing:-0.03em;color:var(--forest)"><?= htmlspecialchars($tier['price']) ?></div>
      </div>
      <?php endforeach; ?>
    </div>

    <a href="/book.php" class="btn-primary inline-flex">
      Get Your Instant Quote
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>

  </div>
</section>


<!-- ══════════════════════════════════════════════
     CITIES WE SERVE (links back to city pages)
══════════════════════════════════════════════ -->
<section style="background:#fff;padding:5rem 0">
  <div class="max-w-7xl mx-auto px-6 md:px-10">

    <div class="mb-10 reveal-up">
      <div class="section-label mb-4">
        <span class="label-line"></span>
        <span><?= htmlspecialchars($svc['city_label']) ?></span>
      </div>
      <h2 class="section-heading">Connecticut <em>Communities We Serve</em></h2>
      <p style="color:var(--text-soft);font-family:'Inter',sans-serif;font-size:0.95rem;margin-top:10px;max-width:560px">Click any city to see local availability, unique neighbourhood details, and city-specific pricing.</p>
    </div>

    <div class="flex flex-wrap gap-3">
      <?php foreach ($svc['cities'] as $cslug):
        $cname = $city_names[$cslug] ?? ucwords(str_replace(['-ct','-'], ['',' '], $cslug));
      ?>
      <a href="/cleaning-services-<?= htmlspecialchars($cslug) ?>/"
         style="display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:100px;background:var(--surface);border:1px solid rgba(200,132,90,0.22);font-family:'Space Grotesk',sans-serif;font-size:0.78rem;font-weight:600;color:var(--forest);text-decoration:none;transition:all .2s"
         onmouseover="this.style.background='var(--mint-pale)';this.style.borderColor='var(--mint)';this.style.color='var(--forest)'"
         onmouseout="this.style.background='var(--surface)';this.style.borderColor='rgba(200,132,90,0.22)';this.style.color='var(--forest)'">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <?= htmlspecialchars($cname) ?>, CT
      </a>
      <?php endforeach; ?>
    </div>

  </div>
</section>


<!-- ══════════════════════════════════════════════
     FAQ
══════════════════════════════════════════════ -->
<section style="background:var(--surface);padding:6rem 0">
  <div class="max-w-3xl mx-auto px-6 md:px-10">

    <div class="text-center mb-12 reveal-up">
      <div class="section-label justify-center mb-4">
        <span class="label-line"></span>
        <span>FAQ</span>
        <span class="label-line"></span>
      </div>
      <h2 class="section-heading">
        Frequently Asked <em>Questions</em>
      </h2>
    </div>

    <div class="space-y-3">
      <?php foreach ($svc['faq'] as $faq): ?>
      <div class="reveal-up" style="border:1px solid rgba(200,132,90,0.18);border-radius:14px;overflow:hidden">
        <button
          onclick="var b=this.nextElementSibling;var a=this.querySelector('.fa');b.style.display=b.style.display==='block'?'none':'block';a.textContent=b.style.display==='block'?'−':'+';"
          style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:18px 22px;background:#fff;border:none;cursor:pointer;font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:600;color:var(--forest);text-align:left;gap:12px"
          onmouseover="this.style.background='var(--surface)'" onmouseout="this.style.background='#fff'">
          <?= htmlspecialchars($faq['q']) ?>
          <span class="fa" style="font-size:1.2rem;flex-shrink:0;color:var(--mint);font-weight:400;line-height:1">+</span>
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
     CTA
══════════════════════════════════════════════ -->
<section style="background:var(--forest);padding:6rem 0;text-align:center;position:relative;overflow:hidden">
  <div class="absolute inset-0 pointer-events-none" style="background-image:linear-gradient(rgba(200,132,90,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(200,132,90,0.06) 1px,transparent 1px);background-size:64px 64px"></div>
  <div class="relative z-10 max-w-2xl mx-auto px-6">
    <div class="section-label justify-center mb-6" style="color:var(--mint)">
      <span class="label-line"></span>
      <span><?= htmlspecialchars($svc['title']) ?></span>
      <span class="label-line"></span>
    </div>
    <h2 class="section-heading-white mb-4">
      Ready to <em>Book?</em>
    </h2>
    <p style="font-family:'Inter',sans-serif;font-size:0.95rem;color:rgba(255,255,255,0.55);font-style:italic;margin-bottom:36px">
      Get an instant price estimate online. No commitment — we confirm within 2 hours.
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
