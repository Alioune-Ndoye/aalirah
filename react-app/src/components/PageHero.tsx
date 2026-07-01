import type { ReactNode } from 'react';
import TrustMarquee from './TrustMarquee';

/** Shared inner-page hero with the dark photo/grid/orb stack. */
export default function PageHero({
  label,
  title,
  em,
  sub,
  marquee = false,
  minH = '55vh',
}: {
  label: string;
  title: string;
  em: string;
  sub?: ReactNode;
  marquee?: boolean;
  minH?: string;
}) {
  return (
    <section className="relative flex flex-col overflow-hidden" style={{ minHeight: minH, background: 'var(--forest)' }}>
      <div className="hero-photo-bg" aria-hidden="true" />
      <div className="hero-video-overlay" aria-hidden="true" />
      <div className="hero-bg-grid" aria-hidden="true" style={{ opacity: 0.45 }} />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />

      <div className="flex-1 flex items-end pb-20">
        <div className="wrap w-full relative z-10 pt-36">
          <div className="section-label mb-5">
            <span className="label-line" />
            <span>{label}</span>
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 400,
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              lineHeight: 1.06,
              letterSpacing: '-0.01em',
              color: '#fff',
              marginBottom: sub ? 20 : 0,
            }}
          >
            {title} <em style={{ color: 'var(--mint)', fontStyle: 'italic' }}>{em}</em>
          </h1>
          {sub && (
            <p className="max-w-lg" style={{ color: 'rgba(255,255,255,0.58)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              {sub}
            </p>
          )}
        </div>
      </div>

      {marquee && (
        <div className="relative z-10">
          <TrustMarquee />
        </div>
      )}
    </section>
  );
}
