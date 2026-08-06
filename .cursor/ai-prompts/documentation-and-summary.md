# AI Prompts – Documentation and Summary

**SUT:** https://practicesoftwaretesting.com/  
**API docs:** https://api.practicesoftwaretesting.com/api/documentation  

**Purpose of this file:** Record prompts used for README, project-info, reports guidance, and submission packaging.

---

## Entry 1 — Root `ai-prompts/` and honest prompt history (Step 1)

- **Prompt:**  
  Align submission with Assessment.md: create root `ai-prompts/` with the five required history files. Keep `.cursor/` for Rules and Skills. Remove prompt log entries that describe artifacts not yet in the repo.

- **AI Response Summary:**  
  Added `ai-prompts/` at repository root mirroring assessment names. Reset `test-data.md`, `automation-and-debugging.md`, and planned sections in `test-design.md` until manual/automation steps run. Kept factual entries in `requirements-and-planning.md` and `test-design.md` (MANUAL_PROMPT).

- **Edits You Made:**  
  Dropped forward-dated PrismStructure/CSV/report claims from prompt history stubs.

- **Reason for Edits:**  
  Evaluators compare git history and repo contents to prompt logs; entries must match completed steps.

---

## Entry 2 — project-info requirement analysis (Step 2)

- **Prompt:**  
  Same as `requirements-and-planning.md` Entry 3 — produce `project-info.md` requirement and risk section per Assessment template.

- **AI Response Summary:**  
  Added `project-info.md` with Project Summary, Tools Used, full Requirement and Risk Analysis, and partial Setup Summary (context + requirement analysis).

- **Edits You Made:**  
  Left assessment dates blank for author fill-in; noted Playwright/Prism as planned per Assessment tool expectations.

- **Reason for Edits:**  
  Step 2 deliverable only; README and remaining Part A bullets deferred.

---

## Entry 3 — Test data strategy in project-info (Step 4)

- **Prompt:**  
  Document test data strategy for Assessment deliverable: unique users, invoice payload from Assessment.md, manual CSV placeholders, planned PrismStructure data layout. Expand project-info Setup Summary items 3, 6, and 7.

- **AI Response Summary:**  
  Added **Test Data Strategy** section to `project-info.md`; filled test planning, validation/refinement, and test data bullets in Setup Summary; four entries in `ai-prompts/test-data.md`.

- **Edits You Made:**  
  Clarified Assessment invoice JSON with dynamic `cart_id`; no PrismStructure files created in Step 4.

- **Reason for Edits:**  
  Submission requires test data strategy before automation implementation; keeps git history aligned with iterative methodology.

---

## Planned (Step 9)

- `readme.md` — install, Smoke/Regression commands, report paths  
- Execution evidence pointers after test runs

---

## Reusable documentation prompt (Rules + Skills)

```text
Act as Senior QA documenting the Toolshop assessment repo.

RULES:
- Match Assessment.md templates
- Include Smoke and Regression run commands when automation exists
- State report output paths
- Reference only folders that exist in the repo
- No secrets in docs

SKILLS:
- Clear setup instructions
- Concise coverage snapshots
- Honest AI workflow reflection

Output: updated readme.md and/or project-info.md sections only.
```
