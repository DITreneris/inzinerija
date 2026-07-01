export type DiagramBox = [number, number, number, number];

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
