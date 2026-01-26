import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink, FileText, BookOpen, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > 20;
      if (next === scrolled) return;
      setScrolled(next);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/projects', label: 'Projects', icon: FileText },
  ];

  const externalLinks = [
    { href: '/cv.pdf', label: 'CV', icon: FileText },
    { href: 'https://infohers.dawgy.org', label: 'Notes', icon: ExternalLink },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-fit rounded-full border transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-white/20 dark:border-white/10'
            : 'bg-white/50 dark:bg-black/50 backdrop-blur-md border-white/10'
        }`}
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between md:justify-center gap-1 md:gap-8 px-4 md:px-6 py-2 md:py-3">
          <Link to="/" className="flex md:hidden items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Home className="h-4 w-4" />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-full group"
              >
                {isActive(link.href) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white/50 dark:bg-white/10 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span
                  className={`relative z-10 ${isActive(link.href) ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10">
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-white/10 rounded-full"
                title={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-28 left-4 right-4 z-40 p-4 rounded-3xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-2xl border border-white/20 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'hover:bg-white/10 text-muted-foreground'
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <div className="flex gap-4 px-4 py-2">
                {externalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                  >
                    <div className="p-3 rounded-full bg-white/5 border border-white/10">
                      <link.icon className="h-4 w-4" />
                    </div>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
