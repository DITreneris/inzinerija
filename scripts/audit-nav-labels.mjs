#!/usr/bin/env node
/**
 * Audit generated "Continue: <next slide>" labels for LT/EN language leaks.
 * Scope: production M1–M9 runtime profile plus EN overlays.
 */
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { deepMerge } from './lib/audit-en-merge.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');

const MODULE_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const LT_DIACRITICS = /[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/;
const LT_MARKERS_EN =
  /\b(Toliau|skaidrė|Tęsti|Modulio|Scenarijus|Savitikra|Promptų|Duomenų|Praktika|Skyrius|Klausimai|Žinių)\b/i;
const EN_MARKERS_LT = /\b(Continue|Next slide|Self-check|Section|Practice|Project)\b/i;
const STRUCTURAL_PREFIX =
  /^(Papildoma|Praktika|Skyrius|Savitikra|Projektas|Pavyzdys iš praktikos|Section|Self-check|Practice|Project|Example from practice)[:\s]+/i;
const EMOJI_PREFIX =
  /^[\p{Emoji_Presentation}\p{Extended_Pictographic}\u{FE0F}\u{20E3}]+\s*/u;
const PARENS = /\s*\([^)]*\)?\s*/g;
const TRAIL_LT =
  /^(ir|su|iš|ar|be|per|po|nuo|dėl|apie|kaip|savo|kurios|kodėl|tai)$/i;
const TRAIL_EN =
  /^(and|with|from|for|the|to|or|of|in|on|a|an|by|at|into|as)$/i;

const base = JSON.parse(readFileSync(join(dataDir, 'modules-m1-m9.json'), 'utf8'));
const enOverlays = [
  'modules-en.json',
  'modules-en-m4-m6.json',
  'modules-en-m7-m9.json',
].map((file) => JSON.parse(readFileSync(join(dataDir, file), 'utf8')));

const enData = mergeModules(base, ...enOverlays);
const findings = [
  ...auditData(base, 'lt'),
  ...auditData(enData, 'en'),
];

if (findings.length > 0) {
  console.error('Nav label language audit: FAIL');
  findings.slice(0, 50).forEach((f) => {
    console.error(
      `[${f.locale.toUpperCase()}] M${f.moduleId} ${f.fromSlideId}→${f.toSlideId} ${f.rule}: "${f.label}"`
    );
  });
  if (findings.length > 50)
    console.error(`... and ${findings.length - 50} more findings`);
  process.exit(1);
}

console.log('Nav label language audit: OK');
process.exit(0);

function mergeModules(data, ...partials) {
  let modules = data.modules;
  for (const partial of partials) {
    modules = modules.map((module) => {
      const override = partial.modules?.find((candidate) => candidate.id === module.id);
      return override ? deepMerge(module, override) : module;
    });
  }
  return { modules };
}

function auditData(data, locale) {
  const out = [];
  for (const module of data.modules) {
    if (!MODULE_IDS.includes(module.id)) continue;
    const slides = module.slides ?? [];
    for (let i = 0; i < slides.length - 1; i++) {
      const from = slides[i];
      const to = slides[i + 1];
      const result = computeLabelFragment(to.shortTitle ?? to.title, locale);
      if (result.kind !== 'label') continue;

      if (locale === 'en') {
        if (LT_DIACRITICS.test(result.label)) {
          out.push(toFinding(module.id, from.id, to.id, locale, 'lt_diacritics', result.label));
        }
        if (LT_MARKERS_EN.test(result.label)) {
          out.push(toFinding(module.id, from.id, to.id, locale, 'lt_marker', result.label));
        }
      } else if (EN_MARKERS_LT.test(result.label)) {
        out.push(toFinding(module.id, from.id, to.id, locale, 'en_marker', result.label));
      }
    }
  }
  return out;
}

function computeLabelFragment(rawTitle, locale) {
  const raw = (rawTitle ?? '').trim();
  if (!raw) return { kind: 'none' };
  const text = raw
    .replace(EMOJI_PREFIX, '')
    .replace(STRUCTURAL_PREFIX, '')
    .replace(PARENS, ' ')
    .trim();
  const words = text.split(/\s+/).slice(0, 3);
  const trail = locale === 'en' ? TRAIL_EN : TRAIL_LT;
  while (words.length > 1 && trail.test(words[words.length - 1])) words.pop();
  let label = words.join(' ').replace(/[,:;\u2013\u2014?!\u2026.]+$/, '').trim();
  if (label.length < 3 && text.length > 0)
    label = text.split(/\s+/).slice(0, 2).join(' ');
  if (label.length > 20) return { kind: 'fallback' };
  return { kind: 'label', label };
}

function toFinding(moduleId, fromSlideId, toSlideId, locale, rule, label) {
  return { moduleId, fromSlideId, toSlideId, locale, rule, label };
}
