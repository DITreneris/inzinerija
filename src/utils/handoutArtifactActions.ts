import type { ModulesLocale } from '../data/modulesLoader';
import {
  getM1HandoutContent,
  getM4HandoutContent,
  getM5HandoutContent,
  getM6HandoutContent,
  getM79HandoutContent,
  type M1HandoutContent,
  type M4HandoutContent,
  type M5HandoutContent,
  type M6HandoutContent,
  type M79HandoutContent,
} from '../data/handoutContentLoader';
import type { HandoutArtifactKey } from '../data/completionArtifactsLoader';
import { downloadM1HandoutPdf } from './m1HandoutPdf';
import { downloadM4HandoutPdf } from './m4HandoutPdf';
import { downloadM5HandoutPdf } from './m5HandoutPdf';
import { downloadM6HandoutPdf } from './m6HandoutPdf';
import { downloadM79HandoutPdf } from './m79HandoutPdf';

export interface HandoutArtifactAction {
  getContent: (locale: ModulesLocale) => unknown;
  download: (content: unknown, locale: ModulesLocale) => Promise<void>;
}

export const HANDOUT_ARTIFACT_ACTIONS: Record<
  HandoutArtifactKey,
  HandoutArtifactAction
> = {
  m1: {
    getContent: getM1HandoutContent,
    download: (content, locale) =>
      downloadM1HandoutPdf(content as M1HandoutContent, undefined, locale),
  },
  m4: {
    getContent: getM4HandoutContent,
    download: (content, locale) =>
      downloadM4HandoutPdf(content as M4HandoutContent, undefined, locale),
  },
  m5: {
    getContent: getM5HandoutContent,
    download: (content, locale) =>
      downloadM5HandoutPdf(content as M5HandoutContent, undefined, locale),
  },
  m6: {
    getContent: getM6HandoutContent,
    download: (content, locale) =>
      downloadM6HandoutPdf(content as M6HandoutContent, undefined, locale),
  },
  m79: {
    getContent: getM79HandoutContent,
    download: (content, locale) =>
      downloadM79HandoutPdf(content as M79HandoutContent, { locale }),
  },
};

export function hasHandoutArtifactAction(key: HandoutArtifactKey): boolean {
  return key in HANDOUT_ARTIFACT_ACTIONS;
}
