import { Fragment, useEffect, useState } from 'react';
import {
  Database,
  ShieldCheck,
  Binary,
  Radar,
  Fingerprint,
  MoveRight,
  type LucideIcon,
} from 'lucide-react';
import { useLocale } from '../contexts/LocaleContext';

const STEP_KEYS = [
  'ground',
  'verify',
  'structure',
  'detect',
  'review',
] as const;

type StepKey = (typeof STEP_KEYS)[number];

const COPY: Record<
  'lt' | 'en',
  {
    steps: Record<StepKey, { label: string; caption: string }>;
  }
> = {
  lt: {
    steps: {
      ground: {
        label: 'Šaltiniai',
        caption: 'Tikri duomenys',
      },
      verify: {
        label: 'Patikra',
        caption: 'Kryžminis tikrinimas',
      },
      structure: {
        label: 'Struktūra',
        caption: 'Aiškus formatas',
      },
      detect: {
        label: 'Rizika',
        caption: 'Spragos ir įtarimai',
      },
      review: {
        label: 'Peržiūra',
        caption: 'Žmogaus žingsnis',
      },
    },
  },
  en: {
    steps: {
      ground: {
        label: 'Sources',
        caption: 'Ground truth',
      },
      verify: {
        label: 'Verify',
        caption: 'Cross-check',
      },
      structure: {
        label: 'Structure',
        caption: 'Clear format',
      },
      detect: {
        label: 'Detect',
        caption: 'Risk scan',
      },
      review: {
        label: 'Review',
        caption: 'Human sign-off',
      },
    },
  },
};

const STEP_ICONS: LucideIcon[] = [
  Database,
  ShieldCheck,
  Binary,
  Radar,
  Fingerprint,
];

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

function DataParticle({
  delay,
  reducedMotion,
}: {
  delay: number;
  reducedMotion: boolean;
}) {
  if (reducedMotion) return null;
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
}: {
  Icon: LucideIcon;
  label: string;
  caption: string;
  isActive: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center">
      <div
        className={[
          'relative flex w-full max-w-[11rem] flex-col items-center justify-center rounded-2xl border p-5 shadow-sm transition-all duration-300 md:max-w-[13rem] md:p-6',
          isActive
            ? 'border-accent-500 bg-accent-50/90 ring-2 ring-accent-400/30 dark:border-accent-500/60 dark:bg-accent-900/25 dark:ring-accent-500/20'
            : 'border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800/80',
        ].join(' ')}
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

/**
 * Modulio 7: haliucinacijų mažinimo proceso schema (5 žingsniai).
 * Stilius: GOLDEN_STANDARD – brand / accent / slate, šviesi kortelė, be išorinių URL.
 */
export default function HallucinationPipelineSlide() {
  const { locale } = useLocale();
  const lang = locale === 'en' ? 'en' : 'lt';
  const copy = COPY[lang];
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % STEP_KEYS.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <style>{`
        @keyframes hallucination-pipeline-flow {
          0% { left: 0%; opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>

      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-brand-50/80 via-white to-accent-50/40 p-4 shadow-sm dark:border-gray-700 dark:from-brand-950/40 dark:via-gray-900 dark:to-accent-950/20 md:p-6">
        {/* Mobile: vertical stack */}
        <div
          className="flex flex-col items-stretch gap-2 lg:hidden"
          role="list"
        >
          {STEP_KEYS.map((key, idx) => {
            const Icon = STEP_ICONS[idx];
            const step = copy.steps[key];
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
            {!reducedMotion && (
              <>
                <DataParticle delay={0} reducedMotion={reducedMotion} />
                <DataParticle delay={1.1} reducedMotion={reducedMotion} />
                <DataParticle delay={2.2} reducedMotion={reducedMotion} />
              </>
            )}
          </div>
          <div
            className="relative z-[1] flex flex-nowrap items-center justify-center gap-0 overflow-x-auto pb-1"
            role="list"
          >
            {STEP_KEYS.map((key, idx) => {
              const Icon = STEP_ICONS[idx];
              const step = copy.steps[key];
              return (
                <Fragment key={key}>
                  <div className="shrink-0 px-0.5" role="listitem">
                    <StepCard
                      Icon={Icon}
                      label={step.label}
                      caption={step.caption}
                      isActive={activeIndex === idx}
                    />
                  </div>
                  {idx < STEP_KEYS.length - 1 && (
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
    </div>
  );
}
