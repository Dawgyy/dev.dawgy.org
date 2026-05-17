import { cn } from '@/lib/utils';

interface TagFilterProps {
  tags: string[];
  active: string | null;
  onChange: (tag: string | null) => void;
}

/**
 * A row of tag pills. Renders nothing when there are no tags, so pages
 * can include it unconditionally.
 */
export function TagFilter({ tags, active, onChange }: TagFilterProps) {
  if (tags.length === 0) return null;

  const pill = (label: string, selected: boolean, onClick: () => void) => (
    <button
      key={label}
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'rounded-full border px-3 py-1 font-mono text-xs transition-colors',
        selected
          ? 'border-accent bg-accent/15 text-accent'
          : 'border-line text-text-3 hover:border-line-strong hover:text-text',
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="mb-6 flex flex-wrap gap-1.5">
      {pill('All', active === null, () => onChange(null))}
      {tags.map((tag) =>
        pill(tag, active === tag, () => onChange(active === tag ? null : tag)),
      )}
    </div>
  );
}
