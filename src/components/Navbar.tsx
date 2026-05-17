import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shell } from './primitives';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';

const nav = [
  { to: '/', label: 'Index' },
  { to: '/projects', label: 'Work' },
  { to: '/blog', label: 'Writing' },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (to: string) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-line bg-bg/80 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <Shell>
        <div className="flex h-16 items-center justify-between">
          {/* Wordmark */}
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-md bg-accent text-[13px] font-bold text-accent-ink shadow-[0_0_16px_var(--accent-glow)]">
              A
            </span>
            <span className="text-sm font-semibold tracking-tight">
              <span className="link-underline">Alex Gerard</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                  isActive(item.to)
                    ? 'text-text'
                    : 'text-text-3 hover:text-text',
                )}
              >
                {isActive(item.to) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-surface-2"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            ))}
            <span className="mx-2 h-4 w-px bg-line" />
            <a
              href="https://dev.dawgy.org/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-full px-3.5 py-1.5 text-sm font-medium text-text-3 transition-colors hover:text-text"
            >
              <span className="link-underline">CV</span>
              <span className="ml-1 text-text-3 transition-colors group-hover:text-accent">
                ↗
              </span>
            </a>
            <ThemeToggle className="ml-1" />
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="grid size-9 place-items-center"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={cn(
                    'absolute left-0 block h-0.5 w-5 rounded bg-text transition-all',
                    open ? 'top-1.5 rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-text transition-all',
                    open && 'opacity-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 block h-0.5 w-5 rounded bg-text transition-all',
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
        <nav className="border-t border-line bg-bg/95 backdrop-blur-xl md:hidden">
          <Shell>
            <div className="flex flex-col py-2">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'border-b border-line py-3.5 text-base font-medium',
                    isActive(item.to) ? 'text-accent' : 'text-text-2',
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://dev.dawgy.org/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 text-base font-medium text-text-2"
              >
                CV ↗
              </a>
            </div>
          </Shell>
        </nav>
      )}
    </header>
  );
}
