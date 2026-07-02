import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Icon from './Icon';
import type { IconName } from './Icon';
import { site, tel, mailto } from '../lib/site';
import { services } from '../lib/data';
import { areas } from '../lib/areas';
import { submitLead } from '../lib/forms';
import { useSiteSettings } from '../lib/settingsStore';

// Only render social links that point to a real profile (not the "#" placeholder).
const socials = (
  [
    { label: 'Instagram', href: site.social.instagram, icon: 'instagram' },
    { label: 'Facebook', href: site.social.facebook, icon: 'facebook' },
    { label: 'LinkedIn', href: site.social.linkedin, icon: 'linkedin' },
  ] as { label: string; href: string; icon: IconName }[]
).filter((s) => s.href && s.href !== '#');

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const settings = useSiteSettings();

  const onSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (new FormData(e.currentTarget).get('nl_email') as string) || '';
    e.currentTarget.reset();
    setSubscribed(true);
    await submitLead('Newsletter Signup', { email });
  };

  return (
    <footer className="bg-forest text-white/60 pt-20 pb-24 md:pb-0">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" style={{ display: 'inline-flex', marginBottom: 6 }}>
              <Logo size={36} />
            </Link>
            <div className="text-xs tracking-[0.18em] uppercase text-mint/60 mb-6" style={{ marginTop: 8 }}>
              {site.tagline}
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-8 text-white/50">
              Professional cleaning services that transform your space — eco-certified, insured, and
              background-checked, serving West Hartford, CT and Greater Hartford.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label={s.label}>
                  <Icon name={s.icon} size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs tracking-[0.18em] uppercase text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="footer-link">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-xs tracking-[0.18em] uppercase text-white font-semibold mb-6">Service Areas</h4>
            <ul className="space-y-3 text-sm">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link to={`/cleaning/${a.slug}`} className="footer-link">
                    {a.town}, {site.state}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tracking-[0.18em] uppercase text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/how-it-works', label: 'How It Works' },
                // Admin-gated: hidden until enabled in the dashboard.
                ...(settings.showGuarantee ? [{ to: '/guarantee', label: 'Our Guarantee' }] : []),
                ...(settings.showSpecials ? [{ to: '/specials', label: 'Specials' }] : []),
                { to: '/reviews', label: 'Reviews' },
                { to: '/pricing', label: 'Pricing' },
                { to: '/about', label: 'About' },
                { to: '/#contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/login" className="footer-link">
                  Client Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-xs tracking-[0.18em] uppercase text-white font-semibold mb-6">Stay in Touch</h4>
            <div className="space-y-3 text-sm mb-8">
              <a href={tel} className="footer-link flex items-center gap-2">
                <Icon name="phone" size={13} strokeWidth={1.5} />
                {site.phone}
              </a>
              <a href={mailto} className="footer-link flex items-center gap-2">
                <Icon name="mail" size={13} strokeWidth={1.5} />
                {site.email}
              </a>
              <div className="flex items-center gap-2 text-white/40">
                <Icon name="clock" size={13} strokeWidth={1.5} />
                {site.hours}
              </div>
            </div>
            {subscribed ? (
              <p className="text-sm text-mint">Thanks — you're on the list. ✦</p>
            ) : (
              <form className="newsletter-form" onSubmit={onSubscribe}>
                <input type="email" name="nl_email" placeholder="your@email.com" required className="nl-input" aria-label="Email address" />
                <button type="submit" className="nl-btn" aria-label="Subscribe">
                  <Icon name="arrow" size={14} strokeWidth={2} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 text-xs text-white/25">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-mint transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-mint transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
