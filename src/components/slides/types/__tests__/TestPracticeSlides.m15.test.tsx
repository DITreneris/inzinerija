import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import modulesData from '../../../../data/modules.json';
import { renderWithProviders } from '../../../../test/test-utils';
import type { Module, Slide } from '../../../../types/modules';
import PracticalTask from '../../shared/PracticalTask';
import type { Progress } from '../../../../utils/progress';
import { synthesizeCompactPracticalTask } from '../../../../utils/compactPractice';
import {
  PracticeIntroSlide,
  PracticeScenarioSlide,
  type PracticeScenarioSlideInfo,
} from '../TestPracticeSlides';

const modules = modulesData.modules as Module[];

function getM15Slides(): Slide[] {
  return modules.find((module) => module.id === 15)?.slides ?? [];
}

function getM15ScenarioSlides(): PracticeScenarioSlideInfo[] {
  return getM15Slides()
    .map((slide, slideIndex) => ({ slide, slideIndex }))
    .filter(({ slide }) => slide.type === 'practice-scenario')
    .map(({ slide, slideIndex }) => ({
      slideIndex,
      slideId: slide.id,
      title: slide.title,
    }));
}

describe('TestPracticeSlides M15 intro isolation', () => {
  it('keeps Greitas/Pilnas and hides the M3 scenario grid', () => {
    const intro = getM15Slides().find((slide) => slide.id === 150);
    const onPathModeChange = vi.fn();

    renderWithProviders(
      <PracticeIntroSlide
        slide={intro}
        moduleId={15}
        moduleAccent="rose"
        pathMode="full"
        onPathModeChange={onPathModeChange}
        scenarioSlides={getM15ScenarioSlides()}
        progress={{ completedTasks: {} }}
      />
    );

    expect(
      screen.getByRole('radio', { name: /Greitas startas/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: /Pilnas kelias/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByText('🔥 6 Verslo Scenarijai')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Generuok ataskaitą')).not.toBeInTheDocument();
    expect(screen.queryByText('Praktinis Pritaikymas')).not.toBeInTheDocument();
    expect(screen.queryByText(/0 iš 5 scenarijų/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('radio', { name: /Greitas startas/i }));
    expect(onPathModeChange).toHaveBeenCalledWith('short');
  });
});

const emptyProgress: Progress = {
  completedModules: [],
  completedTasks: {},
  quizCompleted: false,
  quizScore: null,
};

describe('TestPracticeSlides M15 compact practice body', () => {
  it('renders the 150.5 prompt, copy control, and mark-complete', () => {
    const quickStart = getM15Slides().find((slide) => slide.id === 150.5);
    expect(quickStart).toBeDefined();
    const onTaskComplete = vi.fn();
    const content = quickStart!.content as { template?: string };
    expect(quickStart!.practicalTask).toBeUndefined();
    expect(content.template).toBeTruthy();
    const synthesized = synthesizeCompactPracticalTask(quickStart!, 'lt');
    expect(synthesized).not.toBeNull();

    renderWithProviders(
      <PracticeScenarioSlide
        slide={quickStart!}
        moduleId={15}
        onRenderTask={() => (
          <PracticalTask
            task={synthesized!}
            slideId={150.5}
            moduleId={15}
            onTaskComplete={onTaskComplete}
            progress={emptyProgress}
          />
        )}
      />
    );

    expect(screen.getByText(/Parašyk trumpą brief/i)).toBeInTheDocument();
    expect(screen.getByText(/Sukurk hero vaizdą/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /Kopijuoti Promptas – greitam hero vaizdui/i,
      })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: /Pažymėti užduotį atlikta be teksto/i,
      })
    );
    fireEvent.click(screen.getByText('Vis tiek pažymėti'));
    expect(onTaskComplete).toHaveBeenCalledWith(150.5);
  });

  it.each([
    [152, /raktinį kadrą/i, /Kopijuoti Promptas – nukopijuok į video įrankį/i],
    [
      153,
      /3 inkaro eilutes/i,
      /Kopijuoti Promptas – nukopijuok į balso įrankį/i,
    ],
    [154, /DI duoda žalią medžiagą/i, /Kopijuoti Montažo patikros sąrašas/i],
  ] as const)(
    'renders compact body for %s (prompt + copy control)',
    (slideId, bodyRe, copyRe) => {
      const slide = getM15Slides().find((item) => item.id === slideId);
      expect(slide).toBeDefined();
      const content = slide!.content as { template?: string };
      expect(slide!.optional).toBe(true);
      expect(slide!.badgeVariant).not.toBe('optional');
      expect(content.template).toBeTruthy();
      const synthesized = synthesizeCompactPracticalTask(slide!, 'lt');
      expect(synthesized).not.toBeNull();

      renderWithProviders(
        <PracticeScenarioSlide
          slide={slide!}
          moduleId={15}
          onRenderTask={() => (
            <PracticalTask
              task={synthesized!}
              slideId={slideId}
              moduleId={15}
              onTaskComplete={() => {}}
              progress={emptyProgress}
            />
          )}
        />
      );

      expect(screen.getAllByText(bodyRe).length).toBeGreaterThan(0);
      expect(screen.getByRole('button', { name: copyRe })).toBeInTheDocument();
    }
  );
});
