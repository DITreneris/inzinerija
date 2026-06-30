#!/usr/bin/env node
/**
 * Deep-translate LT slide/module objects to EN using string map + global rules.
 */
import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const mapPath = join(dirname(fileURLToPath(import.meta.url)), 'm7-m9-en-string-map.json');

let STRING_MAP = {};
if (existsSync(mapPath)) {
  STRING_MAP = JSON.parse(readFileSync(mapPath, 'utf8'));
}

const SKIP_KEYS = new Set(['url', 'image', 'icon', 'badgeVariant', 'blockVariant', 'type', 'id', 'correct', 'bloomLevel', 'relatedSlideId', 'targetSlideId', 'branchIds', 'pathBranch', 'optional', 'cta_id', 'moduleId', 'level', 'unlocksAfter', 'accent', 'identityIcon']);

/** Global post-processing for EN user-facing text. */
export function postProcessEn(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/\bDI\b/g, 'AI')
    .replace(/Kalba:\s*lietuvi(?:ų|u)/gi, 'Language: English')
    .replace(/Language:\s*Lithuanian/gi, 'Language: English')
    .replace(/Modulio\s+(\d+)/g, 'Module $1')
    .replace(/Moduliai\s+(\d+)/g, 'Modules $1')
    .replace(/Modulį\s+(\d+)/g, 'Module $1');
}

export function translateString(lt) {
  if (typeof lt !== 'string') return lt;
  if (lt === '') return lt;
  if (STRING_MAP[lt] != null) return postProcessEn(STRING_MAP[lt]);
  const processed = postProcessEn(lt);
  if (!/[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/.test(processed)) return processed;
  return null;
}

export function translateValue(value, key = '') {
  if (typeof value === 'string') {
    const t = translateString(value);
    if (t === null) return { ok: false, value, key };
    return { ok: true, value: t };
  }
  if (Array.isArray(value)) {
    const out = [];
    const missing = [];
    for (let i = 0; i < value.length; i++) {
      const r = translateDeep(value[i], `${key}[${i}]`);
      out.push(r.value);
      missing.push(...r.missing);
    }
    return { ok: missing.length === 0, value: out, missing };
  }
  if (value && typeof value === 'object') {
    return translateDeep(value, key);
  }
  return { ok: true, value, missing: [] };
}

export function translateDeep(obj, path = '') {
  const missing = [];
  if (obj == null || typeof obj !== 'object') {
    const r = translateValue(obj, path);
    return { value: r.value, missing: r.ok ? [] : [{ path, sample: String(obj).slice(0, 80) }] };
  }
  if (Array.isArray(obj)) {
    const out = [];
    for (let i = 0; i < obj.length; i++) {
      const r = translateDeep(obj[i], `${path}[${i}]`);
      out.push(r.value);
      missing.push(...r.missing);
    }
    return { value: out, missing };
  }
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const p = path ? `${path}.${k}` : k;
    if (SKIP_KEYS.has(k) && typeof v !== 'object') {
      out[k] = v;
      continue;
    }
    if (typeof v === 'string') {
      const t = translateString(v);
      if (t === null) missing.push({ path: p, sample: v.slice(0, 80) });
      else out[k] = t;
    } else if (Array.isArray(v) || (v && typeof v === 'object')) {
      const r = translateDeep(v, p);
      out[k] = r.value;
      missing.push(...r.missing);
    } else {
      out[k] = v;
    }
  }
  return { value: out, missing };
}

/** Pick translatable slide fields for EN overlay partial. */
export function slideToEnOverlay(ltSlide) {
  const pick = { id: ltSlide.id };
  const translatableKeys = [
    'title',
    'subtitle',
    'shortTitle',
    'type',
    'content',
    'testQuestions',
    'footer',
    'scenario',
    'practicalTask',
    'template',
    'recommended',
  ];
  for (const key of translatableKeys) {
    if (ltSlide[key] != null) pick[key] = ltSlide[key];
  }
  const { value, missing } = translateDeep(pick);
  return { slide: value, missing };
}

export function moduleMetaToEn(meta) {
  const { value, missing } = translateDeep(meta);
  return { meta: value, missing };
}

export function getMissingCount() {
  return Object.keys(STRING_MAP).length;
}
