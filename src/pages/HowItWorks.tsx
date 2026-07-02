import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import Seo, { JsonLd } from '../components/Seo';
import { meta, breadcrumbLd } from '../lib/seo';
import { processSteps } from '../lib/data';
import { site } from '../lib/site';
import { useSiteSettings } from '../lib/settingsStore';

export default function HowItWorks() {
  const settings = useSiteSettings();
  return (
    <>
      <Seo {...meta.howItWorks} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'How It Works', path: '/how-it-works' },
        ])}
      />

      <PageHero
        label="The Process"
        title="How It"
        em="Works"
        sub="From quote to spotless in four simple steps — no phone tag, no surprises, no hassle."
        marquee
        minH="56vh"
      />

      <section className="bg-ivory py-24 md:py-28">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {processSteps.map((s, i) => (
              <Reveal key={s.n} delay={(i % 2) * 0.08}>
                <div className="relative h-full rounded-3xl p-9" style={{ background: '#fff', border: '1px solid var(--border)' }}>
                  <span
                    style={{ position: 'absolute', top: 20, right: 26, fontFamily: "'Space Grotesk', sans-serif", fontSize: '4.5rem', fontWeight: 800, color: 'rgba(198,167,105,0.1)', lineHeight: 1, userSelect: 'none' }}
                  >
                    {s.n}
                  </span>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'var(--forest)', color: 'var(--mint)' }}>
                    <Icon name={s.icon} size={24} strokeWidth={1.6} />
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.3rem', color: 'var(--forest)', marginBottom: 12 }}>
                    {s.title}
                  </h3>
                  <p style={{ color: 'var(--text-soft)', lineHeight: 1.75 }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-16">
            <Link to="/book" className="btn-primary">
              Start My Quote
              <Icon name="arrow" size={14} strokeWidth={2} />
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 16 }}>
              Backed by our{' '}
              {settings.showGuarantee ? (
                <Link to="/guarantee" style={{ color: 'var(--mint-dark)', fontWeight: 600 }}>100% satisfaction guarantee</Link>
              ) : (
                <strong style={{ color: 'var(--mint-dark)', fontWeight: 600 }}>100% satisfaction guarantee</strong>
              )}
              . Serving {site.city}, {site.state} & beyond.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
