# AI Prompts – Automation and Debugging

**SUT UI:** https://practicesoftwaretesting.com/  
**SUT API:** https://api.practicesoftwaretesting.com  
**Framework (Assessment):** Playwright (Prism-style) under `PrismStructure/`

**Purpose of this file:** Record prompts for automation structure, assertions, and failure analysis.

---

## Entry 1 — Scaffold hybrid framework (Step 5)

- **Prompt:**  
  Create `PrismStructure` Playwright JS hybrid scaffold for Toolshop: dotenv config, API clients (auth, products, cart, invoices), POM base page, fixtures, test data builders aligned to Assessment invoice sample, `playwright.config.js` with UI/API projects, `testIdAttribute: data-test`, HTML report to `reports/html`, npm smoke/regression scripts. No full UI/API suites yet (Steps 6–7).

- **AI Response Summary:**  
  Added `PrismStructure/` with layered `src/` and `tests/ui`, `tests/api`, plus `tests/scaffold.spec.js` with `@smoke` config check. API base URL verified live (`GET /products`). Register path `POST /users/register`.

- **Debugging Outcome:**  
  Scaffold smoke validates env URLs only; functional API/UI specs deferred. `.env` gitignored; `.env.example` documents base URLs.

---

## Entry 2 — API suite and registration payload fix (Step 6)

- **Prompt:**  
  Add `tests/api/auth-cart-invoice.spec.js` with 8 cases TC-API-001–008 (@smoke/@regression). Run until green.

- **AI Response Summary:**  
  Implemented full API lifecycle spec using `registerAndLogin`, cart helpers, `buildInvoicePayload`. All 8 tests passed via `npx playwright test tests/api --project=api`.

- **Debugging Outcome:**  
  Register returned 422: `last_name` exceeded 20 characters from long `User{stamp}` builder. Shortened stamp and last name in `data.builders.js`.

---

## Planned (Steps 7–8)

- UI smoke/regression specs (`tests/ui`) including Confirm twice  
- Failure analysis entries after full suite runs

---

## Reusable automation/debug prompt (Rules + Skills)

```text
Act as Senior Automation Engineer (Playwright JS) for Toolshop.

RULES:
- POM + API client separation
- No arbitrary hard waits
- No hardcoded URLs or credentials in specs
- UI invoice flow: Confirm button twice
- Tags @smoke / @regression in test titles
- Reuse Assessment AC scope only

SKILLS:
- Root-cause from traces, screenshots, API response bodies
- Flake reduction (unique data, proper waits)

Output: minimal code change + what changed/why + files touched.
```
