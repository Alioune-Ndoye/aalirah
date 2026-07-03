import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';

const features = [
  {
    n: '01',
    title: 'Vetted & Trained Specialists',
    body: 'Every team member passes a background check and hands-on training before entering your home.',
  },
  {
    n: '02',
    title: 'Premium Eco-Friendly Products',
    body: 'We use only luxury-grade, non-toxic solutions that protect your surfaces, your family, and the environment.',
  },
  {
    n: '03',
    title: 'Satisfaction or We Return',
    body: "If any aspect doesn't meet your expectations, we come back within 24 hours — at no additional cost.",
  },
  {
    n: '04',
    title: 'Seamless Digital Experience',
    body: 'Book, communicate, and manage services from your phone. Transparent pricing. Real-time updates.',
  },
];

const floatTags = [
  { icon: 'check-circle' as const, label: 'Eco-Friendly', top: '18%', right: '14%', delay: 0 },
  { icon: 'shield' as const, label: 'Insured & Bonded', bottom: '20%', right: '8%', delay: 1 },
];

export default function WhyChoose() {
  return (
    <section id="why-us" className="relative bg-ivory overflow-hidden">
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -100,
          left: -100,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198,167,105,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Features */}
        <div className="py-28 md:py-36 px-6 md:px-10 lg:pl-[max(40px,calc((100vw-1240px)/2+40px))] flex flex-col justify-center">
          <div className="section-label mb-5">
            <span className="label-line" />
            <span>The Difference</span>
          </div>
          <h2 className="section-heading mb-6">
            Why Clients Choose <em>Aliraah</em>
          </h2>
          <p style={{ color: 'var(--text-soft)', lineHeight: 1.75, marginBottom: '3rem', maxWidth: '36rem' }}>
            In a world of unreliable cleaning services, we've built something different — a practice rooted in
            precision, integrity, and genuine care for your space.
          </p>

          {features.map((f, i) => (
            <Reveal key={f.n} dir="left" delay={i * 0.1}>
              <div className="flex gap-6 mb-8">
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '2.2rem',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    color: 'rgba(198,167,105,0.22)',
                    lineHeight: 1,
                    flexShrink: 0,
                    width: '2.5rem',
                  }}
                >
                  {f.n}
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      color: 'var(--forest)',
                      marginBottom: 6,
                    }}
                  >
                    {f.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--text-soft)' }}>{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Photo */}
        <div className="h-80 md:h-[420px] lg:h-auto relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=85"
            alt="Professional cleaner at work"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {floatTags.map((t) => (
            <motion.div
              key={t.label}
              className="hidden lg:flex items-center gap-2 rounded-full px-4 py-2 text-xs absolute"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: t.delay }}
              style={{
                top: t.top,
                bottom: t.bottom,
                right: t.right,
                background: 'rgba(26,23,20,0.92)',
                border: '1px solid rgba(198,167,105,0.3)',
                color: 'var(--mint-light)',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                letterSpacing: '0.08em',
              }}
            >
              <Icon name={t.icon} size={12} strokeWidth={2} />
              {t.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
