import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Label } from './primitives';
import type { AdjacentEntry } from '@/lib/content';

interface PrevNextProps {
  prev: AdjacentEntry | null;
  next: AdjacentEntry | null;
  /** Route prefix the slugs sit under, e.g. "/blog" or "/work". */
  base: string;
}

/** Prev / next links shown at the foot of an article. */
export function PrevNext({ prev, next, base }: PrevNextProps) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="More entries" className="mt-16 grid gap-3 sm:grid-cols-2">
      {prev ? (
        <Link
          to={`${base}/${prev.slug}`}
          className="card group flex flex-col gap-1.5 p-5 hover:bg-surface-2"
        >
          <Label className="flex items-center gap-1.5">
            <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </Label>
          <span className="link-underline font-medium tracking-tight">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}

      {next && (
        <Link
          to={`${base}/${next.slug}`}
          className="card group flex flex-col items-end gap-1.5 p-5 text-right hover:bg-surface-2 sm:col-start-2"
        >
          <Label className="flex items-center gap-1.5">
            Next
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </Label>
          <span className="link-underline font-medium tracking-tight">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
