#!/usr/bin/env node
/**
 * Footer numbers audit: "Toliau – skaidrė N" must match next slide's 1-based position.
 * SOT: .cursor/rules/footer-slide-numbers.mdc, GOLDEN_STANDARD §3.6.
 * Usage: node scripts/audit-footer-numbers.mjs [--modules=1,2,3,4,5,6]
 *        Or: AUDIT_MODULES=1,2,3,4,5,6 node scripts/audit-footer-numbers.mjs
 * Exit 0 = all OK, 1 = at least one mismatch.
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataPath = join(root, 'src', 'data', 'modules.json');

const argModules = process.argv.find((a) => a.startsWith('--modules='));
const envModules = process.env.AUDIT_MODULES;
const filterList = (argModules?.split('=')[1] || envModules || '')
  .split(',')
  .map((s) => parseInt(s.trim(), 10))
  .filter((n) => !Number.isNaN(n));

const data = JSON.parse(readFileSync(dataPath, 'utf8'));
let hasError = false;

for (const mod of data.modules) {
  if (filterList.length > 0 && !filterList.includes(mod.id)) continue;
  const slides = mod.slides;
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];
    const footer = s.content?.footer;
    if (!footer || !footer.includes('Toliau – skaidrė')) continue;
    const nextPos = i + 2; // next slide's 1-based position
    const nextSlide = slides[i + 1];
    const nextTitle = nextSlide ? nextSlide.title : '(paskutinė)';
    const match = footer.match(/skaidrė (\d+):\s*(.+)/);
    if (!match) continue;
    const num = parseInt(match[1], 10);
    if (num !== nextPos) {
      console.error(
        `M${mod.id} pos ${i + 1} id ${s.id} | expected "${nextPos}: ${nextTitle.slice(0, 45)}..." got "${num}: ${match[2].slice(0, 45)}..."`
      );
      hasError = true;
    }
  }
}

if (hasError) {
  console.error('\nAudit FAIL: footer N must equal next slide 1-based position.');
  process.exit(1);
}
console.log('Footer numbers audit: OK');
process.exit(0);
