/**
 * RAG duomenų paruošimo magistralė – horizontalus 5 žingsnių pipeline.
 * Brand-active / slate-inactive (DIAGRAM_KIT token kalba); HTML, Shell=Ne.
 */
import { Tags, Layers, Layout, CheckCircle2, FileText } from 'lucide-react';
import {
  getRagDuomenuRuosimasBlockLabels,
  getRagDuomenuRuosimasSteps,
  type RagLocale,
} from './ragDuomenuRuosimasLayout';
import { typographyClasses } from '../../../design-tokens';

const ICONS: React.ComponentType<{ className?: string }>[] = [
  Tags,
  Layers,
  Layout,
  CheckCircle2,
  FileText,
];

interface RagDuomenuRuosimasDiagramProps {
  currentStep?: number;
  onStepClick?: (index: number) => void;
  locale?: RagLocale;
  className?: string;
}

export default function RagDuomenuRuosimasDiagram({
  currentStep = 0,
  onStepClick,
  locale = 'lt',
  className = '',
}: RagDuomenuRuosimasDiagramProps) {
  const isInteractive = typeof onStepClick === 'function';
  const steps = getRagDuomenuRuosimasSteps(locale);
  const labels = getRagDuomenuRuosimasBlockLabels(locale);

  return (
    <div
      className={`relative ${className}`}
      role="img"
      aria-label={`${labels.diagramAria}${isInteractive ? labels.diagramHint : ''}`}
    >
      {/* Connector – brand token stroke (desktop) */}
      <div
        className="absolute left-0 top-1/2 z-0 hidden h-1 w-full -translate-y-1/2 bg-brand-200 dark:bg-brand-800/60 lg:block"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-0">
        {steps.map((step, idx) => {
          const isActive = currentStep === idx;
          const Icon = ICONS[idx];

          return (
            <div key={idx} className="flex flex-col items-center">
              <div
                role="button"
                tabIndex={-1}
                aria-hidden
                aria-current={isActive ? 'step' : undefined}
                onClick={() => isInteractive && onStepClick(idx)}
                className="rag-duomenu-step group flex select-none transition-all duration-300 focus:outline-none focus-visible:outline-none"
              >
                <div
                  className={`
                    flex h-14 w-14 items-center justify-center rounded-full border-4 transition-all duration-300
                    ${
                      isActive
                        ? 'border-brand-500 bg-white text-brand-600 shadow-md ring-2 ring-inset ring-brand-400/40 dark:bg-slate-900 dark:text-brand-300'
                        : 'border-white bg-slate-100 text-slate-400 grayscale hover:border-slate-200 hover:grayscale-0 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-500 dark:hover:border-slate-600'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
              </div>

              <div className="pointer-events-none mt-3 text-center">
                <p
                  className={`mb-0.5 ${typographyClasses.labelUpper} tracking-widest ${
                    isActive
                      ? 'text-brand-600 dark:text-brand-300'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {step.phase}
                </p>
                <h4
                  className={`text-sm font-semibold ${
                    isActive
                      ? 'text-slate-900 dark:text-slate-100'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {step.label}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
