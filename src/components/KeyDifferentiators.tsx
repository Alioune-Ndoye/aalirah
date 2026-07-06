import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon';
import type { IconName } from './Icon';

const DISMISS_KEY = 'aliraah_kd_seen';
const SHOW_AFTER_MS = 3000;

// Pages where the popup would be in the way (tools, portals, checkout).
const EXCLUDED = ['/admin', '/crew', '/book', '/account', '/login', '/signup', '/review'];

const points: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'monitor',
    title: 'Your Own Customer Portal',
    body: 'Book online, track your cleaner, and follow live job status updates — all in one place.',
  },
  {
    icon: 'sparkle',
    title: 'Personalized Cleaning Plans',
    body: 'Every home is different. Your plan is tailored to your space, schedule, and priorities.',
  },
  {
    icon: 'check-circle',
    title: 'Transparent, Structured Service',
    body: 'Clear communication at every step — offer, on-the-way, in-progress, done. No guessing.',
  },
];

/** "Why Aliraah" spotlight — appears once per visit, ~3s after landing.
 *  Fully dismissible; never shown on tool/portal pages. */
export default function KeyDifferentiators() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (EXCLUDED.some((p) => pathname.startsWith(p))) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    const t = setTimeout(() => setOpen(true), SHOW_AFTER_MS);
    return () => clearTimeout(t);
    // Intentionally keyed to first eligible page only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Why choose Aliraah"
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 90,
        background: 'rgba(14, 12, 10,0.55)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 18,
        animation: 'kdFade 0.35s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--ivory)', borderRadius: 16, maxWidth: 520, width: '100%',
          padding: 'clamp(24px,4vw,36px)', position: 'relative',
          border: '1px solid rgba(198, 167, 105,0.35)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.16)',
          animation: 'kdPop 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <button
          onClick={close}
          aria-label="Close"
          style={{
            position: 'absolute', top: 14, right: 14, width: 34, height: 34, borderRadius: '50%',
            border: '1px solid var(--border)', background: '#fff', cursor: 'pointer',
            color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1,
          }}
        >
          ✕
        </button>

        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mint-dark)', marginBottom: 8 }}>
          The Aliraah Difference
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.5rem,4vw,1.9rem)', color: 'var(--forest)', marginBottom: 18, lineHeight: 1.2 }}>
          Cleaning, with <em style={{ color: 'var(--mint-dark)' }}>nothing hidden</em>
        </h2>

        <div className="space-y-4" style={{ marginBottom: 22 }}>
          {points.map((p) => (
            <div key={p.title} className="flex gap-3 items-start">
              <span
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(198, 167, 105,0.14)', color: 'var(--mint-dark)' }}
              >
                <Icon name={p.icon} size={18} />
              </span>
              <div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '0.92rem', color: 'var(--forest)' }}>{p.title}</div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-soft)', lineHeight: 1.55, marginTop: 2 }}>{p.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/book" onClick={close} className="btn-primary justify-center" style={{ flex: 1 }}>
            Book a Cleaning
            <Icon name="arrow" size={14} strokeWidth={2} />
          </Link>
          <button
            onClick={close}
            className="btn-ghost justify-center"
            style={{ flex: 1, color: 'var(--forest)', borderColor: 'var(--border)', cursor: 'pointer' }}
          >
            Keep Browsing
          </button>
        </div>
      </div>

      <style>{`
        @keyframes kdFade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes kdPop { from { opacity: 0; transform: translateY(18px) scale(0.97) } to { opacity: 1; transform: none } }
      `}</style>
    </div>
  );
}
