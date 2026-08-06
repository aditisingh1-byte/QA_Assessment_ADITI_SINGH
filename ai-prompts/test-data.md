# AI Prompts – Test Data

**SUT:** https://practicesoftwaretesting.com/  
**API:** https://api.practicesoftwaretesting.com  

**Purpose of this file:** Record prompts used to design/generate test data for UI + API (including AI-assisted data).

**Status:** No test-data implementation entries yet. `PrismStructure/` test data builders will be logged here in Step 4–6.

---

## Planned prompts (Step 4+)

1. Unique registration email/username strategy for UI and API  
2. Invoice POST body: Assessment sample (`TG`, `1234AA`, cash-on-delivery) vs negative billing  
3. Where data lives: env, JSON fixtures, builders (no hardcoded tokens/cart IDs in specs)

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
