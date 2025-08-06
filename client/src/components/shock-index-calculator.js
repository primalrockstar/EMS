import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Heart, Calculator } from "lucide-react";
export default function ShockIndexCalculator({ open, onOpenChange }) {
    const [heartRate, setHeartRate] = useState("");
    const [systolicBP, setSystolicBP] = useState("");
    const [result, setResult] = useState(null);
    const calculateShockIndex = () => {
        const hr = parseFloat(heartRate);
        const sbp = parseFloat(systolicBP);
        if (isNaN(hr) || isNaN(sbp) || hr <= 0 || sbp <= 0) {
            alert("Please enter valid heart rate and systolic blood pressure values");
            return;
        }
        const shockIndex = hr / sbp;
        let interpretation = "";
        let severity = "normal";
        let recommendations = [];
        if (shockIndex < 0.6) {
            interpretation = "Normal - No significant shock";
            severity = "normal";
            recommendations = [
                "Continue routine monitoring",
                "Maintain current treatment plan",
                "Reassess vital signs regularly"
            ];
        }
        else if (shockIndex >= 0.6 && shockIndex < 0.8) {
            interpretation = "Mild shock - Early compensated stage";
            severity = "mild";
            recommendations = [
                "Increase monitoring frequency",
                "Evaluate for underlying causes",
                "Consider fluid resuscitation",
                "Prepare for potential deterioration"
            ];
        }
        else if (shockIndex >= 0.8 && shockIndex < 1.0) {
            interpretation = "Moderate shock - Compensated stage";
            severity = "moderate";
            recommendations = [
                "Initiate aggressive fluid resuscitation",
                "Consider blood products if hemorrhagic",
                "Frequent vital sign monitoring",
                "Prepare for advanced interventions"
            ];
        }
        else {
            interpretation = "Severe shock - Decompensated stage";
            severity = "severe";
            recommendations = [
                "Immediate aggressive resuscitation",
                "Consider vasopressors",
                "Blood product administration",
                "Urgent surgical consultation if trauma",
                "Continuous monitoring required"
            ];
        }
        setResult({
            shockIndex,
            interpretation,
            severity,
            recommendations
        });
    };
    const reset = () => {
        setHeartRate("");
        setSystolicBP("");
        setResult(null);
    };
    const getSeverityColor = (severity) => {
        switch (severity) {
            case "normal": return "bg-green-500";
            case "mild": return "bg-yellow-500";
            case "moderate": return "bg-orange-500";
            case "severe": return "bg-red-500";
            default: return "bg-gray-500";
        }
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Heart, { className: "h-5 w-5" }), "Shock Index Calculator"] }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "heartRate", children: "Heart Rate (bpm)" }), _jsx(Input, { id: "heartRate", type: "number", placeholder: "72", value: heartRate, onChange: (e) => setHeartRate(e.target.value), min: "0", max: "300" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "systolicBP", children: "Systolic Blood Pressure (mmHg)" }), _jsx(Input, { id: "systolicBP", type: "number", placeholder: "116", value: systolicBP, onChange: (e) => setSystolicBP(e.target.value), min: "0", max: "300" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: calculateShockIndex, className: "flex-1", children: [_jsx(Calculator, { className: "h-4 w-4 mr-2" }), "Calculate Shock Index"] }), _jsx(Button, { variant: "outline", onClick: reset, children: "Reset" })] }), result && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-5 w-5" }), "Results"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-primary", children: result.shockIndex.toFixed(2) }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Shock Index" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Badge, { className: getSeverityColor(result.severity), children: result.severity.toUpperCase() }), _jsx("div", { className: "text-sm mt-1", children: result.interpretation })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Clinical Recommendations:" }), _jsx("ul", { className: "space-y-1", children: result.recommendations.map((rec, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary", children: "\u2022" }), _jsx("span", { className: "text-sm", children: rec })] }, index))) })] })] })] })), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Reference Information" }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold", children: "Formula:" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Shock Index = Heart Rate \u00F7 Systolic Blood Pressure" })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold", children: "Interpretation:" }), _jsxs("ul", { className: "text-sm text-muted-foreground space-y-1", children: [_jsx("li", { children: "\u2022 <0.6: Normal" }), _jsx("li", { children: "\u2022 0.6-0.8: Mild shock" }), _jsx("li", { children: "\u2022 0.8-1.0: Moderate shock" }), _jsx("li", { children: "\u2022 >1.0: Severe shock" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold", children: "Clinical Significance:" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Shock Index is a sensitive indicator of hemodynamic compromise, often elevated before traditional vital signs show abnormalities." })] })] })] })] })] }) }));
}
