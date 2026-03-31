# Irrigation Decision Tool — Water Stress Alert System

A backend API for monitoring crop water stress and alerting agronomists before plants reach critical depletion levels.

## What It Does

- Tracks farms, crops, and their soil properties
- Ingests weather readings (ET0, rainfall, temperature, humidity) and soil moisture sensor data
- Runs a water balance model based on FAO-56 standards to calculate current soil water depletion
- Classifies stress severity: **None / Low / Medium / High**
- Predicts how many days until a crop hits water stress

## Tech Stack

| Layer    | Technology          |
|----------|---------------------|
| Backend  | FastAPI (Python)    |
| Database | MySQL 8.0           |
| ORM      | SQLAlchemy          |
| Container| Docker / Docker Compose |

## Supported Crops

Tomato, Wheat, Maize, Grapes, Almonds

## Getting Started

### 1. Start the database
```bash
docker compose up -d
