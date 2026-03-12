/**
 * Konteksto veikimo diagramos tekstai pagal locale (ContextFlowDiagram).
 * SOT: vienas failas – LT/EN būgnų pavadinimai, aprašai ir aria-label.
 */

export type Locale = 'lt' | 'en';

export interface ContextFlowBox {
  title: string;
  desc: string;
  color: 'brand' | 'accent';
}

const BOXES_LT: ContextFlowBox[] = [
  { title: 'Tu nurodai', desc: 'vaidmuo, formatas, ribos', color: 'brand' },
  { title: 'DI', desc: 'naudoja kontekstą', color: 'brand' },
  { title: 'Geresnis rezultatas', desc: 'tikslesni atsakymai', color: 'accent' },
];

const BOXES_EN: ContextFlowBox[] = [
  { title: 'You specify', desc: 'role, format, limits', color: 'brand' },
  { title: 'AI', desc: 'uses context', color: 'brand' },
  { title: 'Better result', desc: 'more accurate answers', color: 'accent' },
];

const HEADING_LT = 'Kaip veikia kontekstas?';
const HEADING_EN = 'How does context work?';

const ARIA_LT = 'Konteksto veikimo schema: Tu nurodai vaidmenį, formatą ir ribas, DI naudoja kontekstą, rezultatas – geresni atsakymai';
const ARIA_EN = 'Context flow: You specify role, format and limits, AI uses context, result is more accurate answers';

export function getContextFlowBoxes(locale: Locale): ContextFlowBox[] {
  return locale === 'en' ? BOXES_EN : BOXES_LT;
}

export function getContextFlowHeading(locale: Locale): string {
  return locale === 'en' ? HEADING_EN : HEADING_LT;
}

export function getContextFlowAriaLabel(locale: Locale): string {
  return locale === 'en' ? ARIA_EN : ARIA_LT;
}
