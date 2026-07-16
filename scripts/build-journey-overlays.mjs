#!/usr/bin/env node
/**
 * Builder: merge Tier 2 (+ remaining) + path-step into journey overlays.
 * Run: node scripts/generate-journey-en-tier1.mjs && node scripts/build-journey-overlays.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const ltPath = join(root, 'src', 'data', 'modules-journey-m7.json');
const enPath = join(root, 'src', 'data', 'modules-journey-en-m7.json');
const tier1Path = join(__dirname, 'journey-en-tier1.json');

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

if (!existsSync(tier1Path)) {
  const gen = spawnSync('node', ['scripts/generate-journey-en-tier1.mjs'], {
    cwd: root,
    stdio: 'inherit',
  });
  if (gen.status !== 0) process.exit(gen.status ?? 1);
}

const enTier1 = readJson(tier1Path);
const enTier2 = readJson(join(__dirname, 'journey-en-tier2.json'));
const enTier2Rem = readJson(join(__dirname, 'journey-en-tier2-remaining.json'));
const enPathstep = readJson(join(__dirname, 'journey-en-pathstep.json'));

const ltTier2 = readJson(join(__dirname, 'journey-lt-tier2.json'));
const ltTier2Rem = readJson(join(__dirname, 'journey-lt-tier2-remaining.json'));
const ltPathstep = readJson(join(__dirname, 'journey-lt-pathstep.json'));

const lt = readJson(ltPath);
Object.assign(lt.fields, ltTier2, ltTier2Rem, ltPathstep);
writeFileSync(ltPath, `${JSON.stringify(lt, null, 2)}\n`);

const en = {
  moduleId: 7,
  version: 1,
  locale: 'en',
  fields: { ...enTier1, ...enTier2, ...enTier2Rem, ...enPathstep },
};
writeFileSync(enPath, `${JSON.stringify(en, null, 2)}\n`);

console.log('build-journey-overlays: OK');
