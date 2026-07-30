/**
 * Deterministic palette swatches for M13 gen tools (GOLDEN §6b).
 * Preset id → hex chips; free-text (no preset) → warm neutral trio.
 */

import { CONTENT_TRACK } from '../components/slides/shared/contentTrackTokens';
import { DIAGRAM_TONE_COLORS } from '../components/slides/shared/diagramTokens';

export type VaizdoPresetId = 'ecommerce' | 'events' | 'brand' | 'social';

const PRESET_SWATCHES: Record<VaizdoPresetId, string[]> = {
  ecommerce: [
    DIAGRAM_TONE_COLORS.amber.top,
    DIAGRAM_TONE_COLORS.amber.bottom,
    CONTENT_TRACK.warmCoral,
    '#fef3c7',
  ],
  events: ['#6366f1', '#3b82f6', '#8b5cf6', '#c4b5fd'],
  brand: ['#312e81', DIAGRAM_TONE_COLORS.amber.top, '#4338ca', '#fde68a'],
  social: [
    CONTENT_TRACK.warmCoral,
    '#38bdf8',
    CONTENT_TRACK.softRoseBorder,
    '#fda4af',
  ],
};

/** Warm chips when colour field is filled without a preset */
const FREE_TEXT_SWATCHES = [
  CONTENT_TRACK.warmCoral,
  DIAGRAM_TONE_COLORS.amber.top,
  CONTENT_TRACK.softRoseBorder,
] as const;

export function getContentTrackSwatches(options: {
  presetId?: VaizdoPresetId | null;
  colorText?: string;
}): string[] {
  const { presetId, colorText } = options;
  if (presetId && PRESET_SWATCHES[presetId]) {
    return [...PRESET_SWATCHES[presetId]];
  }
  if (colorText?.trim()) {
    return [...FREE_TEXT_SWATCHES];
  }
  return [];
}

export function isVaizdoPresetId(value: string): value is VaizdoPresetId {
  return value in PRESET_SWATCHES;
}
