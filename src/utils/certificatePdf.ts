/**
 * Sertifikatų PDF generavimas – 3 lygiai (po 3, 6, 9 modulio).
 * Maketas pagal docs/development/PDF_MAKETO_GAIRES.md ir premium planą (rėmelis, linijos, etiketės).
 * Lietuviškos raidės: naudoti ensurePdfFont() (introPiePdf) prieš pirmą kvietimą arba loadFontBase64 čia.
 */

import { jsPDF } from 'jspdf';

const ACCENT_COLOR = '#d4a520';
const MARGIN = 18;
const PAGE_W = 210;
const PAGE_H = 297;
const TEXT_DARK = '#222222';

const FONT_HEADING_SMALL = 13;
const FONT_CERT_LABEL = 9;
const FONT_BODY = 11;
const FONT_NAME = 24;
const FONT_SMALL = 8;
const FONT_FOOTER = 7;
const LINE_HEIGHT = 5;

/** Pradinis Y (oro kiekis viršuje) */
const INITIAL_Y = MARGIN + 22;

/** Dekoratyvios linijos plotis (mm), storis (mm) */
const RULE_WIDTH = 25;
const RULE_HEIGHT_MM = 0.6;

let cachedFontBase64: string | null = null;

export interface CertificateTierContent {
  tier: 1 | 2 | 3;
  introLine: string;
  completionLine: string;
  programName: string;
  label: string;
  footerText: string;
}

export type CertificateLocale = 'lt' | 'en';

export interface DownloadCertificateOptions {
  date?: Date;
  serialNumber?: string;
  authorBy?: string;
  authorProduct?: string;
  /** Locale for date format and filename (default 'lt'). */
  locale?: CertificateLocale;
  /** Programme title at top of PDF (e.g. "Promptų anatomija" / "Prompt Anatomy"). */
  programTitle?: string;
  /** Certificate label (e.g. "SERTIFIKATAS" / "CERTIFICATE"). */
  certificateLabel?: string;
  /** Label before author name (e.g. "Programa ir metodika:"). */
  authorByLabel?: string;
  /** Label before product name (e.g. "Autorius:"). */
  authorProductLabel?: string;
  /** Serial number prefix (e.g. "Sertifikato Nr." / "Certificate No."). */
  serialLabel?: string;
  /** Oficialus kursų puslapis – privaloma nuoroda PDF footeryje (SOT: CERTIFICATE_CONTENT_SOT). */
  websiteUrl?: string;
  /** CTA tekstas nuorodai (pvz. „Kursas ir daugiau: promptanatomy.app“). */
  websiteCta?: string;
}

/**
 * Įkrauna NotoSans iš public/fonts. Galima kviesti ensurePdfFont() iš introPiePdf prieš – tada cache jau bus.
 */
async function loadFontBase64(): Promise<string | null> {
  if (cachedFontBase64) return cachedFontBase64;
  try {
    const res = await fetch('/fonts/NotoSans-Regular.ttf');
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    cachedFontBase64 = btoa(binary);
    return cachedFontBase64;
  } catch {
    return null;
  }
}

export function setCertificatePdfFontCache(base64: string | null): void {
  cachedFontBase64 = base64;
}

function applyFont(doc: jsPDF, fontRegistered: boolean): void {
  if (fontRegistered && cachedFontBase64) {
    doc.setFont('NotoSans', 'normal');
  } else {
    doc.setFont('helvetica', 'normal');
  }
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function setTextColorHex(doc: jsPDF, hex: string): void {
  const [r, g, b] = hexToRgb(hex);
  doc.setTextColor(r, g, b);
}

/** Pre-release: atsitiktinis serijinis numeris, pvz. #PA-2026-A1b2C3d4 */
export function generateSerialNumber(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 8; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `#PA-2026-${suffix}`;
}

/** Rodyti serijinį be # (label + PA-2026-XXXX). */
function formatSerialForDisplay(serial: string, serialLabel: string): string {
  return `${serialLabel} ${serial.replace(/^#/, '')}`;
}

/**
 * Piešia horizontalią dekoratyvią liniją (accent) centre.
 */
function drawAccentRule(doc: jsPDF, centerY: number): void {
  const [r, g, b] = hexToRgb(ACCENT_COLOR);
  doc.setDrawColor(r, g, b);
  doc.setLineWidth(RULE_HEIGHT_MM);
  const x1 = (PAGE_W - RULE_WIDTH) / 2;
  const x2 = x1 + RULE_WIDTH;
  doc.line(x1, centerY, x2, centerY);
}

/**
 * Generuoja ir atsisiunčia sertifikato PDF.
 * UI prieš kvietimą gali kviesti ensurePdfFont() iš introPiePdf – tada lietuviškos raidės garantuotos.
 */
export async function downloadCertificatePdf(
  tier: 1 | 2 | 3,
  content: CertificateTierContent,
  learnerName: string,
  options?: DownloadCertificateOptions
): Promise<void> {
  await loadFontBase64();

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let useCustomFont = false;
  if (cachedFontBase64) {
    try {
      doc.addFileToVFS('NotoSans-Regular.ttf', cachedFontBase64);
      doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
      useCustomFont = true;
    } catch {
      /* Helvetica */
    }
  }

  const locale = options?.locale ?? 'lt';
  const serial = options?.serialNumber ?? generateSerialNumber();
  const serialDisplay = formatSerialForDisplay(
    serial,
    options?.serialLabel ?? (locale === 'en' ? 'Certificate No.' : 'Sertifikato Nr.')
  );
  const date = options?.date ?? new Date();
  const dateLocale = locale === 'en' ? 'en-GB' : 'lt-LT';
  const dateStr = date.toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' });
  const authorBy = options?.authorBy ?? '';
  const authorProduct = options?.authorProduct ?? '';
  const programTitle = options?.programTitle ?? (locale === 'en' ? 'Prompt Anatomy' : 'Promptų anatomija');
  const certificateLabel = options?.certificateLabel ?? (locale === 'en' ? 'CERTIFICATE' : 'SERTIFIKATAS');
  const authorByLabel = options?.authorByLabel ?? (locale === 'en' ? 'Program and methodology:' : 'Programa ir metodika:');
  const authorProductLabel = options?.authorProductLabel ?? (locale === 'en' ? 'Author:' : 'Autorius:');

  // Plonas rėmelis (pilka)
  doc.setDrawColor(136, 136, 136);
  doc.setLineWidth(0.4);
  doc.rect(MARGIN, MARGIN, PAGE_W - MARGIN * 2, PAGE_H - MARGIN * 2);

  let y = INITIAL_Y;

  // Viršus: programos pavadinimas (mažesnis)
  doc.setFontSize(FONT_HEADING_SMALL);
  setTextColorHex(doc, TEXT_DARK);
  applyFont(doc, useCustomFont);
  doc.text(programTitle, PAGE_W / 2, y, { align: 'center' });
  y += 6;

  // Sertifikato etiketė
  doc.setFontSize(FONT_CERT_LABEL);
  doc.setTextColor(100, 100, 100);
  applyFont(doc, useCustomFont);
  doc.text(certificateLabel, PAGE_W / 2, y, { align: 'center' });
  y += 12;

  // introLine
  doc.setFontSize(FONT_BODY);
  setTextColorHex(doc, TEXT_DARK);
  applyFont(doc, useCustomFont);
  doc.text(content.introLine, PAGE_W / 2, y, { align: 'center' });
  y += 10;

  // Vardas (didelis, vizualinis centras)
  doc.setFontSize(FONT_NAME);
  applyFont(doc, useCustomFont);
  doc.text(learnerName || '—', PAGE_W / 2, y, { align: 'center' });
  y += 8;

  // Dekoratyvi linija virš completionLine (accent)
  drawAccentRule(doc, y);
  y += 6;

  // completionLine
  doc.setFontSize(FONT_BODY);
  applyFont(doc, useCustomFont);
  doc.text(content.completionLine, PAGE_W / 2, y, { align: 'center' });
  y += 8;

  // programName (gali persikelti)
  const programLines = doc.splitTextToSize(content.programName, PAGE_W - MARGIN * 2);
  doc.text(programLines, PAGE_W / 2, y, { align: 'center' });
  y += programLines.length * LINE_HEIGHT + 10;

  // Plona aukso linija (vietoj badge stačiakampio)
  drawAccentRule(doc, y);
  y += 10;

  // Data (mažesniu, pilkesniu)
  doc.setFontSize(FONT_FOOTER);
  doc.setTextColor(100, 100, 100);
  applyFont(doc, useCustomFont);
  doc.text(dateStr, PAGE_W / 2, y, { align: 'center' });
  y += 8;

  // Serijinis numeris (be #)
  doc.setFontSize(FONT_SMALL);
  doc.setTextColor(80, 80, 80);
  applyFont(doc, useCustomFont);
  doc.text(serialDisplay, PAGE_W / 2, y, { align: 'center' });
  y += 10;

  // Autoriaus informacija (jei pateikta)
  if (authorBy || authorProduct) {
    const authorParts: string[] = [];
    if (authorBy) authorParts.push(`${authorByLabel} ${authorBy}`);
    if (authorProduct) authorParts.push(`${authorProductLabel} „${authorProduct}"`);
    if (authorParts.length > 0) {
      doc.setFontSize(FONT_FOOTER);
      doc.setTextColor(100, 100, 100);
      applyFont(doc, useCustomFont);
      doc.text(authorParts.join('. '), PAGE_W / 2, y, { align: 'center' });
      y += 6;
    }
  }

  // Footer
  doc.setFontSize(FONT_FOOTER);
  doc.setTextColor(120, 120, 120);
  applyFont(doc, useCustomFont);
  doc.text(content.footerText, PAGE_W / 2, PAGE_H - 15, { align: 'center' });

  // Privaloma nuoroda ir CTA (promptanatomy.app) – spaudžiama nuoroda PDF (jsPDF textWithLink)
  const websiteUrl = options?.websiteUrl;
  const websiteCta = options?.websiteCta || websiteUrl;
  if (websiteCta && websiteUrl) {
    const linkY = PAGE_H - 10;
    const docWithLink = doc as jsPDF & { textWithLink?(text: string, x: number, y: number, opts: { url: string }): void };
    if (typeof docWithLink.textWithLink === 'function') {
      const w = doc.getTextWidth(websiteCta);
      const linkX = Math.max(MARGIN, (PAGE_W - w) / 2);
      docWithLink.textWithLink(websiteCta, linkX, linkY, { url: websiteUrl });
    } else {
      doc.text(websiteCta, PAGE_W / 2, linkY, { align: 'center' });
    }
  }

  const safeName = (learnerName || (locale === 'en' ? 'certificate' : 'sertifikatas')).replace(/[?/:\\*"]/g, '').slice(0, 30);
  const filename =
    locale === 'en'
      ? `Prompt_Anatomy_Certificate_Tier_${tier}_${safeName}.pdf`
      : `Promptu_anatomija_Sertifikatas_Lygis_${tier}_${safeName}.pdf`;
  doc.save(filename);
}
