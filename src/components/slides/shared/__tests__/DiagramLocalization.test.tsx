import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../../test/test-utils';
import AgentWorkflowBlock from '../AgentWorkflowBlock';
import DiPrezentacijosWorkflowBlock from '../DiPrezentacijosWorkflowBlock';
import M7AnalysisTypesBlock from '../M7AnalysisTypesBlock';
import M7BiSchemaBlock from '../M7BiSchemaBlock';
import M7DaPipelineBlock from '../M7DaPipelineBlock';
import M7DataPrepWorkflowBlock from '../M7DataPrepWorkflowBlock';
import M7DataStoryCycleBlock from '../M7DataStoryCycleBlock';
import M7ThreeAgentsBlock from '../M7ThreeAgentsBlock';
import M9DataWorkflowBlock from '../M9DataWorkflowBlock';
import RlProcessBlock from '../RlProcessBlock';
import StrukturuotasProcesasBlock from '../StrukturuotasProcesasBlock';
import TurinioWorkflowBlock from '../TurinioWorkflowBlock';

const storageKey = 'prompt-anatomy-locale';
const themeStorageKey = 'theme';

function setLocale(locale: 'lt' | 'en') {
  localStorage.setItem(storageKey, locale);
}

function setDarkTheme() {
  localStorage.setItem(themeStorageKey, 'dark');
}

function expectDarkDiagramBackground(container: HTMLElement) {
  const firstStop = container.querySelector('stop');
  expect(firstStop).toHaveAttribute('stop-color', '#1e293b');
}

describe('Diagram localization (AgentWorkflow, StrukturuotasProcesas, TurinioWorkflow)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });
  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
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

  describe('Legacy SVG keyboard migration batch 1', () => {
    it.each([
      ['DI presentation workflow', () => <DiPrezentacijosWorkflowBlock />, 5],
      ['Content workflow', () => <TurinioWorkflowBlock />, 7],
      ['Agent workflow', () => <AgentWorkflowBlock />, 5],
    ])(
      'keeps keyboard interaction in %s HTML nav only',
      (_name, renderComponent, expectedButtons) => {
        setLocale('lt');

        const { container } = renderWithProviders(renderComponent());

        expect(container.querySelectorAll('nav button')).toHaveLength(
          expectedButtons
        );
        expect(
          container.querySelectorAll('svg [role="button"], svg [tabindex="0"]')
        ).toHaveLength(0);
      }
    );
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

  describe('M7 static SVG replacements', () => {
    it('renders M7 data pipeline in English', () => {
      setLocale('en');
      const { container } = renderWithProviders(<M7DaPipelineBlock />);
      expect(container.textContent).toContain('Data analysis pipeline');
      expect(container.textContent).toContain('Collection');
      expect(container.textContent).not.toContain('Duomenų analizės pipeline');
    });

    it('renders M7 data pipeline in Lithuanian with step navigation', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<M7DaPipelineBlock />);
      expect(container.textContent).toContain('Duomenų analizės pipeline');
      expect(container.textContent).toContain('Rinkimas');
      const stepButtons = container.querySelectorAll('nav button');
      expect(stepButtons.length).toBe(6);
    });

    it('renders M7 BI schema in English', () => {
      setLocale('en');
      const { container } = renderWithProviders(<M7BiSchemaBlock />);
      expect(container.textContent).toContain('BI flow');
      expect(container.textContent).toContain('Collect');
      expect(container.textContent).not.toContain('BI schema');
    });

    it('renders M7 BI schema in Lithuanian with step navigation', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<M7BiSchemaBlock />);
      expect(container.textContent).toContain('BI schema');
      expect(container.textContent).toContain('Surink');
      const stepButtons = container.querySelectorAll('nav button');
      expect(stepButtons.length).toBe(4);
    });
  });

  describe('M7-M9 geometry system blocks', () => {
    it('renders M7 data prep in English with 5 step buttons', () => {
      setLocale('en');
      const { container } = renderWithProviders(<M7DataPrepWorkflowBlock />);
      expect(container.textContent).toContain('Five-step data prep');
      expect(container.textContent).toContain('Sources');
      expect(container.textContent).not.toContain('Penki žingsniai');
      expect(container.querySelectorAll('nav button').length).toBe(5);
    });

    it('renders M7 analysis roles in Lithuanian with semantic step nav', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<M7AnalysisTypesBlock />);
      expect(container.textContent).toContain('Keturi analizės tipai');
      expect(container.textContent).toContain('Aprašomoji');
      expect(container.textContent).toContain('Nurodomoji');
      expect(container.querySelectorAll('nav button').length).toBe(4);
    });

    it('renders M7 three agents in English with role navigation', () => {
      setLocale('en');
      const { container } = renderWithProviders(<M7ThreeAgentsBlock />);
      expect(container.textContent).toContain('Three agent roles');
      expect(container.textContent).toContain('Data Research');
      expect(container.textContent).not.toContain('Trys agentų rolės');
      expect(container.querySelectorAll('nav button').length).toBe(3);
    });

    it('renders M9 workflow in Lithuanian with 8 step buttons', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<M9DataWorkflowBlock />);
      expect(container.textContent).toContain('8 žingsnių duomenų ciklas');
      expect(container.textContent).toContain('Surinkimas');
      expect(container.querySelectorAll('nav button').length).toBe(8);
    });

    it.each([
      ['M7 data prep', () => <M7DataPrepWorkflowBlock />],
      ['M7 analysis roles', () => <M7AnalysisTypesBlock />],
      ['M7 BI schema', () => <M7BiSchemaBlock />],
      ['M7 data pipeline', () => <M7DaPipelineBlock />],
      ['M7 data story cycle', () => <M7DataStoryCycleBlock />],
      ['M7 three agents', () => <M7ThreeAgentsBlock />],
      ['M9 workflow', () => <M9DataWorkflowBlock />],
    ])('renders %s with dark SVG background', (_name, renderComponent) => {
      setLocale('lt');
      setDarkTheme();

      const { container } = renderWithProviders(renderComponent());

      expectDarkDiagramBackground(container);
    });

    it.each([
      ['M7 data prep', () => <M7DataPrepWorkflowBlock />],
      ['M7 analysis roles', () => <M7AnalysisTypesBlock />],
      ['M7 BI schema', () => <M7BiSchemaBlock />],
      ['M7 data pipeline', () => <M7DaPipelineBlock />],
      ['M7 data story cycle', () => <M7DataStoryCycleBlock />],
      ['M7 three agents', () => <M7ThreeAgentsBlock />],
      ['M9 workflow', () => <M9DataWorkflowBlock />],
    ])(
      'keeps keyboard interaction in %s step nav only',
      (_name, renderComponent) => {
        setLocale('lt');

        const { container } = renderWithProviders(renderComponent());

        expect(container.querySelectorAll('nav button').length).toBeGreaterThan(
          0
        );
        expect(
          container.querySelectorAll('svg [role="button"], svg [tabindex="0"]')
        ).toHaveLength(0);
      }
    );
  });

  describe('RlProcessBlock diagram kit migration', () => {
    it('keeps keyboard interaction in HTML step nav only', () => {
      setLocale('lt');

      const { container } = renderWithProviders(<RlProcessBlock />);

      expect(container.textContent).toContain('Tu esi čia:');
      expect(container.querySelectorAll('nav button')).toHaveLength(4);
      expect(
        container.querySelectorAll('svg [role="button"], svg [tabindex="0"]')
      ).toHaveLength(0);
    });

    it('uses the dark SVG background palette', () => {
      setLocale('lt');
      setDarkTheme();

      const { container } = renderWithProviders(<RlProcessBlock />);

      expectDarkDiagramBackground(container);
    });
  });
});
