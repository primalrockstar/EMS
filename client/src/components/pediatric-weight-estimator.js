import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Baby, Weight, Calculator } from "lucide-react";
export default function PediatricWeightEstimator({ open, onOpenChange }) {
    const [age, setAge] = useState("");
    const [ageUnit, setAgeUnit] = useState("years");
    const [height, setHeight] = useState("");
    const [result, setResult] = useState(null);
    const calculateWeight = () => {
        const ageValue = parseFloat(age);
        if (isNaN(ageValue) || ageValue <= 0) {
            alert("Please enter a valid age");
            return;
        }
        let ageInYears = ageValue;
        if (ageUnit === "months") {
            ageInYears = ageValue / 12;
        }
        let estimatedWeight = 0;
        let method = "";
        let ageCategory = "";
        let recommendations = [];
        if (ageInYears < 1) {
            // Infants (0-12 months)
            const ageInMonths = ageUnit === "months" ? ageValue : ageValue * 12;
            if (ageInMonths <= 6) {
                estimatedWeight = 3.5 + (0.7 * ageInMonths); // Birth weight + 0.7 kg per month
                method = "Infant formula (0-6 months)";
            }
            else {
                estimatedWeight = 3.5 + (0.7 * 6) + (0.5 * (ageInMonths - 6)); // First 6 months + 0.5 kg per month
                method = "Infant formula (6-12 months)";
            }
            ageCategory = "Infant";
            recommendations = [
                "Verify with parent/caregiver if possible",
                "Use length-based tape if available",
                "Consider gestational age for premature infants",
                "Monitor for dehydration signs"
            ];
        }
        else if (ageInYears <= 10) {
            // Children (1-10 years) - APLS formula
            estimatedWeight = (2 * ageInYears) + 8;
            method = "APLS formula (Age × 2 + 8)";
            ageCategory = "Child";
            recommendations = [
                "Verify with parent/caregiver if possible",
                "Use Broselow tape if available",
                "Consider nutritional status",
                "Adjust for obesity/malnutrition if obvious"
            ];
        }
        else if (ageInYears <= 14) {
            // Adolescents (11-14 years) - Modified formula
            estimatedWeight = (3 * ageInYears) + 7;
            method = "Modified formula (Age × 3 + 7)";
            ageCategory = "Adolescent";
            recommendations = [
                "Consider growth spurt variations",
                "Verify with patient if conscious",
                "Use visual estimation as backup",
                "Consider body habitus"
            ];
        }
        else {
            // 15+ years - Adult estimation
            estimatedWeight = 70; // Average adult weight
            method = "Adult average (70 kg)";
            ageCategory = "Adult";
            recommendations = [
                "Use visual estimation for body habitus",
                "Consider patient history if available",
                "Adjust for obvious obesity/underweight",
                "Use standard adult dosing"
            ];
        }
        setResult({
            estimatedWeight,
            method,
            ageCategory,
            recommendations
        });
    };
    const reset = () => {
        setAge("");
        setHeight("");
        setResult(null);
    };
    const getCategoryColor = (category) => {
        switch (category.toLowerCase()) {
            case "infant": return "bg-pink-500";
            case "child": return "bg-blue-500";
            case "adolescent": return "bg-purple-500";
            case "adult": return "bg-green-500";
            default: return "bg-gray-500";
        }
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Baby, { className: "h-5 w-5" }), "Pediatric Weight Estimator"] }) }), _jsxs(Tabs, { defaultValue: "age", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsx(TabsTrigger, { value: "age", children: "Age-Based" }), _jsx(TabsTrigger, { value: "reference", children: "Reference Table" })] }), _jsxs(TabsContent, { value: "age", className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "age", children: "Age" }), _jsx(Input, { id: "age", type: "number", placeholder: "5", value: age, onChange: (e) => setAge(e.target.value), min: "0", max: "100" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "ageUnit", children: "Age Unit" }), _jsxs("select", { id: "ageUnit", value: ageUnit, onChange: (e) => setAgeUnit(e.target.value), className: "w-full p-2 border rounded-md", children: [_jsx("option", { value: "years", children: "Years" }), _jsx("option", { value: "months", children: "Months" })] })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: calculateWeight, className: "flex-1", children: [_jsx(Calculator, { className: "h-4 w-4 mr-2" }), "Estimate Weight"] }), _jsx(Button, { variant: "outline", onClick: reset, children: "Reset" })] }), result && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Weight, { className: "h-5 w-5" }), "Estimated Weight"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-primary", children: [result.estimatedWeight.toFixed(1), " kg"] }), _jsxs("div", { className: "text-sm text-muted-foreground", children: ["(", (result.estimatedWeight * 2.2).toFixed(1), " lbs)"] })] }), _jsxs("div", { className: "text-center", children: [_jsx(Badge, { className: getCategoryColor(result.ageCategory), children: result.ageCategory }), _jsx("div", { className: "text-sm mt-1", children: result.method })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Clinical Recommendations:" }), _jsx("ul", { className: "space-y-1", children: result.recommendations.map((rec, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary", children: "\u2022" }), _jsx("span", { className: "text-sm", children: rec })] }, index))) })] })] })] }))] }), _jsx(TabsContent, { value: "reference", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Quick Reference Table" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Age-Based Formulas:" }), _jsxs("ul", { className: "text-sm space-y-1", children: [_jsx("li", { children: "\u2022 0-6 months: 3.5 + (0.7 \u00D7 months)" }), _jsx("li", { children: "\u2022 6-12 months: 7.7 + (0.5 \u00D7 months after 6)" }), _jsx("li", { children: "\u2022 1-10 years: (Age \u00D7 2) + 8" }), _jsx("li", { children: "\u2022 11-14 years: (Age \u00D7 3) + 7" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Common Weights:" }), _jsxs("ul", { className: "text-sm space-y-1", children: [_jsx("li", { children: "\u2022 Newborn: 3.5 kg (7.7 lbs)" }), _jsx("li", { children: "\u2022 6 months: 7.7 kg (17 lbs)" }), _jsx("li", { children: "\u2022 1 year: 10 kg (22 lbs)" }), _jsx("li", { children: "\u2022 2 years: 12 kg (26 lbs)" }), _jsx("li", { children: "\u2022 5 years: 18 kg (40 lbs)" }), _jsx("li", { children: "\u2022 10 years: 28 kg (62 lbs)" })] })] })] }) })] }) })] })] }) }));
}
