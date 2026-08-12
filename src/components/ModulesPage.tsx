import { useMemo, memo, useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle,
  ArrowRight,
  Lock,
  BookOpen,
  ClipboardList,
  Briefcase,
  PartyPopper,
  Award,
} from 'lucide-react';
import { Progress, type RetrievalScheduleItem } from '../utils/progress';
import { COMING_SOON_MODULES } from '../data/comingSoonModules';
import { RetrievalDueCard } from './RetrievalDueCard';
import {
  getEarnedCertificateTiers,
  getEarnedHandoutArtifacts,
} from '../data/completionArtifactsLoader';
import { getModulesSync } from '../data/modulesLoader';
import { useLocale } from '../contexts/LocaleContext';
import { getMaxAccessibleModuleId } from '../utils/accessTier';
import {
  dismissChapterRecovery,
  getChapterEntryModuleIds,
  getRecommendedChapterAwareModuleIds,
  getSequenceLockedModuleIds,
  isChapterRecoveryDismissed,
  shouldShowChapterRecovery,
  shouldShowChapterStartBadge,
} from '../utils/chapterStarts';
import { getIsMvpMode } from '../utils/mvpMode';
import { getTierForModule } from '../constants/pricing';
import { LoadingSpinner, Card, Badge, CTAButton } from './ui';
import Eyebrow from './ui/Eyebrow';
import { focusRingClasses, touchTargetClasses } from '../design-tokens';
import { HandoutDownloadButton } from './HandoutDownloadButton';
import { downloadHandout } from '../utils/downloadHandout';
import type { Module, ModuleAccent } from '../types/modules';
import {
  accentChipClasses,
  accentIconWellClasses,
  accentTopBarClasses,
  comingSoonAccentClasses,
  resolveModuleAccent,
  resolveModuleIcon,
  trackSectionClasses,
} from '../utils/moduleIdentity';
import CircularProgress from './CircularProgress';
import AccessGateScreen from './AccessGateScreen';
import { moduleWord } from '../utils/ltPlural';

interface ModulesPageProps {
  onModuleSelect: (moduleId: number) => void;
  onGoToQuiz?: () => void;
  progress: Progress;
  onRequestCertificate?: (tier: 1 | 2 | 3 | 4 | 5) => void;
  onStartRetrieval?: (item: RetrievalScheduleItem) => void;
  onOpenEvalHabit?: (moduleId: number, slideId: number) => void;
}

type TrackAccent = 'brand' | 'sky' | 'fuchsia' | 'rose' | 'cyan';

type ModuleGridItem =
  | { type: 'module'; module: Module; index: number }
  | {
      type: 'section';
      id: 'base' | 'data' | 'agents' | 'content' | 'code';
      accent: TrackAccent;
      title: string;
      subtitle: string;
      moduleIds: number[];
    }
  | {
      type: 'subsection';
      id: string;
      accent: 'brand';
      title: string;
      subtitle: string;
    };

// Level colors for modules based on type: learn, test, practice (business-oriented)
function useLevelStyles(t: (k: string) => string) {
  return {
    learn: {
      gradient: 'from-brand-700 to-brand-800',
      bg: 'bg-brand-50 dark:bg-brand-900/20',
      border: 'border-brand-200 dark:border-brand-800',
      text: 'text-brand-700 dark:text-brand-300',
      badgeIcon: BookOpen,
      badgeLabel: t('modulesPage:badgeLearn'),
    },
    test: {
      gradient: 'from-slate-600 to-slate-700',
      bg: 'bg-slate-50 dark:bg-slate-900/20',
      border: 'border-slate-200 dark:border-slate-800',
      text: 'text-slate-700 dark:text-slate-300',
      badgeIcon: ClipboardList,
      badgeLabel: t('modulesPage:badgeTest'),
    },
    practice: {
      gradient: 'from-emerald-600 to-emerald-700',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-800',
      text: 'text-emerald-700 dark:text-emerald-300',
      badgeIcon: Briefcase,
      badgeLabel: t('modulesPage:badgePractice'),
    },
  };
}

const moduleLevels = ['learn', 'test', 'practice'] as const;

const TRACK_MODULE_IDS: number[][] = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
  [13, 14, 15],
  [16, 17, 18],
];

type DisplayGridItem = ModuleGridItem | { type: 'materials' };

/** Insert „Mano medžiaga“ after last tier-accessible module card (before locked tracks). */
function insertMaterialsAfterAccessible(
  items: ModuleGridItem[],
  maxAccessible: number,
  enabled: boolean
): DisplayGridItem[] {
  if (!enabled) return items;
  let lastAccessibleIdx = -1;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type === 'module' && item.module.id <= maxAccessible) {
      lastAccessibleIdx = i;
    }
  }
  const materialsItem = { type: 'materials' as const };
  if (lastAccessibleIdx === -1) {
    return [...items, materialsItem];
  }
  return [
    ...items.slice(0, lastAccessibleIdx + 1),
    materialsItem,
    ...items.slice(lastAccessibleIdx + 1),
  ];
}

function ModulesPage({
  onModuleSelect,
  onGoToQuiz,
  progress,
  onRequestCertificate,
  onStartRetrieval,
  onOpenEvalHabit,
}: ModulesPageProps) {
  const { t } = useTranslation([
    'modulesPage',
    'module',
    'testPractice',
    'common',
  ]);
  const { locale } = useLocale();
  const levelStyles = useLevelStyles(t);
  const modules = getModulesSync(locale);
  const [materialsError, setMaterialsError] = useState(false);
  const [recoveryDismissed, setRecoveryDismissed] = useState(() =>
    isChapterRecoveryDismissed()
  );

  // Preload ModuleView and SlideContent for faster navigation when user selects a module
  useEffect(() => {
    if (import.meta.env.MODE === 'test') return;
    void Promise.all([import('./ModuleView'), import('./SlideContent')]).catch(
      () => {
        // Prefetch is a performance hint only; navigation will import on demand.
      }
    );
  }, []);

  // Memoize completed count and total modules (hooks must be called before early return)
  const completedCount = useMemo(
    () => progress.completedModules.length,
    [progress.completedModules.length]
  );
  const totalModules = useMemo(() => modules?.length ?? 0, [modules?.length]);

  // Memoize module progress calculations
  const moduleProgressMap = useMemo(() => {
    if (!modules) return new Map<number, number>();
    const map = new Map<number, number>();
    modules.forEach((module) => {
      const completedTasks = progress.completedTasks[module.id]?.length || 0;
      const totalTasks = module.slides.filter(
        (s) =>
          (s as { practicalTask?: unknown }).practicalTask ||
          (s as { testQuestions?: unknown }).testQuestions ||
          (s as { scenario?: unknown }).scenario
      ).length;
      const isCompleted = progress.completedModules.includes(module.id);

      if (isCompleted) {
        map.set(module.id, 100);
      } else if (totalTasks === 0) {
        map.set(module.id, 0);
      } else {
        map.set(module.id, Math.round((completedTasks / totalTasks) * 100));
      }
    });
    return map;
  }, [progress.completedTasks, progress.completedModules, modules]);

  // Development arba localhost (preview): sekantinis užrakinimas išjungtas; tier užrakinimas visada taikomas.
  const DISABLE_MODULE_LOCK =
    import.meta.env.DEV ||
    (typeof window !== 'undefined' && window.location.hostname === 'localhost');

  const maxAccessible = getMaxAccessibleModuleId();
  const localeKey = locale === 'en' ? 'en' : 'lt';

  const comingSoonModules = useMemo(() => {
    if (!modules || getIsMvpMode() || maxAccessible < 9) return [];
    const loadedModuleIds = new Set(modules.map((module) => module.id));
    return COMING_SOON_MODULES.filter(
      (module) => !loadedModuleIds.has(module.id)
    );
  }, [modules, maxAccessible]);

  const comingSoonTracks = useMemo(() => {
    const tracks: Array<{
      id: 'agents' | 'content';
      accent: 'fuchsia' | 'rose';
      titleKey: 'comingSoonAgentsTitle' | 'comingSoonContentTitle';
      subtitleKey: 'comingSoonAgentsSubtitle' | 'comingSoonContentSubtitle';
      modules: typeof comingSoonModules;
    }> = [
      {
        id: 'agents',
        accent: 'fuchsia',
        titleKey: 'comingSoonAgentsTitle',
        subtitleKey: 'comingSoonAgentsSubtitle',
        modules: comingSoonModules.filter((m) => m.track === 'agents'),
      },
      {
        id: 'content',
        accent: 'rose',
        titleKey: 'comingSoonContentTitle',
        subtitleKey: 'comingSoonContentSubtitle',
        modules: comingSoonModules.filter((m) => m.track === 'content'),
      },
    ];
    return tracks.filter((track) => track.modules.length > 0);
  }, [comingSoonModules]);

  // Sequence locks; chapter entries (1/4/7/10) bypass unlocksAfter by tier.
  const lockedModules = useMemo(() => {
    if (!modules) return new Set<number>();
    return getSequenceLockedModuleIds(
      modules,
      progress.completedModules,
      maxAccessible,
      DISABLE_MODULE_LOCK
    );
  }, [DISABLE_MODULE_LOCK, progress.completedModules, modules, maxAccessible]);

  // One "recommended next" per track (chapter entries count as open starts).
  const recommendedModuleIds = useMemo(() => {
    if (!modules) return new Set<number>();
    return getRecommendedChapterAwareModuleIds(
      TRACK_MODULE_IDS,
      modules,
      progress.completedModules,
      maxAccessible
    );
  }, [modules, progress.completedModules, maxAccessible]);

  const chapterEntryIds = useMemo(
    () => getChapterEntryModuleIds(maxAccessible),
    [maxAccessible]
  );

  const showRecoveryCard =
    !recoveryDismissed &&
    shouldShowChapterRecovery(progress.completedModules, maxAccessible);

  const showChapterStrip = maxAccessible >= 6;

  const handleDismissRecovery = useCallback(() => {
    dismissChapterRecovery();
    setRecoveryDismissed(true);
  }, []);

  const moduleGridItems = useMemo((): ModuleGridItem[] => {
    if (!modules) return [];
    const moduleEntries = modules.map((module, index) => ({ module, index }));
    const groups: Array<{
      id: 'base' | 'data' | 'agents' | 'content' | 'code';
      accent: TrackAccent;
      title: string;
      subtitle: string;
      moduleIds: number[];
    }> = [
      {
        id: 'base',
        accent: 'brand',
        title: t('trackBaseTitle'),
        subtitle: t('trackBaseSubtitle'),
        moduleIds: TRACK_MODULE_IDS[0],
      },
      {
        id: 'data',
        accent: 'sky',
        title: t('trackDataTitle'),
        subtitle: t('trackDataSubtitle'),
        moduleIds: TRACK_MODULE_IDS[1],
      },
      {
        id: 'agents',
        accent: 'fuchsia',
        title: t('trackAgentsTitle'),
        subtitle: t('trackAgentsSubtitle'),
        moduleIds: TRACK_MODULE_IDS[2],
      },
      {
        id: 'content',
        accent: 'rose',
        title: t('trackContentTitle'),
        subtitle: t('trackContentSubtitle'),
        moduleIds: TRACK_MODULE_IDS[3],
      },
      {
        id: 'code',
        accent: 'cyan',
        title: t('trackCodeTitle'),
        subtitle: t('trackCodeSubtitle'),
        moduleIds: TRACK_MODULE_IDS[4],
      },
    ];

    return groups.flatMap((group): ModuleGridItem[] => {
      const groupModules = moduleEntries.filter(({ module }) =>
        group.moduleIds.includes(module.id)
      );
      if (groupModules.length === 0) return [];

      const toModuleItems = (
        entries: typeof groupModules
      ): Array<Extract<ModuleGridItem, { type: 'module' }>> =>
        entries.map(({ module, index }) => ({
          type: 'module' as const,
          module,
          index,
        }));

      // Bazė M1–M6: po M1–M3 – tylesnė sub-juosta prieš M4–M6 (ne antras track).
      if (group.id === 'base') {
        const firstCycle = groupModules.filter(({ module }) => module.id <= 3);
        const secondCycle = groupModules.filter(({ module }) => module.id >= 4);
        return [
          { type: 'section', ...group },
          ...toModuleItems(firstCycle),
          {
            type: 'subsection',
            id: 'base-cycle-2',
            accent: 'brand',
            title: t('trackBaseCycle2Title'),
            subtitle: t('trackBaseCycle2Subtitle'),
          },
          ...toModuleItems(secondCycle),
        ];
      }

      return [{ type: 'section', ...group }, ...toModuleItems(groupModules)];
    });
  }, [modules, t]);

  const earnedHandoutArtifacts = useMemo(
    () => getEarnedHandoutArtifacts(progress.completedModules),
    [progress.completedModules]
  );

  const earnedCertificateTiers = useMemo(
    () => getEarnedCertificateTiers(progress),
    [progress]
  );

  const hasMaterials =
    earnedHandoutArtifacts.length > 0 ||
    (Boolean(onRequestCertificate) && earnedCertificateTiers.length > 0);

  const displayGridItems = useMemo(
    () =>
      insertMaterialsAfterAccessible(
        moduleGridItems,
        maxAccessible,
        hasMaterials
      ),
    [moduleGridItems, maxAccessible, hasMaterials]
  );

  const handleMaterialHandoutDownload = useCallback(
    async (moduleId: number) => {
      try {
        setMaterialsError(false);
        const artifact = earnedHandoutArtifacts.find((candidate) =>
          candidate.earnOnModuleIds.includes(moduleId)
        );
        await downloadHandout(moduleId, locale, {
          ctaLabel: artifact ? t(artifact.ctaI18nKey) : undefined,
        });
      } catch {
        setMaterialsError(true);
      }
    },
    [earnedHandoutArtifacts, locale, t]
  );

  // Show loading if modules not yet loaded
  if (!modules) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text={t('loading')} />
      </div>
    );
  }

  if (maxAccessible === 0) {
    return <AccessGateScreen />;
  }

  // Helper functions (moved outside to avoid recreation)
  const getModuleProgress = (moduleId: number) => {
    return moduleProgressMap.get(moduleId) || 0;
  };

  const isModuleLocked = (moduleIndex: number) => {
    const moduleId = modules[moduleIndex]?.id;
    if (moduleId == null) return false;
    const lockedByTier = moduleId > maxAccessible;
    const lockedBySequence = moduleIndex > 0 && lockedModules.has(moduleId);
    return lockedByTier || lockedBySequence;
  };

  const getLockReason = (moduleId: number, moduleIndex: number) => {
    const lockedByTier = moduleId > maxAccessible;
    const lockedBySequence = moduleIndex > 0 && lockedModules.has(moduleId);
    if (lockedByTier) return 'tier' as const;
    if (lockedBySequence) return 'sequence' as const;
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Header – paprasta kalba, konkretus naudos sakinys, Golden: vienas H1 */}
      <div className="text-center animate-fade-in">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {t('headerTitle')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('headerSubtitle')}
        </p>
      </div>

      {onStartRetrieval && (
        <div className="max-w-3xl mx-auto">
          <RetrievalDueCard
            progress={progress}
            isEn={locale === 'en'}
            onStartRetrieval={onStartRetrieval}
            onOpenEval={onOpenEvalHabit}
          />
        </div>
      )}

      {showRecoveryCard && (
        <Card
          className="p-5 lg:p-6 border-2 border-brand-200 dark:border-brand-800 max-w-3xl mx-auto"
          role="region"
          aria-label={t('chapterRecoveryAria')}
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {t('chapterRecoveryTitle')}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t('chapterRecoveryBody')}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {chapterEntryIds.map((id) => (
              <CTAButton
                key={`recovery-${id}`}
                variant={id === 1 ? 'primary' : 'secondary'}
                onClick={() => onModuleSelect(id)}
                className={touchTargetClasses.minimumHeight}
                aria-label={t('chapterStartChipAria', { n: id })}
              >
                {t('chapterStartChip', { n: id })}
              </CTAButton>
            ))}
            <CTAButton
              variant="secondary"
              onClick={handleDismissRecovery}
              className={touchTargetClasses.minimumHeight}
            >
              {t('chapterRecoveryDismiss')}
            </CTAButton>
          </div>
        </Card>
      )}

      {showChapterStrip && (
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-3 max-w-3xl mx-auto"
          role="navigation"
          aria-label={t('chapterStripAria')}
        >
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 text-center sm:text-left">
            {t('chapterStripLabel')}
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {chapterEntryIds.map((id) => (
              <button
                key={`strip-${id}`}
                type="button"
                onClick={() => onModuleSelect(id)}
                className={`${touchTargetClasses.minimumHeight} px-3 py-1.5 text-sm font-semibold rounded-lg border border-brand-200 dark:border-brand-700 bg-brand-50 dark:bg-brand-900/30 text-brand-800 dark:text-brand-200 hover:bg-brand-100 dark:hover:bg-brand-900/50 ${focusRingClasses.brandOnWhite}`}
                aria-label={t('chapterStartChipAria', { n: id })}
              >
                {t('chapterStartChip', { n: id })}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <Card className="px-8 py-4 inline-flex items-center gap-6">
          <CircularProgress
            progress={
              totalModules === 0 ? 0 : (completedCount / totalModules) * 100
            }
            size={60}
            strokeWidth={6}
          />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('overallProgress')}
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {t('modulesCount', {
                done: completedCount,
                total: totalModules,
                modulesWord: moduleWord(locale, totalModules, 'genitive'),
              })}
            </p>
          </div>
        </Card>
      </div>

      {/* Modules grid — materials after last id <= maxAccessible */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {displayGridItems.map((item) => {
          if (item.type === 'section') {
            return (
              <section
                key={`section-${item.id}`}
                className="lg:col-span-3 pt-2"
                aria-label={item.title}
              >
                <div className={trackSectionClasses[item.accent]}>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {item.subtitle}
                  </p>
                </div>
              </section>
            );
          }

          if (item.type === 'subsection') {
            return (
              <section
                key={`subsection-${item.id}`}
                className="lg:col-span-3 mt-2 pt-6 border-t border-brand-200/80 dark:border-brand-800/80"
                aria-label={item.title}
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {item.subtitle}
                </p>
              </section>
            );
          }

          if (item.type === 'materials') {
            return (
              <div key="materials" className="lg:col-span-3">
                <Card
                  className="p-5 lg:p-6 border-2 border-brand-100 dark:border-brand-800"
                  aria-labelledby="my-materials-title"
                  role="region"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div>
                      <h2
                        id="my-materials-title"
                        className="text-xl font-bold text-gray-900 dark:text-white"
                      >
                        {t('myMaterialsTitle')}
                      </h2>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {t('myMaterialsSubtitle')}
                      </p>
                    </div>
                    {earnedCertificateTiers.length > 0 &&
                      onRequestCertificate && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300">
                          <Award className="w-3.5 h-3.5" aria-hidden />
                          {t('myMaterialsCertificatesBadge')}
                        </span>
                      )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {earnedHandoutArtifacts.map((artifact) => {
                      const moduleId =
                        artifact.earnOnModuleIds[
                          artifact.earnOnModuleIds.length - 1
                        ];
                      return (
                        <HandoutDownloadButton
                          key={`handout-${artifact.key}`}
                          label={t(artifact.ctaI18nKey)}
                          onClick={() =>
                            handleMaterialHandoutDownload(moduleId)
                          }
                          className={touchTargetClasses.minimumHeight}
                          iconClassName="w-4 h-4"
                        />
                      );
                    })}
                    {onRequestCertificate &&
                      earnedCertificateTiers.map((tier) => (
                        <CTAButton
                          key={`certificate-${tier}`}
                          variant="secondary"
                          onClick={() => onRequestCertificate(tier)}
                          className={touchTargetClasses.minimumHeight}
                          aria-label={t(`certificateTier${tier}Aria`)}
                        >
                          <Award className="w-4 h-4" aria-hidden />
                          {t(`certificateTier${tier}`)}
                        </CTAButton>
                      ))}
                  </div>

                  {materialsError && (
                    <p
                      className="mt-3 text-sm text-rose-700 dark:text-rose-300"
                      role="alert"
                    >
                      {t('common:handoutPdfError')}
                    </p>
                  )}
                </Card>
              </div>
            );
          }

          const { module, index } = item;
          const moduleNumber = index + 1;
          const moduleProgress = getModuleProgress(module.id);
          const isCompleted = progress.completedModules.includes(module.id);
          const locked = isModuleLocked(index);
          const lockReason = getLockReason(module.id, index);
          let tierForCta =
            lockReason === 'tier' ? getTierForModule(module.id) : null;
          if (getIsMvpMode() && module.id > 6) tierForCta = null;
          const levelKey = (module as { level?: string }).level;
          const level =
            levelKey === 'learn' ||
            levelKey === 'test' ||
            levelKey === 'practice'
              ? levelKey
              : moduleLevels[index % moduleLevels.length];
          const styles = levelStyles[level];
          const BadgeIcon = styles.badgeIcon;
          const ctaLabel = locked
            ? t('locked')
            : moduleProgress === 0
              ? t('ctaStart')
              : moduleProgress >= 100
                ? t('ctaView')
                : t('ctaContinue');
          const isRecommendedNext = recommendedModuleIds.has(module.id);
          const showChapterBadge =
            !locked &&
            shouldShowChapterStartBadge(
              module.id,
              modules,
              progress.completedModules,
              maxAccessible
            );
          const moduleAccent: ModuleAccent = resolveModuleAccent(module);
          const topStripeClass = module.accent
            ? accentTopBarClasses[module.accent]
            : null;
          const ModuleIconCmp = resolveModuleIcon(module.icon);
          const ctaGradientClass =
            level === 'practice'
              ? 'from-accent-500 to-accent-600'
              : styles.gradient;

          const isMvpLocked7Plus =
            getIsMvpMode() && module.id > 6 && lockReason === 'tier';
          const lockedAriaLabel = isMvpLocked7Plus
            ? t('lockTierMvpLater')
            : lockReason === 'tier' && tierForCta
              ? t('lockTierAria', {
                  moduleNumber,
                  maxModuleId: tierForCta.maxModuleId,
                  priceEur: tierForCta.priceEur,
                  modulesWord: moduleWord(
                    locale,
                    tierForCta.maxModuleId,
                    'genitive'
                  ),
                })
              : t('lockSequenceAria', { moduleNumber, title: module.title });
          const cardAriaLabel = locked
            ? lockedAriaLabel
            : t('cardAria', {
                action: ctaLabel,
                moduleNumber,
                title: module.title,
              });

          return (
            <Card
              key={module.id}
              className={`relative overflow-hidden transition-all duration-300 animate-fade-in ${
                locked
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:shadow-lg hover:-translate-y-0.5'
              } ${isRecommendedNext ? 'ring-2 ring-accent-500 ring-offset-2 dark:ring-offset-gray-900 shadow-lg shadow-accent-500/20' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={locked ? undefined : () => onModuleSelect(module.id)}
              role="button"
              tabIndex={locked ? -1 : 0}
              onKeyDown={
                locked
                  ? undefined
                  : (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onModuleSelect(module.id);
                      }
                    }
              }
              aria-label={cardAriaLabel}
              aria-disabled={locked}
            >
              {/* Top stripe — module.accent (E5.4) or level gradient */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 ${
                  topStripeClass ?? `bg-gradient-to-r ${styles.gradient}`
                }`}
              />

              {/* Locked overlay */}
              {locked && (
                <div className="absolute inset-0 bg-gray-100/90 dark:bg-gray-900/85 z-10 flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-10 h-10 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {isMvpLocked7Plus
                        ? t('lockTierMvpLater')
                        : lockReason === 'tier' && tierForCta
                          ? t('lockTierShort', {
                              max: tierForCta.maxModuleId,
                              price: tierForCta.priceEur,
                              modulesWord: moduleWord(
                                locale,
                                tierForCta.maxModuleId,
                                'genitive'
                              ),
                            })
                          : t('lockCompletePrevious')}
                    </p>
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`${accentIconWellClasses[moduleAccent]} p-3 rounded-xl shadow-md`}
                    >
                      {ModuleIconCmp && (
                        <ModuleIconCmp
                          className="w-6 h-6 text-white"
                          strokeWidth={1.5}
                        />
                      )}
                    </div>
                    <div>
                      {/* Badges: mobile max 2 (Modulis N + vienas iš Rekomenduojama/Baigta/level), desktop – visi */}
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className="text-xs font-semibold text-gray-500 dark:text-gray-400 lg:hidden"
                          aria-label={t('moduleN', { n: moduleNumber })}
                        >
                          {t('moduleN', { n: moduleNumber })}
                        </span>
                        {/* Desktop: Eyebrow (level) when not recommended */}
                        {!isRecommendedNext && !isCompleted && (
                          <Eyebrow
                            icon={BadgeIcon}
                            accent={moduleAccent}
                            className="hidden lg:flex mb-0"
                          >
                            {t('moduleN', { n: moduleNumber })} ·{' '}
                            {styles.badgeLabel}
                          </Eyebrow>
                        )}
                        {isRecommendedNext && (
                          <span className="hidden lg:inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300">
                            {t('recommendedNext')}
                          </span>
                        )}
                        {showChapterBadge && !isRecommendedNext && (
                          <Badge
                            variant="brand"
                            className="hidden lg:inline-flex"
                          >
                            {t('chapterStartBadge')}
                          </Badge>
                        )}
                        {isCompleted && (
                          <Badge
                            variant="success"
                            className="hidden lg:inline-flex"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {t('badgeCompleted')}
                          </Badge>
                        )}
                        {/* Mobile: one secondary – Rekomenduojama > Baigta > skyriaus startas > level */}
                        {isRecommendedNext && (
                          <span className="lg:hidden inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300">
                            {t('recommendedNext')}
                          </span>
                        )}
                        {!isRecommendedNext && isCompleted && (
                          <Badge
                            variant="success"
                            className="lg:hidden inline-flex gap-1"
                          >
                            <CheckCircle className="w-3 h-3" />
                            {t('badgeCompleted')}
                          </Badge>
                        )}
                        {!isRecommendedNext &&
                          !isCompleted &&
                          showChapterBadge && (
                            <Badge
                              variant="brand"
                              className="lg:hidden inline-flex"
                            >
                              {t('chapterStartBadge')}
                            </Badge>
                          )}
                        {!isRecommendedNext &&
                          !isCompleted &&
                          !showChapterBadge && (
                            <span
                              className={`lg:hidden inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${styles.bg} ${styles.text}`}
                            >
                              <BadgeIcon className="w-3 h-3" strokeWidth={2} />
                              {styles.badgeLabel}
                            </span>
                          )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {module.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Subtitle + duration (separate line so description is not truncated) */}
                <p
                  className={`text-sm text-gray-500 dark:text-gray-400 ${module.duration ? 'mb-1' : 'mb-3'}`}
                >
                  {module.subtitle}
                </p>
                {module.duration ? (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {module.duration}
                  </p>
                ) : null}

                {/* Description – min-h užtikrina vienodą kortelių aukštį grid'e (max 120 simbolių per .cursor/rules/module-description-criteria.mdc) */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed min-h-[4.5rem] line-clamp-3">
                  {module.description}
                </p>

                {/* Progress — level gradient (level signal); icon/chips use track accent */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1.5">
                    <span>{t('progressLabel')}</span>
                    <span className="font-bold">{moduleProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${styles.gradient} h-2.5 rounded-full transition-all duration-500 ease-out relative`}
                      style={{ width: `${moduleProgress}%` }}
                    >
                      {moduleProgress > 0 && moduleProgress < 100 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Temos / Verslo pavyzdžiai – chip fonas = track accent */}
                {module.businessExamples &&
                  module.businessExamples.length > 0 && (
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {level === 'test'
                          ? t('topicsLabel')
                          : t('businessExamplesLabel')}
                      </p>
                      <div className="space-y-1.5">
                        {module.businessExamples
                          .slice(0, 2)
                          .map((example: { title: string }, idx: number) => (
                            <div
                              key={idx}
                              className={`text-xs ${accentChipClasses[moduleAccent]} p-2 rounded-lg`}
                            >
                              • {example.title}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                {/* Decorative CTA — navigation only via card (single tab stop) */}
                <span
                  className={`w-full ${touchTargetClasses.minimumHeight} flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                    locked
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                      : `bg-gradient-to-r ${ctaGradientClass} text-white shadow-md`
                  }`}
                  aria-hidden="true"
                >
                  {locked ? (
                    <>
                      <Lock className="w-4 h-4" />
                      {t('locked')}
                    </>
                  ) : (
                    <>
                      {ctaLabel}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {comingSoonTracks.map((track) => {
        const accentUi = comingSoonAccentClasses[track.accent];
        return (
          <section
            key={`coming-soon-${track.id}`}
            className="space-y-4"
            aria-labelledby={`coming-soon-modules-title-${track.id}`}
          >
            <div className="text-center max-w-2xl mx-auto">
              <p
                className={`text-xs font-semibold uppercase tracking-wide mb-2 ${accentUi.eyebrow}`}
              >
                {t('comingSoonEyebrow')}
              </p>
              <h2
                id={`coming-soon-modules-title-${track.id}`}
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                {t(track.titleKey)}
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {t(track.subtitleKey)}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {track.modules.map((module) => {
                const styles = levelStyles[module.level];
                const ModuleIconCmp = resolveModuleIcon(module.icon);
                const topStripeClass = accentTopBarClasses[module.accent];

                return (
                  <Card
                    key={module.id}
                    className="relative overflow-hidden opacity-80"
                    role="article"
                    aria-label={t('comingSoonCardAria', {
                      title: module.title[localeKey],
                    })}
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-1.5 ${topStripeClass}`}
                    />
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`bg-gradient-to-br ${styles.gradient} p-3 rounded-xl shadow-md`}
                          >
                            {ModuleIconCmp && (
                              <ModuleIconCmp
                                className="w-6 h-6 text-white"
                                strokeWidth={1.5}
                              />
                            )}
                          </div>
                          <div>
                            <span
                              className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${accentUi.badge}`}
                            >
                              {t('comingSoonBadge')}
                            </span>
                            <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                              {module.title[localeKey]}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {module.subtitle[localeKey]}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed min-h-[4.5rem]">
                        {module.description[localeKey]}
                      </p>
                      <div
                        className={`mt-5 rounded-xl border border-dashed px-4 py-3 text-sm ${accentUi.note}`}
                      >
                        {t('comingSoonNote')}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Soft CTA po M3 – branduolio pasitikrinimas prieš pažangesnius modulius */}
      {onGoToQuiz &&
        progress.completedModules.includes(3) &&
        !progress.quizCompleted &&
        completedCount < totalModules && (
          <Card className="p-5 sm:p-6 border border-brand-200 dark:border-brand-800 bg-brand-50/60 dark:bg-brand-900/20 text-center animate-fade-in">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {t('readyCheckBeforeM4')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-xl mx-auto">
              {t('readyCheckBeforeM4Body')}
            </p>
            <CTAButton
              variant="secondary"
              onClick={onGoToQuiz}
              className="px-6 py-3 rounded-xl font-semibold group"
              aria-label={t('readyCheckBeforeM4Aria')}
            >
              {t('readyCheckBeforeM4')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </CTAButton>
          </Card>
        )}

      {/* Completion message */}
      {completedCount === totalModules && (
        <Card className="p-6 bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 border-2 border-brand-200 dark:border-brand-800 text-center animate-bounce-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
            {t('allCompleteTitle')}
            <PartyPopper
              className="w-5 h-5 text-accent-500"
              strokeWidth={1.5}
            />
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('allCompleteSubtitle')}
          </p>
          {onGoToQuiz && (
            <CTAButton
              variant="primary"
              onClick={onGoToQuiz}
              className="px-6 py-3 rounded-xl font-semibold group"
              aria-label={t('goToQuiz')}
            >
              {t('goToQuiz')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </CTAButton>
          )}
        </Card>
      )}
    </div>
  );
}

// Memoize component to prevent unnecessary re-renders
export default memo(ModulesPage);
