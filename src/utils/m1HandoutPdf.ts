/**
 * Generuoja Modulio 1 „first win“ PDF atmintinę.
 * Value-only: be ekosistemos CTA ir be outbound nuorodų.
 */

import type { M1HandoutContent } from '../data/handoutContentLoader';
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

export type { M1HandoutContent };

export async function downloadM1HandoutPdf(
  content: M1HandoutContent,
  filename?: string,
  locale?: 'lt' | 'en'
): Promise<void> {
  const pdfLocale = locale ?? 'lt';
  const isEn = pdfLocale === 'en';
  const ctx = await createHandoutDoc('regular');
  let y = addHeader(ctx, content.title, content.subtitle, pdfLocale);

  const yBlocks = y;
  y = addSectionTitle(
    ctx,
    isEn ? '1. The 6-block system' : '1. 6 blokų sistema',
    y
  );
  for (const block of content.coreBlocks) {
    y =
      addWrappedText(
        ctx,
        `${block.label}: ${block.meaning}`,
        HANDOUT_CONTENT_X,
        y,
        HANDOUT_CONTENT_W_INNER
      ) + ctx.typography.paragraphGap;
  }
  drawSectionLeftBorder(ctx.doc, yBlocks, y, HANDOUT_BRAND_COLOR);
  y += ctx.typography.sectionGap;

  y = addListSection(
    ctx,
    isEn ? '2. First-win checklist' : '2. Pirmos pergalės checklist',
    content.firstWinChecklist,
    y
  );

  const yPrompt = y;
  y = addSectionTitle(
    ctx,
    isEn ? '3. Starter prompt' : '3. Starter promptas',
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
  y += ctx.typography.sectionGap;

  y = addListSection(
    ctx,
    isEn ? '4. Quick quality check' : '4. Greita kokybės patikra',
    content.qualityCheck,
    y,
    { ordered: false, colorHex: HANDOUT_ACCENT_COLOR }
  );

  addFooter(ctx, content.footerText);

  const defaultName = defaultHandoutFilename(
    isEn ? 'Module1_handout' : 'Modulio1_atmintine',
    pdfLocale
  );
  ctx.doc.save(filename ?? defaultName);
}
