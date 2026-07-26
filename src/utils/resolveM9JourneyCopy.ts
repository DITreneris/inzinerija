/**
 * Thin M9 journey overlay resolver (separate from M7 audit surface).
 */
import journeyLt from '../data/modules-journey-m9.json';
import journeyEn from '../data/modules-journey-en-m9.json';
import {
  isM7JourneyChoiceId,
  normalizeModuleJourneyFocusId,
  type M7JourneyChoiceId,
} from './moduleJourneyFocus';

export type M9JourneySlots = {
  catalogSectorHint: string;
  sampleColumns: string;
  sampleFileLabel: string;
  kpiHint: string;
  themePlaceholder: string;
  recommendedSlideIds: number[];
};

type JourneyFile = {
  journeys: Record<string, M9JourneySlots>;
};

const LT = journeyLt as JourneyFile;
const EN = journeyEn as JourneyFile;

export function resolveM9JourneySlots(
  journeyId: string | null | undefined,
  locale: 'lt' | 'en' = 'lt'
): M9JourneySlots {
  const id = journeyId
    ? normalizeModuleJourneyFocusId(journeyId)
    : 'pardavimai';
  const key = isM7JourneyChoiceId(id) ? id : 'pardavimai';
  const pack = locale === 'en' ? EN : LT;
  return pack.journeys[key] ?? pack.journeys.pardavimai;
}

export function getM9RecommendedSlideIds(
  journeyId: string | null | undefined
): number[] {
  return resolveM9JourneySlots(journeyId, 'lt').recommendedSlideIds;
}

export type { M7JourneyChoiceId };
