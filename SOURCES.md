# SOURCES.md

## 1. SAP Data (Research)
SAP exports typically come from:
- IDoc formats
- OData APIs
- Flat CSV exports

Common issues:
- inconsistent naming
- mixed language headers
- missing unit standardization

In this project:
- simulated SAP fuel data via API input
- simplified to liters-based fuel usage

---

## 2. Utility Data (Electricity)
Real-world formats:
- monthly CSV exports
- smart meter APIs

Typical fields:
- kWh usage
- billing period
- meter IDs

In this project:
- simplified to kWh input form

---

## 3. Travel Data (Concur-like systems)
Platforms:
- SAP Concur
- Navan

Typical data:
- distance or airport codes
- travel type (flight/train/car)

In this project:
- simplified to km-based travel input

---

## Summary
All sources were reduced to structured numeric inputs for prototype simplicity while preserving real-world structure logic.