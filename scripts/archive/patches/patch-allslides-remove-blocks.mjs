import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const allSlidesPath = path.join(root, 'src/components/slides/types/AllSlides.tsx');

const content = fs.readFileSync(allSlidesPath, 'utf8');
const lines = content.split(/\r?\n/);

const startIdx = lines.findIndex((l) => l.startsWith('export function MetaBlockSlide({ onRenderTask }'));
const endMarker = 'const DEFAULT_COMPARISON: ComparisonContent =';
const endIdx = lines.findIndex((l) => l.includes('const DEFAULT_COMPARISON'));
if (startIdx === -1 || endIdx === -1) {
  console.error('Start or end not found', { startIdx, endIdx });
  process.exit(1);
}

const reExport = "export { MetaBlockSlide, InputBlockSlide, OutputBlockSlide, ReasoningModelsSlide, ReasoningBlockSlide, QualityBlockSlide, AdvancedBlockSlide, AdvancedParameters2Slide, FullExampleSlide } from './BlockSlides';";
const newLines = [...lines.slice(0, startIdx), '', reExport, '', ...lines.slice(endIdx)];
fs.writeFileSync(allSlidesPath, newLines.join('\n'), 'utf8');
console.log('AllSlides.tsx patched: removed lines', startIdx + 1, '-', endIdx, ', added re-export. New total lines:', newLines.length);