/**
 * ProcessSteps – 3 žingsnių schema (Įvestis → Apdorojimas → Rezultatas).
 * Skaidrė 43 „Darbas su DI: struktūruotas procesas“.
 *
 * HTML linear-process etalon (DIAGRAM_KIT_STANDARD): Shell duoda chrome;
 * čia – vienas kortelių sluoksnis, be outer frame.
 * Jungtis: plona linija (~1.5) + maža rodyklės galvutė (HTML išimtis vs SVG stroke.flow 3.5).
 * Interaktyvus režimas: currentStep + onStepClick – clickable kortelės, a11y.
 */
import { Fragment, useId } from 'react';
import { DIAGRAM_TOKENS } from './diagramTokens';
import {
  getStrukturuotasProcesasDiagramLabels,
  type StrukturuotasProcesasLocale,
} from './strukturuotasProcesasStepExplanations';

/** Jungtis – linija nuo bloko krašto iki kito bloko krašto; antgalio smailė liečia viewBox dešinį kraštą (SCHEME_AGENT §3.2). */
const VIEWBOX_W = 48;
const ARROW_REFX = 5; // marker tip offset; line ends at VIEWBOX_W, marker (refX at end) puts tip at VIEWBOX_W
/** HTML card connectors stay thin; SVG process floor (3.5) does not apply here. */
const HTML_CONNECTOR_STROKE = DIAGRAM_TOKENS.stroke.inactive;

function Connector() {
  const uid = useId().replace(/:/g, '');
  return (
    <div
      className="hidden lg:flex flex-shrink-0 w-12 items-center -translate-y-1"
      aria-hidden
    >
      <svg
        width="100%"
        height="12"
        viewBox={`0 0 ${VIEWBOX_W} 12`}
        className="text-brand-400 dark:text-brand-500 shrink-0"
        fill="none"
      >
        <defs>
          <marker
            id={`arrow-${uid}`}
            markerWidth="6"
            markerHeight="4"
            refX={ARROW_REFX}
            refY="2"
            orient="auto"
            markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
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
          strokeWidth={HTML_CONNECTOR_STROKE}
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
  locale?: StrukturuotasProcesasLocale;
}

export default function StrukturuotasProcesasDiagram({
  className = '',
  currentStep = 0,
  onStepClick,
  locale = 'lt',
}: StrukturuotasProcesasDiagramProps) {
  const isInteractive = typeof onStepClick === 'function';
  const labels = getStrukturuotasProcesasDiagramLabels(locale);
  const STEPS = labels.steps;

  return (
    <div
      className={`overflow-visible ${className}`}
      role="region"
      aria-label={labels.regionAria}
    >
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-6 lg:gap-0 overflow-visible">
        {STEPS.map((step, i) => {
          const isActive = currentStep === i;
          const dimInactive = isInteractive && !isActive;
          return (
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
                      'aria-label': labels.stepAria(i, step.title),
                      'aria-current': isActive ? ('step' as const) : undefined,
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
                  data-step-panel
                  data-active={isActive && isInteractive ? 'true' : 'false'}
                  className={`flex flex-col gap-3 p-4 rounded-lg bg-brand-100/60 dark:bg-brand-900/25 ${
                    isActive && isInteractive
                      ? 'ring-2 ring-brand-500 ring-inset'
                      : ''
                  }`}
                  style={
                    dimInactive
                      ? { opacity: DIAGRAM_TOKENS.opacity.inactive }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-base text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <ul className="space-y-1.5 pl-0 list-none" role="list">
                    {step.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                      >
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400 dark:bg-brand-500"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
              {i < STEPS.length - 1 && <Connector />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
