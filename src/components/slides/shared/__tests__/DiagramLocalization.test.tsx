import { fireEvent, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../../../test/test-utils';
import AgentWorkflowBlock from '../AgentWorkflowBlock';
import { getAgentWorkflowLabels } from '../agentWorkflowContent';
import DiPrezentacijosWorkflowBlock from '../DiPrezentacijosWorkflowBlock';
import ProcessStepper from '../ProcessStepper';
import M7AnalysisTypesBlock from '../M7AnalysisTypesBlock';
import M7BiSchemaBlock from '../M7BiSchemaBlock';
import M7DaPipelineBlock from '../M7DaPipelineBlock';
import M7DataPrepWorkflowBlock from '../M7DataPrepWorkflowBlock';
import M7DataStoryCycleBlock from '../M7DataStoryCycleBlock';
import M7ThreeAgentsBlock from '../M7ThreeAgentsBlock';
import M9DataWorkflowBlock from '../M9DataWorkflowBlock';
import M9WorkflowStepCopyBlock from '../M9WorkflowStepCopyBlock';
import LlmArchDiagramBlock from '../LlmArchDiagramBlock';
import LlmAutoregressiveBlock from '../LlmAutoregressiveBlock';
import M10DepthRolesLabBlock from '../M10DepthRolesLabBlock';
import M10HumanControlSimulatorBlock from '../M10HumanControlSimulatorBlock';
import M10IncidentPlaybookBlock from '../M10IncidentPlaybookBlock';
import M10LearningLoopBlock from '../M10LearningLoopBlock';
import M10OrchestratorBlock from '../M10OrchestratorBlock';
import M10ThreeAStrategyBlock from '../M10ThreeAStrategyBlock';
import M10ToolDecisionTreeBlock from '../M10ToolDecisionTreeBlock';
import M10TriggerFlowBlock from '../M10TriggerFlowBlock';
import M10WorkflowSpecBlock from '../M10WorkflowSpecBlock';
import M12MultiAgentSchemaBlock from '../M12MultiAgentSchemaBlock';
import M12ThreeLabsBlock from '../M12ThreeLabsBlock';
import M13AecFunnelBlock from '../M13AecFunnelBlock';
import M13ConsistencyLockBlock from '../M13ConsistencyLockBlock';
import M13MediaPipelineBlock from '../M13MediaPipelineBlock';
import M13PostprodBlock from '../M13PostprodBlock';
import M13PromptStackBlock from '../M13PromptStackBlock';
import M13RuleOfThirdsBlock from '../M13RuleOfThirdsBlock';
import M15PracticeLoopBlock from '../M15PracticeLoopBlock';
import RlProcessBlock from '../RlProcessBlock';
import StrukturuotasProcesasBlock from '../StrukturuotasProcesasBlock';
import HallucinationPipelineBlock from '../HallucinationPipelineBlock';
import { getHallucinationPipelineSteps } from '../hallucinationPipelineContent';
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
    it('uses verb forward labels without node-echo nouns', () => {
      const lt = getAgentWorkflowLabels('lt').forwardLabels;
      const en = getAgentWorkflowLabels('en').forwardLabels;
      expect(lt).toEqual(['užduoda', 'sudaro planą', 'kviečia', 'grąžina']);
      expect(en).toEqual(['assigns', 'plans', 'calls', 'returns']);
      for (const labels of [lt, en]) {
        expect(labels.join(' ')).not.toMatch(
          /\b(užduotis|žingsniai|įrankiai|kontekstas|task|steps|tools|context)\b/i
        );
      }
    });

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

    it('is interactive: shows Step N of T status and step buttons (en)', () => {
      setLocale('en');
      const { container } = renderWithProviders(<AgentWorkflowBlock />);
      expect(container.textContent).toContain('Step 1 of 5');
      expect(container.textContent).not.toContain('You are here:');
      const stepButtons = container.querySelectorAll('nav button');
      expect(stepButtons.length).toBe(5);
    });

    it('is interactive: shows Žingsnis N iš T status (lt)', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<AgentWorkflowBlock />);
      expect(container.textContent).toContain('Žingsnis 1 iš 5');
      expect(container.textContent).not.toContain('Tu esi čia:');
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

    it('dims inactive step panels with DIAGRAM_TOKENS.opacity.inactive', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<StrukturuotasProcesasBlock />);
      const panels = container.querySelectorAll('[data-step-panel]');
      expect(panels.length).toBe(3);
      const active = Array.from(panels).find(
        (el) => el.getAttribute('data-active') === 'true'
      );
      const inactive = Array.from(panels).filter(
        (el) => el.getAttribute('data-active') === 'false'
      );
      expect(active).toBeTruthy();
      expect(inactive.length).toBe(2);
      expect((active as HTMLElement).style.opacity).toBe('');
      for (const el of inactive) {
        expect(
          Number((el as HTMLElement).style.opacity)
        ).toBeGreaterThanOrEqual(0.88);
      }
    });
  });

  describe('HallucinationPipelineBlock (M7 slide 67.7)', () => {
    it('keeps template prefix only on ground step (content SOT)', () => {
      const lt = getHallucinationPipelineSteps('lt');
      const en = getHallucinationPipelineSteps('en');
      expect(lt[0]?.body.startsWith('Šablone:')).toBe(true);
      expect(en[0]?.body.startsWith('In the template:')).toBe(true);
      for (const step of lt.slice(1)) {
        expect(step.body.startsWith('Šablone:')).toBe(false);
      }
      for (const step of en.slice(1)) {
        expect(step.body.startsWith('In the template:')).toBe(false);
      }
      expect(lt[1]?.body).toContain('Prieš galutinį atsakymą');
      expect(en[1]?.body).toContain('Before the final answer');
    });

    it('renders English labels, body hook and bridge when locale is en', () => {
      setLocale('en');
      const { container, getByRole } = renderWithProviders(
        <HallucinationPipelineBlock />
      );
      expect(container.textContent).toContain('Sources');
      expect(container.textContent).toContain('Verify');
      expect(container.textContent).toContain('Risk');
      expect(container.textContent).toContain('Risk scan');
      expect(container.textContent).toContain(
        'In the template: use only the information provided'
      );
      expect(container.textContent).toContain(
        'Next you will copy the anti-hallucination template'
      );
      expect(container.textContent).not.toContain('Šaltiniai');
      expect(container.textContent).not.toContain('Detect');
      expect(container.textContent).not.toContain('Click a stage to pause');
      const playBtn = getByRole('button', { name: /Play cycle|Pause cycle/ });
      expect(playBtn.textContent).toMatch(/Play|Pause/);
      expect(playBtn.getAttribute('title')).toBe('Click a stage to pause');
    });

    it('renders Lithuanian labels, body hook and bridge when locale is lt', () => {
      setLocale('lt');
      const { container, getByRole } = renderWithProviders(
        <HallucinationPipelineBlock />
      );
      expect(container.textContent).toContain('Šaltiniai');
      expect(container.textContent).toContain('Patikra');
      expect(container.textContent).toContain('Spragos ir įtarimai');
      expect(container.textContent).toContain(
        'Šablone: naudok tik pateiktą informaciją'
      );
      expect(container.textContent).toContain(
        'Kitame žingsnyje nukopijuosi anti-haliucinacinį šabloną'
      );
      expect(container.textContent).not.toContain(
        'Spustelėk etapą – pristabdyti'
      );
      const playBtn = getByRole('button', {
        name: /Paleisti ciklą|Pristabdyti ciklą/,
      });
      expect(playBtn.textContent).toMatch(/Paleisti|Pauzė/);
    });

    it('has five shell nav buttons and dims inactive panels', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<HallucinationPipelineBlock />);
      expect(container.querySelectorAll('nav button')).toHaveLength(5);
      const panels = container.querySelectorAll('[data-step-panel]');
      expect(panels.length).toBeGreaterThanOrEqual(5);
      const inactive = Array.from(panels).filter(
        (el) => el.getAttribute('data-active') === 'false'
      );
      expect(inactive.length).toBeGreaterThan(0);
      for (const el of inactive) {
        expect(
          Number((el as HTMLElement).style.opacity)
        ).toBeGreaterThanOrEqual(0.88);
      }
    });

    it('pin via shell nav pauses autoplay control', () => {
      setLocale('lt');
      vi.useFakeTimers();
      const { container, getByRole } = renderWithProviders(
        <HallucinationPipelineBlock />
      );
      const navButtons = container.querySelectorAll('nav button');
      fireEvent.click(navButtons[2]!);
      const pauseOrPlay = getByRole('button', {
        name: /Paleisti ciklą|Pristabdyti ciklą/,
      });
      expect(pauseOrPlay.getAttribute('aria-pressed')).toBe('false');
      expect(pauseOrPlay.textContent).toContain('Paleisti');
      vi.useRealTimers();
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

  describe('M13 AEC funnel interactive (13.1)', () => {
    it('localizes AEC funnel LT/EN with shell nav and dark palette', () => {
      setLocale('en');
      const { container: en } = renderWithProviders(<M13AecFunnelBlock />);
      expect(en.textContent).toContain('Campaign goals funnel');
      expect(en.textContent).toContain('Pull attention');
      expect(en.textContent).not.toContain('Kampanijos tikslų piltuvas');

      setLocale('lt');
      setDarkTheme();
      const { container: lt } = renderWithProviders(<M13AecFunnelBlock />);
      expect(lt.textContent).toContain('Kampanijos tikslų piltuvas');
      expect(lt.textContent).toContain('Tu esi čia:');
      expect(lt.querySelectorAll('nav button')).toHaveLength(3);
      expect(
        lt.querySelectorAll('svg [role="button"], svg [tabindex="0"]')
      ).toHaveLength(0);
      expectDarkDiagramBackground(lt);
    });
  });

  describe('M13 prompt stack interactive', () => {
    it('localizes prompt stack LT/EN with shell nav and dark palette', () => {
      setLocale('en');
      const { container: en } = renderWithProviders(<M13PromptStackBlock />);
      expect(en.textContent).toContain('Image prompt = layers');
      expect(en.textContent).not.toContain('Vaizdo promptas = sluoksniai');

      setLocale('lt');
      setDarkTheme();
      const { container: lt } = renderWithProviders(<M13PromptStackBlock />);
      expect(lt.textContent).toContain('Vaizdo promptas = sluoksniai');
      expect(lt.querySelectorAll('nav button')).toHaveLength(3);
      expectDarkDiagramBackground(lt);
    });
  });

  describe('M13 consistency lock and post-prod', () => {
    it('renders consistency lock with four nav buttons', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<M13ConsistencyLockBlock />);
      expect(container.textContent).toContain('Reference lock');
      expect(container.querySelectorAll('nav button')).toHaveLength(4);
      expect(
        container.querySelectorAll('svg [role="button"], svg [tabindex="0"]')
      ).toHaveLength(0);
    });

    it('renders post-prod with four nav buttons and dark palette', () => {
      setLocale('lt');
      setDarkTheme();
      const { container } = renderWithProviders(<M13PostprodBlock />);
      expect(container.textContent).toContain('Post-production');
      expect(container.querySelectorAll('nav button')).toHaveLength(4);
      expectDarkDiagramBackground(container);
    });
  });

  describe('M13 static illustration diagrams', () => {
    it('localizes rule of thirds LT/EN and uses dark palette', () => {
      setLocale('en');
      const { container: en } = renderWithProviders(<M13RuleOfThirdsBlock />);
      expect(en.textContent).toContain('Rule of thirds (guide)');
      expect(en.textContent).not.toContain('Trečdalių taisyklė');

      setLocale('lt');
      setDarkTheme();
      const { container: lt } = renderWithProviders(<M13RuleOfThirdsBlock />);
      expect(lt.textContent).toContain('Trečdalių taisyklė (gairė)');
      expectDarkDiagramBackground(lt);
    });
  });

  describe('M13MediaPipelineBlock (M13 slide 13.12)', () => {
    it('renders English pipeline copy when locale is en', () => {
      setLocale('en');
      const { container } = renderWithProviders(<M13MediaPipelineBlock />);
      expect(container.textContent).toContain('Generative media pipeline');
      expect(container.textContent).toContain('Reference lock');
      expect(container.textContent).not.toContain(
        'Generatyvinės medijos pipeline'
      );
    });

    it('renders Lithuanian pipeline copy and shell nav when locale is lt', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<M13MediaPipelineBlock />);
      expect(container.textContent).toContain('Generatyvinės medijos pipeline');
      expect(container.textContent).toContain('Tu esi čia:');
      expect(container.querySelectorAll('nav button')).toHaveLength(6);
      expect(
        container.querySelectorAll('svg [role="button"], svg [tabindex="0"]')
      ).toHaveLength(0);
    });

    it('uses the dark diagram palette', () => {
      setLocale('lt');
      setDarkTheme();
      const { container } = renderWithProviders(<M13MediaPipelineBlock />);
      expectDarkDiagramBackground(container);
    });
  });

  describe('M15PracticeLoopBlock (M15 slide 150.25)', () => {
    it('renders English quick and full path labels when locale is en', () => {
      setLocale('en');
      const { container } = renderWithProviders(<M15PracticeLoopBlock />);
      expect(container.textContent).toContain('Quick path');
      expect(container.textContent).toContain('Full path (optional)');
      expect(container.textContent).toContain('Brief');
      expect(container.textContent).not.toContain('Greitas kelias');
    });

    it('renders Lithuanian quick path with shell nav when locale is lt', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<M15PracticeLoopBlock />);
      expect(container.textContent).toContain('Greitas kelias');
      expect(container.textContent).toContain('Pilnas kelias (optional)');
      expect(container.textContent).toContain('Koreguok, kol tinka');
      expect(container.textContent).toContain('Tu esi čia:');
      expect(container.querySelectorAll('nav button')).toHaveLength(5);
      expect(
        container.querySelectorAll('svg [role="button"], svg [tabindex="0"]')
      ).toHaveLength(0);
    });

    it('switches to full path explanations and keeps five nav buttons', () => {
      setLocale('lt');
      const { container, getByRole } = renderWithProviders(
        <M15PracticeLoopBlock />
      );
      fireEvent.click(
        getByRole('button', { name: 'Pilnas kelias (optional)' })
      );
      expect(container.textContent).toContain('1. Vaizdas');
      expect(container.textContent).toContain('skaidrė 151');
      expect(container.querySelectorAll('nav button')).toHaveLength(5);
    });

    it('shows quick-path CTA to slide 150.5', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<M15PracticeLoopBlock />);
      expect(container.textContent).toContain('skaidrė 150.5');
    });

    it('uses the dark diagram palette', () => {
      setLocale('lt');
      setDarkTheme();
      const { container } = renderWithProviders(<M15PracticeLoopBlock />);
      expectDarkDiagramBackground(container);
    });
  });

  describe('M5 DiPrezentacijosWorkflowBlock', () => {
    it('uses the dark diagram palette', () => {
      setLocale('lt');
      setDarkTheme();
      const { container } = renderWithProviders(
        <DiPrezentacijosWorkflowBlock />
      );
      expectDarkDiagramBackground(container);
      expectDarkPaletteTitle(container);
    });
  });

  describe('ProcessStepper (Custom GPT)', () => {
    it('uses the dark diagram palette', () => {
      setLocale('en');
      setDarkTheme();
      const { container } = renderWithProviders(<ProcessStepper />);
      expectDarkDiagramBackground(container);
      expectDarkPaletteTitle(container);
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
      ['M10 orchestrator', () => <M10OrchestratorBlock />, 6],
      ['M10 trigger flow', () => <M10TriggerFlowBlock />, 4],
      ['M10 3A strategy', () => <M10ThreeAStrategyBlock />, 3],
      ['M10 workflow spec', () => <M10WorkflowSpecBlock />, 8],
      ['M10 incident playbook', () => <M10IncidentPlaybookBlock />, 5],
      ['M12 multi-agent schema', () => <M12MultiAgentSchemaBlock />, 6],
      ['M13 media pipeline', () => <M13MediaPipelineBlock />, 6],
      ['M13 content workflow', () => <TurinioWorkflowBlock />, 7],
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
    it('renders M10 depth/roles hybrid lab in both locales (no 8-step shell)', () => {
      setLocale('en');
      const { container: en } = renderWithProviders(<M10DepthRolesLabBlock />);
      expect(en.textContent).toContain('Depth levels');
      expect(en.textContent).not.toMatch(/taxonomy/i);
      expect(en.textContent).toContain('Choose depth for your process');
      expect(en.textContent).toContain('Chat (L0)');
      expect(en.textContent).toContain('Choose a depth first');
      expect(en.querySelectorAll('nav button')).toHaveLength(0);
      expect(en.textContent).not.toContain('Team – select L2');
      fireEvent.click(within(en).getByRole('radio', { name: /Team \(L2\)/i }));
      expect(en.textContent).toContain('Team roles');
      expect(en.textContent).toContain('Add router');
      expect(en.textContent).toContain('Coordinator');
      expect(en.textContent).toContain('Depth level: Team (L2)');

      setLocale('lt');
      const { container: lt } = renderWithProviders(<M10DepthRolesLabBlock />);
      expect(lt.textContent).toContain('Gylio lygiai');
      expect(lt.textContent).not.toMatch(/taksonomij/i);
      expect(lt.textContent).toContain('Pasirink gylį savo procesui');
      expect(lt.textContent).toContain('Pokalbis (L0)');
      expect(lt.querySelectorAll('nav button')).toHaveLength(0);
      fireEvent.click(
        within(lt).getByRole('radio', { name: /Komanda \(L2\)/i })
      );
      expect(lt.textContent).toContain('Komandos rolės');
      expect(lt.textContent).toContain('Pridėti maršrutizatorių');
      expect(lt.textContent).toContain('Gylio lygis: Komanda (L2)');
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

    it('renders M10 3A strategy in both locales with shell nav', () => {
      setLocale('en');
      const { container: en } = renderWithProviders(<M10ThreeAStrategyBlock />);
      expect(en.textContent).toContain('AUTOMATIZE');
      expect(en.textContent).toContain('AUGMENT');
      expect(en.textContent).toContain('AUTONOMIZE');
      expect(en.textContent).not.toContain('AUGMEAUTONOMIZE');
      expect(en.textContent).toContain('fewer errors');
      expect(en.textContent).toContain('Human decides, model helps');
      expect(en.textContent).toContain('5 %');
      expect(en.textContent).toContain('Step 1 of 3');
      expect(en.textContent).not.toContain('mažiau klaidų');
      expect(en.querySelectorAll('nav button')).toHaveLength(3);
      expect(
        en.querySelectorAll('svg [role="button"], svg [tabindex="0"]')
      ).toHaveLength(0);
      expect(en.textContent).not.toMatch(
        /Peržiūrėti visą dydį|View full size/i
      );

      setLocale('lt');
      const { container: lt } = renderWithProviders(<M10ThreeAStrategyBlock />);
      expect(lt.textContent).toContain('AUTOMATIZE');
      expect(lt.textContent).toContain('AUGMENT');
      expect(lt.textContent).toContain('AUTONOMIZE');
      expect(lt.textContent).not.toContain('AUGMEAUTONOMIZE');
      expect(lt.textContent).toContain('mažiau klaidų');
      expect(lt.textContent).toContain('Žmogus sprendžia, DI padeda');
      expect(lt.textContent).toContain('5 %');
      expect(lt.textContent).toContain('Žingsnis 1 iš 3');
      expect(lt.querySelectorAll('nav button')).toHaveLength(3);
      expect(
        lt.querySelectorAll('svg [role="button"], svg [tabindex="0"]')
      ).toHaveLength(0);
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

    it('renders M10 human control simulator in both locales', () => {
      setLocale('en');
      const { container: en } = renderWithProviders(
        <M10HumanControlSimulatorBlock />
      );
      expect(en.textContent).toContain('Choose a business scenario');
      expect(en.textContent).toContain('Exception review');
      expect(en.textContent).not.toContain('Pasirink verslo scenarijų');

      setLocale('lt');
      const { container: lt } = renderWithProviders(
        <M10HumanControlSimulatorBlock />
      );
      expect(lt.textContent).toContain('Pasirink verslo scenarijų');
      expect(lt.textContent).toContain('Išimčių peržiūra');
      expect(lt.textContent).not.toContain('Choose a business scenario');
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
      ['M10 depth roles lab', () => <M10DepthRolesLabBlock />],
      ['M10 trigger flow', () => <M10TriggerFlowBlock />],
      ['M10 workflow spec', () => <M10WorkflowSpecBlock />],
      ['M10 incident playbook', () => <M10IncidentPlaybookBlock />],
      ['M12 three labs', () => <M12ThreeLabsBlock />],
    ])('uses the dark text palette in %s title', (_name, renderComponent) => {
      setLocale('lt');
      setDarkTheme();

      const { container } = renderWithProviders(renderComponent());

      expectDarkPaletteTitle(container);
    });

    it('uses the dark diagram palette in M10 3A strategy', () => {
      setLocale('lt');
      setDarkTheme();
      const { container } = renderWithProviders(<M10ThreeAStrategyBlock />);
      expectDarkDiagramBackground(container);
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

    it('keeps keyboard interaction in HTML nav / pointer-only SVG hit areas', () => {
      setLocale('lt');

      const { container } = renderWithProviders(<M10ToolDecisionTreeBlock />);

      // Tool tree uses DiagramStepHitArea (pointer-only) – no SVG role=button targets.
      expect(
        container.querySelectorAll('svg [role="button"], svg [tabindex="0"]')
      ).toHaveLength(0);
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
        getByRole('button', {
          name: 'Peržiūrėti teoriją (grįši į testą): Pipeline',
        })
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
        getByRole('button', {
          name: 'Peržiūrėti teoriją (grįši į testą): Agentų ciklas',
        })
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
      expect(container.textContent).toContain('Analysis path');
      expect(container.textContent).toContain('Collection');
      expect(container.textContent).toContain('Modeling');
      expect(container.textContent).toContain('Gather sources');
      expect(container.textContent).toContain('Step 1 of 6');
      expect(container.textContent).toContain(
        'Click a step in the diagram or number 1–6'
      );
      expect(container.textContent).not.toContain('Duomenų analizės pipeline');
      expect(container.textContent).not.toContain('Analizės eiga');
      expect(container.textContent).not.toContain('Modeliai');
    });

    it('renders M7 data pipeline in Lithuanian with step navigation', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<M7DaPipelineBlock />);
      expect(container.textContent).toContain('Analizės eiga');
      expect(container.textContent).toContain('Rinkimas');
      expect(container.textContent).toContain('Modeliavimas');
      expect(container.textContent).toContain('Skaičiuojame');
      expect(container.textContent).toContain('Žingsnis 1 iš 6');
      expect(container.textContent).toContain(
        'Paspausk žingsnį diagramoje arba skaičių 1–6'
      );
      expect(container.textContent).not.toContain('Modeliai');
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
      expect(container.textContent).toContain('List sources');
      expect(container.textContent).toContain('Step 1 of 5');
      expect(container.textContent).toContain(
        'Click a step in the diagram or number 1–5'
      );
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

    it('renders M9 step-copy panel in Lithuanian with one active prompt', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<M9WorkflowStepCopyBlock />);
      expect(container.textContent).toContain('Duomenų surinkimas');
      expect(container.textContent).toContain('Išvardink 10–15');
      expect(container.querySelectorAll('nav button').length).toBe(8);
    });

    it('renders M9 step-copy panel in English', () => {
      setLocale('en');
      const { container } = renderWithProviders(<M9WorkflowStepCopyBlock />);
      expect(container.textContent).toContain('Data collection');
      expect(container.textContent).toContain('List 10–15');
    });

    it.each([
      ['M7 data prep', () => <M7DataPrepWorkflowBlock />],
      ['M7 analysis roles', () => <M7AnalysisTypesBlock />],
      ['M7 BI schema', () => <M7BiSchemaBlock />],
      ['M7 data pipeline', () => <M7DaPipelineBlock />],
      ['M7 data story cycle', () => <M7DataStoryCycleBlock />],
      ['M7 three agents', () => <M7ThreeAgentsBlock />],
    ])('renders %s with dark SVG background', (_name, renderComponent) => {
      setLocale('lt');
      setDarkTheme();

      const { container } = renderWithProviders(renderComponent());

      expectDarkDiagramBackground(container);
    });

    it('renders M9 workflow with horizontal card layout', () => {
      setLocale('lt');

      const { container } = renderWithProviders(<M9DataWorkflowBlock />);

      expect(container.querySelector('[role="img"]')).toBeTruthy();
      expect(
        container.querySelectorAll('[role="button"]').length
      ).toBeGreaterThan(0);
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
      const { getByRole } = renderWithProviders(<LlmArchDiagramBlock />);
      expect(getByRole('button', { name: /Režimas: Bazinis/i })).toBeTruthy();
      expect(getByRole('button', { name: /Režimas: Agentinis/i })).toBeTruthy();
      expect(() =>
        getByRole('button', { name: /Režimas: Įrankiai/i })
      ).toThrow();
      expect(() => getByRole('button', { name: /Mode: Basic/i })).toThrow();
    });

    it('renders English mode tabs when locale is en', () => {
      setLocale('en');
      const { getByRole } = renderWithProviders(<LlmArchDiagramBlock />);
      expect(getByRole('button', { name: /Mode: Basic/i })).toBeTruthy();
      expect(getByRole('button', { name: /Mode: Agent/i })).toBeTruthy();
      expect(() => getByRole('button', { name: /Mode: Tools/i })).toThrow();
      expect(() =>
        getByRole('button', { name: /Režimas: Bazinis/i })
      ).toThrow();
    });

    it('is interactive: three mode tabs with aria-pressed', () => {
      setLocale('lt');
      const { getAllByRole } = renderWithProviders(<LlmArchDiagramBlock />);
      const modeTabs = getAllByRole('button').filter((btn) =>
        /Režimas:/i.test(btn.getAttribute('aria-label') || '')
      );
      expect(modeTabs.length).toBe(3);
      expect(modeTabs.every((btn) => btn.hasAttribute('aria-pressed'))).toBe(
        true
      );
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

    it('forward marker uses userSpaceOnUse so shaft stays visible with stroke.flow', () => {
      setLocale('lt');
      const { container } = renderWithProviders(<LlmAutoregressiveBlock />);
      const markers = container.querySelectorAll('svg marker');
      expect(markers.length).toBeGreaterThan(0);
      markers.forEach((m) => {
        expect(m.getAttribute('markerUnits')).toBe('userSpaceOnUse');
      });
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
