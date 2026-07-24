import { useCallback, useEffect, useState } from 'react';

export const DEFAULT_AUTOPLAY_INTERVAL_MS = 2800;

export interface UseAutoplayStepsOptions {
  stepCount: number;
  intervalMs?: number;
  reducedMotion: boolean;
  /** When true (default), autoplay starts if motion is allowed. */
  autoStart?: boolean;
}

export interface UseAutoplayStepsResult {
  activeIndex: number;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  /** Set active step and pause autoplay. */
  pinStep: (index: number) => void;
  setActiveIndex: (index: number) => void;
}

/**
 * Autoplay step index for process-map diagrams.
 * Interval runs only while playing and motion is allowed.
 */
export function useAutoplaySteps({
  stepCount,
  intervalMs = DEFAULT_AUTOPLAY_INTERVAL_MS,
  reducedMotion,
  autoStart = true,
}: UseAutoplayStepsOptions): UseAutoplayStepsResult {
  const [activeIndex, setActiveIndexState] = useState(0);
  const [isPlaying, setIsPlaying] = useState(
    () => autoStart && !reducedMotion && stepCount > 0
  );

  useEffect(() => {
    if (reducedMotion) {
      setIsPlaying(false);
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (!isPlaying || reducedMotion || stepCount <= 0) return;
    const id = window.setInterval(() => {
      setActiveIndexState((i) => (i + 1) % stepCount);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [isPlaying, reducedMotion, stepCount, intervalMs]);

  const setActiveIndex = useCallback(
    (index: number) => {
      if (stepCount <= 0) return;
      if (index < 0 || index >= stepCount) return;
      setActiveIndexState(index);
    },
    [stepCount]
  );

  const pinStep = useCallback(
    (index: number) => {
      if (stepCount <= 0) return;
      if (index < 0 || index >= stepCount) return;
      setActiveIndexState(index);
      setIsPlaying(false);
    },
    [stepCount]
  );

  const play = useCallback(() => {
    if (reducedMotion || stepCount <= 0) return;
    setIsPlaying(true);
  }, [reducedMotion, stepCount]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (reducedMotion || stepCount <= 0) {
      setIsPlaying(false);
      return;
    }
    setIsPlaying((prev) => !prev);
  }, [reducedMotion, stepCount]);

  return {
    activeIndex,
    isPlaying,
    play,
    pause,
    toggle,
    pinStep,
    setActiveIndex,
  };
}
