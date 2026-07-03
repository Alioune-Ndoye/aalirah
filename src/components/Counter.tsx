import { useEffect, useRef, useState } from 'react';

/** Counts up to `target` once it scrolls into view.
 *  Renders the FINAL value initially so pre-rendered (SSG) HTML and no-JS
 *  visitors see real numbers, never "0" — the count-up is a client garnish. */
export default function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(target);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Re-arm when the target changes (e.g. the live booking count arrives).
    done.current = false;
    setValue(0);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || done.current) return;
          done.current = true;
          const duration = 1800;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(step);
            else setValue(target);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.6 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
