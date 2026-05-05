import { useState } from "react";

type Log = {
  exercise_name: string;
  weight: number;
  reps: number;
  sets_completed: number;
  created_date: string;
};

export default function ProgressCharts(): JSX.Element {
  const [selectedExercise, setSelectedExercise] = useState<string>("all");

  // 🔥 Dummy data (replace later with backend)
  const logs: Log[] = [
    {
      exercise_name: "Bench Press",
      weight: 135,
      reps: 10,
      sets_completed: 3,
      created_date: "2026-05-01",
    },
    {
      exercise_name: "Bench Press",
      weight: 155,
      reps: 8,
      sets_completed: 3,
      created_date: "2026-05-03",
    },
    {
      exercise_name: "Squat",
      weight: 185,
      reps: 8,
      sets_completed: 3,
      created_date: "2026-05-02",
    },
  ];

  const uniqueExercises = [...new Set(logs.map((l) => l.exercise_name))];

  const filteredLogs =
    selectedExercise === "all"
      ? logs
      : logs.filter((l) => l.exercise_name === selectedExercise);

  const totalVolume = filteredLogs.reduce(
    (sum, l) => sum + l.weight * l.reps * l.sets_completed,
    0
  );

  const maxWeight =
    filteredLogs.length > 0
      ? Math.max(...filteredLogs.map((l) => l.weight))
      : 0;

  const avgReps =
    filteredLogs.length > 0
      ? Math.round(
          filteredLogs.reduce((sum, l) => sum + l.reps, 0) /
            filteredLogs.length
        )
      : 0;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", paddingTop: "40px" }}>
      <h2>Progress</h2>

      {/* Filter */}
      <div>
        <label>Select Exercise: </label>
        <select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
        >
          <option value="all">All</option>
          {uniqueExercises.map((ex) => (
            <option key={ex} value={ex}>
              {ex}
            </option>
          ))}
        </select>
      </div>

      <br />

      {/* Summary */}
      <div>
        <p><strong>Total Volume:</strong> {totalVolume}</p>
        <p><strong>Max Weight:</strong> {maxWeight} lbs</p>
        <p><strong>Avg Reps:</strong> {avgReps}</p>
      </div>

      <br />

      {/* Logs list (replacement for charts) */}
      <h3>Workout History</h3>
      {filteredLogs.length === 0 ? (
        <p>No data yet. Log workouts first.</p>
      ) : (
        <ul>
          {filteredLogs.map((log, index) => (
            <li key={index}>
              {log.created_date} — {log.exercise_name} — {log.weight} lbs × {log.reps} reps × {log.sets_completed} sets
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}