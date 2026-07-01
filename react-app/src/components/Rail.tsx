import { useRef } from 'react';
import type { ReactNode } from 'react';

/**
 * Horizontal scroll-snap rail with prev/next arrow controls.
 * Replaces the old GSAP drag carousels with a native, accessible scroller.
 */
export default function Rail({ children, ariaLabel }: { children: ReactNode; ariaLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 700);
    el.scrollBy({ left: amount * dir, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div className="rail" ref={ref} role="group" aria-label={ariaLabel}>
        {children}
      </div>

      <div className="hidden md:flex items-center gap-3 justify-center mt-8">
        <button onClick={() => scrollBy(-1)} className="rail-arrow" aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button onClick={() => scrollBy(1)} className="rail-arrow" aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
