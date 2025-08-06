import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Droplets, Calculator, Clock } from "lucide-react";
export default function ParklandFormulaCalculator({ open, onOpenChange }) {
    const [weight, setWeight] = useState("");
    const [burnPercentage, setBurnPercentage] = useState("");
    const [timeSinceBurn, setTimeSinceBurn] = useState("");
    const [result, setResult] = useState(null);
    const calculateParkland = () => {
        const wt = parseFloat(weight);
        const burnPct = parseFloat(burnPercentage);
        const timeSince = parseFloat(timeSinceBurn);
        if (isNaN(wt) || isNaN(burnPct) || wt <= 0 || burnPct <= 0 || burnPct > 100) {
            alert("Please enter valid weight and burn percentage values");
            return;
        }
        if (isNaN(timeSince) || timeSince < 0 || timeSince > 24) {
            alert("Please enter valid time since burn (0-24 hours)");
            return;
        }
        // Parkland Formula: 4 mL × weight (kg) × % burn
        const totalFluid = 4 * wt * burnPct;
        // First 8 hours gets 50% of total fluid
        const first8Hours = totalFluid * 0.5;
        // Second and third 8 hours get 25% each
        const second8Hours = totalFluid * 0.25;
        const third8Hours = totalFluid * 0.25;
        // Calculate hourly rate for first 8 hours
        const hourlyRate = first8Hours / 8;
        let recommendations = [
            "Use lactated Ringer's solution as primary fluid",
            "Monitor urine output (goal: 0.5-1 mL/kg/hr)",
            "Assess for compartment syndrome",
            "Consider escharotomy if circulation compromised",
            "Monitor for signs of fluid overload"
        ];
        if (burnPct >= 20) {
            recommendations.push("Consider transfer to burn center");
            recommendations.push("Aggressive fluid resuscitation required");
        }
        if (burnPct >= 50) {
            recommendations.push("High mortality risk - intensive care required");
            recommendations.push("Consider early intubation");
        }
        if (timeSince > 2) {
            recommendations.push("Delayed resuscitation - adjust fluid calculations");
            recommendations.push("Consider increased fluid requirements");
        }
        setResult({
            totalFluid,
            first8Hours,
            second8Hours,
            third8Hours,
            hourlyRate,
            recommendations
        });
    };
    const reset = () => {
        setWeight("");
        setBurnPercentage("");
        setTimeSinceBurn("");
        setResult(null);
    };
    const getBurnSeverity = (percentage) => {
        if (percentage < 10)
            return { severity: "Minor", color: "bg-yellow-500" };
        if (percentage < 20)
            return { severity: "Moderate", color: "bg-orange-500" };
        if (percentage < 50)
            return { severity: "Major", color: "bg-red-500" };
        return { severity: "Critical", color: "bg-red-700" };
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Flame, { className: "h-5 w-5" }), "Parkland Formula Calculator"] }) }), _jsxs(Tabs, { defaultValue: "calculate", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsx(TabsTrigger, { value: "calculate", children: "Calculate" }), _jsx(TabsTrigger, { value: "reference", children: "Reference" })] }), _jsxs(TabsContent, { value: "calculate", className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "weight", children: "Patient Weight (kg)" }), _jsx(Input, { id: "weight", type: "number", placeholder: "70", value: weight, onChange: (e) => setWeight(e.target.value), min: "0", max: "300" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "burnPercentage", children: "% Total Body Surface Area Burned" }), _jsx(Input, { id: "burnPercentage", type: "number", placeholder: "20", value: burnPercentage, onChange: (e) => setBurnPercentage(e.target.value), min: "0", max: "100" })] }), _jsxs("div", { className: "space-y-2 md:col-span-2", children: [_jsx(Label, { htmlFor: "timeSinceBurn", children: "Time Since Burn (hours)" }), _jsx(Input, { id: "timeSinceBurn", type: "number", placeholder: "2", value: timeSinceBurn, onChange: (e) => setTimeSinceBurn(e.target.value), min: "0", max: "24" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: calculateParkland, className: "flex-1", children: [_jsx(Calculator, { className: "h-4 w-4 mr-2" }), "Calculate Fluid Requirements"] }), _jsx(Button, { variant: "outline", onClick: reset, children: "Reset" })] }), result && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Droplets, { className: "h-5 w-5" }), "Fluid Resuscitation Plan"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-primary", children: [result.totalFluid.toFixed(0), " mL"] }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Total 24-hour fluid" })] }), _jsxs("div", { className: "text-center", children: [burnPercentage && (_jsx(Badge, { className: getBurnSeverity(parseFloat(burnPercentage)).color, children: getBurnSeverity(parseFloat(burnPercentage)).severity })), _jsx("div", { className: "text-sm mt-1", children: "Burn severity" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [_jsx(Clock, { className: "h-4 w-4" }), "First 8 Hours"] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-lg font-bold", children: [result.first8Hours.toFixed(0), " mL"] }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [result.hourlyRate.toFixed(0), " mL/hr"] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [_jsx(Clock, { className: "h-4 w-4" }), "Second 8 Hours"] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-lg font-bold", children: [result.second8Hours.toFixed(0), " mL"] }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [(result.second8Hours / 8).toFixed(0), " mL/hr"] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [_jsx(Clock, { className: "h-4 w-4" }), "Third 8 Hours"] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-lg font-bold", children: [result.third8Hours.toFixed(0), " mL"] }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [(result.third8Hours / 8).toFixed(0), " mL/hr"] })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Clinical Recommendations:" }), _jsx("ul", { className: "space-y-1", children: result.recommendations.map((rec, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary", children: "\u2022" }), _jsx("span", { className: "text-sm", children: rec })] }, index))) })] })] })] }))] }), _jsx(TabsContent, { value: "reference", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Parkland Formula Reference" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Formula:" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Total Fluid = 4 mL \u00D7 Weight (kg) \u00D7 % TBSA Burned" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "\u2022 First 8 hours: 50% of total fluid" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "\u2022 Second 8 hours: 25% of total fluid" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "\u2022 Third 8 hours: 25% of total fluid" })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Burn Severity:" }), _jsxs("ul", { className: "text-sm space-y-1", children: [_jsx("li", { children: "\u2022 Minor: <10% TBSA" }), _jsx("li", { children: "\u2022 Moderate: 10-20% TBSA" }), _jsx("li", { children: "\u2022 Major: 20-50% TBSA" }), _jsx("li", { children: "\u2022 Critical: >50% TBSA" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Monitoring:" }), _jsxs("ul", { className: "text-sm space-y-1", children: [_jsx("li", { children: "\u2022 Urine output: 0.5-1 mL/kg/hr" }), _jsx("li", { children: "\u2022 Use lactated Ringer's solution" }), _jsx("li", { children: "\u2022 Adjust based on patient response" }), _jsx("li", { children: "\u2022 Monitor for compartment syndrome" })] })] })] }) })] }) })] })] }) }));
}
