import React, { useState, createContext, useContext, ReactNode } from "react";

type ToastData = {
  id: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  [key: string]: any;
};

interface ToastContextValue {
  toasts: ToastData[];
  setToasts: React.Dispatch<React.SetStateAction<ToastData[]>>;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
