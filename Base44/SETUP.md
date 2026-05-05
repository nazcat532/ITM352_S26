# Base44 - Personalized Gym Routine Application

## Project Structure

```
Base44/
├── frontend (React/TypeScript with Vite)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── app.tsx          # Main React app with routing
│   │   └── main.tsx         # React entry point
│   ├── package.json
│   ├── vite.config.js
│   └── tsconfig.json
│
└── backend (Python/Flask)
    ├── app.py               # Flask application
    ├── config.py            # Configuration
    ├── requirements.txt     # Python dependencies
    ├── entities/            # Data models
    │   ├── exercise_entry.py
    │   └── workout_plan.py
    └── data/                # JSON data storage
```

## Prerequisites

- **Node.js** (v16+) - [Download](https://nodejs.org/)
- **Python** (3.8+) - [Download](https://www.python.org/)
- **npm** or **yarn** package manager

## Setup Instructions

### 1. Frontend Setup

```bash
cd Base44

# Install Node.js dependencies
npm install

# Create frontend .env file
cp .env.example .env

# Start development server (runs on http://localhost:5173)
npm run dev
```

### 2. Backend Setup

```bash
cd Base44/backend

# Create Python virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Create backend .env file
cp .env.example .env

# Run Flask development server (runs on http://localhost:5000)
python app.py
```

## Running the Full Application

### Terminal 1: Backend (Python)
```bash
cd Base44/backend
source venv/bin/activate
python app.py
```

### Terminal 2: Frontend (React)
```bash
cd Base44
npm run dev
```

The frontend will be available at **http://localhost:5173**
The backend API will be available at **http://localhost:5000/api**

## Available Scripts

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run lint:fix   # Fix linting issues
npm run typecheck  # Run TypeScript type checking
```

### Backend
```bash
python app.py      # Run Flask development server
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Workout Plans
- `GET /api/workout-plans` - Get all workout plans
- `POST /api/workout-plans` - Create new workout plan
- `GET /api/workout-plans/<id>` - Get specific plan
- `PUT /api/workout-plans/<id>` - Update workout plan
- `DELETE /api/workout-plans/<id>` - Delete workout plan

### Progress Logs
- `POST /api/progress-logs` - Log workout progress

## Key Technologies

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **TanStack Query** - Data fetching
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

### Backend
- **Flask** - Web framework
- **Flask-CORS** - Cross-origin requests
- **Python 3** - Backend language

## Troubleshooting

### "npm: command not found"
- Install Node.js from https://nodejs.org/

### "python: command not found"
- Install Python from https://www.python.org/

### CORS errors
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env` file

### Module not found errors in backend
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt`

### TypeScript errors in frontend
- Run `npm install` to install all dependencies
- Clear node_modules: `rm -rf node_modules && npm install`

## Development Notes

- Frontend and backend are completely separated
- Frontend communicates with backend via REST API
- Backend provides data and business logic
- All requests should go through `/api/` prefix

---

For more information, see the individual `README.md` files in frontend and backend directories.
