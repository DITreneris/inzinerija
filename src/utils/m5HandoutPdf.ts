/**
 * Generuoja Modulio 5 PDF atmintinę.
 * Maketo branduolys bendras visai atmintinių serijai: handoutPdfKit.ts.
 */

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

/**
 * Įkrauna šriftą (NotoSans) ir generuoja Modulio 5 atmintinės PDF.
 * Failas: LT – Promptu_anatomija_Modulio5_atmintine.pdf; EN – Prompt_Anatomy_Module5_handout.pdf
 */
export async function downloadM5HandoutPdf(
  content: M5HandoutContent,
  filename?: string,
  locale?: 'lt' | 'en'
): Promise<void> {
  const pdfLocale = locale ?? 'lt';
  const isEn = pdfLocale === 'en';
  const ctx = await createHandoutDoc('regular');
  let y = addHeader(ctx, content.title, content.subtitle, pdfLocale);

  const yTools = y;
  y = addSectionTitle(
    ctx,
    isEn ? '1. Key tools' : '1. Pagrindiniai įrankiai',
    y
  );
  y =
    addWrappedText(
      ctx,
      content.toolsIntro,
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER
    ) + ctx.typography.paragraphGap;
  for (const bullet of content.toolsBullets) {
    y =
      addWrappedText(
        ctx,
        `• ${bullet}`,
        HANDOUT_CONTENT_X,
        y,
        HANDOUT_CONTENT_W_INNER
      ) + ctx.typography.paragraphGap;
  }
  drawSectionLeftBorder(ctx.doc, yTools, y, HANDOUT_BRAND_COLOR);
  y += ctx.typography.sectionGap;

  const yPrompts = y;
  y = addSectionTitle(ctx, isEn ? '2. Prompts' : '2. Promptai', y);
  y =
    addWrappedText(
      ctx,
      isEn ? '8-slide structure:' : '8 skaidrių struktūra:',
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER
    ) + ctx.typography.paragraphGap;
  y =
    addWrappedText(
      ctx,
      content.structure8,
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER,
      ctx.typography.body - 1,
      ctx.typography.lineHeightBody - 0.5
    ) + ctx.typography.paragraphGap;
  y =
    addWrappedText(
      ctx,
      isEn
        ? 'Master prompt (structure only):'
        : 'Master promptas (tik struktūra):',
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER
    ) + ctx.typography.paragraphGap;
  y =
    addWrappedText(
      ctx,
      content.masterPrompt,
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER,
      ctx.typography.body - 1,
      ctx.typography.lineHeightBody - 0.5
    ) + ctx.typography.paragraphGap;
  y =
    addWrappedText(
      ctx,
      isEn
        ? 'Full content principle (6 blocks):'
        : 'Pilno turinio principas (6 blokų):',
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER
    ) + ctx.typography.paragraphGap;
  y =
    addWrappedText(
      ctx,
      content.fullPromptPrinciple,
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER
    ) + ctx.typography.sectionGap;
  drawSectionLeftBorder(ctx.doc, yPrompts, y, HANDOUT_BRAND_COLOR);
  y += ctx.typography.sectionGap;

  y = addListSection(
    ctx,
    isEn ? '3. Sequence (15 min sprint)' : '3. Seka (15 min sprintas)',
    content.sequenceSteps,
    y
  );

  const yConcepts = y;
  y = addSectionTitle(ctx, isEn ? '4. Concepts' : '4. Sąvokos', y);
  y =
    addWrappedText(
      ctx,
      'Brief:',
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER
    ) + ctx.typography.paragraphGap;
  y =
    addWrappedText(
      ctx,
      content.briefDefinition,
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER
    ) + ctx.typography.paragraphGap;
  y =
    addWrappedText(
      ctx,
      isEn ? 'Quick quality check:' : 'Greita kokybės patikra:',
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER
    ) + ctx.typography.paragraphGap;
  for (const point of content.qualityCheckPoints) {
    y =
      addWrappedText(
        ctx,
        `• ${point}`,
        HANDOUT_CONTENT_X,
        y,
        HANDOUT_CONTENT_W_INNER
      ) + ctx.typography.paragraphGap;
  }
  y =
    addWrappedText(
      ctx,
      isEn ? 'Thresholds (mini test):' : 'Slenksčiai (mini testas):',
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER
    ) + ctx.typography.paragraphGap;
  y =
    addWrappedText(
      ctx,
      content.thresholdsExplanation,
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER
    ) + ctx.typography.sectionGap;
  drawSectionLeftBorder(ctx.doc, yConcepts, y, HANDOUT_ACCENT_COLOR);

  addFooter(ctx, content.footerText, {
    websiteCta: 'www.promptanatomy.app',
    websiteUrl: 'https://www.promptanatomy.app/',
    linkPrefix: isEn ? 'More: ' : 'Daugiau: ',
  });

  const defaultName = defaultHandoutFilename(
    isEn ? 'Module5_handout' : 'Modulio5_atmintine',
    pdfLocale
  );
  ctx.doc.save(filename ?? defaultName);
}
