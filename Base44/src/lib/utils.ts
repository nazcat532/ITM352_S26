import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines tailwind classes and merges conflicting ones.
 * Example: cn("px-2 py-1", isActive && "bg-blue-500", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Check if the application is running inside an iframe.
 * Useful for conditionally hiding navigation or headers when 
 * embedded in another tool.
 */
export const isIframe = typeof window !== 'undefined' && window.self !== window.top;