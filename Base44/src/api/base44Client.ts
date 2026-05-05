/**
 * Base44 API Client
 * Handles all communication with the Flask backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface WorkoutPlan {
  id: string | number;
  name: string;
  exercises: Exercise[];
  created_at?: string;
  updated_at?: string;
}

export interface Exercise {
  name: string;
  weight: number;
  reps: number;
  sets?: number;
}

export interface ProgressLog {
  exercise_name: string;
  weight: number;
  reps: number;
  sets_completed?: number;
  workout_plan_id?: string;
  notes?: string;
}

class Base44API {
  private baseURL: string = API_BASE_URL;

  /**
   * Health check
   */
  async health() {
    const response = await fetch(`${this.baseURL}/health`);
    if (!response.ok) throw new Error("Health check failed");
    return response.json();
  }

  /**
   * Workout Plans
   */
  async getWorkoutPlans(): Promise<WorkoutPlan[]> {
    const response = await fetch(`${this.baseURL}/workout-plans`);
    if (!response.ok) throw new Error("Failed to fetch workout plans");
    return response.json();
  }

  async getWorkoutPlan(id: string | number): Promise<WorkoutPlan> {
    const response = await fetch(`${this.baseURL}/workout-plans/${id}`);
    if (!response.ok) throw new Error("Failed to fetch workout plan");
    return response.json();
  }

  async createWorkoutPlan(plan: Omit<WorkoutPlan, "id">): Promise<WorkoutPlan> {
    const response = await fetch(`${this.baseURL}/workout-plans`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plan),
    });
    if (!response.ok) throw new Error("Failed to create workout plan");
    return response.json();
  }

  async updateWorkoutPlan(id: string | number, plan: Partial<WorkoutPlan>): Promise<WorkoutPlan> {
    const response = await fetch(`${this.baseURL}/workout-plans/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plan),
    });
    if (!response.ok) throw new Error("Failed to update workout plan");
    return response.json();
  }

  async deleteWorkoutPlan(id: string | number): Promise<void> {
    const response = await fetch(`${this.baseURL}/workout-plans/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete workout plan");
  }

  /**
   * Progress Logs
   */
  async logProgress(log: ProgressLog) {
    const response = await fetch(`${this.baseURL}/progress-logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log),
    });
    if (!response.ok) throw new Error("Failed to log progress");
    return response.json();
  }
}

export const base44 = new Base44API();
