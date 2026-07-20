#!/usr/bin/env node
/**
 * Slide title quality audit (PAPRASTOS_KALBOS_GAIRES §2a):
 * - No editorial meta in titles: Skyrius:, Prieš MN, bilietas
 * - No (neprivaloma)/(optional) in titles – use optional: true + UI badge
 * - No HITL / Spec / CopyButton in title or subtitle
 * - LT titles: no bare "workflow" (use darbo eiga)
 * - WARN: title length > 55 without shortTitle
 *
 * Usage:
 *   node scripts/audit-slide-titles.mjs
 *   node scripts/audit-slide-titles.mjs --modules=10,11,12
 * Exit 1 on FAIL violations (WARN does not fail).
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

const LT_PATH = join(root, 'src', 'data', 'modules.json');
const EN_PATHS = [
  join(root, 'src', 'data', 'modules-en.json'),
  join(root, 'src', 'data', 'modules-en-m4-m6.json'),
  join(root, 'src', 'data', 'modules-en-m7-m9.json'),
  join(root, 'src', 'data', 'modules-en-m10-m12.json'),
  join(root, 'src', 'data', 'modules-en-m13-m15.json'),
];

const TITLE_FAIL_PATTERNS = [
  { rule: 'skyrius_prefix', re: /^Skyrius:\s*/i },
  { rule: 'neprivaloma_parens', re: /\(neprivaloma\)/i },
  { rule: 'optional_parens', re: /\(optional\)/i },
  { rule: 'bilietas', re: /\bbiliet/i },
  { rule: 'pries_module', re: /^Prieš M\d/i },
  { rule: 'workflow_in_lt_title', re: /\bworkflow\b/i, ltOnly: true },
];

const TITLE_OR_SUB_FAIL = [
  { rule: 'hitl', re: /\bHITL\b/ },
  { rule: 'spec_jargon', re: /\bSpec\b/ },
  { rule: 'copybutton', re: /\bCopyButton\b/ },
];

let failed = false;
let warnCount = 0;

function auditFile(path, label, { checkWorkflow = false } = {}) {
  let data;
  try {
    data = JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return;
  }
  for (const mod of data.modules || []) {
    if (moduleFilter && !moduleFilter.includes(mod.id)) continue;
    for (const slide of mod.slides || []) {
      const title = slide.title || '';
      const subtitle = slide.subtitle || '';
      const loc = `${label} M${mod.id} slide ${slide.id}`;

      for (const { rule, re, ltOnly } of TITLE_FAIL_PATTERNS) {
        if (ltOnly && !checkWorkflow) continue;
        if (re.test(title)) {
          failed = true;
          console.error(`${loc}: FAIL ${rule} in title: "${title}"`);
        }
      }

      for (const { rule, re } of TITLE_OR_SUB_FAIL) {
        if (re.test(title) || re.test(subtitle)) {
          failed = true;
          console.error(
            `${loc}: FAIL ${rule} in title/subtitle: "${title}" | "${subtitle}"`
          );
        }
      }

      if (title.length > 55 && !slide.shortTitle) {
        warnCount += 1;
        console.warn(
          `${loc}: WARN title length ${title.length} (>55) without shortTitle: "${title}"`
        );
      }
    }
  }
}

auditFile(LT_PATH, 'LT', { checkWorkflow: true });
for (const p of EN_PATHS) {
  const label = p.includes('m10-m12')
    ? 'EN-m1012'
    : p.includes('m7-m9')
      ? 'EN-m79'
      : p.includes('m4-m6')
        ? 'EN-m46'
        : p.includes('m13')
          ? 'EN-m1315'
          : 'EN';
  auditFile(p, label, { checkWorkflow: false });
}

if (warnCount > 0) {
  console.warn(`\nSlide title audit: ${warnCount} length warning(s).`);
}

if (failed) {
  console.error('\nSlide title audit FAIL (PAPRASTOS_KALBOS §2a).');
  process.exit(1);
}

console.log(
  `Slide title audit OK${moduleFilter ? ` (modules ${moduleFilter.join(',')})` : ''}${warnCount ? ` (${warnCount} length warn)` : ''}`
);
process.exit(0);
