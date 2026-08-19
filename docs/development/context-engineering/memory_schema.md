# Memory schema (session vs long-term)

> **Purpose:** Define what we treat as "session notes" vs "long-term memory" so we don’t over-build infra. No DB required for v0.1.

---

## 1. Layers (conventions only)

| Layer             | What it is                                                    | Where it lives                                                                | Retention                 |
| ----------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------- |
| **Working**       | Current task, last file opened, current plan                  | Agent context / scratch (e.g. current conversation)                           | Until session ends        |
| **Session notes** | Today’s decisions, "what we did this session," open questions | Optional: `docs/development/scratch/YYYY-MM-DD.md` or in chat                 | Session or a few days     |
| **Long-term**     | Release decisions, "why we chose X," patterns, release state  | `CHANGELOG.md`, `docs/development/MEMORY.md` or `release_notes/`, TEST_REPORT | Indefinite (repo history) |

---

## 2. What to write where

| Content                                              | Prefer                                                  |
| ---------------------------------------------------- | ------------------------------------------------------- |
| "We decided Modulio 4 skaidrė order is 4.1–4.7 only" | CONTENT_MODULIU_ATPAZINIMAS.md or MEMORY.md / changelog |
| "Current task: review MODULIO_4_TURINIO_PERZIURA"    | Session (scratch or chat); no need to persist           |
| "Release 2026-02-12: M4 lietuviškos, HomePage CTA"   | CHANGELOG.md; optional MEMORY.md bullet                 |
| Bugs / test failures                                 | docs/development/TEST_REPORT.md                         |
| User feedback and next actions                       | docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md                  |

---

## 3. What we do **not** store as "memory" (v0.1)

- User progress (stays in localStorage only; no server).
- Vector embeddings or semantic search (out of scope).
- Cross-session agent state (we have no persistent agent; each session is fresh).

---

## 4. Optional: one MEMORY.md

If the team wants a single "why we did X" file:

- **Path:** `docs/development/MEMORY.md`
- **Format:** Short bullets; date prefix optional. Example:
  - `2026-02-12: Modulio 4 skaidrės 4.1–4.7 only; Modulio 6 sections have no 4.x numbers (see CONTENT_MODULIU_ATPAZINIMAS).`
- **When to update:** After a non-obvious decision that future contributors (or agents) should know.
