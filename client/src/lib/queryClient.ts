import { QueryClient } from '@tanstack/react-query';

// Minimal placeholder to satisfy imports.
// You can implement this later as needed.
export async function apiRequest<T = unknown>(url: string, options?: RequestInit): Promise<T> {
  throw new Error("apiRequest is not yet implemented");
}

const queryClient = new QueryClient();

export default queryClient;
