import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { API_URL, apiEnabled } from './reviewStore';

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountNumber: string;
  phone: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  tier: 'standard' | 'silver' | 'gold';
  discountRate: number;
  recurring: boolean;
  avatarUrl: string;
  status: 'active' | 'suspended';
};

export type SignupInput = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phone?: string;
  street?: string;
  apt?: string;
  city?: string;
  state?: string;
  zip?: string;
};

type Result = { ok: true; pending?: boolean } | { ok: false; error: string; pending?: boolean };

type AuthCtx = {
  customer: Customer | null;
  loading: boolean;
  configured: boolean;
  signup: (data: SignupInput) => Promise<Result>;
  login: (email: string, password: string) => Promise<Result>;
  /** Enter the access code the owner forwarded — activates the account + signs in. */
  verify: (email: string, code: string) => Promise<Result>;
  /** Ask the business to send a fresh access code. */
  resendCode: (email: string) => Promise<Result>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  updateProfile: (data: Record<string, unknown>) => Promise<Result>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function useAuth(): AuthCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAuth must be used within <AuthProvider>');
  return c;
}

const opts = (method: string, body?: unknown): RequestInit => ({
  method,
  credentials: 'include', // send/receive the httpOnly session cookie
  headers: { 'Content-Type': 'application/json' },
  ...(body ? { body: JSON.stringify(body) } : {}),
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const configured = apiEnabled();

  const refresh = async () => {
    if (!configured) { setLoading(false); return; }
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, { credentials: 'include' });
      const data = await res.json();
      setCustomer(data.customer || null);
    } catch {
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  const handle = async (path: string, method: string, body?: unknown): Promise<Result> => {
    if (!configured) return { ok: false, error: 'Accounts are unavailable right now.' };
    try {
      const res = await fetch(`${API_URL}${path}`, opts(method, body));
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return { ok: false, error: data?.error || `Request failed (${res.status})`, pending: data?.pending === true };
      }
      if (data.customer) setCustomer(data.customer);
      return { ok: true, pending: data?.pending === true };
    } catch {
      return { ok: false, error: 'Could not reach the server. Please try again.' };
    }
  };

  const value: AuthCtx = {
    customer,
    loading,
    configured,
    signup: (data) => handle('/api/auth/signup', 'POST', data),
    login: (email, password) => handle('/api/auth/login', 'POST', { email, password }),
    verify: (email, code) => handle('/api/auth/verify', 'POST', { email, code }),
    resendCode: (email) => handle('/api/auth/resend-code', 'POST', { email }),
    updateProfile: (data) => handle('/api/account/profile', 'PATCH', data),
    logout: async () => {
      if (configured) {
        try { await fetch(`${API_URL}/api/auth/logout`, opts('POST')); } catch { /* ignore */ }
      }
      setCustomer(null);
    },
    refresh,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Fetch the logged-in customer's bookings (portal history). */
export async function fetchMyBookings(): Promise<Record<string, unknown>[]> {
  if (!apiEnabled()) return [];
  try {
    const res = await fetch(`${API_URL}/api/account/bookings`, { credentials: 'include' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.bookings) ? data.bookings : [];
  } catch {
    return [];
  }
}
