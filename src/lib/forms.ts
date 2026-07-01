import { site } from './site';
import { trackEvent } from './analytics';

export type LeadData = Record<string, string | number | undefined>;

/**
 * Deliver a form submission. Tries, in order:
 *   1. Web3Forms (if a key is set) — free, no backend.
 *   2. A custom POST endpoint (if set).
 *   3. mailto: fallback so the lead is never silently lost.
 * Returns true if the submission was handed off successfully.
 */
export async function submitLead(subject: string, data: LeadData): Promise<boolean> {
  const clean = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined && v !== ''));

  try {
    if (site.web3formsKey) {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: site.web3formsKey, subject, from_name: site.name, ...clean }),
      });
      if (res.ok) trackEvent('generate_lead', { subject });
      return res.ok;
    }

    if (site.formEndpoint) {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, ...clean }),
      });
      if (res.ok) trackEvent('generate_lead', { subject });
      return res.ok;
    }
  } catch (err) {
    console.error('Lead submission failed:', err);
    return false;
  }

  // No delivery configured — fall back to the visitor's email client.
  const body = Object.entries(clean)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  trackEvent('generate_lead', { subject, fallback: 'mailto' });
  return true;
}
