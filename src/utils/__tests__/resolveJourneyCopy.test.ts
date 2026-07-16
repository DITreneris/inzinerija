import { describe, it, expect } from 'vitest';
import {
  resolveJourneyFieldValue,
  applyJourneyOverlayToContentBlock,
  applyJourneyOverlayToPathStep,
  applyJourneyOverlayToSummary,
  getOverlayFieldForTest,
} from '../resolveJourneyCopy';
import type {
  ContentBlockContent,
  PathStepContent,
  SummaryContent,
} from '../../types/modules';

describe('resolveJourneyCopy', () => {
  const baseCopyable =
    'Apibendrink šiuos pardavimo duomenis:\n- Top 5 produktai pagal pajamas';

  describe('resolveJourneyFieldValue', () => {
    it('returns overlay value for exact journey match', () => {
      const overlayValue = getOverlayFieldForTest(
        731,
        'types-descriptive',
        'rinkodara'
      );
      expect(overlayValue).toBeTruthy();
      expect(
        resolveJourneyFieldValue(
          731,
          'types-descriptive',
          'rinkodara',
          baseCopyable
        )
      ).toBe(overlayValue);
    });

    it('falls back to pardavimai overlay when journey variant missing', () => {
      const pardavimaiOverlay = getOverlayFieldForTest(
        731,
        'types-descriptive',
        'pardavimai'
      );
      const result = resolveJourneyFieldValue(
        731,
        'types-descriptive',
        'pardavimai',
        baseCopyable
      );
      expect(result).toBe(pardavimaiOverlay);
    });

    it('returns base value when journeyId is null', () => {
      expect(
        resolveJourneyFieldValue(731, 'types-descriptive', null, baseCopyable)
      ).toBe(baseCopyable);
    });

    it('returns base value for non-M7 overlay field', () => {
      const unknown = 'Unknown base prompt';
      expect(
        resolveJourneyFieldValue(999, 'unknown-field', 'rinkodara', unknown)
      ).toBe(unknown);
    });

    it('returns EN overlay distinct from LT for same journey', () => {
      const lt = getOverlayFieldForTest(
        731,
        'types-descriptive',
        'rinkodara',
        'lt'
      );
      const en = getOverlayFieldForTest(
        731,
        'types-descriptive',
        'rinkodara',
        'en'
      );
      expect(lt).toBeTruthy();
      expect(en).toBeTruthy();
      expect(en).not.toBe(lt);
      expect(en).toContain('marketing');
      expect(lt).toContain('rinkodaros');
    });

    it('resolveJourneyFieldValue uses EN overlay when locale is en', () => {
      const enOverlay = getOverlayFieldForTest(
        731,
        'types-descriptive',
        'rinkodara',
        'en'
      );
      expect(
        resolveJourneyFieldValue(
          731,
          'types-descriptive',
          'rinkodara',
          baseCopyable,
          'en'
        )
      ).toBe(enOverlay);
    });

    it('normalizes vidiniai to kita overlay', () => {
      const kitaOverlay = getOverlayFieldForTest(
        731,
        'types-descriptive',
        'kita'
      );
      expect(
        resolveJourneyFieldValue(
          731,
          'types-descriptive',
          'vidiniai',
          baseCopyable
        )
      ).toBe(kitaOverlay);
    });
  });

  describe('applyJourneyOverlayToContentBlock', () => {
    const content: ContentBlockContent = {
      sections: [
        { heading: '1', body: 'intro' },
        { heading: '2', body: 'schema' },
        { heading: '3', body: 'choice' },
        {
          heading: '3a',
          body: 'desc',
          copyable: baseCopyable,
          linkedRowIndex: 0,
        },
        {
          heading: '3b',
          body: 'diag',
          copyable: 'Diag base',
          linkedRowIndex: 1,
        },
        {
          heading: '3c',
          body: 'pred',
          copyable: 'Pred base',
          linkedRowIndex: 2,
        },
        {
          heading: '3d',
          body: 'presc',
          copyable: 'Presc base',
          linkedRowIndex: 3,
        },
      ],
    };

    it('applies overlay for M7 slide 731 with journey focus', () => {
      const result = applyJourneyOverlayToContentBlock(
        731,
        content,
        7,
        'rinkodara'
      );
      const rinkodaraOverlay = getOverlayFieldForTest(
        731,
        'types-descriptive',
        'rinkodara'
      );
      expect(result.sections[3].copyable).toBe(rinkodaraOverlay);
    });

    it('returns unchanged content for module 8', () => {
      const result = applyJourneyOverlayToContentBlock(
        731,
        content,
        8,
        'rinkodara'
      );
      expect(result).toBe(content);
    });

    it('returns unchanged content when journeyId is null', () => {
      const result = applyJourneyOverlayToContentBlock(731, content, 7, null);
      expect(result.sections[3].copyable).toBe(baseCopyable);
    });

    it('applies Tier 2 overlay for slide 73 pipeline-overview', () => {
      const tier2Content: ContentBlockContent = {
        sections: [
          { heading: '1', body: 'a' },
          { heading: '2', body: 'b' },
          { heading: '3', body: 'c' },
          { heading: '4', body: 'd', copyable: 'Base pipeline' },
        ],
      };
      const result = applyJourneyOverlayToContentBlock(
        73,
        tier2Content,
        7,
        'it-inzinerija'
      );
      const overlay = getOverlayFieldForTest(
        73,
        'pipeline-overview',
        'it-inzinerija'
      );
      expect(result.sections[3].copyable).toBe(overlay);
    });

    it('applies Tier 2 remaining overlay for slide 83 role-activation', () => {
      const roleContent: ContentBlockContent = {
        sections: [
          { heading: '1', body: 'a' },
          { heading: '2', body: 'b' },
          { heading: '3', body: 'c', copyable: 'Base role' },
        ],
      };
      const result = applyJourneyOverlayToContentBlock(
        83,
        roleContent,
        7,
        'personalas'
      );
      const overlay = getOverlayFieldForTest(
        83,
        'role-activation',
        'personalas'
      );
      expect(result.sections[2].copyable).toBe(overlay);
      expect(overlay).toContain('HR');
    });

    it('applies MASTER overlay on slide 74 at sections[4]', () => {
      const masterContent: ContentBlockContent = {
        sections: [
          { heading: '1', body: 'a' },
          { heading: '2', body: 'b' },
          { heading: '3', body: 'c' },
          { heading: '4', body: 'd' },
          { heading: '5', body: 'e', copyable: 'Base MASTER' },
          { heading: '6', body: 'f' },
        ],
      };
      const result = applyJourneyOverlayToContentBlock(
        74,
        masterContent,
        7,
        'rinkodara'
      );
      const overlay = getOverlayFieldForTest(74, 'master-prompt', 'rinkodara');
      expect(result.sections[4].copyable).toBe(overlay);
      expect(result.sections[5].copyable).toBeUndefined();
    });

    it('applies template overlays on slide 733 at sections[2/3/4]', () => {
      const templateContent: ContentBlockContent = {
        sections: [
          { heading: '1', body: 'a' },
          { heading: '2', body: 'b' },
          { heading: '3a', body: 'data', copyable: 'Base data' },
          { heading: '3b', body: 'comp', copyable: 'Base competitors' },
          { heading: '3c', body: 'cfo', copyable: 'Base CFO' },
          { heading: '4', body: 'check' },
        ],
      };
      const result = applyJourneyOverlayToContentBlock(
        733,
        templateContent,
        7,
        'rinkodara'
      );
      expect(result.sections[2].copyable).toBe(
        getOverlayFieldForTest(733, 'template-data', 'rinkodara')
      );
      expect(result.sections[3].copyable).toBe(
        getOverlayFieldForTest(733, 'template-competitors', 'rinkodara')
      );
      expect(result.sections[4].copyable).toBe(
        getOverlayFieldForTest(733, 'template-cfo', 'rinkodara')
      );
    });

    it('applies filter overlays on slide 734 at sections[3–6]', () => {
      const filterContent: ContentBlockContent = {
        sections: [
          { heading: '1', body: 'a' },
          { heading: '2', body: 'b' },
          { heading: '3', body: 'c' },
          { heading: '3a', body: 'ok', copyable: 'Base ok-fail' },
          { heading: '3b', body: 'prio', copyable: 'Base priority' },
          { heading: '3c', body: 'quick', copyable: 'Base quick' },
          { heading: '3d', body: 'port', copyable: 'Base portfolio' },
          { heading: '4', body: 'check' },
        ],
      };
      const result = applyJourneyOverlayToContentBlock(
        734,
        filterContent,
        7,
        'rinkodara'
      );
      expect(result.sections[3].copyable).toBe(
        getOverlayFieldForTest(734, 'filter-ok-fail', 'rinkodara')
      );
      expect(result.sections[4].copyable).toBe(
        getOverlayFieldForTest(734, 'filter-priority', 'rinkodara')
      );
      expect(result.sections[5].copyable).toBe(
        getOverlayFieldForTest(734, 'filter-quick-wins', 'rinkodara')
      );
      expect(result.sections[6].copyable).toBe(
        getOverlayFieldForTest(734, 'filter-portfolio', 'rinkodara')
      );
    });

    it('applies di-role-prompt on slide 78 at sections[3]', () => {
      const roleContent: ContentBlockContent = {
        sections: [
          { heading: '1', body: 'a' },
          { heading: '2', body: 'b' },
          { heading: '3', body: 'c' },
          { heading: '4', body: 'd', copyable: 'Base DI role' },
          { heading: '5', body: 'e' },
        ],
      };
      const result = applyJourneyOverlayToContentBlock(
        78,
        roleContent,
        7,
        'it-inzinerija'
      );
      const overlay = getOverlayFieldForTest(
        78,
        'di-role-prompt',
        'it-inzinerija'
      );
      expect(result.sections[3].copyable).toBe(overlay);
      expect(result.sections[4].copyable).toBeUndefined();
    });
  });

  describe('applyJourneyOverlayToPathStep', () => {
    const pathContent: PathStepContent = {
      title: 'Step',
      stepNumber: 1,
      stepTotal: 5,
      body: 'Intro',
      sections: [
        {
          heading: 'Užduotis pagal tavo kelią',
          body: 'Copy',
          copyable: 'Base step task',
        },
      ],
    };

    it('applies step-task overlay for 71.1 with vadyba', () => {
      const result = applyJourneyOverlayToPathStep(
        71.1,
        pathContent,
        7,
        'vadyba'
      );
      const overlay = getOverlayFieldForTest(71.1, 'step-task', 'vadyba');
      expect(result.sections?.[0].copyable).toBe(overlay);
      expect(overlay).toContain('strateginis');
    });

    it('returns unchanged for non-path-step slide', () => {
      expect(
        applyJourneyOverlayToPathStep(731, pathContent, 7, 'rinkodara')
      ).toBe(pathContent);
    });
  });

  describe('applyJourneyOverlayToSummary', () => {
    const content: SummaryContent = {
      sections: [],
      reflectionPrompt: 'Base reflection',
      firstAction24h: 'Base action',
    };

    it('applies overlay for slide 75 with IT journey', () => {
      const result = applyJourneyOverlayToSummary(
        75,
        content,
        7,
        'it-inzinerija'
      );
      const itReflection = getOverlayFieldForTest(
        75,
        'reflection',
        'it-inzinerija'
      );
      const itAction = getOverlayFieldForTest(
        75,
        'first-action-24h',
        'it-inzinerija'
      );
      expect(result.reflectionPrompt).toBe(itReflection);
      expect(result.firstAction24h).toBe(itAction);
    });

    it('returns unchanged for non-M7 module', () => {
      expect(applyJourneyOverlayToSummary(75, content, 8, 'vadyba')).toBe(
        content
      );
    });
  });
});
