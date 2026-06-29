import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { Module, Slide } from '../types/modules';
import type { Progress } from './progress';

const SWIPE_THRESHOLD = 60;
const MOBILE_SWIPE_THRESHOLD = 80;
const SLIDE_POS_KEY = 'prompt-anatomy-slide-pos';
const SWIPE_LOCK_SELECTOR = [
  '[data-slide-swipe-lock]',
  'button',
  'a[href]',
  'input',
  'textarea',
  'select',
  'summary',
  '[role="button"]',
  '[contenteditable="true"]',
].join(', ');

/* ─── Slide position persistence ─── */

export function getSavedSlidePosition(moduleId: number): number {
  try {
    const raw = localStorage.getItem(SLIDE_POS_KEY);
    if (!raw) return 0;
    const map: Record<string, number> = JSON.parse(raw);
    return typeof map[String(moduleId)] === 'number'
      ? map[String(moduleId)]
      : 0;
  } catch {
    return 0;
  }
}

export function saveSlidePosition(moduleId: number, slideIndex: number): void {
  try {
    const raw = localStorage.getItem(SLIDE_POS_KEY);
    const map: Record<string, number> = raw ? JSON.parse(raw) : {};
    map[String(moduleId)] = slideIndex;
    localStorage.setItem(SLIDE_POS_KEY, JSON.stringify(map));
  } catch {
    // ignore – non-critical
  }
}

export interface UseSlideNavigationParams {
  module: Module | null | undefined;
  moduleId: number;
  progress: Progress;
  onComplete: (moduleId: number) => void;
  /** Jei true – iškart eiti prie saved pozicijos (ne rodyti resume prompt) */
  resumeImmediately?: boolean;
  /** F2-3: atidaryti modulį tiesiai nuo šios skaidrės (remediation deep link) */
  initialSlideIndex?: number | null;
  /** A-S4: Fast track – praleisti optional skaidrės (Pirmyn/Atgal peršoka per „Papildoma“) */
  skipOptional?: boolean;
  /**
   * Lygis B (M7 keliai): aktyvių teminių šakų id pagal pasirinktą fokusą.
   * `null` / `undefined` = rodyti visas šakas (fokusas nepasirinktas). Tuščias masyvas
   * = tik branduolys. Skaidrė su `pathBranch` rodoma tik kai sutampa bent viena šaka.
   */
  activeBranchIds?: string[] | null;
}

export interface UseSlideNavigationResult {
  currentSlide: number;
  setCurrentSlide: (index: number | ((prev: number) => number)) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  isFirstSlide: boolean;
  isLastSlide: boolean;
  hasIncompletePracticalTask: boolean;
  slideProgress: number;
  currentSlideData: Slide | undefined;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  handleTouchCancel: () => void;
  showModuleComplete: boolean;
  setShowModuleComplete: (show: boolean) => void;
  /** Saved slide pozicija (>0) jei vartotojas turi progress šiame modulyje */
  savedSlidePosition: number;
  /** Matomų skaidrių kiekis pagal aktyvų filtrą (Fast track + šakos) – UI skaitikliui */
  visibleSlideCount: number;
  /** Dabartinės skaidrės 1-based pozicija tarp matomų skaidrių – UI skaitikliui */
  visiblePosition: number;
}

/** Filtravimo parinktys navigacijos matomumui (Fast track + M7 šakos). */
export interface SlideVisibilityOptions {
  skipOptional?: boolean;
  activeBranchIds?: string[] | null;
}

/**
 * Ar skaidrė paslėpta navigacijoje pagal aktyvų filtrą.
 * - Fast track: paslėpta, jei `skipOptional` ir `slide.optional`.
 * - Šakos (Lygis B): paslėpta, jei skaidrė turi `pathBranch`, fokusas pasirinktas
 *   (`activeBranchIds != null`) ir nė viena šaka nesutampa.
 */
export function isSlideHiddenForNav(
  slide: Slide | undefined,
  { skipOptional, activeBranchIds }: SlideVisibilityOptions
): boolean {
  if (!slide) return false;
  if (skipOptional && slide.optional) return true;
  const branches = slide.pathBranch;
  if (branches && branches.length > 0 && activeBranchIds != null) {
    const matches = branches.some((b) => activeBranchIds.includes(b));
    if (!matches) return true;
  }
  return false;
}

/** Riboja skaidrės indeksą į [0, slideCount - 1]; tuščiam moduliui grąžina 0. */
export function clampSlideIndex(index: number, slideCount: number): number {
  if (slideCount <= 0) return 0;
  return Math.min(Math.max(0, index), slideCount - 1);
}

/** A-S4: rasti kitą ne-optional skaidrės indeksą (į priekį arba atgal). Eksportuojama tik testams. */
export function getNextNonOptionalIndex(
  slides: Slide[],
  fromIndex: number,
  forward: boolean
): number {
  if (!slides?.length) return fromIndex;
  if (forward) {
    for (let i = fromIndex + 1; i < slides.length; i++) {
      if (!slides[i].optional) return i;
    }
    return slides.length - 1;
  }
  for (let i = fromIndex - 1; i >= 0; i--) {
    if (!slides[i].optional) return i;
  }
  return 0;
}

/**
 * Gretima matoma skaidrė viena kryptimi pagal filtrą (Fast track + šakos).
 * Grąžina indeksą arba -1, jei tolesnės matomos skaidrės nėra.
 */
export function getAdjacentVisibleIndex(
  slides: Slide[],
  fromIndex: number,
  forward: boolean,
  opts: SlideVisibilityOptions
): number {
  if (!slides?.length) return -1;
  const step = forward ? 1 : -1;
  for (let i = fromIndex + step; i >= 0 && i < slides.length; i += step) {
    if (!isSlideHiddenForNav(slides[i], opts)) return i;
  }
  return -1;
}

/**
 * Išsprendžia norimą indeksą į matomą: clamp + jei skaidrė paslėpta, pereina
 * prie artimiausios matomos (pirmiausia pirmyn, paskui atgal). Naudojama initial /
 * resume pozicijai, kai pasirinktas fokusas paslepia išsaugotą šakos skaidrę.
 */
export function resolveVisibleIndex(
  slides: Slide[],
  desiredIndex: number,
  opts: SlideVisibilityOptions
): number {
  if (!slides?.length) return 0;
  const clamped = clampSlideIndex(desiredIndex, slides.length);
  if (!isSlideHiddenForNav(slides[clamped], opts)) return clamped;
  const forward = getAdjacentVisibleIndex(slides, clamped, true, opts);
  if (forward !== -1) return forward;
  const backward = getAdjacentVisibleIndex(slides, clamped, false, opts);
  if (backward !== -1) return backward;
  return clamped;
}

/** Matomų skaidrių kiekis pagal filtrą. */
export function countVisibleSlides(
  slides: Slide[],
  opts: SlideVisibilityOptions
): number {
  if (!slides?.length) return 0;
  let count = 0;
  for (const slide of slides) {
    if (!isSlideHiddenForNav(slide, opts)) count++;
  }
  return count;
}

/** Dabartinės skaidrės 1-based pozicija tarp matomų skaidrių. */
export function getVisiblePosition(
  slides: Slide[],
  index: number,
  opts: SlideVisibilityOptions
): number {
  if (!slides?.length) return 0;
  let pos = 0;
  for (let i = 0; i <= index && i < slides.length; i++) {
    if (!isSlideHiddenForNav(slides[i], opts)) pos++;
  }
  return Math.max(1, pos);
}

export function getSwipeThreshold(viewportWidth: number): number {
  return viewportWidth < 1024 ? MOBILE_SWIPE_THRESHOLD : SWIPE_THRESHOLD;
}

export function shouldLockSwipeFromTarget(target: EventTarget | null): boolean {
  return (
    target instanceof Element && Boolean(target.closest(SWIPE_LOCK_SELECTOR))
  );
}

export function useSlideNavigation({
  module,
  moduleId,
  progress,
  onComplete,
  resumeImmediately,
  initialSlideIndex,
  skipOptional,
  activeBranchIds,
}: UseSlideNavigationParams): UseSlideNavigationResult {
  const savedPos = useMemo(() => getSavedSlidePosition(moduleId), [moduleId]);
  const visibilityOpts = useMemo<SlideVisibilityOptions>(
    () => ({ skipOptional, activeBranchIds }),
    [skipOptional, activeBranchIds]
  );
  const initialSlide = useMemo(() => {
    const slides = module?.slides ?? [];
    if (!slides.length) return 0;
    if (initialSlideIndex != null) {
      // Remediation deep link – tikslus indeksas (taikinys visada branduolyje).
      return clampSlideIndex(initialSlideIndex, slides.length);
    }
    if (resumeImmediately && savedPos > 0) {
      return resolveVisibleIndex(slides, savedPos, visibilityOpts);
    }
    return resolveVisibleIndex(slides, 0, visibilityOpts);
  }, [
    initialSlideIndex,
    module?.slides,
    resumeImmediately,
    savedPos,
    visibilityOpts,
  ]);
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [showModuleComplete, setShowModuleComplete] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartLocked = useRef(false);

  const nextSlide = useCallback(() => {
    if (!module) return;
    const nextIndex = getAdjacentVisibleIndex(
      module.slides,
      currentSlide,
      true,
      visibilityOpts
    );
    if (nextIndex !== -1) {
      setCurrentSlide(nextIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (!progress.completedModules.includes(moduleId)) {
        onComplete(moduleId);
      }
      setShowModuleComplete(true);
    }
  }, [
    currentSlide,
    module,
    progress.completedModules,
    moduleId,
    onComplete,
    visibilityOpts,
  ]);

  const prevSlide = useCallback(() => {
    const prevIndex = getAdjacentVisibleIndex(
      module?.slides ?? [],
      currentSlide,
      false,
      visibilityOpts
    );
    if (prevIndex !== -1) {
      setCurrentSlide(prevIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentSlide, module?.slides, visibilityOpts]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartLocked.current = shouldLockSwipeFromTarget(e.target);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchCancel = useCallback(() => {
    touchStartX.current = null;
    touchStartY.current = null;
    touchStartLocked.current = false;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current == null || touchStartY.current == null) return;
      if (touchStartLocked.current) {
        handleTouchCancel();
        return;
      }
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = touch.clientY - touchStartY.current;
      handleTouchCancel();
      const swipeThreshold =
        typeof window !== 'undefined'
          ? getSwipeThreshold(window.innerWidth)
          : SWIPE_THRESHOLD;
      if (Math.abs(deltaX) < swipeThreshold) return;
      if (Math.abs(deltaY) >= Math.abs(deltaX)) return;
      if (deltaX > 0) prevSlide();
      else nextSlide();
    },
    [handleTouchCancel, nextSlide, prevSlide]
  );

  const currentSlideData = useMemo(
    () => module?.slides[currentSlide],
    [module, currentSlide]
  );

  const isLastSlide = useMemo(
    () =>
      getAdjacentVisibleIndex(
        module?.slides ?? [],
        currentSlide,
        true,
        visibilityOpts
      ) === -1,
    [currentSlide, module?.slides, visibilityOpts]
  );

  const isFirstSlide = useMemo(
    () =>
      getAdjacentVisibleIndex(
        module?.slides ?? [],
        currentSlide,
        false,
        visibilityOpts
      ) === -1,
    [currentSlide, module?.slides, visibilityOpts]
  );

  const visibleSlideCount = useMemo(
    () => countVisibleSlides(module?.slides ?? [], visibilityOpts),
    [module?.slides, visibilityOpts]
  );

  const visiblePosition = useMemo(
    () =>
      getVisiblePosition(module?.slides ?? [], currentSlide, visibilityOpts),
    [module?.slides, currentSlide, visibilityOpts]
  );

  const hasIncompletePracticalTask = useMemo(
    () =>
      Boolean(
        (currentSlideData?.practicalTask ||
          currentSlideData?.type === 'action-intro-journey') &&
        !progress.completedTasks[moduleId]?.includes(currentSlideData.id)
      ),
    [currentSlideData, progress.completedTasks, moduleId]
  );

  const slideProgress = useMemo(
    () =>
      visibleSlideCount > 0 ? (visiblePosition / visibleSlideCount) * 100 : 0,
    [visiblePosition, visibleSlideCount]
  );

  // Persist slide position on every change
  useEffect(() => {
    saveSlidePosition(moduleId, currentSlide);
  }, [moduleId, currentSlide]);

  // Reset when module changes, slide count changes (e.g. M2 compression),
  // or aktyvus filtras pasikeičia (Fast track / pasirinktas M7 fokusas).
  useEffect(() => {
    const slides = module?.slides ?? [];
    const saved = getSavedSlidePosition(moduleId);
    const nextSlide =
      initialSlideIndex != null && slides.length > 0
        ? clampSlideIndex(initialSlideIndex, slides.length)
        : resumeImmediately && saved > 0
          ? resolveVisibleIndex(slides, saved, visibilityOpts)
          : resolveVisibleIndex(slides, 0, visibilityOpts);
    setCurrentSlide(nextSlide);
    setShowModuleComplete(false);
  }, [
    moduleId,
    module?.slides,
    initialSlideIndex,
    resumeImmediately,
    visibilityOpts,
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (!showModuleComplete) nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!showModuleComplete) prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, showModuleComplete]);

  return {
    currentSlide,
    setCurrentSlide,
    nextSlide,
    prevSlide,
    isFirstSlide,
    isLastSlide,
    hasIncompletePracticalTask,
    slideProgress,
    currentSlideData,
    handleTouchStart,
    handleTouchEnd,
    handleTouchCancel,
    showModuleComplete,
    setShowModuleComplete,
    savedSlidePosition: savedPos,
    visibleSlideCount,
    visiblePosition,
  };
}
