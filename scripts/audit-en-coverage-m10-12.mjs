#!/usr/bin/env node
/**
 * EN coverage audit for M10–12: slide ID parity + LT diacritics after merge simulation.
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');

const LT = JSON.parse(readFileSync(join(dataDir, 'modules.json'), 'utf8'));
const EN = JSON.parse(readFileSync(join(dataDir, 'modules-en-m10-m12.json'), 'utf8'));

const DIACRITICS = /[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/;

function deepMerge(base, overlay) {
  if (overlay == null) return base;
  if (Array.isArray(overlay)) {
    if (!Array.isArray(base)) return overlay;
    const result = base.map((item, i) => {
      const o = overlay.find?.((x) => x?.id != null && item?.id != null && x.id === item.id);
      if (o) return deepMerge(item, o);
      return overlay[i] != null ? deepMerge(item, overlay[i]) : item;
    });
    overlay.forEach((o, i) => {
      if (o?.id != null && !result.some((r) => r?.id === o.id)) result.push(o);
    });
    return result;
  }
  if (typeof overlay !== 'object' || typeof base !== 'object') return overlay ?? base;
  const out = { ...base };
  for (const k of Object.keys(overlay)) {
    out[k] = deepMerge(base[k], overlay[k]);
  }
  return out;
}

function mergeModulesData(lt, enPartial) {
  const modules = lt.modules.map((m) => {
    const enMod = enPartial.modules?.find((x) => x.id === m.id);
    return enMod ? deepMerge(m, enMod) : m;
  });
  return { modules };
}

function collectStrings(obj, path = '', out = []) {
  if (typeof obj === 'string') {
    out.push({ path, value: obj });
    return out;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => collectStrings(v, `${path}[${i}]`, out));
    return out;
  }
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      collectStrings(v, path ? `${path}.${k}` : k, out);
    }
  }
  return out;
}

let hasError = false;
for (const id of [10, 11, 12]) {
  const ltMod = LT.modules.find((m) => m.id === id);
  const enMod = EN.modules?.find((m) => m.id === id);
  const ltIds = new Set(ltMod.slides.map((s) => s.id));
  const enIds = new Set((enMod?.slides ?? []).map((s) => s.id));
  const missing = [...ltIds].filter((x) => !enIds.has(x));
  if (missing.length) {
    console.error(`M${id} missing EN slide stubs:`, missing.join(', '));
    hasError = true;
  }
}

const merged = mergeModulesData(
  { modules: LT.modules.filter((m) => [10, 11, 12].includes(m.id)) },
  EN
);

for (const m of merged.modules) {
  const strings = collectStrings(m);
  const ltLeft = strings.filter((s) => DIACRITICS.test(s.value));
  if (ltLeft.length) {
    console.error(`M${m.id}: ${ltLeft.length} strings still contain LT diacritics (sample):`);
    ltLeft.slice(0, 5).forEach((s) => console.error(`  ${s.path}: ${s.value.slice(0, 60)}...`));
    hasError = true;
  }
}

if (hasError) {
  console.error('\nEN coverage audit: FAIL');
  process.exit(1);
}
console.log('EN coverage audit M10–12: OK');
process.exit(0);
