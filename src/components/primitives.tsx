import { cn } from '@/lib/utils';

/* ================================================================ */
/*  Swiss layout primitives                                          */
/* ================================================================ */

/** Page container — fixed margins, the canvas everything sits on. */
export function Shell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('mx-auto w-full max-w-[1320px] px-5 md:px-10', className)}
    >
      {children}
    </div>
  );
}

/** 12-column composition grid. */
export function Grid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-4 gap-x-5 md:grid-cols-12 md:gap-x-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** A hairline rule. `weight="heavy"` uses ink for section breaks. */
export function Rule({
  weight = 'hair',
  className,
}: {
  weight?: 'hair' | 'heavy';
  className?: string;
}) {
  return (
    <hr
      className={cn(
        'border-0 border-t',
        weight === 'heavy' ? 'border-t-2 border-rule-strong' : 'border-rule',
        className,
      )}
    />
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
  as?: 'span' | 'div' | 'h2' | 'p';
}) {
  return <Tag className={cn('label', className)}>{children}</Tag>;
}

/** Section header: zero-padded index + title + optional aside. */
export function SectionHead({
  index,
  title,
  aside,
}: {
  index: string;
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 pb-3">
      <h2 className="flex items-baseline gap-3 text-sm font-medium">
        <span className="nums text-ink-faint">{index}</span>
        <span className="uppercase tracking-[0.06em]">{title}</span>
      </h2>
      {aside && <Label>{aside}</Label>}
    </div>
  );
}
