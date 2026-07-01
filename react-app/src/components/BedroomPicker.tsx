import type { CSSProperties } from 'react';
import { bedroomPrice, bedroomLabel, typicalSqft, bedroomRate } from '../lib/data';

type Unit = 'ft' | 'm';

type Props = {
  beds: number;
  onBeds: (n: number) => void;
  sqft?: string;
  onSqft?: (v: string) => void;
  unit?: Unit;
  onUnit?: (u: Unit) => void;
  tone?: 'light' | 'dark';
  /** Show the optional square-footage / m² field. */
  showArea?: boolean;
  /** Show the live "from $X" price under the count. */
  showPrice?: boolean;
};

export default function BedroomPicker({
  beds,
  onBeds,
  sqft = '',
  onSqft,
  unit = 'ft',
  onUnit,
  tone = 'light',
  showArea = false,
  showPrice = false,
}: Props) {
  const dark = tone === 'dark';
  const txt = dark ? '#fff' : 'var(--forest)';
  const sub = dark ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)';
  const cardBg = dark ? 'rgba(255,255,255,0.04)' : '#fff';
  const border = dark ? 'rgba(198,167,105,0.18)' : 'var(--border)';

  const min = 0;
  const max = bedroomRate.max;
  const typical = typicalSqft(beds, unit);

  const stepBtn = (disabled: boolean): CSSProperties => ({
    width: 46,
    height: 46,
    flexShrink: 0,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: dark ? 'rgba(198,167,105,0.12)' : 'var(--surface-alt)',
    color: dark ? 'var(--mint)' : 'var(--forest)',
    border: `1px solid ${dark ? 'rgba(198,167,105,0.22)' : 'var(--border)'}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.35 : 1,
    transition: 'background 0.2s, transform 0.15s',
  });

  return (
    <div>
      {/* Stepper */}
      <div
        className="flex items-center justify-between gap-4 rounded-2xl p-4"
        style={{ background: cardBg, border: `1px solid ${border}` }}
      >
        <button
          type="button"
          aria-label="Fewer bedrooms"
          disabled={beds <= min}
          onClick={() => onBeds(Math.max(min, beds - 1))}
          style={stepBtn(beds <= min)}
        >
          <Glyph kind="minus" />
        </button>

        <div className="text-center flex-1">
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.02em', color: txt, lineHeight: 1.1 }}>
            {bedroomLabel(beds)}
          </div>
          {showPrice ? (
            <div style={{ fontSize: '0.8rem', color: dark ? 'var(--mint)' : 'var(--mint-dark)', fontWeight: 600, marginTop: 2 }}>
              from ${bedroomPrice(beds)}
            </div>
          ) : (
            <div style={{ fontSize: '0.72rem', color: sub, marginTop: 2 }}>
              ~{typical.toLocaleString()} {unit === 'ft' ? 'ft²' : 'm²'} typical
            </div>
          )}
        </div>

        <button
          type="button"
          aria-label="More bedrooms"
          disabled={beds >= max}
          onClick={() => onBeds(Math.min(max, beds + 1))}
          style={stepBtn(beds >= max)}
        >
          <Glyph kind="plus" />
        </button>
      </div>

      {beds >= max && (
        <p style={{ fontSize: '0.72rem', color: sub, marginTop: 8, textAlign: 'center' }}>
          Larger than {max} bedrooms? We'll tailor a quote on the call.
        </p>
      )}

      {/* Square footage / m² */}
      {showArea && onSqft && (
        <div className="mt-4">
          <div
            className="flex items-center gap-2 rounded-2xl p-2 pl-4"
            style={{ background: cardBg, border: `1px solid ${border}` }}
          >
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={sqft}
              onChange={(e) => onSqft(e.target.value)}
              placeholder={`Approx. area — e.g. ${typical}`}
              aria-label="Approximate floor area"
              style={{
                flex: 1,
                minWidth: 0,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: txt,
                fontFamily: 'var(--font-body)',
                fontSize: '0.92rem',
              }}
            />
            {(['ft', 'm'] as Unit[]).map((u) => {
              const active = unit === u;
              return (
                <button
                  key={u}
                  type="button"
                  onClick={() => onUnit?.(u)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 10,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    border: 'none',
                    background: active ? 'var(--mint)' : dark ? 'rgba(255,255,255,0.06)' : 'var(--surface-alt)',
                    color: active ? 'var(--forest)' : sub,
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  {u === 'ft' ? 'ft²' : 'm²'}
                </button>
              );
            })}
          </div>
          <p style={{ fontSize: '0.72rem', color: sub, marginTop: 8 }}>
            Optional — helps us quote precisely. Typical for {bedroomLabel(beds).toLowerCase()}: ~{typical.toLocaleString()}{' '}
            {unit === 'ft' ? 'ft²' : 'm²'}.
          </p>
        </div>
      )}
    </div>
  );
}

function Glyph({ kind }: { kind: 'plus' | 'minus' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      {kind === 'plus' && <line x1="12" y1="5" x2="12" y2="19" />}
    </svg>
  );
}
