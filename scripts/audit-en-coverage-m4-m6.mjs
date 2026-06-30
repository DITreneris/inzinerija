#!/usr/bin/env node
/**
 * EN coverage audit for M4–M6: slide ID parity + LT diacritics after merge simulation.
 * M4–6 EN overlay (modules-en-m4-m6.json) is a full overlay: every LT slide must have
 * a matching EN slide id, and the merged result must contain no leftover LT diacritics.
 * Usage: node scripts/audit-en-coverage-m4-m6.mjs
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { LT_DIACRITICS, collectStrings, simulateEnLocale } from './lib/audit-en-merge.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');

const LT = JSON.parse(readFileSync(join(dataDir, 'modules.json'), 'utf8'));
const EN = JSON.parse(readFileSync(join(dataDir, 'modules-en-m4-m6.json'), 'utf8'));

const MODULE_IDS = [4, 5, 6];
let hasError = false;

for (const id of MODULE_IDS) {
  const ltMod = LT.modules.find((m) => m.id === id);
  const enMod = EN.modules?.find((m) => m.id === id);
  const expectedIds = (ltMod?.slides ?? []).map((s) => s.id);
  const enIds = new Set((enMod?.slides ?? []).map((s) => s.id));
  const missing = expectedIds.filter((x) => !enIds.has(x));
  if (missing.length) {
    console.error(`M${id} missing EN slide stubs:`, missing.join(', '));
    hasError = true;
  } else {
    console.log(`M${id}: ${expectedIds.length} slides OK`);
  }
}

const merged = simulateEnLocale(LT, EN, MODULE_IDS);

for (const m of merged.modules) {
  const strings = collectStrings(m);
  const ltLeft = strings.filter((s) => LT_DIACRITICS.test(s.value));
  if (ltLeft.length) {
    console.error(`M${m.id} leftover LT diacritics in EN merge: ${ltLeft.length}`);
    ltLeft.slice(0, 10).forEach((s) => console.error(`  ${s.path}: ${s.value.slice(0, 80)}`));
    hasError = true;
  }
}

if (hasError) {
  console.error('\nEN coverage audit M4–M6: FAIL');
  process.exit(1);
}
console.log('\nEN coverage audit M4–M6: OK');
process.exit(0);
