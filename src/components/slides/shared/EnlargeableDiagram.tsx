import { useState, useCallback, useEffect, useRef, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

interface EnlargeableDiagramProps {
  /** Funkcija, kuri grąžina diagramos React medį. Kvietimas du kartus: skaidrėje ir modale – tas pats turinys. */
  renderContent: () => ReactNode;
  /** Etiketė mygtukui ir modalo aria-label */
  enlargeLabel: string;
  /** Papildoma klasė wrapper'iui */
  className?: string;
}

/**
 * Diagrama (React komponentas), kurią paspaudus „Peržiūrėti visą dydį“ atidaromas modalas su tuo pačiu turiniu.
 * Naudojama Schema 3/4: vartotojas visur mato tą patį React komponentą, ne statinį SVG.
 * Uždaryti: Escape, backdrop paspaudimas arba uždarymo mygtukas.
 */
export default function EnlargeableDiagram({
  renderContent,
  enlargeLabel,
  className = '',
}: EnlargeableDiagramProps) {
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

  return (
    <>
      <div className={className}>
        {renderContent()}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 inline-flex items-center min-h-[44px] py-2 px-3 text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded touch-manipulation"
          aria-label={t('viewFullSizeAria', { label: enlargeLabel })}
        >
          {t('viewFullSize')}
        </button>
      </div>
      {open && (
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
      )}
    </>
  );
}
