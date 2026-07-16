/**
 * M7 journey copy field registry (RC-1 + Tier 2 + path-step RC-4).
 * SOT: docs/development/M7_JOURNEY_COPY_REGISTRY.md
 */
import type { ContentBlockContent, SummaryContent } from '../types/modules';

export const M7_JOURNEY_MODULE_ID = 7;

/** Tier 1 slides */
export const M7_JOURNEY_TIER1_SLIDE_IDS = [731, 733, 74, 734, 75] as const;
export type M7JourneyTier1SlideId = (typeof M7_JOURNEY_TIER1_SLIDE_IDS)[number];

/** Tier 2 partial (RC-2 parity wave) */
export const M7_JOURNEY_TIER2_PARTIAL_SLIDE_IDS = [73, 732, 78, 78.5] as const;
export type M7JourneyTier2PartialSlideId =
  (typeof M7_JOURNEY_TIER2_PARTIAL_SLIDE_IDS)[number];

/** Tier 2 remaining (RC-4) */
export const M7_JOURNEY_TIER2_REMAINING_SLIDE_IDS = [
  83, 84, 86, 87, 89, 891, 90, 92,
] as const;
export type M7JourneyTier2RemainingSlideId =
  (typeof M7_JOURNEY_TIER2_REMAINING_SLIDE_IDS)[number];

/** Path-step (RC-4 M79-36) */
export const M7_JOURNEY_PATHSTEP_SLIDE_IDS = [
  71.1, 71.2, 71.3, 71.4, 71.5,
] as const;
export type M7JourneyPathStepSlideId =
  (typeof M7_JOURNEY_PATHSTEP_SLIDE_IDS)[number];

export const M7_JOURNEY_OVERLAY_SLIDE_IDS = [
  ...M7_JOURNEY_TIER1_SLIDE_IDS,
  ...M7_JOURNEY_TIER2_PARTIAL_SLIDE_IDS,
  ...M7_JOURNEY_TIER2_REMAINING_SLIDE_IDS,
  ...M7_JOURNEY_PATHSTEP_SLIDE_IDS,
] as const;

export type M7JourneyOverlaySlideId =
  (typeof M7_JOURNEY_OVERLAY_SLIDE_IDS)[number];

export const M7_JOURNEY_TIER1_FIELDS: Record<
  M7JourneyTier1SlideId,
  readonly string[]
> = {
  731: [
    'types-descriptive',
    'types-diagnostic',
    'types-predictive',
    'types-prescriptive',
  ],
  733: ['template-data', 'template-competitors', 'template-cfo'],
  74: ['master-prompt'],
  734: [
    'filter-ok-fail',
    'filter-priority',
    'filter-quick-wins',
    'filter-portfolio',
  ],
  75: ['reflection', 'first-action-24h'],
};

export const M7_JOURNEY_TIER2_PARTIAL_FIELDS: Record<
  M7JourneyTier2PartialSlideId,
  readonly string[]
> = {
  73: ['pipeline-overview'],
  732: ['sentiment-prompt'],
  78: ['di-role-prompt'],
  78.5: ['excel-clean-prompt'],
};

export const M7_JOURNEY_TIER2_REMAINING_FIELDS: Record<
  M7JourneyTier2RemainingSlideId,
  readonly string[]
> = {
  83: ['role-activation'],
  84: ['db-structure'],
  86: ['viz-prompt'],
  87: ['forecast-prompt'],
  89: ['algo-sources'],
  891: ['prep-clean'],
  90: ['eda-stats'],
  92: ['bi-plan'],
};

export const M7_JOURNEY_PATHSTEP_FIELDS: Record<
  M7JourneyPathStepSlideId,
  readonly string[]
> = {
  71.1: ['step-task'],
  71.2: ['step-task'],
  71.3: ['step-task'],
  71.4: ['step-task'],
  71.5: ['step-task'],
};

/** content-block: fieldKey → sections[] index */
export const M7_CONTENT_BLOCK_FIELD_INDICES: Partial<
  Record<M7JourneyOverlaySlideId, Record<string, number>>
> = {
  731: {
    'types-descriptive': 3,
    'types-diagnostic': 4,
    'types-predictive': 5,
    'types-prescriptive': 6,
  },
  733: {
    'template-data': 2,
    'template-competitors': 3,
    'template-cfo': 4,
  },
  74: {
    'master-prompt': 4,
  },
  734: {
    'filter-ok-fail': 3,
    'filter-priority': 4,
    'filter-quick-wins': 5,
    'filter-portfolio': 6,
  },
  73: {
    'pipeline-overview': 3,
  },
  732: {
    'sentiment-prompt': 2,
  },
  78: {
    'di-role-prompt': 3,
  },
  78.5: {
    'excel-clean-prompt': 2,
  },
  83: { 'role-activation': 2 },
  84: { 'db-structure': 3 },
  86: { 'viz-prompt': 2 },
  87: { 'forecast-prompt': 2 },
  89: { 'algo-sources': 3 },
  891: { 'prep-clean': 2 },
  90: { 'eda-stats': 2 },
  92: { 'bi-plan': 2 },
};

/** path-step: fieldKey → sections[] index */
export const M7_PATHSTEP_FIELD_INDICES: Record<
  M7JourneyPathStepSlideId,
  Record<string, number>
> = {
  71.1: { 'step-task': 0 },
  71.2: { 'step-task': 0 },
  71.3: { 'step-task': 0 },
  71.4: { 'step-task': 0 },
  71.5: { 'step-task': 0 },
};

export type M7JourneyOverlayFields = Record<
  string,
  Record<string, Record<string, string>>
>;

export interface M7JourneyOverlayData {
  moduleId: number;
  version: number;
  locale?: JourneyLocale;
  fields: M7JourneyOverlayFields;
}

export type JourneyLocale = 'lt' | 'en';

export function isM7JourneyTier1Slide(
  slideId: number
): slideId is M7JourneyTier1SlideId {
  return (M7_JOURNEY_TIER1_SLIDE_IDS as readonly number[]).includes(slideId);
}

export function isM7JourneyPathStepSlide(
  slideId: number
): slideId is M7JourneyPathStepSlideId {
  return (M7_JOURNEY_PATHSTEP_SLIDE_IDS as readonly number[]).includes(slideId);
}

export function isM7JourneyOverlaySlide(
  slideId: number
): slideId is M7JourneyOverlaySlideId {
  return (M7_JOURNEY_OVERLAY_SLIDE_IDS as readonly number[]).includes(slideId);
}

export function getOverlayFieldKeys(slideId: number): readonly string[] {
  if (isM7JourneyTier1Slide(slideId)) {
    return M7_JOURNEY_TIER1_FIELDS[slideId];
  }
  if (
    (M7_JOURNEY_TIER2_PARTIAL_SLIDE_IDS as readonly number[]).includes(slideId)
  ) {
    return M7_JOURNEY_TIER2_PARTIAL_FIELDS[
      slideId as M7JourneyTier2PartialSlideId
    ];
  }
  if (
    (M7_JOURNEY_TIER2_REMAINING_SLIDE_IDS as readonly number[]).includes(
      slideId
    )
  ) {
    return M7_JOURNEY_TIER2_REMAINING_FIELDS[
      slideId as M7JourneyTier2RemainingSlideId
    ];
  }
  if (isM7JourneyPathStepSlide(slideId)) {
    return M7_JOURNEY_PATHSTEP_FIELDS[slideId];
  }
  return [];
}

/** @deprecated use getOverlayFieldKeys */
export function getTier1FieldKeys(slideId: number): readonly string[] {
  if (!isM7JourneyTier1Slide(slideId)) return [];
  return M7_JOURNEY_TIER1_FIELDS[slideId];
}

export function getContentBlockBaseCopyable(
  content: ContentBlockContent,
  slideId: M7JourneyOverlaySlideId,
  fieldKey: string
): string | undefined {
  const indices = M7_CONTENT_BLOCK_FIELD_INDICES[slideId];
  const sectionIndex = indices?.[fieldKey];
  if (sectionIndex === undefined) return undefined;
  return content.sections?.[sectionIndex]?.copyable;
}

export function getSummaryBaseField(
  content: SummaryContent,
  fieldKey: string
): string | undefined {
  if (fieldKey === 'reflection') return content.reflectionPrompt;
  if (fieldKey === 'first-action-24h') return content.firstAction24h;
  return undefined;
}

/** Audit registry: slideId → fieldKeys for coverage gate */
export const M7_JOURNEY_COVERAGE_REGISTRY: Record<string, readonly string[]> = {
  ...Object.fromEntries(
    Object.entries(M7_JOURNEY_TIER1_FIELDS).map(([id, keys]) => [id, keys])
  ),
  ...Object.fromEntries(
    Object.entries(M7_JOURNEY_TIER2_PARTIAL_FIELDS).map(([id, keys]) => [
      id,
      keys,
    ])
  ),
  ...Object.fromEntries(
    Object.entries(M7_JOURNEY_TIER2_REMAINING_FIELDS).map(([id, keys]) => [
      id,
      keys,
    ])
  ),
  ...Object.fromEntries(
    Object.entries(M7_JOURNEY_PATHSTEP_FIELDS).map(([id, keys]) => [id, keys])
  ),
};
