import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const allSlidesPath = path.join(root, 'src/components/slides/types/AllSlides.tsx');

const content = fs.readFileSync(allSlidesPath, 'utf8');
const lines = content.split(/\r?\n/);

const startIdx = lines.findIndex((l) => l.startsWith('export function TestIntroSlide({ slide: _slide, moduleId }'));
const endIdx = lines.findIndex((l) => l.startsWith('export function ProductivityInfographicSlide'));
if (startIdx === -1 || endIdx === -1) {
  console.error('Start or end not found', { startIdx, endIdx });
  process.exit(1);
}

const reExport = "export { TestIntroSlide, TestSectionSlide, TestResultsSlide, PracticeIntroSlide, PracticeScenarioSlide } from './TestPracticeSlides';";
const newLines = [...lines.slice(0, startIdx), '', reExport, '', ...lines.slice(endIdx)];
fs.writeFileSync(allSlidesPath, newLines.join('\n'), 'utf8');
console.log('AllSlides.tsx patched: removed lines', startIdx + 1, '-', endIdx, ', added re-export. New total lines:', newLines.length);