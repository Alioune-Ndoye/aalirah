<?php
require_once 'config/config.php';
$page_title    = 'Book a Professional Cleaning — ' . SITE_NAME;
$page_desc     = 'Book your professional cleaning online. Choose your service, pick a date & time, and get a free instant price estimate.';
$page_canonical = SITE_URL . '/book.php';

$page_schema = json_encode([
  '@context' => 'https://schema.org',
  '@type'    => 'WebPage',
  '@id'      => $page_canonical,
  'name'     => 'Book a Cleaning — ' . SITE_NAME,
  'url'      => $page_canonical,
  'description' => 'Book professional cleaning services online in ' . SITE_CITY . ', ' . SITE_STATE . '.',
  'isPartOf'  => ['@id' => SITE_URL . '/#website'],
  'provider'  => ['@id' => SITE_URL . '/#business'],
  'potentialAction' => [
    '@type'  => 'ReserveAction',
    'target' => [
      '@type'       => 'EntryPoint',
      'urlTemplate' => $page_canonical,
      'actionPlatform' => [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
      ],
    ],
    'result' => [
      '@type' => 'Reservation',
      'name'  => 'Cleaning Service Booking',
    ],
  ],
  'breadcrumb' => [
    '@type'           => 'BreadcrumbList',
    'itemListElement' => [
      ['@type'=>'ListItem','position'=>1,'name'=>'Home',    'item'=>SITE_URL.'/'],
      ['@type'=>'ListItem','position'=>2,'name'=>'Book Now','item'=>$page_canonical],
    ],
  ],
], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

$page_head_extra = '<link rel="preload" as="image" href="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=90" fetchpriority="high"/>';

require_once 'includes/header.php';
?>

<?php require_once 'includes/navbar.php'; ?>
<!-- Force navbar into scrolled (dark) state immediately on this page -->
<script>document.getElementById('nav')?.classList.add('scrolled');</script>

<!-- ── Page Hero ──────────────────────────────────────────── -->
<section style="background:var(--forest);padding-top:72px;padding-bottom:52px;border-bottom:1px solid rgba(198,167,105,0.12)">
  <div class="max-w-7xl mx-auto px-6 md:px-10">
    <div class="section-label mb-5">
      <span class="label-line"></span>Book Online
    </div>
    <h1 class="section-heading-white mb-4">Book Your <em>Cleaning</em></h1>
    <nav class="text-sm font-sans" style="color:rgba(255,255,255,0.40)">
      <a href="index.php" style="color:rgba(255,255,255,0.45);transition:color .3s" onmouseover="this.style.color='var(--mint)'" onmouseout="this.style.color='rgba(255,255,255,0.45)'">Home</a>
      <span class="mx-2 opacity-30">&rsaquo;</span>
      <span style="color:var(--mint-light)">Book Now</span>
    </nav>
  </div>
</section>

<!-- ── Main Content ───────────────────────────────────────── -->
<main style="background:var(--surface);padding:56px 0 80px">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Guarantee Bar -->
    <div style="background:var(--forest);border:1px solid rgba(198,167,105,0.18);border-radius:12px;padding:18px 24px;margin-bottom:40px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--mint),transparent)"></div>
      <p style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.05rem;color:rgba(255,255,255,0.82);line-height:1.6;margin:0">
        It is our goal to offer you the best possible cleaning service available. If you're not happy with your cleaning, we will come back and give you a re-cleaning on the house! Any questions, call us at
        <a href="tel:<?= preg_replace('/[^0-9+]/','',$_SERVER['SITE_PHONE'] ?? SITE_PHONE) ?>" style="color:var(--mint);font-weight:600;text-decoration:none"><?= SITE_PHONE ?></a>.
      </p>
    </div>

    <!-- Grid: Form (left 2/3) + Sidebar (right 1/3) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <!-- ══════════════════════════════════════════════
           BOOKING FORM
      ══════════════════════════════════════════════ -->
      <div class="lg:col-span-2 space-y-0" id="formWrapper">
        <div class="form-card" style="padding:40px 40px 48px">

          <!-- Heading -->
          <h2 class="section-heading" style="font-size:clamp(1.9rem,4vw,2.8rem);margin-bottom:6px">Complete your <em>booking.</em></h2>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;color:var(--text-muted);margin-bottom:32px;letter-spacing:0.04em">Just a few details and we'll get you scheduled.</p>

          <!-- Move-In/Out Special Banner -->
          <div style="background:rgba(198,167,105,0.08);border:1px solid rgba(198,167,105,0.25);border-radius:10px;padding:16px 20px;margin-bottom:36px">
            <p style="font-family:'Space Grotesk',sans-serif;font-size:0.78rem;color:var(--forest);line-height:1.6;margin:0">
              <strong style="font-size:0.62rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--mint-dark);display:block;margin-bottom:4px">Move In / Move Out Special — Only $140 extra</strong>
              Includes deep cleaning, inside fridge, inside oven &amp; inside cabinets. ($200 if extras booked separately.)
            </p>
          </div>

          <form id="bookingForm" onsubmit="handleFormSubmit(event)" class="space-y-0">

            <!-- ── CONTACT INFO ──────────────────────── -->
            <div class="form-section">
              <div class="form-section-head">
                <span class="form-section-num">1</span>
                <span class="form-section-title">Contact Info</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label class="form-label">First Name</label>
                  <input type="text" id="firstName" name="firstName" placeholder="Jane" required class="form-input"/>
                </div>
                <div>
                  <label class="form-label">Last Name</label>
                  <input type="text" id="lastName" name="lastName" placeholder="Smith" required class="form-input"/>
                </div>
                <div>
                  <label class="form-label">Email</label>
                  <input type="email" id="email" name="email" placeholder="jane@example.com" required class="form-input"/>
                </div>
                <div>
                  <label class="form-label">Phone Number</label>
                  <input type="tel" id="phone" name="phone" placeholder="(347) 000-0000" required class="form-input"/>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;margin-top:18px">
                <input type="checkbox" id="smsReminders" name="smsReminders" checked style="width:14px;height:14px;accent-color:var(--mint)"/>
                <label for="smsReminders" style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;color:var(--text-soft);cursor:pointer">Send me text message reminders about my cleaning</label>
              </div>
            </div>

            <!-- ── ADDRESS ──────────────────────────── -->
            <div class="form-section">
              <div class="form-section-head">
                <span class="form-section-num">2</span>
                <span class="form-section-title">Address</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                <div class="md:col-span-2">
                  <label class="form-label">Street Address</label>
                  <input type="text" id="street" name="street" placeholder="123 Main St" required class="form-input"/>
                </div>
                <div>
                  <label class="form-label">Apt / Suite</label>
                  <input type="text" id="apt" name="apt" placeholder="Apt 4B" class="form-input"/>
                </div>
                <div>
                  <label class="form-label">City</label>
                  <input type="text" id="city" name="city" placeholder="West Hartford" required class="form-input"/>
                </div>
                <div>
                  <label class="form-label">State</label>
                  <select id="state" name="state" required class="form-input form-select" style="background:transparent">
                    <option value="" disabled selected>Select</option>
                    <option value="NY">NY</option>
                    <option value="CT">CT</option>
                    <option value="NJ">NJ</option>
                    <option value="MA">MA</option>
                  </select>
                </div>
                <div>
                  <label class="form-label">Zip Code</label>
                  <input type="text" id="zip" name="zip" placeholder="06110" required class="form-input"/>
                </div>
              </div>
            </div>

            <!-- ── SERVICE DATE ──────────────────────── -->
            <div class="form-section">
              <div class="form-section-head">
                <span class="form-section-num">3</span>
                <span class="form-section-title">Service Date</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label class="form-label">Date</label>
                  <input type="date" id="serviceDate" name="serviceDate" required class="form-input"/>
                </div>
                <div>
                  <label class="form-label">Arrival Time</label>
                  <select id="serviceTime" name="serviceTime" required class="form-input form-select" style="background:transparent">
                    <option value="" disabled selected>Select time</option>
                    <option value="08:00 AM">8:00 AM</option>
                    <option value="09:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="01:00 PM">1:00 PM</option>
                    <option value="02:00 PM">2:00 PM</option>
                    <option value="03:00 PM">3:00 PM</option>
                    <option value="04:00 PM">4:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- ── FREQUENCY ─────────────────────────── -->
            <div class="form-section">
              <div class="form-section-head">
                <span class="form-section-num">4</span>
                <span class="form-section-title">Frequency</span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button type="button" onclick="setFrequency('once',0,'One Time')" id="freq-once"
                  class="freq-btn" style="border:1.5px solid var(--border);border-radius:12px;padding:16px 12px;text-align:center;background:#fff;cursor:pointer;transition:all .25s">
                  <span style="display:block;font-family:'Space Grotesk',sans-serif;font-size:0.82rem;font-weight:700;color:var(--forest)">One Time</span>
                  <span style="display:block;font-family:'Space Grotesk',sans-serif;font-size:0.65rem;color:var(--text-muted);margin-top:4px">Cleaning</span>
                </button>
                <button type="button" onclick="setFrequency('weekly',0.20,'Weekly')" id="freq-weekly"
                  class="freq-btn" style="border:1.5px solid var(--border);border-radius:12px;padding:16px 12px;text-align:center;background:#fff;cursor:pointer;transition:all .25s">
                  <span style="display:block;font-family:'Space Grotesk',sans-serif;font-size:0.82rem;font-weight:700;color:var(--forest)">Weekly</span>
                  <span class="freq-save" style="display:block;font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:700;color:var(--mint-dark);margin-top:4px">Save 20%</span>
                </button>
                <button type="button" onclick="setFrequency('biweekly',0.15,'Every 2 Weeks')" id="freq-biweekly"
                  class="freq-btn" style="border:1.5px solid var(--border);border-radius:12px;padding:16px 12px;text-align:center;background:#fff;cursor:pointer;transition:all .25s">
                  <span style="display:block;font-family:'Space Grotesk',sans-serif;font-size:0.82rem;font-weight:700;color:var(--forest)">Every 2 Wks</span>
                  <span class="freq-save" style="display:block;font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:700;color:var(--mint-dark);margin-top:4px">Save 15%</span>
                </button>
                <button type="button" onclick="setFrequency('monthly',0.10,'Every 4 Weeks')" id="freq-monthly"
                  class="freq-btn" style="border:1.5px solid var(--border);border-radius:12px;padding:16px 12px;text-align:center;background:#fff;cursor:pointer;transition:all .25s">
                  <span style="display:block;font-family:'Space Grotesk',sans-serif;font-size:0.82rem;font-weight:700;color:var(--forest)">Every 4 Wks</span>
                  <span class="freq-save" style="display:block;font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:700;color:var(--mint-dark);margin-top:4px">Save 10%</span>
                </button>
              </div>
            </div>

            <!-- ── CHOOSE YOUR SERVICE ───────────────── -->
            <div class="form-section">
              <div class="form-section-head">
                <span class="form-section-num">5</span>
                <span class="form-section-title">Space Size &amp; Rooms</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                <div>
                  <label class="form-label">Square Footage</label>
                  <select id="serviceSize" onchange="updateServiceSize()" required class="form-input form-select" style="background:transparent">
                    <option value="under1000">Under 1,000 sq. ft.</option>
                    <option value="1000to1500">1,001 – 1,500 sq. ft.</option>
                    <option value="1500to2000">1,501 – 2,000 sq. ft.</option>
                    <option value="2000to2500">2,001 – 2,500 sq. ft.</option>
                    <option value="2500to3000">2,501 – 3,000 sq. ft.</option>
                    <option value="3000to3500">3,001 – 3,500 sq. ft.</option>
                    <option value="3500to4000">3,501 – 4,000 sq. ft.</option>
                    <option value="4000to4500">4,001 – 4,500 sq. ft.</option>
                    <option value="4500to5000">4,501 – 5,000 sq. ft.</option>
                  </select>
                </div>
                <div>
                  <label class="form-label">Bedrooms</label>
                  <select id="serviceBedrooms" onchange="updateServiceBedrooms()" required class="form-input form-select" style="background:transparent">
                    <option value="studio">Studio</option>
                    <option value="1bed">1 Bedroom</option>
                    <option value="2bed">2 Bedrooms</option>
                    <option value="3bed">3 Bedrooms</option>
                    <option value="4bed">4 Bedrooms</option>
                    <option value="5bed">5 Bedrooms</option>
                    <option value="6bed">6 Bedrooms</option>
                  </select>
                </div>
                <div>
                  <label class="form-label">Bathrooms</label>
                  <select id="serviceBathrooms" onchange="updateServiceBathrooms()" required class="form-input form-select" style="background:transparent">
                    <option value="1bath">1 Bathroom</option>
                    <option value="1.5bath">1.5 Bathrooms</option>
                    <option value="2bath">2 Bathrooms</option>
                    <option value="2.5bath">2.5 Bathrooms</option>
                    <option value="3bath">3 Bathrooms</option>
                    <option value="3.5bath">3.5 Bathrooms</option>
                    <option value="4bath">4 Bathrooms</option>
                    <option value="4.5bath">4.5 Bathrooms</option>
                    <option value="5bath">5 Bathrooms</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- ── SELECT EXTRAS ─────────────────────── -->
            <div class="form-section">
              <div class="form-section-head">
                <span class="form-section-num">6</span>
                <span class="form-section-title">Select Extras</span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

                <!-- Deep Cleaning — sparkles icon -->
                <button type="button" onclick="toggleExtra('deep')" id="extra-deep"
                  class="extra-btn" style="border:1.5px solid var(--border);border-radius:14px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff;cursor:pointer;transition:all .22s">
                  <svg class="extra-icon" style="width:28px;height:28px;color:var(--text-soft);margin-bottom:8px;transition:color .22s" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
                  </svg>
                  <span style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;color:var(--forest);line-height:1.3">Deep Cleaning</span>
                  <span style="font-family:'Space Grotesk',sans-serif;font-size:0.6rem;color:var(--mint-dark);margin-top:2px">(Recommended)</span>
                </button>

                <!-- Move-In/Out — truck icon -->
                <button type="button" onclick="toggleExtra('moveInOut')" id="extra-moveInOut"
                  class="extra-btn" style="border:1.5px solid var(--border);border-radius:14px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff;cursor:pointer;transition:all .22s">
                  <svg class="extra-icon" style="width:28px;height:28px;color:var(--text-soft);margin-bottom:8px;transition:color .22s" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m10.5 4.5h1.5m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                  </svg>
                  <span style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;color:var(--forest);line-height:1.3">Move-In/Out</span>
                </button>

                <!-- Pet Hair — scissors icon -->
                <button type="button" onclick="toggleExtra('petHair')" id="extra-petHair"
                  class="extra-btn" style="border:1.5px solid var(--border);border-radius:14px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff;cursor:pointer;transition:all .22s">
                  <svg class="extra-icon" style="width:28px;height:28px;color:var(--text-soft);margin-bottom:8px;transition:color .22s" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.499-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
                  </svg>
                  <span style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;color:var(--forest);line-height:1.3">Pet Hair Clean-Up</span>
                </button>

                <!-- Clean Baseboards — paint-brush icon -->
                <button type="button" onclick="toggleExtra('baseboards')" id="extra-baseboards"
                  class="extra-btn" style="border:1.5px solid var(--border);border-radius:14px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff;cursor:pointer;transition:all .22s">
                  <svg class="extra-icon" style="width:28px;height:28px;color:var(--text-soft);margin-bottom:8px;transition:color .22s" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/>
                  </svg>
                  <span style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;color:var(--forest);line-height:1.3">Clean Baseboards</span>
                </button>

                <!-- Laundry — arrow-path (wash cycle) icon -->
                <button type="button" onclick="toggleExtra('laundry')" id="extra-laundry"
                  class="extra-btn" style="border:1.5px solid var(--border);border-radius:14px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff;cursor:pointer;transition:all .22s">
                  <svg class="extra-icon" style="width:28px;height:28px;color:var(--text-soft);margin-bottom:8px;transition:color .22s" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                  </svg>
                  <span style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;color:var(--forest);line-height:1.3">Load(s) of Laundry</span>
                </button>

                <!-- Hand Wash Dishes — hand-raised icon -->
                <button type="button" onclick="toggleExtra('dishes')" id="extra-dishes"
                  class="extra-btn" style="border:1.5px solid var(--border);border-radius:14px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff;cursor:pointer;transition:all .22s">
                  <svg class="extra-icon" style="width:28px;height:28px;color:var(--text-soft);margin-bottom:8px;transition:color .22s" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.07 5.695a1.575 1.575 0 01-2.098 1.367l-1.942-.617a1.875 1.875 0 00-2.179.859l-.107.202c-.5.98-.169 2.185.793 2.75l7.045 4.007a1.875 1.875 0 002.212-.234l2.493-2.08a1.875 1.875 0 00.702-1.667l-.268-2.095a1.575 1.575 0 00-.634-1.13l-.107-1.34"/>
                  </svg>
                  <span style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;color:var(--forest);line-height:1.3">Hand Wash Dishes</span>
                </button>

                <!-- Balcony — building icon -->
                <button type="button" onclick="toggleExtra('balcony')" id="extra-balcony"
                  class="extra-btn" style="border:1.5px solid var(--border);border-radius:14px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff;cursor:pointer;transition:all .22s">
                  <svg class="extra-icon" style="width:28px;height:28px;color:var(--text-soft);margin-bottom:8px;transition:color .22s" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18"/>
                  </svg>
                  <span style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;color:var(--forest);line-height:1.3">Balcony</span>
                </button>

                <!-- Clean Inside Oven — fire icon -->
                <button type="button" onclick="toggleExtra('oven')" id="extra-oven"
                  class="extra-btn" style="border:1.5px solid var(--border);border-radius:14px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff;cursor:pointer;transition:all .22s">
                  <svg class="extra-icon" style="width:28px;height:28px;color:var(--text-soft);margin-bottom:8px;transition:color .22s" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.545 5.975 5.975 0 01-2.133-1.001A3.75 3.75 0 0012 18z"/>
                  </svg>
                  <span style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;color:var(--forest);line-height:1.3">Clean Inside Oven</span>
                </button>

                <!-- Clean Inside Fridge — cube/storage icon -->
                <button type="button" onclick="toggleExtra('fridge')" id="extra-fridge"
                  class="extra-btn" style="border:1.5px solid var(--border);border-radius:14px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff;cursor:pointer;transition:all .22s">
                  <svg class="extra-icon" style="width:28px;height:28px;color:var(--text-soft);margin-bottom:8px;transition:color .22s" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 12a1.5 1.5 0 01-1.5 1.5H5.875a1.5 1.5 0 01-1.5-1.5L3.75 7.5m16.5 0V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v1.5m16.5 0h-16.5M12 11.25v4.5"/>
                  </svg>
                  <span style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;color:var(--forest);line-height:1.3">Clean Inside Fridge</span>
                </button>

                <!-- Clean Inside Cabinets — squares grid icon -->
                <button type="button" onclick="toggleExtra('cabinets')" id="extra-cabinets"
                  class="extra-btn" style="border:1.5px solid var(--border);border-radius:14px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff;cursor:pointer;transition:all .22s">
                  <svg class="extra-icon" style="width:28px;height:28px;color:var(--text-soft);margin-bottom:8px;transition:color .22s" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
                  </svg>
                  <span style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;color:var(--forest);line-height:1.3">Clean Inside Cabinets</span>
                </button>

                <!-- Clean Interior Windows — window pane icon -->
                <button type="button" onclick="toggleExtra('windows')" id="extra-windows"
                  class="extra-btn" style="border:1.5px solid var(--border);border-radius:14px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff;cursor:pointer;transition:all .22s">
                  <svg class="extra-icon" style="width:28px;height:28px;color:var(--text-soft);margin-bottom:8px;transition:color .22s" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h18v18H3V3zm9 0v18M3 12h18"/>
                  </svg>
                  <span style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;color:var(--forest);line-height:1.3">Interior Windows</span>
                </button>

                <!-- Interior Walls — rectangle/wall icon -->
                <button type="button" onclick="toggleExtra('walls')" id="extra-walls"
                  class="extra-btn" style="border:1.5px solid var(--border);border-radius:14px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff;cursor:pointer;transition:all .22s">
                  <svg class="extra-icon" style="width:28px;height:28px;color:var(--text-soft);margin-bottom:8px;transition:color .22s" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"/>
                  </svg>
                  <span style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;color:var(--forest);line-height:1.3">Interior Walls</span>
                </button>

                <!-- UV Disinfection — sun icon -->
                <button type="button" onclick="toggleExtra('uv')" id="extra-uv"
                  class="extra-btn" style="border:1.5px solid var(--border);border-radius:14px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff;cursor:pointer;transition:all .22s">
                  <svg class="extra-icon" style="width:28px;height:28px;color:var(--text-soft);margin-bottom:8px;transition:color .22s" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
                  </svg>
                  <span style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;color:var(--forest);line-height:1.3">UV Disinfection</span>
                </button>

                <!-- Hour(s) of Organizing — folder icon -->
                <button type="button" onclick="toggleExtra('organizing')" id="extra-organizing"
                  class="extra-btn" style="border:1.5px solid var(--border);border-radius:14px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff;cursor:pointer;transition:all .22s">
                  <svg class="extra-icon" style="width:28px;height:28px;color:var(--text-soft);margin-bottom:8px;transition:color .22s" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>
                  </svg>
                  <span style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;color:var(--forest);line-height:1.3">Hour(s) of Organizing</span>
                </button>

                <!-- Same Day Service — bolt icon -->
                <button type="button" onclick="toggleExtra('sameDay')" id="extra-sameDay"
                  class="extra-btn" style="border:1.5px solid var(--border);border-radius:14px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#fff;cursor:pointer;transition:all .22s">
                  <svg class="extra-icon" style="width:28px;height:28px;color:var(--text-soft);margin-bottom:8px;transition:color .22s" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
                  </svg>
                  <span style="font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:600;color:var(--forest);line-height:1.3">Same Day Service</span>
                </button>

              </div>
            </div>

            <!-- ── BOOKING INFO ──────────────────────── -->
            <div class="form-section">
              <div class="form-section-head">
                <span class="form-section-num">7</span>
                <span class="form-section-title">Booking Info</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label class="form-label">Earliest start time?</label>
                  <select id="earliestTime" name="earliestTime" class="form-input form-select" style="background:transparent">
                    <option value="flexible">Keep my selected time</option>
                    <option value="07:00 AM">7:00 AM</option>
                    <option value="08:00 AM">8:00 AM</option>
                    <option value="09:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                  </select>
                </div>
                <div>
                  <label class="form-label">Latest start time?</label>
                  <select id="latestTime" name="latestTime" class="form-input form-select" style="background:transparent">
                    <option value="flexible">Keep my selected time</option>
                    <option value="03:00 PM">3:00 PM</option>
                    <option value="04:00 PM">4:00 PM</option>
                    <option value="05:00 PM">5:00 PM</option>
                    <option value="06:00 PM">6:00 PM</option>
                  </select>
                </div>
                <div>
                  <label class="form-label">How will we gain entry? *</label>
                  <select id="gainEntry" name="gainEntry" required class="form-input form-select" style="background:transparent">
                    <option value="" disabled selected>Select option</option>
                    <option value="home">Someone will be home</option>
                    <option value="keypad">Keypad / Lockbox code</option>
                    <option value="doorman">Doorman / Concierge</option>
                    <option value="hidden">Hidden key</option>
                    <option value="other">Other option</option>
                  </select>
                </div>
                <div>
                  <label class="form-label">Any pets? *</label>
                  <select id="hasPets" name="hasPets" required class="form-input form-select" style="background:transparent">
                    <option value="" disabled selected>Select option</option>
                    <option value="no">No pets</option>
                    <option value="dogs">Yes, dog(s)</option>
                    <option value="cats">Yes, cat(s)</option>
                    <option value="other">Yes, other pets</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- ── CUSTOMER COMMENTS ─────────────────── -->
            <div class="form-section">
              <div class="form-section-head">
                <span class="form-section-num">8</span>
                <span class="form-section-title">Special Requests</span>
              </div>
              <label class="form-label">Notes for your cleaner</label>
              <textarea id="comments" name="comments" rows="4" placeholder="Areas to prioritize, special instructions, preferred cleaner, etc." class="form-input lux-textarea" style="margin-top:8px"></textarea>
            </div>

            <!-- ── TIP ──────────────────────────────── -->
            <div class="form-section">
              <div class="form-section-head">
                <span class="form-section-num">9</span>
                <span class="form-section-title">Tip</span>
              </div>
              <p style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;color:var(--text-muted);margin-bottom:14px">Non-refundable &amp; at your discretion. Can be added anytime.</p>
              <div style="max-width:180px">
                <label class="form-label">Tip Amount ($)</label>
                <input type="number" id="tipAmount" name="tipAmount" min="0" step="1" placeholder="0" oninput="updateTip()" class="form-input"/>
              </div>
            </div>

            <!-- ── DISCOUNT CODE ─────────────────────── -->
            <div class="form-section">
              <div class="form-section-head">
                <span class="form-section-num">10</span>
                <span class="form-section-title">Discount Code</span>
              </div>
              <div style="display:flex;gap:12px;max-width:400px;align-items:flex-end">
                <div style="flex:1">
                  <label class="form-label">Promo Code</label>
                  <input type="text" id="discountCode" name="discountCode" placeholder="Enter code (optional)" class="form-input"/>
                </div>
                <button type="button" onclick="applyPromoCode()" class="btn-dark" style="padding:10px 20px;font-size:0.7rem;white-space:nowrap;border-radius:8px;margin-bottom:2px">Apply</button>
              </div>
              <div id="promoFeedback" class="hidden" style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;margin-top:8px"></div>
            </div>

            <!-- ── PAYMENT ───────────────────────────── -->
            <div class="form-section">
              <div class="form-section-head">
                <span class="form-section-num">11</span>
                <span class="form-section-title">Payment</span>
              </div>
              <div style="border:1.5px solid var(--border);border-radius:16px;padding:24px;background:var(--surface-alt);max-width:480px">
                <div style="margin-bottom:16px">
                  <label class="form-label">Card Number</label>
                  <div style="position:relative">
                    <input type="text" id="cardNumber" placeholder="0000 0000 0000 0000" required class="form-input" style="padding-left:32px"/>
                    <svg style="width:16px;height:16px;color:var(--text-muted);position:absolute;left:0;top:12px" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>
                    </svg>
                  </div>
                </div>
                <div class="grid grid-cols-3 gap-4">
                  <div style="grid-column:span 2">
                    <label class="form-label">Expiration</label>
                    <input type="text" id="cardExpiry" placeholder="MM / YY" required class="form-input"/>
                  </div>
                  <div>
                    <label class="form-label">CVC</label>
                    <input type="text" id="cardCvc" placeholder="CVC" required class="form-input"/>
                  </div>
                </div>
              </div>

              <!-- Submit -->
              <div style="margin-top:32px">
                <button type="submit" id="submitBtn" class="lux-submit" style="width:100%;max-width:400px;justify-content:center;font-size:0.78rem;padding:18px 40px">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Confirm &amp; Book Now
                </button>
              </div>
            </div>

          </form>
        </div><!-- /.form-card -->
      </div><!-- /#formWrapper -->

      <!-- Success Message -->
      <div class="lg:col-span-2 hidden" id="successWrapper">
        <div style="background:var(--forest);border:1px solid rgba(198,167,105,0.18);border-radius:24px;padding:56px 40px;text-align:center;position:relative;overflow:hidden">
          <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--mint),var(--mint-light))"></div>
          <div style="width:64px;height:64px;background:rgba(198,167,105,0.12);border:1px solid rgba(198,167,105,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 28px;color:var(--mint)">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
          </div>
          <h2 style="font-family:'Cormorant Garamond',serif;font-size:2.4rem;font-weight:400;color:#fff;margin-bottom:16px">Thank you for booking!</h2>
          <p style="font-family:'Inter',sans-serif;font-size:0.9rem;color:rgba(255,255,255,0.60);max-width:420px;margin:0 auto 36px;line-height:1.7">
            Your booking request has been received. A confirmation email is on its way. For immediate assistance, call us at <?= SITE_PHONE ?>.
          </p>
          <a href="index.php" class="btn-primary">Back to Home</a>
        </div>
      </div>

      <!-- ══════════════════════════════════════════════
           SIDEBAR
      ══════════════════════════════════════════════ -->
      <div class="space-y-6">

        <!-- Booking Summary (dark card) -->
        <div style="background:var(--forest);border:1px solid rgba(198,167,105,0.15);border-radius:20px;padding:28px;position:sticky;top:88px;overflow:hidden">
          <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--mint),transparent)"></div>

          <div style="font-family:'Space Grotesk',sans-serif;font-size:0.6rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:var(--mint);margin-bottom:20px">Booking Summary</div>

          <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:20px">

            <!-- Space -->
            <div style="display:flex;align-items:flex-start;gap:12px">
              <div style="width:32px;height:32px;border-radius:8px;background:rgba(198,167,105,0.1);border:1px solid rgba(198,167,105,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--mint)">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18"/></svg>
              </div>
              <div>
                <div style="font-family:'Space Grotesk',sans-serif;font-size:0.82rem;font-weight:600;color:#fff" id="summarySize">Under 1,000 sq. ft.</div>
                <div style="font-family:'Space Grotesk',sans-serif;font-size:0.68rem;color:rgba(255,255,255,0.40);margin-top:2px" id="summaryRooms">Studio / 1 Bathroom</div>
              </div>
            </div>

            <!-- Date -->
            <div style="display:flex;align-items:flex-start;gap:12px">
              <div style="width:32px;height:32px;border-radius:8px;background:rgba(198,167,105,0.1);border:1px solid rgba(198,167,105,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--mint)">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>
              </div>
              <div style="font-family:'Space Grotesk',sans-serif;font-size:0.82rem;font-weight:600;color:#fff" id="summaryDate">Choose a service date…</div>
            </div>

            <!-- Duration -->
            <div style="display:flex;align-items:flex-start;gap:12px">
              <div style="width:32px;height:32px;border-radius:8px;background:rgba(198,167,105,0.1);border:1px solid rgba(198,167,105,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--mint)">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div style="font-family:'Space Grotesk',sans-serif;font-size:0.82rem;font-weight:600;color:#fff" id="summaryDuration">1 Hour 30 Minutes</div>
            </div>

            <!-- Frequency -->
            <div style="display:flex;align-items:flex-start;gap:12px">
              <div style="width:32px;height:32px;border-radius:8px;background:rgba(198,167,105,0.1);border:1px solid rgba(198,167,105,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--mint)">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>
              </div>
              <div style="font-family:'Space Grotesk',sans-serif;font-size:0.82rem;font-weight:600;color:#fff" id="summaryFrequency">Every 2 Weeks for 15% Off</div>
            </div>
          </div>

          <!-- Extras list -->
          <div id="summaryExtrasList" style="border-top:1px solid rgba(198,167,105,0.12);padding-top:14px;margin-bottom:14px" class="hidden"></div>

          <!-- Invoice -->
          <div style="border-top:1px solid rgba(198,167,105,0.12);padding-top:16px">
            <div style="display:flex;justify-content:space-between;font-family:'Space Grotesk',sans-serif;font-size:0.78rem;color:rgba(255,255,255,0.50);margin-bottom:8px">
              <span>Subtotal</span><span id="invoiceSubtotal">$0.00</span>
            </div>
            <div id="discountRow" style="display:none;justify-content:space-between;font-family:'Space Grotesk',sans-serif;font-size:0.78rem;color:var(--mint);margin-bottom:8px">
              <span>Frequency Discount</span><span id="invoiceDiscount">-$0.00</span>
            </div>
            <div id="promoDiscountRow" style="display:none;justify-content:space-between;font-family:'Space Grotesk',sans-serif;font-size:0.78rem;color:var(--mint);margin-bottom:8px">
              <span>Promo Code</span><span id="invoicePromoDiscount">-$0.00</span>
            </div>
            <div id="tipRow" style="display:none;justify-content:space-between;font-family:'Space Grotesk',sans-serif;font-size:0.78rem;color:rgba(255,255,255,0.50);margin-bottom:8px">
              <span>Tip</span><span id="invoiceTip">$0.00</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-family:'Space Grotesk',sans-serif;font-size:0.78rem;color:rgba(255,255,255,0.50);margin-bottom:16px">
              <span>Sales Tax (8.875%)</span><span id="invoiceTax">$0.00</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid rgba(198,167,105,0.18);padding-top:14px">
              <span style="font-family:'Space Grotesk',sans-serif;font-size:0.6rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.40)">Total</span>
              <span style="font-family:'Space Grotesk',sans-serif;font-size:2.4rem;font-weight:800;color:var(--mint);line-height:1" id="invoiceTotal">$0.00</span>
            </div>
          </div>
        </div><!-- /booking summary -->

        <!-- Value Props -->
        <div style="background:#fff;border:1.5px solid var(--border);border-radius:20px;padding:24px">
          <?php
          $props = [
            ['icon'=>'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z','title'=>'Saves You Time','desc'=>'We help you live smarter, giving you time to focus on what matters most.'],
            ['icon'=>'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z','title'=>'Safety First','desc'=>'All cleaners undergo identity checks and in-person interviews.'],
            ['icon'=>'M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904','title'=>'Only the Best Quality','desc'=>'Our professionals go above and beyond. Rated &amp; reviewed after every job.'],
            ['icon'=>'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z','title'=>'Cash-Free Payment','desc'=>'Pay securely online — only once your cleaning is complete.'],
          ];
          foreach($props as $p): ?>
          <div style="display:flex;gap:14px;<?= $p !== end($props) ? 'margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid var(--border)' : '' ?>">
            <div style="width:36px;height:36px;border-radius:10px;background:var(--forest);color:var(--mint);display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="<?= $p['icon'] ?>"/></svg>
            </div>
            <div>
              <div style="font-family:'Space Grotesk',sans-serif;font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--forest);margin-bottom:4px"><?= $p['title'] ?></div>
              <p style="font-size:0.78rem;color:var(--text-soft);line-height:1.55;margin:0"><?= $p['desc'] ?></p>
            </div>
          </div>
          <?php endforeach; ?>
        </div><!-- /value props -->

      </div><!-- /sidebar -->
    </div><!-- /grid -->
  </div>
</main>

<?php require_once 'includes/footer.php'; ?>

<script>
// ── State Store ─────────────────────────────────────────
const state = {
  size: 'under1000', sizeLabel: 'Under 1,000 sq. ft.', basePrice: 137.0, baseHours: 1.5,
  bedrooms: 'studio', bedroomsLabel: 'Studio', bedroomsPrice: 0.0, bedroomsHours: 0.0,
  bathrooms: '1bath', bathroomsLabel: '1 Bathroom', bathroomsPrice: 0.0, bathroomsHours: 0.0,
  frequency: 'biweekly', frequencyDiscountRate: 0.15, frequencyLabel: 'Every 2 Weeks for 15% Off',
  extras: {
    deep:      { active:false, price:50.0,  hours:0.5, name:'Deep Cleaning' },
    moveInOut: { active:false, price:140.0, hours:2.0, name:'Move-In/Out Cleaning' },
    petHair:   { active:false, price:30.0,  hours:0.5, name:'Pet Hair Clean-Up' },
    baseboards:{ active:false, price:35.0,  hours:0.5, name:'Clean Baseboards' },
    laundry:   { active:false, price:30.0,  hours:0.5, name:'Load(s) of Laundry' },
    dishes:    { active:false, price:20.0,  hours:0.5, name:'Hand Wash Dishes' },
    balcony:   { active:false, price:30.0,  hours:0.5, name:'Balcony' },
    oven:      { active:false, price:35.0,  hours:0.5, name:'Clean Inside Oven' },
    fridge:    { active:false, price:35.0,  hours:0.5, name:'Clean Inside Fridge' },
    cabinets:  { active:false, price:40.0,  hours:0.5, name:'Clean Inside Cabinets' },
    windows:   { active:false, price:45.0,  hours:0.5, name:'Clean Interior Windows' },
    walls:     { active:false, price:60.0,  hours:1.0, name:'Interior Walls' },
    uv:        { active:false, price:40.0,  hours:0.5, name:'UV Disinfection' },
    organizing:{ active:false, price:50.0,  hours:1.0, name:'Hour(s) of Organizing' },
    sameDay:   { active:false, price:50.0,  hours:0.0, name:'Same Day Service' }
  },
  tip: 0.0, promoDiscountRate: 0.0, promoLabel: '', date: '', time: ''
};

const sizeConfig = {
  under1000:    { label:'Under 1,000 sq. ft.',  price:137.0, hours:1.5 },
  '1000to1500': { label:'1,001 - 1,500 sq. ft.', price:167.0, hours:2.0 },
  '1500to2000': { label:'1,501 - 2,000 sq. ft.', price:197.0, hours:2.5 },
  '2000to2500': { label:'2,001 - 2,500 sq. ft.', price:227.0, hours:3.0 },
  '2500to3000': { label:'2,501 - 3,000 sq. ft.', price:257.0, hours:3.5 },
  '3000to3500': { label:'3,001 - 3,500 sq. ft.', price:287.0, hours:4.0 },
  '3500to4000': { label:'3,501 - 4,000 sq. ft.', price:317.0, hours:4.5 },
  '4000to4500': { label:'4,001 - 4,500 sq. ft.', price:347.0, hours:5.0 },
  '4500to5000': { label:'4,501 - 5,000 sq. ft.', price:377.0, hours:5.5 }
};
const bedroomConfig = {
  studio:{ label:'Studio',     price:0.0,  hours:0.0 },
  '1bed':{ label:'1 Bedroom',  price:15.0, hours:0.5 },
  '2bed':{ label:'2 Bedrooms', price:30.0, hours:1.0 },
  '3bed':{ label:'3 Bedrooms', price:45.0, hours:1.5 },
  '4bed':{ label:'4 Bedrooms', price:60.0, hours:2.0 },
  '5bed':{ label:'5 Bedrooms', price:75.0, hours:2.5 },
  '6bed':{ label:'6 Bedrooms', price:90.0, hours:3.0 }
};
const bathroomConfig = {
  '1bath':  { label:'1 Bathroom',    price:0.0,   hours:0.0  },
  '1.5bath':{ label:'1.5 Bathrooms', price:15.0,  hours:0.25 },
  '2bath':  { label:'2 Bathrooms',   price:30.0,  hours:0.5  },
  '2.5bath':{ label:'2.5 Bathrooms', price:45.0,  hours:0.75 },
  '3bath':  { label:'3 Bathrooms',   price:60.0,  hours:1.0  },
  '3.5bath':{ label:'3.5 Bathrooms', price:75.0,  hours:1.25 },
  '4bath':  { label:'4 Bathrooms',   price:90.0,  hours:1.5  },
  '4.5bath':{ label:'4.5 Bathrooms', price:105.0, hours:1.75 },
  '5bath':  { label:'5 Bathrooms',   price:120.0, hours:2.0  }
};
const TAX_RATE = 0.08875;

document.addEventListener('DOMContentLoaded', function() {
  updateFrequencyUI('biweekly');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('serviceDate').setAttribute('min', tomorrow.toISOString().split('T')[0]);
  document.getElementById('serviceDate').addEventListener('change', e => { state.date = e.target.value; updateSummaryDate(); });
  document.getElementById('serviceTime').addEventListener('change', e => { state.time = e.target.value; updateSummaryDate(); });
  recalculate();
});

function updateSummaryDate() {
  const el = document.getElementById('summaryDate');
  if (state.date) {
    const d = new Date(state.date + 'T00:00:00').toLocaleDateString('en-US',{ weekday:'long', month:'long', day:'numeric', year:'numeric' });
    el.textContent = d + (state.time ? ' at ' + state.time : '');
  } else {
    el.textContent = 'Choose a service date…';
  }
}

function setFrequency(type, rate, name) {
  state.frequency = type;
  state.frequencyDiscountRate = rate;
  state.frequencyLabel = rate > 0 ? name + ' for ' + (rate*100) + '% Off' : name + ' Cleaning';
  updateFrequencyUI(type);
  document.getElementById('summaryFrequency').textContent = state.frequencyLabel;
  recalculate();
}

function updateFrequencyUI(activeType) {
  document.querySelectorAll('.freq-btn').forEach(btn => {
    btn.style.background    = '#fff';
    btn.style.borderColor   = 'var(--border)';
    btn.style.boxShadow     = 'none';
    const label = btn.querySelector('span');
    if (label) label.style.color = 'var(--forest)';
    const save  = btn.querySelectorAll('span')[1];
    if (save)  save.style.color  = 'var(--mint-dark)';
  });
  const active = document.getElementById('freq-' + activeType);
  if (active) {
    active.style.background  = 'var(--forest)';
    active.style.borderColor = 'var(--forest)';
    active.style.boxShadow   = '0 4px 20px rgba(26,23,20,0.2)';
    const label = active.querySelector('span');
    if (label) label.style.color = '#fff';
    const save  = active.querySelectorAll('span')[1];
    if (save)  save.style.color  = 'var(--mint-light)';
  }
}

function updateServiceSize() {
  const s = document.getElementById('serviceSize').value;
  state.size = s; state.sizeLabel = sizeConfig[s].label;
  state.basePrice = sizeConfig[s].price; state.baseHours = sizeConfig[s].hours;
  document.getElementById('summarySize').textContent = state.sizeLabel;
  recalculate();
}
function updateServiceBedrooms() {
  const s = document.getElementById('serviceBedrooms').value;
  state.bedrooms = s; state.bedroomsLabel = bedroomConfig[s].label;
  state.bedroomsPrice = bedroomConfig[s].price; state.bedroomsHours = bedroomConfig[s].hours;
  updateRoomsLabel(); recalculate();
}
function updateServiceBathrooms() {
  const s = document.getElementById('serviceBathrooms').value;
  state.bathrooms = s; state.bathroomsLabel = bathroomConfig[s].label;
  state.bathroomsPrice = bathroomConfig[s].price; state.bathroomsHours = bathroomConfig[s].hours;
  updateRoomsLabel(); recalculate();
}
function updateRoomsLabel() {
  document.getElementById('summaryRooms').textContent = state.bedroomsLabel + ' / ' + state.bathroomsLabel;
}

function toggleExtra(key) {
  const extra = state.extras[key];
  extra.active = !extra.active;
  const btn = document.getElementById('extra-' + key);
  if (extra.active) {
    btn.style.background  = 'rgba(198,167,105,0.08)';
    btn.style.borderColor = 'var(--mint)';
    btn.style.boxShadow   = '0 0 0 1px var(--mint)';
    const icon = btn.querySelector('.extra-icon');
    if (icon) icon.style.color = 'var(--mint-dark)';
  } else {
    btn.style.background  = '#fff';
    btn.style.borderColor = 'var(--border)';
    btn.style.boxShadow   = 'none';
    const icon = btn.querySelector('.extra-icon');
    if (icon) icon.style.color = 'var(--text-soft)';
  }
  updateSummaryExtrasList();
  recalculate();
}

function updateSummaryExtrasList() {
  const el = document.getElementById('summaryExtrasList');
  el.innerHTML = '<div style="font-family:\'Space Grotesk\',sans-serif;font-size:0.58rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.30);margin-bottom:8px">Extras</div>';
  let count = 0;
  for (const [k, v] of Object.entries(state.extras)) {
    if (v.active) {
      count++;
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;justify-content:space-between;font-family:\'Space Grotesk\',sans-serif;font-size:0.75rem;color:rgba(255,255,255,0.65);padding:3px 0';
      row.innerHTML = `<span>+ ${v.name}</span><span style="color:var(--mint)">+$${v.price.toFixed(2)}</span>`;
      el.appendChild(row);
    }
  }
  el.style.display = count > 0 ? 'block' : 'none';
}

function updateTip() {
  const val = parseFloat(document.getElementById('tipAmount').value);
  state.tip = isNaN(val) || val < 0 ? 0 : val;
  const row = document.getElementById('tipRow');
  row.style.display = state.tip > 0 ? 'flex' : 'none';
  document.getElementById('invoiceTip').textContent = '$' + state.tip.toFixed(2);
  recalculate();
}

function applyPromoCode() {
  const code = document.getElementById('discountCode').value.trim().toUpperCase();
  const fb   = document.getElementById('promoFeedback');
  if (code === 'WELCOME10') {
    state.promoDiscountRate = 0.10;
    fb.textContent = '✓ Promo WELCOME10 applied — 10% off!';
    fb.style.color = 'var(--mint-dark)';
  } else if (code === 'CLEAN20') {
    state.promoDiscountRate = 0.20;
    fb.textContent = '✓ Promo CLEAN20 applied — 20% off!';
    fb.style.color = 'var(--mint-dark)';
  } else if (code === '') {
    state.promoDiscountRate = 0.0;
    fb.classList.add('hidden'); recalculate(); return;
  } else {
    state.promoDiscountRate = 0.0;
    fb.textContent = 'Invalid promo code.';
    fb.style.color = '#c0392b';
  }
  fb.classList.remove('hidden');
  recalculate();
}

function recalculate() {
  let subtotal = state.basePrice + state.bedroomsPrice + state.bathroomsPrice;
  let totalHours = state.baseHours + state.bedroomsHours + state.bathroomsHours;
  for (const v of Object.values(state.extras)) {
    if (v.active) { subtotal += v.price; totalHours += v.hours; }
  }
  const discountVal   = subtotal * state.frequencyDiscountRate;
  const afterDisc     = subtotal - discountVal;
  const promoVal      = afterDisc * state.promoDiscountRate;
  const finalSub      = afterDisc - promoVal;
  const tax           = finalSub * TAX_RATE;
  const total         = finalSub + tax + state.tip;

  document.getElementById('invoiceSubtotal').textContent = '$' + subtotal.toFixed(2);

  const dRow = document.getElementById('discountRow');
  if (discountVal > 0) { dRow.style.display = 'flex'; document.getElementById('invoiceDiscount').textContent = '-$' + discountVal.toFixed(2); }
  else dRow.style.display = 'none';

  const pRow = document.getElementById('promoDiscountRow');
  if (promoVal > 0) { pRow.style.display = 'flex'; document.getElementById('invoicePromoDiscount').textContent = '-$' + promoVal.toFixed(2); }
  else pRow.style.display = 'none';

  document.getElementById('invoiceTax').textContent   = '$' + tax.toFixed(2);
  document.getElementById('invoiceTotal').textContent = '$' + total.toFixed(2);

  const hrs  = Math.floor(totalHours);
  const mins = Math.round((totalHours - hrs) * 60);
  let dur = '';
  if (hrs  > 0) dur += hrs  + (hrs  === 1 ? ' Hour' : ' Hours');
  if (mins > 0) dur += (dur ? ' ' : '') + mins + ' Minutes';
  document.getElementById('summaryDuration').textContent = dur || '1 Hour';
}

function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.innerHTML = '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="animation:spin 1s linear infinite"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg> Processing…';
  setTimeout(function() {
    document.getElementById('formWrapper').classList.add('hidden');
    document.getElementById('successWrapper').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1500);
}
</script>
<style>
@keyframes spin { to { transform: rotate(360deg); } }
</style>
