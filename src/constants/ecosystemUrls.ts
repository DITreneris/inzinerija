/**
 * Prompt Anatomy ecosystem URLs — code SOT (brand narrative: DITreneris/site primal_concept.txt).
 * Training app touchpoints M1–12; blog curriculum: docs/development/BLOG_CURRICULUM_LINKS.yaml
 */

export type EcosystemDomainKey =
  | 'hub'
  | 'enter'
  | 'use'
  | 'create'
  | 'hire'
  | 'manage'
  | 'decide'
  | 'deepen'
  | 'play'
  | 'map'
  | 'anatomizer';

export const ECOSYSTEM_URLS = {
  hub: 'https://www.promptanatomy.app/',
  hubPricing: 'https://www.promptanatomy.app/#pricing',
  enter: 'https://www.promptanatomy.cloud/',
  useLt: 'https://www.promptanatomy.info/lt/',
  useEn: 'https://www.promptanatomy.info/en/',
  createLt: 'https://www.promptanatomy.space/lt/',
  createEn: 'https://www.promptanatomy.space/en/',
  hire: 'https://www.promptanatomy.help/',
  manage: 'https://www.promptanatomy.ceo/',
  decide: 'https://www.promptanatomy.pro/',
  deepen: 'https://www.promptanatomy.blog/',
  play: 'https://www.promptanatomy.lol/',
  map: 'https://promptanatomy.site/#ecosystem',
  anatomizer: 'https://promptanatomy.site/#anatomizer',
  telegram: 'https://t.me/prompt_anatomy',
} as const;

const BLOG_ARTICLE_BASE = 'https://www.promptanatomy.blog/articles';

/** Blog article slugs used by training touchpoints (see BLOG_CURRICULUM_LINKS.yaml). */
export const BLOG_ARTICLE_SLUGS = {
  groundingAiOutputs: 'grounding-ai-outputs',
  ragInProduction: 'rag-in-production',
  agentWorkflowDesign: 'how-to-design-an-ai-agent-workflow',
  workflowAutomation: 'choosing-workflow-automation-ai-pipelines',
  agentEvalClear: 'evaluating-agents-with-clear',
  workflowCanvas: 'ai-workflow-canvas-template',
  agentOrchestratorModel: 'agent-orchestrator-operating-model',
  auditTrails: 'audit-trails-for-ai-workflows',
  ecosystemMap: 'prompt-anatomy-ecosystem-map',
} as const;

export type BlogArticleCampaign = {
  moduleId: number;
  touchpoint: string;
};

export type EcosystemUrlKey = keyof typeof ECOSYSTEM_URLS;

export type EcosystemUrlCampaign = {
  moduleId: number;
  touchpoint: string;
};

export type EcosystemUrlOptions = {
  medium?: 'spinoff' | 'handout';
};

/** Ecosystem URL with training UTM; hash targets stay intact (query is inserted before #hash). */
export function buildEcosystemUrl(
  key: EcosystemUrlKey,
  campaign: EcosystemUrlCampaign,
  options?: EcosystemUrlOptions
): string {
  const parsed = new URL(ECOSYSTEM_URLS[key]);
  parsed.searchParams.set('utm_source', 'training');
  parsed.searchParams.set('utm_medium', options?.medium ?? 'spinoff');
  parsed.searchParams.set(
    'utm_campaign',
    `m${campaign.moduleId}_${campaign.touchpoint}`
  );
  return parsed.toString();
}

/** Deep link to a blog article with UTM for training spin-offs. */
export function blogArticleUrl(
  slug: string,
  campaign: BlogArticleCampaign,
  options?: { medium?: 'spinoff' | 'handout' }
): string {
  const params = new URLSearchParams({
    utm_source: 'training',
    utm_medium: options?.medium ?? 'spinoff',
    utm_campaign: `m${campaign.moduleId}_${campaign.touchpoint}`,
  });
  return `${BLOG_ARTICLE_BASE}/${slug}/?${params.toString()}`;
}

/** Resolve Use/Create URL for locale. */
export function ecosystemLocaleUrl(
  key: 'use' | 'create',
  locale: string
): string {
  const isEn = locale === 'en';
  if (key === 'use') return isEn ? ECOSYSTEM_URLS.useEn : ECOSYSTEM_URLS.useLt;
  return isEn ? ECOSYSTEM_URLS.createEn : ECOSYSTEM_URLS.createLt;
}

/** Map outbound URL → analytics cta_id suffix (spinoff_*). */
export function getSpinoffCtaIdFromUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');
    const hash = parsed.hash;
    const map: Record<string, EcosystemDomainKey> = {
      'promptanatomy.cloud': 'enter',
      'promptanatomy.info': 'use',
      'promptanatomy.space': 'create',
      'promptanatomy.help': 'hire',
      'promptanatomy.ceo': 'manage',
      'promptanatomy.pro': 'decide',
      'promptanatomy.blog': 'deepen',
      'promptanatomy.lol': 'play',
      'promptanatomy.site': hash.includes('anatomizer') ? 'anatomizer' : 'map',
      'ditreneris.github.io': 'create',
    };
    const key = map[host] ?? 'unknown';
    return `spinoff_${key}`;
  } catch {
    return 'spinoff_unknown';
  }
}
