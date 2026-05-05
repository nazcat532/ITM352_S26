import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

// Pages
import SignIn from "@/pages/signin"
import Register from "@/pages/register"
import ForgotPassword from "@/pages/forgot-password"
import ResetPassword from "@/pages/reset-password"
import Dashboard from "@/pages/dashboard"
import ProfileSetup from "@/pages/profile_setup"
import WorkoutPlan from "@/pages/workout_plan"
import LogWorkout from "@/pages/log_workout"
import ProgressCharts from "@/pages/progress_charts"

// Components
import ProtectedRoute from "@/components/Protected_route"
import Layout from "@/components/layout/Layout"

// Auth UI
import UserNotRegisteredError from "@/components/UserNotRegisteredError"

// Create a client for react-query
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/"
            element={
              <ProtectedRoute
                unauthenticatedElement={<SignIn />}
              />
            }
          >
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<ProfileSetup />} />
              <Route path="plan" element={<WorkoutPlan />} />
              <Route path="log" element={<LogWorkout />} />
              <Route path="progress" element={<ProgressCharts />} />
            </Route>
          </Route>

          {/* 404 FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}