import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Seo from '../components/Seo';
import Icon from '../components/Icon';
import { useAuth } from '../lib/auth';
import { site } from '../lib/site';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid var(--border)',
  background: '#fff',
  color: 'var(--forest)',
  fontSize: '0.95rem',
  outline: 'none',
};

export default function Auth({ mode }: { mode: 'login' | 'signup' }) {
  const { customer, loading, configured, login, signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Already signed in → go to the portal.
  useEffect(() => {
    if (!loading && customer) navigate('/account', { replace: true });
  }, [loading, customer, navigate]);

  const isSignup = mode === 'signup';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (isSignup && password !== confirm) {
      setErr('Passwords do not match.');
      return;
    }
    setBusy(true);
    const res = isSignup
      ? await signup({ firstName, lastName, email, password, phone })
      : await login(email, password);
    setBusy(false);
    if (res.ok) navigate('/account', { replace: true });
    else setErr(res.error);
  };

  return (
    <>
      <Seo
        title={`${isSignup ? 'Create Account' : 'Client Login'} — ${site.name}`}
        description={`${isSignup ? 'Create your' : 'Sign in to your'} ${site.name} account.`}
        path={isSignup ? '/signup' : '/login'}
        noindex
      />

      <section style={{ background: 'var(--forest)', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 100, paddingBottom: 60 }}>
        <div className="wrap" style={{ maxWidth: 460 }}>
          <div style={{ background: 'var(--ivory)', borderRadius: 24, padding: 'clamp(28px,5vw,44px)', border: '1px solid rgba(198,167,105,0.2)' }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,5vw,2.6rem)', color: 'var(--forest)', marginBottom: 6 }}>
              {isSignup ? <>Create your <em>account</em></> : <>Welcome <em>back</em></>}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 26 }}>
              {isSignup
                ? 'Track your cleanings, history, and member perks.'
                : 'Sign in to view your bookings and account.'}
            </p>

            {!configured && (
              <p style={{ color: '#c0392b', fontSize: '0.85rem', marginBottom: 16 }}>
                Accounts are temporarily unavailable. Please try again shortly.
              </p>
            )}

            <form onSubmit={submit}>
              {isSignup && (
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" required style={inputStyle} />
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" style={inputStyle} />
                </div>
              )}
              <div className="mb-3">
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required autoComplete={isSignup ? 'username' : 'username'} style={inputStyle} />
              </div>
              {isSignup && (
                <div className="mb-3">
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" style={inputStyle} />
                </div>
              )}
              <div className="mb-2" style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  name={isSignup ? 'new-password' : 'current-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignup ? 'Password (min 8 characters)' : 'Password'}
                  required
                  minLength={isSignup ? 8 : undefined}
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                  style={{ ...inputStyle, paddingRight: 62 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                  style={{
                    position: 'absolute', top: 0, right: 0, height: '100%', padding: '0 14px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--mint-dark)', fontSize: '0.78rem', fontWeight: 700,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {showPw ? 'Hide' : 'Show'}
                </button>
              </div>
              {isSignup && (
                <div className="mb-2">
                  <input
                    type={showPw ? 'text' : 'password'}
                    name="confirm-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Confirm password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    aria-invalid={confirm.length > 0 && confirm !== password}
                    style={{
                      ...inputStyle,
                      borderColor: confirm.length > 0 && confirm !== password ? '#c0392b' : 'var(--border)',
                    }}
                  />
                  {confirm.length > 0 && confirm !== password && (
                    <p style={{ color: '#c0392b', fontSize: '0.78rem', marginTop: 6 }}>Passwords don't match.</p>
                  )}
                </div>
              )}

              {err && <p style={{ color: '#c0392b', fontSize: '0.82rem', margin: '10px 0' }}>{err}</p>}

              <button type="submit" disabled={busy || !configured || (isSignup && (!password || password !== confirm))} className="btn-primary w-full justify-center" style={{ marginTop: 14, opacity: busy || !configured || (isSignup && (!password || password !== confirm)) ? 0.6 : 1 }}>
                {busy ? 'Please wait…' : isSignup ? 'Create Account' : 'Sign In'}
                {!busy && <Icon name="arrow" size={14} strokeWidth={2} />}
              </button>
            </form>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 22, textAlign: 'center' }}>
              {isSignup ? (
                <>Already have an account? <Link to="/login" style={{ color: 'var(--mint-dark)', fontWeight: 600 }}>Sign in</Link></>
              ) : (
                <>New here? <Link to="/signup" style={{ color: 'var(--mint-dark)', fontWeight: 600 }}>Create an account</Link></>
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
