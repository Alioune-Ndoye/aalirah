import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import BeforeAfter from '../components/BeforeAfter';
import { showcases } from '../lib/data';

export default function Showcase() {
  return (
    <section id="showcase" className="relative bg-white py-24 md:py-28 overflow-hidden">
      <div className="wrap">
        <Reveal className="text-center max-w-xl mx-auto mb-12">
          <div className="section-label justify-center mb-5">
            <span className="label-line" />
            <span>The Transformation</span>
            <span className="label-line" />
          </div>
          <h2 className="section-heading mb-3">
            Before & <em>After</em>
          </h2>
          <p style={{ color: 'var(--text-soft)', lineHeight: 1.75, fontSize: '0.95rem' }}>
            Drag the slider to see the Aliraah difference — spaces reborn through expert cleaning.
          </p>
        </Reveal>
      </div>

      <Marquee direction="left" speed={48} ariaLabel="Before and after transformations">
        {showcases.map((c, i) => (
          <div
            key={c.title}
            style={{ width: 'min(78vw, 820px)' }}
            className="flex flex-col gap-4"
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              {String(i + 1).padStart(2, '0')} <span style={{ color: 'rgba(198, 167, 105,0.45)' }}>/</span>{' '}
              {String(showcases.length).padStart(2, '0')}
            </div>
            <BeforeAfter
              before={c.before}
              after={c.after}
              className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
            />
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--forest)',
                }}
              >
                {c.title}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginTop: 4,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {c.sub}
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
