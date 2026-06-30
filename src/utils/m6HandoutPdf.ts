/**
 * Generuoja Modulio 6 PDF atmintinę.
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

/**
 * Įkrauna šriftą (NotoSans) ir generuoja Modulio 6 atmintinės PDF.
 * Failas: LT – Promptu_anatomija_Modulio6_atmintine.pdf; EN – Prompt_Anatomy_Module6_handout.pdf
 */
export async function downloadM6HandoutPdf(
  content: M6HandoutContent,
  filename?: string,
  locale?: 'lt' | 'en'
): Promise<void> {
  const pdfLocale = locale ?? 'lt';
  const isEn = pdfLocale === 'en';
  const ctx = await createHandoutDoc('regular');
  let y = addHeader(ctx, content.title, content.subtitle, pdfLocale);

  y = addListSection(
    ctx,
    isEn ? '1. Project steps (6 steps)' : '1. Projekto etapai (6 žingsniai)',
    content.projectSteps,
    y
  );

  const yData = y;
  y = addSectionTitle(
    ctx,
    isEn ? '2. Data management (5 points)' : '2. Duomenų tvarkymas (5 punktai)',
    y
  );
  for (const point of content.dataManagementPoints) {
    y =
      addWrappedText(
        ctx,
        point.title,
        HANDOUT_CONTENT_X,
        y,
        HANDOUT_CONTENT_W_INNER
      ) + ctx.typography.paragraphGap;
    y =
      addWrappedText(
        ctx,
        point.practicalMeaning,
        HANDOUT_CONTENT_X,
        y,
        HANDOUT_CONTENT_W_INNER,
        ctx.typography.body - 1,
        ctx.typography.lineHeightBody - 0.3
      ) + ctx.typography.paragraphGap;
  }
  drawSectionLeftBorder(ctx.doc, yData, y, HANDOUT_BRAND_COLOR);
  y += ctx.typography.sectionGap;

  const yReflection = y;
  y = addSectionTitle(
    ctx,
    isEn
      ? '3. Reflection and first action'
      : '3. Refleksija ir pirmas veiksmas',
    y,
    HANDOUT_ACCENT_COLOR
  );
  y =
    addWrappedText(
      ctx,
      content.reflectionSummary,
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER
    ) + ctx.typography.sectionGap;
  drawSectionLeftBorder(ctx.doc, yReflection, y, HANDOUT_ACCENT_COLOR);

  addFooter(ctx, content.footerText, {
    websiteCta: 'www.promptanatomy.app',
    websiteUrl: 'https://www.promptanatomy.app/',
    linkPrefix: isEn ? 'More: ' : 'Daugiau: ',
  });

  const defaultName = defaultHandoutFilename(
    isEn ? 'Module6_handout' : 'Modulio6_atmintine',
    pdfLocale
  );
  ctx.doc.save(filename ?? defaultName);
}
