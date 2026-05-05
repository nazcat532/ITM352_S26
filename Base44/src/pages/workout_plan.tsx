import { useState } from "react";

type Exercise = {
  name: string;
  muscle_group: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  sets: number;
  reps: number;
  rest_seconds: number;
};

type WorkoutPlanType = {
  goal: string;
  body_type: string;
  active: boolean;
  exercises: Exercise[];
};

export default function WorkoutPlan(): JSX.Element {
  const [loading] = useState<boolean>(false);

  // 🔥 Dummy data (replace with backend later)
  const plans: WorkoutPlanType[] = [
    {
      goal: "muscle_gain",
      body_type: "mesomorph",
      active: true,
      exercises: [
        {
          name: "Bench Press",
          muscle_group: "chest",
          difficulty: "intermediate",
          sets: 4,
          reps: 8,
          rest_seconds: 90,
        },
        {
          name: "Incline Dumbbell Press",
          muscle_group: "chest",
          difficulty: "beginner",
          sets: 3,
          reps: 12,
          rest_seconds: 60,
        },
        {
          name: "Squat",
          muscle_group: "legs",
          difficulty: "advanced",
          sets: 5,
          reps: 5,
          rest_seconds: 120,
        },
      ],
    },
  ];

  const activePlan = plans.find((p) => p.active);

  if (loading) {
    return <p>Loading workout plan...</p>;
  }

  if (!activePlan) {
    return (
      <div style={{ textAlign: "center", paddingTop: "40px" }}>
        <h2>No Active Plan</h2>
        <p>Create a workout plan to get started</p>
        <a href="/profile">Create Plan</a>
      </div>
    );
  }

  // Group exercises by muscle group
  const grouped: Record<string, Exercise[]> = {};

  activePlan.exercises.forEach((ex) => {
    if (!grouped[ex.muscle_group]) {
      grouped[ex.muscle_group] = [];
    }
    grouped[ex.muscle_group].push(ex);
  });

  return (
    <div style={{ maxWidth: "700px", margin: "auto", paddingTop: "40px" }}>
      <h1>Your Workout Plan</h1>

      <p>
        Goal: <strong>{activePlan.goal}</strong> | Body Type:{" "}
        <strong>{activePlan.body_type}</strong>
      </p>

      <br />

      {Object.entries(grouped).map(([group, exercises]) => (
        <div key={group} style={{ marginBottom: "30px" }}>
          <h2 style={{ textTransform: "capitalize" }}>{group}</h2>

          {exercises.map((ex, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>{ex.name}</h3>

              <p>Difficulty: {ex.difficulty}</p>

              <p>
                Sets: {ex.sets} | Reps: {ex.reps} | Rest:{" "}
                {ex.rest_seconds}s
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}