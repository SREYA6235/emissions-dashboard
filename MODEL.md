## Emissions Data Model Design

## Overview
This system ingests emissions data from multiple enterprise sources (SAP, Utility, Travel), normalizes it into a unified structure, and supports analyst review before audit approval.

The design prioritizes:
- Multi-source ingestion flexibility
- Traceability of raw data
- Audit readiness
- Simple but realistic carbon accounting structure

---

## Core Entities

### 1. Organization
Represents a client company onboarded to the platform.

- Supports multi-tenancy
- All emissions belong to an organization

---

### 2. DataSource
Represents the origin system of emissions data.

Examples:
- SAP (fuel/procurement)
- Utility portal (electricity usage)
- Travel platform (flights, transport)

Purpose:
- Tracks where each emission record originated
- Enables traceability and debugging

---

### 3. RawRecord
Stores unprocessed input data.

Purpose:
- Keeps original ingestion payload intact
- Enables audit and reprocessing if needed
- Ensures no data loss during normalization

---

### 4. EmissionRecord (Normalized Core Model)

This is the main analytical entity.

Fields:
- organization → tenant isolation
- source → origin system
- scope → Scope 1 / 2 / 3 classification
- category → fuel, electricity, travel, etc.
- activity_value → raw activity (liters, kWh, km)
- unit → unit of measurement
- co2e → computed emissions (kg CO2 equivalent)
- status → PENDING / APPROVED / REJECTED
- date → event date

---

## Why This Model Works

### 1. Multi-tenancy
Each record belongs to an organization, ensuring strict data separation.

### 2. Source Traceability
Every emission can be traced back to its ingestion source.

### 3. Separation of Concerns
- RawRecord = ingestion layer
- EmissionRecord = analytics layer

---

## Unit Normalization Approach

Each ingestion pipeline converts raw activity into:
- standardized activity_value
- standardized unit
- computed co2e using emission factor

Examples:
- Fuel → liters → CO2 multiplier
- Electricity → kWh → grid factor
- Travel → km → distance factor

---

## Status Workflow

Emission lifecycle:
PENDING → APPROVED → REJECTED

Only APPROVED records are considered final for audit reporting.

---

## Tradeoffs

- No PDF parsing for utility bills (assumed CSV/API input)
- No real SAP IDoc integration (simplified to structured payload)
- No external emission factor service (hardcoded coefficients)

---

## Summary
This model prioritizes clarity, auditability, and realistic ingestion flows over full enterprise complexity.