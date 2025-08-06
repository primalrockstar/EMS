import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, AlertCircle, Activity, Heart, RotateCcw, User } from "lucide-react";
import { simulations } from "@/data/simulations";
export default function PatientSimulator({ open, onOpenChange }) {
    const [selectedSimulation, setSelectedSimulation] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedActions, setSelectedActions] = useState([]);
    const [showFeedback, setShowFeedback] = useState(null);
    const [isComplete, setIsComplete] = useState(false);
    const handleSimulationSelect = (simulation) => {
        setSelectedSimulation(simulation);
        setCurrentStep(0);
        setScore(0);
        setSelectedActions([]);
        setShowFeedback(null);
        setIsComplete(false);
    };
    const handleActionSelect = (action) => {
        if (!selectedSimulation)
            return;
        const newSelectedActions = [...selectedActions, action];
        setSelectedActions(newSelectedActions);
        setShowFeedback(selectedSimulation.feedback[action] || "Action completed.");
        // Check if this action is correct for current step
        if (action === selectedSimulation.correctSequence[currentStep]) {
            setScore(score + 1);
            setCurrentStep(currentStep + 1);
        }
        // Check if simulation is complete
        if (currentStep >= selectedSimulation.correctSequence.length - 1) {
            setTimeout(() => {
                setIsComplete(true);
                setShowFeedback(null);
            }, 2000);
        }
        else {
            setTimeout(() => {
                setShowFeedback(null);
            }, 2000);
        }
    };
    const resetSimulation = () => {
        setCurrentStep(0);
        setScore(0);
        setSelectedActions([]);
        setShowFeedback(null);
        setIsComplete(false);
    };
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner': return 'bg-green-500';
            case 'intermediate': return 'bg-yellow-500';
            case 'advanced': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };
    const getScoreColor = (percentage) => {
        if (percentage >= 80)
            return 'text-green-600';
        if (percentage >= 60)
            return 'text-yellow-600';
        return 'text-red-600';
    };
    const getVitalsColor = (vital, value) => {
        switch (vital) {
            case 'pulse':
                if (typeof value === 'number') {
                    if (value < 60 || value > 100)
                        return 'text-red-600';
                    return 'text-green-600';
                }
                break;
            case 'resp':
                if (typeof value === 'number') {
                    if (value < 12 || value > 20)
                        return 'text-yellow-600';
                    return 'text-green-600';
                }
                break;
            case 'spo2':
                if (typeof value === 'number') {
                    if (value < 95)
                        return 'text-red-600';
                    return 'text-green-600';
                }
                break;
        }
        return 'text-gray-600';
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-5xl max-h-[95vh]", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center", children: [_jsx(Activity, { className: "h-5 w-5 mr-2" }), "Virtual Patient Simulations"] }) }), _jsx("div", { className: "h-[80vh] overflow-y-auto", children: !selectedSimulation ? (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-muted-foreground", children: "Practice patient assessment and treatment in realistic clinical scenarios." }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: simulations.map((simulation) => (_jsxs(Card, { className: "cursor-pointer hover:shadow-md transition-shadow", onClick: () => handleSimulationSelect(simulation), children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Badge, { className: `${getDifficultyColor(simulation.difficulty)} text-white`, children: simulation.difficulty }), _jsxs(Badge, { variant: "outline", children: [_jsx(User, { className: "h-3 w-3 mr-1" }), "Patient Sim"] })] }), _jsx(CardTitle, { className: "text-lg", children: simulation.title })] }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-muted-foreground mb-3", children: simulation.patient }), _jsxs("div", { className: "grid grid-cols-2 gap-2 mb-3 text-xs", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Heart, { className: "h-3 w-3 mr-1 text-red-500" }), _jsxs("span", { children: ["HR: ", simulation.vitals.pulse] })] }), _jsxs("div", { className: "flex items-center", children: [_jsx(Activity, { className: "h-3 w-3 mr-1 text-blue-500" }), _jsxs("span", { children: ["RR: ", simulation.vitals.resp] })] }), _jsx("div", { className: "flex items-center", children: _jsxs("span", { className: "text-xs", children: ["BP: ", simulation.vitals.bp] }) }), simulation.vitals.spo2 && (_jsx("div", { className: "flex items-center", children: _jsxs("span", { className: "text-xs", children: ["SpO2: ", simulation.vitals.spo2, "%"] }) }))] }), _jsx("div", { className: "flex flex-wrap gap-1", children: simulation.tags.map((tag, index) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: tag }, index))) })] })] }, simulation.id))) })] })) : (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold", children: selectedSimulation.title }), _jsx(Badge, { className: `${getDifficultyColor(selectedSimulation.difficulty)} text-white mt-2`, children: selectedSimulation.difficulty })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Button, { variant: "outline", onClick: resetSimulation, children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-2" }), "Reset"] }), _jsx(Button, { variant: "outline", onClick: () => setSelectedSimulation(null), children: "Back to Simulations" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Progress" }), _jsxs("span", { children: [currentStep, " / ", selectedSimulation.correctSequence.length] })] }), _jsx(Progress, { value: (currentStep / selectedSimulation.correctSequence.length) * 100 })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(User, { className: "h-5 w-5 mr-2" }), "Patient Information"] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm mb-3", children: selectedSimulation.patient }), _jsx("p", { className: "text-sm text-muted-foreground", children: selectedSimulation.initialAssessment })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Heart, { className: "h-5 w-5 mr-2 text-red-500" }), "Vital Signs"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Heart Rate:" }), _jsxs("span", { className: `text-sm font-medium ${getVitalsColor('pulse', selectedSimulation.vitals.pulse)}`, children: [selectedSimulation.vitals.pulse, " bpm"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Respiratory Rate:" }), _jsxs("span", { className: `text-sm font-medium ${getVitalsColor('resp', selectedSimulation.vitals.resp)}`, children: [selectedSimulation.vitals.resp, " /min"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Blood Pressure:" }), _jsxs("span", { className: "text-sm font-medium", children: [selectedSimulation.vitals.bp, " mmHg"] })] }), selectedSimulation.vitals.temp && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Temperature:" }), _jsx("span", { className: "text-sm font-medium", children: selectedSimulation.vitals.temp })] })), selectedSimulation.vitals.spo2 && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "SpO2:" }), _jsxs("span", { className: `text-sm font-medium ${getVitalsColor('spo2', selectedSimulation.vitals.spo2)}`, children: [selectedSimulation.vitals.spo2, "%"] })] }))] }) })] })] }), _jsxs("div", { className: "space-y-4", children: [!isComplete ? (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Available Actions" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Select the most appropriate action for this patient" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-2", children: selectedSimulation.actions.map((action, index) => (_jsxs(Button, { variant: selectedActions.includes(action) ? "secondary" : "outline", className: "w-full justify-start h-auto py-3 px-4 text-left", onClick: () => handleActionSelect(action), disabled: selectedActions.includes(action), children: [selectedActions.includes(action) && (_jsx(CheckCircle, { className: "h-4 w-4 mr-2 text-green-500" })), action] }, index))) }) })] })) : (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(CheckCircle, { className: "h-5 w-5 mr-2 text-green-500" }), "Simulation Complete!"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "text-center space-y-4", children: [_jsxs("div", { className: `text-3xl font-bold ${getScoreColor((score / selectedSimulation.correctSequence.length) * 100)}`, children: [score, " / ", selectedSimulation.correctSequence.length] }), _jsxs("div", { className: `text-lg ${getScoreColor((score / selectedSimulation.correctSequence.length) * 100)}`, children: [Math.round((score / selectedSimulation.correctSequence.length) * 100), "% Correct Sequence"] }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm font-medium", children: "Correct Sequence:" }), _jsx("div", { className: "space-y-1", children: selectedSimulation.correctSequence.map((action, index) => (_jsxs("div", { className: "flex items-center text-sm", children: [_jsx("span", { className: "w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2 text-xs", children: index + 1 }), action] }, index))) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs(Button, { onClick: resetSimulation, className: "w-full", children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-2" }), "Try Again"] }), _jsx(Button, { variant: "outline", onClick: () => setSelectedSimulation(null), className: "w-full", children: "Choose Another Simulation" })] })] }) })] })), showFeedback && (_jsxs(Card, { className: "border-blue-200 bg-blue-50", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center text-blue-700", children: [_jsx(AlertCircle, { className: "h-5 w-5 mr-2" }), "Feedback"] }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-sm text-blue-700", children: showFeedback }) })] }))] })] })] })) })] }) }));
}
