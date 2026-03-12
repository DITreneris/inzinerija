import { BarChart2 } from 'lucide-react';
import { CopyButton, TemplateBlock } from '../../shared';
import type { Slide, AdvancedSlideContent } from '../../../../types/modules';
import { VeiksmoIntroBlock } from './VeiksmoIntroBlock';

export interface AdvancedBlockSlideProps {
  slide?: Slide;
  onRenderTask: () => JSX.Element | null;
}

const TEMP_COLORS = [
  { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-500', text: 'text-blue-900 dark:text-blue-100' },
  { bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-500', text: 'text-emerald-900 dark:text-emerald-100' },
  { bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-500', text: 'text-orange-900 dark:text-orange-100' },
];

const REASONING_COLORS = [
  { bg: 'bg-gray-50 dark:bg-gray-700', text: 'text-gray-900 dark:text-gray-100' },
  { bg: 'bg-brand-50 dark:bg-brand-900/20', text: 'text-brand-900 dark:text-brand-100' },
  { bg: 'bg-violet-50 dark:bg-violet-900/20', text: 'text-violet-900 dark:text-violet-100' },
];

const EXAMPLE_COLORS = [
  { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-500', text: 'text-blue-900 dark:text-blue-100' },
  { bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-500', text: 'text-orange-900 dark:text-orange-100' },
  { bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-500', text: 'text-emerald-900 dark:text-emerald-100' },
];

export function AdvancedBlockSlide({ slide, onRenderTask }: AdvancedBlockSlideProps) {
  const c = slide?.content as AdvancedSlideContent | undefined;
  const intro = c?.veiksmoIntro ?? null;

  return (
    <div className="space-y-6">
      {intro && <VeiksmoIntroBlock content={intro} />}

      {/* Hero */}
      {c?.heroTitle && (
        <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500 p-5 rounded-xl">
          <h3 className="font-bold text-lg mb-2 text-brand-900 dark:text-brand-100">{c.heroTitle}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">{c.heroBody}</p>
        </div>
      )}

      {/* Temperature */}
      {c?.temperatureTitle && (
        <details className="group bg-white dark:bg-gray-800 rounded-xl border-2 border-violet-200 dark:border-violet-800 overflow-hidden">
          <summary className="cursor-pointer list-none flex items-center justify-between p-5 hover:bg-violet-50/50 dark:hover:bg-violet-900/10 transition-colors select-none min-h-[44px]">
            <div className="flex items-center gap-3">
              <span className="text-xl" aria-hidden="true">🌡️</span>
              <h4 className="font-bold text-lg text-violet-900 dark:text-violet-100">{c.temperatureTitle}</h4>
            </div>
            <span className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform text-sm shrink-0">▼</span>
          </summary>
          <div className="px-5 pb-5 space-y-3">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">{c.temperatureScaleLeft}</span>
                <span className="text-gray-600 dark:text-gray-400">{c.temperatureScaleRight}</span>
              </div>
              <div className="w-full h-3 bg-gradient-to-r from-blue-500 via-emerald-500 to-orange-500 rounded-full"></div>
            </div>
            {c.temperatureLevels?.map((lvl, i) => {
              const s = TEMP_COLORS[i] ?? TEMP_COLORS[0];
              return (
                <div key={i} className={`p-3 ${s.bg} rounded-xl border-l-4 ${s.border}`}>
                  <p className={`font-semibold text-sm ${s.text}`}>{lvl.range} | {lvl.label}</p>
                  {lvl.note && <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{lvl.note}</p>}
                </div>
              );
            })}
          </div>
        </details>
      )}

      {/* Reasoning */}
      {c?.reasoningTitle && (
        <details className="group bg-white dark:bg-gray-800 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 overflow-hidden">
          <summary className="cursor-pointer list-none flex items-center justify-between p-5 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors select-none min-h-[44px]">
            <div className="flex items-center gap-3">
              <span className="text-xl" aria-hidden="true">🧠</span>
              <h4 className="font-bold text-lg text-emerald-900 dark:text-emerald-100">{c.reasoningTitle}</h4>
            </div>
            <span className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform text-sm shrink-0">▼</span>
          </summary>
          <div className="px-5 pb-5 space-y-3">
            {c.reasoningLevels?.map((lvl, i) => {
              const s = REASONING_COLORS[i] ?? REASONING_COLORS[0];
              return (
                <div key={i} className={`p-3 ${s.bg} rounded-xl`}>
                  <p className={`font-semibold text-sm ${s.text}`}>{lvl.label}</p>
                  {lvl.note && <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{lvl.note}</p>}
                </div>
              );
            })}
          </div>
        </details>
      )}

      {/* Cheat sheet */}
      {c?.cheatSheetTitle && (
        <details className="group bg-white dark:bg-gray-800 rounded-xl border-2 border-amber-200 dark:border-amber-800 overflow-hidden">
          <summary className="cursor-pointer list-none flex items-center justify-between p-5 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-colors select-none min-h-[44px]">
            <div className="flex items-center gap-3">
              <span className="inline-flex p-2 rounded-lg bg-amber-500/10 dark:bg-amber-500/20">
                <BarChart2 className="w-5 h-5 text-amber-600 dark:text-amber-400" strokeWidth={1.5} />
              </span>
              <h4 className="font-bold text-lg text-amber-900 dark:text-amber-100">{c.cheatSheetTitle}</h4>
            </div>
            <span className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform text-sm shrink-0">▼</span>
          </summary>
          <div className="px-5 pb-5">
            <div className="overflow-x-auto">
              <table className="w-full text-base border-collapse">
                <thead>
                  <tr className="bg-amber-50 dark:bg-amber-900/20">
                    {c.cheatSheetHeaders?.map((h, i) => (
                      <th key={i} className="px-4 py-3.5 text-left border-b border-amber-200 dark:border-amber-800 align-top">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  {c.cheatSheetRows?.map((row, i) => (
                    <tr key={i} className={`border-b border-gray-200 dark:border-gray-700 ${i % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900/50' : ''}`}>
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-3.5 align-top leading-relaxed">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </details>
      )}

      {/* Safe default */}
      {c?.safeDefaultValue && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-5 rounded-xl" role="article">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h4 className="font-bold text-base text-emerald-900 dark:text-emerald-100">✅ SAFE DEFAULT</h4>
            {c.safeDefaultBadge && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200">{c.safeDefaultBadge}</span>
            )}
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg font-mono text-sm inline-block">
            <span className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: c.safeDefaultValue }} />
          </div>
        </div>
      )}

      {/* Examples */}
      {c?.examples && c.examples.length > 0 && (
        <details className="group bg-white dark:bg-gray-800 rounded-xl border-2 border-violet-200 dark:border-violet-800 overflow-hidden">
          <summary className="cursor-pointer list-none flex items-center justify-between p-5 hover:bg-violet-50/50 dark:hover:bg-violet-900/10 transition-colors select-none min-h-[44px]">
            <div className="flex items-center gap-3">
              <span className="text-xl" aria-hidden="true">📋</span>
              <h4 className="font-bold text-lg text-violet-900 dark:text-violet-100">{c.examplesTitle}</h4>
            </div>
            <span className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform text-sm shrink-0">▼</span>
          </summary>
          <div className="px-5 pb-5 space-y-4">
            {c.examples.map((ex, i) => {
              const s = EXAMPLE_COLORS[i] ?? EXAMPLE_COLORS[0];
              const parts = ex.copyText.split('\n\n');
              const paramBlock = parts[0] ?? '';
              const taskBlock = parts.slice(1).join('\n\n');
              const paramLines = paramBlock.split('\n');
              const taskLines = taskBlock.split('\n');
              return (
                <div key={i} className={`p-4 ${s.bg} rounded-lg border-l-4 ${s.border}`}>
                  <p className={`font-semibold text-sm ${s.text} mb-2`}>{ex.icon} {ex.label}</p>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200 relative group/copy">
                    <CopyButton text={ex.copyText} className="absolute top-2 right-2" size="sm" />
                    <div className="pr-8 text-xs">
                      {paramLines.map((line, li) => (
                        <div key={li} className={li === 0 ? 'mb-1' : li === paramLines.length - 1 ? 'mb-2' : ''}>{line}</div>
                      ))}
                      {taskLines.map((line, li) => (
                        <div key={`t${li}`} className={li === 0 ? 'text-gray-500 dark:text-gray-400' : ''}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </details>
      )}

      {/* Common errors */}
      {c?.errors && c.errors.length > 0 && (
        <details className="group bg-red-50 dark:bg-red-900/20 rounded-xl border-l-4 border-red-500 overflow-hidden">
          <summary className="cursor-pointer list-none flex items-center justify-between p-5 hover:bg-red-100/50 dark:hover:bg-red-900/30 transition-colors select-none min-h-[44px]">
            <div className="flex items-center gap-3">
              <span className="text-xl" aria-hidden="true">⚠️</span>
              <h4 className="font-bold text-lg text-red-900 dark:text-red-100">{c.errorsTitle}</h4>
            </div>
            <span className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform text-sm shrink-0">▼</span>
          </summary>
          <div className="px-5 pb-5">
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {c.errors.map((err, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-red-500 mr-2 shrink-0">❌</span>
                  <span>{err}</span>
                </li>
              ))}
            </ul>
          </div>
        </details>
      )}

      {/* Rule block */}
      {c?.ruleTemperatureLabel && (
        <div className="bg-violet-50 dark:bg-violet-900/20 border-l-4 border-violet-500 p-4 rounded-xl flex flex-wrap items-center gap-4" role="article">
          <span className="text-lg" aria-hidden="true">🧩</span>
          <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">Temperature → <span className="text-violet-600 dark:text-violet-400">{c.ruleTemperatureLabel}</span></span>
          <span className="text-gray-400 dark:text-gray-500" aria-hidden="true">|</span>
          <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">Reasoning → <span className="text-violet-600 dark:text-violet-400">{c.ruleReasoningLabel}</span></span>
        </div>
      )}

      {/* Template */}
      {c?.templateValue && (
        <TemplateBlock label={c.templateLabel} template={c.templateValue} />
      )}

      {/* Data-driven sections */}
      {c?.sections?.map((sec, idx) => (
        <details
          key={idx}
          className="group bg-slate-50 dark:bg-slate-800/60 border-l-4 border-slate-400 dark:border-slate-500 rounded-r-xl overflow-hidden"
          open={sec.collapsedByDefault === false}
        >
          <summary className="cursor-pointer list-none flex items-center justify-between p-4 hover:bg-slate-100/80 dark:hover:bg-slate-700/50 transition-colors select-none min-h-[44px]">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{sec.heading}</h4>
            <span className="text-slate-400 dark:text-slate-500 group-open:rotate-180 transition-transform text-sm shrink-0">▼</span>
          </summary>
          <div className="px-4 pb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{sec.body}</p>
          </div>
        </details>
      ))}

      {onRenderTask()}
    </div>
  );
}
