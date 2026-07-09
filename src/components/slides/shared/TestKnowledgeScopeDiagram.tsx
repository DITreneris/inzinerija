/**
 * Test intro – ką apima žinių patikrinimas (M8, M11, M14).
 */
import { getModulesSync } from '../../../data/modulesLoader';
import modulesData from '../../../data/modules.json';
import type { ModulesData } from '../../../types/modules';
import type { M10Locale } from './m10DiagramContent';

const W = 520;
const H = 140;
const FALLBACK_MODULES = (modulesData as ModulesData).modules;

type BubbleSpec = {
  x: number;
  y: number;
  w: number;
  t: string;
  targetModuleId?: number;
  slideId?: number;
};

function bubblesForModule(
  moduleId: 8 | 11 | 14,
  locale: M10Locale
): BubbleSpec[] {
  if (moduleId === 8) {
    const t = locale === 'en';
    return [
      { x: 16, y: 36, w: 92, t: 'Pipeline', targetModuleId: 7, slideId: 73 },
      {
        x: 112,
        y: 36,
        w: 88,
        t: t ? 'BI / report' : 'BI / ataskaita',
        targetModuleId: 7,
        slideId: 92,
      },
      { x: 204, y: 36, w: 86, t: 'MASTER', targetModuleId: 7, slideId: 74 },
      {
        x: 294,
        y: 36,
        w: 100,
        t: t ? 'Sentiment' : 'Sentimentas',
        targetModuleId: 7,
        slideId: 732,
      },
      {
        x: 398,
        y: 36,
        w: 100,
        t: t ? '4 types' : '4 tipai',
        targetModuleId: 7,
        slideId: 731,
      },
      {
        x: 70,
        y: 88,
        w: 100,
        t: t ? 'Cleaning' : 'Valymas',
        targetModuleId: 7,
        slideId: 891,
      },
      {
        x: 176,
        y: 88,
        w: 100,
        t: t ? 'Gestalt' : 'Geštaltas',
        targetModuleId: 7,
        slideId: 86,
      },
      {
        x: 282,
        y: 88,
        w: 110,
        t: t ? 'Workflow' : 'Seka',
        targetModuleId: 7,
        slideId: 891,
      },
      {
        x: 396,
        y: 88,
        w: 100,
        t: t ? 'CFO output' : 'CFO OUTPUT',
        targetModuleId: 7,
        slideId: 733,
      },
    ];
  }
  if (moduleId === 11) {
    const t = locale === 'en';
    return [
      {
        x: 20,
        y: 44,
        w: 100,
        t: t ? 'Agent cycle' : 'Agentų ciklas',
        targetModuleId: 10,
        slideId: 10.2,
      },
      {
        x: 128,
        y: 44,
        w: 100,
        t: t ? 'Trigger flow' : 'Trigger / flow',
        targetModuleId: 10,
        slideId: 10.15,
      },
      {
        x: 236,
        y: 44,
        w: 72,
        t: '3A',
        targetModuleId: 10,
        slideId: 10.25,
      },
      {
        x: 314,
        y: 44,
        w: 88,
        t: t ? 'Tools' : 'Įrankiai',
        targetModuleId: 10,
        slideId: 10.4,
      },
      {
        x: 408,
        y: 44,
        w: 92,
        t: t ? 'Prompts' : 'Promptai',
        targetModuleId: 10,
        slideId: 10.48,
      },
      {
        x: 200,
        y: 92,
        w: 120,
        t: t ? 'Errors / limits' : 'Ribos / klaidos',
        targetModuleId: 10,
        slideId: 10.6,
      },
    ];
  }
  const t = locale === 'en';
  return [
    {
      x: 24,
      y: 44,
      w: 88,
      t: t ? 'Image' : 'Vaizdas',
      targetModuleId: 13,
      slideId: 13.1,
    },
    {
      x: 118,
      y: 44,
      w: 88,
      t: t ? 'Video' : 'Video',
      targetModuleId: 13,
      slideId: 13.4,
    },
    {
      x: 212,
      y: 44,
      w: 88,
      t: t ? 'Music' : 'Muzika',
      targetModuleId: 13,
      slideId: 13.6,
    },
    {
      x: 306,
      y: 44,
      w: 88,
      t: 'KPI / A-B',
      targetModuleId: 13,
      slideId: 13.101,
    },
    {
      x: 400,
      y: 44,
      w: 92,
      t: t ? 'Rights' : 'Teisės',
      targetModuleId: 13,
      slideId: 13.8,
    },
    {
      x: 200,
      y: 92,
      w: 120,
      t: t ? 'Brief → publish' : 'Brief → publikacija',
      targetModuleId: 13,
      slideId: 13.2,
    },
  ];
}

function titleFor(moduleId: 8 | 11 | 14, locale: M10Locale): string {
  if (locale === 'en') {
    if (moduleId === 8) return 'This test checks (examples)';
    if (moduleId === 11) return 'This test checks (examples)';
    return 'This test checks (examples)';
  }
  if (moduleId === 8) return 'Testas tikrina (pavyzdžiai)';
  if (moduleId === 11) return 'Testas tikrina (pavyzdžiai)';
  return 'Testas tikrina (pavyzdžiai)';
}

export default function TestKnowledgeScopeDiagram({
  moduleId,
  locale = 'lt',
  className = '',
  onGoToModule,
  sourceModuleId,
}: {
  moduleId: 8 | 11 | 14;
  locale?: M10Locale;
  className?: string;
  onGoToModule?: (
    moduleId: number,
    slideIndex?: number,
    fromRemediationSourceModuleId?: number
  ) => void;
  sourceModuleId?: number;
}) {
  const bubbles = bubblesForModule(moduleId, locale);
  const title = titleFor(moduleId, locale);
  const canDeepLink =
    (moduleId === 8 || moduleId === 11 || moduleId === 14) &&
    typeof onGoToModule === 'function';

  const go = (bubble: BubbleSpec) => {
    if (!onGoToModule || bubble.targetModuleId == null) return;
    const modules = getModulesSync(locale) ?? FALLBACK_MODULES;
    const mod = modules?.find((m) => m.id === bubble.targetModuleId);
    const slideIndex =
      mod && bubble.slideId != null
        ? mod.slides.findIndex((s) => s.id === bubble.slideId)
        : -1;
    onGoToModule(
      bubble.targetModuleId,
      slideIndex >= 0 ? slideIndex : undefined,
      sourceModuleId ?? moduleId
    );
  };

  return (
    <div
      className={`rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/15 p-3 ${className}`}
    >
      <p className="text-xs font-semibold text-brand-800 dark:text-brand-200 mb-2 text-center">
        {title}
      </p>
      {canDeepLink ? (
        <div className="flex flex-wrap justify-center gap-2">
          {bubbles.map((b) => (
            <button
              key={`${b.targetModuleId}-${b.slideId}-${b.t}`}
              type="button"
              onClick={() => go(b)}
              className="min-h-[44px] rounded-lg border border-brand-800 bg-brand-700 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-brand-300 dark:bg-brand-800 dark:hover:bg-brand-700"
              aria-label={
                locale === 'en'
                  ? `Review theory: ${b.t}`
                  : `Peržiūrėti teoriją: ${b.t}`
              }
            >
              {b.t}
            </button>
          ))}
        </div>
      ) : (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full max-w-xl mx-auto block"
          role="img"
          aria-label={title}
        >
          {bubbles.map((b, i) => (
            <g key={i}>
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={36}
                rx="8"
                fill="#334e68"
                stroke="#102a43"
                strokeWidth="1"
              />
              <text
                x={b.x + b.w / 2}
                y={b.y + 23}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="600"
                fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
              >
                {b.t.length > 14 ? `${b.t.slice(0, 13)}…` : b.t}
              </text>
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}
