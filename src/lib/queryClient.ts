import { QueryClient } from '@tanstack/react-query';

// Minimal placeholder for apiRequest (from previous error)
export async function apiRequest<T = unknown>(url: string, options?: RequestInit): Promise<T> {
  throw new Error("apiRequest is not yet implemented");
}

export const queryClient = new QueryClient();
export default queryClient;
