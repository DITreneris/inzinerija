# Brand mark spec (Prompt Anatomy) — DS v0.3.1

> Vienas šaltinis (SOT) ženklui „Prompt Anatomy / Promptų anatomija". Kodo konstantos: [`src/constants/brand.ts`](../../src/constants/brand.ts). Komponentas: [`src/components/ui/BrandMark.tsx`](../../src/components/ui/BrandMark.tsx). Phase 2 extract kontraktas: [PACKAGES_BRAND_CONTRACT.md](PACKAGES_BRAND_CONTRACT.md).

## 1. Tikslas

Iki DS v0.3.1 ženklas buvo nenuoseklus: nav ir hero naudojo `Zap` ant `brand-900` fono, footer — `Sparkles` ant `brand-500→accent-500` gradiento. Tikslas: vienas `BrandMark` komponentas, vienas glifas (`Zap`), viena spalvų sistema — atitinkanti hub favicon.

## 2. Glifas ir spalvos (hub favicon SOT)

| Elementas        | Reikšmė               | Šaltinis                           |
| ---------------- | --------------------- | ---------------------------------- |
| Glifas           | Lucide `Zap` (žaibas) | nav/hero jau naudoja               |
| Badge gradientas | `#050d14 → #103b5a`   | hub `favicon.svg`                  |
| Žaibo spalva     | `#fbd304` (gold)      | hub `favicon.svg`; app `text-gold` |
| `strokeWidth`    | `1.5`                 | esamas nav/hero stilius            |

Spalvos kode: `BRAND.colors.badgeStart`, `badgeEnd`, `bolt`. App UI gali naudoti Tailwind `bg-brand-900` + `text-gold` ekvivalentą (vizualiai artimas), favicon — tikslūs hex.

## 3. Variantai (`BrandMark` props)

| Variantas   | Kur naudojama         | Badge                           | Glifas          | Wordmark       |
| ----------- | --------------------- | ------------------------------- | --------------- | -------------- |
| `nav`       | `AppNav` logotipas    | `rounded-xl bg-brand-900 p-2.5` | `w-5 h-5`       | šalia (caller) |
| `hero`      | `HomePage` hero       | `rounded-3xl bg-brand-900 p-6`  | `w-16 h-16`     | ne             |
| `footer`    | `App` footer          | `rounded-lg bg-brand-900 p-1.5` | `w-3.5 h-3.5`   | šalia (caller) |
| `icon-only` | bendras, be konteksto | konfigūruojamas                 | konfigūruojamas | ne             |

**Dydžiai nekeičiami** nuo esamų (`w-5`, `w-16`, `w-3.5`) — layout shift draudžiamas. Footer migruoja iš `Sparkles` + gradiento į `Zap` + `brand-900` (nuoseklumas; vienintelis vizualus pokytis).

## 4. A11y

- Dekoratyvus ženklas (kai šalia yra matomas wordmark, pvz. nav/footer): `aria-hidden="true"` ant glifo; prieinamą pavadinimą teikia gretimas tekstas arba mygtuko `aria-label`.
- Savarankiškas ženklas be teksto (`icon-only` kaip vienintelis turinys): turi turėti `aria-label` (pvz. `BRAND` wordmark) arba `role="img"`.
- Kontrastas: `text-gold` ant `bg-brand-900` — tikrina UI_UX (S6), light/dark.

## 5. Ko BrandMark neliečia

- `ActionIntroSlide` CTA `Zap` — veiksmo (ne brand) semantika, **lieka**.
- Modulių/identiteto ikonos (`MODULE_IDENTITY_ICON_MAP`, DS v0.3.1) — atskira sistema.
- `apple-touch-icon.png`, `og-image.png` — ne šio spec dalis (Phase 2 / atskira raster generacija).

## 6. Susiję

- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) § Brand mark
- [DESIGN_SYSTEM_V0_2.md](DESIGN_SYSTEM_V0_2.md) backlog B12 (`packages/brand`)
- [ECOSYSTEM_MAP.md](../ECOSYSTEM_MAP.md)
