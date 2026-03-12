# Planas: agentai ir darbai (Promptų anatomija)

> **Šaltinis:** `TODO.md`, `AGENT_ORCHESTRATOR.md`, `SKAIDRIU_TIPU_ANALIZE.md`, `MODULIO_4_TOBULINIMAI_GERIAUSIOS_PRAKTIKOS.md`, `PEDAGOGINE_ANALIZE_MODULIAI_4_5_6.md`.  
> **Tikslas:** Vienas dokumentas – kas, kokia seka, kokiam agentui.

---

## 1. Darbo eiga (pipeline)

| Eilė | Agentas | Užduotys (iš TODO + doc) | Pirmas žingsnis |
|------|---------|---------------------------|-----------------|
| 1 | **CONTENT_AGENT** | Turinio SOT: reikalavimai, terminai, struktūra | SOT failai (`turinio_pletra.md`, `docs/turinio_pletra_moduliai_4_5_6.md`) |
| 2 | **DATA_AGENT** | JSON sinchronas su SOT, tipai, validacija | `modules.json`, `promptLibrary.json`, `glossary.json`, `src/types/modules.ts` |
| 3 | **CODING_AGENT** | Komponentai, render logika, tipai | `SlideContent.tsx`, `ModuleView.tsx`, slide tipai |
| 4 | **CODE_REVIEW_AGENT** | Diagnozė, rizikos, ar SOT laikomasi | Bet kuris failas |
| 5 | **QA_AGENT** | Doc, TEST_REPORT, TODO, CHANGELOG | `README.md`, `docs/`, `TODO.md`, `CHANGELOG.md` |

**Mišri užduotis** (turinys + JSON + UI): visada 1 → 2 → 3, tada 4 ir 5.

---

## 2. Prioritetai pagal TODO.md

### P2 – Vidutinis (pirmieji darbai)

| # | Užduotis | Agentai | Šaltinis |
|---|----------|---------|----------|
| 1 | **Skaidrių tipų: hardcoded → content-driven** (intro, hierarchy, comparison, summary, practice-summary) | CONTENT → DATA → CODING | `SKAIDRIU_TIPU_ANALIZE.md` §4.1 |
| 2 | **Savitikros skaidrės Modulyje 4** – 2–3 tarpinės savitikros po RAG, Deep research, tokenų | CONTENT + UI | Pedagoginė analizė §2.3 |
| 3 | **Asmeninio konteksto miniužduotys** – „Pagalvokite apie savo darbe“ po RAG ir manipuliacijų | CONTENT | Pedagoginė analizė §2.2 |
| 4 | **„Pataisyk promptą“** – bent viena užduotis (silpnas/šališkas → pataisyti) | CONTENT | Pedagoginė analizė §2.6 (SOT jau turi „Pataisyk promptą“ po 4.5 – tik įgyvendinimas per DATA/CODING) |

### Modulio 4 – MUST (būtina)

| # | Užduotis | Agentas | Failas / vieta |
|---|----------|---------|-----------------|
| M1 | Santraukoje (4.7) ryšiai tarp temų | CONTENT (patikrinti) | SOT 4.7 – jau įgyvendinta |
| M2 | RAG (4.2): „Jei nėra kontekste – parašyk Nežinau“ ir citavimas visur | CONTENT → DATA | SOT 4.2, modules.json |
| M3 | 4.6: anti-haliucinacinis šablonas ir 4–5 taisyklės visada matomi (CopyButton) | CONTENT → DATA → CODING | SOT 4.6, UI |
| **M4** | **4.5: skaidrė/collapsible „Saugumas: prompt injection ir jailbreak“** (OWASP #1) | **CONTENT → DATA → CODING** | **SOT 4.5, modules.json, SlideContent** |

### Modulio 4 – SHOULD (labai pageidautina)

| # | Užduotis | Agentas |
|---|----------|---------|
| S1 | Prieš RAG (4.2): 1–2 sakiniai apie konteksto langą/tokenus + nuoroda į 4.4 | CONTENT → DATA |
| S2 | 4.2b: „chunk size“ / fragmentų dydžio gairė | CONTENT → DATA |
| S3 | 4.6: CoVe (Chain-of-Verification) pastraipa/blokas | CONTENT → DATA |
| S4 | Bridžinė praktika po 4.3: RAG + Deep research + šaltiniai (5–10 min) | CONTENT → DATA |
| S5 | Optional/BONUS skaidrės žymėti nuosekliai | CONTENT → DATA |
| S6 | Ilgoms skaidrėms – trumpas UI pavadinimas | CONTENT → DATA |

---

## 3. Konkreti seka šiai sesijai („judam“)

1. **CONTENT_AGENT:** Į SOT (`docs/turinio_pletra_moduliai_4_5_6.md`) įrašyti **M4** – skaidrę / poskyrį **„Saugumas: prompt injection ir jailbreak“** po 4.5 (takoskyra nuo verslo manipuliacijos, 2–3 gynybos principai, nuorodos OWASP/Anthropic).
2. **DATA_AGENT:** Pridėti atitinkamą turinį į Modulio 4 skaidres `modules.json` (naujas content-block arba skaidrė 4.5).
3. **CODING_AGENT:** Jei reikia naujo skaidrės tipo arba collapsible – implementuoti; kitaip tik rodyti naują content.
4. **CODE_REVIEW_AGENT:** Patikrinti SOT → JSON → UI grandinę.
5. **QA_AGENT:** Atnaujinti `CHANGELOG.md`, `TODO.md` (M4 – įgyvendinta). Turinio atnaujimai – SOT `docs/turinio_pletra_moduliai_4_5_6.md`; istorinis MODULIO_4_TURINIO_ANALIZE – `docs/archive/MODULIO_4_TURINIO_ANALIZE.md`.

---

## 4. Nuorodos

| Kas | Kur |
|-----|-----|
| Agentų detalus aprašas | `docs/development/AGENT_ORCHESTRATOR.md` |
| Skaidrių tipų analizė | `docs/SKAIDRIU_TIPU_ANALIZE.md` |
| Modulio 4 MUST/SHOULD | `docs/MODULIO_4_TOBULINIMAI_GERIAUSIOS_PRAKTIKOS.md` |
| Pedagoginė analizė | `docs/PEDAGOGINE_ANALIZE_MODULIAI_4_5_6.md` |
| Prioritetai ir backlog | `TODO.md` |
