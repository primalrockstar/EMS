import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Calculator, AlertTriangle } from "lucide-react";
export default function AnionGapCalculator({ open, onOpenChange }) {
    const [sodium, setSodium] = useState("");
    const [chloride, setChloride] = useState("");
    const [bicarbonate, setBicarbonate] = useState("");
    const [albumin, setAlbumin] = useState("");
    const [result, setResult] = useState(null);
    const calculateAnionGap = () => {
        const na = parseFloat(sodium);
        const cl = parseFloat(chloride);
        const hco3 = parseFloat(bicarbonate);
        const alb = parseFloat(albumin);
        if (isNaN(na) || isNaN(cl) || isNaN(hco3) || na <= 0 || cl <= 0 || hco3 <= 0) {
            alert("Please enter valid sodium, chloride, and bicarbonate values");
            return;
        }
        const anionGap = na - (cl + hco3);
        let correctedGap = anionGap;
        // Albumin correction if provided
        if (!isNaN(alb) && alb > 0) {
            const normalAlbumin = 4.0; // g/dL
            correctedGap = anionGap + (2.5 * (normalAlbumin - alb));
        }
        let interpretation = "";
        let category = "normal";
        let possibleCauses = [];
        let recommendations = [];
        if (correctedGap < 8) {
            interpretation = "Low anion gap - Unusual finding";
            category = "low";
            possibleCauses = [
                "Hypoalbuminemia",
                "Multiple myeloma",
                "Lithium toxicity",
                "Magnesium toxicity",
                "Laboratory error"
            ];
            recommendations = [
                "Verify laboratory values",
                "Check protein levels",
                "Assess medication history",
                "Consider repeat testing"
            ];
        }
        else if (correctedGap >= 8 && correctedGap <= 12) {
            interpretation = "Normal anion gap";
            category = "normal";
            possibleCauses = [
                "Normal acid-base balance",
                "Non-anion gap metabolic acidosis (if acidotic)"
            ];
            recommendations = [
                "Continue routine monitoring",
                "Assess overall acid-base status",
                "Monitor for changes"
            ];
        }
        else {
            interpretation = "High anion gap - Metabolic acidosis likely";
            category = "high";
            possibleCauses = [
                "Diabetic ketoacidosis (DKA)",
                "Lactic acidosis",
                "Renal failure",
                "Salicylate poisoning",
                "Methanol/ethylene glycol poisoning",
                "Starvation ketosis"
            ];
            recommendations = [
                "Assess for diabetic ketoacidosis",
                "Check blood glucose and ketones",
                "Evaluate for shock/hypoperfusion",
                "Consider toxic ingestion",
                "Monitor renal function",
                "Urgent medical evaluation needed"
            ];
        }
        setResult({
            anionGap,
            correctedGap,
            interpretation,
            category,
            possibleCauses,
            recommendations
        });
    };
    const reset = () => {
        setSodium("");
        setChloride("");
        setBicarbonate("");
        setAlbumin("");
        setResult(null);
    };
    const getCategoryColor = (category) => {
        switch (category) {
            case "low": return "bg-blue-500";
            case "normal": return "bg-green-500";
            case "high": return "bg-red-500";
            default: return "bg-gray-500";
        }
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Droplets, { className: "h-5 w-5" }), "Anion Gap Calculator"] }) }), _jsxs(Tabs, { defaultValue: "calculate", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsx(TabsTrigger, { value: "calculate", children: "Calculate" }), _jsx(TabsTrigger, { value: "reference", children: "Reference" })] }), _jsxs(TabsContent, { value: "calculate", className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "sodium", children: "Sodium (mEq/L)" }), _jsx(Input, { id: "sodium", type: "number", placeholder: "140", value: sodium, onChange: (e) => setSodium(e.target.value), min: "0", max: "200" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "chloride", children: "Chloride (mEq/L)" }), _jsx(Input, { id: "chloride", type: "number", placeholder: "100", value: chloride, onChange: (e) => setChloride(e.target.value), min: "0", max: "150" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "bicarbonate", children: "Bicarbonate (mEq/L)" }), _jsx(Input, { id: "bicarbonate", type: "number", placeholder: "24", value: bicarbonate, onChange: (e) => setBicarbonate(e.target.value), min: "0", max: "50" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "albumin", children: "Albumin (g/dL) - Optional" }), _jsx(Input, { id: "albumin", type: "number", placeholder: "4.0", value: albumin, onChange: (e) => setAlbumin(e.target.value), min: "0", max: "6", step: "0.1" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: calculateAnionGap, className: "flex-1", children: [_jsx(Calculator, { className: "h-4 w-4 mr-2" }), "Calculate Anion Gap"] }), _jsx(Button, { variant: "outline", onClick: reset, children: "Reset" })] }), result && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-5 w-5" }), "Results"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-primary", children: [result.anionGap.toFixed(1), " mEq/L"] }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Anion Gap" }), result.correctedGap !== result.anionGap && (_jsxs("div", { className: "text-sm text-muted-foreground", children: ["Corrected: ", result.correctedGap.toFixed(1), " mEq/L"] }))] }), _jsxs("div", { className: "text-center", children: [_jsx(Badge, { className: getCategoryColor(result.category), children: result.category.toUpperCase() }), _jsx("div", { className: "text-sm mt-1", children: result.interpretation })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Possible Causes:" }), _jsx("ul", { className: "space-y-1", children: result.possibleCauses.map((cause, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary", children: "\u2022" }), _jsx("span", { className: "text-sm", children: cause })] }, index))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Recommendations:" }), _jsx("ul", { className: "space-y-1", children: result.recommendations.map((rec, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary", children: "\u2022" }), _jsx("span", { className: "text-sm", children: rec })] }, index))) })] })] })] })] }))] }), _jsx(TabsContent, { value: "reference", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Anion Gap Reference" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Formula:" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Anion Gap = Na\u207A - (Cl\u207B + HCO\u2083\u207B)" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Albumin Correction = AG + 2.5 \u00D7 (4.0 - albumin)" })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Normal Values:" }), _jsxs("ul", { className: "text-sm space-y-1", children: [_jsx("li", { children: "\u2022 Normal: 8-12 mEq/L" }), _jsx("li", { children: "\u2022 High: >12 mEq/L" }), _jsx("li", { children: "\u2022 Low: <8 mEq/L" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "MUDPILES Mnemonic (High AG):" }), _jsxs("ul", { className: "text-sm space-y-1", children: [_jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "M" }), "ethanol"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "U" }), "remia"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "D" }), "iabetic ketoacidosis"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "P" }), "ropylene glycol"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "I" }), "soniazid"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "L" }), "actic acidosis"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "E" }), "thylene glycol"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "S" }), "alicylates"] })] })] })] }) })] }) })] })] }) }));
}
