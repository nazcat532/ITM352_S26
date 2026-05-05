#!/bin/bash

# Personalized Gym Routine Setup Script

echo "Setting up Personalized Gym Routine..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed. Please install Python 3.8 or later."
    exit 1
fi

echo "Python 3 found: $(python3 --version)"

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "Installing dependencies..."
pip install -r requirements.txt

echo "Setup complete! ✓"
echo ""
echo "To start the application:"
echo "1. Activate the virtual environment: source venv/bin/activate"
echo "2. Run the app: python app.py"
echo "3. Open your browser to http://127.0.0.1:5000"
