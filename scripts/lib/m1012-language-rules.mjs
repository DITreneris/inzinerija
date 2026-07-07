/**
 * Deterministic M10–M12 language rules for EN overlay + LT modules.json checks.
 * Builds on the M7–M9 audit primitives and adds M10–12 agent-path copy rules.
 */

import {
  auditMergedModuleEn,
  auditLtString as auditBaseLtString,
  shouldSkipPath,
} from './m79-language-rules.mjs';

export { auditMergedModuleEn };

const LT_FORMAL_PATTERNS = [
  { rule: 'lt_formal_you', detail: 'Esate', re: /\bEsate\b/ },
  { rule: 'lt_formal_you', detail: 'išmokote', re: /\bišmokote\b/i },
  { rule: 'lt_formal_you', detail: 'Rekomenduojame', re: /\bRekomenduojame\b/ },
];

const LT_EN_HEADING_PATTERNS = [
  { rule: 'lt_en_heading', detail: 'Micro-win', re: /\bMicro-win\b/i },
  { rule: 'lt_en_heading', detail: 'Checkpoint', re: /^Checkpoint\b/i },
  { rule: 'lt_en_heading', detail: 'Handoff', re: /^Handoff\b/i },
];

const LT_EN_PHRASE_PATTERNS = [
  { rule: 'lt_en_phrase', detail: 'prompt-only', re: /\bprompt-only\b/i },
  { rule: 'lt_en_phrase', detail: 'delivery-first', re: /\bdelivery-first\b/i },
  { rule: 'lt_en_phrase', detail: 'no-code', re: /\bno-code\b/i },
  { rule: 'lt_en_phrase', detail: 'Office 365 heavy', re: /\bOffice 365 heavy\b/i },
  { rule: 'lt_en_phrase', detail: 'Non-tech', re: /\bNon-tech\b/i },
  { rule: 'lt_en_phrase', detail: 'Enterprise governance', re: /\bEnterprise governance\b/i },
  { rule: 'lt_en_phrase', detail: 'audit trail', re: /\baudit trail\b/i },
  { rule: 'lt_en_phrase', detail: 'authoring', re: /\bauthoring\b/i },
  { rule: 'lt_en_phrase', detail: 'production bundle', re: /\bproduction bundle\b/i },
  { rule: 'lt_en_phrase', detail: 'Human-in-the-loop', re: /\bHuman-in-the-loop\b/i },
  { rule: 'lt_en_phrase', detail: 'prompt-first', re: /\bprompt-first\b/i },
  { rule: 'lt_en_phrase', detail: 'prompt-only', re: /\bprompt-only\b/i },
  { rule: 'lt_en_phrase', detail: 'delivery-first', re: /\bdelivery-first\b/i },
  { rule: 'lt_en_phrase', detail: 'edge case', re: /\bedge case\b/i },
  { rule: 'lt_en_phrase', detail: 'error handling', re: /\berror handling\b/i },
  { rule: 'lt_en_phrase', detail: 'test case', re: /\btest cases?\b/i },
];

const LT_USER_FACING_SKIP_PATH_PARTS = [
  '.copyable',
  '.id',
  '.url',
  '.image',
  '.icon',
  '.type',
  '.blockVariant',
  '.category',
  '.correct',
  '.level',
  '.accent',
  '.identityIcon',
  '.unlockedGlossaryTerms',
  '.recommendedSlideIds',
];

function isUserFacingLtPath(path) {
  if (!path || shouldSkipPath(path)) return false;
  return !LT_USER_FACING_SKIP_PATH_PARTS.some((part) => path.includes(part));
}

function allowlisted(allowlist, rule, path, detail) {
  return allowlist.some((entry) => {
    if (entry.rule !== rule) return false;
    if (entry.path && entry.path !== '*' && entry.path !== path) return false;
    if (!entry.match) return true;
    return String(detail).includes(entry.match);
  });
}

export function auditLtString(path, value, moduleId, allowlist = []) {
  if (typeof value !== 'string' || !value.trim()) return [];

  const findings = auditBaseLtString(path, value, moduleId).filter(
    (finding) => !allowlisted(allowlist, finding.rule, finding.path, finding.detail)
  );
  if (!isUserFacingLtPath(path)) return findings;

  const add = (rule, detail) => {
    if (allowlisted(allowlist, rule, path, detail)) return;
    findings.push({ rule, path, detail, snippet: value.slice(0, 80), moduleId });
  };

  for (const { rule, detail, re } of LT_FORMAL_PATTERNS) {
    if (re.test(value)) add(rule, detail);
  }

  const isHeadingOrTitle =
    /\.heading$/.test(path) || /\.title$/.test(path) || /\.footer$/.test(path);
  if (isHeadingOrTitle) {
    for (const { rule, detail, re } of LT_EN_HEADING_PATTERNS) {
      if (re.test(value)) add(rule, detail);
    }
  }

  for (const { rule, detail, re } of LT_EN_PHRASE_PATTERNS) {
    if (re.test(value)) add(rule, detail);
  }

  return findings;
}

export function auditLtModules(modulesData, moduleIds = [10, 11, 12], allowlist = []) {
  const findings = [];
  for (const mod of modulesData.modules.filter((m) => moduleIds.includes(m.id))) {
    for (const slide of mod.slides) {
      const prefix = `M${mod.id}/slides[${slide.id}]`;
      walkLt(slide, prefix, mod.id, findings, allowlist);
    }
  }
  return findings;
}

function walkLt(obj, path, moduleId, findings, allowlist) {
  if (typeof obj === 'string') {
    auditLtString(path, obj, moduleId, allowlist).forEach((f) => findings.push(f));
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => walkLt(v, `${path}[${i}]`, moduleId, findings, allowlist));
    return;
  }
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      walkLt(v, `${path}.${k}`, moduleId, findings, allowlist);
    }
  }
}
