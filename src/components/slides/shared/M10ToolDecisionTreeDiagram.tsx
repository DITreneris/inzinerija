/**
 * M10 – įrankių pasirinkimo medis (view). Keyboard via DiagramStepNav in Block.
 * Section H1 owns the title. Workato = landmark caption, solid border (not dashed).
 * Geometry SOT: m10ToolDecisionTreeLayout.ts
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DiagramStepHitArea } from './diagramKit';
import { DIAGRAM_TOKENS } from './diagramTokens';
import {
  M10_TOOL_TREE_CRITERION_SIZE,
  M10_TOOL_TREE_CRITERION_WEIGHT,
  M10_TOOL_TREE_LEAF,
  M10_TOOL_TREE_ROOT,
  M10_TOOL_TREE_VIEW,
  TREE_DIM_OPACITY,
  buildM10ToolTreeLeaves,
  getM10ToolTreeBusStroke,
  getM10ToolTreeBusY,
  getM10ToolTreeCriterionY,
  getM10ToolTreeDropStroke,
  getM10ToolTreeTrunkStroke,
  m10ToolTreeRootCx,
} from './m10ToolDecisionTreeLayout';
import { getProcessArrowMarkerGeom } from './processArrowMarker';
import {
  getM10ToolTreeLeaves,
  getM10ToolTreeLabels,
  type M10Locale,
} from './m10DiagramContent';

const PROCESS_ARROW = getProcessArrowMarkerGeom();

export default function M10ToolDecisionTreeDiagram({
  locale = 'lt',
  selectedIndex = 0,
  onSelect,
  className = '',
}: {
  locale?: M10Locale;
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const typography = DIAGRAM_TOKENS.typography;
  const L = getM10ToolTreeLabels(locale);
  const leafCopy = getM10ToolTreeLeaves(locale);
  const interactive = typeof onSelect === 'function';
  const rootCx = m10ToolTreeRootCx();
  const boxes = buildM10ToolTreeLeaves(leafCopy.length);
  const trunk = getM10ToolTreeTrunkStroke();
  const bus = getM10ToolTreeBusStroke(leafCopy.length);
  const busY = getM10ToolTreeBusY();
  const criterionY = getM10ToolTreeCriterionY();
  const leafFill = palette.bgEnd;
  const selectedSafe = Math.min(
    Math.max(selectedIndex, 0),
    Math.max(leafCopy.length - 1, 0)
  );

  const dropIndexes = boxes.map((_, i) => i);
  const unselectedDrops = dropIndexes.filter((i) => i !== selectedSafe);
  const dimDrop =
    interactive && selectedIndex >= 0
      ? TREE_DIM_OPACITY
      : DIAGRAM_TOKENS.opacity.active;

  return (
    <svg
      viewBox={`0 0 ${M10_TOOL_TREE_VIEW.w} ${M10_TOOL_TREE_VIEW.h}`}
      className={`w-full max-w-5xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <marker
          id={`m10tree-arr-${uid}`}
          markerUnits={PROCESS_ARROW.markerUnits}
          markerWidth={PROCESS_ARROW.markerWidth}
          markerHeight={PROCESS_ARROW.markerHeight}
          refX={PROCESS_ARROW.refX}
          refY={PROCESS_ARROW.refY}
          orient="auto"
        >
          <path d={PROCESS_ARROW.pathD} fill={palette.flow} />
        </marker>
        <marker
          id={`m10tree-arr-sel-${uid}`}
          markerUnits={PROCESS_ARROW.markerUnits}
          markerWidth={PROCESS_ARROW.markerWidth}
          markerHeight={PROCESS_ARROW.markerHeight}
          refX={PROCESS_ARROW.refX}
          refY={PROCESS_ARROW.refY}
          orient="auto"
        >
          <path d={PROCESS_ARROW.pathD} fill={palette.brandDark} />
        </marker>
      </defs>
      <rect
        x={rootCx - M10_TOOL_TREE_ROOT.w / 2}
        y={M10_TOOL_TREE_ROOT.y}
        width={M10_TOOL_TREE_ROOT.w}
        height={M10_TOOL_TREE_ROOT.h}
        rx={DIAGRAM_TOKENS.radius.box}
        fill={palette.brand}
        stroke={palette.brandDark}
        strokeWidth={DIAGRAM_TOKENS.stroke.border + 0.2}
      />
      <text
        x={rootCx}
        y={M10_TOOL_TREE_ROOT.y + 30}
        textAnchor="middle"
        fill={palette.whiteText}
        fontSize={typography.stepLabel.desktop}
        fontWeight={typography.titleWeight}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.root}
      </text>

      <line
        x1={trunk.x1}
        y1={trunk.y1}
        x2={trunk.x2}
        y2={trunk.y2}
        stroke={palette.flow}
        strokeWidth={trunk.strokeWidth}
      />
      <line
        x1={bus.x1}
        y1={bus.y1}
        x2={bus.x2}
        y2={bus.y2}
        stroke={palette.flow}
        strokeWidth={bus.strokeWidth}
      />

      {unselectedDrops.map((i) => {
        const drop = getM10ToolTreeDropStroke(i, leafCopy.length);
        return (
          <line
            key={`drop-${leafCopy[i]?.id ?? i}`}
            x1={drop.x1}
            y1={drop.y1}
            x2={drop.x2}
            y2={drop.y2}
            stroke={palette.flow}
            strokeWidth={drop.strokeWidth}
            opacity={dimDrop}
            markerEnd={`url(#m10tree-arr-${uid})`}
          />
        );
      })}
      {boxes[selectedSafe] ? (
        <line
          x1={boxes[selectedSafe].cx}
          y1={busY}
          x2={boxes[selectedSafe].cx}
          y2={boxes[selectedSafe].y - PROCESS_ARROW.tipLen}
          stroke={palette.brandDark}
          strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
          markerEnd={`url(#m10tree-arr-sel-${uid})`}
        />
      ) : null}

      {leafCopy.map((leaf, i) => {
        const box = boxes[i];
        if (!box) return null;
        return (
          <text
            key={`crit-${leaf.id}`}
            x={box.cx}
            y={criterionY}
            textAnchor="middle"
            fill={palette.brandDark}
            fontSize={M10_TOOL_TREE_CRITERION_SIZE}
            fontWeight={M10_TOOL_TREE_CRITERION_WEIGHT}
            fontFamily={DIAGRAM_TOKENS.font}
          >
            {leaf.condition}
          </text>
        );
      })}

      {leafCopy.map((leaf, i) => {
        if (i === selectedSafe) return null;
        return (
          <LeafCard
            key={leaf.id}
            leaf={leaf}
            box={boxes[i]}
            isSel={false}
            isLandmark={leaf.id === 'ent'}
            leafFill={leafFill}
            palette={palette}
            typography={typography}
            landmarkLabel={L.landmark}
            interactive={interactive}
            onActivate={() => onSelect?.(i)}
          />
        );
      })}
      {leafCopy[selectedSafe] && boxes[selectedSafe] ? (
        <LeafCard
          leaf={leafCopy[selectedSafe]}
          box={boxes[selectedSafe]}
          isSel
          isLandmark={leafCopy[selectedSafe].id === 'ent'}
          leafFill={leafFill}
          palette={palette}
          typography={typography}
          landmarkLabel={L.landmark}
          interactive={interactive}
          onActivate={() => onSelect?.(selectedSafe)}
        />
      ) : null}
    </svg>
  );
}

function LeafCard({
  leaf,
  box,
  isSel,
  isLandmark,
  leafFill,
  palette,
  typography,
  landmarkLabel,
  interactive,
  onActivate,
}: {
  leaf: { id: string; tool: string };
  box: { x: number; cx: number; y: number } | undefined;
  isSel: boolean;
  isLandmark: boolean;
  leafFill: string;
  palette: ReturnType<typeof useDiagramPalette>;
  typography: typeof DIAGRAM_TOKENS.typography;
  landmarkLabel: string;
  interactive: boolean;
  onActivate: () => void;
}) {
  if (!box) return null;
  return (
    <g>
      <rect
        x={box.x}
        y={box.y}
        width={M10_TOOL_TREE_LEAF.w}
        height={M10_TOOL_TREE_LEAF.h}
        rx={DIAGRAM_TOKENS.radius.box}
        fill={isSel ? palette.brand : leafFill}
        stroke={
          isSel ? palette.brandDark : isLandmark ? palette.flow : palette.border
        }
        strokeWidth={
          isSel ? DIAGRAM_TOKENS.stroke.active : DIAGRAM_TOKENS.stroke.inactive
        }
      />
      <text
        x={box.cx}
        y={box.y + (isLandmark ? 20 : 28)}
        textAnchor="middle"
        fill={isSel ? palette.whiteText : palette.brandDark}
        fontSize={typography.stepLabel.desktop}
        fontWeight={typography.titleWeight}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {leaf.tool}
      </text>
      {isLandmark ? (
        <text
          x={box.cx}
          y={box.y + 36}
          textAnchor="middle"
          fill={isSel ? palette.whiteText : palette.muted}
          fontSize={typography.stepSub.desktop}
          fontFamily={DIAGRAM_TOKENS.font}
        >
          {landmarkLabel}
        </text>
      ) : null}
      {interactive ? (
        <DiagramStepHitArea
          x={box.x}
          y={box.y}
          width={M10_TOOL_TREE_LEAF.w}
          height={M10_TOOL_TREE_LEAF.h}
          radius={DIAGRAM_TOKENS.radius.box}
          onActivate={onActivate}
        />
      ) : null}
    </g>
  );
}
