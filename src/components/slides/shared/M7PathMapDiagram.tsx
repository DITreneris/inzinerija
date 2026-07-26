/**
 * M7 sk. 71 – makro kelio žemėlapis (4 HTML kortelės).
 * Shell = Ne, be klikų / Enlargeable. Brother of StrukturuotasProcesasDiagram.
 */
import { Fragment, useId } from 'react';
import { DIAGRAM_TOKENS } from './diagramTokens';
import { getM7PathMapLabels, type M7PathMapLocale } from './m7PathMapContent';

const VIEWBOX_W = 48;
const ARROW_REFX = 5;
const HTML_CONNECTOR_STROKE = DIAGRAM_TOKENS.stroke.inactive;

function Connector() {
  const uid = useId().replace(/:/g, '');
  return (
    <div
      className="hidden lg:flex flex-shrink-0 w-10 items-center -translate-y-1"
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
            id={`m7-path-arrow-${uid}`}
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
          markerEnd={`url(#m7-path-arrow-${uid})`}
        />
      </svg>
    </div>
  );
}

export interface M7PathMapDiagramProps {
  className?: string;
  /** Active macro block (0–3). Sk. 71 = 0 (Pamatas). */
  currentStep?: number;
  locale?: M7PathMapLocale;
}

export default function M7PathMapDiagram({
  className = '',
  currentStep = 0,
  locale = 'lt',
}: M7PathMapDiagramProps) {
  const labels = getM7PathMapLabels(locale);
  const steps = labels.steps;

  return (
    <div
      className={`overflow-visible ${className}`}
      role="region"
      aria-label={labels.regionAria}
    >
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-0 overflow-visible">
        {steps.map((step, i) => {
          const isActive = currentStep === i;
          return (
            <Fragment key={step.title}>
              <article
                className="flex-1 min-w-0"
                aria-current={isActive ? 'step' : undefined}
              >
                <div
                  data-step-panel
                  data-active={isActive ? 'true' : 'false'}
                  className={`flex flex-col gap-2 p-3 sm:p-4 rounded-lg border ${
                    isActive
                      ? 'bg-brand-100/70 dark:bg-brand-900/30 border-brand-400 dark:border-brand-500 ring-2 ring-brand-500 ring-inset'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-gray-200 dark:border-gray-700'
                  }`}
                  style={
                    isActive
                      ? undefined
                      : { opacity: DIAGRAM_TOKENS.opacity.inactive }
                  }
                >
                  {isActive ? (
                    <span className="inline-flex self-start items-center rounded-md bg-brand-600 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
                      {labels.youAreHere}
                    </span>
                  ) : null}
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                        isActive
                          ? 'bg-brand-600'
                          : 'bg-brand-400 dark:bg-brand-700'
                      }`}
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white leading-snug">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed pl-0.5">
                    {step.tip}
                  </p>
                </div>
              </article>
              {i < steps.length - 1 && <Connector />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
