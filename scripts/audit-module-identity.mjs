#!/usr/bin/env node
/**
 * Module identity audit — verifies module.accent + identityIcon in modules.json (M1–18).
 * SOT: docs/development/GOLDEN_STANDARD.md §6, src/utils/moduleIdentity.ts
 * Also fails if two learn-level modules share the same identityIcon.
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
  'Code',
]);

function main() {
  const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
  const modules = data.modules ?? [];
  const errors = [];
  /** @type {Map<string, number[]>} */
  const learnIconOwners = new Map();

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

    if (mod.level === 'learn' && icon && VALID_ICONS.has(icon)) {
      const owners = learnIconOwners.get(icon) ?? [];
      owners.push(mod.id);
      learnIconOwners.set(icon, owners);
    }
  }

  for (const [icon, ids] of learnIconOwners) {
    if (ids.length > 1) {
      errors.push(
        `learn identityIcon "${icon}" reused by M${ids.join(', M')} (must be unique per learn module)`
      );
    }
  }

  console.log('\n=== Module Identity Audit ===');
  console.log(`Modules scanned: ${modules.length}`);
  if (errors.length === 0) {
    console.log('All modules have valid accent + identityIcon; learn icons unique.');
    process.exit(0);
  }
  console.error(`FAIL: ${errors.length} issue(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

main();
