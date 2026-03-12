#!/usr/bin/env node
/**
 * One-off: extract modules 4, 5, 6 from modules.json into modules-en-m4-m6.json.
 * Structure: { "modules": [ modul4, modul5, modul6 ] } for EN loader merge.
 * LT content as placeholder until Block 1–5 translations.
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');

const modulesPath = join(dataDir, 'modules.json');
const outPath = join(dataDir, 'modules-en-m4-m6.json');

const raw = JSON.parse(readFileSync(modulesPath, 'utf8'));
if (!Array.isArray(raw.modules) || raw.modules.length < 6) {
  console.error('modules.json must have at least 6 modules');
  process.exit(1);
}

const m4 = raw.modules[3];
const m5 = raw.modules[4];
const m6 = raw.modules[5];

if (m4?.id !== 4 || m5?.id !== 5 || m6?.id !== 6) {
  console.error('Expected modules[3].id=4, [4].id=5, [5].id=6');
  process.exit(1);
}

const output = { modules: [m4, m5, m6] };
writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
console.log('Written:', outPath);
