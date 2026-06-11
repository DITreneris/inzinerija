# Context engineering artifacts

This folder holds **drop-in templates** for context engineering in the "Promptų anatomija" project, aligned with [Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) practices.

| File                  | Use when                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **context_budget.md** | Defining how much context agents load; when to load which SOT; placement of critical info.                                      |
| **sot_index.json**    | Registry of modules, SOT paths, public vs locked, next-step routing. Single place for "where is truth" and "what unlocks what." |
| **memory_schema.md**  | Deciding what to treat as session notes vs long-term (changelog, MEMORY.md, TEST_REPORT).                                       |
| **eval_rubric.md**    | Reviewing content/UX quality (CTA, tone, lietuviškos, links, module consistency); optional heuristics or LLM-as-judge.          |

**Related:** `../dod_01.md` – Definition of Done index (per-agent checkboxes, pipeline handoff, skill evolution). Agent skills (workflow + lessons): `.cursor/skills/README.md`.

**Orchestrator:** `.cursor/rules/agent-orchestrator.mdc` and `../AGENT_ORCHESTRATOR.md` reference SOT; for module/slide scope, prefer `sot_index.json` and load full SOT only when the task touches that module.

**Validating sot_index:** From repo root run `node scripts/validate-sot-index.mjs`. Checks: 6 modules present, `contentSOT` and `dataSOT` paths exist. **Rule:** Before editing a module's content, open sot_index; load full SOT (turinio_pletra\*.md) only when the task scope matches that module.
