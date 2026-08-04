/**
 * Durable EN overrides for Module 18 learner plain epic.
 * Applies exact LT→EN string map after mechanical walk / slideMeta.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const mapPath = join(dirname(fileURLToPath(import.meta.url)), 'm18-en-lt-map.json');
const ltToEn = JSON.parse(readFileSync(mapPath, 'utf8'));

function walk(value) {
  if (typeof value === 'string') {
    return Object.prototype.hasOwnProperty.call(ltToEn, value) ? ltToEn[value] : value;
  }
  if (Array.isArray(value)) return value.map(walk);
  if (value && typeof value === 'object') {
    const next = {};
    for (const [k, v] of Object.entries(value)) next[k] = walk(v);
    return next;
  }
  return value;
}

/** Mutates module in place. Call on LT clone before mechanical DI→AI walk. */
export function applyM18EnPlainOverrides(mod) {
  if (!mod || mod.id !== 18) return;
  const translated = walk(structuredClone(mod));
  for (const key of Object.keys(translated)) {
    mod[key] = translated[key];
  }
}
