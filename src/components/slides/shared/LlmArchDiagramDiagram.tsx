/**
 * LLM agentinės sistemos diagrama – Input → LLM → Output; Įrankiai; Database.
 * Režimai: Bazinis (tik horizontalus), RAG (su return iš DB), Įrankiai (su return iš Tool).
 * Design tokens: WCAG AA kontrastas, aiški vizualinė hierarchija, dekoras nekonkuruoja su turiniu.
 * Return path – dinamiškai skaičiuojamas pagal DOM pozicijas.
 */
import { useId, useRef, useState, useLayoutEffect } from 'react';
import type { Locale, LlmArchMode } from './llmArchLayout';
import { getLlmArchCards, getLlmArchDiagramLabels, getLlmArchModes } from './llmArchLayout';

function computeReturnPath(
  container: DOMRect,
  diRect: DOMRect,
  fromRect: DOMRect
): string {
  const startX = fromRect.right - container.left;
  const startY = fromRect.top + fromRect.height / 2 - container.top;
  const endX = diRect.right - container.left;
  const endY = diRect.top + diRect.height / 2 - container.top;
  const routeX = Math.max(startX, endX) + 48;
  return `M ${startX} ${startY} L ${routeX} ${startY} L ${routeX} ${endY} L ${endX} ${endY}`;
}

interface LlmArchDiagramDiagramProps {
  mode: LlmArchMode;
  locale?: Locale;
  className?: string;
}

/* Design tokens – WCAG AA, ryškus kontrastas, aiški hierarchija */
const TOKENS = {
  bg: '#F8FAFC',
  card: '#FFFFFF',
  border: '#CBD5E1',
  textPrimary: '#0F172A',
  textSecondary: '#334155',
  textMuted: '#475569',
  primary: '#2563EB',
  success: '#16A34A',
  neutral: '#CBD5E1',
  arrowSecondary: '#64748B',
  accent: '#b8860b',
  arrow: '#334155',
  cardShadow: '0 6px 16px rgba(0,0,0,0.12)',
  diShadow: '0 4px 12px rgba(37,99,235,0.17)',
  primaryLight: '#3B82F6',
  returnLine: '#64748B',
} as const;

export default function LlmArchDiagramDiagram({ mode, locale = 'lt', className = '' }: LlmArchDiagramDiagramProps) {
  const uid = useId().replace(/:/g, '');
  const modes = getLlmArchModes(locale);
  const cards = getLlmArchCards(locale);
  const labels = getLlmArchDiagramLabels(locale);
  const config = modes[mode];
  const showVertical = config.showVertical;
  const returnFrom = config.returnFrom;

  const containerRef = useRef<HTMLDivElement>(null);
  const diNodeRef = useRef<HTMLDivElement>(null);
  const toolNodeRef = useRef<HTMLDivElement>(null);
  const dbNodeRef = useRef<HTMLDivElement>(null);
  const [returnPath, setReturnPath] = useState<string | null>(null);
  const [viewBox, setViewBox] = useState({ w: 560, h: 360 });

  useLayoutEffect(() => {
    if (!returnFrom || !containerRef.current || !diNodeRef.current) return;
    const fromEl = returnFrom === 'db' ? dbNodeRef.current : toolNodeRef.current;
    if (!fromEl) return;

    const update = () => {
      const cont = containerRef.current;
      const di = diNodeRef.current;
      const from = returnFrom === 'db' ? dbNodeRef.current : toolNodeRef.current;
      if (!cont || !di || !from) return;

      const cr = cont.getBoundingClientRect();
      const dr = di.getBoundingClientRect();
      const fr = from.getBoundingClientRect();

      setViewBox({ w: cr.width, h: cr.height });
      setReturnPath(computeReturnPath(cr, dr, fr));
    };

    update();

    const Ctor =
      typeof window !== 'undefined' && 'ResizeObserver' in window
        ? (window as Window & { ResizeObserver: typeof ResizeObserver }).ResizeObserver
        : null;
    if (!Ctor) return;
    const ro = new Ctor(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [returnFrom, showVertical]);

  return (
    <div
      ref={containerRef}
      className={`relative rounded-xl p-3 lg:p-4 overflow-visible min-w-0 transition-transform duration-200 hover:-translate-y-0.5 bg-slate-50 border border-black/[0.04] shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:bg-slate-900 dark:border-gray-700 dark:shadow-xl dark:shadow-black/20 ${className}`}
      role="img"
      aria-label={`LLM: ${config.label}. ${config.desc}`}
    >
      {/* Top accent – 2px subtilus separatorius; dark mode */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl bg-slate-200 dark:bg-slate-600"
        aria-hidden
      />

      {/* Corner label – sekcijos antraštė, mažiau oro */}
      <div
        className="absolute top-2 left-4 font-mono uppercase tracking-widest dark:text-gray-400"
        style={{ letterSpacing: '0.14em', color: TOKENS.textPrimary, fontSize: 14, fontWeight: 600 }}
      >
        {labels.sectionFlow}
      </div>

      {/* Return path SVG – dinaminės koordinatės pagal DOM. Path eina iš Tool/DB dešinio krašto į DI kairį kraštą. */}
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
              markerWidth="8"
              markerHeight="8"
              refX="5"
              refY="4"
              orient="auto"
            >
              <polygon points="0 2, 6 4, 0 6" fill={TOKENS.returnLine} />
            </marker>
          </defs>
          <path
            d={returnPath}
            fill="none"
            stroke={TOKENS.returnLine}
            strokeWidth={2}
            strokeDasharray="4 3"
            markerEnd={`url(#llmarch-arrow-${uid})`}
            opacity="0.75"
          />
        </svg>
      )}

      {/* Horizontal flow – group for arrow hover; -12px vertikalus tarpas tarp blokų */}
      <div className="flex flex-col items-center gap-0 relative z-[2] group/flow">
        <div className="flex items-center justify-center gap-1 w-full py-0">
          {/* Input node – light blue tint, label „Žmogus“; dark mode fonas */}
          <div
            className="flex flex-col items-center justify-center rounded-xl w-[165px] lg:w-[195px] h-[100px] lg:h-[120px] shrink-0 bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-300 shadow-[0_4px_12px_rgba(37,99,235,0.12)] dark:from-blue-900/40 dark:to-slate-800/80 dark:border-blue-700/60 dark:shadow-none font-[Plus_Jakarta_Sans,system-ui,sans-serif]"
          >
            <div className="text-[11px] font-medium uppercase tracking-wider mb-0.5 text-slate-500 dark:text-slate-400">{labels.inputRole}</div>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-1 bg-blue-200/50 dark:bg-blue-800/50 text-blue-600 dark:text-blue-300 text-base">
              ⬡
            </div>
            <div className="font-semibold text-blue-800 dark:text-blue-200 text-lg">{labels.inputTitle}</div>
            <div className="font-mono uppercase text-slate-600 dark:text-slate-400 text-[13px]">{labels.inputSubtitle}</div>
          </div>

          {/* Arrow į LLM – solid, hover highlight */}
          <div
            className="w-12 lg:w-14 h-0.5 relative shrink-0 transition-all duration-200 group-hover/flow:opacity-100"
            style={{ background: TOKENS.arrow, height: 2 }}
          >
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[7px] border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"
              style={{ marginRight: -1, borderLeftColor: TOKENS.arrow }}
            />
          </div>

          {/* DI node – gradient + glow, badge „Branduolys“; +8–10% width vizualinei dominacijai */}
          <div
            ref={diNodeRef}
            className="relative flex flex-col items-center justify-center rounded-xl w-[242px] lg:w-[292px] h-[126px] lg:h-[140px] shrink-0 z-[3]"
            style={{
              background: `linear-gradient(145deg, ${TOKENS.primaryLight} 0%, #1D4ED8 100%)`,
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: `0 6px 20px rgba(37,99,235,0.35), 0 0 0 1px rgba(255,255,255,0.1) inset`,
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-1"
              style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: 18 }}
            >
              ◈
            </div>
            <div className="font-semibold text-white" style={{ fontWeight: 600, fontSize: 20 }}>LLM</div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-white/90 mb-0.5">{labels.diBadge}</span>
            <div className="font-mono uppercase" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>{labels.diSubtitle}</div>
            <div className="absolute bottom-0 left-[22%] right-[22%] h-0.5 rounded-full opacity-50" style={{ background: 'rgba(255,255,255,0.6)' }} />
          </div>

          {/* Arrow iš LLM – storesnė (3px), hover */}
          <div
            className="w-12 lg:w-14 relative shrink-0 transition-all duration-200 group-hover/flow:opacity-100"
            style={{ background: TOKENS.success, height: 3 }}
          >
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[8px] border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent"
              style={{ marginRight: -1, borderLeftColor: TOKENS.success }}
            />
          </div>

          {/* Output node – light green tint, label „Sistema“; dark mode fonas */}
          <div
            className="flex flex-col items-center justify-center rounded-xl w-[165px] lg:w-[195px] h-[100px] lg:h-[120px] shrink-0 bg-gradient-to-br from-emerald-100 to-emerald-50 border border-emerald-300 shadow-[0_4px_12px_rgba(22,163,74,0.12)] dark:from-emerald-900/40 dark:to-slate-800/80 dark:border-emerald-700/60 dark:shadow-none font-[Plus_Jakarta_Sans,system-ui,sans-serif]"
          >
            <div className="text-[11px] font-medium uppercase tracking-wider mb-0.5 text-slate-500 dark:text-slate-400">{labels.outputRole}</div>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-1 bg-emerald-200/50 dark:bg-emerald-800/50 text-emerald-600 dark:text-emerald-300 text-base">
              ◎
            </div>
            <div className="font-semibold text-emerald-800 dark:text-emerald-200 text-lg">{labels.outputTitle}</div>
            <div className="font-mono uppercase text-slate-600 dark:text-slate-400 text-[13px]">{labels.outputSubtitle}</div>
          </div>
        </div>

        {/* Vertical flow – arrows h-6 (~12px mažiau tarp blokų), DB su RAG sluoksnis */}
        <div
          className={`flex flex-col items-center gap-0 transition-opacity duration-300 ${
            showVertical ? 'opacity-100' : 'opacity-[0.4]'
          }`}
        >
          {/* Arrow down – solid, sutrumpintas vertikalus atstumas */}
          <div
            className="h-6 relative transition-[filter] duration-200 group-hover/flow:opacity-100"
            style={{ width: 2, background: TOKENS.arrow }}
          >
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-t-[7px] border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent"
              style={{ marginBottom: -1, borderTopColor: TOKENS.arrow }}
            />
          </div>

          {/* Tool node; dark mode */}
          <div
            ref={toolNodeRef}
            className={`flex flex-col items-center justify-center rounded-xl w-[195px] lg:w-[225px] h-[100px] lg:h-[116px] shrink-0 transition-all bg-slate-50 dark:bg-slate-800 dark:border-gray-600 font-[Plus_Jakarta_Sans,system-ui,sans-serif] ${
              mode === 'tool' ? 'border border-blue-500 shadow-[0_6px_16px_rgba(37,99,235,0.14)] dark:border-blue-400' : 'border border-slate-200 shadow-[0_6px_16px_rgba(0,0,0,0.12)]'
            }`}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-base">
              ⚙
            </div>
            <div className="font-semibold text-slate-900 dark:text-slate-100 text-lg">{labels.toolTitle}</div>
            <div className="font-mono uppercase text-slate-600 dark:text-slate-400 text-[13px]">{labels.toolSubtitle}</div>
          </div>

          {/* Arrow down – į DB, sutrumpintas */}
          <div
            className="h-6 relative transition-[filter] duration-200"
            style={{ width: 2, background: TOKENS.arrowSecondary }}
          >
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-t-[7px] border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent"
              style={{ marginBottom: -1, borderTopColor: TOKENS.arrowSecondary }}
            />
          </div>

          {/* Database – dots pattern light; dark mode solid (overlay uždengia taškus) */}
          <div
            ref={dbNodeRef}
            className={`relative rounded-xl overflow-hidden w-[195px] lg:w-[225px] shrink-0 transition-opacity duration-300 bg-slate-50 ${
              mode === 'tool' ? 'opacity-40' : ''
            } ${mode === 'rag' ? 'border border-blue-500 dark:border-blue-400 shadow-[0_6px_16px_rgba(37,99,235,0.14)]' : 'border border-slate-200 dark:border-gray-600 shadow-[0_6px_16px_rgba(0,0,0,0.12)]'}`}
            style={{
              backgroundImage: 'radial-gradient(circle, #CBD5E1 1.2px, transparent 1.2px)',
              backgroundSize: '10px 10px',
            }}
          >
            <div className="absolute inset-0 rounded-xl bg-slate-800 z-[0] hidden dark:block" aria-hidden />
            <div className="h-5 border-b border-slate-200 dark:border-gray-600 flex items-center justify-center bg-slate-100 dark:bg-slate-700/80 relative z-[1]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">{labels.dbRagLabel}</span>
            </div>
            <div className="py-2.5 px-4 flex flex-col items-center relative z-[1] bg-transparent dark:bg-slate-800">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-sm">
                ⬟
              </div>
              <div className="font-semibold text-slate-900 dark:text-slate-100 text-base">{labels.dbTitle}</div>
              <div className="font-mono uppercase text-slate-600 dark:text-slate-400 text-xs">{labels.dbSubtitle}</div>
              <p className="text-[11px] text-center mt-1.5 leading-snug text-slate-500 dark:text-slate-400">{labels.dbHint}</p>
            </div>
            <div className="h-2.5 rounded-b border-t border-slate-200 dark:border-gray-600 relative z-[1] bg-slate-100 dark:bg-slate-700/80" />
          </div>
        </div>
      </div>

      {/* Architektūros logika – dark mode fonas */}
      <div className="rounded-lg px-4 py-3 mt-1 bg-slate-100 dark:bg-slate-800/60">
        <div className="font-mono uppercase mb-2 tracking-[0.12em] text-slate-600 dark:text-slate-400 text-sm leading-snug">
          {labels.sectionArch}
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`rounded-xl transition-all p-4 ${
              config.activeCard === idx
                ? 'bg-slate-200 dark:bg-slate-700 border-slate-400 dark:border-slate-500 shadow-[0_6px_16px_rgba(0,0,0,0.12)]'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-gray-600 shadow-[0_6px_16px_rgba(0,0,0,0.12)]'
            } border`}
          >
            <div className="font-mono uppercase mb-1.5 tracking-[0.12em] text-slate-600 dark:text-slate-400 text-[15px] font-semibold">
              {card.num}
            </div>
            <div className="font-semibold mb-2 font-[Plus_Jakarta_Sans] text-slate-900 dark:text-slate-100 text-lg">
              {card.title}
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400 text-sm">
              {card.text}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {card.tags.map((tag, ti) => (
                <span
                  key={ti}
                  className={`font-mono px-2 py-0.5 rounded text-sm ${
                    idx === 0
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                      : idx === 1
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                        : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
