/**
 * Generuoja Modulių 16–18 Kodo inžinerijos kelio PDF atmintinę.
 * Maketo branduolys bendras visai atmintinių serijai: handoutPdfKit.ts.
 */

import type { M1618HandoutContent } from '../data/handoutContentLoader';
import {
  BLOG_ARTICLE_SLUGS,
  ECOSYSTEM_URLS,
  blogArticleUrl,
} from '../constants/ecosystemUrls';
import { logError } from './logger';
import {
  HANDOUT_ACCENT_COLOR,
  HANDOUT_CONTENT_W_INNER,
  HANDOUT_CONTENT_X,
  addEcosystemCta,
  addFooter,
  addHeader,
  addListSection,
  addPageNumbers,
  addPromptBlock,
  addSectionTitle,
  addTrainingUtm,
  addWrappedText,
  createHandoutDoc,
  defaultHandoutFilename,
  drawSectionLeftBorder,
} from './handoutPdfKit';

export interface M1618HandoutUrls {
  primary: string;
  decide: string;
  map: string;
  hub: string;
}

export interface M1618HandoutOptions {
  locale: 'lt' | 'en';
  urls?: Partial<M1618HandoutUrls>;
}

function buildDefaultUrls(): M1618HandoutUrls {
  return {
    primary: blogArticleUrl(
      BLOG_ARTICLE_SLUGS.ecosystemMap,
      { moduleId: 18, touchpoint: 'handout' },
      { medium: 'handout' }
    ),
    decide: addTrainingUtm(ECOSYSTEM_URLS.hub, 'm18_handout_decide'),
    map: addTrainingUtm(ECOSYSTEM_URLS.map, 'm18_handout_map'),
    hub: addTrainingUtm(ECOSYSTEM_URLS.hub, 'm18_handout_hub'),
  };
}

/**
 * Įkrauna šriftą ir generuoja Modulių 16–18 atmintinės PDF.
 */
export async function downloadM1618HandoutPdf(
  content: M1618HandoutContent,
  options: M1618HandoutOptions,
  filename?: string
): Promise<void> {
  try {
    await buildM1618HandoutPdf(content, options, filename);
  } catch (err) {
    logError(err instanceof Error ? err : new Error(String(err)), {
      util: 'downloadM1618HandoutPdf',
      locale: options.locale,
    });
    throw err;
  }
}

async function buildM1618HandoutPdf(
  content: M1618HandoutContent,
  options: M1618HandoutOptions,
  filename?: string
): Promise<void> {
  const isEn = options.locale === 'en';
  const ctx = await createHandoutDoc('compact');
  const urls = { ...buildDefaultUrls(), ...options.urls };
  let y = addHeader(ctx, content.title, content.subtitle, options.locale);

  y = addListSection(
    ctx,
    isEn ? '1. Brief and VSR' : '1. Brief ir VSR',
    content.briefSteps,
    y
  );
  y = addListSection(
    ctx,
    isEn ? '2. PACKET checklist' : '2. PACKET kontrolinis lapas',
    content.packetChecklist,
    y
  );
  y = addListSection(
    ctx,
    isEn ? '3. Soft DoD' : '3. Soft DoD',
    content.softDodChecks,
    y
  );
  y = addListSection(
    ctx,
    isEn ? '4. Prompt patterns' : '4. Promptų šablonai',
    content.promptPatterns,
    y,
    { colorHex: HANDOUT_ACCENT_COLOR }
  );

  y = addPromptBlock(
    ctx,
    isEn ? '5. Starter prompt' : '5. Starter promptas',
    content.starterPrompt,
    y
  );

  const yReflection = y;
  y = addSectionTitle(
    ctx,
    isEn
      ? '6. Reflection and 48-hour action'
      : '6. Refleksija ir 48 val. veiksmas',
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

  ctx.doc.addPage();
  addEcosystemCta(ctx, {
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
  });

  addPageNumbers(ctx, options.locale);
  addFooter(ctx, content.footerText, {
    websiteCta: content.websiteCta,
    websiteUrl: urls.hub || content.websiteUrl,
    linkPrefix: '',
  });

  const defaultName = defaultHandoutFilename(
    isEn ? 'Code_engineering_path_handout' : 'Kodo_kelio_atmintine',
    options.locale
  );
  ctx.doc.save(filename ?? defaultName);
}
