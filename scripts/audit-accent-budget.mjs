#!/usr/bin/env node
/**
 * Accent budget audit (GOLDEN_STANDARD §2.2 / §3.2):
 * - content-block: at most 2 sections with blockVariant "accent" (Trumpai + Patikra)
 * - "Daryk dabar" / "Do this now" / "Do now" must be brand, not accent
 *
 * Usage:
 *   node scripts/audit-accent-budget.mjs
 *   node scripts/audit-accent-budget.mjs --modules=10,11,12
 * Exit 1 on violations.
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const args = process.argv.slice(2);
const modulesArg = args.find((a) => a.startsWith('--modules='));
const moduleFilter = modulesArg
  ? modulesArg
      .slice('--modules='.length)
      .split(',')
      .map((n) => Number(n.trim()))
      .filter((n) => !Number.isNaN(n))
  : null;

const paths = [
  join(root, 'src', 'data', 'modules.json'),
  join(root, 'src', 'data', 'modules-en-m4-m6.json'),
  join(root, 'src', 'data', 'modules-en-m7-m9.json'),
  join(root, 'src', 'data', 'modules-en-m10-m12.json'),
  join(root, 'src', 'data', 'modules-en-m13-m15.json'),
];

const DARYK_RE = /^(daryk dabar|do this now|do now)$/i;
const CONTENT_TYPES = new Set([
  'content-block',
  'evaluator-prompt-block',
]);

let failed = false;

for (const path of paths) {
  const data = JSON.parse(readFileSync(path, 'utf8'));
  const label = path.includes('modules-en-') ? 'EN' : 'LT';
  for (const mod of data.modules || []) {
    if (moduleFilter && !moduleFilter.includes(mod.id)) continue;
    for (const slide of mod.slides || []) {
      if (!CONTENT_TYPES.has(slide.type)) continue;
      const sections = slide.content?.sections || [];
      const accents = sections.filter((s) => s.blockVariant === 'accent');
      if (accents.length > 2) {
        failed = true;
        console.error(
          `${label} M${mod.id} slide ${slide.id}: ${accents.length} accent sections (max 2): ${accents.map((a) => a.heading).join(' | ')}`
        );
      }
      for (const sec of sections) {
        const h = (sec.heading || '').trim();
        if (DARYK_RE.test(h) && sec.blockVariant === 'accent') {
          failed = true;
          console.error(
            `${label} M${mod.id} slide ${slide.id}: "${h}" must be brand, found accent`
          );
        }
      }
    }
  }
}

if (failed) {
  console.error('\nAccent budget audit FAIL (GOLDEN §3.2).');
  process.exit(1);
}
console.log(
  `Accent budget audit OK${moduleFilter ? ` (modules ${moduleFilter.join(',')})` : ''}`
);
process.exit(0);
