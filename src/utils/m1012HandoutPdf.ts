/**
 * Generuoja Modulių 10–12 Agentų inžinerijos kelio PDF atmintinę.
 * Maketo branduolys bendras visai atmintinių serijai: handoutPdfKit.ts.
 */

import type { M1012HandoutContent } from '../data/handoutContentLoader';
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

export interface M1012HandoutUrls {
  primary: string;
  decide: string;
  map: string;
  hub: string;
}

export interface M1012HandoutOptions {
  locale: 'lt' | 'en';
  urls?: Partial<M1012HandoutUrls>;
}

function buildDefaultUrls(): M1012HandoutUrls {
  return {
    primary: blogArticleUrl(
      BLOG_ARTICLE_SLUGS.workflowCanvas,
      { moduleId: 12, touchpoint: 'handout' },
      { medium: 'handout' }
    ),
    decide: addTrainingUtm(ECOSYSTEM_URLS.decide, 'm12_handout_decide'),
    map: addTrainingUtm(ECOSYSTEM_URLS.map, 'm12_handout_map'),
    hub: addTrainingUtm(ECOSYSTEM_URLS.hub, 'm12_handout_hub'),
  };
}

/**
 * Įkrauna šriftą ir generuoja Modulių 10–12 atmintinės PDF.
 */
export async function downloadM1012HandoutPdf(
  content: M1012HandoutContent,
  options: M1012HandoutOptions,
  filename?: string
): Promise<void> {
  const isEn = options.locale === 'en';
  const ctx = await createHandoutDoc('compact');
  const urls = { ...buildDefaultUrls(), ...options.urls };
  let y = addHeader(ctx, content.title, content.subtitle, options.locale);

  y = addListSection(
    ctx,
    isEn ? '1. Agent cycle' : '1. Agento ciklas',
    content.agentCycleSteps,
    y
  );
  y = addListSection(
    ctx,
    isEn ? '2. 3A model' : '2. 3A modelis',
    content.threeAModel,
    y
  );
  y = addListSection(
    ctx,
    isEn ? '3. Workflow steps' : '3. Darbo eigos žingsniai',
    content.workflowSteps,
    y
  );
  y = addListSection(
    ctx,
    isEn ? '4. Prompt patterns' : '4. Promptų šablonai',
    content.promptPatterns,
    y,
    { colorHex: HANDOUT_ACCENT_COLOR }
  );

  const yReflection = y;
  y = addSectionTitle(
    ctx,
    isEn
      ? '5. Reflection and 48-hour action'
      : '5. Refleksija ir 48 val. veiksmas',
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
    isEn ? 'Agent_engineering_path_handout' : 'Agentu_kelio_atmintine',
    options.locale
  );
  ctx.doc.save(filename ?? defaultName);
}
