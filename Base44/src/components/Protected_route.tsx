"use client"

import * as React from "react"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useAuth } from "@/lib/AuthContext"
import UserNotRegisteredError from "@/components/UserNotRegisteredError"

interface ProtectedRouteProps {
  /** Element shown while auth is being verified */
  fallback?: React.ReactNode
  /** Element shown if the user is not logged in */
  unauthenticatedElement: React.ReactNode
}

const DefaultFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
  </div>
)

export default function ProtectedRoute({ 
  fallback = <DefaultFallback />, 
  unauthenticatedElement 
}: ProtectedRouteProps) {
  const { 
    isAuthenticated, 
    isLoadingAuth, 
    authChecked, 
    authError, 
    checkUserAuth 
  } = useAuth()

  useEffect(() => {
    // Only trigger the check if we haven't checked yet and aren't currently loading.
    if (!authChecked && !isLoadingAuth) {
      checkUserAuth()
    }
  }, [authChecked, isLoadingAuth, checkUserAuth])

  // 1. Initial Loading State
  if (isLoadingAuth || !authChecked) {
    return <>{fallback}</>
  }

  // 2. Specific Error Handling (e.g., Database record missing)
  if (authError) {
    if (authError.type === "user_not_registered") {
      return <UserNotRegisteredError />
    }
    return <>{unauthenticatedElement}</>
  }

  // 3. Simple Authentication Check
  if (!isAuthenticated) {
    return <>{unauthenticatedElement}</>
  }

  // 4. Success: Render Nested Routes
  return <Outlet />
}