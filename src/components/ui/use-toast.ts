import { useState, createContext, useContext, ReactNode } from "react";

type ToastData = {
  id: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  [key: string]: any;
};

const ToastContext = createContext<{ toasts: ToastData[] }>({ toasts: [] });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts] = useState<ToastData[]>([
    {
      id: "1",
      title: "Hello!",
      description: "This is a toast message.",
    },
  ]);
  return (
    <ToastContext.Provider value={{ toasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
