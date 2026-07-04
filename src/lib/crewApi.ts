import { API_URL, apiEnabled } from './reviewStore';

/** Job shape the API exposes to a cleaner — no price, no customer email. */
export type CrewJob = {
  id: string;
  date?: string;
  time?: string;
  firstName: string;
  street?: string;
  apt?: string;
  city?: string;
  zip?: string;
  size?: string;
  bedrooms?: string;
  bathrooms?: string;
  frequency?: string;
  extras?: string[];
  access?: string;
  notes?: string;
  dispatch: 'offered' | 'accepted' | 'on_the_way' | 'in_progress';
};

export type CrewInfo = { id: string; firstName: string; lastName: string; phone: string };

export type CrewAction = 'accept' | 'decline' | 'on_the_way' | 'start' | 'done';

export async function fetchCrew(token: string): Promise<{ cleaner: CrewInfo; jobs: CrewJob[] } | null> {
  if (!apiEnabled() || !token) return null;
  try {
    const res = await fetch(`${API_URL}/api/crew/${token}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function crewAction(
  token: string,
  jobId: string,
  action: CrewAction
): Promise<{ ok: boolean; dispatch?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/crew/${token}/jobs/${jobId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, dispatch: data.dispatch };
  } catch {
    return { ok: false };
  }
}
