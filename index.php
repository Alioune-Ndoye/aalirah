<?php
require_once 'config/config.php';
$page_title    = SITE_NAME . ' — Professional Cleaning Services in ' . SITE_CITY . ', ' . SITE_STATE;
$page_desc     = 'Top-rated professional cleaning in ' . SITE_CITY . ', CT. Eco-certified, fully insured, background-checked team. Residential, commercial, move-out & more. 100% satisfaction guaranteed. Book online in 60 seconds.';
$page_canonical = SITE_URL . '/';

/* FAQ schema — powers "People Also Ask" results in Google */
$page_schema = json_encode([
  '@context'   => 'https://schema.org',
  '@type'      => 'FAQPage',
  'mainEntity' => [
    [
      '@type' => 'Question',
      'name'  => 'How much does professional house cleaning cost in West Hartford, CT?',
      'acceptedAnswer' => ['@type'=>'Answer','text'=>'Our residential deep cleaning starts from $160 for spaces under 1,000 sq ft. Pricing varies by space size, cleaning type, and frequency. Get a free instant quote online in under 60 seconds — no commitment required.'],
    ],
    [
      '@type' => 'Question',
      'name'  => 'Are your cleaning products eco-friendly and safe for children and pets?',
      'acceptedAnswer' => ['@type'=>'Answer','text'=>'Yes. We use only premium, eco-certified, non-toxic cleaning solutions that are completely safe for your family, pets, and the environment. No harsh chemicals — ever.'],
    ],
    [
      '@type' => 'Question',
      'name'  => 'Are your cleaners background-checked and insured?',
      'acceptedAnswer' => ['@type'=>'Answer','text'=>'Absolutely. Every team member passes a rigorous background check, is fully insured and bonded, and completes a 40-hour proprietary training program before entering any client home.'],
    ],
    [
      '@type' => 'Question',
      'name'  => 'Do you offer a satisfaction guarantee?',
      'acceptedAnswer' => ['@type'=>'Answer','text'=>"Yes. If anything doesn't meet your expectations, we return within 24 hours to make it right — completely free of charge, no questions asked."],
    ],
    [
      '@type' => 'Question',
      'name'  => 'What cleaning services do you offer in Connecticut?',
      'acceptedAnswer' => ['@type'=>'Answer','text'=>'We offer residential deep cleaning, office & commercial cleaning, move-in / move-out cleaning, post-construction cleaning, luxury estate care, and event preparation cleaning across West Hartford and greater Connecticut.'],
    ],
    [
      '@type' => 'Question',
      'name'  => 'How quickly can I book a cleaning appointment?',
      'acceptedAnswer' => ['@type'=>'Answer','text'=>'You can book online in under 60 seconds. Choose your service, pick a date and time, and we will confirm availability within 2 hours. Same-day appointments may be available.'],
    ],
  ],
], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

/* Preload above-the-fold hero image for LCP score */
$page_head_extra = '<link rel="preload" as="image" href="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=90" fetchpriority="high"/>';

require_once 'includes/header.php';
require_once 'includes/navbar.php';
?>

<main>

<!-- ═══════════════════════════════════════════════
     SECTION 1 · HERO
════════════════════════════════════════════════ -->
<section id="hero" class="hero-section relative min-h-screen flex items-center" style="overflow:clip" data-panel>

  <!-- Video background -->
  <video id="heroVideo" class="hero-video-bg" autoplay muted loop playsinline aria-hidden="true"></video>
  <div class="hero-video-overlay" aria-hidden="true"></div>
  <div class="hero-bg-grid"       aria-hidden="true"></div>
  <div class="orb orb-1"          aria-hidden="true"></div>
  <div class="orb orb-2"          aria-hidden="true"></div>

  <div class="max-w-7xl mx-auto px-6 md:px-10 w-full pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

    <!-- Left: Content -->
    <div class="hero-content">

      <!-- Eyebrow badge -->
      <div class="hero-eyebrow inline-flex items-center gap-3 mb-8 opacity-0">
        <span class="inline-block w-2 h-2 rounded-full bg-mint animate-pulse"></span>
        <span style="font-family:'Space Grotesk',sans-serif;font-size:0.7rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--mint-light)">
          Professional Cleaning — West Hartford, CT
        </span>
      </div>

      <!-- Headline -->
      <h1 class="mb-6" style="font-family:'Cormorant Garamond',Georgia,serif;font-weight:400;line-height:1.08;letter-spacing:-0.01em;padding-bottom:0.14em">
        <span class="hero-line block text-white" style="font-size:clamp(3.8rem,6.5vw,6.5rem)">Your Space.</span>
        <span class="hero-line block" style="font-size:clamp(3.8rem,6.5vw,6.5rem);color:var(--mint);font-style:italic">Spotless.</span>
        <span class="hero-line block text-white" style="font-size:clamp(3.8rem,6.5vw,6.5rem)">Guaranteed.</span>
      </h1>

      <!-- Sub -->
      <p class="hero-sub opacity-0 mb-10 max-w-md" style="font-size:1.1rem;line-height:1.7;color:rgba(255,255,255,0.60)">
        We transform homes and businesses across West Hartford and Connecticut with precision cleaning, eco-friendly products, and a 100% satisfaction promise.
      </p>

      <!-- CTAs -->
      <div class="hero-cta flex flex-wrap items-center gap-4 mb-16 opacity-0">
        <a href="book.php" class="btn-primary">
          Get a Free Quote
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>

        <a href="#services" class="btn-ghost">Our Services</a>
      </div>

      <!-- Stats -->
      <div class="hero-stats flex flex-wrap gap-8 pt-8 border-t border-white/10 opacity-0">
        <?php
          $stats = [
            ['num'=>500,'suffix'=>'+','label'=>'Spaces Cleaned'],
            ['num'=>98, 'suffix'=>'%','label'=>'Happy Clients'],
            ['num'=>8,  'suffix'=>'+','label'=>'Years Trusted'],
          ];
          foreach ($stats as $i => $st): ?>
        <?php if ($i > 0): ?><div class="hidden sm:block w-px h-10 bg-white/10"></div><?php endif; ?>
        <div class="text-center">
          <div style="font-family:'Space Grotesk',sans-serif;font-size:2.8rem;font-weight:800;letter-spacing:-0.04em;color:var(--mint);line-height:1">
            <span class="counter" data-target="<?= $st['num'] ?>">0</span><?= $st['suffix'] ?>
          </div>
          <div style="font-size:0.68rem;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.40);margin-top:6px"><?= $st['label'] ?></div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- Right: Visual frame (desktop) -->
    <div class="hero-visual hidden lg:flex justify-end relative opacity-0">
      <div class="hero-frame-wrap relative w-[88%]">
        <div class="hero-frame rounded-2xl overflow-hidden" style="aspect-ratio:3/4;max-height:600px">
          <div class="hero-frame-bg"></div>
          <div class="hero-frame-overlay"></div>
          <!-- Floating stat chip -->
          <div class="absolute bottom-8 left-6 right-6 flex items-center gap-4 rounded-2xl p-5"
               style="background:rgba(44,44,44,0.75);backdrop-filter:blur(20px);border:1px solid rgba(200,132,90,0.2)">
            <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style="background:var(--mint)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" stroke-width="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="var(--forest)"/></svg>
            </div>
            <div>
              <div style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.9rem;color:#fff">Top Rated in CT</div>
              <div style="font-size:0.72rem;color:rgba(255,255,255,0.50);margin-top:2px">Eco-Certified · Fully Insured</div>
            </div>
            <div class="ml-auto flex -space-x-2">
              <?php for($a=0;$a<4;$a++): ?>
              <div class="w-8 h-8 rounded-full border-2 border-forest overflow-hidden" style="background:var(--forest-mid)">
                <div style="width:100%;height:100%;background:linear-gradient(135deg,var(--mint-dark),var(--mint-light));opacity:0.<?= 5+$a*1 ?>"></div>
              </div>
              <?php endfor; ?>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Trust Marquee -->
  <div class="absolute bottom-0 inset-x-0 z-10">
    <?php require_once 'includes/trust-marquee.php'; ?>
  </div>

</section>


<!-- ═══════════════════════════════════════════════
     SECTION 2 · SERVICES GRID
════════════════════════════════════════════════ -->
<section id="services" class="relative bg-white py-28 md:py-36 overflow-hidden" data-panel>
  <div class="svc-bg-orb" aria-hidden="true"></div>

  <div class="max-w-7xl mx-auto px-6 md:px-10">
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 reveal-up">
      <div>
        <div class="section-label mb-4">
          <span class="label-line"></span>
          <span>What We Offer</span>
        </div>
        <h2 class="section-heading">Services Built for <em>Real Results</em></h2>
      </div>
      <a href="services.php" class="btn-dark flex-shrink-0 self-start md:self-auto">
        All Services
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>

    <?php
      $services = [
        ['bg'=>'svc-card-bg-1','tag'=>'From 4 hrs',       'title'=>'Residential Deep Clean',  'desc'=>'Room-by-room transformation. No corner missed, no surface unpolished. Your home reset to perfection.'],
        ['bg'=>'svc-card-bg-2','tag'=>'Custom Plans',     'title'=>'Office & Commercial',      'desc'=>'Elevate your workspace to match your brand. First impressions start with a spotless environment.'],
        ['bg'=>'svc-card-bg-3','tag'=>'Full Property',    'title'=>'Move In / Move Out',       'desc'=>'A fresh start deserves a spotless space. We prepare every corner for the next chapter.'],
        ['bg'=>'svc-card-bg-4','tag'=>'Expert Team',      'title'=>'Post-Construction',        'desc'=>'Specialist dust, debris, and detail cleaning after renovations or new construction.'],
        ['bg'=>'svc-card-bg-5','tag'=>'By Appointment',   'title'=>'Luxury Estate Care',       'desc'=>'White-glove service for high-value properties with bespoke care programs tailored to your home.'],
        ['bg'=>'svc-card-bg-6','tag'=>'Same-Day Avail.',  'title'=>'Event Preparation',        'desc'=>'Pre and post-event cleaning for private gatherings, galas, and corporate affairs.'],
      ];
    ?>

    <div class="svc-grid reveal-up">
      <?php
        $svc_icons = [
          '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
          '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
          '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>',
          '<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>',
          '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',
          '<path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><circle cx="12" cy="13" r="3"/>',
        ];
        foreach ($services as $i => $svc):
          $slug = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $svc['title']));
          $num  = str_pad($i+1, 2, '0', STR_PAD_LEFT);
      ?>
      <div class="svc-card" aria-label="<?= htmlspecialchars($svc['title']) ?>">
        <div class="svc-card-inner">

          <!-- FRONT -->
          <div class="svc-card-front">
            <div class="svc-card-img <?= $svc['bg'] ?>"></div>
            <div class="svc-card-front-overlay"></div>
            <div class="svc-card-front-body">
              <span class="svc-card-tag"><?= $svc['tag'] ?></span>
              <h3 class="svc-card-title"><?= $svc['title'] ?></h3>
            </div>
          </div>

          <!-- BACK -->
          <div class="svc-card-back">
            <span class="svc-card-back-num"><?= $num ?></span>
            <div class="svc-card-back-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><?= $svc_icons[$i] ?></svg>
            </div>
            <h3 class="svc-card-back-title"><?= $svc['title'] ?></h3>
            <p class="svc-card-back-desc"><?= $svc['desc'] ?></p>
            <a href="services.php#<?= $slug ?>" class="svc-card-back-cta">
              Learn More
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>


<!-- ═══════════════════════════════════════════════
     SECTION 3 · WHY US
════════════════════════════════════════════════ -->
<section id="how-it-works" class="relative py-28 md:py-36 overflow-hidden" style="background:var(--forest)" data-panel>
  <!-- Subtle grid -->
  <div class="absolute inset-0 pointer-events-none" style="background-image:linear-gradient(rgba(200,132,90,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(200,132,90,0.05) 1px,transparent 1px);background-size:64px 64px"></div>

  <div class="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
    <div class="text-center mb-16 reveal-up">
      <div class="section-label justify-center mb-5" style="color:var(--mint)">
        <span class="label-line"></span>
        <span>Why Choose Us</span>
        <span class="label-line"></span>
      </div>
      <h2 class="section-heading-white mb-4">The Alira <em>Difference</em></h2>
      <p class="max-w-lg mx-auto leading-relaxed" style="color:rgba(255,255,255,0.55)">
        In a city full of cleaning services, here's why over 500 Connecticut clients trust us with their most important spaces.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <?php
        $reasons = [
          ['n'=>'01','icon'=>'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>','title'=>'Vetted & Trained Specialists','body'=>'Every team member passes rigorous background checks and a 40-hour proprietary training program before setting foot in your home.'],
          ['n'=>'02','icon'=>'<path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>','title'=>'Eco-Certified Products','body'=>'We use only premium, non-toxic solutions that protect your surfaces, your family, and the planet — no harsh chemicals, ever.'],
          ['n'=>'03','icon'=>'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>','title'=>'100% Satisfaction Guaranteed','body'=>"If anything doesn't meet your expectations, we return within 24 hours to make it right — completely free of charge, no questions asked."],
          ['n'=>'04','icon'=>'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>','title'=>'Always On Time','body'=>'We respect your schedule. Our teams arrive in the promised window every time — and we send you a reminder the day before.'],
          ['n'=>'05','icon'=>'<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" stroke="none"/>','title'=>'5-Star Rated on Google','body'=>'Hundreds of verified 5-star reviews from real Connecticut clients. Our reputation is built one spotless space at a time.'],
          ['n'=>'06','icon'=>'<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>','title'=>'Seamless Digital Experience','body'=>'Book in 60 seconds, track your team in real time, and manage everything from your phone. No paperwork, no hassle.'],
        ];
        foreach ($reasons as $i => $r): ?>
      <div class="step-card reveal-up" style="background:rgba(255,255,255,0.04);border-color:rgba(200,132,90,0.12)">
        <span class="step-num" style="color:rgba(200,132,90,0.10)"><?= $r['n'] ?></span>
        <div class="step-icon" style="background:rgba(200,132,90,0.12);color:var(--mint)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><?= $r['icon'] ?></svg>
        </div>
        <h3 class="step-title" style="color:#fff"><?= $r['title'] ?></h3>
        <p style="font-size:0.88rem;line-height:1.7;color:rgba(255,255,255,0.50)"><?= $r['body'] ?></p>
      </div>
      <?php endforeach; ?>
    </div>

    <!-- CTA bar -->
    <div class="mt-16 flex flex-col sm:flex-row items-center justify-center gap-5">
      <a href="book.php" class="btn-primary">
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


<!-- ═══════════════════════════════════════════════
     SECTION 4 · WHY CHOOSE US
════════════════════════════════════════════════ -->
<section id="why-us" class="relative bg-ivory overflow-hidden" data-panel>
  <div class="why-bg-orb" aria-hidden="true"></div>

  <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">

    <!-- Left: Features -->
    <div class="py-28 md:py-36 px-6 md:px-10 lg:pl-[max(40px,calc((100vw-1240px)/2+40px))] flex flex-col justify-center">
      <div class="section-label mb-5">
        <span class="label-line"></span>
        <span>The Difference</span>
      </div>
      <h2 class="section-heading mb-6">
        Why Clients Choose <em>Alira</em>
      </h2>
      <p style="color:var(--text-soft);line-height:1.75;margin-bottom:3rem;max-width:36rem">
        In a world of unreliable cleaning services, we've built something different — a practice rooted in precision, integrity, and genuine care for your space.
      </p>

      <?php
        $why = [
          ['n'=>'01','title'=>'Vetted & Trained Specialists','body'=>'Every team member passes rigorous background checks and a 40-hour proprietary training program before entering your home.'],
          ['n'=>'02','title'=>'Premium Eco-Certified Products','body'=>'We use only luxury-grade, non-toxic solutions that protect your surfaces, your family, and the environment.'],
          ['n'=>'03','title'=>'Satisfaction or We Return','body'=>"If any aspect doesn't meet your expectations, we come back within 24 hours — at no additional cost."],
          ['n'=>'04','title'=>'Seamless Digital Experience','body'=>'Book, communicate, and manage services from your phone. Transparent pricing. Real-time updates.'],
        ];
        foreach ($why as $i => $w): ?>
      <div class="why-feat flex gap-6 mb-8" data-why-i="<?= $i ?>">
        <div style="font-family:'Space Grotesk',sans-serif;font-size:2.2rem;font-weight:800;letter-spacing:-0.04em;color:rgba(200,132,90,0.22);line-height:1;flex-shrink:0;width:2.5rem"><?= $w['n'] ?></div>
        <div>
          <h4 style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.92rem;color:var(--forest);margin-bottom:6px"><?= $w['title'] ?></h4>
          <p style="font-size:0.85rem;line-height:1.7;color:var(--text-soft)"><?= $w['body'] ?></p>
        </div>
      </div>
      <?php endforeach; ?>
    </div>

    <!-- Right: Photo panel -->
    <div class="h-80 md:h-[420px] lg:h-auto relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=85"
        alt="Professional cleaner at work"
        class="absolute inset-0 w-full h-full object-cover"
        loading="lazy"/>
      <div class="absolute inset-0 hidden lg:block pointer-events-none" style="background:linear-gradient(to right,var(--ivory)/50%,transparent)"></div>
      <!-- Floating trust tags -->
      <div class="why-tag absolute top-20 right-16 hidden lg:flex items-center gap-2 rounded-full px-4 py-2 text-xs"
           style="background:rgba(44,44,44,0.75);backdrop-filter:blur(16px);border:1px solid rgba(200,132,90,0.3);color:var(--mint-light);font-family:'Space Grotesk',sans-serif;font-weight:600;letter-spacing:0.08em">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Eco-Certified
      </div>
      <div class="why-tag absolute bottom-28 right-10 hidden lg:flex items-center gap-2 rounded-full px-4 py-2 text-xs"
           style="background:rgba(44,44,44,0.75);backdrop-filter:blur(16px);border:1px solid rgba(200,132,90,0.3);color:var(--mint-light);font-family:'Space Grotesk',sans-serif;font-weight:600;letter-spacing:0.08em">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        5-Star Rated
      </div>
    </div>
  </div>
</section>


<!-- ═══════════════════════════════════════════════
     SECTION 5 · BEFORE & AFTER
════════════════════════════════════════════════ -->
<section id="showcase" class="h-scroll-section relative bg-white" data-panel>

  <div class="h-scroll-header px-6 md:px-10 pt-24 md:pt-28 pb-8">
    <div class="text-center max-w-xl mx-auto reveal-up">
      <div class="section-label justify-center mb-5">
        <span class="label-line"></span>
        <span>The Transformation</span>
        <span class="label-line"></span>
      </div>
      <h2 class="section-heading mb-3">Before & <em>After</em></h2>
      <p style="color:var(--text-soft);max-width:36rem;margin:0 auto;line-height:1.75;font-size:0.95rem">
        Drag the slider to see the Alira difference — spaces reborn through expert cleaning.
      </p>
    </div>
    <div class="h-progress-wrap hidden md:flex items-center gap-4 mt-8 justify-center">
      <span style="font-size:0.65rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-muted)">Explore</span>
      <div class="h-progress-track"><div class="h-progress-bar" id="showcaseProgressBar"></div></div>
      <span style="font-size:0.65rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-muted)">Scroll</span>
    </div>
  </div>

  <div class="showcase-scroll-outer" data-lenis-prevent>
    <div class="showcase-scroll-track" id="showcaseTrack">
      <?php
        $cases = [
          ['title'=>'Luxury Kitchen Restoration','sub'=>'West Hartford, CT'],
          ['title'=>'Executive Office Deep Clean','sub'=>'Beverly Hills Tower'],
          ['title'=>'Post-Construction Reveal',  'sub'=>'Malibu Residence'],
        ];
      ?>
      <?php foreach ($cases as $i => $c): ?>
      <div class="showcase-panel">
        <div class="showcase-panel-num"><?= str_pad($i+1,2,'0',STR_PAD_LEFT) ?> <span>/</span> <?= str_pad(count($cases),2,'0',STR_PAD_LEFT) ?></div>
        <div class="ba-wrapper rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl cursor-ew-resize select-none">
          <div class="ba-before absolute inset-0">
            <div class="ba-img ba-before-<?= $i+1 ?>"></div>
            <div class="ba-label ba-label-before">Before</div>
          </div>
          <div class="ba-after absolute inset-0" style="clip-path:inset(0 0 0 50%)">
            <div class="ba-img ba-after-<?= $i+1 ?>"></div>
            <div class="ba-label ba-label-after">After</div>
          </div>
          <div class="ba-handle" style="left:50%">
            <div class="ba-handle-line"></div>
            <div class="ba-handle-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 3L4 7l4 4M16 3l4 4-4 4"/></svg>
            </div>
          </div>
        </div>
        <div class="showcase-caption">
          <div style="font-family:'Space Grotesk',sans-serif;font-size:1.05rem;font-weight:600;color:var(--forest)"><?= $c['title'] ?></div>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;letter-spacing:0.1em;text-transform:uppercase"><?= $c['sub'] ?></div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>

  <div class="md:hidden text-center py-6">
    <span style="font-size:0.62rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--text-muted)">← Swipe to explore →</span>
  </div>
</section>




<!-- ═══════════════════════════════════════════════
     SECTION 7 · TESTIMONIALS
════════════════════════════════════════════════ -->
<section id="testimonials" class="h-scroll-section relative" style="background:var(--surface)" data-panel>

  <div class="h-scroll-header px-6 md:px-10 pt-24 md:pt-28 pb-8">
    <div class="text-center reveal-up">
      <div class="section-label justify-center mb-5" style="color:var(--mint-dark)">
        <span class="label-line" style="background:var(--mint-dark)"></span>
        <span>Client Stories</span>
        <span class="label-line" style="background:var(--mint-dark)"></span>
      </div>
      <h2 class="mb-6" style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.4rem,4vw,3.6rem);font-weight:400;color:var(--forest);line-height:1.15">What Our Clients <em style="color:var(--mint-dark)">Say</em></h2>

      <!-- Google Verified Reviews badge -->
      <div class="inline-flex items-center gap-3 px-5 py-3 rounded-2xl mx-auto"
           style="background:#fff;border:1px solid var(--border);box-shadow:0 2px 16px rgba(44,44,44,0.06)">
        <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <div class="text-left">
          <div style="font-family:'Space Grotesk',sans-serif;font-size:0.78rem;font-weight:700;color:var(--forest);letter-spacing:0.02em">Google Verified Reviews</div>
          <div class="flex items-center gap-1 mt-0.5">
            <?php for($s=0;$s<5;$s++): ?>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <?php endfor; ?>
            <span style="font-size:0.72rem;color:var(--text-muted);margin-left:4px">5.0 · 100+ reviews</span>
          </div>
        </div>
      </div>
    </div>
    <div class="h-progress-wrap hidden md:flex items-center gap-4 mt-8 justify-center">
      <span style="font-size:0.65rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-muted)">Stories</span>
      <div class="h-progress-track"><div class="h-progress-bar" id="testimonialsProgressBar"></div></div>
      <span style="font-size:0.65rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-muted)">Scroll</span>
    </div>
  </div>

  <div class="testimonials-scroll-outer" data-lenis-prevent>
    <div class="testimonials-scroll-track" id="testimonialsTrack">
      <?php
        $tests = [
          ['name'=>'Alexandra Moore','role'=>'Interior Designer, West Hartford','avatar'=>'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80','rating'=>5,'text'=>'Alira has completely transformed how I present finished projects to clients. Their attention to detail is unmatched — they treat every surface like a canvas.'],
          ['name'=>'Jonathan Whitfield','role'=>'CEO, Whitfield Capital','avatar'=>'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80','rating'=>5,'text'=>'My office has never looked — or felt — this pristine. The team is professional, discreet, and efficient. Exactly what a high-end workspace demands.'],
          ['name'=>'Serena Voss','role'=>'Luxury Property Owner','avatar'=>'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=80','rating'=>5,'text'=>"I've tried every premium cleaning service in the city. Alira is in a different league. The only name I recommend to friends in Bel Air."],
          ['name'=>'Marcus Chen','role'=>'Architect & Developer','avatar'=>'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80','rating'=>5,'text'=>'Post-construction cleaning is a nightmare to get right. Alira handled our 6,000 sq ft project with surgical precision. Stunning result every time.'],
        ];
      ?>
      <?php foreach ($tests as $idx => $t): ?>
      <div class="t-h-panel">
        <div class="t-h-card">
          <div class="t-h-deco-quote">"</div>
          <!-- Stars -->
          <div class="flex gap-1.5 mb-7" style="color:var(--mint)">
            <?php for ($i=0;$i<$t['rating'];$i++): ?>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <?php endfor; ?>
          </div>
          <blockquote class="t-h-quote">"<?= htmlspecialchars($t['text']) ?>"</blockquote>
          <div class="flex items-center gap-4 mt-10 pt-8" style="border-top:1px solid rgba(200,132,90,0.12)">
            <!-- Initials avatar -->
            <div class="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                 style="background:rgba(200,132,90,0.15);border:1px solid rgba(200,132,90,0.3);color:var(--mint);font-family:'Space Grotesk',sans-serif">
              <?= strtoupper(substr($t['name'], 0, 1).substr(strstr($t['name'],' '),1,1)) ?>
            </div>
            <div>
              <div style="font-family:'Space Grotesk',sans-serif;font-weight:700;color:#fff"><?= $t['name'] ?></div>
              <div style="font-size:0.82rem;color:rgba(255,255,255,0.45);margin-top:3px"><?= $t['role'] ?></div>
            </div>
            <div class="ml-auto" style="font-family:'Space Grotesk',sans-serif;font-size:3.5rem;font-weight:800;letter-spacing:-0.04em;color:rgba(200,132,90,0.08);line-height:1;user-select:none">
              <?= str_pad($idx+1,2,'0',STR_PAD_LEFT) ?>
            </div>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>

  <div class="md:hidden text-center py-6">
    <span style="font-size:0.62rem;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.25)">← Swipe to read →</span>
  </div>
</section>


<!-- ═══════════════════════════════════════════════
     SECTION 9 · CONTACT
════════════════════════════════════════════════ -->
<section id="contact" class="relative overflow-hidden" data-panel>
  <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">

    <!-- Map -->
    <div class="relative min-h-[320px] lg:min-h-0 overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2988.654!2d-72.7482!3d41.7715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d917c2b3a1f5%3A0x4c2e1a3b5d6e7f8a!2sProspect+Ave%2C+West+Hartford%2C+CT+06117!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
        class="absolute inset-0 w-full h-full border-0"
        allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Alira — Prospect Ave, West Hartford, CT"></iframe>
      <div class="absolute inset-0 pointer-events-none flex items-end justify-start p-5">
        <div class="flex items-center gap-2 rounded-full px-4 py-2 text-xs shadow-lg"
             style="background:rgba(44,44,44,0.85);backdrop-filter:blur(12px);border:1px solid rgba(200,132,90,0.3);color:var(--mint-light);font-family:'Space Grotesk',sans-serif;font-weight:600;letter-spacing:0.06em">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <?= SITE_ADDRESS ?>
        </div>
      </div>
    </div>

    <!-- Info — white background, matching the Before & After section -->
    <div class="py-20 px-6 md:px-16 lg:pr-[max(40px,calc((100vw-1240px)/2+40px))] flex flex-col justify-center" style="background:#fff">
      <div class="section-label mb-5">
        <span class="label-line"></span>
        <span>Find Us</span>
      </div>
      <h2 class="section-heading mb-8">Get in <em>Touch</em></h2>

      <div class="space-y-4 mb-10">
        <?php
          $ctcts = [
            ['href'=>'tel:+13105550190','icon'=>'<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.72 10.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.63 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 7.61a16 16 0 006.29 6.29l.98-.87a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>','label'=>'Phone','val'=>SITE_PHONE],
            ['href'=>'mailto:'.SITE_EMAIL,'icon'=>'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>','label'=>'Email','val'=>SITE_EMAIL],
            ['href'=>'#','icon'=>'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>','label'=>'Hours','val'=>'Mon–Sat, 7am–7pm PST'],
          ];
          foreach ($ctcts as $c): ?>
        <a href="<?= $c['href'] ?>" class="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300"
           style="background:rgba(7,16,30,0.04);border:1px solid rgba(200,132,90,0.18)"
           onmouseover="this.style.background='rgba(200,132,90,0.08)';this.style.borderColor='rgba(200,132,90,0.35)'"
           onmouseout="this.style.background='rgba(7,16,30,0.04)';this.style.borderColor='rgba(200,132,90,0.18)'">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style="background:rgba(200,132,90,0.12);color:var(--mint)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><?= $c['icon'] ?></svg>
          </div>
          <div>
            <div style="font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--text-muted)"><?= $c['label'] ?></div>
            <div style="font-size:0.9rem;font-weight:600;color:var(--forest);margin-top:2px"><?= $c['val'] ?></div>
          </div>
        </a>
        <?php endforeach; ?>
      </div>

      <!-- Socials -->
      <div>
        <div style="font-size:0.68rem;letter-spacing:0.16em;text-transform:uppercase;color:var(--text-muted);margin-bottom:14px">Follow Our Work</div>
        <div class="flex gap-3">
          <?php
            $soc = [
              ['l'=>'Instagram','h'=>SITE_IG,'p'=>'<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>'],
              ['l'=>'Facebook', 'h'=>SITE_FB,'p'=>'<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>'],
              ['l'=>'LinkedIn', 'h'=>SITE_LI,'p'=>'<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>'],
            ];
            foreach ($soc as $s): ?>
          <a href="<?= $s['h'] ?>" class="social-btn-light" aria-label="<?= $s['l'] ?>">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><?= $s['p'] ?></svg>
          </a>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</section>

</main>

<?php require_once 'includes/footer.php'; ?>
