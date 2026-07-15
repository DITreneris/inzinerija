# M4 skaidrė 53.5 – news-portal editorial scroll

> **Skaidrė:** `id: 53.5`, `type: infographic`, `variant: news-portal`  
> **Modulis:** 4 (MVP)  
> **SOT:** `src/data/modules.json` → EN overlay `modules-en-m4-m6.json`

## Tikslas

Ilgas scroll – **sąmoningas UX** (straipsnio / portalo ritmas), ne dashboard kortelė. Redakcinės pauzės (editorial beats) ir promo juostos (ribbons) tarp duomenų blokų suteikia kvėpavimo ritmą ir sumažina „per daug informacijos vienu metu“ jausmą.

## Storyboard (fiksuota eilė – Portal 2.1, 2026-07-14)

```
Masthead (PortalMastheadNav: brand + nav + utility)
  → BreakingTicker (optional)
  → Hero zone (2fr + 1fr lg+: image + H1 + meta + subline + takeaway | heroSidebarTeasers)
  → EditorialBeat 1 (afterHero, React SVG, flat shell)
  → [Chapter: Duomenys trumpai]
  → PortalDataBriefRow (32,7% · 20% · 98% – 3 lygios kortelės, ne gradient)
  → PromoRibbon 1 (afterKpi, pull-quote)
  → SecondaryCards (Jaunimas + Lietuva, foto viršuje 16:9)
  → EditorialBeat 2 (afterSections)
  → [Chapter: Giliau]
  → ToolsZone (03 Įrankiai + 04 Darbuotojai)
  → PromoRibbon 2 (beforeInsight)
  → [Chapter: Santrauka]
  → InsightCard (3 punktai + illustrationHorizontal strip)
  → EditorialBeat 3 (beforeCta)
  → CTA (vienas mygtukas)
  → Footer + šaltiniai
```

## Portal 2.1 (2026-07-14)

**Modelis:** Rich Portal 2.0 foto + **portalo signalai** (nav, sidebar teasers, metadata) + **Duomenys trumpai** eilė (ne Lead gradient).

**Nauji JSON laukai:** `portalMeta`, `portalNav`, `breakingTicker`, `heroSidebarTeasers`.

**Deprecated (Portal 2.1):** Lead `mainInsightBlock` gradient virš fold (Rich Portal 2.0); hero `featured` inline; KPI IconChip strip editorial režime; legacy render keliai (`bannerImageHorizontal`, `LegacySectionCards`).

## Portal Surface System (2026-07-14 polish)

Vienintelis vizualinis šaltinis: [`portalSurfaces.ts`](../../src/components/slides/news-portal/portalSurfaces.ts).

| Surface       | Komponentai                                                            | Vizualas                                                       |
| ------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------- |
| **editorial** | takeaway, promo ribbons, beats, `PortalDataBriefRow`, `PortalSlideCta` | `border-l-4` + light tint (`getPortalEditorialSurfaceClasses`) |
| **card**      | secondary, tools, youth, insight                                       | `PortalBlockShell` → `getPortalCardShellClasses()`             |
| **chrome**    | masthead (+ fallback be nav), ticker, sidebar, chapter breaks, footer  | neutral / accent fallback                                      |

**Metric scale:** `PORTAL_HEADING.hero` (H1) · `chapter` (DataBrief 1-as stat, 3xl) · `inline` (DataBrief stat 2–3, secondary cards; 98% IT – violet). **Spacing:** `PORTAL_SPACING` — chapter `mt-8`, block `space-y-6`, `gapGrid`/`gapCards`.

**Ribbon2:** `variant: brand` (Depth act spalvų biudžetas: brand + violet, ne accent).

**Typography tokens (Typography Wave T1–T6):**

| Rolė                | Token                                           | Klasė                |
| ------------------- | ----------------------------------------------- | -------------------- | --- |
| Skyriaus break      | `getPortalSectionLabelClasses('break')`         | xs bold UPPERCASE    |
| Chapter nav         | `getPortalSectionLabelClasses('nav')`           | xs semibold sentence |
| Beat H2             | `PORTAL_HEADING.beat`                           | lg/xl bold           |
| Ribbon / pull-quote | `PORTAL_HEADING.pullQuote`                      | lg/xl semibold       |
| Card H3             | `PORTAL_TEXT.cardTitle`                         | base semibold        |
| Body                | `PORTAL_TEXT.body`                              | sm → lg base         |
| Hero subline        | `PORTAL_TEXT.bodySm`                            | sm                   |
| Takeaway            | `takeawayBold` base + `takeawayCta` base medium | —                    |
| Rubric (TYRIMAS…)   | `getPortalKickerClasses('hero'                  | 'neutral')`          | xs  |
| SVG caption         | `AWARENESS_ROW.captionSize`                     | ≥12px                |

Taip pat: `PORTAL_BULLET`, `PORTAL_SOURCE_FOOTER`, `PORTAL_TEXT` / `PORTAL_FOOTER`. Deprecated: `getPortalKickerClasses('chapter'|'rail')` → naudoti `sectionBreak`.

**Foto:** `PortalImageFrame` — variantai `hero` | `card-bleed` | `inset` (4 slotai).

## Rich Portal 2.0 (2026-07-14) – superseded Lead gradient

**Modelis:** 1.3.0 vizualinis sluoksnis (4 foto) + 2026-07 editorial architektūra + hybrid fixes − anti-PPT klaidos.

**Leidžiami image slotai (max 4):**

| Slot                                 | Failas                             |
| ------------------------------------ | ---------------------------------- |
| `heroImageVertical`                  | `di_portal_hero_vertical.png`      |
| `secondaryCards[0].imageVertical`    | `di_portal_youth_vertical.png`     |
| `secondaryCards[1].imageVertical`    | `di_portal_section03_vertical.png` |
| `insightCard.illustrationHorizontal` | `di_portal_insight_strip.png`      |

**Negrąžinti:** `bannerImageHorizontal`, `bannerBetweenKpiAndSections`, 4 KPI, meme/Satori beat PNG, trijų kolonų hero grid.

## Immersive režimas

- JSON: `"immersive": true` (default true skaidrei 53.5)
- **ModuleView:** slepiamas Modulio badge, H1, subtitle; slide wrapper be `card` chrome
- **Sticky nav (vidutinis immersive):** desktop – tik progress bar + Tęsti (be Atgal, be X/Y skaitiklio); mobile top – be „Modulis · N/M“ (bottom nav Atgal/Tęsti lieka)
- **H1:** tik portalo `headline` (`NewsPortalInfographicSlide`)
- **AppNav** (Promptų anatomija) – lieka

| Kas slepiama immersive    | Desktop | Mobile            |
| ------------------------- | ------- | ----------------- |
| Modulio badge + course H1 | taip    | taip              |
| Sticky Atgal              | taip    | ne (bottom nav)   |
| Skaitiklis N/M            | taip    | taip (top sticky) |
| Progress bar + Tęsti      | ne      | ne (bottom Tęsti) |

## Anti-PPT taisyklės (2026-07)

1. **Du surface tipai** – editorial (`getPortalEditorialSurfaceClasses`) arba card (`PortalBlockShell`); ne visi blokai per vieną shell.
2. **Spalvų biudžetas** – max 2 semantinės + 1 CTA **per chapter act viewport** (GOLDEN_STANDARD §3.2d išimtis ilgam scroll).
3. **Tipografija** – vienas dominuojantis skaičius per viewport; beat title ≤ hero H1 (`text-lg lg:text-xl`); section labels per `getPortalSectionLabelClasses`; body `text-sm lg:text-base` (GOLDEN §1); min matomas tekstas ≥12px.
4. **Metric primary zone** – KPI strip **nedublikuoja** ribbon/summary (žr. lentelę §46–57).
5. **Hero** – 2-col editorial su `heroImageVertical` (lg+); **ne** trijų kolonų foto+gradient+stats. Immersive H1 `text-2xl lg:text-4xl`. **Duomenys trumpai:** `PortalDataBriefRow` (ne Lead gradient).
6. **Chapter breaks** – `PortalChapterBreak` (tipografija, be box) prieš Duomenys / Giliau / Santrauka.

## In-page anchors (2026-07)

**Paskirtis:** Vienos skaidrės viduje peršokti iš hero į sekciją (ne kita modulio skaidrė, ne hash routing).

| Trigger                                            | Target `id`                                 | Turinys                                |
| -------------------------------------------------- | ------------------------------------------- | -------------------------------------- |
| `PortalChapterNav` (Duomenys · Giliau · Santrauka) | `portal-section-data` / `-depth` / `-close` | Chapter break landmark                 |
| `heroSidebarTeasers[].scrollTarget`                | JSON enum                                   | Sidebar „Svarbiausia“ teaser → sekcija |
| `portalNav` rubrikos                               | —                                           | **Dekoratyvios** (ne jump)             |

**Implementacija:** [`portalSectionAnchors.ts`](../../src/components/slides/news-portal/portalSectionAnchors.ts) — `scrollToPortalSection()` + `PORTAL_SCROLL_TARGET` (`scroll-margin` sticky offset). Triggeriai — `<button>`, ne `href="#..."`.

**Teaser mapping (53.5, Bang J):** Tendencija → `portal-beat-awareness`; Duomenys (20%) → `portal-section-data`; Analizė 69 % → `portal-beat-lithuania`.

**Anti-PPT ≠ vizualinio tuštinimo:** mažiau vienodų kortelių, bet **ne** mažiau kontrasto ar inkaro. Su editorial **leidžiami** 4 foto slotai (§ Rich Portal 2.0). Deprecated: banneriai, pertekliniai slotai (>4), meme PNG.

**Chapter map (4 acts):**

| Act       | Blokai                                      | Vizualinis tonas                                               |
| --------- | ------------------------------------------- | -------------------------------------------------------------- |
| **Lead**  | Masthead + Hero foto + takeaway + Beat1     | Editorial + brand/accent                                       |
| **Data**  | DataBriefRow + Ribbon + Secondary×2 + Beat2 | brand + emerald (Lietuva secondary = brand)                    |
| **Depth** | Tools + Youth + Ribbon2                     | brand ranking + violet hero KPI; ribbon2 **brand** (ne accent) |
| **Close** | Insight + Beat3 + CTA + Footer              | terms/summary + accent CTA                                     |

## JSON laukai

| Laukas                               | Paskirtis                                                                                     |
| ------------------------------------ | --------------------------------------------------------------------------------------------- |
| `portalMeta`                         | byline, publishedAt, readMinutes – redakcinis metadata                                        |
| `portalNav`                          | Dekoratyvi navigacija (max 7)                                                                 |
| `breakingTicker`                     | „Dabar:“ aktualijų juosta                                                                     |
| `heroSidebarTeasers`                 | Hero dešinė – 3 „svarbiausios“ eilutės                                                        |
| `immersive`                          | Slėpti course chrome ModuleView                                                               |
| `editorialBeats[]`                   | Redakcinės pauzės (max 3); `placement`: `afterHero`, `afterKpi`, `afterSections`, `beforeCta` |
| `promoRibbons[]`                     | Promo juostos; `placement`: `afterKpi`, `beforeInsight`                                       |
| `mainInsightBlock`                   | **Duomenys trumpai** eilėje (32,7%) – ne Lead gradient Portal 2.1                             |
| `featured`                           | **Duomenys trumpai** eilėje (98%) – ne hero inline Portal 2.1                                 |
| `heroImageVertical`                  | Hero foto (aspect 16/9 crop, mažesnis aukštis)                                                |
| `insightCard.illustrationHorizontal` | Santraukos strip (optional)                                                                   |

Su editorial: **nenaudoti** `bannerImageHorizontal`, `bannerBetweenKpiAndSections`. **`mainInsightBlock` + iki 4 foto slotų leidžiami** (Rich Portal 2.0).

## Statistikos distribucija (redundancy)

Kiekviena metrika turi **vieną primary zoną** – kitur tik trumpa nuoroda arba nebekartojama.

| Metrika                 | Primary zona                            | Secondary                                                                               |
| ----------------------- | --------------------------------------- | --------------------------------------------------------------------------------------- |
| 32,7% ES                | `PortalDataBriefRow` (Duomenys trumpai) | insight point 01                                                                        |
| 98% IT                  | `PortalDataBriefRow`                    | sidebar teaser be skaičiaus (tendencija)                                                |
| 20% ES įmonės           | `PortalDataBriefRow` + ribbon subline   | —                                                                                       |
| 56% produktyvumas       | ribbon subline / toolsInsight           | ne atskira KPI kortelė editorial                                                        |
| 69% LT                  | lithuania-context diagrama (+36,3 pp)   | SecondaryCard 02 / insight 03                                                           |
| 63,8% jaunimas          | SecondaryCard 01                        | insight point 02                                                                        |
| 9,8% LT įmonės          | SecondaryCard 02                        | —                                                                                       |
| ~15,8% darbe            | Darbuotojai 04 hero KPI                 | insight point 02                                                                        |
| 86/38/48 (illustracija) | awareness-gap diagrama                  | — (softinta: „illustracinė suvokimo spraga“, šaltinis – tendencijos, ne tikslūs faktai) |

**InsightCard:** tag `Santrauka`; 3 punktai; optional `illustrationHorizontal` (Rich Portal 2.0).

## Editorial beat taisyklės

- Leader `MemeMoment` analogas – **be CTA**
- Visi 3 beats: stacked layout (title → body → diagrama), `border-l-4` shell (kaip PromoRibbon)
- `awareness-gap` → accent; `lithuania-context` → brand; `next-step-prompt` → violet
- **React SVG diagramos** pagal `beat.id` – žr. `PORTAL_BEAT_DIAGRAMS.md`
- Max 2 semantinės spalvos per beat (`accentKey`)
- Copy tik JSON – diagrama rodo skaičius / trumpos etiketės

## Promo ribbon taisyklės

- Leader `HighlightStrip` analogas
- `border-l-4` brand arba accent
- Viena mintis + optional `stat`

## Asset brief (React SVG beats)

| beat.id             | Diagrama                  | Turinys                                              |
| ------------------- | ------------------------- | ---------------------------------------------------- |
| `awareness-gap`     | AwarenessGapDiagram       | Juostos 86/38, inline 48 proc. punktų, HTML šaltinis |
| `lithuania-context` | LithuaniaContextDiagram   | LT 69% vs ES 32,7%                                   |
| `next-step-prompt`  | PortalNextStepPromptBlock | 2 eil. tiltas + copyable prompt (be SVG 3-box)       |

Specifikacija: `PORTAL_BEAT_DIAGRAMS.md`. **Deprecated:** Satori PNG (`di_portal_meme_01–03.png`, `PORTAL_BEAT_SATORI_PLAN.md`).

## KPI ikonos

JSON `iconKey`: `globe`, `trending-up`, `building-2`, `map-pin` – render per `IconChip` + Lucide (ne OS emoji).

## 03 Įrankiai + 04 Darbuotojai (Variant B – skirtingi komponentai)

- **03 Ranking** – `PortalRankingBlock`: #1–#4, monochrome brand juostos, #1 emphasis; `toolsInsight` su 16 pp skirtumu; shell `PORTAL_DEPTH_CARD_VARIANT` (brand).
- **04 Hero KPI** – `PortalHeroKpiBlock`: shell brand (kaip ranking); hero `youthBigNum` (~15,8% darbe) kairėje **violet metric**; dešinėje `youthSegmentsLabel` (violet kicker) + 3 violet monochrome segmentai; `youthClosingInsight` footer.
- **Bendras bar row:** `PortalHorizontalBarRow` variantai `ranking` | `segment` | `default`.
- `youthHeroInsight` ir `youthImageVertical` – deprecated (senas stacked 40% hero).

## 48h user test (5 mobile)

| Metrika                                 | Pass                        |
| --------------------------------------- | --------------------------- |
| „Atrodė kaip straipsnis / portalas“     | ≥70%                        |
| „Atrodė kaip PowerPoint / prezentacija“ | ≤30%                        |
| „Per daug informacijos“                 | ≤30%                        |
| 3s test: apie ką skaidrė?               | 1 sakinys su DI + kontekstu |
| Scroll completion (pasiekia CTA)        | ≥60%                        |
| Suprato 86/38/48 (awareness-gap)        | ≥70%                        |

**Protokolas:** 5 dalyviai, mobile 375px, M4 iki sk. 53.5; po sesijos – klausimai (taip/ne + 1–5 + laisvas 3s atsakymas). Rezultatus įrašyti į `TEST_REPORT.md` § M4 sk. 53.5 anti-PPT.

## Komponentai

- `src/components/slides/news-portal/NewsPortalInfographicSlide.tsx` – storyboard
- `NewsPortalEditorialBeat.tsx` – beat render + `PortalBeatDiagram`
- `beat-diagrams/` – React SVG model/view (SCHEME §3.7)
- `NewsPortalPromoRibbon.tsx` – ribbon render
- `PortalRankingBlock.tsx` – 03 ranking (#1–#4, brand monochrome)
- `PortalHeroKpiBlock.tsx` – 04 hero KPI + segmentai
- `PortalBlockShell.tsx` – card shell (`getPortalCardShellClasses`)
- `PortalSlideCta.tsx` – editorial accent CTA (Close act)
- `PortalInsightCard.tsx` – insight card (terms)
- `portalCardShell.ts` – card surface token'ai (be radius/padding dubliavimo)
- `PortalChapterBreak.tsx` – chapter separator (tipografija)
- `PortalFeaturedStat.tsx` – inline hero stat (98%)
- `PortalMastheadNav.tsx` – 2-tier masthead + nav
- `PortalBreakingTicker.tsx` – aktualijų juosta
- `PortalHeroMeta.tsx` – byline · data · readMin
- `PortalHeroSidebar.tsx` – hero sidebar teasers
- `PortalDataBriefRow.tsx` – Duomenys trumpai (editorial surface)
- `portalSurfaces.ts` – editorial/card surface + metric + spacing token'ai
- `PortalImageFrame.tsx` – unified foto rėmelis (hero / card-bleed / inset)
- `portalUtils.ts` – placement helpers, `isNewsPortalImmersive`
- `portalKpiIcons.ts` – KPI Lucide mapping (legacy layout)

## UI audit (Portal 2.1, 2026-07-14)

- **Auditas:** `docs/development/PORTAL_2_1_UI_AUDIT.md` (14 skyrių, balai, OK/FAIL)
- **Tobulinimo gairės:** `docs/development/PORTAL_2_1_IMPROVEMENT_GUIDE.md` (Wave 4–6, ne-destruktyvios)
- **Skill:** `.cursor/skills/ui-ux-agent/portal-21-audit.md`
