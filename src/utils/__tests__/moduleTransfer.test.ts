import { describe, expect, it } from 'vitest';
import type { Module } from '../../types/modules/module';
import type { Slide } from '../../types/modules/slides';
import { injectOwnWorkContext, resolveModuleTransfer } from '../moduleTransfer';

function makeModule(partial: Partial<Module> & { id: number }): Module {
  return {
    title: 'T',
    subtitle: 'S',
    description: 'D',
    icon: 'BookOpen',
    level: 'learn',
    duration: '10 min',
    slides: [],
    businessExamples: [],
    ...partial,
  };
}

describe('resolveModuleTransfer', () => {
  it('prefers last summary with full transfer fields', () => {
    const slides = [
      {
        id: 1,
        title: 'A',
        subtitle: '',
        type: 'summary',
        content: {
          sections: [],
          abilityBefore: 'old before',
          abilityAfter: 'old after',
          firstAction24h: 'old action',
        },
      },
      {
        id: 2,
        title: 'B',
        subtitle: '',
        type: 'summary',
        content: {
          sections: [],
          abilityBefore: 'before',
          abilityAfter: 'after',
          firstAction24h: 'do this',
          nextStepCTA: 'next',
        },
      },
    ] as Slide[];
    const resolved = resolveModuleTransfer(makeModule({ id: 1, slides }));
    expect(resolved).toMatchObject({
      source: 'summary',
      slideId: 2,
      abilityBefore: 'before',
      firstAction24h: 'do this',
      nextStepCTA: 'next',
    });
  });

  it('falls back to module.transfer', () => {
    const resolved = resolveModuleTransfer(
      makeModule({
        id: 4,
        slides: [
          {
            id: 1,
            title: 'x',
            subtitle: '',
            type: 'content-block',
            content: {},
          },
        ],
        transfer: {
          abilityBefore: 'b',
          abilityAfter: 'a',
          firstAction24h: 'act',
        },
      })
    );
    expect(resolved).toMatchObject({
      source: 'module',
      abilityBefore: 'b',
      firstAction24h: 'act',
    });
  });

  it('returns null when incomplete', () => {
    expect(
      resolveModuleTransfer(
        makeModule({
          id: 1,
          slides: [
            {
              id: 1,
              title: 's',
              subtitle: '',
              type: 'summary',
              content: {
                sections: [],
                firstAction24h: 'only action',
              },
            },
          ],
        })
      )
    ).toBeNull();
  });
});

describe('injectOwnWorkContext', () => {
  it('replaces {{context}}', () => {
    expect(injectOwnWorkContext('X {{context}} Y', 'hello')).toBe('X hello Y');
  });
});
