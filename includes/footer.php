<footer class="bg-forest text-white/60 pt-20 pb-0">
  <div class="max-w-7xl mx-auto px-6 md:px-10">

    <!-- Top: brand + columns -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/8">

      <!-- Brand -->
      <div class="lg:col-span-2">
        <!-- Logo -->
        <a href="/" style="display:inline-flex;align-items:center;gap:12px;text-decoration:none;margin-bottom:6px">
          <svg width="36" height="32" viewBox="0 0 100 88" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <polygon points="50,2 98,87 2,87" fill="white"/>
            <polygon points="50,42 74,83 26,83" fill="#F26522"/>
          </svg>
          <span style="font-family:'Space Grotesk',sans-serif;font-weight:300;font-size:1.5rem;color:#fff;letter-spacing:0.06em;line-height:1">aalirah</span>
        </a>
        <div class="text-xs tracking-[0.18em] uppercase text-mint/60 mb-6" style="margin-top:8px"><?= SITE_TAGLINE ?></div>
        <p class="text-sm leading-relaxed max-w-xs mb-8 text-white/50">
          Professional cleaning services that transform your space. Trusted by 500+ clients across West Hartford, CT.
        </p>
        <!-- Socials -->
        <div class="flex gap-3">
          <?php
            $socials = [
              ['label'=>'Instagram','href'=>SITE_IG,'path'=>'<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>'],
              ['label'=>'Facebook', 'href'=>SITE_FB,'path'=>'<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>'],
              ['label'=>'LinkedIn', 'href'=>SITE_LI,'path'=>'<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>'],
            ];
            foreach ($socials as $s): ?>
          <a href="<?= $s['href'] ?>" class="social-btn" aria-label="<?= $s['label'] ?>">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><?= $s['path'] ?></svg>
          </a>
          <?php endforeach; ?>
        </div>
      </div>

      <!-- Services links -->
      <div>
        <h4 class="text-xs tracking-[0.18em] uppercase text-white font-semibold mb-6">Services</h4>
        <ul class="space-y-3 text-sm">
          <?php foreach(['Residential Deep Clean','Office & Commercial','Move In / Move Out','Post-Construction','Luxury Estate Care','Event Preparation'] as $s): ?>
          <li><a href="/services.php" class="footer-link"><?= $s ?></a></li>
          <?php endforeach; ?>
        </ul>
      </div>

      <!-- Contact + Newsletter -->
      <div>
        <h4 class="text-xs tracking-[0.18em] uppercase text-white font-semibold mb-6">Stay in Touch</h4>
        <div class="space-y-3 text-sm mb-8">
          <a href="tel:<?= preg_replace('/[^0-9+]/', '', SITE_PHONE) ?>" class="footer-link flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.72 10.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.63 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 7.61a16 16 0 006.29 6.29l.98-.87a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            <?= SITE_PHONE ?>
          </a>
          <a href="mailto:<?= SITE_EMAIL ?>" class="footer-link flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <?= SITE_EMAIL ?>
          </a>
          <div class="flex items-center gap-2 text-white/40">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            Mon–Sat, 7am–7pm PST
          </div>
        </div>
        <form class="newsletter-form" action="#" method="POST">
          <input type="email" name="nl_email" placeholder="your@email.com" required class="nl-input"/>
          <button type="submit" class="nl-btn" aria-label="Subscribe">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </form>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 py-6 text-xs text-white/25">
      <span>&copy; <?= date('Y') ?> <?= SITE_NAME ?>. All rights reserved.</span>
      <div class="flex gap-6">
        <a href="#" class="hover:text-mint transition-colors duration-300">Privacy Policy</a>
        <a href="#" class="hover:text-mint transition-colors duration-300">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>

<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<!-- Lenis -->
<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
<!-- App JS -->
<script src="/assets/js/main.js"></script>
</body>
</html>
