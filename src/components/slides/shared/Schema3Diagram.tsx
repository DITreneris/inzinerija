/**
 * Schema 3: LLM su RAG ir įrankiais.
 * React diagrama pagal SCHEME_AGENT: konstantos (§3.1), rodyklės kraštas į kraštą (§3.2).
 * Srautas: Įvestis (tekstas) → LLM → Išvestis; Tool Use → Generation, Retrieval → Duomenų bazė.
 */
import { useId } from 'react';

const VIEWBOX = '0 0 520 220';
const PAD = 0;
const INNER_W = 520;
const INNER_H = 220;

const TITLE_Y = 24;
const ROW_Y = 50;
const ROW_H = 44;
const BOX_W = 80;
const GAP_MAIN = 26;
const INPUT_X = 20;
const MODEL_X = INPUT_X + BOX_W + GAP_MAIN;
const OUTPUT_X = MODEL_X + BOX_W + GAP_MAIN;

const INPUT_CX = INPUT_X + BOX_W / 2;
const MODEL_CX = MODEL_X + BOX_W / 2;
const OUTPUT_CX = OUTPUT_X + BOX_W / 2;
const ROW_CY = ROW_Y + ROW_H / 2;
const ARROW_MARKER_LEN = 6;

const BRANCH_Y_START = ROW_Y + ROW_H;
const GAP_BRANCH = 18;
const GEN_RETR_BOX_Y = BRANCH_Y_START + GAP_BRANCH;
const GEN_BOX_W = 70;
const GEN_BOX_H = 36;
const RETR_BOX_W = 70;
const RETR_BOX_H = 36;
const GEN_BOX_X = MODEL_X - GEN_BOX_W - 5;
const RETR_BOX_X = MODEL_X + 5;
const BRANCH_LABEL_Y = BRANCH_Y_START + 8;
const DB_BOX_Y = GEN_RETR_BOX_Y + RETR_BOX_H + 18;
const DB_BOX_W = 80;
const DB_BOX_H = 32;
const DB_BOX_X = RETR_BOX_X + (RETR_BOX_W - DB_BOX_W) / 2;
const RETR_CX = RETR_BOX_X + RETR_BOX_W / 2;
const DB_CX = DB_BOX_X + DB_BOX_W / 2;

const BRAND = '#334e68';
const BRAND_LIGHT = '#486581';
const BORDER = '#bcccdc';
const BG_LIGHT = '#f0f4f8';
const BG_LIGHT_END = '#f1f5f9';
const TEXT_DARK = '#102a43';
const STORAGE_FILL = '#64748b';
const STORAGE_STROKE = '#475569';

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";

export default function Schema3Diagram({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');

  return (
    <svg
      viewBox={VIEWBOX}
      className={`w-full max-w-2xl mx-auto block ${className}`}
      aria-labelledby={`schema3-title-${uid}`}
      role="img"
      aria-label="DI sistema su įrankiais ir atmintimi. Įvestis → DI → Išvestis; įrankių naudojimas, informacijos gavimas → duomenų bazė / saugykla"
    >
      <title id={`schema3-title-${uid}`}>
        DI sistema su įrankiais ir atmintimi. Įvestis → DI → Išvestis; įrankių naudojimas, informacijos gavimas → duomenų bazė / saugykla
      </title>
      <defs>
        <linearGradient id={`s3-bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={BG_LIGHT} />
          <stop offset="100%" stopColor={BG_LIGHT_END} />
        </linearGradient>
        <linearGradient id={`s3-step-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BRAND_LIGHT} />
          <stop offset="100%" stopColor={BRAND} />
        </linearGradient>
        <marker id={`s3-arrow-${uid}`} markerWidth="10" markerHeight="8" refX={ARROW_MARKER_LEN} refY="4" orient="auto">
          <path d="M0 0 L10 4 L0 8 Z" fill={BRAND} stroke={BRAND} strokeWidth="0.3" />
        </marker>
      </defs>
      <g transform={`translate(${PAD}, ${PAD})`}>
        <rect width={INNER_W} height={INNER_H} fill={`url(#s3-bg-${uid})`} rx="8" />
        <rect width={INNER_W} height={INNER_H} fill="none" stroke={BORDER} strokeWidth="1" rx="8" />
        <text x={INNER_W / 2} y={TITLE_Y} textAnchor="middle" fontFamily={FONT} fontSize="14" fontWeight="700" fill={TEXT_DARK}>
          DI sistema su įrankiais ir atmintimi
        </text>

        {/* Main: Įvestis → LLM → Išvestis */}
        <rect x={INPUT_X} y={ROW_Y} width={BOX_W} height={ROW_H} rx="8" fill={`url(#s3-step-${uid})`} stroke={BRAND} strokeWidth="1" />
        <text x={INPUT_CX} y={ROW_Y + 24} textAnchor="middle" fontFamily={FONT} fontSize="11" fontWeight="600" fill="white">Įvestis</text>
        <text x={INPUT_CX} y={ROW_Y + 38} textAnchor="middle" fontFamily={FONT} fontSize="9" fill="rgba(255,255,255,0.9)">(tekstas)</text>
        <line x1={INPUT_X + BOX_W} y1={ROW_CY} x2={MODEL_X - ARROW_MARKER_LEN} y2={ROW_CY} stroke={BRAND} strokeWidth="1.5" markerEnd={`url(#s3-arrow-${uid})`} />

        <rect x={MODEL_X} y={ROW_Y} width={BOX_W} height={ROW_H} rx="8" fill={`url(#s3-step-${uid})`} stroke={BRAND} strokeWidth="1" />
        <text x={MODEL_CX} y={ROW_CY + 5} textAnchor="middle" fontFamily={FONT} fontSize="12" fontWeight="700" fill="white">LLM</text>
        <line x1={MODEL_X + BOX_W} y1={ROW_CY} x2={OUTPUT_X - ARROW_MARKER_LEN} y2={ROW_CY} stroke={BRAND} strokeWidth="1.5" markerEnd={`url(#s3-arrow-${uid})`} />

        <rect x={OUTPUT_X} y={ROW_Y} width={BOX_W} height={ROW_H} rx="8" fill={`url(#s3-step-${uid})`} stroke={BRAND} strokeWidth="1" />
        <text x={OUTPUT_CX} y={ROW_CY + 5} textAnchor="middle" fontFamily={FONT} fontSize="11" fontWeight="600" fill="white">Išvestis</text>

        {/* Branch: Tool Use → Generation, Retrieval → Duomenų bazė (edge-to-edge) */}
        <line x1={MODEL_CX} y1={BRANCH_Y_START} x2={MODEL_CX} y2={GEN_RETR_BOX_Y - ARROW_MARKER_LEN} stroke={BRAND} strokeWidth="1.5" markerEnd={`url(#s3-arrow-${uid})`} />
        <text x={MODEL_CX} y={BRANCH_LABEL_Y} textAnchor="middle" fontFamily={FONT} fontSize="9" fill={BRAND}>Tool Use</text>
        <rect x={GEN_BOX_X} y={GEN_RETR_BOX_Y} width={GEN_BOX_W} height={GEN_BOX_H} rx="6" fill={BRAND_LIGHT} fillOpacity={0.9} stroke={BRAND} strokeWidth="1" />
        <text x={GEN_BOX_X + GEN_BOX_W / 2} y={GEN_RETR_BOX_Y + GEN_BOX_H / 2 + 5} textAnchor="middle" fontFamily={FONT} fontSize="10" fontWeight="600" fill="white">Generation</text>
        <rect x={RETR_BOX_X} y={GEN_RETR_BOX_Y} width={RETR_BOX_W} height={RETR_BOX_H} rx="6" fill={BRAND_LIGHT} fillOpacity={0.9} stroke={BRAND} strokeWidth="1" />
        <text x={RETR_CX} y={GEN_RETR_BOX_Y + RETR_BOX_H / 2 + 5} textAnchor="middle" fontFamily={FONT} fontSize="10" fontWeight="600" fill="white">Retrieval</text>
        <line x1={RETR_CX} y1={GEN_RETR_BOX_Y + RETR_BOX_H} x2={DB_CX} y2={DB_BOX_Y - ARROW_MARKER_LEN} stroke={BRAND} strokeWidth="1.5" markerEnd={`url(#s3-arrow-${uid})`} />
        <rect x={DB_BOX_X} y={DB_BOX_Y} width={DB_BOX_W} height={DB_BOX_H} rx="6" fill={STORAGE_FILL} stroke={STORAGE_STROKE} strokeWidth="1" />
        <text x={DB_CX} y={DB_BOX_Y + DB_BOX_H / 2 + 5} textAnchor="middle" fontFamily={FONT} fontSize="10" fontWeight="600" fill="white">Duomenų bazė</text>
      </g>
    </svg>
  );
}
