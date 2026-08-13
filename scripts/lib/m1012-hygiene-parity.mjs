/**
 * Shared M10–12 hygiene helpers: number parity, chrome path matching,
 * and same-slide filler-repeat noise.
 *
 * Kept out of the audit CLI so vitest can import the rules without booting
 * the full corpus.
 */

/**
 * Strip tokens that look like digits but are not learner KPIs:
 * page-count collocations, 3A, n8n, L0–L3, M4 / Module 10.
 * Duration ranges (25–30 vs 20–25) stay.
 */
export function stripNumberNoise(text) {
  return String(text)
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/\b1[\s-]?pages?\b/gi, ' ')
    .replace(/\b1[\s-]?puslap\w*/gi, ' ')
    .replace(/\b3A\b/g, ' ')
    .replace(/\bn8n\b/gi, ' ')
    .replace(/\bL[0-3]\b/g, ' ')
    .replace(/\b[Mm]odul\S*\s+\d+(?:\s*[–-]\s*\d+)?/g, ' ')
    .replace(/\bM\d+(?:\s*[–-]\s*M?\d+)?\b/g, ' ');
}

export function numbersIn(text) {
  const raw = stripNumberNoise(text).match(/\d+(?:[.,]\d+)?/g) || [];
  return raw
    .map((n) => n.replace(',', '.'))
    .map((n) => String(parseFloat(n)))
    .sort();
}

/**
 * Paths where an identical value across slides is by design, not filler.
 * Nested chrome uses `content.pathLabel` / `….choices[n].label` — match the
 * last segment, not only a whole-path `^label$`.
 */
export function isRepeatableChrome(path) {
  return /(^|\.)(title|subtitle|shortTitle|pathLabel|label|term)$|heading|templateLabel|reflectionTitle|introHeading|content\.title|instructions\.title|taskFrame/.test(
    path
  );
}

/** EN-only chrome from footer sync (LT title already short). Not a content hole. */
export function isParityLtMissingExempt(path) {
  return /(^|\.)(shortTitle|pathLabel)$/.test(path);
}

/** Same CTA copied on one lab slide (10.48 / 10.36) is linked copy, not filler. */
export function isSameSlideFillerRepeat(hits) {
  const ids = new Set(hits.map((h) => String(h.slide?.slideId ?? h.slideId ?? '')));
  return ids.size === 1;
}
