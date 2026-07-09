/**
 * Generuoja Modulio 4 PDF atmintinę.
 * Value-only: be ekosistemos CTA ir be outbound nuorodų.
 */

import type { M4HandoutContent } from '../data/handoutContentLoader';
import {
  HANDOUT_ACCENT_COLOR,
  HANDOUT_BRAND_COLOR,
  HANDOUT_CONTENT_W_INNER,
  HANDOUT_CONTENT_X,
  addFooter,
  addHeader,
  addListSection,
  addSectionTitle,
  addWrappedText,
  createHandoutDoc,
  defaultHandoutFilename,
  drawSectionLeftBorder,
} from './handoutPdfKit';

export type { M4HandoutContent };

export async function downloadM4HandoutPdf(
  content: M4HandoutContent,
  filename?: string,
  locale?: 'lt' | 'en'
): Promise<void> {
  const pdfLocale = locale ?? 'lt';
  const isEn = pdfLocale === 'en';
  const ctx = await createHandoutDoc('regular');
  let y = addHeader(ctx, content.title, content.subtitle, pdfLocale);

  const yTopics = y;
  y = addSectionTitle(ctx, isEn ? '1. Core topics' : '1. Pagrindinės temos', y);
  for (const topic of content.coreTopics) {
    y =
      addWrappedText(
        ctx,
        `${topic.title}: ${topic.meaning}`,
        HANDOUT_CONTENT_X,
        y,
        HANDOUT_CONTENT_W_INNER
      ) + ctx.typography.paragraphGap;
  }
  drawSectionLeftBorder(ctx.doc, yTopics, y, HANDOUT_BRAND_COLOR);
  y += ctx.typography.sectionGap;

  y = addListSection(
    ctx,
    isEn ? '2. Reliability checklist' : '2. Patikimumo checklist',
    content.checklist,
    y,
    { ordered: false, colorHex: HANDOUT_BRAND_COLOR }
  );

  const yPrompt = y;
  y = addSectionTitle(
    ctx,
    isEn ? '3. Source-check prompt' : '3. Šaltinių patikros promptas',
    y,
    HANDOUT_ACCENT_COLOR
  );
  y =
    addWrappedText(
      ctx,
      content.starterPrompt,
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER,
      ctx.typography.body - 1,
      ctx.typography.lineHeightBody - 0.3
    ) + ctx.typography.sectionGap;
  drawSectionLeftBorder(ctx.doc, yPrompt, y, HANDOUT_ACCENT_COLOR);

  addFooter(ctx, content.footerText);

  const defaultName = defaultHandoutFilename(
    isEn ? 'Module4_handout' : 'Modulio4_atmintine',
    pdfLocale
  );
  ctx.doc.save(filename ?? defaultName);
}
