import { useEffect, useState } from 'react';
import Seo from '../components/Seo';
import Icon from '../components/Icon';
import { fetchCrew, crewAction, type CrewJob, type CrewInfo, type CrewAction } from '../lib/crewApi';
import { site } from '../lib/site';

/**
 * Cleaner job page — opened from the private link the owner shares once:
 *   aliraah.com/crew?k=<token>
 * Token-keyed (no password); mobile-first. Accept/decline offers, then
 * "On my way" → "Start" → "Done" as the job progresses. Every tap texts
 * the owner, and the customer's portal reflects the status live.
 */
export default function Crew() {
  const [token, setToken] = useState('');
  const [cleaner, setCleaner] = useState<CrewInfo | null>(null);
  const [jobs, setJobs] = useState<CrewJob[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'invalid'>('loading');
  const [busyJob, setBusyJob] = useState<string | null>(null);

  const load = async (k: string) => {
    const data = await fetchCrew(k);
    if (!data) { setState('invalid'); return; }
    setCleaner(data.cleaner);
    setJobs(data.jobs);
    setState('ready');
  };

  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get('k') || '';
    setToken(k);
    if (!k) { setState('invalid'); return; }
    load(k);
  }, []);

  const act = async (job: CrewJob, action: CrewAction) => {
    if (busyJob) return;
    setBusyJob(job.id);
    const res = await crewAction(token, job.id, action);
    if (res.ok) await load(token);
    setBusyJob(null);
  };

  return (
    <>
      <Seo title={`Crew — ${site.name}`} description="Crew job page" path="/crew" noindex />
      <section style={{ background: 'var(--ivory)', minHeight: '100vh', paddingTop: 96, paddingBottom: 60 }}>
        <div className="wrap" style={{ maxWidth: 560 }}>
          {state === 'loading' && <p style={{ color: 'var(--text-muted)' }}>Loading your jobs…</p>}

          {state === 'invalid' && (
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', color: 'var(--forest)', marginBottom: 8 }}>
                Link not valid
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                This crew link is missing or expired. Ask {site.name} to send you a fresh one.
              </p>
            </div>
          )}

          {state === 'ready' && cleaner && (
            <>
              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,5vw,2.4rem)', color: 'var(--forest)', marginBottom: 4 }}>
                Hi, {cleaner.firstName}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 24 }}>
                {jobs.length === 0 ? 'No jobs on your plate right now.' : `You have ${jobs.length} job${jobs.length > 1 ? 's' : ''}.`}
              </p>

              <div className="space-y-4">
                {jobs.map((j) => (
                  <JobCard key={j.id} job={j} busy={busyJob === j.id} onAction={(a) => act(j, a)} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

const chip: Record<CrewJob['dispatch'], { label: string; color: string }> = {
  offered: { label: 'New offer', color: '#2563eb' },
  accepted: { label: 'Accepted', color: '#16a34a' },
  on_the_way: { label: 'On the way', color: '#7c3aed' },
  in_progress: { label: 'In progress', color: '#b8860b' },
};

function JobCard({ job, busy, onAction }: { job: CrewJob; busy: boolean; onAction: (a: CrewAction) => void }) {
  const addr = [job.street, job.apt, job.city, job.zip].filter(Boolean).join(', ');
  const when = [job.date, job.time].filter(Boolean).join(' · ');
  const c = chip[job.dispatch];

  const btn = (label: string, action: CrewAction, primary = false, danger = false) => (
    <button
      onClick={() => onAction(action)}
      disabled={busy}
      style={{
        flex: 1, padding: '13px 10px', borderRadius: 12, fontWeight: 700, fontSize: '0.85rem',
        fontFamily: "'Space Grotesk',sans-serif", cursor: 'pointer', opacity: busy ? 0.6 : 1,
        background: primary ? 'var(--forest)' : danger ? '#fff' : '#fff',
        color: primary ? '#fff' : danger ? '#c0392b' : 'var(--forest)',
        border: `1.5px solid ${primary ? 'var(--forest)' : danger ? '#c0392b' : 'var(--border)'}`,
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: 18 }}>
      <div className="flex items-center justify-between gap-3 mb-2">
        <strong style={{ color: 'var(--forest)', fontFamily: "'Space Grotesk',sans-serif" }}>{when || 'Date TBD'}</strong>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: c.color, border: `1px solid ${c.color}`, borderRadius: 20, padding: '3px 10px' }}>
          {c.label}
        </span>
      </div>
      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        <div><strong style={{ color: 'var(--forest)' }}>{job.firstName}</strong> · {[job.bedrooms, job.bathrooms].filter(Boolean).join(' / ')}</div>
        {addr && (
          <a
            href={`https://maps.apple.com/?q=${encodeURIComponent(addr)}`}
            target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--mint-dark)', display: 'inline-flex', alignItems: 'center', gap: 4 }}
          >
            <Icon name="home" size={13} /> {addr}
          </a>
        )}
        {job.extras && job.extras.length > 0 && <div>Extras: {job.extras.join(', ')}</div>}
        {job.access && <div>Access: {job.access}</div>}
        {job.notes && <div style={{ fontStyle: 'italic' }}>“{job.notes}”</div>}
      </div>

      <div className="flex gap-2 mt-4">
        {job.dispatch === 'offered' && (
          <>
            {btn('Accept job', 'accept', true)}
            {btn('Decline', 'decline', false, true)}
          </>
        )}
        {job.dispatch === 'accepted' && btn("I'm on my way", 'on_the_way', true)}
        {job.dispatch === 'on_the_way' && (
          <>
            {btn('Start cleaning', 'start', true)}
            {btn('Finish job', 'done')}
          </>
        )}
        {job.dispatch === 'in_progress' && btn('Job complete ✓', 'done', true)}
      </div>
    </div>
  );
}
