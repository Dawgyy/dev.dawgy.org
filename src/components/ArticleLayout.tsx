import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from './PageHeader';
import { EASE_OUT } from '@/lib/utils';

const MarkdownRenderer = lazy(() =>
  import('./MarkdownRenderer').then((m) => ({ default: m.MarkdownRenderer })),
);

function MarkdownSkeleton() {
  return (
    <div className="space-y-3" aria-hidden>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-4 animate-pulse rounded bg-muted"
          style={{ width: `${70 + ((i * 13) % 30)}%` }}
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
  eyebrow?: string;
  title: string;
  subtitle?: React.ReactNode;
  /** Inline meta shown directly under the title (date, views…). */
  inlineMeta?: React.ReactNode;
  /** Grid of key/value pairs shown in a panel. */
  meta?: MetaItem[];
  /** Action buttons (links to repo / demo). */
  actions?: React.ReactNode;
  content: string;
}

export function ArticleLayout({
  eyebrow,
  title,
  subtitle,
  inlineMeta,
  meta,
  actions,
  content,
}: ArticleLayoutProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className="mx-auto w-full max-w-3xl px-4 pb-12 pt-28 md:px-6 md:pt-32"
    >
      <div className="space-y-6">
        <PageHeader eyebrow={eyebrow} title={title} back />

        {subtitle && (
          <p className="text-lg font-medium text-primary">{subtitle}</p>
        )}

        {inlineMeta && (
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {inlineMeta}
          </div>
        )}

        {meta && meta.length > 0 && (
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="bg-card/80 p-4 backdrop-blur">
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {m.label}
                </dt>
                <dd className="mt-1 text-sm font-medium">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </div>

      <div className="my-8 h-px bg-border" />

      <Suspense fallback={<MarkdownSkeleton />}>
        <MarkdownRenderer content={content} />
      </Suspense>
    </motion.article>
  );
}
