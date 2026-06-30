# `packages/brand` contract (Phase 2 — frozen API)

> **Statusas:** Phase 2 (atskiras PR, **ne dabar**). Šis dokumentas užšaldo API formą, kad Phase 1 (`inzinerija` repo) kodas migruotų be lūžio į bendrą paketą `promptanatomy` monorepo.

## 1. Kodėl

`inzinerija` (training) ir hub (`DITreneris/promptanatomy` → `frontend/`) abu turi brand ženklą (`Zap`, wordmark, favicon). Šiuo metu jie dubliuojasi. Phase 2 — vienas bendras paketas `packages/brand`, kurį importuoja abu.

## 2. Frozen API (turi nesikeisti forma)

Phase 1 kuria šiuos eksportus `inzinerija` repo; Phase 2 juos perkelia į `@promptanatomy/brand` su tuo pačiu paviršiumi.

### 2.1 `BRAND` konstanta — [`src/constants/brand.ts`](../../src/constants/brand.ts)

```ts
BRAND.nameLt; // 'Promptų anatomija'
BRAND.nameEn; // 'Prompt Anatomy'
BRAND.domain; // 'promptanatomy.app'
BRAND.hubUrl; // 'https://www.promptanatomy.app/'
BRAND.trainingPath; // '/anatomy/'
BRAND.legacyTrainingPath; // '/anatomija/' (301 only)
BRAND.colors.badgeStart; // '#050d14'
BRAND.colors.badgeEnd; // '#103b5a'
BRAND.colors.bolt; // '#fbd304'
brandName(locale); // locale-aware wordmark, fallback LT
```

### 2.2 `BrandMark` komponentas — [`src/components/ui/BrandMark.tsx`](../../src/components/ui/BrandMark.tsx)

```ts
type BrandMarkVariant = 'nav' | 'hero' | 'footer' | 'icon-only';
interface BrandMarkProps {
  variant?: BrandMarkVariant; // default 'icon-only'
  className?: string; // badge wrapper extra classes
  'aria-label'?: string; // jei naudojamas be gretimo teksto
}
```

Spec: [BRAND_MARK_SPEC.md](BRAND_MARK_SPEC.md).

### 2.3 Favicon — [`public/favicon.svg`](../../public/favicon.svg)

Spalvos = `BRAND.colors`. Phase 2: paketo asset + `vercel-build` copy step.

## 3. Phase 2 migracija (handoff, ne dabar)

1. `packages/brand` monorepo: `brand.ts`, `BrandMark.tsx`, `favicon.svg`.
2. `frontend/Navbar.jsx` (hub) importuoja `BrandMark` vietoj inline `Zap`.
3. `inzinerija` importuoja iš `@promptanatomy/brand` (alias arba submodule path).
4. `scripts/vercel-build.sh`: favicon copy iš paketo; alias resolve.
5. **Kontrakto testas:** importų forma (§2) turi galioti nepakitusi.

## 4. Ko Phase 1 NEDARO

- Nekuria `packages/` katalogo `inzinerija` repo.
- Nekeičia hub `frontend/` ar `vercel.json`.
- Nedaro raster asset (`apple-touch-icon`, `og-image`) regeneracijos.
