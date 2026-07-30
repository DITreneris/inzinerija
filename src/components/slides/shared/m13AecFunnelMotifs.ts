/**
 * Inline SVG motif paths for M13 A/E/C funnel (16×16 viewBox).
 * Decorative only — monochrome; do not import lucide into the SVG tree.
 */
export const AEC_MOTIF_SIZE = 14;

/** Eye — Awareness / attention */
export const AEC_MOTIF_EYE =
  'M1.5 8C3.2 4.8 5.4 3.2 8 3.2S12.8 4.8 14.5 8C12.8 11.2 10.6 12.8 8 12.8S3.2 11.2 1.5 8ZM8 10.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z';

/** Pointer — Engagement / interact */
export const AEC_MOTIF_POINTER =
  'M4.2 1.8v11.2l2.6-2.4 1.7 3.9 1.55-.7-1.7-3.85L13 9.7z';

/** Target — Conversion / action */
export const AEC_MOTIF_TARGET =
  'M8 1.6a6.4 6.4 0 1 0 0 12.8A6.4 6.4 0 0 0 8 1.6Zm0 2.4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Z';

export const AEC_MOTIFS = [
  AEC_MOTIF_EYE,
  AEC_MOTIF_POINTER,
  AEC_MOTIF_TARGET,
] as const;

/** Horizontal cluster: icon left of label, centered on cx. */
export function aecLabelCluster(opts: {
  cx: number;
  label: string;
  iconSize?: number;
  gap?: number;
  /** Approx char width @ stepLabel 12 / 700 */
  charW?: number;
}): { iconX: number; textX: number; clusterW: number } {
  const iconSize = opts.iconSize ?? AEC_MOTIF_SIZE;
  const gap = opts.gap ?? 6;
  const charW = opts.charW ?? 7.1;
  const textW = Math.max(24, Math.round(opts.label.length * charW));
  const clusterW = iconSize + gap + textW;
  const left = opts.cx - clusterW / 2;
  return {
    iconX: left,
    textX: left + iconSize + gap + textW / 2,
    clusterW,
  };
}
