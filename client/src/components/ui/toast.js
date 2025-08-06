import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";
function cn(...inputs) {
    return inputs.filter(Boolean).join(" ");
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (_jsx(ToastPrimitives.Viewport, { ref: ref, className: cn("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className), ...props })));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = (variant = "default") => [
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
    variant === "default" && "border bg-background text-foreground",
    variant === "destructive" && "destructive group border-destructive bg-destructive text-destructive-foreground",
]
    .filter(Boolean)
    .join(" ");
const Toast = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
    return (_jsx(ToastPrimitives.Root, { ref: ref, className: cn(toastVariants(variant), className), ...props }));
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => (_jsx(ToastPrimitives.Action, { ref: ref, className: cn("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", className), ...props })));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => (_jsx(ToastPrimitives.Close, { ref: ref, className: cn("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", className), "toast-close": "", ...props, children: _jsx(X, { className: "h-4 w-4" }) })));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx(ToastPrimitives.Title, { ref: ref, className: cn("text-sm font-semibold", className), ...props })));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx(ToastPrimitives.Description, { ref: ref, className: cn("text-sm opacity-90", className), ...props })));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction, };
