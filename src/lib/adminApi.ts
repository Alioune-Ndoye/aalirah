import { API_URL, apiEnabled } from './reviewStore';

export type BookingStatus = 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';

export type Booking = {
  _id: string;
  kind: 'booking' | 'quote';
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  smsOptIn?: boolean;
  street?: string;
  apt?: string;
  city?: string;
  state?: string;
  zip?: string;
  size?: string;
  bedrooms?: string;
  bathrooms?: string;
  frequency?: string;
  extras?: string[];
  access?: string;
  notes?: string;
  date?: string;
  time?: string;
  estimatedTotal?: number;
  tip?: number;
  promoCode?: string;
  status: BookingStatus;
  createdAt: string;
  cleanerId?: string | { _id: string; firstName: string };
  dispatch?: DispatchStatus;
};

export type PendingReview = {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  video?: string;
  jobRef?: string;
  createdAt: string;
};

export { apiEnabled };

const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

/** Verify a token by hitting an admin-only endpoint. */
export async function verifyToken(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/bookings?limit=1`, { headers: auth(token) });
    return res.ok;
  } catch {
    return false;
  }
}

export async function listBookings(token: string, status?: BookingStatus): Promise<Booking[]> {
  const qs = status ? `?status=${status}` : '';
  const res = await fetch(`${API_URL}/api/bookings${qs}`, { headers: auth(token) });
  if (!res.ok) return [];
  const data = await res.json();
  return data.bookings || [];
}

export async function updateBookingStatus(token: string, id: string, status: BookingStatus): Promise<boolean> {
  const res = await fetch(`${API_URL}/api/bookings/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...auth(token) },
    body: JSON.stringify({ status }),
  });
  return res.ok;
}

export async function listPendingReviews(token: string): Promise<PendingReview[]> {
  const res = await fetch(`${API_URL}/api/reviews/pending`, { headers: auth(token) });
  if (!res.ok) return [];
  const data = await res.json();
  return data.reviews || [];
}

export async function setReviewStatus(token: string, id: string, status: 'approved' | 'rejected'): Promise<boolean> {
  const res = await fetch(`${API_URL}/api/reviews/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...auth(token) },
    body: JSON.stringify({ status }),
  });
  return res.ok;
}

export type CustomerTier = 'standard' | 'silver' | 'gold';

export type AdminCustomer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountNumber: string;
  accountType?: 'residential' | 'property_manager';
  phone: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  tier: CustomerTier;
  discountRate: number;
  recurring: boolean;
  avatarUrl: string;
  status: 'active' | 'suspended';
  verified?: boolean;
  createdAt: string;
};

export async function listCustomers(token: string, q = ''): Promise<AdminCustomer[]> {
  const res = await fetch(`${API_URL}/api/admin/customers${q ? `?q=${encodeURIComponent(q)}` : ''}`, { headers: auth(token) });
  if (!res.ok) return [];
  const data = await res.json();
  return data.customers || [];
}

export async function getCustomer(token: string, id: string): Promise<{ customer: AdminCustomer; bookings: Booking[] } | null> {
  const res = await fetch(`${API_URL}/api/admin/customers/${id}`, { headers: auth(token) });
  if (!res.ok) return null;
  return res.json();
}

export async function updateCustomer(token: string, id: string, patch: Partial<AdminCustomer>): Promise<AdminCustomer | null> {
  const res = await fetch(`${API_URL}/api/admin/customers/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...auth(token) },
    body: JSON.stringify(patch),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.customer || null;
}

/* ── Cleaners / crew dispatch ───────────────────────────── */

export type DispatchStatus = 'none' | 'offered' | 'accepted' | 'declined' | 'on_the_way' | 'in_progress' | 'done';

export type AdminCleaner = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  token: string;
  status: 'active' | 'inactive';
  notes: string;
  createdAt: string;
};

export async function listCleaners(token: string): Promise<AdminCleaner[]> {
  const res = await fetch(`${API_URL}/api/admin/cleaners`, { headers: auth(token) });
  if (!res.ok) return [];
  return (await res.json()).cleaners || [];
}

export async function createCleaner(
  token: string,
  data: { firstName: string; lastName?: string; phone: string; email?: string }
): Promise<AdminCleaner | null> {
  const res = await fetch(`${API_URL}/api/admin/cleaners`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...auth(token) },
    body: JSON.stringify(data),
  });
  if (!res.ok) return null;
  return (await res.json()).cleaner || null;
}

export async function updateCleaner(
  token: string,
  id: string,
  patch: Partial<Pick<AdminCleaner, 'firstName' | 'lastName' | 'phone' | 'email' | 'notes' | 'status'>>
): Promise<AdminCleaner | null> {
  const res = await fetch(`${API_URL}/api/admin/cleaners/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...auth(token) },
    body: JSON.stringify(patch),
  });
  if (!res.ok) return null;
  return (await res.json()).cleaner || null;
}

/** Offer a booking to a cleaner (texts them a job offer). */
export async function assignCleaner(token: string, bookingId: string, cleanerId: string): Promise<boolean> {
  const res = await fetch(`${API_URL}/api/admin/cleaners/assign/${bookingId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...auth(token) },
    body: JSON.stringify({ cleanerId }),
  });
  return res.ok;
}

export type SiteSettingsPatch = { showGuarantee?: boolean; showSpecials?: boolean };

/** Fresh (uncached) read of the public site settings, for the admin UI. */
export async function getSiteSettings(): Promise<Required<SiteSettingsPatch> | null> {
  const res = await fetch(`${API_URL}/api/settings`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.settings ?? null;
}

export async function updateSiteSettings(
  token: string,
  patch: SiteSettingsPatch
): Promise<{ showGuarantee: boolean; showSpecials: boolean } | null> {
  const res = await fetch(`${API_URL}/api/settings`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...auth(token) },
    body: JSON.stringify(patch),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.settings ?? null;
}

/** Download the bookings CSV (protected endpoint → fetch with auth, then save). */
export async function downloadBookingsCsv(token: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/bookings/export.csv`, { headers: auth(token) });
  if (!res.ok) return;
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `aliraah-bookings-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
