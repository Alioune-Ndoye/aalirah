import Link from 'next/link';
import siteConfig from '@/data/siteConfig';

const socials = [
  {
    label: 'Instagram',
    href: siteConfig.SITE_IG,
    path: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
  },
  {
    label: 'Facebook',
    href: siteConfig.SITE_FB,
    path: '<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>',
  },
  {
    label: 'LinkedIn',
    href: siteConfig.SITE_LI,
    path: '<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  },
];

const serviceLinks = [
  'Residential Deep Clean',
  'Office & Commercial',
  'Move In / Move Out',
  'Post-Construction',
  'Luxury Estate Care',
  'Event Preparation',
];

const year = new Date().getFullYear();
const phoneHref = `tel:+${siteConfig.SITE_PHONE_RAW}`;

export default function Footer() {
  return (
    <footer className="bg-forest text-white/60 pt-20 pb-0">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Top: brand + columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="font-display font-bold text-2xl text-white tracking-tight mb-1">
              {siteConfig.SITE_NAME}<span className="text-mint">.</span>
            </div>
            <div className="text-xs tracking-[0.18em] uppercase text-mint/60 mb-6">{siteConfig.SITE_TAGLINE}</div>
            <p className="text-sm leading-relaxed max-w-xs mb-8 text-white/50">
              Professional cleaning services that transform your space. Trusted by 500+ clients across West Hartford, CT.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="social-btn"
                  aria-label={s.label}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" dangerouslySetInnerHTML={{__html: s.path}} />
                </a>
              ))}
            </div>
          </div>

          {/* Services links */}
          <div>
            <h4 className="text-xs tracking-[0.18em] uppercase text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link href="/services" className="footer-link">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-xs tracking-[0.18em] uppercase text-white font-semibold mb-6">Stay in Touch</h4>
            <div className="space-y-3 text-sm mb-8">
              <a href={phoneHref} className="footer-link flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.72 10.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.63 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 7.61a16 16 0 006.29 6.29l.98-.87a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                {siteConfig.SITE_PHONE}
              </a>
              <a href={`mailto:${siteConfig.SITE_EMAIL}`} className="footer-link flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {siteConfig.SITE_EMAIL}
              </a>
              <div className="flex items-center gap-2 text-white/40">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                Mon–Sat, 7am–7pm PST
              </div>
            </div>
            <form className="newsletter-form" action="#" method="POST">
              <input type="email" name="nl_email" placeholder="your@email.com" required className="nl-input" />
              <button type="submit" className="nl-btn" aria-label="Subscribe">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 text-xs text-white/25">
          <span>&copy; {year} {siteConfig.SITE_NAME}. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-mint transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-mint transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
