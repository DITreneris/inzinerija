/**
 * Test intro – ką apima žinių patikrinimas (M8, M11, M14).
 * Bubble SOT: testKnowledgeScopeContent.ts (M79-S2b).
 */
import { getModulesSync } from '../../../data/modulesLoader';
import modulesData from '../../../data/modules.json';
import type { ModulesData } from '../../../types/modules';
import type { M10Locale } from './m10DiagramContent';
import { DIAGRAM_TOKENS } from './diagramTokens';
import {
  bubbleLabel,
  getTestKnowledgeBubbles,
  testKnowledgeScopeTitle,
  type TestKnowledgeBubble,
} from './testKnowledgeScopeContent';

const W = 520;
const H = 140;
const FALLBACK_MODULES = (modulesData as ModulesData).modules;

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
  const bubbles = getTestKnowledgeBubbles(moduleId);
  const title = testKnowledgeScopeTitle(locale);
  const canDeepLink = typeof onGoToModule === 'function';
  const palette = DIAGRAM_TOKENS.palette.light;

  const go = (bubble: TestKnowledgeBubble) => {
    if (!onGoToModule) return;
    const modules = getModulesSync(locale) ?? FALLBACK_MODULES;
    const mod = modules?.find((m) => m.id === bubble.targetModuleId);
    const slideIndex =
      mod != null ? mod.slides.findIndex((s) => s.id === bubble.slideId) : -1;
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
          {bubbles.map((b) => {
            const label = bubbleLabel(b, locale);
            return (
              <button
                key={`${b.targetModuleId}-${b.slideId}-${b.labelLt}`}
                type="button"
                onClick={() => go(b)}
                className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-800"
                aria-label={
                  locale === 'en'
                    ? `Review theory (return to test): ${label}`
                    : `Peržiūrėti teoriją (grįši į testą): ${label}`
                }
              >
                {label}
              </button>
            );
          })}
        </div>
      ) : (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full max-w-xl mx-auto block"
          role="img"
          aria-label={title}
        >
          {bubbles.map((b, i) => {
            const label = bubbleLabel(b, locale);
            return (
              <g key={i}>
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={36}
                  rx="8"
                  fill={palette.brand}
                  stroke={palette.brandDark}
                  strokeWidth="1"
                />
                <text
                  x={b.x + b.w / 2}
                  y={b.y + 23}
                  textAnchor="middle"
                  fill={palette.whiteText}
                  fontSize={DIAGRAM_TOKENS.typography.stepLabel.compact}
                  fontWeight="600"
                  fontFamily={DIAGRAM_TOKENS.font}
                >
                  {label.length > 14 ? `${label.slice(0, 13)}…` : label}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
