import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, AlertTriangle, CheckCircle, RotateCcw } from "lucide-react";
export default function GlasgowComaCalculator({ open, onOpenChange }) {
    const [eyeResponse, setEyeResponse] = useState(0);
    const [verbalResponse, setVerbalResponse] = useState(0);
    const [motorResponse, setMotorResponse] = useState(0);
    const [calculationHistory, setCalculationHistory] = useState([]);
    const eyeResponses = [
        { value: 4, label: "4 - Spontaneous" },
        { value: 3, label: "3 - To speech" },
        { value: 2, label: "2 - To pain" },
        { value: 1, label: "1 - No response" }
    ];
    const verbalResponses = [
        { value: 5, label: "5 - Oriented" },
        { value: 4, label: "4 - Confused" },
        { value: 3, label: "3 - Inappropriate words" },
        { value: 2, label: "2 - Incomprehensible sounds" },
        { value: 1, label: "1 - No response" }
    ];
    const motorResponses = [
        { value: 6, label: "6 - Obeys commands" },
        { value: 5, label: "5 - Localizes pain" },
        { value: 4, label: "4 - Withdraws from pain" },
        { value: 3, label: "3 - Flexion to pain" },
        { value: 2, label: "2 - Extension to pain" },
        { value: 1, label: "1 - No response" }
    ];
    const totalScore = eyeResponse + verbalResponse + motorResponse;
    const getScoreInterpretation = (score) => {
        if (score >= 13)
            return {
                level: "Mild",
                color: "bg-green-500",
                description: "Mild brain injury"
            };
        if (score >= 9)
            return {
                level: "Moderate",
                color: "bg-yellow-500",
                description: "Moderate brain injury"
            };
        if (score >= 3)
            return {
                level: "Severe",
                color: "bg-red-500",
                description: "Severe brain injury"
            };
        return {
            level: "Invalid",
            color: "bg-gray-500",
            description: "Invalid score"
        };
    };
    const getClinicalActions = (score) => {
        if (score >= 13)
            return [
                "Continue monitoring",
                "Assess for other injuries",
                "Document neurological status",
                "Consider discharge planning"
            ];
        if (score >= 9)
            return [
                "Frequent neurological checks",
                "Consider CT scan",
                "Monitor for deterioration",
                "Prepare for possible intervention"
            ];
        if (score >= 3)
            return [
                "Immediate intubation consideration",
                "Emergency CT scan",
                "Neurosurgical consultation",
                "Intensive care monitoring"
            ];
        return ["Complete assessment required"];
    };
    const saveCalculation = () => {
        if (totalScore === 0)
            return;
        const calculation = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            eyeResponse,
            verbalResponse,
            motorResponse,
            totalScore,
            interpretation: getScoreInterpretation(totalScore)
        };
        setCalculationHistory(prev => [calculation, ...prev.slice(0, 4)]);
    };
    const clearCalculation = () => {
        setEyeResponse(0);
        setVerbalResponse(0);
        setMotorResponse(0);
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] p-0", "aria-describedby": "glasgow-coma-description", children: [_jsxs(DialogHeader, { className: "p-6 pb-0", children: [_jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Brain, { className: "h-5 w-5 text-red-500" }), "Glasgow Coma Scale Calculator"] }), _jsx("div", { id: "glasgow-coma-description", className: "text-sm text-muted-foreground", children: "Neurological assessment tool for consciousness level evaluation" })] }), _jsxs("div", { className: "p-6 pt-0 space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Eye Response" }) }), _jsx(CardContent, { className: "space-y-3", children: eyeResponses.map((response) => (_jsx(Button, { variant: eyeResponse === response.value ? "default" : "outline", className: "w-full justify-start text-left h-auto p-3", onClick: () => setEyeResponse(response.value), children: response.label }, response.value))) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Verbal Response" }) }), _jsx(CardContent, { className: "space-y-3", children: verbalResponses.map((response) => (_jsx(Button, { variant: verbalResponse === response.value ? "default" : "outline", className: "w-full justify-start text-left h-auto p-3", onClick: () => setVerbalResponse(response.value), children: response.label }, response.value))) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Motor Response" }) }), _jsx(CardContent, { className: "space-y-3", children: motorResponses.map((response) => (_jsx(Button, { variant: motorResponse === response.value ? "default" : "outline", className: "w-full justify-start text-left h-auto p-3", onClick: () => setMotorResponse(response.value), children: response.label }, response.value))) })] })] }), totalScore > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Brain, { className: "h-4 w-4" }), "Assessment Results"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-6xl font-bold text-primary mb-2", children: totalScore }), _jsx("div", { className: "text-lg text-muted-foreground", children: "Total GCS Score" }), _jsxs(Badge, { className: `${getScoreInterpretation(totalScore).color} text-white mt-2`, children: [getScoreInterpretation(totalScore).level, " - ", getScoreInterpretation(totalScore).description] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [_jsxs("div", { className: "p-3 bg-blue-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: eyeResponse }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Eye" })] }), _jsxs("div", { className: "p-3 bg-green-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: verbalResponse }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Verbal" })] }), _jsxs("div", { className: "p-3 bg-purple-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: motorResponse }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Motor" })] })] })] }), _jsxs("div", { children: [_jsxs("h4", { className: "font-semibold mb-3 flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-orange-500" }), "Clinical Actions"] }), _jsx("div", { className: "space-y-2", children: getClinicalActions(totalScore).map((action, index) => (_jsxs("div", { className: "flex items-start gap-2", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" }), _jsx("span", { className: "text-sm", children: action })] }, index))) })] })] }) })] })), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { onClick: saveCalculation, disabled: totalScore === 0, children: "Save Assessment" }), _jsxs(Button, { onClick: clearCalculation, variant: "outline", children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-2" }), "Clear"] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Quick Reference" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 text-sm", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Score Ranges" }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "13-15:" }), _jsx("span", { className: "text-green-600", children: "Mild" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "9-12:" }), _jsx("span", { className: "text-yellow-600", children: "Moderate" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "3-8:" }), _jsx("span", { className: "text-red-600", children: "Severe" })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Key Points" }), _jsxs("ul", { className: "space-y-1", children: [_jsx("li", { children: "\u2022 Lowest possible score: 3" }), _jsx("li", { children: "\u2022 Highest possible score: 15" }), _jsx("li", { children: "\u2022 Intubation often at \u22648" }), _jsx("li", { children: "\u2022 Reassess frequently" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Documentation" }), _jsxs("ul", { className: "space-y-1", children: [_jsx("li", { children: "\u2022 Record individual components" }), _jsx("li", { children: "\u2022 Note time of assessment" }), _jsx("li", { children: "\u2022 Document any limitations" }), _jsx("li", { children: "\u2022 Track trends over time" })] })] })] }) })] }), calculationHistory.length > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Assessment History" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: calculationHistory.map((calc) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-muted rounded-lg", children: [_jsxs("div", { children: [_jsxs("div", { className: "font-medium", children: ["GCS: ", calc.totalScore, " (E", calc.eyeResponse, "V", calc.verbalResponse, "M", calc.motorResponse, ")"] }), _jsx("div", { className: "text-sm text-muted-foreground", children: calc.timestamp })] }), _jsx(Badge, { className: `${calc.interpretation.color} text-white`, children: calc.interpretation.level })] }, calc.id))) }) })] }))] })] }) }));
}
