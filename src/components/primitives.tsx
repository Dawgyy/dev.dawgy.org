import { cn } from '@/lib/utils';

/** Page container with consistent gutters. */
export function Shell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto w-full max-w-5xl px-5 md:px-8', className)}>
      {children}
    </div>
  );
}

/** Uppercase mono metadata label. */
export function Label({
  children,
  className,
  as: Tag = 'span',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'div' | 'p';
}) {
  return <Tag className={cn('label', className)}>{children}</Tag>;
}

/** Section heading: a small accent tick, index, title, and a meta count. */
export function SectionHead({
  index,
  title,
  count,
}: {
  index: string;
  title: string;
  count?: string | number;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_var(--accent-glow)]" />
      <span className="nums label">{index}</span>
      <h2 className="text-sm font-semibold uppercase tracking-[0.04em]">
        {title}
      </h2>
      <span className="h-px flex-1 bg-line" />
      {count !== undefined && <span className="label nums">{count}</span>}
    </div>
  );
}
