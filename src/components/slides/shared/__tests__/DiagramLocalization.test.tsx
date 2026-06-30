import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../../test/test-utils';
import AgentWorkflowBlock from '../AgentWorkflowBlock';
import M7DataStoryCycleBlock from '../M7DataStoryCycleBlock';
import StrukturuotasProcesasBlock from '../StrukturuotasProcesasBlock';
import TurinioWorkflowBlock from '../TurinioWorkflowBlock';

const storageKey = 'prompt-anatomy-locale';

function setLocale(locale: 'lt' | 'en') {
  localStorage.setItem(storageKey, locale);
}

describe('Diagram localization (AgentWorkflow, StrukturuotasProcesas, TurinioWorkflow)', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    localStorage.clear();
  });

  describe('AgentWorkflowBlock (M10.2)', () => {
    it('renders English copy when locale is en', () => {
      setLocale('en');
      const { container } = renderWithProviders(<AgentWorkflowBlock />);
      expect(container.textContent).toContain('Agent cycle');
      expect(container.textContent).toContain('feedback loop');
      expect(container.textContent).not.toContain('Agentų ciklas');
      expect(container.textContent).not.toContain('grįžtamasis ryšys');
    });

    it('renders Lithuanian copy when locale is lt', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<AgentWorkflowBlock />);
      expect(container.textContent).toContain('Agentų ciklas');
      expect(container.textContent).toContain('grįžtamasis ryšys');
    });

    it('is interactive: shows "you are here" badge and step buttons (en)', () => {
      setLocale('en');
      const { container } = renderWithProviders(<AgentWorkflowBlock />);
      expect(container.textContent).toContain('You are here:');
      const stepButtons = container.querySelectorAll('nav button');
      expect(stepButtons.length).toBe(5);
    });

    it('is interactive: shows "Tu esi čia" badge (lt)', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<AgentWorkflowBlock />);
      expect(container.textContent).toContain('Tu esi čia:');
    });
  });

  describe('StrukturuotasProcesasBlock (M4 slide 43)', () => {
    it('renders English diagram blocks when locale is en', () => {
      setLocale('en');
      const { container } = renderWithProviders(<StrukturuotasProcesasBlock />);
      expect(container.textContent).toContain('Input');
      expect(container.textContent).toContain('Processing');
      expect(container.textContent).toContain('Output');
      expect(container.textContent).not.toContain('Įvestis');
      expect(container.textContent).not.toContain('Apdorojimas');
    });

    it('renders Lithuanian diagram blocks when locale is lt', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<StrukturuotasProcesasBlock />);
      expect(container.textContent).toContain('Įvestis');
      expect(container.textContent).toContain('Apdorojimas');
      expect(container.textContent).toContain('Rezultatas');
    });
  });

  describe('TurinioWorkflowBlock (M13 slide 13.11)', () => {
    it('renders English diagram copy when locale is en', () => {
      setLocale('en');
      const { container } = renderWithProviders(<TurinioWorkflowBlock />);
      expect(container.textContent).toContain('From brief to publication');
      expect(container.textContent).toContain('Variants');
      expect(container.textContent).not.toContain('Nuo brief iki publikacijos');
      expect(container.textContent).not.toContain('Variantai');
    });

    it('renders Lithuanian diagram copy when locale is lt', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<TurinioWorkflowBlock />);
      expect(container.textContent).toContain('Nuo brief iki publikacijos');
      expect(container.textContent).toContain('Variantai');
    });
  });

  describe('M7DataStoryCycleBlock (M7 slide 100)', () => {
    it('renders English diagram copy when locale is en', () => {
      setLocale('en');
      const { container } = renderWithProviders(<M7DataStoryCycleBlock />);
      expect(container.textContent).toContain('Data story cycle');
      expect(container.textContent).toContain('Collection');
      expect(container.textContent).not.toContain('Duomenų istorijos ciklas');
      expect(container.textContent).not.toContain('Surinkimas');
    });

    it('renders Lithuanian diagram copy when locale is lt', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<M7DataStoryCycleBlock />);
      expect(container.textContent).toContain('Duomenų istorijos ciklas');
      expect(container.textContent).toContain('Surinkimas');
    });

    it('is interactive: shows step buttons and current step badge', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<M7DataStoryCycleBlock />);
      expect(container.textContent).toContain('Tu esi čia:');
      const stepButtons = container.querySelectorAll('nav button');
      expect(stepButtons.length).toBe(5);
    });
  });
});
