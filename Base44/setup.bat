@echo off
REM Personalized Gym Routine Setup Script for Windows
REM Run this script to set up the entire Base44 project

echo 🚀 Setting up Personalized Gym Routine (Base44)...
echo.

REM Check for Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install it from https://nodejs.org/
    exit /b 1
)
echo ✓ Node.js found: 
node --version

REM Check for Python
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Python 3 is not installed. Please install it from https://www.python.org/
    exit /b 1
)
echo ✓ Python found: 
python --version

echo.
echo 📦 Installing frontend dependencies...
call npm install

echo.
echo 🐍 Setting up backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r requirements.txt

cd ..

echo.
echo ✅ Setup complete!
echo.
echo 📝 Next steps:
echo.
echo 1. Backend: Open a terminal and run:
echo    cd backend
echo    venv\Scripts\activate.bat
echo    python app.py
echo.
echo 2. Frontend: Open another terminal and run:
echo    npm run dev
echo.
echo 3. Open http://localhost:5173 in your browser
echo.
echo For more details, see SETUP.md
