# M4 sk. 53.5 – Editorial beat React SVG diagramos

> **Skaidrė:** `id: 53.5`, `variant: news-portal`  
> **Model/view split:** SCHEME_AGENT geometrija + CODING_AGENT render  
> **Copy SOT:** JSON `title` + `body` (diagramose – tik skaičiai ir trumpos etiketės)

---

## Architektūra

```
src/components/slides/news-portal/beat-diagrams/
  portalBeatLayout.ts              # Geometrijos SOT + PORTAL_BEAT_SVG (view)
  portalBeatBarRow.tsx             # Shared bar row (dark-aware fill)
  portalBeatContent.ts             # LT/EN beat etiketės (ne headline)
  AwarenessGapDiagram.tsx          # split-compare
  LithuaniaContextDiagram.tsx      # horizontal bars 69/32,7 + gap hero
  PortalNextStepPromptBlock.tsx    # tiltas + copyable prompt (next-step)
  PortalBeatDiagram.tsx            # maršrutizatorius pagal beat.id
```

**Maršrutizavimas pagal `beat.id`:**

| id | Komponentas | Vizualas |
|----|-------------|----------|
| `awareness-gap` | AwarenessGapDiagram | Proporcingos juostos 86/38, inline 48 proc. punktų, HTML šaltinis |
| `lithuania-context` | LithuaniaContextDiagram | Proporcingos juostos 69/32,7, inline +36,3 proc. punktų, HTML šaltinis |
| `next-step-prompt` | PortalNextStepPromptBlock | 2 eil. tiltas į sk. 43 + copyable promptas (be SVG 3-box) |

---

## Taisyklės

1. **Vienas copy šaltinis** – antraštė ir body tik JSON; diagrama **nedublikuoja** headline.
2. **Lokalizacija** – LT diacritika garantuota React/SVG; EN overlay naudoja `portalBeatContent.ts` EN bloką.
3. **A11y** – `aria-label` ant diagramos wrapper; vidinis SVG `aria-hidden`.
4. **Spalvos** – `accentKey` iš JSON; beat SVG tekstas/tracks – `PORTAL_BEAT_SVG` (Tailwind `dark:fill-*`, view sluoksnis); semantinės bar spalvos – `PORTAL_BEAT_COLORS`.
5. **KPI strip** – Lucide per `IconChip` + JSON `iconKey` (`globe`, `trending-up`, `building-2`, `map-pin`).

### awareness-gap polish (2026-07)

- **Row geometry:** `AWARENESS_ROW` + `awarenessRowLayout()` – caption virš juostos, be fiksuotų Y.
- **Sluoksniai:** beat shell = `border-l-4` (PromoRibbon pattern); diagrama be vidinio border/shadow/`pageBg`.
- **48 hero:** inline tekstas SVG, ne geltonas blokas.
- **Šaltinis:** HTML footer su `border-t` po diagrama (`PortalBeatDiagram`).
- **CONTENT softinimas (2026-07-14):** `gapLabel` = „illustracinė suvokimo spraga“; šaltinis – tendencijos (ne tikslūs faktai); EN `gapUnit` = `pp`.

### lithuania-context polish (2026-07-13)

- **lithuania-context:** tas pats bar pattern kaip awareness-gap; hero `+36,3 proc. punktų`; stacked `border-l-brand-500`.

### next-step-prompt B+C hybrid (2026-07-14)

- **next-step-prompt:** `PortalNextStepPromptBlock` — 2 eil. tiltas (sk. 43) + copyable promptas komandos santraukai; **be** `PromptFlowDiagram` SVG.
- **Copy SOT:** `portalBeatContent.ts` → `nextStepPrompt` (bridgeLine1/2, promptLabel, promptTemplate); JSON title/body nekeičiamas.
- **PromptFlowDiagram.tsx** — pašalintas; `portalBeatLayout.ts` FLOW_* konstantos pašalintos.
- **Visi 3 beats:** stacked layout (title → body → vizualas), ne zig-zag.

---

## JSON (53.5)

- `editorialBeats[]` – **be** `image` bloko (legacy optional tipuose).
- `kpiCards[]` – `iconKey` vietoj emoji.

---

## Deprecated: Satori PNG pipeline

Ankstesnis `npm run generate:portal-beats` + `di_portal_meme_01–03.png` – **deprecated** (LT diacritikos ir dublikuoto copy problemos). Istorija: `PORTAL_BEAT_SATORI_PLAN.md`.

---

## SCHEME §5 checklist (beats)

| Punktas | Statusas |
|---------|----------|
| Model/view atskirtas (`portalBeatLayout.ts` vs `*Diagram.tsx`) | OK (SVG beats); next-step = HTML |
| Be headline dubliavimo | OK |
| Dark mode – SVG label/caption/track | `PORTAL_BEAT_SVG` + `portalBeatBarRow` | OK (2026-07-14 Bang L) |

---

## Susiję failai

- `NewsPortalEditorialBeat.tsx` – zig-zag layout + `PortalBeatDiagram`
- `NEWS_PORTAL_SLIDE_53_5.md` – storyboard
- `GOLDEN_STANDARD.md` §3.5 – news-portal UX
