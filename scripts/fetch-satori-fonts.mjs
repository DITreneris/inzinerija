#!/usr/bin/env node
/**
 * Copy Inter WOFF from @fontsource/inter for Satori rendering.
 * Pattern from DITreneris/blog scripts/fetch_og_fonts.mjs
 */
import { mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SATORI_FONTS_DIR = join(ROOT, 'data', 'satori', 'fonts');
const FONTSOURCE = join(ROOT, 'node_modules', '@fontsource', 'inter', 'files');

const SATORI_PAIRS = [
  ['inter-latin-400-normal.woff', 'Inter-Regular.woff'],
  ['inter-latin-700-normal.woff', 'Inter-Bold.woff'],
];

function main() {
  mkdirSync(SATORI_FONTS_DIR, { recursive: true });
  for (const [srcName, destName] of SATORI_PAIRS) {
    const src = join(FONTSOURCE, srcName);
    const dest = join(SATORI_FONTS_DIR, destName);
    if (!existsSync(src)) {
      throw new Error(`Missing ${src}. Run: npm install @fontsource/inter`);
    }
    copyFileSync(src, dest);
    console.log(`  ${destName}`);
  }
  console.log('Satori fonts ready in data/satori/fonts/');
}

main();
