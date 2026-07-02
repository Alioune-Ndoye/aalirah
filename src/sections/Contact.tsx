import { useState } from 'react';
import Icon from '../components/Icon';
import type { IconName } from '../components/Icon';
import { site, tel, mailto } from '../lib/site';
import { submitLead } from '../lib/forms';

const rows: { href: string; icon: IconName; label: string; val: string }[] = [
  { href: tel, icon: 'phone', label: 'Phone', val: site.phone },
  { href: mailto, icon: 'mail', label: 'Email', val: site.email },
  { href: '#', icon: 'clock', label: 'Hours', val: site.hours },
];

const hasLink = (h?: string) => Boolean(h && h !== '#');

const socials = (
  [
    { label: 'Instagram', href: site.social.instagram, icon: 'instagram' },
    { label: 'Facebook', href: site.social.facebook, icon: 'facebook' },
    { label: 'LinkedIn', href: site.social.linkedin, icon: 'linkedin' },
  ] as { label: string; href: string; icon: IconName }[]
).filter((s) => hasLink(s.href));

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
        {/* Map */}
        <div className="relative min-h-[320px] lg:min-h-0 overflow-hidden">
          <iframe
            title={`${site.name} — ${site.address}`}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2988.654!2d-72.7482!3d41.7715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d917c2b3a1f5%3A0x4c2e1a3b5d6e7f8a!2sProspect+Ave%2C+West+Hartford%2C+CT+06117!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute inset-0 pointer-events-none flex items-end justify-start p-5">
            <div
              className="flex items-center gap-2 rounded-full px-4 py-2 text-xs shadow-lg"
              style={{
                background: 'rgba(26,23,20,0.95)',
                border: '1px solid rgba(198,167,105,0.3)',
                color: 'var(--mint-light)',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                letterSpacing: '0.06em',
              }}
            >
              <Icon name="pin" size={11} strokeWidth={2} />
              {site.address}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="py-20 px-6 md:px-16 lg:pr-[max(40px,calc((100vw-1240px)/2+40px))] flex flex-col justify-center bg-white">
          <div className="section-label mb-5">
            <span className="label-line" />
            <span>Find Us</span>
          </div>
          <h2 className="section-heading mb-8">
            Get in <em>Touch</em>
          </h2>

          <div className="space-y-4 mb-10">
            {rows.map((c) => {
              const inner = (
                <>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(198,167,105,0.12)', color: 'var(--mint-dark)' }}
                  >
                    <Icon name={c.icon} size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      {c.label}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--forest)', marginTop: 2 }}>{c.val}</div>
                  </div>
                </>
              );
              // Phone/email are real links; hours is just info (no dead "#" link).
              return hasLink(c.href) ? (
                <a key={c.label} href={c.href} className="contact-band">{inner}</a>
              ) : (
                <div key={c.label} className="contact-band" style={{ cursor: 'default' }}>{inner}</div>
              );
            })}
          </div>

          <ContactForm />

          {socials.length > 0 && (
            <div style={{ marginTop: 40 }}>
              <div style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>
                Follow Our Work
              </div>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn-light" aria-label={s.label}>
                    <Icon name={s.icon} size={16} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || !form.message.trim()) {
      setState('error');
      return;
    }
    setState('sending');
    const ok = await submitLead('Website Contact Message', form);
    setState(ok ? 'sent' : 'error');
    if (ok) setForm({ name: '', email: '', message: '' });
  };

  if (state === 'sent') {
    return (
      <div className="rounded-2xl p-6 mb-2" style={{ background: 'rgba(198,167,105,0.1)', border: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2" style={{ color: 'var(--mint-dark)', fontWeight: 600 }}>
          <Icon name="check-circle" size={18} strokeWidth={2} />
          Thanks! We'll be in touch shortly.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
        Send a Message
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          className="form-input"
          placeholder="Your name"
          aria-label="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="form-input"
          type="email"
          placeholder="Your email"
          aria-label="Your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <textarea
        className="form-input"
        placeholder="How can we help?"
        aria-label="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      {state === 'error' && (
        <p style={{ color: '#c0392b', fontSize: '0.82rem' }}>Please fill in your name, a valid email, and a message.</p>
      )}
      <button type="submit" className="btn-dark" disabled={state === 'sending'} style={{ opacity: state === 'sending' ? 0.7 : 1 }}>
        {state === 'sending' ? 'Sending…' : 'Send Message'}
        {state !== 'sending' && <Icon name="arrow" size={14} strokeWidth={2} />}
      </button>
    </form>
  );
}
