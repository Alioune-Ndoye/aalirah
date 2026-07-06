import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { site } from '../lib/site';

/** One-time brand intro overlay. Unmounts on a guaranteed timeout so it can
 *  never get stuck covering the page if the fade animation is throttled. */
export default function Loader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1900);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      id="ldr"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--forest)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <svg
            width="52"
            height="46"
            viewBox="0 0 100 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', margin: '0 auto 14px' }}
            aria-hidden="true"
          >
            <polygon points="50,2 98,87 2,87" fill="white" />
            <polygon points="50,42 74,83 26,83" fill="#c6a769" />
          </svg>
          <span
            style={{
              display: 'block',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.6rem',
              fontWeight: 300,
              letterSpacing: '0.06em',
              color: '#fff',
              marginBottom: 22,
              textTransform: 'lowercase',
            }}
          >
            {site.name}
          </span>
        </motion.div>
        <div
          style={{
            width: 160,
            height: 2,
            background: 'rgba(255,255,255,0.08)',
            margin: '0 auto',
            overflow: 'hidden',
            borderRadius: 2,
          }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              height: '100%',
              transformOrigin: 'left',
              background: 'linear-gradient(90deg, var(--mint), var(--mint-light))',
            }}
          />
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            display: 'block',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--mint-light)',
            marginTop: 16,
          }}
        >
          {site.tagline}
        </motion.span>
      </div>
    </motion.div>
  );
}
