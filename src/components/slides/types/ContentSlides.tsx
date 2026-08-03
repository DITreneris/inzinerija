import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getT } from '../../../i18n';
import {
  CheckCircle,
  Sparkles,
  MessageCircle,
  Lightbulb,
  Layers,
  Repeat,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ArrowRight,
  Copy,
  Wrench,
  BookMarked,
  BookOpen,
  Rocket,
  Trophy,
  Cpu,
  Compass,
  Settings,
  User,
  FileSearch,
} from 'lucide-react';
import { track, trackSpinoffClick } from '../../../utils/analytics';
import { logError } from '../../../utils/logger';
import { getSpinoffCtaIdFromUrl } from '../../../constants/ecosystemUrls';
import { downloadM79HandoutPdf } from '../../../utils/m79HandoutPdf';
import {
  getM79HandoutContent,
  type M79HandoutContent,
} from '../../../data/handoutContentLoader';
import { useLocale } from '../../../contexts/LocaleContext';
import { findJourneyChoiceByStored } from '../../../utils/moduleJourneyFocus';
import {
  hasM9DataReadyBadge,
  isM9KitComplete,
  loadM9KitChecklist,
  saveM9KitChecklist,
} from '../../../utils/m9KitChecklist';
import { CopyButton } from '../shared';
import { TransferAbilityStrip } from '../shared/TransferAbilityStrip';
import { OwnWorkSlot } from '../shared/OwnWorkSlot';
import { HandoutDownloadButton } from '../../HandoutDownloadButton';
import { getColorClasses } from '../utils/colorStyles';
import { getContentBlockVariantClasses } from '../utils/blockVariantClasses';
import { sectionBreakBadgeByAccent } from '../../../utils/moduleIdentity';
import { resolveLucideIcon } from '../../../icons/resolveIcon';
import { SlideLucideIcon } from '../../../icons/SlideLucideIcon';
import SectionDivider from '../../ui/SectionDivider';
import Banner from '../../ui/Banner';
import ChoiceControl from '../../ui/ChoiceControl';
import { typographyClasses } from '../../../design-tokens';
import type { ModuleAccent } from '../../../types/modules';
import type {
  ActionIntroJourneyContent,
  JourneyChoice,
  DefinitionsContent,
  DiModalitiesContent,
  DiModalityGroup,
  PieChartContent,
  IntroActionPieContent as _IntroActionPieContent,
  AiWorkflowContent,
  IntroContent,
  SectionBreakContent,
  HierarchyContent,
  HierarchyBlock,
  ComparisonContent,
  SummaryContent,
  PracticeSummaryContent,
  ProductivityInfographicContent,
  DiParadoxInfographicContent,
  DiParadoxStatTooltip,
  NewsPortalKpiCard as _NewsPortalKpiCard,
  NewsPortalSectionCard as _NewsPortalSectionCard,
  NewsPortalToolsAndYouth as _NewsPortalToolsAndYouth,
  NewsPortalInsightCard as _NewsPortalInsightCard,
} from '../../../types/modules';
import { renderBodyWithBold } from './shared';
import {
  ActionIntroSlide,
  type ActionIntroSlideProps,
} from './content/ActionIntroSlide';
import {
  IntroActionPieSlide,
  type IntroActionPieSlideProps,
} from './content/IntroActionPieSlide';
import { WarmUpQuizSlide } from './content/WarmUpQuizSlide';
import { GlossarySlide } from './content/GlossarySlide';
import { ModuleIntroSlide } from './content/ModuleIntroSlide';
import { PathStepSlide } from './content/PathStepSlide';
import {
  PromptTypesSlide,
  PromptTechniquesSlide,
  WorkflowSummarySlide,
  PromptTemplateSlide,
  TransitionSlide,
} from './content/CatalogSlides';
import { ContentBlockSlide } from './content/ContentBlockSlide';
export { ActionIntroSlide, type ActionIntroSlideProps };
export { ContentBlockSlide };
export { IntroActionPieSlide, type IntroActionPieSlideProps };
export { WarmUpQuizSlide };
export { GlossarySlide };
export { ModuleIntroSlide };
export { PathStepSlide };
export {
  PromptTypesSlide,
  PromptTechniquesSlide,
  WorkflowSummarySlide,
  PromptTemplateSlide,
  TransitionSlide,
};

/* ─── StatWithTooltip – skaičius su custom hover/focus tooltip (DI paradoksas) ─── */
function StatWithTooltip({
  value,
  tooltip,
  className = '',
  colorClass = 'text-brand-600 dark:text-brand-400',
}: {
  value: string;
  tooltip?: DiParadoxStatTooltip;
  className?: string;
  colorClass?: string;
}) {
  const id = tooltip
    ? `stat-tooltip-${value.replace(/\s/g, '-')}-${Math.random().toString(36).slice(2, 9)}`
    : undefined;
  return (
    <span
      className={`group/stat relative inline-flex ${tooltip ? 'cursor-help underline decoration-dotted decoration-brand-400/60 underline-offset-2 rounded py-1 px-1.5 -my-1 -mx-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900' : ''} ${colorClass} ${className}`}
      title={tooltip ? undefined : undefined}
      aria-label={tooltip ? `${value}: ${tooltip.explanation}` : undefined}
      aria-describedby={tooltip ? id : undefined}
      tabIndex={tooltip ? 0 : undefined}
    >
      {value}
      {tooltip && id && (
        <span
          id={id}
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 px-3 py-2 text-xs text-left text-white bg-slate-800 dark:bg-slate-700 rounded-lg shadow-lg opacity-0 invisible group-hover/stat:opacity-100 group-hover/stat:visible group-focus/stat:opacity-100 group-focus/stat:visible transition-opacity duration-150 z-50"
        >
          <span className="block">{tooltip.explanation}</span>
          {tooltip.trend && (
            <span className="mt-1 block text-accent-300 font-medium border-t border-slate-600 pt-1.5">
              Tendencija: {tooltip.trend}
            </span>
          )}
        </span>
      )}
    </span>
  );
}

/* ActionIntroSlide exported from ./content/ActionIntroSlide */

/* ─── Action Intro Journey (Modulio 7) – pasirink savo kelionę, tada CTA tęsti ─── */

export interface ActionIntroJourneySlideProps {
  content: ActionIntroJourneyContent;
  onJourneyComplete?: () => void;
  /** Išsaugotas fokusas (progresas) – stable choice id, atkurti būseną grįžus prie skaidrės */
  savedFocusId?: string | null;
  /** Užduotis jau pažymėta – rodyti patvirtinimą be pakartotinio paspaudimo */
  taskCompleted?: boolean;
  /** Išsaugoti pasirinktą sritį (rodoma juostoje modulyje) */
  onJourneyFocusSave?: (choice: JourneyChoice) => void;
}

export function ActionIntroJourneySlide({
  content,
  onJourneyComplete,
  savedFocusId = null,
  taskCompleted = false,
  onJourneyFocusSave,
}: ActionIntroJourneySlideProps) {
  useTranslation();
  const t = getT('contentSlides');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const [selected, setSelected] = useState<JourneyChoice | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const journeyHeading = content.journeyHeading ?? t('journeyHeading');
  const confirmMessage = content.confirmMessage ?? t('journeyConfirmMessage');
  const ctaContinue = content.ctaContinue ?? t('journeyStartCta');

  useEffect(() => {
    if (!taskCompleted || !savedFocusId) return;
    const match = findJourneyChoiceByStored(
      content.journeyChoices,
      savedFocusId
    );
    if (match) setSelected(match);
    setConfirmed(true);
  }, [taskCompleted, savedFocusId, content.journeyChoices]);

  const handleConfirm = () => {
    if (selected) onJourneyFocusSave?.(selected);
    setConfirmed(true);
    onJourneyComplete?.();
  };

  return (
    <div className="space-y-6">
      {/* Hero – tamsus, provokuojantis */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 dark:from-gray-950 dark:via-brand-950 dark:to-gray-950 p-6 sm:p-8 lg:p-10 text-white">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-3 right-5 text-8xl sm:text-9xl font-extrabold leading-none select-none">
            ?
          </div>
          <div className="absolute bottom-3 left-5 text-8xl sm:text-9xl font-extrabold leading-none select-none">
            !
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center text-center gap-3 sm:gap-4 max-w-lg mx-auto">
          {content.whyBenefit && (
            <p
              className={`${typographyClasses.body} text-brand-200 dark:text-brand-300 font-medium leading-snug max-w-md`}
            >
              {content.whyBenefit}
            </p>
          )}
          <h2
            className={`${typographyClasses.h2} tracking-tight leading-tight`}
          >
            {content.heroStat}
            <br />
            <span className="bg-gradient-to-r from-brand-300 to-accent-300 bg-clip-text text-transparent">
              {content.heroText}
            </span>
          </h2>
          {content.heroSubText && (
            <p
              className={`${typographyClasses.body} text-gray-400 dark:text-gray-500 font-medium max-w-sm`}
            >
              {content.heroSubText}
            </p>
          )}
        </div>
      </div>

      {/* Kelionės pasirinkimas – ChoiceControl */}
      <ChoiceControl
        className="animate-fade-in"
        legend={journeyHeading}
        columns={3}
        size="comfortable"
        value={selected?.id ?? null}
        onChange={(id) => {
          const choice = content.journeyChoices.find((c) => c.id === id);
          if (!choice) return;
          setSelected(choice);
          if (confirmed && choice.id !== selected?.id) {
            setConfirmed(false);
          }
        }}
        options={content.journeyChoices.map((choice) => ({
          id: choice.id,
          label: choice.label,
          description: choice.subtitle,
          icon: resolveLucideIcon(choice.icon, 'journey') ?? Compass,
        }))}
      />

      {/* Patvirtinimas + CTA po pasirinkimo */}
      {selected && !confirmed && (
        <div className="animate-slide-in rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 p-5 sm:p-6">
          <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
            {confirmMessage.replace('{label}', selected.label)}
          </p>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-bold shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-accent-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2"
          >
            <Rocket className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <span>{ctaContinue}</span>
            <ArrowRight className="w-5 h-5 flex-shrink-0" />
          </button>
        </div>
      )}

      {confirmed && (
        <div className="animate-fade-in flex items-center gap-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700 px-4 py-3">
          <CheckCircle
            className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
            {isEn
              ? 'Journey selected. You can move to the next slide — or pick another card for a different focus.'
              : 'Kelionė pasirinkta. Gali pereiti prie kitos skaidrės – arba pasirink kitą kortelę kitam fokusui.'}
          </p>
        </div>
      )}
    </div>
  );
}

// Survives remounts so "Atidaryti visus" / "Suskleisti visus" state is restored when ContentBlockSlide remounts.
/* ContentBlockSlide + premium/collapsible helpers -> ./content/ContentBlockSlide.tsx */

const sectionBreakColorMap = {
  brand: {
    heroBg: 'bg-brand-800 dark:bg-brand-900',
    heroBorder: 'border-brand-700 dark:border-brand-600',
    badge:
      'bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300',
    pill: 'bg-brand-100 dark:bg-brand-800/50 text-brand-800 dark:text-brand-100 border-brand-300 dark:border-brand-600',
    footerBg:
      'bg-brand-700 dark:bg-brand-800 border-brand-700 dark:border-brand-600',
    progressBar: 'bg-brand-600 dark:bg-brand-400',
    kasToliau: 'border-brand-500',
  },
  emerald: {
    heroBg: 'bg-emerald-800 dark:bg-emerald-900',
    heroBorder: 'border-emerald-700 dark:border-emerald-600',
    badge:
      'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
    pill: 'bg-emerald-100 dark:bg-emerald-800/50 text-emerald-800 dark:text-emerald-100 border-emerald-300 dark:border-emerald-600',
    footerBg:
      'bg-emerald-700 dark:bg-emerald-800 border-emerald-700 dark:border-emerald-600',
    progressBar: 'bg-emerald-600 dark:bg-emerald-400',
    kasToliau: 'border-emerald-500',
  },
  violet: {
    heroBg: 'bg-violet-800 dark:bg-violet-900',
    heroBorder: 'border-violet-700 dark:border-violet-600',
    badge:
      'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
    pill: 'bg-violet-100 dark:bg-violet-800/50 text-violet-800 dark:text-violet-100 border-violet-300 dark:border-violet-600',
    footerBg:
      'bg-violet-700 dark:bg-violet-800 border-violet-700 dark:border-violet-600',
    progressBar: 'bg-violet-600 dark:bg-violet-400',
    kasToliau: 'border-violet-500',
  },
} as const;

export function SectionBreakSlide({
  content,
  moduleAccent,
  moduleId,
  slideId,
  onGoToGlossaryTerm,
  onNextSlide,
}: {
  content?: SectionBreakContent | null;
  /** DS v0.2 E5 — sectionNumber badge only; hero lieka heroColorKey. */
  moduleAccent?: ModuleAccent;
  moduleId?: number;
  slideId?: number | string;
  onGoToGlossaryTerm?: (term: string) => void;
  /** Modulio vaizdas: „Toliau – skaidrė N…“ juosta veda į kitą skaidrę (kaip „Tęsti“). */
  onNextSlide?: () => void;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  if (!content) return null;
  const hck = content.heroColorKey ?? 'brand';
  const colors = sectionBreakColorMap[hck] ?? sectionBreakColorMap.brand;
  const sectionBadgeClass = moduleAccent
    ? sectionBreakBadgeByAccent[moduleAccent]
    : colors.badge;
  const hasRecap = content.recap?.items?.length;
  const hasNextSteps = (content.nextSteps?.length ?? 0) > 0;
  const hasSubtitle = Boolean(content.subtitle);
  const showKasToliau = hasNextSteps || hasSubtitle;

  const recapIconList =
    content.recap?.items?.length === 3
      ? [Settings, User, Repeat]
      : content.recap?.items?.length === 5
        ? [Settings, User, Repeat, Wrench, Cpu]
        : content.recap?.items?.length === 7
          ? [Settings, User, Repeat, Wrench, Cpu, FileSearch, Layers]
          : [Layers, Settings, User, Repeat];
  const recapIcons = recapIconList;

  const pillLabels = t('sectionBreakPillLabels3').split('|');
  const pillIcons = [Settings, User, Repeat] as const;
  const pillLabels5 = t('sectionBreakPillLabels5').split('|');
  const pillIcons5 = [Settings, User, Repeat, Wrench, Cpu] as const;
  const pillLabels7 = t('sectionBreakPillLabels7').split('|');
  const pillIcons7 = [
    Settings,
    User,
    Repeat,
    Wrench,
    Cpu,
    FileSearch,
    Layers,
  ] as const;
  const itemsLength = content.recap?.items?.length ?? 0;
  const progressTotal = content.recap?.progressTotal ?? itemsLength;
  const showPills =
    content.celebrationText &&
    ((itemsLength === 3 && progressTotal === 7) ||
      itemsLength === 5 ||
      itemsLength === 7 ||
      (itemsLength === 5 && progressTotal === 7));
  const pillsCount = showPills
    ? itemsLength === 5 && progressTotal === 7
      ? 7
      : itemsLength
    : 0;
  const getPillLabel = (i: number) =>
    (i < 7
      ? itemsLength === 7
        ? pillLabels7[i]
        : itemsLength === 5 && progressTotal === 7
          ? pillLabels7[i]
          : itemsLength === 5
            ? pillLabels5[i]
            : pillLabels[i]
      : null) ?? 'Item';
  const getPillIcon = (i: number) =>
    (i < 7
      ? itemsLength === 7
        ? pillIcons7[i]
        : itemsLength === 5 && progressTotal === 7
          ? pillIcons7[i]
          : itemsLength === 5
            ? pillIcons5[i]
            : pillIcons[i]
      : null) ?? Layers;
  const isPillUpcoming = (i: number) =>
    itemsLength === 5 && progressTotal === 7 && i >= 5;

  const footerShell = `rounded-lg border-2 ${colors.footerBg} p-3 text-left`;
  const footerNavBlock = !content.footer ? null : onNextSlide ? (
    <button
      type="button"
      onClick={onNextSlide}
      className={`w-full ${footerShell} transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 cursor-pointer min-h-[44px]`}
      aria-label={content.footer}
    >
      <span className="text-xs font-semibold text-white flex items-center gap-2">
        <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden />
        {content.footer}
      </span>
    </button>
  ) : (
    <section className={footerShell} aria-label={t('nextStepAria')}>
      <p className="text-xs font-semibold text-white flex items-center gap-2">
        <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden />
        {content.footer}
      </p>
    </section>
  );

  if (hasRecap) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 px-4 py-6">
        <div className="flex flex-col items-center text-center">
          {content.sectionNumber && (
            <span
              className={`inline-block px-4 py-1.5 rounded-full ${sectionBadgeClass} font-semibold text-sm mb-4`}
            >
              {content.sectionNumber}
            </span>
          )}
          {!content.celebrationText && (
            <h2
              className={`${typographyClasses.h2} text-gray-900 dark:text-white`}
            >
              {content.title}
            </h2>
          )}
          {content.celebrationText && (
            <div
              className={`mt-1 relative flex flex-col sm:flex-row items-center justify-center gap-2 rounded-2xl border-2 ${colors.heroBorder} ${colors.heroBg} pl-4 pr-36 sm:pr-32 py-4 text-left w-full`}
              role="region"
              aria-label={t('sectionCompleteAria')}
            >
              <div className="flex items-center gap-4 w-full flex-wrap sm:flex-nowrap">
                <Sparkles
                  className="w-6 h-6 flex-shrink-0 text-accent-300 dark:text-accent-400 opacity-90"
                  aria-hidden
                />
                <h2 className={`${typographyClasses.h2} m-0 max-w-md`}>
                  {(() => {
                    const text =
                      typeof content.celebrationText === 'string'
                        ? content.celebrationText
                        : String(content.celebrationText ?? '');
                    const idx = text.indexOf('! ');
                    if (idx !== -1) {
                      const exclamation = text.slice(0, idx + 1);
                      const rest = text.slice(idx + 2);
                      return (
                        <span className="flex flex-col">
                          <span
                            className={`${typographyClasses.h2} text-accent-300 dark:text-accent-400 mb-1.5 leading-tight`}
                          >
                            {exclamation}
                          </span>
                          <span className="font-semibold text-white dark:text-brand-100 leading-[1.2] tracking-[-0.01em]">
                            {rest}
                          </span>
                        </span>
                      );
                    }
                    return (
                      <span className="font-bold text-white dark:text-brand-100">
                        {text}
                      </span>
                    );
                  })()}
                </h2>
              </div>
              {(content.recap?.items?.length === 3 ||
                content.recap?.items?.length === 5 ||
                content.recap?.items?.length === 7) &&
                (() => {
                  const total =
                    content.recap?.progressTotal ??
                    content.recap?.items?.length ??
                    0;
                  const current = content.recap?.items?.length ?? 0;
                  const pct = total > 0 ? (current / total) * 100 : 0;
                  return (
                    <div
                      className="absolute top-4 right-5 flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 pt-2.5 pb-0 min-w-[5.5rem] leading-[1.35] overflow-hidden shadow-md dark:border-slate-600 dark:bg-slate-800/90 dark:shadow-lg"
                      role="status"
                      aria-label={`${current} ${isEn ? 'of' : 'iš'} ${total}`}
                    >
                      <span className="text-xl font-semibold tabular-nums text-brand-700 dark:text-brand-300 tracking-[-0.02em]">
                        {current}/{total}
                      </span>
                      <div
                        className="w-full mt-2 h-1 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-500"
                        role="presentation"
                      >
                        <div
                          className={`h-full rounded-full ${colors.progressBar}`}
                          style={{
                            width: `${pct}%`,
                            minWidth: pct > 0 ? `${pct}%` : '0',
                          }}
                        />
                      </div>
                    </div>
                  );
                })()}
            </div>
          )}
        </div>

        {showPills && pillsCount > 0 && (
          <div
            className="flex flex-wrap gap-3 justify-center"
            role="list"
            aria-label={
              isEn
                ? 'Prompt types \u2013 glossary references'
                : 'Promptų tipai \u2013 žodyno nuorodos'
            }
          >
            {Array.from({ length: pillsCount }, (_, i) => {
              const Icon = getPillIcon(i);
              const label = getPillLabel(i);
              const term = content.recap?.itemGlossaryTerms?.[i];
              const isLink = Boolean(term && onGoToGlossaryTerm);
              const upcoming = isPillUpcoming(i);
              const pillStyle = upcoming
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600'
                : colors.pill;
              const baseClass = `inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-lg ${pillStyle} text-sm font-semibold border-2`;
              const linkClass =
                ' focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 hover:text-brand-700 dark:hover:text-brand-200 hover:underline underline-offset-2 cursor-pointer';
              const numCircleClass = upcoming
                ? 'bg-blue-500 text-white'
                : 'bg-brand-500 text-white';
              const iconClass = upcoming
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-brand-600 dark:text-brand-400';
              if (isLink && term) {
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onGoToGlossaryTerm?.(term)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onGoToGlossaryTerm?.(term);
                      }
                    }}
                    className={baseClass + linkClass}
                    aria-label={`${isEn ? 'Open glossary' : 'Atidaryti žodynėlį'}: ${term}`}
                  >
                    <span
                      className={`flex items-center justify-center w-5 h-5 rounded-full ${numCircleClass} text-xs font-bold`}
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${iconClass} shrink-0`}
                      aria-hidden
                    />
                    {label}
                    <BookOpen
                      className={`w-3.5 h-3.5 ${iconClass} shrink-0 opacity-80`}
                      aria-hidden
                    />
                  </button>
                );
              }
              return (
                <span key={i} className={baseClass}>
                  <span
                    className={`flex items-center justify-center w-5 h-5 rounded-full ${numCircleClass} text-xs font-bold`}
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <Icon className={`w-4 h-4 ${iconClass}`} aria-hidden />
                  {label}
                </span>
              );
            })}
          </div>
        )}

        <Banner
          variant="success"
          className="pl-4 pr-3 py-3 text-left bg-slate-100 dark:bg-slate-800/60 border-emerald-500"
          ariaLabel={content.recap?.heading ?? ''}
        >
          <h3 className="font-bold text-sm mb-1.5 text-gray-900 dark:text-white">
            {content.recap?.heading}
          </h3>
          {content.recap?.lead && (
            <p className="text-xs text-gray-600 dark:text-gray-300 italic mb-2 leading-relaxed">
              {content.recap.lead}
            </p>
          )}
          <ul className="space-y-2" role="list">
            {(content.recap?.items ?? []).map((item, idx) => {
              const TermIcon = recapIcons[idx % recapIcons.length];
              const term = content.recap?.itemGlossaryTerms?.[idx];
              const hasGlossaryLink = Boolean(term && onGoToGlossaryTerm);
              const termStart =
                hasGlossaryLink && term ? item.indexOf(term) : -1;
              const hasTermInItem = termStart >= 0;
              const before = hasTermInItem ? item.slice(0, termStart) : '';
              const after =
                hasTermInItem && term
                  ? item.slice(termStart + term.length)
                  : '';
              return (
                <li
                  key={idx}
                  className="flex items-start gap-3 pl-3 border-l-4 border-emerald-500 animate-fade-in"
                  style={{
                    animationDelay: `${idx * 80}ms`,
                    animationFillMode: 'backwards',
                  }}
                  role="listitem"
                >
                  {hasGlossaryLink && term ? (
                    <button
                      type="button"
                      onClick={() => onGoToGlossaryTerm?.(term)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onGoToGlossaryTerm?.(term);
                        }
                      }}
                      className="flex-shrink-0 mt-0.5 p-0.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                      aria-label={`${isEn ? 'Open glossary' : 'Atidaryti žodynėlį'}: ${term}`}
                    >
                      <TermIcon className="w-4 h-4" aria-hidden />
                    </button>
                  ) : (
                    <TermIcon
                      className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5"
                      aria-hidden
                    />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {hasTermInItem && term ? (
                      <>
                        {before}
                        <button
                          type="button"
                          onClick={() => onGoToGlossaryTerm!(term)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onGoToGlossaryTerm!(term);
                            }
                          }}
                          className="font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded align-baseline"
                          aria-label={`${isEn ? 'Open glossary' : 'Atidaryti žodynėlį'}: ${term}`}
                        >
                          {term}
                        </button>
                        {after}
                      </>
                    ) : (
                      item
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </Banner>

        {showKasToliau && (
          <Banner
            variant="info"
            className={`py-2 pl-3 border-l-4 ${colors.kasToliau}`}
            ariaLabel={isEn ? 'What\u2019s next' : 'Kas toliau'}
          >
            <h3 className="font-bold text-sm mb-1 text-gray-900 dark:text-white">
              {isEn ? 'What\u2019s next' : 'Kas toliau'}
            </h3>
            {hasNextSteps ? (
              <ul className="space-y-0.5 text-xs text-gray-700 dark:text-gray-300 list-disc list-inside">
                {(content.nextSteps ?? []).map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-700 dark:text-gray-300">
                {content.subtitle}
              </p>
            )}
          </Banner>
        )}

        {footerNavBlock}

        {content.spinoffCta && (
          <a
            href={content.spinoffCta.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (moduleId != null) {
                trackSpinoffClick({
                  module_id: moduleId,
                  slide_id: slideId,
                  url: content.spinoffCta!.url,
                  cta_id: getSpinoffCtaIdFromUrl(content.spinoffCta!.url),
                  cta_label: content.spinoffCta!.label,
                });
              }
            }}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl border-2 border-accent-400 dark:border-accent-500 bg-transparent text-accent-700 dark:text-accent-300 font-semibold text-sm shadow-sm hover:bg-accent-50 dark:hover:bg-accent-900/20 hover:border-accent-500 dark:hover:border-accent-400 hover:shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            aria-label={`${content.spinoffCta.label} (${isEn ? 'opens in a new tab' : 'atidaroma naujame lange'})`}
          >
            <Sparkles className="w-4 h-4 flex-shrink-0" aria-hidden />
            <ExternalLink className="w-4 h-4 flex-shrink-0" aria-hidden />
            {content.spinoffCta.label}
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[280px] text-center px-4 py-8 w-full">
      {content.sectionNumber && (
        <span
          className={`inline-block px-4 py-1.5 rounded-full ${sectionBadgeClass} font-semibold text-sm mb-4`}
        >
          {content.sectionNumber}
        </span>
      )}
      <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
        {content.title}
      </h2>
      {content.subtitle && (
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-xl">
          {content.subtitle}
        </p>
      )}
      {footerNavBlock ? (
        <div className="w-full max-w-3xl mx-auto mt-8 self-stretch text-left">
          {footerNavBlock}
        </div>
      ) : null}
    </div>
  );
}

/* WarmUpQuizSlide -> ./content/WarmUpQuizSlide.tsx */

/* GlossarySlide -> ./content/GlossarySlide.tsx */

/* ModuleIntroSlide -> ./content/ModuleIntroSlide.tsx */

function getDefaultIntro(locale: string): IntroContent {
  const isEn = locale === 'en';
  return {
    aboutText: isEn
      ? 'This training will help you create effective prompts that produce consistent, professional results. You will learn a hierarchical structure that transforms chaotic AI communication into a systematic and manageable process.'
      : 'Šis mokymas padės jums kurti efektyvius promptus, kurie duoda nuoseklius, profesionalius rezultatus. Išmoksite hierarchinę struktūrą, kuri paverčia chaotišką DI komunikaciją sistemingu ir valdomu procesu.',
    tools: [
      { name: 'ChatGPT (OpenAI)', url: 'https://chat.openai.com' },
      { name: 'Claude (Anthropic)', url: 'https://claude.ai' },
      { name: 'Gemini (Google)', url: 'https://gemini.google.com' },
      { name: 'Copilot (Microsoft)', url: 'https://copilot.microsoft.com' },
      { name: 'Grok (xAI)', url: 'https://grok.x.ai' },
    ],
    outcomes: isEn
      ? [
          'Structure prompts professionally',
          'Get predictable results',
          'Save time and resources',
        ]
      : [
          'Struktūruoti promptus profesionaliai',
          'Gauti nuspėjamus rezultatus',
          'Taupyti laiką ir išteklius',
        ],
    toolsTip: isEn
      ? 'The training focuses on prompt structure, so the same principles apply across different tools.'
      : 'Mokymuose dėmesys skiriamas promptų struktūrai, todėl tie patys principai veikia skirtinguose įrankiuose.',
    tip: isEn
      ? 'Think of one business task you would like to automate or improve using AI. We will use this example throughout the training.'
      : 'Pagalvokite apie vieną verslo užduotį, kurią norėtumėte automatizuoti ar pagerinti naudojant DI. Šį pavyzdį naudosime viso mokymo metu.',
  };
}

export interface IntroSlideProps {
  content?: IntroContent | null;
}
export function IntroSlide({ content: contentProp }: IntroSlideProps) {
  useTranslation();
  const t = getT('contentSlides');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const content = contentProp ?? getDefaultIntro(locale);
  return (
    <div className="space-y-6">
      <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-brand-900 dark:text-brand-100">
          {isEn ? 'About this training' : 'Apie šį mokymą'}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {content.aboutText}
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-amber-900 dark:text-amber-100 flex items-center gap-2">
          <span className="text-2xl">🛠️</span>{' '}
          {isEn ? 'Which AI tools to use?' : 'Kokius DI įrankius naudoti?'}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {t('practiceTasksHint')}
        </p>
        <div className="mb-4">
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2">
            {isEn ? 'Available tools:' : 'Galimi įrankiai:'}
          </p>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {content.tools.map((t, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 mt-1">
                  •
                </span>
                <span>
                  <strong>{t.name}</strong>
                  {t.url && (
                    <>
                      {' '}
                      –{' '}
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-700 dark:text-amber-300 underline hover:text-amber-900 dark:hover:text-amber-100"
                      >
                        {t.url}
                      </a>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {content.toolsTip && (
          <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-900 dark:text-amber-100 flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 mt-0.5">
                🔹
              </span>
              <span>
                <strong>{isEn ? 'Important:' : 'Svarbu:'}</strong>{' '}
                {content.toolsTip}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl">
          <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3">
            {isEn
              ? 'After this training you will be able to:'
              : 'Po šio mokymo galėsite:'}
          </h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            {content.outcomes.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* M-DS2: neutral (slate) vietoj violet – vienas gradientas/akcentas per skaidrę */}
        <div className="bg-slate-50 dark:bg-slate-900/20 p-5 rounded-xl">
          <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3">
            {isEn ? 'Training duration:' : 'Mokymo trukmė:'}
          </h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>• {isEn ? '3 modules' : '3 moduliai'}</li>
            <li>• {isEn ? 'Practical tasks' : 'Praktinės užduotys'}</li>
            <li>• {isEn ? '~45 minutes' : '~45 minučių'}</li>
          </ul>
        </div>
      </div>

      {content.tip && (
        <div className="mt-6 p-5 bg-accent-50 dark:bg-accent-900/20 rounded-xl border-l-4 border-accent-500">
          <p className="text-sm text-accent-900 dark:text-accent-100 leading-relaxed">
            <strong className="block mb-2 flex items-center gap-2">
              <Lightbulb
                className="w-4 h-4 text-accent-600 dark:text-accent-400"
                strokeWidth={1.5}
              />
              {isEn ? 'Practical task:' : 'Praktinė užduotis:'}
            </strong>
            {content.tip}
          </p>
        </div>
      )}
    </div>
  );
}

export function DefinitionsSlide({
  content,
}: {
  content?: DefinitionsContent;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const [showPrompt, setShowPrompt] = useState(false);
  const [showEngineering, setShowEngineering] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const bothRevealed = showPrompt && showEngineering;

  const getAspectIcon = (iconName: string) => {
    const Icon = resolveLucideIcon(iconName, 'aspect') ?? Sparkles;
    return <Icon className="w-6 h-6" />;
  };

  const aspectColors = ['violet', 'brand', 'accent'];

  return (
    <div className="space-y-6">
      {/* ── A) Hook (tamsus, provokuojantis) ── */}
      {content?.contextIntro && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 dark:from-gray-950 dark:via-brand-950 dark:to-gray-950 p-5 sm:p-7 text-white">
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-2 right-4 text-7xl font-extrabold leading-none select-none">
              💬
            </div>
            <div className="absolute bottom-2 left-4 text-7xl font-extrabold leading-none select-none">
              🔧
            </div>
          </div>
          <div className="relative z-10 text-center max-w-md mx-auto">
            <p className="text-base sm:text-lg font-bold leading-snug tracking-tight">
              {content.contextIntro}
            </p>
            {!bothRevealed && (
              <p className="text-xs sm:text-sm text-brand-300/80 mt-2 font-medium">
                {t('clickCardsHint')}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Optional hero/comparison images ── */}
      {(content?.heroImage || content?.comparisonImage) && (
        <div
          className={
            content?.comparisonImage
              ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
              : 'flex justify-center'
          }
        >
          {content?.heroImage && (
            <div className="flex flex-col items-center gap-2">
              <img
                src={content.heroImage}
                alt={content.heroImageLabel || t('definitionsHeroImageAlt')}
                className="w-full h-auto rounded-xl border border-gray-200 dark:border-gray-700 object-contain max-h-64"
              />
              {content.comparisonImage && content.heroImageLabel && (
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {content.heroImageLabel}
                </p>
              )}
            </div>
          )}
          {content?.comparisonImage && (
            <div className="flex flex-col items-center gap-2">
              <img
                src={content.comparisonImage}
                alt={
                  content.comparisonImageLabel ||
                  t('definitionsComparisonImageAlt')
                }
                className="w-full h-auto rounded-xl border border-gray-200 dark:border-gray-700 object-contain max-h-64"
              />
              {content?.comparisonImageLabel && (
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {content.comparisonImageLabel}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── B) Dvi interaktyvios kortelės ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Kortelė 1: Promptas */}
        <button
          onClick={() => setShowPrompt(true)}
          disabled={showPrompt}
          className={`text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
            showPrompt
              ? 'border-brand-300 dark:border-brand-700 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-900/30 cursor-default'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand-300 dark:hover:border-brand-600 hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2.5 rounded-xl flex-shrink-0 transition-colors duration-300 ${
                  showPrompt
                    ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                }`}
              >
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {t('promptCardTitle')}
                </h3>
                {!showPrompt && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('clickToFindOut')}
                  </p>
                )}
              </div>
              {!showPrompt && (
                <ArrowRight
                  className="w-5 h-5 text-gray-400 ml-auto flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </div>
            {showPrompt && (
              <div className="animate-fade-in">
                <div className="border-l-4 border-brand-500 pl-4">
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {content?.promptDefinition}
                  </p>
                </div>
              </div>
            )}
          </div>
        </button>

        {/* Kortelė 2: Promptų Inžinerija */}
        <button
          onClick={() => setShowEngineering(true)}
          disabled={showEngineering}
          className={`text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
            showEngineering
              ? 'border-accent-300 dark:border-accent-700 bg-gradient-to-br from-accent-50 to-brand-50 dark:from-accent-900/20 dark:to-brand-900/20 cursor-default'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-accent-300 dark:hover:border-accent-600 hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2.5 rounded-xl flex-shrink-0 transition-colors duration-300 ${
                  showEngineering
                    ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                }`}
              >
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {t('engineeringCardTitle')}
                </h3>
                {!showEngineering && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('clickToFindOut')}
                  </p>
                )}
              </div>
              {!showEngineering && (
                <ArrowRight
                  className="w-5 h-5 text-gray-400 ml-auto flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </div>
            {showEngineering && (
              <div className="animate-fade-in">
                <div className="border-l-4 border-accent-500 pl-4 mb-4">
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {content?.engineeringDefinition}
                  </p>
                </div>
              </div>
            )}
          </div>
        </button>
      </div>

      {/* ── 3 Dedamosios (rodomi po Inžinerijos atskleidimo) ── */}
      {showEngineering && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-slide-in">
          {(content?.aspects ?? []).map((aspect, idx) => {
            const color = aspectColors[idx] || 'brand';
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border-2 bg-${color === 'accent' ? 'accent' : color}-50 dark:bg-${color === 'accent' ? 'accent' : color}-900/20 border-${color === 'accent' ? 'accent' : color}-200 dark:border-${color === 'accent' ? 'accent' : color}-800`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`p-1.5 rounded-lg bg-${color === 'accent' ? 'accent' : color}-100 dark:bg-${color === 'accent' ? 'accent' : color}-900/30 text-${color === 'accent' ? 'accent' : color}-600 dark:text-${color === 'accent' ? 'accent' : color}-400`}
                  >
                    {getAspectIcon(aspect.icon)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded-full bg-${color === 'accent' ? 'accent' : color}-200 dark:bg-${color === 'accent' ? 'accent' : color}-800 text-${color === 'accent' ? 'accent' : color}-700 dark:text-${color === 'accent' ? 'accent' : color}-300`}
                    >
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                      {aspect.title}
                    </h4>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-2">
                  {aspect.description}
                </p>
                <div className="bg-white dark:bg-gray-900/50 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                      {t('example')}
                    </p>
                    <CopyButton text={aspect.example} size="sm" />
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 italic leading-relaxed">
                    {aspect.example}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── C) Key Insight (rodomas kai abu terminai atskleisti) ── */}
      {bothRevealed && (
        <div className="animate-bounce-in">
          <div className="bg-gradient-to-r from-brand-500 to-accent-500 p-5 sm:p-6 rounded-2xl text-white text-center shadow-lg shadow-brand-500/20">
            <p className="text-base sm:text-lg font-bold flex items-center justify-center gap-2 leading-snug">
              <Sparkles className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span>{content?.keyInsight}</span>
              <Sparkles className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            </p>
          </div>
        </div>
      )}

      {/* ── Šaltiniai (collapsible) ── */}
      {content?.sources && content.sources.length > 0 && bothRevealed && (
        <div className="animate-fade-in">
          <button
            onClick={() => setShowSources(!showSources)}
            className="flex items-center gap-2 text-xs font-semibold text-brand-700 dark:text-brand-300 hover:text-brand-800 dark:hover:text-brand-200 transition-colors min-h-[44px]"
            aria-expanded={showSources}
          >
            <span>
              {isEn ? 'Sources and guidelines' : 'Šaltiniai ir gairės'}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${showSources ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
          {showSources && (
            <div className="mt-2 text-xs text-brand-700 dark:text-brand-300 space-y-1 animate-fade-in">
              {content.sources.map((source, idx) => (
                <div key={idx}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-brand-900 dark:hover:text-brand-100"
                  >
                    {source.label}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DiModalityCard({
  group,
  idx,
}: {
  group: DiModalityGroup;
  idx: number;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  return (
    <article
      key={idx}
      className="relative bg-white dark:bg-slate-800/80 pl-5 pr-5 py-5 rounded-2xl border border-slate-200 dark:border-slate-700 border-l-4 border-l-brand-500 dark:border-l-brand-400 shadow-sm hover:shadow-lg hover:border-brand-200 dark:hover:border-brand-700 transition-all duration-200 focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2"
    >
      <div className="mb-3">
        <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
          {group.modality}
        </span>
      </div>
      <p className="text-slate-700 dark:text-slate-200 text-sm mb-1.5 font-semibold leading-snug">
        {group.tasks}
      </p>
      <p className="text-slate-500 dark:text-slate-400 text-xs mb-4 leading-snug">
        {group.description}
      </p>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
        {isEn ? 'Tools:' : 'Įrankiai:'}
      </p>
      <ul
        className="flex flex-wrap gap-2"
        aria-label={t('toolsForCategoryAria')}
      >
        {group.examples.map((ex, i) => (
          <li key={i} className="inline-flex items-center gap-1.5">
            {ex.url ? (
              <a
                href={ex.url}
                target="_blank"
                rel="noreferrer noopener"
                title={ex.tooltip}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-2.5 py-1.5 rounded-lg text-sm font-medium text-brand-700 dark:text-brand-300 bg-slate-100 dark:bg-slate-700/60 hover:bg-brand-100 dark:hover:bg-brand-900/40 hover:text-brand-800 dark:hover:text-brand-200 border border-transparent hover:border-brand-200 dark:hover:border-brand-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1"
              >
                {ex.name}
              </a>
            ) : (
              <span
                className="inline-flex items-center min-h-[44px] px-2.5 py-1.5 rounded-lg text-sm font-medium text-brand-600 dark:text-brand-400 bg-slate-100 dark:bg-slate-700/60"
                title={ex.tooltip}
              >
                {ex.name}
              </span>
            )}
            {ex.recommended && (
              <span
                className="inline-flex items-center gap-0.5 px-2 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap min-h-[28px] items-center"
                title={t('recommendedToolAria')}
                aria-label={t('recommendedToolAria')}
              >
                <CheckCircle className="w-3 h-3 shrink-0" aria-hidden />
                Rek.
              </span>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function DiModalitiesSlide({
  content,
}: {
  content?: DiModalitiesContent;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const groups = content?.groups ?? [];
  const showFirst = content?.showFirst ?? 0;
  const useProgressive = showFirst > 0 && groups.length > showFirst;
  const [showAll, setShowAll] = useState(false);
  const visibleGroups =
    useProgressive && !showAll ? groups.slice(0, showFirst) : groups;
  const remainingCount = groups.length - showFirst;

  const intro =
    content?.intro ??
    (isEn
      ? 'AI models based on transformers can work with various input and output forms. Below are the main categories with examples and links. Recommended tools are marked for each category.'
      : 'DI modeliai, pagrįsti transformeriais, gali dirbti su įvairiomis įvesties ir išvesties formomis. Žemiau – pagrindinės kategorijos su pavyzdžiais ir nuorodomis. Pažymėta rekomenduojami įrankiai kiekvienai kategorijai.');
  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto space-y-2">
        <p className="text-center text-slate-500 dark:text-slate-400 text-xs">
          <span
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-0.5 text-emerald-700 dark:text-emerald-300 font-medium"
            role="status"
            aria-label={t('recommendedToolStatusAria')}
          >
            <CheckCircle className="w-3 h-3 shrink-0" aria-hidden />
            {isEn
              ? 'Rec. = recommended tool for this category'
              : 'Rek. = rekomenduojamas įrankis šiai kategorijai'}
          </span>
        </p>
        <p className="text-center text-slate-600 dark:text-slate-300 text-base leading-relaxed">
          {intro}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {visibleGroups.map((group, idx) => (
          <DiModalityCard key={idx} group={group} idx={idx} />
        ))}
      </div>

      {useProgressive && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30 hover:bg-brand-100 dark:hover:bg-brand-900/50 border border-brand-200 dark:border-brand-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            aria-expanded={showAll}
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 shrink-0" aria-hidden />
                {isEn ? 'Hide other categories' : 'Slėpti kitas kategorijas'}
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 shrink-0" aria-hidden />
                {isEn
                  ? `Show ${remainingCount} more categories`
                  : `Rodyti kitas ${remainingCount} kategorijas`}
              </>
            )}
          </button>
        </div>
      )}

      {content?.takeaway && (
        <div className="rounded-2xl border-l-4 border-accent-500 bg-accent-50 dark:bg-accent-900/20 dark:border-accent-600 p-5 shadow-sm">
          <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
            <span className="font-bold text-accent-700 dark:text-accent-300">
              {t('takeawayLabel')}
            </span>
            {content.takeaway}
          </p>
        </div>
      )}

      {/* Footer rodomas SlideContent lygmenyje pagal content.footer */}
    </div>
  );
}

/** Projekto spalvų paletė pie diagramai (atitinka tailwind brand/emerald/orange/rose/violet/amber/slate/fuchsia) */
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
  const key =
    colorKey ||
    [
      'brand',
      'emerald',
      'orange',
      'rose',
      'violet',
      'amber',
      'slate',
      'fuchsia',
    ][index ?? 0];
  return PIE_COLORS[key] ?? PIE_COLORS.brand;
}

export function PieChartSlide({ content }: { content?: PieChartContent }) {
  const segments = content?.segments ?? [];
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const cx = 100;
  const cy = 100;
  const r = 80;

  let acc = 0;
  const paths = segments.map((seg, i) => {
    const pct = seg.value / total;
    const startAngle = (acc / 100) * 2 * Math.PI - Math.PI / 2;
    acc += pct * 100;
    const endAngle = (acc / 100) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const large = pct > 0.5 ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
    const fill = getPieColor(seg.colorKey, i);
    return { d, fill, label: seg.label, value: seg.value };
  });

  return (
    <div className="space-y-6">
      {content?.title && (
        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white">
          {content.title}
        </h2>
      )}
      {content?.subtitle && (
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          {content.subtitle}
        </p>
      )}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <div className="flex-shrink-0">
          <svg viewBox="0 0 200 200" className="w-48 h-48 lg:w-56 lg:h-56">
            {paths.map((p, i) => (
              <path
                key={i}
                d={p.d}
                fill={p.fill}
                stroke="white"
                strokeWidth={1.5}
              />
            ))}
          </svg>
        </div>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
          {paths.map((p, i) => (
            <li key={i} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: p.fill }}
              />
              <span className="text-gray-700 dark:text-gray-300">
                {p.label}{' '}
                <span className="font-medium text-gray-900 dark:text-white">
                  {p.value}%
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer rodomas SlideContent lygmenyje pagal content.footer */}
    </div>
  );
}

const STAGE_COLORS = [
  {
    bg: 'bg-brand-100 dark:bg-brand-900/30',
    border: 'border-brand-500',
    text: 'text-brand-800 dark:text-brand-200',
  },
  {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    border: 'border-amber-500',
    text: 'text-amber-800 dark:text-amber-200',
  },
  {
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    border: 'border-violet-500',
    text: 'text-violet-800 dark:text-violet-200',
  },
];
const EXAMPLE_STEP_COLORS = [
  'bg-emerald-500',
  'bg-orange-500',
  'bg-violet-500',
  'bg-brand-500',
  'bg-rose-500',
];

export function AiWorkflowSlide({ content }: { content?: AiWorkflowContent }) {
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const stages = content?.stages ?? [];
  const examples = content?.examples ?? [];

  return (
    <div className="space-y-6">
      {content?.title && (
        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white">
          {content.title}
        </h2>
      )}
      {content?.subtitle && (
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          {content.subtitle}
        </p>
      )}

      {stages.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {stages.map((stage, i) => {
            const style = STAGE_COLORS[i % STAGE_COLORS.length];
            return (
              <div
                key={i}
                className={`rounded-xl border-2 p-4 ${style.bg} ${style.border}`}
              >
                <h3 className={`font-bold mb-2 ${style.text}`}>
                  {stage.step}. {stage.title}
                </h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                  {stage.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {examples.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">
            {isEn
              ? 'Examples: AI tool chains'
              : 'Pavyzdžiai: DI įrankių grandinės'}
          </h3>
          <div className="space-y-4">
            {examples.map((ex, exIdx) => (
              <div
                key={exIdx}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                  {ex.steps.map((s, stepIdx) => (
                    <span key={stepIdx} className="flex items-center gap-1">
                      <span
                        className={`rounded-lg px-3 py-1.5 text-white text-sm font-medium ${EXAMPLE_STEP_COLORS[stepIdx % EXAMPLE_STEP_COLORS.length]}`}
                      >
                        {s.tool}
                      </span>
                      {stepIdx < ex.steps.length - 1 && (
                        <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {ex.steps.map((s) => s.description).join(' → ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* Catalog slides -> ./content/CatalogSlides.tsx */

/** Blokų sąrašas su collapsible: jei bloke yra concepts arba tip, rodomas mygtukas išskleisti; viduje – sąvokos ir patarimas */
function HierarchyBlocksList({ blocks }: { blocks: HierarchyBlock[] }) {
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const safeBlocks = blocks ?? [];
  return (
    <div className="space-y-3">
      {safeBlocks.map((item, idx) => {
        const colors = getColorClasses(item.color);
        const hasExpandable =
          (item.concepts?.length ?? 0) > 0 ||
          (item.tip?.trim().length ?? 0) > 0;
        const isOpen = openIdx === idx;
        return (
          <div
            key={item.num}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-md transition-shadow"
          >
            <button
              type="button"
              onClick={
                hasExpandable
                  ? () => setOpenIdx(isOpen ? null : idx)
                  : undefined
              }
              className={`w-full flex items-center gap-4 p-4 text-left ${hasExpandable ? 'cursor-pointer' : 'cursor-default'}`}
              aria-expanded={hasExpandable ? isOpen : undefined}
              aria-controls={
                hasExpandable ? `hierarchy-block-${idx}` : undefined
              }
              aria-label={`${item.name}. ${item.priority}${hasExpandable ? (isOpen ? (isEn ? '. Collapse' : '. Suskleisti') : isEn ? '. Expand' : '. Išskleisti') : ''}`}
              id={`hierarchy-block-btn-${idx}`}
            >
              <div
                className={`w-10 h-10 rounded-full ${colors.bg} ${colors.bgDark} flex items-center justify-center font-bold ${colors.text} ${colors.textDark} flex-shrink-0`}
              >
                {item.num}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {item.desc}
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium min-w-0 max-w-[14rem] truncate ${colors.bg} ${colors.bgDark} ${colors.text} ${colors.textDark}`}
              >
                {item.priority}
              </div>
              {hasExpandable && (
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              )}
            </button>
            {hasExpandable && isOpen && (
              <div
                id={`hierarchy-block-${idx}`}
                role="region"
                aria-labelledby={`hierarchy-block-btn-${idx}`}
                className="px-4 pb-4 pt-0 border-t border-gray-100 dark:border-gray-700"
              >
                <div className="pl-14 space-y-3 text-sm">
                  {item.concepts && item.concepts.length > 0 && (
                    <div>
                      <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {isEn
                          ? 'Concepts to help you understand:'
                          : 'Sąvokos, padėsiančios suprasti:'}
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-gray-600 dark:text-gray-400">
                        {item.concepts.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {item.tip?.trim() && (
                    <div className="flex gap-2 p-3 rounded-lg bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800">
                      <Lightbulb
                        className="w-4 h-4 text-accent-600 dark:text-accent-400 shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <p className="text-accent-900 dark:text-accent-100">
                        {item.tip}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** M-DS1: max 2 semantinės + brand per skaidrę – brand (1–4), emerald (5–6 Rekomenduojama/Pasirenkama) */
function getDefaultHierarchy(locale: string): HierarchyContent {
  const isEn = locale === 'en';
  return {
    introHeading: isEn
      ? 'Why is hierarchy important?'
      : 'Kodėl hierarchija svarbi?',
    introBody: '',
    blocks: [
      {
        num: '1',
        name: isEn ? 'Meta block' : 'Meta blokas',
        desc: isEn
          ? 'Role, experience, goal, audience'
          : 'Rolė, patirtis, tikslas, auditorija',
        priority: isEn ? 'Critical' : 'Kritinis',
        color: 'brand',
      },
      {
        num: '2',
        name: isEn ? 'Input block' : 'Input blokas',
        desc: isEn
          ? 'Data, numbers, facts, constraints'
          : 'Duomenys, skaičiai, faktai, apribojimai',
        priority: isEn ? 'Very important' : 'Labai svarbus',
        color: 'brand',
      },
      {
        num: '3',
        name: isEn ? 'Output block' : 'Output blokas',
        desc: isEn
          ? 'Format, structure, length, language'
          : 'Formatas, struktūra, ilgis, kalba',
        priority: isEn ? 'Very important' : 'Labai svarbus',
        color: 'brand',
      },
      {
        num: '4',
        name: isEn ? 'Reasoning block' : 'Reasoning blokas',
        desc: isEn
          ? 'Thinking sequence, logic, steps'
          : 'Mąstymo seka, logika, žingsniai',
        priority: isEn ? 'Important' : 'Svarbus',
        color: 'brand',
      },
      {
        num: '5',
        name: 'Quality Control',
        desc: isEn
          ? 'Validation criteria, checks'
          : 'Tikrinimo kriterijai, validacija',
        priority: isEn ? 'Recommended' : 'Rekomenduojama',
        color: 'emerald',
      },
      {
        num: '6',
        name: 'Advanced Parameters',
        desc: isEn
          ? 'Temperature, reasoning depth'
          : 'Temperature, reasoning gylis',
        priority: isEn ? 'Optional' : 'Pasirenkama',
        color: 'emerald',
      },
    ],
    tip: isEn
      ? 'Try creating a prompt without structure (as you normally do). Save it – we will compare it with a structured version at the end.'
      : 'Pabandykite sukurti promptą be struktūros (kaip paprastai darote). Išsaugokite - palyginsime su struktūruota versija pabaigoje.',
  };
}

export interface HierarchySlideProps {
  content?: HierarchyContent | null;
}
export function HierarchySlide({ content: contentProp }: HierarchySlideProps) {
  useTranslation();
  const t = getT('contentSlides');
  const tCommon = getT('common');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const content = contentProp ?? getDefaultHierarchy(locale);
  return (
    <div className="space-y-6">
      {/* ── Intro: tamsus hook ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 dark:from-gray-950 dark:via-brand-950 dark:to-gray-950 p-5 sm:p-7 text-white">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-2 right-4 text-[80px] font-extrabold leading-none select-none">
            📐
          </div>
        </div>
        <div className="relative z-10 max-w-lg mx-auto text-center">
          <h3 className="text-lg sm:text-xl font-bold leading-snug tracking-tight mb-2">
            {content.introHeading ??
              (isEn
                ? 'Why is hierarchy important?'
                : 'Kodėl hierarchija svarbi?')}
          </h3>
          <p className="text-sm sm:text-base text-brand-200/90 leading-relaxed">
            {content.introBody || t('introBodyRlOrder')}
          </p>
        </div>
      </div>

      <HierarchyBlocksList blocks={content.blocks ?? []} />

      {content.practiceCopyable ? (
        <>
          <div className="mt-6 p-5 rounded-xl border border-accent-200 dark:border-accent-800 bg-accent-50 dark:bg-accent-900/20">
            <h3 className="font-bold text-lg text-accent-900 dark:text-accent-100 mb-2 flex items-center gap-2">
              <Lightbulb
                className="w-5 h-5 text-accent-600 dark:text-accent-400 shrink-0"
                strokeWidth={1.5}
              />
              {content.practiceHeading ??
                (isEn ? 'Practical task' : 'Praktinė užduotis')}
            </h3>
            {content.practiceBody && (
              <p className="text-sm text-accent-900 dark:text-accent-100 mb-3">
                {content.practiceBody}
              </p>
            )}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <pre className="flex-1 min-w-0 text-xs sm:text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg border border-accent-200 dark:border-accent-800">
                {content.practiceCopyable}
              </pre>
              <CopyButton
                text={content.practiceCopyable}
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-lg bg-accent-500 hover:bg-accent-600 text-white font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
                ariaLabel={t('copyPrompt')}
                copiedLabel={tCommon('copiedExclaim')}
              />
            </div>
          </div>
          {content.tip && (
            <div className="mt-4 p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-slate-800/60 border-l-4 border-l-slate-400">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {isEn ? 'Key takeaway' : 'Ką prisiminti'}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {content.tip}
              </p>
            </div>
          )}
        </>
      ) : content.tip ? (
        <div className="mt-6 p-5 bg-accent-50 dark:bg-accent-900/20 rounded-xl border border-accent-200 dark:border-accent-800">
          <p className="text-sm text-accent-900 dark:text-accent-100">
            <strong className="inline-flex items-center gap-1.5">
              <Lightbulb
                className="w-4 h-4 text-accent-600 dark:text-accent-400 shrink-0"
                strokeWidth={1.5}
              />
              {isEn ? 'Practical task:' : 'Praktinė užduotis:'}
            </strong>{' '}
            {content.tip}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function getDefaultComparison(locale: string): ComparisonContent {
  const isEn = locale === 'en';
  return {
    introText: isEn
      ? 'What is compared: the same task, but different structure (without blocks vs with blocks).'
      : 'Kas lyginama: ta pati užduotis, bet skirtinga struktūra (be blokų vs su blokais).',
    unstructuredPrompt: isEn
      ? 'Create a training program about AI for me. It should be interesting and practical.'
      : 'Sukurk man mokymo programą apie DI. Turi būti įdomi ir praktinė.',
    structuredPrompt: isEn
      ? 'META: You are a training creator. Goal – prepare a 4-hour introductory AI training. Audience – 12–15 beginners.\nINPUT: Constraints – 1 instructor, no practical tool demos.\nOUTPUT: Table with 5 columns: module, duration, goal, activity, outcome. Tone – clear, professional.'
      : 'META: Tu esi mokymo kūrėjas. Tikslas – parengti 4 val. DI įvadinį mokymą. Auditorija – 12–15 pradedančiųjų.\nINPUT: Apribojimai – 1 lektorius, be praktinių įrankių demonstracijų.\nOUTPUT: Lentelė su 5 stulpeliais: modulis, trukmė, tikslas, veikla, rezultatas. Tonas – aiškus, profesionalus.',
    unstructuredCons: isEn
      ? ['Unclear target audience', 'No concrete data', 'Undefined format']
      : [
          'Neaiški tikslinė auditorija',
          'Nėra konkretių duomenų',
          'Neapibrėžtas formatas',
        ],
    structuredPros: isEn
      ? ['Clear audience', 'Concrete parameters', 'Precise format']
      : ['Aiški auditorija', 'Konkretūs parametrai', 'Tikslus formatas'],
    labelLeft: isEn ? 'Unstructured' : 'Nestruktūruotas',
    labelRight: isEn ? 'Structured' : 'Struktūruotas',
    stats: { leftPct: 40, rightPct: 85, lessEditsPct: 60 },
  };
}

export interface ComparisonSlideProps {
  content?: ComparisonContent | null;
}
export function ComparisonSlide({
  content: contentProp,
}: ComparisonSlideProps) {
  useTranslation();
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const defaults = getDefaultComparison(locale);
  const c = contentProp ?? defaults;
  const cons = c.unstructuredCons ?? defaults.unstructuredCons!;
  const pros = c.structuredPros ?? defaults.structuredPros!;
  const stats = c.stats ?? defaults.stats!;
  return (
    <div className="space-y-6">
      {/* ── Intro: tamsus hook ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 dark:from-gray-950 dark:via-brand-950 dark:to-gray-950 p-5 sm:p-7 text-white">
        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="text-base sm:text-lg font-bold leading-snug tracking-tight">
            {isEn
              ? 'Same task. Two different prompts. Which one wins?'
              : 'Ta pati užduotis. Du skirtingi promptai. Kuris laimi?'}
          </p>
          {c.introText && (
            <p className="text-xs sm:text-sm text-brand-300/80 mt-2 font-medium">
              {c.introText}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-rose-50 dark:bg-rose-900/20 p-5 rounded-xl border-2 border-rose-200 dark:border-rose-800">
          <h4 className="font-bold text-rose-900 dark:text-rose-100 mb-3 flex items-center gap-2">
            ❌ {c.labelLeft ?? (isEn ? 'Unstructured' : 'Nestruktūruotas')}
          </h4>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-sm italic text-gray-700 dark:text-gray-300 mb-4 relative whitespace-pre-line">
            <CopyButton
              text={c.unstructuredPrompt}
              className="absolute top-2 right-2"
              size="sm"
            />
            <p>{c.unstructuredPrompt}</p>
          </div>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            {cons.map((item, i) => (
              <p key={i} className="flex items-start gap-2">
                <span className="text-rose-600">•</span>
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
          <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3 flex items-center gap-2">
            ✓ {c.labelRight ?? (isEn ? 'Structured' : 'Struktūruotas')}
          </h4>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-xs text-gray-700 dark:text-gray-300 max-h-40 overflow-y-auto mb-4 relative whitespace-pre-line">
            <CopyButton
              text={c.structuredPrompt}
              className="absolute top-2 right-2"
              size="sm"
            />
            <p>{c.structuredPrompt}</p>
          </div>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            {pros.map((item, i) => (
              <p key={i} className="flex items-start gap-2">
                <span className="text-emerald-600">•</span>
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {stats && (
        <div className="bg-brand-50 dark:bg-brand-900/20 p-6 rounded-xl">
          <h4 className="font-bold mb-4 text-gray-900 dark:text-white">
            {isEn ? 'Results comparison:' : 'Rezultatų palyginimas:'}
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <p className="text-3xl font-bold text-rose-600">
                {stats.leftPct}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {c.labelLeft?.toLowerCase() ??
                  (isEn ? 'unstructured' : 'nestruktūruotas')}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <p className="text-3xl font-bold text-emerald-600">
                {stats.rightPct}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {c.labelRight?.toLowerCase() ??
                  (isEn ? 'structured' : 'struktūruotas')}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <p className="text-3xl font-bold text-brand-600">
                {stats.lessEditsPct}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {isEn ? 'fewer edits' : 'mažiau taisymų'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Summary Slide v2 (2026-02) ─────────────────────────────────────────
 *  Dizainas pagal top e-learning platformų šablonus:
 *  - Duolingo: celebration animations, confetti, achievement feel
 *  - Design+Code: success modal, gradient hero, glass morphism
 *  - Articulate: beyond bullet points – visual cards, next step CTA
 *  - Gamification patterns: stats, badges, staggered card entrance
 * ─────────────────────────────────────────────────────────────────────── */

function getDefaultSummary(locale: string): SummaryContent {
  const isEn = locale === 'en';
  return {
    introHeading: isEn ? 'What you learned' : 'Ką išmokote',
    introBody: isEn
      ? 'Congratulations! Now you know how to professionally structure prompts using the 6-block system, workflow concepts and prompting techniques.'
      : 'Sveikiname! Dabar žinote, kaip profesionaliai struktūruoti promptus naudojant 6 blokų sistemą, workflow sampratą ir promptavimo technikas.',
    stats: [
      { label: isEn ? 'Blocks' : 'Blokai', value: '6' },
      { label: isEn ? 'Techniques' : 'Technikos', value: '5' },
      { label: 'Workflow', value: '2' },
    ],
    sections: [
      {
        heading: isEn ? '6 Key Blocks' : '6 Pagrindiniai Blokai',
        icon: 'Layers',
        color: 'brand',
        items: isEn
          ? [
              'Meta – role, context and goal (who you are and what you do)',
              'Input – data, facts and constraints (what you have)',
              'Output – format, structure and tone (what you want)',
              'Reasoning – thinking structure (CoT or ToT)',
              'Quality – quality criteria (how to check)',
              'Advanced – parameters (Temperature, Reasoning depth)',
            ]
          : [
              'Meta - rolė, kontekstas ir tikslas (kas esate ir ką darote)',
              'Input - duomenys, faktai ir apribojimai (ką turite)',
              'Output - formatas, struktūra ir tonas (ko norite)',
              'Reasoning - mąstymo struktūra (CoT arba ToT)',
              'Quality - kokybės kriterijai (kaip patikrinti)',
              'Advanced - parametrai (Temperature, Reasoning depth)',
            ],
      },
      {
        heading: isEn ? 'Workflow & Techniques' : 'Workflow ir Technikos',
        icon: 'Workflow',
        color: 'violet',
        items: isEn
          ? [
              'Basic usage – for chats, ideas',
              'Workflow usage – for documents, processes',
              'Zero-shot, Few-shots, CoT, ToT, Instructing',
              'Manipulation – what to avoid',
            ]
          : [
              'Basic naudojimas – pokalbiams, idėjoms',
              'Workflow naudojimas – dokumentams, procesams',
              'Zero-shot, Few-shots, CoT, ToT, Instruktavimas',
              'Manipuliacija – ko vengti',
            ],
      },
      {
        heading: isEn ? 'Key Ideas' : 'Pagrindinės Idėjos',
        icon: 'Lightbulb',
        color: 'amber',
        items: isEn
          ? [
              'Hierarchy is critical (most important first)',
              'Specificity > generality (exact numbers)',
              'Examples improve results (Few-shots)',
              'Quality control is essential (Quality block)',
              'Workflow > Basic (for processes)',
              'Thinking models matter (CoT/ToT choice)',
            ]
          : [
              'Hierarchija yra kritinė (nuo svarbiausio)',
              'Konkretumas > bendrumas (tikslūs skaičiai)',
              'Pavyzdžiai pagerina rezultatus (Few-shots)',
              'Kokybės kontrolė būtina (Quality blokas)',
              'Workflow > Basic (procesams)',
              'Mąstymo modeliai svarbūs (CoT/ToT pasirinkimas)',
            ],
      },
      {
        heading: isEn ? 'Next Step' : 'Kitas Žingsnis',
        icon: 'ArrowRight',
        color: 'emerald',
        items: isEn
          ? [
              'Now that you have learned the 6-block system, workflow and techniques, it is time to test your knowledge – Module 2 test.',
            ]
          : [
              'Dabar, kai išmokote 6 blokų sistemą, workflow ir technikas, laikas patikrinti savo žinias – Modulio 2 testas.',
            ],
      },
    ],
    tagline: isEn
      ? 'Structured prompts = predictable results = greater efficiency'
      : 'Struktūruoti promptai = nuspėjami rezultatai = didesnis efektyvumas',
  };
}

/** Ikona pagal sekcijos pavadinimą – fallback CheckCircle */
function SectionIcon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  const Icon = resolveLucideIcon(name, 'summary') ?? CheckCircle;
  return <Icon className={className} />;
}

/** Spalvų žemėlapis sekcijų kortelėms */
const sectionColorMap: Record<
  string,
  {
    card: string;
    iconBg: string;
    iconText: string;
    border: string;
    checkColor: string;
  }
> = {
  brand: {
    card: 'bg-brand-50/80 dark:bg-brand-900/20',
    iconBg: 'bg-brand-500',
    iconText: 'text-white',
    border: 'border-brand-200 dark:border-brand-800',
    checkColor: 'text-brand-500',
  },
  violet: {
    card: 'bg-violet-50/80 dark:bg-violet-900/20',
    iconBg: 'bg-violet-500',
    iconText: 'text-white',
    border: 'border-violet-200 dark:border-violet-800',
    checkColor: 'text-violet-500',
  },
  amber: {
    card: 'bg-amber-50/80 dark:bg-amber-900/20',
    iconBg: 'bg-amber-500',
    iconText: 'text-white',
    border: 'border-amber-200 dark:border-amber-800',
    checkColor: 'text-amber-500',
  },
  emerald: {
    card: 'bg-emerald-50/80 dark:bg-emerald-900/20',
    iconBg: 'bg-emerald-500',
    iconText: 'text-white',
    border: 'border-emerald-200 dark:border-emerald-800',
    checkColor: 'text-emerald-500',
  },
  rose: {
    card: 'bg-rose-50/80 dark:bg-rose-900/20',
    iconBg: 'bg-rose-500',
    iconText: 'text-white',
    border: 'border-rose-200 dark:border-rose-800',
    checkColor: 'text-rose-500',
  },
  orange: {
    card: 'bg-orange-50/80 dark:bg-orange-900/20',
    iconBg: 'bg-orange-500',
    iconText: 'text-white',
    border: 'border-orange-200 dark:border-orange-800',
    checkColor: 'text-orange-500',
  },
};
const defaultColor = sectionColorMap.brand;

/** Confetti dalelės – CSS-only animacija */
function ConfettiParticles() {
  const colors = ['#627d98', '#d4a520']; // brand + accent per DESIGN_GUIDE
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: `${5 + Math.random() * 90}%`,
    delay: `${Math.random() * 0.8}s`,
    size: 4 + Math.random() * 6,
    duration: `${1.2 + Math.random() * 1.5}s`,
    rotation: Math.random() * 360,
  }));

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 rounded-sm opacity-0"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`,
            backgroundColor: p.color,
            animation: `summaryConfettiFall ${p.duration} ${p.delay} ease-out forwards`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/** Kopijuojamo refleksijos prompto mygtukas su „Nukopijuota!" atsakymu */
function ReflectionCopyButton({ text }: { text: string }) {
  useTranslation();
  const t = getT('contentSlides');
  const tCommon = getT('common');
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* silent */
    }
  };
  return (
    <button
      onClick={handleCopy}
      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm shadow-md active:scale-[0.98] transition-all ${
        copied
          ? 'bg-emerald-500 text-white shadow-emerald-500/20'
          : 'bg-gradient-to-r from-accent-400 to-accent-500 hover:from-accent-500 hover:to-accent-600 text-white shadow-accent-500/20 hover:shadow-lg hover:shadow-accent-500/30'
      }`}
      aria-label={t('copyReflectionPromptAria')}
    >
      {copied ? (
        <CheckCircle className="w-4 h-4" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
      <span>{copied ? tCommon('copiedExclaim') : t('copyPrompt')}</span>
    </button>
  );
}

export interface SummarySlideProps {
  content?: SummaryContent | null;
  /** Kai paskutinė skaidrė – mygtukas „Pereikite prie kito modulio“ kviečia šią funkciją */
  onNextStep?: () => void;
}
export function SummarySlide({
  content: contentProp,
  onNextStep,
}: SummarySlideProps) {
  useTranslation();
  const t = getT('contentSlides');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const content = contentProp ?? getDefaultSummary(locale);
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Staggered entrance: show cards after hero animates
    const timer = setTimeout(() => setShowContent(true), 400);
    // Hide confetti after animation completes
    const confettiTimer = setTimeout(() => setShowConfetti(false), 3500);
    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    };
  }, []);

  const nextStepHeadings = ['Kitas Žingsnis', 'Next Step'];
  const allKnowledge = (content.sections ?? []).filter(
    (s) =>
      s.icon !== 'ArrowRight' && !nextStepHeadings.includes(s.heading ?? '')
  );
  const knowledgeSections = allKnowledge.slice(0, 4);
  const nextStepSection = (content.sections ?? []).find(
    (s) => s.icon === 'ArrowRight' || nextStepHeadings.includes(s.heading ?? '')
  );

  return (
    <div className="space-y-8">
      {/* ── Hero Celebration Header ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 dark:from-brand-800 dark:via-brand-700 dark:to-accent-700 p-8 lg:p-10 text-white">
        {/* Confetti overlay */}
        {showConfetti && <ConfettiParticles />}

        {/* Decorative circles */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full"
          aria-hidden="true"
        />

        {/* Trophy icon */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-5 inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm shadow-lg shadow-black/10 animate-celebrate">
            <Trophy
              className="w-10 h-10 text-white"
              strokeWidth={1.5}
              aria-hidden
            />
          </div>
          <h2 className="text-lg lg:text-xl font-bold mb-2 drop-shadow-sm">
            {content.introHeading ?? t('whatYouLearnedHeading')}
          </h2>
          <p className="text-white/85 max-w-lg text-base lg:text-lg leading-relaxed">
            {content.introBody ?? ''}
          </p>

          {/* Stats row */}
          {content.stats && content.stats.length > 0 && (
            <div className="mt-6 flex gap-4 lg:gap-8 justify-center">
              {content.stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 min-w-[80px] border border-white/10"
                  style={{ animationDelay: `${0.3 + i * 0.15}s` }}
                >
                  <span className="text-3xl lg:text-4xl font-extrabold leading-none">
                    {stat.value}
                  </span>
                  <span className="text-xs lg:text-sm text-white/70 mt-1 font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Knowledge Section Cards (staggered entrance) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {knowledgeSections.map((section, sIdx) => {
          const colors =
            sectionColorMap[section.color ?? 'brand'] ?? defaultColor;
          return (
            <div
              key={sIdx}
              className={`relative rounded-2xl border-2 ${colors.border} ${colors.card} p-6 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 ${
                showContent
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${sIdx * 120}ms` }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-xl ${colors.iconBg} shadow-md`}
                >
                  <SectionIcon
                    name={section.icon}
                    className={`w-5 h-5 ${colors.iconText}`}
                  />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                  {section.heading}
                </h4>
              </div>

              {/* Items */}
              <ul className="space-y-2.5">
                {(section.items ?? []).map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.checkColor}`}
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Item count badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${colors.iconBg} ${colors.iconText} shadow-sm`}
                >
                  {(section.items ?? []).length}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {content.reflectionPrompt && (
        <SectionDivider
          label={
            content.reflectionTitle ?? (isEn ? 'Reflection' : 'Refleksija')
          }
          accent="accent"
          className="my-2"
        />
      )}

      {/* ── Reflection Prompt (full-width, dedicated section) ── */}
      {content.reflectionPrompt && (
        <div
          className={`relative rounded-2xl border-2 border-accent-200 dark:border-accent-800 bg-accent-50 dark:bg-accent-900/20 p-6 lg:p-8 flex flex-col transition-all duration-300 shadow-md ${
            showContent
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: `${knowledgeSections.length * 120}ms` }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-accent-400 to-accent-500 shadow-md">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 dark:text-white text-xl leading-tight">
                {content.reflectionTitle ?? 'Refleksijos promptas'}
              </h4>
              <p className="text-sm text-accent-700 dark:text-accent-300 font-medium mt-0.5">
                {isEn ? 'Copy and use with AI' : 'Nukopijuok ir naudok su DI'}
              </p>
            </div>
          </div>

          {/* Steps instruction */}
          <div className="flex flex-wrap gap-3 mb-4 text-xs font-medium text-accent-700 dark:text-accent-300">
            <span className="inline-flex items-center gap-1.5 bg-accent-100 dark:bg-accent-800/40 px-3 py-1.5 rounded-lg">
              <span className="font-bold text-accent-600 dark:text-accent-200">
                1.
              </span>{' '}
              {isEn ? 'Copy' : 'Nukopijuok'}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-accent-100 dark:bg-accent-800/40 px-3 py-1.5 rounded-lg">
              <span className="font-bold text-accent-600 dark:text-accent-200">
                2.
              </span>{' '}
              {isEn
                ? 'Paste into ChatGPT / Claude'
                : 'Įklijuok į ChatGPT / Claude'}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-accent-100 dark:bg-accent-800/40 px-3 py-1.5 rounded-lg">
              <span className="font-bold text-accent-600 dark:text-accent-200">
                3.
              </span>{' '}
              {isEn ? 'Reflect' : 'Atsakyk'}
            </span>
          </div>

          {/* Prompt text */}
          <div className="relative bg-white/70 dark:bg-gray-800/70 rounded-xl p-5 border border-accent-200/50 dark:border-accent-700/50 mb-4">
            <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
              {content.reflectionPrompt}
            </pre>
          </div>

          {/* Copy button */}
          <ReflectionCopyButton text={content.reflectionPrompt ?? ''} />
        </div>
      )}

      {/* ── Transfer Contract §3.4f (Before→After + 24–48h) ── */}
      {(content.abilityBefore || content.firstAction24h) && (
        <div
          className={`transition-all duration-500 ${
            showContent
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: `${knowledgeSections.length * 120 + 80}ms`,
          }}
        >
          <TransferAbilityStrip
            abilityBefore={content.abilityBefore}
            abilityAfter={content.abilityAfter}
            firstAction24h={content.firstAction24h}
            isEn={isEn}
          />
        </div>
      )}

      {content.ownWorkTemplate && (
        <OwnWorkSlot
          label={content.ownWorkLabel}
          placeholder={content.ownWorkPlaceholder}
          template={content.ownWorkTemplate}
          isEn={isEn}
        />
      )}

      {/* ── Next Step CTA ── */}
      {(nextStepSection || content.nextStepCTA) && (
        <div
          className={`relative overflow-hidden rounded-2xl border-2 border-emerald-300 dark:border-emerald-700 bg-gradient-to-r from-emerald-50 to-brand-50 dark:from-emerald-900/30 dark:to-brand-900/20 p-6 lg:p-8 transition-all duration-500 ${
            showContent
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: `${knowledgeSections.length * 120 + 100}ms`,
          }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500 shadow-md">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {t('nextStepHeading')}
              </h4>
              {nextStepSection ? (
                (nextStepSection.items ?? []).map((item, i) => (
                  <p
                    key={i}
                    className="text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    {item}
                  </p>
                ))
              ) : content.nextStepCTA ? (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {content.nextStepCTA}
                </p>
              ) : null}
              {onNextStep ? (
                <button
                  type="button"
                  onClick={onNextStep}
                  className="mt-4 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm px-4 py-2 rounded-xl border border-emerald-600 shadow-sm hover:shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 min-h-[44px]"
                  aria-label={t('goToNextModuleAria')}
                >
                  <span>{t('nextStepCtaLabel')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300 font-semibold text-sm px-4 py-2 rounded-xl border border-emerald-200 dark:border-emerald-700">
                  <span>{t('nextStepCtaLabel')}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>

          {/* Decorative pulse dot */}
          <div className="absolute top-6 right-6" aria-hidden="true">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </div>
        </div>
      )}

      {/* ── Motivational Footer ── */}
      <div
        className={`relative overflow-hidden rounded-2xl border-2 border-brand-200 dark:border-brand-700 bg-brand-50 dark:bg-brand-900/30 p-6 lg:p-8 text-center transition-all duration-500 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{
          transitionDelay: `${(knowledgeSections.length + 1) * 120 + 200}ms`,
        }}
      >
        <div className="relative z-10">
          <div className="mb-3 flex justify-center" aria-hidden="true">
            <Sparkles
              className="w-8 h-8 text-brand-500 dark:text-brand-400"
              strokeWidth={1.5}
            />
          </div>
          <h2 className="text-lg lg:text-xl font-bold mb-2 text-brand-800 dark:text-brand-200">
            {isEn ? 'Good luck with AI!' : 'Sėkmės su DI!'}
          </h2>
          <p className="text-brand-600 dark:text-brand-400 text-base lg:text-lg max-w-md mx-auto">
            {content.tagline ??
              (isEn
                ? 'Structured prompts = predictable results = greater efficiency'
                : 'Struktūruoti promptai = nuspėjami rezultatai = didesnis efektyvumas')}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── DI Paradoksas Infographic (skaidrė 725) – pilna interaktyvi infografika ─── */
export function DiParadoxInfographicSlide({
  content,
  onGoToGlossary,
}: {
  content?: DiParadoxInfographicContent;
  onGoToGlossary?: () => void;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const [showSources, setShowSources] = useState(false);
  if (!content || content.variant !== 'di-paradox') return null;

  const heroColorMap: Record<string, string> = {
    rose: 'text-rose-600 dark:text-rose-400',
    brand: 'text-brand-600 dark:text-brand-400',
    amber: 'text-amber-600 dark:text-amber-400',
  };

  const barColorMap: Record<string, string> = {
    accent: 'bg-accent-500',
    amber: 'bg-amber-500',
    slate: 'bg-slate-400 dark:bg-slate-500',
  };

  const funnelColorMap: Record<string, string> = {
    accent: 'bg-accent-500',
    orange: 'bg-orange-500',
    amber: 'bg-amber-500',
  };

  const actionBorderMap: Record<string, string> = {
    accent: 'border-t-accent-500',
    amber: 'border-t-amber-500',
    slate: 'border-t-slate-500',
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-5 lg:p-6 border-b border-slate-200 dark:border-slate-700 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-end">
          <div>
            {content.badge && (
              <span
                className={`inline-flex items-center gap-1.5 bg-accent-500 text-white ${typographyClasses.labelUpper} font-bold px-3 py-1.5 rounded mb-3`}
              >
                {content.badge}
              </span>
            )}
            <h2
              className={`${typographyClasses.h2} text-gray-900 dark:text-white leading-tight`}
            >
              {content.title}
            </h2>
            {content.subtitle && (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                {content.subtitle}
              </p>
            )}
          </div>
          {content.sourceBox && (
            <div className="text-right">
              <div
                className={`${typographyClasses.labelUpper} text-slate-500 dark:text-slate-400`}
              >
                {content.sourceBox.label}
              </div>
              <div className="font-bold text-gray-900 dark:text-white text-sm">
                {content.sourceBox.title}
              </div>
              {content.sourceBox.meta && (
                <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                  {content.sourceBox.meta}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-700 bg-slate-900 dark:bg-slate-950">
          {(content.heroStats ?? []).map((stat, idx) => (
            <div
              key={idx}
              className="relative p-5 lg:p-6 flex flex-col gap-2 min-h-[52px] py-4 hover:bg-slate-800/50 dark:hover:bg-slate-800/30 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 lg:after:left-6 lg:after:right-6 after:h-0.5 after:bg-transparent hover:after:bg-accent-500 after:transition-colors"
            >
              <div
                className={`${typographyClasses.metric} font-extrabold ${heroColorMap[stat.colorKey ?? 'brand'] ?? heroColorMap.brand}`}
              >
                <StatWithTooltip
                  value={stat.value}
                  tooltip={stat.tooltip}
                  colorClass={
                    heroColorMap[stat.colorKey ?? 'brand'] ?? heroColorMap.brand
                  }
                />
              </div>
              <div className="text-xs text-slate-300 dark:text-slate-400 leading-snug max-w-[180px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Paradox Cards */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-2">
          Paradoksas: asmeninis vs. organizacinis lygmuo
          <span className="flex-1 h-px bg-slate-200 dark:bg-slate-600" />
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {(content.paradoxCards ?? []).map((card, idx) => (
            <div
              key={idx}
              className="relative bg-white dark:bg-gray-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <span
                className={`absolute -top-3 left-5 bg-accent-500 text-white ${typographyClasses.labelUpper} font-extrabold px-2.5 py-1 rounded`}
              >
                {card.number}
              </span>
              <div className="text-2xl mb-2">
                <SlideLucideIcon name={card.icon} context="infographic" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">
                {card.title}
              </h4>
              <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {renderBodyWithBold(card.body, { numberAccent: true })}
              </div>
              {card.stats && card.stats.length > 0 && (
                <div className="space-y-1.5">
                  {card.stats.map((s, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900/50 rounded"
                    >
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        {s.label}
                      </span>
                      <span className="text-sm font-extrabold text-brand-600 dark:text-brand-400">
                        <StatWithTooltip value={s.value} tooltip={s.tooltip} />
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Shadow Section – Bar Chart */}
      {content.shadowSection && (
        <div className="rounded-xl bg-slate-900 dark:bg-slate-950 p-5 lg:p-6">
          <div className="mb-4">
            {content.shadowSection.sublabel && (
              <div
                className={`${typographyClasses.labelUpper} font-normal text-slate-400 dark:text-slate-500`}
              >
                {content.shadowSection.sublabel}
              </div>
            )}
            <div className="font-bold text-white text-sm">
              {content.shadowSection.label}
            </div>
          </div>
          <div className="space-y-3">
            {(content.shadowSection.bars ?? []).map((bar, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="text-xs text-slate-400 w-44 flex-shrink-0">
                  {bar.label}
                </div>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barColorMap[bar.colorKey ?? 'accent'] ?? barColorMap.accent} transition-[width] duration-1000 ease-out`}
                    style={{ width: `${bar.percent}%` }}
                    role="progressbar"
                    aria-valuenow={bar.percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${bar.label}: ${bar.value}`}
                  />
                </div>
                <span
                  className="font-bold text-white text-sm w-10 text-right"
                  title={
                    bar.tooltip
                      ? `${bar.tooltip.explanation} ${bar.tooltip.trend ?? ''}`
                      : undefined
                  }
                >
                  <StatWithTooltip
                    value={bar.value}
                    tooltip={bar.tooltip}
                    colorClass="text-white"
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Funnel + Value – two columns */}
      {(content.funnelSection || content.valueSection) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {content.funnelSection && (
            <div>
              <h3
                className={`${typographyClasses.labelUpper} tracking-widest text-slate-500 dark:text-slate-400 mb-4`}
              >
                {content.funnelSection.title}
              </h3>
              <div className="space-y-4">
                {(content.funnelSection.steps ?? []).map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-14 h-10 flex items-center justify-center font-extrabold text-white text-sm rounded ${funnelColorMap[step.colorKey ?? 'accent'] ?? funnelColorMap.accent}`}
                      title={
                        step.tooltip
                          ? `${step.tooltip.explanation} ${step.tooltip.trend ?? ''}`
                          : undefined
                      }
                    >
                      <StatWithTooltip
                        value={step.value}
                        tooltip={step.tooltip}
                        colorClass="text-white"
                      />
                    </div>
                    <div className="pt-1">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {step.title}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {content.valueSection && (
            <div>
              <h3
                className={`${typographyClasses.labelUpper} tracking-widest text-slate-500 dark:text-slate-400 mb-4`}
              >
                {content.valueSection.title}
              </h3>
              <div className="space-y-1">
                {(content.valueSection.items ?? []).map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-2.5 rounded border-l-4 ${
                      item.tag
                        ? 'bg-white dark:bg-gray-800 border-l-accent-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-l-transparent'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${idx === 0 ? 'bg-accent-500' : 'bg-slate-400'}`}
                    />
                    <span className="text-sm text-gray-900 dark:text-white flex-1">
                      {item.text}
                    </span>
                    {item.tag && (
                      <span
                        className={`${typographyClasses.labelUpper} text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-900/30 px-2 py-0.5 rounded`}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>
                ))}
                {content.valueSection.commonCondition && (
                  <div className="mt-4 p-3 rounded bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500">
                    <div
                      className={`${typographyClasses.labelUpper} text-accent-600 dark:text-accent-400 mb-1`}
                    >
                      {content.valueSection.commonCondition.label}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {content.valueSection.commonCondition.text}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Solution Pipeline */}
      {content.solutionSection && (
        <div>
          <h3
            className={`${typographyClasses.labelUpper} tracking-widest text-slate-500 dark:text-slate-400 mb-4`}
          >
            {content.solutionSection.label}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            {(content.solutionSection.pipeline ?? []).map((step, idx) => (
              <div
                key={idx}
                className={`relative rounded-lg border-2 p-4 text-center transition-all ${
                  step.highlighted
                    ? 'border-accent-500 bg-accent-50/50 dark:bg-accent-900/10'
                    : 'border-slate-200 dark:border-slate-700 hover:border-accent-400'
                }`}
              >
                <div
                  className={`${typographyClasses.labelUpper} font-extrabold text-accent-600 dark:text-accent-400 mb-1`}
                >
                  {step.num}
                </div>
                <div className="text-2xl mb-2">
                  <SlideLucideIcon name={step.icon} context="infographic" />
                </div>
                <div className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                  {step.name}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                  {step.description}
                </div>
                {idx < (content.solutionSection!.pipeline?.length ?? 0) - 1 && (
                  <div className="hidden sm:block absolute top-1/2 -right-1 -translate-y-1/2 text-slate-300 dark:text-slate-600 text-lg">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Cards */}
      {content.actionSection && (
        <div>
          <h3
            className={`${typographyClasses.labelUpper} tracking-widest text-slate-500 dark:text-slate-400 mb-4`}
          >
            {content.actionSection.label}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {(content.actionSection.cards ?? []).map((card, idx) => (
              <div
                key={idx}
                className={`relative rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-5 pt-6 overflow-hidden hover:bg-white dark:hover:bg-gray-800 transition-colors ${
                  actionBorderMap[card.colorKey ?? 'accent'] ??
                  actionBorderMap.accent
                } border-t-4`}
              >
                <div
                  className={`${typographyClasses.metric} font-extrabold text-slate-200 dark:text-slate-600 mb-2`}
                >
                  {card.num}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">
                  {card.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  {card.body}
                </p>
                <div
                  className={`${typographyClasses.labelUpper} text-accent-600 dark:text-accent-400 flex items-center gap-1.5`}
                >
                  <span className="w-4 h-px bg-accent-500" />
                  {card.kpi}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conclusion */}
      {content.conclusionSection && (
        <div className="rounded-xl bg-slate-900 dark:bg-slate-950 p-5 lg:p-6 flex gap-4 items-start">
          <div className="opacity-80 shrink-0" aria-hidden="true">
            <SlideLucideIcon
              name={content.conclusionSection.icon}
              context="infographic"
              className="w-10 h-10 text-white"
            />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-lg mb-2">
              {content.conclusionSection.heading.includes('technologinė') ? (
                <>
                  {content.conclusionSection.heading.replace(
                    ' technologinė',
                    ''
                  )}{' '}
                  <span className="text-accent-400">technologinė</span>
                </>
              ) : (
                content.conclusionSection.heading
              )}
            </h3>
            <p className="text-sm text-slate-300 dark:text-slate-400 leading-relaxed">
              {content.conclusionSection.body}
            </p>
            {content.conclusionSection.chips &&
              content.conclusionSection.chips.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {content.conclusionSection.chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium text-slate-300 dark:text-slate-400 bg-white/10 border border-white/15 px-3 py-1 rounded"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
          </div>
        </div>
      )}

      {/* Footer rodomas SlideContent lygmenyje pagal content.footer */}

      {/* Glossary CTA */}
      {onGoToGlossary && content.onGoToGlossaryTerm && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onGoToGlossary}
            className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 text-sm font-medium py-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-lg"
            aria-label={t('openGlossaryAria', {
              term: content.onGoToGlossaryTerm ?? '',
            })}
          >
            <BookMarked className="w-4 h-4" aria-hidden />
            <span>{t('glossaryLabel')}</span>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden />
          </button>
        </div>
      )}

      {/* Sources – Collapsible */}
      {content.sources && content.sources.length > 0 && (
        <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
          <button
            type="button"
            onClick={() => setShowSources(!showSources)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors min-h-[44px]"
            aria-expanded={showSources}
          >
            <span className="flex items-center gap-1.5">
              {t('showSourcesAria')} ({content.sources.length})
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showSources ? 'rotate-180' : ''}`}
              aria-hidden
            />
          </button>
          {showSources && (
            <ul
              className="mt-3 divide-y divide-slate-200 dark:divide-slate-700"
              role="list"
            >
              {content.sources.map((source, idx) => (
                <li key={idx} className="py-3 first:pt-0 last:pb-0">
                  <div className="text-xs leading-relaxed">
                    <div className="font-bold text-gray-900 dark:text-white">
                      {source.title ?? source.label}
                    </div>
                    <div className="mt-0.5 text-slate-600 dark:text-slate-400">
                      {source.year && <span>({source.year})</span>}
                      {source.institution && (
                        <span> · {source.institution}</span>
                      )}
                    </div>
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 text-xs font-medium"
                      >
                        {t('viewStudyLabel')}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export function ProductivityInfographicSlide({
  content,
  onGoToGlossary,
}: {
  content?: ProductivityInfographicContent;
  onGoToGlossary?: () => void;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const [showSources, setShowSources] = useState(false);

  if (!content) return null;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[550px]">
          {/* Left Section - Hero */}
          <div className="lg:col-span-1 bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 dark:from-brand-700 dark:via-brand-600 dark:to-brand-800 text-white p-6 lg:p-8 flex flex-col justify-center relative overflow-hidden">
            {/* Background decoration – Lucide per M-DS4 */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-10 select-none pointer-events-none"
              aria-hidden="true"
            >
              <Rocket className="w-32 h-32" strokeWidth={1} />
            </div>

            <h2
              className={`${typographyClasses.h2} mb-2 leading-tight relative z-10`}
            >
              {content.title}
            </h2>
            {onGoToGlossary && (
              <button
                type="button"
                onClick={onGoToGlossary}
                className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-medium mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg py-1 min-h-[44px]"
                aria-label={t('openGlossaryAria', {
                  term: content.title ?? '',
                })}
              >
                <BookMarked className="w-4 h-4" aria-hidden />
                <span>{t('glossaryLabel')}</span>
                <ChevronRight className="w-3.5 h-3.5" aria-hidden />
              </button>
            )}

            <div className="mb-6 relative z-10">
              <div
                className={`${typographyClasses.metric} text-5xl lg:text-6xl font-extrabold mb-2 drop-shadow-lg`}
              >
                {content.heroNumber}
              </div>
              <div className="text-lg lg:text-xl font-bold uppercase tracking-wider">
                {content.heroText}
              </div>
            </div>

            <div className="mt-auto relative z-10 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-xs lg:text-sm leading-relaxed italic">
                &ldquo;{content.conclusion}&rdquo;
              </p>
            </div>
          </div>

          {/* Right Section - Cards and Insights */}
          <div className="lg:col-span-2 p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 flex flex-col">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              {(content.cards ?? []).map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border-t-4 border-brand-500 dark:border-brand-400"
                >
                  <div className="text-3xl mb-2">
                    <SlideLucideIcon
                      name={card.icon}
                      context="infographic"
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-3">
                    {card.title}
                  </h3>
                  <div className="space-y-1.5">
                    {(card.stats ?? []).map((stat, statIdx) => (
                      <div
                        key={statIdx}
                        className="flex justify-between items-center p-1.5 bg-gray-50 dark:bg-gray-900/50 rounded"
                      >
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </span>
                        <span className="text-base font-extrabold text-brand-600 dark:text-brand-400">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Insights Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {(content.insights ?? []).map((insight, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center shadow-sm dark:shadow-md border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-2xl mb-1">{insight.emoji}</div>
                  <div className="text-lg font-extrabold text-brand-600 dark:text-brand-400 mb-0.5">
                    {insight.value}
                  </div>
                  <div
                    className={`${typographyClasses.label} text-gray-600 dark:text-gray-400 leading-tight`}
                  >
                    {insight.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Sources Section - Collapsible */}
            {content.sources && content.sources.length > 0 && (
              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowSources(!showSources)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <span>📚</span> {t('showSourcesAria')} (
                    {content.sources.length})
                  </span>
                  <span
                    className={`transform transition-transform ${showSources ? 'rotate-180' : ''}`}
                  >
                    ▼
                  </span>
                </button>
                {showSources && (
                  <ul
                    className="mt-3 divide-y divide-gray-200 dark:divide-gray-700"
                    role="list"
                  >
                    {content.sources.map((source, idx) => (
                      <li key={idx} className="py-3 first:pt-0 last:pb-0">
                        <div className="text-xs leading-relaxed">
                          <div className="font-bold text-gray-900 dark:text-gray-100">
                            {source.title ?? source.label}
                          </div>
                          <div className="mt-0.5 text-gray-600 dark:text-gray-400">
                            {source.journal && <span>{source.journal}</span>}
                            {source.year && (
                              <span className="text-gray-400 dark:text-gray-500">
                                {' '}
                                ({source.year})
                              </span>
                            )}
                            {source.institution && (
                              <span>
                                {source.journal || source.year ? ' · ' : ''}
                                {source.institution}
                              </span>
                            )}
                          </div>
                          {source.url && (
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1.5 inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 text-xs font-medium"
                            >
                              {t('viewStudyLabel')}
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── News-portal infographic – see src/components/slides/news-portal/ ─── */
export { NewsPortalInfographicSlide } from '../news-portal/NewsPortalInfographicSlide';

const DEFAULT_PRACTICE_SUMMARY_LT: PracticeSummaryContent = {
  title: 'Mokymas Baigtas!',
  subtitle:
    'Sveikiname! Tu sėkmingai baigei Prompt Anatomijos mokymą ir dabar gali kurti profesionalius, struktūruotus promptus.',
  learnedItems: [
    '6 blokų sistemą',
    'Hierarchijos svarbą',
    'Konkretaus input naudą',
    'Kokybės kontrolę',
  ],
  nextStepsItems: [
    'Praktikuokite kasdien',
    'Kurkite šablonų biblioteką',
    'Dalinkitės su komanda',
    'Iteruokite ir tobulinkite',
  ],
  taglineTitle: 'Struktūra = Rezultatas',
  taglineSub: '5 minutės geram promptui = valandos sutaupytos vėliau',
};

const DEFAULT_PRACTICE_SUMMARY_EN: PracticeSummaryContent = {
  title: 'Training Complete!',
  subtitle:
    'Congratulations! You have successfully completed the Prompt Anatomy training and can now create professional, structured prompts.',
  learnedItems: [
    '6-block system',
    'Importance of hierarchy',
    'Benefits of concrete input',
    'Quality control',
  ],
  nextStepsItems: [
    'Practice daily',
    'Build a template library',
    'Share with your team',
    'Iterate and improve',
  ],
  taglineTitle: 'Structure = Results',
  taglineSub: '5 minutes for a good prompt = hours saved later',
};

export interface PracticeSummarySlideProps {
  content?: PracticeSummaryContent | null;
  /** M9: rodyti „Užbaigta X iš N scenarijų“ (N iš practiceScenarioSlides) */
  completedScenarioCount?: number;
  totalScenarioCount?: number;
  moduleId?: number;
  slideId?: number;
  completedTaskIds?: number[];
  onNavigateToSlideById?: (slideId: number) => void;
}
export function PracticeSummarySlide({
  content: contentProp,
  completedScenarioCount,
  totalScenarioCount,
  moduleId,
  slideId,
  completedTaskIds,
  onNavigateToSlideById,
}: PracticeSummarySlideProps) {
  useTranslation();
  const t = getT('contentSlides');
  const tCommon = getT('common');
  const tPractice = getT('testPractice');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const localDefault = isEn
    ? DEFAULT_PRACTICE_SUMMARY_EN
    : DEFAULT_PRACTICE_SUMMARY_LT;
  const c = contentProp ?? localDefault;
  const isDefault = contentProp == null;
  const displaySubtitle = isDefault
    ? t('practiceSummaryDefaultSubtitle')
    : (c.subtitle ?? '');
  const displayLearned = isDefault
    ? [
        t('practiceSummaryDefaultLearned1'),
        t('practiceSummaryDefaultLearned2'),
        t('practiceSummaryDefaultLearned3'),
        t('practiceSummaryDefaultLearned4'),
      ]
    : (c.learnedItems ?? localDefault.learnedItems!);
  const displayNextSteps = isDefault
    ? [
        t('practiceSummaryDefaultNext1'),
        t('practiceSummaryDefaultNext2'),
        t('practiceSummaryDefaultNext3'),
        t('practiceSummaryDefaultNext4'),
      ]
    : (c.nextStepsItems ?? localDefault.nextStepsItems!);
  const displayTaglineTitle = isDefault
    ? t('practiceSummaryDefaultTaglineTitle')
    : (c.taglineTitle ?? '');
  const displayTaglineSub = isDefault
    ? t('practiceSummaryDefaultTaglineSub')
    : (c.taglineSub ?? '');
  const [handoutError, setHandoutError] = useState(false);
  const [kitState, setKitState] = useState(() =>
    moduleId === 9
      ? loadM9KitChecklist()
      : { catalog: false, csv: false, summary: false, reliability: false }
  );
  const hasSections = (c.sections?.length ?? 0) > 0;
  const showScenarioProgress =
    completedScenarioCount != null &&
    totalScenarioCount != null &&
    totalScenarioCount > 0;
  const dataReadyBadge =
    moduleId === 9 && hasM9DataReadyBadge(completedTaskIds);
  const kitReadyBadge = moduleId === 9 && isM9KitComplete(kitState);

  const toggleKitItem = (id: string) => {
    if (moduleId !== 9) return;
    setKitState((prev) => {
      const next = {
        ...prev,
        [id]: !prev[id as keyof typeof prev],
      };
      saveM9KitChecklist(next);
      return next;
    });
  };
  const handleM79HandoutDownload = useCallback(async () => {
    if (moduleId !== 9) return;
    try {
      setHandoutError(false);
      const content = getM79HandoutContent(locale) as M79HandoutContent;
      await downloadM79HandoutPdf(content, { locale });
      track('cta_click', {
        module_id: moduleId,
        slide_id: slideId,
        cta_id: 'm79_handout_pdf',
        cta_label: c.handoutDownloadLabel ?? t('m79HandoutCtaLabel'),
        destination: 'download',
      });
    } catch (error) {
      logError(error instanceof Error ? error : new Error(String(error)), {
        feature: 'handout_pdf',
        moduleId,
        slideId,
        locale,
        surface: 'practice_summary_slide',
      });
      setHandoutError(true);
    }
  }, [c.handoutDownloadLabel, locale, moduleId, slideId, t]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-accent-50 dark:from-emerald-900/20 dark:to-accent-900/20 p-8 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-brand-500 mb-4">
          <span className="text-4xl">🎓</span>
        </div>
        <h2 className="text-lg lg:text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {(c as { introHeading?: string }).introHeading ??
            c.title ??
            t('trainingCompleteTitle')}{' '}
          🎉
        </h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-lg mx-auto">
          {(c as { introBody?: string }).introBody ?? displaySubtitle}
        </p>
        {(c as { stats?: { label: string; value: string }[] }).stats?.length ? (
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {(c as { stats: { label: string; value: string }[] }).stats.map(
              (s, i) => (
                <span
                  key={i}
                  className="text-sm font-semibold text-accent-700 dark:text-accent-300"
                >
                  {s.value} {s.label}
                </span>
              )
            )}
          </div>
        ) : null}
        {showScenarioProgress && (
          <p className="mt-3 text-sm font-semibold text-accent-700 dark:text-accent-300">
            {t('completedScenariosText', {
              count: completedScenarioCount,
              total: totalScenarioCount,
            })}
          </p>
        )}
        {moduleId === 9 && (dataReadyBadge || kitReadyBadge) && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {dataReadyBadge && (
              <span className="rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-800 dark:border-brand-600 dark:bg-brand-950/40 dark:text-brand-200">
                {c.badges?.find((b) => b.id === 'data-ready')?.label ??
                  tPractice('m9BadgeDataReady')}
              </span>
            )}
            {kitReadyBadge && (
              <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-200">
                {c.badges?.find((b) => b.id === 'kit-ready')?.label ??
                  tPractice('m9BadgeKitReady')}
              </span>
            )}
          </div>
        )}
      </div>

      {moduleId === 9 && c.kitChecklist && c.kitChecklist.length > 0 && (
        <div
          className="rounded-xl border-2 border-brand-200 bg-white p-5 dark:border-brand-800 dark:bg-gray-900/40"
          role="group"
          aria-label={tPractice('m9KitChecklistAria')}
        >
          <h4 className="mb-3 font-bold text-gray-900 dark:text-white">
            {tPractice('m9KitChecklistHeading')}
          </h4>
          <ul className="space-y-2">
            {c.kitChecklist.map((item) => {
              const checked =
                kitState[item.id as keyof typeof kitState] === true;
              return (
                <li key={item.id}>
                  <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg px-2 py-1 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleKitItem(item.id)}
                      className="h-5 w-5 rounded border-brand-400 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-sm text-gray-800 dark:text-gray-200">
                      {item.label}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {moduleId === 9 &&
        c.hubCtaLabel &&
        c.hubSlideId != null &&
        onNavigateToSlideById && (
          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigateToSlideById(c.hubSlideId!)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border-2 border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-800 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-brand-600 dark:bg-gray-900 dark:text-brand-200 dark:hover:bg-brand-950/40"
            >
              {c.hubCtaLabel}
            </button>
          </div>
        )}

      {hasSections ? (
        <div className="space-y-4">
          {c.sections!.map((section, i) => (
            <div
              key={i}
              className={getContentBlockVariantClasses({
                variant: section.blockVariant || 'default',
                sectionPadding: 'p-5',
              })}
            >
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                {section.heading}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <CheckCircle
                className="w-4 h-4 text-emerald-500"
                strokeWidth={1.5}
              />{' '}
              {t('whatYouLearnedHeading')}
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              {displayLearned.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Rocket className="w-4 h-4" strokeWidth={1.5} />{' '}
              {t('nextStepsHeading')}
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              {displayNextSteps.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {c.reflectionPrompt && (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-accent-200 dark:border-accent-700">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">
            {isEn ? 'Reflection prompt' : 'Refleksijos promptas'}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {isEn
              ? 'Paste into AI and answer briefly.'
              : 'Įklijuok į DI ir atsakyk trumpai.'}
          </p>
          <div className="relative bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 mb-3">
            <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">
              {c.reflectionPrompt}
            </pre>
          </div>
          <ReflectionCopyButton text={c.reflectionPrompt} />
        </div>
      )}

      <TransferAbilityStrip
        abilityBefore={c.abilityBefore}
        abilityAfter={c.abilityAfter}
        firstAction24h={c.firstAction24h}
        isEn={isEn}
      />

      {c.ownWorkTemplate && (
        <OwnWorkSlot
          label={c.ownWorkLabel}
          placeholder={c.ownWorkPlaceholder}
          template={c.ownWorkTemplate}
          isEn={isEn}
        />
      )}

      {(c as { nextStepCTA?: string }).nextStepCTA && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-300 dark:border-emerald-700 rounded-xl p-4 text-center">
          <p className="font-bold text-emerald-800 dark:text-emerald-200 mb-1">
            {t('nextStepHeading')}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {(c as { nextStepCTA: string }).nextStepCTA}
          </p>
        </div>
      )}
      {moduleId === 9 && c.handoutDownloadLabel && (
        <div
          className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border-l-4 border-slate-400 p-4 text-center"
          role="region"
          aria-label={t('pdfHandoutAria')}
        >
          <HandoutDownloadButton
            label={c.handoutDownloadLabel}
            onClick={handleM79HandoutDownload}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            iconClassName="w-4 h-4 shrink-0"
          />
          {handoutError && (
            <p
              className="mt-3 text-sm text-rose-700 dark:text-rose-300"
              role="alert"
            >
              {tCommon('handoutPdfError')}
            </p>
          )}
        </div>
      )}
      {((c as { tagline?: string }).tagline ??
        displayTaglineTitle ??
        displayTaglineSub) && (
        <div className="bg-gradient-to-r from-brand-500 to-accent-500 p-6 rounded-xl text-white text-center">
          {(c as { tagline?: string }).tagline && (
            <p className="text-lg font-bold">
              {(c as { tagline: string }).tagline}
            </p>
          )}
          {!(c as { tagline?: string }).tagline && displayTaglineTitle && (
            <h4 className="text-xl font-bold mb-2">{displayTaglineTitle}</h4>
          )}
          {!(c as { tagline?: string }).tagline && displayTaglineSub && (
            <p className="text-brand-100">{displayTaglineSub}</p>
          )}
        </div>
      )}
    </div>
  );
}
/* PathStepSlide -> ./content/PathStepSlide.tsx */
