import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shell } from './primitives';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';

const nav = [
  { to: '/', label: 'Index', n: '00' },
  { to: '/projects', label: 'Work', n: '01' },
  { to: '/blog', label: 'Writing', n: '02' },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (to: string) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper">
      <Shell>
        <div className="flex h-14 items-center justify-between">
          {/* Wordmark */}
          <Link
            to="/"
            className="group flex items-baseline gap-2 text-sm font-semibold tracking-tight"
          >
            <span className="size-2 bg-accent" />
            <span className="link-underline">Alex Gerard</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-stretch md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'group flex items-baseline gap-1.5 border-l border-rule px-5 text-sm transition-colors',
                  isActive(item.to)
                    ? 'text-ink'
                    : 'text-ink-soft hover:text-ink',
                )}
              >
                <span
                  className={cn(
                    'nums text-[10px]',
                    isActive(item.to) ? 'text-accent' : 'text-ink-faint',
                  )}
                >
                  {item.n}
                </span>
                <span className="link-underline font-medium">{item.label}</span>
              </Link>
            ))}
            <a
              href="https://dev.dawgy.org/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center border-l border-rule px-5 text-sm text-ink-soft transition-colors hover:text-ink"
            >
              <span className="link-underline font-medium">CV ↗</span>
            </a>
            <div className="flex items-center border-l border-rule pl-3">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="flex h-9 w-9 items-center justify-center"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={cn(
                    'absolute left-0 block h-px w-5 bg-ink transition-all',
                    open ? 'top-1.5 rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-1.5 block h-px w-5 bg-ink transition-all',
                    open && 'opacity-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 block h-px w-5 bg-ink transition-all',
                    open ? 'top-1.5 -rotate-45' : 'top-3',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </Shell>

      {/* Mobile drawer */}
      {open && (
        <nav className="border-t border-rule bg-paper md:hidden">
          <Shell>
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-baseline gap-3 border-b border-rule py-4 text-base"
              >
                <span className="nums text-xs text-ink-faint">{item.n}</span>
                <span
                  className={cn(
                    'font-medium',
                    isActive(item.to) && 'text-accent',
                  )}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <a
              href="https://dev.dawgy.org/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-baseline gap-3 py-4 text-base"
            >
              <span className="nums text-xs text-ink-faint">03</span>
              <span className="font-medium">CV ↗</span>
            </a>
          </Shell>
        </nav>
      )}
    </header>
  );
}
