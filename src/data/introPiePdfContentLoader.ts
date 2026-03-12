/**
 * Intro Action Pie PDF turinys pagal locale (LT / EN).
 * SOT: introPiePdfContent.json (LT), introPiePdfContent-en.json (EN).
 */

import introPiePdfContentLt from './introPiePdfContent.json';
import introPiePdfContentEn from './introPiePdfContent-en.json';
import type { IntroActionPiePdfSegment } from '../types/modules';

export type Locale = 'lt' | 'en';

const LT = introPiePdfContentLt as { segments: IntroActionPiePdfSegment[] };
const EN = introPiePdfContentEn as { segments: IntroActionPiePdfSegment[] };

export function getIntroPiePdfContent(locale: Locale): { segments: IntroActionPiePdfSegment[] } {
  return locale === 'en' ? EN : LT;
}
