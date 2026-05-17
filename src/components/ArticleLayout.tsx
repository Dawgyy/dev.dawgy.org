import { lazy, Suspense } from 'react';
import { Shell, Label } from './primitives';
import { PageHeader } from './PageHeader';
import { ReadingProgress } from './ReadingProgress';
import { PrevNext } from './PrevNext';
import { useSeo } from '@/hooks/use-seo';
import type { AdjacentEntry } from '@/lib/content';

const MarkdownRenderer = lazy(() =>
  import('./MarkdownRenderer').then((m) => ({ default: m.MarkdownRenderer })),
);

function MarkdownSkeleton() {
  return (
    <div className="space-y-3" aria-hidden>
      {[92, 78, 85, 60, 80].map((w, i) => (
        <div
          key={i}
          className="h-3.5 rounded bg-surface-2"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  );
}

interface MetaItem {
  label: string;
  value: React.ReactNode;
}

interface ArticleLayoutProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Canonical path, e.g. "/blog/emacs" — drives SEO tags. */
  path: string;
  meta?: MetaItem[];
  actions?: React.ReactNode;
  content: string;
  /** Prev/next siblings shown at the foot of the article. */
  siblings?: {
    prev: AdjacentEntry | null;
    next: AdjacentEntry | null;
    base: string;
  };
}

export function ArticleLayout({
  eyebrow,
  title,
  description,
  path,
  meta,
  actions,
  content,
  siblings,
}: ArticleLayoutProps) {
  useSeo({ title, description, path, type: 'article' });

  return (
    <Shell className="pb-8">
      <ReadingProgress />
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        back
      />

      {/* Meta panel */}
      {meta && meta.length > 0 && (
        <div className="card mt-8 grid grid-cols-2 gap-px overflow-hidden bg-line sm:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label} className="bg-surface p-4">
              <Label className="block">{m.label}</Label>
              <p className="mt-1.5 text-sm font-medium leading-snug">
                {m.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}

      <div className="mx-auto mt-12 max-w-2xl">
        <Suspense fallback={<MarkdownSkeleton />}>
          <MarkdownRenderer content={content} />
        </Suspense>
        {siblings && (
          <PrevNext
            prev={siblings.prev}
            next={siblings.next}
            base={siblings.base}
          />
        )}
      </div>
    </Shell>
  );
}
