/**
 * Generuoja Modulių 7–9 Duomenų analizės kelio PDF atmintinę.
 * Maketo branduolys bendras visai atmintinių serijai: handoutPdfKit.ts.
 */

import type { M79HandoutContent } from '../data/handoutContentLoader';
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
  addSectionTitle,
  addTrainingUtm,
  addWrappedText,
  createHandoutDoc,
  defaultHandoutFilename,
  drawSectionLeftBorder,
} from './handoutPdfKit';

export interface M79HandoutUrls {
  primary: string;
  decide: string;
  map: string;
  hub: string;
}

export interface M79HandoutOptions {
  locale: 'lt' | 'en';
  urls?: Partial<M79HandoutUrls>;
}

function buildDefaultUrls(): M79HandoutUrls {
  return {
    primary: blogArticleUrl(
      BLOG_ARTICLE_SLUGS.workflowCanvas,
      { moduleId: 9, touchpoint: 'handout' },
      { medium: 'handout' }
    ),
    decide: addTrainingUtm(ECOSYSTEM_URLS.decide, 'm9_handout_decide'),
    map: addTrainingUtm(ECOSYSTEM_URLS.map, 'm9_handout_map'),
    hub: addTrainingUtm(ECOSYSTEM_URLS.hub, 'm9_handout_hub'),
  };
}

/**
 * Įkrauna šriftą ir generuoja Modulių 7–9 atmintinės PDF.
 * Failas: LT – Promptu_anatomija_DA_kelio_atmintine.pdf; EN – Prompt_Anatomy_Data_Analytics_path_handout.pdf
 */
export async function downloadM79HandoutPdf(
  content: M79HandoutContent,
  options: M79HandoutOptions,
  filename?: string
): Promise<void> {
  const isEn = options.locale === 'en';
  const ctx = await createHandoutDoc('compact');
  const urls = { ...buildDefaultUrls(), ...options.urls };
  let y = addHeader(ctx, content.title, content.subtitle, options.locale);

  y = addListSection(
    ctx,
    isEn ? '1. Data pipeline (6 steps)' : '1. Duomenų pipeline (6 žingsniai)',
    content.pipelineSteps,
    y
  );
  y = addListSection(
    ctx,
    isEn ? '2. MASTER prompt (8 steps)' : '2. MASTER PROMPTAS (8 žingsniai)',
    content.masterPromptSteps,
    y
  );
  y = addListSection(
    ctx,
    isEn ? '3. Module 9 workflow' : '3. Modulio 9 workflow',
    content.workflowSteps,
    y
  );

  const yReflection = y;
  y = addSectionTitle(
    ctx,
    isEn
      ? '4. Reflection and 48-hour action'
      : '4. Refleksija ir 48 val. veiksmas',
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

  addFooter(ctx, content.footerText, {
    websiteCta: content.websiteCta,
    websiteUrl: urls.hub || content.websiteUrl,
    linkPrefix: '',
  });

  const defaultName = defaultHandoutFilename(
    isEn ? 'Data_Analytics_path_handout' : 'DA_kelio_atmintine',
    options.locale
  );
  ctx.doc.save(filename ?? defaultName);
}
