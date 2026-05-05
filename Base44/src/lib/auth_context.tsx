"use client"

import * as React from "react"
import { createContext, useState, useContext, useEffect, useCallback } from 'react'
import { base44 } from '@/api/base44Client'
import { appParams } from '@/lib/app-params'
import { createAxiosClient } from '@base44/sdk/dist/utils/axios-client'

interface AuthError {
  type: string
  message: string
}

interface AuthContextType {
  user: any | null
  isAuthenticated: boolean
  isLoadingAuth: boolean
  isLoadingPublicSettings: boolean
  authError: AuthError | null
  appPublicSettings: any
  authChecked: boolean
  logout: (shouldRedirect?: boolean) => void
  navigateToLogin: () => void
  checkUserAuth: () => Promise<void>
  checkAppState: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true)
  const [authError, setAuthError] = useState<AuthError | null>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [appPublicSettings, setAppPublicSettings] = useState(null)

  const checkUserAuth = useCallback(async () => {
    try {
      setIsLoadingAuth(true)
      const currentUser = await base44.auth.me()
      setUser(currentUser)
      setIsAuthenticated(true)
      setAuthError(null)
    } catch (error: any) {
      console.error('User auth check failed:', error)
      setIsAuthenticated(false)
      if (error.status === 401 || error.status === 403) {
        setAuthError({
          type: 'auth_required',
          message: 'Session expired or invalid'
        })
      }
    } finally {
      setIsLoadingAuth(false)
      setAuthChecked(true)
    }
  }, [])

  const checkAppState = useCallback(async () => {
    try {
      setIsLoadingPublicSettings(true)
      setAuthError(null)

      const appClient = createAxiosClient({
        baseURL: `/api/apps/public`,
        headers: { 'X-App-Id': appParams.appId },
        token: appParams.token,
        interceptResponses: true
      })

      try {
        const publicSettings = await appClient.get(`/prod/public-settings/by-id/${appParams.appId}`)
        setAppPublicSettings(publicSettings)

        if (appParams.token) {
          await checkUserAuth()
        } else {
          setIsLoadingAuth(false)
          setIsAuthenticated(false)
          setAuthChecked(true)
        }
      } catch (appError: any) {
        console.error('App state check failed:', appError)
        
        const reason = appError.data?.extra_data?.reason || 'unknown'
        setAuthError({
          type: reason,
          message: appError.message || 'Failed to load app configuration'
        })
      }
    } catch (error: any) {
      console.error('Unexpected error:', error)
      setAuthError({
        type: 'unexpected',
        message: error.message || 'An unexpected error occurred'
      })
    } finally {
      setIsLoadingPublicSettings(false)
    }
  }, [checkUserAuth])

  useEffect(() => {
    checkAppState()
  }, [checkAppState])

  const logout = (shouldRedirect = true) => {
    setUser(null)
    setIsAuthenticated(false)
    base44.auth.logout(shouldRedirect ? window.location.href : undefined)
  }

  const navigateToLogin = () => {
    base44.auth.redirectToLogin(window.location.href)
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth,
      checkAppState
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}