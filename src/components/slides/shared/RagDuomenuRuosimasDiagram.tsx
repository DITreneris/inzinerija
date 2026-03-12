/**
 * RAG duomenų paruošimo magistralė – horizontalus 5 žingsnių pipeline.
 * Tekstai iš getRagDuomenuRuosimasSteps(locale) ir getRagDuomenuRuosimasBlockLabels(locale).
 */
import { Tags, Layers, Layout, CheckCircle2, FileText } from 'lucide-react';
import {
  getRagDuomenuRuosimasBlockLabels,
  getRagDuomenuRuosimasSteps,
  RAG_STEP_COLOR_CLASSES,
  type RagLocale,
  type RagStepColorKey,
} from './ragDuomenuRuosimasLayout';

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
      {/* Jungiamoji linija (desktop) */}
      <div
        className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-600 -translate-y-1/2 z-0 hidden md:block"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        {steps.map((step, idx) => {
          const isActive = currentStep === idx;
          const colorKey = step.colorKey as RagStepColorKey;
          const colors = RAG_STEP_COLOR_CLASSES[colorKey];
          const Icon = ICONS[idx];

          return (
            <div key={idx} className="flex flex-col items-center">
              {/* Tik apskritimas paspaudžiamas – flash ribojamas 56×56 (H1) */}
              <div
                role="button"
                tabIndex={isInteractive ? 0 : -1}
                aria-label={labels.diagramStepAria(idx, step.label)}
                aria-current={isActive ? 'step' : undefined}
                onClick={() => isInteractive && onStepClick(idx)}
                onKeyDown={(e) => {
                  if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onStepClick(idx);
                  }
                }}
                className="rag-duomenu-step group flex select-none transition-all duration-300 focus:outline-none focus-visible:outline-none"
              >
                <div
                  className={`
                    w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-300
                    ${isActive
                      ? `bg-white dark:bg-slate-900 ${colors.border} shadow-lg ring-2 ring-inset ring-brand-400/40 ${colors.text}`
                      : 'bg-slate-100 dark:bg-slate-800 border-white dark:border-slate-800 text-slate-400 dark:text-slate-500 grayscale hover:grayscale-0 hover:border-slate-200 dark:hover:border-slate-600'}
                  `}
                >
                  <Icon className="w-5 h-5" aria-hidden />
                </div>
              </div>

              {/* Etiketė – nepaspaudžiama, tik informacija */}
              <div className="mt-3 text-center pointer-events-none">
                <p
                  className={`text-[10px] uppercase font-bold tracking-widest mb-0.5 ${
                    isActive ? colors.text : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {step.phase}
                </p>
                <h4
                  className={`font-semibold text-sm ${
                    isActive ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'
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
