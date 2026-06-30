/** Detect user-visible Lithuanian text when EN locale is active. */
const LT_DIACRITICS = /[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/;

export function hasLithuanianDiacritics(text: string | undefined): boolean {
  if (!text) return false;
  return LT_DIACRITICS.test(text);
}

/** True when slide title/subtitle still looks LT after EN merge (partial overlay). */
export function isSlideLikelyUntranslatedForEn(
  title: string | undefined,
  subtitle?: string | undefined
): boolean {
  return hasLithuanianDiacritics(title) || hasLithuanianDiacritics(subtitle);
}
