/**
 * Patikimos PDF hipernuorodos: label + matomas URL + doc.link hitbox.
 * jsPDF textWithLink vienas nepakanka (baseline/custom font hitbox).
 */

import type { jsPDF } from 'jspdf';
import { logWarning } from './logger';

export const PDF_LINK_BLUE: [number, number, number] = [35, 91, 150];
export const PDF_LINK_URL_GRAY: [number, number, number] = [100, 100, 100];

export interface DrawClickableUrlOptions {
  doc: jsPDF;
  label: string;
  url: string;
  x: number;
  y: number;
  maxWidth: number;
  /** Label font size (pt). */
  labelFontSize: number;
  /** Visible URL font size (pt). */
  urlFontSize: number;
  labelLineHeight: number;
  urlLineHeight: number;
  /** Apply current Unicode/fallback font before measuring/drawing. */
  applyFont: () => void;
  /** Hide visible URL line (footer when label already shows domain). Default false. */
  showUrl?: boolean;
  /** Center the label (and URL) within maxWidth starting at x. */
  align?: 'left' | 'center';
}

function measureWidth(doc: jsPDF, text: string): number {
  if (typeof doc.getTextWidth === 'function') {
    return doc.getTextWidth(text);
  }
  return doc.getTextDimensions?.(text)?.w ?? text.length * 1.5;
}

/**
 * Piešia paspaudžiamą nuorodą. Grąžina Y po bloku (kitas turinys).
 */
export function drawClickableUrl(options: DrawClickableUrlOptions): number {
  const {
    doc,
    label,
    url,
    maxWidth,
    labelFontSize,
    urlFontSize,
    labelLineHeight,
    urlLineHeight,
    applyFont,
    showUrl = true,
    align = 'left',
  } = options;
  const { x, y } = options;
  const pad = 1.2;

  applyFont();
  doc.setFontSize(labelFontSize);
  const labelWidth = Math.min(measureWidth(doc, label), maxWidth);
  const drawX = align === 'center' ? x + (maxWidth - labelWidth) / 2 : x;

  doc.setTextColor(...PDF_LINK_BLUE);
  doc.text(label, drawX, y);
  doc.setDrawColor(...PDF_LINK_BLUE);
  doc.setLineWidth(0.2);
  doc.line(drawX, y + 0.6, drawX + labelWidth, y + 0.6);

  let blockBottom = y + labelLineHeight;
  let hitWidth = labelWidth;
  const hitTop = y - labelFontSize * 0.35;

  if (showUrl) {
    applyFont();
    doc.setFontSize(urlFontSize);
    doc.setTextColor(...PDF_LINK_URL_GRAY);
    const urlLines = doc.splitTextToSize(url, maxWidth) as string[];
    const urlX =
      align === 'center'
        ? x +
          (maxWidth -
            Math.min(measureWidth(doc, urlLines[0] ?? url), maxWidth)) /
            2
        : x;
    doc.text(urlLines, urlX, blockBottom);
    const urlBlockH = urlLines.length * urlLineHeight;
    hitWidth = Math.max(
      hitWidth,
      ...urlLines.map((line) => measureWidth(doc, line))
    );
    blockBottom += urlBlockH;
  }

  const hitHeight = Math.max(blockBottom - hitTop + pad, labelLineHeight + pad);
  hitWidth = Math.min(Math.max(hitWidth, 20) + pad * 2, maxWidth);
  const hitX = Math.max(
    align === 'center' ? drawX - pad : x - pad,
    options.x - pad
  );

  if (typeof doc.link === 'function') {
    doc.link(hitX, hitTop - pad * 0.25, hitWidth, hitHeight, { url });
  } else {
    logWarning('jsPDF.doc.link missing – PDF URL drawn without hitbox', {
      url,
      label,
    });
  }

  doc.setTextColor(0, 0, 0);
  return blockBottom;
}
