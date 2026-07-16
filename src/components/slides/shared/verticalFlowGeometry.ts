export type DiagramBox = [number, number, number, number];

/** Recommended minimum gap between stacked boxes (SCHEME §3.3). */
export const VERTICAL_FLOW_MIN_GAP = 24;

/** Minimum visible connector stem length in viewBox units (SCHEME §3.3 gate). */
export const MIN_VISIBLE_STEM = 12;

export interface VerticalFlowConnector {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/** Visible stem length for a vertical gap and arrow marker (gap − markerLen). */
export function verticalFlowStemLength(gap: number, markerLen: number): number {
  return gap - markerLen;
}

/**
 * Edge-to-edge vertical connector between two stacked boxes (SCHEME §3.2).
 * Line ends before the next box top so the marker tip touches the edge.
 */
export function getVerticalFlowConnector(
  from: DiagramBox,
  to: DiagramBox,
  cx: number,
  markerLen: number
): VerticalFlowConnector {
  const [, fromY, , fromH] = from;
  const [, toY] = to;
  return {
    x1: cx,
    y1: fromY + fromH,
    x2: cx,
    y2: toY - markerLen,
  };
}

interface VerticalFlowFrame {
  viewBoxWidth: number;
  viewBoxHeight: number;
  colsX: number;
  colsW: number;
  cx: number;
}

export interface VerticalFlowGeometryConfig {
  stepCount: number;
  boxHeight: number;
  gap: number;
  startY: number;
  desktop: VerticalFlowFrame;
  compact: VerticalFlowFrame;
}

export interface VerticalFlowGeometry {
  viewBoxWidth: number;
  viewBoxHeight: number;
  cx: number;
  stepBoxes: DiagramBox[];
}

export function resolveVerticalFlowGeometry(
  config: VerticalFlowGeometryConfig,
  isCompactDiagram: boolean
): VerticalFlowGeometry {
  const frame = isCompactDiagram ? config.compact : config.desktop;
  const stepBoxes = Array.from(
    { length: config.stepCount },
    (_, index) =>
      [
        frame.colsX,
        config.startY + (config.boxHeight + config.gap) * index,
        frame.colsW,
        config.boxHeight,
      ] as DiagramBox
  );

  return {
    viewBoxWidth: frame.viewBoxWidth,
    viewBoxHeight: frame.viewBoxHeight,
    cx: frame.cx,
    stepBoxes,
  };
}
