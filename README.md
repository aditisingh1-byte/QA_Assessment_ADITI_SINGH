# QA AI Capability Exercise — Toolshop (Aditi Singh)

**Repository:** https://github.com/aditisingh1-byte/QA_Assessment_ADITI_SINGH  
**Application under test:** [Practice Software Testing Toolshop](https://practicesoftwaretesting.com/)  
**API:** https://api.practicesoftwaretesting.com (see [API documentation](https://api.practicesoftwaretesting.com/api/documentation))

This submission follows `Assessment.md`: manual cases, Playwright UI + API automation (Prism-style layout under `PrismStructure/`), prompt history in `ai-prompts/`, and execution evidence with all automated cases **Passed**.

---

## Project information

| Item | Location |
|------|----------|
| Requirement analysis, risks, AI workflow (Part A) | `project-info.md` |
| Manual test cases (8 × smoke/regression) | `FunctionalTestCase.csv` |
| Automation framework | `PrismStructure/` — Playwright (JavaScript), POM + API clients |
| Test data (automation) | `PrismStructure/src/testdata/data.builders.js`, `checkout.data.json`; env via `PrismStructure/.env` (from `.env.example`) |
| Test data (manual) | `FunctionalTestCase.csv` **Test Data** column (`{timestamp}` placeholders) |
| Cursor rules, skills, context | `.cursor/` (optional evaluator reference) |
| Assessment brief | `Assessment.md` |

**Suite sizes:** 8 manual (TC-M-001–008), 8 UI (TC-UI-001–008), 8 API (TC-API-001–008), plus 1 scaffold smoke check.

**Note:** UI COD checkout with **Confirm twice** is covered in manual **TC-M-005**; UI automation **TC-UI-005** uses a hybrid flow (API invoice + **My Invoices** on UI) for stability on the shared demo.

---

## Prerequisites

- [Node.js](https://nodejs.org/) LTS (npm included)
- **Google Chrome** installed (tests use Playwright `channel: 'chrome'`)
- Network access to the public demo UI and API

---

## Automation setup

From the repository root:

```bash
cd PrismStructure
npm install
copy .env.example .env
```

On macOS/Linux use `cp .env.example .env`.

`.env` sets base URLs and optional demo login for UI smoke paths (`DEMO_USER_EMAIL` / `DEMO_USER_PASSWORD` in `.env.example` — public demo credentials, not production secrets).

---

## Run automation

All commands are run from **`PrismStructure/`**.

| Goal | Command |
|------|---------|
| **Full suite** (API + UI + scaffold) | `npm test` |
| **Smoke** (`@smoke` in test titles) | `npm run test:smoke` |
| **Regression** (`@regression`) | `npm run test:regression` |
| **API only** | `npm run test:api` |
| **UI only** | `npm run test:ui` |
| **Open last HTML report** (after a run) | `npm run report` |

Example (smoke only):

```bash
cd PrismStructure
npm run test:smoke
```

No manual test selection is required beyond `npm install` and `.env` setup; suites use unique registration data and API chaining for tokens and `cart_id`.

---

## Reports and execution evidence

| Output | Path | In git |
|--------|------|--------|
| HTML report (latest local run) | `PrismStructure/reports/html/` | No (gitignored) |
| JSON results (latest local run) | `PrismStructure/reports/test-results.json` | No (gitignored) |
| **Submitted execution evidence (Step 8)** | `PrismStructure/reports/execution-evidence/` | Yes |

Committed evidence includes `EXECUTION_SUMMARY.md`, `test-results.json`, `full-suite-run.log`, and an HTML snapshot under `execution-evidence/html/`. Last recorded full run: **17/17 passed**.

Re-run `npm test` locally to refresh reports; copy updated artifacts into `execution-evidence/` if you need to update submission evidence.

---

## Manual testing

1. Open `FunctionalTestCase.csv` in Excel or a text editor.
2. Replace `{timestamp}` in **Test Data** with a unique value per run.
3. Execute steps in the **Steps** column against https://practicesoftwaretesting.com/
4. Record results in the **Actual Result** / status columns as you execute.

---

## AI prompts folder and history

Per `Assessment.md`, iterative prompts are logged under **`ai-prompts/`**:

```
ai-prompts/
├── requirements-and-planning.md
├── test-design.md
├── test-data.md
├── automation-and-debugging.md
└── documentation-and-summary.md
```

Each file records **Prompt**, **AI Response Summary**, and validation or debugging notes per step. Git history uses commits **Step 1** through **Step 9** for lifecycle phases.

---

## Repository layout (core deliverables)

```
QA_Assessment_ADITI_SINGH/
├── FunctionalTestCase.csv
├── PrismStructure/
├── project-info.md
├── README.md
├── ai-prompts/
├── Assessment.md
└── .cursor/
```

---

## Quick traceability

| Acceptance criteria | Manual | UI (`tests/ui/auth-checkout.spec.js`) | API (`tests/api/auth-cart-invoice.spec.js`) |
|---------------------|--------|----------------------------------------|---------------------------------------------|
| UI-AC1 Registration & login | TC-M-002, 004, 006 | TC-UI-002, 004, 006 | — |
| UI-AC2 Purchase & invoice | TC-M-001, 003, 005 | TC-UI-001, 003, 005–008 | — |
| API-AC1 Auth & cart | TC-M-007 | — | TC-API-001–003 |
| API-AC2 Products & invoice | TC-M-008 | — | TC-API-004–008 |

For full risk and workflow detail, see `project-info.md`.
