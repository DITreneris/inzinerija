# M13–M15 tobulinimo intake (2026-07)

> **Epic:** M13–15 authoring brandumas (I0–I5). Playbook = M10–12 (chrome → ranking → Top-5 → smoke).  
> **Ne scope:** pilnas production release (`TODO.md` §1.5 Deferred).  
> Live SOT: `docs/turinio_pletra_moduliai_13_14_15.md` + full `src/data/modules.json` (M13–15).  
> EN: `modules-en-m13-m15.json` via `npm run build:modules-en-m13-m15` (ne `generate:core-data`).

---

## 0. Darbo ciklas

| Fazė   | Ticket’ai           | Kas                                     |
| ------ | ------------------- | --------------------------------------- |
| **I0** | —                   | Ticket’ai + šis intake (be JSON)        |
| **I1** | M1315-F, M1315-T    | Footer numbers + `pipeline` title WARN  |
| **I2** | M1315-1             | Chrome brandumas (be curriculum ID UI)  |
| **I3** | M1315-R             | Ranking audit → Top 8 / Top 5 freeze    |
| **I4** | M1315-W1            | Top-5 density/cycle batch LT+EN         |
| **I5** | M1315-2, M1315-DIAG | Browser C1–C6 @375 + diagram light/dark |

**Taisyklės:**

1. Terminologija: **DI**; „promptas“; kreipinys **tu**.
2. M13–15 keitimai → tik `modules.json` + EN overlay; **ne** core `*-m1-m6` / `*-m1-m9`.
3. Be naujų lab / Feature Doc šiame epic’e.
4. Wishlist (ComfyUI / Zapier / hybrid B-roll) – out of scope.

### 0.1 Intake žurnalas (žinomi residual’ai)

| #   | Data       | Modulis / skaidrė | Tema                                          | Statusas                 |
| --- | ---------- | ----------------- | --------------------------------------------- | ------------------------ |
| 1   | 2026-07-28 | M13 pos 5+        | Footer `Toliau – skaidrė N` drift             | ✅ I1 M1315-F            |
| 2   | 2026-07-28 | `13.12`           | Title WARN: legacy `pipeline`                 | ✅ I1 M1315-T (grandinė) |
| 3   | 2026-07-28 | M14 `143`         | Title WARN: pipeline checklist                | ✅ I1 M1315-T            |
| 4   | 2026-07-28 | M13–15 chrome     | Curriculum ID scrub                           | ✅ I2 M1315-1            |
| 5   | 2026-07-28 | MUST stuburas     | ranking → Top-5                               | ✅ I3/I4                 |
| 6   | 2026-07-28 | Soft              | Optional handout body vs 2026 audio/video SOT | backlog (ne epic DoD)    |
| 7   | 2026-07-28 | C1–C6 + DIAG      | `smoke-diag1-m1315.mjs` 25/25                 | ✅ I5                    |

---

## 1. MUST stuburas (prioritetas ranking’ui)

| Tema        | ID(s)                                                    | Rolė                                    |
| ----------- | -------------------------------------------------------- | --------------------------------------- |
| Intro       | `130`, `13.1`                                            | action-intro + kampanijos A/E/C         |
| Pipeline    | `13.12`                                                  | Generatyvinės medijos grandinė (schema) |
| Consistency | `13.32`                                                  | Reference lock                          |
| Video       | `13.4`, `13.5`, `13.52`                                  | Storyboard / I2V / post-prod            |
| Audio       | `13.6`, `13.7`                                           | Audio-first + licencijos                |
| Provenance  | `13.101`                                                 | C2PA / disclosure                       |
| Workflow    | `13.11`                                                  | Verslo ciklas                           |
| M14 shell   | `140` → `140.5` → `141` → `142` (+ `143`)                | Path Test                               |
| M15         | MUST `150.5`; loop `150.25`; optional `151`–`154`; `158` | Practice                                |

---

## 2. Apimtis

- **38** skaidrės (M13=24, M14=5, M15=9).
- Schemos: `docs/development/DIAGRAMU_M13_M15_REGISTRY.md`.
- Rankinė PDF atmintinė: jau PASS (PDF-FIT-1).

---

## 3. Handoff

Po I0 → I1 (CONTENT/DATA). Po I3 Top-5 freeze → I4 batch. Po I4 → I5 smoke.
