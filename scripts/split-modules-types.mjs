/**
 * P2 #3 – split src/types/modules.ts into barrel + modules/*.ts
 * Run once: node scripts/split-modules-types.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcPath = join(root, 'src/types/modules.ts');
const outDir = join(root, 'src/types/modules');

const raw = readFileSync(srcPath, 'utf8');
if (raw.includes("export * from './modules/questions'")) {
  console.log('Already split – abort');
  process.exit(0);
}

const lines = raw.split(/\r?\n/);
const slice = (start, end) => lines.slice(start - 1, end).join('\n') + '\n';

mkdirSync(outDir, { recursive: true });

const questions =
  '// Question / scenario / practical-task types (split from modules.ts – P2 #3)\n' +
  slice(3, 107);

const shared =
  '// Shared slide/module helper types (split from modules.ts – P2 #3)\n' +
  slice(1531, lines.length);

const slides =
  `// Slide content + Slide (split from modules.ts – P2 #3)
import type {
  TestQuestion,
  Scenario,
  PracticalTask,
} from './questions';
import type {
  HierarchyContent,
  ComparisonContent,
  SummaryContent,
  PracticeSummaryContent,
} from './shared';

` + slice(109, 1441);

const moduleFile =
  `// Module + Quiz + ModulesData (split from modules.ts – P2 #3)
import type { Slide } from './slides';
import type { BusinessExample } from './shared';

` + slice(1443, 1529);

const barrel = `// TypeScript types for modules.json – barrel (P2 #3 S-R4 split).
// Public API unchanged: import from '../types/modules' or '@/types/modules'.

export * from './modules/questions';
export * from './modules/shared';
export * from './modules/slides';
export * from './modules/module';
`;

writeFileSync(join(outDir, 'questions.ts'), questions);
writeFileSync(join(outDir, 'shared.ts'), shared);
writeFileSync(join(outDir, 'slides.ts'), slides);
writeFileSync(join(outDir, 'module.ts'), moduleFile);
writeFileSync(srcPath, barrel);

console.log('Split OK', {
  questions: questions.split('\n').length,
  shared: shared.split('\n').length,
  slides: slides.split('\n').length,
  module: moduleFile.split('\n').length,
  backupNote: existsSync(srcPath) ? 'barrel written' : 'fail',
});
