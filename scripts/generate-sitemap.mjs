/**
 * Generates public/sitemap.xml from the markdown content folders.
 * Runs before the Vite build (see package.json "build" script).
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://dev.dawgy.org';

const staticRoutes = ['/', '/about', '/work', '/blog', '/cv'];

const files = (folder) => {
  try {
    return readdirSync(join(root, 'src/content', folder)).filter((f) =>
      f.endsWith('.md'),
    );
  } catch {
    return [];
  }
};

const slug = (f) => f.replace(/\.md$/, '');
const frontmatter = (folder, f) =>
  readFileSync(join(root, 'src/content', folder, f), 'utf8').split('---')[1] ??
  '';

// Only personal projects get their own URL; professional ones are
// duplicates of work/* and not surfaced.
const projectRoutes = files('projects')
  .filter((f) => /category:\s*'?Personal'?/.test(frontmatter('projects', f)))
  .map((f) => `/projects/${slug(f)}`);

const routes = [
  ...staticRoutes,
  ...files('blog').map((f) => `/blog/${slug(f)}`),
  ...files('work').map((f) => `/work/${slug(f)}`),
  ...projectRoutes,
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
