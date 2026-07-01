import { useCallback, useRef, useState } from 'react';
import Icon from './Icon';

/**
 * Draggable before/after image comparison slider.
 * Pointer-events based so it works for mouse + touch with one code path.
 */
export default function BeforeAfter({
  before,
  after,
  className,
}: {
  before: string;
  after: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(2, Math.min(98, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={ref}
      className={`ba-wrapper ${className ?? ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      role="slider"
      aria-label="Drag to compare before and after"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPct((p) => Math.max(2, p - 4));
        if (e.key === 'ArrowRight') setPct((p) => Math.min(98, p + 4));
      }}
    >
      <div className="ba-before">
        <img className="ba-img" src={before} alt="Before cleaning" loading="lazy" decoding="async" draggable={false} />
        <div className="ba-label ba-label-before">Before</div>
      </div>
      <div className="ba-after" style={{ clipPath: `inset(0 0 0 ${pct}%)` }}>
        <img className="ba-img" src={after} alt="After cleaning" loading="lazy" decoding="async" draggable={false} />
        <div className="ba-label ba-label-after">After</div>
      </div>
      <div className="ba-handle" style={{ left: `${pct}%` }}>
        <div className="ba-handle-line" />
        <div className="ba-handle-btn">
          <Icon name="swap" size={16} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}
