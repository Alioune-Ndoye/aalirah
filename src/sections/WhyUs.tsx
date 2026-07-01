import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import { reasons } from '../lib/data';
import { site, tel } from '../lib/site';

export default function WhyUs() {
  return (
    <section
      id="how-it-works"
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: 'var(--forest)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(198,167,105,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(198,167,105,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="wrap relative z-10">
        <Reveal className="text-center mb-16">
          <div className="section-label justify-center mb-5" style={{ color: 'var(--mint)' }}>
            <span className="label-line" />
            <span>Why Choose Us</span>
            <span className="label-line" />
          </div>
          <h2 className="section-heading-white mb-4">
            The Aliraah <em>Difference</em>
          </h2>
          <p className="max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            In a city full of cleaning services, here's why a growing community of Connecticut clients trust us with
            their most important spaces.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <Reveal key={r.n} delay={(i % 3) * 0.08}>
              <div
                className="step-card h-full"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(198,167,105,0.12)' }}
              >
                <span className="step-num" style={{ color: 'rgba(198,167,105,0.10)' }}>
                  {r.n}
                </span>
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

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-5">
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
  );
}
