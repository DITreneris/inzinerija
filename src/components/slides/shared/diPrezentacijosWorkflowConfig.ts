/**
 * DI prezentacijos workflow – diagramos ir bloko tekstai (title, steps) LT/EN.
 */

export type Locale = 'lt' | 'en';

export interface DiPrezentacijosStepItem {
  label: string;
  desc: string;
}

const STEPS_LT: DiPrezentacijosStepItem[] = [
  { label: 'Tikslas', desc: 'Nustatyk auditoriją' },
  { label: 'Struktūra', desc: 'Sudėliok karkasą' },
  { label: 'Turinys', desc: 'Generuok tekstą' },
  { label: 'Vizualas', desc: 'Dėliok layout' },
  { label: 'Poliravimas', desc: 'Sutvarkyk CTA' },
];

const STEPS_EN: DiPrezentacijosStepItem[] = [
  { label: 'Goal', desc: 'Set the audience' },
  { label: 'Structure', desc: 'Build the outline' },
  { label: 'Content', desc: 'Generate the text' },
  { label: 'Visuals', desc: 'Shape the layout' },
  { label: 'Polish', desc: 'Tighten the CTA' },
];

export function getDiPrezentacijosSteps(
  locale: Locale
): DiPrezentacijosStepItem[] {
  return locale === 'en' ? STEPS_EN : STEPS_LT;
}

export interface DiPrezentacijosDiagramContent {
  title: string;
  ariaLabel: string;
  interactiveHint: string;
  stepAria: (index: number, label: string) => string;
}

const DIAGRAM_LT: DiPrezentacijosDiagramContent = {
  title: 'Prezentacijos eiga',
  ariaLabel: 'DI prezentacijos workflow, penki žingsniai.',
  interactiveHint: ' Paspausk žingsnį, kad pamatytum paaiškinimą.',
  stepAria: (i, label) => `Žingsnis ${i + 1}: ${label}. Paspausk paaiškinimui.`,
};

const DIAGRAM_EN: DiPrezentacijosDiagramContent = {
  title: 'Presentation path',
  ariaLabel: 'LLM presentation workflow, five steps.',
  interactiveHint: ' Click a step to see the explanation.',
  stepAria: (i, label) => `Step ${i + 1}: ${label}. Click for explanation.`,
};

export function getDiPrezentacijosDiagramContent(
  locale: Locale
): DiPrezentacijosDiagramContent {
  return locale === 'en' ? DIAGRAM_EN : DIAGRAM_LT;
}

export interface DiPrezentacijosBlockLabels {
  regionAria: string;
  youAreHere: string;
  stepOf: (n: number, total: number) => string;
  clickHint: string;
  navAria: string;
  stepAria: (index: number, title: string) => string;
  enlargeLabel: string;
}

const BLOCK_LT: DiPrezentacijosBlockLabels = {
  regionAria: 'DI prezentacijos workflow',
  youAreHere: 'Tu esi čia:',
  stepOf: (n, total) => `Žingsnis ${n} iš ${total}`,
  clickHint:
    'Paspausk žingsnį diagramoje arba skaičių 1–5 – paaiškinimas rodomas apačioje.',
  navAria: 'Žingsnių pasirinkimas',
  stepAria: (i, title) => `Žingsnis ${i + 1}: ${title}`,
  enlargeLabel: 'Modulis 5 – DI prezentacijos workflow',
};

const BLOCK_EN: DiPrezentacijosBlockLabels = {
  regionAria: 'LLM presentation workflow',
  youAreHere: 'You are here:',
  stepOf: (n, total) => `Step ${n} of ${total}`,
  clickHint:
    'Click a step in the diagram or number 1–5 – explanation shown below.',
  navAria: 'Step selection',
  stepAria: (i, title) => `Step ${i + 1}: ${title}`,
  enlargeLabel: 'Module 5 – LLM presentation workflow',
};

export function getDiPrezentacijosBlockLabels(
  locale: Locale
): DiPrezentacijosBlockLabels {
  return locale === 'en' ? BLOCK_EN : BLOCK_LT;
}
