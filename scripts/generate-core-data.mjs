#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');

/**
 * `--check` neperrašo failų: regeneruoja į atmintį ir lygina su tuo, kas repo.
 * Skirta CI vartams – pagauna ranka redaguotą build profilį arba užmirštą
 * `npm run generate:core-data` po authoring SOT keitimo.
 */
const checkOnly = new Set(process.argv.slice(2)).has('--check');
const drift = [];
let emitted = 0;

function readJson(fileName) {
  return JSON.parse(readFileSync(join(dataDir, fileName), 'utf8'));
}

/**
 * Lyginam turinį, ne baitus: lint-staged po generavimo praleidžia `src/data/*.json`
 * per prettier, kuris trumpus masyvus suglaudina į vieną eilutę, o
 * `JSON.stringify(…, 2)` visada išskleidžia. Baitų palyginimas dėl to niekada
 * nepraeitų; kanoninis JSON pagauna realų drift (ranka pakeistas turinys,
 * nepaleistas `generate:core-data`, perrikiuoti raktai).
 */
function canonical(value) {
  return JSON.stringify(value);
}

function writeJson(fileName, value) {
  const target = join(dataDir, fileName);
  emitted += 1;

  if (!checkOnly) {
    writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
    return;
  }

  let current;
  try {
    current = JSON.parse(readFileSync(target, 'utf8'));
  } catch {
    drift.push(`${fileName}: nėra failo arba netinkamas JSON`);
    return;
  }
  if (canonical(current) !== canonical(value)) {
    drift.push(`${fileName}: nesutampa su authoring SOT`);
  }
}

const modules = readJson('modules.json');
const glossary = readJson('glossary.json');
const tools = readJson('tools.json');
const toolsEn = readJson('tools-en.json');

/**
 * Build/runtime profiliai (Architektūra A): core 1–6 (viešas MVP),
 * korporatyvinis 1–9 (Duomenų analizės kelias, tier 9),
 * korporatyvinis 1–12 (Agentų kelias, tier 12) ir
 * korporatyvinis 1–15 (Turinio kelias, tier 15). Generuojami iš full
 * authoring SOT (modules.json / glossary.json / tools.json).
 */
const PROFILES = [
  { maxModuleId: 6, suffix: 'm1-m6' },
  { maxModuleId: 9, suffix: 'm1-m9' },
  { maxModuleId: 12, suffix: 'm1-m12' },
  { maxModuleId: 15, suffix: 'm1-m15' },
];

for (const { maxModuleId, suffix } of PROFILES) {
  writeJson(`modules-${suffix}.json`, {
    ...modules,
    modules: modules.modules.filter((module) => module.id <= maxModuleId),
  });
  writeJson(`glossary-${suffix}.json`, {
    ...glossary,
    terms: glossary.terms.filter((term) => term.moduleId <= maxModuleId),
  });
  writeJson(`tools-${suffix}.json`, {
    ...tools,
    tools: tools.tools.filter((tool) => tool.moduleId <= maxModuleId),
  });
  writeJson(`tools-en-${suffix}.json`, {
    ...toolsEn,
    tools: toolsEn.tools.filter((tool) => tool.moduleId <= maxModuleId),
  });
}

writeJson('m9Characters-empty.json', { characters: [] });

if (checkOnly) {
  if (drift.length) {
    console.error('generate:core-data --check FAILED:\n');
    for (const item of drift) console.error(`  ${item}`);
    console.error(
      '\nBuild profiliai generuojami, ne redaguojami ranka.' +
        '\nPaleisk `npm run generate:core-data` ir commit\u2019ink rezultatą.'
    );
    process.exit(1);
  }
  console.log(
    `generate:core-data --check: OK (${emitted} generuoti failai sutampa su authoring SOT)`
  );
} else {
  console.log(
    'Core (1–6), corporate (1–9), corporate12 (1–12), and corporate15 (1–15) production data generated.'
  );
}
