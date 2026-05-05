"use client"

import * as React from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, AlertCircle } from "lucide-react"
import { useAuth } from '@/lib/AuthContext'
import { Button } from "@/components/ui/button"

export default function PageNotFound() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, isAuthenticated, authChecked } = useAuth()
    
    // Clean up the path name for display
    const pageName = location.pathname.substring(1) || "home"

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
            <div className="max-w-md w-full">
                <div className="text-center space-y-8">
                    {/* Visual 404 Header */}
                    <div className="relative">
                        <h1 className="text-9xl font-bold text-muted/30 select-none">404</h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="text-2xl font-semibold text-foreground tracking-tight bg-background px-4">
                                Page Not Found
                            </h2>
                        </div>
                    </div>
                    
                    {/* Contextual Message */}
                    <div className="space-y-3">
                        <p className="text-muted-foreground leading-relaxed">
                            The route <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                /{pageName}
                            </code> could not be located in the application.
                        </p>
                    </div>
                    
                    {/* Admin/Developer Insight */}
                    {authChecked && isAuthenticated && user?.role === 'admin' && (
                        <div className="mt-8 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-100 dark:border-orange-900/50">
                            <div className="flex items-start space-x-3 text-left">
                                <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-500 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-orange-900 dark:text-orange-400">
                                        Developer Note
                                    </p>
                                    <p className="text-sm text-orange-800/80 dark:text-orange-400/80 leading-relaxed">
                                        This route is defined in the browser but has no component mapped to it. 
                                        Ensure the route is registered in your <code className="text-xs">App.tsx</code>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Primary Action */}
                    <div className="pt-4">
                        <Button 
                            variant="outline" 
                            size="lg"
                            className="rounded-xl gap-2 shadow-sm"
                            onClick={() => navigate('/')}
                        >
                            <Home className="h-4 w-4" />
                            Return Home
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}