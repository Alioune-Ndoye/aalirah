import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import Counter from '../components/Counter';
import TrustMarquee from '../components/TrustMarquee';
import { stats } from '../lib/data';
import { fetchBookingCount } from '../lib/bookingStore';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Live booking count — the "Spaces Cleaned" stat grows by 1 with every booking.
  const [bookingCount, setBookingCount] = useState(0);
  useEffect(() => {
    fetchBookingCount().then(setBookingCount);
  }, []);
  const liveStats = stats.map((s) => (s.dynamic ? { ...s, num: s.num + bookingCount } : s));

  // Swap to the purpose-framed portrait video on phones (keeps the vase centered),
  // and the wide landscape video on larger screens. Re-swaps if the viewport
  // crosses the breakpoint (rotation / devtools).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const mq = window.matchMedia('(max-width: 767px)');
    const setSrc = (mobile: boolean) => {
      v.poster = mobile ? '/assets/video/poster_mobile.webp' : '/assets/video/poster_desktop.webp';
      const next = mobile ? '/assets/video/apartment_mobile.mp4' : '/assets/video/apartment_6s.mp4';
      if (v.getAttribute('src') === next) return;
      v.setAttribute('src', next);
      v.load();
      v.play().catch(() => {});
    };
    setSrc(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSrc(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <section id="hero" className="hero-section relative flex items-center" style={{ overflow: 'clip' }}>
      <video
        ref={videoRef}
        className="hero-video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="hero-video-overlay" aria-hidden="true" />
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />

      <div className="wrap w-full pt-28 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-mint animate-pulse" />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--mint-light)',
              }}
            >
              Professional Cleaning — West Hartford, CT
            </span>
          </motion.div>

          <h1
            className="mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
            }}
          >
            {[
              { t: 'Your Space.', c: '#fff', i: false },
              { t: 'Spotless.', c: 'var(--mint)', i: true },
              { t: 'Guaranteed.', c: '#fff', i: false },
            ].map((line, idx) => (
              <span key={line.t} style={{ display: 'block', overflow: 'hidden' }}>
                <motion.span
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 1, delay: 1.05 + idx * 0.14, ease }}
                  style={{
                    display: 'block',
                    fontSize: 'clamp(3.4rem, 6.5vw, 6.5rem)',
                    color: line.c,
                    fontStyle: line.i ? 'italic' : 'normal',
                    paddingBottom: '0.08em',
                  }}
                >
                  {line.t}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 1.5, ease }}
            className="mb-10 max-w-md"
            style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}
          >
            We transform homes and businesses across West Hartford and Connecticut with precision cleaning,
            eco-friendly products, and a 100% satisfaction promise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.7, ease }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <Link to="/book" className="btn-primary">
              Get a Free Quote
              <Icon name="arrow" size={14} strokeWidth={2} />
            </Link>
            <a href="#services" className="btn-ghost">
              Our Services
            </a>
          </motion.div>

          {/* Insured & bonded trust line (above the fold) */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.78, ease }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-10"
            style={{ color: 'rgba(255,255,255,0.62)', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.76rem', fontWeight: 600, letterSpacing: '0.04em' }}
          >
            <span className="inline-flex items-center gap-2">
              <span style={{ color: 'var(--mint)' }}>
                <Icon name="shield" size={14} strokeWidth={1.9} />
              </span>
              Insured &amp; Bonded
            </span>
            <span className="inline-flex items-center gap-2">
              <span style={{ color: 'var(--mint)' }}>
                <Icon name="leaf" size={14} strokeWidth={1.9} />
              </span>
              Eco-Certified
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span style={{ color: 'var(--mint)', display: 'inline-flex' }}>
                <Icon name="shield" size={13} />
              </span>
              100% Satisfaction Guarantee
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.85, ease }}
            className="flex flex-wrap gap-8 pt-8 border-t border-white/10"
          >
            {liveStats.map((st, i) => (
              <div key={st.label} className="flex items-center gap-8">
                {i > 0 && <div className="hidden sm:block w-px h-10 bg-white/10" />}
                <div className="text-center">
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '2.8rem',
                      fontWeight: 800,
                      letterSpacing: '-0.04em',
                      color: 'var(--mint)',
                      lineHeight: 1,
                    }}
                  >
                    <Counter target={st.num} suffix={st.suffix} />
                  </div>
                  <div
                    style={{
                      fontSize: '0.68rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.4)',
                      marginTop: 6,
                    }}
                  >
                    {st.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: visual frame (desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 1.35, ease }}
          className="hidden lg:flex justify-end relative"
        >
          <div className="hero-frame-wrap relative" style={{ width: '88%' }}>
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{ aspectRatio: '3/4', maxHeight: 600 }}
            >
              <img
                className="hero-frame-bg"
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=72"
                alt="Spotless, styled living space"
                loading="lazy"
                decoding="async"
              />
              <div className="hero-frame-overlay" />
              <div
                className="absolute bottom-8 left-6 right-6 flex items-center gap-4 rounded-2xl p-5"
                style={{
                  background: 'rgba(26,23,20,0.92)',
                  border: '1px solid rgba(198,167,105,0.2)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--mint)', color: 'var(--forest)' }}
                >
                  <Icon name="star" size={16} fill />
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>
                    Satisfaction Guaranteed
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                    Eco-Certified · Fully Insured
                  </div>
                </div>
                <div className="ml-auto flex -space-x-2">
                  {[0, 1, 2, 3].map((a) => (
                    <div
                      key={a}
                      className="w-8 h-8 rounded-full border-2 overflow-hidden"
                      style={{ borderColor: 'var(--forest)', background: 'var(--forest-mid)' }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(135deg, var(--mint-dark), var(--mint-light))',
                          opacity: 0.5 + a * 0.12,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 z-10">
        <TrustMarquee />
      </div>
    </section>
  );
}
