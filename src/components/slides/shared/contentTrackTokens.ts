/**
 * Content-track (M13–15) visual tokens — GOLDEN §6b.
 * Soft rose wash + warm stage colors; step fills stay DiagramTone (brand/slate/amber/emerald).
 */

import type { ModuleAccent } from '../../../types/modules';
import { DIAGRAM_TONE_COLORS, DIAGRAM_TONE_COLORS_DARK } from './diagramTokens';

export type ContentTrackColors = {
  softRose: string;
  softRoseBorder: string;
  warmCoral: string;
  stageAmber: string;
  stageEmerald: string;
  mutedDrift: string;
  vibrantLock: string;
  /** Readable ink on soft / muted panels */
  inkOnSoft: string;
};

const CONTENT_TRACK_LIGHT: ContentTrackColors = {
  softRose: '#fff1f2',
  softRoseBorder: '#fecdd3',
  warmCoral: '#fb7185',
  stageAmber: DIAGRAM_TONE_COLORS.amber.soft,
  stageEmerald: DIAGRAM_TONE_COLORS.emerald.soft,
  mutedDrift: '#e2e8f0',
  vibrantLock: '#ffe4e6',
  inkOnSoft: '#881337',
};

const CONTENT_TRACK_DARK: ContentTrackColors = {
  softRose: '#3f1d2e',
  softRoseBorder: '#9f1239',
  warmCoral: '#fb7185',
  stageAmber: DIAGRAM_TONE_COLORS_DARK.amber.soft,
  stageEmerald: DIAGRAM_TONE_COLORS_DARK.emerald.soft,
  mutedDrift: '#334155',
  vibrantLock: '#4c0519',
  inkOnSoft: '#fecdd3',
};

export const CONTENT_TRACK = CONTENT_TRACK_LIGHT;

export function getContentTrackColors(isDark: boolean): ContentTrackColors {
  return isDark ? CONTENT_TRACK_DARK : CONTENT_TRACK_LIGHT;
}

export function isContentTrackAccent(
  accent: ModuleAccent | null | undefined
): boolean {
  return accent === 'rose';
}
