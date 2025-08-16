@echo off
echo Starting EcoRewards Platform...
echo.

echo Starting Flask Backend...
start "Flask Backend" cmd /k "cd backend && python app.py"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting React Frontend...
start "React Frontend" cmd /k "npm run dev"

echo.
echo EcoRewards Platform is starting...
echo.
echo Frontend: http://localhost:5173
echo Backend: http://localhost:5000
echo.
echo Press any key to close this window...
pause > nul
