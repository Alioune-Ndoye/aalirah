import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import TrustMarquee from '@/components/TrustMarquee';
import cities from '@/data/cities';
import allServices, { servicePageUrls } from '@/data/allServices';
import siteConfig from '@/data/siteConfig';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(cities).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = cities[slug];
  if (!city) return {};
  return {
    title: `Cleaning Services in ${city.name}, CT — ${siteConfig.SITE_NAME}`,
    description: `Professional cleaning in ${city.name}, CT. Residential, condo, commercial, Airbnb, move-in/out & more. Eco-certified, fully insured, background-checked. 100% satisfaction guarantee. Instant online booking.`,
    alternates: { canonical: `${siteConfig.SITE_URL}/cleaning-services/${slug}` },
  };
}

function getSvcBody(key: string, cityName: string): string {
  const bodies: Record<string, string> = {
    residential:    `${cityName}'s homes — from established family neighborhoods to newly built developments — deserve more than a surface wipe. ${siteConfig.SITE_NAME}'s residential deep clean delivers a meticulous room-by-room transformation of your ${cityName} home. Every counter, baseboard, appliance exterior, bathroom, and floor is addressed.`,
    condo:          `Condos and apartments throughout ${cityName} come with their own challenges: building access protocols, HOA requirements, and shared-building consideration. ${siteConfig.SITE_NAME} is experienced cleaning condos and multi-unit properties across ${cityName} — efficient, respectful of neighbors, and fully compliant with building standards.`,
    commercial:     `Your ${cityName} office, retail space, or commercial facility reflects directly on your brand. ${siteConfig.SITE_NAME} provides professional commercial cleaning throughout ${cityName} — covering offices, waiting rooms, conference rooms, restrooms, and break areas. We offer early-morning, after-hours, and overnight scheduling.`,
    airbnb:         `Short-term rental hosts in ${cityName} know that cleanliness drives five-star reviews. ${siteConfig.SITE_NAME}'s Airbnb and short-term rental turnover service handles the complete ${cityName} property between guests: full clean, linen change, supply check, and photo confirmation.`,
    moveinout:      `Whether you're vacating a rental in ${cityName}, handing back keys to a landlord, or moving into your new ${cityName} home, ${siteConfig.SITE_NAME} provides thorough move-in and move-out cleaning that covers the full property — every room, inside every cabinet, inside every appliance, and every bathroom.`,
    postconstruct:  `Renovation and new construction in ${cityName} always leave behind what you can't easily see: fine drywall dust settled in vents, adhesive residue on surfaces, paint overspray on glass. ${siteConfig.SITE_NAME}'s post-construction cleaning team arrives with HEPA-filter vacuums and specialist products.`,
    estate:         `${cityName}'s finest homes require a different level of care. ${siteConfig.SITE_NAME}'s Luxury Estate Care service is available by appointment throughout ${cityName} and includes a dedicated account manager, a bespoke room-by-room cleaning programme, and the same senior background-checked team at every visit.`,
    event:          `Hosting a private gathering, corporate event, or formal occasion in ${cityName}? ${siteConfig.SITE_NAME} handles both pre-event preparation — full venue clean, surface polish, restroom prep — and post-event cleanup and reset for properties throughout ${cityName}.`,
    recurring:      `The most consistently clean ${cityName} homes and offices are on a recurring maintenance plan. ${siteConfig.SITE_NAME}'s weekly, bi-weekly, and monthly recurring service assigns you the same trusted team each visit and saves you up to 15% versus one-time bookings.`,
  };
  return bodies[key] || allServices[key]?.desc + ` Available throughout ${cityName}, CT.`;
}

const whyReasons = (cityName: string) => [
  { n: '01', title: 'Vetted & Background-Checked',  body: `Every team member passes a full background check and 40-hour training before entering any ${cityName} property.` },
  { n: '02', title: 'Eco-Certified Products',        body: 'Non-toxic, eco-certified solutions — safe for your family, pets, and the Connecticut environment.' },
  { n: '03', title: '100% Satisfaction Guarantee',  body: 'Not satisfied? We return within 24 hours and make it right — completely free. No questions asked.' },
  { n: '04', title: 'Fully Insured & Bonded',        body: `Every job is backed by full liability insurance and bonding. Your ${cityName} property is protected.` },
  { n: '05', title: 'Transparent Online Booking',    body: 'Book in 60 seconds, get instant pricing, and manage everything from your phone. No paperwork.' },
  { n: '06', title: 'Always On Time',                body: 'We respect your schedule. Our teams arrive in the promised window with a same-day reminder.' },
];

const statCards = ['4.9★ Google Rating','500+ Spaces Cleaned','100% Satisfaction','8+ Years in CT'];

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = cities[slug];
  if (!city) notFound();

  const commonFaqs = [
    { q: `How much does cleaning cost in ${city.name}, CT?`, a: 'Pricing starts from $160 for homes under 1,000 sq ft. Use our free online quote tool for an instant estimate based on your space, service type, and frequency.' },
    { q: `Are your cleaners background-checked and insured in ${city.name}?`, a: `Yes. Every ${siteConfig.SITE_NAME} team member is fully insured, bonded, and passes a rigorous background check before serving any ${city.name} client.` },
    { q: `Do you use eco-friendly products in ${city.name}?`, a: 'Absolutely. We use only premium, eco-certified, non-toxic solutions — safe for children, pets, and the environment. No harsh chemicals, ever.' },
  ];
  const faqs = [...city.faq_extra, ...commonFaqs];

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative flex flex-col overflow-hidden" style={{minHeight:'65vh',background:'var(--forest)'}}>
        <div className="hero-photo-bg" aria-hidden="true"></div>
        <div className="hero-video-overlay" aria-hidden="true"></div>
        <div className="hero-bg-grid" aria-hidden="true" style={{opacity:0.45}}></div>
        <div className="orb orb-1" aria-hidden="true"></div>
        <div className="orb orb-2" aria-hidden="true"></div>

        <div className="flex-1 flex items-end pb-24">
          <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10 pt-36">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2" style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.35)'}}>
                <li><Link href="/" style={{color:'rgba(255,255,255,0.5)',transition:'color .2s'}}>Home</Link></li>
                <li aria-hidden="true" style={{color:'rgba(255,255,255,0.2)'}}>›</li>
                <li><Link href="/services" style={{color:'rgba(255,255,255,0.5)',transition:'color .2s'}}>Services</Link></li>
                <li aria-hidden="true" style={{color:'rgba(255,255,255,0.2)'}}>›</li>
                <li style={{color:'var(--mint)'}}>{city.name}, CT</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                <div className="section-label mb-5"><span className="label-line"></span><span>{city.county}</span></div>
                <h1 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontWeight:400,fontSize:'clamp(2.8rem,6vw,5rem)',lineHeight:1.06,letterSpacing:'-0.01em',color:'#fff',marginBottom:'20px'}}>
                  Professional Cleaning<br/>in <em style={{color:'var(--mint)',fontStyle:'italic'}}>{city.name}, CT</em>
                </h1>
                <p style={{color:'rgba(255,255,255,0.60)',fontSize:'1rem',lineHeight:1.8,fontFamily:"'Inter',sans-serif",maxWidth:'480px',marginBottom:'32px'}}>
                  {city.intro}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/book" className="btn-primary">
                    Get a Free Quote
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <Link href="/services" className="btn-ghost">All Services</Link>
                </div>
              </div>

              <div className="hidden lg:block">
                <div style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(12px)',border:'1px solid rgba(200,132,90,0.2)',borderRadius:'20px',padding:'28px'}}>
                  <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.62rem',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--mint)',marginBottom:'16px'}}>Why {city.name} Chooses Us</p>
                  {city.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-3 mb-3" style={{fontSize:'0.88rem',color:'rgba(255,255,255,0.75)',fontFamily:"'Inter',sans-serif",lineHeight:1.5}}>
                      <svg style={{color:'var(--mint)',flexShrink:0,marginTop:'3px'}} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                      {h}
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-3 mt-5 pt-5" style={{borderTop:'1px solid rgba(200,132,90,0.15)'}}>
                    {['500+ Homes Cleaned','4.9★ Google Rating','100% Satisfaction','Fully Insured'].map((b) => (
                      <span key={b} style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.62rem',fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.45)'}}>{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 z-10">
          <TrustMarquee />
        </div>
      </section>

      {/* ── FEATURED SERVICES ── */}
      <section style={{background:'var(--surface)',padding:'6rem 0'}}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="mb-12 reveal-up">
            <div className="section-label mb-4"><span className="label-line"></span><span>Most Requested in {city.name}</span></div>
            <h2 className="section-heading">Top Services for <em>{city.name}</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {city.featured.map((key) => {
              const svc = allServices[key];
              if (!svc) return null;
              return (
                <div key={key} className="reveal-up" style={{background:'var(--forest)',borderRadius:'20px',padding:'32px',border:'1px solid rgba(200,132,90,0.15)',position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:'linear-gradient(90deg,var(--mint),var(--mint-light))'}}></div>
                  <div style={{fontSize:'2.2rem',marginBottom:'16px',lineHeight:1}}>{svc.icon}</div>
                  <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:'1rem',color:'#fff',marginBottom:'8px'}}>{svc.title}</h3>
                  <p style={{fontSize:'0.85rem',color:'rgba(255,255,255,0.55)',lineHeight:1.7,marginBottom:'20px'}}>{svc.desc}</p>
                  <div className="flex gap-4 flex-wrap">
                    <Link href={servicePageUrls[key] || '/book'} style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.72rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--mint)',display:'inline-flex',alignItems:'center',gap:'6px',textDecoration:'none'}}>
                      Learn More
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                    <Link href="/book" style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(255,255,255,0.45)',display:'inline-flex',alignItems:'center',gap:'5px',textDecoration:'none'}}>
                      Book Now →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ALL SERVICES ── */}
      <section style={{background:'#fff',padding:'5rem 0 6rem'}}>
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="mb-12 reveal-up">
            <div className="section-label mb-4"><span className="label-line"></span><span>Every Service in {city.name}</span></div>
            <h2 className="section-heading">Complete Cleaning Services <em>in {city.name}</em></h2>
            <p style={{color:'var(--text-soft)',fontFamily:"'Inter',sans-serif",fontSize:'0.95rem',lineHeight:1.75,marginTop:'12px',maxWidth:'600px'}}>
              {siteConfig.SITE_NAME} offers every type of professional cleaning in {city.name}, CT. Click any service to see full details, checklists, and pricing.
            </p>
          </div>
          <div className="space-y-0">
            {Object.entries(allServices).map(([key, svc]) => {
              const svcUrl = servicePageUrls[key] || '/book';
              const body = getSvcBody(key, city.name);
              return (
                <div key={key} className="reveal-up" style={{padding:'28px 0',borderBottom:'1px solid rgba(200,132,90,0.14)'}}>
                  <div className="flex items-start gap-5">
                    <div style={{fontSize:'1.8rem',lineHeight:1,flexShrink:0,marginTop:'4px',width:'2.2rem',textAlign:'center'}}>{svc.icon}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:'1rem',color:'var(--forest)',marginBottom:'8px',lineHeight:1.3}}>
                        <Link href={svcUrl} style={{color:'var(--forest)',textDecoration:'none'}}>
                          {svc.title} in {city.name}
                        </Link>
                      </h3>
                      <p style={{fontSize:'0.88rem',color:'var(--text-soft)',lineHeight:1.75,fontFamily:"'Inter',sans-serif",marginBottom:'14px'}}>{body}</p>
                      <div className="flex flex-wrap gap-4 items-center">
                        <Link href={svcUrl} style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.72rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--mint-dark)',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'5px'}}>
                          Full Service Details
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </Link>
                        <Link href="/book" style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-muted)',textDecoration:'none'}}>
                          Book in {city.name} →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href="/book" className="btn-primary inline-flex">
              Book a Cleaning in {city.name}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{background:'var(--forest)',padding:'6rem 0',position:'relative',overflow:'hidden'}}>
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'linear-gradient(rgba(200,132,90,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(200,132,90,0.05) 1px,transparent 1px)',backgroundSize:'64px 64px'}}></div>
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="text-center mb-14 reveal-up">
            <div className="section-label justify-center mb-5" style={{color:'var(--mint)'}}>
              <span className="label-line"></span>
              <span>Why {city.name} Trusts Us</span>
              <span className="label-line"></span>
            </div>
            <h2 className="section-heading-white">The {siteConfig.SITE_NAME} <em>Difference</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyReasons(city.name).map((r) => (
              <div key={r.n} className="step-card reveal-up" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(200,132,90,0.12)'}}>
                <span className="step-num" style={{color:'rgba(200,132,90,0.10)'}}>{r.n}</span>
                <h3 className="step-title" style={{color:'#fff',marginBottom:'8px'}}>{r.title}</h3>
                <p style={{fontSize:'0.88rem',lineHeight:1.7,color:'rgba(255,255,255,0.50)'}}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA ── */}
      <section style={{background:'var(--surface)',padding:'5rem 0'}}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <div className="section-label mb-4"><span className="label-line"></span><span>Service Coverage</span></div>
              <h2 className="section-heading mb-6">Serving All of <em>{city.name}</em></h2>
              <p style={{color:'var(--text-soft)',lineHeight:1.8,fontFamily:"'Inter',sans-serif",fontSize:'0.95rem',marginBottom:'20px'}}>
                We cover every neighborhood in {city.name}, including {city.areas.join(', ')}. Our local teams know the area and take pride in serving their neighbors.
              </p>
              {city.nearby.length > 0 && (
                <div style={{marginTop:'28px'}}>
                  <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.62rem',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--mint)',marginBottom:'12px'}}>We Also Serve Nearby</p>
                  <div className="flex flex-wrap gap-2">
                    {city.nearby.map((nb) => (
                      <Link
                        key={nb.slug}
                        href={`/cleaning-services/${nb.slug}`}
                        style={{padding:'6px 16px',borderRadius:'100px',background:'#fff',border:'1px solid rgba(200,132,90,0.22)',fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.72rem',fontWeight:600,color:'var(--forest)',textDecoration:'none',display:'inline-block'}}
                      >
                        {nb.name}, CT
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="reveal-right">
              <div style={{background:'var(--forest)',borderRadius:'24px',padding:'36px',border:'1px solid rgba(200,132,90,0.15)'}}>
                <h3 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'1.5rem',fontWeight:400,color:'#fff',marginBottom:'24px'}}>
                  Trusted by <em style={{color:'var(--mint)'}}>500+</em> Connecticut Clients
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {statCards.map((s) => {
                    const parts = s.split(' ');
                    const first = parts[0];
                    const rest = parts.slice(1).join(' ');
                    return (
                      <div key={s} style={{padding:'14px',background:'rgba(255,255,255,0.04)',borderRadius:'12px',border:'1px solid rgba(200,132,90,0.1)'}}>
                        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.78rem',fontWeight:700,color:'var(--mint)',lineHeight:1.2}}>{first}</div>
                        <div style={{fontSize:'0.65rem',letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.35)',marginTop:'4px'}}>{rest}</div>
                      </div>
                    );
                  })}
                </div>
                <Link href="/book" className="btn-primary" style={{display:'inline-flex'}}>
                  Book in {city.name}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{background:'#fff',padding:'6rem 0'}}>
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12 reveal-up">
            <div className="section-label justify-center mb-4"><span className="label-line"></span><span>FAQ — {city.name}</span><span className="label-line"></span></div>
            <h2 className="section-heading">Questions About Cleaning in <em>{city.name}?</em></h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
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
            <span className="label-line"></span>
            <span>{city.name}, {city.county}</span>
            <span className="label-line"></span>
          </div>
          <h2 className="section-heading-white mb-4">Ready for a Spotless <em>{city.name}?</em></h2>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:'0.95rem',color:'rgba(255,255,255,0.55)',fontStyle:'italic',marginBottom:'36px'}}>
            Book online in 60 seconds. No commitment — we confirm within 2 hours.
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
