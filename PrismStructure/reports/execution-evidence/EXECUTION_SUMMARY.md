# Test execution evidence (Step 8)

**Run date:** 2026-08-06  
**Environment:** Windows, Node.js, Playwright (`channel: chrome`)  
**Working directory:** `PrismStructure/`

## Commands

| Suite | Command | Result |
|-------|---------|--------|
| Full automation (API + UI + scaffold) | `npx playwright test --workers=1` | **17 passed** |
| Smoke only | `npm run test:smoke` | Same subset tagged `@smoke` |
| Regression only | `npm run test:regression` | Same subset tagged `@regression` |
| API | `npm run test:api` | 8 passed |
| UI | `npm run test:ui` | 8 passed |

Configure env: copy `.env.example` to `.env` (no secrets required for public demo URLs).

## Automated case status (all Passed)

| ID | Project | Tag |
|----|---------|-----|
| TC-API-001–008 | api | smoke / regression |
| TC-UI-001–008 | ui | smoke / regression |
| scaffold config check | scaffold | smoke |

Manual cases **TC-M-001–008** are tracked in `FunctionalTestCase.csv` (executed outside this Playwright run).

## Artifacts in this folder

| File | Description |
|------|-------------|
| `test-results.json` | Playwright JSON reporter output (committed copy) |
| `full-suite-run.log` | Console output from full-suite run |
| `html/index.html` | HTML report snapshot (`npm run report` opens live report under `reports/html/`) |

Local re-runs regenerate `reports/html/` and `reports/test-results.json` (gitignored); refresh this folder before submission if re-executing.
