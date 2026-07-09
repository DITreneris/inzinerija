/**
 * Handout content by locale (M1, M5, M6, M7–9).
 * When locale === 'en', EN JSON is returned
 * so that PDF downloads and any UI using this loader show English content.
 */
import type { ModulesLocale } from './modulesLoader';
import m1Lt from './m1HandoutContent.json';
import m1En from './m1HandoutContent-en.json';
import m4Lt from './m4HandoutContent.json';
import m4En from './m4HandoutContent-en.json';
import m5Lt from './m5HandoutContent.json';
import m5En from './m5HandoutContent-en.json';
import m6Lt from './m6HandoutContent.json';
import m6En from './m6HandoutContent-en.json';
import m79Lt from './m79HandoutContent.json';
import m79En from './m79HandoutContent-en.json';

export interface M1HandoutCoreBlock {
  label: string;
  meaning: string;
}

export interface M1HandoutContent {
  title: string;
  subtitle: string;
  coreBlocks: M1HandoutCoreBlock[];
  firstWinChecklist: string[];
  starterPrompt: string;
  qualityCheck: string[];
  footerText: string;
}

export interface M4HandoutCoreTopic {
  title: string;
  meaning: string;
}

export interface M4HandoutContent {
  title: string;
  subtitle: string;
  coreTopics: M4HandoutCoreTopic[];
  checklist: string[];
  starterPrompt: string;
  footerText: string;
}

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

export interface M79HandoutContent {
  title: string;
  subtitle: string;
  pipelineSteps: string[];
  masterPromptSteps: string[];
  workflowSteps: string[];
  reflectionSummary: string;
  nextPageHeading: string;
  nextPageIntro: string;
  primaryCtaLabel: string;
  secondaryCtaLabels: {
    decide: string;
    map: string;
  };
  websiteUrl: string;
  websiteCta: string;
  footerText: string;
}

const m1LtData = m1Lt as M1HandoutContent;
const m1EnData = m1En as M1HandoutContent;
const m4LtData = m4Lt as M4HandoutContent;
const m4EnData = m4En as M4HandoutContent;
const m5LtData = m5Lt as M5HandoutContent;
const m5EnData = m5En as M5HandoutContent;
const m6LtData = m6Lt as M6HandoutContent;
const m6EnData = m6En as M6HandoutContent;
const m79LtData = m79Lt as M79HandoutContent;
const m79EnData = m79En as M79HandoutContent;

export function getM1HandoutContent(locale: ModulesLocale): M1HandoutContent {
  return locale === 'en' ? m1EnData : m1LtData;
}

export function getM4HandoutContent(locale: ModulesLocale): M4HandoutContent {
  return locale === 'en' ? m4EnData : m4LtData;
}

export function getM5HandoutContent(locale: ModulesLocale): M5HandoutContent {
  return locale === 'en' ? m5EnData : m5LtData;
}

export function getM6HandoutContent(locale: ModulesLocale): M6HandoutContent {
  return locale === 'en' ? m6EnData : m6LtData;
}

export function getM79HandoutContent(locale: ModulesLocale): M79HandoutContent {
  return locale === 'en' ? m79EnData : m79LtData;
}
