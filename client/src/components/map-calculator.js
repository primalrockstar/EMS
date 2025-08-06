import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Heart, Calculator } from "lucide-react";
export default function MAPCalculator({ open, onOpenChange }) {
    const [systolicBP, setSystolicBP] = useState("");
    const [diastolicBP, setDiastolicBP] = useState("");
    const [result, setResult] = useState(null);
    const calculateMAP = () => {
        const sbp = parseFloat(systolicBP);
        const dbp = parseFloat(diastolicBP);
        if (isNaN(sbp) || isNaN(dbp) || sbp <= 0 || dbp <= 0) {
            alert("Please enter valid systolic and diastolic blood pressure values");
            return;
        }
        if (sbp < dbp) {
            alert("Systolic pressure should be higher than diastolic pressure");
            return;
        }
        const map = dbp + ((sbp - dbp) / 3);
        let interpretation = "";
        let category = "normal";
        let recommendations = [];
        if (map < 60) {
            interpretation = "Hypotensive - Risk of organ hypoperfusion";
            category = "hypotensive";
            recommendations = [
                "Immediate intervention required",
                "Assess for shock causes",
                "Consider fluid resuscitation",
                "Monitor urine output",
                "Evaluate for vasopressor need"
            ];
        }
        else if (map >= 60 && map <= 100) {
            interpretation = "Normal - Adequate organ perfusion";
            category = "normal";
            recommendations = [
                "Continue current monitoring",
                "Maintain current treatment",
                "Regular vital sign assessment",
                "Monitor for changes"
            ];
        }
        else {
            interpretation = "Hypertensive - Elevated perfusion pressure";
            category = "hypertensive";
            recommendations = [
                "Assess for hypertensive emergency",
                "Monitor for end-organ damage",
                "Consider antihypertensive therapy",
                "Neurological assessment",
                "Cardiovascular evaluation"
            ];
        }
        setResult({
            map,
            interpretation,
            category,
            recommendations
        });
    };
    const reset = () => {
        setSystolicBP("");
        setDiastolicBP("");
        setResult(null);
    };
    const getCategoryColor = (category) => {
        switch (category) {
            case "hypotensive": return "bg-red-500";
            case "normal": return "bg-green-500";
            case "hypertensive": return "bg-orange-500";
            default: return "bg-gray-500";
        }
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Activity, { className: "h-5 w-5" }), "Mean Arterial Pressure (MAP) Calculator"] }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "systolicBP", children: "Systolic Blood Pressure (mmHg)" }), _jsx(Input, { id: "systolicBP", type: "number", placeholder: "116", value: systolicBP, onChange: (e) => setSystolicBP(e.target.value), min: "0", max: "300" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "diastolicBP", children: "Diastolic Blood Pressure (mmHg)" }), _jsx(Input, { id: "diastolicBP", type: "number", placeholder: "78", value: diastolicBP, onChange: (e) => setDiastolicBP(e.target.value), min: "0", max: "200" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: calculateMAP, className: "flex-1", children: [_jsx(Calculator, { className: "h-4 w-4 mr-2" }), "Calculate MAP"] }), _jsx(Button, { variant: "outline", onClick: reset, children: "Reset" })] }), result && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Heart, { className: "h-5 w-5" }), "Results"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-primary", children: [result.map.toFixed(0), " mmHg"] }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Mean Arterial Pressure" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Badge, { className: getCategoryColor(result.category), children: result.category.toUpperCase() }), _jsx("div", { className: "text-sm mt-1", children: result.interpretation })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Clinical Recommendations:" }), _jsx("ul", { className: "space-y-1", children: result.recommendations.map((rec, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary", children: "\u2022" }), _jsx("span", { className: "text-sm", children: rec })] }, index))) })] })] })] })), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Reference Information" }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold", children: "Formula:" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "MAP = Diastolic BP + (Systolic BP - Diastolic BP) \u00F7 3" })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold", children: "Normal Values:" }), _jsxs("ul", { className: "text-sm text-muted-foreground space-y-1", children: [_jsx("li", { children: "\u2022 <60 mmHg: Hypotensive" }), _jsx("li", { children: "\u2022 60-100 mmHg: Normal" }), _jsx("li", { children: "\u2022 >100 mmHg: Hypertensive" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold", children: "Clinical Significance:" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "MAP represents the average pressure in arteries during one cardiac cycle and is crucial for organ perfusion assessment." })] })] })] })] })] }) }));
}
