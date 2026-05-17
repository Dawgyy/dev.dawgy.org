/**
 * Renders the favicon SVG to PNG icons at the sizes needed by browsers
 * and the web manifest. Runs at build time — no committed binaries.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(join(root, 'public/favicon.svg'), 'utf8');

const sizes = [
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['apple-touch-icon.png', 180],
];

for (const [name, size] of sizes) {
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
  })
    .render()
    .asPng();
  writeFileSync(join(root, 'public', name), png);
}

console.log(`icons — ${sizes.length} generated`);
