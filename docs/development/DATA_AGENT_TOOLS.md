# DATA_AGENT: Įrankių (tools.json) rinkimas ir atnaujinimas

> Šaltiniai ir procedūra, kad DATA_AGENT reguliariai galėtų rinkti įrankius, minimus mokymuose, ir atnaujinti skiltį **Įrankiai**.

**Architektūra A:** `src/data/tools.json` yra full LT redagavimo SOT; `src/data/tools-en.json` – EN twin (tas pats `name` / `moduleId` / `url`). Core profiliai: `tools-m1-m6.json`, `tools-m1-m9.json` (+ EN) generuojami per `npm run generate:core-data`.

**Produkto riba:** Įrankių skiltis = **mokymuose minimi / mokomi įrankiai**, ne rinkos blogroll. Vibe-coding stack (Cursor, Claude Code, v0, Lovable) – atidedamas ateities moduliams.

---

## 1. Šaltiniai įrankiams

| Šaltinis                                     | Kas ištraukiama                                                                                                                                                                                             |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **turinio_pletra.md** (M1–M3)                | Pokalbių DI, ai-workflow grupės, jei minimi produktai.                                                                                                                                                      |
| **docs/turinio_pletra_moduliai_4_5_6.md**    | Lentelės „Įrankis \| Nuoroda“, prezentacijos, RAG / tyrimai, DI detektoriai, workflow grandinės.                                                                                                            |
| **docs/turinio_pletra_moduliai_7_8_9.md**    | DA alternatyvos (Julius, Echobase, DataLab, Power BI), DB žemėlapis, deep-research įrankiai.                                                                                                                |
| **docs/turinio_pletra_moduliai_10_11_12.md** | Workflow (Zapier/Make/n8n/PA/Workato), RPA (UiPath), PaaS (Railway/Render/Fly/Vercel), GitHub, Replit.                                                                                                      |
| **docs/turinio_pletra_moduliai_13_14_15.md** | Vaizdas / video / garsas / montažas (CapCut, Whisper, ElevenLabs, …).                                                                                                                                       |
| **src/data/modules.json**                    | `slides[].content.tools` (`action-intro`); `presentationTools`; `ai-workflow` `groups` (name, url, tooltip); workflow `chain` masyvai; content-block lentelės su įrankių pavadinimais (PaaS, video matrix). |

---

## 2. Struktūra

- Full LT: **src/data/tools.json**
- Full EN: **src/data/tools-en.json** (exact `name` parity su LT)
- Core: **tools-m1-m6.json**, **tools-en-m1-m6.json**, **tools-m1-m9.json**, **tools-en-m1-m9.json**
- Schema: **scripts/schemas/tools.schema.json**
- Laukai: `name` (privaloma), `moduleId` (privaloma, 1–15), `url`, `description`, `category` (allowlist – žr. `scripts/audit-tools.mjs`)

Kategorijos (LT pavyzdžiai): `Pokalbių DI`, `RAG / tyrimai`, `Prezentacijos`, `Duomenų analizė`, `Duomenų bazės`, `Verslo automatizavimas`, `Debesijos paleidimas`, `Vaizdų generavimas`, `Video generavimas`, `Muzikos generavimas`, `Garsas`, …

Draudžiamos senos klaidos: `Vaizdo generavimas`, `Automatizacija` / EN `Automation`.

---

## 3. Procedūra (periodinis atnaujinimas)

1. Perskaityti atitinkamą turinio SOT (M1–15) – lentelės ir blokai su įrankių pavadinimais, nuorodomis, aprašymais.
2. Iš **modules.json** ištraukti:
   - Visus `content.tools` iš `action-intro` skaidrių.
   - Lentelių eilutes iš content-block (PaaS, video, DA alternatyvos, …).
   - `content.groups` iš `ai-workflow` (name, url, tooltip → description).
   - `content.presentationTools`.
   - Workflow `chain` – unikalius pavadinimus; suderinti su esamais įrašais arba pridėti su tinkamu `moduleId` ir `category`.
3. Suformuoti / atnaujinti įrašus: `name`, `url`, `description`, `moduleId`, `category`. Išvengti dublikatų (normalizuotas pavadinimas).
4. **EN twin:** tas pats `name`, `moduleId`, `url`; EN `description` + EN `category` iš allowlist.
5. Surūšiuoti abu failus: `tools.sort((a,b) => a.name.localeCompare(b.name, 'lt'))`.
6. Paleisti **`npm run audit:tools`** (parity, sort, moduleId, kategorijos, core ⊆ SOT).
7. Jei keitimas liečia `moduleId <= 9` – **`npm run generate:core-data`**.
8. Paleisti **`npm run validate:schema`** (įtraukia `tools-en.json` + `audit:tools`).

---

## 4. Kada atnaujinti

- **Pagal reikalavimus:** po SOT arba `modules.json` pakeitimų, kurie prideda/keičia įrankius.
- **Core 1–6 / 1–9:** po full failų – `generate:core-data`.
- **Periodiškai:** kartą per sprintą arba **prieš release** – ištraukti minimus įrankius, atnaujinti LT+EN, patikrinti nuorodas, `audit:tools`.

Bendras periodiškumas: **`docs/development/DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md`**.

---

## 5. Vartai

```bash
npm run audit:tools
npm run validate:schema
npm run generate:core-data   # kai liečia M1–9
```

Abecėlinė tvarka: **`.cursor/rules/data-agent-glossary-tools-order.mdc`**.
