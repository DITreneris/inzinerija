/**
 * Konteksto veikimo schema: Tu nurodai (vaidmuo, formatas, ribos) → DI → Geresnis rezultatas.
 * Naudojama skaidrėje id 44 (Konteksto inžinerija). SCHEME_AGENT: geometrija iš konstantų, rodyklės kraštas į kraštą.
 * Turinys pagal locale per contextFlowDiagramLabels.
 */
import { useLocale } from '../../../contexts/LocaleContext';
import {
  getContextFlowBoxes,
  getContextFlowHeading,
  getContextFlowAriaLabel,
} from './contextFlowDiagramLabels';
import { useCompactViewport } from '../../../utils/useCompactViewport';

const VIEWBOX_W = 640;
const VIEWBOX_H = 200;
const BOX_W = 160;
const BOX_H = 72;
const GAP = 32;
const ARROW_MARKER_LEN = 10;
const START_X = 40;
const ROW_Y = 72;

const BRAND = '#334e68';
const BRAND_LIGHT = '#486581';
const ACCENT = '#d4a520';
const ACCENT_DARK = '#b8860b';
const BORDER = '#bcccdc';
const GREY_ARROW = '#64748b';
const TEXT_DARK = '#102a43';
const BG_LIGHT = '#f0f4f8';

const COMPACT_VIEWBOX_W = 300;
const COMPACT_VIEWBOX_H = 344;
const COMPACT_BOX_W = 212;
const COMPACT_BOX_H = 64;
const COMPACT_START_X = 44;
const COMPACT_ROW_Y = 56;
const COMPACT_GAP = 34;

function getBoxPositions() {
  return [
    { x: START_X, y: ROW_Y, w: BOX_W, h: BOX_H },
    { x: START_X + BOX_W + GAP, y: ROW_Y, w: BOX_W, h: BOX_H },
    { x: START_X + (BOX_W + GAP) * 2, y: ROW_Y, w: BOX_W, h: BOX_H },
  ];
}

function getCompactBoxPositions() {
  return [
    {
      x: COMPACT_START_X,
      y: COMPACT_ROW_Y,
      w: COMPACT_BOX_W,
      h: COMPACT_BOX_H,
    },
    {
      x: COMPACT_START_X,
      y: COMPACT_ROW_Y + COMPACT_BOX_H + COMPACT_GAP,
      w: COMPACT_BOX_W,
      h: COMPACT_BOX_H,
    },
    {
      x: COMPACT_START_X,
      y: COMPACT_ROW_Y + (COMPACT_BOX_H + COMPACT_GAP) * 2,
      w: COMPACT_BOX_W,
      h: COMPACT_BOX_H,
    },
  ];
}

export default function ContextFlowDiagram() {
  const { locale } = useLocale();
  const { isCompactDiagram } = useCompactViewport();
  const labels = getContextFlowBoxes(locale);
  const positions = isCompactDiagram
    ? getCompactBoxPositions()
    : getBoxPositions();
  const boxes = positions.map((pos, i) => ({ ...pos, ...labels[i] }));
  const heading = getContextFlowHeading(locale);
  const ariaLabel = getContextFlowAriaLabel(locale);
  const viewBoxWidth = isCompactDiagram ? COMPACT_VIEWBOX_W : VIEWBOX_W;
  const viewBoxHeight = isCompactDiagram ? COMPACT_VIEWBOX_H : VIEWBOX_H;

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className="w-full max-w-2xl mx-auto block"
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient id="ctx-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={BG_LIGHT} />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        <linearGradient id="ctx-brand" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BRAND_LIGHT} />
          <stop offset="100%" stopColor={BRAND} />
        </linearGradient>
        <linearGradient id="ctx-accent" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e6c04d" />
          <stop offset="100%" stopColor={ACCENT} />
        </linearGradient>
        <marker
          id="ctx-arrow"
          markerWidth={ARROW_MARKER_LEN + 2}
          markerHeight={10}
          refX={ARROW_MARKER_LEN}
          refY={5}
          orient="auto"
        >
          <path
            d={`M0 0 L${ARROW_MARKER_LEN} 5 L0 10 Z`}
            fill={GREY_ARROW}
            stroke={GREY_ARROW}
            strokeWidth="0.5"
          />
        </marker>
      </defs>
      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill="url(#ctx-bg)"
        rx="12"
      />
      <rect
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill="none"
        stroke={BORDER}
        strokeWidth="1"
        rx="12"
      />
      <text
        x={viewBoxWidth / 2}
        y="28"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="16"
        fontWeight="700"
        fill={TEXT_DARK}
      >
        {heading}
      </text>
      {boxes.map((box, i) => {
        const rightEdge = box.x + box.w;
        const centerY = box.y + box.h / 2;
        const centerX = box.x + box.w / 2;
        const next = boxes[i + 1];
        const fromX = rightEdge + 4;
        const toX = next ? next.x + ARROW_MARKER_LEN : 0;
        const fromY = box.y + box.h + 4;
        const toY = next ? next.y - ARROW_MARKER_LEN : 0;
        const fill =
          box.color === 'accent' ? 'url(#ctx-accent)' : 'url(#ctx-brand)';
        const stroke = box.color === 'accent' ? ACCENT_DARK : BRAND;
        return (
          <g key={i}>
            <rect
              x={box.x}
              y={box.y}
              width={box.w}
              height={box.h}
              rx="10"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.5"
            />
            <text
              x={centerX}
              y={box.y + (isCompactDiagram ? 27 : 30)}
              textAnchor="middle"
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontSize={isCompactDiagram ? '12' : '13'}
              fontWeight="700"
              fill="white"
            >
              {box.title}
            </text>
            <text
              x={centerX}
              y={box.y + (isCompactDiagram ? 46 : 50)}
              textAnchor="middle"
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontSize="11"
              fontWeight="500"
              fill="rgba(255,255,255,0.95)"
            >
              {box.desc}
            </text>
            {next &&
              (isCompactDiagram ? (
                <line
                  x1={centerX}
                  y1={fromY}
                  x2={centerX}
                  y2={toY}
                  stroke={GREY_ARROW}
                  strokeWidth="2.5"
                  markerEnd="url(#ctx-arrow)"
                />
              ) : (
                <line
                  x1={fromX}
                  y1={centerY}
                  x2={toX}
                  y2={centerY}
                  stroke={GREY_ARROW}
                  strokeWidth="2.5"
                  markerEnd="url(#ctx-arrow)"
                />
              ))}
          </g>
        );
      })}
    </svg>
  );
}
