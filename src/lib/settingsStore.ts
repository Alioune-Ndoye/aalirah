import { useEffect, useState } from 'react';
import { API_URL, apiEnabled } from './reviewStore';

/** Admin-controlled feature toggles. Everything defaults OFF — pages like
 *  Guarantee and Specials stay hidden until enabled in the admin dashboard. */
export type SiteSettings = {
  showGuarantee: boolean;
  showSpecials: boolean;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  showGuarantee: false,
  showSpecials: false,
};

// Module-level cache: one fetch per page load, shared by navbar/footer/pages.
let cached: SiteSettings | null = null;
let inflight: Promise<SiteSettings> | null = null;

export function fetchSiteSettings(): Promise<SiteSettings> {
  if (cached) return Promise.resolve(cached);
  if (inflight) return inflight;
  if (!apiEnabled()) return Promise.resolve(DEFAULT_SETTINGS);

  const p: Promise<SiteSettings> = fetch(`${API_URL}/api/settings`)
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((data) => {
      const s: SiteSettings = { ...DEFAULT_SETTINGS, ...(data?.settings ?? {}) };
      cached = s;
      return s;
    })
    .catch(() => DEFAULT_SETTINGS)
    .finally(() => {
      inflight = null;
    });
  inflight = p;
  return p;
}

/** React hook: current site settings (defaults until the fetch resolves). */
export function useSiteSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(cached ?? DEFAULT_SETTINGS);
  useEffect(() => {
    let alive = true;
    fetchSiteSettings().then((s) => alive && setSettings(s));
    return () => {
      alive = false;
    };
  }, []);
  return settings;
}
