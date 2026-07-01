import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import Seo, { JsonLd } from '../components/Seo';
import { serviceMeta, serviceLd, servicePath, breadcrumbLd } from '../lib/seo';
import { services } from '../lib/data';
import { site, tel } from '../lib/site';
import NotFound from './NotFound';

export default function ServicePage({ slug }: { slug: string }) {
  const svc = services.find((s) => s.slug === slug);
  if (!svc) return <NotFound />;
  const others = services.filter((s) => s.slug !== slug).slice(0, 4);

  return (
    <>
      <Seo {...serviceMeta(svc)} image={svc.image} />
      <JsonLd
        data={[
          serviceLd(svc),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: svc.shortTitle, path: servicePath(svc.slug) },
          ]),
        ]}
      />

      <PageHero
        label={svc.tag}
        title={svc.title}
        em={svc.em}
        sub={`${svc.desc} Serving ${site.city} and Greater ${site.stateFull}.`}
        marquee
        minH="58vh"
      />

      {/* Overview + includes */}
      <section className="bg-ivory py-24 md:py-28">
        <div className="wrap grid lg:grid-cols-2 gap-16 items-center">
          <Reveal dir="left">
            <div className="section-label mb-4">
              <span className="label-line" />
              <span>What's Included</span>
            </div>
            <h2 className="section-heading mb-6" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>
              {svc.title} <em>{svc.em}</em>
            </h2>
            <p style={{ color: 'var(--text-soft)', lineHeight: 1.85, marginBottom: 28 }}>{svc.longDesc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {svc.includes.map((inc) => (
                <div key={inc} className="flex items-start gap-2.5" style={{ fontSize: '0.9rem', color: 'var(--text-soft)' }}>
                  <span style={{ color: 'var(--mint-dark)', flexShrink: 0, marginTop: 3 }}>
                    <Icon name="check" size={14} strokeWidth={2.5} />
                  </span>
                  {inc}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/book" className="btn-primary">
                Book This Service
                <Icon name="arrow" size={14} strokeWidth={2} />
              </Link>
              <a href={tel} className="btn-dark">
                <Icon name="phone" size={15} strokeWidth={1.8} />
                {site.phone}
              </a>
            </div>
          </Reveal>

          <Reveal dir="right">
            <div
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 24px 80px rgba(26,23,20,0.3)',
                aspectRatio: '4/3',
                position: 'relative',
              }}
            >
              <img src={svc.image.replace('w=800', 'w=900')} alt={`${svc.title} ${svc.em}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--forest), var(--forest-mid))' }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-cream py-24">
        <div className="wrap">
          <Reveal className="text-center mb-12">
            <h2 className="section-heading" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
              Explore Other <em>Services</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((s) => (
              <Reveal key={s.slug}>
                <Link
                  to={servicePath(s.slug)}
                  className="block h-full rounded-2xl p-6 transition-all duration-300"
                  style={{ background: 'var(--ivory)', border: '1px solid var(--sand)' }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--forest)', color: 'var(--mint)' }}>
                    <Icon name={s.icon} size={20} strokeWidth={1.6} />
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: 'var(--forest)' }}>
                    {s.shortTitle}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="btn-dark">
              All Services
              <Icon name="arrow" size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
