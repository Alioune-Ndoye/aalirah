import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

/** Catches render errors in the page tree so one bad component can't take down
 *  the whole site — the nav/footer stay, and the user gets a friendly recovery. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // In production this is where you'd report to an error service.
    console.error('Page error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section
          className="min-h-[60vh] flex items-center justify-center text-center px-6"
          style={{ background: 'var(--surface)' }}
        >
          <div>
            <h2 className="section-heading mb-3" style={{ fontSize: '2rem' }}>
              Something went <em>sideways</em>
            </h2>
            <p style={{ color: 'var(--text-soft)', marginBottom: 28, maxWidth: 380 }}>
              Sorry about that — please try reloading the page.
            </p>
            <button className="btn-primary" onClick={() => window.location.reload()}>
              Reload
            </button>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}
