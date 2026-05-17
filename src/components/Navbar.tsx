import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, BookOpen, Home, NotebookPen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: FileText },
  { href: '/blog', label: 'Blog', icon: BookOpen },
];

const externalLinks = [
  { href: 'https://dev.dawgy.org/cv.pdf', label: 'CV', icon: FileText },
  { href: 'https://infohers.dawgy.org', label: 'Notes', icon: NotebookPen },
];

export function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path: string) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <div
          className={cn(
            'flex w-full max-w-2xl items-center gap-1 rounded-full border p-1.5 transition-all duration-300',
            scrolled
              ? 'glass shadow-lg shadow-black/5'
              : 'border-transparent bg-card/40 backdrop-blur-md',
          )}
        >
          {/* Brand */}
          <Link
            to="/"
            className="ml-1.5 mr-1 flex items-center gap-2 rounded-full"
            aria-label="Home"
          >
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold text-white">
              A
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden flex-1 items-center gap-0.5 sm:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
              >
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span
                  className={cn(
                    'relative z-10',
                    isActive(link.href)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-1 sm:ml-0">
            <div className="hidden items-center gap-0.5 sm:flex">
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                  className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <link.icon className="size-[18px]" />
                </a>
              ))}
              <span className="mx-0.5 h-5 w-px bg-border" />
            </div>
            <ThemeToggle />

            {/* Mobile burger */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:hidden"
            >
              {menuOpen ? (
                <X className="size-[18px]" />
              ) : (
                <Menu className="size-[18px]" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="glass fixed inset-x-4 top-20 z-40 rounded-3xl p-3 sm:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                    isActive(link.href)
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:bg-accent/60',
                  )}
                >
                  <link.icon className="size-[18px]" />
                  {link.label}
                </Link>
              ))}
              <div className="my-1 h-px bg-border" />
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60"
                >
                  <link.icon className="size-[18px]" />
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
