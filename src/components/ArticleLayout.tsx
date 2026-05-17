import { lazy, Suspense } from 'react';
import { Shell, Grid, Rule, Label } from './primitives';
import { PageHeader } from './PageHeader';

const MarkdownRenderer = lazy(() =>
  import('./MarkdownRenderer').then((m) => ({ default: m.MarkdownRenderer })),
);

function MarkdownSkeleton() {
  return (
    <div className="space-y-3" aria-hidden>
      {[92, 78, 85, 60, 80].map((w, i) => (
        <div key={i} className="h-3.5 bg-field" style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}

interface MetaItem {
  label: string;
  value: React.ReactNode;
}

interface ArticleLayoutProps {
  index: string;
  kind: string;
  title: string;
  description?: string;
  meta?: MetaItem[];
  actions?: React.ReactNode;
  content: string;
}

export function ArticleLayout({
  index,
  kind,
  title,
  description,
  meta,
  actions,
  content,
}: ArticleLayoutProps) {
  return (
    <Shell>
      <PageHeader
        index={`${index} — ${kind}`}
        title={title}
        description={description}
        back
      />

      {/* Meta table — key/value rows under hairlines */}
      {meta && meta.length > 0 && (
        <Grid className="py-3">
          {meta.map((m) => (
            <div
              key={m.label}
              className="col-span-2 border-t border-rule pt-3 md:col-span-3"
            >
              <Label className="block">{m.label}</Label>
              <p className="mt-1.5 text-sm font-medium leading-snug">
                {m.value}
              </p>
            </div>
          ))}
        </Grid>
      )}

      {actions && (
        <>
          <Rule />
          <div className="flex flex-wrap gap-3 py-4">{actions}</div>
        </>
      )}

      <Rule weight="heavy" />

      {/* Body — offset into the grid like a print column */}
      <Grid className="py-12">
        <article className="col-span-4 md:col-span-8 md:col-start-3">
          <Suspense fallback={<MarkdownSkeleton />}>
            <MarkdownRenderer content={content} />
          </Suspense>
        </article>
      </Grid>
    </Shell>
  );
}
