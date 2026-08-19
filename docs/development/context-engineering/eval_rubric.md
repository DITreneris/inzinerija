# Evaluation rubric (content & UX)

> **Purpose:** Consistent quality checks for content and UX. Use for manual review or (optional) heuristics / LLM-as-judge.  
> **See also:** RELEASE_QA_CHECKLIST.md (deployment sanity); TEST_REPORT.md (bugs).

---

## 1. Dimensions

| Dimension                    | What we measure                                                                  | Pass threshold (1–3)                                                     |
| ---------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **CTA clarity**              | "Next step" is explicit (e.g. "Pereikite prie Modulio 2" not "Tęskite mokymąsi") | 3 = CTA names target (module/quiz/certificate)                           |
| **Tone**                     | Professional, consistent with DI terminology (DI not "AI" in UI)                 | 3 = No violations in sampled slides                                      |
| **Lietuviškos**              | Correct Lithuanian characters (ž, ė, ą, ų, ū, š, č, į) in user-facing text       | 3 = No common substitutions (perziureti→peržiūrėti, etc.) in sampled set |
| **Links**                    | Internal (#main-content) and external (tools, sources) work                      | 3 = Spot-check no 404s                                                   |
| **Module/slide consistency** | Skaidrė numbering (4.1–4.7 = only Modulio 4); no conflicting "Modulis X" usage   | 3 = Matches CONTENT_MODULIU_ATPAZINIMAS                                  |

---

## 2. Levels (per dimension)

- **3 – Pass:** Meets criteria; no action.
- **2 – Minor:** One or two fixable issues (e.g. one CTA vague, one typo).
- **1 – Fail:** Systematic issue or blocking (e.g. wrong numbering, broken flow).

**Overall pass:** All dimensions ≥ 2; at least 4 of 5 at 3.

---

## 3. When to run

- **Manual:** Before release; one person runs rubric on at least one module + HomePage + one CTA path. Log result in TEST_REPORT or changelog.
- **Optional heuristic:** One automated check (e.g. "CTA contains next module number or 'quiz' / 'apklausa'" or lietuviškos regex) in CI or pre-commit. Start with one; add more only if ROI is clear.

---

## 4. LLM-as-judge (optional later)

If you add automated evaluation:

- **Direct scoring** fits: CTA clarity, tone, lietuviškos (objective criteria).
- **Rubric:** Use this document as the rubric; require justification before score (reduces variance).
- **Bias:** Prefer same rubric for human and LLM; compare a sample to detect systematic drift.

Reference: Agent-Skills repo – skills/evaluation, skills/advanced-evaluation.
