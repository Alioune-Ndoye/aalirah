import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import Icon from '../components/Icon';
import type { Testimonial } from '../lib/data';
import { apiEnabled, fetchApprovedReviews, getSubmittedReviews } from '../lib/reviewStore';

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export default function Testimonials() {
  // Real reviews only — approved reviews from the backend, or locally-submitted
  // ones in demo mode. Nothing is shown until a real review exists.
  const [reviews, setReviews] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (apiEnabled()) fetchApprovedReviews().then(setReviews);
    else setReviews(getSubmittedReviews());
  }, []);

  const hasReviews = reviews.length > 0;

  return (
    <section id="testimonials" className="relative py-24 md:py-28 overflow-hidden" style={{ background: 'var(--surface)' }}>
      <div className="wrap">
        <Reveal className="text-center mb-12">
          <div className="section-label justify-center mb-5" style={{ color: 'var(--mint-dark)' }}>
            <span className="label-line" style={{ background: 'var(--mint-dark)' }} />
            <span>Client Stories</span>
            <span className="label-line" style={{ background: 'var(--mint-dark)' }} />
          </div>
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
              fontWeight: 400,
              color: 'var(--forest)',
              lineHeight: 1.15,
            }}
          >
            What Our Clients <em style={{ color: 'var(--mint-dark)', fontStyle: 'italic' }}>Say</em>
          </h2>

          {hasReviews && (
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl mx-auto"
              style={{ background: '#fff', border: '1px solid var(--border)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
            >
              <span style={{ color: 'var(--mint)', display: 'inline-flex' }}>
                <Icon name="star" size={18} fill />
              </span>
              <div className="text-left">
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 700, color: 'var(--forest)' }}>
                  {reviews.length} verified {reviews.length === 1 ? 'review' : 'reviews'}
                </div>
              </div>
            </div>
          )}
        </Reveal>
      </div>

      {hasReviews ? (
        <Marquee direction="right" speed={60} ariaLabel="Client testimonials">
          {reviews.map((t, idx) => (
            <div key={t.name + idx} style={{ width: 'min(80vw, 820px)' }} className="flex">
              <div className="t-card">
                <div className="t-deco-quote">"</div>
                <div className="flex gap-1.5 mb-7" style={{ color: 'var(--mint)' }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Icon key={i} name="star" size={16} fill />
                  ))}
                </div>
                <blockquote className="t-quote">"{t.text}"</blockquote>
                <div className="flex items-center gap-4 mt-10 pt-8" style={{ borderTop: '1px solid rgba(198, 167, 105,0.12)' }}>
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    style={{
                      background: 'rgba(198, 167, 105,0.15)',
                      border: '1px solid rgba(198, 167, 105,0.3)',
                      color: 'var(--mint)',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {initials(t.name)}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: '#fff' }}>{t.name}</div>
                    <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>{t.role}</div>
                  </div>
                  <div
                    className="ml-auto"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '3.5rem',
                      fontWeight: 800,
                      letterSpacing: '-0.04em',
                      color: 'rgba(198, 167, 105,0.08)',
                      lineHeight: 1,
                      userSelect: 'none',
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      ) : (
        /* No real reviews yet — invite the first one (nothing fabricated). */
        <div className="wrap">
          <Reveal className="text-center mx-auto" >
           <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <div
              className="flex items-center justify-center mx-auto mb-6"
              style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(198, 167, 105,0.12)', border: '1px solid rgba(198, 167, 105,0.3)', color: 'var(--mint-dark)' }}
            >
              <Icon name="star" size={26} fill />
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.5rem', color: 'var(--forest)', marginBottom: 22 }}>
              Be the first to share your experience with us.
            </p>
            <Link to="/review" className="btn-primary">
              Leave a Review
              <Icon name="arrow" size={14} strokeWidth={2} />
            </Link>
           </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}
