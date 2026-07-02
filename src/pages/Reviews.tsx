import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import VideoModal from '../components/VideoModal';
import Seo, { JsonLd } from '../components/Seo';
import { meta, breadcrumbLd } from '../lib/seo';
import { testimonials } from '../lib/data';
import type { Testimonial } from '../lib/data';
import { getSubmittedReviews, apiEnabled, fetchApprovedReviews, fetchGoogleReviews } from '../lib/reviewStore';
import { autoPoster } from '../lib/video';
import { site } from '../lib/site';
import { useSiteSettings } from '../lib/settingsStore';

const initials = (name: string) =>
  name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

export default function Reviews() {
  const [activeVideo, setActiveVideo] = useState<{ src: string; name: string } | null>(null);
  const settings = useSiteSettings();
  // Dynamic reviews: approved reviews from the backend, or locally-submitted demo reviews.
  const [dynamic, setDynamic] = useState<(Testimonial & { id: string; pending?: boolean })[]>([]);

  useEffect(() => {
    if (apiEnabled()) {
      // Combine: our own (video) reviews + Google Business reviews. Both from the backend.
      Promise.all([fetchApprovedReviews(), fetchGoogleReviews()]).then(([own, google]) => {
        const merged = [...own, ...google].map((r, i) => ({ ...r, id: (r as { id?: string }).id ?? `r_${i}` }));
        setDynamic(merged);
      });
    } else {
      // No backend configured — show locally-submitted demo reviews (with badge).
      setDynamic(getSubmittedReviews());
    }
  }, []);

  const allReviews: (Testimonial & { id?: string; pending?: boolean })[] = [...dynamic, ...testimonials];

  // Real, computed rating + count (no fabricated numbers).
  const reviewCount = allReviews.length;
  const avgRating = reviewCount
    ? allReviews.reduce((s, r) => s + (r.rating || 0), 0) / reviewCount
    : 0;
  const hasExternal = Boolean(site.googleReviewUrl || site.yelpUrl);

  return (
    <>
      <Seo {...meta.reviews} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Reviews', path: '/reviews' },
        ])}
      />

      <PageHero
        label="Client Stories"
        title="Loved by"
        em={`${site.city}`}
        sub={`Real reviews from ${site.name} customers across Connecticut. Had a clean with us? We'd love to hear about it.`}
        marquee
        minH="56vh"
      />

      {/* Rating summary — only when there are real reviews (or external profiles). */}
      {(reviewCount > 0 || hasExternal) && (
        <section className="bg-ivory py-16">
          <div className="wrap flex flex-col sm:flex-row items-center justify-center gap-6">
            {reviewCount > 0 && (
              <div
                className="inline-flex items-center gap-4 px-7 py-5 rounded-2xl"
                style={{ background: '#fff', border: '1px solid var(--border)', boxShadow: '0 2px 20px rgba(44,44,44,0.06)' }}
              >
                <div className="text-left">
                  <div className="flex items-center gap-1" style={{ color: 'var(--mint)' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="star" size={16} fill={i < Math.round(avgRating)} />
                    ))}
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, color: 'var(--forest)', marginLeft: 6, fontSize: '1.1rem' }}>
                      {avgRating.toFixed(1)}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    {reviewCount} verified {reviewCount === 1 ? 'review' : 'reviews'}
                  </div>
                </div>
              </div>
            )}
            {site.googleReviewUrl && (
              <a href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn-dark">
                Read all on Google
                <Icon name="arrow" size={14} strokeWidth={2} />
              </a>
            )}
            {site.yelpUrl && (
              <a href={site.yelpUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ color: 'var(--forest)', borderColor: 'var(--border)' }}>
                See us on Yelp
              </a>
            )}
          </div>
        </section>
      )}

      {/* Reviews grid */}
      <section className="bg-cream py-20 md:py-24">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Placeholder until the first video review comes in */}
          {!allReviews.some((t) => t.video) && (
            <Reveal>
              <Link
                to="/review"
                className="h-full rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center p-10 group"
                style={{ background: 'var(--forest)', border: '1px solid rgba(198,167,105,0.25)', minHeight: 260, textDecoration: 'none' }}
              >
                <span
                  className="flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(198,167,105,0.4)' }}
                >
                  <Icon name="camera" size={26} className="text-mint" />
                </span>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.6rem', color: '#fff', marginBottom: 8 }}>
                  Be our first video review
                </div>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', maxWidth: 280 }}>
                  Loved your clean? Share a quick video — it means the world to a growing local business.
                </p>
                <span className="inline-flex items-center gap-1.5 mt-5" style={{ color: 'var(--mint)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.8rem' }}>
                  Leave a review <Icon name="arrow" size={13} strokeWidth={2} />
                </span>
              </Link>
            </Reveal>
          )}
          {allReviews.map((t, i) => {
            const poster = t.poster ?? (t.video ? autoPoster(t.video) : null);
            return (
            <Reveal key={t.id ?? t.name} delay={(i % 2) * 0.08}>
              <div className="h-full rounded-3xl overflow-hidden flex flex-col" style={{ background: '#fff', border: '1px solid var(--border)' }}>
                {t.video && (
                  <button
                    type="button"
                    onClick={() => setActiveVideo({ src: t.video!, name: t.name })}
                    aria-label={`Play video review from ${t.name}`}
                    className="relative w-full group"
                    style={{
                      aspectRatio: '16 / 9',
                      background: poster
                        ? `center / cover no-repeat url(${poster})`
                        : 'linear-gradient(135deg, var(--forest), var(--mint-dark))',
                      cursor: 'pointer',
                      border: 0,
                    }}
                  >
                    <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(20,28,24,0.28)' }} />
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        transform: 'translate(-50%, -50%)',
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.92)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                        paddingLeft: 4,
                      }}
                    >
                      <Icon name="play" size={24} fill className="text-forest" />
                    </span>
                    <span
                      className="absolute left-4 bottom-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(255,255,255,0.92)', color: 'var(--forest)', fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      <Icon name="camera" size={12} /> Video review
                    </span>
                  </button>
                )}
                <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex gap-1" style={{ color: 'var(--mint)' }}>
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Icon key={j} name="star" size={16} fill />
                    ))}
                  </div>
                  {t.pending && (
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(198,167,105,0.15)', color: 'var(--mint-dark)', fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Just submitted
                    </span>
                  )}
                </div>
                <blockquote
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.3rem', lineHeight: 1.55, color: 'var(--forest)', marginBottom: 24 }}
                >
                  "{t.text}"
                </blockquote>
                <div className="flex items-center gap-3 mt-auto">
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                      style={{ border: '1px solid var(--border)' }}
                    />
                  ) : (
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ background: 'rgba(198,167,105,0.15)', border: '1px solid rgba(198,167,105,0.3)', color: 'var(--mint-dark)', fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {initials(t.name)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: 'var(--forest)' }}>{t.name}</div>
                    <div className="flex items-center gap-1.5" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      {t.source === 'google' && <GoogleG />}
                      <span className="truncate">{t.when ? `${t.role} · ${t.when}` : t.role}</span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </Reveal>
            );
          })}
        </div>
      </section>

      {/* Referral + CTA */}
      <section className="py-24 text-center relative overflow-hidden" style={{ background: 'var(--forest)' }}>
        <div className="orb orb-2" style={{ opacity: 0.2 }} aria-hidden="true" />
        <div className="relative z-10 wrap">
          <h2 className="section-heading-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Join Our <em>Happy Clients</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 520, margin: '0 auto 32px' }}>
            Experience the {site.name} difference for yourself — and refer a friend to earn $25 off your next clean.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/book" className="btn-primary">
              Get a Free Quote
              <Icon name="arrow" size={14} strokeWidth={2} />
            </Link>
            {settings.showSpecials && (
              <Link to="/specials" className="btn-ghost">
                See Current Specials
              </Link>
            )}
          </div>
        </div>
      </section>

      <VideoModal
        src={activeVideo?.src ?? null}
        label={activeVideo?.name}
        onClose={() => setActiveVideo(null)}
      />
    </>
  );
}

/** Small Google "G" mark shown on reviews synced from Google Business Profile. */
function GoogleG() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-label="Google" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}
