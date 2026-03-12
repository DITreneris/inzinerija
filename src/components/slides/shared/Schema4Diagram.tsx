/**
 * Schema 4: multimodalinė įvestis ir atmintis.
 * Logika pagal skaidrės body (modules.json): pagrindinis srautas; Įrankiai; atminties skaitymas
 * (saugykla → informacijos gavimas → kontekstas Į modelį); pasirinktinis įrašymas (modelis ⇢ saugykla, punktyrinė).
 */
import { useId } from 'react';
import {
  SCHEMA4_NODES,
  SCHEMA4_EDGES,
  VIEWBOX,
  INNER_W,
  TITLE_Y,
  PAD_TRANSFORM,
  ARROW_MARKER_LEN,
  getNode,
  getAnchorPoint,
  getLineEndPoint,
} from './schema4Layout';

const BRAND = '#334e68';
const BRAND_LIGHT = '#486581';
const ACCENT = '#b8860b';
const ACCENT_STROKE = '#7a5807';
const BORDER = '#bcccdc';
const BG_LIGHT = '#f0f4f8';
const BG_LIGHT_END = '#f1f5f9';
const TEXT_DARK = '#102a43';
const INFRA_FILL = '#64748b';
const INFRA_STROKE = '#475569';
const OPTIONAL_STROKE = '#94a3b8';
const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";

function getNodeFill(id: string): { fill: string; fillOpacity?: number; stroke: string } {
  if (id === 'retrieval') return { fill: ACCENT, fillOpacity: 0.95, stroke: ACCENT_STROKE };
  if (id === 'storage') return { fill: INFRA_FILL, stroke: INFRA_STROKE };
  return { fill: BRAND_LIGHT, fillOpacity: 0.9, stroke: BRAND };
}

const NODE_LABELS: Record<string, [string, string?]> = {
  input: ['Multimodalinė', 'įvestis (tekstas, vaizdas)'],
  model: ['DI modelis', undefined],
  output: ['Multimodalinė', 'išvestis'],
  generation: ['Generavimas', undefined],
  retrieval: ['Informacijos gavimas', undefined],
  storage: ['Saugykla', undefined],
};

export default function Schema4Diagram({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');

  return (
    <svg
      viewBox={VIEWBOX}
      className={`w-full max-w-2xl mx-auto block ${className}`}
      aria-labelledby={`schema4-title-${uid}`}
      role="img"
      aria-label="Schema 4: įvestis ir kontekstas iš atminties → DI modelis → išvestis; atminties sluoksnis: saugykla, informacijos gavimas, pasirinktinis įrašymas"
    >
      <title id={`schema4-title-${uid}`}>
        Schema 4: multimodalinė įvestis ir atmintis. Pagrindinis srautas: įvestis → modelis → išvestis. Atminties sluoksnis: saugykla → informacijos gavimas (skaito) → kontekstas į modelį; pasirinktinis įrašymas iš modelio į saugyklą.
      </title>
      <defs>
        <linearGradient id={`s4-bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={BG_LIGHT} />
          <stop offset="100%" stopColor={BG_LIGHT_END} />
        </linearGradient>
        <linearGradient id={`s4-step-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BRAND_LIGHT} />
          <stop offset="100%" stopColor={BRAND} />
        </linearGradient>
        <marker id={`s4-arrow-${uid}`} markerWidth="10" markerHeight="8" refX={ARROW_MARKER_LEN} refY="4" orient="auto">
          <path d="M0 0 L10 4 L0 8 Z" fill={BRAND} stroke={BRAND} strokeWidth="0.3" />
        </marker>
        <marker id={`s4-arrow-optional-${uid}`} markerWidth="10" markerHeight="8" refX={ARROW_MARKER_LEN} refY="4" orient="auto">
          <path d="M0 0 L10 4 L0 8 Z" fill={OPTIONAL_STROKE} stroke={OPTIONAL_STROKE} strokeWidth="0.3" />
        </marker>
      </defs>
      <g transform={`translate(${PAD_TRANSFORM}, ${PAD_TRANSFORM})`}>
        <rect width={INNER_W} height={260} fill={`url(#s4-bg-${uid})`} rx="8" />
        <rect width={INNER_W} height={260} fill="none" stroke={BORDER} strokeWidth="1" rx="8" />
        <text x={INNER_W / 2} y={TITLE_Y} textAnchor="middle" fontFamily={FONT} fontSize="13" fontWeight="700" fill={TEXT_DARK}>
          Schema 4: multimodalinė įvestis ir atmintis
        </text>

        {SCHEMA4_NODES.map((node) => {
          const style = getNodeFill(node.id);
          const [line1, line2] = NODE_LABELS[node.id] ?? ['', undefined];
          const useGradient = node.id !== 'retrieval' && node.id !== 'storage';
          const rx = node.h <= 28 ? 6 : 8;
          return (
            <g key={node.id}>
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                rx={rx}
                fill={useGradient ? `url(#s4-step-${uid})` : style.fill}
                fillOpacity={style.fillOpacity}
                stroke={style.stroke}
                strokeWidth={1}
              />
              <text x={node.x + node.w / 2} y={node.y + (line2 ? 20 : node.h / 2 + 4)} textAnchor="middle" fontFamily={FONT} fontSize={node.id === 'model' ? 12 : 9} fontWeight="700" fill="white">
                {line1}
              </text>
              {line2 != null && (
                <text x={node.x + node.w / 2} y={node.y + 34} textAnchor="middle" fontFamily={FONT} fontSize={9} fill="rgba(255,255,255,0.9)">
                  {line2}
                </text>
              )}
            </g>
          );
        })}

        {SCHEMA4_EDGES.map((edge, i) => {
          const fromNode = getNode(edge.from);
          const toNode = getNode(edge.to);
          if (!fromNode || !toNode) return null;
          const start = getAnchorPoint(fromNode, edge.fromAnchor);
          const end = getLineEndPoint(toNode, edge.toAnchor);

          let pathD: string;
          if (edge.from === 'retrieval' && edge.to === 'model') {
            pathD = `M ${start.x} ${start.y} L ${start.x} 96 L ${end.x} 96 L ${end.x} ${end.y}`;
          } else if (edge.from === 'model' && edge.to === 'storage' && edge.dashed) {
            pathD = `M ${start.x} ${start.y} L ${start.x} 160 L ${end.x} 160 L ${end.x} ${end.y}`;
          } else if (edge.fromAnchor === 'top' && edge.toAnchor === 'bottom') {
            pathD = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
          } else {
            pathD = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
          }

          const isDashed = edge.dashed === true;
          const labelY = edge.label === 'Įrankiai' ? fromNode.y + fromNode.h + 8 : undefined;

          return (
            <g key={`${edge.from}-${edge.to}-${i}`}>
              <path
                d={pathD}
                fill="none"
                stroke={isDashed ? OPTIONAL_STROKE : BRAND}
                strokeWidth={isDashed ? 1.2 : 1.5}
                strokeDasharray={isDashed ? '5 3' : undefined}
                markerEnd={isDashed ? `url(#s4-arrow-optional-${uid})` : `url(#s4-arrow-${uid})`}
              />
              {edge.label === 'Įrankiai' && labelY !== undefined && (
                <text x={start.x} y={labelY} textAnchor="middle" fontFamily={FONT} fontSize="10" fontWeight="600" fill={TEXT_DARK}>
                  {edge.label}
                </text>
              )}
              {edge.label === 'kontekstas' && (
                <text x={(start.x + end.x) / 2 - 20} y={115} textAnchor="middle" fontFamily={FONT} fontSize="8" fill={BRAND}>
                  kontekstas
                </text>
              )}
              {edge.dashed && (
                <text x={144} y={158} textAnchor="middle" fontFamily={FONT} fontSize="8" fill={OPTIONAL_STROKE}>
                  pasirinktinai
                </text>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
