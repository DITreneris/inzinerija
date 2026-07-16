/**
 * Icon key unions per slide/context – SOT for audit-slide-icons.mjs (via iconAllowlists.json).
 * @see docs/development/DESIGN_SYSTEM.md § Icons
 */

export const MODULE_ICONS = [
  'BookOpen',
  'ClipboardList',
  'Briefcase',
  'Brain',
  'ClipboardCheck',
  'Rocket',
  'BarChart3',
  'Cpu',
  'Image',
] as const;

export type ModuleIcon = (typeof MODULE_ICONS)[number];

export const JOURNEY_ICONS = [
  'TrendingUp',
  'Image',
  'Cpu',
  'Users',
  'Briefcase',
  'Compass',
  'Sparkles',
  'Database',
] as const;

export type JourneyIcon = (typeof JOURNEY_ICONS)[number];

export const INTRO_PIE_ICONS = [
  'Pen',
  'Wrench',
  'Search',
  'Code',
  'Image',
  'HelpCircle',
  'Brain',
  'Target',
  'Database',
  'BarChart3',
  'Workflow',
] as const;

export type IntroPieIcon = (typeof INTRO_PIE_ICONS)[number];

export const SUMMARY_ICONS = [
  'Layers',
  'Workflow',
  'Repeat',
  'Lightbulb',
  'ArrowRight',
  'Target',
  'Sparkles',
  'Zap',
  'Compass',
  'Image',
  'Video',
  'Music',
  'Briefcase',
  'Users',
] as const;

export type SummaryIcon = (typeof SUMMARY_ICONS)[number];

export const ASPECT_ICONS = [
  'MessageCircle',
  'Languages',
  'Lightbulb',
  'Target',
  'Layers',
  'Repeat',
] as const;

export type AspectIcon = (typeof ASPECT_ICONS)[number];

export const PORTAL_KPI_ICON_KEYS = [
  'globe',
  'trending-up',
  'building-2',
  'map-pin',
] as const;

export type PortalKpiIconKey = (typeof PORTAL_KPI_ICON_KEYS)[number];

export const PORTAL_TOOL_ICON_KEYS = [
  'shield',
  'message-circle',
  'bot',
  'search',
] as const;

export type PortalToolIconKey = (typeof PORTAL_TOOL_ICON_KEYS)[number];

export const SCENARIO_HUB_ICONS = [
  'User',
  'Users',
  'Briefcase',
  'Bot',
  'BarChart3',
  'Image',
] as const;

export type ScenarioHubIcon = (typeof SCENARIO_HUB_ICONS)[number];

/** Infographic / di-paradox / productivity card icons (Lucide migration from emoji) */
export const INFOGRAPHIC_ICONS = [
  'Pen',
  'Code',
  'Headphones',
  'Search',
  'Megaphone',
  'Wrench',
  'Zap',
  'Users',
  'Target',
  'BarChart3',
  'Database',
  'Link',
  'ClipboardList',
  'Bot',
  'Key',
] as const;

export type InfographicIcon = (typeof INFOGRAPHIC_ICONS)[number];

export type IconContext =
  | 'module'
  | 'journey'
  | 'introPie'
  | 'summary'
  | 'aspect'
  | 'portalKpi'
  | 'portalTool'
  | 'scenarioHub'
  | 'infographic';

export type LucideIconKey =
  | ModuleIcon
  | JourneyIcon
  | IntroPieIcon
  | SummaryIcon
  | AspectIcon
  | ScenarioHubIcon
  | InfographicIcon;
