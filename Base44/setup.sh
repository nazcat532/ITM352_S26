#!/bin/bash

# Personalized Gym Routine Setup Script
# Run this script to set up the entire Base44 project

set -e

echo "🚀 Setting up Personalized Gym Routine (Base44)..."
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi
echo "✓ Node.js found: $(node --version)"

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install it from https://www.python.org/"
    exit 1
fi
echo "✓ Python found: $(python3 --version)"

echo ""
echo "📦 Installing frontend dependencies..."
npm install

echo ""
echo "🐍 Setting up backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -r requirements.txt

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Backend: Open a terminal and run:"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python app.py"
echo ""
echo "2. Frontend: Open another terminal and run:"
echo "   npm run dev"
echo ""
echo "3. Open http://localhost:5173 in your browser"
echo ""
echo "For more details, see SETUP.md"
