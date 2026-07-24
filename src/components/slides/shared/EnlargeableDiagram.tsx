import {
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import { X, Maximize2 } from 'lucide-react';
import { useIsMobile } from '../../../utils/useIsMobile';
import MobileDiagramScroller from './MobileDiagramScroller';

interface EnlargeableDiagramProps {
  renderContent: () => ReactNode;
  enlargeLabel: string;
  className?: string;
  /** Minimum width for the scrollable mobile container (default 600px) */
  mobileMinWidth?: number;
  mobileBehavior?: 'scroll' | 'reflow';
  /** Desktop “View full size” control; default true. Set false when enlarge adds no value. */
  showEnlargeControl?: boolean;
  /**
   * Desktop control position. Default `below` (legacy).
   * `top-right` overlays a compact icon button near the diagram.
   */
  controlPlacement?: 'below' | 'top-right';
}

/**
 * Mobile (<lg): diagram rendered at readable size in a horizontally scrollable container.
 * Desktop (lg+): diagram inline with optional "View full size" modal button.
 */
export default function EnlargeableDiagram({
  renderContent,
  enlargeLabel,
  className = '',
  mobileMinWidth = 600,
  mobileBehavior = 'scroll',
  showEnlargeControl = true,
  controlPlacement = 'below',
}: EnlargeableDiagramProps) {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  const enlargeButton =
    showEnlargeControl && controlPlacement === 'top-right' ? (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute top-0 right-0 z-10 inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white/95 px-2.5 py-1.5 text-sm font-medium text-brand-700 shadow-sm hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-slate-600 dark:bg-slate-900/95 dark:text-brand-300 dark:hover:bg-slate-800 touch-manipulation"
        aria-label={t('viewFullSizeAria', { label: enlargeLabel })}
      >
        <Maximize2 className="h-4 w-4 shrink-0" aria-hidden />
        <span className="sr-only sm:not-sr-only sm:inline">
          {t('viewFullSize')}
        </span>
      </button>
    ) : null;

  const enlargeButtonBelow =
    showEnlargeControl && controlPlacement === 'below' ? (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 inline-flex items-center min-h-[44px] py-2 px-3 text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded touch-manipulation"
        aria-label={t('viewFullSizeAria', { label: enlargeLabel })}
      >
        {t('viewFullSize')}
      </button>
    ) : null;

  const modal =
    showEnlargeControl && open ? (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.3)' }}
        role="dialog"
        aria-modal="true"
        aria-label={t('diagramFullSizeAria', { label: enlargeLabel })}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="relative w-full max-w-[1280px] max-h-[90vh] flex items-center justify-center overflow-auto">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            className="absolute top-2 right-2 z-10 p-2 rounded-full text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={t('close')}
          >
            <X className="w-6 h-6" aria-hidden />
          </button>
          <div
            className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl p-4 max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {renderContent()}
          </div>
        </div>
      </div>
    ) : null;

  if (isMobile) {
    if (mobileBehavior === 'reflow') {
      return (
        <div className={className} data-slide-swipe-lock>
          <div role="img" aria-label={enlargeLabel}>
            {renderContent()}
          </div>
        </div>
      );
    }

    return (
      <MobileDiagramScroller
        className={className}
        minWidth={mobileMinWidth}
        behavior={mobileBehavior}
        showEdgeFade
        hint={
          <div className="flex items-center gap-2 mt-1">
            <Maximize2 className="w-3.5 h-3.5 text-gray-400" aria-hidden />
            <span className="text-xs text-gray-400">
              {t('swipeToExplore', { defaultValue: 'Slinkite horizontaliai' })}
            </span>
          </div>
        }
      >
        <div role="img" aria-label={enlargeLabel}>
          {renderContent()}
        </div>
      </MobileDiagramScroller>
    );
  }

  return (
    <>
      <div
        className={`${className} ${controlPlacement === 'top-right' ? 'relative' : ''}`.trim()}
      >
        {enlargeButton}
        {renderContent()}
        {enlargeButtonBelow}
      </div>
      {modal}
    </>
  );
}
