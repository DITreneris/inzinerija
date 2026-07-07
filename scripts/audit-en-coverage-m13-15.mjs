#!/usr/bin/env node
/**
 * EN coverage audit for M13–15: slide ID parity + LT diacritics after merge simulation.
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  LT_DIACRITICS,
  collectStrings,
  simulateEnLocale,
} from './lib/audit-en-merge.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');

const LT = JSON.parse(readFileSync(join(dataDir, 'modules.json'), 'utf8'));
const EN = JSON.parse(readFileSync(join(dataDir, 'modules-en-m13-m15.json'), 'utf8'));

let hasError = false;
for (const id of [13, 14, 15]) {
  const ltMod = LT.modules.find((m) => m.id === id);
  const enMod = EN.modules?.find((m) => m.id === id);
  const ltIds = new Set(ltMod.slides.map((s) => s.id));
  const enIds = new Set((enMod?.slides ?? []).map((s) => s.id));
  const missing = [...ltIds].filter((x) => !enIds.has(x));
  if (missing.length) {
    console.error(`M${id} missing EN slide stubs:`, missing.join(', '));
    hasError = true;
  }
}

const merged = simulateEnLocale(LT, EN, [13, 14, 15]);

for (const m of merged.modules) {
  const strings = collectStrings(m);
  const ltLeft = strings.filter((s) => LT_DIACRITICS.test(s.value));
  if (ltLeft.length) {
    console.error(`M${m.id}: ${ltLeft.length} strings still contain LT diacritics (sample):`);
    ltLeft.slice(0, 5).forEach((s) => console.error(`  ${s.path}: ${s.value.slice(0, 60)}...`));
    hasError = true;
  }
}

if (hasError) {
  console.error('\nEN coverage audit M13–15: FAIL');
  process.exit(1);
}
console.log('EN coverage audit M13–15: OK');
process.exit(0);
