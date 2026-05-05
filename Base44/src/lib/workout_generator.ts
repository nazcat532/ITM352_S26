/**
 * Types and interfaces for the Workout Engine
 */

export type MuscleGroup = "chest" | "back" | "shoulders" | "legs" | "arms" | "core" | "glutes";
export type FitnessGoal = "weight_loss" | "muscle_gain" | "endurance" | "flexibility" | "general_fitness";
export type BodyType = "ectomorph" | "mesomorph" | "endomorph";
export type Difficulty = "beginner" | "intermediate" | "advanced";

interface Exercise {
  name: string;
  difficulty: Difficulty;
}

interface GeneratedExercise {
  name: string;
  sets: number;
  reps: string;
  rest_seconds: number;
  muscle_group: MuscleGroup;
  difficulty: Difficulty;
}

const exerciseDatabase: Record<MuscleGroup, Exercise[]> = {
  chest: [
    { name: "Bench Press", difficulty: "intermediate" },
    { name: "Incline Dumbbell Press", difficulty: "intermediate" },
    { name: "Push-Ups", difficulty: "beginner" },
    { name: "Cable Flyes", difficulty: "intermediate" },
    { name: "Dips (Chest)", difficulty: "advanced" },
    { name: "Dumbbell Pullover", difficulty: "intermediate" },
  ],
  back: [
    { name: "Deadlift", difficulty: "advanced" },
    { name: "Bent-Over Row", difficulty: "intermediate" },
    { name: "Pull-Ups", difficulty: "intermediate" },
    { name: "Lat Pulldown", difficulty: "beginner" },
    { name: "Seated Cable Row", difficulty: "beginner" },
    { name: "T-Bar Row", difficulty: "intermediate" },
  ],
  shoulders: [
    { name: "Overhead Press", difficulty: "intermediate" },
    { name: "Lateral Raises", difficulty: "beginner" },
    { name: "Front Raises", difficulty: "beginner" },
    { name: "Face Pulls", difficulty: "beginner" },
    { name: "Arnold Press", difficulty: "intermediate" },
    { name: "Reverse Flyes", difficulty: "beginner" },
  ],
  legs: [
    { name: "Barbell Squat", difficulty: "intermediate" },
    { name: "Leg Press", difficulty: "beginner" },
    { name: "Romanian Deadlift", difficulty: "intermediate" },
    { name: "Leg Curl", difficulty: "beginner" },
    { name: "Leg Extension", difficulty: "beginner" },
    { name: "Bulgarian Split Squat", difficulty: "advanced" },
    { name: "Calf Raises", difficulty: "beginner" },
  ],
  arms: [
    { name: "Barbell Curl", difficulty: "beginner" },
    { name: "Tricep Pushdown", difficulty: "beginner" },
    { name: "Hammer Curl", difficulty: "beginner" },
    { name: "Skull Crushers", difficulty: "intermediate" },
    { name: "Concentration Curl", difficulty: "beginner" },
    { name: "Overhead Tricep Extension", difficulty: "beginner" },
  ],
  core: [
    { name: "Plank", difficulty: "beginner" },
    { name: "Russian Twist", difficulty: "beginner" },
    { name: "Hanging Leg Raise", difficulty: "intermediate" },
    { name: "Cable Crunch", difficulty: "beginner" },
    { name: "Ab Wheel Rollout", difficulty: "advanced" },
    { name: "Mountain Climbers", difficulty: "beginner" },
  ],
  glutes: [
    { name: "Hip Thrust", difficulty: "intermediate" },
    { name: "Glute Bridge", difficulty: "beginner" },
    { name: "Cable Kickback", difficulty: "beginner" },
    { name: "Sumo Deadlift", difficulty: "intermediate" },
    { name: "Step-Ups", difficulty: "beginner" },
  ],
};

const goalConfig = {
  weight_loss: { setsRange: [3, 4], repsRange: [12, 20], restSeconds: 30, exercisesPerGroup: 3 },
  muscle_gain: { setsRange: [4, 5], repsRange: [6, 12], restSeconds: 90, exercisesPerGroup: 4 },
  endurance: { setsRange: [3, 4], repsRange: [15, 25], restSeconds: 20, exercisesPerGroup: 3 },
  flexibility: { setsRange: [2, 3], repsRange: [10, 15], restSeconds: 45, exercisesPerGroup: 2 },
  general_fitness: { setsRange: [3, 4], repsRange: [10, 15], restSeconds: 60, exercisesPerGroup: 3 },
};

const bodyTypeModifier = {
  ectomorph: { setsBonus: 1, repsAdjust: -2, restBonus: 30 },
  mesomorph: { setsBonus: 0, repsAdjust: 0, restBonus: 0 },
  endomorph: { setsBonus: 0, repsAdjust: 3, restBonus: -10 },
};

function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generates a customized workout plan based on user constraints.
 */
export function generateWorkoutPlan(
  goal: FitnessGoal,
  bodyType: BodyType,
  targetAreas: MuscleGroup[]
): GeneratedExercise[] {
  const config = goalConfig[goal];
  const modifier = bodyTypeModifier[bodyType];
  const exercises: GeneratedExercise[] = [];

  for (const area of targetAreas) {
    const areaExercises = exerciseDatabase[area] || [];
    const shuffled = shuffleArray(areaExercises);
    const count = Math.min(config.exercisesPerGroup, shuffled.length);

    for (let i = 0; i < count; i++) {
      const ex = shuffled[i];
      const sets = Math.min(randomInRange(config.setsRange[0], config.setsRange[1]) + modifier.setsBonus, 6);
      
      const minReps = Math.max(config.repsRange[0] + modifier.repsAdjust, 4);
      const maxReps = Math.max(config.repsRange[1] + modifier.repsAdjust, minReps + 2);
      
      const rest = Math.max(config.restSeconds + modifier.restBonus, 15);

      exercises.push({
        name: ex.name,
        sets,
        reps: `${minReps}-${maxReps}`,
        rest_seconds: rest,
        muscle_group: area,
        difficulty: ex.difficulty,
      });
    }
  }

  return exercises;
}