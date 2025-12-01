@echo off
echo Starting Adventurous Travel Express Server...
echo.
cd /d "%~dp0backend"
start "Adventurous Travel Server" node server.js
echo Server starting in background...
echo Access the API at: http://localhost:5000
echo.
timeout /t 3 /nobreak >nul
echo Testing if server is running...
node test-api.js
pause
