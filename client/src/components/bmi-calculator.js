import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Calculator, User, AlertTriangle, RotateCcw } from "lucide-react";
export default function BMICalculator({ open, onOpenChange }) {
    const [unitSystem, setUnitSystem] = useState("metric");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [feet, setFeet] = useState("");
    const [inches, setInches] = useState("");
    const [results, setResults] = useState({
        bmi: 0,
        category: "",
        healthyWeightRange: { min: 0, max: 0 },
        weightToLose: 0,
        weightToGain: 0
    });
    const [calculationHistory, setCalculationHistory] = useState([]);
    const calculateBMI = () => {
        let weightKg = 0;
        let heightM = 0;
        if (unitSystem === "metric") {
            weightKg = parseFloat(weight);
            heightM = parseFloat(height) / 100; // Convert cm to m
        }
        else {
            weightKg = parseFloat(weight) * 0.453592; // Convert lbs to kg
            const totalInches = parseFloat(feet) * 12 + parseFloat(inches);
            heightM = totalInches * 0.0254; // Convert inches to meters
        }
        if (!weightKg || !heightM || weightKg <= 0 || heightM <= 0) {
            alert("Please enter valid weight and height values");
            return;
        }
        const bmi = weightKg / (heightM * heightM);
        let category = "";
        if (bmi < 18.5)
            category = "Underweight";
        else if (bmi < 25)
            category = "Normal weight";
        else if (bmi < 30)
            category = "Overweight";
        else
            category = "Obese";
        // Calculate healthy weight range (BMI 18.5-24.9)
        const minHealthyWeight = 18.5 * (heightM * heightM);
        const maxHealthyWeight = 24.9 * (heightM * heightM);
        // Convert back to display units
        const healthyWeightRange = {
            min: unitSystem === "metric" ? minHealthyWeight : minHealthyWeight * 2.20462,
            max: unitSystem === "metric" ? maxHealthyWeight : maxHealthyWeight * 2.20462
        };
        // Calculate weight to lose/gain to reach healthy range
        const currentWeight = unitSystem === "metric" ? weightKg : weightKg * 2.20462;
        let weightToLose = 0;
        let weightToGain = 0;
        if (bmi >= 25) {
            weightToLose = currentWeight - healthyWeightRange.max;
        }
        else if (bmi < 18.5) {
            weightToGain = healthyWeightRange.min - currentWeight;
        }
        const newResults = {
            bmi: Math.round(bmi * 10) / 10,
            category,
            healthyWeightRange: {
                min: Math.round(healthyWeightRange.min * 10) / 10,
                max: Math.round(healthyWeightRange.max * 10) / 10
            },
            weightToLose: Math.round(weightToLose * 10) / 10,
            weightToGain: Math.round(weightToGain * 10) / 10
        };
        setResults(newResults);
        // Add to history
        const calculation = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            unitSystem,
            weight: unitSystem === "metric" ? weight : weight,
            height: unitSystem === "metric" ? height : `${feet}'${inches}"`,
            results: newResults
        };
        setCalculationHistory(prev => [calculation, ...prev.slice(0, 4)]);
    };
    const clearCalculation = () => {
        setWeight("");
        setHeight("");
        setFeet("");
        setInches("");
        setResults({
            bmi: 0,
            category: "",
            healthyWeightRange: { min: 0, max: 0 },
            weightToLose: 0,
            weightToGain: 0
        });
    };
    const getBMIColor = (bmi) => {
        if (bmi < 18.5)
            return "bg-blue-500";
        if (bmi < 25)
            return "bg-green-500";
        if (bmi < 30)
            return "bg-yellow-500";
        return "bg-red-500";
    };
    const getBMIHealthRisks = (bmi) => {
        if (bmi < 18.5)
            return [
                "Increased risk of osteoporosis",
                "Weakened immune system",
                "Fertility issues",
                "Delayed wound healing"
            ];
        if (bmi < 25)
            return [
                "Optimal health range",
                "Lower disease risk",
                "Better mobility",
                "Improved longevity"
            ];
        if (bmi < 30)
            return [
                "Increased risk of heart disease",
                "Higher blood pressure risk",
                "Type 2 diabetes risk",
                "Sleep apnea risk"
            ];
        return [
            "Significantly increased cardiovascular risk",
            "Higher risk of stroke",
            "Increased cancer risk",
            "Joint problems and arthritis"
        ];
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] p-0", "aria-describedby": "bmi-calculator-description", children: [_jsxs(DialogHeader, { className: "p-6 pb-0", children: [_jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Calculator, { className: "h-5 w-5 text-pink-500" }), "BMI Calculator"] }), _jsx("div", { id: "bmi-calculator-description", className: "text-sm text-muted-foreground", children: "Calculate Body Mass Index and assess health categories" })] }), _jsxs("div", { className: "p-6 pt-0 space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(User, { className: "h-4 w-4" }), "Body Measurements"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex gap-4 mb-4", children: [_jsx(Button, { variant: unitSystem === "metric" ? "default" : "outline", onClick: () => setUnitSystem("metric"), className: "flex-1", children: "Metric (kg, cm)" }), _jsx(Button, { variant: unitSystem === "imperial" ? "default" : "outline", onClick: () => setUnitSystem("imperial"), className: "flex-1", children: "Imperial (lbs, ft/in)" })] }), _jsxs(Tabs, { value: unitSystem, className: "w-full", children: [_jsx(TabsContent, { value: "metric", className: "space-y-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "weight-kg", children: "Weight (kg)" }), _jsx(Input, { id: "weight-kg", type: "number", step: "0.1", placeholder: "e.g., 70.5", value: weight, onChange: (e) => setWeight(e.target.value), className: "mt-1" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "height-cm", children: "Height (cm)" }), _jsx(Input, { id: "height-cm", type: "number", placeholder: "e.g., 175", value: height, onChange: (e) => setHeight(e.target.value), className: "mt-1" })] })] }) }), _jsx(TabsContent, { value: "imperial", className: "space-y-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "weight-lbs", children: "Weight (lbs)" }), _jsx(Input, { id: "weight-lbs", type: "number", step: "0.1", placeholder: "e.g., 155", value: weight, onChange: (e) => setWeight(e.target.value), className: "mt-1" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "height-feet", children: "Height (feet)" }), _jsx(Input, { id: "height-feet", type: "number", placeholder: "e.g., 5", value: feet, onChange: (e) => setFeet(e.target.value), className: "mt-1" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "height-inches", children: "Height (inches)" }), _jsx(Input, { id: "height-inches", type: "number", placeholder: "e.g., 9", value: inches, onChange: (e) => setInches(e.target.value), className: "mt-1" })] })] }) })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: calculateBMI, className: "flex-1", children: [_jsx(Calculator, { className: "h-4 w-4 mr-2" }), "Calculate BMI"] }), _jsxs(Button, { onClick: clearCalculation, variant: "outline", children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-2" }), "Clear"] })] })] })] }), results.bmi > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Calculator, { className: "h-4 w-4" }), "BMI Results"] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsxs("div", { children: [_jsx("div", { className: "text-6xl font-bold text-primary mb-2", children: results.bmi }), _jsx("div", { className: "text-lg text-muted-foreground mb-2", children: "Body Mass Index" }), _jsx(Badge, { className: `${getBMIColor(results.bmi)} text-white`, children: results.category })] }), _jsxs("div", { className: "p-4 bg-blue-50 rounded-lg", children: [_jsx("div", { className: "font-semibold text-blue-800 mb-2", children: "Healthy Weight Range" }), _jsxs("div", { className: "text-2xl font-bold text-blue-600", children: [results.healthyWeightRange.min, " - ", results.healthyWeightRange.max] }), _jsx("div", { className: "text-sm text-blue-700", children: unitSystem === "metric" ? "kg" : "lbs" })] }), results.weightToLose > 0 && (_jsxs("div", { className: "p-4 bg-orange-50 rounded-lg", children: [_jsx("div", { className: "font-semibold text-orange-800 mb-2", children: "Weight to Lose" }), _jsx("div", { className: "text-2xl font-bold text-orange-600", children: results.weightToLose }), _jsx("div", { className: "text-sm text-orange-700", children: unitSystem === "metric" ? "kg" : "lbs" })] })), results.weightToGain > 0 && (_jsxs("div", { className: "p-4 bg-green-50 rounded-lg", children: [_jsx("div", { className: "font-semibold text-green-800 mb-2", children: "Weight to Gain" }), _jsx("div", { className: "text-2xl font-bold text-green-600", children: results.weightToGain }), _jsx("div", { className: "text-sm text-green-700", children: unitSystem === "metric" ? "kg" : "lbs" })] }))] }), _jsxs("div", { children: [_jsxs("h4", { className: "font-semibold mb-3 flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-yellow-500" }), "Health Considerations"] }), _jsx("div", { className: "space-y-2", children: getBMIHealthRisks(results.bmi).map((risk, index) => (_jsxs("div", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary mt-1", children: "\u2022" }), _jsx("span", { className: "text-sm", children: risk })] }, index))) })] })] }), _jsx("div", { className: "mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-yellow-600 mt-0.5" }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-yellow-800", children: "Important Notes:" }), _jsxs("ul", { className: "text-sm text-yellow-700 mt-1 space-y-1", children: [_jsx("li", { children: "\u2022 BMI is a screening tool, not a diagnostic measure" }), _jsx("li", { children: "\u2022 Does not account for muscle mass, bone density, or body composition" }), _jsx("li", { children: "\u2022 Consult healthcare provider for personalized health assessment" }), _jsx("li", { children: "\u2022 Consider waist circumference and other health markers" })] })] })] }) })] })] })), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "BMI Categories & Health Risks" }) }), _jsx(CardContent, { children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left p-2", children: "Category" }), _jsx("th", { className: "text-left p-2", children: "BMI Range" }), _jsx("th", { className: "text-left p-2", children: "Health Risk" })] }) }), _jsxs("tbody", { children: [_jsxs("tr", { className: "border-b", children: [_jsx("td", { className: "p-2", children: _jsx(Badge, { className: "bg-blue-500 text-white", children: "Underweight" }) }), _jsx("td", { className: "p-2", children: "Less than 18.5" }), _jsx("td", { className: "p-2", children: "Increased risk of malnutrition, osteoporosis" })] }), _jsxs("tr", { className: "border-b", children: [_jsx("td", { className: "p-2", children: _jsx(Badge, { className: "bg-green-500 text-white", children: "Normal weight" }) }), _jsx("td", { className: "p-2", children: "18.5 - 24.9" }), _jsx("td", { className: "p-2", children: "Optimal health range" })] }), _jsxs("tr", { className: "border-b", children: [_jsx("td", { className: "p-2", children: _jsx(Badge, { className: "bg-yellow-500 text-white", children: "Overweight" }) }), _jsx("td", { className: "p-2", children: "25.0 - 29.9" }), _jsx("td", { className: "p-2", children: "Increased risk of cardiovascular disease" })] }), _jsxs("tr", { className: "border-b", children: [_jsx("td", { className: "p-2", children: _jsx(Badge, { className: "bg-red-500 text-white", children: "Obese" }) }), _jsx("td", { className: "p-2", children: "30.0 and above" }), _jsx("td", { className: "p-2", children: "High risk of serious health conditions" })] })] })] }) }) })] }), calculationHistory.length > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Calculation History" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: calculationHistory.map((calc) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-muted rounded-lg", children: [_jsxs("div", { className: "text-sm", children: [_jsxs("div", { className: "font-medium", children: [calc.weight, " ", calc.unitSystem === "metric" ? "kg" : "lbs", " - ", calc.height, " ", calc.unitSystem === "metric" ? "cm" : ""] }), _jsx("div", { className: "text-muted-foreground", children: calc.timestamp })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "font-bold text-primary", children: ["BMI: ", calc.results.bmi] }), _jsx("div", { className: "text-sm text-muted-foreground", children: calc.results.category })] })] }, calc.id))) }) })] }))] })] }) }));
}
