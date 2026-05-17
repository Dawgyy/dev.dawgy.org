/**
 * Generates public/feed.xml — an RSS 2.0 feed of the blog posts.
 * Runs at build time from the markdown frontmatter.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://dev.dawgy.org';

const esc = (s = '') =>
  String(s).replace(
    /[<>&'"]/g,
    (c) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        "'": '&apos;',
        '"': '&quot;',
      })[c],
  );

function frontmatter(file) {
  const block =
    readFileSync(join(root, 'src/content/blog', file), 'utf8').split(
      '---',
    )[1] ?? '';
  const get = (k) =>
    block.match(new RegExp(`${k}:\\s*'?"?([^'"\\n]+)`))?.[1]?.trim();
  return { title: get('title'), date: get('date'), resume: get('resume') };
}

const posts = readdirSync(join(root, 'src/content/blog'))
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ slug: f.replace(/\.md$/, ''), ...frontmatter(f) }))
  .filter((p) => p.title)
  .sort((a, b) => new Date(b.date ?? 0) - new Date(a.date ?? 0));

const items = posts
  .map((p) => {
    const url = `${BASE}/blog/${p.slug}`;
    const pubDate = p.date
      ? new Date(p.date).toUTCString()
      : new Date().toUTCString();
    return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      ${p.resume ? `<description>${esc(p.resume)}</description>` : ''}
    </item>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Alex Gerard — Writing</title>
    <link>${BASE}/blog</link>
    <description>Notes on development, tooling, and the craft of building software.</description>
    <language>en</language>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

writeFileSync(join(root, 'public/feed.xml'), xml);
console.log(`feed.xml — ${posts.length} posts`);
