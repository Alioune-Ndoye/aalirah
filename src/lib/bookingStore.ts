import { API_URL, apiEnabled } from './reviewStore';

/** Live count of bookings made through the site (0 if no backend). */
export async function fetchBookingCount(): Promise<number> {
  if (!apiEnabled()) return 0;
  try {
    const res = await fetch(`${API_URL}/api/stats`);
    if (!res.ok) return 0;
    const data = await res.json();
    return Number(data?.bookings) || 0;
  } catch {
    return 0;
  }
}

export type BookingPayload = {
  kind?: 'booking' | 'quote';
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
  estimatedHours?: number;
  tip?: number;
  promoCode?: string;
  /** Saved property this clean is for (PM dashboard); server verifies ownership. */
  propertyId?: string;
};

/** Submit a booking to the backend. Returns ok:true even when no API is
 *  configured (demo mode) so the existing success screen still shows. */
export async function submitBooking(
  payload: BookingPayload
): Promise<{ ok: true; demo?: boolean } | { ok: false; error: string }> {
  if (!apiEnabled()) return { ok: true, demo: true };
  try {
    const res = await fetch(`${API_URL}/api/bookings`, {
      method: 'POST',
      credentials: 'include', // send session cookie so a logged-in booking links to the account
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: data?.error || `Request failed (${res.status})` };
    return { ok: true };
  } catch {
    return { ok: false, error: 'Could not reach the server. Please try again.' };
  }
}
