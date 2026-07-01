import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <section
      className="min-h-screen flex items-center justify-center text-center relative overflow-hidden"
      style={{ background: 'var(--forest)' }}
    >
      <Seo title="Page Not Found — Aliraah" description="The page you're looking for doesn't exist." path="/404" noindex />
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="relative z-10 px-6">
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(6rem, 18vw, 12rem)',
            color: 'var(--mint)',
            lineHeight: 1,
            fontWeight: 300,
          }}
        >
          404
        </div>
        <p className="section-heading-white mb-2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
          This page got <em>swept away</em>
        </p>
        <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>
          The page you're looking for doesn't exist — but your spotless space still can.
        </p>
        <Link to="/" className="btn-primary">
          Back Home
          <Icon name="arrow" size={14} strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}
