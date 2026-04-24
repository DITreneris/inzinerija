/**
 * Test intro – ką apima žinių patikrinimas (M8, M11, M14).
 */
import type { M10Locale } from './m10DiagramContent';

const W = 520;
const H = 140;

function bubblesForModule(
  moduleId: 8 | 11 | 14,
  locale: M10Locale
): { x: number; y: number; w: number; t: string }[] {
  if (moduleId === 8) {
    const t = locale === 'en';
    return [
      { x: 16, y: 36, w: 92, t: t ? 'Pipeline' : 'Pipeline' },
      { x: 112, y: 36, w: 88, t: t ? 'BI / report' : 'BI / ataskaita' },
      { x: 204, y: 36, w: 86, t: t ? 'MASTER' : 'MASTER' },
      { x: 294, y: 36, w: 100, t: t ? 'Sentiment' : 'Sentimentas' },
      { x: 398, y: 36, w: 100, t: t ? '4 types' : '4 tipai' },
      { x: 70, y: 88, w: 100, t: t ? 'Cleaning' : 'Valymas' },
      { x: 176, y: 88, w: 100, t: t ? 'Gestalt' : 'Geštaltas' },
      { x: 282, y: 88, w: 110, t: t ? 'Workflow' : 'Seka' },
      { x: 396, y: 88, w: 100, t: t ? 'CFO output' : 'CFO OUTPUT' },
    ];
  }
  if (moduleId === 11) {
    const t = locale === 'en';
    return [
      { x: 20, y: 44, w: 100, t: t ? 'Agent cycle' : 'Agentų ciklas' },
      { x: 128, y: 44, w: 100, t: t ? 'Trigger flow' : 'Trigger / flow' },
      { x: 236, y: 44, w: 72, t: '3A' },
      { x: 314, y: 44, w: 88, t: t ? 'Tools' : 'Įrankiai' },
      { x: 408, y: 44, w: 92, t: t ? 'Prompts' : 'Promptai' },
      { x: 200, y: 92, w: 120, t: t ? 'Errors / limits' : 'Ribos / klaidos' },
    ];
  }
  const t = locale === 'en';
  return [
    { x: 24, y: 44, w: 88, t: t ? 'Image' : 'Vaizdas' },
    { x: 118, y: 44, w: 88, t: t ? 'Video' : 'Video' },
    { x: 212, y: 44, w: 88, t: t ? 'Music' : 'Muzika' },
    { x: 306, y: 44, w: 88, t: 'KPI / A-B' },
    { x: 400, y: 44, w: 92, t: t ? 'Rights' : 'Teisės' },
    { x: 200, y: 92, w: 120, t: t ? 'Brief → publish' : 'Brief → publikacija' },
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
}: {
  moduleId: 8 | 11 | 14;
  locale?: M10Locale;
  className?: string;
}) {
  const bubbles = bubblesForModule(moduleId, locale);
  const title = titleFor(moduleId, locale);

  return (
    <div
      className={`rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/15 p-3 ${className}`}
    >
      <p className="text-xs font-semibold text-brand-800 dark:text-brand-200 mb-2 text-center">
        {title}
      </p>
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
    </div>
  );
}
