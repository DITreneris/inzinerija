# Portal 2.1 tobulinimo gairės (ne-destruktyvios)

> **Data:** 2026-07-14  
> **Šaltinis:** `PORTAL_2_1_UI_AUDIT.md`  
> **Principas:** polish, ne rebuild. Storyboard, surface sistema, awareness-gap golden pattern — **neliesti**.

---

## 1. Preservation list (neliesti)

| Kas                                         | Kodėl                                             |
| ------------------------------------------- | ------------------------------------------------- |
| Storyboard eilė                             | `NEWS_PORTAL_SLIDE_53_5.md` — fiksuotas UX ritmas |
| `awareness-gap` golden pattern              | Caption virš juostos, border-l-4, HTML šaltinis   |
| `portalSurfaces.ts` surface matrix          | Editorial vs card — vienas SOT                    |
| Immersive `ModuleView`                      | Slepiamas course chrome                           |
| Lead gradient, 4 KPI, banneriai, Satori PNG | Deprecated — negrąžinti                           |

---

## 2. Wave planas

| Wave       | Laikas | Prioritetas | Agentai             | DoD                                                |
| ---------- | ------ | ----------- | ------------------- | -------------------------------------------------- |
| **Wave 4** | 48h    | P0–P1       | CODING → UI_UX → QA | Masthead fix + section label + 48h retest paruošta |
| **Wave 5** | 1 sav  | P2          | CODING → CONTENT?   | DataBrief + ticker + navDecor token                |
| **Wave 6** | 2 sav  | P3          | CODING → SCHEME     | Bar row token + EN spot-check                      |

---

## 3. Wave 4 — kritiniai pataisymai (48h)

### 3.1 Masthead dekoratyvumo signalas

**Problema:** `portalNav` linkai turi `hover:text-brand-600` ir atrodo paspaudžiami.  
**Failas:** `src/components/slides/news-portal/PortalMastheadNav.tsx`

**Veiksmas:**

```tsx
// Prieš (eil. ~93):
className = 'hover:text-brand-600 dark:hover:text-brand-400 cursor-default';

// Po:
className =
  'text-gray-500 dark:text-gray-400 cursor-default pointer-events-none';
```

**Alternatyva (švelnesnė):** palikti `pointer-events-none` tik ant `<span>`, nav wrapper palikti su `aria-label="Dekoratyvi portalo navigacija"`.

**Agentas:** CODING → UI_UX patikra  
**Poveikis:** mažiau klaidinimo, didesnis pasitikėjimas  
**Pastangos:** ~1h  
**Regresijos guardrail:** nekeisti `portalNav` JSON struktūros

---

### 3.2 Section label dark kontrastas

**Problema:** `getPortalSectionLabelClasses('break')` naudoja `dark:text-gray-400` — istoriškai sukėlė nematomus chapter labels.  
**Failas:** `src/components/slides/news-portal/portalSurfaces.ts`

**Veiksmas:**

```ts
// SECTION_LABEL.break:
'text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300';
```

**Agentas:** CODING → UI_UX (375px dark smoke)  
**Poveikis:** „DUOMENYS TRUMPAI“ / „GILIAU“ matomi be zoom  
**Pastangos:** 30min

---

### 3.3 Dekoratyvaus nav a11y

**Problema:** Screen reader gali skaityti 7 „nuorodas“, kurios neveikia.  
**Failas:** `PortalMastheadNav.tsx`

**Veiksmas:** ant kiekvieno dekoratyvaus `<span>` pridėti `aria-hidden="true"`; palikti `aria-label` ant `<nav>`.

**Agentas:** CODING  
**Pastangos:** 30min

---

### 3.4 48h retest

**Problema:** DoD nebaigtas (`M4_SK_53_5_SESSION_RETROSPECTIVE.md` §8).  
**Failas:** `docs/development/TEST_REPORT.md` §53.5 anti-PPT

**Veiksmas:** vykdyti 5 dalyvių protokolą (375px, LT + 1 EN).  
**Agentas:** QA / USER_JOURNEY  
**Pastangos:** 4h

**Papildomi 3 hipotezės retestui:**

| #   | Klausimas                                                                                           | Tikėtinas PASS            |
| --- | --------------------------------------------------------------------------------------------------- | ------------------------- |
| 8   | Ar supratai skirtumą tarp viršutinės navigacijos (dekoratyvios) ir „Duomenys · Giliau · Santrauka“? | ≥60% taip                 |
| 9   | Ar dekoratyvūs portalo meniu punktai atrodė paspaudžiami?                                           | ≤40% taip (po Wave 4 fix) |
| 10  | Ar skyrių antraštės (DUOMENYS TRUMPAI ir pan.) matomos be zoom?                                     | ≥70% taip                 |

---

## 4. Wave 5 — struktūrinis polish (1 sav)

### 4.1 DataBrief metric kontekstas

**Problema:** `stat.source` naudoja `PORTAL_TEXT.mutedXs` — per silpnas kontekstas.  
**Failas:** `src/components/slides/news-portal/PortalDataBriefRow.tsx`

**Veiksmas:**

```tsx
// eil. ~179:
<p className={`mt-1.5 ${PORTAL_TEXT.bodySm} text-gray-500 dark:text-gray-400`}>
```

**Agentas:** CODING (CONTENT nekeičia teksto — tik vizualinis svoris)  
**Pastangos:** 30min

---

### 4.2 Mobile ticker collapse

**Problema:** Virš fold tankis mobile 375px.  
**Failas:** `src/components/slides/news-portal/PortalBreakingTicker.tsx`

**Veiksmas:**

```tsx
// wrapper className pridėti:
'hidden sm:block ...';
```

**Agentas:** CODING → USER_JOURNEY (retest #3 „per daug informacijos“)  
**Pastangos:** 30min  
**Rizika:** mažiau „portalo“ signalo mobile — priimtina, jei retest #1 (portal ≥70%) išlieka

---

### 4.3 `PORTAL_TEXT.navDecor` token

**Problema:** `PortalMastheadNav` naudoja ad-hoc `text-sm font-medium`.  
**Failas:** `portalSurfaces.ts` + `PortalMastheadNav.tsx`

**Veiksmas:**

```ts
// portalSurfaces.ts PORTAL_TEXT:
navDecor: 'text-sm text-gray-500 dark:text-gray-400',
```

```tsx
// PortalMastheadNav nav:
className={`flex flex-wrap gap-x-4 gap-y-1 ${PORTAL_TEXT.navDecor}`}
```

**Agentas:** CODING  
**Pastangos:** 1h

---

### 4.4 Vizualinis skirtumas: dekoratyvus vs funkcinis nav

**Problema:** `portalNav` ir `PortalChapterNav` abu atrodo kaip navigacija.  
**Failai:** `PortalMastheadNav.tsx`, `PortalChapterNav.tsx`

**Veiksmas:**

- Dekoratyvus: `navDecor`, be hover, `opacity-80`
- Funkcinis: `getPortalSectionLabelClasses('nav')` + `min-h-[44px]` — jau OK; pridėti `border-t border-gray-100 dark:border-gray-800 pt-3 mt-2` atskyrimui nuo hero

**Agentas:** CODING → UI_UX  
**Pastangos:** 2h

---

## 5. Wave 6 — DS užbaigimas (2 sav)

### 5.1 `PortalHorizontalBarRow` tokenizacija

**Failas:** `src/components/slides/news-portal/PortalHorizontalBarRow.tsx`

**Veiksmas:** emphasis eilutė per `PORTAL_TEXT.bodySm` + optional `font-semibold text-gray-800 dark:text-gray-200` → naujas `PORTAL_TEXT.barLabelEmphasis`.

**Agentas:** CODING  
**Pastangos:** 1h

---

### 5.2 EN mobile beat spot-check

**Failas:** `beat-diagrams/`, `modules-en-m4-m6.json`

**Veiksmas:** 375px EN awareness-gap — caption, 48 pp, šaltinis.  
**Agentas:** QA  
**Pastangos:** 1h

---

### 5.3 Masthead kompaktiškumas

**Failas:** `PortalMastheadNav.tsx`

**Veiksmas:** `pb-3 mb-1` → `pb-2 mb-0.5` ant header.  
**Agentas:** CODING  
**Pastangos:** 30min

---

## 6. Agentų maršrutų lentelė

| Užduotis               | UI_UX        | CODING | SCHEME | CONTENT | DATA | QA         |
| ---------------------- | ------------ | ------ | ------ | ------- | ---- | ---------- |
| Masthead hover fix     | audit        | impl   | —      | —       | —    | smoke      |
| Section label contrast | audit        | impl   | —      | —       | —    | dark 375px |
| DataBrief source       | rekomenduoja | impl   | —      | —       | —    | —          |
| Ticker mobile          | rekomenduoja | impl   | —      | —       | —    | retest     |
| navDecor token         | spec         | impl   | —      | —       | —    | —          |
| 48h retest             | —            | —      | —      | —       | —    | vykdo      |
| Bar row token          | spec         | impl   | —      | —       | —    | —          |
| Beat EN mobile         | —            | —      | —      | —       | —    | spot-check |

---

## 7. Ko NEDARYTI

- Grąžinti Rich Portal 2.0 Lead gradient (`mainInsightBlock` gradient virš fold)
- Pridėti 4 KPI IconChip strip
- Keisti storyboard eilę ar beat skaičių (3 beats lieka)
- Pridėti SaaS komponentus (filtrai, lentelės, modalai, sidebar app nav)
- Keisti šriftą (Plus Jakarta Sans lieka)
- Keisti `modules.json` copy be CONTENT_AGENT (Wave 4–6 = tik UI)

---

## 8. Regresijos guardrails (po kiekvieno wave)

| Po Wave | Patikrinti                                                          |
| ------- | ------------------------------------------------------------------- |
| 4       | awareness-gap SVG 375px; chapter labels matomi; portalNav nebehover |
| 5       | DataBrief 3 stat surface; ticker mobile; retest #1 portal ≥70%      |
| 6       | `npm run lint` + `test:run`; `audit:m46`; browser gate 10/10        |

**Automatiniai vartai:**

```bash
npm run lint
npm run test:run
npm run validate:schema
npm run audit:m46
```

---

## 9. Sėkmės kriterijai

- [ ] Wave 4 CODING pataisymai įgyvendinti
- [ ] 48h retest ≥70% portal, ≤30% PPT, ≥70% skaitomumas
- [ ] TEST_REPORT browser gate 10/10 ✅
- [ ] Jokios deprecated UI grąžinimo
- [ ] `PORTAL_2_1_UI_AUDIT.md` P1 punktai adresuoti arba sąmoningai atidėti su priežastimi

---

## Nuorodos

- Auditas: `PORTAL_2_1_UI_AUDIT.md`
- Skill: `.cursor/skills/ui-ux-agent/portal-21-audit.md`
- Storyboard: `NEWS_PORTAL_SLIDE_53_5.md`
- Token SOT: `src/components/slides/news-portal/portalSurfaces.ts`
