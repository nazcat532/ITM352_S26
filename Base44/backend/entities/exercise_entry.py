"""
Exercise Entry Model
Represents a logged workout entry for an exercise
"""


class ProgressLog:
    """Model for logging workout progress"""
    
    def __init__(
        self, 
        exercise_name, 
        weight, 
        reps, 
        sets_completed=None, 
        workout_plan_id=None, 
        notes=None
    ):
        # Required fields
        self.exercise_name = str(exercise_name)
        self.weight = float(weight)
        self.reps = int(reps)
        
        # Optional fields
        self.sets_completed = sets_completed
        self.workout_plan_id = workout_plan_id
        self.notes = notes

    def to_dict(self):
        """Returns a dictionary representation of the log entry."""
        return {
            "exercise_name": self.exercise_name,
            "weight": self.weight,
            "reps": self.reps,
            "sets_completed": self.sets_completed,
            "workout_plan_id": self.workout_plan_id,
            "notes": self.notes
        }

    def __repr__(self):
        return f"ProgressLog({self.exercise_name}, {self.weight}lbs, {self.reps} reps)"
