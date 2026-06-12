<?php
/* Canonical URL — use $page_canonical if set, otherwise auto-build */
$_self   = basename($_SERVER['PHP_SELF']);
$_cpath  = ($_self === 'index.php') ? '/' : ('/' . $_self);
$canonical_url = $page_canonical ?? (SITE_URL . $_cpath);

/* Full title / description with fallbacks */
$_title = $page_title ?? (SITE_NAME . ' — ' . SITE_TAGLINE);
$_desc  = $page_desc  ?? SITE_DESC;

/* LocalBusiness JSON-LD — used on every page */
$_ld_business = [
  '@context' => 'https://schema.org',
  '@graph'   => [
    [
      '@type'       => ['LocalBusiness', 'ProfessionalService'],
      '@id'         => SITE_URL . '/#business',
      'name'        => SITE_NAME,
      'description' => SITE_DESC,
      'url'         => SITE_URL,
      'telephone'   => SITE_PHONE,
      'email'       => SITE_EMAIL,
      'image'       => SITE_OG_IMAGE,
      'logo'        => SITE_OG_IMAGE,
      'priceRange'  => SITE_PRICE_RANGE,
      'currenciesAccepted' => 'USD',
      'paymentAccepted'    => 'Cash, Credit Card, Debit Card',
      'address' => [
        '@type'           => 'PostalAddress',
        'streetAddress'   => 'Prospect Ave',
        'addressLocality' => SITE_CITY,
        'addressRegion'   => SITE_STATE,
        'postalCode'      => SITE_ZIP,
        'addressCountry'  => SITE_COUNTRY,
      ],
      'geo' => [
        '@type'     => 'GeoCoordinates',
        'latitude'  => SITE_LAT,
        'longitude' => SITE_LNG,
      ],
      'openingHoursSpecification' => [
        [
          '@type'      => 'OpeningHoursSpecification',
          'dayOfWeek'  => ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          'opens'      => '07:00',
          'closes'     => '19:00',
        ],
      ],
      'aggregateRating' => [
        '@type'       => 'AggregateRating',
        'ratingValue' => SITE_RATING,
        'reviewCount' => SITE_REVIEW_COUNT,
        'bestRating'  => '5',
        'worstRating' => '1',
      ],
      'areaServed' => [
        ['@type' => 'City',  'name' => 'West Hartford'],
        ['@type' => 'City',  'name' => 'Hartford'],
        ['@type' => 'City',  'name' => 'Farmington'],
        ['@type' => 'City',  'name' => 'Avon'],
        ['@type' => 'State', 'name' => 'Connecticut'],
      ],
      'hasOfferCatalog' => [
        '@type' => 'OfferCatalog',
        'name'  => 'Professional Cleaning Services',
        'itemListElement' => [
          ['@type'=>'Offer','itemOffered'=>['@type'=>'Service','name'=>'Residential Deep Clean',  'description'=>'Room-by-room deep cleaning for homes in West Hartford, CT.']],
          ['@type'=>'Offer','itemOffered'=>['@type'=>'Service','name'=>'Office & Commercial Cleaning','description'=>'Professional cleaning for offices and commercial spaces.']],
          ['@type'=>'Offer','itemOffered'=>['@type'=>'Service','name'=>'Move In / Move Out Cleaning', 'description'=>'Full property cleaning for move-in and move-out.']],
          ['@type'=>'Offer','itemOffered'=>['@type'=>'Service','name'=>'Post-Construction Cleaning',  'description'=>'Specialist dust, debris, and detail cleaning after construction.']],
          ['@type'=>'Offer','itemOffered'=>['@type'=>'Service','name'=>'Luxury Estate Care',          'description'=>'White-glove bespoke cleaning for high-value properties.']],
          ['@type'=>'Offer','itemOffered'=>['@type'=>'Service','name'=>'Event Preparation Cleaning',  'description'=>'Pre and post-event cleaning for gatherings and corporate events.']],
        ],
      ],
      'sameAs' => array_filter([SITE_IG, SITE_FB, SITE_LI], fn($v) => $v !== '#'),
    ],
    [
      '@type'       => 'WebSite',
      '@id'         => SITE_URL . '/#website',
      'url'         => SITE_URL,
      'name'        => SITE_NAME,
      'description' => SITE_DESC,
      'publisher'   => ['@id' => SITE_URL . '/#business'],
    ],
  ],
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <!-- ── Primary SEO ──────────────────────────────────── -->
  <title><?= htmlspecialchars($_title) ?></title>
  <meta name="description"  content="<?= htmlspecialchars($_desc) ?>"/>
  <meta name="robots"       content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
  <link rel="canonical"     href="<?= htmlspecialchars($canonical_url) ?>"/>

  <!-- ── Keywords ─────────────────────────────────────── -->
  <meta name="keywords" content="cleaning service West Hartford CT, professional house cleaning Connecticut, deep clean, move-out cleaning, eco-friendly cleaning service, office cleaning West Hartford, post-construction cleaning CT"/>

  <!-- ── Geo / Local SEO ──────────────────────────────── -->
  <meta name="geo.region"   content="US-CT"/>
  <meta name="geo.placename" content="West Hartford, Connecticut"/>
  <meta name="geo.position" content="<?= SITE_LAT ?>;<?= SITE_LNG ?>"/>
  <meta name="ICBM"         content="<?= SITE_LAT ?>, <?= SITE_LNG ?>"/>

  <!-- ── Open Graph ───────────────────────────────────── -->
  <meta property="og:site_name"   content="<?= htmlspecialchars(SITE_NAME) ?>"/>
  <meta property="og:type"        content="website"/>
  <meta property="og:url"         content="<?= htmlspecialchars($canonical_url) ?>"/>
  <meta property="og:title"       content="<?= htmlspecialchars($_title) ?>"/>
  <meta property="og:description" content="<?= htmlspecialchars($_desc) ?>"/>
  <meta property="og:locale"      content="en_US"/>
  <meta property="og:image"       content="<?= SITE_OG_IMAGE ?>"/>
  <meta property="og:image:width"  content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:image:alt"    content="<?= htmlspecialchars(SITE_NAME) ?> — Professional Cleaning Services in <?= SITE_CITY ?>, <?= SITE_STATE ?>"/>

  <!-- ── Twitter Card ─────────────────────────────────── -->
  <meta name="twitter:card"        content="summary_large_image"/>
  <meta name="twitter:title"       content="<?= htmlspecialchars($_title) ?>"/>
  <meta name="twitter:description" content="<?= htmlspecialchars($_desc) ?>"/>
  <meta name="twitter:image"       content="<?= SITE_OG_IMAGE ?>"/>

  <!-- ── Favicon ──────────────────────────────────────── -->
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"/>
  <link rel="shortcut icon" href="/assets/favicon.svg"/>
  <meta name="theme-color" content="#07101E"/>

  <!-- ── Resource hints (performance) ─────────────────── -->
  <link rel="preconnect"  href="https://fonts.googleapis.com"/>
  <link rel="preconnect"  href="https://fonts.gstatic.com" crossorigin/>
  <link rel="dns-prefetch" href="https://images.unsplash.com"/>
  <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com"/>
  <link rel="dns-prefetch" href="https://unpkg.com"/>
  <link rel="dns-prefetch" href="https://cdn.tailwindcss.com"/>
  <link rel="preload" href="/assets/css/output.css" as="style"/>

  <!-- ── Fonts ────────────────────────────────────────── -->
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet"/>

  <!-- ── Tailwind CDN ──────────────────────────────────── -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            forest:        '#07101E',
            'forest-mid':  '#0D1A30',
            'forest-deep': '#030810',
            mint:          '#C6A769',
            'mint-light':  '#D9BC8E',
            'mint-dark':   '#A88A4A',
            'mint-pale':   '#F5EDD8',
            ivory:         '#F8F5F0',
            cream:         '#F0EBE2',
            beige:         '#E8DCCB',
            sand:          '#D7C5A8',
            champagne:     '#C6A769',
            'champ-lt':    '#D9BC8E',
            'champ-pl':    '#F5EDD8',
            charcoal:      '#07101E',
            'char-mid':    '#0D1A30',
            'char-soft':   '#6B5D4F',
            'char-lt':     '#9E8F7F',
            silver:        '#C4B49A',
          },
          fontFamily: {
            display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
            serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
            sans:    ['"Space Grotesk"', 'system-ui', 'sans-serif'],
            body:    ['Inter', 'system-ui', 'sans-serif'],
          },
          transitionTimingFunction: { luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
        },
      },
    }
  </script>

  <link rel="stylesheet" href="/assets/css/output.css"/>

  <!-- ── Structured Data: LocalBusiness + WebSite ──────── -->
  <script type="application/ld+json"><?= json_encode($_ld_business, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) ?></script>

  <!-- ── Page-specific structured data ────────────────── -->
  <?php if (!empty($page_schema)): ?>
  <script type="application/ld+json"><?= $page_schema ?></script>
  <?php endif; ?>

  <!-- ── Page-specific extra head tags (preloads, etc.) ── -->
  <?php if (!empty($page_head_extra)) echo $page_head_extra; ?>
</head>
<body class="bg-white text-forest font-sans antialiased overflow-x-hidden">

  <!-- Loader -->
  <div id="ldr" aria-hidden="true">
    <div class="ldr-inner">
      <span class="ldr-brand">
        <svg width="52" height="46" viewBox="0 0 100 88" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:block;margin:0 auto 14px">
          <polygon points="50,2 98,87 2,87" fill="white"/>
          <polygon points="50,42 74,83 26,83" fill="#F26522"/>
        </svg>
        aalirah
      </span>
      <div class="ldr-track"><div class="ldr-fill"></div></div>
      <span class="ldr-sub"><?= SITE_TAGLINE ?></span>
    </div>
  </div>

  <!-- Custom cursor (desktop only) -->
  <div id="cur"  aria-hidden="true"></div>
  <div id="cur2" aria-hidden="true"></div>
