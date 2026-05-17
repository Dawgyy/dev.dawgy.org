import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
interface State {
  error: Error | null;
}

/**
 * Catches render-time errors anywhere below it and shows a styled
 * fallback instead of a blank page. Class component — error boundaries
 * have no hook equivalent.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    // Surface the error in the console for debugging.
    console.error('Unhandled UI error:', error);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-bg px-6 text-center">
        <p className="label text-accent">Error</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text">
          Something broke
        </h1>
        <p className="mt-2 max-w-sm text-sm text-text-2">
          An unexpected error stopped the page from rendering. Reloading usually
          fixes it.
        </p>
        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
          >
            Reload
          </button>
          <a
            href="/"
            className="rounded-lg border border-line-strong px-4 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent"
          >
            Back home
          </a>
        </div>
      </div>
    );
  }
}
