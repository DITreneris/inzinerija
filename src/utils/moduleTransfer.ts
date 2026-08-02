import type { Module, ModuleTransfer } from '../types/modules/module';
import type { Slide } from '../types/modules/slides';
import type {
  PracticeSummaryContent,
  SummaryContent,
} from '../types/modules/shared';

export type ResolvedModuleTransfer = ModuleTransfer & {
  source: 'summary' | 'module';
  slideId?: number;
};

type TransferSlideContent = SummaryContent | PracticeSummaryContent;

function isTransferSlide(slide: Slide): boolean {
  return slide.type === 'summary' || slide.type === 'practice-summary';
}

function readTransferFromContent(
  content: TransferSlideContent | undefined
): ModuleTransfer | null {
  if (!content) return null;
  const abilityBefore = content.abilityBefore?.trim();
  const abilityAfter = content.abilityAfter?.trim();
  const firstAction24h = content.firstAction24h?.trim();
  if (!abilityBefore || !abilityAfter || !firstAction24h) return null;
  return {
    abilityBefore,
    abilityAfter,
    firstAction24h,
    nextStepCTA: content.nextStepCTA?.trim() || undefined,
  };
}

/** Last summary / practice-summary with full transfer fields wins. */
export function findSummaryTransfer(
  slides: Slide[]
): (ResolvedModuleTransfer & { slideId: number }) | null {
  for (let i = slides.length - 1; i >= 0; i -= 1) {
    const slide = slides[i];
    if (!isTransferSlide(slide)) continue;
    const fromContent = readTransferFromContent(
      slide.content as TransferSlideContent | undefined
    );
    if (fromContent) {
      return { ...fromContent, source: 'summary', slideId: slide.id };
    }
  }
  return null;
}

/**
 * Prefer last summary/practice-summary transfer fields; else module.transfer.
 */
export function resolveModuleTransfer(
  module: Module | null | undefined
): ResolvedModuleTransfer | null {
  if (!module) return null;
  const fromSummary = findSummaryTransfer(module.slides ?? []);
  if (fromSummary) return fromSummary;
  const fallback = module.transfer;
  if (
    fallback?.abilityBefore?.trim() &&
    fallback?.abilityAfter?.trim() &&
    fallback?.firstAction24h?.trim()
  ) {
    return {
      abilityBefore: fallback.abilityBefore.trim(),
      abilityAfter: fallback.abilityAfter.trim(),
      firstAction24h: fallback.firstAction24h.trim(),
      nextStepCTA: fallback.nextStepCTA?.trim() || undefined,
      source: 'module',
    };
  }
  return null;
}

/** Own-work template: replace `{{context}}` (and bare braces variants). */
export function injectOwnWorkContext(
  template: string,
  context: string
): string {
  const trimmed = context.trim();
  if (!trimmed) return template;
  return template
    .split('{{context}}')
    .join(trimmed)
    .split('{context}')
    .join(trimmed);
}
