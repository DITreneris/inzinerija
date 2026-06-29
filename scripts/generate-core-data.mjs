#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');

function readJson(fileName) {
  return JSON.parse(readFileSync(join(dataDir, fileName), 'utf8'));
}

function writeJson(fileName, value) {
  writeFileSync(join(dataDir, fileName), `${JSON.stringify(value, null, 2)}\n`);
}

const modules = readJson('modules.json');
const glossary = readJson('glossary.json');
const tools = readJson('tools.json');
const toolsEn = readJson('tools-en.json');

/**
 * Build/runtime profiliai (Architektūra A): core 1–6 (viešas MVP) ir
 * korporatyvinis 1–9 (Duomenų analizės kelias, tier 9). Abu generuojami
 * iš full authoring SOT (modules.json / glossary.json / tools.json).
 */
const PROFILES = [
  { maxModuleId: 6, suffix: 'm1-m6' },
  { maxModuleId: 9, suffix: 'm1-m9' },
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

console.log('Core (1–6) and corporate (1–9) production data generated.');
