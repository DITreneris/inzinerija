/**
 * Generuoja vieno segmento PDF skaidrėje „Kam žmonės naudoja GPT?“ (intro-action-pie).
 * Maketas pagal docs/development/PDF_MAKETO_GAIRES.md.
 * Brand: #627d98, accent: #d4a520 (GOLDEN_STANDARD §2.1).
 * Lietuviškos raidės: naudoti ensurePdfFont() prieš eksportą; jei šriftas neįkeltas – Helvetica (gali būti neteisingų diakritikų).
 */

import { jsPDF } from 'jspdf';
import type { IntroActionPiePdfSegment } from '../types/modules';

const BRAND_COLOR = '#627d98';
const ACCENT_COLOR = '#d4a520';
const MARGIN = 18;
const PAGE_W = 210;
const BORDER_LEFT_WIDTH = 1.5;
const CONTENT_W = PAGE_W - MARGIN * 2;
const CONTENT_X = MARGIN + BORDER_LEFT_WIDTH + 3;
const CONTENT_W_INNER = CONTENT_W - BORDER_LEFT_WIDTH - 3;

// Tipografija pagal PDF_MAKETO_GAIRES (pt)
const FONT_H1 = 15;
const FONT_H2 = 14;
const FONT_H3 = 11;
const FONT_BODY = 10;
const FONT_SMALL = 8;
const LINE_HEIGHT_BODY = 4.2;
const SECTION_GAP = 7;
const PARAGRAPH_GAP = 3.5;

let cachedFontBase64: string | null = null;

export interface ToolInfo {
  name: string;
  url: string;
  description: string;
}

export interface GlossaryTermInfo {
  term: string;
  definition: string;
}

/**
 * Įkrauna custom šriftą su lietuviškais simboliais iš public/fonts/NotoSans-Regular.ttf.
 * Skambinti prieš pirmą downloadIntroPiePdf (pvz. mygtuko „Eksportuok PDF“ onClick).
 * Jei failas nepasiekiamas – PDF generuojamas su Helvetica (diakritikos gali būti neteisingos).
 */
export async function ensurePdfFont(): Promise<void> {
  if (cachedFontBase64) return;
  try {
    const res = await fetch('/fonts/NotoSans-Regular.ttf');
    if (!res.ok) return;
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    cachedFontBase64 = btoa(binary);
  } catch {
    // Fallback: naudosime Helvetica
  }
}

function applyFont(doc: jsPDF, fontRegistered = false): void {
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
  lineHeight: number
): number {
  doc.setFontSize(fontSize);
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function drawSectionLeftBorder(doc: jsPDF, yStart: number, yEnd: number, colorHex: string): void {
  const [r, g, b] = hexToRgb(colorHex);
  doc.setFillColor(r, g, b);
  doc.rect(MARGIN, yStart, BORDER_LEFT_WIDTH, Math.max(yEnd - yStart, 2));
  doc.fill();
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
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

const PDF_BRAND_TITLE_LT = 'Promptų anatomija';
const PDF_BRAND_TITLE_EN = 'Prompt Anatomy';
const PDF_FOOTER_LT = 'Promptų anatomija – promptų struktūros mokymas. © Kurso medžiaga.';
const PDF_FOOTER_EN = 'Prompt Anatomy – prompt structure training. © Course material.';

/**
 * Sukuria ir atsisiunčia PDF failą pagal segmento turinį, įrankių ir žodyno duomenis.
 * locale: 'en' – EN pavadinimas, footer ir default failo vardas; 'lt' – lietuviškai.
 */
export function downloadIntroPiePdf(
  segment: IntroActionPiePdfSegment,
  toolsByName: Map<string, ToolInfo>,
  glossaryByTerm: Map<string, GlossaryTermInfo>,
  filename?: string,
  locale?: 'lt' | 'en'
): void {
  const isEn = locale === 'en';
  const brandTitle = isEn ? PDF_BRAND_TITLE_EN : PDF_BRAND_TITLE_LT;
  const footerText = isEn ? PDF_FOOTER_EN : PDF_FOOTER_LT;

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let useCustomFont = false;
  if (cachedFontBase64) {
    try {
      doc.addFileToVFS('NotoSans-Regular.ttf', cachedFontBase64);
      doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
      useCustomFont = true;
    } catch {
      /* naudoti Helvetica */
    }
  }
  applyFont(doc, useCustomFont);
  let y = MARGIN;

  // H1 – brand antraštė
  doc.setFontSize(FONT_H1);
  applyFont(doc, useCustomFont);
  doc.setTextColor(BRAND_COLOR);
  doc.text(brandTitle, MARGIN, y);
  y += 6;

  // H2 – segmento pavadinimas
  doc.setFontSize(FONT_H2);
  doc.setTextColor(0, 0, 0);
  applyFont(doc, useCustomFont);
  doc.text(segment.title, MARGIN, y);
  y += LINE_HEIGHT_BODY * 2 + SECTION_GAP;

  const sectionStartY = y;

  // 1) Top 5 patarimai
  y = addSectionTitle(doc, isEn ? '1. Top 5 tips' : '1. Top 5 patarimai', y, useCustomFont);
  for (let i = 0; i < segment.top5Tips.length; i++) {
    y = addWrappedText(doc, `${i + 1}. ${segment.top5Tips[i]}`, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY, LINE_HEIGHT_BODY) + PARAGRAPH_GAP;
  }
  drawSectionLeftBorder(doc, sectionStartY, y, BRAND_COLOR);
  y += SECTION_GAP;

  // 2) Įrankiai
  const yToolsStart = y;
  y = addSectionTitle(doc, isEn ? '2. Tools' : '2. Įrankiai', y, useCustomFont);
  const mainTool = toolsByName.get(segment.mainToolName);
  if (mainTool) {
    applyFont(doc, useCustomFont);
    doc.text(isEn ? `Main: ${mainTool.name}` : `Pagrindinis: ${mainTool.name}`, CONTENT_X, y);
    y += LINE_HEIGHT_BODY;
    applyFont(doc, useCustomFont);
    y = addWrappedText(doc, mainTool.description, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY, LINE_HEIGHT_BODY) + PARAGRAPH_GAP;
  }
  doc.setFontSize(FONT_BODY - 1);
  applyFont(doc, useCustomFont);
  for (const name of segment.additionalToolNames) {
    const t = toolsByName.get(name);
    if (t) doc.text(`• ${t.name}: ${t.url}`, CONTENT_X, (y += LINE_HEIGHT_BODY));
  }
  y += PARAGRAPH_GAP;
  drawSectionLeftBorder(doc, yToolsStart, y, BRAND_COLOR);
  y += SECTION_GAP;
  doc.setFontSize(FONT_BODY);

  // 3) Workflow
  const yWorkflowStart = y;
  y = addSectionTitle(doc, '3. Workflow', y, useCustomFont);
  const workflowLine = segment.workflowSteps.join(' → ');
  y = addWrappedText(doc, workflowLine, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY, LINE_HEIGHT_BODY) + SECTION_GAP;
  drawSectionLeftBorder(doc, yWorkflowStart, y, BRAND_COLOR);
  y += SECTION_GAP;

  // 4) 5 sąvokos
  const yGlossStart = y;
  y = addSectionTitle(doc, isEn ? '4. Key concepts' : '4. Svarbios sąvokos', y, useCustomFont);
  for (const termName of segment.glossaryTermNames) {
    const g = glossaryByTerm.get(termName);
    if (g) {
      applyFont(doc, useCustomFont);
      doc.text(g.term, CONTENT_X, y);
      y += LINE_HEIGHT_BODY;
      applyFont(doc, useCustomFont);
      y = addWrappedText(doc, g.definition, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY, LINE_HEIGHT_BODY) + PARAGRAPH_GAP;
    }
  }
  drawSectionLeftBorder(doc, yGlossStart, y, BRAND_COLOR);
  y += SECTION_GAP;

  // 5) Sisteminis promptas
  const ySysStart = y;
  y = addSectionTitle(doc, isEn ? '5. System prompt' : '5. Sisteminis promptas', y, useCustomFont);
  y = addWrappedText(doc, segment.systemPrompt, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY, LINE_HEIGHT_BODY) + SECTION_GAP;
  drawSectionLeftBorder(doc, ySysStart, y, BRAND_COLOR);
  y += SECTION_GAP;

  // 6) Palinkėjimas – accent
  const yWishStart = y;
  doc.setTextColor(ACCENT_COLOR);
  doc.setFontSize(FONT_H3);
  applyFont(doc, useCustomFont);
  doc.text(isEn ? 'Closing message' : 'Palinkėjimas', CONTENT_X, y);
  y += LINE_HEIGHT_BODY + PARAGRAPH_GAP;
  doc.setTextColor(0, 0, 0);
  applyFont(doc, useCustomFont);
  y = addWrappedText(doc, segment.motivationWish, CONTENT_X, y, CONTENT_W_INNER, FONT_BODY, LINE_HEIGHT_BODY) + SECTION_GAP;
  drawSectionLeftBorder(doc, yWishStart, y, ACCENT_COLOR);
  y += SECTION_GAP;

  if (y > 270) {
    doc.addPage();
    y = MARGIN;
  }

  // Footer – pilka, mažas šriftas (PDF_MAKETO_GAIRES §6)
  doc.setFontSize(FONT_SMALL);
  doc.setTextColor(128, 128, 128);
  applyFont(doc, useCustomFont);
  doc.text(footerText, MARGIN, 290);

  const safeTitle = segment.title.replace(/[?/:\\*"]/g, '').slice(0, 40);
  const defaultName = isEn ? `Prompt_Anatomy_${safeTitle}.pdf` : `Promptu_anatomija_${safeTitle}.pdf`;
  const name = filename ?? defaultName;
  doc.save(name);
}
