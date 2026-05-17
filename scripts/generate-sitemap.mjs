/**
 * Generates public/sitemap.xml from the markdown content folders.
 * Runs before the Vite build (see package.json "build" script).
 */
import { readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://dev.dawgy.org';

const staticRoutes = [
  '/',
  '/about',
  '/projects',
  '/projects/professional',
  '/projects/personal',
  '/blog',
];

const slugs = (folder) => {
  try {
    return readdirSync(join(root, 'src/content', folder))
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''));
  } catch {
    return [];
  }
};

const routes = [
  ...staticRoutes,
  ...slugs('blog').map((s) => `/blog/${s}`),
  ...slugs('projects').map((s) => `/projects/${s}`),
  ...slugs('work').map((s) => `/work/${s}`),
];

const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url>\n    <loc>${BASE}${r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(root, 'public/sitemap.xml'), xml);
console.log(`sitemap.xml — ${routes.length} routes`);
