# Edumetrics AI – Student Performance Platform

A full-stack predictive analytics platform for student academic performance, combining data science (K-Means clustering, Random Forest classification, Pearson correlation) with a modern React dashboard.

## Architecture

```
backend/   – FastAPI + scikit-learn (Python)
frontend/  – React 18 + Vite + Recharts
data_science/ – Sample data & notebooks
```

## Quick Start (without Docker)

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API docs available at http://localhost:8000/docs

### Frontend

```bash
cd frontend
npm install
npm run dev          # runs on http://localhost:3000
```

## Quick Start (Docker Compose)

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API docs: http://localhost:8000/docs

## Features

| Feature | Description |
|---|---|
| **K-Means Clustering** | Segments students into 3 learning profiles: *Dificuldade Conceitual*, *Falta de Engajamento*, *Defasagem de Base* |
| **Risk Prediction** | Random Forest classifier predicts academic failure risk per student |
| **Correlation Analysis** | Pearson correlation between socioeconomic/behavioral variables and scores |
| **Performance Heatmap** | Color-coded score grid per student and subject |
| **Radar Chart** | Competency comparison across Math, Reading, Writing, Science |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | List all students |
| GET | `/api/students/{id}` | Get student by ID |
| GET | `/api/clustering` | K-Means cluster assignments |
| GET | `/api/predictions` | Risk predictions for all students |
| POST | `/api/predict` | Predict risk for a new student |
| GET | `/api/correlation` | Correlation matrix |

## Tech Stack

**Backend:** FastAPI · scikit-learn · pandas · numpy · Pydantic  
**Frontend:** React 18 · Vite · Recharts · Axios  
**Infrastructure:** Docker · Docker Compose

