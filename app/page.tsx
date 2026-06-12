import type { Metadata } from 'next';
import Link from 'next/link';
import TrustMarquee from '@/components/TrustMarquee';
import siteConfig from '@/data/siteConfig';

export const metadata: Metadata = {
  title: `${siteConfig.SITE_NAME} — Professional Cleaning Services in ${siteConfig.SITE_CITY}, ${siteConfig.SITE_STATE}`,
  description: `Top-rated professional cleaning in ${siteConfig.SITE_CITY}, CT. Eco-certified, fully insured, background-checked team. Residential, commercial, move-out & more. 100% satisfaction guaranteed. Book online in 60 seconds.`,
  alternates: { canonical: `${siteConfig.SITE_URL}/` },
};

const stats = [
  { num: 500, suffix: '+', label: 'Spaces Cleaned' },
  { num: 98,  suffix: '%', label: 'Happy Clients' },
  { num: 8,   suffix: '+', label: 'Years Trusted' },
];

const services = [
  { bg: 'svc-card-bg-1', tag: 'From 4 hrs',      title: 'Residential Deep Clean',  desc: 'Room-by-room transformation. No corner missed, no surface unpolished. Your home reset to perfection.' },
  { bg: 'svc-card-bg-2', tag: 'Custom Plans',    title: 'Office & Commercial',      desc: 'Elevate your workspace to match your brand. First impressions start with a spotless environment.' },
  { bg: 'svc-card-bg-3', tag: 'Full Property',   title: 'Move In / Move Out',       desc: 'A fresh start deserves a spotless space. We prepare every corner for the next chapter.' },
  { bg: 'svc-card-bg-4', tag: 'Expert Team',     title: 'Post-Construction',        desc: 'Specialist dust, debris, and detail cleaning after renovations or new construction.' },
  { bg: 'svc-card-bg-5', tag: 'By Appointment',  title: 'Luxury Estate Care',       desc: 'White-glove service for high-value properties with bespoke care programs tailored to your home.' },
  { bg: 'svc-card-bg-6', tag: 'Same-Day Avail.', title: 'Event Preparation',        desc: 'Pre and post-event cleaning for private gatherings, galas, and corporate affairs.' },
];

const svcIcons = [
  '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>',
  '<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>',
  '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',
  '<path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><circle cx="12" cy="13" r="3"/>',
];

const reasons = [
  { n: '01', icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>', title: 'Vetted & Trained Specialists', body: 'Every team member passes rigorous background checks and a 40-hour proprietary training program before setting foot in your home.' },
  { n: '02', icon: '<path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>', title: 'Eco-Certified Products', body: 'We use only premium, non-toxic solutions that protect your surfaces, your family, and the planet — no harsh chemicals, ever.' },
  { n: '03', icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', title: '100% Satisfaction Guaranteed', body: "If anything doesn't meet your expectations, we return within 24 hours to make it right — completely free of charge, no questions asked." },
  { n: '04', icon: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>', title: 'Always On Time', body: 'We respect your schedule. Our teams arrive in the promised window every time — and we send you a reminder the day before.' },
  { n: '05', icon: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" stroke="none"/>', title: '5-Star Rated on Google', body: 'Hundreds of verified 5-star reviews from real Connecticut clients. Our reputation is built one spotless space at a time.' },
  { n: '06', icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>', title: 'Seamless Digital Experience', body: 'Book in 60 seconds, track your team in real time, and manage everything from your phone. No paperwork, no hassle.' },
];

const why = [
  { n: '01', title: 'Vetted & Trained Specialists', body: 'Every team member passes rigorous background checks and a 40-hour proprietary training program before entering your home.' },
  { n: '02', title: 'Premium Eco-Certified Products', body: 'We use only luxury-grade, non-toxic solutions that protect your surfaces, your family, and the environment.' },
  { n: '03', title: 'Satisfaction or We Return', body: "If any aspect doesn't meet your expectations, we come back within 24 hours — at no additional cost." },
  { n: '04', title: 'Seamless Digital Experience', body: 'Book, communicate, and manage services from your phone. Transparent pricing. Real-time updates.' },
];

const cases = [
  { title: 'Luxury Kitchen Restoration', sub: 'West Hartford, CT' },
  { title: 'Executive Office Deep Clean', sub: 'Beverly Hills Tower' },
  { title: 'Post-Construction Reveal', sub: 'Malibu Residence' },
];

const tests = [
  { name: 'Alexandra Moore', role: 'Interior Designer, West Hartford', initials: 'AM', rating: 5, text: 'Alira has completely transformed how I present finished projects to clients. Their attention to detail is unmatched — they treat every surface like a canvas.' },
  { name: 'Jonathan Whitfield', role: 'CEO, Whitfield Capital', initials: 'JW', rating: 5, text: 'My office has never looked — or felt — this pristine. The team is professional, discreet, and efficient. Exactly what a high-end workspace demands.' },
  { name: 'Serena Voss', role: 'Luxury Property Owner', initials: 'SV', rating: 5, text: "I've tried every premium cleaning service in the city. Alira is in a different league. The only name I recommend to friends in Bel Air." },
  { name: 'Marcus Chen', role: 'Architect & Developer', initials: 'MC', rating: 5, text: 'Post-construction cleaning is a nightmare to get right. Alira handled our 6,000 sq ft project with surgical precision. Stunning result every time.' },
];

const contacts = [
  { href: `tel:+${siteConfig.SITE_PHONE_RAW}`, icon: '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.72 10.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.63 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 7.61a16 16 0 006.29 6.29l.98-.87a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>', label: 'Phone', val: siteConfig.SITE_PHONE },
  { href: `mailto:${siteConfig.SITE_EMAIL}`, icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>', label: 'Email', val: siteConfig.SITE_EMAIL },
  { href: '#', icon: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>', label: 'Hours', val: 'Mon–Sat, 7am–7pm PST' },
];

const socSocials = [
  { l: 'Instagram', h: siteConfig.SITE_IG, p: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>' },
  { l: 'Facebook',  h: siteConfig.SITE_FB, p: '<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>' },
  { l: 'LinkedIn',  h: siteConfig.SITE_LI, p: '<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>' },
];

export default function HomePage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section id="hero" className="hero-section relative min-h-screen flex items-center" style={{overflow:'clip'}} data-panel="">
        {/* Photo background with Ken Burns pan/zoom — video fallback requires local mp4 files */}
        <div className="hero-photo-bg" aria-hidden="true"></div>
        <video id="heroVideo" className="hero-video-bg" autoPlay muted loop playsInline aria-hidden="true"></video>
        <div className="hero-video-overlay" aria-hidden="true"></div>
        <div className="hero-bg-grid" aria-hidden="true"></div>
        <div className="orb orb-1" aria-hidden="true"></div>
        <div className="orb orb-2" aria-hidden="true"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left */}
          <div className="hero-content">
            <div className="hero-eyebrow inline-flex items-center gap-3 mb-8 opacity-0">
              <span className="inline-block w-2 h-2 rounded-full bg-mint animate-pulse"></span>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--mint-light)'}}>
                Professional Cleaning — West Hartford, CT
              </span>
            </div>
            <h1 className="mb-6" style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontWeight:400,lineHeight:1.08,letterSpacing:'-0.01em',paddingBottom:'0.14em'}}>
              <span className="hero-line block text-white" style={{fontSize:'clamp(3.8rem,6.5vw,6.5rem)'}}>Your Space.</span>
              <span className="hero-line block" style={{fontSize:'clamp(3.8rem,6.5vw,6.5rem)',color:'var(--mint)',fontStyle:'italic'}}>Spotless.</span>
              <span className="hero-line block text-white" style={{fontSize:'clamp(3.8rem,6.5vw,6.5rem)'}}>Guaranteed.</span>
            </h1>
            <p className="hero-sub opacity-0 mb-10 max-w-md" style={{fontSize:'1.1rem',lineHeight:1.7,color:'rgba(255,255,255,0.60)'}}>
              We transform homes and businesses across West Hartford and Connecticut with precision cleaning, eco-friendly products, and a 100% satisfaction promise.
            </p>
            <div className="hero-cta flex flex-wrap items-center gap-4 mb-16 opacity-0">
              <Link href="/book" className="btn-primary">
                Get a Free Quote
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="#services" className="btn-ghost">Our Services</Link>
            </div>
            {/* Stats */}
            <div className="hero-stats flex flex-wrap gap-8 pt-8 border-t border-white/10 opacity-0">
              {stats.map((st, i) => (
                <div key={st.label} className="flex items-center gap-8">
                  {i > 0 && <div className="hidden sm:block w-px h-10 bg-white/10"></div>}
                  <div className="text-center">
                    <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'2.8rem',fontWeight:800,letterSpacing:'-0.04em',color:'var(--mint)',lineHeight:1}}>
                      <span className="counter" data-target={st.num}>0</span>{st.suffix}
                    </div>
                    <div style={{fontSize:'0.68rem',letterSpacing:'0.16em',textTransform:'uppercase',color:'rgba(255,255,255,0.40)',marginTop:'6px'}}>{st.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="hero-visual hidden lg:flex justify-end relative opacity-0">
            <div className="hero-frame-wrap relative w-[88%]">
              <div className="hero-frame rounded-2xl overflow-hidden" style={{aspectRatio:'3/4',maxHeight:'600px'}}>
                <div className="hero-frame-bg"></div>
                <div className="hero-frame-overlay"></div>
                <div className="absolute bottom-8 left-6 right-6 flex items-center gap-4 rounded-2xl p-5"
                     style={{background:'rgba(44,44,44,0.75)',backdropFilter:'blur(20px)',border:'1px solid rgba(200,132,90,0.2)'}}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{background:'var(--mint)'}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="2.5">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="var(--forest)"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:'0.9rem',color:'#fff'}}>Top Rated in CT</div>
                    <div style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.50)',marginTop:'2px'}}>Eco-Certified · Fully Insured</div>
                  </div>
                  <div className="ml-auto flex -space-x-2">
                    {[0,1,2,3].map((a) => (
                      <div key={a} className="w-8 h-8 rounded-full border-2 border-forest overflow-hidden" style={{background:'var(--forest-mid)'}}>
                        <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,var(--mint-dark),var(--mint-light))',opacity:`0.${5+a}`}}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Marquee */}
        <div className="absolute bottom-0 inset-x-0 z-10">
          <TrustMarquee />
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section id="services" className="relative bg-white py-28 md:py-36 overflow-hidden" data-panel="">
        <div className="svc-bg-orb" aria-hidden="true"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 reveal-up">
            <div>
              <div className="section-label mb-4">
                <span className="label-line"></span>
                <span>What We Offer</span>
              </div>
              <h2 className="section-heading">Services Built for <em>Real Results</em></h2>
            </div>
            <Link href="/services" className="btn-dark flex-shrink-0 self-start md:self-auto">
              All Services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="svc-grid reveal-up">
            {services.map((svc, i) => {
              const slug = svc.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              const num = String(i + 1).padStart(2, '0');
              return (
                <div key={svc.title} className="svc-card" aria-label={svc.title}>
                  <div className="svc-card-inner">
                    <div className="svc-card-front">
                      <div className={`svc-card-img ${svc.bg}`}></div>
                      <div className="svc-card-front-overlay"></div>
                      <div className="svc-card-front-body">
                        <span className="svc-card-tag">{svc.tag}</span>
                        <h3 className="svc-card-title">{svc.title}</h3>
                      </div>
                    </div>
                    <div className="svc-card-back">
                      <span className="svc-card-back-num">{num}</span>
                      <div className="svc-card-back-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" dangerouslySetInnerHTML={{__html: svcIcons[i]}} />
                      </div>
                      <h3 className="svc-card-back-title">{svc.title}</h3>
                      <p className="svc-card-back-desc">{svc.desc}</p>
                      <Link href={`/services#${slug}`} className="svc-card-back-cta">
                        Learn More
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section id="how-it-works" className="relative py-28 md:py-36 overflow-hidden" style={{background:'var(--forest)'}} data-panel="">
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'linear-gradient(rgba(200,132,90,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(200,132,90,0.05) 1px,transparent 1px)',backgroundSize:'64px 64px'}}></div>
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="text-center mb-16 reveal-up">
            <div className="section-label justify-center mb-5" style={{color:'var(--mint)'}}>
              <span className="label-line"></span>
              <span>Why Choose Us</span>
              <span className="label-line"></span>
            </div>
            <h2 className="section-heading-white mb-4">The Alira <em>Difference</em></h2>
            <p className="max-w-lg mx-auto leading-relaxed" style={{color:'rgba(255,255,255,0.55)'}}>
              In a city full of cleaning services, here&apos;s why over 500 Connecticut clients trust us with their most important spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.map((r) => (
              <div key={r.n} className="step-card reveal-up" style={{background:'rgba(255,255,255,0.04)',borderColor:'rgba(200,132,90,0.12)'}}>
                <span className="step-num" style={{color:'rgba(200,132,90,0.10)'}}>{r.n}</span>
                <div className="step-icon" style={{background:'rgba(200,132,90,0.12)',color:'var(--mint)'}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" dangerouslySetInnerHTML={{__html: r.icon}} />
                </div>
                <h3 className="step-title" style={{color:'#fff'}}>{r.title}</h3>
                <p style={{fontSize:'0.88rem',lineHeight:1.7,color:'rgba(255,255,255,0.50)'}}>{r.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-5">
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

      {/* ── WHY US (detailed) ── */}
      <section id="why-us" className="relative bg-ivory overflow-hidden" data-panel="">
        <div className="why-bg-orb" aria-hidden="true"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
          <div className="py-28 md:py-36 px-6 md:px-10 lg:pl-[max(40px,calc((100vw-1240px)/2+40px))] flex flex-col justify-center">
            <div className="section-label mb-5">
              <span className="label-line"></span>
              <span>The Difference</span>
            </div>
            <h2 className="section-heading mb-6">Why Clients Choose <em>Alira</em></h2>
            <p style={{color:'var(--text-soft)',lineHeight:1.75,marginBottom:'3rem',maxWidth:'36rem'}}>
              In a world of unreliable cleaning services, we&apos;ve built something different — a practice rooted in precision, integrity, and genuine care for your space.
            </p>
            {why.map((w, i) => (
              <div key={w.n} className="why-feat flex gap-6 mb-8" data-why-i={i}>
                <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'2.2rem',fontWeight:800,letterSpacing:'-0.04em',color:'rgba(200,132,90,0.22)',lineHeight:1,flexShrink:0,width:'2.5rem'}}>{w.n}</div>
                <div>
                  <h4 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:'0.92rem',color:'var(--forest)',marginBottom:'6px'}}>{w.title}</h4>
                  <p style={{fontSize:'0.85rem',lineHeight:1.7,color:'var(--text-soft)'}}>{w.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="h-80 md:h-[420px] lg:h-auto relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=85"
              alt="Professional cleaner at work"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 hidden lg:block pointer-events-none" style={{background:'linear-gradient(to right,var(--ivory)/50%,transparent)'}}></div>
            <div className="why-tag absolute top-20 right-16 hidden lg:flex items-center gap-2 rounded-full px-4 py-2 text-xs"
                 style={{background:'rgba(44,44,44,0.75)',backdropFilter:'blur(16px)',border:'1px solid rgba(200,132,90,0.3)',color:'var(--mint-light)',fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,letterSpacing:'0.08em'}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Eco-Certified
            </div>
            <div className="why-tag absolute bottom-28 right-10 hidden lg:flex items-center gap-2 rounded-full px-4 py-2 text-xs"
                 style={{background:'rgba(44,44,44,0.75)',backdropFilter:'blur(16px)',border:'1px solid rgba(200,132,90,0.3)',color:'var(--mint-light)',fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,letterSpacing:'0.08em'}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              5-Star Rated
            </div>
          </div>
        </div>
      </section>

      {/* ── BEFORE & AFTER ── */}
      <section id="showcase" className="h-scroll-section relative bg-white" data-panel="">
        <div className="h-scroll-header px-6 md:px-10 pt-24 md:pt-28 pb-8">
          <div className="text-center max-w-xl mx-auto reveal-up">
            <div className="section-label justify-center mb-5">
              <span className="label-line"></span>
              <span>The Transformation</span>
              <span className="label-line"></span>
            </div>
            <h2 className="section-heading mb-3">Before &amp; <em>After</em></h2>
            <p style={{color:'var(--text-soft)',maxWidth:'36rem',margin:'0 auto',lineHeight:1.75,fontSize:'0.95rem'}}>
              Drag the slider to see the Alira difference — spaces reborn through expert cleaning.
            </p>
          </div>
          <div className="h-progress-wrap hidden md:flex items-center gap-4 mt-8 justify-center">
            <span style={{fontSize:'0.65rem',letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--text-muted)'}}>Explore</span>
            <div className="h-progress-track"><div className="h-progress-bar" id="showcaseProgressBar"></div></div>
            <span style={{fontSize:'0.65rem',letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--text-muted)'}}>Scroll</span>
          </div>
        </div>

        <div className="showcase-scroll-outer" data-lenis-prevent="">
          <div className="showcase-scroll-track" id="showcaseTrack">
            {cases.map((c, i) => (
              <div key={c.title} className="showcase-panel">
                <div className="showcase-panel-num">{String(i+1).padStart(2,'0')} <span>/</span> {String(cases.length).padStart(2,'0')}</div>
                <div className="ba-wrapper rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl cursor-ew-resize select-none">
                  <div className="ba-before absolute inset-0">
                    <div className={`ba-img ba-before-${i+1}`}></div>
                    <div className="ba-label ba-label-before">Before</div>
                  </div>
                  <div className="ba-after absolute inset-0" style={{clipPath:'inset(0 0 0 50%)'}}>
                    <div className={`ba-img ba-after-${i+1}`}></div>
                    <div className="ba-label ba-label-after">After</div>
                  </div>
                  <div className="ba-handle" style={{left:'50%'}}>
                    <div className="ba-handle-line"></div>
                    <div className="ba-handle-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8 3L4 7l4 4M16 3l4 4-4 4"/></svg>
                    </div>
                  </div>
                </div>
                <div className="showcase-caption">
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'1.05rem',fontWeight:600,color:'var(--forest)'}}>{c.title}</div>
                  <div style={{fontSize:'0.75rem',color:'var(--text-muted)',marginTop:'4px',letterSpacing:'0.1em',textTransform:'uppercase'}}>{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden text-center py-6">
          <span style={{fontSize:'0.62rem',letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--text-muted)'}}>← Swipe to explore →</span>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="h-scroll-section relative" style={{background:'var(--surface)'}} data-panel="">
        <div className="h-scroll-header px-6 md:px-10 pt-24 md:pt-28 pb-8">
          <div className="text-center reveal-up">
            <div className="section-label justify-center mb-5" style={{color:'var(--mint-dark)'}}>
              <span className="label-line" style={{background:'var(--mint-dark)'}}></span>
              <span>Client Stories</span>
              <span className="label-line" style={{background:'var(--mint-dark)'}}></span>
            </div>
            <h2 className="mb-6" style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'clamp(2.4rem,4vw,3.6rem)',fontWeight:400,color:'var(--forest)',lineHeight:1.15}}>
              What Our Clients <em style={{color:'var(--mint-dark)'}}>Say</em>
            </h2>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl mx-auto"
                 style={{background:'#fff',border:'1px solid var(--border)',boxShadow:'0 2px 16px rgba(44,44,44,0.06)'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="text-left">
                <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.78rem',fontWeight:700,color:'var(--forest)',letterSpacing:'0.02em'}}>Google Verified Reviews</div>
                <div className="flex items-center gap-1 mt-0.5">
                  {[0,1,2,3,4].map(s => (
                    <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                  <span style={{fontSize:'0.72rem',color:'var(--text-muted)',marginLeft:'4px'}}>5.0 · 100+ reviews</span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-progress-wrap hidden md:flex items-center gap-4 mt-8 justify-center">
            <span style={{fontSize:'0.65rem',letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--text-muted)'}}>Stories</span>
            <div className="h-progress-track"><div className="h-progress-bar" id="testimonialsProgressBar"></div></div>
            <span style={{fontSize:'0.65rem',letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--text-muted)'}}>Scroll</span>
          </div>
        </div>

        <div className="testimonials-scroll-outer" data-lenis-prevent="">
          <div className="testimonials-scroll-track" id="testimonialsTrack">
            {tests.map((t, idx) => (
              <div key={t.name} className="t-h-panel">
                <div className="t-h-card">
                  <div className="t-h-deco-quote">&quot;</div>
                  <div className="flex gap-1.5 mb-7" style={{color:'var(--mint)'}}>
                    {Array.from({length: t.rating}).map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                  </div>
                  <blockquote className="t-h-quote">&quot;{t.text}&quot;</blockquote>
                  <div className="flex items-center gap-4 mt-10 pt-8" style={{borderTop:'1px solid rgba(200,132,90,0.12)'}}>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                         style={{background:'rgba(200,132,90,0.15)',border:'1px solid rgba(200,132,90,0.3)',color:'var(--mint)',fontFamily:"'Space Grotesk',sans-serif"}}>
                      {t.initials}
                    </div>
                    <div>
                      <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,color:'#fff'}}>{t.name}</div>
                      <div style={{fontSize:'0.82rem',color:'rgba(255,255,255,0.45)',marginTop:'3px'}}>{t.role}</div>
                    </div>
                    <div className="ml-auto" style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'3.5rem',fontWeight:800,letterSpacing:'-0.04em',color:'rgba(200,132,90,0.08)',lineHeight:1,userSelect:'none'}}>
                      {String(idx+1).padStart(2,'0')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden text-center py-6">
          <span style={{fontSize:'0.62rem',letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)'}}>← Swipe to read →</span>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative overflow-hidden" data-panel="">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
          {/* Map */}
          <div className="relative min-h-[320px] lg:min-h-0 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2988.654!2d-72.7482!3d41.7715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d917c2b3a1f5%3A0x4c2e1a3b5d6e7f8a!2sProspect+Ave%2C+West+Hartford%2C+CT+06117!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Alira — Prospect Ave, West Hartford, CT"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none flex items-end justify-start p-5">
              <div className="flex items-center gap-2 rounded-full px-4 py-2 text-xs shadow-lg"
                   style={{background:'rgba(44,44,44,0.85)',backdropFilter:'blur(12px)',border:'1px solid rgba(200,132,90,0.3)',color:'var(--mint-light)',fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,letterSpacing:'0.06em'}}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {siteConfig.SITE_ADDRESS}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="py-20 px-6 md:px-16 lg:pr-[max(40px,calc((100vw-1240px)/2+40px))] flex flex-col justify-center" style={{background:'#fff'}}>
            <div className="section-label mb-5">
              <span className="label-line"></span>
              <span>Find Us</span>
            </div>
            <h2 className="section-heading mb-8">Get in <em>Touch</em></h2>

            <div className="space-y-4 mb-10">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="contact-item flex items-center gap-4 p-4 rounded-2xl transition-all duration-300"
                  style={{background:'rgba(7,16,30,0.04)',border:'1px solid rgba(200,132,90,0.18)'}}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'rgba(200,132,90,0.12)',color:'var(--mint)'}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" dangerouslySetInnerHTML={{__html: c.icon}} />
                  </div>
                  <div>
                    <div style={{fontSize:'0.68rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)'}}>{c.label}</div>
                    <div style={{fontSize:'0.9rem',fontWeight:600,color:'var(--forest)',marginTop:'2px'}}>{c.val}</div>
                  </div>
                </a>
              ))}
            </div>

            <div>
              <div style={{fontSize:'0.68rem',letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'14px'}}>Follow Our Work</div>
              <div className="flex gap-3">
                {socSocials.map((s) => (
                  <a key={s.l} href={s.h} className="social-btn-light" aria-label={s.l}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" dangerouslySetInnerHTML={{__html: s.p}} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
