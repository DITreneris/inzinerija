#!/usr/bin/env node
/**
 * EN language gate for M16–18:
 * 1) Transfer chrome (M16–18): abilityBefore/After, firstAction24h, ownWork*, module.transfer
 *    – LT diacritics + bare DI (should be AI)
 * 2) M16–M18 slide body: LT diacritics walk on merged EN learner strings
 *
 * Usage: node scripts/audit-en-language-m16-18.mjs [--json]
 */
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { LT_DIACRITICS, collectStrings, simulateEnLocale } from './lib/audit-en-merge.mjs';
import { shouldSkipPath } from './lib/m79-language-rules.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');
const MODULE_IDS = [16, 17, 18];
const BODY_MODULE_IDS = [16, 17, 18];
const TRANSFER_KEYS = [
  'abilityBefore',
  'abilityAfter',
  'firstAction24h',
  'nextStepCTA',
  'ownWorkTemplate',
  'ownWorkLabel',
  'ownWorkPlaceholder',
];

const jsonMode = process.argv.includes('--json');

const LT = JSON.parse(readFileSync(join(dataDir, 'modules.json'), 'utf8'));
const enPath = join(dataDir, 'modules-en-m16-m18.json');
if (!existsSync(enPath)) {
  console.error('modules-en-m16-m18.json not found');
  process.exit(1);
}
const EN = JSON.parse(readFileSync(enPath, 'utf8'));
const merged = simulateEnLocale(LT, EN, MODULE_IDS);

const findings = [];

for (const m of merged.modules) {
  checkTransfer(m.transfer, `M${m.id}.transfer`, m.id, null);
  for (const slide of m.slides || []) {
    if (slide.type === 'summary' || slide.type === 'practice-summary') {
      const c = slide.content || {};
      for (const key of TRANSFER_KEYS) {
        if (typeof c[key] === 'string') {
          checkTransferString(c[key], `M${m.id} slide ${slide.id}.${key}`, m.id, slide.id);
        }
      }
    }
    if (BODY_MODULE_IDS.includes(m.id)) {
      auditM16BodySlide(m.id, slide);
    }
  }
}

function checkTransfer(obj, path, moduleId, slideId) {
  if (!obj || typeof obj !== 'object') return;
  for (const key of TRANSFER_KEYS) {
    if (typeof obj[key] === 'string') {
      checkTransferString(obj[key], `${path}.${key}`, moduleId, slideId);
    }
  }
}

function checkTransferString(value, path, moduleId, slideId) {
  if (LT_DIACRITICS.test(value)) {
    findings.push({
      rule: 'lt_diacritics_in_en_transfer',
      moduleId,
      slideId,
      path,
      snippet: value.slice(0, 80),
    });
  }
  if (/\bDI\b/.test(value) && !/\bDI\b.*\bAI\b/.test(value)) {
    findings.push({
      rule: 'di_token_in_en_transfer',
      moduleId,
      slideId,
      path,
      snippet: value.slice(0, 80),
    });
  }
}

function auditM16BodySlide(moduleId, slide) {
  const strings = collectStrings(slide, `slides[${slide.id}]`);
  for (const { path, value } of strings) {
    if (typeof value !== 'string' || !value.trim()) continue;
    if (shouldSkipPath(path)) continue;
    if (LT_DIACRITICS.test(value)) {
      findings.push({
        rule: 'en_lt_diacritics_m1618_body',
        moduleId,
        slideId: slide.id,
        path,
        snippet: value.slice(0, 80),
      });
    }
  }
}

if (jsonMode) {
  console.log(JSON.stringify({ total: findings.length, findings }, null, 2));
  process.exit(0);
}

if (findings.length) {
  console.error('EN language audit M16–18: FAIL');
  const byRule = findings.reduce((acc, f) => {
    acc[f.rule] = (acc[f.rule] || 0) + 1;
    return acc;
  }, {});
  console.error('  by rule:', byRule);
  for (const f of findings.slice(0, 40)) {
    console.error(`  ${f.rule} ${f.path}: ${f.snippet}`);
  }
  if (findings.length > 40) {
    console.error(`  ... and ${findings.length - 40} more`);
  }
  process.exit(1);
}

console.log('EN language audit M16–18: OK (transfer + M16–18 body diacritics)');
process.exit(0);
