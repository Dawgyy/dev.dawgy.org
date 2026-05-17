import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { rowVariants } from '@/lib/utils';

interface EntryRowProps {
  to: string;
  index: string;
  title: string;
  caption?: string;
  meta?: string;
  /** extra tags shown on the second line */
  tags?: string[];
}

/** A spotlight card-row used across the index, work and writing lists. */
export function EntryRow({
  to,
  index,
  title,
  caption,
  meta,
  tags,
}: EntryRowProps) {
  return (
    <motion.div variants={rowVariants}>
      <Link
        to={to}
        className="card group flex items-center gap-4 px-4 py-4 hover:bg-surface-2 sm:gap-6 sm:px-6"
      >
        <span className="nums label shrink-0 transition-colors group-hover:text-accent">
          {index}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
            <span className="link-underline">{title}</span>
          </h3>
          {caption && (
            <p className="mt-0.5 truncate text-sm text-text-2">{caption}</p>
          )}
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-text-3"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
        {meta && <span className="label hidden shrink-0 sm:block">{meta}</span>}
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-text-3 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
          <ArrowUpRight className="size-4" />
        </span>
      </Link>
    </motion.div>
  );
}
