import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getT } from '../../../../i18n';
import { useLocale } from '../../../../contexts/LocaleContext';
import { ArrowRight, Check, Pen, Wrench, Search, Code, Image, HelpCircle, Brain, FileDown, Sparkles, X, type LucideIcon } from 'lucide-react';
import type { IntroActionPieContent, IntroActionPiePdfSegment, PieChartSegment } from '../../../../types/modules';
import { getIntroPiePdfContent } from '../../../../data/introPiePdfContentLoader';
import { getGlossary } from '../../../../data/glossaryLoader';
import toolsData from '../../../../data/tools.json';
import { downloadIntroPiePdf, ensurePdfFont, type ToolInfo, type GlossaryTermInfo } from '../../../../utils/introPiePdf';

/** Lucide ikonos „Kam žmonės naudoja GPT?“ kortoms ir sąrašui – vektorinės, ne emoji */
const INTRO_PIE_ICONS: Record<string, LucideIcon> = {
  Pen,
  Wrench,
  Search,
  Code,
  Image,
  HelpCircle,
  Brain,
};

/** Segmento colorKey → Tailwind fonas ikonos dėžutei */
const ICON_BG: Record<string, string> = {
  brand: 'bg-brand-500 text-white',
  emerald: 'bg-emerald-500 text-white',
  orange: 'bg-orange-500 text-white',
  rose: 'bg-rose-500 text-white',
  violet: 'bg-violet-500 text-white',
  amber: 'bg-amber-500 text-white',
  slate: 'bg-slate-500 text-white',
  fuchsia: 'bg-fuchsia-500 text-white',
};

const PIE_COLORS: Record<string, string> = {
  brand: '#627d98',
  emerald: '#10b981',
  orange: '#f97316',
  rose: '#f43f5e',
  violet: '#8b5cf6',
  amber: '#f59e0b',
  slate: '#94a3b8',
  fuchsia: '#d946ef',
};

function getPieColor(colorKey?: string, index?: number): string {
  const key = colorKey || ['brand', 'emerald', 'orange', 'rose', 'violet', 'amber', 'slate', 'fuchsia'][index ?? 0];
  return PIE_COLORS[key] ?? PIE_COLORS.brand;
}

/** Vienodas procento formatas: vienas skaitmuo po kablelio (kad nesikeltų į kitą eilutę) */
function formatSegmentPct(value: number): string {
  const n = Number(value);
  if (Number.isInteger(n)) return `${n}.0%`;
  return `${Number(n.toFixed(1))}%`;
}

/** Horizontalus bar chart – rūšiuotas nuo didžiausio, paryškinamas vartotojo segmentas (Business SaaS stilius) */
function HorizontalBarChartViz({
  segments,
  highlightIndex,
  getIcon,
  iconBg,
}: {
  segments: PieChartSegment[];
  highlightIndex?: number | null;
  getIcon: (index: number) => LucideIcon | null;
  iconBg: (colorKey?: string) => string;
}) {
  const maxVal = Math.max(...segments.map((s) => s.value), 1);
  const sorted = segments
    .map((seg, originalIndex) => ({ seg, originalIndex }))
    .sort((a, b) => b.seg.value - a.seg.value);

  return (
    <ul className="space-y-3 w-full max-w-xl mx-auto" aria-label="2026 m. pasiskirstymas pagal kategorijas">
      {sorted.map(({ seg, originalIndex }) => {
        const isHighlight = originalIndex === highlightIndex;
        const fill = getPieColor(seg.colorKey, originalIndex);
        const IconC = getIcon(originalIndex);
        const bgClass = iconBg(seg.colorKey);
        return (
          <li
            key={originalIndex}
            className={`flex items-center gap-2 sm:gap-3 rounded-r-lg py-2 pr-3 transition-all ${
              isHighlight
                ? 'border-l-4 border-brand-500 bg-brand-100 dark:bg-brand-900/40 pl-2 -ml-2 font-medium text-brand-800 dark:text-brand-200 ring-2 ring-brand-300 dark:ring-brand-600 ring-offset-2 dark:ring-offset-gray-800'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {IconC && (
              <span
                className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg ${bgClass}`}
                aria-hidden="true"
              >
                <IconC className="w-4 h-4" strokeWidth={2} />
              </span>
            )}
            <span className="flex-1 min-w-0 text-sm font-medium truncate">{seg.label}</span>
            <div className="flex-shrink-0 flex items-center gap-2 w-36 sm:w-44">
              <div
                className={`flex-1 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 min-w-[60px] ${
                  isHighlight ? 'h-7' : 'h-6'
                }`}
              >
                <div
                  className="h-full rounded-md transition-all duration-300"
                  style={{ width: `${(seg.value / maxVal) * 100}%`, backgroundColor: fill }}
                  role="presentation"
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white tabular-nums text-right whitespace-nowrap min-w-[3.5rem]">
                {formatSegmentPct(seg.value)}
              </span>
              {isHighlight && (
                <span
                  className="flex items-center gap-1 flex-shrink-0 rounded-full px-2 py-0.5 bg-brand-200/80 dark:bg-brand-800/50 text-brand-800 dark:text-brand-200 text-xs font-semibold"
                  aria-label="Tavo pasirinkimas"
                  title="Tavo pasirinkimas"
                >
                  <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                  <span className="hidden sm:inline">Tavo pasirinkimas</span>
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Grąžina Lucide komponentą pagal icon key arba null (tada rodyti emoji fallback) */
function getIntroPieIcon(iconKey: string | undefined): LucideIcon | null {
  if (!iconKey) return null;
  return INTRO_PIE_ICONS[iconKey] ?? null;
}

const toolsList = (toolsData as { tools: { name: string; url: string; description: string }[] }).tools;

/** Lazy-loaded skaidrė: vertimai per getT(module). */
function IntroActionPieActions({
  segmentIndex: _segmentIndex,
  pdfSegment,
  locale,
}: {
  segmentIndex: number;
  pdfSegment: IntroActionPiePdfSegment | undefined;
  locale: 'lt' | 'en';
}) {
  useTranslation();
  const t = getT('module');
  const [showModal, setShowModal] = useState(false);

  const toolsByName = useMemo(() => {
    const m = new Map<string, ToolInfo>();
    for (const tool of toolsList) m.set(tool.name, { name: tool.name, url: tool.url, description: tool.description });
    return m;
  }, []);

  const glossaryByTerm = useMemo(() => {
    const terms = getGlossary(locale);
    const m = new Map<string, GlossaryTermInfo>();
    for (const g of terms) m.set(g.term, { term: g.term, definition: g.definition });
    return m;
  }, [locale]);

  const handlePdf = async () => {
    if (!pdfSegment) return;
    await ensurePdfFont();
    downloadIntroPiePdf(pdfSegment, toolsByName, glossaryByTerm, undefined, locale);
  };

  if (!pdfSegment) return null;

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-label={t('generateTipsAria')}
        >
          <Sparkles className="w-5 h-5" aria-hidden="true" />
          <span>{t('generateTipsForYourself')}</span>
        </button>
        <button
          type="button"
          onClick={handlePdf}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border-2 border-brand-500 text-brand-700 dark:text-brand-300 font-semibold hover:bg-brand-50 dark:hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-label={t('exportPdfAria')}
        >
          <FileDown className="w-5 h-5" aria-hidden="true" />
          <span>{t('exportPdf')}</span>
        </button>
      </div>

      {showModal && (
        <IntroActionPieTipsModal
          pdfSegment={pdfSegment}
          toolsByName={toolsByName}
          glossaryByTerm={glossaryByTerm}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

function IntroActionPieTipsModal({
  pdfSegment,
  toolsByName,
  glossaryByTerm,
  onClose,
}: {
  pdfSegment: IntroActionPiePdfSegment;
  toolsByName: Map<string, ToolInfo>;
  glossaryByTerm: Map<string, GlossaryTermInfo>;
  onClose: () => void;
}) {
  const mainTool = toolsByName.get(pdfSegment.mainToolName);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-pie-modal-title"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 id="intro-pie-modal-title" className="text-lg font-bold text-brand-700 dark:text-brand-300">
            Promptų anatomija – {pdfSegment.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Uždaryti"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6 text-sm">
          <section>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1. Top 5 patarimai</h3>
            <ol className="list-decimal list-inside space-y-1.5 text-gray-700 dark:text-gray-300">
              {pdfSegment.top5Tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ol>
          </section>
          <section>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2. Įrankiai</h3>
            {mainTool && (
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Pagrindinis:</strong>{' '}
                <a href={mainTool.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 underline">
                  {mainTool.name}
                </a>
                {' – '}{mainTool.description}
              </p>
            )}
            <ul className="list-disc list-inside space-y-0.5 text-gray-600 dark:text-gray-400">
              {pdfSegment.additionalToolNames.map((name) => {
                const t = toolsByName.get(name);
                return t ? (
                  <li key={name}>
                    <a href={t.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 underline">
                      {t.name}
                    </a>
                  </li>
                ) : null;
              })}
            </ul>
          </section>
          <section>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">3. Workflow</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {pdfSegment.workflowSteps.join(' → ')}
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">4. Svarbios sąvokos</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              {pdfSegment.glossaryTermNames.map((termName) => {
                const g = glossaryByTerm.get(termName);
                return g ? (
                  <li key={g.term}>
                    <strong>{g.term}</strong> – {g.definition}
                  </li>
                ) : null;
              })}
            </ul>
          </section>
          <section>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">5. Sisteminis promptas</h3>
            <p className="text-gray-700 dark:text-gray-300 italic">{pdfSegment.systemPrompt}</p>
          </section>
          <section className="rounded-xl bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500 p-4">
            <p className="font-semibold text-accent-800 dark:text-accent-200 mb-1">Palinkėjimas</p>
            <p className="text-gray-700 dark:text-gray-300">{pdfSegment.motivationWish}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export interface IntroActionPieSlideProps {
  content: IntroActionPieContent;
}

export function IntroActionPieSlide({ content }: IntroActionPieSlideProps) {
  const { locale } = useLocale();
  const pdfContent = useMemo(() => getIntroPiePdfContent(locale), [locale]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const segments = content.segments ?? [];
  const ctaLabel = content.ctaReveal ?? 'Parodyk 2026 duomenis';
  const ctaEnabled = selectedIndex !== null;

  if (segments.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-400">
        Skaidrės duomenų nėra.
      </div>
    );
  }

  const useCardDeck = Array.isArray(content.cards) && content.cards.length === segments.length;

  if (!revealed) {
    return (
      <div className="space-y-6">
        <h2 id="intro-pie-question" className="sr-only">
          {content.question}
        </h2>
        {content.introHook && (
          <p className="text-center text-brand-600 dark:text-brand-400 text-sm font-medium max-w-xl mx-auto">
            {content.introHook}
          </p>
        )}
        <div
          className={`grid gap-3 sm:gap-4 ${useCardDeck ? 'sm:grid-cols-2' : 'sm:grid-cols-2'}`}
          role="radiogroup"
          aria-labelledby="intro-pie-question"
        >
          {segments.map((seg, idx) => {
            const card = useCardDeck ? content.cards![idx] : null;
            const isSelected = selectedIndex === idx;
            return (
              <label
                key={idx}
                className={`flex rounded-2xl border-2 cursor-pointer transition-all ${
                  useCardDeck
                    ? `p-4 sm:p-5 flex-col sm:flex-row sm:items-center gap-3 min-h-[4rem] ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 shadow-md'
                          : 'border-gray-200 dark:border-gray-700 hover:border-brand-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`
                    : `flex-row items-center gap-3 p-3 ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-brand-300'
                      }`
                }`}
              >
                <input
                  type="radio"
                  name="intro-pie-choice"
                  value={idx}
                  checked={isSelected}
                  onChange={() => setSelectedIndex(idx)}
                  className="sr-only"
                  aria-describedby={`intro-pie-option-${idx}`}
                />
                {useCardDeck && card ? (
                  <>
                    <span
                      className={`flex-shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${ICON_BG[segments[idx]?.colorKey ?? 'brand'] ?? ICON_BG.brand}`}
                      aria-hidden="true"
                    >
                      {(() => {
                        const IconC = getIntroPieIcon(card.icon);
                        return IconC ? <IconC className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} /> : <span className="text-xl sm:text-2xl leading-none">{card.icon}</span>;
                      })()}
                    </span>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <span id={`intro-pie-option-${idx}`} className="text-base font-semibold text-gray-900 dark:text-white block">
                        {card.title}
                      </span>
                      {card.description && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">
                          {card.description}
                        </span>
                      )}
                    </div>
                    <span
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'border-brand-500 bg-brand-500 text-white' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : null}
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'border-brand-500 bg-brand-500 text-white' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected ? <Check className="w-3 h-3 stroke-[2.5]" /> : null}
                    </span>
                    <span id={`intro-pie-option-${idx}`} className="text-gray-700 dark:text-gray-300 text-sm">
                      {seg.label}
                    </span>
                  </>
                )}
              </label>
            );
          })}
        </div>
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setRevealed(true)}
            disabled={!ctaEnabled}
            aria-disabled={!ctaEnabled}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${
              ctaEnabled
                ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white hover:shadow-xl focus:ring-accent-400 cursor-pointer'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
            aria-label={ctaLabel}
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  const selectedIdx = selectedIndex ?? null;
  const selectedSegment = selectedIdx !== null ? segments[selectedIdx] : null;
  const selectedCard = selectedIdx !== null && useCardDeck ? content.cards?.[selectedIdx] : null;
  const displayLabel = selectedCard?.title ?? selectedSegment?.label ?? null;
  const insight = selectedIdx !== null ? content.revealInsights?.[selectedIdx] : undefined;

  const getBarIcon = (index: number) => getIntroPieIcon(content.cards?.[index]?.icon);
  const getIconBg = (colorKey?: string) => ICON_BG[colorKey ?? 'brand'] ?? ICON_BG.brand;

  return (
    <div className="space-y-6">
      {/* Tavo pasirinkimas – kompaktiškai */}
      {displayLabel && (
        <div
          className="rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm px-4 py-3 text-center"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-medium text-brand-800 dark:text-brand-200">
            Tu pasirinkai: <span className="font-bold">{displayLabel}</span>
          </p>
        </div>
      )}

      {/* Grafikas – balta kortelė, trumpas pavadinimas */}
      <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 text-center">
          2026 m. pasiskirstymas
        </h3>
        <HorizontalBarChartViz
          segments={segments}
          highlightIndex={selectedIdx}
          getIcon={getBarIcon}
          iconBg={getIconBg}
        />
      </div>

      {/* Insight – 2 eilutės su akcentais + mini CTA */}
      {insight && selectedSegment && (
        <div className="rounded-xl border-l-4 border-accent-500 bg-accent-50 dark:bg-accent-900/20 p-4 space-y-3">
          {(insight.line1 ?? insight.line2) ? (
            <>
              {insight.line1 && (
                <p className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">
                  {insight.line1}
                </p>
              )}
              {insight.line2 && (
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-snug">
                  {insight.line2}
                </p>
              )}
              {insight.ctaLabel && (
                <p className="pt-1">
                  {insight.ctaHref ? (
                    <a
                      href={insight.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-600 dark:text-brand-400 font-medium text-sm underline underline-offset-2 hover:text-brand-700 dark:hover:text-brand-300"
                    >
                      {insight.ctaLabel}
                    </a>
                  ) : (
                    <span className="text-brand-600 dark:text-brand-400 font-medium text-sm">
                      {insight.ctaLabel}
                    </span>
                  )}
                </p>
              )}
            </>
          ) : (
            <>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Ką tai reiškia tau?</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Tu patenki į <span className="font-semibold">{selectedSegment.value}%</span>{' '}
                {insight.segmentPhrase ?? selectedSegment.label.toLowerCase()} segmentą.
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{insight.insight}</p>
              <p className="text-gray-800 dark:text-gray-200 text-sm">
                👉 Klausimas tau: {insight.question}
              </p>
            </>
          )}
        </div>
      )}

      {/* Action mygtukai po insight */}
      {selectedIdx !== null && (
        <IntroActionPieActions
          segmentIndex={selectedIdx}
          pdfSegment={pdfContent.segments[selectedIdx]}
          locale={locale}
        />
      )}
    </div>
  );
}
