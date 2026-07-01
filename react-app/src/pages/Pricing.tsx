import { type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import TrustMarquee from '../components/TrustMarquee';
import Seo, { JsonLd } from '../components/Seo';
import { meta, breadcrumbLd } from '../lib/seo';
import { services, addons, frequencies, serviceBasePrice, residentialTiers } from '../lib/data';

const other = services.filter((s) => s.slug !== 'residential-deep-clean');

/* Shared dark-card tokens echoing the WhyUs / AreaPage idiom. */
const goldText: CSSProperties = {
  background: 'linear-gradient(135deg, var(--mint-light) 0%, var(--mint-dark) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};
const darkCard: CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(198,167,105,0.12)',
};
const popularCard: CSSProperties = {
  background: 'rgba(198,167,105,0.07)',
  border: '1px solid rgba(198,167,105,0.5)',
  boxShadow: '0 0 0 1px rgba(198,167,105,0.18), 0 24px 60px -24px rgba(198,167,105,0.45)',
};
const popularBadge: CSSProperties = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '0.55rem',
  fontWeight: 700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--forest)',
  background: 'var(--mint)',
  padding: '5px 12px',
  borderRadius: 100,
  boxShadow: '0 6px 20px rgba(198,167,105,0.4)',
};

/* Faint blueprint grid that backs every dark section. */
function GridBg() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage:
          'linear-gradient(rgba(198,167,105,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(198,167,105,0.05) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }}
    />
  );
}

export default function Pricing() {
  return (
    <>
      <Seo {...meta.pricing} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Pricing', path: '/pricing' },
        ])}
      />

      <PageHero
        label="Transparent Pricing"
        title="Simple,"
        em="Upfront Rates"
        sub="No hidden fees, no surprises. Get an instant estimate online, and we confirm final pricing after a quick walkthrough."
        minH="52vh"
      />

      {/* Trust Marquee */}
      <TrustMarquee />

      {/* Residential by size */}
      <section className="relative py-24 md:py-28 overflow-hidden" style={{ background: 'var(--forest-deep)' }}>
        <GridBg />
        <div className="orb orb-1" style={{ opacity: 0.5 }} aria-hidden="true" />
        <div className="wrap relative z-10">
          <Reveal className="mb-12">
            <div className="section-label mb-4">
              <span className="label-line" />
              <span>Residential Deep Clean</span>
            </div>
            <h2 className="section-heading-white">
              Priced by <em>Home Size</em>
            </h2>
            <p className="mt-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
              Your starting rate is based on your home's square footage — the same way the booking tool quotes you. Recurring visits save up to 15%.
            </p>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {residentialTiers.map((t) => (
                <div key={t.label} className="rounded-2xl p-6" style={darkCard}>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>
                    {t.label}
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '1.7rem', ...goldText }}>
                    from ${t.price}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-xl" style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
              Bedrooms, bathrooms, and add-ons are configured in the booking tool. Final pricing confirmed after a quick walkthrough.
            </p>
            <Link to="/book" className="btn-primary mt-6">
              Build your quote
              <Icon name="arrow" size={14} strokeWidth={2} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      <section className="relative py-24 md:py-28 overflow-hidden" style={{ background: 'var(--forest)' }}>
        <GridBg />
        <div className="wrap relative z-10">
          <Reveal className="mb-12">
            <div className="section-label mb-4">
              <span className="label-line" />
              <span>Specialty & Commercial</span>
            </div>
            <h2 className="section-heading-white">
              Other <em>Services</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {other.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <div className="rounded-2xl p-7 h-full flex items-start gap-4" style={darkCard}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(198,167,105,0.12)', color: 'var(--mint)' }}>
                    <Icon name={s.icon} size={20} strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#fff' }}>{s.shortTitle}</h3>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '1.5rem', margin: '4px 0', ...goldText }}>
                      from ${serviceBasePrice[s.slug]}
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons + frequency */}
      <section className="relative py-24 md:py-28 overflow-hidden" style={{ background: 'var(--forest-deep)' }}>
        <GridBg />
        <div className="orb orb-2" style={{ opacity: 0.5 }} aria-hidden="true" />
        <div className="wrap relative z-10 grid lg:grid-cols-2 gap-12">
          <Reveal>
            <h3 className="section-heading-white mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
              Popular <em>Add-Ons</em>
            </h3>
            <div className="space-y-3">
              {addons.map((a) => (
                <div key={a.id} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(198,167,105,0.12)' }}>
                  <span className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                    <Icon name="check" size={15} strokeWidth={2.4} className="text-mint" />
                    {a.label}
                  </span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, ...goldText }}>+${a.price}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="section-heading-white mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
              Save with <em>Recurring</em>
            </h3>
            <div className="space-y-3">
              {frequencies.map((f) => {
                const best = f.id === 'weekly';
                return (
                  <div
                    key={f.id}
                    className="relative flex items-center justify-between rounded-xl px-5 py-4"
                    style={best ? popularCard : darkCard}
                  >
                    <span className="flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: '#fff' }}>
                      {f.label}
                      {best && <span style={popularBadge}>Best Value</span>}
                    </span>
                    <span style={{ color: f.note ? 'var(--mint)' : 'rgba(255,255,255,0.4)', fontWeight: 600, fontSize: '0.9rem' }}>
                      {f.note || 'Standard rate'}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-sm" style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
              Final pricing is confirmed after a quick walkthrough. No deposit required to book, and our 100%
              satisfaction guarantee covers every visit.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center relative overflow-hidden" style={{ background: 'var(--forest)' }}>
        <div className="orb orb-1" style={{ opacity: 0.4 }} aria-hidden="true" />
        <div className="relative z-10">
          <h2 className="section-heading-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Get Your <em>Exact Quote</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>Instant estimate online — in under 60 seconds.</p>
          <Link to="/book" className="btn-primary">
            Get a Free Quote
            <Icon name="arrow" size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
