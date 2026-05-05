"""
Personalized Gym Routine Backend API
Flask application for workout management and tracking
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import json
import os

# Import models
from entities.exercise_entry import ProgressLog
from entities.workout_plan import WorkoutPlan

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# -------------------
# CONFIGURATION
# -------------------
app.config['JSON_SORT_KEYS'] = False
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
os.makedirs(DATA_DIR, exist_ok=True)


# -------------------
# UTILITY FUNCTIONS
# -------------------
def load_workouts():
    """Load workout data from JSON file"""
    filepath = os.path.join(DATA_DIR, 'workouts.json')
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            return json.load(f)
    return []


def save_workouts(data):
    """Save workout data to JSON file"""
    filepath = os.path.join(DATA_DIR, 'workouts.json')
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)


# -------------------
# HEALTH CHECK
# -------------------
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'timestamp': datetime.now().isoformat(),
        'service': 'personalized-gym-routine-api'
    }), 200


# -------------------
# WORKOUT PLAN ENDPOINTS
# -------------------
@app.route('/api/workout-plans', methods=['GET'])
def get_workout_plans():
    """Get all workout plans (limit to 5 most recent)"""
    try:
        workouts = load_workouts()
        # Return most recent 5
        return jsonify(workouts[-5:]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/workout-plans', methods=['POST'])
def create_workout_plan():
    """Create a new workout plan"""
    try:
        data = request.json
        workout = {
            'id': datetime.now().timestamp(),
            'name': data.get('name', 'Untitled Plan'),
            'exercises': data.get('exercises', []),
            'created_at': datetime.now().isoformat(),
            'updated_at': datetime.now().isoformat()
        }
        workouts = load_workouts()
        workouts.append(workout)
        save_workouts(workouts)
        return jsonify(workout), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/workout-plans/<plan_id>', methods=['GET'])
def get_workout_plan(plan_id):
    """Get a specific workout plan"""
    try:
        workouts = load_workouts()
        plan = next((w for w in workouts if str(w['id']) == plan_id), None)
        if not plan:
            return jsonify({'error': 'Plan not found'}), 404
        return jsonify(plan), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/workout-plans/<plan_id>', methods=['PUT'])
def update_workout_plan(plan_id):
    """Update a workout plan"""
    try:
        data = request.json
        workouts = load_workouts()
        plan = next((w for w in workouts if str(w['id']) == plan_id), None)
        if not plan:
            return jsonify({'error': 'Plan not found'}), 404
        
        plan.update({
            'name': data.get('name', plan['name']),
            'exercises': data.get('exercises', plan['exercises']),
            'updated_at': datetime.now().isoformat()
        })
        save_workouts(workouts)
        return jsonify(plan), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/workout-plans/<plan_id>', methods=['DELETE'])
def delete_workout_plan(plan_id):
    """Delete a workout plan"""
    try:
        workouts = load_workouts()
        workouts = [w for w in workouts if str(w['id']) != plan_id]
        save_workouts(workouts)
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# -------------------
# PROGRESS LOG ENDPOINTS
# -------------------
@app.route('/api/progress-logs', methods=['POST'])
def log_progress():
    """Log workout progress"""
    try:
        data = request.json
        log = ProgressLog(
            exercise_name=data.get('exercise_name'),
            weight=data.get('weight'),
            reps=data.get('reps'),
            sets_completed=data.get('sets_completed'),
            workout_plan_id=data.get('workout_plan_id'),
            notes=data.get('notes')
        )
        log_dict = log.to_dict()
        log_dict['id'] = datetime.now().timestamp()
        log_dict['created_at'] = datetime.now().isoformat()
        
        return jsonify(log_dict), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# -------------------
# ERROR HANDLERS
# -------------------
@app.errorhandler(404)
def not_found(e):
    """404 error handler"""
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def server_error(e):
    """500 error handler"""
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    # Run development server
    app.run(debug=True, port=5000)
