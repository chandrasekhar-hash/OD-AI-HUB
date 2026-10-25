@echo off
title Start All Services (Public Website + Management Dashboard)
echo ============================================================
echo   Starting Public Landing Website and Management Dashboard
echo ============================================================
echo.

cd /d "%~dp0"

echo [1/4] Starting Public Landing Website Backend (Port 8001)...
start "Public Website Backend (:8001)" cmd /k "cd public-landing-website\backend && python run_backend.py"

timeout /t 2 /nobreak >nul

echo [2/4] Starting Public Landing Website Frontend (Port 5000)...
start "Public Website Frontend (:5000)" cmd /k "cd public-landing-website\frontend && python server.py"

timeout /t 2 /nobreak >nul

echo [3/4] Starting Management Dashboard Backend (Port 8002)...
start "Management Backend (:8002)" cmd /k "cd separate-management-dashboard\backend && python run_backend.py"

timeout /t 2 /nobreak >nul

echo [4/4] Starting Management Dashboard Frontend (Port 3001)...
start "Management Frontend (:3001)" cmd /k "cd separate-management-dashboard\frontend && npm run dev"

echo.
echo ============================================================
echo All services launched!
echo Public Website:         http://localhost:5000 (API: :8001)
echo Management Dashboard:   http://localhost:3001 (API: :8002)
echo ============================================================
pause
