"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { base44 } from "@/api/base44Client"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Dumbbell, 
  Target, 
  TrendingUp, 
  Calendar, 
  ArrowRight, 
  Flame, 
  Zap,
  Activity
} from "lucide-react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function Dashboard() {
  // Fetch workout plans - limited to most recent 5
  const { data: plans = [], isLoading: isLoadingPlans } = useQuery({
    queryKey: ["workout-plans"],
    queryFn: () => base44.entities.WorkoutPlan.list("-created_date", 5),
  })

  // Fetch progress logs - larger sample for volume calculation
  const { data: logs = [], isLoading: isLoadingLogs } = useQuery({
    queryKey: ["progress-logs"],
    queryFn: () => base44.entities.ProgressLog.list("-created_date", 50),
  })

  // Derived Stats
  const activePlan = plans.find((p: any) => p.active)
  const totalWorkouts = logs.length
  
  // Volume calculation: weight * reps * sets (if available)
  const totalVolume = logs.reduce((sum: number, l: any) => {
    const weight = Number(l.weight) || 0
    const reps = Number(l.reps) || 0
    const sets = Number(l.sets_completed) || 1
    return sum + (weight * reps * sets)
  }, 0)

  const uniqueExercises = new Set(logs.map((l: any) => l.exercise_name)).size
  const recentLogs = logs.slice(0, 5)

  if (isLoadingPlans || isLoadingLogs) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Activity className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 p-1">
      {/* Header */}
      <motion.div {...fadeUp} transition={{ duration: 0.4 }}>
        <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-lg">Your progress at a glance.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Workouts", value: totalWorkouts, icon: Dumbbell, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Vol (lbs)", value: `${(totalVolume / 1000).toFixed(1)}k`, icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
          { label: "Exercises", value: uniqueExercises, icon: Target, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Goal", value: activePlan ? "Active" : "None", icon: Zap, color: "text-purple-500", bg: "bg-purple-500/10" },
        ].map((stat, i) => (
          <motion.div key={stat.label} {...fadeUp} transition={{ delay: 0.05 * (i + 1) }}>
            <Card className="border-none shadow-sm bg-card hover:shadow-md transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1 tabular-nums">{stat.value}</p>
                  </div>
                  <div className={cn("p-2 rounded-xl", stat.bg)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Plan Card */}
        <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
          <Card className="h-full rounded-2xl border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-bold">Training Plan</CardTitle>
              <Link to="/plan">
                <Button variant="ghost" size="sm" className="h-8 text-primary hover:text-primary hover:bg-primary/10">
                  Manage <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {activePlan ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <div className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-bold uppercase">
                      {activePlan.goal?.replace("_", " ")}
                    </div>
                    <div className="px-2.5 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[11px] font-bold uppercase">
                      {activePlan.body_type}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Focusing on <span className="font-medium text-foreground">{activePlan.target_areas?.join(", ")}</span>.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {activePlan.exercises?.slice(0, 4).map((ex: any) => (
                      <div key={ex.name} className="flex flex-col p-3 rounded-xl bg-muted/40 border border-border/50">
                        <span className="text-sm font-semibold truncate">{ex.name}</span>
                        <span className="text-xs text-muted-foreground">{ex.sets} sets • {ex.reps} reps</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground max-w-[200px] mb-4">You haven't set an active training goal yet.</p>
                  <Link to="/profile">
                    <Button size="sm" className="rounded-xl px-6">Generate Plan</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div {...fadeUp} transition={{ delay: 0.25 }}>
          <Card className="h-full rounded-2xl border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-bold">Activity Log</CardTitle>
              <Link to="/progress">
                <Button variant="ghost" size="sm" className="h-8 text-primary hover:text-primary hover:bg-primary/10">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentLogs.length > 0 ? (
                <div className="space-y-1">
                  {recentLogs.map((log: any) => (
                    <div key={log.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">{log.exercise_name}</p>
                        <div className="flex items-center text-[11px] text-muted-foreground uppercase font-medium">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(new Date(log.created_date), "MMM d")}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">{log.weight} lbs</p>
                        <p className="text-[11px] text-muted-foreground font-medium">{log.reps} reps</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Dumbbell className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground max-w-[200px] mb-4">No workout data found in your history.</p>
                  <Link to="/log">
                    <Button size="sm" className="rounded-xl px-6">Log Session</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}