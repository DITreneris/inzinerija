# Definition of Done (DoD) – v01

> **Paskirtis:** Vienas indeksas, pagal kurį agentas patikrina, ar užduotis **užbaigta** ir gali būti perduota kitam agentui arba vartotojui. Šis failas **nekopijuoja** checklist'ų – tik nurodo kriterijus ir kur yra pilna tiesa (SOT).
> **Skirtumas:** §1–§3 = **užduoties** DoD (kiekviena sesija); §4 = **release** DoD (prieš deploy, žr. `RELEASE_QA_CHECKLIST.md`).
> **Naudojimas:** Prieš rašydamas „padaryta“ – atidaryk savo agento skyrių §3 ir pereik per checkbox'us. Skills: `.cursor/skills/<agentas>/SKILL.md`.

---

## §1 Globalus DoD (visiems agentams, kiekviename atsakyme)

- [ ] **CHANGES / CHECKS / RISKS / NEXT** blokas pateiktas (formatas – `AGENT_ORCHESTRATOR.md` §5).
- [ ] **CHECKS su įrodymu:** nurodytas konkretus failas, dokumentas pagal kurį tikrinta, ir 1–2 pavyzdžiai (ne „patikrinau – atitinka“).
- [ ] Jei keistas vartotojui matomas turinys (`modules.json`, skaidrių komponentai) – **Patikra pagal SOT** blokas: paprasta kalba, golden standard, lietuviškos raidės (žr. `AGENT_ORCHESTRATOR.md` §5 ir `AGENTS.md` §Output gate).
- [ ] Jei užduotis mišri (turinys + JSON + UI) – pipeline seka įvykdyta **arba** aiškiai pažymėta, kuris etapas liko (žr. §2).
- [ ] Maži diffai; nekeista tai, ko užduotis neprašė.

---

## §2 Pipeline DoD (mišri užduotis – handoff kriterijai)

Etapas laikomas baigtu **tik** kai perdavimo sąlyga įvykdyta. Pipeline tvarka – `AGENT_ORCHESTRATOR.md` §4.

| Etapas                      | „Padaryta“ = ką privaloma perduoti kitam                                                                                                                                                                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CURRICULUM** (jei reikia) | Struktūros vertinimas / rekomendacijos (tikslai, seka, 5 blokai) – **ne** galutinė kopija. → CONTENT                                                                                                                                                                                                                      |
| **CONTENT**                 | Turinio **SOT atnaujintas** (`turinio_pletra*.md`) **arba** (UX polish iteracijoms) operacinis įrašas `TEST_REPORT` + [`M79_PATCH_REGISTRY.md`](M79_PATCH_REGISTRY.md) be pilno turinio rewrite – žr. [`DOCS_MAINTENANCE.md`](DOCS_MAINTENANCE.md) §2. Tekstai paruošti su tiksliomis vietomis (modulis, skaidrė). → DATA |
| **DATA**                    | JSON sinchronizuotas su SOT; atsakyta į full vs `*-m1-m6` klausimą; schema validacija praėjo. → CODING                                                                                                                                                                                                                    |
| **CODING**                  | Render veikia; tipai (`src/types/modules.ts`) nepažeisti; lint be naujų klaidų. → CODE_REVIEW                                                                                                                                                                                                                             |
| **CODE_REVIEW**             | Diagnozė + rizikos + rekomendacija (OK arba kuris agentas taiso ką). → QA                                                                                                                                                                                                                                                 |
| **QA**                      | Dokumentacija suderinta (CHANGELOG, TODO, TEST_REPORT pagal apimtį). → vartotojas                                                                                                                                                                                                                                         |

---

## §3 Agentų DoD (checkbox + kur pilna tiesa)

### §3.1 CONTENT_AGENT

- [ ] SOT (`turinio_pletra*.md`) atnaujintas **prieš** bet kokį JSON siūlymą.
- [ ] `PAPRASTOS_KALBOS_GAIRES.md` atidaryta; žargonas patikrintas (1–2 pavyzdžiai CHECKS bloke).
- [ ] `GOLDEN_STANDARD.md` §3.2 seka (Trumpai → Daryk dabar → Copy → Patikra → Optional) – OK/FAIL.
- [ ] DI (ne AI); lietuviškos raidės; CTA konkretus (ne „tęskite“).
- [ ] Handoff DATA_AGENT: tikslios vietos (modulis, skaidrė, sekcija).

Pilna tiesa: `CONTENT_AGENT.md` §3, §5; santraukos – `SUMMARY_SLIDE_SPEC.md`; numeracija – `docs/CONTENT_MODULIU_ATPAZINIMAS.md`.

### §3.2 DATA_AGENT

- [ ] Atsakyta į 2 klausimus: full authoring SOT ar core `*-m1-m6` profilis? Redagavimo failas ar tik patikra?
- [ ] JSON sinchronizuotas su turinio SOT (ne atvirkščiai).
- [ ] `npm run validate:schema` praėjo (arba CHECKS: „negalėjau, nes …“).
- [ ] Glossary/tools abėcėlinė tvarka (jei liesta) – `.cursor/rules/data-agent-glossary-tools-order.mdc`.
- [ ] Jei keitimas liečia core 1–6 build – `*-m1-m6.json` suderinti arba pažymėta NEXT.

Pilna tiesa: `DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md` §3–4; tools – `DATA_AGENT_TOOLS.md`.

### §3.3 CODING_AGENT

- [ ] TypeScript tipai nepažeisti (ypač `Slide` struktūra `SlideContent.tsx`).
- [ ] Render patikrintas (build arba dev) – CHECKS su konkrečiu rezultatu.
- [ ] Nedubliuota logika – panaudoti esami komponentai/utils.
- [ ] Jei layout/a11y – UI_UX_AGENT gairės (`UI_UX_AGENT.md` §3, §5.2) pritaikytos.
- [ ] `npm run lint` be naujų klaidų.

Pilna tiesa: `AGENT_ORCHESTRATOR.md` §7 (CODING); UI/UX – `UI_UX_AGENT.md`.

### §3.4 CODE_REVIEW_AGENT

- [ ] Diagnozė be naujo kodo/turinio rašymo; rekomenduotas agentas tolesniam darbui.
- [ ] Jei diagramos (`*Diagram*.tsx`, `ProcessStepper`) – Schemų CODE_REVIEW blokas su kiekvienu §5 punktu OK/FAIL.
- [ ] Jei „Peržiūrėti pilname dydyje“ / skaidrių vizualizacija – vartotojo kelio patikra pagal `AGENT_VERIFICATION_NE_MELUOTI.md`.
- [ ] Rizikos konkrečios (failas, eilutė, scenarijus) – ne bendros frazės.

Pilna tiesa: `SCHEME_AGENT.md` §5, §5.5; `AGENT_VERIFICATION_NE_MELUOTI.md`.

### §3.5 SCHEME_AGENT

- [ ] `SCHEME_AGENT.md` atidaryta prieš keitimus.
- [ ] Atsakyme privalomas blokas **Schemų CODE_REVIEW (§5)** – kiekvienas punktas OK/FAIL.
- [ ] Po pakeitimų užklausta/atlikta CODE_REVIEW_AGENT vizualinė patikra.

Pilna tiesa: `SCHEME_AGENT.md` §3, §5; `DIAGRAMU_GERIAUSIOS_PRAKTIKOS.md`.

### §3.6 UI_UX_AGENT

- [ ] `GOLDEN_STANDARD.md` ir `UI_UX_AGENT.md` atidaryti prieš vertinimą.
- [ ] Auditas pagal §4.2 checklist – ataskaitoje kas tikrinta, kas pataisyta.
- [ ] Rekomendacijos CODING_AGENT konkrečios (Tailwind klasės, aria atributai).

Pilna tiesa: `UI_UX_AGENT.md` §4.2, §5.2.

### §3.7 CURRICULUM_AGENT

- [ ] Pateiktas struktūros **vertinimas arba rekomendacijos** (tikslai, seka, Bloom, 5 blokai) – ne galutinė kopija.
- [ ] Rekomendacijos adresuotos: į SOT arba CONTENT_AGENT (ką įrašyti, kur).
- [ ] JSON ir kodas neliesti.

Pilna tiesa: `CURRICULUM_AGENT.md` §3–4.

### §3.8 QA_AGENT

- [ ] CHECKS bloke nurodyta, kurie `RELEASE_QA_CHECKLIST.md` skyriai (1–5, 5a) tikrinti.
- [ ] `CHANGELOG.md` atnaujintas, jei keitėsi funkcionalumas; `TODO.md`/`ROADMAP.md` – jei užbaigta užduotis.
- [ ] Vartotojo testų klaidos → `TEST_REPORT.md`; sprendimai → `TODO.md`.
- [ ] Lietuviškų raidžių patikra (prieš release) – `RELEASE_QA_CHECKLIST.md` skyrius 5.

Pilna tiesa: `RELEASE_QA_CHECKLIST.md`.

### §3.9 USER_JOURNEY_AGENT

- [ ] Pilna 6 punktų išvestis (UX score, Top 5, micro-win, 48h testas ir kt.) pagal spec.
- [ ] Analizė pagal 5 zonas; diagnozė be kodo/JSON keitimų.
- [ ] Handoff aiškus: kurie taisymai → CONTENT / DATA / CODING.

Pilna tiesa: `USER_JOURNEY_AGENT.md` §3–4.

---

## §4 Release gate (produkto DoD)

Užduoties DoD (§1–§3) **nepakeičia** release patikros. Prieš deploy – pilnas `docs/development/RELEASE_QA_CHECKLIST.md` (broken links, mobile, dark mode, a11y, lietuviškos raidės, paprasta kalba, PDF). Footerių skaidrių numeriai – tik release gate (`.cursor/rules/footer-slide-numbers.mdc`). Turinio kokybės vertinimas – `context-engineering/eval_rubric.md`.

---

## §5 Skill evolution (pamokų kaupimas)

Po sesijos, jei išmokta nauja pamoka, agentas nusprendžia **kur** ją įrašyti (pagal `context-engineering/memory_schema.md`):

| Pamokos tipas                                 | Kur rašyti                                                    |
| --------------------------------------------- | ------------------------------------------------------------- |
| Universali taisyklė (galioja visada, visiems) | Atitinkamas `*_AGENT.md` doc (pasiūlyti atnaujinimą atskirai) |
| Vienkartinė / projekto specifinė pamoka       | `.cursor/skills/<agentas>/lessons.md`                         |
| Release sprendimas / „kodėl pasirinkome X“    | `CHANGELOG.md` arba `MEMORY.md`                               |
| Klaida / regresija                            | `docs/development/TEST_REPORT.md`                             |

**lessons.md formatas (privalomas):** viena eilutė per pamoką:

```text
YYYY-MM-DD | kontekstas (modulis/skaidrė/failas) | problema | sprendimas | failai
```

Higiena: kas ~4 savaites peržiūrėti lessons.md – pasikartojančias pamokas kelti į `*_AGENT.md`, pasenusias šalinti.

---

## §6 Versija

- **v01** (2026-06-11): pirmoji versija – globalus, pipeline, 9 agentų DoD, release gate nuoroda, skill evolution.
- Struktūriniai pakeitimai → naujas failas `dod_02.md`; smulkūs pataisymai – šiame faile su data.
