import { useContext, createContext } from "react"

// Dummy implementation — replace with your own logic if needed
const ToastContext = createContext<{ toasts: any[] }>({ toasts: [] })

export function useToast() {
  return useContext(ToastContext)
}
