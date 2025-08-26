# API-Driven Mini Web App

## Features
- Search GitHub repositories by keyword.
- Store results in database (SQLite/Postgres).
- Display results in a dashboard.
- Error handling for failed searches.

## Tech Stack
- Frontend: React (Vite/CRA)
- Backend: FastAPI (Python)
- Database: SQLite (can switch to Postgres)
- Hosting: Render (backend), Vercel (frontend)

## Setup Instructions
### Backend
1. `cd backend`
2. `pip install -r requirements.txt`
3. `uvicorn main:app --reload`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

