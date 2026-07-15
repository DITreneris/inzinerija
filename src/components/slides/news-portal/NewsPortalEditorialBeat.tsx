import type { NewsPortalEditorialBeat as BeatContent } from '../../../types/modules';

import PortalBeatDiagram from './beat-diagrams/PortalBeatDiagram';

import { resolveBeatShellVariant } from './portalBlockShellUtils';

import { PORTAL_SCROLL_TARGET } from './portalSectionAnchors';

import {
  getPortalEditorialSurfaceClasses,
  PORTAL_HEADING,
  PORTAL_TEXT,
} from './portalSurfaces';

import { isKnownPortalBeatId } from './portalUtils';

interface NewsPortalEditorialBeatProps {
  beat: BeatContent;
  sectionId?: string;
}

export default function NewsPortalEditorialBeat({
  beat,
  sectionId,
}: NewsPortalEditorialBeatProps) {
  const showDiagram = isKnownPortalBeatId(beat.id);
  const shellVariant = resolveBeatShellVariant(beat.id, beat.accentKey);
  const surfaceClasses = getPortalEditorialSurfaceClasses(shellVariant);
  const landmarkClass = sectionId ? PORTAL_SCROLL_TARGET : '';

  const copyCol = (
    <div className="min-w-0 flex flex-col justify-center">
      <h3 className={PORTAL_HEADING.beat}>{beat.title}</h3>
      <p className={`mt-3 ${PORTAL_TEXT.body}`}>{beat.body}</p>
    </div>
  );

  const diagramCol = showDiagram ? <PortalBeatDiagram beat={beat} /> : null;

  const inner = showDiagram ? (
    <div className="flex flex-col gap-4">
      {copyCol}
      {diagramCol}
    </div>
  ) : (
    copyCol
  );

  return (
    <aside
      id={sectionId}
      tabIndex={sectionId ? -1 : undefined}
      className={`${surfaceClasses} ${landmarkClass}`.trim()}
      aria-label={beat.title}
    >
      {inner}
    </aside>
  );
}
