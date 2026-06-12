<?php
require_once 'config/config.php';
$page_title = 'About Us — '.SITE_NAME;
$page_desc  = 'Learn about Alira\'s philosophy, team, and commitment to luxury cleaning artistry.';
require_once 'includes/header.php';
require_once 'includes/navbar.php';
?>

<main>

<!-- Page Hero -->
<section class="relative min-h-[55vh] bg-charcoal flex items-end pb-20 overflow-hidden">
  <div class="hero-bg-grid" aria-hidden="true"></div>
  <div class="orb orb-1" style="opacity:.18" aria-hidden="true"></div>
  <div class="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10">
    <div class="pt-36">
      <div class="section-label mb-4" style="--lc:rgba(214,185,140,1);--ltc:rgba(214,185,140,.6)">
        <span class="label-line" style="background:var(--ltc)"></span>
        <span style="color:var(--lc)">Our Story</span>
      </div>
      <h1 class="font-serif font-light text-ivory" style="font-size:clamp(3rem,7vw,6rem);line-height:1.06">
        The Art of <em class="text-champagne italic">Clean</em>
      </h1>
    </div>
  </div>
</section>

<!-- Story -->
<section class="bg-ivory py-28">
  <div class="max-w-7xl mx-auto px-6 md:px-10">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div class="reveal-left">
        <h2 class="section-heading mb-6">Founded on <em>Excellence</em></h2>
        <p class="text-char-soft leading-relaxed mb-5">
          <?= SITE_NAME ?> was founded in West Hartford, CT with a single belief: that every space — no matter the size — deserves to be treated with respect, care, and artisanship.
        </p>
        <p class="text-char-soft leading-relaxed mb-5">
          We began as a small, boutique operation serving private residences in West Hartford and Greater Connecticut. Word spread quietly, the way it does among discerning clients. Today we serve estates, offices, and event spaces across Greater West Hartford, CT with the same founding values.
        </p>
        <p class="text-char-soft leading-relaxed">
          Our philosophy is simple: cleanliness is not a task — it is a standard. One that, once experienced at the Alira level, is impossible to compromise on.
        </p>
      </div>
      <div class="about-visual relative h-[440px] reveal-right">
        <div class="about-img about-img-1 absolute rounded-3xl overflow-hidden shadow-2xl">
          <div class="about-img-bg about-bg-1"></div>
        </div>
        <div class="about-img about-img-2 absolute rounded-2xl overflow-hidden shadow-xl z-10">
          <div class="about-img-bg about-bg-2"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Values -->
<section class="bg-cream py-28">
  <div class="max-w-7xl mx-auto px-6 md:px-10">
    <div class="text-center mb-16 reveal-up">
      <div class="section-label justify-center mb-5">
        <span class="label-line"></span><span>Core Values</span><span class="label-line"></span>
      </div>
      <h2 class="section-heading">What We <em>Stand For</em></h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <?php
        $vals = [
          ['n'=>'01','t'=>'Integrity','b'=>'We enter your home with the same respect we would want for our own. Every promise we make is kept.'],
          ['n'=>'02','t'=>'Artisanship','b'=>'Our work is not mechanical — it is considered. Every surface, every corner, approached with precision.'],
          ['n'=>'03','t'=>'Discretion','b'=>'Your home is your sanctuary. We operate silently, professionally, and with the utmost respect for your privacy.'],
          ['n'=>'04','t'=>'Sustainability','b'=>'Luxury should never come at the planet\'s expense. We use only eco-certified, non-toxic premium products.'],
          ['n'=>'05','t'=>'Excellence','b'=>'Good enough is never enough. We set the standard and then exceed it — every single visit.'],
          ['n'=>'06','t'=>'Warmth','b'=>'Behind every clean home is a person we care about. We bring genuine warmth to everything we do.'],
        ];
        foreach ($vals as $i => $v): ?>
      <div class="bg-ivory border border-sand rounded-3xl p-8 reveal-up" style="transition-delay:<?= $i*60 ?>ms">
        <div class="font-serif text-4xl text-champagne/25 font-light mb-4"><?= $v['n'] ?></div>
        <h3 class="font-serif text-xl font-light text-charcoal mb-3"><?= $v['t'] ?></h3>
        <p class="text-sm text-char-soft leading-relaxed"><?= $v['b'] ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- CTA band -->
<section class="bg-charcoal py-24 text-center relative overflow-hidden">
  <div class="orb orb-2" style="opacity:.2" aria-hidden="true"></div>
  <div class="relative z-10">
    <div class="section-label justify-center mb-6" style="--lc:rgba(214,185,140,1);--ltc:rgba(214,185,140,.6)">
      <span class="label-line" style="background:var(--ltc)"></span>
      <span style="color:var(--lc)">Experience Alira</span>
      <span class="label-line" style="background:var(--ltc)"></span>
    </div>
    <h2 class="font-serif font-light text-ivory mb-8" style="font-size:clamp(2rem,4vw,3.2rem)">Ready to Transform Your Space?</h2>
    <a href="index.php#booking" class="btn-primary inline-flex">Book a Consultation</a>
  </div>
</section>

</main>

<?php require_once 'includes/footer.php'; ?>
