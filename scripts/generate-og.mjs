/**
 * Generates Open Graph share images (1200x630 PNG) for every route.
 * SVG template rendered to PNG via resvg — no headless browser needed.
 * Output: public/og/<slug>.png   (referenced by useSeo).
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public/og');
mkdirSync(outDir, { recursive: true });

// design tokens (mirrors globals.css dark theme)
const BG = '#1b1d20';
const SURFACE = '#26282c';
const TEXT = '#f4f5f6';
const TEXT2 = '#9da3a9';
const ACCENT = '#3fbcd4';

const esc = (s) =>
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

/** Wrap a title onto at most 3 lines of ~20 chars. */
function wrap(text, max = 20) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max && line) {
      lines.push(line);
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function template({ eyebrow, title }) {
  const lines = wrap(title);
  const titleSvg = lines
    .map(
      (l, i) =>
        `<text x="80" y="${300 + i * 96}" font-family="Inter Tight, sans-serif" font-size="84" font-weight="700" fill="${TEXT}">${esc(l)}</text>`,
    )
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="20%" cy="0%" r="80%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.22"/>
      <stop offset="70%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="${SURFACE}" stroke-width="2"/>

  <!-- brand mark -->
  <rect x="80" y="80" width="56" height="56" rx="12" fill="${ACCENT}"/>
  <text x="108" y="120" font-family="Inter Tight, sans-serif" font-size="32" font-weight="700" fill="${BG}" text-anchor="middle">A</text>
  <text x="156" y="118" font-family="Inter Tight, sans-serif" font-size="28" font-weight="600" fill="${TEXT}">Alex Gerard</text>

  <!-- eyebrow -->
  <text x="80" y="210" font-family="JetBrains Mono, monospace" font-size="24" letter-spacing="3" fill="${ACCENT}">${esc(eyebrow.toUpperCase())}</text>

  <!-- title -->
  ${titleSvg}

  <!-- footer -->
  <line x1="80" y1="540" x2="1120" y2="540" stroke="${SURFACE}" stroke-width="2"/>
  <text x="80" y="585" font-family="JetBrains Mono, monospace" font-size="22" fill="${TEXT2}">dev.dawgy.org</text>
  <text x="1120" y="585" font-family="JetBrains Mono, monospace" font-size="22" fill="${TEXT2}" text-anchor="end">IT Consultant &amp; Developer</text>
</svg>`;
}

function render(svg, name) {
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    font: { loadSystemFonts: true },
  })
    .render()
    .asPng();
  writeFileSync(join(outDir, `${name}.png`), png);
}

function fm(folder, file) {
  const raw = readFileSync(join(root, 'src/content', folder, file), 'utf8');
  const block = raw.split('---')[1] ?? '';
  const get = (k) => block.match(new RegExp(`${k}:\\s*'?"?([^'"\\n]+)`))?.[1];
  return { title: get('title'), category: get('category') };
}
const mdFiles = (folder) => {
  try {
    return readdirSync(join(root, 'src/content', folder)).filter((f) =>
      f.endsWith('.md'),
    );
  } catch {
    return [];
  }
};

// --- static pages ---
const pages = [
  { name: 'default', eyebrow: 'Portfolio', title: 'IT Consultant & Developer' },
  { name: 'work', eyebrow: 'Index / 01', title: 'Work' },
  { name: 'writing', eyebrow: 'Index / 02', title: 'Writing' },
  { name: 'about', eyebrow: 'Index / 04', title: 'About' },
];
for (const p of pages) render(template(p), p.name);

// --- content pages ---
let n = pages.length;
for (const f of mdFiles('blog')) {
  const { title } = fm('blog', f);
  if (!title) continue;
  render(
    template({ eyebrow: 'Writing', title }),
    `blog-${f.replace(/\.md$/, '')}`,
  );
  n++;
}
for (const f of mdFiles('work')) {
  const { title } = fm('work', f);
  if (!title) continue;
  render(
    template({ eyebrow: 'Work', title }),
    `work-${f.replace(/\.md$/, '')}`,
  );
  n++;
}
for (const f of mdFiles('projects')) {
  const { title, category } = fm('projects', f);
  if (!title || category !== 'Personal') continue;
  render(
    template({ eyebrow: 'Project', title }),
    `project-${f.replace(/\.md$/, '')}`,
  );
  n++;
}

console.log(`og images — ${n} generated`);
