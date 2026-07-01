import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Seo, { JsonLd } from '../components/Seo';
import { meta, breadcrumbLd } from '../lib/seo';
import { values } from '../lib/data';
import { site } from '../lib/site';

export default function About() {
  return (
    <>
      <Seo {...meta.about} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <PageHero label="Our Story" title="The Art of" em="Clean" minH="55vh" />

      {/* Story */}
      <section className="bg-ivory py-28">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal dir="left">
              <h2 className="section-heading mb-6">
                Founded on <em>Excellence</em>
              </h2>
              <p className="leading-relaxed mb-5" style={{ color: 'var(--text-soft)' }}>
                {site.name} was founded in West Hartford, CT with a single belief: that every space — no matter the
                size — deserves to be treated with respect, care, and artisanship.
              </p>
              <p className="leading-relaxed mb-5" style={{ color: 'var(--text-soft)' }}>
                We began as a small, boutique operation serving private residences in West Hartford and Greater
                Connecticut. Word spread quietly, the way it does among discerning clients. Today we serve estates,
                offices, and event spaces across Greater West Hartford, CT with the same founding values.
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                Our philosophy is simple: cleanliness is not a task — it is a standard. One that, once experienced at
                the {site.name} level, is impossible to compromise on.
              </p>
            </Reveal>

            <Reveal dir="right">
              <div className="relative h-[440px]">
                <div className="absolute rounded-3xl overflow-hidden shadow-2xl" style={{ width: '72%', height: '85%', top: 0, left: 0 }}>
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85"
                    alt="Pristine interior"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute rounded-2xl overflow-hidden shadow-xl z-10" style={{ width: '56%', height: '62%', bottom: 0, right: 0 }}>
                  <img
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=85"
                    alt="Cleaner detailing a surface"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream py-28">
        <div className="wrap">
          <Reveal className="text-center mb-16">
            <div className="section-label justify-center mb-5">
              <span className="label-line" />
              <span>Core Values</span>
              <span className="label-line" />
            </div>
            <h2 className="section-heading">
              What We <em>Stand For</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.n} delay={(i % 3) * 0.08}>
                <div className="bg-ivory rounded-3xl p-8 h-full" style={{ border: '1px solid var(--sand)' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: 'rgba(198,167,105,0.3)', fontWeight: 300, marginBottom: 16 }}>
                    {v.n}
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: 'var(--forest)', marginBottom: 12 }}>
                    {v.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-soft)', lineHeight: 1.7 }}>{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center relative overflow-hidden" style={{ background: 'var(--forest)' }}>
        <div className="orb orb-2" style={{ opacity: 0.2 }} aria-hidden="true" />
        <div className="relative z-10">
          <div className="section-label justify-center mb-6" style={{ color: 'var(--mint)' }}>
            <span className="label-line" />
            <span>Experience {site.name}</span>
            <span className="label-line" />
          </div>
          <h2 className="section-heading-white mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Ready to Transform Your Space?
          </h2>
          <Link to="/book" className="btn-primary">
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
