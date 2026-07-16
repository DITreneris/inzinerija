/**
 * Sync module.icon := identityIcon when identityIcon is set (DS v0.3.1).
 * Usage: node scripts/sync-module-icons.mjs [--dry-run]
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');
const dryRun = process.argv.includes('--dry-run');

const TARGET_FILES = [
  'modules.json',
  'modules-en.json',
  'modules-en-m4-m6.json',
  'modules-m1-m6.json',
  'modules-m1-m9.json',
];

function patchModulesFile(relativePath) {
  const path = join(dataDir, relativePath);
  const data = JSON.parse(readFileSync(path, 'utf8'));
  if (!Array.isArray(data.modules)) {
    console.warn(`Skip ${relativePath}: no modules array`);
    return 0;
  }
  let patched = 0;
  for (const mod of data.modules) {
    if (!mod.identityIcon) continue;
    if (mod.icon === mod.identityIcon) continue;
    console.log(
      `${relativePath} M${mod.id}: icon ${mod.icon} → ${mod.identityIcon}`
    );
    mod.icon = mod.identityIcon;
    patched++;
  }
  if (patched > 0 && !dryRun) {
    writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  }
  return patched;
}

let total = 0;
for (const file of TARGET_FILES) {
  total += patchModulesFile(file);
}

if (dryRun) {
  console.log(`Dry run: ${total} module(s) would be patched`);
} else {
  console.log(`Patched ${total} module(s) across ${TARGET_FILES.length} file(s)`);
}
