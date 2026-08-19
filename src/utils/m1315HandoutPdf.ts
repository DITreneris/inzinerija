/**
 * Generuoja Modulių 13–15 Turinio inžinerijos kelio PDF atmintinę.
 * Maketo branduolys bendras visai atmintinių serijai: handoutPdfKit.ts.
 */

import type { M1315HandoutContent } from '../data/handoutContentLoader';
import {
  BLOG_ARTICLE_SLUGS,
  ECOSYSTEM_URLS,
  blogArticleUrl,
} from '../constants/ecosystemUrls';
import {
  HANDOUT_ACCENT_COLOR,
  HANDOUT_CONTENT_W_INNER,
  HANDOUT_CONTENT_X,
  addEcosystemCta,
  addFooter,
  addHeader,
  addListSection,
  addPageNumbers,
  addSectionTitle,
  addTrainingUtm,
  addWrappedText,
  createHandoutDoc,
  defaultHandoutFilename,
  drawSectionLeftBorder,
} from './handoutPdfKit';

export interface M1315HandoutUrls {
  primary: string;
  decide: string;
  map: string;
  hub: string;
}

export interface M1315HandoutOptions {
  locale: 'lt' | 'en';
  urls?: Partial<M1315HandoutUrls>;
}

function buildDefaultUrls(): M1315HandoutUrls {
  return {
    primary: blogArticleUrl(
      BLOG_ARTICLE_SLUGS.ecosystemMap,
      { moduleId: 15, touchpoint: 'handout' },
      { medium: 'handout' }
    ),
    // Hub fallback while promptanatomy.pro is unstable (utm_campaign keeps intent).
    decide: addTrainingUtm(ECOSYSTEM_URLS.hub, 'm15_handout_decide'),
    map: addTrainingUtm(ECOSYSTEM_URLS.map, 'm15_handout_map'),
    hub: addTrainingUtm(ECOSYSTEM_URLS.hub, 'm15_handout_hub'),
  };
}

function addPromptTemplate(
  ctx: Awaited<ReturnType<typeof createHandoutDoc>>,
  title: string,
  body: string,
  y: number
): number {
  const yStart = y;
  let nextY = addSectionTitle(ctx, title, y, HANDOUT_ACCENT_COLOR);
  nextY =
    addWrappedText(
      ctx,
      body,
      HANDOUT_CONTENT_X,
      nextY,
      HANDOUT_CONTENT_W_INNER,
      ctx.typography.body - 0.3,
      ctx.typography.lineHeightBody - 0.2
    ) + ctx.typography.paragraphGap;
  drawSectionLeftBorder(ctx.doc, yStart, nextY, HANDOUT_ACCENT_COLOR);
  return nextY + ctx.typography.sectionGap;
}

/**
 * Įkrauna šriftą ir generuoja Modulių 13–15 atmintinės PDF.
 */
export async function downloadM1315HandoutPdf(
  content: M1315HandoutContent,
  options: M1315HandoutOptions,
  filename?: string
): Promise<void> {
  const isEn = options.locale === 'en';
  const ctx = await createHandoutDoc('compact');
  const urls = { ...buildDefaultUrls(), ...options.urls };
  let y = addHeader(ctx, content.title, content.subtitle, options.locale);

  y = addListSection(
    ctx,
    isEn ? '1. Choose the format' : '1. Pasirink formatą',
    content.modalityChecklist,
    y
  );
  y = addPromptTemplate(
    ctx,
    isEn ? '2. Image prompt' : '2. Vaizdo promptas',
    content.imagePromptTemplate,
    y
  );
  y = addPromptTemplate(
    ctx,
    isEn ? '3. Video prompt' : '3. Video promptas',
    content.videoPromptTemplate,
    y
  );
  y = addPromptTemplate(
    ctx,
    isEn ? '4. Audio prompt' : '4. Garso promptas',
    content.musicPromptTemplate,
    y
  );
  if (content.montagePromptTemplate) {
    addPromptTemplate(
      ctx,
      isEn ? '5. Edit plan' : '5. Montažo planas',
      content.montagePromptTemplate,
      y
    );
  }

  ctx.doc.addPage();
  let pageTwoY = addListSection(
    ctx,
    isEn ? '6. Rights check' : '6. Teisių patikra',
    content.rightsChecklist,
    HANDOUT_CONTENT_X
  );
  pageTwoY = addListSection(
    ctx,
    isEn ? '7. Delivery checklist' : '7. Pristatymo sąrašas',
    content.deliveryChecklist,
    pageTwoY,
    { colorHex: HANDOUT_ACCENT_COLOR }
  );
  const yReflection = pageTwoY;
  pageTwoY = addSectionTitle(
    ctx,
    isEn
      ? '8. Reflection and 48-hour action'
      : '8. Refleksija ir 48 val. veiksmas',
    pageTwoY,
    HANDOUT_ACCENT_COLOR
  );
  pageTwoY =
    addWrappedText(
      ctx,
      content.reflectionSummary,
      HANDOUT_CONTENT_X,
      pageTwoY,
      HANDOUT_CONTENT_W_INNER
    ) + ctx.typography.sectionGap;
  drawSectionLeftBorder(ctx.doc, yReflection, pageTwoY, HANDOUT_ACCENT_COLOR);

  addEcosystemCta(
    ctx,
    {
      heading: content.nextPageHeading,
      intro: content.nextPageIntro,
      primaryHeading: isEn ? 'Primary next step' : 'Pagrindinis kitas žingsnis',
      primaryLabel: content.primaryCtaLabel,
      primaryUrl: urls.primary,
      secondaryHeading: isEn ? 'Secondary paths' : 'Papildomi keliai',
      secondaryLinks: [
        { label: content.secondaryCtaLabels.decide, url: urls.decide },
        { label: content.secondaryCtaLabels.map, url: urls.map },
      ],
    },
    pageTwoY
  );

  addPageNumbers(ctx, options.locale);
  addFooter(ctx, content.footerText, {
    websiteCta: content.websiteCta,
    websiteUrl: urls.hub || content.websiteUrl,
    linkPrefix: '',
  });

  const defaultName = defaultHandoutFilename(
    isEn ? 'Content_engineering_path_handout' : 'Turinio_kelio_atmintine',
    options.locale
  );
  ctx.doc.save(filename ?? defaultName);
}
