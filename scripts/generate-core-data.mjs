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
writeJson('modules-m1-m6.json', {
  ...modules,
  modules: modules.modules.filter((module) => module.id <= 6),
});

const glossary = readJson('glossary.json');
writeJson('glossary-m1-m6.json', {
  ...glossary,
  terms: glossary.terms.filter((term) => term.moduleId <= 6),
});

const tools = readJson('tools.json');
writeJson('tools-m1-m6.json', {
  ...tools,
  tools: tools.tools.filter((tool) => tool.moduleId <= 6),
});

const toolsEn = readJson('tools-en.json');
writeJson('tools-en-m1-m6.json', {
  ...toolsEn,
  tools: toolsEn.tools.filter((tool) => tool.moduleId <= 6),
});

writeJson('m9Characters-empty.json', { characters: [] });

console.log('Core production data generated.');
