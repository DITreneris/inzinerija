export type NavLocale = 'lt' | 'en';

const EMOJI_PREFIX =
  /^[\p{Emoji_Presentation}\p{Extended_Pictographic}\u{FE0F}\u{20E3}]+\s*/u;
const STRUCTURAL_PREFIX =
  /^(Papildoma|Praktika|Skyrius|Savitikra|Projektas|Pavyzdys iš praktikos|Section|Self-check|Practice|Project|Example from practice)[:\s]+/i;
const PARENS = /\s*\([^)]*\)?\s*/g;
const TRAIL_LT =
  /^(ir|su|iš|ar|be|per|po|nuo|dėl|apie|kaip|savo|kurios|kodėl|tai)$/i;
const TRAIL_EN = /^(and|with|from|for|the|to|or|of|in|on|a|an|by|at|into|as)$/i;
const TRAILING_PUNCTUATION = /[,:;\u2013\u2014?!\u2026.]+$/;
const LT_DIACRITICS = /[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/;
const EN_LT_WORD_PATTERNS = [
  /\bToliau\b/i,
  /\bskaidrė\b/i,
  /\bTęsti\b/i,
  /\bModulio\b/i,
  /\bScenarijus\b/i,
  /\bSavitikra\b/i,
  /\bPromptų\b/i,
  /\bDuomenų\b/i,
  /\bPraktika\b/i,
  /\bSkyrius\b/i,
  /\bKlausimai\b/i,
  /\bŽinių\b/i,
];

export type NextLabelResult =
  | { kind: 'none' }
  | { kind: 'fallback' }
  | { kind: 'label'; label: string };

export function looksLithuanianForEn(value: string): boolean {
  return (
    LT_DIACRITICS.test(value) ||
    EN_LT_WORD_PATTERNS.some((pattern) => pattern.test(value))
  );
}

export function computeNextSlideContextLabel(
  rawTitle: string | undefined,
  locale: NavLocale
): NextLabelResult {
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

  let label = words.join(' ').replace(TRAILING_PUNCTUATION, '').trim();
  if (label.length < 3 && text.length > 0)
    label = text.split(/\s+/).slice(0, 2).join(' ');

  if (label.length > 20) return { kind: 'fallback' };
  if (locale === 'en' && looksLithuanianForEn(label))
    return { kind: 'fallback' };

  return { kind: 'label', label };
}
