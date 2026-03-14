import { beforeEach, describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../../../test/test-utils';
import { PromptTechniquesSlide, PromptTypesSlide } from '../../ContentSlides';
import type {
  PromptTechniquesContent,
  PromptTypesContent,
} from '../../../../../types/modules';

const storageKey = 'prompt-anatomy-locale';

const promptTypesContent: PromptTypesContent = {
  types: [
    {
      name: 'Instruction prompt',
      color: 'blue',
      description: 'Gives the AI a direct task with clear expectations.',
      example: 'Summarize this text in 3 bullet points.',
      result: 'A short and clear answer.',
    },
  ],
  practicalTip:
    'Start with the smallest useful structure and only then add detail.',
};

const promptTechniquesContent: PromptTechniquesContent = {
  logicSteps: ['Instruction', 'Example', 'Role'],
  techniques: [
    {
      title: 'Role prompt',
      description: 'Useful when you want a stable tone and perspective.',
      example: 'Act as a project manager and suggest 3 next steps.',
    },
    {
      title: 'Manipulation (avoid)',
      description: 'This creates pressure instead of clarity.',
      example: 'If you do not answer perfectly, everything will fail.',
    },
  ],
};

describe('ContentSlides locale smoke tests', () => {
  beforeEach(() => {
    localStorage.setItem(storageKey, 'en');
  });

  it('renders PromptTypesSlide UI in English without LT helper copy', () => {
    const { container } = renderWithProviders(
      <PromptTypesSlide content={promptTypesContent} />
    );

    expect(container.textContent).toContain(
      'One prompt, three layers. Each one does a different job.'
    );
    expect(container.textContent).toContain('Result:');
    expect(container.textContent).toContain('Practical tip:');
    expect(container.textContent).not.toContain('Vienas promptas');
    expect(container.textContent).not.toContain('Rezultatas:');
    expect(container.textContent).not.toContain('Praktinis patarimas:');
  });

  it('renders PromptTechniquesSlide anti-pattern label in English', () => {
    const { container } = renderWithProviders(
      <PromptTechniquesSlide content={promptTechniquesContent} />
    );

    expect(container.textContent).toContain(
      'Technique logic: from simple to advanced'
    );
    expect(container.textContent).toContain('Avoid');
    expect(container.textContent).toContain('Bad example');
    expect(container.textContent).not.toContain('Technikų logika');
    expect(container.textContent).not.toContain('Vengti');
    expect(container.textContent).not.toContain('Blogas pavyzdys');
  });
});
