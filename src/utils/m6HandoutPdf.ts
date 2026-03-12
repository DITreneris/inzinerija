/**
 * Generuoja Modulio 6 PDF atmintinę (projektas 6 žingsniai, duomenų tvarkymas 5 punktai, refleksija).
 * Maketas pagal docs/development/PDF_MAKETO_GAIRES.md.
 *
 * Lietuviškos raidės (ą, ė, į, š, ų, ū, ž): visur prieš doc.text() su lietuviškais simboliais
 * kviečiama applyFont(doc, useCustomFont), kad naudotų NotoSans vietoj Helvetica.
 */

import { jsPDF } from 'jspdf';

const BRAND_COLOR = '#627d98';
const MARGIN = 18;
const PAGE_W = 210;
const BORDER_LEFT_WIDTH = 1.5;
const CONTENT_X = MARGIN + BORDER_LEFT_WIDTH + 3;
const CONTENT_W_INNER = PAGE_W - MARGIN * 2 - BORDER_LEFT_WIDTH - 3;

const FONT_H1 = 15;
const FONT_H2 = 14;
const FONT_H3 = 11;
const FONT_BODY = 10;
const FONT_SMALL = 8;
const LINE_HEIGHT_BODY = 4.2;
const SECTION_GAP = 7;
const PARAGRAPH_GAP = 3.5;

let cachedFontBase64: string | null = null;

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

function applyFont(doc: jsPDF, fontRegistered: boolean): void {
  if (fontRegistered && cachedFontBase64) {
    doc.setFont('NotoSans', 'normal');
  } else {
    doc.setFont('helvetica', 'normal');
  }
}

function addWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number,
  lineHeight: number,
  useCustomFont: boolean
): number {
  doc.setFontSize(fontSize);
  applyFont(doc, useCustomFont);
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function drawSectionLeftBorder(doc: jsPDF, yStart: number, yEnd: number, colorHex: string): void {
  const n = parseInt(colorHex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  doc.setFillColor(r, g, b);
  doc.rect(MARGIN, yStart, BORDER_LEFT_WIDTH, Math.max(yEnd - yStart, 2));
  doc.fill();
}

function addSectionTitle(doc: jsPDF, title: string, y: number, useCustomFont: boolean): number {
  doc.setTextColor(BRAND_COLOR);
  doc.setFontSize(FONT_H3);
  applyFont(doc, useCustomFont);
  doc.text(title, CONTENT_X, y);
  doc.setTextColor(0, 0, 0);
  applyFont(doc, useCustomFont);
  return y + LINE_HEIGHT_BODY + PARAGRAPH_GAP;
}

/**
 * Įkrauna šriftą (NotoSans) ir generuoja Modulio 6 atmintinės PDF.
 * Failas: LT – Promptu_anatomija_Modulio6_atmintine.pdf; EN – Prompt_Anatomy_Module6_handout.pdf
 */
export async function downloadM6HandoutPdf(
  content: M6HandoutContent,
  filename?: string,
  locale?: 'lt' | 'en'
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

  const isEn = locale === 'en';
  let y = MARGIN;

  // H1 – brand
  doc.setFontSize(FONT_H1);
  doc.setTextColor(BRAND_COLOR);
  applyFont(doc, useCustomFont);
  doc.text(isEn ? 'Prompt Anatomy' : 'Promptų anatomija', MARGIN, y);
  y += 6;

  // H2 – pavadinimas
  doc.setFontSize(FONT_H2);
  doc.setTextColor(0, 0, 0);
  applyFont(doc, useCustomFont);
  doc.text(content.title, MARGIN, y);
  y += LINE_HEIGHT_BODY;
  doc.setFontSize(FONT_BODY);
  y = addWrappedText(doc, content.subtitle, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY, LINE_HEIGHT_BODY, useCustomFont) + SECTION_GAP;

  // 1. Projekto etapai (6 žingsniai)
  const y1 = y;
  y = addSectionTitle(doc, isEn ? '1. Project steps (6 steps)' : '1. Projekto etapai (6 žingsniai)', y, useCustomFont);
  for (let i = 0; i < content.projectSteps.length; i++) {
    y = addWrappedText(doc, `${i + 1}. ${content.projectSteps[i]}`, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY, LINE_HEIGHT_BODY, useCustomFont) + PARAGRAPH_GAP;
  }
  drawSectionLeftBorder(doc, y1, y, BRAND_COLOR);
  y += SECTION_GAP;

  // 2. Duomenų tvarkymas (5 punktai)
  const y2 = y;
  y = addSectionTitle(doc, isEn ? '2. Data management (5 points)' : '2. Duomenų tvarkymas (5 punktai)', y, useCustomFont);
  for (const p of content.dataManagementPoints) {
    applyFont(doc, useCustomFont);
    doc.setFontSize(FONT_BODY);
    doc.text(p.title, CONTENT_X, y);
    y += LINE_HEIGHT_BODY;
    y = addWrappedText(doc, p.practicalMeaning, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY - 1, LINE_HEIGHT_BODY - 0.3, useCustomFont) + PARAGRAPH_GAP;
  }
  drawSectionLeftBorder(doc, y2, y, BRAND_COLOR);
  y += SECTION_GAP;

  if (y > 250) {
    doc.addPage();
    y = MARGIN;
  }

  // 3. Refleksija
  const y3 = y;
  y = addSectionTitle(doc, isEn ? '3. Reflection and first action' : '3. Refleksija ir pirmas veiksmas', y, useCustomFont);
  y = addWrappedText(doc, content.reflectionSummary, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY, LINE_HEIGHT_BODY, useCustomFont) + SECTION_GAP;
  drawSectionLeftBorder(doc, y3, y, BRAND_COLOR);
  y += SECTION_GAP;

  // Footer
  doc.setFontSize(FONT_SMALL);
  doc.setTextColor(128, 128, 128);
  applyFont(doc, useCustomFont);
  doc.text(content.footerText, MARGIN, 290);

  const defaultName = locale === 'en' ? 'Prompt_Anatomy_Module6_handout.pdf' : 'Promptu_anatomija_Modulio6_atmintine.pdf';
  const name = filename ?? defaultName;
  doc.save(name);
}
