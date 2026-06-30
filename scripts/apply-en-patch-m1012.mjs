#!/usr/bin/env node
/**
 * Apply EN patch to modules-en-m10-m12.json.
 * Patch: array of { "moduleIndex": 0|1|2, "path": "slides.N.field...", "value": "EN string" }
 * Or legacy { "path", "value" } with moduleIndex default 0.
 *
 * Usage: node scripts/apply-en-patch-m1012.mjs [chunk0|chunk1|...|all]
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');
const dataPath = join(dataDir, 'modules-en-m10-m12.json');

const chunkArg = process.argv[2] || 'all';
const chunkFiles = {
  chunk0: ['patch-en-m1012-chunk0-m11.json'],
  chunk1: ['patch-en-m1012-chunk1-m10a.json'],
  chunk2: ['patch-en-m1012-chunk2-m10b.json'],
  chunk3: ['patch-en-m1012-chunk3-m10c.json'],
  chunk4: ['patch-en-m1012-chunk4-m12.json'],
  all: [
    'patch-en-m1012-chunk0-m11.json',
    'patch-en-m1012-chunk1-m10a.json',
    'patch-en-m1012-chunk2-m10b.json',
    'patch-en-m1012-chunk3-m10c.json',
    'patch-en-m1012-chunk4-m12.json',
  ],
};

const files = chunkFiles[chunkArg] ?? chunkFiles.all;
const data = JSON.parse(readFileSync(dataPath, 'utf8'));

function setByPath(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const nextKey = parts[i + 1];
    const isArrayIndex = /^\d+$/.test(nextKey);
    if (current[key] == null) {
      current[key] = isArrayIndex ? [] : {};
    }
    current = current[key];
  }
  current[parts[parts.length - 1]] = value;
}

let applied = 0;
for (const file of files) {
  const patchPath = join(root, 'scripts', file);
  let patches;
  try {
    patches = JSON.parse(readFileSync(patchPath, 'utf8'));
  } catch {
    console.warn('Skip missing patch:', file);
    continue;
  }
  for (const entry of patches) {
    const modIdx = entry.moduleIndex ?? 0;
    const mod = data.modules[modIdx];
    if (!mod) {
      console.error('Invalid moduleIndex', modIdx);
      process.exit(1);
    }
    setByPath(mod, entry.path, entry.value);
    applied++;
  }
}

writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Applied', applied, 'patches to', dataPath, `(${chunkArg})`);
