#!/usr/bin/env node
/**
 * Footer length audit: "Toliau – skaidrė N" / "Next – slide N" ≤ 55 symbols (GOLDEN_STANDARD §3.6).
 * SOT: docs/development/FOOTER_NEXT_SLIDE_ANALIZE.md, UX_AUDIT_IMPLEMENTATION_PLAN.md Faze 2.3.
 * Usage: node scripts/audit-footer-length.mjs [path/to/modules.json]
 * Exit 0 = all ≤55, 1 = at least one over 55.
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataPath = process.argv[2] || join(root, 'src', 'data', 'modules.json');
const MAX_LEN = 55;

const data = JSON.parse(readFileSync(dataPath, 'utf8'));
let hasError = false;

const isNextSlideFooter = (f) =>
  typeof f === 'string' && (f.includes('Toliau – skaidrė') || f.includes('Next – slide'));

for (const mod of data.modules) {
  const slides = mod.slides || [];
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];
    const footer = s.content?.footer;
    if (!footer || !isNextSlideFooter(footer)) continue;
    const len = footer.length;
    if (len > MAX_LEN) {
      console.error(`M${mod.id} slide ${i + 1} id ${s.id} | ${len} chars (max ${MAX_LEN}): "${footer.slice(0, 60)}..."`);
      hasError = true;
    }
  }
}

if (hasError) {
  console.error('\nAudit FAIL: footer text should be ≤55 symbols (GOLDEN_STANDARD §3.6).');
  process.exit(1);
}
console.log(`Footer length audit: all ≤${MAX_LEN} chars OK`);
process.exit(0);
