#!/usr/bin/env node
/**
 * Extract modules 10, 11, 12 from modules.json into modules-en-m10-m12-scaffold.json.
 * LT content as placeholder until translated in modules-en-m10-m12.json.
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');

const modulesPath = join(dataDir, 'modules.json');
const outPath = join(dataDir, 'modules-en-m10-m12-scaffold.json');

const raw = JSON.parse(readFileSync(modulesPath, 'utf8'));
const ids = [10, 11, 12];
const modules = ids.map((id) => {
  const m = raw.modules.find((x) => x.id === id);
  if (!m) {
    console.error(`Module ${id} not found`);
    process.exit(1);
  }
  return m;
});

writeFileSync(outPath, JSON.stringify({ modules }, null, 2), 'utf8');
console.log('Written:', outPath, `(${modules.map((m) => `M${m.id}:${m.slides.length}`).join(', ')})`);
