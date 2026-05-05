class WorkoutPlan:
    def __init__(
        self, 
        goal, 
        body_type, 
        target_areas, 
        exercises, 
        active=True
    ):
        self.goal = goal
        self.body_type = body_type
        self.target_areas = list(target_areas)
        self.exercises = [self._parse_exercise(e) for e in exercises]
        self.active = bool(active)

    def _parse_exercise(self, data):
        """Helper to ensure exercises are structured correctly."""
        if isinstance(data, dict):
            return {
                "name": str(data.get("name")),
                "sets": int(data.get("sets", 0)),
                "reps": str(data.get("reps")),
                "rest_seconds": int(data.get("rest_seconds", 0)),
                "muscle_group": str(data.get("muscle_group")),
                "difficulty": str(data.get("difficulty"))
            }
        return data

    def to_dict(self):
        return {
            "goal": self.goal,
            "body_type": self.body_type,
            "target_areas": self.target_areas,
            "exercises": self.exercises,
            "active": self.active
        }

# --- Example of manual usage ---
if __name__ == "__main__":
    plan = WorkoutPlan(
        goal="muscle_gain",
        body_type="mesomorph",
        target_areas=["chest", "shoulders"],
        exercises=[
            {
                "name": "Dumbbell Press",
                "sets": 4,
                "reps": "10",
                "rest_seconds": 60,
                "muscle_group": "chest",
                "difficulty": "intermediate"
            }
        ]
    )
    
    print(f"Plan active: {plan.active}")