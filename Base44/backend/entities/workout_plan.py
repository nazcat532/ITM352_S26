"""
Workout Plan Model
Represents a structured workout routine
"""


class WorkoutPlan:
    """Model for a workout plan"""
    
    def __init__(self, name, exercises=None, user_id=None):
        self.name = str(name)
        self.exercises = exercises or []
        self.user_id = user_id

    def add_exercise(self, exercise):
        """Add an exercise to the plan"""
        self.exercises.append(exercise)

    def remove_exercise(self, exercise_name):
        """Remove an exercise from the plan"""
        self.exercises = [e for e in self.exercises if e.get('name') != exercise_name]

    def to_dict(self):
        """Returns a dictionary representation of the plan."""
        return {
            "name": self.name,
            "exercises": self.exercises,
            "user_id": self.user_id
        }

    def __repr__(self):
        return f"WorkoutPlan({self.name}, {len(self.exercises)} exercises)"
