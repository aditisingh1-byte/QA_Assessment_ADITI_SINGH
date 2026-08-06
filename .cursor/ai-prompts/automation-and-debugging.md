# AI Prompts – Automation and Debugging

**SUT UI:** https://practicesoftwaretesting.com/  
**SUT API:** https://api.practicesoftwaretesting.com  
**Framework (Assessment):** Playwright (Prism-style) under `PrismStructure/`

**Purpose of this file:** Record prompts for automation structure, assertions, and failure analysis.

**Status:** No automation entries yet. Scaffold, API/UI specs, and debugging notes will be added in Steps 5–8.

---

## Planned structure (from Assessment — not implemented)

```text
PrismStructure/
├── playwright.config.js
├── tests/          # UI and API specs with @smoke / @regression
├── reports/        # execution reports
└── (support layers per Prism / hybrid design)
```

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
