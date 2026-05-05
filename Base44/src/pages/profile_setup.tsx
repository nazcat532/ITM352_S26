import { useState } from "react";

type Goal = "weight_loss" | "muscle_gain" | "endurance" | "flexibility" | "general_fitness";
type BodyType = "ectomorph" | "mesomorph" | "endomorph";

export default function ProfileSetup(): JSX.Element {
  const [step, setStep] = useState<number>(0);
  const [goal, setGoal] = useState<Goal | "">("");
  const [bodyType, setBodyType] = useState<BodyType | "">("");
  const [targets, setTargets] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const goals = [
    { value: "weight_loss", label: "Weight Loss" },
    { value: "muscle_gain", label: "Muscle Gain" },
    { value: "endurance", label: "Endurance" },
    { value: "flexibility", label: "Flexibility" },
    { value: "general_fitness", label: "General Fitness" },
  ];

  const bodyTypes = [
    { value: "ectomorph", label: "Ectomorph" },
    { value: "mesomorph", label: "Mesomorph" },
    { value: "endomorph", label: "Endomorph" },
  ];

  const muscleGroups = ["chest", "back", "shoulders", "legs", "arms", "core", "glutes"];

  const toggleTarget = (val: string) => {
    setTargets((prev) =>
      prev.includes(val) ? prev.filter((t) => t !== val) : [...prev, val]
    );
  };

  const generateWorkoutPlan = () => {
    // VERY simple logic (you can improve later)
    return targets.map((muscle) => ({
      muscle,
      exercise: `${muscle} exercise`,
      sets: 3,
      reps: goal === "muscle_gain" ? 8 : 12,
    }));
  };

  const handleGenerate = async () => {
    setLoading(true);

    const plan = {
      goal,
      bodyType,
      targets,
      exercises: generateWorkoutPlan(),
    };

    console.log("Generated plan:", plan);

    // Example backend call (optional later)
    /*
    await fetch("/api/workout-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plan),
    });
    */

    setLoading(false);
    alert("Workout plan generated! Check console.");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", paddingTop: "40px" }}>
      <h2>Profile Setup</h2>

      {/* Step 1 */}
      {step === 0 && (
        <>
          <h3>Select your goal:</h3>
          {goals.map((g) => (
            <div key={g.value}>
              <label>
                <input
                  type="radio"
                  value={g.value}
                  checked={goal === g.value}
                  onChange={() => setGoal(g.value as Goal)}
                />
                {g.label}
              </label>
            </div>
          ))}
        </>
      )}

      {/* Step 2 */}
      {step === 1 && (
        <>
          <h3>Select your body type:</h3>
          {bodyTypes.map((b) => (
            <div key={b.value}>
              <label>
                <input
                  type="radio"
                  value={b.value}
                  checked={bodyType === b.value}
                  onChange={() => setBodyType(b.value as BodyType)}
                />
                {b.label}
              </label>
            </div>
          ))}
        </>
      )}

      {/* Step 3 */}
      {step === 2 && (
        <>
          <h3>Select target muscles:</h3>
          {muscleGroups.map((m) => (
            <button
              key={m}
              onClick={() => toggleTarget(m)}
              style={{
                margin: "5px",
                padding: "8px",
                background: targets.includes(m) ? "lightgreen" : "white",
              }}
            >
              {m}
            </button>
          ))}
        </>
      )}

      <br />

      {/* Navigation */}
      <div>
        <button onClick={() => setStep(step - 1)} disabled={step === 0}>
          Back
        </button>

        {step < 2 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={
              (step === 0 && goal === "") ||
              (step === 1 && bodyType === "")
            }
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleGenerate}
            disabled={targets.length === 0 || loading}
          >
            {loading ? "Generating..." : "Generate Plan"}
          </button>
        )}
      </div>
    </div>
  );
}