# Manual QA Rules

Version: 1.0

Purpose

This document contains mandatory instructions for generating Manual Functional Test Cases.

These rules must always be followed.

---

# Rule 1 - Scope

Generate Manual Functional Test Cases only.

Do NOT generate:

- Automation scripts
- Playwright code
- API code
- SQL scripts
- Performance tests
- Security penetration tests

unless explicitly requested.

---

# Rule 2 - Coverage

Every generated suite must include:

✓ Positive Testing

✓ Negative Testing

✓ Edge Cases

✓ Boundary Testing

✓ Validation Testing

✓ Business Workflow

✓ End-to-End Testing

✓ Smoke Coverage

✓ Regression Coverage

---

# Rule 3 - Test Case Independence

Every test case should validate one logical behaviour.

Avoid combining multiple scenarios into one test case.

---

# Rule 4 - Expected Result

Each test case must contain exactly ONE Expected Result.

Do not use

•

1.

2.

3.

inside Expected Result.

If multiple validations are required

Create multiple test cases.

---

# Rule 5 - Test Case IDs

Naming Convention

TC-M-001

TC-M-002

TC-M-003

...

Never duplicate IDs.

---

# Rule 6 - Smoke Rules

Smoke should contain only business critical scenarios.

Examples

Registration

Login

Browse Products

Add to Cart

Checkout

Invoice

Logout

---

# Rule 7 - Regression Rules

Regression should include

Negative

Validation

Boundary

Search

Filters

Quantity Update

Session

Profile

Invoice

API Integration

---

# Rule 8 - Test Data

Always use

Unique Email

Dynamic Username

Random Address

Strong Password

Reusable Test Data

Never hardcode IDs.

---

# Rule 9 - CSV Format

Output file name

FunctionalTestCase.csv

Encoding

UTF-8

Comma Separated

Excel Compatible

No Markdown Tables

---

# Rule 10 - CSV Columns

Test Case ID

Module

Feature

Requirement

Scenario

Title

Priority

Severity

Category

Smoke/Regression

Preconditions

Test Data

Steps

Expected Result

Automation Candidate

Status

Remarks

---

# Rule 11 - Priority

High

Medium

Low

---

# Rule 12 - Severity

Critical

Major

Minor

---

# Rule 13 - Language

Professional English.

Avoid vague wording.

Write execution-ready test cases.

---

# Rule 14 - Traceability

Every test case must map to

UI-AC1

UI-AC2

API-AC1

API-AC2

where applicable.

---

# Rule 15 - Duplication

Never generate duplicate

Test Cases

Titles

Expected Results

Steps

---

# Rule 16 - Assumptions

If requirements are missing

State assumptions separately.

Do not invent business rules.

---

# Rule 17 - Final Validation

Before completion verify

✓ Complete Coverage

✓ No Duplicate Cases

✓ CSV Compatible

✓ Smoke Included

✓ Regression Included

✓ Business Flow Covered

✓ Edge Cases Covered

✓ Ready for Automation