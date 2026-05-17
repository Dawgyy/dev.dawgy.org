import { useMemo, useState } from 'react';
import type { ContentData } from '@/lib/content';

interface TagFilterResult {
  /** All distinct tags across the items, sorted by frequency. */
  tags: string[];
  /** The currently selected tag, or null for "all". */
  active: string | null;
  setActive: (tag: string | null) => void;
  /** Items narrowed to the active tag. */
  filtered: ContentData[];
}

/**
 * Derives a tag filter from a content list.
 * `tags` is empty when no item carries a `tags` field — callers should
 * render the filter UI only when `tags.length > 0`.
 */
export function useTagFilter(items: ContentData[]): TagFilterResult {
  const [active, setActive] = useState<string | null>(null);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      for (const tag of item.tags ?? []) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag);
  }, [items]);

  const filtered = useMemo(() => {
    if (!active) return items;
    return items.filter((i) => i.tags?.includes(active));
  }, [items, active]);

  return { tags, active, setActive, filtered };
}
