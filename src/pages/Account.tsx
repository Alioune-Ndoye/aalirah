import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Icon from '../components/Icon';
import type { IconName } from '../components/Icon';
import { useAuth, fetchMyBookings } from '../lib/auth';
import { fetchMyProperties, createProperty, updateProperty, type Property } from '../lib/propertyApi';
import { startCheckout } from '../lib/paymentApi';
import { site } from '../lib/site';

type Booking = {
  _id: string;
  status: string;
  frequency?: string;
  size?: string;
  bedrooms?: string;
  bathrooms?: string;
  date?: string;
  time?: string;
  estimatedTotal?: number;
  extras?: string[];
  createdAt: string;
  dispatch?: 'none' | 'offered' | 'accepted' | 'declined' | 'on_the_way' | 'in_progress' | 'done';
  cleanerId?: { firstName?: string } | string | null;
  propertyId?: string | null;
  paymentStatus?: 'unpaid' | 'paid' | 'refunded';
  photos?: { url: string; kind: 'before' | 'after' }[];
};

const TIER_LABEL: Record<string, string> = { standard: 'Standard', silver: 'Silver Member', gold: 'Gold Member' };
const ACTIVE = ['new', 'contacted', 'scheduled'];

export default function Account() {
  const { customer, loading, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (!loading && !customer) navigate('/login', { replace: true });
  }, [loading, customer, navigate]);

  useEffect(() => {
    if (customer) fetchMyBookings().then((b) => setBookings(b as unknown as Booking[]));
  }, [customer]);

  if (loading || !customer) {
    return (
      <>
        {/* Seo must render in this branch too — it's what SSG prerenders,
            and this private page needs its noindex in the static HTML. */}
        <Seo title={`My Account — ${site.name}`} description="Your account, bookings and history." path="/account" noindex />
        <section style={{ background: 'var(--ivory)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Loading your account…</p>
        </section>
      </>
    );
  }

  const upcoming = bookings.filter((b) => ACTIVE.includes(b.status));
  const past = bookings.filter((b) => !ACTIVE.includes(b.status));

  return (
    <>
      <Seo title={`My Account — ${site.name}`} description="Your account, bookings and history." path="/account" noindex />

      {/* Header */}
      <section style={{ background: 'var(--forest)', paddingTop: 120, paddingBottom: 48 }}>
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', background: 'var(--mint)', color: 'var(--forest)', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: '1.5rem' }}
            >
              {customer.avatarUrl
                ? <img src={customer.avatarUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : (customer.firstName[0] || '') + (customer.lastName[0] || '')}
            </div>
            <div>
              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: '#fff', lineHeight: 1.1 }}>
                Hi, {customer.firstName}
              </h1>
              <div style={{ color: 'var(--mint)', fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.8rem', letterSpacing: '0.08em', marginTop: 4 }}>
                Account #{customer.accountNumber}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/book" className="btn-primary">Book a Cleaning<Icon name="arrow" size={13} strokeWidth={2} /></Link>
            <button onClick={() => { logout(); navigate('/'); }} className="btn-ghost" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.25)' }}>
              Log out
            </button>
            <button
              onClick={() => setSettingsOpen(true)}
              aria-label="Account settings"
              title="Settings"
              style={{
                width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
                color: 'var(--mint)', cursor: 'pointer', flexShrink: 0,
              }}
            >
              <Icon name="gear" size={20} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </section>

      {/* Membership perks */}
      <section className="bg-ivory py-10">
        <div className="wrap grid grid-cols-1 sm:grid-cols-3 gap-4">
          <PerkCard label="Membership" value={TIER_LABEL[customer.tier] || 'Standard'} icon="star" />
          <PerkCard label="Your discount" value={customer.discountRate > 0 ? `${customer.discountRate}% off` : 'None yet'} icon="sparkle" />
          <PerkCard label="Recurring plan" value={customer.recurring ? 'Enrolled' : 'Not enrolled'} icon="check-circle" />
        </div>
      </section>

      {/* Property-manager dashboard: all units in one place */}
      {customer.accountType === 'property_manager' && <PropertiesSection bookings={bookings} />}

      {/* Bookings */}
      <section className="bg-cream py-14">
        <div className="wrap">
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', color: 'var(--forest)', marginBottom: 16 }}>Upcoming cleanings</h2>
          {upcoming.length === 0 ? (
            <Empty>No upcoming cleanings. <Link to="/book" style={{ color: 'var(--mint-dark)', fontWeight: 600 }}>Book one →</Link></Empty>
          ) : (
            <div className="space-y-3 mb-12">{upcoming.map((b) => <BookingRow key={b._id} b={b} />)}</div>
          )}

          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', color: 'var(--forest)', margin: '28px 0 16px' }}>History</h2>
          {past.length === 0 ? (
            <Empty>No past cleanings yet.</Empty>
          ) : (
            <div className="space-y-3">{past.map((b) => <BookingRow key={b._id} b={b} />)}</div>
          )}
        </div>
      </section>

      {/* Settings slide-over — opened from the gear icon (top right) */}
      {settingsOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Account settings"
          onClick={() => setSettingsOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 95, background: 'rgba(14, 12, 10, 0.5)',
            backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'flex-end',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(560px, 100%)', height: '100%', overflowY: 'auto',
              background: 'var(--ivory)', borderLeft: '1px solid var(--border)',
              padding: 'clamp(20px, 4vw, 32px)',
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.6rem', color: 'var(--forest)' }}>
                Settings
              </h2>
              <button
                onClick={() => setSettingsOpen(false)}
                aria-label="Close settings"
                style={{
                  width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--border)',
                  background: '#fff', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
            <ProfileSection updateProfile={updateProfile} customer={customer} inPanel />
          </div>
        </div>
      )}
    </>
  );
}

function PerkCard({ label, value, icon }: { label: string; value: string; icon: IconName }) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ color: 'var(--mint-dark)' }}><Icon name={icon} size={22} /></span>
      <div>
        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{label}</div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: 'var(--forest)' }}>{value}</div>
      </div>
    </div>
  );
}

/** Customer-friendly live status line for the crew dispatch state. */
function crewStatus(b: Booking): { text: string; color: string } | null {
  const name = (typeof b.cleanerId === 'object' && b.cleanerId?.firstName) || 'Your cleaner';
  switch (b.dispatch) {
    case 'accepted': return { text: `${name} is confirmed for this clean`, color: '#16a34a' };
    case 'on_the_way': return { text: `🚗 ${name} is on the way!`, color: '#7c3aed' };
    case 'in_progress': return { text: `✨ ${name} is cleaning now`, color: '#b8860b' };
    case 'done': return { text: `Completed by ${name}`, color: '#16a34a' };
    default: return null; // offered/declined are internal — customer sees nothing yet
  }
}

function BookingRow({ b }: { b: Booking }) {
  const crew = crewStatus(b);
  const [payMsg, setPayMsg] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [lightbox, setLightbox] = useState<{ url: string; kind: string } | null>(null);

  const canPay =
    (b.paymentStatus ?? 'unpaid') === 'unpaid' && (b.estimatedTotal || 0) > 0 && b.status !== 'cancelled';

  const pay = async () => {
    if (paying) return;
    setPaying(true);
    setPayMsg(null);
    const res = await startCheckout(b._id);
    setPaying(false);
    if (res.ok) window.location.href = res.url; // Stripe Checkout (once connected)
    else setPayMsg(res.error);
  };

  const befores = (b.photos || []).filter((p) => p.kind === 'before');
  const afters = (b.photos || []).filter((p) => p.kind === 'after');

  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }} className="flex flex-wrap items-center justify-between gap-3">
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: 'var(--forest)' }}>
          {b.frequency || 'Cleaning'} · {b.size || ''}
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
          {b.date ? `${b.date}${b.time ? ' · ' + b.time : ''}` : `Requested ${new Date(b.createdAt).toLocaleDateString()}`}
          {b.extras && b.extras.length > 0 && ` · ${b.extras.join(', ')}`}
        </div>
        {crew && (
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: crew.color, marginTop: 4 }}>
            {crew.text}
          </div>
        )}

        {/* Before / after photos */}
        {(befores.length > 0 || afters.length > 0) && (
          <div className="flex flex-wrap gap-2" style={{ marginTop: 10 }}>
            {[...befores, ...afters].map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightbox(p)}
                aria-label={`View ${p.kind} photo`}
                style={{ position: 'relative', width: 72, height: 54, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', padding: 0, cursor: 'zoom-in', background: 'var(--cream)' }}
              >
                <img src={p.url} alt={`${p.kind} photo`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', bottom: 3, left: 3, fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff', background: p.kind === 'before' ? 'rgba(26,23,20,0.8)' : 'rgba(22,163,74,0.85)', borderRadius: 4, padding: '1px 5px' }}>
                  {p.kind}
                </span>
              </button>
            ))}
          </div>
        )}
        {payMsg && <p style={{ fontSize: '0.8rem', color: 'var(--mint-dark)', marginTop: 8, maxWidth: 380 }}>{payMsg}</p>}

        {/* Lightbox */}
        {lightbox && (
          <div
            role="dialog"
            aria-label={`${lightbox.kind} photo`}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(10,10,12,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, cursor: 'zoom-out' }}
          >
            <div style={{ textAlign: 'center' }}>
              <img src={lightbox.url} alt={`${lightbox.kind} photo enlarged`} style={{ maxWidth: '92vw', maxHeight: '82vh', borderRadius: 10 }} />
              <div style={{ color: '#fff', fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 12 }}>
                {lightbox.kind} · tap anywhere to close
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="text-right flex-shrink-0">
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: 'var(--forest)' }}>${(b.estimatedTotal || 0).toFixed(0)}</div>
        <div style={{ fontSize: '0.7rem', textTransform: 'capitalize', color: 'var(--mint-dark)', fontWeight: 600 }}>{b.status}</div>
        {b.paymentStatus === 'paid' && (
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#16a34a', marginTop: 4 }}>Paid ✓</div>
        )}
        {b.paymentStatus === 'refunded' && (
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginTop: 4 }}>Refunded</div>
        )}
        {canPay && (
          <button
            onClick={pay}
            disabled={paying}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.7rem', marginTop: 8, opacity: paying ? 0.6 : 1 }}
          >
            {paying ? 'One moment…' : `Pay $${(b.estimatedTotal || 0).toFixed(0)}`}
          </button>
        )}
      </div>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p style={{ color: 'var(--text-muted)', padding: '20px 0' }}>{children}</p>;
}

/* ── Property-manager dashboard ──────────────────────────────────────
   One login, every unit: each property card shows its live status,
   next visit, and cleaning count, with one-tap booking per property. */

const ACTIVE_DISPATCH = ['accepted', 'on_the_way', 'in_progress'];

function PropertiesSection({ bookings }: { bookings: Booking[] }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ label: '', street: '', apt: '', city: '', state: 'CT', zip: '', bedrooms: '', bathrooms: '' });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetchMyProperties().then(setProperties);
  }, []);

  const active = properties.filter((p) => !p.archived);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.street.trim() || busy) return;
    setBusy(true);
    const created = await createProperty(form);
    setBusy(false);
    if (created) {
      setProperties((prev) => [...prev, created]);
      setForm({ label: '', street: '', apt: '', city: '', state: 'CT', zip: '', bedrooms: '', bathrooms: '' });
      setAdding(false);
    }
  };

  const archive = async (p: Property) => {
    const next = await updateProperty(p.id, { archived: true });
    if (next) setProperties((prev) => prev.map((x) => (x.id === p.id ? next : x)));
  };

  return (
    <section className="bg-ivory pb-2 pt-4">
      <div className="wrap">
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', color: 'var(--forest)' }}>
            Your properties {active.length > 0 && <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>({active.length})</span>}
          </h2>
          <button onClick={() => setAdding((a) => !a)} className="btn-ghost" style={{ color: 'var(--forest)', borderColor: 'var(--border)', cursor: 'pointer' }}>
            {adding ? 'Cancel' : '+ Add property'}
          </button>
        </div>

        {adding && (
          <form onSubmit={add} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Label (e.g. Unit 2B)" style={pInput} />
              <input value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} placeholder="Street address *" required style={pInput} />
              <input value={form.apt} onChange={(e) => setForm({ ...form, apt: e.target.value })} placeholder="Apt / unit" style={pInput} />
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" style={pInput} />
              <input value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} placeholder="Zip" style={pInput} />
              <button type="submit" disabled={busy} className="btn-primary justify-center" style={{ opacity: busy ? 0.6 : 1 }}>
                {busy ? 'Saving…' : 'Save property'}
              </button>
            </div>
          </form>
        )}

        {active.length === 0 && !adding ? (
          <Empty>Add your first property to see every unit's status in one place.</Empty>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {active.map((p) => (
              <PropertyCard
                key={p.id}
                p={p}
                bookings={bookings.filter((b) => String(b.propertyId || '') === p.id)}
                onArchive={() => archive(p)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PropertyCard({ p, bookings, onArchive }: { p: Property; bookings: Booking[]; onArchive: () => void }) {
  const addr = [p.street, p.apt, p.city, p.zip].filter(Boolean).join(', ');
  // Live line: prefer an in-motion job, then upcoming, then last completed.
  const live = bookings.find((b) => ACTIVE_DISPATCH.includes(b.dispatch || ''));
  const upcoming = bookings.find((b) => ['new', 'contacted', 'scheduled'].includes(b.status));
  const doneCount = bookings.filter((b) => b.dispatch === 'done' || b.status === 'completed').length;

  const status = live
    ? crewStatus(live)
    : upcoming
      ? { text: `📅 Scheduled${upcoming.date ? ` for ${upcoming.date}` : ''}`, color: 'var(--mint-dark)' }
      : doneCount > 0
        ? { text: `✔ Last clean completed · ${doneCount} total`, color: '#16a34a' }
        : { text: 'No cleanings yet', color: 'var(--text-muted)' };

  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 18 }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: 'var(--forest)' }}>{p.label}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>{addr}</div>
          {status && (
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: status.color, marginTop: 8 }}>{status.text}</div>
          )}
        </div>
        <div className="text-right flex-shrink-0">
          <Link
            to={`/book?property=${p.id}`}
            className="btn-dark"
            style={{ padding: '8px 14px', fontSize: '0.75rem' }}
          >
            Book clean
          </Link>
          <div>
            <button onClick={onArchive} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.7rem', cursor: 'pointer', marginTop: 8 }}>
              archive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const pInput: React.CSSProperties = {
  padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', background: '#fff',
  color: 'var(--forest)', fontSize: '0.9rem', outline: 'none',
};

function ProfileSection({ customer, updateProfile, inPanel = false }: { customer: ReturnType<typeof useAuth>['customer']; updateProfile: ReturnType<typeof useAuth>['updateProfile']; inPanel?: boolean }) {
  const c = customer!;
  const [form, setForm] = useState({
    firstName: c.firstName, lastName: c.lastName, phone: c.phone,
    street: c.street, apt: c.apt, city: c.city, state: c.state, zip: c.zip,
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [busy, setBusy] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const field: React.CSSProperties = { width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', fontSize: '0.9rem', color: 'var(--forest)', background: '#fff' };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const payload: Record<string, unknown> = { ...form };
    if (newPassword) { payload.currentPassword = currentPassword; payload.newPassword = newPassword; }
    const res = await updateProfile(payload);
    setBusy(false);
    if (res.ok) { setMsg({ text: 'Saved.', ok: true }); setCurrentPassword(''); setNewPassword(''); }
    else setMsg({ text: res.error, ok: false });
  };

  // In the settings panel the overlay provides its own chrome; standalone it
  // keeps the original full-width section (used nowhere else at the moment).
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    inPanel ? (
      <>{children}</>
    ) : (
      <section className="bg-ivory py-14">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', color: 'var(--forest)', marginBottom: 16 }}>Profile & settings</h2>
          {children}
        </div>
      </section>
    );

  return (
    <Wrapper>
        <form onSubmit={save} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input value={form.firstName} onChange={set('firstName')} placeholder="First name" style={field} />
            <input value={form.lastName} onChange={set('lastName')} placeholder="Last name" style={field} />
            <input value={form.phone} onChange={set('phone')} placeholder="Phone" style={field} />
            <input value={c.email} disabled style={{ ...field, background: 'var(--cream)', color: 'var(--text-muted)' }} />
            <input value={form.street} onChange={set('street')} placeholder="Street" style={field} />
            <input value={form.apt} onChange={set('apt')} placeholder="Apt / Suite" style={field} />
            <input value={form.city} onChange={set('city')} placeholder="City" style={field} />
            <input value={form.state} onChange={set('state')} placeholder="State" style={field} />
            <input value={form.zip} onChange={set('zip')} placeholder="Zip" style={field} />
          </div>

          <div style={{ borderTop: '1px solid var(--border)', margin: '10px 0 14px', paddingTop: 14 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>Change password (optional)</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current password" autoComplete="current-password" style={field} />
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password (min 8)" autoComplete="new-password" style={field} />
            </div>
          </div>

          {msg && <p style={{ color: msg.ok ? 'var(--mint-dark)' : '#c0392b', fontSize: '0.85rem', marginBottom: 12 }}>{msg.text}</p>}
          <button type="submit" disabled={busy} className="btn-dark" style={{ opacity: busy ? 0.6 : 1 }}>
            {busy ? 'Saving…' : 'Save changes'}
          </button>
        </form>
    </Wrapper>
  );
}
