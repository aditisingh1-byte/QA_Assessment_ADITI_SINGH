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

## Planned (Step 4, 9)

- `project-info.md` — Part A AI workflow answers  
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
