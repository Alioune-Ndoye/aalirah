import Link from 'next/link';
import siteConfig from '@/data/siteConfig';

export default function Navbar() {
  return (
    <>
      <header id="nav" className="fixed top-0 inset-x-0 z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between" style={{height:'72px'}}>

          {/* Logo */}
          <Link href="/" className="nav-logo font-display font-bold text-xl tracking-tight text-white transition-colors duration-400">
            {siteConfig.SITE_NAME}
            <span className="nav-logo-dot"></span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/services" className="nav-link">Services</Link>
            <Link href="/#how-it-works" className="nav-link">Why Us</Link>
            <Link href="/#testimonials" className="nav-link">Reviews</Link>
            <Link href="/#contact" className="nav-link">Contact</Link>
            <Link href="/book" className="nav-cta">Book Now</Link>
          </nav>

          {/* Mobile hamburger */}
          <button id="mob-btn" className="md:hidden flex flex-col gap-[5px] p-2 z-50" aria-label="Toggle menu" aria-expanded="false">
            <span className="ham-bar"></span>
            <span className="ham-bar"></span>
            <span className="ham-bar"></span>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div id="mob-menu" className="mob-menu" aria-hidden="true">
        <nav className="flex flex-col items-center justify-center gap-9 h-full">
          <Link href="/services"      className="mob-link" data-close="">Services</Link>
          <Link href="/#how-it-works" className="mob-link" data-close="">Why Us</Link>
          <Link href="/#testimonials" className="mob-link" data-close="">Reviews</Link>
          <Link href="/#contact"      className="mob-link" data-close="">Contact</Link>
          <Link href="/book"          className="mob-link mob-cta" data-close="">Book Now</Link>
        </nav>
      </div>
    </>
  );
}
