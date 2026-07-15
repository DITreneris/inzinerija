import type { LucideIcon } from 'lucide-react';

import IconChip from '../../ui/IconChip';

import type { IconChipRole } from '../../ui/IconChip';

import { PORTAL_TEXT } from './portalSurfaces';

import { BAR_COLORS, NUM_COLORS, parsePercent } from './portalUtils';

type BarColorKey = keyof typeof BAR_COLORS;

type BarRowVariant = 'default' | 'ranking' | 'segment';

interface PortalHorizontalBarRowProps {
  label: string;

  pct: string;

  colorKey?: BarColorKey | string;

  icon?: LucideIcon;

  iconRole?: IconChipRole;

  variant?: BarRowVariant;

  rank?: number;

  emphasis?: boolean;
}

function resolveColors(
  variant: BarRowVariant,

  colorKey: BarColorKey | string,

  emphasis?: boolean
) {
  if (variant === 'ranking') {
    return {
      barColor: emphasis
        ? 'bg-brand-600 dark:bg-brand-400'
        : 'bg-brand-500 dark:bg-brand-400/80',

      numColor: emphasis
        ? NUM_COLORS.brand
        : 'text-brand-700 dark:text-brand-300',

      barHeight: 'h-2.5',
    };
  }

  if (variant === 'segment') {
    return {
      barColor: 'bg-violet-500 dark:bg-violet-400',

      numColor: 'text-violet-700 dark:text-violet-300',

      barHeight: 'h-2.5',
    };
  }

  const key = colorKey in BAR_COLORS ? colorKey : 'brand';

  return {
    barColor: BAR_COLORS[key as BarColorKey] ?? BAR_COLORS.brand,

    numColor: NUM_COLORS[key as BarColorKey] ?? NUM_COLORS.brand,

    barHeight: 'h-2',
  };
}

export default function PortalHorizontalBarRow({
  label,

  pct,

  colorKey = 'brand',

  icon,

  iconRole = 'info',

  variant = 'default',

  rank,

  emphasis = false,
}: PortalHorizontalBarRowProps) {
  const { barColor, numColor, barHeight } = resolveColors(
    variant,
    colorKey,
    emphasis
  );

  return (
    <div className={`flex items-center gap-3 ${emphasis ? 'py-0.5' : ''}`}>
      {variant === 'ranking' && rank != null && (
        <span
          className={`w-6 shrink-0 text-center ${PORTAL_TEXT.mutedXs} font-extrabold tabular-nums ${
            emphasis ? 'text-brand-700 dark:text-brand-300' : ''
          }`}
          aria-hidden
        >
          #{rank}
        </span>
      )}

      {icon && variant !== 'segment' && (
        <IconChip icon={icon} role={iconRole} size="sm" />
      )}

      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2 mb-1">
          <span
            className={`truncate min-w-0 ${PORTAL_TEXT.bodySm} text-gray-600 dark:text-gray-300 ${
              emphasis ? 'font-semibold text-gray-900 dark:text-gray-100' : ''
            }`}
          >
            {label}
          </span>

          <span className={`font-bold shrink-0 tabular-nums ${numColor}`}>
            {pct}
          </span>
        </div>

        <div
          className={`${barHeight} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}
        >
          <div
            className={`h-full rounded-full ${barColor}`}
            style={{ width: `${parsePercent(pct)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
