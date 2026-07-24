import type { ReactNode } from 'react';
import { focusRingClasses, touchTargetClasses } from '../../../design-tokens';

export interface DiagramStepSummary {
  title: string;
}

/** default = full chrome; hero = LMS polish (fewer frames, secondary nav). */
export type InteractiveDiagramDensity = 'default' | 'hero';

interface DiagramStatusBadgeProps {
  label: string;
  currentTitle: string;
  currentIndex: number;
  totalSteps: number;
  density?: InteractiveDiagramDensity;
  /** Hero: full “Step n of total” string; when set, replaces label+index chrome. */
  stepOfLabel?: string;
}

export function DiagramStatusBadge({
  label,
  currentTitle,
  currentIndex,
  totalSteps,
  density = 'default',
  stepOfLabel,
}: DiagramStatusBadgeProps) {
  if (density === 'hero') {
    if (stepOfLabel) {
      return (
        <div className="flex flex-wrap items-center gap-2" aria-live="polite">
          <span className="text-sm font-medium tabular-nums text-slate-600 dark:text-slate-400">
            {stepOfLabel}
          </span>
          <span className="inline-flex items-center rounded-full border border-brand-200/80 bg-brand-50/80 px-2.5 py-0.5 text-sm font-semibold text-brand-800 dark:border-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
            {currentTitle}
          </span>
        </div>
      );
    }

    return (
      <p
        className="text-sm font-semibold text-brand-800 dark:text-brand-200"
        aria-live="polite"
      >
        <span className="text-brand-600 dark:text-brand-400">{label}</span>{' '}
        {currentTitle}
        <span className="ml-2 font-medium tabular-nums text-slate-500 dark:text-slate-400">
          {currentIndex + 1}/{totalSteps}
        </span>
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-700 shadow-sm dark:border-brand-700 dark:bg-slate-900/80 dark:text-brand-200"
        aria-live="polite"
      >
        <span
          className="h-2 w-2 rounded-full bg-brand-500 shrink-0"
          aria-hidden
        />
        {label} {currentTitle}
      </span>
      <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 tabular-nums dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        {currentIndex + 1} / {totalSteps}
      </span>
    </div>
  );
}

interface DiagramStepNavProps<TStep extends DiagramStepSummary> {
  steps: TStep[];
  currentStep: number;
  onStepSelect: (index: number) => void;
  ariaLabel: string;
  stepAria: (index: number, title: string) => string;
  density?: InteractiveDiagramDensity;
}

export function DiagramStepNav<TStep extends DiagramStepSummary>({
  steps,
  currentStep,
  onStepSelect,
  ariaLabel,
  stepAria,
  density = 'default',
}: DiagramStepNavProps<TStep>) {
  const isHero = density === 'hero';
  return (
    <nav
      className={`flex flex-wrap justify-center ${isHero ? 'gap-1' : 'gap-1.5'}`}
      aria-label={ariaLabel}
    >
      {steps.map((step, idx) => {
        const isActive = currentStep === idx;
        return (
          <button
            key={`${step.title}-${idx}`}
            type="button"
            onClick={() => onStepSelect(idx)}
            aria-current={isActive ? 'step' : undefined}
            aria-label={stepAria(idx, step.title)}
            className={`
              flex shrink-0 items-center justify-center rounded-full border-2 font-bold transition-all
              ${isHero ? 'h-9 w-9 min-h-[36px] min-w-[36px] text-[11px] shadow-none' : `${touchTargetClasses.minimum} text-xs shadow-sm`}
              ${focusRingClasses.brandOnWhite}
              ${
                isActive
                  ? isHero
                    ? 'border-brand-700 bg-brand-700 text-white shadow-sm'
                    : 'border-brand-600 bg-brand-600 text-white shadow-md'
                  : isHero
                    ? 'border-slate-200/80 bg-transparent text-slate-500 hover:border-brand-400 hover:text-brand-700 dark:border-slate-600/80 dark:text-slate-400'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-brand-400 hover:bg-brand-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-brand-900/30'
              }
            `}
          >
            {idx + 1}
          </button>
        );
      })}
    </nav>
  );
}

interface DiagramStepHitAreaProps {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  onActivate: () => void;
}

export function DiagramStepHitArea({
  x,
  y,
  width,
  height,
  radius = 10,
  onActivate,
}: DiagramStepHitAreaProps) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={radius}
      fill="transparent"
      cursor="pointer"
      onClick={onActivate}
      aria-hidden="true"
    />
  );
}

interface DiagramExplanationProps {
  title: string;
  children: ReactNode;
  density?: InteractiveDiagramDensity;
}

export function DiagramExplanation({
  title,
  children,
  density = 'default',
}: DiagramExplanationProps) {
  if (density === 'hero') {
    return (
      <div
        className="border-l-[3px] border-l-brand-500 bg-slate-50/80 py-4 pl-5 pr-3 text-sm leading-relaxed text-gray-700 dark:bg-slate-900/50 dark:text-gray-300 md:text-base md:leading-relaxed"
        role="status"
        aria-live="polite"
      >
        <p className="mb-2 text-sm font-semibold text-brand-800 dark:text-brand-200 md:text-base">
          {title}
        </p>
        <div className="max-w-3xl">{children}</div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border border-brand-200 bg-white/95 p-4 text-sm leading-relaxed text-gray-700 shadow-sm dark:border-brand-800 dark:bg-slate-900/85 dark:text-gray-300 md:text-base"
      role="status"
      aria-live="polite"
    >
      <p className="mb-2 border-l-4 border-l-brand-500 pl-3 text-base font-semibold text-brand-800 dark:text-brand-200">
        {title}
      </p>
      <div>{children}</div>
    </div>
  );
}

interface InteractiveDiagramShellProps<TStep extends DiagramStepSummary> {
  regionAria: string;
  statusLabel: string;
  currentStep: number;
  totalSteps: number;
  currentTitle: string;
  navAria: string;
  steps: TStep[];
  onStepSelect: (index: number) => void;
  stepAria: (index: number, title: string) => string;
  explanationTitle: string;
  explanation: ReactNode;
  children: ReactNode;
  density?: InteractiveDiagramDensity;
  /** Hero status: “Step n of total” / “Žingsnis n iš total” */
  stepOfLabel?: string;
}

export function InteractiveDiagramShell<TStep extends DiagramStepSummary>({
  regionAria,
  statusLabel,
  currentStep,
  totalSteps,
  currentTitle,
  navAria,
  steps,
  onStepSelect,
  stepAria,
  explanationTitle,
  explanation,
  children,
  density = 'default',
  stepOfLabel,
}: InteractiveDiagramShellProps<TStep>) {
  const gap = density === 'hero' ? 'space-y-2' : 'space-y-4';
  return (
    <div className={gap} role="region" aria-label={regionAria}>
      <DiagramStatusBadge
        label={statusLabel}
        currentTitle={currentTitle}
        currentIndex={currentStep}
        totalSteps={totalSteps}
        density={density}
        stepOfLabel={stepOfLabel}
      />
      {children}
      <DiagramStepNav
        steps={steps}
        currentStep={currentStep}
        onStepSelect={onStepSelect}
        ariaLabel={navAria}
        stepAria={stepAria}
        density={density}
      />
      <DiagramExplanation title={explanationTitle} density={density}>
        {explanation}
      </DiagramExplanation>
    </div>
  );
}

interface DiagramImageFrameProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

export function DiagramImageFrame({
  src,
  alt,
  className = '',
  imgClassName = '',
}: DiagramImageFrameProps) {
  const normalizedSrc = src.replace(/^\//, '');
  const baseUrl = import.meta.env.BASE_URL || '/';

  return (
    <div
      className={`overflow-auto rounded-xl border border-gray-200 bg-gray-50/70 p-3 shadow-sm dark:border-gray-700 dark:bg-gray-900/30 ${className}`}
    >
      <img
        src={`${baseUrl}${normalizedSrc}`}
        alt={alt}
        className={`mx-auto h-auto max-h-80 max-w-full ${imgClassName}`}
      />
    </div>
  );
}
