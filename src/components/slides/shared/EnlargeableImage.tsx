import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

interface EnlargeableImageProps {
  src: string;
  alt: string;
  /** Optional label for aria (e.g. diagram title); falls back to alt */
  enlargeLabel?: string;
  className?: string;
}

/**
 * Vaizdas, kurį paspaudus atidaromas lightbox (didinti peržiūrai).
 * Uždaryti: Escape, backdrop paspaudimas arba uždarymo mygtukas.
 */
export default function EnlargeableImage({
  src,
  alt,
  enlargeLabel,
  className = '',
}: EnlargeableImageProps) {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  const label = enlargeLabel || alt;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`block w-full text-left rounded-lg overflow-hidden border transition hover:ring-2 hover:ring-brand-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${className}`}
        aria-label={label ? t('viewFullSizeAria', { label }) : t('viewFullSize')}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain max-h-64 pointer-events-none"
        />
        <span className="mt-1.5 block text-sm font-medium text-brand-600 dark:text-brand-400">
          {t('viewFullSize')}
        </span>
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          role="dialog"
          aria-modal="true"
          aria-label={label ? t('imageFullSizeAria', { label }) : t('imageFullSize')}
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              className="absolute top-2 right-2 z-10 p-2 rounded-full text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={t('close')}
            >
              <X className="w-6 h-6" aria-hidden />
            </button>
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
