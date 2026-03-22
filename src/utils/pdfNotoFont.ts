/**
 * Bendras PDF šriftas (jsPDF): vienas cache, teisingas kelias su Vite base, registracijos zondas.
 * Naudoja Roboto-Regular.ttf (Apache 2.0) – jsPDF 4.x geriau toleruoja cmap nei kai kurie Noto TTF build'ai.
 * Failai: public/fonts/Roboto-Regular.ttf (pageidautina), atsarginis NotoSans-Regular.ttf.
 *
 * GitHub šaltiniai: docs/development/PDF_FONTS_GITHUB_SOURCES.md
 * – Roboto (pageidautina atsisiuntimui – openmaptiles): blob https://github.com/openmaptiles/fonts/blob/master/roboto/Roboto-Regular.ttf
 * – Raw: https://raw.githubusercontent.com/openmaptiles/fonts/master/roboto/Roboto-Regular.ttf
 * – Roboto atsarginis (google/fonts): https://github.com/google/fonts/raw/main/apache/roboto/Roboto-Regular.ttf
 * – Noto Sans: https://github.com/google/fonts/tree/main/ofl/notosans
 * – Raw NotoSans-Regular.ttf: https://github.com/google/fonts/raw/main/ofl/notosans/NotoSans-Regular.ttf
 *
 * Atsisiuntimo skriptas: scripts/download-noto-font.ps1
 */

import type { jsPDF } from 'jspdf';

/** Pageidautinas failas public/fonts/ (jsPDF 4 cmap stabilesnis už kai kuriuos Noto build'us). */
export const PDF_UNICODE_FONT_FILE = 'Roboto-Regular.ttf';

/** Atsarginis – senesni deployment'ai, kol neįkeltas Roboto. */
const PDF_UNICODE_FONT_FALLBACK = 'NotoSans-Regular.ttf';

/** jsPDF šeimos vardas – visi utilai naudoja setFont('NotoSans', 'normal'). */
const PDF_FONT_FAMILY = 'NotoSans';

let cachedBase64: string | null = null;
/** Kuris failas buvo sėkmingai įkeltas (VFS vardas = failo pavadinimas). */
let cachedVfsFile: string | null = null;

/** Testams: išvalyti cache tarp testų su skirtingais fetch mock'ais. */
export function clearPdfUnicodeFontCache(): void {
  cachedBase64 = null;
  cachedVfsFile = null;
}

function fontUrlForFile(filename: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}fonts/${filename}`;
}

/** Pirmojo bandymo URL (Roboto) – diagnostikai / dokumentacijai. */
export function getPdfUnicodeFontUrl(): string {
  return fontUrlForFile(PDF_UNICODE_FONT_FILE);
}

function uint8ToBinaryString(bytes: Uint8Array): string {
  const chunk = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunk) {
    const sub = bytes.subarray(i, i + chunk);
    binary += String.fromCharCode(...sub);
  }
  return binary;
}

/**
 * Įkrauna šrifto base64 į modulio cache (vieną kartą). Pirmiausia Roboto, tada NotoSans (migracija).
 */
export async function loadPdfUnicodeFont(): Promise<string | null> {
  if (cachedBase64) return cachedBase64;
  const candidates = [PDF_UNICODE_FONT_FILE, PDF_UNICODE_FONT_FALLBACK];
  for (const file of candidates) {
    try {
      const res = await fetch(fontUrlForFile(file));
      if (!res.ok) continue;
      const buf = await res.arrayBuffer();
      const bytes = new Uint8Array(buf);
      cachedBase64 = btoa(uint8ToBinaryString(bytes));
      cachedVfsFile = file;
      return cachedBase64;
    } catch {
      continue;
    }
  }
  return null;
}

export function getPdfUnicodeFontBase64(): string | null {
  return cachedBase64;
}

export function setPdfUnicodeFontCache(
  base64: string | null,
  vfsFile: string | null = PDF_UNICODE_FONT_FILE
): void {
  cachedBase64 = base64;
  cachedVfsFile = base64 ? vfsFile : null;
}

/**
 * Registruoja šriftą jsPDF ir grąžina true tik jei galima saugiai matuoti plotį (apsauga nuo „sugadinto“ Noto/cmap).
 */
export function registerUnicodePdfFont(
  doc: jsPDF,
  base64: string | null
): boolean {
  if (!base64) return false;
  const vfsFile = cachedVfsFile ?? PDF_UNICODE_FONT_FILE;
  try {
    doc.addFileToVFS(vfsFile, base64);
    doc.addFont(vfsFile, PDF_FONT_FAMILY, 'normal');
    doc.setFont(PDF_FONT_FAMILY, 'normal');
    doc.setFontSize(10);
    const getTextWidth = (doc as { getTextWidth?: (text: string) => number })
      .getTextWidth;
    if (typeof getTextWidth !== 'function') {
      return true;
    }
    const w = getTextWidth.call(doc, 'ąė');
    return Number.isFinite(w) && w >= 0;
  } catch {
    try {
      doc.setFont('helvetica', 'normal');
    } catch {
      /* ignore */
    }
    return false;
  }
}
