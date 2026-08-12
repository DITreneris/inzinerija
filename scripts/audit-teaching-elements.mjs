#!/usr/bin/env node
/**
 * Teaching Elements Registry audit.
 * Inventories diagrams/labs/embeds/tables/slide-types from modules.json + diagramRenderers;
 * validates against docs/development/teaching-elements-overlay.json.
 *
 * Usage:
 *   node scripts/audit-teaching-elements.mjs
 *   node scripts/audit-teaching-elements.mjs --json
 *   node scripts/audit-teaching-elements.mjs --strict
 *   node scripts/audit-teaching-elements.mjs --write-skeleton
 *   node scripts/audit-teaching-elements.mjs --write-docs   (sync registry tables)
 *   node scripts/audit-teaching-elements.mjs --check-docs    (fail if tables stale)
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const modulesPath = join(root, 'src/data/modules.json');
const renderersPath = join(
  root,
  'src/components/slides/types/content/diagramRenderers.tsx'
);
const overlayPath = join(
  root,
  'docs/development/teaching-elements-overlay.json'
);
const registryPath = join(
  root,
  'docs/development/TEACHING_ELEMENTS_REGISTRY.md'
);

const args = new Set(process.argv.slice(2));
const wantJson = args.has('--json');
const strict = args.has('--strict');
const writeSkeleton = args.has('--write-skeleton');
const writeDocs = args.has('--write-docs');
const checkDocs = args.has('--check-docs');

const EMBED_KEYS = [
  'recognitionExercise',
  'interactivePipeline',
  'correctPromptPractice',
  'instructGptQuality',
  'briefCheckBlock',
  'preCopyCheckBlock',
];

/** Image keys that are labs (Shell = Ne), not process diagrams. */
const LAB_IMAGE_KEYS = new Set([
  'm4_prompt_mode_simulator',
  'm10_human_control_simulator',
  'm10_team_readiness_lab',
  'm10_agent_taxonomy',
  'm9_workflow_step_prompts',
  'm13_consistency_lab',
  'm16_direction_picker',
]);

const LEGACY_ALIASES = new Set(['da_pipeline_6', 'da_bi_schema_4']);

const OFF_RENDERER = [
  {
    elementId: 'off:workflow-comparison',
    kind: 'off-renderer',
    key: 'workflow-comparison',
    moduleId: 1,
    slideId: 15,
    title: 'Workflow Samprata',
    render: 'WorkflowSummarySlide → WorkflowComparisonInteractiveBlock',
  },
  {
    elementId: 'off:pipeline-context-engineering',
    kind: 'off-renderer',
    key: 'pipelineDiagram:context-engineering',
    moduleId: 4,
    slideId: 45,
    title: 'Konteksto pipeline',
    render: 'ContentSlides → ContextEngineeringPipelineDiagram',
  },
  {
    elementId: 'off:hallucination-pipeline',
    kind: 'off-renderer',
    key: 'hallucination-pipeline',
    moduleId: 7,
    slideId: 67.7,
    title: 'Haliucinacijų pipeline',
    render: 'HallucinationPipelineSlide → HallucinationPipelineBlock',
  },
  {
    elementId: 'off:portal-beat',
    kind: 'off-renderer',
    key: 'portal-beat',
    moduleId: 4,
    slideId: 53.5,
    title: 'News portal editorial beats',
    render: 'NewsPortalInfographicSlide → PortalBeatDiagram',
  },
  {
    elementId: 'off:test-knowledge-scope',
    kind: 'off-renderer',
    key: 'TestKnowledgeScopeDiagram',
    moduleId: null,
    slideId: null,
    slides: [
      { moduleId: 8, slideId: 80 },
      { moduleId: 11, slideId: 110 },
      { moduleId: 14, slideId: 140 },
    ],
    title: 'Path Test scope chrome',
    render: 'TestPracticeSlides (test-intro) → TestKnowledgeScopeDiagram',
  },
];

const ORPHANED = [
  {
    elementId: 'orphaned:schema3',
    kind: 'orphaned',
    key: 'schema3',
    title: 'Schema3Interactive (archived)',
    render: 'Schema3InteractiveBlock (not wired)',
  },
  {
    elementId: 'orphaned:context-flow',
    kind: 'orphaned',
    key: 'context_flow',
    title: 'ContextFlow (removed from ContentSlides)',
    render: 'ContextFlowBlock (not wired)',
  },
];

function normalizeImageKey(image) {
  return String(image).replace(/^\//, '').toLowerCase().replace(/\.svg$/, '');
}

function parseRendererKeys(src) {
  const keys = [];
  const re = /key:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(src))) keys.push(m[1]);
  return keys;
}

function imageMatchesRenderer(normalized, rendererKey) {
  return (
    normalized === rendererKey ||
    normalized === `${rendererKey}.svg` ||
    normalized.endsWith(`/${rendererKey}`) ||
    normalized.endsWith(`/${rendererKey}.svg`)
  );
}

function findRendererKey(normalized, rendererKeys) {
  return rendererKeys.find((k) => imageMatchesRenderer(normalized, k)) ?? null;
}

function walkCollect(data) {
  const images = [];
  const questionImages = [];
  const embeds = [];
  const tables = [];
  const typeCounts = {};
  let totalSlides = 0;

  for (const mod of data.modules ?? []) {
    for (const slide of mod.slides ?? []) {
      totalSlides += 1;
      const t = slide.type ?? '(missing)';
      typeCounts[t] = (typeCounts[t] || 0) + 1;
      for (const question of slide.testQuestions ?? []) {
        if (typeof question?.imageKey === 'string' && question.imageKey) {
          questionImages.push({
            raw: question.imageKey,
            normalized: normalizeImageKey(question.imageKey),
            moduleId: mod.id,
            slideId: slide.id,
            questionId: question.id ?? '(missing)',
            title: slide.title,
          });
        }
      }
      const content = slide.content;
      if (!content || typeof content !== 'object') continue;

      for (const key of EMBED_KEYS) {
        if (content[key]) {
          embeds.push({
            elementId: `embed:${key}:m${mod.id}:${slide.id}`,
            kind: 'embed',
            key,
            moduleId: mod.id,
            slideId: slide.id,
            title: slide.title,
          });
        }
      }

      for (const [index, section] of (content.sections ?? []).entries()) {
        if (section?.image) {
          const raw = section.image;
          const normalized = normalizeImageKey(raw);
          images.push({
            raw,
            normalized,
            moduleId: mod.id,
            slideId: slide.id,
            title: slide.title,
            sectionIndex: index,
          });
        }
        if (section?.toolChoiceBar) {
          embeds.push({
            elementId: `embed:toolChoiceBar:m${mod.id}:${slide.id}:s${index}`,
            kind: 'embed',
            key: `sections[${index}].toolChoiceBar`,
            moduleId: mod.id,
            slideId: slide.id,
            title: slide.title,
          });
        }
        if (section?.table && typeof section.table === 'object') {
          tables.push({
            elementId: `table:m${mod.id}:${slide.id}:s${index}`,
            kind: 'table',
            key: 'section.table',
            moduleId: mod.id,
            slideId: slide.id,
            title: slide.title,
            comparisonStyle: Boolean(section.table.comparisonStyle),
            heading: section.heading ?? '',
          });
        }
      }

      if (content.pipelineDiagram) {
        embeds.push({
          elementId: `embed:pipelineDiagram:m${mod.id}:${slide.id}`,
          kind: 'embed',
          key: `pipelineDiagram:${content.pipelineDiagram}`,
          moduleId: mod.id,
          slideId: slide.id,
          title: slide.title,
        });
      }
      if (content.presentationToolsBlock || content.sections?.some((s) => s?.presentationToolsBlock)) {
        const has = content.sections?.some((s) => s?.presentationToolsBlock);
        if (has || content.presentationToolsBlock) {
          embeds.push({
            elementId: `embed:presentationToolsBlock:m${mod.id}:${slide.id}`,
            kind: 'embed',
            key: 'presentationToolsBlock',
            moduleId: mod.id,
            slideId: slide.id,
            title: slide.title,
          });
        }
      }
    }
  }

  return { images, questionImages, embeds, tables, typeCounts, totalSlides };
}

function buildInventory(data, rendererKeys) {
  const { images, questionImages, embeds, tables, typeCounts, totalSlides } =
    walkCollect(data);
  const elements = [];

  const uniqueNorm = new Map();
  for (const img of images) {
    if (!uniqueNorm.has(img.normalized)) {
      uniqueNorm.set(img.normalized, img);
    }
  }

  for (const [normalized, img] of uniqueNorm) {
    const rendererKey = findRendererKey(normalized, rendererKeys);
    const isLab = LAB_IMAGE_KEYS.has(rendererKey ?? normalized);
    const kind = isLab ? 'lab' : 'diagram';
    const key = rendererKey ?? normalized;
    elements.push({
      elementId: `${kind}:${key}`,
      kind,
      key,
      moduleId: img.moduleId,
      slideId: img.slideId,
      title: img.title,
      rawImage: img.raw,
      rendererKey,
    });
  }

  for (const alias of LEGACY_ALIASES) {
    if (rendererKeys.includes(alias)) {
      elements.push({
        elementId: `renderer-alias:${alias}`,
        kind: 'renderer-alias',
        key: alias,
        title: `Legacy alias (${alias})`,
        rendererKey: alias,
      });
    }
  }

  for (const row of OFF_RENDERER) elements.push({ ...row });
  for (const row of ORPHANED) elements.push({ ...row });
  for (const row of embeds) elements.push(row);
  for (const row of tables) elements.push(row);

  for (const [type, count] of Object.entries(typeCounts).sort()) {
    elements.push({
      elementId: `slide-type:${type}`,
      kind: 'slide-type',
      key: type,
      count,
      title: `SlideType ${type}`,
    });
  }

  // Unused union members (documented)
  for (const unused of ['intro', 'pie-chart', 'ai-workflow', 'module-intro']) {
    if (!typeCounts[unused]) {
      elements.push({
        elementId: `slide-type:${unused}`,
        kind: 'slide-type',
        key: unused,
        count: 0,
        title: `SlideType ${unused} (unused)`,
        unused: true,
      });
    }
  }

  return {
    generatedAt: new Date().toISOString().slice(0, 10),
    totals: {
      totalSlides,
      uniqueImages: uniqueNorm.size,
      imageFields: images.length,
      rendererKeys: rendererKeys.length,
      embeds: embeds.length,
      tables: tables.length,
      tableSlides: new Set(tables.map((t) => `${t.moduleId}:${t.slideId}`)).size,
      offRenderer: OFF_RENDERER.length,
      orphaned: ORPHANED.length,
      labs: elements.filter((e) => e.kind === 'lab').length,
      slideTypesUsed: Object.keys(typeCounts).length,
    },
    typeCounts,
    elements,
    unmatchedImages: images.filter(
      (img) => !findRendererKey(img.normalized, rendererKeys)
    ),
    unmatchedQuestionImages: questionImages.filter(
      (img) => !findRendererKey(img.normalized, rendererKeys)
    ),
  };
}

function defaultOverlayEntry(el) {
  const base = {
    elementId: el.elementId,
    kind: el.kind,
    key: el.key,
    pattern: el.kind === 'lab' ? 'interactive-control-lab' : null,
    shell:
      el.kind === 'lab'
        ? 'Ne'
        : el.kind === 'diagram'
          ? null
          : 'n/a',
    render: el.render ?? el.rendererKey ?? null,
    layoutSot: null,
    contentSot: null,
    maturity: el.kind === 'orphaned' || el.kind === 'renderer-alias' ? 1 : 0,
    owner:
      el.kind === 'diagram' || el.kind === 'lab' || el.kind === 'off-renderer'
        ? 'SCHEME'
        : el.kind === 'embed' || el.kind === 'table'
          ? 'CONTENT'
          : el.kind === 'slide-type'
            ? 'CURRICULUM'
            : 'QA',
    notes: el.title ?? '',
    moduleId: el.moduleId ?? null,
    slideId: el.slideId ?? null,
  };
  return base;
}

function loadOverlay() {
  if (!existsSync(overlayPath)) return null;
  return JSON.parse(readFileSync(overlayPath, 'utf8'));
}

function validate(inventory, overlay) {
  const errors = [];
  const warnings = [];

  if (!overlay) {
    errors.push('Missing teaching-elements-overlay.json');
    return { errors, warnings };
  }

  const byId = new Map((overlay.elements ?? []).map((e) => [e.elementId, e]));
  const invIds = new Set(inventory.elements.map((e) => e.elementId));

  for (const el of inventory.elements) {
    if (!byId.has(el.elementId)) {
      errors.push(`Overlay missing: ${el.elementId}`);
    }
  }
  for (const id of byId.keys()) {
    if (!invIds.has(id)) {
      warnings.push(`Overlay orphan (not in inventory): ${id}`);
    }
  }

  if (inventory.unmatchedImages.length) {
    for (const img of inventory.unmatchedImages) {
      errors.push(
        `Image without renderer: M${img.moduleId}/${img.slideId} "${img.raw}"`
      );
    }
  }
  if (inventory.unmatchedQuestionImages.length) {
    for (const img of inventory.unmatchedQuestionImages) {
      errors.push(
        `Question imageKey without renderer: M${img.moduleId}/${img.slideId} ${img.questionId} "${img.raw}"`
      );
    }
  }

  if (strict) {
    for (const el of inventory.elements) {
      if (el.kind !== 'diagram' && el.kind !== 'lab' && el.kind !== 'off-renderer') {
        continue;
      }
      const ov = byId.get(el.elementId);
      if (!ov) continue;
      if (ov.pattern == null || ov.pattern === '') {
        errors.push(`Strict: missing pattern on ${el.elementId}`);
      }
      if (ov.shell == null || ov.shell === '') {
        errors.push(`Strict: missing shell on ${el.elementId}`);
      }
      if (ov.maturity == null || Number.isNaN(Number(ov.maturity))) {
        errors.push(`Strict: missing maturity on ${el.elementId}`);
      }
    }
  }

  return { errors, warnings };
}

/** Registry lentelių eiliškumas – kaip TE-4 scorecard istoriškai. */
const KIND_ORDER = [
  'diagram',
  'embed',
  'lab',
  'off-renderer',
  'orphaned',
  'renderer-alias',
  'slide-type',
  'table',
];

/** Kind'ai, kuriems maturity ≤1 yra P0 (mokymo interaktyvo šerdis). */
const P0_KINDS = new Set(['diagram', 'lab', 'off-renderer']);

/**
 * Markdown lentelė prettier formatu (padding iki stulpelio pločio, `---:`
 * dešinei lygiuotei). Būtina: lint-staged leidžia docs per prettier, tai
 * nesutampantis formatavimas iškart taptų „stale“ klaida.
 */
function mdTable(headers, rows, aligns) {
  const all = [headers, ...rows];
  const widths = headers.map((_, c) =>
    Math.max(3, ...all.map((row) => [...String(row[c] ?? '')].length))
  );
  const line = (row) =>
    `| ${row
      .map((cell, c) => {
        const text = String(cell ?? '');
        const pad = ' '.repeat(widths[c] - [...text].length);
        return aligns[c] === 'right' ? `${pad}${text}` : `${text}${pad}`;
      })
      .join(' | ')} |`;
  const delimiter = `| ${widths
    .map((w, c) => (aligns[c] === 'right' ? `${'-'.repeat(w - 1)}:` : '-'.repeat(w)))
    .join(' | ')} |`;
  return [line(headers), delimiter, ...rows.map(line)].join('\n');
}

function buildScorecard(inventory, overlay) {
  const maturityById = new Map(
    (overlay?.elements ?? []).map((e) => [e.elementId, e.maturity])
  );
  const byKind = new Map();
  for (const el of inventory.elements) {
    if (!byKind.has(el.kind)) byKind.set(el.kind, []);
    byKind.get(el.kind).push(el);
  }
  const rank = (kind) => {
    const i = KIND_ORDER.indexOf(kind);
    return i < 0 ? KIND_ORDER.length : i;
  };
  const rows = [];
  const p0 = [];
  for (const kind of [...byKind.keys()].sort(
    (a, b) => rank(a) - rank(b) || a.localeCompare(b)
  )) {
    const els = byKind.get(kind);
    const scores = els.map((el) => Number(maturityById.get(el.elementId) ?? 0));
    const avg = scores.reduce((sum, v) => sum + v, 0) / scores.length;
    rows.push([
      `\`${kind}\``,
      String(els.length),
      avg.toFixed(2),
      String(scores.filter((v) => v <= 1).length),
    ]);
    if (!P0_KINDS.has(kind)) continue;
    for (const el of els) {
      if (Number(maturityById.get(el.elementId) ?? 0) <= 1) p0.push(el.elementId);
    }
  }
  return { rows, p0 };
}

function buildDocBlocks(inventory, overlay) {
  const t = inventory.totals;
  const baseline = mdTable(
    ['Bucket', 'N'],
    [
      ['Skaidrės', String(t.totalSlides)],
      ['Naudoti SlideType', String(t.slideTypesUsed)],
      ['Live `sections[].image` unique', String(t.uniqueImages)],
      ['Live `sections[].image` fields', String(t.imageFields)],
      ['`diagramRenderers` keys', String(t.rendererKeys)],
      ['Off-renderer live šeimos', String(t.offRenderer)],
      ['Orphaned', String(t.orphaned)],
      ['ChoiceControl labai (audit)', String(t.labs)],
      ['Embed katalogas', String(t.embeds)],
      ['`section.table`', `${t.tables} / ${t.tableSlides} skaidrių`],
      [
        'Inventory / overlay elements',
        `${inventory.elements.length} / ${overlay?.elements?.length ?? 0}`,
      ],
    ],
    ['left', 'right']
  );

  const { rows, p0 } = buildScorecard(inventory, overlay);
  const scorecard = [
    mdTable(
      ['Kind', 'N', 'Avg maturity', 'Maturity ≤1'],
      rows,
      ['left', 'right', 'right', 'right']
    ),
    '',
    `**P0 (diagram/lab/off-renderer, maturity ≤1):** ${
      p0.length ? p0.map((id) => `\`${id}\``).join(', ') : '_nėra_'
    }.`,
  ].join('\n');

  return {
    'te-baseline': [
      baseline,
      '',
      `_Šaltinis: \`modules.json\` + \`diagramRenderers\`; overlay \`updatedAt\`: **${
        overlay?.updatedAt ?? 'n/a'
      }**._`,
    ].join('\n'),
    'te-scorecard': scorecard,
  };
}

function replaceAutoBlock(src, name, body) {
  const start = `<!-- AUTO:${name}:start -->`;
  const end = `<!-- AUTO:${name}:end -->`;
  const from = src.indexOf(start);
  const to = src.indexOf(end);
  if (from < 0 || to < 0 || to < from) return null;
  return `${src.slice(0, from + start.length)}\n\n${body}\n\n${src.slice(to)}`;
}

/**
 * Sinchronizuoja registry skaitines sekcijas su live inventory.
 * Grąžina, kurios sekcijos pasenusios (`stale`) ir kurių markerių nėra.
 */
function syncRegistryDocs(inventory, overlay) {
  const original = readFileSync(registryPath, 'utf8').replace(/\r\n/g, '\n');
  const blocks = buildDocBlocks(inventory, overlay);
  const missing = [];
  const stale = [];
  let next = original;

  for (const [name, body] of Object.entries(blocks)) {
    const applied = replaceAutoBlock(next, name, body);
    if (applied == null) {
      missing.push(name);
      continue;
    }
    if (applied !== next) stale.push(name);
    next = applied;
  }

  return { original, next, missing, stale };
}

function main() {
  const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
  const rendererSrc = readFileSync(renderersPath, 'utf8');
  const rendererKeys = parseRendererKeys(rendererSrc);
  const inventory = buildInventory(data, rendererKeys);

  if (writeSkeleton) {
    const existing = loadOverlay();
    const existingById = new Map(
      (existing?.elements ?? []).map((e) => [e.elementId, e])
    );
    const elements = inventory.elements.map((el) => {
      const prev = existingById.get(el.elementId);
      if (prev) {
        return {
          ...defaultOverlayEntry(el),
          ...prev,
          elementId: el.elementId,
          kind: el.kind,
          key: el.key,
          moduleId: el.moduleId ?? prev.moduleId ?? null,
          slideId: el.slideId ?? prev.slideId ?? null,
        };
      }
      return defaultOverlayEntry(el);
    });
    const out = {
      $schema: './teaching-elements-overlay.schema.json',
      version: '1.0.0',
      updatedAt: inventory.generatedAt,
      description:
        'Curated Pattern / Shell / maturity for Teaching Elements Registry. Inventory source: audit-teaching-elements.mjs',
      elements,
    };
    writeFileSync(overlayPath, `${JSON.stringify(out, null, 2)}\n`, 'utf8');
    console.log(`Wrote skeleton: ${overlayPath} (${elements.length} elements)`);
  }

  const overlay = loadOverlay();
  const { errors, warnings } = validate(inventory, overlay);

  if (writeDocs || checkDocs) {
    const { original, next, missing, stale } = syncRegistryDocs(
      inventory,
      overlay
    );
    for (const name of missing) {
      errors.push(
        `Registry marker missing: <!-- AUTO:${name}:start --> / :end in TEACHING_ELEMENTS_REGISTRY.md`
      );
    }
    if (writeDocs) {
      if (next !== original) writeFileSync(registryPath, next, 'utf8');
      console.log(
        next === original
          ? 'Registry docs already in sync'
          : `Registry docs updated: ${stale.join(', ')}`
      );
    } else if (stale.length) {
      errors.push(
        `Registry numbers stale (${stale.join(', ')}) – run \`npm run audit:teaching-elements:docs\``
      );
    }
  }

  if (wantJson) {
    console.log(
      JSON.stringify(
        {
          ...inventory,
          validation: { errors, warnings, strict },
          overlayCount: overlay?.elements?.length ?? 0,
        },
        null,
        2
      )
    );
  } else {
    console.log('Teaching Elements audit');
    console.log(`  date: ${inventory.generatedAt}`);
    console.log(`  slides: ${inventory.totals.totalSlides}`);
    console.log(`  unique images: ${inventory.totals.uniqueImages}`);
    console.log(`  image fields: ${inventory.totals.imageFields}`);
    console.log(`  renderer keys: ${inventory.totals.rendererKeys}`);
    console.log(`  labs: ${inventory.totals.labs}`);
    console.log(`  embeds: ${inventory.totals.embeds}`);
    console.log(`  tables: ${inventory.totals.tables} (${inventory.totals.tableSlides} slides)`);
    console.log(`  off-renderer: ${inventory.totals.offRenderer}`);
    console.log(`  orphaned: ${inventory.totals.orphaned}`);
    console.log(`  slide types used: ${inventory.totals.slideTypesUsed}`);
    console.log(`  inventory elements: ${inventory.elements.length}`);
    console.log(`  overlay elements: ${overlay?.elements?.length ?? 0}`);
    if (warnings.length) {
      console.log(`\nWarnings (${warnings.length}):`);
      for (const w of warnings.slice(0, 40)) console.log(`  - ${w}`);
      if (warnings.length > 40) console.log(`  … +${warnings.length - 40}`);
    }
    if (errors.length) {
      console.log(`\nErrors (${errors.length}):`);
      for (const e of errors.slice(0, 60)) console.log(`  - ${e}`);
      if (errors.length > 60) console.log(`  … +${errors.length - 60}`);
    } else {
      console.log('\nOK: inventory ↔ overlay aligned' + (strict ? ' (strict)' : ''));
    }
  }

  if (errors.length) process.exit(1);
}

main();
