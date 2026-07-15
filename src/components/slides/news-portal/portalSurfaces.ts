export type PortalSurfaceVariant =
  | 'brand'
  | 'accent'
  | 'violet'
  | 'emerald'
  | 'terms';

const EDITORIAL_BASE = 'border-l-4 pl-4 py-3 animate-fade-in';

const EDITORIAL_TINT: Record<PortalSurfaceVariant, string> = {
  brand:
    'border-brand-500 dark:border-brand-400 bg-brand-50/30 dark:bg-brand-900/10',

  accent:
    'border-accent-500 dark:border-accent-400 bg-accent-50/40 dark:bg-accent-900/10',

  violet:
    'border-violet-500 dark:border-violet-400 bg-violet-50/30 dark:bg-violet-900/10',

  emerald:
    'border-emerald-500 dark:border-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10',

  terms:
    'border-slate-400 dark:border-slate-500 bg-slate-50/40 dark:bg-slate-800/40',
};

export function getPortalEditorialSurfaceClasses(
  variant: PortalSurfaceVariant
): string {
  return `${EDITORIAL_BASE} ${EDITORIAL_TINT[variant]}`.trim();
}

/** Interaktyvus CTA ant editorial accent surface */

export function getPortalInteractiveCtaClasses(): string {
  return [
    'group w-full text-left min-h-[44px] cursor-pointer transition-colors',

    'hover:bg-accent-100/60 dark:hover:bg-accent-900/25',

    'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',

    'focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
  ].join(' ');
}

/** Rubric / kicker labels – vienas šaltinis visam portalui */

export type PortalKickerVariant = 'hero' | 'neutral' | 'chapter' | 'rail';

/** Skyriaus etiketės – vienas dydis (xs), du display režimai (Typography Wave T1) */

export type PortalSectionLabelVariant = 'break' | 'nav';

const SECTION_LABEL: Record<PortalSectionLabelVariant, string> = {
  break:
    'text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300',
  nav: 'text-xs font-semibold tracking-wide text-gray-600 dark:text-gray-300',
};

export function getPortalSectionLabelClasses(
  variant: PortalSectionLabelVariant
): string {
  return SECTION_LABEL[variant];
}

const KICKER: Record<PortalKickerVariant, string> = {
  hero: 'text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400',

  neutral:
    'text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300',

  /** @deprecated Naudoti getPortalSectionLabelClasses('break') */
  chapter: SECTION_LABEL.break,

  /** @deprecated Naudoti getPortalSectionLabelClasses('break') */
  rail: SECTION_LABEL.break,
};

export function getPortalKickerClasses(variant: PortalKickerVariant): string {
  return KICKER[variant];
}

/** Segmentų rubric (violet hero KPI) – vienintelė leidžiama spalvos override */

export function getPortalVioletKickerClasses(): string {
  return `${getPortalKickerClasses('rail')} text-violet-600 dark:text-violet-400`;
}

/** Antraštės – vienas šaltinis */

export const PORTAL_HEADING = {
  hero: 'text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight',

  heroCompact:
    'text-lg lg:text-xl font-bold text-gray-900 dark:text-white leading-tight',

  beat: 'text-lg lg:text-xl font-bold text-gray-900 dark:text-white leading-snug',

  pullQuote:
    'text-lg lg:text-xl font-semibold text-gray-900 dark:text-white leading-snug',

  cta: 'text-base lg:text-lg font-bold text-gray-900 dark:text-white leading-snug',

  mastheadBrand:
    'text-lg lg:text-xl font-bold text-gray-900 dark:text-white tracking-tight truncate',

  mastheadFallbackBrand:
    'text-xl lg:text-2xl font-bold text-accent-700 dark:text-accent-300 tracking-tight',
} as const;

/** Pilka tipografija – max 2 tonai hero lead'e */

export const PORTAL_TEXT = {
  body: 'text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed',

  bodySm: 'text-sm text-gray-700 dark:text-gray-300 leading-snug',

  muted: 'text-sm text-gray-500 dark:text-gray-300',

  mutedXs: 'text-xs text-gray-500 dark:text-gray-300',

  cardTitle:
    'text-base font-semibold text-gray-900 dark:text-white leading-snug',

  cardFooter:
    'text-sm font-semibold text-gray-700 dark:text-gray-300 leading-snug',

  takeawayBold: 'text-base font-bold text-gray-900 dark:text-white',

  takeawayCta:
    'mt-3 pt-2 border-t border-accent-200/70 dark:border-accent-700/50 text-base font-medium text-accent-800 dark:text-accent-300',

  ctaSubline:
    'mt-2 block text-sm font-semibold text-accent-700 dark:text-accent-300 underline-offset-2 group-hover:underline',

  ctaSublineStatic:
    'mt-2 text-sm font-semibold text-accent-700 dark:text-accent-300',

  teaserTitle:
    'text-sm font-semibold text-gray-900 dark:text-white leading-snug',

  navDecor: 'text-sm text-gray-500 dark:text-gray-400',
} as const;

/** Insight sąrašo numeriai */

export const PORTAL_BULLET = {
  num: 'w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 flex items-center justify-center text-xs font-bold shrink-0',
} as const;

/** Beat diagramų šaltinio footer */

export const PORTAL_SOURCE_FOOTER =
  'mt-3 pt-2 border-t border-gray-100 dark:border-gray-700/60 text-xs leading-snug text-gray-600 dark:text-gray-300';

export type PortalMetricSize = 'chapter' | 'inline';

const METRIC_SIZE: Record<PortalMetricSize, string> = {
  chapter: 'text-3xl font-extrabold tabular-nums',

  inline: 'text-2xl lg:text-2xl font-extrabold tabular-nums',
};

export function getPortalMetricClasses(size: PortalMetricSize): string {
  return METRIC_SIZE[size];
}

export const PORTAL_SPACING = {
  chapter: 'mt-8 pt-6 border-t border-gray-200/80 dark:border-gray-700/60',

  block: 'space-y-6',

  act: 'space-y-4',

  inline: 'space-y-4',

  heroLead: 'space-y-3 lg:space-y-4',

  heroStack: 'space-y-5',

  gapGrid: 'gap-3',

  gapCards: 'gap-4',
} as const;

/** Slide footer (portalo šaltiniai) */

export const PORTAL_FOOTER = {
  wrapper:
    'pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-between items-center gap-3',

  brand: 'text-sm lg:text-base font-bold text-gray-900 dark:text-white',

  sub: 'text-xs text-gray-500 dark:text-gray-300 mt-0.5',

  sourcesBtn:
    'min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-lg',

  sourcesList: 'mt-2 text-xs text-gray-500 dark:text-gray-300 space-y-1',

  sourcesFallback: 'text-xs text-gray-500 dark:text-gray-400 text-right',
} as const;

/** Depth act cards – vienodi kampai ir padding */

export const PORTAL_CARD = {
  radius: 'lg' as const,
} as const;

/** Depth act card shell – ranking + youth KPI; violet tik metric/segment/kicker sluoksnyje */

export const PORTAL_DEPTH_CARD_VARIANT = 'brand' as const;
