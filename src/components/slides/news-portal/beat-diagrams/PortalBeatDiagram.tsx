import { useLocale } from '../../../../contexts/LocaleContext';

import type { NewsPortalEditorialBeat as BeatConfig } from '../../../../types/modules';

import AwarenessGapDiagram from './AwarenessGapDiagram';

import LithuaniaContextDiagram from './LithuaniaContextDiagram';

import PortalNextStepPromptBlock from './PortalNextStepPromptBlock';

import { getPortalBeatLabels, type PortalBeatId } from './portalBeatContent';

import { PORTAL_SOURCE_FOOTER } from '../portalSurfaces';

interface PortalBeatDiagramProps {
  beat: Pick<BeatConfig, 'id' | 'accentKey'>;
}

export default function PortalBeatDiagram({ beat }: PortalBeatDiagramProps) {
  const { locale } = useLocale();

  const labels = getPortalBeatLabels(locale);

  const beatId = beat.id as PortalBeatId;

  const ariaLabel = labels.aria[beatId] ?? beat.id;

  if (beatId === 'awareness-gap') {
    return (
      <div className="w-full min-h-0" role="img" aria-label={ariaLabel}>
        <AwarenessGapDiagram
          labels={labels.awarenessGap}
          accentKey={beat.accentKey}
        />

        <p className={PORTAL_SOURCE_FOOTER}>{labels.awarenessGap.source}</p>
      </div>
    );
  }

  if (beatId === 'lithuania-context') {
    return (
      <div className="w-full min-h-0" role="img" aria-label={ariaLabel}>
        <LithuaniaContextDiagram
          labels={labels.lithuania}
          accentKey={beat.accentKey}
        />

        <p className={PORTAL_SOURCE_FOOTER}>{labels.lithuania.source}</p>
      </div>
    );
  }

  if (beatId === 'next-step-prompt') {
    return (
      <div className="w-full min-h-0" role="region" aria-label={ariaLabel}>
        <PortalNextStepPromptBlock labels={labels.nextStepPrompt} />
      </div>
    );
  }

  return null;
}
