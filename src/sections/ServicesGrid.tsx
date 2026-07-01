import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import { services } from '../lib/data';

function ServiceCard({ index }: { index: number }) {
  const svc = services[index];
  const [flipped, setFlipped] = useState(false);
  const num = String(index + 1).padStart(2, '0');

  return (
    <div
      className={`svc-card${flipped ? ' flipped' : ''}`}
      aria-label={svc.shortTitle}
      onClick={() => {
        // tap-to-flip only where hover isn't available (touch)
        if (!window.matchMedia('(hover: hover)').matches) setFlipped((v) => !v);
      }}
    >
      <div className="svc-card-inner">
        <div className="svc-card-front">
          <img className="svc-card-img" src={svc.image} alt={svc.shortTitle} loading="lazy" decoding="async" />
          <div className="svc-card-front-overlay" />
          <div className="svc-card-front-body">
            <span className="svc-card-tag">{svc.tag}</span>
            <h3 className="svc-card-title">{svc.shortTitle}</h3>
          </div>
        </div>
        <div className="svc-card-back">
          <span className="svc-card-back-num">{num}</span>
          <div className="svc-card-back-icon">
            <Icon name={svc.icon} size={22} strokeWidth={1.6} />
          </div>
          <h3 className="svc-card-back-title">{svc.shortTitle}</h3>
          <p className="svc-card-back-desc">{svc.desc}</p>
          <Link to={`/services/${svc.slug}`} className="svc-card-back-cta" onClick={(e) => e.stopPropagation()}>
            Learn More
            <Icon name="arrow" size={12} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ServicesGrid() {
  return (
    <section id="services" className="relative bg-white py-28 md:py-36 overflow-hidden">
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198,167,105,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div className="wrap">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="section-label mb-4">
              <span className="label-line" />
              <span>What We Offer</span>
            </div>
            <h2 className="section-heading">
              Services Built for <em>Real Results</em>
            </h2>
          </div>
          <Link to="/services" className="btn-dark flex-shrink-0 self-start md:self-auto">
            All Services
            <Icon name="arrow" size={14} strokeWidth={2} />
          </Link>
        </Reveal>

        <Reveal className="svc-grid">
          {services.map((_, i) => (
            <ServiceCard key={i} index={i} />
          ))}
        </Reveal>

        <p className="text-center text-sm mt-8 md:hidden" style={{ color: 'var(--text-muted)' }}>
          Tap a card to flip
        </p>
      </div>
    </section>
  );
}
