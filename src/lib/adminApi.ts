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
