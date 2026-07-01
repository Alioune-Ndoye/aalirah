import { Children, type ReactNode } from 'react';

/**
 * Continuous auto-scrolling marquee. Content is duplicated for a seamless loop
 * (translateX 0 → -50%). Pauses on hover so interactive children (e.g. the
 * before/after slider) stay usable, and falls back to a static scroller under
 * prefers-reduced-motion.
 *
 *  direction="left"  → items travel right → left
 *  direction="right" → items travel left → right
 */
export default function Marquee({
  children,
  direction = 'left',
  speed = 55,
  ariaLabel,
  className,
}: {
  children: ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
  ariaLabel?: string;
  className?: string;
}) {
  const items = Children.toArray(children);

  return (
    <div className={`marquee-outer ${className ?? ''}`} role="group" aria-label={ariaLabel}>
      <div
        className="marquee-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {[...items, ...items].map((child, i) => (
          <div className="marquee-item" key={i} aria-hidden={i >= items.length}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
