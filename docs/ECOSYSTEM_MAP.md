# Ekosistemos žemėlapis — mokymo app (M1–12)

> **Tikslas:** Viena vieta susieti Prompt Anatomy ekosistemą su moduliais, CTA vietomis ir analytics.  
> **Brand SOT:** [DITreneris/site `primal_concept.txt`](https://github.com/DITreneris/site/blob/main/primal_concept.txt)  
> **Kodo SOT:** [`src/constants/ecosystemUrls.ts`](../src/constants/ecosystemUrls.ts)  
> **Blog ↔ moduliai:** [`docs/development/BLOG_CURRICULUM_LINKS.yaml`](development/BLOG_CURRICULUM_LINKS.yaml)  
> **Atnaujinta:** 2026-06-30

---

## URL politika

| Paskirtis                               | Domenas                                                  |
| --------------------------------------- | -------------------------------------------------------- |
| Ekosistemos map, Anatomizer, SEO        | `promptanatomy.site`                                     |
| Hub, checkout, training (`/anatomija/`) | `promptanatomy.app`                                      |
| Spin-off kit'ai                         | `promptanatomy.{cloud,info,space,help,ceo,pro,blog,lol}` |

**Blog deep links:** `https://www.promptanatomy.blog/articles/{slug}/?utm_source=training&utm_medium=spinoff&utm_campaign=m{module}_{touchpoint}`

---

## Funnel taisyklės

| Vieta                      | Leidžiama                            | Draudžiama               |
| -------------------------- | ------------------------------------ | ------------------------ |
| AccessGate                 | pricing + optional Enter (cloud)     | pilnas 9 domenų map      |
| M1–M2 skaidrės viduje      | 0 outbound                           | spin-off                 |
| Section-break (M4+)        | 1 `spinoffCta` / skaidrė             | kelios outbound nuorodos |
| Test-results fail (`<70%`) | 1 Deepen (blog) + vidinė remediation | kelios outbound          |
| Module complete            | secondary links (terms stilius)      | primary CTA konkurencija |
| Footer                     | site map + Telegram + app            | —                        |

---

## Modulis ↔ fazė ↔ touchpoint (M1–M6)

| Modulis             | Fazė            | Domenas           | Vieta                             | URL                                 | `cta_id`                                        |
| ------------------- | --------------- | ----------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------- |
| Gate                | Hub + Enter     | app, cloud        | AccessGateScreen                  | `#pricing`, cloud                   | `pricing_click`, `spinoff_enter`                |
| M1                  | Enter           | cloud, anatomizer | ModuleCompleteScreen (secondary)  | cloud, site#anatomizer              | `spinoff_enter`, `spinoff_anatomizer`           |
| M2                  | Deepen          | blog              | QuizResultsView (score &lt; 70 %) | blog (homepage)                     | `spinoff_deepen`                                |
| M3                  | Use + Hub       | info, help, app   | ModuleComplete + upsell           | info, help, `#pricing`              | `spinoff_use`, `spinoff_hire`, `pricing_click`  |
| M4 §4.1 (40.5)      | Use             | info              | section-break                     | info `/lt/` \| `/en/`               | `spinoff_use`                                   |
| M4 §4.2 (52.5)      | Create          | space             | section-break                     | space `/lt/` \| `/en/`              | `spinoff_create`                                |
| M4 §4.4 (65.8)      | Deepen          | blog              | section-break                     | blog `/articles/rag-in-production/` | `spinoff_deepen`                                |
| M4 apžvalga (66.95) | Map             | site              | section-break                     | site#ecosystem                      | `spinoff_map`                                   |
| M5                  | Manage          | ceo               | TestResultsSlide (module 5)       | ceo                                 | `spinoff_manage`                                |
| M6                  | Decide + Play   | pro, lol, map     | ModuleCompleteScreen (secondary)  | pro, lol, site                      | `spinoff_decide`, `spinoff_play`, `spinoff_map` |
| Visi                | Map + community | site, Telegram    | App footer                        | site, t.me                          | `spinoff_map`                                   |

---

## Moduliai 7–12 (Duomenų analizės + Agentų keliai)

| Modulis | Vieta                  | Fazė                  | Blog slug / URL                                      | `cta_id`                                          |
| ------- | ---------------------- | --------------------- | ---------------------------------------------------- | ------------------------------------------------- |
| M7      | section-break `66.9`   | Deepen                | `grounding-ai-outputs`                               | `spinoff_deepen`                                  |
| M8      | test-results fail      | Deepen                | `rag-in-production`                                  | `spinoff_deepen`                                  |
| M9      | ModuleComplete         | Deepen + Decide + Map | `ai-workflow-canvas-template`, pro, site#ecosystem   | `spinoff_deepen`, `spinoff_decide`, `spinoff_map` |
| M10     | section-break `10.481` | Deepen                | `how-to-design-an-ai-agent-workflow`                 | `spinoff_deepen`                                  |
| M10     | section-break `10.151` | Deepen                | `choosing-workflow-automation-ai-pipelines`          | `spinoff_deepen`                                  |
| M10     | ModuleComplete         | Deepen + Map          | `agent-orchestrator-operating-model`, site#ecosystem | `spinoff_deepen`, `spinoff_map`                   |
| M11     | test-results fail      | Deepen                | `evaluating-agents-with-clear`                       | `spinoff_deepen`                                  |
| M12     | ModuleComplete         | Deepen + Manage + Map | `audit-trails-for-ai-workflows`, ceo, site#ecosystem | `spinoff_deepen`, `spinoff_manage`, `spinoff_map` |

**M7 complete:** sąmoningai be ecosystem bloko (vidurio kelio modulis, kaip M4).

Eventas: `cta_click` su `destination: 'spin-off'` → funnel `Spin_off_enter` ([ANALYTICS_EVENT_TAXONOMY.md](development/ANALYTICS_EVENT_TAXONOMY.md) §4).

---

## JSON authoring

`spinoffCta` — [`SectionBreakContent`](../src/types/modules.ts): M4 `40.5`, `52.5`, `65.8`, `66.95`; M7 `66.9`; M10 `10.481`, `10.151`.  
Redaguoti full SOT [`src/data/modules.json`](../src/data/modules.json) → corporate M7–9: `npm run generate:core-data` → `modules-m1-m9.json`. M10+ keitimai nereikalauja core profilio sync.

---

## Nuorodos

- Integracija su marketing repo: [deployment/INTEGRATION_OVERVIEW.md](deployment/INTEGRATION_OVERVIEW.md)
- GOLDEN_STANDARD §3.4b section-break spin-off
