# UI primitives (`src/components/ui/`)

Design System v0.1–v0.2 katalogas. SOT: [`docs/development/DESIGN_SYSTEM_V0_2.md`](../../../docs/development/DESIGN_SYSTEM_V0_2.md). Nauji komponentai naudoja **pilnus** Tailwind klasės string'us `Record<…>` map'uose (ne template literals).

Importas: `import { Card, Eyebrow } from '@/components/ui'` arba tiesioginis kelias `./ui/Card`.

---

## Card

`variant?: 'default' | 'brand' | 'accent'` — kortelės fonas ir rėmelis.

```tsx
import Card from './Card';

<Card variant="brand" className="p-5">
  Turinys
</Card>;
```

---

## CTAButton

`variant?: 'primary' | 'secondary' | 'accent'` — mygtukas; viduje naudoja `.btn-*` CSS (deprecated tiesioginiam JSX).

```tsx
import CTAButton from './CTAButton';

<CTAButton variant="primary" onClick={onNext}>
  Toliau
</CTAButton>;
```

---

## Banner

`variant?: 'info' | 'success' | 'warning' | 'terms'` — kairysis accent border, callout blokas.

```tsx
import Banner from './Banner';

<Banner variant="info" title="Trumpai">
  Paaiškinimas.
</Banner>;
```

---

## Table

Subkomponentai: `Table`, `TableHead`, `TableBody`, `TableRow`, `TableHeaderCell`, `TableCell`.

```tsx
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from './Table';
```

---

## LoadingSpinner

Centruotas krautuvas viso puslapio / sekcijos laukimui.

```tsx
import LoadingSpinner from './LoadingSpinner';

<LoadingSpinner />;
```

---

## ErrorBoundary

React klaidų riba su fallback UI.

```tsx
import ErrorBoundary from './ErrorBoundary';

<ErrorBoundary>
  <App />
</ErrorBoundary>;
```

---

## Eyebrow (v0.2 E4.1)

Maža antraštė virš H1 ar kortelės. `accent`: `brand` | `accent` | `slate` | `emerald` | `violet` | `cyan`. Optional Lucide `icon`.

```tsx
import Eyebrow from './Eyebrow';
import { BookOpen } from 'lucide-react';

<Eyebrow icon={BookOpen} accent="brand">
  Modulis 1 · Mokymas
</Eyebrow>;
```

**Proof:** `ModulesPage.tsx` (desktop level badge).

---

## IconChip (v0.2 E4.2)

Apvali piktograma. `role`: `cta` | `info` | `warn` | `success` | `error`. `size`: `sm` | `md` | `lg`. Default `decorative` (aria-hidden).

```tsx
import IconChip from './IconChip';
import { Briefcase } from 'lucide-react';

<IconChip icon={Briefcase} role="info" size="md" />;
```

**Proof:** `ModuleCompleteScreen.tsx` (use-case antraštė).

---

## SectionDivider (v0.2 E4.3)

Horizontali linija; su `label` — tekstas centre. Tas pats `accent` spektras kaip Eyebrow.

```tsx
import SectionDivider from './SectionDivider';

<SectionDivider label="Refleksija" accent="accent" className="my-2" />;
```

**Proof:** `ContentSlides.tsx` (`SummarySlide` — prieš refleksijos bloką).
