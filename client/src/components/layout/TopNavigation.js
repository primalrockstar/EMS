import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
export default function BottomNavigation() {
    return (_jsxs("nav", { className: "fixed bottom-0 inset-x-0 bg-background border-t flex justify-around items-center h-16 z-10", children: [_jsx(Link, { to: "/", className: "py-2 px-4", children: "Home" }), _jsx(Link, { to: "/dashboard", className: "py-2 px-4", children: "Dashboard" }), _jsx(Link, { to: "/calculators", className: "py-2 px-4", children: "Calculators" }), _jsx(Link, { to: "/medications", className: "py-2 px-4", children: "Medications" }), _jsx(Link, { to: "/protocols", className: "py-2 px-4", children: "Protocols" }), _jsx(Link, { to: "/pro", className: "py-2 px-4", children: "Pro" })] }));
}
