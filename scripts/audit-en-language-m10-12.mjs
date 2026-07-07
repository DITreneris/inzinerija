#!/usr/bin/env node
/**
 * EN/LT language audit for M10–M12: hybrid tokens, LT remnants, DI/AI terminology,
 * LT tu-form and M10–12 agent-path English relics.
 * Usage:
 *   node scripts/audit-en-language-m10-12.mjs [--json] [--summary]
 * Exit 1 if violations remain (minus allowlist).
 */
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { simulateEnLocale } from './lib/audit-en-merge.mjs';
import { auditMergedModuleEn, auditLtModules } from './lib/m1012-language-rules.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');
const allowlistPath = join(__dirname, 'fixtures', 'm1012-en-language-allowlist.json');

const jsonMode = process.argv.includes('--json');
const summaryMode = process.argv.includes('--summary') || !jsonMode;

const LT = JSON.parse(readFileSync(join(dataDir, 'modules.json'), 'utf8'));
const enPath = join(dataDir, 'modules-en-m10-m12.json');
if (!existsSync(enPath)) {
  console.error('modules-en-m10-m12.json not found');
  process.exit(1);
}
const EN = JSON.parse(readFileSync(enPath, 'utf8'));

const allowlist = existsSync(allowlistPath)
  ? JSON.parse(readFileSync(allowlistPath, 'utf8'))
  : [];

const merged = simulateEnLocale(LT, EN, [10, 11, 12]);
const enFindings = [];
for (const m of merged.modules) {
  enFindings.push(...auditMergedModuleEn(m, undefined, allowlist));
}
const ltFindings = auditLtModules(LT, [10, 11, 12], allowlist);

const allFindings = [...enFindings, ...ltFindings];

if (jsonMode) {
  console.log(JSON.stringify({ counts: countByRule(allFindings), findings: allFindings }, null, 2));
} else if (summaryMode) {
  console.log('Violations by rule:', countByRule(allFindings));
  console.log(`Total: ${allFindings.length} (allowlist entries: ${allowlist.length})`);
  const bySlide = groupBySlide(enFindings);
  for (const [key, items] of Object.entries(bySlide).slice(0, 15)) {
    console.log(`  ${key}: ${items.length} (${items[0]?.rule})`);
  }
  if (Object.keys(bySlide).length > 15) {
    console.log(`  ... and ${Object.keys(bySlide).length - 15} more EN slide groups`);
  }
  if (ltFindings.length) {
    console.log('LT findings:', ltFindings.length);
    ltFindings.slice(0, 10).forEach((f) => console.log(`  ${f.rule} ${f.path}: ${f.snippet}`));
  }
}

if (allFindings.length > 0) {
  if (!jsonMode) console.error('\nEN/LT language audit M10–M12: FAIL');
  process.exit(jsonMode ? 0 : 1);
}
if (!jsonMode) console.log('\nEN/LT language audit M10–M12: OK');
process.exit(0);

function countByRule(findings) {
  return findings.reduce((acc, f) => {
    acc[f.rule] = (acc[f.rule] || 0) + 1;
    return acc;
  }, {});
}

function groupBySlide(findings) {
  return findings.reduce((acc, f) => {
    const key = `M${f.moduleId}:${f.slideId}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(f);
    return acc;
  }, {});
}
