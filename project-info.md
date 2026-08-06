# Project Info — QA AI Capability Exercise

**Primary AI Tool(s) Used:** Cursor (Agent / Composer)

**Application Under Test:** Practice Software Testing Toolshop – Checkout & Application Flow  
**UI:** https://practicesoftwaretesting.com/  
**API:** https://api.practicesoftwaretesting.com/api/documentation  

**Assessment Start Date:** 2026-08-06 / **Submission Date:** *(TBD)*

---

## Project Summary

This submission exercises AI-assisted QA on the Toolshop ecommerce application: **user registration and login with profile verification (UI-AC1 / API-AC1)**, and **browse-to-cart checkout with Cash on Delivery, double Confirm for invoice generation, and invoice visibility under My Invoices (UI-AC2 / API-AC2)**. Manual, UI (Playwright), and API (Playwright) tiers are scoped to **5–8 cases each**, tagged **Smoke** (sanity) or **Regression**, with traceability to the assessment acceptance criteria.

---

## Tools Used

| Category | Tools |
|----------|--------|
| AI | Cursor (context via `.cursor/context/project_context.md`, rules, skills, iterative `ai-prompts/`) |
| UI automation | Playwright (JavaScript) — Prism-style structure under `PrismStructure/` *(Steps 5–8)* |
| API automation | Playwright API testing — same framework *(Steps 6–8)* |
| Manual suite | `FunctionalTestCase.csv` *(Step 3)* |
| Browser | Google Chrome (latest) — per assessment assumptions |
| Environment | Public demo Toolshop (production demo); payment method **cash-on-delivery** |

---

## Requirement and Risk Analysis

### Scope (from Assessment.md)

| Layer | In scope | Out of scope (unless needed for a negative on core flow) |
|-------|----------|----------------------------------------------------------|
| UI | Register, login, profile, catalog, cart, quantity, COD checkout, invoice (Confirm ×2), My Invoices | Stretch modules not required for Core (e.g. admin, rentals) |
| API | Register, login, bearer token, cart lifecycle, products, cart validation, invoice POST per documented flow | APIs unrelated to AC1/AC2 |

### UI-AC1 — User Registration & Login

**Requirements**

- Register with valid details on the UI.
- Log in with registered credentials.
- Verify profile information reflects registered data.

**Top risks**

| # | Risk | Mitigation in test design |
|---|------|---------------------------|
| 1 | Registration validation (required fields, password rules, duplicate email) blocks happy path | Smoke: valid register path in Regression; negative login/register in Regression |
| 2 | Profile data mismatch after login (stale session or wrong user) | Assert profile fields against registration test data |
| 3 | Invalid credentials accepted or unclear error messaging | Regression: negative login case |

**Smoke vs Regression**

| Objective | Tag |
|-----------|-----|
| Valid login with known/good user | Smoke |
| Register → login → profile verification | Regression |
| Invalid login | Regression |

---

### UI-AC2 — End-to-End Purchase Flow

**Requirements**

- Browse products; add multiple items to cart; update quantity.
- Checkout using **Cash on Delivery**.
- Press **Confirm twice** to generate invoice (assessment rule).
- View generated invoice under **My Invoices**.

**Top risks**

| # | Risk | Mitigation in test design |
|---|------|---------------------------|
| 1 | **Single Confirm** — invoice not created; testers assume defect | Explicit steps and automation for **second Confirm**; Regression E2E manual + UI case |
| 2 | Cart empty or wrong quantity at checkout | Smoke add-to-cart; Regression quantity update |
| 3 | Invoice not visible in My Invoices after successful payment UI | E2E assertion on My Invoices list/detail |

**Smoke vs Regression**

| Objective | Tag |
|-----------|-----|
| Catalog/browse loads; add to cart | Smoke |
| Full COD checkout, Confirm ×2, My Invoices | Regression |
| Search / product detail / filters (within case cap) | Regression |

---

### API-AC1 — User Authentication & Cart Creation

**Requirements**

- Register via API.
- Login with registered credentials.
- Obtain valid bearer token.
- Create a new cart successfully.

**Top risks**

| # | Risk | Mitigation in test design |
|---|------|---------------------------|
| 1 | Weak or invalid password → **422** on register | Use strong password in builders; optional negative API case within cap |
| 2 | Missing or expired bearer token on cart create → **401/403** | Smoke: login + token + create cart; chain assertions |
| 3 | Duplicate email on parallel runs → **409** | Unique email per run (dynamic test data — Step 4) |

**Smoke vs Regression**

| Objective | Tag |
|-----------|-----|
| Register + login + token + create cart | Smoke |
| Token/cart error handling | Regression |

---

### API-AC2 — Product Selection & Invoice Generation

**Requirements**

- Retrieve products with bearer token.
- Add selected products to cart.
- Verify cart contents.
- Generate invoice with required customer/order details (assessment example: `payment_method`: `cash-on-delivery`, dynamic `cart_id`, billing fields including `billing_country` **TG** and `billing_postal_code` **1234AA**).

**Top risks**

| # | Risk | Mitigation in test design |
|---|------|---------------------------|
| 1 | Invalid `cart_id` or wrong add-to-cart contract → **404/422** | Use cart from create-cart step; validate cart GET before invoice |
| 2 | Billing country/postal mismatch vs API rules → **422** | Positive path uses assessment sample; Regression negative invalid billing |
| 3 | Invoice created but cart state inconsistent | Assert cart contents before POST `/invoices` |

**Smoke vs Regression**

| Objective | Tag |
|-----------|-----|
| GET products; add item; GET cart | Smoke / Regression (split by case cap) |
| POST invoice valid payload | Regression |
| Invalid billing (negative) | Regression |

---

### Cross-cutting test types (manual + automation)

| Type | Application to Toolshop |
|------|-------------------------|
| Positive | Happy paths for AC1/AC2 UI and API |
| Negative | Invalid login; invalid API billing where case budget allows |
| Edge | Confirm-only-once behaviour (UI); duplicate register email |
| Smoke | Minimum path to trust build: login, catalog, cart, API auth + cart |
| Regression | E2E purchase, profile, invoice validation, API invoice lifecycle |

### Traceability (requirements → planned coverage)

| AC | Manual (Step 3) | UI auto (Step 7) | API auto (Step 6) |
|----|-----------------|------------------|-------------------|
| UI-AC1 | TC-M-002, TC-M-004, TC-M-006 | Login, register/profile, negative login | — |
| UI-AC2 | TC-M-001, TC-M-003, TC-M-005 | Catalog, cart, checkout Confirm ×2 | — |
| API-AC1 | TC-M-007 | — | Auth + cart smoke |
| API-AC2 | TC-M-008 | — | Products, cart, invoice |

*Case IDs finalized when `FunctionalTestCase.csv` is generated in Step 3.*

---

## Setup Summary (Part A — completed sections noted)

1. **Project and SUT context to the tool:** Single source `.cursor/context/project_context.md` (SUT URLs, ACs, Confirm ×2, naming, folder structure); `@Assessment.md` for submission rules; `.cursor/rules` and `.cursor/skills` for constraints. Short focused prompts; no repeating full SUT in every chat.

2. **AI for requirement analysis:** Iterative prompts recorded in `ai-prompts/requirements-and-planning.md` (Step 1 scope, Step 2 risk analysis). AI drafts AC breakdown and risks; human validates against Assessment.md only.

3. **AI for test planning and strategy (UI vs API, smoke vs regression):** Matrix above; balanced UI + API within 5–8 cases per tier. UI for user-visible behaviour (Confirm ×2); API for lifecycle and invoice payload. *(Detailed strategy in Step 3–7.)*

4. **AI for manual test case design:** *(Step 3 — pending)* via `.cursor/ai-prompts/MANUAL_PROMPT.md`.

5. **AI for automation design:** *(Step 5–7 — pending)* Playwright Prism structure under `PrismStructure/`.

6. **Validate and refine AI-generated cases/scripts:** Self-review skill + manual-rules; execution evidence in later steps.

7. **AI for test data generation:** *(Step 4 — pending)* unique emails, dynamic `cart_id`, assessment invoice body.

8. **AI for debugging:** *(Step 8 — pending)* `ai-prompts/automation-and-debugging.md`.

9. **Information avoided with AI:** Production secrets, personal credentials, internal URLs, unrelated customer data.

10. **Reuse in a real project:** Reuse context + rules + skills + phased `ai-prompts/`; one task per prompt; tag Smoke/Regression; keep traceability AC → TC.

---

## Coverage snapshot (target)

| Tier | Count | Smoke / Regression |
|------|-------|--------------------|
| Manual | 8 | Both |
| UI automation | 7–8 | Both |
| API automation | 7–8 | Both |

Positive, negative, and edge cases included within the case cap per assessment.
