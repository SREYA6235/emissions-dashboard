🌿 Emissions Dashboard
A multi-tenant emissions tracking dashboard that enables organizations to log, normalize, and audit carbon data across Scope 1, 2, and 3. Built for quick data entry from fuel, utilities, and travel.🚀 Live Demo
👉 https://emissions-dashboard-one.vercel.app/📌 Features
⛽ SAP (Fuel) - Log fuel used in liters with date
⚡ Utility - Track electricity usage in kWh
✈️ Travel - Record distance traveled in km
📊 Emissions Table - View all entries with Scope, Category, Activity, Unit, CO2e
✅ Approval Workflow - Approve/Reject pending entries
🧾 Full Audit Trail - Every change logged for compliance
🔄 Unit Normalization - Auto converts to CO2e for consistent reporting
🏢 Multi-tenant - Isolated data per organization using organization_id🖥️ Frontend Layoutjavascript⛽ SAP (Fuel)
Fuel used (liters)
[ dd-mm-yyyy ]
[ Submit SAP ]

⚡ Utility
kWh
[ dd-mm-yyyy ]
[ Submit Utility ]

✈️ Travel
Distance (km)
[ dd-mm-yyyy ]
[ Submit Travel ]

ID Scope Category Activity Unit CO2e Status Actions
1 Scope 1 Fuel 50 L 120 Pending [Approve] [Reject]🧠 Key System Design Concepts
Multi-tenancy → Each organization has isolated data using organization_id
Data lineage tracking → Every record linked to its original source
Audit logging → All changes tracked in append-only audit system
Normalization layer → Fuel, kWh, km standardized into CO2e
Scope classification → Auto-tags entries as Scope 1, 2, or 3🛠 Tech Stack
Frontend
React + JavaScript
Deployed on VercelBackend
Django / Django REST Framework
SQLite for dev, PostgreSQL for prod
REST APIs with scope-based serializersjavascriptemissions-dashboard/
│
├── backend/ # Django API + models + CO2e calculators
├── frontend/ # React dashboard UI with 3 input forms + table
├── MODEL.md # Data model: Entry, AuditLog, Organization
├── DECISIONS.md # Why React, why Django, approval workflow logic
├── TRADEOFFS.md # SQLite vs Postgres, client vs server CO2e calc📊 CO2e Calculation LogicCategoryInput UnitScopeFormulaSAP/FuelLitersScope 1liters × 2.4 kg CO2e/LUtilitykWhScope 2kWh × 0.82 kg CO2e/kWhTravelkmScope 3km × 0.21 kg CO2e/km
