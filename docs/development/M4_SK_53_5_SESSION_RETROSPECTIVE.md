# M4 sk. 53.5 – sesijos retrospektyva (2026-07)

> **Skaidrė:** `id: 53.5`, `variant: news-portal`, Modulis 4, MVP pozicija **11/41**  
> **Tikslas:** fiksuoti ką darėme, ką išmokome, kas liko – kad kitas agentas / sesija tęstų be konteksto praradimo.

---

## 1. Sesijos arc (4 bangos)

| Banga | Užklausa | Rezultatas | Verdict |
|-------|----------|------------|---------|
| **A** | News-portal editorial scroll (immersive, beats, ribbons) | `NewsPortalInfographicSlide`, beats, KPI, docs | OK – storyboard veikia |
| **B** | Satori PNG → React SVG (SCHEME model/view) | `beat-diagrams/`, IconChip KPI, Satori deprecated | OK – LT diacritika, nebe placeholder PNG |
| **C** | User test + premium polish (awareness-gap) | Juostos, 48 pp, border-l-4, HTML šaltinis | Dalinis OK – logika aiški, premium polish dar ne visur |
| **D** | Anti-PPT overhaul (testuotojo audit) | `PortalBlockShell`, redakcinis hero, immersive nav, KPI 2, chapter breaks | OK – implementacija; 48h retest ⬜ |
| **E** | Hybrid recovery + **Rich Portal 2.0** (2026-07-14) | 4 foto slotai + gradient virš fold + editorial SVG; ne full revert | ⬜ 48h |
| **F** | Portal 2.1 surface polish (2026-07-14) | `portalSurfaces.ts`, editorial unification, legacy kelio šalinimas, metric scale, content dedup | ✅ surface consistency 2026-07-14 |
| **G** | Portal 2.1 DS consistency (2026-07-14) | ribbons + CTA editorial; `portalCardShell.ts`; `PortalSlideCta`; GOLDEN §3.2d | ✅ 2026-07-14 |
| **L** | Bang L Readability dark/light (2026-07-14) | PORTAL_BEAT_SVG, portalBeatBarRow, portalSurfaces floor | ✅ 2026-07-14 |
| **K** | Bang J+K content/data polish (2026-07-14) | sources, teaser anchor, dedup, stat sync | ✅ 2026-07-14 |
| **I** | next-step-prompt B+C hybrid (2026-07-14) | PortalNextStepPromptBlock; PromptFlowDiagram removed | ✅ 2026-07-14 |
| **H** | Portal 2.1 UI audit + tobulinimo gairės (2026-07-14) | `PORTAL_2_1_UI_AUDIT.md`, `PORTAL_2_1_IMPROVEMENT_GUIDE.md`, `portal-21-audit.md` skill | ✅ auditas; Wave 4–5 CODING ✅ 2026-07-14 |

---

## 2. Kas veikia (nebekurti iš naujo)

1. **Immersive režimas** – ModuleView slepia course chrome; H1 = portalo headline; **vidutinis immersive:** desktop sticky tik progress + Tęsti.
2. **Storyboard eilė** – fiksuota `NEWS_PORTAL_SLIDE_53_5.md` § Rich Portal 2.0; **ne** grąžinti bannerių / 4 KPI / meme PNG.
3. **DS shell** – `PortalBlockShell` → `getContentBlockVariantClasses()` card blokams; editorial per `portalSurfaces.ts`.
4. **Hero** – 2-col editorial + `heroImageVertical` (ne trijų kolonų grid); `PortalDataBriefRow` Duomenys trumpai (ne Lead gradient).
5. **Editorial beats** – max 3, be CTA; copy JSON (`title` + `body`), diagrama = duomenys.
6. **awareness-gap golden pattern:**
   - stacked layout (title → body → diagrama)
   - `border-l-4` shell (PromoRibbon pattern)
   - SVG juostos + `AWARENESS_ROW` geometry SOT
   - caption **virš** juostos
   - inline **48 proc. punktų · suvokimo spraga**
   - HTML šaltinio footer (`border-t`)
7. **Surface sistema** – `portalSurfaces.ts`: editorial (takeaway, beats, DataBrief, pull-quote) vs card (`PortalBlockShell` DS tint); `PortalImageFrame` foto slotams.
8. **Pipeline:** USER_JOURNEY (testas) → CONTENT → SCHEME → CODING → DATA → QA.

---

## 3. Kas lūžo / ko vengti

| Problema | Priežastis | Taisyklė |
|----------|------------|----------|
| Skaičiai atrodė dekoratyvūs | Be apibrėžimų, be 48 pp, be šaltinio | Data viz = **viena išvada** + du argumentai + šaltinis |
| Tuščios kortelės | Vienodo dydžio box + vienas skaičius | Proporcingos juostos arba HTML bars (kaip tools/youth) |
| Caption overlap | Fiksuoti SVG Y offsetai | `awarenessRowLayout()` arba HTML tipografija |
| Per daug nested boxes | accent wrap + diagram border + SVG pageBg + yellow rect | Max **2** vizualiniai sluoksniai awareness beat |
| Satori PNG LT diacritikos | `inter-latin` font | React SVG arba pilnas LT font pipeline – ne half-measure |
| Copy dubliavimas | body + caption + diagram label | JSON body = 1 sakinys; pavyzdžiai tik diagramoje |
| 86/38 šaltinis nepatvirtintas | Illustraciniai skaičiai be SOT | CONTENT must confirm arba softinti formulę |
| Anti-PPT over-correction (2026-07-14) | Pašalintas vizualinis inkaras + kontrastas siekiant „ne PPT“ | Anti-PPT ≠ mažiau kortelių = mažiau kontrasto; **vienas** gradient inkaras leidžiamas |

---

## 4. Testuotojo feedback → kodas (koreliacija)

| Feedback | Fix (bangos B/C) |
|----------|------------------|
| „Neaišku ką matuoja 86/38“ | `leftCaption` / `rightCaption` + trumpesni label |
| „Nėra matematinio ryšio“ | inline 48 proc. punktų |
| „Tuščios kortelės“ | horizontal bars, ~180px view height |
| „Per daug teksto“ | body dedup (1 sakinys) |
| „Lipa tekstas“ | caption virš bar + `AWARENESS_ROW` rowGap |
| „Per daug sluoksnių“ | border-l-4, be vidinio diagram chrome |
| „Šaltinis kaip prierašas“ | HTML footer su separator |

**Likęs gap (premium SaaS):** 48h retest ⬜; hero 48 centrinis – tik jei retest <70% supratimo.

**2026-07-14:** beats 2–3 polish ✅; EN `gapUnit` → `pp`; 86/38/48 softinta (illustracinė spraga + tendencijų šaltinis).

---

## 5. Failų mapa (SOT chain)

```
docs/development/NEWS_PORTAL_SLIDE_53_5.md     ← storyboard, 48h test
docs/development/PORTAL_2_1_UI_AUDIT.md       ← UI/UX auditas (Bang H)
docs/development/PORTAL_2_1_IMPROVEMENT_GUIDE.md ← Wave 4–6 gairės
docs/development/PORTAL_BEAT_DIAGRAMS.md       ← beat diagram spec + polish rules
docs/development/PORTAL_BEAT_SATORI_PLAN.md    ← DEPRECATED (istorija)
src/data/modules.json (53.5)                   ← full SOT JSON
src/data/modules-en-m4-m6.json               ← EN overlay
src/components/slides/news-portal/
  NewsPortalInfographicSlide.tsx
  NewsPortalEditorialBeat.tsx
  NewsPortalPromoRibbon.tsx
  PortalNextStepPromptBlock.tsx
  beat-diagrams/
    portalBeatLayout.ts      ← geometry SOT
    portalBeatContent.ts     ← LT/EN diagram labels (ne headline)
    AwarenessGapDiagram.tsx  ← golden pattern
    LithuaniaContextDiagram.tsx
    PortalBeatDiagram.tsx
npm run generate:core-data                   ← po M1–6 JSON keitimo
npm run audit:m46                            ← po EN/LT copy
```

---

## 6. Atviri darbai (prioritetas)

| P | Užduotis | Agentai | Failai | Status |
|---|----------|---------|--------|--------|
| P1 | Portal 2.1 Wave 4: masthead fake hover fix | CODING → UI_UX | PortalMastheadNav.tsx | ✅ 2026-07-14 |
| P1 | Portal 2.1 Wave 4: section label dark contrast | CODING → UI_UX | portalSurfaces.ts | ✅ 2026-07-14 |
| P2 | Portal 2.1 Wave 5: navDecor, chapter nav, DataBrief, ticker | CODING → UI_UX | news-portal/* | ✅ 2026-07-14 |
| P1 | 48h retest (5 mobile, 375px) | QA / USER_JOURNEY | TEST_REPORT.md, NEWS_PORTAL_SLIDE_53_5.md | ⬜ |
| P1 | CONTENT: softinti 86/38/48 šaltinį | CONTENT | portalBeatContent.ts | ✅ 2026-07-14 |
| P2 | lithuania-context polish | SCHEME → CODING | LithuaniaContextDiagram | ✅ 2026-07-13 |
| P2 | next-step-prompt polish | SCHEME → CODING | PromptFlowDiagram.tsx | ✅ 2026-07-13 |
| P3 | Pašalinti nebenaudojamus `di_portal_meme_01–03.png` | QA | public/, CHANGELOG | ✅ 2026-07-14 |
| P3 | EN mobile overlap (HTML bars fallback) | UI_UX → CODING | AwarenessGapDiagram | ✅ nebereikia (EN `pp`) |
| P2 | Portal 2.1 consistency polish wave 2 (ribbon2 brand, DataBrief, tokens, dead code) | DATA → CODING → QA | modules.json, portalSurfaces.ts | ✅ 2026-07-14 |
| P2 | Portal 2.1 DS consistency (ribbon/CTA editorial, portalCardShell, tokens) | CODING → QA | portalSurfaces.ts, PortalSlideCta, GOLDEN §3.2d | ✅ 2026-07-14 |
| P2 | Portal 2.1 wave 3 (Depth brand shell; PromptFlow caps + stroke) | SCHEME → CODING → QA | PortalHeroKpiBlock, PromptFlowDiagram | ✅ 2026-07-14 |
| P2 | PromptFlow A+C hybrid (Įvestis/Promptas/Rezultatas + bridge sk. 43) | CONTENT → SCHEME → DATA | portalBeatContent.ts, modules.json | ✅ 2026-07-14 |
| P2 | In-page anchors (sidebar scrollTarget + PortalChapterNav) | CODING → DATA → QA | portalSectionAnchors.ts, PortalHeroSidebar | ✅ 2026-07-14 |

---

## 7. Agentų pamokos (santrauka)

Vienos eilutės formatas – pilnas sąrašas `.cursor/skills/*/lessons.md` (2026-07-13).

- **USER_JOURNEY:** duomenų skaidrėse pirmiausia aiškink *ką matuoja* ir *ryšį*, ne tik „gražų layout“.
- **CONTENT:** headline = viena mintis; body ne dubliuoja diagram caption; šaltinis turi būti patikimas arba softintas.
- **SCHEME:** row geometry SOT; caption virš bar; computed viewHeight – ne magic Y.
- **CODING:** awareness-gap = stacked + border-l-4; diagram chrome optional per beat.id.
- **CODING (wave 3):** Depth act – shell vs data spalva: `PORTAL_DEPTH_CARD_VARIANT` abiem card'ams; violet tik metric/bars/kicker; PromptFlow – cap visi accentKey, highlight per stroke.
- **CODING:** In-page anchors – sidebar `scrollTarget` + chapter nav; `portalNav` dekoratyvus; button + scrollIntoView, ne hash.
- **DATA:** beats be `image.src`; KPI `iconKey`; generate:core-data po M1–6.
- **UI_UX:** premium = mažiau sluoksnių + tipografijos disciplina, ne gradientai.
- **Typography Wave T1–T6 (2026-07-14):** section label suvienodinimas (`sectionBreak`/`sectionNav` xs); pullQuote lg/xl; hero subline sm; takeawayCta ≥ takeaway; bar rows vienas label dydis; body responsive; DataBrief 1-as stat `chapter` 3xl; SVG caption floor 12px. Regresijos guardrail: section label kontrastas ≥ 2026-07 hybrid recovery.
- **QA:** user test → TEST_REPORT → TODO; 48h protokolas privalomas prieš „done“.

---

## 8. Definition of Done (53.5 beat polish)

Skaidrei 53.5 **beat polish** laikomas baigtu kai:

- [x] awareness-gap: logika + kompozicija P1 polish
- [x] lithuania-context + next-step-prompt atitinka awareness golden pattern
- [x] SecondaryCards + Tools + InsightCard border-l-4 polish
- [ ] 48h retest pass (≥70% „supratau skaičius“, 0 caption overlap 375px)
- [x] CONTENT softino stat šaltinius (illustracinė spraga + tendencijų disclaimer, 2026-07-14)
- [x] CHANGELOG + doc sync (retrospektyva §4/§6, PORTAL_BEAT_DIAGRAMS, NEWS_PORTAL)

---

## Nuorodos

- Planai (Cursor): news-portal scroll, React SVG migration, awareness-gap polish
- Transcript: agent session 2026-07 (M4 sk. 53.5)
