#!/usr/bin/env node
/**
 * CE-4: sot_index.json validacija.
 * Tikrina: 6 moduliai, contentSOT/dataSOT keliai egzistuoja.
 * Paleisti iš repo root: node scripts/validate-sot-index.mjs
 * Exit 0 = OK, 1 = klaida.
 */
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const sotIndexPath = join(root, 'docs', 'development', 'context-engineering', 'sot_index.json');

function loadJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (e) {
    console.error(`Nepavyko skaityti ${path}:`, e.message);
    process.exit(1);
  }
}

function checkPath(relPath, label) {
  const abs = join(root, relPath);
  if (!existsSync(abs)) {
    console.error(`CE-4: Kelias neegzistuoja: ${relPath} (${label})`);
    return false;
  }
  return true;
}

const index = loadJson(sotIndexPath);
let ok = true;

if (!index.modules || !Array.isArray(index.modules)) {
  console.error('CE-4: sot_index.json turi turėti "modules" masyvą.');
  process.exit(1);
}

const expectedModuleCount = 15;
if (index.modules.length < 6 || index.modules.length > expectedModuleCount) {
  console.error(`CE-4: Tikėtina 6–${expectedModuleCount} moduliai, rasta: ${index.modules.length}`);
  ok = false;
}

const ids = new Set(index.modules.map((m) => m.id));
for (let i = 1; i <= Math.min(expectedModuleCount, index.modules.length); i++) {
  if (!ids.has(i)) {
    console.error(`CE-4: Trūksta modulio id: ${i}`);
    ok = false;
  }
}

index.modules.forEach((m) => {
  if (m.sotPath && !checkPath(m.sotPath, `modulio ${m.id} sotPath`)) ok = false;
});

if (index.contentSOT) {
  Object.entries(index.contentSOT).forEach(([key, val]) => {
    if (val?.path && !checkPath(val.path, `contentSOT.${key}`)) ok = false;
  });
}

if (index.dataSOT) {
  Object.entries(index.dataSOT).forEach(([key, val]) => {
    const path = typeof val === 'string' ? val : val?.path;
    if (path && !checkPath(path, `dataSOT.${key}`)) ok = false;
  });
}

if (!ok) process.exit(1);
console.log(`CE-4: sot_index.json validus (${index.modules.length} moduliai, keliai egzistuoja).`);
