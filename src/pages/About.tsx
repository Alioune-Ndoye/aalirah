import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Counter from '../components/Counter';
import Seo, { JsonLd } from '../components/Seo';
import { meta, breadcrumbLd } from '../lib/seo';
import { values } from '../lib/data';
import { areas } from '../lib/areas';
import { site } from '../lib/site';

const EASE = [0.16, 1, 0.3, 1] as const;

// Staggered container + item for the value cards.
const grid = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const cardIn = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// Honest, verifiable stats (no fabricated review counts).
const stats = [
  { target: values.length, suffix: '', label: 'Core Values' },
  { target: areas.length, suffix: '+', label: 'CT Towns Served' },
  { target: 100, suffix: '%', label: 'Satisfaction Guarantee' },
  { target: 60, suffix: 's', label: 'To Book Online' },
];

// A small, tasteful selection of towns for the map panel.
const townList = areas.slice(0, 12).map((a) => a.town);

// OpenStreetMap embed centered on the business (no API key needed).
const MAP_SRC =
  'https://www.openstreetmap.org/export/embed.html?bbox=-72.8982%2C41.6715%2C-72.5982%2C41.8715&layer=mapnik&marker=41.7715%2C-72.7482';

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
      <PageHero label="Our Story" title="The Art of" em="Clean" minH="55vh" marquee />

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
                <motion.div
                  className="absolute rounded-3xl overflow-hidden shadow-2xl"
                  style={{ width: '72%', height: '85%', top: 0, left: 0 }}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: EASE }}
                  whileHover={{ y: -6 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85"
                    alt="Pristine interior"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  className="absolute rounded-2xl overflow-hidden shadow-xl z-10"
                  style={{ width: '56%', height: '62%', bottom: 0, right: 0 }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                  whileHover={{ y: -6 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=85"
                    alt="Cleaner detailing a surface"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Animated stats band */}
      <section className="py-16" style={{ background: 'var(--forest)' }}>
        <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            >
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem,5vw,3.2rem)', color: 'var(--mint)', lineHeight: 1 }}>
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginTop: 10 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
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

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          >
            {values.map((v) => (
              <motion.div
                key={v.n}
                variants={cardIn}
                whileHover={{ y: -10, boxShadow: '0 34px 70px -28px rgba(44,44,44,0.35)', borderColor: 'var(--mint)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group relative overflow-hidden rounded-3xl p-8 h-full"
                style={{ background: 'var(--ivory)', border: '1px solid var(--sand)', boxShadow: '0 2px 20px rgba(44,44,44,0.05)' }}
              >
                {/* Animated accent bar (grows on hover) */}
                <span
                  className="absolute top-0 left-0 h-1 transition-all duration-500 group-hover:w-full"
                  style={{ width: 56, background: 'linear-gradient(90deg, var(--mint), var(--mint-light))' }}
                />
                {/* Giant watermark number for depth */}
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -bottom-6 select-none transition-transform duration-500 group-hover:scale-110"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '7rem', color: 'rgba(198,167,105,0.07)', lineHeight: 1 }}
                >
                  {v.n}
                </span>

                <div className="relative">
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: 'rgba(198,167,105,0.45)', fontWeight: 300, marginBottom: 16 }}>
                    {v.n}
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: 'var(--forest)', marginBottom: 12 }}>
                    {v.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-soft)', lineHeight: 1.7 }}>{v.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service-area map */}
      <section className="bg-ivory py-28">
        <div className="wrap">
          <Reveal className="text-center mb-14">
            <div className="section-label justify-center mb-5">
              <span className="label-line" />
              <span>Where We Work</span>
              <span className="label-line" />
            </div>
            <h2 className="section-heading">
              Proudly Serving <em>Greater Hartford</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Map */}
            <motion.div
              className="lg:col-span-3 rounded-3xl overflow-hidden"
              style={{ border: '1px solid var(--sand)', boxShadow: '0 20px 60px -30px rgba(44,44,44,0.4)', minHeight: 380 }}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <iframe
                title={`Map of ${site.name}'s service area in ${site.city}, ${site.state}`}
                src={MAP_SRC}
                loading="lazy"
                style={{ width: '100%', height: '100%', minHeight: 380, border: 0, display: 'block' }}
              />
            </motion.div>

            {/* Town chips */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <p className="leading-relaxed mb-6" style={{ color: 'var(--text-soft)' }}>
                Based in {site.city}, we bring the {site.name} standard to homes, offices, and estates across{' '}
                <strong style={{ color: 'var(--forest)' }}>{areas.length}+ Connecticut towns</strong> — and we know each
                area well enough to work around your block, parking, and schedule.
              </p>
              <motion.div
                className="flex flex-wrap gap-2.5"
                variants={grid}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {townList.map((town) => (
                  <motion.span
                    key={town}
                    variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } }}
                    whileHover={{ y: -3, backgroundColor: 'rgba(198,167,105,0.16)' }}
                    className="rounded-full px-4 py-2"
                    style={{ background: '#fff', border: '1px solid var(--sand)', fontSize: '0.82rem', color: 'var(--forest)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                  >
                    {town}
                  </motion.span>
                ))}
                <motion.span
                  variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } }}
                  className="rounded-full px-4 py-2"
                  style={{ background: 'transparent', border: '1px dashed var(--mint)', fontSize: '0.82rem', color: 'var(--mint-dark)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                >
                  + more
                </motion.span>
              </motion.div>
            </div>
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
