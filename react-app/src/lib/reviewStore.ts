import type { Testimonial } from './data';

/** A review submitted through the post-service link.
 *  When VITE_API_URL is set these POST to the secured MongoDB API; otherwise
 *  they persist to localStorage so the flow can be demoed without a backend. */
export type SubmittedReview = Testimonial & {
  id: string;
  createdAt: number;
  /** Always true for locally-submitted reviews — used to show a "pending" badge. */
  pending: true;
};

const KEY = 'aalirah_reviews';

/** Base URL of the review API (e.g. http://localhost:4000). Empty = use localStorage. */
export const API_URL: string = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
export const apiEnabled = () => API_URL.length > 0;

export type ReviewInput = Omit<SubmittedReview, 'id' | 'createdAt' | 'pending'> & { jobRef?: string };

/** Submit a review to the backend API. Returns the moderation status. */
export async function submitReviewRemote(
  review: ReviewInput
): Promise<{ ok: true; status: string } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${API_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: data?.error || `Request failed (${res.status})` };
    return { ok: true, status: data.status || 'pending' };
  } catch {
    return { ok: false, error: 'Could not reach the server. Please try again.' };
  }
}

/** Fetch approved reviews from the backend API. */
export async function fetchApprovedReviews(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API_URL}/api/reviews`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.reviews) ? data.reviews : [];
  } catch {
    return [];
  }
}

/** Fetch Google Business reviews (synced via the backend). Empty until configured. */
export async function fetchGoogleReviews(): Promise<Testimonial[]> {
  if (!apiEnabled()) return [];
  try {
    const res = await fetch(`${API_URL}/api/reviews/google`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.reviews) ? data.reviews : [];
  } catch {
    return [];
  }
}

export function getSubmittedReviews(): SubmittedReview[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as SubmittedReview[]) : [];
    return Array.isArray(list) ? list.sort((a, b) => b.createdAt - a.createdAt) : [];
  } catch {
    return [];
  }
}

export type SaveResult = { ok: true } | { ok: false; reason: 'quota' | 'error' };

export function saveReview(review: Omit<SubmittedReview, 'id' | 'createdAt' | 'pending'>): SaveResult {
  if (typeof window === 'undefined') return { ok: false, reason: 'error' };
  const entry: SubmittedReview = {
    ...review,
    id: `r_${Date.now().toString(36)}`,
    createdAt: Date.now(),
    pending: true,
  };
  try {
    const list = getSubmittedReviews();
    list.unshift(entry);
    window.localStorage.setItem(KEY, JSON.stringify(list));
    return { ok: true };
  } catch (e) {
    // Most likely the video data URL blew past the ~5MB localStorage quota.
    const quota = e instanceof DOMException && /quota/i.test(e.name + e.message);
    return { ok: false, reason: quota ? 'quota' : 'error' };
  }
}

/** Read a Blob as a base64 data URL so a recorded clip can persist + replay. */
export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = () => reject(fr.error);
    fr.readAsDataURL(blob);
  });
}
