/**
 * M7 journey overlay resolver (Lygis C).
 * Fallback: activeJourneyId → pardavimai overlay → merged slide base value.
 * Locale: lt → modules-journey-m7.json; en → modules-journey-en-m7.json.
 */
import journeyOverlayLt from '../data/modules-journey-m7.json';
import journeyOverlayEn from '../data/modules-journey-en-m7.json';
import {
  getOverlayFieldKeys,
  isM7JourneyOverlaySlide,
  isM7JourneyPathStepSlide,
  isM7JourneyTier1Slide,
  M7_CONTENT_BLOCK_FIELD_INDICES,
  M7_JOURNEY_MODULE_ID,
  M7_PATHSTEP_FIELD_INDICES,
  type JourneyLocale,
  type M7JourneyOverlayData,
  type M7JourneyOverlaySlideId,
  type M7JourneyPathStepSlideId,
} from '../data/m7JourneyCopyRegistry';
import {
  normalizeModuleJourneyFocusId,
  type M7JourneyChoiceId,
} from './moduleJourneyFocus';
import type {
  ContentBlockContent,
  PathStepContent,
  SummaryContent,
} from '../types/modules';

const overlayByLocale: Record<JourneyLocale, M7JourneyOverlayData> = {
  lt: journeyOverlayLt as M7JourneyOverlayData,
  en: journeyOverlayEn as M7JourneyOverlayData,
};

const FALLBACK_JOURNEY_ID: M7JourneyChoiceId = 'pardavimai';

function normalizeJourneyId(
  journeyId: string | null | undefined
): M7JourneyChoiceId | null {
  if (!journeyId) return null;
  const normalized = normalizeModuleJourneyFocusId(journeyId);
  return normalized as M7JourneyChoiceId;
}

function getOverlayData(locale: JourneyLocale): M7JourneyOverlayData {
  return overlayByLocale[locale] ?? overlayByLocale.lt;
}

function getOverlayValue(
  locale: JourneyLocale,
  slideId: number,
  fieldKey: string,
  journeyId: M7JourneyChoiceId | null
): string | undefined {
  const overlay = getOverlayData(locale);
  const slideFields = overlay.fields[String(slideId)];
  if (!slideFields) return undefined;
  const fieldVariants = slideFields[fieldKey];
  if (!fieldVariants) return undefined;

  if (journeyId && fieldVariants[journeyId]) {
    return fieldVariants[journeyId];
  }
  if (fieldVariants[FALLBACK_JOURNEY_ID]) {
    return fieldVariants[FALLBACK_JOURNEY_ID];
  }
  return undefined;
}

export function resolveJourneyFieldValue(
  slideId: number,
  fieldKey: string,
  journeyId: string | null | undefined,
  baseValue: string | undefined,
  locale: JourneyLocale = 'lt'
): string | undefined {
  if (!baseValue?.trim()) return baseValue;
  if (!journeyId) return baseValue;

  const normalized = normalizeJourneyId(journeyId);
  const overlayValue = getOverlayValue(locale, slideId, fieldKey, normalized);
  if (overlayValue?.trim()) return overlayValue;
  return baseValue;
}

export function applyJourneyOverlayToContentBlock(
  slideId: number,
  content: ContentBlockContent,
  moduleId: number,
  journeyId: string | null | undefined,
  locale: JourneyLocale = 'lt'
): ContentBlockContent {
  if (moduleId !== M7_JOURNEY_MODULE_ID || !isM7JourneyOverlaySlide(slideId)) {
    return content;
  }

  const fieldKeys = getOverlayFieldKeys(slideId);
  if (fieldKeys.length === 0) return content;

  const indices =
    M7_CONTENT_BLOCK_FIELD_INDICES[slideId as M7JourneyOverlaySlideId];
  if (!indices) return content;

  const sections = [...(content.sections ?? [])];
  let changed = false;

  for (const fieldKey of fieldKeys) {
    const sectionIndex = indices[fieldKey];
    if (sectionIndex === undefined) continue;
    const section = sections[sectionIndex];
    if (!section?.copyable) continue;

    const resolved = resolveJourneyFieldValue(
      slideId,
      fieldKey,
      journeyId,
      section.copyable,
      locale
    );
    if (resolved && resolved !== section.copyable) {
      sections[sectionIndex] = { ...section, copyable: resolved };
      changed = true;
    }
  }

  return changed ? { ...content, sections } : content;
}

export function applyJourneyOverlayToPathStep(
  slideId: number,
  content: PathStepContent,
  moduleId: number,
  journeyId: string | null | undefined,
  locale: JourneyLocale = 'lt'
): PathStepContent {
  if (moduleId !== M7_JOURNEY_MODULE_ID || !isM7JourneyPathStepSlide(slideId)) {
    return content;
  }

  const fieldKeys = getOverlayFieldKeys(slideId);
  if (fieldKeys.length === 0) return content;

  const indices =
    M7_PATHSTEP_FIELD_INDICES[slideId as M7JourneyPathStepSlideId];
  if (!indices) return content;

  const sections = [...(content.sections ?? [])];
  let changed = false;

  for (const fieldKey of fieldKeys) {
    const sectionIndex = indices[fieldKey];
    if (sectionIndex === undefined) continue;
    const section = sections[sectionIndex];
    if (!section?.copyable) continue;

    const resolved = resolveJourneyFieldValue(
      slideId,
      fieldKey,
      journeyId,
      section.copyable,
      locale
    );
    if (resolved && resolved !== section.copyable) {
      sections[sectionIndex] = { ...section, copyable: resolved };
      changed = true;
    }
  }

  return changed ? { ...content, sections } : content;
}

export function applyJourneyOverlayToSummary(
  slideId: number,
  content: SummaryContent,
  moduleId: number,
  journeyId: string | null | undefined,
  locale: JourneyLocale = 'lt'
): SummaryContent {
  if (
    moduleId !== M7_JOURNEY_MODULE_ID ||
    slideId !== 75 ||
    !isM7JourneyTier1Slide(slideId)
  ) {
    return content;
  }

  const reflection = resolveJourneyFieldValue(
    slideId,
    'reflection',
    journeyId,
    content.reflectionPrompt,
    locale
  );
  const firstAction = resolveJourneyFieldValue(
    slideId,
    'first-action-24h',
    journeyId,
    content.firstAction24h,
    locale
  );

  if (
    reflection === content.reflectionPrompt &&
    firstAction === content.firstAction24h
  ) {
    return content;
  }

  return {
    ...content,
    ...(reflection !== content.reflectionPrompt
      ? { reflectionPrompt: reflection }
      : {}),
    ...(firstAction !== content.firstAction24h
      ? { firstAction24h: firstAction }
      : {}),
  };
}

/** Exported for tests */
export function getOverlayFieldForTest(
  slideId: number,
  fieldKey: string,
  journeyId: string,
  locale: JourneyLocale = 'lt'
): string | undefined {
  return getOverlayValue(
    locale,
    slideId,
    fieldKey,
    normalizeJourneyId(journeyId)
  );
}

export {
  getContentBlockBaseCopyable,
  getSummaryBaseField,
} from '../data/m7JourneyCopyRegistry';
