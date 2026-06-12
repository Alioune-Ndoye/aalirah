import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import TrustMarquee from '@/components/TrustMarquee';
import services, { cityNames } from '@/data/services';
import siteConfig from '@/data/siteConfig';

interface Props {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return Object.keys(services).map((service) => ({ service }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const svc = services[service];
  if (!svc) return {};
  const plainHeadline = svc.headline.replace(/<[^>]+>/g, '');
  return {
    title: `${svc.title} in Connecticut — ${siteConfig.SITE_NAME}`,
    description: `${plainHeadline} serving West Hartford, Hartford, Farmington, and Central Connecticut. Eco-certified, fully insured, 100% satisfaction guaranteed. Book online instantly.`,
    alternates: { canonical: `${siteConfig.SITE_URL}/${service}` },
  };
}

const trustPoints = [
  'Eco-certified, non-toxic products',
  'Fully insured & background-checked team',
  '100% satisfaction guarantee',
  'Same-team consistency every visit',
  'Book online — instant price estimate',
  'Serving all of Central Connecticut',
];

export default async function ServicePage({ params }: Props) {
  const { service } = await params;
  const svc = services[service];
  if (!svc) notFound();

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative flex flex-col overflow-hidden" style={{minHeight:'60vh',background:'var(--forest)'}}>
        <div className="hero-photo-bg" aria-hidden="true"></div>
        <div className="hero-video-overlay" aria-hidden="true"></div>
        <div className="hero-bg-grid" aria-hidden="true" style={{opacity:0.4}}></div>
        <div className="orb orb-1" aria-hidden="true"></div>
        <div className="orb orb-2" aria-hidden="true"></div>

        <div className="flex-1 flex items-end pb-24">
          <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10 pt-36">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2" style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.35)'}}>
                <li><Link href="/" style={{color:'rgba(255,255,255,0.5)',transition:'color .2s'}}>Home</Link></li>
                <li style={{color:'rgba(255,255,255,0.2)'}}>›</li>
                <li><Link href="/services" style={{color:'rgba(255,255,255,0.5)',transition:'color .2s'}}>Services</Link></li>
                <li style={{color:'rgba(255,255,255,0.2)'}}>›</li>
                <li style={{color:'var(--mint)'}}>{svc.title}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                <div className="section-label mb-5"><span className="label-line"></span><span>Connecticut</span></div>
                <h1
                  className="section-heading-white mb-5"
                  style={{fontSize:'clamp(2.6rem,5.5vw,4.5rem)'}}
                  dangerouslySetInnerHTML={{__html: svc.headline}}
                />
                <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'1.35rem',fontWeight:400,fontStyle:'italic',color:'var(--mint-light)',marginBottom:'20px'}}>{svc.tagline}</p>
                <p style={{color:'rgba(255,255,255,0.60)',fontSize:'0.95rem',lineHeight:1.8,fontFamily:"'Inter',sans-serif",maxWidth:'500px',marginBottom:'32px'}}>{svc.hero_desc}</p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/book" className="btn-primary">
                    Get a Free Quote
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <a href={`tel:+${siteConfig.SITE_PHONE_RAW}`} className="btn-ghost">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.72 10.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.63 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 7.61a16 16 0 006.29 6.29l.98-.87a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                    {siteConfig.SITE_PHONE}
                  </a>
                </div>
              </div>

              <div className="hidden lg:block">
                <div style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(12px)',border:'1px solid rgba(200,132,90,0.2)',borderRadius:'20px',padding:'28px 28px 24px'}}>
                  <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.62rem',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--mint)',marginBottom:'16px'}}>Why Choose {siteConfig.SITE_NAME}</p>
                  {trustPoints.map((t) => (
                    <div key={t} className="flex items-center gap-3 mb-3" style={{fontSize:'0.88rem',color:'rgba(255,255,255,0.72)',fontFamily:"'Inter',sans-serif"}}>
                      <svg style={{color:'var(--mint)',flexShrink:0}} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 z-10">
          <TrustMarquee />
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section style={{background:'#fff',padding:'6rem 0'}}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="mb-12 reveal-up">
            <div className="section-label mb-4"><span className="label-line"></span><span>Full Checklist</span></div>
            <h2 className="section-heading">What&apos;s <em>Included</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {svc.includes.map((block) => (
              <div key={block.heading} className="reveal-up p-6 rounded-2xl" style={{border:'1px solid rgba(200,132,90,0.18)',background:'var(--surface)'}}>
                <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:'0.78rem',letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--mint)',marginBottom:'16px'}}>{block.heading}</h3>
                <ul className="space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5" style={{fontSize:'0.875rem',color:'var(--text-soft)',fontFamily:"'Inter',sans-serif",lineHeight:1.55}}>
                      <svg style={{color:'var(--mint)',flexShrink:0,marginTop:'3px'}} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{background:'var(--forest)',padding:'6rem 0',position:'relative',overflow:'hidden'}}>
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'linear-gradient(rgba(200,132,90,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(200,132,90,0.05) 1px,transparent 1px)',backgroundSize:'64px 64px'}}></div>
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="text-center mb-14 reveal-up">
            <div className="section-label justify-center mb-5" style={{color:'var(--mint)'}}>
              <span className="label-line"></span><span>The Process</span><span className="label-line"></span>
            </div>
            <h2 className="section-heading-white">How It <em>Works</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {svc.process.map((step) => (
              <div key={step.n} className="step-card reveal-up" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(200,132,90,0.12)'}}>
                <span className="step-num" style={{color:'rgba(200,132,90,0.10)'}}>{step.n}</span>
                <h3 className="step-title" style={{color:'#fff',marginBottom:'8px'}}>{step.title}</h3>
                <p style={{fontSize:'0.88rem',lineHeight:1.7,color:'rgba(255,255,255,0.55)'}}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{background:'var(--surface)',padding:'5rem 0'}}>
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <div className="mb-10 reveal-up">
            <div className="section-label justify-center mb-4"><span className="label-line"></span><span>Pricing</span><span className="label-line"></span></div>
            <h2 className="section-heading">Transparent <em>Pricing</em></h2>
            <p style={{color:'var(--text-soft)',fontFamily:"'Inter',sans-serif",fontSize:'0.95rem',marginTop:'12px'}}>Instant estimate online — no commitment until you confirm. No hidden fees.</p>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-${svc.pricing.length} gap-5 mb-8`}>
            {svc.pricing.map((tier, i) => (
              <div key={tier.tier} className={`reveal-up p-6 rounded-2xl${i===1?' ring-2 ring-offset-2':''}`} style={{background:'#fff',border:`1px solid rgba(200,132,90,${i===1?'0.45':'0.18'})`,...(i===1 ? {boxShadow:'0 8px 32px rgba(200,132,90,0.18)'} : {})}}>
                {i===1 && <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.6rem',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--mint)',marginBottom:'10px'}}>Most Popular</div>}
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'0.95rem',fontWeight:500,fontStyle:'italic',color:'var(--text-soft)',marginBottom:'8px'}}>{tier.tier}</div>
                <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'1.8rem',fontWeight:800,letterSpacing:'-0.03em',color:'var(--forest)'}}>{tier.price}</div>
              </div>
            ))}
          </div>
          <Link href="/book" className="btn-primary inline-flex">
            Get Your Instant Quote
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      {/* ── CITIES ── */}
      <section style={{background:'#fff',padding:'5rem 0'}}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="mb-10 reveal-up">
            <div className="section-label mb-4"><span className="label-line"></span><span>{svc.city_label}</span></div>
            <h2 className="section-heading">Connecticut <em>Communities We Serve</em></h2>
            <p style={{color:'var(--text-soft)',fontFamily:"'Inter',sans-serif",fontSize:'0.95rem',marginTop:'10px',maxWidth:'560px'}}>Click any city to see local availability, unique neighbourhood details, and city-specific pricing.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {svc.cities.map((cslug) => {
              const cname = cityNames[cslug] || cslug.replace(/-ct$/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
              return (
                <Link
                  key={cslug}
                  href={`/cleaning-services/${cslug}`}
                  style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'10px 18px',borderRadius:'100px',background:'var(--surface)',border:'1px solid rgba(200,132,90,0.22)',fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.78rem',fontWeight:600,color:'var(--forest)',textDecoration:'none'}}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {cname}, CT
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{background:'var(--surface)',padding:'6rem 0'}}>
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12 reveal-up">
            <div className="section-label justify-center mb-4"><span className="label-line"></span><span>FAQ</span><span className="label-line"></span></div>
            <h2 className="section-heading">Frequently Asked <em>Questions</em></h2>
          </div>
          <div className="space-y-3">
            {svc.faq.map((faq, i) => (
              <details key={i} className="reveal-up" style={{border:'1px solid rgba(200,132,90,0.18)',borderRadius:'14px',overflow:'hidden'}}>
                <summary style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'18px 22px',background:'#fff',cursor:'pointer',fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.9rem',fontWeight:600,color:'var(--forest)',gap:'12px',listStyle:'none'}}>
                  {faq.q}
                  <span style={{fontSize:'1.2rem',flexShrink:0,color:'var(--mint)',fontWeight:400,lineHeight:1}}>+</span>
                </summary>
                <div style={{padding:'0 22px 18px',background:'#fff'}}>
                  <p style={{fontSize:'0.88rem',lineHeight:1.75,color:'var(--text-soft)',fontFamily:"'Inter',sans-serif",borderTop:'1px solid rgba(200,132,90,0.12)',paddingTop:'14px'}}>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{background:'var(--forest)',padding:'6rem 0',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'linear-gradient(rgba(200,132,90,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(200,132,90,0.06) 1px,transparent 1px)',backgroundSize:'64px 64px'}}></div>
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <div className="section-label justify-center mb-6" style={{color:'var(--mint)'}}>
            <span className="label-line"></span><span>{svc.title}</span><span className="label-line"></span>
          </div>
          <h2 className="section-heading-white mb-4">Ready to <em>Book?</em></h2>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:'0.95rem',color:'rgba(255,255,255,0.55)',fontStyle:'italic',marginBottom:'36px'}}>
            Get an instant price estimate online. No commitment — we confirm within 2 hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book" className="btn-primary">
              Get a Free Quote
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <a href={`tel:+${siteConfig.SITE_PHONE_RAW}`} className="btn-ghost">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.72 10.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.63 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 7.61a16 16 0 006.29 6.29l.98-.87a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              {siteConfig.SITE_PHONE}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
