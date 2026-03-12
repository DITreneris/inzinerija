/**
 * DI prezentacijos workflow – diagramos ir bloko tekstai (title, subtitle, steps) LT/EN.
 */

export type Locale = 'lt' | 'en';

export interface DiPrezentacijosStepItem {
  label: string;
  desc: string;
}

const STEPS_LT: DiPrezentacijosStepItem[] = [
  { label: 'TIKSLAS', desc: 'Kam ir kokia auditorija' },
  { label: 'STRUKTŪRA', desc: '8 skaidrių karkasas' },
  { label: 'TURINIO GENERAVIMAS', desc: 'Tekstas ir idėjos su DI' },
  { label: 'VIZUALIZACIJA', desc: 'Layout ir grafikai' },
  { label: 'POLIRAVIMAS', desc: 'CTA, aiškumas, paprastumas' },
];

const STEPS_EN: DiPrezentacijosStepItem[] = [
  { label: 'GOAL', desc: 'Who and what audience' },
  { label: 'STRUCTURE', desc: '8-slide framework' },
  { label: 'CONTENT GENERATION', desc: 'Text and ideas with LLM' },
  { label: 'VISUALISATION', desc: 'Layout and graphics' },
  { label: 'POLISH', desc: 'CTA, clarity, simplicity' },
];

export function getDiPrezentacijosSteps(locale: Locale): DiPrezentacijosStepItem[] {
  return locale === 'en' ? STEPS_EN : STEPS_LT;
}

export interface DiPrezentacijosDiagramContent {
  title: string;
  subtitle: string;
  ariaLabel: string;
  interactiveHint: string;
  stepAria: (index: number, label: string) => string;
}

const DIAGRAM_LT: DiPrezentacijosDiagramContent = {
  title: 'DI prezentacijos workflow',
  subtitle: 'Paspausk žingsnį – paaiškinimas apačioje',
  ariaLabel: 'DI prezentacijos workflow.',
  interactiveHint: ' Paspausk žingsnį, kad pamatytum paaiškinimą.',
  stepAria: (i, label) => `Žingsnis ${i + 1}: ${label}. Paspausk paaiškinimui.`,
};

const DIAGRAM_EN: DiPrezentacijosDiagramContent = {
  title: 'LLM presentation workflow',
  subtitle: 'Click a step – explanation below',
  ariaLabel: 'LLM presentation workflow.',
  interactiveHint: ' Click a step to see the explanation.',
  stepAria: (i, label) => `Step ${i + 1}: ${label}. Click for explanation.`,
};

export function getDiPrezentacijosDiagramContent(locale: Locale): DiPrezentacijosDiagramContent {
  return locale === 'en' ? DIAGRAM_EN : DIAGRAM_LT;
}

export interface DiPrezentacijosBlockLabels {
  regionAria: string;
  youAreHere: string;
  navAria: string;
  stepAria: (index: number, title: string) => string;
}

const BLOCK_LT: DiPrezentacijosBlockLabels = {
  regionAria: 'DI prezentacijos workflow',
  youAreHere: 'Tu esi čia:',
  navAria: 'Žingsnių pasirinkimas',
  stepAria: (i, title) => `Žingsnis ${i + 1}: ${title}`,
};

const BLOCK_EN: DiPrezentacijosBlockLabels = {
  regionAria: 'LLM presentation workflow',
  youAreHere: 'You are here:',
  navAria: 'Step selection',
  stepAria: (i, title) => `Step ${i + 1}: ${title}`,
};

export function getDiPrezentacijosBlockLabels(locale: Locale): DiPrezentacijosBlockLabels {
  return locale === 'en' ? BLOCK_EN : BLOCK_LT;
}
