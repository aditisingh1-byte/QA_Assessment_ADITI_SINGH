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

## Planned (Steps 6–8)

- API smoke/regression specs (`tests/api`)  
- UI smoke/regression specs (`tests/ui`) including Confirm twice  
- Failure analysis entries after test runs

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
