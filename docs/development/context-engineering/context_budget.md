# Context budget (agents)

> **Purpose:** Keep agent context small and high-signal. Avoid lost-in-the-middle and unnecessary token load.  
> **When to read:** When opening many docs for one task; when adding new SOT or rules.

---

## 0. Valdymo dokumentų hierarchija

Ką skaityti pirmiausia ir kaip laikytis tokenų biudžeto:

1. **Visada (alwaysApply):** `.cursor/rules/agent-orchestrator.mdc` – router, SOT lentelė, pipeline, kokybės vartai.
2. **Pilna orkestruotė:** `docs/development/AGENT_ORCHESTRATOR.md` – router + SOT + mišri užduotis + sutrumpinti agentų nuorodos.
3. **Konteksto biudžetas:** `docs/development/context-engineering/context_budget.md` – kada ką krauti, max dydžiai, load-only-when.
4. **Registras:** `docs/development/context-engineering/sot_index.json` – moduliai, SOT keliai, gating, nextStep.

**Pastaba:** Dabartinis produktas = 6 moduliai; sot_index.json registry palaiko 7–9 (ateities plėtra).

---

## 1. Principles

- **Context is finite.** Prefer loading only what the current task needs.
- **Critical info at edges.** Put summary and "what to do next" at top or bottom of documents; long detail in the middle gets less attention.
- **Progressive disclosure.** Load index/descriptions first; full content only when the task scope matches (e.g. "editing Modulio 4" → then load `turinio_pletra_moduliai_4_5_6.md`).

---

## 2. Size guidance (approximate)

| Document type | Soft max | Load only when |
|---------------|----------|----------------|
| Single SOT (e.g. turinio_pletra.md section) | ~500 lines per "section" | Task touches that module (1–3 vs 4–6). |
| Agent rule (e.g. .cursor/rules) | ~500 lines per rule | Rule description matches task. |
| sot_index.json | Small (registry only) | Any task about modules/slides/routing. |
| CONTENT_MODULIU_ATPAZINIMAS | Reference | Task involves "Modulis X" or skaidrė numbering. |

---

## 3. Load-only-when triggers

| Trigger | Load |
|---------|------|
| "Which file owns module N?" | sot_index.json (or orchestrator SOT table). |
| "Edit content for Moduliai 1–3" | turinio_pletra.md (or relevant section). |
| "Edit content for Moduliai 4–6" | docs/turinio_pletra_moduliai_4_5_6.md. |
| "Change JSON (slides, glossary)" | src/data/modules.json (or promptLibrary, glossary) + schema. |
| "Modulis vs skaidrė numbering" | docs/CONTENT_MODULIU_ATPAZINIMAS.md. |
| "Summary slide practices" | .cursor/rules/content-agent-summary-slide.mdc. |

---

## 4. Compaction / masking (for long sessions)

- **Trigger:** When total context (e.g. multiple large files opened) would exceed ~70% of a typical working context, prefer:
  - Loading one SOT at a time by module, or
  - Returning **path + 2–3 line summary** instead of full file content when the agent only needs to "know it exists" or "decide next step."
- **Do not** compress the orchestrator SOT table or the sot_index; keep them always available as the spine.

---

## 5. Placement checklist (for doc authors)

- [ ] Top of doc: short summary or "What this file is" + key decisions (if any).
- [ ] Bottom of doc: "Next steps" or "Done criteria" or link to related doc.
- [ ] Long lists or deep detail: in the middle; consider splitting into references/ or linked files if > ~500 lines.
