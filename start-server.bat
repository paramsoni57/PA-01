@echo off
cd /d "%~dp0"
set "NODE_EXE=C:\Users\param\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
set "ADMIN_URL=http://127.0.0.1:4173/admin-login.html"

echo Starting Param Automation server...
echo Admin Dashboard: %ADMIN_URL%
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":4173" ^| findstr "LISTENING"') do taskkill /PID %%a /F >nul 2>nul
"%NODE_EXE%" server.js
pause
