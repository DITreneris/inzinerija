import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../../../test/test-utils';
import PracticalTask from '../PracticalTask';
import type { PracticalTask as PracticalTaskType } from '../../../../types/modules';
import type { Progress } from '../../../../utils/progress';

const emptyProgress: Progress = {
  completedModules: [],
  completedTasks: {},
  quizCompleted: false,
  quizScore: null,
};

describe('PracticalTask empty-mark honesty', () => {
  it('shows inline banner instead of blocking when marking done with empty answer', () => {
    const onTaskComplete = vi.fn();
    const task: PracticalTaskType = {
      title: 'Test task',
      placeholder: 'Enter artefact…',
      allowMarkWithoutAnswer: true,
    };

    renderWithProviders(
      <PracticalTask
        task={task}
        slideId={121}
        moduleId={12}
        onTaskComplete={onTaskComplete}
        progress={emptyProgress}
      />
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: /Pažymėti užduotį atlikta be teksto/i,
      })
    );

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText('Įrašyti santrauką')).toBeInTheDocument();
    expect(screen.getByText('Vis tiek pažymėti')).toBeInTheDocument();
    expect(onTaskComplete).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText('Vis tiek pažymėti'));
    expect(onTaskComplete).toHaveBeenCalledWith(121);
  });
});
