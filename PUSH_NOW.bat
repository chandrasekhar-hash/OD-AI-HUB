@echo off
title Push Public Website and Management Dashboard to GitHub
echo ============================================================
echo   Pushing to: https://github.com/odaihub/odaihub-official
echo ============================================================
echo.
echo All 384 files (Public Website + Management Dashboard + DBs + README)
echo are committed and ready.
echo.
echo If prompted for credentials, sign in with your GitHub account.
echo.
cd /d "%~dp0"
git push origin main --force
echo.
if %ERRORLEVEL% equ 0 (
    echo ============================================================
    echo  SUCCESS! Pushed to https://github.com/odaihub/odaihub-official
    echo ============================================================
) else (
    echo ============================================================
    echo  Push encountered an issue. Please check your credentials.
    echo ============================================================
)
echo.
pause
