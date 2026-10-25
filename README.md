# 🌟 ODAIHUB - Public Website & Management Dashboard

This repository contains the standalone full-stack codebases for both the **ODAIHUB Public Landing Website** and the **ODAIHUB Separate Management Dashboard**.

---

## 📌 Repositories & Services Overview

| Service | Type | Local Port | Directory | Backend API Docs |
|---|---|---|---|---|
| **Public Landing Website** | Frontend (Vite + React) | `http://localhost:5000` | `public-landing-website/frontend` | - |
| **Public Landing Website** | Backend (FastAPI + SQLite) | `http://localhost:8001` | `public-landing-website/backend` | `http://localhost:8001/api/docs` |
| **Separate Management Dashboard** | Frontend (Vite + React) | `http://localhost:3001` | `separate-management-dashboard/frontend` | - |
| **Separate Management Dashboard** | Backend (FastAPI + SQLite) | `http://localhost:8002` | `separate-management-dashboard/backend` | `http://localhost:8002/api/docs` |

---

## 📂 Repository Structure

```
Public-Website-And-Management-Dashboard/
├── public-landing-website/
│   ├── frontend/             # React 18, Vite, Tailwind CSS (Port 5000)
│   ├── backend/              # FastAPI REST API (Port 8001)
│   └── database/             # SQLite DB (edutrack.db)
│
├── separate-management-dashboard/
│   ├── frontend/             # React 18, Vite, Tailwind CSS (Port 3001)
│   ├── backend/              # FastAPI REST API (Port 8002)
│   └── database/             # SQLite DB (edutrack.db)
│
├── start_all.bat             # 1-click launch for all 4 services
├── push_to_github.bat        # Git automation helper script
├── PUSH_NOW.bat              # Interactive Git push script
└── README.md
```

---

## 🚀 Quick Start (Localhost)

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1-Click Launch (Windows)
Double-click:
```bash
start_all.bat
```
This automatically launches all 4 services in their respective ports.

### Manual Launch

#### 1. Public Landing Website
```bash
# Backend (Port 8001)
cd public-landing-website/backend
pip install -r requirements.txt
python run_backend.py

# Frontend (Port 5000)
cd public-landing-website/frontend
python server.py
```

#### 2. Separate Management Dashboard
```bash
# Backend (Port 8002)
cd separate-management-dashboard/backend
pip install -r requirements.txt
python run_backend.py

# Frontend (Port 3001)
cd separate-management-dashboard/frontend
npm install
npm run dev
```

---

## 🔑 Default Credentials (Management Console)

- **Username**: `omm` (or `admin`)
- **Password**: `admin123`

---

## 📄 License
ODAIHUB Official Ecosystem © 2026. All Rights Reserved.
