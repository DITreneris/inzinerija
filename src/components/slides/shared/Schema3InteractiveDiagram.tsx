/**
 * Schema 3: LLM su RAG ir įrankiais – interaktyvi sisteminė diagrama.
 * Sluoksniai: Control, Execution, Data. Spalvinė semantika. Paspaudus mazgą – paaiškinimas apačioje.
 */
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SCHEMA3_NODES,
  SCHEMA3_EDGES,
  VIEWBOX,
  INNER_W,
  INNER_H,
  TITLE_Y,
  PAD_TRANSFORM,
  ARROW_MARKER_LEN,
  LAYER_BOUNDS,
  getNode,
  getAnchorPoint,
  getLineEndPoint,
} from './schema3Layout';
import type { Locale } from './schema3Labels';
import { getSchema3DiagramTitles, getSchema3NodeLabels } from './schema3Labels';

const BRAND = '#334e68';
const BRAND_LIGHT = '#486581';
const _ACCENT = '#d4a520';
const BORDER = '#bcccdc';
const BG_LIGHT = '#f0f4f8';
const BG_LIGHT_END = '#f1f5f9';
const TEXT_DARK = '#102a43';
const STORAGE_FILL = '#64748b';
const STORAGE_STROKE = '#475569';
const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";

const NODE_INDEX: Record<string, number> = {
  input: 0, model: 1, output: 2, toolUse: 3, retrieval: 4, storage: 5,
};

function getNodeStyle(nodeId: string, isActive: boolean): { stroke: string; strokeWidth: number; activeOverlay?: string } {
  const stroke = nodeId === 'storage' ? STORAGE_STROKE : (['toolUse', 'retrieval'].includes(nodeId) ? BRAND_LIGHT : BRAND);
  return { stroke, strokeWidth: 1, activeOverlay: isActive ? 'rgba(212,165,32,0.12)' : undefined };
}

interface Schema3InteractiveDiagramProps {
  currentStep?: number;
  onStepClick?: (index: number) => void;
  locale?: Locale;
  className?: string;
}

export default function Schema3InteractiveDiagram({
  currentStep = 0,
  onStepClick,
  locale = 'lt',
  className = '',
}: Schema3InteractiveDiagramProps) {
  const { t } = useTranslation('diagrams');
  const uid = useId().replace(/:/g, '');
  const isInteractive = typeof onStepClick === 'function';
  const nodeLabels = getSchema3NodeLabels(locale);
  const diagramTitles = getSchema3DiagramTitles(locale);

  return (
    <svg
      viewBox={VIEWBOX}
      className={`w-full max-w-2xl mx-auto block ${className}`}
      role="img"
      aria-label={`${t('schema3Aria')}${isInteractive ? t('schema3InteractiveHint') : ''}`}
    >
      <defs>
        <linearGradient id={`s3i-bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={BG_LIGHT} />
          <stop offset="100%" stopColor={BG_LIGHT_END} />
        </linearGradient>
        <linearGradient id={`s3i-control-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3d5a73" />
          <stop offset="100%" stopColor={BRAND} />
        </linearGradient>
        <linearGradient id={`s3i-exec-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5c7589" />
          <stop offset="100%" stopColor={BRAND_LIGHT} />
        </linearGradient>
        <marker id={`s3i-arrow-${uid}`} markerWidth="8" markerHeight="6" refX={ARROW_MARKER_LEN} refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 Z" fill={BRAND} stroke={BRAND} strokeWidth="0.2" />
        </marker>
        <marker id={`s3i-arrow-rev-${uid}`} markerWidth="8" markerHeight="6" refX={ARROW_MARKER_LEN} refY="3" orient="auto-start-reverse">
          <path d="M0 0 L8 3 L0 6 Z" fill={BRAND} stroke={BRAND} strokeWidth="0.2" />
        </marker>
        <marker id={`s3i-arrow-dashed-${uid}`} markerWidth="8" markerHeight="6" refX={ARROW_MARKER_LEN} refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 Z" fill={STORAGE_STROKE} stroke={STORAGE_STROKE} strokeWidth="0.2" />
        </marker>
      </defs>
      <g transform={`translate(${PAD_TRANSFORM}, ${PAD_TRANSFORM})`}>
        <rect width={INNER_W} height={INNER_H} fill={`url(#s3i-bg-${uid})`} rx="8" />
        {LAYER_BOUNDS.map((b, i) => (
          <rect
            key={i}
            x={16}
            y={b.y - 8}
            width={INNER_W - 32}
            height={b.h + 16}
            rx="8"
            fill={i === 0 ? 'rgba(51,78,104,0.05)' : i === 1 ? 'rgba(72,101,129,0.04)' : 'rgba(100,116,139,0.05)'}
          />
        ))}
        <rect width={INNER_W} height={INNER_H} fill="none" stroke={BORDER} strokeWidth="1" rx="8" />
        <text x={INNER_W / 2} y={TITLE_Y} textAnchor="middle" fontFamily={FONT} fontSize="14" fontWeight="700" fill={TEXT_DARK}>
          {diagramTitles.title}
        </text>
        {isInteractive && (
          <text x={INNER_W / 2} y={42} textAnchor="middle" fontFamily={FONT} fontSize="11" fontWeight="500" fill={BRAND}>
            {diagramTitles.subtitle}
          </text>
        )}

        {SCHEMA3_EDGES.map((edge, i) => {
          const fromNode = getNode(edge.from);
          const toNode = getNode(edge.to);
          if (!fromNode || !toNode) return null;
          const start = getAnchorPoint(fromNode, edge.fromAnchor);
          const end = getLineEndPoint(toNode, edge.toAnchor);
          if (edge.dashed) {
            const wayX = Math.min(fromNode.x, toNode.x) - 28;
            const pathD = `M ${Math.round(start.x)} ${Math.round(start.y)} L ${wayX} ${Math.round(start.y)} L ${wayX} ${Math.round(end.y) + ARROW_MARKER_LEN} L ${Math.round(end.x)} ${Math.round(end.y) + ARROW_MARKER_LEN} L ${Math.round(end.x)} ${Math.round(end.y)}`;
            return (
              <path
                key={`${edge.from}-${edge.to}-${i}`}
                d={pathD}
                fill="none"
                stroke={STORAGE_STROKE}
                strokeWidth="1.2"
                strokeDasharray="6 4"
                markerEnd={`url(#s3i-arrow-dashed-${uid})`}
              />
            );
          }
          const pathD = `M ${Math.round(start.x)} ${Math.round(start.y)} L ${Math.round(end.x)} ${Math.round(end.y)}`;
          return (
            <path
              key={`${edge.from}-${edge.to}-${i}`}
              d={pathD}
              fill="none"
              stroke={BRAND}
              strokeWidth="1.2"
              markerStart={`url(#s3i-arrow-rev-${uid})`}
              markerEnd={`url(#s3i-arrow-${uid})`}
            />
          );
        })}

        {SCHEMA3_NODES.map((node) => {
          const idx = NODE_INDEX[node.id];
          const isActive = currentStep === idx;
          const style = getNodeStyle(node.id, isActive);
          const [line1, line2] = nodeLabels[node.id] ?? ['', undefined];
          const gradId = node.layer === 'control' ? `s3i-control-${uid}` : node.layer === 'execution' ? `s3i-exec-${uid}` : null;
          const fill = node.id === 'storage' ? STORAGE_FILL : gradId ? `url(#${gradId})` : STORAGE_FILL;
          const rx = 8;

          return (
            <g key={node.id}>
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                rx={rx}
                fill={fill}
                stroke={style.stroke}
                strokeWidth={style.strokeWidth}
              />
              {style.activeOverlay && (
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx={rx}
                  fill={style.activeOverlay}
                />
              )}
              <text
                x={node.x + node.w / 2}
                y={node.y + (line2 ? 18 : node.h / 2 + 4)}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={node.id === 'model' ? 13 : node.id === 'toolUse' ? 9 : 10}
                fontWeight={node.id === 'model' ? '700' : node.id === 'storage' ? '500' : '600'}
                fill="white"
              >
                {line1}
              </text>
              {line2 != null && (
                <text
                  x={node.x + node.w / 2}
                  y={node.y + 32}
                  textAnchor="middle"
                  fontFamily={FONT}
                  fontSize="9"
                  fill="rgba(255,255,255,0.9)"
                >
                  {line2}
                </text>
              )}
              {isInteractive && (
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx={rx}
                  fill="transparent"
                  cursor="pointer"
                  onClick={() => onStepClick?.(idx)}
                  aria-label={t('schema3NodeAria', { label: line1 })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onStepClick?.(idx);
                    }
                  }}
                />
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
