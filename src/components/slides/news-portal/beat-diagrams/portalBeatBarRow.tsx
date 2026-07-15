import {
  AWARENESS_ROW,
  awarenessRowLayout,
  PORTAL_BEAT_SVG,
} from './portalBeatLayout';

export interface PortalBeatBarRowProps {
  layout: ReturnType<typeof awarenessRowLayout>;
  label: string;
  stat: string;
  caption: string;
  pct: number;
  barFill: string;
  trackX: number;
}

export default function PortalBeatBarRow({
  layout,
  label,
  stat,
  caption,
  pct,
  barFill,
  trackX,
}: PortalBeatBarRowProps) {
  const fillW = (pct / 100) * AWARENESS_ROW.barTrackW;
  const { labelY, captionY, barY } = layout;

  return (
    <g>
      <text
        x={trackX}
        y={labelY}
        className={PORTAL_BEAT_SVG.label}
        fontSize={AWARENESS_ROW.labelSize}
        fontWeight="600"
      >
        {label}
      </text>
      <text
        x={trackX + AWARENESS_ROW.barTrackW}
        y={labelY}
        fill={barFill}
        fontSize={AWARENESS_ROW.pctSize}
        fontWeight="800"
        textAnchor="end"
      >
        {stat}
      </text>
      <text
        x={trackX}
        y={captionY}
        className={PORTAL_BEAT_SVG.caption}
        fontSize={AWARENESS_ROW.captionSize}
        fontWeight="400"
      >
        {caption}
      </text>
      <rect
        x={trackX}
        y={barY}
        width={AWARENESS_ROW.barTrackW}
        height={AWARENESS_ROW.barH}
        className={PORTAL_BEAT_SVG.track}
        rx="5"
      />
      <rect
        x={trackX}
        y={barY}
        width={fillW}
        height={AWARENESS_ROW.barH}
        fill={barFill}
        rx="5"
      />
    </g>
  );
}
