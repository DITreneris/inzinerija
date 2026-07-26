/**
 * Inject M9 journey themePlaceholder / sample columns into
 * workflow and practice prompt templates (render-time only).
 */

export function applyM9JourneyTheme(
  template: string,
  themeHint: string
): string {
  return template
    .replace(/\[X\]/g, themeHint)
    .replace(/\[savo temą\]/gi, themeHint)
    .replace(/\[your topic\]/gi, themeHint)
    .replace(/\[įmonės \/ sektoriaus\]/gi, themeHint)
    .replace(/\[company \/ sector\]/gi, themeHint)
    .replace(/\[TAVO TEMA[^\]]*\]/gi, themeHint)
    .replace(/\[YOUR TOPIC[^\]]*\]/gi, themeHint);
}

/** Practice 93.1/93.2: theme tokens + column placeholders. */
export function applyM9PracticeTemplate(
  template: string,
  themeHint: string,
  sampleColumns?: string
): string {
  let out = applyM9JourneyTheme(template, themeHint);
  if (sampleColumns) {
    out = out
      .replace(/\[STULPELIAI\]/gi, sampleColumns)
      .replace(/\[COLUMNS\]/gi, sampleColumns);
  }
  return out;
}
