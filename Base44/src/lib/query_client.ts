import { QueryClient } from '@tanstack/react-query';
import { toast } from "@/components/ui/use-toast";

export const queryClientInstance = new QueryClient({
  defaultOptions: {
    queries: {
      // Prevents re-fetching every time the user switches tabs 
      // (great for saving battery/data during a workout)
      refetchOnWindowFocus: false, 
      
      // Data is considered "fresh" for 1 minute
      staleTime: 1000 * 60, 
      
      // Only retry once to avoid long loading loops on poor gym Wi-Fi
      retry: 1,
    },
    mutations: {
      // Global error handler for saving data (e.g., logging a set)
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Action Failed",
          description: error.message || "Something went wrong. Please try again.",
        });
      },
    },
  },
});