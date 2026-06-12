<header id="nav" class="fixed top-0 inset-x-0 z-50 transition-all duration-500">
  <div class="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-18 md:h-22" style="height:72px">

    <!-- Logo -->
    <a href="/" style="display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0" aria-label="Aalirah Home">
      <!-- Mark: outer white triangle + inner orange triangle -->
      <svg width="30" height="27" viewBox="0 0 100 88" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <polygon points="50,2 98,87 2,87" fill="white"/>
        <polygon points="50,42 74,83 26,83" fill="#F26522"/>
      </svg>
      <!-- Wordmark -->
      <span style="font-family:'Space Grotesk',sans-serif;font-weight:300;font-size:1.25rem;color:#fff;letter-spacing:0.06em;line-height:1">aalirah</span>
    </a>

    <!-- Desktop links -->
    <nav class="hidden md:flex items-center gap-8">
      <a href="/services.php"      class="nav-link">Services</a>
      <a href="/#how-it-works"  class="nav-link">Why Us</a>
      <a href="/#testimonials"  class="nav-link">Reviews</a>
      <a href="/#contact"       class="nav-link">Contact</a>
      <a href="/book.php"                 class="nav-cta">Book Now</a>
    </nav>

    <!-- Mobile hamburger -->
    <button id="mob-btn" class="md:hidden flex flex-col gap-[5px] p-2 z-50" aria-label="Toggle menu" aria-expanded="false">
      <span class="ham-bar"></span>
      <span class="ham-bar"></span>
      <span class="ham-bar"></span>
    </button>
  </div>

</header>

<!-- Mobile menu overlay — outside header so backdrop-filter doesn't clip it -->
<div id="mob-menu" class="mob-menu" aria-hidden="true">
  <div style="display:flex;justify-content:center;padding:28px 0 8px">
    <a href="/" style="display:inline-flex;align-items:center;gap:10px;text-decoration:none">
      <svg width="28" height="25" viewBox="0 0 100 88" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <polygon points="50,2 98,87 2,87" fill="white"/>
        <polygon points="50,42 74,83 26,83" fill="#F26522"/>
      </svg>
      <span style="font-family:'Space Grotesk',sans-serif;font-weight:300;font-size:1.15rem;color:#fff;letter-spacing:0.06em">aalirah</span>
    </a>
  </div>
  <nav class="flex flex-col items-center gap-0" style="padding:12px 24px 28px">
    <a href="/services.php"      class="mob-link" data-close>Services</a>
    <a href="/#how-it-works"  class="mob-link" data-close>Why Us</a>
    <a href="/#testimonials"  class="mob-link" data-close>Reviews</a>
    <a href="/#contact"       class="mob-link" data-close>Contact</a>
    <a href="/book.php"                 class="mob-link mob-cta" data-close>Book Now</a>
  </nav>
</div>
