import { QueryClient } from '@tanstack/react-query';

// Create and export the query client with sensible defaults
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered stale after 5 minutes
      staleTime: 1000 * 60 * 5,
      // Retry failed requests once
      retry: 1,
      // Only refetch on window focus in production
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
    },
    mutations: {
      retry: 1,
    },
  },
});
