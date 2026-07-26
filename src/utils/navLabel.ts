export type NavLocale = 'lt' | 'en';

const EMOJI_PREFIX =
  /^[\p{Emoji_Presentation}\p{Extended_Pictographic}\u{FE0F}\u{20E3}]+\s*/u;
const STRUCTURAL_PREFIX =
  /^(Papildoma|Praktika|Skyrius|Savitikra|Projektas|Pavyzdys iš praktikos|Section|Self-check|Practice|Project|Example from practice)[:\s]+/i;
const PARENS = /\s*\([^)]*\)?\s*/g;
const TRAIL_LT =
  /^(ir|su|iš|ar|be|per|po|nuo|dėl|apie|kaip|ką|kas|kur|kada|savo|kurios|kodėl|tai)$/i;
const TRAIL_EN =
  /^(and|with|from|for|the|to|or|of|in|on|a|an|by|at|into|as|what|when|where|how|who)$/i;
const DASH_AS_SEPARATOR = /\s*[\u2013\u2014-]+\s*/g;
const TRAILING_PUNCTUATION = /[,:;\u2013\u2014?!\u2026.]+$/;
/** LT genitive-like endings that look unfinished when the next noun was sliced off. */
const LT_HANGING_GENITIVE = /(?:io|ių|ų|os|ės|[bcdfghjklmnpqrstvwxz]o)$/i;
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
    .replace(DASH_AS_SEPARATOR, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const trail = locale === 'en' ? TRAIL_EN : TRAIL_LT;
  const tokens = text.split(/\s+/).filter(Boolean);
  const meaningful = tokens.filter((w) => !trail.test(w));
  const source = meaningful.length > 0 ? meaningful : tokens;
  const words = source.slice(0, 3);
  while (words.length > 1 && trail.test(words[words.length - 1])) words.pop();

  let label = words.join(' ').replace(TRAILING_PUNCTUATION, '').trim();
  if (label.length < 3 && text.length > 0) label = tokens.slice(0, 2).join(' ');

  if (label.length > 20) return { kind: 'fallback' };
  if (locale === 'en' && looksLithuanianForEn(label))
    return { kind: 'fallback' };

  // Truncated mid-phrase (e.g. "Koks tavo analitiko" from "...profilis?") → bare Tęsti.
  const truncated = source.length > words.length;
  const lastWord = (words[words.length - 1] ?? '').replace(
    TRAILING_PUNCTUATION,
    ''
  );
  if (
    truncated &&
    locale === 'lt' &&
    lastWord.length > 0 &&
    LT_HANGING_GENITIVE.test(lastWord)
  ) {
    return { kind: 'fallback' };
  }

  return { kind: 'label', label };
}
