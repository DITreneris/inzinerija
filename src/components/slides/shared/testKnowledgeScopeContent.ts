/**
 * Path Test intro – topic bubbles + deep-link targets (M8 / M11 / M14).
 * SOT for TestKnowledgeScopeDiagram + remediation chip alignment (M79-S2b).
 */
import type { M10Locale } from './m10DiagramContent';

export type TestKnowledgeBubble = {
  x: number;
  y: number;
  w: number;
  labelLt: string;
  labelEn: string;
  targetModuleId: number;
  slideId: number;
};

/** M8 → M7 theory map. Valymas=891, Seka=89 (unique; was both 891). */
export const TEST_SCOPE_BUBBLES_M8: TestKnowledgeBubble[] = [
  {
    x: 16,
    y: 36,
    w: 92,
    labelLt: 'Pipeline',
    labelEn: 'Pipeline',
    targetModuleId: 7,
    slideId: 73,
  },
  {
    x: 112,
    y: 36,
    w: 88,
    labelLt: 'BI / ataskaita',
    labelEn: 'BI / report',
    targetModuleId: 7,
    slideId: 92,
  },
  {
    x: 204,
    y: 36,
    w: 86,
    labelLt: 'MASTER',
    labelEn: 'MASTER',
    targetModuleId: 7,
    slideId: 74,
  },
  {
    x: 294,
    y: 36,
    w: 100,
    labelLt: 'Sentimentas',
    labelEn: 'Sentiment',
    targetModuleId: 7,
    slideId: 732,
  },
  {
    x: 398,
    y: 36,
    w: 100,
    labelLt: '4 tipai',
    labelEn: '4 types',
    targetModuleId: 7,
    slideId: 731,
  },
  {
    x: 70,
    y: 88,
    w: 100,
    labelLt: 'Valymas',
    labelEn: 'Cleaning',
    targetModuleId: 7,
    slideId: 891,
  },
  {
    x: 176,
    y: 88,
    w: 100,
    labelLt: 'Vizualizacija',
    labelEn: 'Visualization',
    targetModuleId: 7,
    slideId: 86,
  },
  {
    x: 282,
    y: 88,
    w: 110,
    labelLt: 'Seka',
    labelEn: 'Workflow',
    targetModuleId: 7,
    slideId: 89,
  },
  {
    x: 396,
    y: 88,
    w: 100,
    labelLt: 'Verslo OUTPUT',
    labelEn: 'Business OUTPUT',
    targetModuleId: 7,
    slideId: 733,
  },
];

export const TEST_SCOPE_BUBBLES_M11: TestKnowledgeBubble[] = [
  {
    x: 20,
    y: 44,
    w: 100,
    labelLt: 'Agentų ciklas',
    labelEn: 'Agent cycle',
    targetModuleId: 10,
    slideId: 10.2,
  },
  {
    x: 128,
    y: 44,
    w: 100,
    labelLt: 'Trigger / flow',
    labelEn: 'Trigger flow',
    targetModuleId: 10,
    slideId: 10.15,
  },
  {
    x: 236,
    y: 44,
    w: 72,
    labelLt: '3A',
    labelEn: '3A',
    targetModuleId: 10,
    slideId: 10.25,
  },
  {
    x: 314,
    y: 44,
    w: 88,
    labelLt: 'Įrankiai',
    labelEn: 'Tools',
    targetModuleId: 10,
    slideId: 10.4,
  },
  {
    x: 408,
    y: 44,
    w: 92,
    labelLt: 'Promptai',
    labelEn: 'Prompts',
    targetModuleId: 10,
    slideId: 10.48,
  },
  {
    x: 200,
    y: 92,
    w: 120,
    labelLt: 'Ribos / klaidos',
    labelEn: 'Errors / limits',
    targetModuleId: 10,
    slideId: 10.6,
  },
];

export const TEST_SCOPE_BUBBLES_M14: TestKnowledgeBubble[] = [
  {
    x: 16,
    y: 36,
    w: 96,
    labelLt: 'Pipeline',
    labelEn: 'Pipeline',
    targetModuleId: 13,
    slideId: 13.12,
  },
  {
    x: 120,
    y: 36,
    w: 100,
    labelLt: 'Garsas / audio-first',
    labelEn: 'Audio-first',
    targetModuleId: 13,
    slideId: 13.6,
  },
  {
    x: 228,
    y: 36,
    w: 92,
    labelLt: 'Licencijos',
    labelEn: 'Licenses',
    targetModuleId: 13,
    slideId: 13.7,
  },
  {
    x: 328,
    y: 36,
    w: 88,
    labelLt: 'C2PA',
    labelEn: 'C2PA',
    targetModuleId: 13,
    slideId: 13.101,
  },
  {
    x: 424,
    y: 36,
    w: 80,
    labelLt: 'Brandas',
    labelEn: 'Brand',
    targetModuleId: 13,
    slideId: 13.3,
  },
  {
    x: 180,
    y: 88,
    w: 160,
    labelLt: 'Brief → publikacija',
    labelEn: 'Brief → publish',
    targetModuleId: 13,
    slideId: 13.11,
  },
];

export function getTestKnowledgeBubbles(
  moduleId: 8 | 11 | 14
): TestKnowledgeBubble[] {
  if (moduleId === 8) return TEST_SCOPE_BUBBLES_M8;
  if (moduleId === 11) return TEST_SCOPE_BUBBLES_M11;
  return TEST_SCOPE_BUBBLES_M14;
}

export function bubbleLabel(
  bubble: TestKnowledgeBubble,
  locale: M10Locale
): string {
  return locale === 'en' ? bubble.labelEn : bubble.labelLt;
}

export function testKnowledgeScopeTitle(locale: M10Locale): string {
  return locale === 'en'
    ? 'Topics – tap to refresh theory (you can return to the test)'
    : 'Temos – bakstelėjus atnaujinsi teoriją (grįši į testą)';
}
