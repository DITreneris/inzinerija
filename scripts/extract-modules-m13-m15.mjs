#!/usr/bin/env node
/**
 * Extract lightweight M13–M15 EN overlay stubs from modules.json.
 * Use build-en-m13-m15.mjs for the complete generated overlay.
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lt = JSON.parse(readFileSync(join(root, 'src', 'data', 'modules.json'), 'utf8'));
const modules = lt.modules
  .filter((m) => [13, 14, 15].includes(m.id))
  .map((m) => ({
    id: m.id,
    title: m.title,
    subtitle: m.subtitle,
    description: m.description,
    duration: m.duration,
    slides: m.slides.map((s) => ({
      id: s.id,
      title: s.title,
      subtitle: s.subtitle,
      type: s.type,
    })),
  }));

const outPath = join(root, 'src', 'data', 'modules-en-m13-m15.stubs.json');
writeFileSync(outPath, `${JSON.stringify({ modules }, null, 2)}\n`);
console.log(`Wrote ${outPath}`);
