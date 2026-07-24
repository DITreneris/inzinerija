# M4 sk. 53.5 – Editorial beat PNG (Satori) — ARCHIVE / optional asset gen

> **Statusas:** Production naudoja **React SVG** diagramas (`news-portal/beat-diagrams/`). Žr. `docs/development/NEWS_PORTAL_SLIDE_53_5.md`, `PORTAL_BEAT_DIAGRAMS.md`. Šis README – tik optional PNG generavimui (legacy / marketing asset pipeline).

Deterministic 16:9 editorial beat images for news-portal slide 53.5.

**Plan + OK/FAIL audit (archyvas):** `docs/archive/development/PORTAL_BEAT_SATORI_PLAN.md`  
**Sister repo reference:** [DITreneris/blog](https://github.com/DITreneris/blog) (`build:satori`, `generate_satori_images.mjs`)

## Setup (once)

```bash
npm install
npm run fonts:satori
```

## Generate

```bash
# All 3 beats → public/di_portal_meme_*.png
npm run generate:portal-beats

# Single beat (Windows: prefer node directly)
node scripts/generate-portal-beats.mjs --id lithuania-context

# Dry run
node scripts/generate-portal-beats.mjs --dry-run

# CI / pre-release check
node scripts/generate-portal-beats.mjs --check
```

## Edit content

1. Copy / stats: `data/satori/portal-beats.yaml`
2. Layout variants: `scripts/satori/templates/editorial-beat.mjs`
3. Brand tokens: `scripts/satori/brand.mjs` (sync with `tailwind.config.js`)

After YAML change, regenerate PNG and visually check M4 sk. 53.5.

## Target quality

| Metric     | Target                                   |
| ---------- | ---------------------------------------- |
| Size       | ≤150 KB per PNG                          |
| Dimensions | 1280×720 (16:9)                          |
| Brand      | `#627d98`, `#d4a520`, light portal shell |

## vs AI-generated placeholders

Previous AI memes were 1.5–2.6 MB each — too heavy for mobile scroll. Satori output is typically 40–120 KB with locked brand tokens.
