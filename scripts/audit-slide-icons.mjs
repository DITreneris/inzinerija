#!/usr/bin/env node
/**
 * Slide icon audit – validates Lucide icon keys in modules.json per slide type.
 * SOT allowlists: src/icons/types.ts (MODULE_ICONS, JOURNEY_ICONS, etc.)
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const modulesPath = join(root, 'src/data/modules.json');

const JOURNEY_ICONS = new Set([
  'TrendingUp',
  'Image',
  'Cpu',
  'Users',
  'Briefcase',
  'Compass',
  'Sparkles',
  'Database',
]);

const INTRO_PIE_ICONS = new Set([
  'Pen',
  'Wrench',
  'Search',
  'Code',
  'Image',
  'HelpCircle',
  'Brain',
  'Target',
  'Database',
  'BarChart3',
  'Workflow',
]);

const SUMMARY_ICONS = new Set([
  'Layers',
  'Workflow',
  'Repeat',
  'Lightbulb',
  'ArrowRight',
  'Target',
  'Sparkles',
  'Zap',
  'Compass',
  'Image',
  'Video',
  'Music',
  'Briefcase',
  'Users',
]);

const ASPECT_ICONS = new Set([
  'MessageCircle',
  'Languages',
  'Lightbulb',
  'Target',
  'Layers',
  'Repeat',
]);

const PORTAL_KPI_KEYS = new Set([
  'globe',
  'trending-up',
  'building-2',
  'map-pin',
]);

const PORTAL_TOOL_KEYS = new Set([
  'shield',
  'message-circle',
  'bot',
  'search',
]);

const SCENARIO_HUB_ICONS = new Set([
  'User',
  'Users',
  'Briefcase',
  'Bot',
  'BarChart3',
  'Image',
]);

const INFOGRAPHIC_ICONS = new Set([
  'Pen',
  'Code',
  'Headphones',
  'Search',
  'Megaphone',
  'Wrench',
  'Zap',
  'Users',
  'Target',
  'BarChart3',
  'Database',
  'Link',
  'ClipboardList',
  'Bot',
  'Key',
]);

function auditInfographicContent(content, slideLabel, errors, warnings) {
  for (const card of content.cards ?? []) {
    auditIcon(
      card.icon,
      INFOGRAPHIC_ICONS,
      `${slideLabel} cards`,
      errors,
      warnings
    );
  }
  for (const card of content.paradoxCards ?? []) {
    auditIcon(
      card.icon,
      INFOGRAPHIC_ICONS,
      `${slideLabel} paradoxCards`,
      errors,
      warnings
    );
  }
  for (const step of content.solutionSection?.pipeline ?? []) {
    auditIcon(
      step.icon,
      INFOGRAPHIC_ICONS,
      `${slideLabel} pipeline`,
      errors,
      warnings
    );
  }
  if (content.conclusionSection?.icon) {
    auditIcon(
      content.conclusionSection.icon,
      INFOGRAPHIC_ICONS,
      `${slideLabel} conclusionSection`,
      errors,
      warnings
    );
  }
  for (const ex of content.examples ?? []) {
    auditIcon(
      ex.icon,
      INFOGRAPHIC_ICONS,
      `${slideLabel} examples`,
      errors,
      warnings
    );
  }
}

function isEmoji(key) {
  return /^[\p{Extended_Pictographic}]/u.test(key);
}

function isLucidePascalCase(key) {
  return /^[A-Z][A-Za-z0-9]*$/.test(key);
}

function auditIcon(key, allowlist, label, errors, warnings) {
  if (!key || typeof key !== 'string') return;
  if (isEmoji(key)) {
    warnings.push(`${label}: legacy emoji "${key}" (P2 migration)`);
    return;
  }
  if (!allowlist.has(key)) {
    errors.push(`${label}: unknown icon key "${key}"`);
  }
}

function walkNewsPortal(content, slideLabel, errors, warnings) {
  const cards = content?.kpiCards ?? content?.cards ?? [];
  for (const card of cards) {
    if (card.iconKey) {
      auditIcon(
        card.iconKey,
        PORTAL_KPI_KEYS,
        `${slideLabel} kpi.iconKey`,
        errors,
        warnings
      );
    }
  }
  const tools = content?.tools ?? content?.toolCards ?? [];
  for (const tool of tools) {
    if (tool.iconKey) {
      auditIcon(
        tool.iconKey,
        PORTAL_TOOL_KEYS,
        `${slideLabel} tool.iconKey`,
        errors,
        warnings
      );
    }
  }
}

function main() {
  const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
  const modules = data.modules ?? [];
  const errors = [];
  const warnings = [];

  for (const mod of modules) {
    for (const slide of mod.slides ?? []) {
      const label = `M${mod.id} slide ${slide.id} (${slide.type})`;
      const content = slide.content ?? {};

      switch (slide.type) {
        case 'action-intro-journey':
          for (const choice of content.journeyChoices ?? []) {
            auditIcon(
              choice.icon,
              JOURNEY_ICONS,
              `${label} journeyChoices`,
              errors,
              warnings
            );
          }
          break;
        case 'intro-action-pie':
          for (const card of content.cards ?? []) {
            auditIcon(
              card.icon,
              INTRO_PIE_ICONS,
              `${label} cards`,
              errors,
              warnings
            );
          }
          break;
        case 'summary':
          for (const section of content.sections ?? []) {
            auditIcon(
              section.icon,
              SUMMARY_ICONS,
              `${label} sections`,
              errors,
              warnings
            );
          }
          break;
        case 'definitions':
          for (const aspect of content.aspects ?? []) {
            auditIcon(
              aspect.icon,
              ASPECT_ICONS,
              `${label} aspects`,
              errors,
              warnings
            );
          }
          break;
        case 'practice-scenario-hub':
          for (const choice of content.level1Choices ?? []) {
            if (choice.icon) {
              auditIcon(
                choice.icon,
                SCENARIO_HUB_ICONS,
                `${label} level1Choices`,
                errors,
                warnings
              );
            }
          }
          break;
        case 'news-portal':
          walkNewsPortal(content, label, errors, warnings);
          break;
        case 'infographic':
        case 'productivity-infographic':
        case 'di-paradox':
        case 'advanced':
          auditInfographicContent(content, label, errors, warnings);
          break;
        default:
          break;
      }
    }
  }

  console.log('\n=== Slide Icon Audit ===');
  console.log(`Modules scanned: ${modules.length}`);
  if (warnings.length > 0) {
    console.log(`Warnings (${warnings.length}):`);
    for (const w of warnings.slice(0, 20)) console.warn(`  - ${w}`);
    if (warnings.length > 20) {
      console.warn(`  ... and ${warnings.length - 20} more warnings`);
    }
  }
  if (errors.length === 0) {
    console.log('All slide Lucide icon keys are valid.');
    process.exit(0);
  }
  console.error(`FAIL: ${errors.length} issue(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

main();
