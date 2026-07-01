import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import { faqs } from '../lib/data';

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--border)', background: '#fff' }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 text-left"
        style={{ padding: '20px 24px', cursor: 'pointer', background: 'none', border: 'none' }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: '0.98rem',
            color: 'var(--forest)',
          }}
        >
          {q}
        </span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} style={{ color: 'var(--mint-dark)', flexShrink: 0, fontSize: '1.5rem', lineHeight: 1 }}>
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ padding: '0 24px 22px', color: 'var(--text-soft)', lineHeight: 1.7, fontSize: '0.9rem' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="bg-cream py-24 md:py-32 relative overflow-hidden">
      <div className="wrap max-w-3xl">
        <Reveal className="text-center mb-12">
          <div className="section-label justify-center mb-5">
            <span className="label-line" />
            <span>Good to Know</span>
            <span className="label-line" />
          </div>
          <h2 className="section-heading">
            Frequently <em>Asked</em>
          </h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <Item q={f.q} a={f.a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
