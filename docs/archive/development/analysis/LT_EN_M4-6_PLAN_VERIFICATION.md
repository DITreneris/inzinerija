# LT→EN M4–6 planas: įgyvendinimo patikra

**Šaltinis:** Cursor plan (lokalus).  
**Data:** 2026-03-09

---

## 1. Failų strategija (§2) — ✅ Atlikta

| Reikalavimas | Būsena | Vieta |
|--------------|--------|-------|
| `modules-en.json` – tik M1–M3 | ✅ | `src/data/modules-en.json` |
| Naujas failas `modules-en-m4-m6.json` – tik M4, M5, M6 | ✅ | `src/data/modules-en-m4-m6.json` |
| Struktūra `{ "modules": [ modul4, modul5, modul6 ] }` | ✅ | Failas turi 3 modulius su `id`: 4, 5, 6 |

---

## 2. Loaderis (Block 0) — ✅ Atlikta

**Failas:** `src/data/modulesLoader.ts`

- Kai `locale === 'en'`:
  1. ✅ Merge iš `modules-en.json` → `modules[0]`, `modules[1]`, `modules[2]` (eil. 54–63).
  2. ✅ Įkelti `modules-en-m4-m6.json` ir perrašyti `modules[3]`, `modules[4]`, `modules[5]` (eil. 75–84).
- Sąlyga: `m46.length >= 3 && data.modules.length >= 6` — EN failas turi 3 elementus, LT `modules.json` turi 6 modulius.
- Fallback: jei EN M4–M6 failas neprieinamas, lieka LT turinys (eil. 85–87).

---

## 3. Turinys (Block 1–5) — ✅ Atlikta

- **modules-en-m4-m6.json:** M4, M5, M6 pilnai anglų kalba (meta, skaidrės, copyable, template, instructions).
- P3 ir P3.2 (ANALIZE_MODULIAI_4_5_6_KALBOS_MIKRO_AUDITAS §8–9) – pavieniai LT žodžiai ir ilgi copyable/template blokai išversti.

---

## 4. Glossary EN (Block 6) — ✅ Atlikta

- **glossary-en.json** turi terminus su `moduleId` 4, 5 ir 6 (daugiau nei 30 įrašų M4–M6).
- Loaderis: glossary naudojamas atskirai (ne modulesLoader); EN glossary naudojamas, kai locale EN.

---

## 5. Quiz EN (Block 7, optional) — ✅ Atlikta

- Planas: „ar modules-en... turi quiz key – nustatyti pagal produktą“.
- Įgyvendinimas: atskiras **quiz-en.json**; loaderis (eil. 68–74) kai `locale === 'en'` įkelia `quiz-en.json` ir perrašo `data.quiz`. Taip pat atitinka planą.

---

## 6. Agentų/QA dokumentacija (§4) — ✅ Atlikta

- **RELEASE_QA_CHECKLIST.md §5c** – EN locale: perjungimas, raktų paritetas, terminologija AI, Moduliai 1–3 EN, **Moduliai 4–6 EN** (modules-en-m4-m6.json, loader merge), **Glossary EN (M4–6)**, Quiz EN.
- **DOCUMENTATION_INDEX.md** – nuorodos į EN_LANGUAGE_STANDARD, LT_EN_UI_UX_ANALIZE_MODULIAI_1_6, ANALIZE_MODULIAI_4_5_6_KALBOS_MIKRO_AUDITAS.

---

## 7. Validacija (§6) — ✅ Atlikta

- **modules.json:** `npm run validate:schema` tikrina per `scripts/validate-schema.mjs` — ✅.
- **modules-en-m4-m6.json:** į `validate-schema.mjs` įtraukta `validateModulesEnM46()` — tikrinama, kad failas turi `modules` masyvą (3 elementai) ir kiekvienas modulis atitinka tą pačią modulių/skaidrių schemą (`$defs/module`). ✅

Paleisti: `npm run validate:schema` (prebuild taip pat).

---

## 8. Santrauka

| Blokas / reikalavimas | Statusas |
|------------------------|----------|
| §2 Failų strategija | ✅ |
| Block 0 Loader | ✅ |
| Block 1–5 M4, M5, M6 turinys | ✅ |
| Block 6 Glossary EN (M4–6) | ✅ |
| Block 7 Quiz EN | ✅ (per quiz-en.json) |
| §4 QA / dokumentacija | ✅ |
| §6 Schema validacija EN failui | ✅ |

**Išvada:** Planas pilnai įgyvendintas.
