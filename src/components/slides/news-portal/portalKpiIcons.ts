import type { LucideIcon } from 'lucide-react';
import type { IconChipRole } from '../../ui/IconChip';
import type { NewsPortalKpiCard } from '../../../types/modules';
import {
  resolvePortalKpiLucideIcon,
  resolvePortalToolLucideIcon,
} from '../../../icons/resolveIcon';
import type { PortalKpiIconKey, PortalToolIconKey } from '../../../icons/types';

export type { PortalKpiIconKey, PortalToolIconKey };

export function resolvePortalKpiIcon(
  card: Pick<NewsPortalKpiCard, 'iconKey' | 'icon'>
): LucideIcon {
  return resolvePortalKpiLucideIcon(card.iconKey);
}

export function resolvePortalToolIcon(iconKey?: string): LucideIcon {
  return resolvePortalToolLucideIcon(iconKey);
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
