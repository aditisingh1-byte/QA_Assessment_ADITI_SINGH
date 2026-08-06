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
| UI / API automation (planned) | Playwright (Prism-style structure under `PrismStructure/`) |
| Browser | Google Chrome (latest) |
| Manual suite (planned) | `FunctionalTestCase.csv` |
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
| UI-AC1 | Step 3 | Step 7 | — |
| UI-AC2 | Step 3 | Step 7 | — |
| API-AC1 | Step 3 | — | Step 6 |
| API-AC2 | Step 3 | — | Step 6 |

---

## Setup Summary (AI workflow — Part A)

*Sections 3–10 will be expanded as manual, automation, and documentation steps complete.*

1. **Project and SUT context** — `.cursor/context/project_context.md` holds URLs, ACs, Confirm-twice rule, naming conventions, and assessment folder layout; referenced in Cursor via `@project_context.md` and rules/skills under `.cursor/`.

2. **Requirement analysis** — Iterative prompts against `Assessment.md` and context file; output captured in this **Requirement and Risk Analysis** section and in `ai-prompts/requirements-and-planning.md` (Entry 3).

3. **Test planning and strategy (UI vs API, smoke vs regression)** — *(Step 3+)*

4. **Manual test case design** — *(Step 3)*

5. **Automation design (Playwright / PrismStructure)** — *(Steps 5–7)*

6. **Validate and refine AI-generated cases and scripts** — *(Ongoing; self-review skill and manual-rules)*

7. **Test data generation and API payloads** — *(Step 4+; assessment invoice body as positive baseline)*

8. **Debugging failing tests** — *(Steps 6–8)*

9. **Information not shared with AI** — Production credentials, internal URLs, API keys, or customer PII beyond public demo app needs.

10. **Reuse in a real project** — Reuse context + rules + skills + phased `ai-prompts/` history; one task per prompt; commit per lifecycle phase.
