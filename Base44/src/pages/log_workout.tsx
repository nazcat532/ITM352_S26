import { useState, ChangeEvent } from "react";

type Exercise = {
  name: string;
  muscle_group: string;
};

export default function LogWorkout(): JSX.Element {
  const [selectedExercise, setSelectedExercise] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [setsCompleted, setSetsCompleted] = useState<string>("1");
  const [notes, setNotes] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);

  // Simple hardcoded exercises (replace later with backend)
  const exercises: Exercise[] = [
    { name: "Bench Press", muscle_group: "Chest" },
    { name: "Squat", muscle_group: "Legs" },
    { name: "Deadlift", muscle_group: "Back" },
  ];

  const handleSave = () => {
    const workoutData = {
      exercise_name: selectedExercise,
      weight: parseFloat(weight),
      reps: parseInt(reps),
      sets_completed: parseInt(setsCompleted),
      notes,
    };

    console.log("Saved workout:", workoutData);

    // Simulate saving
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
      setSelectedExercise("");
      setWeight("");
      setReps("");
      setSetsCompleted("1");
      setNotes("");
    }, 2000);
  };

  const isValid = selectedExercise && weight && reps;

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "40px" }}>
      <h2>Log Workout</h2>

      {saved ? (
        <p>✅ Workout saved!</p>
      ) : (
        <>
          <div>
            <label>Exercise:</label><br />
            <select
              value={selectedExercise}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSelectedExercise(e.target.value)
              }
            >
              <option value="">Select exercise</option>
              {exercises.map((ex) => (
                <option key={ex.name} value={ex.name}>
                  {ex.name} ({ex.muscle_group})
                </option>
              ))}
            </select>
          </div>

          <br />

          <div>
            <label>Weight:</label><br />
            <input
              type="number"
              value={weight}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWeight(e.target.value)
              }
            />
          </div>

          <br />

          <div>
            <label>Reps:</label><br />
            <input
              type="number"
              value={reps}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setReps(e.target.value)
              }
            />
          </div>

          <br />

          <div>
            <label>Sets:</label><br />
            <input
              type="number"
              value={setsCompleted}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSetsCompleted(e.target.value)
              }
            />
          </div>

          <br />

          <div>
            <label>Notes:</label><br />
            <textarea
              value={notes}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setNotes(e.target.value)
              }
            />
          </div>

          <br />

          <button onClick={handleSave} disabled={!isValid}>
            Save Workout
          </button>
        </>
      )}
    </div>
  );
}