#!/usr/bin/env node
/**
 * Module identity audit — verifies module.accent + identityIcon in modules.json (DS hardening 2026-07).
 * SOT: docs/development/GOLDEN_STANDARD.md §6, src/utils/moduleIdentity.ts
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const modulesPath = join(root, 'src/data/modules.json');

const VALID_ACCENTS = new Set([
  'brand',
  'slate',
  'emerald',
  'violet',
  'cyan',
  'accent',
  'sky',
  'fuchsia',
  'rose',
]);

const VALID_ICONS = new Set([
  'BookOpen',
  'ClipboardList',
  'Briefcase',
  'Brain',
  'ClipboardCheck',
  'Rocket',
  'BarChart3',
  'Cpu',
  'Image',
]);

function main() {
  const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
  const modules = data.modules ?? [];
  const errors = [];

  for (const mod of modules) {
    const label = `M${mod.id}`;
    if (!mod.accent) {
      errors.push(`${label}: missing module.accent`);
    } else if (!VALID_ACCENTS.has(mod.accent)) {
      errors.push(`${label}: unknown accent "${mod.accent}"`);
    }
    const icon = mod.identityIcon ?? mod.icon;
    if (!icon) {
      errors.push(`${label}: missing identityIcon/icon`);
    } else if (!VALID_ICONS.has(icon)) {
      errors.push(`${label}: unknown identityIcon "${icon}"`);
    }

    const actionIntros = (mod.slides ?? []).filter((s) => s.type === 'action-intro');
    if (actionIntros.length > 0 && !mod.accent) {
      errors.push(`${label}: has action-intro but no accent`);
    }
  }

  console.log('\n=== Module Identity Audit ===');
  console.log(`Modules scanned: ${modules.length}`);
  if (errors.length === 0) {
    console.log('All modules have valid accent + identityIcon.');
    process.exit(0);
  }
  console.error(`FAIL: ${errors.length} issue(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

main();
