#!/usr/bin/env node
/**
 * EN coverage audit for M7–M9: slide ID parity + LT diacritics after merge simulation.
 * Usage: node scripts/audit-en-coverage-m7-m9.mjs [--full]
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  getBuildSlideIds,
  LEAN_M7_SLIDE_IDS,
  LEAN_M8_SLIDE_IDS,
  LEAN_M9_SLIDE_IDS,
  EXPANSION_M7_SLIDE_IDS,
  EXPANSION_M9_SLIDE_IDS,
} from './m7-m9-en-manifest.mjs';
import {
  LT_DIACRITICS,
  collectStrings,
  simulateEnLocale,
} from './lib/audit-en-merge.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');

const fullMode = process.argv.includes('--full');
const buildIds = getBuildSlideIds(fullMode);

const LT = JSON.parse(readFileSync(join(dataDir, 'modules.json'), 'utf8'));
const EN = JSON.parse(readFileSync(join(dataDir, 'modules-en-m7-m9.json'), 'utf8'));

let hasError = false;

console.log(`Mode: ${fullMode ? 'full (phase 6)' : 'lean + expansion'}`);

for (const id of [7, 8, 9]) {
  const enMod = EN.modules?.find((m) => m.id === id);
  const expectedIds = buildIds[id];
  const enIds = new Set((enMod?.slides ?? []).map((s) => s.id));
  const missing = expectedIds.filter((x) => !enIds.has(x));
  if (missing.length) {
    console.error(`M${id} missing EN slide stubs:`, missing.join(', '));
    hasError = true;
  } else {
    console.log(`M${id}: ${expectedIds.length} slides OK`);
  }
}

const merged = simulateEnLocale(LT, EN, [7, 8, 9]);

for (const m of merged.modules) {
  const slideIds = buildIds[m.id];
  const filtered = {
    ...m,
    slides: m.slides.filter((s) => slideIds.includes(s.id)),
  };
  const strings = collectStrings(filtered);
  const ltLeft = strings.filter((s) => LT_DIACRITICS.test(s.value));
  if (ltLeft.length) {
    console.error(`M${m.id}: ${ltLeft.length} strings still contain LT diacritics (sample):`);
    ltLeft.slice(0, 5).forEach((s) => console.error(`  ${s.path}: ${s.value.slice(0, 60)}...`));
    hasError = true;
  }
}

if (!fullMode) {
  console.log('Lean sets:', {
    M7: LEAN_M7_SLIDE_IDS.length,
    M8: LEAN_M8_SLIDE_IDS.length,
    M9: LEAN_M9_SLIDE_IDS.length,
    expansionM7: EXPANSION_M7_SLIDE_IDS.length,
    expansionM9: EXPANSION_M9_SLIDE_IDS.length,
  });
}

if (hasError) {
  console.error('\nEN coverage audit M7–M9: FAIL');
  process.exit(1);
}
console.log('\nEN coverage audit M7–M9: OK');
process.exit(0);
