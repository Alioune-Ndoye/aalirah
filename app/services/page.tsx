import type { Metadata } from 'next';
import Link from 'next/link';
import TrustMarquee from '@/components/TrustMarquee';
import siteConfig from '@/data/siteConfig';

export const metadata: Metadata = {
  title: `Cleaning Services in ${siteConfig.SITE_CITY}, CT — ${siteConfig.SITE_NAME}`,
  description: 'Explore our professional cleaning services in West Hartford, CT: residential deep clean, office cleaning, move-out, post-construction, luxury estate care & event prep. Eco-certified, fully insured.',
  alternates: { canonical: `${siteConfig.SITE_URL}/services` },
};

const detailed = [
  {
    icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    title: 'Residential', em: 'Deep Clean', tag: 'From 4 hrs',
    desc: 'Our flagship service. A meticulous, room-by-room transformation of your home. We tackle every surface, every corner, every hidden nook — with the precision of craftspeople who take their work personally.',
    includes: ['Deep clean of all rooms','Inside appliances (oven, fridge, microwave)','Baseboards, light fixtures, vents','Interior windows and tracks','Bathroom detailing & grout treatment','All floors vacuumed, mopped, and buffed'],
  },
  {
    icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    title: 'Office', em: '& Commercial', tag: 'Custom Plans',
    desc: 'Your workspace is a statement. We ensure it reflects the standard of your brand. Discreet, efficient, and comprehensive — from boardrooms to bathrooms, every inch immaculate.',
    includes: ['Full office cleaning & sanitisation','Reception & lobby detailing','Restroom deep clean','Kitchen & break room service','Desk and surface disinfection','Floor care and entrance treatment'],
  },
  {
    icon: '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>',
    title: 'Move In', em: '/ Move Out', tag: 'Full Property',
    desc: 'A fresh chapter deserves a spotless stage. We prepare every room for a perfect first impression — or leave the property in pristine condition for the next occupant.',
    includes: ['Full property deep clean','Inside all cabinets and drawers','Inside all appliances','Window and blind cleaning','Carpet and floor detailing','Garage sweep if applicable'],
  },
  {
    icon: '<circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/>',
    title: 'Post-', em: 'Construction', tag: 'Specialist Team',
    desc: "Construction leaves a trail invisible to the untrained eye. Our specialist team removes dust, debris, residue, and the finest particles — revealing the space exactly as it was designed to be.",
    includes: ['Construction dust removal','Paint & adhesive residue removal','Window track and sill detail','All surface wipe-down and polish','Floor scrub and finish','Ventilation and fixture cleaning'],
  },
  {
    icon: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',
    title: 'Luxury', em: 'Estate Care', tag: 'By Appointment',
    desc: 'Our highest-tier service. A fully bespoke, white-glove care programme for high-value properties. We work around your schedule, your preferences, and your standards — which we promise to exceed.',
    includes: ['Bespoke cleaning programme','Dedicated account manager','Premium product selection','Flexible scheduling','Discretion & NDA available','Regular estate maintenance'],
  },
  {
    icon: '<path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><circle cx="12" cy="13" r="3"/>',
    title: 'Event', em: 'Preparation', tag: 'Same-Day Avail.',
    desc: 'First impressions are made before a word is spoken. We prepare your venue — or restore it — with speed and elegance. Pre-event sparkle, post-event reset.',
    includes: ['Pre-event deep clean','Surface polish and sanitisation','Restroom preparation','Post-event full cleanup','Linen & surface reset','Same-day scheduling available'],
  },
];

export default function ServicesPage() {
  return (
    <main>
      {/* ── Services Hero ── */}
      <section className="relative flex flex-col overflow-hidden" style={{minHeight:'62vh'}}>
        <div className="hero-photo-bg" aria-hidden="true"></div>
        <div className="hero-video-overlay" aria-hidden="true"></div>
        <div className="hero-bg-grid" aria-hidden="true" style={{opacity:0.45}}></div>
        <div className="orb orb-1" aria-hidden="true"></div>
        <div className="orb orb-2" aria-hidden="true"></div>

        <div className="flex-1 flex items-end pb-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10 pt-36">
            <div className="section-label mb-5">
              <span className="label-line"></span>
              <span>What We Offer</span>
            </div>
            <h1 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontWeight:400,fontSize:'clamp(3.2rem,7vw,6rem)',lineHeight:1.08,letterSpacing:'-0.01em',color:'#fff',marginBottom:'20px'}}>
              Our <em style={{color:'var(--mint)',fontStyle:'italic'}}>Services</em>
            </h1>
            <p className="max-w-lg" style={{color:'rgba(255,255,255,0.58)',fontSize:'1.05rem',lineHeight:1.7,fontFamily:"'Inter',sans-serif"}}>
              Every space is different. Every clean is tailored. Explore what we can do for yours.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <TrustMarquee />
        </div>
      </section>

      {/* ── Services Detail ── */}
      <section style={{background:'var(--surface)',padding:'7rem 0'}}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="mb-16 reveal-up">
            <div className="section-label mb-4">
              <span className="label-line"></span>
              <span>What We Offer</span>
            </div>
            <h2 className="section-heading">Every Clean, <em>Crafted for You</em></h2>
          </div>

          {detailed.map((s, i) => {
            const flip = i % 2 === 1;
            const slug = (s.title + ' ' + s.em).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            return (
              <div
                key={s.title}
                id={slug}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20"
                style={i > 0 ? {borderTop:'1px solid rgba(7,16,30,0.12)'} : undefined}
              >
                {/* Content */}
                <div className={`${flip ? 'lg:order-2' : ''} reveal-left`}>
                  <div className="section-label mb-4">
                    <span className="label-line"></span>
                    <span>{s.tag}</span>
                  </div>
                  <h2 className="section-heading mb-4" style={{fontSize:'clamp(2rem,3.5vw,2.8rem)'}}>
                    {s.title} <em>{s.em}</em>
                  </h2>
                  <p style={{color:'var(--text-soft)',lineHeight:1.8,marginBottom:'28px',fontStyle:'italic',fontFamily:"'Inter',sans-serif",fontSize:'0.95rem'}}>{s.desc}</p>
                  <div className="grid grid-cols-2 gap-3 mb-10">
                    {s.includes.map((inc) => (
                      <div key={inc} className="flex items-start gap-2.5" style={{fontSize:'0.83rem',color:'var(--text-soft)',fontFamily:"'Inter',sans-serif"}}>
                        <svg style={{color:'var(--mint)',flexShrink:0,marginTop:'3px'}} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                        {inc}
                      </div>
                    ))}
                  </div>
                  <Link href="/book" className="btn-primary inline-flex">
                    Book This Service
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>

                {/* Photo */}
                <div className={`${flip ? 'lg:order-1' : ''} reveal-right`}>
                  <div style={{borderRadius:'20px',overflow:'hidden',boxShadow:'0 24px 80px rgba(7,16,30,0.30),0 4px 16px rgba(7,16,30,0.18)',aspectRatio:'4/3',position:'relative'}}>
                    <div className={`svc-visual svc-visual-${i+1} w-full h-full`} style={{transition:'transform 0.8s ease',willChange:'transform'}}></div>
                    <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:'linear-gradient(90deg,var(--forest),var(--forest-mid))'}}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="py-24 text-center relative overflow-hidden" style={{background:'var(--forest)'}}>
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'linear-gradient(rgba(200,132,90,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(200,132,90,0.06) 1px,transparent 1px)',backgroundSize:'64px 64px'}}></div>
        <div className="relative z-10">
          <div className="section-label justify-center mb-6" style={{color:'var(--mint)'}}>
            <span className="label-line"></span>
            <span>Ready to Begin</span>
            <span className="label-line"></span>
          </div>
          <h2 className="section-heading-white mb-3" style={{fontSize:'clamp(2.2rem,4vw,3.6rem)'}}>
            Book Your Service <em>Today</em>
          </h2>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:'0.95rem',color:'rgba(255,255,255,0.5)',fontStyle:'italic',marginBottom:'36px'}}>No commitment. We&apos;ll confirm within 2 hours.</p>
          <Link href="/book" className="btn-primary inline-flex">
            Book Now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
