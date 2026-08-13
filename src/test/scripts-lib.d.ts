/**
 * Types for the language-gate rule modules in `scripts/lib/`.
 *
 * The rules are plain `.mjs` so the audit scripts can run under bare `node` in
 * the preflight, but the regression tests import them directly. Declaring them
 * here keeps the tests typed instead of scattering `@ts-expect-error`.
 */
declare module '*/scripts/lib/en-spelling-map.mjs' {
  export interface BritishSpellingHit {
    hit: string;
    ame: string;
    index: number;
  }
  export function findBritishSpellings(value: string): BritishSpellingHit[];
  export function toAmericanEnglish(value: string): string;
  export function matchCase(source: string, replacement: string): string;
}

declare module '*/scripts/lib/source-string-literals.mjs' {
  export function rewriteStringLiterals(
    raw: string,
    onSegment: (body: string, offset: number) => string
  ): string;
  export function forEachStringLiteral(
    raw: string,
    visit: (body: string, offset: number) => void
  ): void;
  export function isLossless(raw: string): boolean;
}

declare module '*/scripts/lib/lt-address-rules.mjs' {
  export interface LtFinding {
    rule: string;
    hit: string;
    detail?: string;
  }
  export function findLtAddressViolations(value: string): LtFinding[];
  export function findLtBarbarisms(value: string): LtFinding[];
  export function ltWordPattern(word: string): RegExp;
}

declare module '*/scripts/lib/m1012-hygiene-parity.mjs' {
  export function stripNumberNoise(text: string): string;
  export function numbersIn(text: string): string[];
  export function isRepeatableChrome(path: string): boolean;
  export function isParityLtMissingExempt(path: string): boolean;
  export function isSameSlideFillerRepeat(
    hits: Array<{
      slide?: { slideId?: string | number };
      slideId?: string | number;
    }>
  ): boolean;
}
