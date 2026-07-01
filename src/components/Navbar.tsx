import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo';
import Icon from './Icon';
import { site, tel } from '../lib/site';
import { useAuth } from '../lib/auth';

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'About' },
];

const mobileLinks = [
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/guarantee', label: 'Our Guarantee' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/specials', label: 'Specials' },
  { to: '/about', label: 'About' },
  { to: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { customer } = useAuth();
  const accountHref = customer ? '/account' : '/login';
  const accountLabel = customer ? 'My Account' : 'Client Login';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={
          scrolled
            ? {
                // Solid (was backdrop-filter blur+saturate) — the bg is ~96% opaque,
                // so the blur was nearly invisible but re-rendered every scroll frame,
                // which was the main desktop scroll lag. Dropping it keeps scrolling smooth.
                background: 'rgba(14,12,10,0.96)',
                borderBottom: '1px solid rgba(198,167,105,0.12)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.25)',
              }
            : { background: 'transparent' }
        }
      >
        {/* ── Top utility bar (collapses on scroll) ── */}
        <div
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: scrolled ? 0 : 40,
            opacity: scrolled ? 0 : 1,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="wrap flex items-center justify-between" style={{ height: 38 }}>
            <div className="flex items-center gap-5">
              <a href={tel} className="flex items-center gap-2" style={{ color: 'var(--mint-light)', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.74rem', fontWeight: 600, letterSpacing: '0.04em' }}>
                <Icon name="phone" size={13} strokeWidth={1.8} />
                {site.phone}
              </a>
              <span className="hidden sm:flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                <Icon name="shield" size={12} strokeWidth={1.8} />
                Insured &amp; Bonded
              </span>
            </div>
            <Link
              to={accountHref}
              className="flex items-center gap-1.5"
              style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
              <Icon name="users" size={12} strokeWidth={1.8} />
              {accountLabel}
            </Link>
          </div>
        </div>

        {/* ── Main nav row ── */}
        <div className="wrap flex items-center justify-between" style={{ height: 64 }}>
          <Link to="/" aria-label={`${site.name} home`} style={{ flexShrink: 0 }}>
            <Logo size={30} />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                {l.label}
              </NavLink>
            ))}
            <a href={tel} className="nav-link hidden lg:inline-flex items-center gap-1.5">
              <Icon name="phone" size={13} strokeWidth={1.9} />
              Call
            </a>
            <Link to="/book" className="nav-cta">
              Get a Free Quote
            </Link>
          </nav>

          <button
            className={`ham md:hidden flex flex-col gap-[5px] p-2 z-50${open ? ' open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="ham-bar" />
            <span className="ham-bar" />
            <span className="ham-bar" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed',
              top: 12,
              left: 16,
              right: 16,
              maxHeight: 'calc(100vh - 24px)',
              overflowY: 'auto',
              background: 'rgba(14,12,10,0.98)',
              border: '1px solid rgba(198,167,105,0.15)',
              borderRadius: 20,
              zIndex: 60,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 6px' }}>
              <Logo size={28} />
            </div>
            <nav style={{ padding: '8px 24px 16px' }}>
              {mobileLinks.map((l) => (
                <Link key={l.to} to={l.to} className="mob-link" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/book" className="nav-cta" style={{ justifyContent: 'center', padding: '13px 0', fontSize: '0.82rem' }} onClick={() => setOpen(false)}>
                Get a Free Quote
              </Link>
              <a href={tel} className="flex items-center justify-center gap-2 rounded-full" style={{ border: '1.5px solid rgba(255,255,255,0.25)', color: '#fff', padding: '12px 0', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                <Icon name="phone" size={15} strokeWidth={1.8} />
                {site.phone}
              </a>
              <Link
                to={accountHref}
                className="text-center"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}
                onClick={() => setOpen(false)}
              >
                {accountLabel}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
