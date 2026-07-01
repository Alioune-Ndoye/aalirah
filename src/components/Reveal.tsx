import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Dir = 'up' | 'left' | 'right' | 'none';

const offset: Record<Dir, { x?: number; y?: number }> = {
  up: { y: 36 },
  left: { x: -36 },
  right: { x: 36 },
  none: {},
};

/**
 * Scroll-into-view reveal. Replaces the GSAP ScrollTrigger .reveal-* classes.
 */
export default function Reveal({
  children,
  dir = 'up',
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode;
  dir?: Dir;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, ...offset[dir] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  );
}
