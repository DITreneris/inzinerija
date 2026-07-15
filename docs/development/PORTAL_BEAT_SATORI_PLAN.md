# M4 sk. 53.5 – Editorial beat PNG: kokybės auditas + Satori planas

> **Statusas (2026-07): DEPRECATED** – production naudoja **React SVG** diagramas. Žr. `PORTAL_BEAT_DIAGRAMS.md`.  
> **Kontekstas:** `di_portal_meme_01–03.png` editorial beats skaidrėje 53.5  
> **Sister repos:** [DITreneris/blog](https://github.com/DITreneris/blog) (Satori pipeline), [DITreneris/site](https://github.com/DITreneris/site) (rankiniu būdu OG, be Satori)

---

## OK/FAIL auditas (dabartiniai AI-generated PNG)

| Kriterijus         | Target                          | Dabartinė būsena              | Verdict    |
| ------------------ | ------------------------------- | ----------------------------- | ---------- |
| Failo dydis        | ≤150 KB / beat (mobile scroll)  | 1523–2608 KB                  | **FAIL**   |
| Aspect ratio       | 16:9 (`aspect-video`)           | 16:9 (tikėtina)               | OK         |
| Brand paletė       | `#627d98`, `#d4a520`, slate     | Generinė AI paletė            | **FAIL**   |
| Tekstas ant vaizdo | Neprivalomas (copy JSON)        | Dažnai miglotas / anglų       | **FAIL**   |
| Lietuviškos raidės | Jei tekstas – ž, ė, ą, ų…       | Nėra garantijos               | **FAIL**   |
| Atkartojamumas     | `npm run generate:portal-beats` | Rankinis AI gen, be manifest  | **FAIL**   |
| Redakcinis tonas   | Verslo humoras / diagrama       | Stock meme jausmas            | **FAIL**   |
| A11y `alt`         | Atitinka JSON `image.alt`       | Alt JSON OK, vizualas generic | Dalinai OK |
| Lazy load          | Beškai 2–3                      | Per dideli failai lėtina LCP  | **FAIL**   |

**Išvada:** Dabartiniai PNG tinka kaip **laikinas placeholder**, ne production. Perėjimas į **Satori + resvg** (kaip [blog](https://github.com/DITreneris/blog)) – rekomenduojamas P1.

---

## Ką paimti iš sister repos

### [blog](https://github.com/DITreneris/blog) – pagrindinis SOT

| Blog failas                          | Mūsų adaptacija                                            |
| ------------------------------------ | ---------------------------------------------------------- |
| `scripts/lib/render.mjs`             | `scripts/satori/lib/render.mjs` – satori → SVG → resvg PNG |
| `scripts/fetch_og_fonts.mjs`         | `scripts/fetch-satori-fonts.mjs` – Inter WOFF              |
| `scripts/generate_satori_images.mjs` | `scripts/generate-portal-beats.mjs` – CLI                  |
| `data/illustrations.yaml`            | `data/satori/portal-beats.yaml` – manifest                 |
| `data/og/templates/*.mjs`            | `scripts/satori/templates/editorial-beat.mjs`              |
| `data/og/brand.mjs`                  | `scripts/satori/brand.mjs` – **training** tokenai          |
| `--check`, `--dry-run`, `--id`       | Tas pats CLI pattern                                       |

### [site](https://github.com/DITreneris/site) – ko **nenaudoti** Satori beats

- `scripts/generate-og.mjs` – tik cache-bust rankiniam `og_2.png`, ne generavimas
- Tamsus marketing gradient – neatitinka **šviesaus** news-portal (`portalas.txt`, GOLDEN_STANDARD §3.5)
- Naudoti tik **ecosystem messaging** ir deploy discipliną, ne vizualinį pipeline

---

## Satori architektūra (training repo)

```
data/satori/portal-beats.yaml     # manifest: id, template, variant, output, stat props
scripts/satori/
  brand.mjs                       # #627d98, #d4a520, #f5f4f0 (portal light)
  typography.mjs
  jsx.mjs
  lib/render.mjs
  templates/
    editorial-beat.mjs            # 3 variantai: awareness | lithuania | next-step
    index.mjs
scripts/fetch-satori-fonts.mjs
scripts/generate-portal-beats.mjs
public/di_portal_meme_*.png       # output (overwrite)
```

**Dydis:** 1280×720 (16:9), tikėtinas PNG 40–120 KB.

---

## 3 beat šablonai (Satori variant)

| ID                  | Variant         | Vizualinė idėja                                   |
| ------------------- | --------------- | ------------------------------------------------- |
| `awareness-gap`     | `split-compare` | 86% naudoja vs 38% suvokia – suvokimo spraga      |
| `lithuania-context` | `stat-ribbon`   | 69% LT vs 32,7% ES – virš vidurkio                |
| `next-step-prompt`  | `prompt-flow`   | Statistika → Promptas → Veiksmas (be CTA mygtuko) |

Tekstas ant vaizdo – **trumpas LT** (1 headline + 2 bullet), sinchronizuotas su `modules.json` `editorialBeats[].title`.

---

## Workflow

```bash
npm install                    # prideda satori, resvg, js-yaml, @fontsource/inter
npm run fonts:satori           # Inter WOFF → data/satori/fonts/
npm run generate:portal-beats  # visi 3 beats → public/
npm run generate:portal-beats -- --id awareness-gap --dry-run
npm run generate:portal-beats -- --check
```

Po regeneracijos: vizualiai peržiūrėti M4 sk. 53.5, 48h user test (`NEWS_PORTAL_SLIDE_53_5.md`).

---

## Rizikos

1. **Satori ≠ foto meme** – humoras per diagramą/kontrastą, ne stock personažus.
2. **Šriftai** – privalomas `fonts:satori` prieš pirmą generavimą (Windows: `node scripts/...` vietoj `npm run --`).
3. **Blog dark vs portal light** – naudojame atskirą `brand.mjs`, ne kopijuojame blog tamsų gradientą.
