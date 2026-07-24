/**
 * LLM agentinės sistemos diagrama – Input → LLM → Output; Įrankiai; Database.
 * Režimai: Bazinis (placeholder vertical), RAG (return iš DB), Agentinis (return iš Tool).
 * Type Etalon W6: comparison-mode-architecture.
 */
import { useId, useRef, useState, useLayoutEffect } from 'react';
import type { Locale, LlmArchMode } from './llmArchLayout';
import {
  getLlmArchCards,
  getLlmArchDiagramLabels,
  getLlmArchModes,
} from './llmArchLayout';
import {
  computeReturnPath,
  getReturnPathLabelPoint,
} from './llmArchReturnPath';
import { DIAGRAM_ROLE_COLORS, DIAGRAM_TOKENS } from './diagramTokens';

interface LlmArchDiagramDiagramProps {
  mode: LlmArchMode;
  locale?: Locale;
  className?: string;
  onSelectMode?: (mode: LlmArchMode) => void;
}

const FLOW_SHAFT_PX = DIAGRAM_TOKENS.stroke.flow;
const FORWARD = DIAGRAM_ROLE_COLORS.greyForward;
const RETURN_STROKE = DIAGRAM_ROLE_COLORS.accentDark;

function FlowArrow({
  direction,
  color = FORWARD,
}: {
  direction: 'right' | 'down';
  color?: string;
}) {
  if (direction === 'right') {
    return (
      <div
        className="w-12 lg:w-14 relative shrink-0"
        style={{ background: color, height: FLOW_SHAFT_PX }}
        aria-hidden
      >
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[10px] border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent"
          style={{ marginRight: -1, borderLeftColor: color }}
        />
      </div>
    );
  }
  return (
    <div
      className="relative flex flex-col items-center"
      aria-hidden
      style={{ height: 28 }}
    >
      <div style={{ width: FLOW_SHAFT_PX, height: 18, background: color }} />
      <div
        className="w-0 h-0 border-t-[10px] border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent"
        style={{ borderTopColor: color, marginTop: -1 }}
      />
    </div>
  );
}

function NodeHeaderBand({
  live,
  liveLabel,
  inactiveLabel,
  inactiveTestId,
}: {
  live: boolean;
  liveLabel: string;
  inactiveLabel: string;
  inactiveTestId: string;
}) {
  return (
    <div className="h-6 w-full border-b border-slate-200 dark:border-gray-600 flex items-center justify-center bg-slate-100 dark:bg-slate-700/80 relative z-[1] px-2 shrink-0">
      {live ? (
        <span className="text-[11px] font-semibold tracking-wide text-brand-700 dark:text-brand-300">
          {liveLabel}
        </span>
      ) : (
        <span
          data-testid={inactiveTestId}
          className="text-[11px] font-semibold tracking-wide text-slate-600 dark:text-slate-300"
        >
          {inactiveLabel}
        </span>
      )}
    </div>
  );
}

export default function LlmArchDiagramDiagram({
  mode,
  locale = 'lt',
  className = '',
  onSelectMode,
}: LlmArchDiagramDiagramProps) {
  const uid = useId().replace(/:/g, '');
  const modes = getLlmArchModes(locale);
  const cards = getLlmArchCards(locale);
  const labels = getLlmArchDiagramLabels(locale);
  const config = modes[mode];
  const returnFrom = config.returnFrom;

  const toolLive = mode === 'rag' || mode === 'tool';
  const dbLive = mode === 'rag';
  const showDownArrow = toolLive;
  const showDbArrow = dbLive;
  const flowAria = `LLM: ${config.label}. ${config.desc}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const diNodeRef = useRef<HTMLDivElement>(null);
  const toolNodeRef = useRef<HTMLDivElement>(null);
  const dbNodeRef = useRef<HTMLDivElement>(null);
  const [returnPath, setReturnPath] = useState<string | null>(null);
  const [returnLabel, setReturnLabel] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [viewBox, setViewBox] = useState({ w: 560, h: 360 });

  useLayoutEffect(() => {
    if (!returnFrom || !containerRef.current || !diNodeRef.current) {
      setReturnPath(null);
      setReturnLabel(null);
      return;
    }
    const fromEl =
      returnFrom === 'db' ? dbNodeRef.current : toolNodeRef.current;
    if (!fromEl) return;

    const update = () => {
      const cont = containerRef.current;
      const di = diNodeRef.current;
      const from =
        returnFrom === 'db' ? dbNodeRef.current : toolNodeRef.current;
      if (!cont || !di || !from) return;

      const cr = cont.getBoundingClientRect();
      const dr = di.getBoundingClientRect();
      const fr = from.getBoundingClientRect();

      setViewBox({ w: cr.width, h: cr.height });
      setReturnPath(computeReturnPath(cr, dr, fr));
      setReturnLabel(getReturnPathLabelPoint(cr, dr, fr));
    };

    update();

    const Ctor =
      typeof window !== 'undefined' && 'ResizeObserver' in window
        ? (window as Window & { ResizeObserver: typeof ResizeObserver })
            .ResizeObserver
        : null;
    if (!Ctor) return;
    const ro = new Ctor(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [returnFrom, mode]);

  const placeholderClass =
    'border-2 border-dashed border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-800/80 shadow-none';
  const liveToolClass =
    'border-2 border-brand-500 dark:border-brand-400 bg-slate-50 dark:bg-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.08)]';
  const liveDbClass =
    'border-2 border-brand-500 dark:border-brand-400 shadow-[0_4px_12px_rgba(0,0,0,0.08)]';

  return (
    <div
      ref={containerRef}
      className={`relative rounded-xl p-3 lg:p-4 overflow-visible min-w-0 bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-gray-700 ${className}`}
      role="region"
      aria-label={flowAria}
    >
      <div
        className="absolute top-2 left-4 font-sans tracking-wider text-slate-600 dark:text-slate-400"
        style={{
          letterSpacing: '0.1em',
          fontSize: DIAGRAM_TOKENS.typography.edgeLabel.size,
          fontWeight: 600,
        }}
      >
        {labels.sectionFlow}
      </div>

      {returnFrom && returnPath && (
        <svg
          viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-[1]"
          aria-hidden
        >
          <defs>
            <marker
              id={`llmarch-arrow-${uid}`}
              markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
              markerWidth="12"
              markerHeight="12"
              refX="0"
              refY="6"
              orient="auto"
            >
              <polygon points="0 2, 10 6, 0 10" fill={RETURN_STROKE} />
            </marker>
          </defs>
          <path
            d={returnPath}
            fill="none"
            stroke={RETURN_STROKE}
            strokeWidth={DIAGRAM_TOKENS.stroke.feedback}
            strokeDasharray="5 3"
            markerEnd={`url(#llmarch-arrow-${uid})`}
            opacity={1}
          />
          {returnLabel && (
            <text
              x={returnLabel.x}
              y={returnLabel.y}
              fill={RETURN_STROKE}
              fontSize={DIAGRAM_TOKENS.typography.edgeLabel.size}
              fontWeight={DIAGRAM_TOKENS.typography.edgeLabel.weight}
              fontFamily={DIAGRAM_TOKENS.font}
              dominantBaseline="middle"
            >
              {labels.edgeReturn}
            </text>
          )}
        </svg>
      )}

      <div
        className="flex flex-col items-center gap-0 relative z-[2] pt-6"
        role="img"
        aria-label={flowAria}
      >
        <div className="flex items-center justify-center gap-1 w-full py-0">
          <div className="flex flex-col items-center justify-center rounded-xl w-[165px] lg:w-[195px] h-[100px] lg:h-[120px] shrink-0 bg-blue-50 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700/60 font-[Plus_Jakarta_Sans,system-ui,sans-serif]">
            <div className="text-[11px] font-medium tracking-wider mb-0.5 text-slate-500 dark:text-slate-400">
              {labels.inputRole}
            </div>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-1 bg-blue-200/50 dark:bg-blue-800/50 text-blue-600 dark:text-blue-300 text-base">
              ⬡
            </div>
            <div className="font-semibold text-blue-800 dark:text-blue-200 text-lg">
              {labels.inputTitle}
            </div>
            <div className="font-sans text-slate-600 dark:text-slate-400 text-[13px]">
              {labels.inputSubtitle}
            </div>
          </div>

          <FlowArrow direction="right" />

          <div
            ref={diNodeRef}
            className="relative flex flex-col items-center justify-center rounded-xl w-[242px] lg:w-[292px] h-[126px] lg:h-[140px] shrink-0 z-[3] border border-brand-700 dark:border-brand-400"
            style={{
              background: DIAGRAM_TOKENS.colors.brand,
              boxShadow: '0 4px 12px rgba(16, 42, 67, 0.18)',
              fontFamily: DIAGRAM_TOKENS.font,
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-1"
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                fontSize: 18,
              }}
            >
              ◈
            </div>
            <div
              className="font-semibold text-white"
              style={{ fontWeight: 600, fontSize: 20 }}
            >
              LLM
            </div>
            <span className="text-[11px] font-medium tracking-wider text-white/90 mb-0.5">
              {labels.diBadge}
            </span>
            <div
              className="font-sans"
              style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}
            >
              {labels.diSubtitle}
            </div>
          </div>

          <FlowArrow direction="right" color={DIAGRAM_TOKENS.colors.emerald} />

          <div className="flex flex-col items-center justify-center rounded-xl w-[165px] lg:w-[195px] h-[100px] lg:h-[120px] shrink-0 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700/60 font-[Plus_Jakarta_Sans,system-ui,sans-serif]">
            <div className="text-[11px] font-medium tracking-wider mb-0.5 text-slate-500 dark:text-slate-400">
              {labels.outputRole}
            </div>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-1 bg-emerald-200/50 dark:bg-emerald-800/50 text-emerald-600 dark:text-emerald-300 text-base">
              ◎
            </div>
            <div className="font-semibold text-emerald-800 dark:text-emerald-200 text-lg">
              {labels.outputTitle}
            </div>
            <div className="font-sans text-slate-600 dark:text-slate-400 text-[13px]">
              {labels.outputSubtitle}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-0 mt-1">
          {showDownArrow ? (
            <div className="flex flex-col items-center">
              <FlowArrow direction="down" />
              <span
                className="text-slate-600 dark:text-slate-400 -mt-1 mb-0.5"
                style={{
                  fontSize: DIAGRAM_TOKENS.typography.edgeLabel.size,
                  fontWeight: DIAGRAM_TOKENS.typography.edgeLabel.weight,
                }}
              >
                {labels.edgeCall}
              </span>
            </div>
          ) : (
            <div className="h-3" aria-hidden />
          )}

          <div
            ref={toolNodeRef}
            data-testid="llm-arch-tool-node"
            data-state={toolLive ? 'live' : 'absent'}
            className={`relative flex flex-col items-center rounded-xl w-[195px] lg:w-[225px] shrink-0 overflow-hidden transition-colors font-[Plus_Jakarta_Sans,system-ui,sans-serif] ${
              toolLive ? liveToolClass : placeholderClass
            }`}
          >
            <NodeHeaderBand
              live={toolLive}
              liveLabel={labels.toolSubtitle}
              inactiveLabel={labels.inactiveBadge}
              inactiveTestId="llm-arch-tool-inactive"
            />
            <div className="py-2.5 px-4 flex flex-col items-center">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-base">
                ⚙
              </div>
              <div className="font-semibold text-slate-900 dark:text-slate-100 text-lg">
                {labels.toolTitle}
              </div>
            </div>
          </div>

          {showDbArrow ? (
            <FlowArrow direction="down" color={FORWARD} />
          ) : (
            <div className="h-3" aria-hidden />
          )}

          <div
            ref={dbNodeRef}
            data-testid="llm-arch-db-node"
            data-state={dbLive ? 'live' : 'absent'}
            className={`relative rounded-xl w-[195px] lg:w-[225px] shrink-0 overflow-hidden transition-colors ${
              dbLive ? liveDbClass : placeholderClass
            }`}
            style={
              dbLive
                ? {
                    backgroundImage:
                      'radial-gradient(circle, #CBD5E1 1.2px, transparent 1.2px)',
                    backgroundSize: '10px 10px',
                    backgroundColor: '#f8fafc',
                  }
                : undefined
            }
          >
            {dbLive && (
              <div
                className="absolute inset-0 rounded-xl bg-slate-800 z-[0] hidden dark:block"
                aria-hidden
              />
            )}
            <NodeHeaderBand
              live={dbLive}
              liveLabel={labels.dbRagLabel}
              inactiveLabel={labels.inactiveBadge}
              inactiveTestId="llm-arch-db-inactive"
            />
            <div className="py-2.5 px-4 flex flex-col items-center relative z-[1] bg-transparent dark:bg-slate-800">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-sm">
                ⬟
              </div>
              <div className="font-semibold text-slate-900 dark:text-slate-100 text-base">
                {labels.dbTitle}
              </div>
              <div className="font-sans text-slate-600 dark:text-slate-400 text-xs">
                {labels.dbSubtitle}
              </div>
              {dbLive && (
                <p className="text-[12px] text-center mt-1.5 leading-snug text-slate-600 dark:text-slate-400">
                  {labels.dbHint}
                </p>
              )}
            </div>
            {dbLive && (
              <div className="h-2.5 rounded-b border-t border-slate-200 dark:border-gray-600 relative z-[1] bg-slate-100 dark:bg-slate-700/80" />
            )}
          </div>
        </div>
      </div>

      <div
        className="rounded-lg px-4 py-3 mt-3 bg-slate-100 dark:bg-slate-800/60"
        role="group"
        aria-label={labels.sectionArch}
      >
        <div
          className="font-sans mb-2 tracking-[0.1em] text-slate-600 dark:text-slate-400 leading-snug"
          style={{ fontSize: 13, fontWeight: 600 }}
        >
          {labels.sectionArch}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {cards.map((card, idx) => {
            const active = config.activeCard === idx;
            return (
              <button
                key={card.mode}
                type="button"
                onClick={() => onSelectMode?.(card.mode)}
                aria-pressed={active}
                aria-label={`${card.num}: ${card.title}`}
                className={`rounded-xl text-left transition-all p-3 border focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 min-h-[44px] ${
                  active
                    ? 'bg-brand-50 dark:bg-brand-900/40 border-brand-500 dark:border-brand-400 shadow-[0_4px_12px_rgba(37,99,235,0.12)]'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-gray-600 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:border-brand-300 dark:hover:border-brand-600'
                }`}
              >
                <div className="font-sans mb-1 tracking-[0.1em] text-slate-600 dark:text-slate-400 text-[13px] font-semibold">
                  {card.num}
                </div>
                <div className="font-semibold mb-1.5 font-[Plus_Jakarta_Sans] text-slate-900 dark:text-slate-100 text-base">
                  {card.title}
                </div>
                <p className="leading-relaxed text-slate-600 dark:text-slate-400 text-sm">
                  {card.text}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {card.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className={`font-mono px-2 py-0.5 rounded text-xs ${
                        idx === 0
                          ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                          : idx === 1
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                            : 'bg-brand-100 dark:bg-brand-900/40 text-brand-800 dark:text-brand-200'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
