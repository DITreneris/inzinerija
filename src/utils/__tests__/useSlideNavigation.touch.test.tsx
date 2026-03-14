import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { useSlideNavigation } from '../useSlideNavigation';
import type { Module, Slide } from '../../types/modules';
import type { Progress } from '../progress';

function slide(id: number): Slide {
  return { id, title: `S${id}`, subtitle: '', type: 'content-block' };
}

const moduleData: Module = {
  id: 1,
  title: 'Test module',
  subtitle: 'Subtitle',
  description: '',
  icon: 'Target',
  level: 'learn',
  duration: '5 min',
  slides: [slide(1), slide(2), slide(3)],
  businessExamples: [],
};

const progressData: Progress = {
  completedModules: [],
  completedTasks: {},
  quizCompleted: false,
  quizScore: null,
};

function SwipeHarness() {
  const { currentSlide, handleTouchStart, handleTouchEnd, handleTouchCancel } =
    useSlideNavigation({
      module: moduleData,
      moduleId: 1,
      progress: progressData,
      onComplete: () => undefined,
    });

  return (
    <div
      data-testid="surface"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      <p data-testid="current-slide">{currentSlide}</p>
      <div data-testid="plain-zone">Plain zone</div>
      <div data-testid="locked-zone" data-slide-swipe-lock>
        Locked zone
      </div>
      <button type="button">Inner action</button>
    </div>
  );
}

function swipeLeft(element: Element, deltaX = 120) {
  fireEvent.touchStart(element, {
    touches: [{ clientX: 240, clientY: 24 }],
  });
  fireEvent.touchEnd(element, {
    changedTouches: [{ clientX: 240 - deltaX, clientY: 24 }],
  });
}

describe('useSlideNavigation touch handling', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollTo', {
      configurable: true,
      writable: true,
      value: () => undefined,
    });
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 390,
    });
  });

  it('navigates on swipe in plain slide area', () => {
    render(<SwipeHarness />);

    swipeLeft(screen.getByTestId('plain-zone'));

    expect(screen.getByTestId('current-slide')).toHaveTextContent('1');
  });

  it('does not navigate when swipe starts in swipe-lock zone', () => {
    render(<SwipeHarness />);

    swipeLeft(screen.getByTestId('locked-zone'));

    expect(screen.getByTestId('current-slide')).toHaveTextContent('0');
  });

  it('does not navigate when swipe starts on an interactive control', () => {
    render(<SwipeHarness />);

    swipeLeft(screen.getByRole('button', { name: 'Inner action' }));

    expect(screen.getByTestId('current-slide')).toHaveTextContent('0');
  });
});
