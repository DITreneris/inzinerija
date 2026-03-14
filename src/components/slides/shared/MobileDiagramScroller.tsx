import type { ReactNode } from 'react';
import { useCompactViewport } from '../../../utils/useCompactViewport';

interface MobileDiagramScrollerProps {
  children: ReactNode;
  minWidth: number;
  compactMinWidth?: number;
  behavior?: 'scroll' | 'reflow';
  className?: string;
  viewportClassName?: string;
  innerClassName?: string;
  showEdgeFade?: boolean;
  hint?: ReactNode;
}

/**
 * Shared mobile diagram scroller that also marks the area as swipe-locked for slide navigation.
 */
export default function MobileDiagramScroller({
  children,
  minWidth,
  compactMinWidth,
  behavior = 'scroll',
  className = '',
  viewportClassName = 'overflow-x-auto overflow-y-hidden -mx-2 px-2 pb-2 touch-pan-x overscroll-x-contain',
  innerClassName = '',
  showEdgeFade = false,
  hint,
}: MobileDiagramScrollerProps) {
  const { isCompactDiagram } = useCompactViewport();
  const resolvedMinWidth = isCompactDiagram
    ? (compactMinWidth ?? Math.max(360, Math.round(minWidth * 0.82)))
    : minWidth;

  if (behavior === 'reflow') {
    return (
      <div className={className} data-slide-swipe-lock>
        <div className={innerClassName}>{children}</div>
      </div>
    );
  }

  return (
    <div className={className} data-slide-swipe-lock>
      <div className="relative">
        <div className={viewportClassName}>
          <div
            className={innerClassName}
            style={{ minWidth: resolvedMinWidth }}
          >
            {children}
          </div>
        </div>
        {showEdgeFade && (
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent"
            aria-hidden
          />
        )}
      </div>
      {hint}
    </div>
  );
}
