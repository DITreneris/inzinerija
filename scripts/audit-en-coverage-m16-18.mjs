#!/usr/bin/env node
/**
 * EN coverage audit for M16–18: slide ID parity LT ↔ EN overlay.
 * (Body diacritics / full language → audit-en-language-m16-18.mjs)
 */
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');
const MODULE_IDS = [16, 17, 18];

const LT = JSON.parse(readFileSync(join(dataDir, 'modules.json'), 'utf8'));
const enPath = join(dataDir, 'modules-en-m16-m18.json');
if (!existsSync(enPath)) {
  console.error('modules-en-m16-m18.json not found');
  process.exit(1);
}
const EN = JSON.parse(readFileSync(enPath, 'utf8'));

let hasError = false;
for (const id of MODULE_IDS) {
  const ltMod = LT.modules.find((m) => m.id === id);
  const enMod = EN.modules?.find((m) => m.id === id);
  if (!ltMod) {
    console.error(`M${id} missing in modules.json`);
    hasError = true;
    continue;
  }
  if (!enMod) {
    console.error(`M${id} missing in modules-en-m16-m18.json`);
    hasError = true;
    continue;
  }
  const ltIds = new Set((ltMod.slides || []).map((s) => s.id));
  const enIds = new Set((enMod.slides || []).map((s) => s.id));
  const missing = [...ltIds].filter((x) => !enIds.has(x));
  const extra = [...enIds].filter((x) => !ltIds.has(x));
  if (missing.length) {
    console.error(`M${id} missing EN slide stubs:`, missing.join(', '));
    hasError = true;
  }
  if (extra.length) {
    console.error(`M${id} EN-only slide ids:`, extra.join(', '));
    hasError = true;
  }
  if (!missing.length && !extra.length) {
    console.log(`M${id} OK (${ltIds.size} slides)`);
  }
}

if (hasError) {
  console.error('\nEN coverage audit M16–18: FAIL');
  process.exit(1);
}
console.log('EN coverage audit M16–18: OK');
process.exit(0);
