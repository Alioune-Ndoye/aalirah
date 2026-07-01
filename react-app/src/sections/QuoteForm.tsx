import { useState } from 'react';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import { services } from '../lib/data';
import { site } from '../lib/site';
import { submitLead } from '../lib/forms';

/** Compact embedded quote-request form for the homepage. */
export default function QuoteForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: services[0].shortTitle, message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, boolean> = {};
    if (!form.name.trim()) err.name = true;
    if (!form.phone.trim()) err.phone = true;
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = true;
    setErrors(err);
    if (Object.keys(err).length) return;

    setStatus('sending');
    const ok = await submitLead('Quote Request — Homepage', form);
    setStatus(ok ? 'sent' : 'error');
  };

  return (
    <section id="quote" className="relative overflow-hidden py-24 md:py-28" style={{ background: 'var(--surface-alt)' }}>
      <div className="wrap grid lg:grid-cols-2 gap-12 items-center">
        {/* Pitch */}
        <Reveal dir="left">
          <div className="section-label mb-5">
            <span className="label-line" />
            <span>Free, No-Obligation Quote</span>
          </div>
          <h2 className="section-heading mb-5">
            Get Your Quote in <em>60 Seconds</em>
          </h2>
          <p style={{ color: 'var(--text-soft)', lineHeight: 1.8, marginBottom: 24, maxWidth: '34rem' }}>
            Tell us a little about your space and we'll get right back to you — usually within 2 hours. No pressure,
            no commitment, and never any hidden fees.
          </p>
          <ul className="space-y-3">
            {['Insured & bonded, background-checked team', 'Eco-certified, family- & pet-safe products', '100% satisfaction guarantee'].map((t) => (
              <li key={t} className="flex items-center gap-3" style={{ color: 'var(--forest)', fontSize: '0.92rem' }}>
                <span style={{ color: 'var(--mint-dark)' }}>
                  <Icon name="check-circle" size={18} strokeWidth={1.8} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Form */}
        <Reveal dir="right">
          <div className="form-card p-7 md:p-9">
            {status === 'sent' ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(198,167,105,0.15)', color: 'var(--mint-dark)' }}>
                  <Icon name="check-circle" size={32} strokeWidth={2} />
                </div>
                <h3 className="section-heading" style={{ fontSize: '1.8rem', marginBottom: 10 }}>
                  Thank you!
                </h3>
                <p style={{ color: 'var(--text-soft)' }}>We've got your request and will reach out within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label" style={errors.name ? { color: '#c0392b' } : undefined}>Name{errors.name && ' *'}</label>
                    <input className="form-input" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="form-label" style={errors.phone ? { color: '#c0392b' } : undefined}>Phone{errors.phone && ' *'}</label>
                    <input className="form-input" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(860) 555-0123" />
                  </div>
                </div>
                <div>
                  <label className="form-label" style={errors.email ? { color: '#c0392b' } : undefined}>Email{errors.email && ' *'}</label>
                  <input className="form-input" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="jane@email.com" />
                </div>
                <div>
                  <label className="form-label">Service</label>
                  <select className="form-input" value={form.service} onChange={(e) => update('service', e.target.value)}>
                    {services.map((s) => (
                      <option key={s.slug} value={s.shortTitle}>{s.shortTitle}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Anything else? (optional)</label>
                  <textarea className="form-input" value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Home size, preferred dates, pets, parking…" />
                </div>
                {status === 'error' && (
                  <p style={{ color: '#c0392b', fontSize: '0.85rem' }}>
                    Something went wrong. Please call us at{' '}
                    <a href={`tel:${site.phoneRaw}`} style={{ fontWeight: 600 }}>{site.phone}</a>.
                  </p>
                )}
                <button type="submit" className="btn-primary w-full justify-center" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Request My Free Quote'}
                  {status !== 'sending' && <Icon name="arrow" size={14} strokeWidth={2} />}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
