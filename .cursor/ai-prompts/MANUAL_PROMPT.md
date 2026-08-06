# MANUAL PROMPT — Manual Test Case Generation (Skill / Agent)

Use this file as the **single execution prompt** in Cursor (Agent or chat with `@MANUAL_PROMPT.md`).  
It generates **manual functional test cases only** and writes **`FunctionalTestCase.csv`** at the repository root.

Do **not** repeat Context, Rules, or Skills in chat — **read the referenced files** and apply them.

---

## ROLE

You are a **Senior Manual QA Engineer** for the QA AI Capability Exercise (Practice Software Testing — Toolshop).

You produce **manual/functional test cases** in **CSV** only.

You do **not** generate Playwright code, API automation code, or README/project-info in this task unless explicitly asked.

---

## EXECUTION ORDER (mandatory)

1. Read **Context** → `.cursor/context/project_context.md`
2. Read **Assessment** → `Assessment.md` (SUT, ACs, submission rules, suite size)
3. Read **Rules** → `.cursor/rules/manual-rules.md` (all rules apply)
4. Read **Skills** (apply in order):
   - `.cursor/skills/requirement-analysis.md` — complete analysis before test cases
   - `.cursor/skills/test-design.md` — scenarios, smoke vs regression, prioritization
   - `.cursor/skills/ui-testing.md` — UI flows (AC1, AC2)
   - `.cursor/rules/api-testing.md` — manual API test design (AC1, AC2; endpoints, payloads, validations)
   - `.cursor/skills/self-review.md` — final QA review before output
5. Optional token discipline → `.cursor/skills/prompt-engineering.md`

If UI labels or flows are unclear, use the live UI: https://practicesoftwaretesting.com/  
If API details are unclear, use: https://api.practicesoftwaretesting.com/api/documentation

**Do not invent** screens, endpoints, or business rules not supported by the SUT or the documents above.

---

## SYSTEM UNDER TEST (summary — full detail in Context)

| Layer | URL |
|-------|-----|
| UI | https://practicesoftwaretesting.com/ |
| API docs | https://api.practicesoftwaretesting.com/api/documentation |
| API base | https://api.practicesoftwaretesting.com |

**Mandatory product note (Assessment):** Invoice generation on UI requires pressing **Confirm twice**.

**Suite size (Assessment):** **5 to 8** manual test cases total (includes **@Smoke** and **@Regression**).  
Categorize flows as **Sanity/Smoke** or **Regression** as defined in `Assessment.md` and `project_context.md`.

---

## ACCEPTANCE CRITERIA TO COVER (Assessment)

### UI — AC1: User Registration & Login

The user should be able to register with valid details, log in using the registered credentials, and verify their profile information successfully.

### UI — AC2: End-to-End Purchase Flow

The user should be able to browse products, add multiple items to the cart (including updating quantity), complete the checkout using Cash on Delivery, and successfully view the generated invoice under My Invoices. **Press Confirm twice** to generate invoice.

### API — AC1: User Authentication & Cart Creation

A new user should be able to register via API, log in with the registered credentials, obtain a valid bearer token, and create a new cart successfully.

### API — AC2: Product Selection & Invoice Generation

Using the bearer token, the user should be able to retrieve products, add selected products to the cart, verify the cart contents, and successfully generate an invoice with the required customer and order details.

**Example request body for invoice generation (POST):**

```json
{
  "billing_street": "Zoey Shore",
  "billing_city": "Hesselbury",
  "billing_state": "Florida",
  "billing_country": "TG",
  "billing_postal_code": "1234AA",
  "payment_method": "cash-on-delivery",
  "cart_id": "01kx0dctdxxg6sm4wtt1t0nf9r",
  "payment_details": {}
}
```

---

## SCOPE AND COVERAGE (Assessment + Context)

Within **5–8** cases, cover **UI and API** key flows only.

**Smoke (Sanity)** — business-critical confidence (from Assessment / Context):

- Registration, Login, Browse Products, Add to Cart, Checkout, Invoice (UI)
- API Authentication, API Cart Creation

**Regression** — deeper path (choose highest value within the 5–8 cap):

- Search, Filters, Product Details, Quantity Update, Negative Login, Session Validation, Invoice Validation, Profile, API Error Handling

**Coverage mix (manual-rules + Assessment):**

- Positive, Negative, Edge, Boundary, Validation, Business Workflow, End-to-End (where one case is explicitly E2E purchase)
- At least **one UI case** for COD checkout with **Confirm pressed twice** and invoice under **My Invoices**
- At least **one API positive lifecycle** path (auth → cart → products/cart → invoice across cases, not one overloaded case unless titled as E2E API lifecycle)
- Map traceability to **UI-AC1**, **UI-AC2**, **API-AC1**, **API-AC2** (see CSV column **Requirement** in manual-rules)

Do **not** expand into unrelated modules unless required for a negative/edge of the key flows above.

---

## OUTPUT DELIVERABLE

| Item | Location |
|------|----------|
| Manual test suite | `FunctionalTestCase.csv` (repository root) |

**Format:** Follow **Rule 9–10** in `.cursor/rules/manual-rules.md` (UTF-8 CSV, Excel-compatible, no markdown tables, no TODO/TBD).

**Test Case ID:** `TC-M-001`, `TC-M-002`, … (manual-rules Rule 5).

**Columns (mandatory — manual-rules Rule 10):**

Test Case ID, Module, Feature, Requirement, Scenario, Title, Priority, Severity, Category, Smoke/Regression, Preconditions, Test Data, Steps, Expected Result, Automation Candidate, Status, Remarks

**Field rules (from manual-rules — do not duplicate here):**

- Exactly **one** Expected Result per case (Rule 4)
- One logical behaviour per case (Rule 3)
- Professional, execution-ready English (Rule 13)
- Unique email / dynamic data; no hardcoded IDs (Rule 8)
- Final validation checklist (Rule 17)

**Tags:** Use **Smoke/Regression** column per manual-rules; align Smoke cases with **@Smoke** and Regression with **@Regression** in **Remarks** or **Category** as appropriate for your traceability.

---

## SUGGESTED CASE SET (5–8 — select wisely; adapt after requirement analysis)

Use as a **coverage checklist**, not a blind copy. Stay within **5–8** total.

| # | Smoke/Regression | Focus | Maps to |
|---|------------------|-------|---------|
| 1 | Smoke | UI — home / product catalog loads | UI-AC2 |
| 2 | Smoke | UI — valid login | UI-AC1 |
| 3 | Smoke | UI — add product to cart | UI-AC2 |
| 4 | Regression | UI — register, login, verify profile | UI-AC1 |
| 5 | Regression | UI — browse, quantity update, COD checkout, **Confirm twice**, My Invoices | UI-AC2 |
| 6 | Regression | UI — negative login (invalid credentials) | UI-AC1 |
| 7 | Smoke/Regression | API — register, login, bearer token, create cart | API-AC1 |
| 8 | Regression | API — get products, add to cart, validate cart, create invoice (COD payload) | API-AC2 |

If you must drop cases to stay ≤8, drop lower-risk duplicates first; **do not** drop **Confirm twice** invoice coverage or **API token + cart** core.

---

## OUTPUT CONTRACT (response in chat)

When this prompt is executed:

1. **Requirement summary** (short) from requirement-analysis skill — business workflow, risks, assumptions listed separately (not invented in Expected Result).
2. **Coverage map:** Requirement (UI-AC1 / UI-AC2 / API-AC1 / API-AC2) → Test Case IDs.
3. **Create or overwrite** `FunctionalTestCase.csv` at repository root.
4. Confirm total count is **between 5 and 8**.
5. Confirm **Smoke** and **Regression** are both represented and **UI + API** ACs are mapped.
6. Run **self-review** (self-review skill) and state pass/fail on manual checklist items.

Do **not** generate UI/API automation specs in this response.

---

## REPOSITORY FOLDER REFERENCES (Assessment only)

Artifacts live under:

- `FunctionalTestCase.csv` (root)
- `ai-prompts/` (repository root) — submission prompt history (`requirements-and-planning.md`, `test-design.md`, `test-data.md`, `automation-and-debugging.md`, `documentation-and-summary.md`)
- `.cursor/ai-prompts/MANUAL_PROMPT.md` — reusable manual CSV execution prompt (not a submission history file)
- `.cursor/` — **Rules**, **Skills** (and optional agent/MCP)

Do not introduce other folder structures beyond the Assessment document.

---

## READY-TO-PASTE USER MESSAGE (Cursor Agent)

```text
Execute @.cursor/ai-prompts/MANUAL_PROMPT.md as the manual test-case skill/agent.

Read:
- .cursor/context/project_context.md
- Assessment.md
- .cursor/rules/manual-rules.md
- .cursor/skills/requirement-analysis.md
- .cursor/skills/test-design.md
- .cursor/skills/ui-testing.md
- .cursor/rules/api-testing.md
- .cursor/skills/self-review.md

Task:
Generate the manual test suite only → FunctionalTestCase.csv at repo root.

Constraints (Assessment):
- 5 to 8 manual test cases total
- Smoke and Regression (sanity/smoke vs regression)
- Cover UI AC1/AC2 and API AC1/AC2
- UI invoice flow: Confirm pressed twice
- One Expected Result per case
- CSV columns per manual-rules.md

Output:
1) Short requirement/risk summary + assumptions
2) AC → TC coverage map
3) FunctionalTestCase.csv
4) Self-review result
```
