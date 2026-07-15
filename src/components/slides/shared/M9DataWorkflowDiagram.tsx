/**
 * Modulio 9 – 8 žingsnių duomenų valdymo ciklas (interaktyvi diagrama).
 * Horizontal card flow (desktop) / vertical stack (mobile) – M79-23.
 */
import { Fragment } from 'react';
import {
  Database,
  FileSpreadsheet,
  Search,
  Layers,
  Sparkles,
  Merge,
  BarChart3,
  LayoutDashboard,
  MoveRight,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import { getM9DataWorkflowSteps } from './m9DataWorkflowContent';

const STEP_ICONS: LucideIcon[] = [
  Database,
  FileSpreadsheet,
  Search,
  Layers,
  Sparkles,
  Merge,
  BarChart3,
  LayoutDashboard,
];

interface M9DataWorkflowDiagramProps {
  currentStep?: number;
  onStepClick?: (index: number) => void;
  locale?: 'lt' | 'en';
  /** Modulio 7 MASTER skaidrė – kita antraštė, tie patys 8 žingsniai */
  diagramContext?: 'm9' | 'm7_master';
  className?: string;
}

export default function M9DataWorkflowDiagram({
  currentStep = 0,
  onStepClick,
  locale = 'lt',
  diagramContext = 'm9',
  className = '',
}: M9DataWorkflowDiagramProps) {
  const isInteractive = typeof onStepClick === 'function';
  const stepsMeta = getM9DataWorkflowSteps(locale);

  const title =
    diagramContext === 'm7_master'
      ? locale === 'en'
        ? 'MASTER: 8 analysis steps'
        : 'MASTER: 8 analizės žingsniai'
      : locale === 'en'
        ? '8-step data workflow'
        : '8 žingsnių duomenų ciklas';
  const hint =
    locale === 'en'
      ? 'Tap a step – explanation below'
      : 'Paspausk žingsnį – paaiškinimas apačioje';

  const ariaIntro =
    diagramContext === 'm7_master'
      ? locale === 'en'
        ? 'MASTER prompt: eight steps from sources to recommendations.'
        : 'MASTER promptas: aštuoni žingsniai nuo šaltinių iki rekomendacijų.'
      : locale === 'en'
        ? 'Module 9 workflow: eight steps from collection to HTML dashboard.'
        : 'Modulio 9 workflow: aštuoni žingsniai nuo surinkimo iki .html dashboard.';

  const renderStep = (i: number, compact: boolean) => {
    const isActive = currentStep === i;
    const Icon = STEP_ICONS[i] ?? Database;
    const st = stepsMeta[i];
    const stepLabel = `${i + 1}. ${st.label}`;

    return (
      <div
        key={i}
        className={[
          'relative flex w-full flex-col items-center rounded-2xl border p-4 shadow-sm transition-all duration-200',
          compact ? 'max-w-none' : 'max-w-[9.5rem] md:max-w-[10.5rem]',
          isActive
            ? 'border-accent-500 bg-accent-50/90 ring-2 ring-accent-400/30 dark:border-accent-500/60 dark:bg-accent-900/25'
            : 'border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800/80',
          isInteractive
            ? 'cursor-pointer hover:border-brand-400 focus-within:ring-2 focus-within:ring-brand-500'
            : '',
        ].join(' ')}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-pressed={isInteractive ? isActive : undefined}
        aria-label={`${stepLabel}: ${st.desc}`}
        onClick={isInteractive ? () => onStepClick(i) : undefined}
        onKeyDown={
          isInteractive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onStepClick(i);
                }
              }
            : undefined
        }
      >
        <div
          className={[
            'mb-3 rounded-xl p-2.5 transition-colors',
            isActive
              ? 'bg-accent-100 text-accent-800 dark:bg-accent-900/40 dark:text-accent-200'
              : 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300',
          ].join(' ')}
        >
          <Icon
            className="h-6 w-6 md:h-7 md:w-7"
            strokeWidth={1.5}
            aria-hidden
          />
        </div>
        <h3
          className={`text-center text-sm font-semibold leading-tight md:text-base ${
            isActive
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-700 dark:text-gray-200'
          }`}
        >
          {stepLabel}
        </h3>
        <p className="mt-1 text-center text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {st.desc}
        </p>
      </div>
    );
  };

  return (
    <div
      className={`w-full max-w-6xl mx-auto ${className}`}
      role="img"
      aria-label={`${ariaIntro}${isInteractive ? ` ${hint}` : ''}`}
    >
      <div className="mb-4 text-center">
        <h4 className="text-lg font-bold text-brand-800 dark:text-brand-200 md:text-xl">
          {title}
        </h4>
        {isInteractive && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
      </div>

      <div className="relative overflow-x-auto rounded-2xl border border-gray-200 bg-gradient-to-br from-brand-50/80 via-white to-accent-50/40 p-4 shadow-sm dark:border-gray-700 dark:from-brand-950/40 dark:via-gray-900 dark:to-accent-950/20 md:p-6">
        <div
          className="flex flex-col items-stretch gap-2 lg:hidden"
          role="list"
        >
          {stepsMeta.map((_, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <div className="flex justify-center py-0.5 text-gray-300 dark:text-gray-600">
                  <ChevronDown className="h-5 w-5" aria-hidden />
                </div>
              )}
              {renderStep(i, true)}
            </Fragment>
          ))}
        </div>

        <div
          className="hidden lg:flex lg:items-center lg:justify-start lg:gap-1 xl:justify-center xl:gap-2"
          role="list"
        >
          {stepsMeta.map((_, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <div className="relative flex shrink-0 items-center px-0.5">
                  <MoveRight
                    className="h-5 w-5 text-brand-400 dark:text-brand-500"
                    aria-hidden
                  />
                </div>
              )}
              {renderStep(i, false)}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
