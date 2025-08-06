import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Calculator, AlertTriangle, RotateCcw } from "lucide-react";
export default function CardiacOutputCalculator({ open, onOpenChange }) {
    const [heartRate, setHeartRate] = useState("");
    const [strokeVolume, setStrokeVolume] = useState("");
    const [bloodPressureSystolic, setBloodPressureSystolic] = useState("");
    const [bloodPressureDiastolic, setBloodPressureDiastolic] = useState("");
    const [calculationMethod, setCalculationMethod] = useState("direct");
    const [results, setResults] = useState({
        cardiacOutput: 0,
        cardiacIndex: 0,
        meanArterialPressure: 0,
        strokeVolumeIndex: 0
    });
    const [calculationHistory, setCalculationHistory] = useState([]);
    const calculateCardiacOutput = () => {
        const hr = parseFloat(heartRate);
        const sv = parseFloat(strokeVolume);
        const sysBP = parseFloat(bloodPressureSystolic);
        const diaBP = parseFloat(bloodPressureDiastolic);
        if (!hr || !sv || hr <= 0 || sv <= 0) {
            alert("Please enter valid heart rate and stroke volume");
            return;
        }
        // Cardiac Output = Heart Rate × Stroke Volume
        const cardiacOutput = (hr * sv) / 1000; // Convert to L/min
        // Cardiac Index = Cardiac Output / BSA (assuming average BSA of 1.7 m²)
        const cardiacIndex = cardiacOutput / 1.7;
        // Mean Arterial Pressure = (Systolic + 2×Diastolic) / 3
        const meanArterialPressure = sysBP && diaBP ? (sysBP + 2 * diaBP) / 3 : 0;
        // Stroke Volume Index = Stroke Volume / BSA
        const strokeVolumeIndex = sv / 1.7;
        const newResults = {
            cardiacOutput: Math.round(cardiacOutput * 100) / 100,
            cardiacIndex: Math.round(cardiacIndex * 100) / 100,
            meanArterialPressure: Math.round(meanArterialPressure),
            strokeVolumeIndex: Math.round(strokeVolumeIndex)
        };
        setResults(newResults);
        // Add to history
        const calculation = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            heartRate: hr,
            strokeVolume: sv,
            systolicBP: sysBP,
            diastolicBP: diaBP,
            results: newResults
        };
        setCalculationHistory(prev => [calculation, ...prev.slice(0, 4)]);
    };
    const clearCalculation = () => {
        setHeartRate("");
        setStrokeVolume("");
        setBloodPressureSystolic("");
        setBloodPressureDiastolic("");
        setResults({
            cardiacOutput: 0,
            cardiacIndex: 0,
            meanArterialPressure: 0,
            strokeVolumeIndex: 0
        });
    };
    const getCardiacOutputInterpretation = (co) => {
        if (co >= 4.0 && co <= 8.0)
            return { level: "Normal", color: "bg-green-500" };
        if (co < 4.0)
            return { level: "Low", color: "bg-red-500" };
        if (co > 8.0)
            return { level: "High", color: "bg-orange-500" };
        return { level: "Invalid", color: "bg-gray-500" };
    };
    const getCardiacIndexInterpretation = (ci) => {
        if (ci >= 2.5 && ci <= 4.0)
            return { level: "Normal", color: "bg-green-500" };
        if (ci < 2.5)
            return { level: "Low", color: "bg-red-500" };
        if (ci > 4.0)
            return { level: "High", color: "bg-orange-500" };
        return { level: "Invalid", color: "bg-gray-500" };
    };
    const getMAPInterpretation = (map) => {
        if (map >= 70 && map <= 100)
            return { level: "Normal", color: "bg-green-500" };
        if (map < 70)
            return { level: "Low", color: "bg-red-500" };
        if (map > 100)
            return { level: "High", color: "bg-orange-500" };
        return { level: "Invalid", color: "bg-gray-500" };
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] p-0", "aria-describedby": "cardiac-output-description", children: [_jsxs(DialogHeader, { className: "p-6 pb-0", children: [_jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Heart, { className: "h-5 w-5 text-red-500" }), "Cardiac Output Calculator"] }), _jsx("div", { id: "cardiac-output-description", className: "text-sm text-muted-foreground", children: "Calculate cardiac output, cardiac index, and related hemodynamic parameters" })] }), _jsxs("div", { className: "p-6 pt-0 space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Calculator, { className: "h-4 w-4" }), "Hemodynamic Parameters"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "heartRate", children: "Heart Rate (BPM)" }), _jsx(Input, { id: "heartRate", type: "number", placeholder: "e.g., 72", value: heartRate, onChange: (e) => setHeartRate(e.target.value), className: "mt-1" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "strokeVolume", children: "Stroke Volume (mL)" }), _jsx(Input, { id: "strokeVolume", type: "number", placeholder: "e.g., 70", value: strokeVolume, onChange: (e) => setStrokeVolume(e.target.value), className: "mt-1" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "systolic", children: "Systolic BP (mmHg)" }), _jsx(Input, { id: "systolic", type: "number", placeholder: "e.g., 120", value: bloodPressureSystolic, onChange: (e) => setBloodPressureSystolic(e.target.value), className: "mt-1" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "diastolic", children: "Diastolic BP (mmHg)" }), _jsx(Input, { id: "diastolic", type: "number", placeholder: "e.g., 80", value: bloodPressureDiastolic, onChange: (e) => setBloodPressureDiastolic(e.target.value), className: "mt-1" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: calculateCardiacOutput, className: "flex-1", children: [_jsx(Calculator, { className: "h-4 w-4 mr-2" }), "Calculate"] }), _jsxs(Button, { onClick: clearCalculation, variant: "outline", children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-2" }), "Clear"] })] })] })] }), results.cardiacOutput > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Heart, { className: "h-4 w-4" }), "Calculation Results"] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: [_jsxs("div", { className: "text-center p-4 bg-red-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-red-600", children: results.cardiacOutput }), _jsx("div", { className: "text-sm text-muted-foreground mb-2", children: "Cardiac Output (L/min)" }), _jsx(Badge, { className: `${getCardiacOutputInterpretation(results.cardiacOutput).color} text-white`, children: getCardiacOutputInterpretation(results.cardiacOutput).level })] }), _jsxs("div", { className: "text-center p-4 bg-blue-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: results.cardiacIndex }), _jsx("div", { className: "text-sm text-muted-foreground mb-2", children: "Cardiac Index (L/min/m\u00B2)" }), _jsx(Badge, { className: `${getCardiacIndexInterpretation(results.cardiacIndex).color} text-white`, children: getCardiacIndexInterpretation(results.cardiacIndex).level })] }), _jsxs("div", { className: "text-center p-4 bg-green-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: results.meanArterialPressure }), _jsx("div", { className: "text-sm text-muted-foreground mb-2", children: "Mean Arterial Pressure (mmHg)" }), _jsx(Badge, { className: `${getMAPInterpretation(results.meanArterialPressure).color} text-white`, children: getMAPInterpretation(results.meanArterialPressure).level })] }), _jsxs("div", { className: "text-center p-4 bg-purple-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: results.strokeVolumeIndex }), _jsx("div", { className: "text-sm text-muted-foreground mb-2", children: "Stroke Volume Index (mL/m\u00B2)" }), _jsx(Badge, { variant: "outline", children: "Normal: 33-47" })] })] }), _jsx("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-yellow-600 mt-0.5" }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-yellow-800", children: "Clinical Considerations:" }), _jsxs("ul", { className: "text-sm text-yellow-700 mt-1 space-y-1", children: [_jsx("li", { children: "\u2022 Cardiac output depends on heart rate, stroke volume, and venous return" }), _jsx("li", { children: "\u2022 Normal resting cardiac output: 4-8 L/min" }), _jsx("li", { children: "\u2022 Cardiac index accounts for body surface area" }), _jsx("li", { children: "\u2022 Consider patient's clinical condition and other vital signs" })] })] })] }) })] })] })), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Normal Values & Reference" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Normal Ranges" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Cardiac Output:" }), _jsx("span", { children: "4.0-8.0 L/min" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Cardiac Index:" }), _jsx("span", { children: "2.5-4.0 L/min/m\u00B2" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Stroke Volume:" }), _jsx("span", { children: "60-80 mL" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Mean Arterial Pressure:" }), _jsx("span", { children: "70-100 mmHg" })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Formulas Used" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { children: [_jsx("strong", { children: "Cardiac Output:" }), " HR \u00D7 SV"] }), _jsxs("div", { children: [_jsx("strong", { children: "Cardiac Index:" }), " CO / BSA"] }), _jsxs("div", { children: [_jsx("strong", { children: "MAP:" }), " (SBP + 2\u00D7DBP) / 3"] }), _jsxs("div", { children: [_jsx("strong", { children: "SV Index:" }), " SV / BSA"] }), _jsx("div", { className: "text-muted-foreground", children: "*BSA assumed as 1.7 m\u00B2 for average adult" })] })] })] }) })] }), calculationHistory.length > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Calculation History" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: calculationHistory.map((calc) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-muted rounded-lg", children: [_jsxs("div", { className: "text-sm", children: [_jsxs("div", { className: "font-medium", children: ["HR: ", calc.heartRate, " BPM, SV: ", calc.strokeVolume, " mL"] }), _jsx("div", { className: "text-muted-foreground", children: calc.timestamp })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "font-bold text-primary", children: ["CO: ", calc.results.cardiacOutput, " L/min"] }), _jsxs("div", { className: "text-sm text-muted-foreground", children: ["CI: ", calc.results.cardiacIndex, " L/min/m\u00B2"] })] })] }, calc.id))) }) })] }))] })] }) }));
}
