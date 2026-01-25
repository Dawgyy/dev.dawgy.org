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
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
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
