/**
 * Slide phase configuration for module progress bars.
 * SOT: MODULIO_4_SKAIDRIU_EILES, MODULIO_10_SKAIDRIU_EILES, MODULIO_13_SKAIDRIU_EILES,
 * turinio_pletra_moduliai_4_5_6.md §4.
 */

export type PhaseLocale = 'lt' | 'en';

export interface SlideGroup {
  label: string;
  startIdx: number;
  endIdx: number; // inclusive
}

/** LT → EN phase label mapping (keys match i18n `module.phase*` values). */
const phaseLabelsEn: Record<string, string> = {
  'Pagrindai': 'Basics',
  'Šablonas': 'Template',
  '6 Blokai': '6 Blocks',
  'Santrauka': 'Summary',
  'Įvadas': 'Intro',
  'Teorija': 'Theory',
  'RAG': 'RAG',
  'Deep research': 'Deep research',
  'Tokenai': 'Tokens',
  'Manipuliacijos': 'Manipulations',
  'Skyrius': 'Section',
  'Kelionė': 'Journey',
  'Kelias': 'Journey',
  'Savitikra': 'Self-check',
  'Testas': 'Test',
  'Praktika': 'Practice',
  'Sprintas': 'Sprint',
  'Pagalba': 'Help',
  'Projektas': 'Project',
  'COMBO ir HTML': 'COMBO & HTML',
  'SUPER': 'SUPER',
  'Refleksija': 'Reflection',
  'Duomenų tvarkymas': 'Data handling',
  'Custom GPT': 'Custom GPT',
  'Vaizdai': 'Images',
  'Video': 'Video',
  'Muzika': 'Music',
  'Verslas': 'Business',
  'Kita': 'Other',
};

function localizePhase(label: string, locale: PhaseLocale): string {
  if (locale === 'en') return phaseLabelsEn[label] ?? label;
  return label;
}

/** Phase label by module and slide id/type. Used for progress bar grouping. */
export function getPhaseLabel(
  moduleId: number,
  slideId?: number,
  slideType?: string,
  locale: PhaseLocale = 'lt'
): string {
  // Module 4: Įvadas / RAG / Deep research / Tokenai / Manipuliacijos / Santrauka (MODULIO_4_SKAIDRIU_EILES, section-breaks 40.5, 65.8)
  if (moduleId === 4) {
    let lt = 'Teorija';
    if (slideId != null) {
      if (slideId < 42) lt = 'Įvadas';
      else if (slideId >= 42 && slideId < 64) lt = 'RAG';
      else if (slideId >= 64 && slideId <= 65.8) lt = 'Deep research';
      else if (slideId >= 66 && slideId <= 66.6) lt = 'Tokenai';
      else if (slideId >= 67 && slideId < 70) lt = 'Manipuliacijos';
      else if (slideId === 70) lt = 'Santrauka';
    }
    return localizePhase(lt, locale);
  }

  // Module 6: Įvadas → Projektas → COMBO/HTML → SUPER → Refleksija → Duomenų tvarkymas → Custom GPT (turinio_pletra_moduliai_4_5_6.md §4)
  if (moduleId === 6) {
    let lt = 'Praktika';
    if (slideId != null) {
      if (slideId === 60) lt = 'Įvadas';
      else if (slideId === 61) lt = 'Projektas';
      else if (slideId === 62 || slideId === 67.8 || slideId === 68) lt = 'COMBO ir HTML';
      else if (slideId === 63) lt = 'SUPER';
      else if (slideId === 65) lt = 'Refleksija';
      else if (slideId === 64) lt = 'Duomenų tvarkymas';
      else if (slideId === 66 || slideId === 67) lt = 'Custom GPT';
    }
    return localizePhase(lt, locale);
  }

  // Module 10: Įvadas → Kelias → Teorija → Santrauka (MODULIO_10_SKAIDRIU_EILES)
  if (moduleId === 10) {
    let lt = 'Teorija';
    if (slideId != null) {
      if (slideId === 100) lt = 'Įvadas';
      else if (slideId === 10.1) lt = 'Kelias';
      else if (slideId === 10.8) lt = 'Santrauka';
    }
    return localizePhase(lt, locale);
  }

  // Module 13: Įvadas → Vaizdai → Video → Muzika → Verslas → Santrauka (MODULIO_13_SKAIDRIU_EILES)
  if (moduleId === 13) {
    let lt = 'Vaizdai';
    if (slideId != null) {
      if (slideId === 130) lt = 'Įvadas';
      else if (slideId === 13.36 || slideId === 13.4 || slideId === 13.5) lt = 'Video';
      else if (slideId === 13.56 || slideId === 13.6 || slideId === 13.7) lt = 'Muzika';
      else if (slideId === 13.10 || slideId === 13.11) lt = 'Verslas';
      else if (slideId === 13.8 || slideId === 13.9) lt = 'Santrauka';
    }
    return localizePhase(lt, locale);
  }

  // Module 11, 14 – testas; 12, 15 – praktika (single-phase modules, label from type)
  if (moduleId === 11 || moduleId === 14) return localizePhase('Testas', locale);
  if (moduleId === 12 || moduleId === 15) return localizePhase('Praktika', locale);

  // Module 5: fixed three groups (Sprintas, Pagalba, Testas) – handled in buildSlideGroups only
  // Generic: by slide type (Module 1 and similar)
  const typeToPhase: Record<string, string> = {
    'action-intro': 'Pagrindai',
    'action-intro-journey': 'Kelionė',
    'intro': 'Pagrindai',
    'infographic': 'Pagrindai',
    'definitions': 'Pagrindai',
    'workflow-summary': 'Pagrindai',
    'prompt-types': 'Pagrindai',
    'prompt-techniques': 'Pagrindai',
    'prompt-template': 'Šablonas',
    'transition-3-to-6': 'Šablonas',
    'hierarchy': '6 Blokai',
    'meta': '6 Blokai',
    'input': '6 Blokai',
    'output': '6 Blokai',
    'reasoning-models': '6 Blokai',
    'reasoning': '6 Blokai',
    'quality': '6 Blokai',
    'advanced': '6 Blokai',
    'advanced-2': '6 Blokai',
    'full-example': 'Santrauka',
    'comparison': 'Santrauka',
    'glossary': 'Santrauka',
    'summary': 'Santrauka',
    'module-intro': 'Įvadas',
    'section-break': 'Skyrius',
    'path-step': 'Kelias',
    'content-block': 'Teorija',
    'evaluator-prompt-block': 'Teorija',
    'hallucination-dashboard': 'Teorija',
    'di-modalities': 'Teorija',
    'pie-chart': 'Teorija',
    'intro-action-pie': 'Teorija',
    'ai-workflow': 'Teorija',
    'ai-detectors': 'Teorija',
    'warm-up-quiz': 'Savitikra',
    'test-intro': 'Testas',
    'test-section': 'Testas',
    'test-results': 'Testas',
    'practice-intro': 'Praktika',
    'practice-scenario': 'Praktika',
    'practice-summary': 'Praktika',
  };
  const lt = typeToPhase[slideType ?? ''] ?? 'Kita';
  return localizePhase(lt, locale);
}

/**
 * Build slide groups for progress bar. Module-specific phases (4, 6, 10, 13) use slide id;
 * Module 5 uses fixed segments; 11/12/14/15 single group; others by slide type.
 */
export function buildSlideGroups(
  slides: { type: string; id?: number }[],
  moduleId?: number,
  locale: PhaseLocale = 'lt'
): SlideGroup[] {
  const l = (label: string) => localizePhase(label, locale);

  // Module 5: intro + Sprintas (47, 510) → Pagalba (515) → Testas (511–514)
  if (moduleId === 5 && slides.length >= 8) {
    return [
      { label: l('Sprintas'), startIdx: 0, endIdx: 2 },
      { label: l('Pagalba'), startIdx: 3, endIdx: 3 },
      { label: l('Testas'), startIdx: 4, endIdx: slides.length - 1 },
    ];
  }
  // Module 11, 12, 14, 15 – single phase
  if (moduleId === 11 && slides.length >= 1) {
    return [{ label: l('Testas'), startIdx: 0, endIdx: slides.length - 1 }];
  }
  if (moduleId === 12 && slides.length >= 1) {
    return [{ label: l('Praktika'), startIdx: 0, endIdx: slides.length - 1 }];
  }
  if (moduleId === 14 && slides.length >= 1) {
    return [{ label: l('Testas'), startIdx: 0, endIdx: slides.length - 1 }];
  }
  if (moduleId === 15 && slides.length >= 1) {
    return [{ label: l('Praktika'), startIdx: 0, endIdx: slides.length - 1 }];
  }
  if (slides.length <= 6) {
    return [{ label: '', startIdx: 0, endIdx: slides.length - 1 }];
  }

  // Modules 4, 6, 10, 13: group by phase from slide id; others by slide type
  const groups: SlideGroup[] = [];
  let current: SlideGroup | null = null;
  const mid = moduleId ?? 0;

  slides.forEach((s, idx) => {
    const phase =
      (mid === 4 || mid === 6 || mid === 10 || mid === 13)
        ? getPhaseLabel(mid, s.id, undefined, locale)
        : getPhaseLabel(mid, s.id, s.type, locale);
    if (!current || current.label !== phase) {
      if (current) groups.push(current);
      current = { label: phase, startIdx: idx, endIdx: idx };
    } else {
      current.endIdx = idx;
    }
  });
  if (current) groups.push(current);
  return groups;
}
