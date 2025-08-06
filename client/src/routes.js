import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import Calculators from "@/pages/calculators";
import Medications from "@/pages/medications";
import Protocols from "@/pages/protocols";
import About from "@/pages/about";
import Landing from "@/pages/landing";
import Learning from "@/pages/learning";
import Pro from "@/pages/pro";
import NotFound from "@/pages/not-found";
export default function AppRoutes() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Landing, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/calculators", element: _jsx(Calculators, {}) }), _jsx(Route, { path: "/medications", element: _jsx(Medications, {}) }), _jsx(Route, { path: "/protocols", element: _jsx(Protocols, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/learning", element: _jsx(Learning, {}) }), _jsx(Route, { path: "/pro", element: _jsx(Pro, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }));
}
