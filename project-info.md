# Project Info — QA AI Capability Exercise

**Primary AI Tool(s) Used:** Cursor (AI-assisted workflow)

**Application Under Test:** Practice Software Testing Toolshop — Checkout & Application Flow

- **UI:** https://practicesoftwaretesting.com/
- **API documentation:** https://api.practicesoftwaretesting.com/api/documentation

**Assessment Start Date:** / **Submission Date:** /

---

## Project Summary

This assessment targets the Toolshop ecommerce application: user authentication and profile (UI and API), product browse and cart behaviour, Cash on Delivery checkout, and invoice visibility under My Invoices. API coverage follows register → login → bearer token → cart → products → invoice using the assessment’s sample invoice payload. UI checkout must press **Confirm twice** to complete invoice generation.

---

## Tools Used

| Category | Tool |
|----------|------|
| AI | Cursor |
| UI / API automation | Playwright (Prism-style hybrid under `PrismStructure/`) |
| Browser | Google Chrome (latest), via Playwright `channel: 'chrome'` |
| Manual suite | `FunctionalTestCase.csv` |
| Version control | Git (iterative commits to public repository) |

---

## Requirement and Risk Analysis

### Scope (from Assessment.md Part B)

| Layer | In scope |
|-------|----------|
| UI | Small ecommerce flows on practicesoftwaretesting.com; flows categorized as **sanity/smoke** or **regression** |
| API | Lifecycle flows documented at api.practicesoftwaretesting.com; component/flow testing per AC |
| Suite size | 5–8 test cases each for **manual**, **UI automation**, and **API automation**, including smoke and regression |
| Evidence | Execution reports; automated cases expected **Passed** when suites are complete |

### UI — AC1: User Registration & Login

**Requirements (testable):**

- Register with valid details.
- Log in with registered credentials.
- Verify profile information after login.

| Risk ID | Risk | Impact | Mitigation in test design |
|---------|------|--------|---------------------------|
| R-UI-1 | Registration rejects duplicate email or weak password | Blocks AC1 | Use unique emails; valid password per SUT rules in manual/API cases |
| R-UI-2 | Profile data does not match registration input | False pass on AC1 | Assert key profile fields after login (regression) |
| R-UI-3 | Session/auth state unclear after login | Flaky login tests | Smoke: valid login only; regression: invalid credentials |

**Smoke vs regression:**

| Objective | Tag |
|-----------|-----|
| Valid login with known or newly registered user | Smoke |
| Full register → login → profile verification | Regression |
| Invalid login / credential error handling | Regression |

### UI — AC2: End-to-End Purchase Flow

**Requirements (testable):**

- Browse products; add multiple items to cart; update quantity.
- Checkout with **Cash on Delivery**.
- Complete invoice generation (**Confirm pressed twice** per assessment).
- View generated invoice under **My Invoices**.

| Risk ID | Risk | Impact | Mitigation in test design |
|---------|------|--------|---------------------------|
| R-UI-4 | Single Confirm does not finalize invoice | High — core AC failure | Explicit steps and automation for **Confirm twice** |
| R-UI-5 | Cart quantity or multi-item totals wrong | Wrong order/invoice | Regression case for quantity update and multiple lines |
| R-UI-6 | Invoice not listed under My Invoices | E2E broken | Assert invoice list after successful checkout |

**Smoke vs regression:**

| Objective | Tag |
|-----------|-----|
| Catalog/browse, add to cart | Smoke |
| COD checkout with Confirm ×2 and My Invoices | Regression (E2E) |
| Search, filters, product details (within case cap) | Regression |

### API — AC1: User Authentication & Cart Creation

**Requirements (testable):**

- Register via API.
- Log in with registered credentials.
- Obtain valid bearer token.
- Create a new cart successfully.

| Risk ID | Risk | Impact | Mitigation in test design |
|---------|------|--------|---------------------------|
| R-API-1 | Invalid register payload → 4xx | Blocks token/cart | Smoke: happy path; regression: validation errors where in scope |
| R-API-2 | Token missing or expired on cart create | 401 on cart | Chain login → token → cart in order; no hardcoded tokens |
| R-API-3 | Duplicate user on parallel runs | 409 / flaky setup | Unique registration data per run |

**Smoke vs regression:**

| Objective | Tag |
|-----------|-----|
| Register, login, token, create cart | Smoke |
| Auth/cart error handling | Regression |

### API — AC2: Product Selection & Invoice Generation

**Requirements (testable):**

- Retrieve products (authorized).
- Add selected products to cart.
- Verify cart contents.
- Generate invoice with required customer/order details (assessment example: `payment_method` **cash-on-delivery**, billing fields including `billing_country` **TG**, `billing_postal_code` **1234AA**, dynamic `cart_id`).

| Risk ID | Risk | Impact | Mitigation in test design |
|---------|------|--------|---------------------------|
| R-API-4 | Wrong `cart_id` or stale cart | Invoice 4xx | Create cart in same flow; inject `cart_id` from response |
| R-API-5 | Billing country/postal mismatch | Invoice rejected | Use assessment sample for positive path; optional negative in regression |
| R-API-6 | Cart contents do not match added products | Wrong invoice | GET cart assertions before POST invoice |

**Smoke vs regression:**

| Objective | Tag |
|-----------|-----|
| Products + add to cart + cart validation | Smoke / regression (split per suite design) |
| POST invoice with assessment-aligned COD payload | Regression |
| Invalid invoice payload (if within case cap) | Regression |

### Cross-cutting risks

| Risk ID | Risk | Mitigation |
|---------|------|------------|
| R-X-1 | Shared demo environment instability | Retries and unique data where supported; evidence in execution reports |
| R-X-2 | Over-scoping beyond 5–8 cases per tier | Traceability to ACs only; smoke + regression within cap |
| R-X-3 | Prompt history out of sync with repo | Log prompts per step in `ai-prompts/` after each iteration |

### Traceability overview (requirements → planned tiers)

| Acceptance criteria | Manual (`FunctionalTestCase.csv`) | UI automation | API automation |
|---------------------|-----------------------------------|---------------|----------------|
| UI-AC1 | Step 3 (TC-M-002, TC-M-004, TC-M-006) | Step 7 (TC-UI-002, TC-UI-004, TC-UI-006) | — |
| UI-AC2 | Step 3 (TC-M-001, TC-M-003, TC-M-005) | Step 7 (TC-UI-001, TC-UI-003, TC-UI-005–008) | — |
| API-AC1 | Step 3 (TC-M-007) | — | Step 6 (TC-API-001–003) |
| API-AC2 | Step 3 (TC-M-008) | — | Step 6 (TC-API-004–008) |

---

## Setup Summary (AI workflow — Part A)

1. **Project and SUT context** — `.cursor/context/project_context.md` holds URLs, ACs, Confirm-twice rule, naming conventions, and assessment folder layout; referenced in Cursor via `@project_context.md` and rules/skills under `.cursor/`.

2. **Requirement analysis** — Iterative prompts against `Assessment.md` and context file; output captured in this **Requirement and Risk Analysis** section and in `ai-prompts/requirements-and-planning.md` (Entry 3).

3. **Test planning and strategy (UI vs API, smoke vs regression)** — Three tiers: manual (`FunctionalTestCase.csv`), UI Playwright, API Playwright (Assessment cap 5–8 each). **Smoke** = catalog, login, add to cart, API auth/cart (TC-M-001–003, TC-M-007). **Regression** = register/profile, E2E COD + Confirm ×2, invalid login, API cart→invoice (TC-M-004–006, TC-M-008). UI owns user-visible flows; API owns token/cart/invoice lifecycle; hybrid optional within later automation. Tags: `@Smoke` / `@Regression` in automation titles; CSV **Smoke/Regression** column for manual. Logged in `ai-prompts/test-design.md`.

4. **Manual test case design** — `FunctionalTestCase.csv` (8 cases, TC-M-001–TC-M-008); iterative prompts in `ai-prompts/test-design.md` (Step 3).

5. **Automation design (Playwright / PrismStructure)** — `PrismStructure/` hybrid layout (Step 5–7): POM pages (`HomePage`, `LoginPage`, `RegisterPage`, `ProductPage`, `CartPage`, `CheckoutPage`, `AccountPage`), UI specs `tests/ui/auth-checkout.spec.js` (8 cases TC-UI-001–008), API specs `tests/api/auth-cart-invoice.spec.js` (8 cases). System Chrome via `channel: 'chrome'`. Demo credentials in `.env.example` only.

6. **Validate and refine AI-generated cases and scripts** — After each AI output: map to UI-AC1/AC2 and API-AC1/AC2; apply `.cursor/skills/self-review.md` and `manual-rules.md` Rule 17 (manual Step 3c **pass**). For automation: ran `npm test` / targeted `test:api` and `test:ui` after Steps 6–7; fixed register payload length, hybrid TC-UI-005, and locator/wizard issues per Assessment rules (Confirm twice in manual/hybrid scope, dynamic `cart_id` in API). Prompt and validation notes in `ai-prompts/test-design.md` and `automation-and-debugging.md`.

7. **Test data generation and API payloads** — See **Test Data Strategy** below. Manual suite uses `{timestamp}` placeholders in CSV; automation uses `PrismStructure/src/testdata/data.builders.js`, `checkout.data.json`, and `.env` from `.env.example`. Positive API invoice uses Assessment sample fields (`billing_country` TG, `billing_postal_code` 1234AA, `payment_method` cash-on-delivery). Strategy drafted with AI in Step 4; implemented and exercised in Steps 5–8.

8. **Debugging failing tests** — API register 422 (`last_name` length) fixed in `data.builders.js` (Step 6). UI checkout wizard flakiness led to hybrid TC-UI-005 (API invoice + My Invoices); logged in `ai-prompts/automation-and-debugging.md`. **Execution evidence (Step 8):** full suite `npx playwright test` — 17/17 passed; committed under `PrismStructure/reports/execution-evidence/` (`EXECUTION_SUMMARY.md`, `test-results.json`, `full-suite-run.log`, HTML snapshot).

9. **Information not shared with AI** — Production credentials, internal URLs, API keys, or customer PII beyond public demo app needs.

10. **Reuse in a real project** — Reuse `.cursor/context` + rules + skills + phased `ai-prompts/` history; one focused prompt per task; iterative git commits (Steps 1–9); runbooks in root `README.md` (`readme.md` per assessment naming on case-sensitive systems); committed execution evidence under `PrismStructure/reports/execution-evidence/` for auditors.

---

## Test Data Strategy

### Principles (Assessment + `project_context.md`)

| Principle | Application |
|-----------|-------------|
| Unique users | Registration email/username includes run-specific suffix (e.g. `manual.user.{timestamp}@example.com`, `api.user.{timestamp}@example.com`) to avoid duplicate-user failures on shared demo |
| Strong password | Use a complex password meeting API/UI rules (e.g. `Pass$w0rd1`) in manual and automation data |
| No hardcoded runtime IDs | Do not fix `cart_id`, product IDs, or bearer tokens in committed tests; obtain from API responses in the same test run |
| Environment | Public demo UI and API URLs from Assessment; optional `.env` in `PrismStructure/` (Step 5+) for `UI_BASE_URL` and `API_BASE_URL` only—no secrets in repo |
| Reuse | Shared billing/invoice defaults aligned to Assessment example; unique identity data per execution |

### Data by test tier

| Tier | Source | Notes |
|------|--------|--------|
| Manual | `FunctionalTestCase.csv` **Test Data** column | Placeholders `{timestamp}`; executor substitutes at run time |
| UI automation | `PrismStructure/src/testdata/data.builders.js`, `checkout.data.json` | Unique register users per run; demo user via `.env` for login smoke |
| API automation | `data.builders.js` + Assessment invoice body | `cart_id` from `POST /carts`; bearer token from `POST /users/login` |

### Assessment invoice payload (positive API baseline)

Used for API-AC2 / TC-M-008 and future `TC-API-*` invoice tests:

```json
{
  "billing_street": "Zoey Shore",
  "billing_city": "Hesselbury",
  "billing_state": "Florida",
  "billing_country": "TG",
  "billing_postal_code": "1234AA",
  "payment_method": "cash-on-delivery",
  "cart_id": "<from create cart response>",
  "payment_details": {}
}
```

### Negative / edge data (within regression cap)

| Purpose | Example | When |
|---------|---------|------|
| Invalid login | Unknown email + wrong password | TC-M-006; future UI regression |
| Invalid invoice billing | Country/postal combo not accepted by API | Optional single API regression case if within 5–8 API automation cap |

### AI-assisted test data workflow

1. Prompt for registration and invoice field lists from `Assessment.md` only (Step 4a).  
2. Prompt for uniqueness and “no hardcoded ID” rules (Step 4b).  
3. Log prompts in `ai-prompts/test-data.md`; strategy locked in this section and implemented under `PrismStructure/src/testdata/` (Steps 5–8).

### Assumptions

- Demo application is shared; parallel runs require unique emails.  
- Exact UI mandatory register/checkout fields are validated during UI automation (Step 7), not invented beyond Assessment and manual case steps.
