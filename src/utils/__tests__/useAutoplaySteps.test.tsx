import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useEffect, useState } from 'react';
import { render, act, cleanup } from '@testing-library/react';
import {
  useAutoplaySteps,
  DEFAULT_AUTOPLAY_INTERVAL_MS,
} from '../useAutoplaySteps';

type HookApi = ReturnType<typeof useAutoplaySteps>;

function HookHarness({
  stepCount,
  reducedMotion,
  autoStart,
  intervalMs,
  onReady,
}: {
  stepCount: number;
  reducedMotion: boolean;
  autoStart?: boolean;
  intervalMs?: number;
  onReady: (api: HookApi) => void;
}) {
  const api = useAutoplaySteps({
    stepCount,
    reducedMotion,
    autoStart,
    intervalMs,
  });
  useEffect(() => {
    onReady(api);
  }, [api, onReady]);
  return (
    <div
      data-testid="state"
      data-index={api.activeIndex}
      data-playing={api.isPlaying ? '1' : '0'}
    />
  );
}

describe('useAutoplaySteps', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('auto-advances while playing', () => {
    let api!: HookApi;
    render(
      <HookHarness
        stepCount={5}
        reducedMotion={false}
        onReady={(a) => {
          api = a;
        }}
      />
    );
    expect(api.activeIndex).toBe(0);
    expect(api.isPlaying).toBe(true);

    act(() => {
      vi.advanceTimersByTime(DEFAULT_AUTOPLAY_INTERVAL_MS);
    });
    expect(api.activeIndex).toBe(1);

    act(() => {
      vi.advanceTimersByTime(DEFAULT_AUTOPLAY_INTERVAL_MS * 4);
    });
    expect(api.activeIndex).toBe(0);
  });

  it('pinStep sets index and pauses', () => {
    let api!: HookApi;
    render(
      <HookHarness
        stepCount={5}
        reducedMotion={false}
        onReady={(a) => {
          api = a;
        }}
      />
    );

    act(() => {
      api.pinStep(3);
    });
    expect(api.activeIndex).toBe(3);
    expect(api.isPlaying).toBe(false);

    act(() => {
      vi.advanceTimersByTime(DEFAULT_AUTOPLAY_INTERVAL_MS * 3);
    });
    expect(api.activeIndex).toBe(3);
  });

  it('play resumes cycling from pinned step', () => {
    let api!: HookApi;
    render(
      <HookHarness
        stepCount={5}
        reducedMotion={false}
        onReady={(a) => {
          api = a;
        }}
      />
    );

    act(() => {
      api.pinStep(2);
      api.play();
    });
    expect(api.isPlaying).toBe(true);
    expect(api.activeIndex).toBe(2);

    act(() => {
      vi.advanceTimersByTime(DEFAULT_AUTOPLAY_INTERVAL_MS);
    });
    expect(api.activeIndex).toBe(3);
  });

  it('reducedMotion never starts an interval', () => {
    let api!: HookApi;
    render(
      <HookHarness
        stepCount={5}
        reducedMotion
        onReady={(a) => {
          api = a;
        }}
      />
    );
    expect(api.isPlaying).toBe(false);
    expect(api.activeIndex).toBe(0);

    act(() => {
      api.play();
      vi.advanceTimersByTime(DEFAULT_AUTOPLAY_INTERVAL_MS * 5);
    });
    expect(api.isPlaying).toBe(false);
    expect(api.activeIndex).toBe(0);
  });

  it('reacts when reducedMotion becomes true', () => {
    function ToggleMotion() {
      const [reduced, setReduced] = useState(false);
      const api = useAutoplaySteps({ stepCount: 3, reducedMotion: reduced });
      return (
        <button
          type="button"
          data-testid="toggle"
          data-playing={api.isPlaying ? '1' : '0'}
          onClick={() => setReduced(true)}
        >
          {api.activeIndex}
        </button>
      );
    }

    const { getByTestId } = render(<ToggleMotion />);
    expect(getByTestId('toggle').getAttribute('data-playing')).toBe('1');

    act(() => {
      getByTestId('toggle').click();
    });
    expect(getByTestId('toggle').getAttribute('data-playing')).toBe('0');
  });
});
