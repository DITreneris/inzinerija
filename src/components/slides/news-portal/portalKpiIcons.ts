import {
  Bot,
  Building2,
  Globe,
  MapPin,
  MessageCircle,
  Search,
  Shield,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import type { IconChipRole } from '../../ui/IconChip';
import type { NewsPortalKpiCard } from '../../../types/modules';

export type PortalKpiIconKey =
  | 'globe'
  | 'trending-up'
  | 'building-2'
  | 'map-pin';

export type PortalToolIconKey = 'shield' | 'message-circle' | 'bot' | 'search';

const KPI_ICONS: Record<PortalKpiIconKey, LucideIcon> = {
  globe: Globe,
  'trending-up': TrendingUp,
  'building-2': Building2,
  'map-pin': MapPin,
};

const TOOL_ICONS: Record<PortalToolIconKey, LucideIcon> = {
  shield: Shield,
  'message-circle': MessageCircle,
  bot: Bot,
  search: Search,
};

export function resolvePortalKpiIcon(
  card: Pick<NewsPortalKpiCard, 'iconKey' | 'icon'>
): LucideIcon {
  if (card.iconKey && card.iconKey in KPI_ICONS) {
    return KPI_ICONS[card.iconKey as PortalKpiIconKey];
  }
  return Globe;
}

export function resolvePortalToolIcon(iconKey?: string): LucideIcon {
  if (iconKey && iconKey in TOOL_ICONS) {
    return TOOL_ICONS[iconKey as PortalToolIconKey];
  }
  return Bot;
}

export function portalKpiIconRole(colorKey?: string): IconChipRole {
  switch (colorKey) {
    case 'emerald':
      return 'success';
    case 'amber':
      return 'warn';
    case 'violet':
      return 'cta';
    case 'rose':
      return 'warn';
    case 'brand':
    default:
      return 'info';
  }
}
