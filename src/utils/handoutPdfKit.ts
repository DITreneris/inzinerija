import { jsPDF } from 'jspdf';
import {
  getPdfUnicodeFontBase64,
  loadPdfUnicodeFont,
  registerUnicodePdfFont,
} from './pdfNotoFont';
import { drawClickableUrl } from './pdfLink';

export const HANDOUT_BRAND_COLOR = '#627d98';
export const HANDOUT_ACCENT_COLOR = '#d4a520';
export const HANDOUT_MARGIN = 18;
export const HANDOUT_PAGE_W = 210;
export const HANDOUT_PAGE_H = 297;
/** Content must end at or above this Y (mm) so footer at PAGE_H-12 / PAGE_H-7 does not overlap. */
export const HANDOUT_CONTENT_BOTTOM = HANDOUT_PAGE_H - 16;
export const HANDOUT_BORDER_LEFT_WIDTH = 1.5;
export const HANDOUT_CONTENT_X = HANDOUT_MARGIN + HANDOUT_BORDER_LEFT_WIDTH + 3;
export const HANDOUT_CONTENT_W_INNER =
  HANDOUT_PAGE_W - HANDOUT_MARGIN * 2 - HANDOUT_BORDER_LEFT_WIDTH - 3;

export type HandoutDensity = 'regular' | 'compact';

export interface HandoutTypography {
  h1: number;
  h2: number;
  h3: number;
  body: number;
  small: number;
  lineHeightBody: number;
  sectionGap: number;
  paragraphGap: number;
}

export const HANDOUT_TYPOGRAPHY: Record<HandoutDensity, HandoutTypography> = {
  regular: {
    h1: 15,
    h2: 14,
    h3: 11,
    body: 10,
    small: 8,
    lineHeightBody: 4.2,
    sectionGap: 7,
    paragraphGap: 3.5,
  },
  compact: {
    h1: 15,
    h2: 13,
    h3: 10.5,
    body: 8.7,
    small: 7.5,
    lineHeightBody: 3.7,
    sectionGap: 5.5,
    paragraphGap: 2.4,
  },
};

export interface HandoutPdfContext {
  doc: jsPDF;
  useCustomFont: boolean;
  typography: HandoutTypography;
}

type JsPdfWithPages = jsPDF & {
  getNumberOfPages?: () => number;
  internal?: jsPDF['internal'] & { getNumberOfPages?: () => number };
};

export async function createHandoutDoc(
  density: HandoutDensity = 'regular'
): Promise<HandoutPdfContext> {
  await loadPdfUnicodeFont();
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const useCustomFont = registerUnicodePdfFont(doc, getPdfUnicodeFontBase64());

  return {
    doc,
    useCustomFont,
    typography: HANDOUT_TYPOGRAPHY[density],
  };
}

export function applyHandoutFont(doc: jsPDF, fontRegistered: boolean): void {
  if (fontRegistered) {
    doc.setFont('NotoSans', 'normal');
  } else {
    doc.setFont('helvetica', 'normal');
  }
}

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function addWrappedText(
  ctx: HandoutPdfContext,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize = ctx.typography.body,
  lineHeight = ctx.typography.lineHeightBody
): number {
  ctx.doc.setFontSize(fontSize);
  applyHandoutFont(ctx.doc, ctx.useCustomFont);
  const lines = ctx.doc.splitTextToSize(text, maxWidth);
  ctx.doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

export function drawSectionLeftBorder(
  doc: jsPDF,
  yStart: number,
  yEnd: number,
  colorHex = HANDOUT_BRAND_COLOR
): void {
  const [r, g, b] = hexToRgb(colorHex);
  doc.setFillColor(r, g, b);
  doc.rect(
    HANDOUT_MARGIN,
    yStart,
    HANDOUT_BORDER_LEFT_WIDTH,
    Math.max(yEnd - yStart, 2)
  );
  doc.fill();
}

export function addSectionTitle(
  ctx: HandoutPdfContext,
  title: string,
  y: number,
  colorHex = HANDOUT_BRAND_COLOR
): number {
  const [r, g, b] = hexToRgb(colorHex);
  ctx.doc.setTextColor(r, g, b);
  ctx.doc.setFontSize(ctx.typography.h3);
  applyHandoutFont(ctx.doc, ctx.useCustomFont);
  ctx.doc.text(title, HANDOUT_CONTENT_X, y);
  ctx.doc.setTextColor(0, 0, 0);
  applyHandoutFont(ctx.doc, ctx.useCustomFont);
  return y + ctx.typography.lineHeightBody + ctx.typography.paragraphGap;
}

export function addHeader(
  ctx: HandoutPdfContext,
  title: string,
  subtitle: string,
  locale: 'lt' | 'en',
  y = HANDOUT_MARGIN
): number {
  ctx.doc.setFontSize(ctx.typography.h1);
  ctx.doc.setTextColor(HANDOUT_BRAND_COLOR);
  applyHandoutFont(ctx.doc, ctx.useCustomFont);
  ctx.doc.text(
    locale === 'en' ? 'Prompt Anatomy' : 'Promptų anatomija',
    HANDOUT_MARGIN,
    y
  );

  let nextY = y + 6;
  ctx.doc.setFontSize(ctx.typography.h2);
  ctx.doc.setTextColor(0, 0, 0);
  applyHandoutFont(ctx.doc, ctx.useCustomFont);
  ctx.doc.text(title, HANDOUT_MARGIN, nextY);
  nextY += ctx.typography.lineHeightBody;

  return (
    addWrappedText(
      ctx,
      subtitle,
      HANDOUT_CONTENT_X,
      nextY,
      HANDOUT_CONTENT_W_INNER,
      ctx.typography.body,
      ctx.typography.lineHeightBody
    ) + ctx.typography.sectionGap
  );
}

export function addListSection(
  ctx: HandoutPdfContext,
  title: string,
  items: string[],
  y: number,
  options: { ordered?: boolean; colorHex?: string } = {}
): number {
  const yStart = y;
  let nextY = addSectionTitle(ctx, title, y, options.colorHex);

  items.forEach((item, index) => {
    const prefix = options.ordered === false ? '•' : `${index + 1}.`;
    nextY =
      addWrappedText(
        ctx,
        `${prefix} ${item}`,
        HANDOUT_CONTENT_X,
        nextY,
        HANDOUT_CONTENT_W_INNER
      ) + ctx.typography.paragraphGap;
  });

  drawSectionLeftBorder(ctx.doc, yStart, nextY, options.colorHex);
  return nextY + ctx.typography.sectionGap;
}

export function addLinkLine(
  ctx: HandoutPdfContext,
  label: string,
  url: string,
  y: number,
  options?: { showUrl?: boolean; maxWidth?: number; x?: number }
): number {
  const nextY = drawClickableUrl({
    doc: ctx.doc,
    label,
    url,
    x: options?.x ?? HANDOUT_CONTENT_X,
    y,
    maxWidth: options?.maxWidth ?? HANDOUT_CONTENT_W_INNER,
    labelFontSize: ctx.typography.body + 0.5,
    urlFontSize: ctx.typography.small,
    labelLineHeight: ctx.typography.lineHeightBody,
    urlLineHeight: ctx.typography.lineHeightBody - 0.4,
    applyFont: () => applyHandoutFont(ctx.doc, ctx.useCustomFont),
    showUrl: options?.showUrl ?? true,
  });
  return nextY + ctx.typography.paragraphGap;
}

export function addFooter(
  ctx: HandoutPdfContext,
  footerText: string,
  options?: { websiteCta?: string; websiteUrl?: string; linkPrefix?: string }
): void {
  const docWithPages = ctx.doc as JsPdfWithPages;
  const pageCount =
    docWithPages.getNumberOfPages?.() ??
    docWithPages.internal?.getNumberOfPages?.() ??
    1;

  for (let page = 1; page <= pageCount; page++) {
    ctx.doc.setPage(page);
    ctx.doc.setFontSize(ctx.typography.small);
    ctx.doc.setTextColor(128, 128, 128);
    applyHandoutFont(ctx.doc, ctx.useCustomFont);
    ctx.doc.text(footerText, HANDOUT_MARGIN, HANDOUT_PAGE_H - 12);

    if (options?.websiteCta && options.websiteUrl) {
      const prefix = options.linkPrefix ?? '';
      const linkY = HANDOUT_PAGE_H - 7;
      applyHandoutFont(ctx.doc, ctx.useCustomFont);
      ctx.doc.setFontSize(ctx.typography.small);
      ctx.doc.setTextColor(128, 128, 128);
      if (prefix) {
        ctx.doc.text(prefix, HANDOUT_MARGIN, linkY);
      }
      const linkX = HANDOUT_MARGIN + getTextWidth(ctx.doc, prefix);
      drawClickableUrl({
        doc: ctx.doc,
        label: options.websiteCta,
        url: options.websiteUrl,
        x: linkX,
        y: linkY,
        maxWidth: HANDOUT_PAGE_W - linkX - HANDOUT_MARGIN,
        labelFontSize: ctx.typography.small,
        urlFontSize: ctx.typography.small - 0.5,
        labelLineHeight: 3.2,
        urlLineHeight: 2.8,
        applyFont: () => applyHandoutFont(ctx.doc, ctx.useCustomFont),
        // Footer is tight; CTA label already carries the domain.
        showUrl: false,
      });
    }
  }

  ctx.doc.setTextColor(0, 0, 0);
}

export function addEcosystemCta(
  ctx: HandoutPdfContext,
  config: {
    heading: string;
    intro: string;
    primaryHeading: string;
    primaryLabel: string;
    primaryUrl: string;
    secondaryHeading: string;
    secondaryLinks: Array<{ label: string; url: string }>;
  },
  y = HANDOUT_MARGIN + 8
): number {
  ctx.doc.setFontSize(ctx.typography.h1);
  ctx.doc.setTextColor(HANDOUT_ACCENT_COLOR);
  applyHandoutFont(ctx.doc, ctx.useCustomFont);
  ctx.doc.text(config.heading, HANDOUT_MARGIN, y);
  ctx.doc.setTextColor(0, 0, 0);

  let nextY =
    addWrappedText(
      ctx,
      config.intro,
      HANDOUT_CONTENT_X,
      y + 8,
      HANDOUT_CONTENT_W_INNER,
      ctx.typography.body + 0.5
    ) + ctx.typography.sectionGap;

  const yPrimary = nextY;
  nextY = addSectionTitle(
    ctx,
    config.primaryHeading,
    nextY,
    HANDOUT_ACCENT_COLOR
  );
  nextY = addLinkLine(ctx, config.primaryLabel, config.primaryUrl, nextY);
  drawSectionLeftBorder(ctx.doc, yPrimary, nextY, HANDOUT_ACCENT_COLOR);
  nextY += ctx.typography.sectionGap;

  const ySecondary = nextY;
  nextY = addSectionTitle(ctx, config.secondaryHeading, nextY);
  for (const link of config.secondaryLinks) {
    nextY = addLinkLine(ctx, link.label, link.url, nextY);
  }
  drawSectionLeftBorder(ctx.doc, ySecondary, nextY, HANDOUT_BRAND_COLOR);

  return nextY;
}

export function addPromptBlock(
  ctx: HandoutPdfContext,
  title: string,
  body: string,
  y: number
): number {
  const pad = 2.5;
  const yStart = y;
  const bodySize = ctx.typography.body - 0.5;
  const bodyLh = ctx.typography.lineHeightBody - 0.2;

  applyHandoutFont(ctx.doc, ctx.useCustomFont);
  ctx.doc.setFontSize(bodySize);
  const bodyLines = ctx.doc.splitTextToSize(body, HANDOUT_CONTENT_W_INNER);
  const blockHeight =
    pad +
    ctx.typography.lineHeightBody +
    ctx.typography.paragraphGap +
    bodyLines.length * bodyLh +
    pad;

  ctx.doc.setFillColor(248, 248, 250);
  ctx.doc.rect(
    HANDOUT_MARGIN,
    yStart - 1,
    HANDOUT_PAGE_W - HANDOUT_MARGIN * 2,
    Math.max(blockHeight + 1, 4),
    'F'
  );

  let nextY = addSectionTitle(ctx, title, yStart + pad, HANDOUT_ACCENT_COLOR);
  nextY =
    addWrappedText(
      ctx,
      body,
      HANDOUT_CONTENT_X,
      nextY,
      HANDOUT_CONTENT_W_INNER,
      bodySize,
      bodyLh
    ) + pad;
  drawSectionLeftBorder(ctx.doc, yStart - 1, nextY, HANDOUT_ACCENT_COLOR);
  return nextY + ctx.typography.sectionGap;
}

export function addPageNumbers(
  ctx: HandoutPdfContext,
  locale: 'lt' | 'en'
): void {
  const docWithPages = ctx.doc as JsPdfWithPages;
  const pageCount =
    docWithPages.getNumberOfPages?.() ??
    docWithPages.internal?.getNumberOfPages?.() ??
    1;
  if (pageCount <= 1) return;

  for (let page = 1; page <= pageCount; page++) {
    ctx.doc.setPage(page);
    ctx.doc.setFontSize(ctx.typography.small);
    ctx.doc.setTextColor(128, 128, 128);
    applyHandoutFont(ctx.doc, ctx.useCustomFont);
    const label =
      locale === 'en' ? `${page}/${pageCount}` : `${page}/${pageCount}`;
    ctx.doc.text(label, HANDOUT_PAGE_W - HANDOUT_MARGIN, HANDOUT_PAGE_H - 16, {
      align: 'right',
    });
  }
  ctx.doc.setTextColor(0, 0, 0);
}

export function addTrainingUtm(url: string, campaign: string): string {
  const parsed = new URL(url);
  parsed.searchParams.set('utm_source', 'training');
  parsed.searchParams.set('utm_medium', 'handout');
  parsed.searchParams.set('utm_campaign', campaign);
  return parsed.toString();
}

export function defaultHandoutFilename(
  slug: string,
  locale: 'lt' | 'en'
): string {
  const prefix = locale === 'en' ? 'Prompt_Anatomy' : 'Promptu_anatomija';
  return `${prefix}_${slug}.pdf`;
}

function getTextWidth(doc: jsPDF, text: string): number {
  if (
    typeof (doc as jsPDF & { getTextWidth?(value: string): number })
      .getTextWidth === 'function'
  ) {
    return (
      doc as jsPDF & { getTextWidth(value: string): number }
    ).getTextWidth(text);
  }

  const dim = (
    doc as jsPDF & { getTextDimensions?(value: string): { w: number } }
  ).getTextDimensions?.(text);
  return dim?.w ?? 0;
}
