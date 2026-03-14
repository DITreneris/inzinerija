/**
 * Generuoja Modulio 5 PDF atmintinę (sprintas, brief, 8 skaidrių šablonas, mini testas).
 * Maketas pagal docs/development/PDF_MAKETO_GAIRES.md.
 *
 * Lietuviškos raidės (ą, ė, į, š, ų, ū, ž): visur prieš doc.text() su lietuviškais simboliais
 * kviečiama applyFont(doc, useCustomFont), kad naudotų NotoSans vietoj Helvetica.
 * Žr. CHANGELOG 2026-02-21 „PDF lietuviškos raidės“ ir TEST_REPORT – tas pats principas kaip introPiePdf.
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
 * Įkrauna šriftą (NotoSans) ir generuoja Modulio 5 atmintinės PDF.
 * Failas: LT – Promptu_anatomija_Modulio5_atmintine.pdf; EN – Prompt_Anatomy_Module5_handout.pdf
 * UI gali kviesti ensurePdfFont() (introPiePdf) prieš šį kvietimą – tada abu PDF naudoja tą patį šriftą.
 */
export async function downloadM5HandoutPdf(
  content: M5HandoutContent,
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

  // 1. Pagrindiniai įrankiai
  const y1 = y;
  y = addSectionTitle(doc, isEn ? '1. Key tools' : '1. Pagrindiniai įrankiai', y, useCustomFont);
  y = addWrappedText(doc, content.toolsIntro, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY, LINE_HEIGHT_BODY, useCustomFont) + PARAGRAPH_GAP;
  for (const b of content.toolsBullets) {
    y = addWrappedText(doc, `• ${b}`, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY, LINE_HEIGHT_BODY, useCustomFont) + PARAGRAPH_GAP;
  }
  drawSectionLeftBorder(doc, y1, y, BRAND_COLOR);
  y += SECTION_GAP;

  // 2. Promptai
  const y2 = y;
  y = addSectionTitle(doc, isEn ? '2. Prompts' : '2. Promptai', y, useCustomFont);
  applyFont(doc, useCustomFont);
  doc.text(isEn ? '8-slide structure:' : '8 skaidrių struktūra:', CONTENT_X, y);
  y += LINE_HEIGHT_BODY;
  y = addWrappedText(doc, content.structure8, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY - 1, LINE_HEIGHT_BODY - 0.5, useCustomFont) + PARAGRAPH_GAP;
  applyFont(doc, useCustomFont);
  doc.text(isEn ? 'Master prompt (structure only):' : 'Master promptas (tik struktūra):', CONTENT_X, y);
  y += LINE_HEIGHT_BODY;
  y = addWrappedText(doc, content.masterPrompt, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY - 1, LINE_HEIGHT_BODY - 0.5, useCustomFont) + PARAGRAPH_GAP;
  applyFont(doc, useCustomFont);
  doc.text(isEn ? 'Full content principle (6 blocks):' : 'Pilno turinio principas (6 blokų):', CONTENT_X, y);
  y += LINE_HEIGHT_BODY;
  y = addWrappedText(doc, content.fullPromptPrinciple, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY, LINE_HEIGHT_BODY, useCustomFont) + SECTION_GAP;
  drawSectionLeftBorder(doc, y2, y, BRAND_COLOR);
  y += SECTION_GAP;

  // 3. Sekos
  const y3 = y;
  y = addSectionTitle(doc, isEn ? '3. Sequence (15 min sprint)' : '3. Seka (15 min sprintas)', y, useCustomFont);
  for (let i = 0; i < content.sequenceSteps.length; i++) {
    y = addWrappedText(doc, `${i + 1}. ${content.sequenceSteps[i]}`, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY, LINE_HEIGHT_BODY, useCustomFont) + PARAGRAPH_GAP;
  }
  drawSectionLeftBorder(doc, y3, y, BRAND_COLOR);
  y += SECTION_GAP;

  // 4. Savokos
  const y4 = y;
  y = addSectionTitle(doc, isEn ? '4. Concepts' : '4. Savokos', y, useCustomFont);
  applyFont(doc, useCustomFont);
  doc.text('Brief:', CONTENT_X, y);
  y += LINE_HEIGHT_BODY;
  y = addWrappedText(doc, content.briefDefinition, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY, LINE_HEIGHT_BODY, useCustomFont) + PARAGRAPH_GAP;
  applyFont(doc, useCustomFont);
  doc.text(isEn ? 'Quick quality check:' : 'Greita kokybės patikra:', CONTENT_X, y);
  y += LINE_HEIGHT_BODY;
  for (const p of content.qualityCheckPoints) {
    y = addWrappedText(doc, `• ${p}`, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY, LINE_HEIGHT_BODY, useCustomFont) + PARAGRAPH_GAP;
  }
  applyFont(doc, useCustomFont);
  doc.text(isEn ? 'Thresholds (mini test):' : 'Slenksčiai (mini testas):', CONTENT_X, y);
  y += LINE_HEIGHT_BODY;
  y = addWrappedText(doc, content.thresholdsExplanation, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY, LINE_HEIGHT_BODY, useCustomFont) + SECTION_GAP;
  drawSectionLeftBorder(doc, y4, y, BRAND_COLOR);
  y += SECTION_GAP;

  if (y > 270) {
    doc.addPage();
    y = MARGIN;
  }

  // Footer
  const FOOTER_Y = 287;
  const LINK_Y = 292;
  const WEBSITE_URL = 'https://www.promptanatomy.app/';
  const websiteCta = 'www.promptanatomy.app';
  const linkLabel = isEn ? 'More: ' : 'Daugiau: ';

  doc.setFontSize(FONT_SMALL);
  doc.setTextColor(128, 128, 128);
  applyFont(doc, useCustomFont);
  doc.text(content.footerText, MARGIN, FOOTER_Y);
  doc.text(linkLabel, MARGIN, LINK_Y);
  const getWidth = (d: jsPDF, text: string): number => {
    if (typeof (d as jsPDF & { getTextWidth?(t: string): number }).getTextWidth === 'function') {
      return (d as jsPDF & { getTextWidth(t: string): number }).getTextWidth(text);
    }
    const dim = (d as jsPDF & { getTextDimensions?(t: string): { w: number } }).getTextDimensions?.(text);
    return dim?.w ?? 80;
  };
  const linkX = MARGIN + getWidth(doc, linkLabel);
  const docWithLink = doc as jsPDF & { textWithLink?(text: string, x: number, y: number, opts: { url: string }): void };
  if (typeof docWithLink.textWithLink === 'function') {
    docWithLink.textWithLink(websiteCta, linkX, LINK_Y, { url: WEBSITE_URL });
  } else {
    doc.text(websiteCta, linkX, LINK_Y);
  }

  const defaultName = locale === 'en' ? 'Prompt_Anatomy_Module5_handout.pdf' : 'Promptu_anatomija_Modulio5_atmintine.pdf';
  const name = filename ?? defaultName;
  doc.save(name);
}
