# DECISIONS.md

## 1. Why Django + React
Fast full-stack development and clean separation of backend/frontend.

---

## 2. Why single EmissionRecord model
Instead of separate tables for SAP/Utility/Travel, all are normalized into one structure.

Reason:
- easier analytics
- unified dashboard
- simpler auditing

---

## 3. Why RawRecord exists
We store raw ingestion data to:
- support debugging
- allow reprocessing
- maintain audit trail

---

## 4. Status system (PENDING / APPROVED / REJECTED)
Used to simulate ESG analyst workflow before final audit submission.

---

## 5. CO2e calculation
Simple emission factor approach used for prototype:

- Fuel: 2.31
- Electricity: 0.82
- Travel: 0.15

---

## 6. Simplifications made
- No real SAP IDoc parsing
- No PDF utility parsing
- No external API integrations

These were skipped to focus on core architecture.