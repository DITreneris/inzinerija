/**
 * Certificate content loader by locale (LT / EN).
 * Same structure per locale; getCertificateContent(locale) returns content for PDF and UI.
 */
import type { ModulesLocale } from './modulesLoader';
import type { CertificateTierContent } from '../utils/certificatePdf';
import certificateContentLt from './certificateContent.json';
import certificateContentEn from './certificateContent-en.json';

export interface CertificateContentRoot {
  programTitle?: string;
  certificateLabel?: string;
  authorBy?: string;
  authorProduct?: string;
  authorByLabel?: string;
  authorProductLabel?: string;
  serialLabel?: string;
  websiteUrl?: string;
  websiteCta?: string;
  tiers: CertificateTierContent[];
}

const contentLt = certificateContentLt as CertificateContentRoot;
const contentEn = certificateContentEn as CertificateContentRoot;

export function getCertificateContent(locale: ModulesLocale): CertificateContentRoot {
  return locale === 'en' ? contentEn : contentLt;
}
