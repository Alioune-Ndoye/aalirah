import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import Seo, { JsonLd } from '../components/Seo';
import { areaBySlug } from '../lib/areas';
import { areaMeta, areaLd, breadcrumbLd } from '../lib/seo';
import { services, reasons } from '../lib/data';
import { site, tel } from '../lib/site';
import NotFound from './NotFound';

export default function AreaPage({ slug }: { slug: string }) {
  const area = areaBySlug(slug);
  if (!area) return <NotFound />;

  return (
    <>
      <Seo {...areaMeta(area)} />
      <JsonLd
        data={[
          areaLd(area),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: `${area.town}, ${site.state}`, path: `/cleaning/${area.slug}` },
          ]),
        ]}
      />

      <PageHero
        label={`Serving ${area.town}, ${site.state}`}
        title="Cleaning in"
        em={area.town}
        sub={`Eco-friendly, fully insured, background-checked cleaning for homes and businesses across ${area.town}.`}
        marquee
        minH="58vh"
      />

      {/* Intro */}
      <section className="bg-ivory py-24 md:py-28">
        <div className="wrap max-w-3xl">
          <Reveal>
            <div className="section-label mb-5">
              <span className="label-line" />
              <span>Local & Trusted</span>
            </div>
            <h2 className="section-heading mb-6">
              Your {area.town} <em>Cleaning Team</em>
            </h2>
            <p style={{ color: 'var(--text-soft)', lineHeight: 1.85, fontSize: '1.05rem' }}>{area.intro}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {area.neighborhoods.map((n) => (
                <span
                  key={n}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                  style={{ background: '#fff', border: '1px solid var(--border)', color: 'var(--text-soft)' }}
                >
                  <Icon name="pin" size={13} strokeWidth={1.8} />
                  {n}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services available locally */}
      <section className="bg-cream py-24 md:py-28">
        <div className="wrap">
          <Reveal className="text-center mb-14">
            <div className="section-label justify-center mb-5">
              <span className="label-line" />
              <span>What We Offer in {area.town}</span>
              <span className="label-line" />
            </div>
            <h2 className="section-heading">
              Every Service, <em>Local to You</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <Link
                  to={`/services/${s.slug}`}
                  className="block h-full rounded-2xl p-7 transition-all duration-300"
                  style={{ background: 'var(--ivory)', border: '1px solid var(--sand)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'var(--forest)', color: 'var(--mint)' }}
                  >
                    <Icon name={s.icon} size={22} strokeWidth={1.6} />
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: 'var(--forest)', marginBottom: 8 }}>
                    {s.shortTitle}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-soft)', lineHeight: 1.6 }}>{s.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us strip */}
      <section className="py-24 md:py-28" style={{ background: 'var(--forest)' }}>
        <div className="wrap">
          <Reveal className="text-center mb-14">
            <h2 className="section-heading-white">
              Why {area.town} Chooses <em>{site.name}</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.slice(0, 3).map((r) => (
              <Reveal key={r.n}>
                <div className="step-card h-full" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(198,167,105,0.12)' }}>
                  <div className="step-icon" style={{ background: 'rgba(198,167,105,0.12)', color: 'var(--mint)' }}>
                    <Icon name={r.icon} size={22} strokeWidth={1.6} />
                  </div>
                  <h3 className="step-title" style={{ color: '#fff' }}>
                    {r.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)' }}>{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to="/book" className="btn-primary">
              Get a Free Quote
              <Icon name="arrow" size={14} strokeWidth={2} />
            </Link>
            <a href={tel} className="btn-ghost">
              <Icon name="phone" size={15} strokeWidth={1.8} />
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
