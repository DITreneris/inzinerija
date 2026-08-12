#!/usr/bin/env node
/**
 * Tools data hygiene gate (fail-closed).
 * - Schema shape for full LT + EN SOT
 * - Exact name-set parity LT ↔ EN
 * - Alphabetical sort (localeCompare 'lt')
 * - moduleId 1–18
 * - Category allowlists (reject legacy typos)
 * - All four build profiles (m1-m6 / m9 / m12 / m15, LT + EN) ⊆ full SOT
 *   and respect max moduleId
 *
 * Exit 0 = OK, 1 = FAIL.
 */
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');

const LT_CATEGORIES = new Set([
  'DI turinio detektoriai',
  'Debesijos paleidimas',
  'Duomenų analizė',
  'Duomenų bazės',
  'Garsas',
  'Kodo saugykla',
  'Muzikos generavimas',
  'Planavimas',
  'Pokalbių DI',
  'Prezentacijos',
  'Produktyvumas',
  'RAG / išoriniai šaltiniai',
  'RAG / tyrimai',
  'Vaizdų generavimas',
  'Verslo automatizavimas',
  'Video generavimas',
  'Vizualas',
]);

const EN_CATEGORIES = new Set([
  'AI content detectors',
  'Audio',
  'Business automation',
  'Chat AI',
  'Cloud hosting',
  'Code repository',
  'Data analysis',
  'Databases',
  'Image generation',
  'Music generation',
  'Planning',
  'Presentations',
  'Productivity',
  'RAG / external sources',
  'RAG / research',
  'Video generation',
  'Visual design',
]);

const BANNED_CATEGORIES = new Set([
  'Vaizdo generavimas',
  'Automatizacija',
  'Automation',
]);

function loadJson(fileName) {
  return JSON.parse(readFileSync(join(dataDir, fileName), 'utf8'));
}

function checkSorted(tools, label, errors) {
  for (let i = 1; i < tools.length; i++) {
    if (tools[i - 1].name.localeCompare(tools[i].name, 'lt') > 0) {
      errors.push(`${label}: not sorted near "${tools[i - 1].name}" → "${tools[i].name}"`);
      return;
    }
  }
}

function checkModuleIds(tools, label, errors) {
  for (const t of tools) {
    if (!Number.isInteger(t.moduleId) || t.moduleId < 1 || t.moduleId > 18) {
      errors.push(`${label}: "${t.name}" has invalid moduleId ${t.moduleId}`);
    }
  }
}

function checkCategories(tools, label, allow, errors) {
  for (const t of tools) {
    const cat = t.category;
    if (cat == null || cat === '') continue;
    if (BANNED_CATEGORIES.has(cat)) {
      errors.push(`${label}: "${t.name}" banned category "${cat}"`);
      continue;
    }
    if (!allow.has(cat)) {
      errors.push(`${label}: "${t.name}" unknown category "${cat}"`);
    }
  }
}

function checkSchema(data, label, validate, errors) {
  if (!validate(data)) {
    for (const err of validate.errors || []) {
      errors.push(`${label} schema: ${err.instancePath || '/'}: ${err.message}`);
    }
  }
}

function checkParity(ltTools, enTools, errors) {
  const ltNames = new Set(ltTools.map((t) => t.name));
  const enNames = new Set(enTools.map((t) => t.name));
  for (const n of ltNames) {
    if (!enNames.has(n)) errors.push(`parity: missing in tools-en.json: "${n}"`);
  }
  for (const n of enNames) {
    if (!ltNames.has(n)) errors.push(`parity: missing in tools.json: "${n}"`);
  }
}

function checkProfile(profileFile, fullNames, maxModuleId, errors) {
  const data = loadJson(profileFile);
  const tools = data.tools || [];
  for (const t of tools) {
    if (!fullNames.has(t.name)) {
      errors.push(`${profileFile}: "${t.name}" not in full SOT`);
    }
    if (t.moduleId > maxModuleId) {
      errors.push(`${profileFile}: "${t.name}" moduleId ${t.moduleId} > ${maxModuleId}`);
    }
  }
}

/** @returns {boolean} true when all gates pass */
export function auditTools() {
  const errors = [];
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  const toolsSchema = JSON.parse(
    readFileSync(join(__dirname, 'schemas', 'tools.schema.json'), 'utf8')
  );
  const validate = ajv.compile(toolsSchema);

  const lt = loadJson('tools.json');
  const en = loadJson('tools-en.json');
  const ltTools = lt.tools || [];
  const enTools = en.tools || [];

  checkSchema(lt, 'tools.json', validate, errors);
  checkSchema(en, 'tools-en.json', validate, errors);
  checkParity(ltTools, enTools, errors);
  checkSorted(ltTools, 'tools.json', errors);
  checkSorted(enTools, 'tools-en.json', errors);
  checkModuleIds(ltTools, 'tools.json', errors);
  checkModuleIds(enTools, 'tools-en.json', errors);
  checkCategories(ltTools, 'tools.json', LT_CATEGORIES, errors);
  checkCategories(enTools, 'tools-en.json', EN_CATEGORIES, errors);

  const ltNames = new Set(ltTools.map((t) => t.name));
  const enNames = new Set(enTools.map((t) => t.name));
  checkProfile('tools-m1-m6.json', ltNames, 6, errors);
  checkProfile('tools-m1-m9.json', ltNames, 9, errors);
  checkProfile('tools-m1-m12.json', ltNames, 12, errors);
  checkProfile('tools-m1-m15.json', ltNames, 15, errors);
  checkProfile('tools-en-m1-m6.json', enNames, 6, errors);
  checkProfile('tools-en-m1-m9.json', enNames, 9, errors);
  checkProfile('tools-en-m1-m12.json', enNames, 12, errors);
  checkProfile('tools-en-m1-m15.json', enNames, 15, errors);

  if (errors.length) {
    console.error('audit:tools FAILED:\n');
    for (const e of errors) console.error(`  ${e}`);
    return false;
  }
  console.log('audit:tools: OK');
  console.log(`  tools.json / tools-en.json: ${ltTools.length} names (parity + sort + categories)`);
  return true;
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === join(process.argv[1]);
// Windows: argv paths may differ by separators — compare basename
const ranDirectly =
  typeof process.argv[1] === 'string' && process.argv[1].replace(/\\/g, '/').endsWith('/audit-tools.mjs');

if (ranDirectly || isMain) {
  if (!auditTools()) process.exit(1);
}
