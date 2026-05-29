# TRADEOFFS.md

## 1. No real SAP integration
Ignored SAP IDoc/OData complexity.

Reason:
Focus on normalization pipeline, not connectors.

---

## 2. No PDF utility ingestion
Skipped parsing real utility bills.

Reason:
Would require OCR and NLP tools.

---

## 3. No authentication system
No login or roles implemented.

Reason:
Not required for prototype scope.

---

## 4. No advanced audit trail
Only basic status tracking implemented.

Missing:
- who changed status
- timestamps per action

---

## 5. No real-time ingestion
All ingestion is synchronous API-based.

---

## Why these tradeoffs?
Focus is on:
- data model
- normalization logic
- analyst workflow