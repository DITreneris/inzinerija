# M7–M9 Locale Fix Inventory

Date: 2026-07-07

## Baseline

- `npm run audit:m49`: pass before code fixes.
- `npm run audit:nav-labels`: added in this change; pass after implementation.
- M7–M9 slide/footer parity: M7 58/58 slides, M8 5/5, M9 22/22.

## Findings

| Priority | File                                                          | Area                | Issue                                                                                | Resolution                                                                                           |
| -------- | ------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| P0       | `src/components/ModuleView.tsx`                               | Navigation CTA      | Title-derived `Continue: {{label}}` had no defensive guard for Lithuanian fragments. | Extracted `src/utils/navLabel.ts` and added EN fallback to `Continue` when a label looks Lithuanian. |
| P0       | `scripts/audit-nav-labels.mjs`                                | Release gate        | No deterministic audit for generated next-slide labels.                              | Added M1–M9 LT/EN nav label audit and `audit:nav-labels` script.                                     |
| P1       | `src/components/slides/shared/PracticalTask.tsx`              | M9 practice CTA/UI  | 29 inline `locale === 'en'` UI strings in M9 scenario task surface.                  | Moved visible labels and aria text to `testPractice` locale keys.                                    |
| P1       | `src/components/slides/types/TestPracticeSlides.tsx`          | M8 test results     | Module 8 pass/fail CTA strings were inline.                                          | Moved M8 messages and CTA labels to `testPractice` locale keys.                                      |
| P1       | `src/components/slides/types/content/IntroActionPieSlide.tsx` | M7 slide 70.5       | Intro action pie fallback labels and modal headings were inline.                     | Moved fallback labels to `contentSlides` locale keys.                                                |
| P2       | `src/components/slides/types/ContentSlides.tsx`               | Section break pills | Section-break recap pills showed LT labels in EN.                                    | Moved 3/5/7 pill label sets to `contentSlides` locale keys.                                          |
| P2       | `src/components/SlideContent.tsx`                             | Loading fallback    | Suspense fallback used hardcoded `Kraunama...`.                                      | Reused existing `module.loading` key.                                                                |
| P1       | `src/data/modules-en-m7-m9.json`                              | EN footer numbers   | M7 reliability block EN footers were one position behind.                            | Updated EN footer numbers 30–39 to 31–40.                                                            |

## Out Of Scope

- Full `TestPracticeSlides.tsx` M1–M6 hardcode cleanup.
- Runtime footer generation.
- Rebuilding `modules-en-m7-m9.json` from `build-en-m7-m9.mjs`.
