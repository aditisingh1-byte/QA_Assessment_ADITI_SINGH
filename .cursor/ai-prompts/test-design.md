# AI Prompts – Test Design

**SUT:** https://practicesoftwaretesting.com/  
**API:** https://api.practicesoftwaretesting.com/api/documentation  
**Target artifacts:** `FunctionalTestCase.csv`, `PrismStructure/tests/` (UI + API) — *created in later steps*  
**Constraint:** 5–8 cases per type (manual + UI + API), including Smoke and Regression

**Purpose of this file:** Record prompts used to design/refine UI + API test scenarios and cases.

---

## Entry 1 — MANUAL_PROMPT for CSV generation (Step 1)

- **Prompt:**  
  Create a Senior Manual QA execution prompt with Rules and Skills so a later run outputs only `FunctionalTestCase.csv`, aligned to Toolshop and assessment limits (5–8 cases, one Expected Result, Smoke/Regression, UI+API ACs, Confirm twice on UI purchase).

- **AI Response Summary:**  
  Created `.cursor/ai-prompts/MANUAL_PROMPT.md` with role, execution order (context → Assessment → manual-rules → skills), CSV column schema per `manual-rules.md`, suggested 8-case smoke/regression checklist, and ready-to-paste user message for Step 3.

- **Validation Notes:**  
  MANUAL_PROMPT references Assessment and `.cursor/context/project_context.md` only; does not claim CSV exists yet. IDs use `TC-M-001` pattern from context.

---

## Planned — Scenario split and traceability (Step 3–7)

*Add entries iteratively when manual CSV and Playwright suites are designed.*

| Step | Prompt focus |
|------|----------------|
| 3a | Smoke vs Regression scenario list only (no CSV) |
| 3b | Generate `FunctionalTestCase.csv` via MANUAL_PROMPT |
| 3c | AC → TC-M traceability self-review |
| 6–7 | UI/API case titles and tags before coding |

---

## Reusable test-design prompt (Rules + Skills)

```text
Act as Senior QA Test Designer for Toolshop (UI + API).

RULES:
- 5–8 cases per tier (Manual / UI / API)
- One business scenario per case
- Exactly one Expected Result
- Tag @Smoke or @Regression
- Cover UI-AC1, UI-AC2, API-AC1, API-AC2
- UI purchase must mention Confirm twice

SKILLS:
- Equivalence partitioning & negatives
- E2E path design
- Smoke vs Regression judgment
- Traceability (AC → TC)

Output:
1) Scenario list
2) Traceability table
3) FunctionalTestCase.csv (manual only) OR Playwright case titles (automation design only)
```
