import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon';
import { site, tel } from '../lib/site';

/** Sticky bottom call/book bar — mobile only. Hidden on the booking page
 *  (redundant there) and on the homepage (the hero already carries the CTAs). */
export default function MobileCTA() {
  const { pathname } = useLocation();
  if (pathname === '/book' || pathname === '/') return null;

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 gap-2 px-3 py-3"
      style={{
        background: 'rgba(14,12,10,0.92)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(198,167,105,0.18)',
        paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))',
      }}
    >
      <a
        href={tel}
        className="flex items-center justify-center gap-2 rounded-full py-3"
        style={{
          border: '1.5px solid rgba(255,255,255,0.25)',
          color: '#fff',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
        aria-label={`Call ${site.name}`}
      >
        <Icon name="phone" size={15} strokeWidth={1.8} />
        Call
      </a>
      <Link
        to="/book"
        className="flex items-center justify-center gap-2 rounded-full py-3"
        style={{
          background: 'var(--mint)',
          color: 'var(--forest)',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        Book Now
        <Icon name="arrow" size={14} strokeWidth={2} />
      </Link>
    </div>
  );
}
