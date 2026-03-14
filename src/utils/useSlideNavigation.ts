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
}: UseSlideNavigationParams): UseSlideNavigationResult {
  const savedPos = useMemo(() => getSavedSlidePosition(moduleId), [moduleId]);
  const initialSlide = useMemo(() => {
    if (initialSlideIndex != null && module?.slides?.length) {
      return Math.min(Math.max(0, initialSlideIndex), module.slides.length - 1);
    }
    return resumeImmediately && savedPos > 0 ? savedPos : 0;
  }, [initialSlideIndex, module?.slides?.length, resumeImmediately, savedPos]);
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [showModuleComplete, setShowModuleComplete] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartLocked = useRef(false);

  const nextSlide = useCallback(() => {
    if (!module) return;
    if (currentSlide < module.slides.length - 1) {
      const nextIndex = skipOptional
        ? getNextNonOptionalIndex(module.slides, currentSlide, true)
        : currentSlide + 1;
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
    skipOptional,
  ]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      const prevIndex = skipOptional
        ? getNextNonOptionalIndex(module?.slides ?? [], currentSlide, false)
        : currentSlide - 1;
      setCurrentSlide(prevIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentSlide, module?.slides, skipOptional]);

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
    () => currentSlide === (module?.slides.length ?? 0) - 1,
    [currentSlide, module]
  );

  const isFirstSlide = useMemo(() => currentSlide === 0, [currentSlide]);

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
    () => (module ? ((currentSlide + 1) / module.slides.length) * 100 : 0),
    [currentSlide, module]
  );

  // Persist slide position on every change
  useEffect(() => {
    saveSlidePosition(moduleId, currentSlide);
  }, [moduleId, currentSlide]);

  // Reset when module changes (new module opened)
  useEffect(() => {
    const saved = getSavedSlidePosition(moduleId);
    const slideCount = module?.slides?.length ?? 0;
    const nextSlide =
      initialSlideIndex != null && slideCount > 0
        ? Math.min(Math.max(0, initialSlideIndex), slideCount - 1)
        : resumeImmediately && saved > 0
          ? saved
          : 0;
    const clampedSlide =
      slideCount > 0 && nextSlide >= slideCount ? slideCount - 1 : nextSlide;
    setCurrentSlide(clampedSlide);
    setShowModuleComplete(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId]);

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
  };
}
