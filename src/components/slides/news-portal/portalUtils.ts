import type {
  NewsPortalEditorialBeat,
  NewsPortalEditorialPlacement,
  NewsPortalInfographicContent,
  NewsPortalPromoRibbon,
  NewsPortalPromoRibbonPlacement,
} from '../../../types/modules';

export const NUM_COLORS: Record<string, string> = {
  brand: 'text-brand-600 dark:text-brand-400',
  violet: 'text-violet-600 dark:text-violet-400',
  emerald: 'text-emerald-600 dark:text-emerald-400',
  amber: 'text-amber-600 dark:text-amber-400',
  rose: 'text-rose-600 dark:text-rose-400',
  slate: 'text-slate-600 dark:text-slate-400',
};

export const BAR_COLORS: Record<string, string> = {
  brand: 'bg-brand-500 dark:bg-brand-400',
  violet: 'bg-violet-500 dark:bg-violet-400',
  emerald: 'bg-emerald-500 dark:bg-emerald-400',
  amber: 'bg-amber-500 dark:bg-amber-400',
  rose: 'bg-rose-500 dark:bg-rose-400',
  slate: 'bg-slate-300 dark:bg-slate-500',
};

const PORTAL_BASE_URL = import.meta.env.BASE_URL || '/';

export function portalImageSrc(src: string): string {
  if (src.startsWith('http') || src.startsWith('/')) return src;
  return `${PORTAL_BASE_URL}${src.replace(/^\//, '')}`;
}

export function parsePercent(s: string): number {
  const normalized = String(s)
    .replace(',', '.')
    .replace(/[^\d.]/g, '');
  const n = parseFloat(normalized);
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 0;
}

export function isNewsPortalImmersive(
  content: NewsPortalInfographicContent | undefined
): boolean {
  if (!content || content.variant !== 'news-portal') return false;
  return content.immersive !== false;
}

export function hasEditorialScrollLayout(
  content: NewsPortalInfographicContent
): boolean {
  return Boolean(
    (content.editorialBeats?.length ?? 0) > 0 ||
    (content.promoRibbons?.length ?? 0) > 0
  );
}

export function editorialBeatsAt(
  beats: NewsPortalEditorialBeat[] | undefined,
  placement: NewsPortalEditorialPlacement
): NewsPortalEditorialBeat[] {
  return (beats ?? []).filter((b) => b.placement === placement);
}

export function promoRibbonsAt(
  ribbons: NewsPortalPromoRibbon[] | undefined,
  placement: NewsPortalPromoRibbonPlacement
): NewsPortalPromoRibbon[] {
  return (ribbons ?? []).filter((r) => r.placement === placement);
}

const KNOWN_PORTAL_BEAT_IDS = new Set([
  'awareness-gap',
  'lithuania-context',
  'next-step-prompt',
]);

export function isKnownPortalBeatId(id: string): boolean {
  return KNOWN_PORTAL_BEAT_IDS.has(id);
}
