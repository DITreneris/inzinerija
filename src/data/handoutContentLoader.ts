/**
 * Handout content by locale (M5, M6).
 * When locale === 'en', EN JSON (m5HandoutContent-en.json, m6HandoutContent-en.json) is returned
 * so that PDF downloads and any UI using this loader show English content.
 */
import type { ModulesLocale } from './modulesLoader';
import m5Lt from './m5HandoutContent.json';
import m5En from './m5HandoutContent-en.json';
import m6Lt from './m6HandoutContent.json';
import m6En from './m6HandoutContent-en.json';

export interface M5HandoutContent {
  title: string;
  subtitle: string;
  toolsIntro: string;
  toolsBullets: string[];
  structure8: string;
  masterPrompt: string;
  fullPromptPrinciple: string;
  sequenceSteps: string[];
  briefDefinition: string;
  qualityCheckPoints: string[];
  thresholdsExplanation: string;
  footerText: string;
}

export interface M6HandoutDataManagementPoint {
  title: string;
  practicalMeaning: string;
}

export interface M6HandoutContent {
  title: string;
  subtitle: string;
  projectSteps: string[];
  dataManagementPoints: M6HandoutDataManagementPoint[];
  reflectionSummary: string;
  footerText: string;
}

const m5LtData = m5Lt as M5HandoutContent;
const m5EnData = m5En as M5HandoutContent;
const m6LtData = m6Lt as M6HandoutContent;
const m6EnData = m6En as M6HandoutContent;

export function getM5HandoutContent(locale: ModulesLocale): M5HandoutContent {
  return locale === 'en' ? m5EnData : m5LtData;
}

export function getM6HandoutContent(locale: ModulesLocale): M6HandoutContent {
  return locale === 'en' ? m6EnData : m6LtData;
}
