/**
 * M13–15 per-step DiagramTone maps — GOLDEN §6b / DIAGRAMU_M13_M15_REGISTRY.
 * SoftRose bg is applied separately via getContentTrackColors.
 */

import type { DiagramTone } from './diagramTokens';

/** Awareness → Engagement → Conversion */
export const M13_AEC_TONES: DiagramTone[] = ['brand', 'amber', 'emerald'];

/** Top → bottom (obj → ctx → est): amber, brand, slate (= bottom→top slate, brand, amber) */
export const M13_PROMPT_STACK_TONES: DiagramTone[] = [
  'amber',
  'brand',
  'slate',
];

/** Brief → Kadrai → Refs → I2V → Garsas → Patikra */
export const M13_MEDIA_PIPELINE_TONES: DiagramTone[] = [
  'brand',
  'slate',
  'amber',
  'amber',
  'slate',
  'emerald',
];

/** Brief → Prompt → Variantai → Iteracija → Adaptacija → Test → Opt */
export const M13_TURINIO_WORKFLOW_TONES: DiagramTone[] = [
  'brand',
  'amber',
  'amber',
  'slate',
  'slate',
  'emerald',
  'emerald',
];

/** Refs → Rule → Generate → QA */
export const M13_CONSISTENCY_LOCK_TONES: DiagramTone[] = [
  'amber',
  'brand',
  'amber',
  'emerald',
];

/** Cut → Grade → Mix → Export */
export const M13_POSTPROD_TONES: DiagramTone[] = [
  'brand',
  'amber',
  'slate',
  'emerald',
];

export const CONTENT_TRACK_TONE_SET = new Set<DiagramTone>([
  'brand',
  'slate',
  'amber',
  'emerald',
]);
