# API Automation Rules

Version: 1.0

Purpose

Mandatory rules for API Testing and API Automation.

---

# Rule 1

Always use Playwright API Testing.

---

# Rule 2

Use Bearer Token authentication.

Never hardcode tokens.

---

# Rule 3

Generate reusable API functions.

---

# Rule 4

Never hardcode

Cart ID

Invoice ID

Product ID

Order ID

Customer ID

---

# Rule 5

Validate

Status Code

Headers

Response Body

Schema

Response Time

Error Messages

Business Data

---

# Rule 6

Always validate negative scenarios.

Examples

401

403

404

409

422

500

---

# Rule 7

Use realistic payloads.

Generate dynamic data.

---

# Rule 8

Every API test should verify

Request

Response

Business Validation

---

# Rule 9

Separate

Authentication

Cart

Product

Invoice

into different modules.

---

# Rule 10

Never chain more than one business objective in a single test unless it is an End-to-End lifecycle scenario.

---

# Rule 11

Log

Request

Response

Headers

Payload

Execution Time

---

# Rule 12

Reusable Design

Authentication Helper

API Client

Common Assertions

Common Payload Builder

Environment Variables

---

# Rule 13

No duplicated endpoints.

No duplicated payloads.

---

# Rule 14

Always clean up test data if supported.

---

# Rule 15

Use environment configuration.

Never hardcode URLs.