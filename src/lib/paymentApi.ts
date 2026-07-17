import { API_URL, apiEnabled } from './reviewStore';

/** Kick off payment for one of MY bookings. When Stripe is connected the
 *  server returns a checkout `url` to redirect to; until then it answers
 *  with a friendly `pending` message the portal shows inline. */
export async function startCheckout(
  bookingId: string
): Promise<{ ok: true; url: string } | { ok: false; error: string; pending?: boolean }> {
  if (!apiEnabled()) return { ok: false, error: 'Payments are unavailable right now.' };
  try {
    const res = await fetch(`${API_URL}/api/payments/checkout/${bookingId}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.url) return { ok: true, url: data.url };
    return { ok: false, error: data?.error || 'Could not start payment.', pending: data?.pending === true };
  } catch {
    return { ok: false, error: 'Could not reach the server. Please try again.' };
  }
}
