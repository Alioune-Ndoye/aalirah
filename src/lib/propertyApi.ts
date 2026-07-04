import { API_URL, apiEnabled } from './reviewStore';

/** A saved property/unit in a customer's portfolio (PM dashboard). */
export type Property = {
  id: string;
  label: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  bedrooms: string;
  bathrooms: string;
  size: string;
  access: string;
  notes: string;
  archived: boolean;
  createdAt: string;
};

export type PropertyInput = Partial<Omit<Property, 'id' | 'archived' | 'createdAt'>> & { street: string };

const opts = (method: string, body?: unknown): RequestInit => ({
  method,
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  ...(body ? { body: JSON.stringify(body) } : {}),
});

export async function fetchMyProperties(): Promise<Property[]> {
  if (!apiEnabled()) return [];
  try {
    const res = await fetch(`${API_URL}/api/account/properties`, { credentials: 'include' });
    if (!res.ok) return [];
    return (await res.json()).properties || [];
  } catch {
    return [];
  }
}

export async function createProperty(data: PropertyInput): Promise<Property | null> {
  try {
    const res = await fetch(`${API_URL}/api/account/properties`, opts('POST', data));
    if (!res.ok) return null;
    return (await res.json()).property || null;
  } catch {
    return null;
  }
}

export async function updateProperty(id: string, patch: Partial<PropertyInput> & { archived?: boolean }): Promise<Property | null> {
  try {
    const res = await fetch(`${API_URL}/api/account/properties/${id}`, opts('PATCH', patch));
    if (!res.ok) return null;
    return (await res.json()).property || null;
  } catch {
    return null;
  }
}
