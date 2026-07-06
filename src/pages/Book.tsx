import { useEffect, useMemo, useState } from 'react';
import Seo from '../components/Seo';
import TrustMarquee from '../components/TrustMarquee';
import { meta } from '../lib/seo';
import { site } from '../lib/site';
import { submitBooking } from '../lib/bookingStore';
import { useAuth } from '../lib/auth';
import { fetchMyProperties, type Property } from '../lib/propertyApi';

/* ──────────────────────────────────────────────────────────
   Pricing engine — labor-true model.
   Every price = realistic man-hours × $60/hr blended rate
   (skilled labor + management + platform overhead). A 3,000 sq ft
   6bd/3ba deep clean with appliance add-ons lands ~$1,200–$1,320
   at 20–22 hours, matching real operational cost.
   ────────────────────────────────────────────────────────── */
const HOURLY_RATE = 60;
type Tier = { label: string; price: number; hours: number };
const tier = (label: string, hours: number): Tier => ({ label, hours, price: hours * HOURLY_RATE });

const sizeConfig: Record<string, Tier> = {
  under1000: tier('Under 1,000 sq. ft.', 2.5),
  '1000to1500': tier('1,001 - 1,500 sq. ft.', 3.0),
  '1500to2000': tier('1,501 - 2,000 sq. ft.', 3.5),
  '2000to2500': tier('2,001 - 2,500 sq. ft.', 4.25),
  '2500to3000': tier('2,501 - 3,000 sq. ft.', 5.0),
  '3000to3500': tier('3,001 - 3,500 sq. ft.', 6.0),
  '3500to4000': tier('3,501 - 4,000 sq. ft.', 7.0),
  '4000to4500': tier('4,001 - 4,500 sq. ft.', 8.0),
  '4500to5000': tier('4,501 - 5,000 sq. ft.', 9.0),
};
const bedroomConfig: Record<string, Tier> = {
  studio: tier('Studio', 0.0),
  '1bed': tier('1 Bedroom', 0.5),
  '2bed': tier('2 Bedrooms', 1.0),
  '3bed': tier('3 Bedrooms', 1.5),
  '4bed': tier('4 Bedrooms', 2.0),
  '5bed': tier('5 Bedrooms', 2.5),
  '6bed': tier('6 Bedrooms', 3.0),
};
const bathroomConfig: Record<string, Tier> = {
  '1bath': tier('1 Bathroom', 0.75),
  '1.5bath': tier('1.5 Bathrooms', 1.0),
  '2bath': tier('2 Bathrooms', 1.5),
  '2.5bath': tier('2.5 Bathrooms', 1.75),
  '3bath': tier('3 Bathrooms', 2.25),
  '3.5bath': tier('3.5 Bathrooms', 2.5),
  '4bath': tier('4 Bathrooms', 3.0),
  '4.5bath': tier('4.5 Bathrooms', 3.25),
  '5bath': tier('5 Bathrooms', 3.75),
};

/** Deep cleaning scales with home size instead of a flat fee: +40% on the
 *  base (size + bedrooms + bathrooms), in both price and hours. */
const DEEP_MULTIPLIER = 1.4;

type Freq = { id: string; top: string; sub: string; isSave: boolean; rate: number; fullName: string };
const frequencies: Freq[] = [
  { id: 'once', top: 'One Time', sub: 'Cleaning', isSave: false, rate: 0, fullName: 'One Time' },
  { id: 'weekly', top: 'Weekly', sub: 'Save 20%', isSave: true, rate: 0.2, fullName: 'Weekly' },
  { id: 'biweekly', top: 'Every 2 Wks', sub: 'Save 15%', isSave: true, rate: 0.15, fullName: 'Every 2 Weeks' },
  { id: 'monthly', top: 'Every 4 Wks', sub: 'Save 10%', isSave: true, rate: 0.1, fullName: 'Every 4 Weeks' },
];
const freqLabel = (f: Freq) => (f.rate > 0 ? `${f.fullName} for ${Math.round(f.rate * 100)}% Off` : `${f.fullName} Cleaning`);

type Extra = { id: string; label: string; price: number; hours: number; name: string; paths: string[]; recommended?: boolean; pct?: number };
const extrasList: Extra[] = [
  { id: 'deep', label: 'Deep Cleaning', recommended: true, price: 0, hours: 0, pct: 0.4, name: 'Deep Cleaning', paths: ['M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z'] },
  { id: 'moveInOut', label: 'Move-In/Out', price: 220.0, hours: 3.75, name: 'Move-In/Out Cleaning', paths: ['M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m10.5 4.5h1.5m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'] },
  { id: 'petHair', label: 'Pet Hair Clean-Up', price: 45.0, hours: 0.75, name: 'Pet Hair Clean-Up', paths: ['M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.499-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664'] },
  { id: 'baseboards', label: 'Clean Baseboards', price: 90.0, hours: 1.5, name: 'Clean Baseboards', paths: ['M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42'] },
  { id: 'laundry', label: 'Load(s) of Laundry', price: 30.0, hours: 0.5, name: 'Load(s) of Laundry', paths: ['M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'] },
  { id: 'dishes', label: 'Hand Wash Dishes', price: 30.0, hours: 0.5, name: 'Hand Wash Dishes', paths: ['M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.07 5.695a1.575 1.575 0 01-2.098 1.367l-1.942-.617a1.875 1.875 0 00-2.179.859l-.107.202c-.5.98-.169 2.185.793 2.75l7.045 4.007a1.875 1.875 0 002.212-.234l2.493-2.08a1.875 1.875 0 00.702-1.667l-.268-2.095a1.575 1.575 0 00-.634-1.13l-.107-1.34'] },
  { id: 'balcony', label: 'Balcony', price: 45.0, hours: 0.75, name: 'Balcony', paths: ['M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18'] },
  { id: 'oven', label: 'Clean Inside Oven', price: 45.0, hours: 0.75, name: 'Clean Inside Oven', paths: ['M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z', 'M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.545 5.975 5.975 0 01-2.133-1.001A3.75 3.75 0 0012 18z'] },
  { id: 'fridge', label: 'Clean Inside Fridge', price: 45.0, hours: 0.75, name: 'Clean Inside Fridge', paths: ['M20.25 7.5l-.625 12a1.5 1.5 0 01-1.5 1.5H5.875a1.5 1.5 0 01-1.5-1.5L3.75 7.5m16.5 0V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v1.5m16.5 0h-16.5M12 11.25v4.5'] },
  { id: 'cabinets', label: 'Clean Inside Cabinets', price: 75.0, hours: 1.25, name: 'Clean Inside Cabinets', paths: ['M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z'] },
  { id: 'windows', label: 'Interior Windows', price: 90.0, hours: 1.5, name: 'Clean Interior Windows', paths: ['M3 3h18v18H3V3zm9 0v18M3 12h18'] },
  { id: 'walls', label: 'Interior Walls', price: 90.0, hours: 1.5, name: 'Interior Walls', paths: ['M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z'] },
  { id: 'uv', label: 'UV Disinfection', price: 45.0, hours: 0.5, name: 'UV Disinfection', paths: ['M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'] },
  { id: 'organizing', label: 'Hour(s) of Organizing', price: 60.0, hours: 1.0, name: 'Hour(s) of Organizing', paths: ['M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z'] },
  { id: 'sameDay', label: 'Same Day Service', price: 75.0, hours: 0.0, name: 'Same Day Service', paths: ['M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'] },
  { id: 'restocking', label: 'Restocking', price: 30.0, hours: 0.5, name: 'Restocking', paths: ['M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'] },
  { id: 'silver', label: 'Silver Polishing', price: 45.0, hours: 0.75, name: 'Silver Polishing', paths: ['M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'] },
  { id: 'chandelier', label: 'Chandelier Cleaning', price: 60.0, hours: 0.5, name: 'Chandelier Cleaning', paths: ['M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.354a14.31 14.31 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'] },
  { id: 'inspection', label: 'White-Glove Inspection', price: 40.0, hours: 0.25, name: 'White-Glove Inspection', paths: ['M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z', 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'] },
];

const TAX_RATE = 0.0635; // CT sales tax

const valueProps = [
  { icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Saves You Time', desc: 'We help you live smarter, giving you time to focus on what matters most.' },
  { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z', title: 'Safety First', desc: 'All cleaners undergo identity checks and in-person interviews.' },
  { icon: 'M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904', title: 'Only the Best Quality', desc: 'Our professionals go above and beyond. Rated & reviewed after every job.' },
  { icon: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z', title: 'Cash-Free Payment', desc: 'Pay securely online — only once your cleaning is complete.' },
];

const money = (n: number) => '$' + n.toFixed(2);

const durationStr = (totalHours: number) => {
  const hrs = Math.floor(totalHours);
  const mins = Math.round((totalHours - hrs) * 60);
  let dur = '';
  if (hrs > 0) dur += hrs + (hrs === 1 ? ' Hour' : ' Hours');
  if (mins > 0) dur += (dur ? ' ' : '') + mins + ' Minutes';
  return dur || '1 Hour';
};

export default function Book() {
  const { customer } = useAuth();
  const [size, setSize] = useState('under1000');
  const [bedrooms, setBedrooms] = useState('studio');
  const [bathrooms, setBathrooms] = useState('1bath');
  const [freqId, setFreqId] = useState('biweekly');
  const [active, setActive] = useState<Set<string>>(new Set());
  const [tip, setTip] = useState(0);
  const [promoRate, setPromoRate] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ text: string; color: string } | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // PM dashboard: /book?property=<id> prefills the address from that saved
  // property and links the booking to it (ownership re-verified server-side).
  const [prop, setProp] = useState<Property | null>(null);
  useEffect(() => {
    const pid = new URLSearchParams(window.location.search).get('property');
    if (!pid) return;
    fetchMyProperties().then((list) => {
      const match = list.find((p) => p.id === pid);
      if (match) setProp(match);
    });
  }, []);

  const freq = frequencies.find((f) => f.id === freqId)!;
  const minDate = useMemo(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().split('T')[0];
  }, []);

  const calc = useMemo(() => {
    let subtotal = sizeConfig[size].price + bedroomConfig[bedrooms].price + bathroomConfig[bathrooms].price;
    let totalHours = sizeConfig[size].hours + bedroomConfig[bedrooms].hours + bathroomConfig[bathrooms].hours;
    // Deep cleaning scales the whole base (price AND hours) — a flat fee can't
    // reflect that a 3,500 sq ft deep clean takes hours more than a small one.
    if (active.has('deep')) {
      subtotal *= DEEP_MULTIPLIER;
      totalHours *= DEEP_MULTIPLIER;
    }
    for (const ex of extrasList) {
      if (active.has(ex.id)) {
        subtotal += ex.price;
        totalHours += ex.hours;
      }
    }
    const discountVal = subtotal * freq.rate;
    const afterDisc = subtotal - discountVal;
    const promoVal = afterDisc * promoRate;
    const finalSub = afterDisc - promoVal;
    const tax = finalSub * TAX_RATE;
    const total = finalSub + tax + tip;
    return { subtotal, totalHours, discountVal, promoVal, tax, total };
  }, [size, bedrooms, bathrooms, active, freq, promoRate, tip]);

  const summaryDate = (() => {
    if (!date) return 'Choose a service date…';
    const d = new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    return d + (time ? ' at ' + time : '');
  })();

  const toggleExtra = (id: string) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const applyPromoCode = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'WELCOME10') {
      setPromoRate(0.1);
      setPromoFeedback({ text: '✓ Promo WELCOME10 applied — 10% off!', color: 'var(--mint-dark)' });
    } else if (code === 'CLEAN20') {
      setPromoRate(0.2);
      setPromoFeedback({ text: '✓ Promo CLEAN20 applied — 20% off!', color: 'var(--mint-dark)' });
    } else if (code === '') {
      setPromoRate(0);
      setPromoFeedback(null);
    } else {
      setPromoRate(0);
      setPromoFeedback({ text: 'Invalid promo code.', color: '#c0392b' });
    }
  };

  const activeExtras = extrasList.filter((ex) => active.has(ex.id));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const fd = new FormData(e.currentTarget);
    const g = (k: string) => (fd.get(k) ? String(fd.get(k)).trim() : '');
    const pets = g('pets');
    const notes = [pets && pets !== 'no' ? `Pets: ${pets}` : '', g('notes')].filter(Boolean).join(' — ');

    const payload = {
      kind: 'booking' as const,
      firstName: g('firstName'),
      lastName: g('lastName'),
      email: g('email'),
      phone: g('phone'),
      smsOptIn: fd.get('smsOptIn') != null,
      street: g('street'),
      apt: g('apt'),
      city: g('city'),
      state: g('state'),
      zip: g('zip'),
      size,
      bedrooms,
      bathrooms,
      frequency: freq.fullName,
      extras: activeExtras.map((x) => x.label),
      access: g('access'),
      notes,
      date,
      time,
      estimatedTotal: Math.round(calc.total * 100) / 100,
      estimatedHours: calc.totalHours,
      tip,
      promoCode: promoCode.trim().toUpperCase(),
      ...(prop ? { propertyId: prop.id } : {}),
    };

    const res = await submitBooking(payload);
    setSubmitting(false);
    if (res.ok) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSubmitError(res.error);
    }
  };

  return (
    <>
      <Seo {...meta.book} />

      {/* ── Page Hero ──────────────────────────────────────── */}
      <section style={{ background: 'var(--forest)', paddingTop: 144, paddingBottom: 52, borderBottom: '1px solid rgba(198, 167, 105,0.12)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="section-label mb-5">
            <span className="label-line" />Book Online
          </div>
          <h1 className="section-heading-white mb-4">
            Book Your <em>Cleaning</em>
          </h1>
          <nav className="text-sm" style={{ color: 'rgba(255,255,255,0.40)' }}>
            <span style={{ color: 'rgba(255,255,255,0.45)' }}>Home</span>
            <span className="mx-2 opacity-30">&rsaquo;</span>
            <span style={{ color: 'var(--mint-light)' }}>Book Now</span>
          </nav>
        </div>
      </section>

      {/* Trust Marquee */}
      <TrustMarquee />

      {/* ── Main Content ───────────────────────────────────── */}
      <main style={{ background: 'var(--surface)', padding: '56px 0 80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Guarantee Bar */}
          <div style={{ background: 'var(--forest)', border: '1px solid rgba(198, 167, 105,0.18)', borderRadius: 12, padding: '18px 24px', marginBottom: 40, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,var(--mint),transparent)' }} />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '1.05rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.6, margin: 0 }}>
              It is our goal to offer you the best possible cleaning service available. If you're not happy with your cleaning, we will come back and give you a re-cleaning on the house! Any questions, call us at{' '}
              <a href={`tel:${site.phoneRaw}`} style={{ color: 'var(--mint)', fontWeight: 600, textDecoration: 'none' }}>{site.phone}</a>.
            </p>
          </div>

          {/* Grid: Form (2/3) + Sidebar (1/3) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ══ FORM / SUCCESS ══ */}
            {!submitted ? (
              <div className="lg:col-span-2">
                <div className="form-card" style={{ padding: '40px 40px 48px' }}>
                  <h2 className="section-heading" style={{ fontSize: 'clamp(1.9rem,4vw,2.8rem)', marginBottom: 6 }}>
                    Complete your <em>booking.</em>
                  </h2>
                  <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 32, letterSpacing: '0.04em' }}>
                    Just a few details and we'll get you scheduled.
                  </p>

                  {/* Move-In/Out Special Banner */}
                  <div style={{ background: 'rgba(198, 167, 105,0.08)', border: '1px solid rgba(198, 167, 105,0.25)', borderRadius: 10, padding: '16px 20px', marginBottom: 36 }}>
                    <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.78rem', color: 'var(--forest)', lineHeight: 1.6, margin: 0 }}>
                      <strong style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--mint-dark)', display: 'block', marginBottom: 4 }}>
                        Move In / Move Out Special — Only $220 extra
                      </strong>
                      Includes inside fridge, inside oven, inside cabinets &amp; baseboards. ($255 if extras booked separately.)
                    </p>
                  </div>

                  {customer && (
                    <div style={{ background: 'rgba(120,160,120,0.1)', border: '1px solid rgba(120,160,120,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 24, fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.8rem', color: 'var(--forest)' }}>
                      Booking as <strong>{customer.firstName} {customer.lastName}</strong> · Account #{customer.accountNumber}
                      {customer.discountRate > 0 && <> · <span style={{ color: 'var(--mint-dark)' }}>{customer.discountRate}% member discount applies</span></>}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} key={customer?.id ?? 'guest'}>

                    {/* 1 — Contact Info */}
                    <FormSection num={1} title="Contact Info">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        <Field label="First Name"><input name="firstName" type="text" placeholder="Jane" required className="form-input" defaultValue={customer?.firstName ?? ''} /></Field>
                        <Field label="Last Name"><input name="lastName" type="text" placeholder="Smith" required className="form-input" defaultValue={customer?.lastName ?? ''} /></Field>
                        <Field label="Email"><input name="email" type="email" placeholder="jane@example.com" required className="form-input" defaultValue={customer?.email ?? ''} /></Field>
                        <Field label="Phone Number"><input name="phone" type="tel" placeholder="(347) 000-0000" required className="form-input" defaultValue={customer?.phone ?? ''} /></Field>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18 }}>
                        <input name="smsOptIn" type="checkbox" id="smsReminders" defaultChecked style={{ width: 14, height: 14, accentColor: 'var(--mint)' }} />
                        <label htmlFor="smsReminders" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.75rem', color: 'var(--text-soft)', cursor: 'pointer' }}>
                          Send me text message reminders about my cleaning
                        </label>
                      </div>
                    </FormSection>

                    {/* 2 — Address (key remounts inputs when a saved property loads) */}
                    <FormSection num={2} title="Address">
                      {prop && (
                        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.75rem', color: 'var(--mint-dark)', fontWeight: 700, marginBottom: 12 }}>
                          Booking for: {prop.label}
                        </p>
                      )}
                      <div key={prop?.id ?? 'default'} className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                        <div className="md:col-span-2"><Field label="Street Address"><input name="street" type="text" placeholder="123 Main St" required className="form-input" defaultValue={prop?.street ?? customer?.street ?? ''} /></Field></div>
                        <Field label="Apt / Suite"><input name="apt" type="text" placeholder="Apt 4B" className="form-input" defaultValue={prop?.apt ?? customer?.apt ?? ''} /></Field>
                        <Field label="City"><input name="city" type="text" placeholder="West Hartford" required className="form-input" defaultValue={prop?.city ?? customer?.city ?? ''} /></Field>
                        <Field label="State">
                          <select name="state" required defaultValue={prop?.state || customer?.state || ''} className="form-input form-select" style={{ background: 'transparent' }}>
                            <option value="" disabled>Select</option>
                            <option value="NY">NY</option>
                            <option value="CT">CT</option>
                            <option value="NJ">NJ</option>
                            <option value="MA">MA</option>
                          </select>
                        </Field>
                        <Field label="Zip Code"><input name="zip" type="text" placeholder="06110" required className="form-input" defaultValue={prop?.zip ?? customer?.zip ?? ''} /></Field>
                      </div>
                    </FormSection>

                    {/* 3 — Service Date */}
                    <FormSection num={3} title="Service Date">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        <Field label="Date"><input type="date" required min={minDate} value={date} onChange={(e) => setDate(e.target.value)} className="form-input" /></Field>
                        <Field label="Arrival Time">
                          <select required value={time} onChange={(e) => setTime(e.target.value)} className="form-input form-select" style={{ background: 'transparent' }}>
                            <option value="" disabled>Select time</option>
                            {['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </Field>
                      </div>
                    </FormSection>

                    {/* 4 — Frequency */}
                    <FormSection num={4} title="Frequency">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {frequencies.map((f) => {
                          const on = freqId === f.id;
                          return (
                            <button
                              key={f.id}
                              type="button"
                              onClick={() => setFreqId(f.id)}
                              style={{
                                border: `1.5px solid ${on ? 'var(--forest)' : 'var(--border)'}`,
                                borderRadius: 12, padding: '16px 12px', textAlign: 'center',
                                background: on ? 'var(--forest)' : '#fff', cursor: 'pointer', transition: 'all .25s',
                                boxShadow: on ? '0 4px 20px rgba(26, 23, 20,0.2)' : 'none',
                              }}
                            >
                              <span style={{ display: 'block', fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.82rem', fontWeight: 700, color: on ? '#fff' : 'var(--forest)' }}>{f.top}</span>
                              <span style={{ display: 'block', fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.65rem', fontWeight: f.isSave ? 700 : 400, color: f.isSave ? (on ? 'var(--mint-light)' : 'var(--mint-dark)') : 'var(--text-muted)', marginTop: 4 }}>{f.sub}</span>
                            </button>
                          );
                        })}
                      </div>
                    </FormSection>

                    {/* 5 — Space Size & Rooms */}
                    <FormSection num={5} title="Space Size & Rooms">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                        <Field label="Square Footage">
                          <select required value={size} onChange={(e) => setSize(e.target.value)} className="form-input form-select" style={{ background: 'transparent' }}>
                            <option value="under1000">Under 1,000 sq. ft.</option>
                            <option value="1000to1500">1,001 – 1,500 sq. ft.</option>
                            <option value="1500to2000">1,501 – 2,000 sq. ft.</option>
                            <option value="2000to2500">2,001 – 2,500 sq. ft.</option>
                            <option value="2500to3000">2,501 – 3,000 sq. ft.</option>
                            <option value="3000to3500">3,001 – 3,500 sq. ft.</option>
                            <option value="3500to4000">3,501 – 4,000 sq. ft.</option>
                            <option value="4000to4500">4,001 – 4,500 sq. ft.</option>
                            <option value="4500to5000">4,501 – 5,000 sq. ft.</option>
                          </select>
                        </Field>
                        <Field label="Bedrooms">
                          <select required value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="form-input form-select" style={{ background: 'transparent' }}>
                            <option value="studio">Studio</option>
                            <option value="1bed">1 Bedroom</option>
                            <option value="2bed">2 Bedrooms</option>
                            <option value="3bed">3 Bedrooms</option>
                            <option value="4bed">4 Bedrooms</option>
                            <option value="5bed">5 Bedrooms</option>
                            <option value="6bed">6 Bedrooms</option>
                          </select>
                        </Field>
                        <Field label="Bathrooms">
                          <select required value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} className="form-input form-select" style={{ background: 'transparent' }}>
                            <option value="1bath">1 Bathroom</option>
                            <option value="1.5bath">1.5 Bathrooms</option>
                            <option value="2bath">2 Bathrooms</option>
                            <option value="2.5bath">2.5 Bathrooms</option>
                            <option value="3bath">3 Bathrooms</option>
                            <option value="3.5bath">3.5 Bathrooms</option>
                            <option value="4bath">4 Bathrooms</option>
                            <option value="4.5bath">4.5 Bathrooms</option>
                            <option value="5bath">5 Bathrooms</option>
                          </select>
                        </Field>
                      </div>
                    </FormSection>

                    {/* 6 — Select Extras */}
                    <FormSection num={6} title="Select Extras">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {extrasList.map((ex) => {
                          const on = active.has(ex.id);
                          return (
                            <button
                              key={ex.id}
                              type="button"
                              onClick={() => toggleExtra(ex.id)}
                              style={{
                                border: `1.5px solid ${on ? 'var(--mint)' : 'var(--border)'}`,
                                borderRadius: 12, padding: '16px 12px', display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                                background: on ? 'rgba(198, 167, 105,0.08)' : '#fff', cursor: 'pointer', transition: 'all .22s',
                                boxShadow: on ? '0 0 0 1px var(--mint)' : 'none',
                              }}
                            >
                              <svg style={{ width: 28, height: 28, color: on ? 'var(--mint-dark)' : 'var(--text-soft)', marginBottom: 8, transition: 'color .22s' }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                {ex.paths.map((d, i) => <path key={i} strokeLinecap="round" strokeLinejoin="round" d={d} />)}
                              </svg>
                              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.72rem', fontWeight: 600, color: 'var(--forest)', lineHeight: 1.3 }}>{ex.label}</span>
                              {ex.recommended && <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.6rem', color: 'var(--mint-dark)', marginTop: 2 }}>(Recommended)</span>}
                            </button>
                          );
                        })}
                      </div>
                    </FormSection>

                    {/* 7 — Booking Info */}
                    <FormSection num={7} title="Booking Info">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        <Field label="Earliest start time?">
                          <select defaultValue="flexible" className="form-input form-select" style={{ background: 'transparent' }}>
                            <option value="flexible">Keep my selected time</option>
                            <option value="07:00 AM">7:00 AM</option>
                            <option value="08:00 AM">8:00 AM</option>
                            <option value="09:00 AM">9:00 AM</option>
                            <option value="10:00 AM">10:00 AM</option>
                          </select>
                        </Field>
                        <Field label="Latest start time?">
                          <select defaultValue="flexible" className="form-input form-select" style={{ background: 'transparent' }}>
                            <option value="flexible">Keep my selected time</option>
                            <option value="03:00 PM">3:00 PM</option>
                            <option value="04:00 PM">4:00 PM</option>
                            <option value="05:00 PM">5:00 PM</option>
                            <option value="06:00 PM">6:00 PM</option>
                          </select>
                        </Field>
                        <Field label="How will we gain entry? *">
                          <select name="access" required defaultValue="" className="form-input form-select" style={{ background: 'transparent' }}>
                            <option value="" disabled>Select option</option>
                            <option value="home">Someone will be home</option>
                            <option value="keypad">Keypad / Lockbox code</option>
                            <option value="doorman">Doorman / Concierge</option>
                            <option value="hidden">Hidden key</option>
                            <option value="other">Other option</option>
                          </select>
                        </Field>
                        <Field label="Any pets? *">
                          <select name="pets" required defaultValue="" className="form-input form-select" style={{ background: 'transparent' }}>
                            <option value="" disabled>Select option</option>
                            <option value="no">No pets</option>
                            <option value="dogs">Yes, dog(s)</option>
                            <option value="cats">Yes, cat(s)</option>
                            <option value="other">Yes, other pets</option>
                          </select>
                        </Field>
                      </div>
                    </FormSection>

                    {/* 8 — Special Requests */}
                    <FormSection num={8} title="Special Requests">
                      <label className="form-label">Notes for your cleaner</label>
                      <textarea name="notes" rows={4} placeholder="Areas to prioritize, special instructions, preferred cleaner, etc." className="form-input lux-textarea" style={{ marginTop: 8 }} />
                    </FormSection>

                    {/* 9 — Tip */}
                    <FormSection num={9} title="Tip">
                      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 14 }}>
                        Non-refundable &amp; at your discretion. Can be added anytime.
                      </p>
                      <div style={{ maxWidth: 180 }}>
                        <label className="form-label">Tip Amount ($)</label>
                        <input type="number" min={0} step={1} placeholder="0" className="form-input"
                          onChange={(e) => { const v = parseFloat(e.target.value); setTip(isNaN(v) || v < 0 ? 0 : v); }} />
                      </div>
                    </FormSection>

                    {/* 10 — Discount Code */}
                    <FormSection num={10} title="Discount Code">
                      <div style={{ display: 'flex', gap: 12, maxWidth: 400, alignItems: 'flex-end' }}>
                        <div style={{ flex: 1 }}>
                          <label className="form-label">Promo Code</label>
                          <input type="text" placeholder="Enter code (optional)" className="form-input" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                        </div>
                        <button type="button" onClick={applyPromoCode} className="btn-dark" style={{ padding: '10px 20px', fontSize: '0.7rem', whiteSpace: 'nowrap', borderRadius: 8, marginBottom: 2 }}>Apply</button>
                      </div>
                      {promoFeedback && (
                        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.75rem', marginTop: 8, color: promoFeedback.color }}>{promoFeedback.text}</div>
                      )}
                    </FormSection>

                    {/* 11 — Payment */}
                    <FormSection num={11} title="Payment">
                      <div style={{ border: '1.5px solid var(--border)', borderRadius: 12, padding: 24, background: 'var(--surface-alt)', maxWidth: 480 }}>
                        <div style={{ marginBottom: 16 }}>
                          <label className="form-label">Card Number</label>
                          <div style={{ position: 'relative' }}>
                            <input type="text" placeholder="0000 0000 0000 0000" required className="form-input" style={{ paddingLeft: 32 }} />
                            <svg style={{ width: 16, height: 16, color: 'var(--text-muted)', position: 'absolute', left: 0, top: 12 }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                            </svg>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div style={{ gridColumn: 'span 2' }}>
                            <label className="form-label">Expiration</label>
                            <input type="text" placeholder="MM / YY" required className="form-input" />
                          </div>
                          <div>
                            <label className="form-label">CVC</label>
                            <input type="text" placeholder="CVC" required className="form-input" />
                          </div>
                        </div>
                      </div>

                      <div style={{ marginTop: 32 }}>
                        <button type="submit" disabled={submitting} className="lux-submit" style={{ width: '100%', maxWidth: 400, fontSize: '0.78rem', padding: '18px 40px' }}>
                          {submitting ? (
                            <>
                              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                              </svg>
                              Processing…
                            </>
                          ) : (
                            <>
                              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Confirm &amp; Book Now
                            </>
                          )}
                        </button>
                        {submitError && (
                          <p style={{ color: '#c0392b', fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.8rem', marginTop: 14, textAlign: 'center' }}>
                            {submitError}
                          </p>
                        )}
                      </div>
                    </FormSection>

                  </form>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-2">
                <div style={{ background: 'var(--forest)', border: '1px solid rgba(198, 167, 105,0.18)', borderRadius: 16, padding: '56px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,var(--mint),var(--mint-light))' }} />
                  <div style={{ width: 64, height: 64, background: 'rgba(198, 167, 105,0.12)', border: '1px solid rgba(198, 167, 105,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', color: 'var(--mint)' }}>
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.4rem', fontWeight: 400, color: '#fff', marginBottom: 16 }}>Thank you for booking!</h2>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.60)', maxWidth: 420, margin: '0 auto 36px', lineHeight: 1.7 }}>
                    Your booking request has been received. A confirmation email is on its way. For immediate assistance, call us at {site.phone}.
                  </p>
                  <a href="/" className="btn-primary">Back to Home</a>
                </div>
              </div>
            )}

            {/* ══ SIDEBAR ══ */}
            <div className="space-y-6">

              {/* Booking Summary */}
              <div style={{ background: 'var(--forest)', border: '1px solid rgba(198, 167, 105,0.15)', borderRadius: 14, padding: 28, position: 'sticky', top: 88, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,var(--mint),transparent)' }} />
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mint)', marginBottom: 20 }}>Booking Summary</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                  <SummaryRow d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18">
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>{sizeConfig[size].label}</div>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.68rem', color: 'rgba(255,255,255,0.40)', marginTop: 2 }}>{bedroomConfig[bedrooms].label} / {bathroomConfig[bathrooms].label}</div>
                  </SummaryRow>
                  <SummaryRow d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5">
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>{summaryDate}</div>
                  </SummaryRow>
                  <SummaryRow d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z">
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>{durationStr(calc.totalHours)}</div>
                  </SummaryRow>
                  <SummaryRow d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99">
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>{freqLabel(freq)}</div>
                  </SummaryRow>
                </div>

                {/* Extras list */}
                {activeExtras.length > 0 && (
                  <div style={{ borderTop: '1px solid rgba(198, 167, 105,0.12)', paddingTop: 14, marginBottom: 14 }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', marginBottom: 8 }}>Extras</div>
                    {activeExtras.map((ex) => (
                      <div key={ex.id} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', padding: '3px 0' }}>
                        <span>+ {ex.name}</span><span style={{ color: 'var(--mint)' }}>{ex.pct ? `+${Math.round(ex.pct * 100)}%` : `+${money(ex.price)}`}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Invoice */}
                <div style={{ borderTop: '1px solid rgba(198, 167, 105,0.12)', paddingTop: 16 }}>
                  <InvoiceRow label="Subtotal" value={money(calc.subtotal)} />
                  {calc.discountVal > 0 && <InvoiceRow label="Frequency Discount" value={'-' + money(calc.discountVal)} mint />}
                  {calc.promoVal > 0 && <InvoiceRow label="Promo Code" value={'-' + money(calc.promoVal)} mint />}
                  {tip > 0 && <InvoiceRow label="Tip" value={money(tip)} />}
                  <InvoiceRow label={`Sales Tax (${(TAX_RATE * 100).toFixed(2)}%)`} value={money(calc.tax)} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid rgba(198, 167, 105,0.18)', paddingTop: 14 }}>
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)' }}>Total</span>
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '2.4rem', fontWeight: 800, color: 'var(--mint)', lineHeight: 1 }}>{money(calc.total)}</span>
                  </div>
                  <div style={{ textAlign: 'right', fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>
                    Estimated time on site: {durationStr(calc.totalHours)}
                  </div>
                </div>
              </div>

              {/* Value Props */}
              <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: 24 }}>
                {valueProps.map((p, i) => {
                  const last = i === valueProps.length - 1;
                  return (
                    <div key={p.title} style={{ display: 'flex', gap: 14, ...(last ? {} : { marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid var(--border)' }) }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--forest)', color: 'var(--mint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={p.icon} /></svg>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--forest)', marginBottom: 4 }}>{p.title}</div>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-soft)', lineHeight: 1.55, margin: 0 }}>{p.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}

/* ── Small presentational helpers ──────────────────────── */
function FormSection({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div className="form-section">
      <div className="form-section-head">
        <span className="form-section-num">{num}</span>
        <span className="form-section-title">{title}</span>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}

function SummaryRow({ d, children }: { d: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(198, 167, 105,0.1)', border: '1px solid rgba(198, 167, 105,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--mint)' }}>
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>
      </div>
      <div>{children}</div>
    </div>
  );
}

function InvoiceRow({ label, value, mint }: { label: string; value: string; mint?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.78rem', color: mint ? 'var(--mint)' : 'rgba(255,255,255,0.50)', marginBottom: 8 }}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}
