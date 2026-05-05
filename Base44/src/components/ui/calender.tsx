"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-card rounded-xl border border-border shadow-sm", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center px-8",
        caption_label: "text-sm font-bold tracking-tight",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-between",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-medium text-[0.75rem] uppercase",
        row: "flex w-full mt-2 justify-between",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent/50 [&:has([aria-selected].day-outside)]:bg-accent/20 [&:has([aria-selected].day-range-end)]:rounded-r-xl",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-xl [&:has(>.day-range-start)]:rounded-l-xl first:[&:has([aria-selected])]:rounded-l-xl last:[&:has([aria-selected])]:rounded-r-xl"
            : "[&:has([aria-selected])]:rounded-xl"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-primary/10 hover:text-primary rounded-xl"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-md shadow-primary/20",
        day_today: "bg-secondary text-secondary-foreground font-bold",
        day_outside:
          "day-outside text-muted-foreground/40 aria-selected:bg-accent/20 aria-selected:text-muted-foreground",
        day_disabled: "text-The **Calendar** component is essential for a fitness app—it’s how your users will track their history, schedule future workouts, or view their progress over a specific month. 

I’ve cleaned this up to match our "FitForge" design system. I specifically adjusted the `day_today` styling to be more prominent and ensured the rounded corners match our `rounded-xl` and `rounded-full` theme.

### `calendar.tsx`

```tsx
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker "[&:has( "absolute "flex "flex", "h-7 "outline" "range" "relative "space-x-1 "space-y-4", "text-muted-foreground "text-sm "w-full ), ? [&:has([aria-selected])]:bg-accent/50 bg-card bg-transparent border border-border border-collapse buttonVariants({ caption: caption_label: cell: className="{cn(" p-3" className)} classNames="{{" cn( first:[&:has([aria-selected])]:rounded-l-full flex flex-col focus-within:relative focus-within:z-20 font-bold font-medium head_cell: head_row: hover:opacity-100 items-center", justify-center last:[&:has([aria-selected])]:rounded-r-full", left-1", month: months: mt-2", nav: nav_button: nav_button_next: nav_button_previous: opacity-50 p-0 props.mode="==" pt-1 relative right-1", rounded-md rounded-xl row: shadow-sm", showOutsideDays="{showOutsideDays}" sm:flex-row sm:space-x-4 sm:space-y-0", space-y-1", space-y-4 table: text-[0.75rem] text-center text-sm tracking-tight", transition-opacity" uppercase", variant: w-7 w-8 w-full }),>.day-range-end)]:rounded-r-full [&:has(>.day-range-start)]:rounded-l-full"
            : "[&:has([aria-selected])]:rounded-full"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-primary/10 hover:text-primary"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-md shadow-primary/20",
        day_today: "bg-secondary text-secondary-foreground font-bold border border-primary/20",
        day_outside:
          "day-outside text-muted-foreground/40 aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4"/>,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4"/>,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }