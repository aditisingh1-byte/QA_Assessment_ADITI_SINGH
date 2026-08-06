# AI Prompts – Test Data

**SUT:** https://practicesoftwaretesting.com/  
**API:** https://api.practicesoftwaretesting.com  

**Purpose of this file:** Record prompts used to design/generate test data for UI + API (including AI-assisted data).

**Strategy document:** `project-info.md` → **Test Data Strategy** (Step 4)

---

## Entry 1 — Unique identity data (Step 4a)

- **Prompt:**  
  For Toolshop manual and API tests, define a test data strategy: unique email/username per run, strong password rule, no hardcoded cart_id or tokens. Reference Assessment.md and FunctionalTestCase.csv only.

- **AI Response Summary:**  
  Use timestamp or run suffix in emails (`manual.user.{timestamp}@example.com`, `api.user.{timestamp}@example.com`); password `Pass$w0rd1` as consistent complex example; obtain `cart_id` and `access_token` from API responses in-flow; manual CSV keeps `{timestamp}` placeholders.

- **Validation Notes:**  
  Aligns with `manual-rules.md` Rule 8 and `project_context.md` default assumptions. Documented in `project-info.md` Test Data Strategy table.

---

## Entry 2 — Invoice POST payload from Assessment (Step 4b)

- **Prompt:**  
  Extract the Assessment example invoice request body for API positive tests. List which fields are static defaults vs dynamic per run.

- **AI Response Summary:**  
  Static defaults: billing street/city/state, `billing_country` TG, `billing_postal_code` 1234AA, `payment_method` cash-on-delivery, empty `payment_details`. Dynamic: `cart_id` from cart creation; bearer token from login. Sample `cart_id` in Assessment is illustrative only—not for hardcoding.

- **Validation Notes:**  
  Matches Assessment.md Part B example JSON. Used for TC-M-008 steps and planned API automation.

---

## Entry 3 — Where data will live in repo (Step 4c)

- **Prompt:**  
  Without creating automation yet, specify where UI/API test data will live under Assessment `PrismStructure/` and how manual CSV data relates.

- **AI Response Summary:**  
  Manual: `FunctionalTestCase.csv` Test Data column. Automation (Step 5+): planned `PrismStructure` testdata (builders/JSON) and `.env.example` for base URLs; gitignore `.env` if used. No new folders beyond Assessment layout in Step 4.

- **Validation Notes:**  
  Implementation in `PrismStructure/src/testdata/` (Step 5). Strategy doc unchanged.

---

## Entry 4 — Negative data scope (Step 4d)

- **Prompt:**  
  Within 5–8 cases per tier, which negative test data is in scope for Toolshop? Map to existing manual cases.

- **AI Response Summary:**  
  Manual negative: invalid login (TC-M-006). API negative: optional invalid billing in one regression API case if automation count allows. UI register validation covered by TC-M-004 workflow rather than separate weak-password API dump in manual suite.

- **Validation Notes:**  
  Avoids inventing extra modules; ties to committed CSV IDs only.

---

## Entry 5 — Test data files in PrismStructure (Step 5)

- **Prompt:**  
  Add `data.builders.js` and `checkout.data.json` under PrismStructure per Step 4 strategy.

- **AI Response Summary:**  
  Builders generate unique registration emails; invoice builder injects dynamic `cart_id` with Assessment default billing fields.

- **Validation Notes:**  
  Matches `project-info.md` Test Data Strategy; no secrets in JSON.

---

## Reusable test-data prompt (Rules + Skills)

```text
Act as Senior QA for Toolshop test data.

RULES:
- No hardcoded runtime users in tests
- Unique emails for register
- Strong password meeting API rules
- Dynamic cart_id for invoices
- Valid API billing per Assessment sample unless testing negative
- Put reusable values in repo files — not only in chat

SKILLS:
- Boundary & negative data design
- Environment separation
- Builder pattern for payloads

Output: data strategy summary + file paths + validation notes.
```
