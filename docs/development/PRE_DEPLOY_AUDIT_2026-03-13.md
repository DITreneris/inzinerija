# Pre-deploy gili kodo bazės analizė (2026-03-13)

> **Tikslas:** Aptikti klaidas, neatitikimus, bug'us ir tobulinimus prieš deploy į DITreneris/inzinerija (GitHub Pages).

---

## 1. Santrauka

| Sritis | Rezultatas | Pastabos |
|--------|------------|----------|
| **Schema** | ✅ Praeina | `npm run validate:schema` – visi JSON failai OK |
| **Lint** | ✅ Praeina | `npm run lint` – be klaidų |
| **Testai** | ✅ Praeina | Vitest run – 26 failai, 203+ testai |
| **Build** | ✅ Praeina | Default ir `VITE_MVP_MODE=1` su `VITE_BASE_PATH=/inzinerija/` |
| **Base path** | ✅ Sutampa | vite.config.ts production default `/inzinerija/`; deploy.yml – visi build su `VITE_BASE_PATH: '/inzinerija/'` |
| **Repo nuorodos** | ✅ Teisingos | package.json: repository, bugs, homepage → DITreneris/inzinerija |
| **Vaizdų keliai** | ✅ BASE_URL | ContentSlides, CharacterCard, BlockSlides, AgentOrchestratorDiagram naudoja `import.meta.env.BASE_URL` |
| **Lietuviškos raidės (grep)** | ✅ Nėra tipinių klaidų | perziureti, Ziniu, reiskia, zemelapis, Ka ismokote, ypac – nerasta src/ |

---

## 2. Kas anksčiau nepavyko (CHANGELOG / TEST_REPORT)

- **Base path 404:** Build su `/anatomija/`, o GitHub Pages repo pavadinimas `inzinerija` → asset'ai 404. **Išspręsta:** deploy.yml ir vite.config default `/inzinerija/`.
- **PNG vaizdai po deploy:** Be BASE_URL → 404. **Išspręsta:** ContentSlides, CharacterCard ir kt. naudoja BASE_URL.
- **ResizeObserver testuose (jsdom):** AppNav mėtė `ResizeObserver is not defined`. **Išspręsta:** setup.ts global mock; AppNav naudoja guard.
- **DiPrezentacijosWorkflowDiagram:** `ARROW_MARKER_LEN is not defined` skaidrėje 47. **Išspręsta:** konstanta pridėta faile.
- **Lazy chunk retry (mobile):** Skaidrė 47 „Nepavyko užkrauti skaidrės“. **Išspręsta:** lazyWithRetry.
- **EN UI hardcoded LT:** AdvancedBlockSlide, PromptTemplateSlide, ActionIntroSlide namespace – **Išspręsta** (i18n / getT).
- **Sticky nav height:** Desktop AppNav wrap → sticky top-16 neteisingas. **Išspręsta:** --app-nav-height CSS variable.
- **Footer skaidrių numeracija (M4 34–36):** **Išspręsta** (TEST_REPORT).
- **QuizPage currentQ undefined:** **Išspręsta** (fallback).

---

## 3. Šios analizės pataisymai

| Kas | Pakeitimas |
|-----|------------|
| **README.md** | GitHub Pages prieiga pakeista iš `ditreneris.github.io/anatomija/` į `ditreneris.github.io/inzinerija/`; pastaba apie base path atnaujinta – production default `/inzinerija/`. |
| **LlmArchDiagramDiagram.tsx** | ResizeObserver naudojamas per guard (kaip AppNav): tik jei `window.ResizeObserver` egzistuoja; išvengiama klaidos senose naršyklėse arba edge testuose. |

---

## 4. Rekomenduojami žingsniai prieš deploy

1. **PRE_DEPLOY_INZINERIJA.md checklist:** Base path, repo nuorodos, validate:schema, lint, test:run, lokalus production build + preview po `/inzinerija/`.
2. **GitHub:** Settings → Pages → Source = **GitHub Actions** (jei dar ne).
3. **Po deploy:** Atidaryti https://ditreneris.github.io/inzinerija/ – JS/CSS 200, skaidrė su vaizdais, LT/EN perjungimas.

---

## 5. Žemos rizikos / vėlesni darbai

- **ROADMAP.md:** Vis dar mini „Base path: `/anatomija/` (arba repo nustatymas)“ – galima atnaujinti į „`/inzinerija/` (production default)“.
- **GOLD_LEGACY_STANDARD.md:** Kai kuriuose pavyzdžiuose likę `/anatomija/` – informacinė nuoseklumas.
- **scripts/README-BANNER.md:** Nuoroda į `ditreneris.github.io/anatomija/` – jei banner naudojamas inzinerija repo, pakeisti į inzinerija.
- **Rankinė RELEASE_QA_CHECKLIST §5d:** M5/M6 PDF, M4 skaidrė 56, M6 skaidrė 64 – rekomenduojama prieš release (žmogus).

---

## 6. Nuorodos

- Pre-deploy inzinerija: [docs/deployment/PRE_DEPLOY_INZINERIJA.md](../deployment/PRE_DEPLOY_INZINERIJA.md)
- Release QA: [RELEASE_QA_CHECKLIST.md](RELEASE_QA_CHECKLIST.md)
- Testų ataskaita: [TEST_REPORT.md](TEST_REPORT.md)
