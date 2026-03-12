/**
 * Sertifikato vardo saugojimas – tik localStorage.
 * Jokio siuntimo į serverį. Naudojama CertificateScreen ir certificatePdf.
 */

const STORAGE_KEY = 'prompt-anatomy-certificate-name';

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
