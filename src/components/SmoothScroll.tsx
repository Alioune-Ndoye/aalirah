import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

/**
 * Lenis smooth scroll + scroll-to-top / scroll-to-hash on route change.
 * Respects prefers-reduced-motion by skipping the smooth layer.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const lenis = new Lenis({
      duration: isMobile ? 0.5 : 0.85,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: isMobile ? 1 : 1.15,
      touchMultiplier: 1.4,
    });

    // expose for anchor scrolling
    (window as unknown as { _lenis?: Lenis })._lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      (window as unknown as { _lenis?: Lenis })._lenis = undefined;
    };
  }, []);

  // Scroll to top (or to hash target) whenever the route changes
  useEffect(() => {
    const lenis = (window as unknown as { _lenis?: Lenis })._lenis;
    if (hash) {
      // wait a tick for the target to mount
      requestAnimationFrame(() => {
        const el = document.querySelector(hash);
        if (el) {
          if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -80 });
          else el.scrollIntoView({ behavior: 'smooth' });
        }
      });
      return;
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return <>{children}</>;
}
