import {
  AWARENESS_ROW,
  awarenessGapHeroY,
  awarenessRowLayout,
  awarenessViewHeight,
  BEAT_VIEW_W,
  PORTAL_BEAT_COLORS,
  PORTAL_BEAT_SVG,
} from './portalBeatLayout';
import type { LithuaniaLabels } from './portalBeatContent';
import PortalBeatBarRow from './portalBeatBarRow';

interface LithuaniaContextDiagramProps {
  labels: LithuaniaLabels;
  accentKey?: 'brand' | 'accent' | 'violet' | 'emerald';
}

function parsePct(value: string): number {
  const n = parseFloat(value.replace(',', '.').replace(/[^\d.+]/g, ''));
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 0;
}

export default function LithuaniaContextDiagram({
  labels,
  accentKey = 'brand',
}: LithuaniaContextDiagramProps) {
  const accent =
    accentKey === 'accent'
      ? PORTAL_BEAT_COLORS.accent
      : accentKey === 'violet'
        ? PORTAL_BEAT_COLORS.violet
        : accentKey === 'emerald'
          ? PORTAL_BEAT_COLORS.emerald
          : PORTAL_BEAT_COLORS.brand;

  const leftPct = parsePct(labels.leftStat);
  const rightPct = parsePct(labels.rightStat);
  const trackX = AWARENESS_ROW.padX;
  const viewH = awarenessViewHeight();
  const gapY = awarenessGapHeroY() + 16;
  const gapSuffix = `${labels.gapUnit} · ${labels.gapLabel}`;
  const gapSuffixX = trackX + labels.gapStat.length * 14 + 10;

  return (
    <svg
      viewBox={`0 0 ${BEAT_VIEW_W} ${viewH}`}
      className="w-full h-auto block"
      aria-hidden
    >
      <PortalBeatBarRow
        layout={awarenessRowLayout(0)}
        label={labels.leftTitle}
        stat={labels.leftStat}
        caption={labels.leftCaption}
        pct={leftPct}
        barFill={PORTAL_BEAT_COLORS.emerald}
        trackX={trackX}
      />
      <PortalBeatBarRow
        layout={awarenessRowLayout(1)}
        label={labels.rightTitle}
        stat={labels.rightStat}
        caption={labels.rightCaption}
        pct={rightPct}
        barFill={accent}
        trackX={trackX}
      />

      <text
        x={trackX}
        y={gapY}
        fill={PORTAL_BEAT_COLORS.emerald}
        fontSize="22"
        fontWeight="800"
      >
        {labels.gapStat}
      </text>
      <text
        x={gapSuffixX}
        y={gapY}
        className={PORTAL_BEAT_SVG.gapSuffix}
        fontSize="12"
        fontWeight="500"
      >
        {gapSuffix}
      </text>
    </svg>
  );
}
