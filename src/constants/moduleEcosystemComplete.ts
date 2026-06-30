import type { EcosystemDomainKey } from './ecosystemUrls';

export interface ModuleEcosystemLinkSpec {
  /** i18n key under module: namespace (without prefix) */
  labelKey: string;
  ariaKey: string;
  hrefKey:
    | 'enter'
    | 'anatomizer'
    | 'use'
    | 'hire'
    | 'decide'
    | 'play'
    | 'map'
    | 'manage'
    | 'deepenBlog';
  /** For deepenBlog – slug from BLOG_ARTICLE_SLUGS */
  blogSlug?: string;
  touchpoint: string;
  ctaId: `spinoff_${EcosystemDomainKey}` | 'spinoff_deepen';
}

/** Secondary ecosystem links on ModuleCompleteScreen (by module id). */
export const MODULE_ECOSYSTEM_COMPLETE: Partial<
  Record<number, ModuleEcosystemLinkSpec[]>
> = {
  1: [
    {
      labelKey: 'ecosystemEnterLabel',
      ariaKey: 'ecosystemEnterAria',
      hrefKey: 'enter',
      touchpoint: 'complete',
      ctaId: 'spinoff_enter',
    },
    {
      labelKey: 'ecosystemAnatomizerLabel',
      ariaKey: 'ecosystemAnatomizerAria',
      hrefKey: 'anatomizer',
      touchpoint: 'complete',
      ctaId: 'spinoff_anatomizer',
    },
  ],
  3: [
    {
      labelKey: 'ecosystemUseLabel',
      ariaKey: 'ecosystemUseAria',
      hrefKey: 'use',
      touchpoint: 'complete',
      ctaId: 'spinoff_use',
    },
    {
      labelKey: 'ecosystemHireLabel',
      ariaKey: 'ecosystemHireAria',
      hrefKey: 'hire',
      touchpoint: 'complete',
      ctaId: 'spinoff_hire',
    },
  ],
  6: [
    {
      labelKey: 'ecosystemDecideLabel',
      ariaKey: 'ecosystemDecideAria',
      hrefKey: 'decide',
      touchpoint: 'complete',
      ctaId: 'spinoff_decide',
    },
    {
      labelKey: 'ecosystemPlayLabel',
      ariaKey: 'ecosystemPlayAria',
      hrefKey: 'play',
      touchpoint: 'complete',
      ctaId: 'spinoff_play',
    },
    {
      labelKey: 'ecosystemMapLabel',
      ariaKey: 'ecosystemMapAria',
      hrefKey: 'map',
      touchpoint: 'complete',
      ctaId: 'spinoff_map',
    },
  ],
  9: [
    {
      labelKey: 'ecosystemDeepenM9Label',
      ariaKey: 'ecosystemDeepenM9Aria',
      hrefKey: 'deepenBlog',
      blogSlug: 'ai-workflow-canvas-template',
      touchpoint: 'complete',
      ctaId: 'spinoff_deepen',
    },
    {
      labelKey: 'ecosystemDecideLabel',
      ariaKey: 'ecosystemDecideAria',
      hrefKey: 'decide',
      touchpoint: 'complete',
      ctaId: 'spinoff_decide',
    },
    {
      labelKey: 'ecosystemMapLabel',
      ariaKey: 'ecosystemMapAria',
      hrefKey: 'map',
      touchpoint: 'complete',
      ctaId: 'spinoff_map',
    },
  ],
  10: [
    {
      labelKey: 'ecosystemDeepenM10Label',
      ariaKey: 'ecosystemDeepenM10Aria',
      hrefKey: 'deepenBlog',
      blogSlug: 'agent-orchestrator-operating-model',
      touchpoint: 'complete',
      ctaId: 'spinoff_deepen',
    },
    {
      labelKey: 'ecosystemMapLabel',
      ariaKey: 'ecosystemMapAria',
      hrefKey: 'map',
      touchpoint: 'complete',
      ctaId: 'spinoff_map',
    },
  ],
  12: [
    {
      labelKey: 'ecosystemDeepenM12Label',
      ariaKey: 'ecosystemDeepenM12Aria',
      hrefKey: 'deepenBlog',
      blogSlug: 'audit-trails-for-ai-workflows',
      touchpoint: 'complete',
      ctaId: 'spinoff_deepen',
    },
    {
      labelKey: 'ecosystemManageLabel',
      ariaKey: 'ecosystemManageAria',
      hrefKey: 'manage',
      touchpoint: 'complete',
      ctaId: 'spinoff_manage',
    },
    {
      labelKey: 'ecosystemMapLabel',
      ariaKey: 'ecosystemMapAria',
      hrefKey: 'map',
      touchpoint: 'complete',
      ctaId: 'spinoff_map',
    },
  ],
};

export const MODULE_ECOSYSTEM_INTRO_KEYS: Partial<Record<number, string>> = {
  1: 'ecosystemIntroM1',
  3: 'ecosystemIntroM3',
  6: 'ecosystemIntroM6',
  9: 'ecosystemIntroM9',
  10: 'ecosystemIntroM10',
  12: 'ecosystemIntroM12',
};
