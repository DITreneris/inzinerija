import type { LucideIcon } from 'lucide-react';
import {
  DEFAULT_FALLBACK_ICON,
  LUCIDE_REGISTRY,
  PORTAL_KPI_REGISTRY,
  PORTAL_TOOL_REGISTRY,
} from './registry';
import type { IconContext } from './types';
import {
  ASPECT_ICONS,
  INTRO_PIE_ICONS,
  INFOGRAPHIC_ICONS,
  JOURNEY_ICONS,
  MODULE_ICONS,
  PORTAL_KPI_ICON_KEYS,
  PORTAL_TOOL_ICON_KEYS,
  SCENARIO_HUB_ICONS,
  SUMMARY_ICONS,
} from './types';

const CONTEXT_ALLOWLISTS: Record<
  Exclude<IconContext, 'portalKpi' | 'portalTool'>,
  readonly string[]
> = {
  module: MODULE_ICONS,
  journey: JOURNEY_ICONS,
  introPie: INTRO_PIE_ICONS,
  summary: SUMMARY_ICONS,
  aspect: ASPECT_ICONS,
  scenarioHub: SCENARIO_HUB_ICONS,
  infographic: INFOGRAPHIC_ICONS,
};

function isEmojiOrLegacy(key: string): boolean {
  if (/^[\p{Extended_Pictographic}]/u.test(key)) return true;
  if (key.includes('-') && key === key.toLowerCase()) return false;
  return !/^[A-Z]/.test(key);
}

function warnUnknown(context: IconContext, key: string): void {
  if (import.meta.env.DEV) {
    console.warn(`[resolveIcon] Unknown ${context} icon key "${key}"`);
  }
}

export interface ResolveIconOptions {
  /** When true, return HelpCircle instead of undefined for unknown Lucide keys */
  fallback?: boolean;
}

export function resolveLucideIcon(
  key: string | undefined,
  context: Exclude<IconContext, 'portalKpi' | 'portalTool'>,
  options: ResolveIconOptions = { fallback: true }
): LucideIcon | undefined {
  if (!key) return options.fallback ? DEFAULT_FALLBACK_ICON : undefined;
  if (isEmojiOrLegacy(key)) return undefined;

  const allowlist = CONTEXT_ALLOWLISTS[context];
  const inRegistry = key in LUCIDE_REGISTRY;
  const inAllowlist = (allowlist as readonly string[]).includes(key);
  if (inRegistry && inAllowlist) return LUCIDE_REGISTRY[key];

  if (inRegistry && !inAllowlist) {
    warnUnknown(context, key);
    return options.fallback ? DEFAULT_FALLBACK_ICON : undefined;
  }

  warnUnknown(context, key);
  return options.fallback ? DEFAULT_FALLBACK_ICON : undefined;
}

export function resolvePortalKpiLucideIcon(
  iconKey: string | undefined
): LucideIcon {
  if (iconKey && iconKey in PORTAL_KPI_REGISTRY) {
    return PORTAL_KPI_REGISTRY[iconKey];
  }
  if (iconKey && !PORTAL_KPI_ICON_KEYS.includes(iconKey as never)) {
    warnUnknown('portalKpi', iconKey);
  }
  return PORTAL_KPI_REGISTRY.globe;
}

export function resolvePortalToolLucideIcon(
  iconKey: string | undefined
): LucideIcon {
  if (iconKey && iconKey in PORTAL_TOOL_REGISTRY) {
    return PORTAL_TOOL_REGISTRY[iconKey];
  }
  if (iconKey && !PORTAL_TOOL_ICON_KEYS.includes(iconKey as never)) {
    warnUnknown('portalTool', iconKey);
  }
  return PORTAL_TOOL_REGISTRY.bot;
}

export function resolveIcon(
  key: string | undefined,
  context: IconContext,
  options?: ResolveIconOptions
): LucideIcon | undefined {
  if (context === 'portalKpi') {
    return resolvePortalKpiLucideIcon(key);
  }
  if (context === 'portalTool') {
    return resolvePortalToolLucideIcon(key);
  }
  return resolveLucideIcon(key, context, options);
}
