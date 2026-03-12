# Lentelių standartas (content-block table)

**Paskirtis:** Vienas etalonas visoms content-block lentelėms – atsakomybė, geriausios praktikos, kada naudoti `comparisonStyle`, audito kriterijai.

**Versija:** 1.0  
**Data:** 2026-02-21

---

## 1. Atsakomybė

| Agentas | Atsakomybė |
|---------|------------|
| **UI_UX_AGENT** | Lentelių vizualinė hierarchija, skaitomumas, padding, border, palyginimo režimo stilius (header fonai, min-width). Gairės: šis dokumentas + `UI_UX_AGENT.md` §3.6. |
| **DATA_AGENT** | `modules.json` – sekcijos su `table` (headers, rows), optional `comparisonStyle`, `body` (micro-UX po lentele). Tipai: `ContentBlockTable` (`src/types/modules.ts`). |
| **CODING_AGENT** | Renderinimas `ContentSlides.tsx`: sąlyginis stilius pagal `comparisonStyle`, Tailwind klasės, wrapper `overflow-x-auto`. |
| **CONTENT_AGENT** | Turinys ląstelėse (tekstas, verslo kalba); ne struktūra. |
| **CODE_REVIEW_AGENT** | Patikra: ar lentelė nesuspausta, ar header skiriasi, ar body rodomas po lentele. |

**SOT:** Duomenų struktūra – `src/types/modules.ts` (`ContentBlockTable`). Vizualinės gairės – `docs/development/UI_UX_AGENT.md` §3.6 ir šis dokumentas.

---

## 2. Gerosios praktikos (bendros)

- **Įskaitomumas:** `text-base`, pakankamas eilučių tarpas (`leading-relaxed` arba palyginimui `leading-loose`), langelių padding ne mažesnis nei `py-3.5` (bendram atvejui) arba `py-5` (palyginimo režimui).
- **Lygiavimas:** Visi langeliai `align-top`.
- **Paryškinimas:** Langeliuose **tekstas** renderinamas per `renderBodyWithBold`, ne žalia eilutė su `**`.
- **Nesuspaudžiama:** Lentelė turi turėti minimalų plotį arba stulpelių min-width, kad tekstas per daug nelūžtų; siaurame ekrane – horizontalus slinkimas (`overflow-x-auto`), ne suspaudimas.

---

## 3. Palyginimo lentelė (2 stulpeliai, pvz. RL vs RLHF)

Kai sekcija yra **palyginimo** tipo (du kontrastuojantys stulpeliai), naudoti `comparisonStyle: true` ir atitinkamą vizualinį stilių.

### 3.1 Duomenys (DATA_AGENT)

- `section.table.headers`: 2 elementai (pvz. „RL (optimizuoja skaičius)“, „RLHF (optimizuoja kokybę)“).
- `section.table.rows`: masyvas iš `[cellLeft, cellRight]`.
- `section.table.comparisonStyle`: `true`.
- `section.body`: trumpa micro-UX eilutė po lentele (pvz. „RL = skaičių optimizacija. RLHF = žmogaus vertinimo optimizacija.“).

### 3.2 Vizualinis standartas (UI_UX_AGENT / CODING_AGENT)

- **Header fonai:** 1-as stulpelis – `bg-brand-200 dark:bg-brand-900/40`; 2-as – `bg-slate-200 dark:bg-slate-800/50` (skiriama „palyginimo režimas“).
- **Lentelės plotis:** `min-w-[36rem] w-full` – lentelė nesuspaudžiama; siaurame ekrane – horizontalus scroll.
- **Stulpelių plotis:** Abu `td` – `min-w-[14rem] sm:min-w-[16rem] w-1/2`, kad tekstas turėtų vietos.
- **Kvėpavimas:** `px-5 py-5`, `leading-loose`; border švelnesnis (`border-gray-100`).
- **Paskutinė eilutė (key difference):** paryškinimas – `bg-brand-50/50 dark:bg-brand-900/20 font-semibold`.
- **Tailwind safelist:** Įtraukti `bg-brand-200`, `dark:bg-brand-900/40`, `bg-slate-200`, `dark:bg-slate-800/50` (`tailwind.config.js`), kad klasės nebūtų išmestos.

### 3.3 Implementacija

- Failas: `src/components/slides/types/ContentSlides.tsx`. Sąlyga: `section.table?.comparisonStyle === true`. Kitos lentelės (be `comparisonStyle`) lieka su bendru stiliumi (`w-full`, pirmas stulpelis `w-[10rem] sm:w-40`).

---

## 4. Audito kriterijai (lentelėms)

| Kriterijus | Klausimas |
|------------|-----------|
| Skaitomumas | Ar text-base, leading-relaxed/loose, pakankamas padding? |
| Nesuspausta | Ar lentelė turi min-width arba stulpeliai min-width (palyginimui)? Ar nėra per siauro pirmo stulpelio be reikalo? |
| Hierarchija (palyginimas) | Jei 2 stulpeliai palyginimui – ar header fonai skirtingi (brand / slate)? |
| Micro-UX | Jei palyginimas – ar yra trumpas body po lentele? |
| Bold | Ar **tekstas** ląstelėse renderinamas per renderBodyWithBold? |
| A11y | Ar lentelė turi aria-label (pvz. „Palyginimo lentelė: RL ir RLHF“)? |

---

## 5. Projekto lentelių auditas (sąrašas)

Lentelės apibrėžtos `modules.json` sekcijose su `section.table`. Renderinimas – `ContentSlides.tsx` (vienas bendras blokas `section.table && !section.workflowChains`).

| Skaidrė / kontekstas | Heading (trumpai) | Stulpeliai | comparisonStyle | Pastabos |
|----------------------|-------------------|------------|-----------------|----------|
| M4 | Sisteminis vs Master promptas | 3 | ne | Palyginimas 3 stulpeliais |
| M4 | ❌ Blogas / ✅ Geras | 2 | ne | Collapsible + table |
| M4 | Metodinis vs Agentinis | 3 | ne | Aspektas + 2 stulpeliai |
| M4 | 4️⃣ RL vs RLHF – palyginimas | 2 | **taip** | Verslo kalba, body micro-UX |
| M4 | Įrankių palyginimas | 4 | ne | Įrankis, Stiprybė, Kam, Kaina |
| M? | Modelių konteksto langai | 3 | ne | |
| M? | Iteracija / strateginis planavimas | 3 | ne | |
| M? | Blogas vs geras promptas | 2 | ne | |
| M? | 6 blokų struktūra | 2 | ne | Blokas, Nurodymas |

**Patobulinimai (žr. TODO.md):** Kurioms lentelėms pritaikyti `comparisonStyle` (2 stulpelių palyginimas); ar kitoms 2 stulpelių lentelėms reikia micro-UX body; auditas „nesuspausta / skaitomumas“.

---

## 6. Nuorodos

- Lentelių renderinimas: `src/components/slides/types/ContentSlides.tsx` (blokas su `section.table`).
- Tipas: `src/types/modules.ts` – `ContentBlockTable`, `ContentBlockSection.table`.
- UI/UX gairės: `docs/development/UI_UX_AGENT.md` §3.6.
- RL vs RLHF analizė: `docs/development/RL_VS_RLHF_LENTELES_VIZUALINE_ANALIZE.md`.
