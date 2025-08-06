import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wind, Activity, Calculator } from "lucide-react";
export default function MinuteVentilationCalculator({ open, onOpenChange }) {
    const [tidalVolume, setTidalVolume] = useState("");
    const [respiratoryRate, setRespiratoryRate] = useState("");
    const [patientWeight, setPatientWeight] = useState("");
    const [result, setResult] = useState(null);
    const calculateMinuteVentilation = () => {
        const tv = parseFloat(tidalVolume);
        const rr = parseFloat(respiratoryRate);
        const weight = parseFloat(patientWeight);
        if (isNaN(tv) || isNaN(rr) || tv <= 0 || rr <= 0) {
            alert("Please enter valid tidal volume and respiratory rate values");
            return;
        }
        const minuteVentilation = (tv * rr) / 1000; // Convert to L/min
        let normalizedMV = 0;
        let interpretation = "";
        let category = "normal";
        let recommendations = [];
        if (!isNaN(weight) && weight > 0) {
            normalizedMV = minuteVentilation / weight;
            if (normalizedMV < 0.06) {
                interpretation = "Low minute ventilation - Hypoventilation";
                category = "low";
                recommendations = [
                    "Assess for respiratory depression",
                    "Consider assisted ventilation",
                    "Check airway patency",
                    "Monitor oxygen saturation",
                    "Evaluate for narcotic overdose"
                ];
            }
            else if (normalizedMV >= 0.06 && normalizedMV <= 0.15) {
                interpretation = "Normal minute ventilation";
                category = "normal";
                recommendations = [
                    "Continue current monitoring",
                    "Maintain spontaneous breathing",
                    "Regular assessment of work of breathing",
                    "Monitor for changes"
                ];
            }
            else {
                interpretation = "High minute ventilation - Hyperventilation";
                category = "high";
                recommendations = [
                    "Assess for anxiety/pain",
                    "Consider metabolic acidosis",
                    "Evaluate for hypoxemia",
                    "Monitor for respiratory fatigue",
                    "Consider sedation if appropriate"
                ];
            }
        }
        else {
            // Without weight, use absolute values
            if (minuteVentilation < 4) {
                interpretation = "Low minute ventilation - Hypoventilation";
                category = "low";
            }
            else if (minuteVentilation >= 4 && minuteVentilation <= 10) {
                interpretation = "Normal minute ventilation";
                category = "normal";
            }
            else {
                interpretation = "High minute ventilation - Hyperventilation";
                category = "high";
            }
            recommendations = [
                "Consider patient weight for more accurate assessment",
                "Evaluate clinical context",
                "Monitor respiratory effort",
                "Assess for underlying causes"
            ];
        }
        setResult({
            minuteVentilation,
            normalizedMV,
            interpretation,
            category,
            recommendations
        });
    };
    const reset = () => {
        setTidalVolume("");
        setRespiratoryRate("");
        setPatientWeight("");
        setResult(null);
    };
    const getCategoryColor = (category) => {
        switch (category) {
            case "low": return "bg-red-500";
            case "normal": return "bg-green-500";
            case "high": return "bg-orange-500";
            default: return "bg-gray-500";
        }
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Wind, { className: "h-5 w-5" }), "Minute Ventilation Calculator"] }) }), _jsxs(Tabs, { defaultValue: "calculate", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsx(TabsTrigger, { value: "calculate", children: "Calculate" }), _jsx(TabsTrigger, { value: "reference", children: "Reference Values" })] }), _jsxs(TabsContent, { value: "calculate", className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "tidalVolume", children: "Tidal Volume (mL)" }), _jsx(Input, { id: "tidalVolume", type: "number", placeholder: "500", value: tidalVolume, onChange: (e) => setTidalVolume(e.target.value), min: "0", max: "3000" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "respiratoryRate", children: "Respiratory Rate (breaths/min)" }), _jsx(Input, { id: "respiratoryRate", type: "number", placeholder: "14", value: respiratoryRate, onChange: (e) => setRespiratoryRate(e.target.value), min: "0", max: "60" })] }), _jsxs("div", { className: "space-y-2 md:col-span-2", children: [_jsx(Label, { htmlFor: "patientWeight", children: "Patient Weight (kg) - Optional" }), _jsx(Input, { id: "patientWeight", type: "number", placeholder: "70", value: patientWeight, onChange: (e) => setPatientWeight(e.target.value), min: "0", max: "300" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: calculateMinuteVentilation, className: "flex-1", children: [_jsx(Calculator, { className: "h-4 w-4 mr-2" }), "Calculate Minute Ventilation"] }), _jsx(Button, { variant: "outline", onClick: reset, children: "Reset" })] }), result && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Activity, { className: "h-5 w-5" }), "Results"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-primary", children: [result.minuteVentilation.toFixed(1), " L/min"] }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Minute Ventilation" }), result.normalizedMV > 0 && (_jsxs("div", { className: "text-sm text-muted-foreground", children: [(result.normalizedMV * 1000).toFixed(0), " mL/kg/min"] }))] }), _jsxs("div", { className: "text-center", children: [_jsx(Badge, { className: getCategoryColor(result.category), children: result.category.toUpperCase() }), _jsx("div", { className: "text-sm mt-1", children: result.interpretation })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Clinical Recommendations:" }), _jsx("ul", { className: "space-y-1", children: result.recommendations.map((rec, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary", children: "\u2022" }), _jsx("span", { className: "text-sm", children: rec })] }, index))) })] })] })] }))] }), _jsx(TabsContent, { value: "reference", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Normal Reference Values" }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Adults:" }), _jsxs("ul", { className: "text-sm space-y-1", children: [_jsx("li", { children: "\u2022 Tidal Volume: 6-8 mL/kg (500-600 mL)" }), _jsx("li", { children: "\u2022 Respiratory Rate: 12-20 breaths/min" }), _jsx("li", { children: "\u2022 Minute Ventilation: 5-8 L/min" }), _jsx("li", { children: "\u2022 Normal: 60-150 mL/kg/min" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Pediatric:" }), _jsxs("ul", { className: "text-sm space-y-1", children: [_jsx("li", { children: "\u2022 Infant: 6-8 mL/kg TV" }), _jsx("li", { children: "\u2022 Child: 6-8 mL/kg TV" }), _jsx("li", { children: "\u2022 RR varies by age" }), _jsx("li", { children: "\u2022 Higher mL/kg/min than adults" })] })] })] }), _jsxs("div", { className: "mt-4", children: [_jsx("h4", { className: "font-semibold mb-2", children: "Formula:" }), _jsx("p", { className: "text-sm", children: "Minute Ventilation = Tidal Volume \u00D7 Respiratory Rate" })] })] })] }) })] })] }) }));
}
