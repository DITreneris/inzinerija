/**
 * Sertifikato vardo saugojimas – tik localStorage.
 * Jokio siuntimo į serverį. Naudojama CertificateScreen ir certificatePdf.
 */

import { generateSerialNumber } from './certificatePdf';

const STORAGE_KEY = 'prompt-anatomy-certificate-name';
const SERIALS_STORAGE_KEY = 'prompt-anatomy-certificate-serials';

type CertificateTier = 1 | 2 | 3 | 4 | 5;
type CertificateSerials = Partial<Record<CertificateTier, string>>;

export function getCertificateName(): string {
  if (typeof window === 'undefined') return '';
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return typeof value === 'string' ? value.trim() : '';
  } catch {
    return '';
  }
}

export function setCertificateName(name: string): void {
  if (typeof window === 'undefined') return;
  try {
    const trimmed = typeof name === 'string' ? name.trim() : '';
    if (trimmed) {
      localStorage.setItem(STORAGE_KEY, trimmed);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // ignore
  }
}

function readCertificateSerials(): CertificateSerials {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(SERIALS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed as CertificateSerials;
  } catch {
    return {};
  }
}

function writeCertificateSerials(serials: CertificateSerials): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SERIALS_STORAGE_KEY, JSON.stringify(serials));
  } catch {
    // ignore
  }
}

export function getOrCreateCertificateSerial(tier: CertificateTier): string {
  const serials = readCertificateSerials();
  const existing = serials[tier];
  if (typeof existing === 'string' && existing.trim()) {
    return existing;
  }
  const nextSerial = generateSerialNumber();
  writeCertificateSerials({ ...serials, [tier]: nextSerial });
  return nextSerial;
}
