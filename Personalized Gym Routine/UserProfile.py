class UserProfile:
    def __init__(self, name, goal, body_type, target_areas):
        self.name = name
        self.goal = goal
        self.body_type = body_type
        self.target_areas = target_areas  # Expected to be a list
        self.current_weight = 0.0

    def update_weight(self, new_weight):
        """Updates the user's weight attribute."""
        self.current_weight = new_weight

    def to_dict(self):
        """Converts object data to a dictionary for JSON saving."""
        return {
            "name": self.name,
            "goal": self.goal,
            "body_type": self.body_type,
            "target_areas": self.target_areas,
            "current_weight": self.current_weight
        }