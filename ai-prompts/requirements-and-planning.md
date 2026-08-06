# AI Prompts – Requirements and Planning

**SUT:** [Practice Software Testing – Toolshop](https://practicesoftwaretesting.com/)  
**API docs:** https://api.practicesoftwaretesting.com/api/documentation  

**Required repository layout (Assessment.md):**

```text
qa-ai-practical-assessment/   (this repo: QA_Assessment_ADITI_SINGH)
├── FunctionalTestCase.csv
├── PrismStructure/
├── project-info.md
├── readme.md
├── ai-prompts/
│   ├── requirements-and-planning.md
│   ├── test-design.md
│   ├── test-data.md
│   ├── automation-and-debugging.md
│   └── documentation-and-summary.md
└── .cursor/                    (Rules, Skills — optional agent/MCP)
```

**Purpose of this file:** Record prompts used to understand Toolshop flows, risks, and the test plan (UI + API).

---

## Entry 1 — Scope Part B from Assessment.md

- **Prompt:**  
  Read `Assessment.md` only. List Part B deliverables and required repo tree. Do not invent features. Flag Confirm-twice invoice and 5–8 cases per manual/UI/API. Output: bullet list + Smoke vs Regression for UI AC1/AC2 and API AC1/AC2.

- **AI Response (short summary):**  
  Part B SUT: Toolshop UI + REST API docs. UI AC1: register, login, profile. UI AC2: browse, cart, quantity, COD checkout, invoice (Confirm twice), My Invoices. API AC1: register, login, bearer token, create cart. API AC2: products, add to cart, verify cart, generate invoice (sample body uses `billing_country` TG, `billing_postal_code` 1234AA, `payment_method` cash-on-delivery). Deliverables: requirement/risk analysis, `project-info.md`, manual CSV, Playwright UI + API under `PrismStructure`, test data strategy, execution reports (all Passed), `readme.md`, prompt history in `ai-prompts/`, iterative git commits.

- **Validation Notes:**  
  Confirmed URLs match Assessment. No extra modules beyond ecommerce flows in the guide. Suite cap 5–8 per tier documented for later steps.

---

## Entry 2 — Cursor context and workflow foundation (Step 1)

- **Prompt:**  
  As Senior QA, set up Cursor for the assessment: single `project_context.md` (SUT, ACs, Confirm twice, folder structure, naming TC-M / TC-UI / TC-API), rules for manual/API/UI, skills for requirement analysis, test design, self-review, and iterative prompting. Do not generate automation yet.

- **AI Response (short summary):**  
  Added `.cursor/context/project_context.md`, `.cursor/rules/` (manual, api-testing, api-rules), `.cursor/skills/` (requirement-analysis, test-design, ui-testing, self-review, prompt-engineering), and `.cursor/ai-prompts/MANUAL_PROMPT.md` for a future manual CSV pass. Established root `ai-prompts/` for submission prompt history per Assessment.

- **Validation Notes:**  
  Mirrors Assessment folder list only. Prompt history files reset to factual entries; automation/test-data/docs entries deferred until those steps complete.

---

## Entry 3 — Requirement and risk analysis (Step 2)

- **Prompt:**  
  Read `Assessment.md` and `.cursor/context/project_context.md` only. Write Requirement & Risk Analysis for Toolshop: UI-AC1, UI-AC2, API-AC1, API-AC2. For each: requirements bullets, top risks, Smoke vs Regression tag. No test cases yet. Output markdown sections for `project-info.md`.

- **AI Response (short summary):**  
  Documented testable requirements per AC, risk tables (registration, profile, Confirm ×2, cart/invoice, token/cart_id, billing payload per assessment sample), smoke vs regression objectives, cross-cutting risks (scope cap, demo stability, prompt/repo alignment), and AC → planned manual/UI/API steps.

- **Validation Notes:**  
  Risks tied only to Assessment ACs and stated business rules (Confirm twice, COD, sample invoice JSON). Part A Setup Summary items 1–2 filled; items 3–10 marked for later steps. Mirrored in `project-info.md` at repository root.

---

## Planned — Hybrid automation strategy (Step 5+)

*Not executed yet; record prompt and outcome when `PrismStructure/` is scaffolded.*

- **Prompt (draft):**  
  Design Playwright JS hybrid plan (POM + API clients + fixtures). Prefer API for data setup; UI for user-visible behaviour. Align with Assessment `PrismStructure` and tags `@smoke` / `@regression`.

- **AI Response (short summary):**  
  *(pending)*

- **Validation Notes:**  
  *(pending)*

---

## Reusable planning prompt (Rules + Skills)

```text
Act as Senior QA for Toolshop.
UI: https://practicesoftwaretesting.com/
API: https://api.practicesoftwaretesting.com/api/documentation

RULES:
- Derive requirements only from Assessment.md and live SUT
- Do not invent features outside key flows
- Tag every objective Smoke or Regression
- Call out Confirm-twice invoice explicitly
- Keep Core scope (5–8 cases per tier)

SKILLS:
- Requirement decomposition (AC → scenarios)
- Risk-based prioritization
- UI vs API vs Hybrid ownership

Output: requirements list, risks, Smoke/Regression matrix, traceability to UI-AC1/AC2 and API-AC1/AC2.
```
