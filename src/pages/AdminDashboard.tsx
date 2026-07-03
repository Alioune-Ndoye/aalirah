import { useEffect, useState, useCallback } from 'react';
import Seo from '../components/Seo';
import Icon from '../components/Icon';
import {
  apiEnabled,
  verifyToken,
  listBookings,
  updateBookingStatus,
  listPendingReviews,
  setReviewStatus,
  downloadBookingsCsv,
  getSiteSettings,
  updateSiteSettings,
  listCustomers,
  getCustomer,
  updateCustomer,
  type Booking,
  type BookingStatus,
  type PendingReview,
  type AdminCustomer,
  type CustomerTier,
} from '../lib/adminApi';

const TOKEN_KEY = 'aalirah_admin_token';
const STATUSES: BookingStatus[] = ['new', 'contacted', 'scheduled', 'completed', 'cancelled'];
const STATUS_COLOR: Record<BookingStatus, string> = {
  new: '#2563eb',
  contacted: '#b8860b',
  scheduled: '#7c3aed',
  completed: '#16a34a',
  cancelled: '#9ca3af',
};

export default function AdminDashboard() {
  const [token, setToken] = useState<string>('');
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem(TOKEN_KEY) || '';
    if (saved && apiEnabled()) {
      verifyToken(saved).then((ok) => {
        if (ok) { setToken(saved); setAuthed(true); }
        else sessionStorage.removeItem(TOKEN_KEY);
        setChecking(false);
      });
    } else {
      setChecking(false);
    }
  }, []);

  const onLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken('');
    setAuthed(false);
  };

  return (
    <>
      <Seo title="Dashboard — Aliraah" description="Admin dashboard" path="/admin" noindex />
      <section style={{ background: 'var(--ivory)', minHeight: '100vh', paddingTop: 96, paddingBottom: 60 }}>
        <div className="wrap" style={{ maxWidth: 1100 }}>
          {!apiEnabled() ? (
            <Notice title="Backend not configured">
              Set <code>VITE_API_URL</code> in <code>react-app/.env</code> and start the API server
              (<code>cd server &amp;&amp; npm run dev</code>) to use the dashboard.
            </Notice>
          ) : checking ? (
            <p style={{ color: 'var(--text-muted)' }}>Checking access…</p>
          ) : !authed ? (
            <Login onSuccess={(t) => { sessionStorage.setItem(TOKEN_KEY, t); setToken(t); setAuthed(true); }} />
          ) : (
            <Dashboard token={token} onLogout={onLogout} />
          )}
        </div>
      </section>
    </>
  );
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: 32, maxWidth: 560, margin: '40px auto' }}>
      <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: 'var(--forest)', marginBottom: 10 }}>{title}</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{children}</p>
    </div>
  );
}

function Login({ onSuccess }: { onSuccess: (t: string) => void }) {
  const [value, setValue] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const ok = await verifyToken(value.trim());
    setBusy(false);
    if (ok) onSuccess(value.trim());
    else setErr('Invalid token.');
  };

  return (
    <form onSubmit={submit} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: 32, maxWidth: 420, margin: '60px auto' }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', color: 'var(--forest)', marginBottom: 6 }}>Dashboard</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 20 }}>Enter your admin token to continue.</p>
      <input
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Admin token"
        autoFocus
        style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border)', marginBottom: 14 }}
      />
      {err && <p style={{ color: '#c0392b', fontSize: '0.82rem', marginBottom: 12 }}>{err}</p>}
      <button type="submit" disabled={busy || !value.trim()} className="btn-primary w-full justify-center" style={{ opacity: busy || !value.trim() ? 0.5 : 1 }}>
        {busy ? 'Checking…' : 'Sign in'}
      </button>
    </form>
  );
}

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [tab, setTab] = useState<'bookings' | 'reviews' | 'customers' | 'site'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<PendingReview[]>([]);
  const [filter, setFilter] = useState<BookingStatus | ''>('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [b, r] = await Promise.all([
      listBookings(token, filter || undefined),
      listPendingReviews(token),
    ]);
    setBookings(b);
    setReviews(r);
    setLoading(false);
  }, [token, filter]);

  useEffect(() => { load(); }, [load]);

  const pipeline = bookings
    .filter((b) => b.status !== 'cancelled' && b.status !== 'completed')
    .reduce((sum, b) => sum + (b.estimatedTotal || 0), 0);
  const revenue = bookings
    .filter((b) => b.status === 'completed')
    .reduce((sum, b) => sum + (b.estimatedTotal || 0), 0);
  const newCount = bookings.filter((b) => b.status === 'new').length;

  const changeStatus = async (id: string, status: BookingStatus) => {
    setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
    await updateBookingStatus(token, id, status);
  };

  const moderate = async (id: string, status: 'approved' | 'rejected') => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    await setReviewStatus(token, id, status);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: 'var(--forest)' }}>
          Aliraah <em>Dashboard</em>
        </h1>
        <div className="flex items-center gap-3">
          <button onClick={load} className="btn-ghost" style={{ color: 'var(--forest)', borderColor: 'var(--border)' }}>Refresh</button>
          <button onClick={() => downloadBookingsCsv(token)} className="btn-dark">
            <Icon name="arrow" size={13} strokeWidth={2} /> Export CSV
          </button>
          <button onClick={onLogout} className="btn-ghost" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>Sign out</button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <Stat label="Total bookings" value={bookings.length} />
        <Stat label="New / unhandled" value={newCount} accent="#2563eb" />
        <Stat label="Revenue (earned)" value={`$${revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} accent="#16a34a" />
        <Stat label="Pipeline (upcoming)" value={`$${pipeline.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} accent="#7c3aed" />
        <Stat label="Reviews to moderate" value={reviews.length} accent="#b8860b" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        <TabBtn active={tab === 'bookings'} onClick={() => setTab('bookings')}>Bookings ({bookings.length})</TabBtn>
        <TabBtn active={tab === 'reviews'} onClick={() => setTab('reviews')}>Reviews ({reviews.length})</TabBtn>
        <TabBtn active={tab === 'customers'} onClick={() => setTab('customers')}>Customers</TabBtn>
        <TabBtn active={tab === 'site'} onClick={() => setTab('site')}>Site</TabBtn>
      </div>

      {loading && <p style={{ color: 'var(--text-muted)' }}>Loading…</p>}

      {!loading && tab === 'bookings' && (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            <FilterChip active={filter === ''} onClick={() => setFilter('')}>All</FilterChip>
            {STATUSES.map((s) => (
              <FilterChip key={s} active={filter === s} onClick={() => setFilter(s)}>{s}</FilterChip>
            ))}
          </div>
          {bookings.length === 0 ? (
            <Empty>No bookings yet.</Empty>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => (
                <BookingCard key={b._id} b={b} onStatus={changeStatus} />
              ))}
            </div>
          )}
        </>
      )}

      {!loading && tab === 'reviews' && (
        reviews.length === 0 ? (
          <Empty>No reviews waiting for moderation.</Empty>
        ) : (
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.id} style={cardStyle}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong style={{ color: 'var(--forest)' }}>{r.name}</strong>
                      <span style={{ color: 'var(--mint)' }}>{'★'.repeat(r.rating)}</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 6 }}>"{r.text}"</p>
                    {r.video && (
                      <a href={r.video} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--mint-dark)', fontSize: '0.8rem' }}>
                        ▶ View video
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => moderate(r.id, 'approved')} className="btn-dark" style={{ background: '#16a34a', borderColor: '#16a34a', padding: '8px 14px', fontSize: '0.8rem' }}>Approve</button>
                    <button onClick={() => moderate(r.id, 'rejected')} className="btn-ghost" style={{ color: '#c0392b', borderColor: 'var(--border)', padding: '8px 14px', fontSize: '0.8rem' }}>Reject</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {tab === 'customers' && <CustomersTab token={token} />}
      {tab === 'site' && <SiteTab token={token} />}
    </div>
  );
}

function CustomersTab({ token }: { token: string }) {
  const [q, setQ] = useState('');
  const [list, setList] = useState<AdminCustomer[]>([]);
  const [selected, setSelected] = useState<AdminCustomer | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  const search = useCallback(async () => {
    setList(await listCustomers(token, q));
  }, [token, q]);

  useEffect(() => { search(); }, [search]);

  const open = async (id: string) => {
    const data = await getCustomer(token, id);
    if (data) { setSelected(data.customer); setBookings(data.bookings); setSavedMsg(false); }
  };

  const save = async () => {
    if (!selected) return;
    setSaving(true);
    const updated = await updateCustomer(token, selected.id, {
      firstName: selected.firstName, lastName: selected.lastName, phone: selected.phone,
      street: selected.street, apt: selected.apt, city: selected.city, state: selected.state, zip: selected.zip,
      tier: selected.tier, discountRate: selected.discountRate, recurring: selected.recurring,
      avatarUrl: selected.avatarUrl, status: selected.status,
    });
    setSaving(false);
    if (updated) {
      setSelected(updated);
      setList((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setSavedMsg(true);
    }
  };

  const upd = (patch: Partial<AdminCustomer>) => setSelected((s) => (s ? { ...s, ...patch } : s));
  const field: React.CSSProperties = { width: '100%', padding: '9px 11px', borderRadius: 9, border: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--forest)', background: '#fff' };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* List */}
      <div className="md:col-span-1">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, account #"
          style={{ ...field, marginBottom: 12 }}
        />
        {list.length === 0 ? (
          <Empty>No customers found.</Empty>
        ) : (
          <div className="space-y-2">
            {list.map((c) => (
              <button
                key={c.id}
                onClick={() => open(c.id)}
                className="w-full text-left"
                style={{ ...cardStyle, padding: 12, borderColor: selected?.id === c.id ? 'var(--mint)' : 'var(--border)', cursor: 'pointer' }}
              >
                <div style={{ fontWeight: 700, color: 'var(--forest)', fontSize: '0.9rem' }}>{c.firstName} {c.lastName}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.email} · #{c.accountNumber}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--mint-dark)', textTransform: 'capitalize', marginTop: 2 }}>
                  {c.tier}{c.discountRate > 0 ? ` · ${c.discountRate}% off` : ''}{c.recurring ? ' · recurring' : ''}
                  {c.verified === false && <span style={{ color: '#b8860b', fontWeight: 700 }}> · awaiting code</span>}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail / edit */}
      <div className="md:col-span-2">
        {!selected ? (
          <Empty>Select a customer to view and edit their profile.</Empty>
        ) : (
          <div style={{ ...cardStyle, padding: 20 }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: 'var(--forest)', fontSize: '1.1rem' }}>
                  {selected.firstName} {selected.lastName}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{selected.email} · #{selected.accountNumber}</div>
              </div>
              <span style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: 20, background: selected.status === 'active' ? 'rgba(22,163,74,0.12)' : 'rgba(192,57,43,0.12)', color: selected.status === 'active' ? '#16a34a' : '#c0392b' }}>
                {selected.status}
              </span>
            </div>

            {/* Loyalty controls */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4" style={{ padding: 14, background: 'var(--cream)', borderRadius: 12 }}>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Tier
                <select value={selected.tier} onChange={(e) => upd({ tier: e.target.value as CustomerTier })} style={{ ...field, marginTop: 4 }}>
                  <option value="standard">Standard</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                </select>
              </label>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Discount %
                <input type="number" min={0} max={100} value={selected.discountRate} onChange={(e) => upd({ discountRate: Number(e.target.value) })} style={{ ...field, marginTop: 4 }} />
              </label>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column' }}>
                Recurring
                <button type="button" onClick={() => upd({ recurring: !selected.recurring })} style={{ ...field, marginTop: 4, cursor: 'pointer', fontWeight: 700, color: selected.recurring ? '#16a34a' : 'var(--text-muted)' }}>
                  {selected.recurring ? 'Enrolled' : 'Off'}
                </button>
              </label>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Status
                <select value={selected.status} onChange={(e) => upd({ status: e.target.value as 'active' | 'suspended' })} style={{ ...field, marginTop: 4 }}>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </label>
            </div>

            {/* Profile */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input value={selected.firstName} onChange={(e) => upd({ firstName: e.target.value })} placeholder="First" style={field} />
              <input value={selected.lastName} onChange={(e) => upd({ lastName: e.target.value })} placeholder="Last" style={field} />
              <input value={selected.phone} onChange={(e) => upd({ phone: e.target.value })} placeholder="Phone" style={field} />
              <input value={selected.avatarUrl} onChange={(e) => upd({ avatarUrl: e.target.value })} placeholder="Avatar image URL" style={field} />
              <input value={selected.street} onChange={(e) => upd({ street: e.target.value })} placeholder="Street" style={field} />
              <input value={selected.apt} onChange={(e) => upd({ apt: e.target.value })} placeholder="Apt" style={field} />
              <input value={selected.city} onChange={(e) => upd({ city: e.target.value })} placeholder="City" style={field} />
              <input value={selected.state} onChange={(e) => upd({ state: e.target.value })} placeholder="State" style={field} />
              <input value={selected.zip} onChange={(e) => upd({ zip: e.target.value })} placeholder="Zip" style={field} />
            </div>

            <div className="flex items-center gap-3 mb-5">
              <button onClick={save} disabled={saving} className="btn-dark" style={{ opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Saving…' : 'Save changes'}
              </button>
              {savedMsg && <span style={{ color: '#16a34a', fontSize: '0.82rem' }}>✓ Saved</span>}
            </div>

            {/* Their bookings */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--forest)', marginBottom: 8 }}>Bookings ({bookings.length})</div>
              {bookings.length === 0 ? (
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>No bookings yet.</p>
              ) : (
                <div className="space-y-2">
                  {bookings.map((b) => (
                    <div key={b._id} className="flex justify-between" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      <span>{b.date || new Date(b.createdAt).toLocaleDateString()} · {b.frequency || b.kind}</span>
                      <span>${(b.estimatedTotal || 0).toFixed(0)} · {b.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BookingCard({ b, onStatus }: { b: Booking; onStatus: (id: string, s: BookingStatus) => void }) {
  const addr = [b.street, b.apt, b.city, b.state, b.zip].filter(Boolean).join(', ');
  return (
    <div style={cardStyle}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div style={{ minWidth: 220 }}>
          <div className="flex items-center gap-2">
            <strong style={{ color: 'var(--forest)' }}>{b.firstName} {b.lastName}</strong>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{b.kind}</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
            <a href={`tel:${b.phone}`} style={{ color: 'var(--forest)' }}>{b.phone}</a> · <a href={`mailto:${b.email}`} style={{ color: 'var(--forest)' }}>{b.email}</a>
          </div>
          {addr && <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>{addr}</div>}
        </div>

        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', minWidth: 180 }}>
          <div>{b.frequency || '—'} · {b.size}</div>
          <div>{b.bedrooms} / {b.bathrooms}</div>
          {b.extras && b.extras.length > 0 && <div>Extras: {b.extras.join(', ')}</div>}
          {(b.date || b.time) && <div>📅 {b.date} {b.time}</div>}
          {b.notes && <div style={{ marginTop: 4, fontStyle: 'italic' }}>“{b.notes}”</div>}
        </div>

        <div className="text-right" style={{ minWidth: 150 }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: 'var(--forest)', fontSize: '1.1rem' }}>
            ${(b.estimatedTotal || 0).toFixed(0)}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 8 }}>
            {new Date(b.createdAt).toLocaleDateString()}
          </div>
          <select
            value={b.status}
            onChange={(e) => onStatus(b._id, e.target.value as BookingStatus)}
            style={{
              padding: '6px 10px', borderRadius: 8, border: `1px solid ${STATUS_COLOR[b.status]}`,
              color: STATUS_COLOR[b.status], fontWeight: 600, fontSize: '0.8rem', background: '#fff',
            }}
          >
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: 18,
};

function Stat({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 20px' }}>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: '1.6rem', color: accent || 'var(--forest)' }}>{value}</div>
      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>{label}</div>
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 18px', borderRadius: 10, fontWeight: 600, fontSize: '0.85rem',
        fontFamily: "'Space Grotesk',sans-serif", cursor: 'pointer',
        background: active ? 'var(--forest)' : '#fff', color: active ? '#fff' : 'var(--text-muted)',
        border: '1px solid var(--border)',
      }}
    >
      {children}
    </button>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '5px 12px', borderRadius: 20, fontSize: '0.78rem', cursor: 'pointer', textTransform: 'capitalize',
        background: active ? 'rgba(198,167,105,0.18)' : '#fff', color: active ? 'var(--mint-dark)' : 'var(--text-muted)',
        border: '1px solid var(--border)',
      }}
    >
      {children}
    </button>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p style={{ color: 'var(--text-muted)', padding: '40px 0', textAlign: 'center' }}>{children}</p>;
}

/** Site tab: feature toggles. Pages stay hidden on the site until enabled here. */
function SiteTab({ token }: { token: string }) {
  const [settings, setSettings] = useState<{ showGuarantee: boolean; showSpecials: boolean } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);

  const toggle = async (key: 'showGuarantee' | 'showSpecials') => {
    if (!settings || saving) return;
    setSaving(true);
    const next = await updateSiteSettings(token, { [key]: !settings[key] });
    if (next) setSettings(next);
    setSaving(false);
  };

  if (!settings) return <Empty>Loading site settings…</Empty>;

  const rows: { key: 'showGuarantee' | 'showSpecials'; label: string; desc: string }[] = [
    { key: 'showGuarantee', label: 'Our Guarantee page', desc: 'Shows the Guarantee link in the menu and footer.' },
    { key: 'showSpecials', label: 'Specials page', desc: 'Shows the Specials link in the menu, footer, and Reviews page.' },
  ];

  return (
    <div className="space-y-3" style={{ maxWidth: 620 }}>
      {rows.map((r) => (
        <div key={r.key} style={cardStyle} className="flex items-center justify-between gap-4">
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: 'var(--forest)' }}>{r.label}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>{r.desc}</div>
          </div>
          <button
            onClick={() => toggle(r.key)}
            disabled={saving}
            aria-pressed={settings[r.key]}
            style={{
              padding: '8px 18px', borderRadius: 20, fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
              fontFamily: "'Space Grotesk',sans-serif", minWidth: 92,
              background: settings[r.key] ? '#16a34a' : '#fff',
              color: settings[r.key] ? '#fff' : 'var(--text-muted)',
              border: `1px solid ${settings[r.key] ? '#16a34a' : 'var(--border)'}`,
              opacity: saving ? 0.6 : 1,
            }}
          >
            {settings[r.key] ? 'Visible' : 'Hidden'}
          </button>
        </div>
      ))}
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        Changes apply to the live site immediately (visitors see them on their next page load).
      </p>
    </div>
  );
}
