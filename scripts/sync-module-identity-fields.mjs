/**
 * One-off: add accent + identityIcon to M1–M6 in modules JSON files (DS v0.2 E5).
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');

const IDENTITY_BY_MODULE_ID = {
  1: { accent: 'brand', identityIcon: 'BookOpen' },
  2: { accent: 'slate', identityIcon: 'ClipboardList' },
  3: { accent: 'emerald', identityIcon: 'Briefcase' },
  4: { accent: 'violet', identityIcon: 'Brain' },
  5: { accent: 'cyan', identityIcon: 'ClipboardCheck' },
  6: { accent: 'accent', identityIcon: 'Rocket' },
};

function patchModulesFile(relativePath) {
  const path = join(dataDir, relativePath);
  const data = JSON.parse(readFileSync(path, 'utf8'));
  if (!Array.isArray(data.modules)) {
    console.warn(`Skip ${relativePath}: no modules array`);
    return;
  }
  let patched = 0;
  for (const mod of data.modules) {
    const fields = IDENTITY_BY_MODULE_ID[mod.id];
    if (!fields) continue;
    mod.accent = fields.accent;
    mod.identityIcon = fields.identityIcon;
    patched++;
  }
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`${relativePath}: patched ${patched} module(s)`);
}

for (const file of [
  'modules.json',
  'modules-m1-m6.json',
  'modules-en.json',
  'modules-en-m4-m6.json',
]) {
  patchModulesFile(file);
}
