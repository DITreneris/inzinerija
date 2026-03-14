/**
 * InstructGPT kokybės analizės vizualizacija (content-block su instructGptQuality, pvz. skaidrė id 44).
 * Stats strip, line chart, delta lentelė, key finding.
 * Projekto spalvos: accent, emerald, violet, slate, rose.
 */
import { useTranslation } from 'react-i18next';
import type { InstructGptQualityBlock as InstructGptQualityBlockType } from '../../../types/modules';

const CHART_COLORS: Record<string, string> = {
  accent: '#d4a520',
  emerald: '#10b981',
  violet: '#8b5cf6',
  slate: '#94a3b8',
  rose: '#f43f5e',
};

const STAT_COLOR_CLASSES: Record<string, { text: string; border: string }> = {
  accent: {
    text: 'text-accent-700 dark:text-accent-300',
    border: 'border-accent-500',
  },
  emerald: {
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-500',
  },
  violet: {
    text: 'text-violet-700 dark:text-violet-300',
    border: 'border-violet-500',
  },
  slate: {
    text: 'text-slate-600 dark:text-slate-400',
    border: 'border-slate-500',
  },
};

const DELTA_COLOR_CLASSES: Record<string, string> = {
  accent: 'text-accent-700 dark:text-accent-300',
  emerald: 'text-emerald-700 dark:text-emerald-300',
  violet: 'text-violet-700 dark:text-violet-300',
  slate: 'text-slate-600 dark:text-slate-400',
  rose: 'text-rose-600 dark:text-rose-400',
};

/** Chart geometry – viena tiesa (SCHEME_AGENT). Y: 2→350px, 5→90px */
const VIEWBOX = { w: 680, h: 400 };
const PAD = { left: 60, right: 60, top: 20, bottom: 50 };
const Y_MIN = 2;
const Y_MAX = 5;
const CHART_HEIGHT = 260;
const Y_PX_PER_UNIT = CHART_HEIGHT / (Y_MAX - Y_MIN);
const Y_BOTTOM = VIEWBOX.h - PAD.bottom;

const X_POSITIONS: Record<string, number> = {
  '1.5B': 120,
  '6B': 350,
  '175B': 600,
};

function getChartY(score: number): number {
  return Y_BOTTOM - (score - Y_MIN) * Y_PX_PER_UNIT;
}

export function InstructGptQualityBlock({
  data,
}: {
  data: InstructGptQualityBlockType;
}) {
  const { t } = useTranslation('contentSlides');
  const stats = data.stats ?? [];
  const chartData = data.chartData ?? [];
  const deltaRows = data.deltaRows ?? [];

  return (
    <div
      className="space-y-6"
      role="region"
      aria-label={t('instructGptQualityAria')}
    >
      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {stats.map((stat, i) => {
          const colors =
            STAT_COLOR_CLASSES[stat.colorKey] ?? STAT_COLOR_CLASSES.slate;
          return (
            <div
              key={i}
              className={`p-4 rounded-xl border-l-2 ${colors.border} bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/90 transition-colors`}
            >
              <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                {stat.label}
              </div>
              <div className={`text-2xl font-bold ${colors.text}`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {stat.detail}
              </div>
            </div>
          );
        })}
      </div>

      {/* Line chart */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 p-4 overflow-x-auto">
        <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
          {t('instructGptChartHeading')}
        </div>
        <svg
          viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
          className="w-full min-w-[320px] h-auto text-gray-800 dark:text-gray-200"
          aria-label={t('instructGptChartAria')}
        >
          <defs>
            <linearGradient id="glowInstruct" x1="0" y1="0" x2="1" y2="0">
              <stop
                offset="0%"
                stopColor={CHART_COLORS.accent}
                stopOpacity="0"
              />
              <stop
                offset="100%"
                stopColor={CHART_COLORS.accent}
                stopOpacity="0.15"
              />
            </linearGradient>
          </defs>
          {/* Grid */}
          <g opacity="0.25">
            {[2, 3, 4, 5].map((v) => (
              <line
                key={v}
                x1={PAD.left}
                y1={getChartY(v)}
                x2={VIEWBOX.w - PAD.right}
                y2={getChartY(v)}
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="4,4"
                className="text-gray-400"
              />
            ))}
          </g>
          {/* Axes */}
          <line
            x1={PAD.left}
            y1={PAD.top}
            x2={PAD.left}
            y2={VIEWBOX.h - PAD.bottom}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          <line
            x1={PAD.left}
            y1={VIEWBOX.h - PAD.bottom}
            x2={VIEWBOX.w - PAD.right}
            y2={VIEWBOX.h - PAD.bottom}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          {/* Y labels */}
          {[2, 3, 4, 5].map((v) => (
            <text
              key={v}
              x={PAD.left - 8}
              y={getChartY(v) + 4}
              fill="currentColor"
              fontSize="11"
              textAnchor="end"
              className="text-gray-500 dark:text-gray-400"
            >
              {v}
            </text>
          ))}
          {/* X labels */}
          <text
            x={X_POSITIONS['1.5B']}
            y={VIEWBOX.h - 20}
            fill="currentColor"
            fontSize="10"
            textAnchor="middle"
            className="text-gray-500 dark:text-gray-400"
          >
            1.5B
          </text>
          <text
            x={X_POSITIONS['6B']}
            y={VIEWBOX.h - 20}
            fill="currentColor"
            fontSize="10"
            textAnchor="middle"
            className="text-gray-500 dark:text-gray-400"
          >
            6B
          </text>
          <text
            x={X_POSITIONS['175B']}
            y={VIEWBOX.h - 20}
            fill="currentColor"
            fontSize="10"
            textAnchor="middle"
            className="text-gray-500 dark:text-gray-400"
          >
            175B
          </text>
          {/* Lines and dots */}
          {chartData.map((series, si) => {
            const color = CHART_COLORS[series.colorKey] ?? CHART_COLORS.slate;
            const points = series.points
              .filter((p) => X_POSITIONS[p.x] != null)
              .map((p) => `${X_POSITIONS[p.x]},${getChartY(p.y)}`)
              .join(' ');
            const isInstruct = series.colorKey === 'accent';
            return (
              <g key={si}>
                {isInstruct && (
                  <polygon
                    points={`${X_POSITIONS['1.5B']},${getChartY(series.points[0]?.y ?? 2)} ${X_POSITIONS['6B']},${getChartY(series.points[1]?.y ?? 2)} ${X_POSITIONS['175B']},${getChartY(series.points[2]?.y ?? 2)} ${X_POSITIONS['175B']},${Y_BOTTOM} ${X_POSITIONS['1.5B']},${Y_BOTTOM}`}
                    fill="url(#glowInstruct)"
                    opacity="0.25"
                  />
                )}
                <polyline
                  points={points}
                  fill="none"
                  stroke={color}
                  strokeWidth={isInstruct ? 3 : 2}
                  strokeLinejoin="round"
                />
                {series.points
                  .filter((p) => X_POSITIONS[p.x] != null)
                  .map((p, pi) => (
                    <circle
                      key={pi}
                      cx={X_POSITIONS[p.x]}
                      cy={getChartY(p.y)}
                      r={isInstruct ? 5 : 4}
                      fill={color}
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  ))}
              </g>
            );
          })}
        </svg>
        {data.scaleNote && (
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {data.scaleNote}
          </p>
        )}
      </div>

      {/* Delta grid */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 overflow-hidden">
        <div className="px-4 py-3 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
          {t('instructGptDeltaHeading')}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-gray-200 dark:divide-gray-700">
          {deltaRows.map((row, i) => {
            const colorClass =
              DELTA_COLOR_CLASSES[row.colorKey] ?? DELTA_COLOR_CLASSES.slate;
            return (
              <div key={i} className="p-4">
                <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                  {row.model}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg text-gray-500 dark:text-gray-400">
                    {row.start}
                  </span>
                  <span className="text-gray-500">→</span>
                  <span className={`text-lg font-semibold ${colorClass}`}>
                    {row.end}
                  </span>
                </div>
                <div className={`text-xs mt-1 ${colorClass}`}>{row.change}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Finding insight */}
      <div className="border-l-2 border-accent-500 bg-accent-50 dark:bg-accent-900/20 p-4 rounded-r-xl border border-accent-200 dark:border-accent-800">
        <div className="text-xs uppercase tracking-wider text-accent-700 dark:text-accent-300 mb-2">
          {t('instructGptKeyFindingHeading')}
        </div>
        <p className="text-gray-800 dark:text-gray-200 italic leading-relaxed">
          {data.insight}
        </p>
      </div>
    </div>
  );
}
