<?php
require_once 'config/config.php';
$page_title    = 'Cleaning Services in ' . SITE_CITY . ', CT — ' . SITE_NAME;
$page_desc     = 'Explore our professional cleaning services in West Hartford, CT: residential deep clean, office cleaning, move-out, post-construction, luxury estate care & event prep. Eco-certified, fully insured.';
$page_canonical = SITE_URL . '/services.php';

/* Service ItemList schema */
$page_schema = json_encode([
  '@context' => 'https://schema.org',
  '@type'    => 'ItemList',
  'name'     => 'Professional Cleaning Services — ' . SITE_NAME,
  'url'      => $page_canonical,
  'itemListElement' => [
    ['@type'=>'ListItem','position'=>1,'item'=>['@type'=>'Service','name'=>'Residential Deep Clean',  'url'=>$page_canonical.'#residential-deep-clean',  'provider'=>['@id'=>SITE_URL.'/#business'],'areaServed'=>SITE_CITY.', '.SITE_STATE,'description'=>'Room-by-room deep cleaning for homes. Every surface, corner, and hidden nook — guaranteed.']],
    ['@type'=>'ListItem','position'=>2,'item'=>['@type'=>'Service','name'=>'Office & Commercial Cleaning','url'=>$page_canonical.'#office-commercial',       'provider'=>['@id'=>SITE_URL.'/#business'],'areaServed'=>SITE_CITY.', '.SITE_STATE,'description'=>'Professional cleaning for offices, lobbies, restrooms, and commercial spaces.']],
    ['@type'=>'ListItem','position'=>3,'item'=>['@type'=>'Service','name'=>'Move In / Move Out Cleaning','url'=>$page_canonical.'#move-in-move-out',         'provider'=>['@id'=>SITE_URL.'/#business'],'areaServed'=>SITE_CITY.', '.SITE_STATE,'description'=>'Full property deep clean for tenants and landlords. Every room prepared to perfection.']],
    ['@type'=>'ListItem','position'=>4,'item'=>['@type'=>'Service','name'=>'Post-Construction Cleaning',  'url'=>$page_canonical.'#post-construction',         'provider'=>['@id'=>SITE_URL.'/#business'],'areaServed'=>SITE_CITY.', '.SITE_STATE,'description'=>'Specialist dust, debris, and residue removal after renovations or new construction.']],
    ['@type'=>'ListItem','position'=>5,'item'=>['@type'=>'Service','name'=>'Luxury Estate Care',          'url'=>$page_canonical.'#luxury-estate-care',        'provider'=>['@id'=>SITE_URL.'/#business'],'areaServed'=>SITE_CITY.', '.SITE_STATE,'description'=>'White-glove bespoke care for high-value properties. Bespoke programmes, dedicated manager.']],
    ['@type'=>'ListItem','position'=>6,'item'=>['@type'=>'Service','name'=>'Event Preparation Cleaning',  'url'=>$page_canonical.'#event-preparation',         'provider'=>['@id'=>SITE_URL.'/#business'],'areaServed'=>SITE_CITY.', '.SITE_STATE,'description'=>'Pre and post-event cleaning for private gatherings, galas, and corporate affairs.']],
  ],
], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

$page_head_extra = '<link rel="preload" as="image" href="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=90" fetchpriority="high"/>';

require_once 'includes/header.php';
require_once 'includes/navbar.php';
?>

<main>

<!-- ── Services Hero ──────────────────────────────────── -->
<section class="relative flex flex-col overflow-hidden" style="min-height:62vh">

  <!-- Background layers — same stack as landing page -->
  <div class="hero-photo-bg" aria-hidden="true"></div>
  <div class="hero-video-overlay" aria-hidden="true"></div>
  <div class="hero-bg-grid" aria-hidden="true" style="opacity:.45"></div>
  <div class="orb orb-1" aria-hidden="true"></div>
  <div class="orb orb-2" aria-hidden="true"></div>

  <!-- Hero content -->
  <div class="flex-1 flex items-end pb-20">
    <div class="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10 pt-36">

      <!-- Section label — same component as landing -->
      <div class="section-label mb-5">
        <span class="label-line"></span>
        <span>What We Offer</span>
      </div>

      <!-- Heading — Cormorant Garamond, same as landing page hero -->
      <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-weight:400;font-size:clamp(3.2rem,7vw,6rem);line-height:1.08;letter-spacing:-0.01em;color:#fff;margin-bottom:20px">
        Our <em style="color:var(--mint);font-style:italic">Services</em>
      </h1>

      <!-- Subtext -->
      <p class="max-w-lg" style="color:rgba(255,255,255,0.58);font-size:1.05rem;line-height:1.7;font-family:'Inter',sans-serif">
        Every space is different. Every clean is tailored. Explore what we can do for yours.
      </p>
    </div>
  </div>

  <!-- Trust marquee — same as landing page -->
  <div class="relative z-10">
    <?php require_once 'includes/trust-marquee.php'; ?>
  </div>

</section>


<!-- ── Services Detail ────────────────────────────────── -->
<section style="background:var(--surface);padding:7rem 0">
  <div class="max-w-7xl mx-auto px-6 md:px-10">

    <!-- Section intro — same pattern as home page sections -->
    <div class="mb-16 reveal-up">
      <div class="section-label mb-4">
        <span class="label-line"></span>
        <span>What We Offer</span>
      </div>
      <h2 class="section-heading">Every Clean, <em>Crafted for You</em></h2>
    </div>

    <?php
      $detailed = [
        ['icon'=>'<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>','title'=>'Residential','em'=>'Deep Clean','tag'=>'From 4 hrs','desc'=>'Our flagship service. A meticulous, room-by-room transformation of your home. We tackle every surface, every corner, every hidden nook — with the precision of craftspeople who take their work personally.','includes'=>['Deep clean of all rooms','Inside appliances (oven, fridge, microwave)','Baseboards, light fixtures, vents','Interior windows and tracks','Bathroom detailing & grout treatment','All floors vacuumed, mopped, and buffed']],
        ['icon'=>'<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>','title'=>'Office','em'=>'& Commercial','tag'=>'Custom Plans','desc'=>'Your workspace is a statement. We ensure it reflects the standard of your brand. Discreet, efficient, and comprehensive — from boardrooms to bathrooms, every inch immaculate.','includes'=>['Full office cleaning & sanitisation','Reception & lobby detailing','Restroom deep clean','Kitchen & break room service','Desk and surface disinfection','Floor care and entrance treatment']],
        ['icon'=>'<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>','title'=>'Move In','em'=>'/ Move Out','tag'=>'Full Property','desc'=>'A fresh chapter deserves a spotless stage. We prepare every room for a perfect first impression — or leave the property in pristine condition for the next occupant.','includes'=>['Full property deep clean','Inside all cabinets and drawers','Inside all appliances','Window and blind cleaning','Carpet and floor detailing','Garage sweep if applicable']],
        ['icon'=>'<circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/>','title'=>'Post-','em'=>'Construction','tag'=>'Specialist Team','desc'=>'Construction leaves a trail invisible to the untrained eye. Our specialist team removes dust, debris, residue, and the finest particles — revealing the space exactly as it was designed to be.','includes'=>['Construction dust removal','Paint & adhesive residue removal','Window track and sill detail','All surface wipe-down and polish','Floor scrub and finish','Ventilation and fixture cleaning']],
        ['icon'=>'<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>','title'=>'Luxury','em'=>'Estate Care','tag'=>'By Appointment','desc'=>'Our highest-tier service. A fully bespoke, white-glove care programme for high-value properties. We work around your schedule, your preferences, and your standards — which we promise to exceed.','includes'=>['Bespoke cleaning programme','Dedicated account manager','Premium product selection','Flexible scheduling','Discretion & NDA available','Regular estate maintenance']],
        ['icon'=>'<path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><circle cx="12" cy="13" r="3"/>','title'=>'Event','em'=>'Preparation','tag'=>'Same-Day Avail.','desc'=>'First impressions are made before a word is spoken. We prepare your venue — or restore it — with speed and elegance. Pre-event sparkle, post-event reset.','includes'=>['Pre-event deep clean','Surface polish and sanitisation','Restroom preparation','Post-event full cleanup','Linen & surface reset','Same-day scheduling available']],
      ];
      foreach ($detailed as $i => $s):
        $flip = $i % 2 === 1;
        $slug = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $s['title'].' '.$s['em']));
    ?>
    <div id="<?= $slug ?>" class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 <?= $i > 0 ? 'border-t' : '' ?>" style="<?= $i > 0 ? 'border-color:rgba(7,16,30,0.12);border-top-width:1px;border-top-style:solid' : '' ?>">

      <!-- Content -->
      <div class="<?= $flip ? 'lg:order-2' : '' ?> reveal-left">

        <!-- Eyebrow label — same pattern as home page -->
        <div class="section-label mb-4">
          <span class="label-line"></span>
          <span><?= $s['tag'] ?></span>
        </div>

        <!-- Heading — navy + copper em, matching home page section-heading -->
        <h2 class="section-heading mb-4" style="font-size:clamp(2rem,3.5vw,2.8rem)">
          <?= $s['title'] ?> <em><?= $s['em'] ?></em>
        </h2>
        <p style="color:var(--text-soft);line-height:1.8;margin-bottom:28px;font-style:italic;font-family:'Inter',sans-serif;font-size:0.95rem"><?= $s['desc'] ?></p>

        <!-- Includes grid -->
        <div class="grid grid-cols-2 gap-3 mb-10">
          <?php foreach ($s['includes'] as $inc): ?>
          <div class="flex items-start gap-2.5" style="font-size:0.83rem;color:var(--text-soft);font-family:'Inter',sans-serif">
            <svg style="color:var(--mint);flex-shrink:0;margin-top:3px" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            <?= $inc ?>
          </div>
          <?php endforeach; ?>
        </div>

        <a href="book.php" class="btn-primary inline-flex">
          Book This Service
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>

      <!-- Photo -->
      <div class="<?= $flip ? 'lg:order-1' : '' ?> reveal-right">
        <div style="border-radius:20px;overflow:hidden;box-shadow:0 24px 80px rgba(7,16,30,0.30),0 4px 16px rgba(7,16,30,0.18);aspect-ratio:4/3;position:relative">
          <div class="svc-visual svc-visual-<?= $i+1 ?> w-full h-full" style="transition:transform 0.8s ease;will-change:transform"></div>
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--forest),var(--forest-mid))"></div>
        </div>
      </div>

    </div>
    <?php endforeach; ?>
  </div>
</section>


<!-- ── CTA Band ────────────────────────────────────────── -->
<section class="py-24 text-center relative overflow-hidden" style="background:var(--forest)">
  <div class="absolute inset-0 pointer-events-none" style="background-image:linear-gradient(rgba(200,132,90,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(200,132,90,0.06) 1px,transparent 1px);background-size:64px 64px"></div>
  <div class="relative z-10">
    <div class="section-label justify-center mb-6" style="color:var(--mint)">
      <span class="label-line"></span>
      <span>Ready to Begin</span>
      <span class="label-line"></span>
    </div>
    <h2 class="section-heading-white mb-3" style="font-size:clamp(2.2rem,4vw,3.6rem)">
      Book Your Service <em>Today</em>
    </h2>
    <p style="font-family:'Inter',sans-serif;font-size:0.95rem;color:rgba(255,255,255,0.5);font-style:italic;margin-bottom:36px">No commitment. We'll confirm within 2 hours.</p>
    <a href="book.php" class="btn-primary inline-flex">
      Book Now
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  </div>
</section>

</main>

<?php require_once 'includes/footer.php'; ?>
