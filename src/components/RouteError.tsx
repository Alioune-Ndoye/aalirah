import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

/**
 * Router-level error screen (loader/navigation errors bypass ErrorBoundary).
 *
 * Most common real-world cause: a tab opened before a deploy tries to fetch
 * the previous build's data/chunk files, gets Vercel's 404 text back, and
 * fails with "… is not valid JSON". That's fixed by a reload — so for that
 * signature we reload automatically (at most once per half-minute to avoid
 * loops), and visitors never see the raw error.
 */
const RELOAD_AT_KEY = 'aliraah_auto_reload_at';

export default function RouteError() {
  const error = useRouteError();
  const msg = String((error as { message?: string })?.message ?? error ?? '');

  // Signatures of a stale build fetching files replaced by a newer deploy.
  const stale =
    /is not valid JSON|Unexpected token|dynamically imported module|Importing a module script failed|ChunkLoadError|Failed to fetch/i.test(
      msg
    );

  useEffect(() => {
    if (!stale) return;
    const last = Number(sessionStorage.getItem(RELOAD_AT_KEY) || 0);
    if (Date.now() - last > 30_000) {
      sessionStorage.setItem(RELOAD_AT_KEY, String(Date.now()));
      window.location.reload();
    }
  }, [stale]);

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 24,
        background: 'var(--surface, #f8f5f0)',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 420 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: '2rem', color: '#1a1714', marginBottom: 10 }}>
          {stale ? 'Getting the latest version…' : 'Something went sideways'}
        </h1>
        <p style={{ color: '#6b5d4f', marginBottom: 24, lineHeight: 1.6 }}>
          {stale
            ? 'The site was just updated — refreshing to the newest version.'
            : 'Sorry about that — please reload the page. If it keeps happening, call us and we’ll take care of you the old-fashioned way.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '13px 32px', borderRadius: 100, border: 'none', cursor: 'pointer',
            background: '#c6a769', color: '#1a1714', fontWeight: 700, fontSize: '0.8rem',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
          }}
        >
          Reload now
        </button>
      </div>
    </section>
  );
}
