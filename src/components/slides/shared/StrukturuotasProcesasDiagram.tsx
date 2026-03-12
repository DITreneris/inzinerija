/**
 * ProcessSteps – 3 žingsnių schema (Įvestis → Apdorojimas → Rezultatas).
 * Skaidrė 43 „Darbas su DI: struktūruotas procesas“.
 *
 * Gairės: procesas > dekoracija, hierarchija > efektai, subtili kryptis.
 * Jungtis: plona linija (2px) + maža rodyklės galvutė, be trikampių.
 * Interaktyvus režimas: currentStep + onStepClick – clickable kortelės, a11y.
 */
import { Fragment, useId } from 'react';

const STEPS: { title: string; items: string[] }[] = [
  { title: 'Įvestis', items: ['Tekstinės užklausos', 'Pradiniai duomenys', 'Kontekstas'] },
  { title: 'Apdorojimas', items: ['Analizė ir sintezė', 'Struktūros kūrimas', 'Optimizavimas'] },
  { title: 'Rezultatas', items: ['Vizualizacija', 'Prezentacija', 'Galutinis produktas'] },
];

/** Jungtis – linija nuo bloko krašto iki kito bloko krašto; antgalio smailė liečia viewBox dešinį kraštą (SCHEME_AGENT §3.2). */
const VIEWBOX_W = 48;
const ARROW_REFX = 5; // marker tip offset; line ends at VIEWBOX_W, marker (refX at end) puts tip at VIEWBOX_W

function Connector() {
  const uid = useId().replace(/:/g, '');
  return (
    <div className="hidden lg:flex flex-shrink-0 w-12 items-center -translate-y-1" aria-hidden>
      <svg width="100%" height="12" viewBox={`0 0 ${VIEWBOX_W} 12`} className="text-gray-400 dark:text-gray-500 shrink-0" fill="none">
        <defs>
          <marker
            id={`arrow-${uid}`}
            markerWidth="6"
            markerHeight="4"
            refX={ARROW_REFX}
            refY="2"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M0 0 L5 2 L0 4 Z" fill="currentColor" />
          </marker>
        </defs>
        <line
          x1="0"
          y1="6"
          x2={VIEWBOX_W}
          y2="6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          markerEnd={`url(#arrow-${uid})`}
        />
      </svg>
    </div>
  );
}

export interface StrukturuotasProcesasDiagramProps {
  className?: string;
  /** Pasirinktas žingsnis (0–2). Kai nurodyta – interaktyvus režimas. */
  currentStep?: number;
  /** Callback paspaudus žingsnį. Kai nurodyta – kortelės clickable. */
  onStepClick?: (index: number) => void;
}

export default function StrukturuotasProcesasDiagram({
  className = '',
  currentStep = 0,
  onStepClick,
}: StrukturuotasProcesasDiagramProps) {
  const isInteractive = typeof onStepClick === 'function';

  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-4 lg:p-6 shadow-sm ${className}`}
      role="region"
      aria-label="Proceso schema: Įvestis, Apdorojimas, Rezultatas – kiekvieną užduotį galima suskirstyti į šiuos 3 žingsnius."
    >
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-6 lg:gap-0 overflow-visible">
        {STEPS.map((step, i) => (
          <Fragment key={i}>
            <article
              className={`
                flex-1 min-w-0 rounded-lg
                lg:border-l-0 lg:first:ml-0 lg:-ml-4
                border-l-2 border-dashed border-brand-200 dark:border-brand-700 pl-4
                first:border-l-0 first:pl-0
                ${isInteractive ? 'cursor-pointer' : ''}
              `}
              {...(isInteractive
                ? {
                    role: 'button' as const,
                    tabIndex: 0,
                    'aria-label': `Žingsnis ${i + 1}: ${step.title}`,
                    'aria-current': currentStep === i ? ('step' as const) : undefined,
                    onClick: () => onStepClick?.(i),
                    onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onStepClick?.(i);
                      }
                    },
                  }
                : {})}
            >
              <div
                className={`flex flex-col gap-3 p-4 rounded-lg bg-brand-100/60 dark:bg-brand-900/25 ${currentStep === i && isInteractive ? 'ring-2 ring-brand-500 ring-inset' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">{step.title}</h3>
                </div>
                <ul className="space-y-1.5 pl-0 list-none" role="list">
                  {step.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400 dark:bg-brand-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
            {i < STEPS.length - 1 && <Connector />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
