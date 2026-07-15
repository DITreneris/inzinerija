/** Geometry SOT for M4 sk. 53.5 editorial beat SVG diagrams (SCHEME_AGENT model). */

export const BEAT_VIEW_W = 560;
export const BEAT_VIEW_H = 315;

/** Awareness-gap bar compare – row geometry SOT */
export const AWARENESS_ROW = {
  padX: 20,
  padTop: 16,
  padBottom: 12,
  labelLine: 14,
  captionLine: 12,
  gapLabelCaption: 4,
  gapCaptionBar: 6,
  barH: 10,
  rowGap: 20,
  gapBeforeHero: 18,
  gapHeroLine: 22,
  barTrackW: 520,
  labelSize: 12,
  pctSize: 15,
  captionSize: 12,
} as const;

export function awarenessRowBlockHeight(): number {
  const r = AWARENESS_ROW;
  return (
    r.labelLine + r.gapLabelCaption + r.captionLine + r.gapCaptionBar + r.barH
  );
}

/** Top Y of row block (label baseline offset applied in view) */
export function awarenessRowY(index: number): number {
  const r = AWARENESS_ROW;
  return r.padTop + index * (awarenessRowBlockHeight() + r.rowGap);
}

export interface AwarenessRowLayout {
  labelY: number;
  captionY: number;
  barY: number;
}

export function awarenessRowLayout(index: number): AwarenessRowLayout {
  const y = awarenessRowY(index);
  const r = AWARENESS_ROW;
  const labelY = y + r.labelLine;
  const captionY = y + r.labelLine + r.gapLabelCaption + r.captionLine;
  const barY =
    y + r.labelLine + r.gapLabelCaption + r.captionLine + r.gapCaptionBar;
  return { labelY, captionY, barY };
}

export function awarenessGapHeroY(): number {
  return (
    awarenessRowY(1) + awarenessRowBlockHeight() + AWARENESS_ROW.gapBeforeHero
  );
}

export function awarenessViewHeight(): number {
  return (
    awarenessGapHeroY() + AWARENESS_ROW.gapHeroLine + AWARENESS_ROW.padBottom
  );
}

/** @deprecated use awarenessViewHeight() */
export const AWARENESS_VIEW_H = awarenessViewHeight();

/** Stat ribbon (lithuania-context) */
export const STAT_HERO_X = 280;
export const STAT_HERO_W = 256;
export const STAT_HERO_H = 240;
export const STAT_HERO_PANEL_X = 24;
export const STAT_COMPARE_DIVIDER_Y = 168;

export { PORTAL_BEAT_COLORS } from '../../shared/diagramTokens';

/** Tailwind fill classes for beat SVG text/tracks — dark-mode aware (view layer). */
export const PORTAL_BEAT_SVG = {
  label: 'fill-gray-900 dark:fill-gray-100',
  caption: 'fill-gray-600 dark:fill-gray-300',
  gapSuffix: 'fill-gray-500 dark:fill-gray-300',
  track: 'fill-gray-200 dark:fill-gray-700',
} as const;
