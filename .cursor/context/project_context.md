# project-context.md

# Project Context
QA AI Capability Assessment – Practice Software Testing (Toolshop)

---

# Project Objective

Develop a complete AI-assisted QA Mini Project covering:

- Manual Functional Testing
- UI Automation
- API Automation
- Test Planning
- Test Data Strategy
- AI Prompt History
- Documentation

The project must demonstrate practical AI-assisted testing using Cursor AI and Playwright while keeping token consumption efficient through modular prompts and iterative development.

---

# System Under Test (SUT)

## UI

https://practicesoftwaretesting.com/

## API Documentation

https://api.practicesoftwaretesting.com/api/documentation

## API Base URL

https://api.practicesoftwaretesting.com

---

# Application Type

Web-based E-Commerce Application

The application allows customers to:

- Register
- Login
- Browse products
- Search products
- Filter products
- View product details
- Add products to cart
- Update cart quantity
- Checkout
- Pay using Cash on Delivery
- Generate invoice
- View previous invoices
- Manage profile
- Logout

---

# Primary Business Flow

User Registration

↓

Login

↓

Browse Products

↓

Search / Filter

↓

View Product

↓

Add Product to Cart

↓

Update Quantity

↓

Checkout

↓

Cash On Delivery

↓

Confirm Order

↓

Confirm Order (Second Confirmation Required)

↓

Invoice Generated

↓

Invoice Available under My Invoices

---

# Important Business Rule

Invoice generation requires pressing the **Confirm** button **twice** during checkout.

This behaviour must be covered in:

- Manual Test Cases
- UI Automation
- Regression Suite

---

# API Business Flow

Register User

↓

Login

↓

Generate Bearer Token

↓

Create Cart

↓

Fetch Products

↓

Add Product to Cart

↓

Validate Cart

↓

Generate Invoice

↓

Validate Invoice

---

# Assessment Acceptance Criteria

## UI AC1

A user should be able to:

- Register successfully
- Login successfully
- Validate profile information

---

## UI AC2

A user should be able to:

- Browse products
- Add products to cart
- Update quantity
- Checkout using Cash on Delivery
- Press Confirm twice
- View generated invoice

---

## API AC1

A user should be able to:

- Register
- Login
- Generate Bearer Token
- Create Cart

---

## API AC2

A user should be able to:

- Fetch Products
- Add Product to Cart
- Validate Cart
- Generate Invoice

---

# Functional Modules

Authentication

Registration

Login

Logout

Profile

Home

Product Listing

Product Details

Search

Filters

Categories

Shopping Cart

Checkout

Invoice

My Invoices

Order History

---

# API Modules

Authentication API

Registration API

Login API

Products API

Cart API

Invoice API

---

# Test Scope

## Manual Testing

Generate only 5–8 high-value manual test cases.

Cover:

- Positive
- Negative
- Edge
- Smoke
- Regression

---

## UI Automation

Framework

Playwright (JavaScript)

Automation Scope

Smoke

Regression

End-to-End Checkout

---

## API Automation

Framework

Playwright API Testing

Automation Scope

Authentication

Cart Lifecycle

Invoice Lifecycle

---

# Test Categorization

## Smoke

Registration

Login

Browse Products

Add to Cart

Checkout

Invoice

API Authentication

API Cart Creation

---

## Regression

Search

Filters

Product Details

Quantity Update

Negative Login

Session Validation

Invoice Validation

Profile

API Error Handling

---

# Test Data Strategy

Use realistic dynamic test data.

Examples:

- Unique Email
- Random Username
- Strong Password
- Dynamic Address
- Dynamic Cart
- Dynamic Invoice Payload

Never hardcode IDs or tokens.

---

# Deliverables

The project must include:

- requirements-and-planning.md
- project-info.md
- FunctionalTestCase.csv
- UI Automation Suite
- API Automation Suite
- Test Data Strategy
- Execution Reports
- readme.md
- AI Prompt History
- Folder Structure

---

# Folder Structure

qa-ai-practical-assessment/

├── FunctionalTestCase.csv

├── PrismStructure/

├── project-info.md

├── readme.md

├── ai-prompts/          ← submission AI prompt history (five files per Assessment.md)

├── .cursor/

│ ├── rules/

│ ├── skills/

│ ├── ai-prompts/        ← Cursor execution prompts (e.g. MANUAL_PROMPT.md; not submission history)

│ └── context/

---

# AI Workflow

This project follows an iterative AI-assisted workflow.

Phase 1

Requirement Analysis

Phase 2

Risk Analysis

Phase 3

Manual Test Design

Phase 4

Test Data Design

Phase 5

UI Automation

Phase 6

API Automation

Phase 7

Debugging

Phase 8

Documentation

---

# Token Optimization Strategy

To minimize AI token consumption:

- Keep prompts short and task-specific.
- Store reusable instructions in Rules, Skills, and Context files.
- Reuse this project-context.md instead of repeating application details.
- Use iterative prompting rather than a single large prompt.
- Use lightweight AI models for planning and documentation.
- Reserve premium coding models only for automation generation and debugging.

---

# Naming Convention

Manual Test Cases

TC-M-001

UI Automation

TC-UI-001

API Automation

TC-API-001

---

# Default Assumptions

Unless explicitly instructed otherwise:

- Browser: Google Chrome (latest)
- Environment: Production Demo
- Payment Method: Cash on Delivery
- Invoice Generation: Confirm button pressed twice
- Authentication uses valid registered users
- API uses Bearer Token authentication
- All generated test data must be unique and reusable.

---

# End of Context

This file serves as the single source of truth for all prompts, rules, and skills used throughout the QA AI Capability Assessment.