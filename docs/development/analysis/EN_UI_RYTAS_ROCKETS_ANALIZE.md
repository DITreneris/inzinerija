# EN UI: Rytas → Rockets analizė

**Tikslas:** EN kalbos vartotojams LLM autoregresinės diagramos pavyzdys turi būti **Rockets** (ir NBA), ne **Rytas** (LKL). Šiame dokumente surašytos visos vietos, kur EN UI vis dar rodo „Rytas“ / LKL, ir ką pakeisti.

---

## 1. Santrauka

| Vieta | Failas | Būsena | Veiksmas |
|-------|--------|--------|----------|
| Diagrama (SVG tekstai) | `LlmAutoregressiveDiagram.tsx` | Hardcoded LT | Pridėti `locale` prop; EN: „Rockets became“, „champions“, „Rockets, NBA“ |
| Žingsnių paaiškinimai | `stepExplanations.ts` | Tik LT masyvas | Pridėti `LLM_AUTOREGRESSIVE_STEP_EXPLANATIONS_EN` arba locale-based pasirinkimą |
| Blokas (aria, mygtukai) | `LlmAutoregressiveBlock.tsx` | Hardcoded LT | Perduoti locale; EN: „Step“, „Input“, „Output“, „Chosen“, „Previous“ / „Next“ |
| EN modulių JSON | `modules-en-m4-m6.json` | imageAlt su „Rytas“, LKL | Pakeisti imageAlt į EN pavyzdį: Rockets, NBA |

---

## 2. Detalūs šaltiniai

### 2.1 `src/components/slides/shared/LlmAutoregressiveDiagram.tsx`

Visi tekstai lietuviški, **nėra `locale` / `useLocale()`**.

| Eilutė (apytiksliai) | Dabartinis tekstas (LT) | EN turinys (Rockets) |
|---------------------|-------------------------|----------------------|
| 52–59 | `STEP_LABELS`: Žingsnis 1: Įvestis (N), … | Step 1: Input (N), … |
| 115–116 | „Autoregresinis LLM: Žingsnis N → Žingsnis N+1“ | „Autoregressive LLM: Step N → Step N+1“ |
| 117–119 | „Pavyzdys: Rytas, LKL · Paspausk bloką…“ | „Example: Rockets, NBA · Click block or buttons 1–8“ |
| 136, 137 | „Įvestis“, „Rytas tapo“ | „Input“, „Rockets became“ |
| 146, 148–149 | „Išvestis“, „Tokenų tikimybės:“, „čemp. 25% · 2024 20%“, „m. 18%“ | „Output“, „Token probabilities:“, „champ. 25% · 2024 20%“, „e.g. 18%“ |
| 155–156 | „Pasirinkta“, „čempionais“ | „Chosen“, „champions“ |
| 164, 178–181 | „Žingsnis N+1“, „Įvestis“, „Rytas tapo“, „čempionais“ | „Step N+1“, „Input“, „Rockets became“, „champions“ |
| 190–191 | „Tokenų tikimybės:“, „2024 22% · m. 20%“, „LKL 15%“ | „Token probabilities:“, „2024 22% · e.g. 20%“, „NBA 15%“ |
| 197, 228 | „Pasirinkta“, „2024“, „Šaltinis: RBC Borealis…“ | „Chosen“, „2024“, „Source: RBC Borealis…“ (galima palikti) |

**Rekomendacija:** Pridėti `locale?: 'lt' | 'en'` į `LlmAutoregressiveDiagramProps` (arba `useLocale()` iš konteksto) ir naudoti dviejų kalbų tekstų objektą diagramos viduje.

---

### 2.2 `src/components/slides/shared/stepExplanations.ts`

Eksportuojamas tik **LT** masyvas `LLM_AUTOREGRESSIVE_STEP_EXPLANATIONS`:

- „Rytas tapo“, „Rytas tapo čempionais“, „čempionais“, „2024“, „m.“, „LKL“ – visi paaiškinimų body tekstuose.

**EN atitikmuo (Rockets):**

- 1. Įvestis (N): „Rockets became“ – input to predict next word…
- 3. Išvestis (N): e.g. „champions“ 25%, „2024“ 20%…
- 4. Pasirinkta (N): „champions“ chosen…
- 5. Įvestis (N+1): „Rockets became champions“…
- 7. Išvestis (N+1): „2024“ 22%, „NBA“ 15%… continues „Rockets became champions“.

**Rekomendacija:** Pridėti `LLM_AUTOREGRESSIVE_STEP_EXPLANATIONS_EN` su tais pačiais 8 žingsniais angliškai (Rockets, NBA, champions). `LlmAutoregressiveBlock` – naudoti `useLocale()` ir pasirinkti `LLM_AUTOREGRESSIVE_STEP_EXPLANATIONS` vs `_EN`.

---

### 2.3 `src/components/slides/shared/LlmAutoregressiveBlock.tsx`

- Aria-label, „Tu esi čia“, „Žingsnis“, „Atgal“, „Pirmyn“, „Ankstesnis žingsnis“, „Kitas žingsnis“, „Žingsnių pasirinkimas“ – viskas LT.
- **Rekomendacija:** Naudoti `useLocale()` ir vietoj hardcoded LT naudoti i18n (pvz. `common` / `quiz` arba modulio namespace) arba paprastą `locale === 'en' ? '...' : '...'` šiam blokui.

---

### 2.4 `src/data/modules-en-m4-m6.json`

Skaidrė su „How do LLMs work?“ (apie 2. sekcija, image + imageAlt):

- **imageAlt dabar:**  
  `"Autoregressive language model sketch: step N (input \"Rytas tapo\", output with percentages: čempionais, 2024, etc., chosen \"čempionais\") and N+1 (input \"Rytas tapo čempionais\", chosen \"2024\"); example Rytas, LKL"`

- **EN turinys (Rockets):**  
  Pakeisti į pvz.:  
  `"Autoregressive language model sketch: step N (input \"Rockets became\", output with percentages: champions, 2024, etc., chosen \"champions\") and N+1 (input \"Rockets became champions\", chosen \"2024\"); example Rockets, NBA"`

---

## 3. Paveldėtas SVG (`/llm_autoregressive_rytas_zalgiris.svg`)

Jei `public/` yra vienas SVG failas su įšalusiais tekstais „Rytas“, „čempionais“, „LKL“, tada:

- **Variantas A:** EN build naudoja tą patį SVG (imageAlt jau aprašo EN turinį) – pakanka pakeisti tik **imageAlt** ir **React diagramos + step explanations** į Rockets/EN.
- **Variantas B:** Turėti du SVG: pvz. `llm_autoregressive_rytas_zalgiris.svg` (LT) ir `llm_autoregressive_rockets_nba.svg` (EN), o `modules-en-m4-m6.json` nurodo EN SVG – tada ir `image` laukas turi būti EN failas.

Dabar `modules-en-m4-m6.json` naudoja tą patį kelią `/llm_autoregressive_rytas_zalgiris.svg`, todėl minimalus žingsnis: **bent imageAlt EN (Rockets, NBA)**; jei reikia ir vizualiai EN – atskiras SVG arba dinaminiai tekstai tik React diagramoje.

---

## 4. Veiksmų eilė (Rytas → Rockets)

1. **modules-en-m4-m6.json** – pakeisti `imageAlt` į EN pavyzdį (Rockets, NBA, champions).
2. **stepExplanations.ts** – pridėti `LLM_AUTOREGRESSIVE_STEP_EXPLANATIONS_EN` (Rockets, NBA, champions).
3. **LlmAutoregressiveBlock.tsx** – `useLocale()`; naudoti EN step explanations kai `locale === 'en'`; EN tekstiui bloke (aria, mygtukai) – i18n arba paprasti EN stringai.
4. **LlmAutoregressiveDiagram.tsx** – `locale` prop arba `useLocale()`; visi UI tekstai (STEP_LABELS, title, subtitle, blokų etiketės, pavyzdys „Rockets became“ / „champions“, „Rockets, NBA“) pagal locale.
5. (Opcionaliai) Atskiras EN SVG arba dinamiški tekstai SVG viduje, jei reikia pilno EN vizualo.

---

## 5. Atitikmenų lentelė (greitam pakeitimui)

| LT | EN (Rockets) |
|----|----------------|
| Rytas | Rockets |
| Rytas tapo | Rockets became |
| čempionais | champions |
| Rytas tapo čempionais | Rockets became champions |
| LKL | NBA |
| Pavyzdys: Rytas, LKL | Example: Rockets, NBA |
| Žingsnis | Step |
| Įvestis | Input |
| Išvestis | Output |
| Pasirinkta | Chosen |
| Tokenų tikimybės: | Token probabilities: |

Šis dokumentas gali būti naudojamas kaip EN UI Rytas→Rockets pakeitimų SOT ir checklist.
