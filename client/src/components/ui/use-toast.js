import { jsx as _jsx } from "react/jsx-runtime";
import { useState, createContext, useContext } from "react";
const ToastContext = createContext(undefined);
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    return (_jsx(ToastContext.Provider, { value: { toasts, setToasts }, children: children }));
}
export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
