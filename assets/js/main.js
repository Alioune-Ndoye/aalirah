/* ─────────────────────────────────────────────────────────
   LUMIÈRE — Main JS
   Stack: GSAP 3 + ScrollTrigger + Lenis
───────────────────────────────────────────────────────── */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initLenis();
  initNavbar();
  initHeroVideo();
  initHeroAnimations();
  initScrollReveals();
  initAutoScrollCarousels();
  initCinematicTransitions();
  initCounters();
  initWhyFeat();
  initHomeSizePicker();
  initSizeAccordion();
  initBeforeAfter();
  initServicesCarousel();
  initServiceCardReveal();
  initFormValidation();
  initMobileMenu();
  initGeolocation();
});


/* ═══════════════════════════════════════════════════════
   LOADER
════════════════════════════════════════════════════════ */
function initLoader() {
  const ldr = document.getElementById('ldr');
  if (!ldr) return;

  setTimeout(() => {
    ldr.classList.add('out');
    setTimeout(() => {
      document.body.classList.add('loaded');
      animateHeroEntrance();
    }, 300);
  }, 500);
}


/* ═══════════════════════════════════════════════════════
   LENIS SMOOTH SCROLL — Enhanced inertia feel
════════════════════════════════════════════════════════ */
function initLenis() {
  if (typeof Lenis === 'undefined') return;

  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  const lenis = new Lenis({
    duration:        isMobile ? 0.5 : 0.85,   // desktop: smooth but not sluggish
    easing:          t => 1 - Math.pow(1 - t, 3), // cubic out: responsive start, soft landing
    smoothWheel:     true,
    wheelMultiplier: isMobile ? 1.0 : 1.2,
    touchMultiplier: 1.4,
    infinite:        false,
    orientation:     'vertical',
    gestureOrientation: 'vertical',
    syncTouch:       false,
  });

  window._lenis = lenis;

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Single RAF loop — GSAP drives Lenis, Lenis feeds ScrollTrigger
    gsap.ticker.fps(120);                        // uncap frame rate for high-refresh displays
    gsap.ticker.lagSmoothing(0);                 // never skip frames to "catch up"
    gsap.ticker.add(time => lenis.raf(time * 1000));
    lenis.on('scroll', ScrollTrigger.update);

    ScrollTrigger.defaults({ markers: false });
  }

  // Smooth anchor navigation — handles both href="#section"
  // and same-page href="index.php#section" links
  document.querySelectorAll('a[href*="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      const hashIdx = href.indexOf('#');
      const hash = href.slice(hashIdx);          // e.g. "#about"
      if (!hash || hash === '#') return;

      // Only intercept if the path is blank, '#', or points to this page
      const path = href.slice(0, hashIdx);       // e.g. "index.php" or ""
      const currentPage = location.pathname.split('/').pop() || 'index.php';
      const isSamePage = !path || path === '#' || path === currentPage;
      if (!isSamePage) return;                   // cross-page link: let browser handle it

      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.8 });
    });
  });

  // RAF fallback (only if GSAP ticker not handling it)
  if (typeof gsap === 'undefined') {
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }
}


/* ═══════════════════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════════════════════ */
function initCursor() {
  const dot  = document.getElementById('cur');
  const ring = document.getElementById('cur2');
  if (!dot || !ring) return;
  if (!matchMedia('(hover: hover)').matches) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  const lerp = (a, b, n) => a + (b - a) * n;
  const tick = () => {
    dot.style.transform  = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    rx = lerp(rx, mx, 0.11);
    ry = lerp(ry, my, 0.11);
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };
  tick();

  document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '';
    ring.style.opacity = '';
  });
}


/* ═══════════════════════════════════════════════════════
   NAVBAR
════════════════════════════════════════════════════════ */
function initNavbar() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const update = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', update, { passive: true });
  update();
}


/* ═══════════════════════════════════════════════════════
   MOBILE MENU
════════════════════════════════════════════════════════ */
function initMobileMenu() {
  const btn  = document.getElementById('mob-btn');
  const menu = document.getElementById('mob-menu');
  const nav  = document.getElementById('nav');
  if (!btn || !menu) return;

  const setMenuOpen = (isOpen) => {
    menu.classList.toggle('open', isOpen);
    btn.classList.toggle('open', isOpen);
    if (nav) nav.classList.toggle('menu-open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));
    if (window._lenis) isOpen ? window._lenis.stop() : window._lenis.start();
  };

  const toggle = () => setMenuOpen(!menu.classList.contains('open'));

  btn.addEventListener('click', toggle);

  menu.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', (e) => {
      const href  = el.getAttribute('href') || '';
      const hash  = href.includes('#') ? href.split('#')[1] : null;

      setMenuOpen(false);

      // If it's an anchor link on the same page, handle scroll manually
      // after the menu overlay finishes closing (450ms transition)
      if (hash) {
        e.preventDefault();
        setTimeout(() => {
          const target = document.getElementById(hash);
          if (!target) return;
          if (window._lenis) {
            window._lenis.scrollTo(target, { offset: -80, duration: 1.2 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 460);
      }
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) toggle();
  });
}


/* ═══════════════════════════════════════════════════════
   HERO ANIMATIONS
════════════════════════════════════════════════════════ */
/* ── Hero video — desktop vs mobile source ─────────────── */
function initHeroVideo() {
  const video = document.getElementById('heroVideo');
  if (!video) return;

  const mq = window.matchMedia('(max-width: 767px)');

  const setSource = (isMobile) => {
    const desired = isMobile
      ? 'assets/video/apartment_mobile.mp4'
      : 'assets/video/apartment_6s.mp4';
    // Avoid reload if already on the correct source
    if (video.src && video.src.endsWith(desired)) return;
    video.src = desired;
    video.load();
    video.play().catch(() => {});
  };

  setSource(mq.matches);
  // Auto-swap when DevTools or device rotates past the breakpoint
  mq.addEventListener('change', e => setSource(e.matches));
}

function initHeroAnimations() {
  const lines   = document.querySelectorAll('.hero-line');
  const eyebrow = document.querySelector('.hero-eyebrow');
  const sub     = document.querySelector('.hero-sub');
  const cta     = document.querySelector('.hero-cta');
  const stats   = document.querySelector('.hero-stats');
  const visual  = document.querySelector('.hero-visual');
  const hint    = document.querySelector('.scroll-hint');

  gsap.set(lines,   { yPercent: 110, opacity: 0 });
  gsap.set([eyebrow, sub, cta, stats, hint].filter(Boolean), { opacity: 0, y: 22 });
  if (visual) gsap.set(visual, { opacity: 0, x: 40 });
}

function animateHeroEntrance() {
  if (typeof gsap === 'undefined') return;

  const lines   = document.querySelectorAll('.hero-line');
  const eyebrow = document.querySelector('.hero-eyebrow');
  const sub     = document.querySelector('.hero-sub');
  const cta     = document.querySelector('.hero-cta');
  const stats   = document.querySelector('.hero-stats');
  const visual  = document.querySelector('.hero-visual');
  const hint    = document.querySelector('.scroll-hint');

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.8 }, 0)
    .to(lines,   { yPercent: 0, opacity: 1, duration: 1.0, stagger: 0.14 }, 0.15)
    .to(sub,     { opacity: 1, y: 0, duration: 0.75 }, 0.62)
    .to(cta,     { opacity: 1, y: 0, duration: 0.7  }, 0.80)
    .to(stats,   { opacity: 1, y: 0, duration: 0.7  }, 0.94)
    .to(visual,  { opacity: 1, x: 0, duration: 1.1  }, 0.45)
    .to(hint,    { opacity: 1, y: 0, duration: 0.6  }, 1.35);
}


/* ═══════════════════════════════════════════════════════
   SCROLL REVEALS (class-based)
════════════════════════════════════════════════════════ */
function initScrollReveals() {
  if (typeof gsap === 'undefined') return;

  ['.reveal-up', '.reveal-left', '.reveal-right'].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      const delay = parseFloat(el.style.transitionDelay) || 0;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          setTimeout(() => el.classList.add('revealed'), delay);
        },
      });
    });
  });
}


/* ═══════════════════════════════════════════════════════
   AUTO-SCROLL CAROUSELS
   Showcase (Before/After) + Testimonials
   Continuous infinite loop, drag to take control,
   release to resume auto-scroll after 1.8 s
════════════════════════════════════════════════════════ */
function initAutoScrollCarousels() {
  if (typeof gsap === 'undefined') return;

  setupAutoCarousel({
    outerSel:  '.showcase-scroll-outer',
    trackSel:  '#showcaseTrack',
    panelSel:  '.showcase-panel',
    speed:     0.5,
    direction: 1,   // scrolls right → opposite to testimonials
  });

  setupAutoCarousel({
    outerSel:  '.testimonials-scroll-outer',
    trackSel:  '#testimonialsTrack',
    panelSel:  '.t-h-panel',
    speed:     0.4,
    direction: -1,  // scrolls left → unchanged
  });
}

function setupAutoCarousel({ outerSel, trackSel, panelSel, speed, direction = -1 }) {
  const outer = document.querySelector(outerSel);
  const track = document.querySelector(trackSel);
  if (!outer || !track) return;

  const originals = Array.from(track.querySelectorAll(panelSel));
  if (!originals.length) return;

  // Clone all panels and append for seamless wrap
  originals.forEach(panel => {
    const clone = panel.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  let halfWidth    = 0;
  let x            = 0;
  let isDragging   = false;
  let dragStartX   = 0;
  let xAtDragStart = 0;
  let velocity     = 0;
  let lastDragX    = 0;
  let paused       = false;
  let resumeTimer  = null;

  const applyX = () => gsap.set(track, { x, force3D: true });

  const normalizeX = () => {
    if (!halfWidth) return;
    while (x <= -halfWidth) x += halfWidth;
    while (x > 0)           x -= halfWidth;
  };

  const scheduleResume = () => {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { paused = false; }, 1800);
  };

  const ticker = () => {
    if (!isDragging) {
      if (!paused) x += speed * direction;
      normalizeX();
      applyX();
    }
  };

  // Measure after paint so clones are in the DOM
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      halfWidth = track.scrollWidth / 2;
      gsap.ticker.add(ticker);

      // ── Hover pause (desktop only) ──────────────────────
      outer.addEventListener('mouseenter', () => { paused = true; });
      outer.addEventListener('mouseleave', () => {
        if (!isDragging) paused = false;
      });

      // ── Mouse drag ──────────────────────────────────────
      outer.addEventListener('mousedown', e => {
        // Don't hijack the B/A slider handle
        if (e.target.closest('.ba-handle')) return;
        isDragging   = true;
        paused       = true;
        dragStartX   = e.clientX;
        xAtDragStart = x;
        velocity     = 0;
        lastDragX    = e.clientX;
        outer.classList.add('dragging');
        e.preventDefault();
      });

      const onMouseMove = e => {
        if (!isDragging) return;
        velocity  = e.clientX - lastDragX;
        lastDragX = e.clientX;
        x = xAtDragStart + (e.clientX - dragStartX);
        applyX();
      };

      const onMouseUp = () => {
        if (!isDragging) return;
        isDragging = false;
        outer.classList.remove('dragging');
        x += velocity * 5;
        normalizeX();
        applyX();
        scheduleResume();
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup',   onMouseUp);

      // ── Touch drag ──────────────────────────────────────
      outer.addEventListener('touchstart', e => {
        if (e.target.closest('.ba-handle')) return;
        isDragging   = true;
        paused       = true;
        dragStartX   = e.touches[0].clientX;
        xAtDragStart = x;
        velocity     = 0;
        lastDragX    = e.touches[0].clientX;
      }, { passive: true });

      outer.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const cx = e.touches[0].clientX;
        // Prevent page scroll when dragging carousel horizontally
        if (Math.abs(cx - dragStartX) > 6) {
          try { e.preventDefault(); } catch (_) {}
        }
        velocity  = cx - lastDragX;
        lastDragX = cx;
        x = xAtDragStart + (cx - dragStartX);
        applyX();
      }, { passive: false });

      outer.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        x += velocity * 4;
        normalizeX();
        applyX();
        scheduleResume();
      });
    });
  });
}


/* ═══════════════════════════════════════════════════════
   CINEMATIC TRANSITIONS — Parallax depth layer
════════════════════════════════════════════════════════ */
function initCinematicTransitions() {
  if (typeof gsap === 'undefined') return;

  // GPU-promote all parallax targets upfront
  const parallaxTargets = [
    ...document.querySelectorAll('.orb'),
    document.querySelector('.hero-frame-bg'),
    document.querySelector('.about-img-1'),
    document.querySelector('.about-img-2'),
    document.querySelector('.svc-bg-orb'),
    document.querySelector('.why-ring-wrap'),
    document.querySelector('.booking-orb'),
  ].filter(Boolean);
  gsap.set(parallaxTargets, { force3D: true, willChange: 'transform' });

  // ── Hero orbs parallax (smoothed scrub) ──
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const speed = [0.28, 0.42, 0.18][i] || 0.15;
    gsap.to(orb, {
      yPercent: -80 * speed,
      ease: 'none',
      force3D: true,
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2 },
    });
  });

  // ── Hero frame parallax ──
  const heroFrame = document.querySelector('.hero-frame-bg');
  if (heroFrame) {
    gsap.to(heroFrame, {
      yPercent: 22, ease: 'none', force3D: true,
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2 },
    });
  }

  // ── About images parallax ──
  const aboutImg1 = document.querySelector('.about-img-1');
  const aboutImg2 = document.querySelector('.about-img-2');
  if (aboutImg1) gsap.to(aboutImg1, {
    yPercent: -14, ease: 'none', force3D: true,
    scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 2.5 },
  });
  if (aboutImg2) gsap.to(aboutImg2, {
    yPercent: 10, ease: 'none', force3D: true,
    scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 2.5 },
  });

  // ── Services orb drift ──
  const svcOrb = document.querySelector('.svc-bg-orb');
  if (svcOrb) gsap.to(svcOrb, {
    y: 80, ease: 'none', force3D: true,
    scrollTrigger: { trigger: '#services', start: 'top bottom', end: 'bottom top', scrub: 3 },
  });

  // ── Why-Us rings parallax ──
  const whyRings = document.querySelector('.why-ring-wrap');
  if (whyRings) gsap.to(whyRings, {
    yPercent: -15, ease: 'none', force3D: true,
    scrollTrigger: { trigger: '#why-us', start: 'top bottom', end: 'bottom top', scrub: 2.5 },
  });

  // ── Booking orb parallax ──
  const bookingOrb = document.querySelector('.booking-orb');
  if (bookingOrb) gsap.to(bookingOrb, {
    y: 60, ease: 'none', force3D: true,
    scrollTrigger: { trigger: '#booking', start: 'top bottom', end: 'bottom top', scrub: 3 },
  });
}


/* ═══════════════════════════════════════════════════════
   COUNTERS
════════════════════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const animate = el => {
    const target    = parseInt(el.dataset.target, 10);
    const duration  = 1800;
    const startTime = performance.now();

    const step = now => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  if (typeof IntersectionObserver !== 'undefined') {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { animate(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(c => obs.observe(c));
  } else {
    counters.forEach(animate);
  }
}


/* ═══════════════════════════════════════════════════════
   WHY US FEATURES
════════════════════════════════════════════════════════ */
function initWhyFeat() {
  const items = document.querySelectorAll('.why-feat');
  if (!items.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const i  = parseInt(el.dataset.whyI || '0', 10);
        setTimeout(() => el.classList.add('visible'), i * 140);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(el => obs.observe(el));
}


/* ═══════════════════════════════════════════════════════
   HOME-SIZE PICKER (booking form — Residential Deep Clean)
════════════════════════════════════════════════════════ */
function initHomeSizePicker() {
  const select = document.getElementById('serviceSelect');
  const picker = document.getElementById('homeSizePicker');
  if (!select || !picker) return;

  const toggle = () => {
    const isResidential = select.value === 'Residential Deep Clean';
    picker.classList.toggle('visible', isResidential);
    picker.setAttribute('aria-hidden', String(!isResidential));
    // Clear selection when hidden
    if (!isResidential) {
      picker.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
    }
  };

  select.addEventListener('change', toggle);
  toggle(); // run once on load in case browser restores the value
}

/* ════════════════════════════════════════════════════════
   HOME-SIZE ACCORDION (Residential Deep Clean)
════════════════════════════════════════════════════════ */
function initSizeAccordion() {
  document.querySelectorAll('.size-acc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const body    = document.getElementById(btn.getAttribute('aria-controls'));
      const chevron = btn.querySelector('.size-acc-chevron');
      const isOpen  = btn.getAttribute('aria-expanded') === 'true';

      // Close all other panels first
      document.querySelectorAll('.size-acc-btn[aria-expanded="true"]').forEach(other => {
        if (other === btn) return;
        other.setAttribute('aria-expanded', 'false');
        other.querySelector('.size-acc-chevron').style.transform = 'rotate(0deg)';
        const otherBody = document.getElementById(other.getAttribute('aria-controls'));
        otherBody.style.maxHeight = '0';
      });

      // Toggle this panel
      if (isOpen) {
        btn.setAttribute('aria-expanded', 'false');
        chevron.style.transform = 'rotate(0deg)';
        body.style.maxHeight    = '0';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        chevron.style.transform = 'rotate(180deg)';
        body.style.maxHeight    = body.scrollHeight + 'px';
      }
    });
  });
}

/* ════════════════════════════════════════════════════════
   BEFORE / AFTER SLIDER
   Event-delegated so cloned carousel panels work too
════════════════════════════════════════════════════════ */
function initBeforeAfter() {
  let activeWrapper = null;

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(v, hi));

  const update = (wrapper, clientX) => {
    const rect    = wrapper.getBoundingClientRect();
    const pct     = clamp(((clientX - rect.left) / rect.width) * 100, 2, 98);
    const handle  = wrapper.querySelector('.ba-handle');
    const afterEl = wrapper.querySelector('.ba-after');
    if (handle)  handle.style.left      = `${pct}%`;
    if (afterEl) afterEl.style.clipPath = `inset(0 0 0 ${100 - pct}%)`;
  };

  // Initialise all wrappers (including future clones via re-call on tick) at 50%
  const initAll = () => {
    document.querySelectorAll('.ba-wrapper').forEach(wrapper => {
      const rect = wrapper.getBoundingClientRect();
      update(wrapper, rect.left + rect.width / 2);
    });
  };
  initAll();
  // Re-init after clones are added
  requestAnimationFrame(() => requestAnimationFrame(initAll));

  // ── Mouse ──────────────────────────────────────────────
  document.addEventListener('mousedown', e => {
    const handle = e.target.closest('.ba-handle');
    if (!handle) return;
    activeWrapper = handle.closest('.ba-wrapper');
    e.preventDefault();
  });

  window.addEventListener('mouseup', () => { activeWrapper = null; });

  window.addEventListener('mousemove', e => {
    if (!activeWrapper) return;
    update(activeWrapper, e.clientX);
  });

  // ── Touch ──────────────────────────────────────────────
  document.addEventListener('touchstart', e => {
    const handle = e.target.closest('.ba-handle');
    if (!handle) return;
    activeWrapper = handle.closest('.ba-wrapper');
  }, { passive: true });

  window.addEventListener('touchend', () => { activeWrapper = null; });

  window.addEventListener('touchmove', e => {
    if (!activeWrapper) return;
    update(activeWrapper, e.touches[0].clientX);
  }, { passive: true });

  // Click anywhere on wrapper to jump slider
  document.addEventListener('click', e => {
    const wrapper = e.target.closest('.ba-wrapper');
    if (!wrapper || e.target.closest('.ba-handle')) return;
    update(wrapper, e.clientX);
  });
}


/* ═══════════════════════════════════════════════════════
   SERVICES POLAROID CAROUSEL
════════════════════════════════════════════════════════ */
function initServiceCardReveal() {
  document.querySelectorAll('.svc-polaroid').forEach(card => {
    // Touch: press-and-hold reveals, release restores
    card.addEventListener('touchstart',  () => card.classList.add('active'),    { passive: true });
    card.addEventListener('touchend',    () => card.classList.remove('active'));
    card.addEventListener('touchcancel', () => card.classList.remove('active'));
  });
}

function initServicesCarousel() {
  const slides = Array.from(document.querySelectorAll('.svc-slide'));
  const dots   = Array.from(document.querySelectorAll('.svc-dot'));
  if (!slides.length) return;

  const total = slides.length;
  let current = 0;
  let autoTimer = null;

  function goTo(idx) {
    current = ((idx % total) + total) % total;
    slides.forEach((slide, i) => {
      let pos = i - current;
      if (pos >  total / 2) pos -= total;
      if (pos < -total / 2) pos += total;
      pos = Math.max(-3, Math.min(3, pos));
      slide.setAttribute('data-pos', pos);
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const startAuto = () => { stopAuto(); autoTimer = setInterval(next, 4200); };
  const stopAuto  = () => { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } };

  document.querySelector('.svc-arrow-next')?.addEventListener('click', () => { stopAuto(); next(); startAuto(); });
  document.querySelector('.svc-arrow-prev')?.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
  });

  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => {
      if (parseInt(slide.getAttribute('data-pos')) !== 0) { stopAuto(); goTo(i); startAuto(); }
    });
  });

  const stage = document.querySelector('.svc-stage');
  if (stage) {
    let touchStartX = 0;
    stage.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) { stopAuto(); dx < 0 ? next() : prev(); startAuto(); }
    }, { passive: true });
  }

  goTo(0);
  startAuto();
}


/* ═══════════════════════════════════════════════════════
   FORM VALIDATION
════════════════════════════════════════════════════════ */
function initFormValidation() {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      const ok = field.value.trim() !== '';
      field.style.borderColor = ok ? '' : 'rgba(200, 60, 60, 0.6)';
      if (!ok) valid = false;
    });

    if (!valid) return;

    const btn  = form.querySelector('[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<span>Sent! We\'ll be in touch shortly.</span>';
    btn.disabled  = true;
    btn.style.background = '#4CAF88';

    setTimeout(() => {
      btn.innerHTML  = orig;
      btn.disabled   = false;
      btn.style.background = '';
      form.reset();
    }, 4000);
  });

  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => { input.style.borderColor = ''; });
  });
}


/* ═══════════════════════════════════════════════════════
   GEOLOCATION — Update .geo-location elements with
   the visitor's real city/state via Nominatim
════════════════════════════════════════════════════════ */
function initGeolocation() {
  const els = document.querySelectorAll('.geo-location');
  if (!els.length || !navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude: lat, longitude: lon } = pos.coords;
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(r => r.json())
        .then(data => {
          const addr  = data.address || {};
          const city  = addr.city || addr.town || addr.village || addr.county || '';
          const state = addr.state || '';
          const label = [city, state].filter(Boolean).join(', ');
          if (!label) return;

          els.forEach(el => {
            el.style.transition = 'opacity 0.5s ease';
            el.style.opacity    = '0';
            setTimeout(() => {
              el.textContent  = label;
              el.style.opacity = '1';
            }, 500);
          });
        })
        .catch(() => {}); // keep default on network error
    },
    () => {} // keep default on permission denied
  );
}


/* ═══════════════════════════════════════════════════════
   SERVICE CARD TILT (desktop hover effect)
════════════════════════════════════════════════════════ */
document.querySelectorAll('.svc-card').forEach(card => {
  if (!matchMedia('(hover: hover)').matches) return;

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx   = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy   = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${cy * -4}deg) rotateY(${cx * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});


/* ═══════════════════════════════════════════════════════
   SERVICE CARD FLIP — tap to flip on touch devices
════════════════════════════════════════════════════════ */
document.querySelectorAll('.svc-card').forEach(card => {
  card.addEventListener('click', () => {
    if (!matchMedia('(hover: hover)').matches) {
      card.classList.toggle('flipped');
    }
  });
});


/* ═══════════════════════════════════════════════════════
   VISUAL SERVICE PICKER + ADD-ON TAGS
════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const cards      = document.querySelectorAll('.svc-picker-card');
  const addonSec   = document.getElementById('addonSection');
  const svcHidden  = document.getElementById('serviceHidden');
  const addHidden  = document.getElementById('addonsHidden');
  const allTagSets = document.querySelectorAll('.addon-tags[data-for]');

  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Deselect all cards
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const svc = card.dataset.service;
      svcHidden.value = svc;

      // Show/hide add-on section
      const hasAddons = document.querySelector(`.addon-tags[data-for="${svc}"]`);
      if (hasAddons) {
        // Hide all tag sets, show relevant one
        allTagSets.forEach(ts => ts.style.display = 'none');
        hasAddons.style.display = 'flex';
        addonSec.classList.add('visible');
      } else {
        addonSec.classList.remove('visible');
      }
      // Clear previous addon selections
      document.querySelectorAll('.addon-tag').forEach(t => t.classList.remove('selected'));
      addHidden.value = '';
    });
  });

  // Tag pill toggle
  document.addEventListener('click', e => {
    const tag = e.target.closest('.addon-tag');
    if (!tag) return;
    tag.classList.toggle('selected');

    const selected = Array.from(document.querySelectorAll('.addon-tag.selected'))
      .map(t => t.dataset.tag).join(', ');
    if (addHidden) addHidden.value = selected;
  });
});


/* ═══════════════════════════════════════════════════════
   HOME SIZE PICKER (visual cards)
════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const sizeSection = document.getElementById('sizePicker');
  const sizeHidden  = document.getElementById('homeSizeHidden');
  const sizeCards   = document.querySelectorAll('.size-card');
  if (!sizeSection) return;

  // Show/hide based on service selection
  document.querySelectorAll('.svc-picker-card').forEach(card => {
    card.addEventListener('click', () => {
      if (card.dataset.service === 'Residential Deep Clean') {
        sizeSection.classList.add('visible');
      } else {
        sizeSection.classList.remove('visible');
        sizeCards.forEach(c => c.classList.remove('active'));
        if (sizeHidden) sizeHidden.value = '';
      }
    });
  });

  // Size card selection
  sizeCards.forEach(card => {
    card.addEventListener('click', () => {
      sizeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      if (sizeHidden) sizeHidden.value = card.dataset.size;
    });
  });
});
