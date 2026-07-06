import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import type { IconName } from '../components/Icon';
import Seo, { JsonLd } from '../components/Seo';
import { meta, breadcrumbLd } from '../lib/seo';
import { site } from '../lib/site';

const promises: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'check-circle',
    title: '24-Hour Re-Clean',
    body: "If anything isn't up to standard, tell us within 24 hours and we'll return to make it right — completely free of charge.",
  },
  {
    icon: 'shield',
    title: 'Insured & Bonded',
    body: 'Every visit is fully insured and bonded, so your home and belongings are protected the moment our team walks in.',
  },
  {
    icon: 'users',
    title: 'Vetted Professionals',
    body: 'Every cleaner is background-checked and completes hands-on training before entering a single client home.',
  },
  {
    icon: 'leaf',
    title: 'Safe, Eco-Friendly Products',
    body: 'We use only premium, non-toxic, eco-friendly solutions — safe for your family, your pets, and the planet.',
  },
];

export default function Guarantee() {
  return (
    <>
      <Seo {...meta.guarantee} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Our Guarantee', path: '/guarantee' },
        ])}
      />

      <PageHero
        label="Our Promise"
        title="The 100%"
        em="Guarantee"
        sub="We don't consider a job done until you're delighted. If you're not, we fix it — no questions, no charge."
        marquee
        minH="56vh"
      />

      <section className="bg-ivory py-24 md:py-28">
        <div className="wrap max-w-3xl text-center mb-16">
          <Reveal>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(198, 167, 105,0.14)', color: 'var(--mint-dark)' }}>
              <Icon name="shield" size={36} strokeWidth={1.6} />
            </div>
            <h2 className="section-heading mb-6">
              Spotless, or We <em>Make It Right</em>
            </h2>
            <p style={{ color: 'var(--text-soft)', lineHeight: 1.85, fontSize: '1.05rem' }}>
              Our reputation is built one spotless space at a time, and we stand behind every visit. If any part of your
              clean doesn't meet your expectations, simply let us know within 24 hours — we'll send a team back to
              re-clean the area, free of charge. That's the {site.name} promise.
            </p>
          </Reveal>
        </div>

        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-6">
          {promises.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08}>
              <div className="flex gap-5 h-full rounded-2xl p-8" style={{ background: '#fff', border: '1px solid var(--border)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--forest)', color: 'var(--mint)' }}>
                  <Icon name={p.icon} size={22} strokeWidth={1.6} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: 'var(--forest)', marginBottom: 8 }}>
                    {p.title}
                  </h3>
                  <p style={{ color: 'var(--text-soft)', lineHeight: 1.7, fontSize: '0.9rem' }}>{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-16">
          <Link to="/book" className="btn-primary">
            Book With Confidence
            <Icon name="arrow" size={14} strokeWidth={2} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
