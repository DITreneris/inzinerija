#!/usr/bin/env node
/**
 * EN language gate for M16–18 transfer chrome (CompleteScreen / TransferAbilityStrip).
 * Checks merged EN abilityBefore/After, firstAction24h, ownWork*, module.transfer for:
 * - LT diacritics leftovers
 * - DI used where EN should say AI
 *
 * Full body EN language sweep stays soft/future (overlay still partial).
 * Usage: node scripts/audit-en-language-m16-18.mjs [--json]
 */
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { LT_DIACRITICS, simulateEnLocale } from './lib/audit-en-merge.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');
const MODULE_IDS = [16, 17, 18];
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
  checkBag(m.transfer, `M${m.id}.transfer`, m.id, null);
  for (const slide of m.slides || []) {
    if (slide.type !== 'summary' && slide.type !== 'practice-summary') continue;
    const c = slide.content || {};
    for (const key of TRANSFER_KEYS) {
      if (typeof c[key] === 'string') {
        checkString(c[key], `M${m.id} slide ${slide.id}.${key}`, m.id, slide.id);
      }
    }
  }
}

function checkBag(obj, path, moduleId, slideId) {
  if (!obj || typeof obj !== 'object') return;
  for (const key of TRANSFER_KEYS) {
    if (typeof obj[key] === 'string') {
      checkString(obj[key], `${path}.${key}`, moduleId, slideId);
    }
  }
}

function checkString(value, path, moduleId, slideId) {
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
    // EN learner chrome should use AI (not Lithuanian DI abbreviation)
    findings.push({
      rule: 'di_token_in_en_transfer',
      moduleId,
      slideId,
      path,
      snippet: value.slice(0, 80),
    });
  }
}

if (jsonMode) {
  console.log(JSON.stringify({ total: findings.length, findings }, null, 2));
  process.exit(0);
}

if (findings.length) {
  console.error('EN transfer-chrome language audit M16–18: FAIL');
  for (const f of findings) {
    console.error(`  ${f.rule} ${f.path}: ${f.snippet}`);
  }
  process.exit(1);
}

console.log('EN transfer-chrome language audit M16–18: OK');
process.exit(0);
