import type { ReactNode } from 'react';
import { Maximize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TableHorizontalScrollProps {
  children: ReactNode;
  ariaLabel: string;
  /** Border / bg classes for the scroll viewport (exclude overflow-x-auto). */
  viewportClassName?: string;
  /** Edge fade + swipe hint — use for comparison / solution-matrix tables. */
  showChrome?: boolean;
  className?: string;
}

/**
 * Horizontal scroll region for wide content-block tables.
 * Optional mobile chrome: right edge fade + swipe hint (GOLDEN table scroll).
 */
export default function TableHorizontalScroll({
  children,
  ariaLabel,
  viewportClassName = '',
  showChrome = false,
  className = '',
}: TableHorizontalScrollProps) {
  const { t } = useTranslation('common');

  return (
    <div className={`my-3 ${className}`.trim()}>
      <div className="relative">
        <div
          className={`overflow-x-auto ${viewportClassName}`.trim()}
          role="region"
          aria-label={ariaLabel}
        >
          {children}
        </div>
        {showChrome ? (
          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-8 rounded-r-lg bg-gradient-to-l from-white to-transparent max-sm:block dark:from-gray-900"
            aria-hidden
          />
        ) : null}
      </div>
      {showChrome ? (
        <div className="mt-1 flex items-center gap-2 sm:hidden">
          <Maximize2 className="h-3.5 w-3.5 text-gray-400" aria-hidden />
          <span className="text-xs text-gray-400">{t('swipeToExplore')}</span>
        </div>
      ) : null}
    </div>
  );
}
