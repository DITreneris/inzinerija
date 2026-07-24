/**
 * M7 67.7 – HTML icon-chain process map (5 stages).
 * Type etalon: linear-process (HTML icon-chain + autoplay).
 * Shell owns chrome; this layer is cards + optional flow particles.
 */
import { Fragment } from 'react';
import {
  Database,
  ShieldCheck,
  Binary,
  Radar,
  Fingerprint,
  MoveRight,
  type LucideIcon,
} from 'lucide-react';
import { DIAGRAM_TOKENS } from './diagramTokens';
import {
  getHallucinationPipelineSteps,
  HALLUCINATION_PIPELINE_STEP_KEYS,
  type HallucinationPipelineLocale,
} from './hallucinationPipelineContent';

const STEP_ICONS: LucideIcon[] = [
  Database,
  ShieldCheck,
  Binary,
  Radar,
  Fingerprint,
];

function DataParticle({ delay }: { delay: number }) {
  return (
    <div
      className="absolute top-1/2 left-0 z-10 h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_6px_rgba(98,125,152,0.6)] blur-[0.5px]"
      style={{
        animation: 'hallucination-pipeline-flow 3.2s linear infinite',
        animationDelay: `${delay}s`,
        opacity: 0,
      }}
    />
  );
}

function StepCard({
  Icon,
  label,
  caption,
  isActive,
  onSelect,
  stepIndex,
}: {
  Icon: LucideIcon;
  label: string;
  caption: string;
  isActive: boolean;
  onSelect?: (index: number) => void;
  stepIndex: number;
}) {
  const interactive = typeof onSelect === 'function';
  const dimInactive = interactive && !isActive;

  return (
    <div className="relative flex flex-col items-center">
      <div
        data-step-panel
        data-active={isActive && interactive ? 'true' : 'false'}
        className={[
          'relative flex w-full max-w-[11rem] flex-col items-center justify-center rounded-2xl border p-5 shadow-sm transition-all duration-300 md:max-w-[13rem] md:p-6',
          interactive ? 'cursor-pointer' : '',
          isActive
            ? 'border-accent-500 bg-accent-50/90 ring-2 ring-inset ring-accent-400/40 dark:border-accent-500/60 dark:bg-accent-900/25 dark:ring-accent-500/30'
            : 'border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800/80',
        ].join(' ')}
        style={
          dimInactive ? { opacity: DIAGRAM_TOKENS.opacity.inactive } : undefined
        }
        {...(interactive
          ? {
              role: 'button' as const,
              tabIndex: -1,
              'aria-hidden': true as const,
              onClick: () => onSelect(stepIndex),
            }
          : {})}
      >
        <div
          className={[
            'relative mb-4 rounded-xl p-3 transition-colors',
            isActive
              ? 'bg-accent-100 text-accent-800 dark:bg-accent-900/40 dark:text-accent-200'
              : 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300',
          ].join(' ')}
        >
          <Icon
            className="h-7 w-7 md:h-8 md:w-8"
            strokeWidth={1.5}
            aria-hidden
          />
        </div>
        <h3
          className={`text-center text-base font-semibold md:text-lg ${
            isActive
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-700 dark:text-gray-200'
          }`}
        >
          {label}
        </h3>
        <p className="mt-1 text-center text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {caption}
        </p>
      </div>
    </div>
  );
}

export interface HallucinationPipelineDiagramProps {
  activeIndex: number;
  onStepSelect?: (index: number) => void;
  /** When true and motion allowed, show flow particles. */
  isPlaying?: boolean;
  reducedMotion?: boolean;
  locale?: HallucinationPipelineLocale | string;
  className?: string;
}

export default function HallucinationPipelineDiagram({
  activeIndex,
  onStepSelect,
  isPlaying = false,
  reducedMotion = false,
  locale = 'lt',
  className = '',
}: HallucinationPipelineDiagramProps) {
  const steps = getHallucinationPipelineSteps(locale);
  const showParticles = isPlaying && !reducedMotion;

  return (
    <div className={`w-full ${className}`}>
      <style>{`
        @keyframes hallucination-pipeline-flow {
          0% { left: 0%; opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>

      {/* Mobile: vertical stack */}
      <div className="flex flex-col items-stretch gap-2 lg:hidden" role="list">
        {HALLUCINATION_PIPELINE_STEP_KEYS.map((key, idx) => {
          const Icon = STEP_ICONS[idx];
          const step = steps[idx];
          return (
            <Fragment key={key}>
              {idx > 0 && (
                <div className="flex justify-center py-1 text-gray-300 dark:text-gray-600">
                  <MoveRight
                    className="h-5 w-5 rotate-90"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                </div>
              )}
              <div className="w-full" role="listitem">
                <StepCard
                  Icon={Icon}
                  label={step.label}
                  caption={step.caption}
                  isActive={activeIndex === idx}
                  onSelect={onStepSelect}
                  stepIndex={idx}
                />
              </div>
            </Fragment>
          );
        })}
      </div>

      {/* Desktop: horizontal pipeline */}
      <div className="relative hidden lg:block">
        <div
          className="absolute left-[4%] right-[4%] top-[52%] h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-200 to-transparent dark:via-brand-700/60"
          aria-hidden
        >
          {showParticles && (
            <>
              <DataParticle delay={0} />
              <DataParticle delay={1.1} />
              <DataParticle delay={2.2} />
            </>
          )}
        </div>
        <div
          className="relative z-[1] flex flex-nowrap items-center justify-center gap-0 overflow-x-auto pb-1"
          role="list"
        >
          {HALLUCINATION_PIPELINE_STEP_KEYS.map((key, idx) => {
            const Icon = STEP_ICONS[idx];
            const step = steps[idx];
            return (
              <Fragment key={key}>
                <div className="shrink-0 px-0.5" role="listitem">
                  <StepCard
                    Icon={Icon}
                    label={step.label}
                    caption={step.caption}
                    isActive={activeIndex === idx}
                    onSelect={onStepSelect}
                    stepIndex={idx}
                  />
                </div>
                {idx < HALLUCINATION_PIPELINE_STEP_KEYS.length - 1 && (
                  <div
                    className="flex shrink-0 items-center self-stretch px-0.5 text-brand-300 dark:text-brand-600"
                    aria-hidden
                  >
                    <MoveRight
                      className="h-5 w-5 md:h-6 md:w-6"
                      strokeWidth={1.25}
                    />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
