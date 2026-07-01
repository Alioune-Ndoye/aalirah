import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import Seo, { JsonLd } from '../components/Seo';
import { meta, servicesLd, servicePath, breadcrumbLd } from '../lib/seo';
import { services } from '../lib/data';
import { site } from '../lib/site';

export default function Services() {
  return (
    <>
      <Seo {...meta.services} />
      <JsonLd
        data={[
          servicesLd(),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
        ]}
      />

      <PageHero
        label="What We Offer"
        title="Our"
        em="Services"
        sub="Every space is different. Every clean is tailored. Explore what we can do for yours across West Hartford and Greater Connecticut."
        marquee
        minH="60vh"
      />

      <section style={{ background: 'var(--surface)' }} className="py-24 md:py-28">
        <div className="wrap">
          <Reveal className="mb-14 text-center">
            <div className="section-label justify-center mb-4">
              <span className="label-line" />
              <span>Pick Your Service</span>
              <span className="label-line" />
            </div>
            <h2 className="section-heading">
              Every Clean, <em>Crafted for You</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <Link
                  to={servicePath(s.slug)}
                  className="group block h-full rounded-3xl overflow-hidden bg-white transition-all duration-300"
                  style={{ border: '1px solid var(--border)', boxShadow: '0 2px 16px rgba(44,44,44,0.04)' }}
                >
                  <div className="relative" style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                    <img
                      src={s.image}
                      alt={s.shortTitle}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,12,10,0.55), transparent 60%)' }} />
                    <span
                      className="absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full text-white"
                      style={{ background: 'rgba(198,167,105,0.9)', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--forest)' }}
                    >
                      {s.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(198,167,105,0.12)', color: 'var(--mint-dark)' }}>
                        <Icon name={s.icon} size={19} strokeWidth={1.6} />
                      </div>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: 'var(--forest)' }}>
                        {s.shortTitle}
                      </h3>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-soft)', lineHeight: 1.65, marginBottom: 14 }}>{s.desc}</p>
                    <span className="inline-flex items-center gap-2" style={{ color: 'var(--mint-dark)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Learn More
                      <Icon name="arrow" size={13} strokeWidth={2.5} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-24 text-center relative overflow-hidden" style={{ background: 'var(--forest)' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(198,167,105,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(198,167,105,0.06) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="relative z-10">
          <div className="section-label justify-center mb-6" style={{ color: 'var(--mint)' }}>
            <span className="label-line" />
            <span>Ready to Begin</span>
            <span className="label-line" />
          </div>
          <h2 className="section-heading-white mb-3" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)' }}>
            Book Your Service <em>Today</em>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', marginBottom: 36 }}>
            No commitment. We'll confirm within 2 hours. Serving {site.city}, {site.state} & beyond.
          </p>
          <Link to="/book" className="btn-primary">
            Get a Free Quote
            <Icon name="arrow" size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
