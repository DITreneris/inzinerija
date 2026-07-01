/**
 * Deterministic M7–M9 language rules for EN overlay + LT modules.json checks.
 * Used by audit-en-language-m7-m9.mjs and Vitest.
 */

import { LT_DIACRITICS } from './audit-en-merge.mjs';

/** Machine-translation debris / known broken tokens in EN overlay. */
export const EN_HYBRID_TOKENS = [
  'withoutlow',
  'whenp',
  'teksthat',
  'viethat',
  'nuotrauwhat',
  'agenthat',
  'rezultathat',
  'missingmos',
  'from naujo',
  'paleisk AI',
  'nukopijav',
  'picwhen',
  'numwithoutrs',
  'prigoesmus',
  'greihereu',
  'onlyroji',
  'any only',
  'paonlyimais',
  'provideds',
  'potags',
  'performti',
  'provideti',
  'collecttais',
  'collectai',
  'rinwhat',
  'Pasteite',
];

/** LT tokens without diacritics that otherwise pass the diacritic-based coverage audit. */
export const EN_LT_TOKENS = [
  'atsiliepimus',
  'dubliavimas',
  'duomenimis',
  'duomenis',
  'duomenys',
  'eilutes',
  'eksportas',
  'generavimas',
  'identifikavimas',
  'kitimui',
  'kopijuok',
  'metai',
  'pagrindines',
  'pakeisk',
  'papildomus',
  'Priskirk',
  'rekomendacijas',
  'Rinkimas',
  'rinkinius',
  'savo',
  'scenarijai',
  'segmentai',
  'Segmentavimas',
  'stulpelius',
  'stulpeliai',
  'Tinka',
  'topici',
  'Validacija',
  'Vidurkis',
];

/** Broken mixed-language phrases produced by partial string-map translation. */
export const EN_BROKEN_PHRASES = [
  'Based on with',
  'collectti',
  'data rinkinius',
  'instead ofe',
  'ir rekomendacijas',
  'segmenthat',
  'sistopic',
  'su links',
  'teisinga steps',
  'when rgoia',
];

export const EN_LT_HEADINGS = [/Nori suprasti detaliau\??/i];

/** LT words that should not appear in merged EN user-facing strings. */
export const EN_LT_WORD_PATTERNS = [
  /\bScenarijus\b/i,
  /\bMetaduomenys\b/i,
  /\bSveikiname\b/i,
  /\bRefleksija\b/i,
  /\bPromptas\b/i,
  /\bPilnas workflow\b/i,
  /\bVizualizacijos\b/i,
  /\bTesto rezultatai\b/i,
  /\bProjekto santrauka\b/i,
  /\bverslo lygio\b/i,
  /\bSkyrius:\b/i,
  /\bSaugumas:\b/i,
  /\bSisteminis promptas\b/i,
  /\bteisingai\b/i,
  /\bveiksmas\b/i,
  /\bprincipai\b/i,
  /\bnukopijuok\b/i,
  /\bpaleisk\b/i,
  /\biki 17\b/,
  /\b30 d\. planas\b/i,
  /\bRezultatas\b/,
  /\bKada naudoti\b/i,
  /\bMetodinis promptas\b/i,
  /\bAgentinis promptas\b/i,
];

export const EN_TITLE_LT_PREFIX = /^(Scenarijus:|Projekto santrauka|Testo rezultatai)/;

/** Paths where LT/technical ids are allowed (not user-facing copy). */
export const SKIP_PATH_SUFFIXES = [
  '.id',
  'pathBranch',
  'branchIds',
  'relatedSlideId',
  'targetSlideId',
  'recommendedSlideIds',
  'unlockedGlossaryTerms',
  'icon',
  'type',
  'blockVariant',
  'image',
  'blockNumber',
  'bloomLevel',
  'category',
  'correct',
  'level',
  'accent',
  'identityIcon',
];

export function shouldSkipPath(path) {
  if (!path) return false;
  if (path.endsWith('.id') || path === 'id') return true;
  // External citations / research source titles keep their original (English) wording.
  if (/\.sources\[\d+\]\.title$/.test(path)) return true;
  if (/\.unlockedGlossaryTerms\[\d+\]$/.test(path)) return true;
  if (/\bjourneyChoices\[\d+\]\.id\b/.test(path)) return true;
  if (/\btestQuestions\[\d+\]\.id\b/.test(path)) return true;
  if (/\bcheck-[\w-]+\.id\b/.test(path)) return true;
  if (/\bm8-q\d+\b/.test(path) && path.endsWith('.id')) return true;
  return SKIP_PATH_SUFFIXES.some((s) => path.includes(s) && path.endsWith(`.${s}`));
}

const LT_AI_PRODUCT_ALLOWLIST = [
  'Julius AI',
  'Photoshop AI',
  'Leonardo AI',
  'Claude AI',
  'AI Act',
  'Next Level AI',
  'Generative AI',
  'GitHub Copilot',
  'Shadow AI',
];

export function findEnHybridTokenViolations(value) {
  const lower = value.toLowerCase();
  return EN_HYBRID_TOKENS.filter((t) => lower.includes(t.toLowerCase()));
}

export function findEnLtTokenViolations(value) {
  return EN_LT_TOKENS.filter((token) => {
    const re = new RegExp(`\\b${escapeRegExp(token)}\\b`, 'i');
    return re.test(value);
  });
}

export function findEnBrokenPhraseViolations(value) {
  const lower = value.toLowerCase();
  return EN_BROKEN_PHRASES.filter((phrase) => lower.includes(phrase.toLowerCase()));
}

export function findEnLtHeadingViolations(value) {
  return EN_LT_HEADINGS.filter((re) => re.test(value)).map((re) => re.source);
}

export function findEnLtWordViolations(value) {
  return EN_LT_WORD_PATTERNS.filter((re) => re.test(value)).map((re) => re.source);
}

export function findEnDiacriticViolations(value) {
  return LT_DIACRITICS.test(value) ? ['lt_diacritics'] : [];
}

export function findEnDiViolations(value, path) {
  if (shouldSkipPath(path)) return [];
  if (/\bMASTER PROMPT\b/.test(value)) return [];
  const matches = value.match(/\bDI\b/g);
  if (!matches) return [];
  return ['en_uses_DI_not_AI'];
}

export function findEnTitleLtPrefix(title) {
  if (!title || typeof title !== 'string') return [];
  return EN_TITLE_LT_PREFIX.test(title.trim()) ? ['en_title_lt_prefix'] : [];
}

export function findLtTuFormViolations(value) {
  const rules = [];
  if (/\bJŪSŲ\b/.test(value)) rules.push('lt_jusu_caps');
  if (/\bjūsų\b/i.test(value)) rules.push('lt_jusu');
  if (/\bgalite\b/i.test(value)) rules.push('lt_galite');
  if (/\bPaspauskite\b/.test(value)) rules.push('lt_paspauskite');
  if (/\bĮrašykite\b/.test(value)) rules.push('lt_irasykite');
  return rules;
}

export function findLtAiViolations(value) {
  if (!/\bAI\b/.test(value)) return [];
  for (const allowed of LT_AI_PRODUCT_ALLOWLIST) {
    if (value.includes(allowed)) {
      const stripped = value.split(allowed).join('');
      if (!/\bAI\b/.test(stripped)) return [];
    }
  }
  if (/\(DI\s*\/\s*AI\)/.test(value) || /\bDI\s*\/\s*AI\b/.test(value)) return [];
  if (/\bDI\s*\(\s*AI\s*\)/.test(value)) return [];
  if (/\bGenerative AI\b/.test(value)) return [];
  return ['lt_uses_AI_not_DI'];
}

export function auditEnString(path, value, allowlist = []) {
  if (typeof value !== 'string' || !value.trim()) return [];
  if (shouldSkipPath(path)) return [];

  const findings = [];
  const add = (rule, detail) => {
    const key = `${rule}:${path}:${detail}`;
    if (allowlist.some((a) => a.rule === rule && a.path === path)) return;
    if (allowlist.some((a) => a.rule === rule && a.path === '*' && String(detail).includes(a.match ?? '')))
      return;
    findings.push({ rule, path, detail, snippet: value.slice(0, 80) });
  };

  for (const t of findEnHybridTokenViolations(value)) add('en_hybrid_token', t);
  for (const t of findEnLtTokenViolations(value)) add('en_lt_token', t);
  for (const p of findEnBrokenPhraseViolations(value)) add('en_broken_phrase', p);
  for (const h of findEnLtHeadingViolations(value)) add('en_lt_heading', h);
  for (const p of findEnLtWordViolations(value)) add('en_lt_word', p);
  for (const _ of findEnDiacriticViolations(value)) add('en_lt_diacritics', 'diacritics');
  for (const _ of findEnDiViolations(value, path)) add('en_must_ai', 'DI');
  for (const t of findEnTitleLtPrefix(value)) add('en_title_lt_prefix', t);

  return findings;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function auditLtString(path, value, moduleId) {
  if (typeof value !== 'string' || !value.trim()) return [];
  // Module scope is controlled by the caller (auditLtModules filters by moduleIds);
  // this string-level check applies to any module passed in.
  if (shouldSkipPath(path)) return [];

  const findings = [];
  const add = (rule, detail) =>
    findings.push({ rule, path, detail, snippet: value.slice(0, 80), moduleId });

  for (const r of findLtTuFormViolations(value)) add(r, r);
  for (const r of findLtAiViolations(value)) add(r, r);

  return findings;
}

export function auditMergedModuleEn(module, slideIds, allowlist = []) {
  const findings = [];
  const slides = slideIds
    ? module.slides.filter((s) => slideIds.includes(s.id))
    : module.slides;

  for (const slide of slides) {
    const prefix = `slides[${slide.id}]`;
    for (const t of findEnTitleLtPrefix(slide.title)) {
      findings.push({
        rule: 'en_title_lt_prefix',
        moduleId: module.id,
        slideId: slide.id,
        path: `${prefix}.title`,
        detail: t,
        snippet: slide.title,
      });
    }
    if (slide.subtitle) {
      for (const f of auditEnString(`${prefix}.subtitle`, slide.subtitle, allowlist)) {
        findings.push({ moduleId: module.id, slideId: slide.id, ...f });
      }
    }
    collectSlideStrings(slide, prefix).forEach(({ path, value }) => {
      auditEnString(path, value, allowlist).forEach((f) => {
        findings.push({ moduleId: module.id, slideId: slide.id, ...f });
      });
    });
  }
  return findings;
}

function collectSlideStrings(obj, path, out = []) {
  if (typeof obj === 'string') {
    out.push({ path, value: obj });
    return out;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => collectSlideStrings(v, `${path}[${i}]`, out));
    return out;
  }
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      if (k === 'id' && typeof v === 'number') continue;
      collectSlideStrings(v, `${path}.${k}`, out);
    }
  }
  return out;
}

export function auditLtModules(modulesData, moduleIds = [7, 8, 9]) {
  const findings = [];
  for (const mod of modulesData.modules.filter((m) => moduleIds.includes(m.id))) {
    for (const slide of mod.slides) {
      const prefix = `M${mod.id}/slides[${slide.id}]`;
      walkLt(slide, prefix, mod.id, findings);
    }
  }
  return findings;
}

function walkLt(obj, path, moduleId, findings) {
  if (typeof obj === 'string') {
    auditLtString(path, obj, moduleId).forEach((f) => findings.push(f));
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => walkLt(v, `${path}[${i}]`, moduleId, findings));
    return;
  }
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      walkLt(v, `${path}.${k}`, moduleId, findings);
    }
  }
}
