/**
 * Extract first 3 modules from modules.json into modules-en.json.
 * Run from repo root: node scripts/extract-modules-en.mjs
 * Then translate EN content in src/data/modules-en.json.
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const modulesPath = join(root, 'src', 'data', 'modules.json');
const outPath = join(root, 'src', 'data', 'modules-en.json');

const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
const modules = Array.isArray(data.modules) ? data.modules : [];
const firstThree = modules.slice(0, 3);
writeFileSync(outPath, JSON.stringify({ modules: firstThree }, null, 2), 'utf8');
console.log('Written', firstThree.length, 'modules to src/data/modules-en.json');
console.log('Translate title/subtitle/description and slide content to EN in that file.');
