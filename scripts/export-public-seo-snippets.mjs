#!/usr/bin/env node
/**
 * Export public module summaries for marketing / GEO (no slides, no copyable prompts).
 * Output: public/seo-public-snippets.json (+ optional public/seo-public-snippets.md)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const isCore = process.env.VITE_MVP_MODE === '1';
const dataPath = join(
  root,
  'src',
  'data',
  isCore ? 'modules-m1-m6.json' : 'modules.json'
);

const MAX_FIELD_LEN = 500;
const ALLOWED_KEYS = new Set([
  'id',
  'title',
  'subtitle',
  'description',
  'duration',
  'level',
]);

function assertSafeValue(key, value, moduleId) {
  if (value == null) return;
  const str = String(value);
  if (str.length > MAX_FIELD_LEN) {
    throw new Error(
      `Module ${moduleId}: field "${key}" exceeds ${MAX_FIELD_LEN} characters`
    );
  }
  if (/copyable/i.test(str) || key === 'slides') {
    throw new Error(`Module ${moduleId}: forbidden content in field "${key}"`);
  }
}

const raw = JSON.parse(readFileSync(dataPath, 'utf8'));
const modules = (raw.modules ?? []).filter((m) => m.id >= 1 && m.id <= 6);

const snippets = modules.map((mod) => {
  const entry = {};
  for (const key of ALLOWED_KEYS) {
    if (mod[key] !== undefined) {
      assertSafeValue(key, mod[key], mod.id);
      entry[key] = mod[key];
    }
  }
  const serialized = JSON.stringify(entry);
  if (serialized.includes('copyable')) {
    throw new Error(`Module ${mod.id}: export contains forbidden "copyable"`);
  }
  return entry;
});

const payload = {
  generatedAt: new Date().toISOString(),
  source: isCore ? 'modules-m1-m6.json' : 'modules.json',
  product: 'Promptų anatomija',
  publicMarketingUrl: 'https://www.promptanatomy.app/',
  modules: snippets,
};

const jsonOut = join(root, 'public', 'seo-public-snippets.json');
writeFileSync(jsonOut, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

const mdLines = [
  '# Promptų anatomija – viešos modulių santraukos',
  '',
  `> Generuota: ${payload.generatedAt}. Pilnas kursas – tik įsigijusiems.`,
  '',
  `Marketingas: ${payload.publicMarketingUrl}`,
  '',
];
for (const m of snippets) {
  mdLines.push(`## Modulis ${m.id}: ${m.title}`, '');
  if (m.subtitle) mdLines.push(`*${m.subtitle}*`, '');
  if (m.description) mdLines.push(m.description, '');
  if (m.duration || m.level) {
    mdLines.push(
      `_${[m.duration, m.level].filter(Boolean).join(' · ')}_`,
      ''
    );
  }
}
const mdOut = join(root, 'public', 'seo-public-snippets.md');
writeFileSync(mdOut, `${mdLines.join('\n')}\n`, 'utf8');

console.log(`Wrote ${jsonOut} (${snippets.length} modules)`);
console.log(`Wrote ${mdOut}`);
