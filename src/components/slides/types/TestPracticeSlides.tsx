import { useState, useEffect, useCallback, useMemo } from 'react';
import { CheckCircle, ChevronRight, Target, Flame, ExternalLink, ClipboardCheck, ListChecks, Lightbulb, BarChart2, TrendingUp, Users, Megaphone, MessageSquare, AlertCircle, Briefcase, Download } from 'lucide-react';
import type { Slide, TestQuestion, PracticeScenarioHubContent, M9Character } from '../../../types/modules';
import { CharacterCard, CopyButton } from '../shared';
import type { Progress } from '../../../utils/progress';
import { McqQuestion, TrueFalseQuestion, MatchingQuestion, OrderingQuestion, ScenarioQuestion } from '../shared/questions';
import type { ConfidenceLevel } from '../shared/questions';
import RadarChart from '../shared/RadarChart';
import type { RadarDataPoint } from '../shared/RadarChart';
import { useTranslation } from 'react-i18next';
import { getT } from '../../../i18n';
import { useCountUp } from '../../../utils/useCountUp';
import { getModulesSync } from '../../../data/modulesLoader';
import { useLocale } from '../../../contexts/LocaleContext';
import m9CharactersData from '@m9-characters-data';
import { getM5HandoutContent } from '../../../data/handoutContentLoader';
import { downloadM5HandoutPdf, type M5HandoutContent } from '../../../utils/m5HandoutPdf';
import { saveSlidePosition } from '../../../utils/useSlideNavigation';
import { selectQuestionsByCategory } from '../../../utils/questionPoolSelector';

/** Category scores from the last test attempt (session-lived, not persisted) */
export interface CategoryScore {
  correct: number;
  total: number;
  percentage: number;
}
let lastCategoryScores: Record<string, CategoryScore> = {};
let lastMaxStreak = 0;

const M9_CHARACTERS: M9Character[] = (m9CharactersData as { characters: M9Character[] }).characters;

function getWhyBenefit(slide: Slide | undefined): string | undefined {
  const c = slide?.content as { whyBenefit?: string } | undefined;
  return c?.whyBenefit;
}

function getPracticeIntroContent(slide: Slide | undefined): {
  whyBenefit?: string;
  /** M9: viena dominuojanti mintis (ką darysi + ką gausi) */
  meaningParagraph?: string;
  /** Modulio 9: viena aiški užduotis vienu sakiniu */
  taskOneLiner?: string;
  duration?: string;
  audience?: string;
  firstActionCTA?: string;
  recommendedStart?: string;
  learningOutcomes?: string[];
  /** Modulio 9: bendro siužeto blokas įvade */
  storyBlock?: string;
  /** M9: veikėjų prasmė vienu sakiniu (tematikos pasirinkimas) */
  characterMeaning?: string;
  /** Modulio 9: „Kur pritaikyti?“ blokas */
  useCaseBlock?: string;
  /** Modulio 9: rekomenduojamų scenarijų slide id sąrašas (101, 102, 105, 104) */
  recommendedSlideIds?: number[];
  /** M3: bent kiek scenarijų privaloma užbaigti (jei nurodyta – rodoma „Pasirinkite bent N“) */
  minScenariosToComplete?: number;
  /** M3: instrukcija „Pasirinkite bent 2 scenarijus…“ */
  optionalInstruction?: string;
  /** M6: pažadas apie parsisiunčiamą PDF atmintinę (CTA) */
  handoutPromise?: string;
} {
  const c = slide?.content as Record<string, unknown> | undefined;
  return c
    ? {
        whyBenefit: c.whyBenefit as string | undefined,
        meaningParagraph: c.meaningParagraph as string | undefined,
        taskOneLiner: c.taskOneLiner as string | undefined,
        duration: c.duration as string | undefined,
        audience: c.audience as string | undefined,
        firstActionCTA: c.firstActionCTA as string | undefined,
        recommendedStart: c.recommendedStart as string | undefined,
        learningOutcomes: Array.isArray(c.learningOutcomes) ? (c.learningOutcomes as string[]) : undefined,
        storyBlock: c.storyBlock as string | undefined,
        characterMeaning: c.characterMeaning as string | undefined,
        useCaseBlock: c.useCaseBlock as string | undefined,
        recommendedSlideIds: Array.isArray(c.recommendedSlideIds) ? (c.recommendedSlideIds as number[]) : undefined,
        minScenariosToComplete: typeof c.minScenariosToComplete === 'number' ? c.minScenariosToComplete : undefined,
        optionalInstruction: typeof c.optionalInstruction === 'string' ? c.optionalInstruction : undefined,
        handoutPromise: typeof c.handoutPromise === 'string' ? c.handoutPromise : undefined,
      }
    : {};
}

function getM5TestIntroContent(slide: Slide): {
  introTitle?: string;
  introBody?: string;
  microWinPhrase?: string;
  thresholdsText?: string;
} {
  const c = slide?.content as Record<string, unknown> | undefined;
  if (!c) return {};
  return {
    introTitle: typeof c.introTitle === 'string' ? c.introTitle : undefined,
    introBody: typeof c.introBody === 'string' ? c.introBody : undefined,
    microWinPhrase: typeof c.microWinPhrase === 'string' ? c.microWinPhrase : undefined,
    thresholdsText: typeof c.thresholdsText === 'string' ? c.thresholdsText : undefined,
  };
}

/** Bendras test-intro turinys iš slide.content (M11 ir kiti moduliai) */
function getTestIntroContent(slide: Slide): {
  whyBenefit?: string;
  duration?: string;
  firstActionCTA?: string;
  microWinPhrase?: string;
  thresholds?: { pass: number; fail: number };
  thresholdExplanation?: string;
} {
  const c = slide?.content as Record<string, unknown> | undefined;
  if (!c) return {};
  const thresholds = c.thresholds as { pass?: number; fail?: number } | undefined;
  return {
    whyBenefit: typeof c.whyBenefit === 'string' ? c.whyBenefit : undefined,
    duration: typeof c.duration === 'string' ? c.duration : undefined,
    firstActionCTA: typeof c.firstActionCTA === 'string' ? c.firstActionCTA : undefined,
    microWinPhrase: typeof c.microWinPhrase === 'string' ? c.microWinPhrase : undefined,
    thresholds: thresholds && typeof thresholds.pass === 'number' ? { pass: thresholds.pass, fail: typeof thresholds.fail === 'number' ? thresholds.fail : 0 } : undefined,
    thresholdExplanation: typeof c.thresholdExplanation === 'string' ? c.thresholdExplanation : undefined,
  };
}

export function TestIntroSlide({ slide, moduleId }: { slide: Slide; moduleId: number }) {
  useTranslation();
  const t = getT('testPractice');
  const { locale } = useLocale();
  const whyBenefit = getWhyBenefit(slide);
  const testIntro = getTestIntroContent(slide);
  const useContentDriven = Boolean(testIntro.whyBenefit && (testIntro.duration || testIntro.firstActionCTA));

  if (moduleId === 5) {
    const m5Content = getM5TestIntroContent(slide);
    const title = m5Content.introTitle ?? t('m5IntroTitleDefault');
    const body = m5Content.introBody ?? t('m5IntroBodyDefault');
    const thresholds = m5Content.thresholdsText ?? t('m5ThresholdsTextDefault');
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-900/30 p-6 rounded-xl border-2 border-brand-200 dark:border-brand-800">
          {whyBenefit && (
            <p className="text-sm font-medium text-brand-700 dark:text-brand-300 mb-3">{whyBenefit}</p>
          )}
          <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">{title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: body.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          {m5Content.microWinPhrase && (
            <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-3 font-medium bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
              {m5Content.microWinPhrase}
            </p>
          )}
          <p className="text-sm text-brand-700 dark:text-brand-300" dangerouslySetInnerHTML={{ __html: thresholds.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500 border border-brand-200 dark:border-brand-800 p-5 rounded-xl">
            <h4 className="font-bold text-lg mb-3 text-brand-900 dark:text-brand-100 flex items-center gap-2.5">
              <span className="inline-flex p-2 rounded-lg bg-brand-500/10 dark:bg-brand-500/20">
                <ListChecks className="w-5 h-5 text-brand-600 dark:text-brand-400" strokeWidth={1.5} />
              </span>
              {locale === 'en' ? 'Test structure' : 'Testo struktūra'}
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>{locale === 'en' ? '• 4 questions (brief, structure, tool, quality check)' : '• 4 klausimai (brief, struktūra, įrankis, kokybės patikra)'}</li>
              <li>{locale === 'en' ? '• Each has an explanation' : '• Kiekvienas turi paaiškinimą'}</li>
              <li>{locale === 'en' ? '• No time limit' : '• Nėra laiko limito'}</li>
            </ul>
          </div>
          <div className="bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500 border border-accent-200 dark:border-accent-800 p-5 rounded-xl">
            <h4 className="font-bold text-lg mb-3 text-accent-900 dark:text-accent-100 flex items-center gap-2.5">
              <span className="inline-flex p-2 rounded-lg bg-accent-500/10 dark:bg-accent-500/20">
                <Target className="w-5 h-5 text-accent-600 dark:text-accent-400" strokeWidth={1.5} />
              </span>
              {locale === 'en' ? 'Goal' : 'Tikslas'}
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>{locale === 'en' ? '• Confirm the sprint was done correctly' : '• Įsitikinti, kad sprintas padarytas teisingai'}</li>
              <li>{locale === 'en' ? '• Quickly spot gaps' : '• Greitai pastebėti spragas'}</li>
              <li>{locale === 'en' ? '• ≥70% = recommended for practice' : '• ≥70% = rekomenduojama į praktiką'}</li>
            </ul>
          </div>
        </div>
        <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl">
          <p className="text-brand-800 dark:text-brand-200 text-sm flex items-start gap-2.5">
            <span className="inline-flex p-1.5 rounded-lg bg-brand-500/10 dark:bg-brand-500/20 shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4 text-brand-600 dark:text-brand-400" strokeWidth={1.5} />
            </span>
            <span><strong>{locale === 'en' ? 'Tip:' : 'Patarimas:'}</strong> {t('tipUnknownAnswer')}</span>
          </p>
        </div>
      </div>
    );
  }

  if (useContentDriven) {
    const title = (slide.title as string) || (locale === 'en' ? 'Knowledge check' : 'Žinių patikrinimas');
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-900/30 p-6 rounded-xl border-2 border-brand-200 dark:border-brand-800">
          {testIntro.whyBenefit && (
            <p className="text-sm font-medium text-brand-700 dark:text-brand-300 mb-3" role="status">{testIntro.whyBenefit}</p>
          )}
          <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white flex items-center gap-2.5">
            <span className="inline-flex p-2 rounded-lg bg-brand-500/10 dark:bg-brand-500/20" aria-hidden="true">
              <ClipboardCheck className="w-5 h-5 text-brand-600 dark:text-brand-400" strokeWidth={1.5} />
            </span>
            {title}
          </h3>
          {testIntro.duration && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2"><strong>{t('durationLabel')}</strong> {testIntro.duration}</p>
          )}
          {testIntro.firstActionCTA && (
            <div className="bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500 p-4 rounded-lg mb-3">
              <p className="text-sm font-medium text-accent-900 dark:text-accent-100">{testIntro.firstActionCTA}</p>
            </div>
          )}
          {testIntro.microWinPhrase && (
            <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg mb-3">
              {testIntro.microWinPhrase}
            </p>
          )}
          {testIntro.thresholdExplanation && (
            <p className="text-sm text-brand-700 dark:text-brand-300">{testIntro.thresholdExplanation}</p>
          )}
          {testIntro.thresholds && !testIntro.thresholdExplanation && (
            <p className="text-sm text-brand-700 dark:text-brand-300">{t('thresholdPassHint', { pass: testIntro.thresholds.pass })}</p>
          )}
        </div>
        <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl">
          <p className="text-brand-800 dark:text-brand-200 text-sm flex items-start gap-2.5">
            <span className="inline-flex p-1.5 rounded-lg bg-brand-500/10 dark:bg-brand-500/20 shrink-0 mt-0.5" aria-hidden="true">
              <Lightbulb className="w-4 h-4 text-brand-600 dark:text-brand-400" strokeWidth={1.5} />
            </span>
            <span><strong>{locale === 'en' ? 'Tip:' : 'Patarimas:'}</strong> {t('tipUnknownAnswer')}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-900/30 p-6 rounded-xl border-2 border-brand-200 dark:border-brand-800">
        {whyBenefit && (
          <p className="text-sm font-medium text-brand-700 dark:text-brand-300 mb-3">{whyBenefit}</p>
        )}
        <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white flex items-center gap-2.5">
          <span className="inline-flex p-2 rounded-lg bg-brand-500/10 dark:bg-brand-500/20">
            <ClipboardCheck className="w-5 h-5 text-brand-600 dark:text-brand-400" strokeWidth={1.5} />
          </span>
          {locale === 'en' ? 'Knowledge Check' : 'Žinių Patikrinimas'}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {locale === 'en'
            ? 'In this module you will check whether you understood the 6-block system. Each question has an explanation, so it is also a learning opportunity.'
            : 'Šiame modulyje patikrinsite, ar supratote 6 blokų sistemą. Kiekvienas klausimas turi paaiškinimą, todėl tai yra ir mokymosi galimybė.'}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500 border border-brand-200 dark:border-brand-800 p-5 rounded-xl">
          <h4 className="font-bold text-lg mb-3 text-brand-900 dark:text-brand-100 flex items-center gap-2.5">
            <span className="inline-flex p-2 rounded-lg bg-brand-500/10 dark:bg-brand-500/20">
              <ListChecks className="w-5 h-5 text-brand-600 dark:text-brand-400" strokeWidth={1.5} />
            </span>
            {locale === 'en' ? 'Test structure' : 'Testo struktūra'}
          </h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>{locale === 'en' ? '• 15 questions – 5 different formats' : '• 15 klausimų – 5 skirtingi formatai'}</li>
            <li>{locale === 'en' ? '• Multiple choice, matching, ordering' : '• Pasirinkimai, porų sujungimas, rikiavimas'}</li>
            <li>{locale === 'en' ? '• True/false and business scenarios' : '• Tiesa/netiesa ir verslo scenarijai'}</li>
            <li>{locale === 'en' ? '• Each has an explanation and a hint' : '• Kiekvienas turi paaiškinimą ir užuominą'}</li>
          </ul>
        </div>
        <div className="bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500 border border-accent-200 dark:border-accent-800 p-5 rounded-xl">
          <h4 className="font-bold text-lg mb-3 text-accent-900 dark:text-accent-100 flex items-center gap-2.5">
            <span className="inline-flex p-2 rounded-lg bg-accent-500/10 dark:bg-accent-500/20">
              <Target className="w-5 h-5 text-accent-600 dark:text-accent-400" strokeWidth={1.5} />
            </span>
            {locale === 'en' ? 'Goal' : 'Tikslas'}
          </h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>{locale === 'en' ? '• Reinforce knowledge in different ways' : '• Įtvirtinti žinias skirtingais būdais'}</li>
            <li>{locale === 'en' ? '• Identify gaps by block' : '• Identifikuoti spragas pagal blokus'}</li>
            <li>{locale === 'en' ? '• Prepare for practice' : '• Pasiruošti praktikai'}</li>
            <li>{locale === 'en' ? '• ≥70% = success' : '• ≥70% = sėkmė'}</li>
          </ul>
        </div>
      </div>
      <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl">
        <p className="text-brand-800 dark:text-brand-200 text-sm flex items-start gap-2.5">
          <span className="inline-flex p-1.5 rounded-lg bg-brand-500/10 dark:bg-brand-500/20 shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4 text-brand-600 dark:text-brand-400" strokeWidth={1.5} />
          </span>
          <span><strong>{locale === 'en' ? 'Tip:' : 'Patarimas:'}</strong> {t('tipUnknownAnswer')}</span>
        </p>
      </div>
    </div>
  );
}

/** Resolve question type, defaulting to 'mcq' for backward compatibility */
function getQuestionType(q: TestQuestion): string {
  return q.type || 'mcq';
}

/** Check if a question is answered (works for all types) */
function isQuestionAnswered(q: TestQuestion, answers: Record<string, number>, completedSpecial: Set<string>): boolean {
  const type = getQuestionType(q);
  if (type === 'matching' || type === 'ordering') {
    return completedSpecial.has(q.id);
  }
  return answers[q.id] !== undefined;
}

/** Check if answer is correct for MCQ/TF/Scenario */
function isMcqCorrect(q: TestQuestion, answer: number | undefined): boolean {
  const type = getQuestionType(q);
  if (type === 'true-false') {
    const correctValue = q.isTrue ? 1 : 0;
    return answer === correctValue;
  }
  return answer === (q.correct ?? -1);
}

export function TestSectionSlide({
  questions,
  onComplete,
  isCompleted,
  moduleId,
  onGoToModule,
}: {
  questions: TestQuestion[];
  onComplete: (score?: number) => void;
  isCompleted: boolean;
  moduleId?: number;
  onGoToModule?: (moduleId: number, slideIndex?: number, fromRemediationSourceModuleId?: number) => void;
}) {
  useTranslation();
  const t = getT('testPractice');
  const { locale } = useLocale();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [confidence, setConfidence] = useState<Record<string, ConfidenceLevel>>({});
  const [showResults, setShowResults] = useState(false);
  const [hints, setHints] = useState<Set<string>>(new Set());
  const [completedSpecial, setCompletedSpecial] = useState<Set<string>>(new Set());
  const [specialScores, setSpecialScores] = useState<Record<string, number>>({});
  const [, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  useEffect(() => {
    setAnswers({});
    setConfidence({});
    setShowResults(false);
    setHints(new Set());
    setCompletedSpecial(new Set());
    setSpecialScores({});
    setStreak(0);
    setMaxStreak(0);
  }, [questions]);

  const handleAnswer = useCallback((questionId: string, optionIndex: number) => {
    if (showResults) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }, [showResults]);

  const handleRequestHint = useCallback((questionId: string) => {
    setHints((prev) => new Set(prev).add(questionId));
  }, []);

  /** Called by Matching/Ordering when they self-check */
  const handleSpecialComplete = useCallback((questionId: string, score: number) => {
    setCompletedSpecial((prev) => new Set(prev).add(questionId));
    setSpecialScores((prev) => ({ ...prev, [questionId]: score }));
  }, []);

  const handleRemediationLink = useCallback(
    (targetModuleId: number, slideId: number) => {
      if (!onGoToModule) return;
      const allModules = getModulesSync(locale);
      const mod = allModules?.find((m) => m.id === targetModuleId);
      if (!mod) {
        onGoToModule(targetModuleId);
        return;
      }
      const slideIndex = mod.slides.findIndex((s) => s.id === slideId);
      onGoToModule(targetModuleId, slideIndex >= 0 ? slideIndex : undefined, moduleId);
    },
    [onGoToModule, moduleId, locale]
  );

  const handleConfidence = useCallback((questionId: string, level: ConfidenceLevel) => {
    setConfidence((prev) => ({ ...prev, [questionId]: level }));
  }, []);

  const handleCheck = useCallback(() => {
    setShowResults(true);

    // Calculate score across all question types
    let totalScore = 0;
    const questionCount = questions.length;

    questions.forEach((q) => {
      const type = getQuestionType(q);
      if (type === 'matching' || type === 'ordering') {
        // Score already captured from self-check (0–1 fraction)
        totalScore += (specialScores[q.id] ?? 0);
      } else {
        // MCQ, true-false, scenario – binary correct
        const answer = answers[q.id];
        if (isMcqCorrect(q, answer)) {
          totalScore += 1;
        }
      }
    });

    // Apply hint penalty: reduce by 0.5 for questions where hint was used but got right (half credit)
    questions.forEach((q) => {
      const type = getQuestionType(q);
      if (hints.has(q.id) && type !== 'matching' && type !== 'ordering') {
        if (isMcqCorrect(q, answers[q.id])) {
          totalScore -= 0.5;
        }
      }
    });

    const score = questionCount > 0 ? Math.round((totalScore / questionCount) * 100) : 0;

    // Calculate streak
    let currentStreak = 0;
    let bestStreak = 0;
    questions.forEach((q) => {
      const type = getQuestionType(q);
      let isCorrect = false;
      if (type === 'matching' || type === 'ordering') {
        isCorrect = (specialScores[q.id] ?? 0) >= 0.8; // 80%+ counts as correct for streak
      } else {
        isCorrect = isMcqCorrect(q, answers[q.id]);
      }
      if (isCorrect) {
        currentStreak++;
        if (currentStreak > bestStreak) bestStreak = currentStreak;
      } else {
        currentStreak = 0;
      }
    });
    setStreak(currentStreak);
    setMaxStreak(bestStreak);
    lastMaxStreak = bestStreak;

    // Calculate per-category scores for radar chart
    const catScores: Record<string, CategoryScore> = {};
    questions.forEach((q) => {
      const cat = q.category || 'bendra';
      if (!catScores[cat]) catScores[cat] = { correct: 0, total: 0, percentage: 0 };
      catScores[cat].total += 1;
      const qType = getQuestionType(q);
      let qCorrect = false;
      if (qType === 'matching' || qType === 'ordering') {
        qCorrect = (specialScores[q.id] ?? 0) >= 0.8;
      } else {
        qCorrect = isMcqCorrect(q, answers[q.id]);
      }
      if (qCorrect) catScores[cat].correct += 1;
    });
    for (const cat of Object.keys(catScores)) {
      const { correct, total: catTotal } = catScores[cat];
      catScores[cat].percentage = catTotal > 0 ? Math.round((correct / catTotal) * 100) : 0;
    }
    lastCategoryScores = catScores;

    const allAnswered = questions.every((q) => isQuestionAnswered(q, answers, completedSpecial) && confidence[q.id] != null);
    if (allAnswered) {
      onComplete(Math.max(0, score));
    }
  }, [questions, answers, specialScores, hints, completedSpecial, confidence, onComplete]);

  const allAnswered = questions.every((q) => isQuestionAnswered(q, answers, completedSpecial) && confidence[q.id] != null);
  const answeredCount = questions.filter(
    (q) => isQuestionAnswered(q, answers, completedSpecial) && confidence[q.id] != null
  ).length;
  const totalCount = questions.length;

  return (
    <div className="space-y-6">
      {/* Sticky mini-progress: 5/15 format virš klausimo (Faze 3 M2) */}
      {!showResults && (
        <div className="sticky top-0 z-10 py-3 mb-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 -mt-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-base font-bold tabular-nums text-gray-800 dark:text-gray-200" aria-hidden="true">
              {answeredCount} / {totalCount}
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 sr-only sm:not-sr-only">
              {t('questionsAnsweredAria', { answered: answeredCount, total: totalCount })}
            </span>
            <div className="flex-1 max-w-[120px] h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-300"
                style={{ width: `${totalCount > 0 ? (answeredCount / totalCount) * 100 : 0}%` }}
                role="progressbar"
                aria-valuenow={answeredCount}
                aria-valuemin={0}
                aria-valuemax={totalCount}
                aria-label={t('questionsAnsweredAria', { answered: answeredCount, total: totalCount })}
              />
            </div>
          </div>
        </div>
      )}

      {/* Streak indicator */}
      {maxStreak >= 3 && showResults && (
        <div className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800 animate-fade-in">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="font-bold text-orange-700 dark:text-orange-300">
            {locale === 'en' ? `${maxStreak} correct in a row!` : `${maxStreak} teisingi iš eilės!`}
          </span>
          {maxStreak === questions.length && (
            <span className="ml-2 px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">
              {locale === 'en' ? 'Perfect!' : 'Puikiai!'}
            </span>
          )}
        </div>
      )}

      {questions.map((q, qIdx) => {
        const type = getQuestionType(q);
        const userAnswer = answers[q.id];
        const showHint = hints.has(q.id);

        switch (type) {
          case 'true-false':
            return (
              <TrueFalseQuestion
                key={q.id}
                question={q}
                questionIndex={qIdx}
                userAnswer={userAnswer}
                showResults={showResults}
                showHint={showHint}
                confidence={confidence[q.id]}
                onConfidence={(level: ConfidenceLevel) => handleConfidence(q.id, level)}
                onAnswer={handleAnswer}
                onRequestHint={handleRequestHint}
              />
            );

          case 'matching':
            return (
              <MatchingQuestion
                key={q.id}
                question={q}
                questionIndex={qIdx}
                showResults={showResults}
                showHint={showHint}
                confidence={confidence[q.id]}
                onConfidence={(level: ConfidenceLevel) => handleConfidence(q.id, level)}
                onComplete={handleSpecialComplete}
                onRequestHint={handleRequestHint}
              />
            );

          case 'ordering':
            return (
              <OrderingQuestion
                key={q.id}
                question={q}
                questionIndex={qIdx}
                showResults={showResults}
                showHint={showHint}
                confidence={confidence[q.id]}
                onConfidence={(level: ConfidenceLevel) => handleConfidence(q.id, level)}
                onComplete={handleSpecialComplete}
                onRequestHint={handleRequestHint}
              />
            );

          case 'scenario':
            return (
              <ScenarioQuestion
                key={q.id}
                question={q}
                questionIndex={qIdx}
                userAnswer={userAnswer}
                showResults={showResults}
                showHint={showHint}
                confidence={confidence[q.id]}
                onConfidence={(level: ConfidenceLevel) => handleConfidence(q.id, level)}
                onAnswer={handleAnswer}
                onRequestHint={handleRequestHint}
                onRemediationLink={onGoToModule ? handleRemediationLink : undefined}
              />
            );

          default: // 'mcq' or undefined
            return (
              <McqQuestion
                key={q.id}
                question={q}
                questionIndex={qIdx}
                userAnswer={userAnswer}
                showResults={showResults}
                showHint={showHint}
                confidence={confidence[q.id]}
                onConfidence={(level: ConfidenceLevel) => handleConfidence(q.id, level)}
                onAnswer={handleAnswer}
                onRequestHint={handleRequestHint}
                onRemediationLink={onGoToModule ? handleRemediationLink : undefined}
              />
            );
        }
      })}

      {!showResults && !isCompleted && (
        <>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-300 dark:via-brand-600 to-transparent" aria-hidden />
          <button
            onClick={handleCheck}
            disabled={!allAnswered}
            className="w-full flex items-center justify-center gap-2 min-h-[44px] rounded-xl font-bold text-white bg-gradient-to-r from-brand-500 via-brand-400 to-accent-500 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all"
            aria-label={t('checkAnswersAria')}
          >
            <CheckCircle className="w-5 h-5" />
            {t('checkAnswers')}
          </button>
        </>
      )}

      {showResults && (
        <div className="text-center p-4 bg-brand-50 dark:bg-brand-900/20 rounded-xl">
          <p className="text-brand-800 dark:text-brand-200 font-medium">
            {t('answersCheckedContinue')}
          </p>
        </div>
      )}
    </div>
  );
}

const PASS_THRESHOLD = 70;

/** Per-block category metadata (F2-2/F2-3) */
const CATEGORY_META: Record<string, { label: string; color: string; slideId: number }> = {
  meta: { label: 'Meta', color: 'rose', slideId: 8 },
  input: { label: 'Input', color: 'orange', slideId: 9 },
  output: { label: 'Output', color: 'amber', slideId: 10 },
  reasoning: { label: 'Reasoning', color: 'emerald', slideId: 11 },
  quality: { label: 'Quality', color: 'brand', slideId: 12 },
  advanced: { label: 'Advanced', color: 'violet', slideId: 13 },
  workflow: { label: 'Workflow', color: 'cyan', slideId: 3 },
  technikos: { label: 'Technikos', color: 'amber', slideId: 5 },
  bendra: { label: 'Bendra sistema', color: 'brand', slideId: 14 },
};

const CATEGORY_LABEL_EN: Record<string, string> = {
  technikos: 'Techniques',
  bendra: 'Overall system',
};

function getCategoryLabel(key: string, locale: string): string {
  if (locale === 'en' && CATEGORY_LABEL_EN[key]) return CATEGORY_LABEL_EN[key];
  return CATEGORY_META[key]?.label ?? key;
}

const COLOR_MAP: Record<string, string> = {
  rose: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-700',
  orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700',
  amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700',
  emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
  brand: 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 border-brand-300 dark:border-brand-700',
  violet: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-300 dark:border-violet-700',
  cyan: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700',
};

const RADAR_CATEGORIES = ['meta', 'input', 'output', 'reasoning', 'quality', 'advanced', 'workflow', 'technikos'] as const;

export function TestResultsSlide({
  moduleId,
  progress,
  onGoToModule,
  onNextSlide,
}: {
  moduleId: number;
  progress: Progress;
  onGoToModule?: (moduleId: number, slideIndex?: number, fromRemediationSourceModuleId?: number) => void;
  onNextSlide?: () => void;
}) {
  useTranslation();
  const t = getT('testPractice');
  const { locale } = useLocale();
  const rawScore = progress.moduleTestScores?.[moduleId] ?? 0;
  const passed = rawScore >= PASS_THRESHOLD;
  const animatedScore = useCountUp(rawScore, 1500, 300);

  const handleDeepLink = useCallback(
    (slideId: number) => {
      const allModules = getModulesSync(locale);
      const module1 = allModules?.find((m) => m.id === 1);
      if (!module1) {
        onGoToModule?.(1, undefined, moduleId);
        return;
      }
      const slideIndex = module1.slides.findIndex((s) => s.id === slideId);
      if (slideIndex >= 0) saveSlidePosition(1, slideIndex);
      onGoToModule?.(1, slideIndex >= 0 ? slideIndex : undefined, moduleId);
    },
    [onGoToModule, moduleId, locale]
  );

  const handleM5HandoutPdf = useCallback(async () => {
    await downloadM5HandoutPdf(getM5HandoutContent(locale) as M5HandoutContent, undefined, locale);
  }, [locale]);

  const radarData: RadarDataPoint[] = RADAR_CATEGORIES.map((cat) => ({
    label: getCategoryLabel(cat, locale),
    value: lastCategoryScores[cat]?.percentage ?? 0,
  }));
  const hasRadarData = Object.keys(lastCategoryScores).length > 0;

  // Module 5 results (content-driven from slide 514 when available)
  if (moduleId === 5 && rawScore > 0) {
    const m5Module = getModulesSync(locale)?.find((m) => m.id === 5);
    const m5ResultsSlide = m5Module?.slides?.find((s) => s.id === 514);
    const m5TestSectionIndex = m5Module?.slides?.findIndex((s) => s.id === 513) ?? -1;
    const m5Content = m5ResultsSlide?.content as Record<string, unknown> | undefined;
    const passedTitle = (typeof m5Content?.passedTitle === 'string' ? m5Content.passedTitle : null) ?? t('passedTitleDefault');
    const passedMessageRaw = (typeof m5Content?.passedMessage === 'string' ? m5Content.passedMessage : null) ?? t('passedMessageDefault', { score: animatedScore });
    const passedMessageHtml = passedMessageRaw.replace(/\[X\]/g, String(animatedScore)).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    const thresholdExplanation = typeof m5Content?.thresholdExplanation === 'string' ? m5Content.thresholdExplanation : null;
    const useCaseBlock = typeof m5Content?.useCaseBlock === 'string' ? m5Content.useCaseBlock : null;
    const passedCtaLabel = (typeof m5Content?.passedCtaLabel === 'string' ? m5Content.passedCtaLabel : null) ?? t('passedCtaLabelDefault');
    const failedTitle = (typeof m5Content?.failedTitle === 'string' ? m5Content.failedTitle : null) ?? t('failedTitleDefault', { score: animatedScore });
    const failedMessage = (typeof m5Content?.failedMessage === 'string' ? m5Content.failedMessage : null) ?? t('failedMessageDefault');
    const failedCtaRetry = (typeof m5Content?.failedCtaRetry === 'string' ? m5Content.failedCtaRetry : null) ?? t('retryMiniTestAria');
    const failedCtaContinue = (typeof m5Content?.failedCtaContinue === 'string' ? m5Content.failedCtaContinue : null) ?? t('failedCtaContinueDefault');
    const failedCtaReview = (typeof m5Content?.failedCtaReview === 'string' ? m5Content.failedCtaReview : null) ?? t('viewModule4Aria');
    const handoutDownloadLabel = (typeof m5Content?.handoutDownloadLabel === 'string' ? m5Content.handoutDownloadLabel : null) ?? t('handoutDownloadLabelDefault');
    const handleRetryM5Test = () => {
      if (onGoToModule && m5TestSectionIndex >= 0) {
        onGoToModule(5, m5TestSectionIndex, 5);
      }
    };

    return (
      <div className="space-y-6">
        {passed ? (
          <>
            <div className="bg-gradient-to-r from-emerald-50 to-brand-50 dark:from-emerald-900/20 dark:to-brand-900/20 p-8 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-white">{passedTitle}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: passedMessageHtml }} />
            </div>
            {thresholdExplanation && (
              <div
                className="bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500 p-5 rounded-xl"
                role="region"
                aria-label={t('resultMeaningAria')}
              >
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{t('resultMeaningHeading')}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{thresholdExplanation}</p>
              </div>
            )}
            {useCaseBlock && (
              <div
                className="bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500 p-5 rounded-xl"
                role="region"
                aria-label={t('whereToApplyAria')}
              >
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{t('whereToApplyHeading')}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{useCaseBlock}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-3 justify-center items-center">
              <button
                type="button"
                onClick={handleM5HandoutPdf}
                className="btn-secondary inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px]"
                aria-label={handoutDownloadLabel}
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                {handoutDownloadLabel}
              </button>
              {onNextSlide && (
                <button
                  type="button"
                  onClick={onNextSlide}
                  className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px]"
                  aria-label={passedCtaLabel}
                >
                  <ChevronRight className="w-5 h-5" />
                  {passedCtaLabel}
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-xl border-2 border-amber-200 dark:border-amber-800 text-center">
              <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-white">{failedTitle.replace('[X]', String(animatedScore))}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{failedMessage}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleM5HandoutPdf}
                  className="btn-secondary inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px]"
                  aria-label={handoutDownloadLabel}
                >
                  <Download className="w-5 h-5" aria-hidden="true" />
                  {handoutDownloadLabel}
                </button>
                {onGoToModule && (
                  <button
                    type="button"
                    onClick={() => onGoToModule(4)}
                    className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px]"
                    aria-label={t('viewModule4Aria')}
                  >
                    {failedCtaReview}
                  </button>
                )}
                {onGoToModule && m5TestSectionIndex >= 0 && (
                  <button
                    type="button"
                    onClick={handleRetryM5Test}
                    className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px]"
                    aria-label={t('retryMiniTestAria')}
                  >
                    {failedCtaRetry}
                  </button>
                )}
                {onNextSlide && (
                  <button
                    type="button"
                    onClick={onNextSlide}
                    className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px]"
                    aria-label={failedCtaContinue}
                  >
                    <ChevronRight className="w-4 h-4" />
                    {failedCtaContinue}
                  </button>
                )}
              </div>
            </div>
            {/* Ką pakartoti: nuorodos į skaidres pagal MODULIO_5_INTERAKTYVUMO_ANALIZE §5.3 */}
            {onGoToModule && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">{t('recommendReviewHeading')}</h4>
                <ul className="space-y-2 text-left">
                  {(locale === 'en' ? [
                    { moduleId: 4, slideId: 43, label: 'Structured process (4.1b)' },
                    { moduleId: 5, slideId: 47, label: 'Presentation workflow' },
                    { moduleId: 5, slideId: 47, label: 'Presentation workflow (tools)' },
                    { moduleId: 4, slideId: 68, label: 'Knowledge check and hallucinations (4.6)' },
                  ] : [
                    { moduleId: 4, slideId: 43, label: 'Struktūruotas procesas (4.1b)' },
                    { moduleId: 5, slideId: 47, label: 'Prezentacijos workflow' },
                    { moduleId: 5, slideId: 47, label: 'Prezentacijos workflow (įrankiai)' },
                    { moduleId: 4, slideId: 68, label: 'Žinių patikrinimas ir haliucinacijos (4.6)' },
                  ]).map((item) => {
                    const allModules = getModulesSync(locale);
                    const mod = allModules?.find((m) => m.id === item.moduleId);
                    const slideIndex = mod ? mod.slides.findIndex((s) => s.id === item.slideId) : -1;
                    return (
                      <li key={`${item.moduleId}-${item.slideId}`}>
                        <button
                          type="button"
                          onClick={() => onGoToModule(item.moduleId, slideIndex >= 0 ? slideIndex : undefined, 5)}
                          className="text-brand-600 dark:text-brand-400 hover:underline font-medium text-left min-h-[44px] py-2 px-0 flex items-center"
                          aria-label={t('viewSlideAria', { label: item.label })}
                        >
                          <ChevronRight className="w-4 h-4 mr-1.5 shrink-0" />
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Module 11 (Agentų kelias) results – content-driven from slide 112
  if (moduleId === 11 && rawScore > 0) {
    const m11Module = getModulesSync(locale)?.find((m) => m.id === 11);
    const m11ResultsSlide = m11Module?.slides?.find((s) => s.id === 112);
    const m11Content = m11ResultsSlide?.content as Record<string, unknown> | undefined;
    const passedMessage = (typeof m11Content?.passedMessage === 'string' ? m11Content.passedMessage : null) ?? (locale === 'en' ? 'Congratulations! You are ready for the Agent Engineering project (Module 12).' : 'Sveikiname! Esate pasiruošę Agentų inžinerijos projektui (Modulis 12).');
    const failedMessage = (typeof m11Content?.failedMessage === 'string' ? m11Content.failedMessage : null) ?? (locale === 'en' ? 'We recommend reviewing Module 10 slides again – agent cycle, role and prompts, tools, error handling.' : 'Rekomenduojame dar kartą peržiūrėti Modulio 10 skaidres – agentų ciklas, rolė ir promptai, įrankiai, klaidos tvarkymas.');
    const thresholdExplanation = typeof m11Content?.thresholdExplanation === 'string' ? m11Content.thresholdExplanation : null;
    const useCaseBlockObj = m11Content?.useCaseBlock as { heading?: string; body?: string; blockVariant?: string } | undefined;
    const useCaseHeading = typeof useCaseBlockObj?.heading === 'string' ? useCaseBlockObj.heading : (locale === 'en' ? 'Where to apply?' : 'Kur pritaikyti?');
    const useCaseBody = typeof useCaseBlockObj?.body === 'string' ? useCaseBlockObj.body : null;

    return (
      <div className="space-y-6">
        {passed ? (
          <>
            <div className="bg-gradient-to-r from-emerald-50 to-brand-50 dark:from-emerald-900/20 dark:to-brand-900/20 p-8 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-white">{t('passedTitleDefault')}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{passedMessage}</p>
            </div>
            {thresholdExplanation && (
              <div className="bg-slate-50 dark:bg-slate-800/60 border-l-4 border-slate-400 p-5 rounded-xl" role="region" aria-label={t('resultMeaningAria')}>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{t('whatItMeansHeading')}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{thresholdExplanation}</p>
              </div>
            )}
            {useCaseBody && (
              <div className="bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500 p-5 rounded-xl" role="region" aria-label={t('whereToApplyShortAria')}>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{useCaseHeading}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{useCaseBody}</p>
              </div>
            )}
            {onNextSlide && (
              <div className="flex justify-center">
                <button type="button" onClick={onNextSlide} className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px]" aria-label={t('startModule12Aria')}>
                  <ChevronRight className="w-5 h-5" />
                  {t('startModule12Aria')}
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-xl border-2 border-amber-200 dark:border-amber-800 text-center">
              <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-white">{t('resultLabel')} {animatedScore}%</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{failedMessage}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {onGoToModule && (
                  <button type="button" onClick={() => onGoToModule(10)} className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px]" aria-label={t('viewModule10Aria')}>
                    {locale === 'en' ? 'View Module 10' : 'Peržiūrėti Modulį 10'}
                  </button>
                )}
                {onNextSlide && (
                  <button type="button" onClick={onNextSlide} className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px]" aria-label={t('retryTestAria')}>
                    {locale === 'en' ? 'Try test again' : 'Bandyti testą dar kartą'}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Module 14 (Turinio kelias) results – content-driven from slide 142
  if (moduleId === 14 && rawScore > 0) {
    const m14Module = getModulesSync(locale)?.find((m) => m.id === 14);
    const m14ResultsSlide = m14Module?.slides?.find((s) => s.id === 142);
    const m14Content = m14ResultsSlide?.content as Record<string, unknown> | undefined;
    const passedMessage = (typeof m14Content?.passedMessage === 'string' ? m14Content.passedMessage : null) ?? (locale === 'en' ? 'Congratulations! You are ready for the Content Engineering project (Module 15).' : 'Sveikiname! Esate pasiruošę Turinio inžinerijos projektui (Modulis 15).');
    const failedMessage = (typeof m14Content?.failedMessage === 'string' ? m14Content.failedMessage : null) ?? (locale === 'en' ? 'We recommend reviewing Module 13 slides again – images, video, music.' : 'Rekomenduojame dar kartą peržiūrėti Modulio 13 skaidres – vaizdai, video, muzika.');
    const thresholdExplanation = typeof m14Content?.thresholdExplanation === 'string' ? m14Content.thresholdExplanation : null;
    const useCaseBlockObj = m14Content?.useCaseBlock as { heading?: string; body?: string; blockVariant?: string } | undefined;
    const useCaseHeading = typeof useCaseBlockObj?.heading === 'string' ? useCaseBlockObj.heading : (locale === 'en' ? 'Where to apply?' : 'Kur pritaikyti?');
    const useCaseBody = typeof useCaseBlockObj?.body === 'string' ? useCaseBlockObj.body : null;

    return (
      <div className="space-y-6">
        {passed ? (
          <>
            <div className="bg-gradient-to-r from-emerald-50 to-brand-50 dark:from-emerald-900/20 dark:to-brand-900/20 p-8 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-white">{t('passedTitleDefault')}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{passedMessage}</p>
            </div>
            {thresholdExplanation && (
              <div className="bg-slate-50 dark:bg-slate-800/60 border-l-4 border-slate-400 p-5 rounded-xl" role="region" aria-label={t('resultMeaningAria')}>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{t('whatItMeansHeading')}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{thresholdExplanation}</p>
              </div>
            )}
            {useCaseBody && (
              <div className="bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500 p-5 rounded-xl" role="region" aria-label={t('whereToApplyShortAria')}>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{useCaseHeading}</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{useCaseBody}</p>
              </div>
            )}
            {onNextSlide && (
              <div className="flex justify-center">
                <button type="button" onClick={onNextSlide} className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px]" aria-label={t('startModule15Aria')}>
                  <ChevronRight className="w-5 h-5" />
                  {t('startModule15Aria')}
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-xl border-2 border-amber-200 dark:border-amber-800 text-center">
              <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-white">{t('resultLabel')} {animatedScore}%</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{failedMessage}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {onGoToModule && (
                  <button type="button" onClick={() => onGoToModule(13)} className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px]" aria-label={t('viewModule13Aria')}>
                    {locale === 'en' ? 'View Module 13' : 'Peržiūrėti Modulį 13'}
                  </button>
                )}
                {onNextSlide && (
                  <button type="button" onClick={onNextSlide} className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px]" aria-label={t('retryTestAria')}>
                    {locale === 'en' ? 'Try test again' : 'Bandyti testą dar kartą'}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Module 2 (and default) results with F2 features
  return (
    <div className="space-y-6">
      {/* F2-4: Animated score hero */}
      <div className={`p-8 rounded-xl border-2 text-center ${
        passed
          ? 'bg-gradient-to-r from-emerald-50 to-brand-50 dark:from-emerald-900/20 dark:to-brand-900/20 border-emerald-200 dark:border-emerald-800'
          : 'bg-gradient-to-r from-amber-50 to-brand-50 dark:from-amber-900/20 dark:to-brand-900/20 border-amber-200 dark:border-amber-800'
      }`}>
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
          passed ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
        }`}>
          <span className={`text-3xl font-extrabold tabular-nums ${
            passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
          }`}>{animatedScore}%</span>
        </div>
        <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-white">
          {passed ? t('testCompleteTitle') : t('resultLabel')}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {passed
            ? t('wellDoneNextHint')
            : locale === 'en'
              ? 'We recommend reviewing Module 1, especially the 6-block section (slides 8–16). You can retake the test.'
              : 'Rekomenduojame peržiūrėti Modulį 1, ypač 6 blokų skyrių (skaidrės 8–16). Gali pakartoti testą.'}
        </p>
        {lastMaxStreak >= 3 && (
          <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium">
            <Flame className="w-4 h-4" />
            {locale === 'en' ? `Best streak: ${lastMaxStreak} in a row` : `Geriausias streak: ${lastMaxStreak} iš eilės`}
          </div>
        )}
      </div>

      {/* F2-2: Radar chart (Module 2 only, if data exists) */}
      {moduleId === 2 && hasRadarData && (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t('radarTitle')}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('radarDesc')}</p>
          <RadarChart data={radarData} size={300} />
        </div>
      )}

      {/* F2-3: Category deep links (Module 2 only) */}
      {moduleId === 2 && (
        <CategoryBreakdownWithLinks categoryScores={lastCategoryScores} onDeepLink={handleDeepLink} />
      )}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4">{t('whatYouLearned')}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {(locale === 'en' ? [
            'Meta block = role and context',
            'Input = concrete data',
            'Output = format and structure',
            'Reasoning = thinking logic',
            'Quality = quality criteria',
            'Advanced = parameter control',
          ] : [
            'Meta blokas = rolė ir kontekstas',
            'Input = konkretūs duomenys',
            'Output = formatas ir struktūra',
            'Reasoning = mąstymo logika',
            'Quality = kokybės kriterijai',
            'Advanced = parametrų kontrolė',
          ]).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {!passed && onGoToModule && (
          <button type="button" onClick={() => onGoToModule(1)} className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px]" aria-label={t('viewModule1Aria')}>
            {locale === 'en' ? 'View Module 1' : 'Peržiūrėti Modulį 1'}
          </button>
        )}
        {passed && onGoToModule && (
          <button type="button" onClick={() => onGoToModule(3)} className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px]" aria-label={t('startModule3Aria')}>
            <ChevronRight className="w-5 h-5" /> {t('startModule3Aria')}
          </button>
        )}
      </div>
    </div>
  );
}

/** A-M3: Inline "pakartok 3 klausimus" from one category (MCQ/true-false only for simplicity) */
function RemediationRetryBlock({
  categoryKey,
  categoryLabel,
  onClose,
}: {
  categoryKey: string;
  categoryLabel: string;
  onClose: () => void;
}) {
  useTranslation();
  const t = getT('testPractice');
  const { locale } = useLocale();
  const questions = useMemo<TestQuestion[]>(() => {
    const all = selectQuestionsByCategory(categoryKey, 5, locale);
    return all.filter((q: TestQuestion) => (q.type || 'mcq') === 'mcq' || (q.type || '') === 'true-false').slice(0, 3);
  }, [categoryKey, locale]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = useCallback((questionId: string, optionIndex: number) => {
    if (showResults) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }, [showResults]);

  const handleCheck = useCallback(() => {
    setShowResults(true);
    let correct = 0;
    questions.forEach((q: TestQuestion) => {
      if (isMcqCorrect(q, answers[q.id])) correct += 1;
    });
    setScore(questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0);
  }, [questions, answers]);

  const allAnswered = questions.length > 0 && questions.every((q: TestQuestion) => answers[q.id] !== undefined);

  if (questions.length === 0) {
    return (
      <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
        <p className="text-sm text-amber-800 dark:text-amber-200">{t('noRetakeInCategory')}</p>
        <button type="button" onClick={onClose} className="mt-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline" aria-label={t('close')}>{t('close')}</button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-brand-200 dark:border-brand-700 bg-brand-50/50 dark:bg-brand-900/10 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h5 className="font-bold text-gray-900 dark:text-white">{locale === 'en' ? `Retake 3 questions: ${categoryLabel}` : `Pakartok 3 klausimus: ${categoryLabel}`}</h5>
        <button type="button" onClick={onClose} className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center py-2 px-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400" aria-label={t('close')}>{t('close')}</button>
      </div>
      {questions.map((q: TestQuestion, qIdx: number) => {
        const type = getQuestionType(q);
        const userAnswer = answers[q.id];
        if (type === 'true-false') {
          return (
            <TrueFalseQuestion
              key={q.id}
              question={q}
              questionIndex={qIdx}
              userAnswer={userAnswer}
              showResults={showResults}
              showHint={false}
              confidence={undefined}
              onConfidence={() => {}}
              onAnswer={handleAnswer}
              onRequestHint={() => {}}
            />
          );
        }
        return (
          <McqQuestion
            key={q.id}
            question={q}
            questionIndex={qIdx}
            userAnswer={userAnswer}
            showResults={showResults}
            showHint={false}
            confidence={undefined}
            onConfidence={() => {}}
            onAnswer={handleAnswer}
            onRequestHint={() => {}}
          />
        );
      })}
      {!showResults && (
        <button type="button" onClick={handleCheck} disabled={!allAnswered} className="btn-primary inline-flex items-center justify-center min-h-[44px] px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed" aria-label={t('checkAnswersAria')}>
          {t('checkShort')}
        </button>
      )}
      {showResults && (
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className="font-semibold text-gray-900 dark:text-white">{t('resultLabel')}: {score}%</span>
          <button type="button" onClick={onClose} className="btn-secondary px-3 py-2 min-h-[44px] text-sm" aria-label={t('backToResultAria')}>{t('backToResultAria')}</button>
        </div>
      )}
    </div>
  );
}

/** F2-3: Category breakdown with radar scores + deep links to Module 1 slides. A-M3: + "Pakartok 3 kl." */
function CategoryBreakdownWithLinks({
  categoryScores,
  onDeepLink,
}: {
  categoryScores: Record<string, CategoryScore>;
  onDeepLink: (slideId: number) => void;
}) {
  useTranslation();
  const t = getT('testPractice');
  const { locale } = useLocale();
  const [activeRetryCategory, setActiveRetryCategory] = useState<{ key: string; label: string } | null>(null);
  const hasScores = Object.keys(categoryScores).length > 0;
  const categories = Object.entries(CATEGORY_META).filter(([key]) =>
    RADAR_CATEGORIES.includes(key as typeof RADAR_CATEGORIES[number])
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h4 className="font-bold text-gray-900 dark:text-white mb-2">{t('knowledgeMapTitle')}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {hasScores ? t('knowledgeMapHint1') : t('knowledgeMapHint2')}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {categories.map(([key, meta]) => {
          const catScore = categoryScores[key];
          const pct = catScore?.percentage;
          const isWeak = pct !== undefined && pct < 50;
          const isStrong = pct !== undefined && pct >= 80;
          return (
            <div
              key={key}
              className={`p-3 rounded-lg border text-center text-sm font-medium transition-all ${
                COLOR_MAP[meta.color] || COLOR_MAP.brand
              } ${isWeak ? 'ring-2 ring-rose-400 dark:ring-rose-600' : ''}`}
            >
              <div className="font-bold flex items-center justify-center gap-1">
                {getCategoryLabel(key, locale)}
              </div>
              {pct !== undefined ? (
                <div className={`text-xs font-bold mt-1 ${isWeak ? 'text-rose-600 dark:text-rose-400' : isStrong ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                  {pct}%
                </div>
              ) : (
                <div className="text-xs opacity-75 mt-1">{t('slideLabel', { id: meta.slideId })}</div>
              )}
              <div className="mt-2 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => onDeepLink(meta.slideId)}
                  className="text-xs font-medium min-h-[44px] py-2 px-2 rounded bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1"
                  aria-label={t('viewInModule1Aria', { label: meta.label })}
                >
                  <ExternalLink className="w-3 h-3" />
                  {t('viewSlideShort')}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRetryCategory({ key, label: meta.label })}
                  className="text-xs font-medium min-h-[44px] py-2 px-2 rounded bg-brand-100 dark:bg-brand-900/30 hover:bg-brand-200 dark:hover:bg-brand-800/50 transition-colors flex items-center justify-center"
                  aria-label={t('retake3FromAria', { label: meta.label })}
                >
                  {t('retake3Short')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {activeRetryCategory && (
        <div className="mt-4">
          <RemediationRetryBlock
            categoryKey={activeRetryCategory.key}
            categoryLabel={activeRetryCategory.label}
            onClose={() => setActiveRetryCategory(null)}
          />
        </div>
      )}
      {hasScores && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
          {t('knowledgeMapWeakHint')}
        </p>
      )}
    </div>
  );
}

export interface PracticeScenarioSlideInfo {
  slideIndex: number;
  slideId: number;
  title: string;
}

const MODULE6_SELF_ASSESSMENT_KEY = 'prompt-anatomy-module6-self-assessment';

type SelfAssessmentValue = 'taip' | 'dar_ne' | 'netaikau';

function loadModule6SelfAssessment(): Record<number, SelfAssessmentValue> {
  try {
    const raw = localStorage.getItem(MODULE6_SELF_ASSESSMENT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, string>;
      const out: Record<number, SelfAssessmentValue> = {};
      for (const [k, v] of Object.entries(parsed)) {
        const id = parseInt(k, 10);
        if ([1, 2, 3, 4, 5].includes(id) && (v === 'taip' || v === 'dar_ne' || v === 'netaikau')) {
          out[id] = v;
        }
      }
      return out;
    }
  } catch (_) {
    /* ignore */
  }
  return {};
}

function getRecommendedNote(slide: Slide | undefined): string | undefined {
  const c = slide?.content as { recommendedNote?: string } | undefined;
  return c?.recommendedNote;
}

/** M9 hub skaidrės id – navigacija „Visi 16 scenarijų“ */
const M9_HUB_SLIDE_ID = 99;

export function PracticeIntroSlide({
  slide,
  moduleId,
  progress,
  scenarioSlides,
  onNavigateToSlide,
  onNavigateToSlideById,
  onNavigateToHubWithCharacter,
}: {
  slide?: Slide;
  moduleId?: number;
  progress?: { completedTasks: Record<number, number[]> };
  scenarioSlides?: PracticeScenarioSlideInfo[];
  onNavigateToSlide?: (slideIndex: number) => void;
  /** M9: pereiti į hub (4×4) skaidrę pagal slide id */
  onNavigateToSlideById?: (slideId: number) => void;
  /** M9 įvade: paspaudus veikėją – atidaryti hub su tuo veikėju (characterIndex 0–3) */
  onNavigateToHubWithCharacter?: (characterIndex: number) => void;
}) {
  useTranslation();
  const t = getT('testPractice');
  const { locale } = useLocale();
  const whyBenefit = getWhyBenefit(slide);
  const recommendedNote = getRecommendedNote(slide);
  const [selfAssessment, setSelfAssessment] = useState<Record<number, SelfAssessmentValue>>(loadModule6SelfAssessment);

  useEffect(() => {
    if (moduleId !== 6 || Object.keys(selfAssessment).length === 0) return;
    localStorage.setItem(MODULE6_SELF_ASSESSMENT_KEY, JSON.stringify(selfAssessment));
  }, [moduleId, selfAssessment]);

  const setModule6SelfAssessment = setSelfAssessment;

  if (moduleId === 6) {
    const introContent = getPracticeIntroContent(slide);
    const hasM6Progress = Boolean(scenarioSlides?.length && progress?.completedTasks && progress.completedTasks[6]);
    const m6CompletedCount = hasM6Progress
      ? scenarioSlides!.filter((s) => progress!.completedTasks[6]!.includes(s.slideId)).length
      : 0;
    const m6ScenarioTotal = scenarioSlides?.length ?? 2;
    const outcomes = [
      t('artefactDesc'),
      locale === 'en'
        ? 'A complete 6-block prompt template with intermediate decisions – copyable and adaptable for other topics.'
        : 'Pilnas 6 blokų prompto šablonas su tarpiniais sprendimais – kopijuojamas ir pritaikomas kitoms temoms.',
      locale === 'en'
        ? 'A RAG and knowledge verification example for your topic (sources, "I don\'t know", Deep research steps).'
        : 'RAG ir žinių patikrinimo pavyzdys savo temai (šaltiniai, „nežinau“, Deep research žingsniai).',
    ];
    const journey = locale === 'en' ? [
      { step: 1, label: 'Project: Research report with AI', detail: '6-step instructions + intermediate decisions + full example' },
      { step: 2, label: 'COMBO', detail: 'Combine multiple methods in one prompt' },
      { step: 3, label: 'Practice: One-page HTML', detail: '6-block structure' },
      { step: 4, label: 'SUPER PROMPTS', detail: 'LEARN (20/80) + EXPERIMENT' },
      { step: 5, label: 'Reflection and "What next?"', detail: 'Copyable reflection prompt + links' },
      { step: 6, label: 'Data management', detail: 'Library, versioning, documentation' },
    ] : [
      { step: 1, label: 'Projektas: Tyrimo ataskaita su DI', detail: '6 žingsnių instrukcijos + tarpiniai sprendimai + pilnas pavyzdys' },
      { step: 2, label: 'COMBO', detail: 'Sujunk kelis metodus viename prompte' },
      { step: 3, label: 'Praktika: Vieno puslapio HTML', detail: '6 blokų struktūra' },
      { step: 4, label: 'SUPER PROMPTAI', detail: 'MOKYTIS (20/80) + EKSPERIMENTUOTI' },
      { step: 5, label: 'Refleksija ir „Ką toliau?“', detail: 'Kopijuojamas refleksijos promptas + nuorodos' },
      { step: 6, label: 'Duomenų tvarkymas', detail: 'Biblioteka, versijavimas, dokumentacija' },
    ];
    const checklist = locale === 'en' ? [
      { label: 'Used the 6-block system (META, INPUT, OUTPUT, REASONING, QUALITY, ADVANCED)', id: 1 },
      { label: 'Included a RAG element (sources, "use only provided context")', id: 2 },
      { label: 'Included Deep research steps (multi-step)', id: 3 },
      { label: 'Included a knowledge verification element (sources or "I don\'t know")', id: 4 },
      { label: 'Considered token limits (length, max_tokens)', id: 5 },
    ] : [
      { label: 'Naudojau 6 blokų sistemą (META, INPUT, OUTPUT, REASONING, QUALITY, ADVANCED)', id: 1 },
      { label: 'Įtraukiau RAG elementą (šaltiniai, „naudok tik pateiktą kontekstą“)', id: 2 },
      { label: 'Įtraukiau Deep research žingsnius (multi-step)', id: 3 },
      { label: 'Įtraukiau žinių patikrinimo elementą (šaltiniai arba „nežinau“)', id: 4 },
      { label: 'Apsvarstau tokenų apribojimą (ilgis, max_tokens)', id: 5 },
    ];
    const stages = [t('projectStep1'), t('projectStep2'), t('projectStep3'), t('projectStep4'), t('projectStep5'), t('projectStep6')];
    return (
      <div className="space-y-6">
        {introContent.whyBenefit && (
          <p className="text-center text-sm font-medium text-brand-700 dark:text-brand-300 max-w-2xl mx-auto">
            {introContent.whyBenefit}
          </p>
        )}
        {introContent.duration && (
          <p className="text-center text-sm font-semibold text-accent-700 dark:text-accent-300">
            {t('durationLabel')} {introContent.duration}
          </p>
        )}
        {introContent.audience && (
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm max-w-2xl mx-auto">
            {introContent.audience}
          </p>
        )}
        {introContent.recommendedStart && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-200">{introContent.recommendedStart}</p>
          </div>
        )}
        {introContent.firstActionCTA && (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-300 dark:border-emerald-700 rounded-xl p-4">
            <p className="font-bold text-emerald-800 dark:text-emerald-200 mb-1">{t('firstStepLabel')}</p>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">{introContent.firstActionCTA}</p>
          </div>
        )}
        {introContent.handoutPromise && (
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border-l-4 border-slate-400 p-4" role="region" aria-label={t('pdfHandoutAria')}>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug flex items-center gap-2">
              <Download className="w-4 h-4 flex-shrink-0 text-slate-500" aria-hidden="true" />
              {introContent.handoutPromise}
            </p>
          </div>
        )}
        {hasM6Progress && m6ScenarioTotal > 0 && (
          <p className="text-center text-sm font-semibold text-violet-700 dark:text-violet-300">
            {t('m6ProgressLabel', { done: m6CompletedCount, total: m6ScenarioTotal })}
          </p>
        )}
        <p className="text-gray-600 dark:text-gray-400 text-center text-sm md:text-base max-w-2xl mx-auto">
          {locale === 'en'
            ? <>In this module you will create one project (a research report or Custom GPT), followed by additional techniques: <strong>COMBO</strong>, <strong>HTML practice</strong>, <strong>SUPER PROMPTS</strong>, reflection and data management.</>
            : <>Šiame modulyje sukursite vieną projektą (tyrimo ataskaitą arba Custom GPT), o po jo – papildomos technikos: <strong>COMBO</strong>, <strong>HTML praktika</strong>, <strong>SUPER PROMPTAI</strong>, refleksija ir duomenų tvarkymas.</>}
        </p>
        <div className="bg-gradient-to-r from-emerald-50 to-accent-50 dark:from-emerald-900/20 dark:to-accent-900/20 p-6 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
          <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{t('projectOutcomeTitle')}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('projectOutcomeDesc')}</p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {outcomes.map((o, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" aria-hidden />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
        <details className="bg-white dark:bg-gray-800 rounded-xl border border-violet-200 dark:border-violet-800 overflow-hidden group">
          <summary className="list-none cursor-pointer p-4 font-bold text-gray-900 dark:text-white flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900/50">
            <span className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-sm font-bold">1–6</span>
              {t('m6JourneyHeading')}
            </span>
            <ChevronRight className="w-5 h-5 text-violet-500 dark:text-violet-400 shrink-0 group-open:rotate-90 transition-transform" aria-hidden />
          </summary>
          <div className="px-6 pb-6 border-t border-violet-200 dark:border-violet-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 mb-4">{locale === 'en' ? 'Project → COMBO → HTML practice → SUPER PROMPTS → Reflection → Data management.' : 'Projektas → COMBO → HTML praktika → SUPER PROMPTAI → Refleksija → Duomenų tvarkymas.'}</p>
            <ol className="space-y-2 list-none">
              {journey.map((j) => (
                <li key={j.step} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs font-bold flex items-center justify-center mt-0.5">{j.step}</span>
                  <div>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{j.label}</span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm block">{j.detail}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </details>
        <details className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden group">
          <summary className="list-none cursor-pointer p-4 font-bold text-gray-900 dark:text-white flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900/50">
            <span>{locale === 'en' ? 'Self-assessment card and Project steps' : 'Savęs vertinimo kortelė ir Projekto etapai'}</span>
            <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400 group-open:rotate-90 transition-transform" aria-hidden />
          </summary>
          <div className="px-6 pb-6 space-y-6 border-t border-gray-200 dark:border-gray-700">
        <div className="pt-4">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">{t('selfAssessmentTitle')}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('selfAssessmentDesc')}</p>
          <ul className="space-y-3" role="list">
            {checklist.map((c) => {
              const value = selfAssessment[c.id];
              return (
                <li key={c.id} className="flex flex-wrap items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                  <span className="text-gray-700 dark:text-gray-300 flex-1 min-w-0">{c.label}</span>
                  <div className="flex gap-1 shrink-0" role="group" aria-label={t('selfAssessmentAria', { label: c.label })}>
                    {(['taip', 'dar_ne', 'netaikau'] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setModule6SelfAssessment((prev) => ({ ...prev, [c.id]: opt }))}
                        aria-pressed={value === opt}
                        className={`min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
                          value === opt
                            ? opt === 'taip'
                              ? 'bg-emerald-600 text-white dark:bg-emerald-500'
                              : opt === 'dar_ne'
                                ? 'bg-amber-500 text-white dark:bg-amber-400'
                                : 'bg-gray-500 text-white dark:bg-gray-400'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        {opt === 'taip' ? (locale === 'en' ? 'Yes' : 'Taip') : opt === 'dar_ne' ? (locale === 'en' ? 'Not yet' : 'Dar ne') : (locale === 'en' ? 'N/A' : 'Netaikau')}
                      </button>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="bg-violet-50 dark:bg-violet-900/20 p-6 rounded-xl border border-violet-200 dark:border-violet-800">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">{t('projectStepsTitle')}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t('projectStepsDesc')}</p>
          <ol className="space-y-2 list-decimal list-inside text-gray-700 dark:text-gray-300">
            {stages.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
          </div>
        </details>
      </div>
    );
  }

  const scenarioIcons = [BarChart2, TrendingUp, Megaphone, MessageSquare, Users, AlertCircle] as const;
  const scenarioCards = [
    { title: locale === 'en' ? 'Executive strategic report' : 'Vadovo strateginė ataskaita', desc: locale === 'en' ? 'Prepare a clear quarterly / semi-annual report for the board.' : 'Paruošk aiškią ketvirčio / pusmečio ataskaitą valdybai.', action: locale === 'en' ? 'Generate report' : 'Generuok ataskaitą' },
    { title: locale === 'en' ? 'Sales analysis and action plan' : 'Pardavimų analizė ir veiksmų planas', desc: locale === 'en' ? 'Evaluate results and create a concrete action plan.' : 'Įvertink rezultatus ir sukurk konkretų veiksmų planą.', action: locale === 'en' ? 'Create plan' : 'Sudaryk planą' },
    { title: locale === 'en' ? 'Marketing campaign plan' : 'Marketingo kampanijos planas', desc: locale === 'en' ? 'Create a campaign strategy from idea to action.' : 'Sukurk kampanijos strategiją nuo idėjos iki veiksmų.', action: locale === 'en' ? 'Create campaign' : 'Kurk kampaniją' },
    { title: locale === 'en' ? 'Internal communications document' : 'Vidaus komunikacijos dokumentas', desc: locale === 'en' ? 'Prepare a clear, structured communication text for the team.' : 'Paruošk aiškų, struktūruotą komunikacijos tekstą komandai.', action: locale === 'en' ? 'Prepare document' : 'Ruošk dokumentą' },
    { title: locale === 'en' ? 'HR decision analysis' : 'Personalo sprendimų analizė', desc: locale === 'en' ? 'Evaluate the situation and provide solution options.' : 'Įvertink situaciją ir pateik sprendimo variantus.', action: locale === 'en' ? 'Analyse decision' : 'Analizuok sprendimą' },
    { title: locale === 'en' ? 'Customer complaint management' : 'Kliento skundo valdymas', desc: locale === 'en' ? 'Respond in a structured way and manage the situation.' : 'Struktūruotai atsakyk ir suvaldyk situaciją.', action: locale === 'en' ? 'Prepare response' : 'Paruošk atsakymą' },
  ];
  const hasScenarioProgress = Boolean(
    scenarioSlides?.length && progress?.completedTasks && moduleId != null
  );
  const completedCount = hasScenarioProgress
    ? scenarioSlides!.filter((s) => progress!.completedTasks[moduleId!]?.includes(s.slideId)).length
    : 0;

  const isMod3 = moduleId === 3;
  const introContent = getPracticeIntroContent(slide);
  const coverClasses = isMod3
    ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/40 p-6 rounded-xl border-2 border-emerald-300 dark:border-emerald-700'
    : 'bg-gradient-to-r from-accent-50 to-brand-50 dark:from-accent-900/20 dark:to-brand-900/20 p-6 rounded-xl border-2 border-accent-200 dark:border-accent-800';
  const progressTextClasses = isMod3
    ? 'text-emerald-700 dark:text-emerald-300'
    : 'text-accent-700 dark:text-accent-300';

  const isM9 = moduleId === 9;
  const recommendedIds = introContent.recommendedSlideIds ?? [];
  /** M9 / M12: rekomenduojami scenarijai pirmi (MUST lab'ai prieš SHOULD) */
  const displayScenarioSlides =
    recommendedIds.length > 0 && scenarioSlides?.length
      ? [...scenarioSlides].sort((a, b) => {
          const aRec = recommendedIds.indexOf(a.slideId);
          const bRec = recommendedIds.indexOf(b.slideId);
          if (aRec === -1 && bRec === -1) return 0;
          if (aRec === -1) return 1;
          if (bRec === -1) return -1;
          return aRec - bRec;
        })
      : scenarioSlides;
  /** M9: intro rodo tik 4 rekomenduojamus + „Visi 16 → hub“, ne visus 16 (USER_JOURNEY: 16 vienoje skaidrėje = absurdas) */
  const m9ScenarioBase = displayScenarioSlides ?? scenarioSlides;
  const introOnlyFourAndHub =
    isM9 && onNavigateToSlideById && m9ScenarioBase?.length
      ? [...m9ScenarioBase.slice(0, 4), { slideId: M9_HUB_SLIDE_ID, slideIndex: -1, title: locale === 'en' ? 'View all 16 scenarios (4×4)' : 'Peržiūrėti visus 16 scenarijų (4×4)', isHubLink: true } as PracticeScenarioSlideInfo & { isHubLink?: boolean }]
      : null;

  return (
    <div className="space-y-6">
      <div className={coverClasses}>
        {isM9 && introContent.meaningParagraph && (
          <p className="text-base text-gray-800 dark:text-gray-200 mb-4 font-medium leading-relaxed" role="region" aria-label={t('moduleMeaningAria')}>
            {introContent.meaningParagraph}
          </p>
        )}
        {!isM9 && whyBenefit && (
          <p className={`text-sm font-medium mb-3 ${isMod3 ? 'text-emerald-700 dark:text-emerald-300' : 'text-accent-700 dark:text-accent-300'}`}>
            {whyBenefit}
          </p>
        )}
        {isM9 && !introContent.meaningParagraph && whyBenefit && (
          <p className="text-sm font-medium mb-3 text-accent-700 dark:text-accent-300">{whyBenefit}</p>
        )}
        {isM9 && introContent.taskOneLiner && (
          <div className="mb-3 p-3 rounded-xl bg-brand-100 dark:bg-brand-900/30 border-2 border-brand-400 dark:border-brand-600" role="region" aria-label={t('yourTaskAria')}>
            <p className="font-bold text-brand-900 dark:text-brand-100 text-sm">{introContent.taskOneLiner}</p>
          </div>
        )}
        {isM9 && introContent.duration && (
          <p className="text-sm font-semibold text-accent-700 dark:text-accent-300 mb-2">
            {t('durationLabel')} {introContent.duration}
          </p>
        )}
        {isM9 && introContent.audience && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{introContent.audience}</p>
        )}
        {isM9 && introContent.recommendedStart && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-r-xl p-3 mb-3">
            <h4 className="font-bold text-amber-900 dark:text-amber-100 text-sm mb-1">{locale === 'en' ? 'Recommended for beginners' : 'Rekomenduojami pradedantiesiems'}</h4>
            <p className="text-sm text-amber-800 dark:text-amber-200">{introContent.recommendedStart}</p>
          </div>
        )}
        {isM9 && introContent.useCaseBlock && (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 rounded-r-xl p-3 mb-3" role="region" aria-label={t('whereToApplyQAria')}>
            <h4 className="font-bold text-emerald-900 dark:text-emerald-100 text-sm mb-1">{locale === 'en' ? 'Where to apply?' : 'Kur pritaikyti?'}</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">{introContent.useCaseBlock}</p>
          </div>
        )}
        {!isM9 && introContent.duration && (
          <p className="text-sm font-semibold text-accent-700 dark:text-accent-300 mb-2">{t('durationLabel')} {introContent.duration}</p>
        )}
        {isMod3 && introContent.optionalInstruction && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-r-xl p-3 mb-3" role="region" aria-label={t('optionalPracticeAria')}>
            <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">{introContent.optionalInstruction}</p>
          </div>
        )}
        {!isM9 && introContent.recommendedStart && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-r-xl p-3 mb-3" role="region" aria-label={t('recommendedStartAria')}>
            <p className="text-sm text-amber-800 dark:text-amber-200">{introContent.recommendedStart}</p>
          </div>
        )}
        {recommendedNote && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 rounded-lg bg-gray-100 dark:bg-gray-800/60 px-3 py-2 border-l-4 border-accent-500">
            {recommendedNote}
          </p>
        )}
        {introContent.firstActionCTA && (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-300 dark:border-emerald-700 rounded-xl p-4 mb-3" role="region" aria-label={t('firstStepAria')}>
            <p className="font-bold text-emerald-800 dark:text-emerald-200 mb-1">{t('firstStepLabel')}</p>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">{introContent.firstActionCTA}</p>
          </div>
        )}
        {moduleId === 9 && (introContent.storyBlock || introContent.characterMeaning) && (
          <div className="mb-3" role="region" aria-label={t('storyBlockAria')}>
            {introContent.storyBlock && (
              <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500 rounded-r-xl p-4 mb-3">
                <h4 className="font-bold text-brand-900 dark:text-brand-100 text-sm mb-2">{t('storyBlockHeading')}</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{introContent.storyBlock}</p>
              </div>
            )}
            {introContent.characterMeaning && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2" dangerouslySetInnerHTML={{ __html: introContent.characterMeaning.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            )}
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">{t('pressCharacterHint')}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {M9_CHARACTERS.map((ch) => (
                <CharacterCard
                  key={ch.id}
                  character={ch}
                  onSelect={onNavigateToHubWithCharacter ? () => onNavigateToHubWithCharacter(ch.id - 1) : undefined}
                />
              ))}
            </div>
          </div>
        )}
        {introContent.learningOutcomes && introContent.learningOutcomes.length > 0 && (
          <ul className="mb-3 space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
            {introContent.learningOutcomes.map((o, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-accent-600 dark:text-accent-400 mt-0.5" aria-hidden />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2.5">
            <Briefcase className="w-5 h-5 text-brand-600 dark:text-brand-400" strokeWidth={1.5} />
            {locale === 'en' ? 'Practical Application' : 'Praktinis Pritaikymas'}
          </h3>
          {isMod3 && (
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-400/50 dark:border-emerald-600/50">
              {locale === 'en' ? '6 scenarios' : '6 scenarijai'}
            </span>
          )}
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          {isM9
            ? (locale === 'en' ? 'Now you will apply business analysis scenarios (continuation of Modules 7–8, data analysis path) to real business situations.' : 'Dabar pritaikysite verslo analizės scenarijus (Modulių 7–8 tęsinys, duomenų analizės kelias) realiems verslo situacijoms.')
            : (locale === 'en' ? 'Now you will apply the 6-block system to real business scenarios.' : 'Dabar pritaikysite 6 blokų sistemą realiems verslo scenarijams.')}
          {' '}{locale === 'en' ? 'Each scenario has a different context and challenges.' : 'Kiekvienas scenarijus turi skirtingą kontekstą ir iššūkius.'}
        </p>
        {hasScenarioProgress && (
          <p className={`mt-3 text-sm font-semibold ${progressTextClasses}`}>
            {isMod3 && introContent.minScenariosToComplete != null
              ? (locale === 'en'
                ? `${completedCount} of ${scenarioSlides!.length} scenarios completed (at least ${introContent.minScenariosToComplete} required)`
                : `${completedCount} iš ${scenarioSlides!.length} scenarijų užbaigta (bent ${introContent.minScenariosToComplete} privaloma)`)
              : (locale === 'en'
                ? `${completedCount} of ${scenarioSlides!.length} scenarios completed`
                : `${completedCount} iš ${scenarioSlides!.length} scenarijų užbaigta`)}
          </p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2.5">
          <Target className="w-5 h-5 text-accent-600 dark:text-accent-400" strokeWidth={1.5} />
          <span>{scenarioSlides?.length === 16
              ? (locale === 'en' ? '🔥 16 scenarios (4×4)' : '🔥 16 scenarijų (4×4)')
              : (locale === 'en' ? '🔥 6 Business Scenarios' : '🔥 6 Verslo Scenarijai')}</span>
        </h4>
        {isM9 && ((introOnlyFourAndHub?.length ?? displayScenarioSlides?.length ?? 0) > 0) && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3" role="doc-subtitle">
            {introOnlyFourAndHub
              ? t('selectScenarioHintA')
              : t('selectScenarioHintB')}
          </p>
        )}
        <div className={`grid gap-3 ${scenarioSlides?.length === 16 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
          {((() => {
            const list = introOnlyFourAndHub ?? displayScenarioSlides ?? scenarioSlides;
            return list?.length ? list : [0, 1, 2, 3, 4, 5];
          })()).map((item, idx) => {
            const isHubLink = typeof item === 'object' && item !== null && 'isHubLink' in item && (item as PracticeScenarioSlideInfo & { isHubLink?: boolean }).isHubLink;
            const isScenario = typeof item === 'object' && item !== null && 'slideId' in item && !isHubLink;
            const slideIndex = isScenario ? (item as PracticeScenarioSlideInfo).slideIndex : 0;
            const slideId = isScenario ? (item as PracticeScenarioSlideInfo).slideId : isHubLink ? M9_HUB_SLIDE_ID : 0;
            /** M3 Faze 3: vienas dominuojantis CTA per scenarijų – pirmas scenarijus primary, kiti secondary */
            const isFirstScenarioPrimary = isMod3 && isScenario && idx === 0;
            const cardData = scenarioCards[idx] ?? {
              title: isScenario ? (item as PracticeScenarioSlideInfo).title.replace(/^Scenarijus \d+:?\s*/i, '').trim() : isHubLink ? (locale === 'en' ? 'All 16 scenarios (4×4)' : 'Visi 16 scenarijų (4×4)') : '',
              desc: isHubLink ? (locale === 'en' ? 'Hub slide – 4 paths × 4 scenarios' : 'Hub skaidrė – 4 kryptys × 4 scenarijai') : (locale === 'en' ? 'Scenario' : 'Scenarijus'),
              action: isHubLink ? (locale === 'en' ? 'Open hub →' : 'Atidaryti hub →') : (locale === 'en' ? 'Go to scenario' : 'Eiti į scenarijų'),
            };
            const title = isScenario
              ? (item as PracticeScenarioSlideInfo).title.replace(/^Scenarijus \d+:?\s*/i, '').trim() || cardData.title
              : isHubLink
                ? (item as PracticeScenarioSlideInfo & { isHubLink?: boolean }).title
                : cardData.title;
            const desc = cardData.desc ?? '';
            const action = cardData.action ?? (locale === 'en' ? 'Go' : 'Eiti');
            const IconComponent = scenarioIcons[idx % scenarioIcons.length];
            const isCompleted = hasScenarioProgress && isScenario && progress!.completedTasks[moduleId!]?.includes(slideId);
            const isRecommended = recommendedIds.length > 0 && isScenario && recommendedIds.includes(slideId);
            const canNavigate = isHubLink ? Boolean(onNavigateToSlideById) : (onNavigateToSlide && isScenario);
            const handleClick = isHubLink && onNavigateToSlideById ? () => onNavigateToSlideById(M9_HUB_SLIDE_ID) : (onNavigateToSlide && isScenario ? () => onNavigateToSlide(slideIndex) : undefined);
            const card = (
              <div
                key={isHubLink ? 'hub' : isScenario ? slideId : idx}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-all relative ${
                  canNavigate
                    ? `cursor-pointer hover:ring-2 focus:outline-none focus:ring-2 bg-gray-50 dark:bg-gray-900/50 ${
                        isMod3
                          ? 'hover:ring-emerald-500 focus:ring-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
                          : 'hover:ring-brand-500 focus:ring-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 border-transparent'
                      }`
                    : 'bg-gray-50 dark:bg-gray-900/50 border-transparent'
                } ${isHubLink ? 'border-dashed border-brand-400 dark:border-brand-600 bg-brand-50/50 dark:bg-brand-900/10' : ''} ${isRecommended ? 'ring-2 ring-amber-400 dark:ring-amber-500 border-amber-300 dark:border-amber-600' : ''}`}
                onClick={handleClick}
                onKeyDown={
                  canNavigate && handleClick
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleClick();
                        }
                      }
                    : undefined
                }
                role={canNavigate ? 'button' : undefined}
                tabIndex={canNavigate ? 0 : undefined}
                aria-label={canNavigate ? (isHubLink ? t('openHub16Aria') : t('goToAria', { title })) : undefined}
              >
                <span className="inline-flex p-2 rounded-lg bg-brand-500/10 dark:bg-brand-500/20 shrink-0">
                  <IconComponent className="w-5 h-5 text-brand-600 dark:text-brand-400" strokeWidth={1.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 flex-wrap">
                    {title}
                    {isRecommended && (
                      <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-400/50 dark:border-amber-600/50">
                        {locale === 'en' ? 'Recommended' : 'Rekomenduojama'}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                  <span className={`mt-1 ${isFirstScenarioPrimary ? 'inline-flex min-h-[40px] items-center rounded-xl bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-md' : 'block text-sm font-medium text-emerald-600 dark:text-emerald-400'}`}>
                    👉 {action}
                  </span>
                  {hasScenarioProgress && isScenario && (
                    <span
                      className={`mt-1 inline-flex items-center text-xs font-medium ${
                        isCompleted
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {isCompleted ? `✓ ${t('completedLabel')}` : t('notAddedLabel')}
                    </span>
                  )}
                </div>
              </div>
            );
            return card;
          })}
        </div>
      </div>

      <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl">
        <p className="text-brand-800 dark:text-brand-200 text-sm flex items-start gap-2.5">
          <span className="inline-flex p-1.5 rounded-lg bg-brand-500/10 dark:bg-brand-500/20 shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4 text-brand-600 dark:text-brand-400" strokeWidth={1.5} />
          </span>
          <span>
            {scenarioSlides?.length === 16
              ? introOnlyFourAndHub
                ? t('selectOneOf4OrHub')
                : t('selectOneScenarioBelow')
              : (locale === 'en' ? 'Review the first scenario as an example. Create the rest yourself.' : 'Pirmą scenarijų peržiūrėk kaip pavyzdį. Kitus – sukurk pats.')}
          </span>
        </p>
      </div>
    </div>
  );
}

/** Modulio 9: 4×4 scenarijų hub – pasirink 1 iš 4 veikėjų, paskui 1 iš to veikėjo 4 scenarijų. Ryšys: level1Choices[i] = veikėjas i, level2Choices[i] = to veikėjo 4 scenarijai. */
export function PracticeScenarioHubSlide({
  content,
  onNavigateToSlideById,
  initialLevel1,
  onGoToSummary,
}: {
  content: PracticeScenarioHubContent;
  onNavigateToSlideById: (slideId: number) => void;
  initialLevel1?: number;
  onGoToSummary?: () => void;
}) {
  useTranslation();
  const t = getT('testPractice');
  const { locale } = useLocale();
  const [selectedLevel1, setSelectedLevel1] = useState<number | null>(() => initialLevel1 ?? null);

  useEffect(() => {
    if (typeof initialLevel1 === 'number' && initialLevel1 >= 0 && initialLevel1 < 4) {
      setSelectedLevel1(initialLevel1);
    }
  }, [initialLevel1]);

  const level1Choices = Array.isArray(content?.level1Choices) ? content.level1Choices : [];
  const level2Choices = Array.isArray(content?.level2Choices) ? content.level2Choices : [];
  const level2 = selectedLevel1 !== null && level2Choices[selectedLevel1] ? level2Choices[selectedLevel1] : null;

  const cardBase =
    'flex flex-col gap-2 p-4 rounded-xl border-2 text-left transition-all min-h-[44px] justify-center focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 cursor-pointer ' +
    'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-600 hover:ring-2 hover:ring-brand-500/20';

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-accent-50 to-brand-50 dark:from-accent-900/20 dark:to-brand-900/20 p-6 rounded-xl border-2 border-accent-200 dark:border-accent-800">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{t('scenarioGridTitle')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('scenarioGridDesc')}
            </p>
          </div>
          {onGoToSummary && (
            <button
              type="button"
              onClick={onGoToSummary}
              className="shrink-0 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded px-3 py-2 touch-manipulation"
              aria-label={t('goToSummaryAria')}
            >
              {locale === 'en' ? '✓ Finish and go to summary' : '✓ Baigti ir į santrauką'}
            </button>
          )}
        </div>
      </div>

      {selectedLevel1 === null && (
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400" aria-live="polite">
          {t('step1SelectCharacter')}
        </p>
      )}

      {selectedLevel1 !== null && (
        <>
          <button
            type="button"
            onClick={() => setSelectedLevel1(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedLevel1(null);
              }
            }}
            className="min-h-[44px] inline-flex items-center justify-center text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded px-3 py-2 gap-1 touch-manipulation"
            aria-label={t('backToFirstChoiceAria')}
          >
            {locale === 'en' ? '← Back to selection' : '← Grįžti prie pasirinkimo'}
          </button>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400" aria-live="polite">
            {t('step2SelectScenario')}
          </p>
          {onGoToSummary && (
            <div className="mt-2">
              <button
                type="button"
                onClick={onGoToSummary}
                className="min-h-[44px] inline-flex items-center justify-center text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded px-3 py-2 touch-manipulation"
                aria-label={t('goToSummaryAria')}
              >
                {locale === 'en' ? '✓ Finish and go to summary' : '✓ Baigti ir pereiti į santrauką'}
              </button>
            </div>
          )}
        </>
      )}

      {level2 === null ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {level1Choices.map((choice, index) => (
            <button
              key={`veikejas-${index}`}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedLevel1(index);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedLevel1(index);
                }
              }}
              className={cardBase}
              aria-label={t('selectCharacterAria', { title: choice?.title ?? t('characterN', { n: index + 1 }) })}
            >
              <span className="font-semibold text-gray-900 dark:text-white">{choice?.title ?? t('characterN', { n: index + 1 })}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{choice?.description ?? ''}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {level2.map((choice) => (
            <button
              key={choice.targetSlideId}
              type="button"
              onClick={() => onNavigateToSlideById(choice.targetSlideId)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigateToSlideById(choice.targetSlideId);
                }
              }}
              className={cardBase}
              aria-label={t('goToScenarioAria', { title: choice.title })}
            >
              <span className="font-semibold text-gray-900 dark:text-white">{choice.title}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{choice.description}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const SCENARIO_TABS_LT = [
  { id: 'context', label: 'Kontekstas', key: 'context' as const },
  { id: 'data', label: 'Duomenys', key: 'data' as const },
  { id: 'constraints', label: 'Apribojimai', key: 'constraints' as const },
  { id: 'result', label: 'Rezultatas', key: 'expectedFormat' as const },
] as const;

const SCENARIO_TABS_EN = [
  { id: 'context', label: 'Context', key: 'context' as const },
  { id: 'data', label: 'Data', key: 'data' as const },
  { id: 'constraints', label: 'Constraints', key: 'constraints' as const },
  { id: 'result', label: 'Result', key: 'expectedFormat' as const },
] as const;

type ScenarioTabId = 'context' | 'data' | 'constraints' | 'result';

export function PracticeScenarioSlide({
  slide,
  onRenderTask,
  onGoToSummary,
  character,
}: {
  slide: Slide;
  onRenderTask: () => JSX.Element | null;
  /** Modulio 3: pereiti į santrauką (grįžti prie išsaugoto darbo kitą kartą) */
  onGoToSummary?: () => void;
  /** Modulio 9 role-quest: veikėjas, atliekantis šį scenarijų – rodoma asmens kortelė */
  character?: M9Character;
}) {
  useTranslation();
  const t = getT('testPractice');
  const { locale } = useLocale();
  const SCENARIO_TABS = locale === 'en' ? SCENARIO_TABS_EN : SCENARIO_TABS_LT;
  const [activeTab, setActiveTab] = useState<ScenarioTabId>('context');
  /** W1: šakotas scenarijus – pasirinkto varianto indeksas (null = dar nepasirinkta) */
  const [selectedBranchingIndex, setSelectedBranchingIndex] = useState<number | null>(null);
  if (!slide.scenario) return null;

  const branching = slide.scenario.branching;
  const showBranchingOnly = branching && selectedBranchingIndex === null;

  const tabContent: Record<string, string> = {
    context: slide.scenario.context,
    data: slide.scenario.data,
    constraints: slide.scenario.constraints,
    result: slide.scenario.expectedFormat,
  };
  const isDataTab = activeTab === 'data';

  const reflectionPromptAfter = (slide.content as { reflectionPromptAfter?: string } | undefined)?.reflectionPromptAfter;
  const taskFrame = (slide.content as { taskFrame?: { task: string; doneWhen: string } } | undefined)?.taskFrame;

  return (
    <div className="space-y-6">
      {character && (
        <CharacterCard character={character} />
      )}
      {slide.scenario?.narrativeLead && (
        <p className="text-brand-700 dark:text-brand-300 italic text-sm border-l-4 border-brand-400 dark:border-brand-600 pl-3 py-1" role="complementary" aria-label={t('scenarioIntroAria')}>
          {slide.scenario.narrativeLead}
        </p>
      )}
      {taskFrame && (
        <div className="space-y-2 rounded-xl border-2 border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/20 p-4" role="region" aria-label={t('taskFrameAria')}>
          <p className="text-sm font-bold text-brand-900 dark:text-brand-100">
            {locale === 'en' ? 'Task:' : 'Užduotis:'} <span className="font-normal">{taskFrame.task}</span>
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">{t('doneWhenLabel')}</span> {taskFrame.doneWhen}
          </p>
        </div>
      )}

      {/* W1: šakotas scenarijus – pirmiausia pasirinkimas */}
      {showBranchingOnly && (
        <div className="bg-violet-50 dark:bg-violet-900/20 border-2 border-violet-200 dark:border-violet-800 rounded-xl p-6" role="region" aria-label={t('scenarioChoiceAria')}>
          <h4 className="font-bold text-violet-900 dark:text-violet-100 mb-3">{branching!.question}</h4>
          <ul className="space-y-2 list-none">
            {branching!.choices.map((choice, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => setSelectedBranchingIndex(idx)}
                  className="w-full text-left min-h-[44px] px-4 py-3 rounded-xl border-2 border-violet-200 dark:border-violet-700 bg-white dark:bg-gray-800 hover:border-violet-400 dark:hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-colors touch-manipulation"
                  aria-label={t('selectChoiceAria', { label: choice.label })}
                >
                  <span className="font-medium text-gray-900 dark:text-white">{choice.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* W1: po pasirinkimo – pasekmė ir toliau scenarijus */}
      {branching && selectedBranchingIndex !== null && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 dark:border-emerald-600 pl-4 py-3 rounded-r-xl" role="status" aria-live="polite">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-1">{t('yourChoiceLabel', { label: branching.choices[selectedBranchingIndex].label })}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{branching.choices[selectedBranchingIndex].consequence}</p>
        </div>
      )}

      {!showBranchingOnly && (
      <>
      {slide.scenario?.situation && (
        <div className="bg-brand-50/80 dark:bg-brand-900/20 border-l-4 border-brand-500 dark:border-brand-600 pl-4 py-3 rounded-r-xl" role="region" aria-label={t('situationAria')}>
          <h4 className="font-semibold text-brand-900 dark:text-brand-100 text-sm mb-1">{locale === 'en' ? 'Situation' : 'Situacija'}</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">{slide.scenario.situation}</p>
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-brand-200 dark:border-brand-800">
        <h4 className="font-bold text-brand-900 dark:text-brand-100 mb-4 flex items-center gap-2">
          <span className="text-xl">📋</span> {t('scenarioDescription')}
        </h4>

        <div role="tablist" aria-label={t('scenarioSectionsAria')} className="flex flex-wrap gap-1 border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
          {SCENARIO_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`scenario-panel-${tab.id}`}
              id={`scenario-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[44px] px-3 py-2 rounded-t-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
                activeTab === tab.id
                  ? 'bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200 border border-brand-300 dark:border-brand-700 border-b-0 -mb-px'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          id={`scenario-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`scenario-tab-${activeTab}`}
          className="min-h-[80px]"
        >
          <p
            className={`text-gray-700 dark:text-gray-300 ${isDataTab ? 'bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg font-mono text-sm' : ''}`}
          >
            {tabContent[activeTab]}
          </p>
        </div>
      </div>

      {onRenderTask()}

      {reflectionPromptAfter && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-4" role="region" aria-label={t('shortReflectionAria')}>
          <h4 className="font-bold text-amber-900 dark:text-amber-100 text-sm mb-2 flex items-center gap-2">
            <span className="text-base">💡</span> {locale === 'en' ? 'Short reflection' : 'Trumpa refleksija'}
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-3">{reflectionPromptAfter}</p>
          <CopyButton text={reflectionPromptAfter} size="sm" ariaLabel={t('copyReflectionPromptAria')} />
        </div>
      )}

      {onGoToSummary && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onGoToSummary}
            className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded px-2 py-1.5"
            aria-label={t('goToPracticeSummaryAria')}
          >
            {locale === 'en' ? '→ To summary' : '→ Į santrauką'}
          </button>
        </div>
      )}
      </>
      )}
    </div>
  );
}