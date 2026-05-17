import fm from 'front-matter';

const markdownFiles = import.meta.glob('/src/content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export interface ContentData {
  slug: string;
  title?: string;
  date?: string;
  resume?: string;
  content: string;
  [key: string]: any;
}

export function getAllContent(
  type: 'blog' | 'projects' | 'work' | 'education',
): ContentData[] {
  const posts: ContentData[] = [];
  const prefix = `/src/content/${type}/`;

  for (const path in markdownFiles) {
    if (path.includes(prefix)) {
      const rawContent = markdownFiles[path];
      const { attributes, body } = fm<any>(rawContent);
      const slug = path.split('/').pop()?.replace('.md', '') || '';

      if (!posts.some((p) => p.slug === slug)) {
        posts.push({
          slug,
          ...attributes,
          content: body,
        });
      }
    }
  }

  return posts.sort((a, b) => {
    const dateA = a.startDate || a.date;
    const dateB = b.startDate || b.date;
    if (dateA && dateB) {
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    }
    return 0;
  });
}

/** A lightweight reference to a sibling entry (prev/next navigation). */
export interface AdjacentEntry {
  slug: string;
  title: string;
}

/**
 * Returns the entries immediately before and after `slug` in the sorted list,
 * optionally narrowed by a predicate (e.g. same project category).
 */
export function getAdjacent(
  type: 'blog' | 'projects' | 'work',
  slug: string,
  filter?: (c: ContentData) => boolean,
): { prev: AdjacentEntry | null; next: AdjacentEntry | null } {
  const list = getAllContent(type).filter(filter ?? (() => true));
  const i = list.findIndex((c) => c.slug === slug);
  if (i === -1) return { prev: null, next: null };

  const toRef = (c?: ContentData): AdjacentEntry | null =>
    c ? { slug: c.slug, title: c.title ?? 'Untitled' } : null;

  return { prev: toRef(list[i - 1]), next: toRef(list[i + 1]) };
}

export function getContentBySlug(
  type: 'blog' | 'projects' | 'work' | 'education',
  slug: string,
): ContentData | null {
  const searchString = `/src/content/${type}/${slug}.md`;
  const path = Object.keys(markdownFiles).find(
    (p) => p.endsWith(searchString) || p === searchString,
  );

  if (!path) return null;

  const rawContent = markdownFiles[path];
  const { attributes, body } = fm<any>(rawContent);
  return {
    slug,
    ...attributes,
    content: body,
  };
}
