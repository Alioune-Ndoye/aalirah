import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Icon from '../components/Icon';
import type { IconName } from '../components/Icon';
import { useAuth, fetchMyBookings } from '../lib/auth';
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
};

const TIER_LABEL: Record<string, string> = { standard: 'Standard', silver: 'Silver Member', gold: 'Gold Member' };
const ACTIVE = ['new', 'contacted', 'scheduled'];

export default function Account() {
  const { customer, loading, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);

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

      {/* Profile */}
      <ProfileSection updateProfile={updateProfile} customer={customer} />
    </>
  );
}

function PerkCard({ label, value, icon }: { label: string; value: string; icon: IconName }) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
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
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: 16 }} className="flex flex-wrap items-center justify-between gap-3">
      <div>
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
      </div>
      <div className="text-right">
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: 'var(--forest)' }}>${(b.estimatedTotal || 0).toFixed(0)}</div>
        <span style={{ fontSize: '0.7rem', textTransform: 'capitalize', color: 'var(--mint-dark)', fontWeight: 600 }}>{b.status}</span>
      </div>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p style={{ color: 'var(--text-muted)', padding: '20px 0' }}>{children}</p>;
}

function ProfileSection({ customer, updateProfile }: { customer: ReturnType<typeof useAuth>['customer']; updateProfile: ReturnType<typeof useAuth>['updateProfile'] }) {
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

  return (
    <section className="bg-ivory py-14">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', color: 'var(--forest)', marginBottom: 16 }}>Profile & settings</h2>
        <form onSubmit={save} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
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
      </div>
    </section>
  );
}
