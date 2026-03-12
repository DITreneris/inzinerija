#!/usr/bin/env node
/**
 * Apply EN patch to modules-en-m4-m6.json for Module 4.
 * Patch file: array of { "path": "title" | "slides.N.field...", "value": "EN string" }
 * Path is relative to modules[0] (M4). E.g. "title", "slides.0.content.whyBenefit".
 *
 * Usage:
 *   node apply-en-patch-m4.mjs         → apply chunk1 only (default)
 *   node apply-en-patch-m4.mjs chunk1  → apply chunk1
 *   node apply-en-patch-m4.mjs chunk2  → apply chunk2 (slides ~16–30)
 *   node apply-en-patch-m4.mjs chunk3  → apply chunk3 (slides 30+ to M4 end: 63, 63.5, 63.7, 64, 65 … 66.99)
 *   node apply-en-patch-m4.mjs all     → apply chunk1 then chunk2 then chunk3
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');

const dataPath = join(dataDir, 'modules-en-m4-m6.json');
const chunkArg = process.argv[2] || 'chunk1';
const chunk1Path = join(root, 'scripts', 'patch-en-m4-chunk1.json');
const chunk2Path = join(root, 'scripts', 'patch-en-m4-chunk2.json');
const chunk3Path = join(root, 'scripts', 'patch-en-m4-chunk3.json');

const data = JSON.parse(readFileSync(dataPath, 'utf8'));
const patchFiles = (
  chunkArg === 'all' ? [chunk1Path, chunk2Path, chunk3Path] :
  chunkArg === 'chunk3' ? [chunk3Path] :
  chunkArg === 'chunk2' ? [chunk2Path] :
  [chunk1Path]
);
const patches = patchFiles.flatMap((p) => JSON.parse(readFileSync(p, 'utf8')));

const m4 = data.modules[0];
if (!m4 || m4.id !== 4) {
  console.error('Expected modules[0] to be module 4');
  process.exit(1);
}

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
for (const { path, value } of patches) {
  setByPath(m4, path, value);
  applied++;
}

writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
const allLabel = chunkArg === 'all' ? '(chunk1 + chunk2 + chunk3)' : `(${chunkArg})`;
console.log('Applied', applied, 'patches to', dataPath, allLabel);
