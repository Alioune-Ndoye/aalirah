import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import Seo, { JsonLd } from '../components/Seo';
import { meta, breadcrumbLd } from '../lib/seo';
import { specials } from '../lib/data';
import { site } from '../lib/site';

export default function Specials() {
  return (
    <>
      <Seo {...meta.specials} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Specials', path: '/specials' },
        ])}
      />

      <PageHero
        label="Save More"
        title="Specials"
        em="& Offers"
        sub={`Current promotions for ${site.city} and Greater Connecticut clients. New-customer savings, referral credit, recurring discounts, and gift cards.`}
        marquee
        minH="56vh"
      />

      <section className="bg-ivory py-24 md:py-28">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-6">
          {specials.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.08}>
              <div className="relative h-full rounded-3xl p-8" style={{ background: '#fff', border: '1px solid var(--border)' }}>
                {s.badge && (
                  <span
                    className="absolute top-6 right-6 inline-flex items-center px-3 py-1 rounded-full"
                    style={{ background: 'var(--mint)', color: 'var(--forest)', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  >
                    {s.badge}
                  </span>
                )}
                <div className="w-13 h-13 rounded-2xl flex items-center justify-center mb-6" style={{ width: 52, height: 52, background: 'rgba(198,167,105,0.14)', color: 'var(--mint-dark)' }}>
                  <Icon name={s.icon} size={24} strokeWidth={1.6} />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.7rem', color: 'var(--forest)', marginBottom: 12, lineHeight: 1.2 }}>
                  {s.title}
                </h3>
                <p style={{ color: 'var(--text-soft)', lineHeight: 1.7, marginBottom: 16 }}>{s.detail}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontStyle: 'italic' }}>{s.terms}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-16">
          <Link to="/book" className="btn-primary">
            Claim Your Offer
            <Icon name="arrow" size={14} strokeWidth={2} />
          </Link>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 14 }}>
            Mention your offer when booking. Offers subject to change.
          </p>
        </Reveal>
      </section>
    </>
  );
}
