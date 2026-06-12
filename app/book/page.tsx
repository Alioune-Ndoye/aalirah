'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import TrustMarquee from '@/components/TrustMarquee';
import siteConfig from '@/data/siteConfig';

const sqftTierPrices: Record<string, number[]> = {
  deep:          [160, 210, 270],
  office:        [140, 185, 240],
  moveinout:     [200, 260, 330],
  postconstruct: [240, 310, 400],
  estate:        [300, 390, 500],
  event:         [180, 235, 300],
};
const sqftTierLabels = ['Under 1,000 sq ft', '1,001 – 1,500 sq ft', '1,500+ sq ft'];
const TAX_RATE = 0.0635;
const discounts: Record<string, number> = { once: 0, weekly: 0.15, biweekly: 0.10, monthly: 0.05 };
const svcNames: Record<string, string> = { deep: 'Residential Deep Clean', office: 'Office & Commercial', moveinout: 'Move In / Move Out', postconstruct: 'Post-Construction', estate: 'Luxury Estate Care', event: 'Event Preparation' };
const freqNames: Record<string, string> = { once: 'One Time', weekly: 'Weekly', biweekly: 'Every 2 Weeks', monthly: 'Monthly' };
const extraNames: Record<string, string> = { oven: 'Inside Oven', fridge: 'Inside Fridge', cabinets: 'Inside Cabinets', windows: 'Interior Windows', laundry: 'Laundry & Fold', dishes: 'Dishes', garage: 'Garage', balcony: 'Balcony / Patio' };

const bookingServices = [
  { val: 'deep',        name: 'Residential Deep Clean', desc: 'Room-by-room. No corner missed.',           badge: 'Most Popular', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=85' },
  { val: 'office',      name: 'Office & Commercial',    desc: 'Workspaces, lobbies & common areas.',       badge: '',             img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=85' },
  { val: 'moveinout',   name: 'Move In / Move Out',     desc: 'Full property reset for new beginnings.',   badge: '',             img: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=800&q=85' },
  { val: 'postconstruct',name:'Post-Construction',      desc: 'Dust, debris & fine detail removal.',       badge: '',             img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=85' },
  { val: 'estate',      name: 'Luxury Estate Care',     desc: 'White-glove service for fine homes.',       badge: 'Premium',      img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=85' },
  { val: 'event',       name: 'Event Preparation',      desc: 'Before & after your special occasion.',     badge: '',             img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=85' },
];

const freqs = [
  { val: 'once',    name: 'One Time',    disc: '' },
  { val: 'weekly',  name: 'Weekly',      disc: '15% off' },
  { val: 'biweekly',name: 'Every 2 Wks', disc: '10% off' },
  { val: 'monthly', name: 'Monthly',     disc: '5% off' },
];

const levels = [
  { val: 0,    label: 'Well Kept',     desc: 'Regular upkeep' },
  { val: 0.20, label: 'Some Buildup',  desc: '+20% premium' },
  { val: 0.30, label: 'Heavy Clutter', desc: '+30% premium' },
];

const extras = [
  { key: 'oven',     name: 'Inside Oven',      price: '$30', priceNum: 30 },
  { key: 'fridge',   name: 'Inside Fridge',    price: '$25', priceNum: 25 },
  { key: 'cabinets', name: 'Inside Cabinets',  price: '$40', priceNum: 40 },
  { key: 'windows',  name: 'Interior Windows', price: '$50', priceNum: 50 },
  { key: 'laundry',  name: 'Laundry & Fold',   price: '$35', priceNum: 35 },
  { key: 'dishes',   name: 'Dishes',           price: '$15', priceNum: 15 },
  { key: 'garage',   name: 'Garage',           price: '$60', priceNum: 60 },
  { key: 'balcony',  name: 'Balcony / Patio',  price: '$30', priceNum: 30 },
];

const timeSlots = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM'];
const trustPills = ['Fully Insured & Bonded','Satisfaction Guaranteed','Eco-Friendly Products'];

const badges = [
  { num: '500+', label: 'Spaces Cleaned' },
  { num: '4.9★', label: 'Google Rating' },
  { num: '100%', label: 'Satisfaction' },
];

const steps = [
  { n: 1, label: 'Service' },
  { n: 2, label: 'Date & Time' },
  { n: 3, label: 'Your Details' },
  { n: 4, label: 'Confirm' },
];

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [svc, setSvc] = useState<string | null>(null);
  const [freq, setFreq] = useState('once');
  const [bed, setBed] = useState(2);
  const [bath, setBath] = useState(1);
  const [sqftTier, setSqftTier] = useState<number | null>(null);
  const [clutter, setClutter] = useState(0);
  const [pets, setPets] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<Record<string, number>>({});
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [stateVal, setStateVal] = useState('CT');
  const [zip, setZip] = useState('');
  const [entry, setEntry] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const calcPrice = useCallback(() => {
    if (!svc || sqftTier === null) return null;
    const tiers = sqftTierPrices[svc] || sqftTierPrices.deep;
    const base = tiers[sqftTier];
    const bathSurcharge = bath > 2 ? (bath - 2) * 25 : 0;
    const clutterPremium = Math.round(base * (clutter || 0));
    const petFee = pets || 0;
    let extrasTotal = 0;
    Object.values(selectedExtras).forEach(p => { extrasTotal += p; });
    const sub = base + bathSurcharge + clutterPremium + petFee + extrasTotal;
    const disc = discounts[freq] || 0;
    const afterDisc = Math.round(sub * (1 - disc));
    const tax = Math.round(afterDisc * TAX_RATE);
    const total = afterDisc + tax;
    return { total, base, bathSurcharge, clutterPremium, petFee, extrasTotal, discAmt: Math.round(sub * disc), tax };
  }, [svc, sqftTier, bath, clutter, pets, selectedExtras, freq]);

  const price = calcPrice();

  const toggleExtra = (key: string, priceNum: number) => {
    setSelectedExtras(prev => {
      const next = { ...prev };
      if (next[key] !== undefined) { delete next[key]; }
      else { next[key] = priceNum; }
      return next;
    });
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const submitBooking = async () => {
    setSubmitting(true);
    try {
      await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          svc, freq, bed, bath, sqftTier, clutter, pets,
          extras: selectedExtras, date, time,
          firstName, lastName, email, phone,
          street, apt, city, stateVal, zip, entry, notes,
          estimatedTotal: price?.total ?? null,
        }),
      });
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setSubmitting(false);
    }
  };

  const dateStr = date
    ? new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : '—';
  const sqftStr = sqftTier !== null ? sqftTierLabels[sqftTier] : '—';
  const extraKeys = Object.keys(selectedExtras);

  const confirmRows = [
    ['Service',     svcNames[svc ?? ''] || '—'],
    ['Frequency',   freqNames[freq] || '—'],
    ['Sq Footage',  sqftStr],
    ['Space',       (bed === 0 ? 'Studio' : bed + ' bed') + ' · ' + bath + ' bath'],
    ['Condition',   clutter > 0 ? '+' + Math.round(clutter * 100) + '% premium' : 'Well Kept'],
    ['Pets',        pets > 0 ? '+$20 surcharge' : 'None'],
    ['Extras',      extraKeys.length ? extraKeys.map(k => extraNames[k]).join(', ') : 'None'],
    ['Date',        dateStr + (time ? ' at ' + time : '')],
    ['Address',     [street, apt, city, stateVal, zip].filter(Boolean).join(', ') || '—'],
    ['Contact',     [firstName, lastName].filter(Boolean).join(' ') + (email ? ' · ' + email : '')],
    ['Subtotal',    price ? '$' + (price.total - price.tax) : '—'],
    ['Tax (6.35%)', price ? '+$' + price.tax : '—'],
    ['Est. Total',  price ? '$' + price.total : '—'],
  ];

  return (
    <>
      {/* Navbar inline for booking page */}
      <header id="nav" className="fixed top-0 inset-x-0 z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between" style={{height:'72px'}}>
          <Link href="/" className="nav-logo font-display font-bold text-xl tracking-tight text-white">
            {siteConfig.SITE_NAME}<span className="nav-logo-dot"></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/services" className="nav-link">Services</Link>
            <Link href="/#how-it-works" className="nav-link">Why Us</Link>
            <Link href="/#testimonials" className="nav-link">Reviews</Link>
            <Link href="/#contact" className="nav-link">Contact</Link>
            <Link href="/book" className="nav-cta">Book Now</Link>
          </nav>
          <button id="mob-btn" className="md:hidden flex flex-col gap-[5px] p-2 z-50" aria-label="Toggle menu" aria-expanded="false">
            <span className="ham-bar"></span><span className="ham-bar"></span><span className="ham-bar"></span>
          </button>
        </div>
      </header>
      <div id="mob-menu" className="mob-menu" aria-hidden="true">
        <nav className="flex flex-col items-center justify-center gap-9 h-full" id="mob-nav-links">
          <Link href="/services" className="mob-link" data-close="">Services</Link>
          <Link href="/#how-it-works" className="mob-link" data-close="">Why Us</Link>
          <Link href="/#testimonials" className="mob-link" data-close="">Reviews</Link>
          <Link href="/#contact" className="mob-link" data-close="">Contact</Link>
          <Link href="/book" className="mob-link mob-cta" data-close="">Book Now</Link>
        </nav>
      </div>

      {/* Hero */}
      <div className="book-hero">
        <div className="book-hero-photo-bg"></div>
        <div className="hero-video-overlay"></div>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <div className="hero-eyebrow inline-flex items-center gap-3 mb-8">
            <span className="inline-block w-2 h-2 rounded-full" style={{background:'var(--mint)',animation:'pulse 2s infinite'}}></span>
            <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--mint-light)'}}>
              Online Booking — West Hartford, CT
            </span>
          </div>
          <h1 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontWeight:400,lineHeight:1.08,letterSpacing:'-0.01em',margin:'0 0 20px'}}>
            <span className="hero-line block text-white" style={{fontSize:'clamp(3rem,5.5vw,5rem)'}}>Book Your</span>
            <span className="hero-line block" style={{fontSize:'clamp(3rem,5.5vw,5rem)',color:'var(--mint)',fontStyle:'italic'}}>Perfect Clean.</span>
          </h1>
          <p style={{fontSize:'1.05rem',lineHeight:1.7,color:'rgba(255,255,255,0.58)',maxWidth:'460px',margin:'0 auto 28px',fontFamily:"'Inter',sans-serif"}}>
            60 seconds. No commitment. Choose your service, pick a time, and arrive home to spotless.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 pt-6" style={{borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            {badges.map((b, i) => (
              <div key={b.label} className="flex items-center gap-8">
                {i > 0 && <div className="hidden sm:block w-px h-8" style={{background:'rgba(255,255,255,0.1)'}}></div>}
                <div className="text-center">
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'1.8rem',fontWeight:800,letterSpacing:'-0.03em',color:'var(--mint)',lineHeight:1}}>{b.num}</div>
                  <div style={{fontSize:'0.62rem',letterSpacing:'0.16em',textTransform:'uppercase',color:'rgba(255,255,255,0.38)',marginTop:'4px'}}>{b.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps bar */}
        <div className="steps-bar px-6" id="stepsBar">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center">
              {i > 0 && <div className={`step-connector${step > i ? ' done' : ''}`} id={`conn${i}`}></div>}
              <div className={`step-dot${step === s.n ? ' active' : ''}${step > s.n ? ' done' : ''}`} id={`dot${s.n}`}>
                <div className="step-dot-circle">{s.n}</div>
                <span className="step-dot-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 inset-x-0 z-10">
          <TrustMarquee />
        </div>
      </div>

      {/* Main layout */}
      <div style={{background:'var(--surface)',padding:'40px 0 0'}}>
        <div className="book-layout">

          {/* Form Panel */}
          <div className="book-panel" id="bookForm">

            {/* Success */}
            {success && (
              <div className="book-success" style={{display:'block'}}>
                <div className="success-icon">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--mint)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                </div>
                <h2>Booking Requested!</h2>
                <p>We&apos;ve received your request and will confirm within 2 hours. Check your inbox for details.</p>
                <Link href="/" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'12px 28px',borderRadius:'100px',background:'var(--forest)',color:'#fff',fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.8rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase'}}>
                  Back to Home
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            )}

            {/* Step 1 */}
            {!success && step === 1 && (
              <div className="book-step active" id="step1">
                <div className="step-head">
                  <div className="section-label mb-3"><span className="label-line"></span><span>Step 1 of 4</span></div>
                  <h2>What can we clean <em>for you?</em></h2>
                  <p>Select your cleaning type, frequency, and space details.</p>
                </div>
                <div className="step-body">

                  {/* Service cards */}
                  <div className="form-section">
                    <div className="form-section-title">Cleaning Type</div>
                    <div className="bk-svc-grid">
                      {bookingServices.map((sv) => (
                        <div key={sv.val} className={`bk-svc-card${svc === sv.val ? ' selected' : ''}`} onClick={() => setSvc(sv.val)}>
                          <div className="bk-svc-img-wrap">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className="bk-svc-img" src={sv.img} alt={sv.name} loading="lazy" />
                          </div>
                          <div className="bk-svc-body">
                            {sv.badge && <span className="bk-svc-badge">{sv.badge}</span>}
                            <span className="bk-svc-name">{sv.name}</span>
                            <span className="bk-svc-desc">{sv.desc}</span>
                          </div>
                          <div className="bk-svc-check">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Frequency */}
                  <div className="form-section">
                    <div className="form-section-title">How Often?</div>
                    <div className="freq-grid">
                      {freqs.map((f) => (
                        <div key={f.val} className={`freq-card${freq === f.val ? ' selected' : ''}`} onClick={() => setFreq(f.val)}>
                          <span className="freq-name">{f.name}</span>
                          {f.disc
                            ? <span className="freq-discount">Save {f.disc}</span>
                            : <span className="freq-discount" style={{color:'var(--text-muted)'}}>Standard rate</span>
                          }
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Space Size */}
                  <div className="form-section">
                    <div className="form-section-title">Space Size</div>
                    <div className="sqft-tier-grid">
                      {['Under 1,000', '1,001 – 1,500', '1,500+'].map((label, ti) => (
                        <div key={ti} className={`sqft-tier-card${sqftTier === ti ? ' selected' : ''}`} onClick={() => setSqftTier(ti)}>
                          <span className="sqft-tier-range">{label}</span>
                          <span className="sqft-tier-unit">sq ft</span>
                        </div>
                      ))}
                    </div>
                    <div className="counter-row">
                      <span className="counter-label">Bedrooms</span>
                      <div className="counter-ctrl">
                        <div className="counter-btn" onClick={() => setBed(Math.max(0, Math.min(8, bed - 1)))}>−</div>
                        <span className="counter-val">{bed === 0 ? 'Studio' : bed}</span>
                        <div className="counter-btn" onClick={() => setBed(Math.max(0, Math.min(8, bed + 1)))}>+</div>
                      </div>
                    </div>
                    <div className="counter-row" style={{marginBottom:0}}>
                      <span className="counter-label">Bathrooms</span>
                      <div className="counter-ctrl">
                        <div className="counter-btn" onClick={() => setBath(Math.max(1, Math.min(6, bath - 1)))}>−</div>
                        <span className="counter-val">{bath}</span>
                        <div className="counter-btn" onClick={() => setBath(Math.max(1, Math.min(6, bath + 1)))}>+</div>
                      </div>
                    </div>
                    {bath > 2 && (
                      <div id="bathroomHint" style={{marginTop:'10px',padding:'10px 14px',borderRadius:'8px',background:'rgba(200,132,90,0.08)',border:'1px solid rgba(200,132,90,0.2)'}}>
                        <p style={{fontFamily:"'Inter',sans-serif",fontSize:'0.76rem',color:'var(--text-soft)',margin:0,lineHeight:1.5}}>
                          🛁 <strong>+$25 per bathroom</strong> past the 2nd applied — bathrooms add significant cleaning time.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Condition & Pets */}
                  <div className="form-section">
                    <div className="form-section-title">Property Condition</div>
                    <div style={{marginBottom:'18px'}}>
                      <label style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'0.9rem',fontWeight:600,fontStyle:'italic',letterSpacing:'0.02em',color:'var(--mint-dark)',display:'block',marginBottom:'12px'}}>
                        Cleanliness Level
                      </label>
                      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'10px'}}>
                        {levels.map((lv) => (
                          <div key={lv.val} className={`extra-item clutter-card${clutter === lv.val ? ' selected' : ''}`} onClick={() => setClutter(lv.val)} style={{flexDirection:'column',alignItems:'flex-start',gap:'6px',padding:'14px 14px'}}>
                            <span className="extra-name" style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'0.95rem',fontWeight:500,fontStyle:'italic'}}>{lv.label}</span>
                            <span style={{fontSize:'0.67rem',color:'var(--text-muted)',fontFamily:"'Inter',sans-serif"}}>{lv.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'0.9rem',fontWeight:600,fontStyle:'italic',letterSpacing:'0.02em',color:'var(--mint-dark)',display:'block',marginBottom:'12px'}}>
                        Shedding Pets on Property?
                      </label>
                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
                        <div className={`extra-item pet-card${pets === 0 ? ' selected' : ''}`} onClick={() => setPets(0)} style={{gap:'10px'}}>
                          <div className="extra-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg></div>
                          <span className="extra-name">No pets</span>
                        </div>
                        <div className={`extra-item pet-card${pets === 20 ? ' selected' : ''}`} onClick={() => setPets(20)} style={{gap:'10px'}}>
                          <div className="extra-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg></div>
                          <span className="extra-name">Yes — pets 🐾</span>
                          <span className="extra-price">+$20</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Extras */}
                  <div className="form-section">
                    <div className="form-section-title">Extras <span style={{fontWeight:400,textTransform:'none',letterSpacing:0,fontSize:'0.78rem',color:'var(--text-muted)'}}>— optional add-ons</span></div>
                    <div className="extras-grid">
                      {extras.map((ex) => (
                        <div key={ex.key} className={`extra-item${selectedExtras[ex.key] !== undefined ? ' selected' : ''}`} onClick={() => toggleExtra(ex.key, ex.priceNum)}>
                          <div className="extra-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg></div>
                          <span className="extra-name">{ex.name}</span>
                          <span className="extra-price">{ex.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="step-nav">
                  <span></span>
                  <button className="btn-next" onClick={() => { setStep(2); window.scrollTo({top:0,behavior:'smooth'}); }}>
                    Continue
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {!success && step === 2 && (
              <div className="book-step active" id="step2">
                <div className="step-head">
                  <div className="section-label mb-3"><span className="label-line"></span><span>Step 2 of 4</span></div>
                  <h2>When should <em>we come?</em></h2>
                  <p>Pick your preferred date and arrival window.</p>
                </div>
                <div className="step-body">
                  <div className="form-section">
                    <div className="form-section-title">Select a Date</div>
                    <input
                      type="date" id="bookDate" min={minDate} value={date}
                      onChange={e => setDate(e.target.value)}
                      style={{border:'1.5px solid var(--border)',borderRadius:'10px',padding:'13px 16px',fontFamily:"'Inter',sans-serif",fontSize:'0.95rem',color:'var(--forest)',width:'100%',outline:'none',transition:'border-color 0.2s,box-shadow 0.2s'}}
                      onFocus={e => { e.target.style.borderColor='var(--mint)'; e.target.style.boxShadow='0 0 0 3px rgba(200,132,90,0.15)'; }}
                      onBlur={e => { e.target.style.borderColor='var(--border)'; e.target.style.boxShadow='none'; }}
                    />
                  </div>
                  <div className="form-section">
                    <div className="form-section-title">Arrival Window</div>
                    <div className="time-grid">
                      {timeSlots.map((slot) => (
                        <div key={slot} className={`time-slot${time === slot ? ' selected' : ''}`} onClick={() => setTime(slot)}>{slot}</div>
                      ))}
                    </div>
                  </div>
                  <div className="form-section" style={{marginBottom:0}}>
                    <p style={{fontSize:'0.78rem',color:'var(--text-muted)',fontFamily:"'Inter',sans-serif",lineHeight:1.6,padding:'12px 16px',background:'var(--surface)',borderRadius:'10px',border:'1px solid var(--border)'}}>
                      ⏱ &nbsp;Your cleaner will arrive within a 1-hour window of the selected time. You&apos;ll receive a confirmation email with a precise ETA.
                    </p>
                  </div>
                </div>
                <div className="step-nav">
                  <button className="btn-back" onClick={() => { setStep(1); window.scrollTo({top:0,behavior:'smooth'}); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{transform:'rotate(180deg)'}}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    Back
                  </button>
                  <button className="btn-next" onClick={() => { setStep(3); window.scrollTo({top:0,behavior:'smooth'}); }}>
                    Continue
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {!success && step === 3 && (
              <div className="book-step active" id="step3">
                <div className="step-head">
                  <div className="section-label mb-3"><span className="label-line"></span><span>Step 3 of 4</span></div>
                  <h2>Your <em>details</em></h2>
                  <p>Tell us about yourself and your property.</p>
                </div>
                <div className="step-body">
                  <div className="form-section">
                    <div className="form-section-title">Contact</div>
                    <div className="field-group cols-2">
                      <div className="field"><label htmlFor="firstName">First Name</label><input type="text" id="firstName" placeholder="Jane" value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
                      <div className="field"><label htmlFor="lastName">Last Name</label><input type="text" id="lastName" placeholder="Smith" value={lastName} onChange={e => setLastName(e.target.value)} /></div>
                      <div className="field"><label htmlFor="bookEmail">Email Address</label><input type="email" id="bookEmail" placeholder="jane@example.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
                      <div className="field"><label htmlFor="bookPhone">Phone Number</label><input type="tel" id="bookPhone" placeholder="+1 (860) 000-0000" value={phone} onChange={e => setPhone(e.target.value)} /></div>
                    </div>
                  </div>
                  <div className="form-section">
                    <div className="form-section-title">Property Address</div>
                    <div className="field-group" style={{gap:'14px'}}>
                      <div className="field"><label htmlFor="street">Street Address</label><input type="text" id="street" placeholder="123 Main St" value={street} onChange={e => setStreet(e.target.value)} /></div>
                      <div className="field-group cols-2" style={{gap:'14px'}}>
                        <div className="field"><label htmlFor="apt">Apt / Unit</label><input type="text" id="apt" placeholder="Apt 4B (optional)" value={apt} onChange={e => setApt(e.target.value)} /></div>
                        <div className="field"><label htmlFor="cityField">City</label><input type="text" id="cityField" placeholder="West Hartford" value={city} onChange={e => setCity(e.target.value)} /></div>
                        <div className="field">
                          <label htmlFor="stateSelect">State</label>
                          <select id="stateSelect" value={stateVal} onChange={e => setStateVal(e.target.value)}>
                            <option value="">Select</option>
                            <option value="CT">CT</option>
                            <option value="MA">MA</option>
                            <option value="NY">NY</option>
                            <option value="RI">RI</option>
                          </select>
                        </div>
                        <div className="field"><label htmlFor="zip">ZIP Code</label><input type="text" id="zip" placeholder="06107" maxLength={5} value={zip} onChange={e => setZip(e.target.value)} /></div>
                      </div>
                    </div>
                  </div>
                  <div className="form-section" style={{marginBottom:0}}>
                    <div className="form-section-title">Entry Instructions</div>
                    <div className="field-group" style={{gap:'14px'}}>
                      <div className="field">
                        <label htmlFor="entry">How do we get in?</label>
                        <select id="entry" value={entry} onChange={e => setEntry(e.target.value)}>
                          <option value="">Select an option</option>
                          <option value="someone_home">Someone will be home</option>
                          <option value="lockbox">Lockbox / keypad</option>
                          <option value="doorman">Doorman / concierge</option>
                          <option value="hide_key">Hidden key — details below</option>
                          <option value="other">Other — details below</option>
                        </select>
                      </div>
                      <div className="field">
                        <label htmlFor="notes">Special Instructions <span style={{fontWeight:400,textTransform:'none',color:'var(--text-muted)'}}>( optional)</span></label>
                        <textarea id="notes" placeholder="Pets, alarm codes, fragile items, parking…" value={notes} onChange={e => setNotes(e.target.value)}></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="step-nav">
                  <button className="btn-back" onClick={() => { setStep(2); window.scrollTo({top:0,behavior:'smooth'}); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{transform:'rotate(180deg)'}}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    Back
                  </button>
                  <button className="btn-next" onClick={() => { setStep(4); window.scrollTo({top:0,behavior:'smooth'}); }}>
                    Review Booking
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {!success && step === 4 && (
              <div className="book-step active" id="step4">
                <div className="step-head">
                  <div className="section-label mb-3"><span className="label-line"></span><span>Step 4 of 4</span></div>
                  <h2>Review <em>&amp; Confirm</em></h2>
                  <p>Double-check your booking before we lock it in.</p>
                </div>
                <div className="step-body">
                  <div className="confirm-card" id="confirmSummary">
                    {confirmRows.map(([key, val], i) => (
                      <div key={key} className="confirm-row">
                        <span className="confirm-key">{key}</span>
                        <span className={`confirm-v${i === confirmRows.length - 1 ? ' confirm-total' : ''}`}>{val}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{background:'var(--surface)',borderRadius:'12px',padding:'18px 20px',marginBottom:'24px',border:'1px solid var(--border)'}}>
                    <p style={{fontSize:'0.8rem',color:'var(--text-soft)',fontFamily:"'Inter',sans-serif",lineHeight:1.6,margin:0}}>
                      🔒 &nbsp;By confirming you agree to our <a href="#" style={{color:'var(--mint-dark)',textDecoration:'underline'}}>Terms of Service</a>.
                      No payment is charged today — our team will follow up within 2 hours to confirm availability.
                    </p>
                  </div>
                  <button className="btn-book" id="submitBtn" style={{width:'100%',justifyContent:'center'}} onClick={submitBooking} disabled={submitting}>
                    {submitting ? 'Sending…' : 'Confirm Booking'}
                    {!submitting && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>}
                  </button>
                </div>
                <div className="step-nav" style={{justifyContent:'flex-start'}}>
                  <button className="btn-back" onClick={() => { setStep(3); window.scrollTo({top:0,behavior:'smooth'}); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{transform:'rotate(180deg)'}}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    Edit Details
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="book-sidebar">
            <div className="sidebar-head">
              <h3>Your Estimate</h3>
              <p>Updates as you select options</p>
            </div>
            <div className="sidebar-body" id="sidebarRows">
              <div className="summary-row"><span className="summary-label">Service</span><span className="summary-val">{svc ? svcNames[svc] : '—'}</span></div>
              <div className="summary-row"><span className="summary-label">Frequency</span><span className="summary-val">{freqNames[freq] || 'One Time'}</span></div>
              {sqftTier !== null && (
                <div className="summary-row"><span className="summary-label">Square Footage</span><span className="summary-val">{sqftTierLabels[sqftTier]}</span></div>
              )}
              <div className="summary-row"><span className="summary-label">Bedrooms</span><span className="summary-val">{bed === 0 ? 'Studio' : bed}</span></div>
              <div className="summary-row"><span className="summary-label">Bathrooms</span><span className="summary-val">{bath}</span></div>
              {bath > 2 && <div className="summary-row"><span className="summary-label">Bathroom Surcharge</span><span className="summary-val highlight">+${(bath-2)*25}</span></div>}
              {clutter > 0 && <div className="summary-row"><span className="summary-label">Condition Premium</span><span className="summary-val highlight">+{Math.round(clutter*100)}%</span></div>}
              {pets > 0 && <div className="summary-row"><span className="summary-label">Pet Surcharge</span><span className="summary-val highlight">+$20</span></div>}
              {extraKeys.length > 0 && <div className="summary-row"><span className="summary-label">Extras</span><span className="summary-val highlight">{extraKeys.map(k => extraNames[k]).join(', ')}</span></div>}
              {date && <div className="summary-row"><span className="summary-label">Date</span><span className="summary-val">{new Date(date+'T12:00:00').toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})}{time ? ', '+time : ''}</span></div>}
              {price && discounts[freq] > 0 && <div className="summary-row"><span className="summary-label">Recurring Discount</span><span className="summary-val highlight">-{Math.round(discounts[freq]*100)}%</span></div>}
              {price && <div className="summary-row"><span className="summary-label">Tax (6.35% CT)</span><span className="summary-val">+${price.tax}</span></div>}
            </div>
            <div className="sidebar-total">
              <span className="total-label">Est. Total incl. Tax</span>
              <span className="total-price">{price ? `$${price.total}` : '$—'}</span>
            </div>
            <p className="sidebar-note">Final price confirmed after review. No hidden fees.</p>
            <div className="trust-pills">
              {trustPills.map((t) => (
                <div key={t} className="trust-pill">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile price badge */}
      <div className="mobile-price-badge" id="mobilePriceBadge">
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'0.58rem',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(255,255,255,0.4)',marginBottom:'1px'}}>Est. Total</div>
        <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:'1.9rem',fontWeight:500,color:'var(--mint)',lineHeight:1.1}}>{price ? `$${price.total}` : '$—'}</div>
        <div style={{fontFamily:"'Inter',sans-serif",fontSize:'0.6rem',color:'rgba(255,255,255,0.3)',marginTop:'2px'}}>incl. tax</div>
      </div>
    </>
  );
}
