import { fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
import LlmArchDiagramBlock from '../LlmArchDiagramBlock';
import LlmAutoregressiveBlock from '../LlmAutoregressiveBlock';
import M10AgentTaxonomyBlock from '../M10AgentTaxonomyBlock';
import M10IncidentPlaybookBlock from '../M10IncidentPlaybookBlock';
import M10LearningLoopBlock from '../M10LearningLoopBlock';
import M10ThreeAStrategyBlock from '../M10ThreeAStrategyBlock';
import M10ToolDecisionTreeBlock from '../M10ToolDecisionTreeBlock';
import M10TriggerFlowBlock from '../M10TriggerFlowBlock';
import M10WorkflowSpecBlock from '../M10WorkflowSpecBlock';
import M12MultiAgentSchemaBlock from '../M12MultiAgentSchemaBlock';
import M12ThreeLabsBlock from '../M12ThreeLabsBlock';
import M15PracticeLoopBlock from '../M15PracticeLoopBlock';
import RlProcessBlock from '../RlProcessBlock';
import StrukturuotasProcesasBlock from '../StrukturuotasProcesasBlock';
import TestKnowledgeScopeDiagram from '../TestKnowledgeScopeDiagram';
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

function expectDarkPaletteTitle(container: HTMLElement) {
  const title = container.querySelector('svg text');
  expect(title).toHaveAttribute('fill', '#e2e8f0');
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

  describe('M15PracticeLoopBlock (M15 slide 150.25)', () => {
    it('renders English quick and full path labels when locale is en', () => {
      setLocale('en');
      const { container } = renderWithProviders(<M15PracticeLoopBlock />);
      expect(container.textContent).toContain('Quick path');
      expect(container.textContent).toContain('Full path (optional)');
      expect(container.textContent).toContain('QA');
      expect(container.textContent).not.toContain('Greitas kelias');
    });

    it('renders Lithuanian quick and full path labels when locale is lt', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<M15PracticeLoopBlock />);
      expect(container.textContent).toContain('Greitas kelias');
      expect(container.textContent).toContain('Pilnas kelias (optional)');
      expect(container.textContent).toContain('Koreguok, kol tinka');
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

  describe('M10+ interactive diagram shell contracts', () => {
    it.each([
      ['M10 learning loop', () => <M10LearningLoopBlock />, 4],
      ['M12 multi-agent schema', () => <M12MultiAgentSchemaBlock />, 6],
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

    it('uses the dark diagram palette in M12 multi-agent chrome', () => {
      setLocale('en');
      setDarkTheme();

      const { container } = renderWithProviders(<M12MultiAgentSchemaBlock />);

      expect(container.querySelector('svg rect')).toHaveAttribute(
        'fill',
        '#0f172a'
      );
    });
  });

  describe('M10-M12 static diagram localization and palette contracts', () => {
    it('renders M10 agent taxonomy in both locales', () => {
      setLocale('en');
      const { container: en } = renderWithProviders(<M10AgentTaxonomyBlock />);
      expect(en.textContent).toContain('Agent taxonomy: depth + roles');
      expect(en.textContent).toContain('Multi-agent roles');
      expect(en.textContent).not.toContain('Agentų taksonomija');

      setLocale('lt');
      const { container: lt } = renderWithProviders(<M10AgentTaxonomyBlock />);
      expect(lt.textContent).toContain('Agentų taksonomija: gylis + rolės');
      expect(lt.textContent).toContain('Kelių agentų rolės');
    });

    it('renders M10 trigger flow in both locales', () => {
      setLocale('en');
      const { container: en } = renderWithProviders(<M10TriggerFlowBlock />);
      expect(en.textContent).toContain('Workflow chain');
      expect(en.textContent).toContain('starts the flow');
      expect(en.textContent).not.toContain('paleidžia srautą');

      setLocale('lt');
      const { container: lt } = renderWithProviders(<M10TriggerFlowBlock />);
      expect(lt.textContent).toContain('Workflow grandinė');
      expect(lt.textContent).toContain('paleidžia srautą');
    });

    it('renders M10 3A strategy in both locales', () => {
      setLocale('en');
      const { container: en } = renderWithProviders(<M10ThreeAStrategyBlock />);
      expect(en.textContent).toContain('3A strategy (80 / 15 / 5)');
      expect(en.textContent).toContain('Rule-based flows');
      expect(en.textContent).not.toContain('Taisyklėmis paremti srautai');

      setLocale('lt');
      const { container: lt } = renderWithProviders(<M10ThreeAStrategyBlock />);
      expect(lt.textContent).toContain('3A strategija (80 / 15 / 5)');
      expect(lt.textContent).toContain('Taisyklėmis paremti srautai');
    });

    it('renders M10 workflow spec and incident playbook in both locales', () => {
      setLocale('en');
      const { container: specEn } = renderWithProviders(
        <M10WorkflowSpecBlock />
      );
      expect(specEn.textContent).toContain('One-page workflow spec (8 blocks)');
      expect(specEn.textContent).toContain('Audit');

      const { container: incidentEn } = renderWithProviders(
        <M10IncidentPlaybookBlock />
      );
      expect(incidentEn.textContent).toContain('Incident playbook (5 steps)');
      expect(incidentEn.textContent).toContain('Notify');

      setLocale('lt');
      const { container: specLt } = renderWithProviders(
        <M10WorkflowSpecBlock />
      );
      expect(specLt.textContent).toContain(
        'Vieno puslapio specifikacija (8 blokai)'
      );
      expect(specLt.textContent).toContain('Auditas');

      const { container: incidentLt } = renderWithProviders(
        <M10IncidentPlaybookBlock />
      );
      expect(incidentLt.textContent).toContain(
        'Incidentų planas (5 žingsniai)'
      );
      expect(incidentLt.textContent).toContain('Pranešti');
    });

    it('renders M12 three labs in both locales', () => {
      setLocale('en');
      const { container: en } = renderWithProviders(<M12ThreeLabsBlock />);
      expect(en.textContent).toContain('Three mandatory labs (3A)');
      expect(en.textContent).toContain('Human approves');
      expect(en.textContent).not.toContain('Trys privalomos praktikos');

      setLocale('lt');
      const { container: lt } = renderWithProviders(<M12ThreeLabsBlock />);
      expect(lt.textContent).toContain('Trys privalomos praktikos (3A)');
      expect(lt.textContent).toContain('Žmogus patvirtina');
    });

    it.each([
      ['M10 agent taxonomy', () => <M10AgentTaxonomyBlock />],
      ['M10 trigger flow', () => <M10TriggerFlowBlock />],
      ['M10 3A strategy', () => <M10ThreeAStrategyBlock />],
      ['M10 workflow spec', () => <M10WorkflowSpecBlock />],
      ['M10 incident playbook', () => <M10IncidentPlaybookBlock />],
      ['M12 three labs', () => <M12ThreeLabsBlock />],
    ])('uses the dark text palette in %s title', (_name, renderComponent) => {
      setLocale('lt');
      setDarkTheme();

      const { container } = renderWithProviders(renderComponent());

      expectDarkPaletteTitle(container);
    });
  });

  describe('M10 tool decision tree spatial exception', () => {
    it('renders localized decision tree copy and selected branch output', () => {
      setLocale('en');
      const { container: en } = renderWithProviders(
        <M10ToolDecisionTreeBlock />
      );
      expect(en.textContent).toContain('Tool choice (workflow)');
      expect(en.textContent).toContain('Tap a branch');
      expect(en.textContent).toContain('Power Automate');

      setLocale('lt');
      const { container: lt } = renderWithProviders(
        <M10ToolDecisionTreeBlock />
      );
      expect(lt.textContent).toContain('Įrankio pasirinkimas (workflow)');
      expect(lt.textContent).toContain('Paspausk šaką');
    });

    it('keeps its documented SVG keyboard path for spatial tree branches', () => {
      setLocale('lt');

      const { container } = renderWithProviders(<M10ToolDecisionTreeBlock />);

      expect(container.querySelectorAll('nav button')).toHaveLength(0);
      expect(container.querySelectorAll('svg [role="button"]')).toHaveLength(5);
      expect(container.querySelectorAll('svg [tabindex="0"]')).toHaveLength(5);
    });

    it('uses the dark text palette in the decision tree title', () => {
      setLocale('lt');
      setDarkTheme();

      const { container } = renderWithProviders(<M10ToolDecisionTreeBlock />);

      expectDarkPaletteTitle(container);
    });
  });

  describe('M8 test scope deep links', () => {
    it('turns M8 scope bubbles into theory review buttons when navigation is available', () => {
      const onGoToModule = vi.fn();
      setLocale('lt');

      const { getByRole } = renderWithProviders(
        <TestKnowledgeScopeDiagram
          moduleId={8}
          locale="lt"
          onGoToModule={onGoToModule}
          sourceModuleId={8}
        />
      );

      fireEvent.click(
        getByRole('button', { name: 'Peržiūrėti teoriją: Pipeline' })
      );

      expect(onGoToModule).toHaveBeenCalledWith(7, expect.any(Number), 8);
    });

    it('turns M11 scope bubbles into M10 theory review buttons when navigation is available', () => {
      const onGoToModule = vi.fn();
      setLocale('lt');

      const { getByRole } = renderWithProviders(
        <TestKnowledgeScopeDiagram
          moduleId={11}
          locale="lt"
          onGoToModule={onGoToModule}
          sourceModuleId={11}
        />
      );

      fireEvent.click(
        getByRole('button', { name: 'Peržiūrėti teoriją: Agentų ciklas' })
      );

      expect(onGoToModule).toHaveBeenCalledWith(10, expect.any(Number), 11);
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

  describe('LlmArchDiagramBlock (M4 slide 56)', () => {
    it('renders Lithuanian mode tabs when locale is lt', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<LlmArchDiagramBlock />);
      expect(container.textContent).toContain('Bazinis');
      expect(container.textContent).toContain('Įrankiai');
      expect(container.textContent).not.toContain('Basic');
    });

    it('renders English mode tabs when locale is en', () => {
      setLocale('en');
      const { container } = renderWithProviders(<LlmArchDiagramBlock />);
      expect(container.textContent).toContain('Basic');
      expect(container.textContent).toContain('Tools');
      expect(container.textContent).not.toContain('Bazinis');
    });

    it('is interactive: three mode tabs with aria-pressed', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<LlmArchDiagramBlock />);
      expect(container.querySelectorAll('button[aria-pressed]').length).toBe(3);
    });
  });

  describe('LlmAutoregressiveBlock (M4 slide 44)', () => {
    it('renders English copy when locale is en', () => {
      setLocale('en');
      const { container } = renderWithProviders(<LlmAutoregressiveBlock />);
      expect(container.textContent).toContain('You are here:');
      expect(container.textContent).toContain('Rockets became');
      expect(container.textContent).not.toContain('Rytas tapo');
      expect(container.textContent).not.toContain('Tu esi čia:');
    });

    it('renders Lithuanian copy when locale is lt', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<LlmAutoregressiveBlock />);
      expect(container.textContent).toContain('Tu esi čia:');
      expect(container.textContent).toContain('Rytas tapo');
      expect(container.textContent).not.toContain('Rockets became');
      expect(container.textContent).not.toContain('You are here:');
    });

    it('is interactive: shows step buttons 1–8 (en)', () => {
      setLocale('en');
      const { container } = renderWithProviders(<LlmAutoregressiveBlock />);
      expect(container.textContent).toContain('You are here:');
      const stepButtons = container.querySelectorAll('nav button');
      expect(stepButtons.length).toBe(10);
    });

    it('is interactive: shows step buttons 1–8 (lt)', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<LlmAutoregressiveBlock />);
      expect(container.textContent).toContain('Tu esi čia:');
      const stepButtons = container.querySelectorAll('nav button');
      expect(stepButtons.length).toBe(10);
    });
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
