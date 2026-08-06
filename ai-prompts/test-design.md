# AI Prompts – Test Design

**SUT:** https://practicesoftwaretesting.com/  
**API:** https://api.practicesoftwaretesting.com/api/documentation  
**Artifacts produced:** `FunctionalTestCase.csv`, `PrismStructure/tests/` (UI + API) — *automation in later steps*  
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

## Entry 2 — Scenario list only (Step 3a)

- **Prompt:**  
  From `project-info.md` ACs, list 8 manual scenarios with Smoke/Regression and UI-AC1/AC2/API-AC1/AC2 tags. No CSV yet.

- **AI Response Summary:**  
  TC-M-001 Smoke catalog (UI-AC2); TC-M-002 Smoke login (UI-AC1); TC-M-003 Smoke add to cart (UI-AC2); TC-M-004 Regression register/profile (UI-AC1); TC-M-005 Regression E2E COD Confirm×2 My Invoices (UI-AC2); TC-M-006 Regression invalid login (UI-AC1); TC-M-007 Smoke API register/login/token/cart (API-AC1); TC-M-008 Regression API products→cart→invoice (API-AC2).

- **Validation Notes:**  
  Eight cases within assessment cap. Smoke and regression both represented. Confirm twice assigned only to TC-M-005.

---

## Entry 3 — Generate FunctionalTestCase.csv (Step 3b)

- **Prompt:**  
  Execute manual test design per `.cursor/ai-prompts/MANUAL_PROMPT.md`, `manual-rules.md`, and Step 3a scenario list. Write `FunctionalTestCase.csv` at repository root with all mandatory columns and one Expected Result per case.

- **AI Response Summary:**  
  Created `FunctionalTestCase.csv` with 8 cases (TC-M-001 through TC-M-008). Mixed categories: Positive, Negative, Business Workflow, End-to-End. API cases documented as manual API steps. Test data uses `{timestamp}` placeholders for uniqueness.

- **Validation Notes:**  
  UTF-8 CSV; fields with commas/newlines quoted. No automation code in deliverable.

---

## Entry 4 — Self-review manual suite (Step 3c)

- **Prompt:**  
  Review `FunctionalTestCase.csv` against `manual-rules.md` Rule 17 and self-review skill: AC coverage, duplicates, smoke/regression, Confirm twice, single expected result.

- **AI Response Summary:**  
  All four ACs mapped. Smoke: TC-M-001–003, TC-M-007. Regression: TC-M-004–006, TC-M-008. Positive/negative/edge/E2E distributed (E2E TC-M-005; negative TC-M-006; boundary/validation via registration and API billing fields in steps). No duplicate IDs or titles.

- **Validation Notes:**  
  **Pass** on checklist. Status left `Not Executed` until manual run evidence in later documentation step.

---

## AC → manual traceability

| Requirement | Test Case IDs |
|-------------|----------------|
| UI-AC1 | TC-M-002, TC-M-004, TC-M-006 |
| UI-AC2 | TC-M-001, TC-M-003, TC-M-005 |
| API-AC1 | TC-M-007 |
| API-AC2 | TC-M-008 |

---

## Planned — UI/API automation case titles (Steps 6–7)

*Add entries when Playwright suites are designed.*

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
