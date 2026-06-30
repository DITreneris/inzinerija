# Duomenų analizės geriausios praktikos (M7–9)

> **Statusas:** Turinio semantika **sulietas** į pagrindinį SOT. Šis failas – **nuorodų stubas** (ne atskiras redagavimo taškas).  
> **Atnaujinta:** 2026-06-30

---

## Kur redaguoti (SOT)

| Kas                                                     | Failas                                                                         |
| ------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Modulių 7–9 turinys, pipeline, scenarijai, promptai** | [`docs/turinio_pletra_moduliai_7_8_9.md`](../turinio_pletra_moduliai_7_8_9.md) |
| **Skaidrių eilė, path-step ids**                        | [`docs/MODULIO_7_SKAIDRIU_EILES.md`](../MODULIO_7_SKAIDRIU_EILES.md)           |
| **Duomenys (skaidrės, klausimai)**                      | `src/data/modules.json` → `npm run generate:core-data` → `modules-m1-m9.json`  |
| **Modulių numeracija**                                  | [`docs/CONTENT_MODULIU_ATPAZINIMAS.md`](../CONTENT_MODULIU_ATPAZINIMAS.md)     |

**Konfliktų tvarka:** 1) `turinio_pletra_moduliai_7_8_9.md` → 2) JSON → 3) UI.

---

## Kas čia buvo (istorija)

Ankstesnis atskiras dokumentas aprašė Duomenų analizės kelio pedagogiką (02_DA „Duomenų analizės pagrindai“ I–XIII): pipeline, EDA, vizualizacija, MASTER prompt, verslo duomenų domenai, interaktyvūs pavyzdžiai. Turinys **integruotas** į `turinio_pletra_moduliai_7_8_9.md` (§1–§10, §7A, §9.1, §10.1–10.3).

---

## Greitos nuorodos agentams (CONTENT / CURRICULUM)

- **Pipeline ir operacinės sąvokos:** `turinio_pletra_moduliai_7_8_9.md` §1.2, §2
- **M8 testas / M9 capstone:** tas pats SOT §9–§10
- **Path-step kelias (71.1–71.5):** `MODULIO_7_SKAIDRIU_EILES.md` + SOT §8.2
- **Papildomas RAG/tyrimų turinys (pvz. M4 id 61):** gali būti „Papildomas skaitymas“ M7–9 kontekste – žr. SOT §1.1, `TODO.md` §3 RAG optional
- **Production bundle:** M7–9 kliente – `npm run build:production` (tier 9); žr. `05_marketingo_memo_tier9_vienas_build.md`

---

## Istorinis šaltinis

Detalės iš seno atskiro failo (jei reikia) – lokaliai `docs/archive/development/` (ne repo). **Nenaudoti** kaip SOT.
