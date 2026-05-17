import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, CornerDownLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { getAllContent } from '@/lib/content';
import { useTheme } from './theme-provider';
import { cn } from '@/lib/utils';

interface Item {
  to: string;
  title: string;
  group: string;
}

/** Static destinations + every content entry, flattened for search. */
function useIndex(): Item[] {
  return useMemo(() => {
    const pages: Item[] = [
      { to: '/', title: 'Index', group: 'Pages' },
      { to: '/work', title: 'Work', group: 'Pages' },
      { to: '/blog', title: 'Writing', group: 'Pages' },
      { to: '/about', title: 'About', group: 'Pages' },
      { to: '/cv', title: 'CV', group: 'Pages' },
    ];
    const work = getAllContent('work').map((w) => ({
      to: `/work/${w.slug}`,
      title: w.title ?? w.slug,
      group: 'Work',
    }));
    const writing = getAllContent('blog').map((p) => ({
      to: `/blog/${p.slug}`,
      title: p.title ?? p.slug,
      group: 'Writing',
    }));
    const projects = getAllContent('projects')
      .filter((p) => p.category === 'Personal')
      .map((p) => ({
        to: `/projects/${p.slug}`,
        title: p.title ?? p.slug,
        group: 'Projects',
      }));
    return [...pages, ...work, ...writing, ...projects];
  }, []);
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const index = useIndex();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index;
    return index.filter((i) => i.title.toLowerCase().includes(q));
  }, [index, query]);

  // Global ⌘K / Ctrl+K to open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Reset + focus when opening.
  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const choose = (item: Item) => {
    setOpen(false);
    navigate(item.to);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault();
      choose(results[active]);
    }
  };

  return (
    <>
      {/* Trigger — sits in the navbar */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="group flex items-center gap-2 rounded-full border border-line bg-surface/60 py-1.5 pl-3 pr-2 text-sm text-text-3 transition-colors hover:border-line-strong hover:text-text"
      >
        <Search className="size-4" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[10px] sm:inline">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[14vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Search"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
              className="card relative w-full max-w-lg overflow-hidden"
            >
              {/* input */}
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search className="size-4 shrink-0 text-text-3" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search pages, work, writing…"
                  className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-text-3"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-text-3">
                  Esc
                </kbd>
              </div>

              {/* results */}
              <div className="max-h-[52vh] overflow-y-auto p-2">
                {results.length === 0 ? (
                  <p className="px-3 py-6 text-center text-sm text-text-3">
                    No results for “{query}”.
                  </p>
                ) : (
                  results.map((item, i) => (
                    <button
                      key={item.to}
                      type="button"
                      onClick={() => choose(item)}
                      onMouseMove={() => setActive(i)}
                      className={cn(
                        'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                        i === active ? 'bg-surface-2 text-text' : 'text-text-2',
                      )}
                    >
                      <span className="truncate font-medium">{item.title}</span>
                      <span className="label shrink-0">{item.group}</span>
                    </button>
                  ))
                )}
              </div>

              {/* footer */}
              <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[11px] text-text-3">
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <ArrowUp className="size-3" />
                    <ArrowDown className="size-3" />
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <CornerDownLeft className="size-3" />
                    open
                  </span>
                </span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="transition-colors hover:text-text"
                >
                  Theme: {theme === 'dark' ? 'Dark' : 'Light'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
