import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock, User, Heart, Brain, Zap } from "lucide-react";
export default function EnhancedTrainingScenarios() {
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [userLevel, setUserLevel] = useState("EMT");
    const scenarios = [
        {
            id: "cardiac-arrest",
            title: "Adult Cardiac Arrest",
            description: "Unresponsive adult patient requiring immediate CPR and advanced life support",
            difficulty: "Intermediate",
            duration: "15-20 minutes",
            level: "EMT",
            category: "Cardiac",
            objectives: [
                "Recognize cardiac arrest",
                "Perform high-quality CPR",
                "Use AED effectively",
                "Coordinate team response"
            ],
            steps: [
                {
                    id: "scene-safety",
                    description: "You arrive at a scene where a 65-year-old male is found unresponsive on the floor. What is your first priority?",
                    type: "decision",
                    options: ["Check for pulse", "Begin CPR immediately", "Ensure scene safety", "Call for backup"],
                    correctAnswer: "Ensure scene safety",
                    explanation: "Scene safety is always the first priority. You must ensure the scene is safe before approaching the patient."
                },
                {
                    id: "initial-assessment",
                    description: "Scene is safe. Patient is unresponsive. What is your next action?",
                    type: "assessment",
                    options: ["Check for breathing and pulse", "Open airway", "Start compressions", "Attach AED"],
                    correctAnswer: "Check for breathing and pulse",
                    explanation: "You must assess for signs of life - breathing and pulse - to determine if CPR is needed."
                },
                {
                    id: "cpr-initiation",
                    description: "Patient has no pulse and is not breathing normally. What should you do?",
                    type: "intervention",
                    options: ["Give rescue breaths", "Start chest compressions", "Attach AED first", "Check blood pressure"],
                    correctAnswer: "Start chest compressions",
                    explanation: "High-quality chest compressions should be started immediately for cardiac arrest."
                }
            ],
            completed: false
        },
        {
            id: "respiratory-distress",
            title: "Severe Respiratory Distress",
            description: "Patient experiencing acute respiratory distress with potential airway compromise",
            difficulty: "Advanced",
            duration: "20-25 minutes",
            level: "AEMT",
            category: "Respiratory",
            objectives: [
                "Assess respiratory status",
                "Identify airway compromise",
                "Implement airway management",
                "Monitor treatment effectiveness"
            ],
            steps: [
                {
                    id: "primary-assessment",
                    description: "42-year-old female presents with severe shortness of breath, tripod positioning, and audible wheezing. What is your immediate concern?",
                    type: "assessment",
                    options: ["Asthma exacerbation", "Pneumothorax", "Anaphylaxis", "All of the above"],
                    correctAnswer: "All of the above",
                    explanation: "All these conditions can present with severe respiratory distress and require immediate assessment and treatment."
                }
            ],
            completed: false
        },
        {
            id: "trauma-assessment",
            title: "Multi-System Trauma",
            description: "Motor vehicle collision with multiple injuries requiring systematic assessment",
            difficulty: "Advanced",
            duration: "25-30 minutes",
            level: "Paramedic",
            category: "Trauma",
            objectives: [
                "Perform primary survey",
                "Identify life threats",
                "Prioritize interventions",
                "Manage shock"
            ],
            steps: [
                {
                    id: "trauma-survey",
                    description: "Multiple vehicle collision. Patient is conscious but appears injured. What is your systematic approach?",
                    type: "decision",
                    options: ["Head-to-toe assessment", "ABCDE primary survey", "Vital signs first", "Spinal immobilization"],
                    correctAnswer: "ABCDE primary survey",
                    explanation: "The ABCDE (Airway, Breathing, Circulation, Disability, Exposure) approach ensures systematic identification of life threats."
                }
            ],
            completed: false
        }
    ];
    const filteredScenarios = scenarios.filter(scenario => scenario.level === userLevel ||
        (userLevel === "AEMT" && scenario.level === "EMT") ||
        (userLevel === "Paramedic" && (scenario.level === "EMT" || scenario.level === "AEMT")));
    const handleAnswerSelect = (stepId, answer) => {
        setUserAnswers(prev => ({ ...prev, [stepId]: answer }));
    };
    const handleNextStep = () => {
        if (selectedScenario && currentStep < selectedScenario.steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
        else {
            setShowResults(true);
        }
    };
    const calculateScore = () => {
        if (!selectedScenario)
            return 0;
        const correctAnswers = selectedScenario.steps.filter(step => userAnswers[step.id] === step.correctAnswer).length;
        return Math.round((correctAnswers / selectedScenario.steps.length) * 100);
    };
    const resetScenario = () => {
        setSelectedScenario(null);
        setCurrentStep(0);
        setUserAnswers({});
        setShowResults(false);
    };
    const getCategoryIcon = (category) => {
        switch (category) {
            case "Cardiac": return _jsx(Heart, { className: "h-5 w-5" });
            case "Respiratory": return _jsx(Zap, { className: "h-5 w-5" });
            case "Trauma": return _jsx(AlertTriangle, { className: "h-5 w-5" });
            case "Medical": return _jsx(User, { className: "h-5 w-5" });
            case "Pediatric": return _jsx(User, { className: "h-5 w-5" });
            default: return _jsx(Brain, { className: "h-5 w-5" });
        }
    };
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Basic": return "bg-green-100 text-green-800";
            case "Intermediate": return "bg-yellow-100 text-yellow-800";
            case "Advanced": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Training Scenarios" }), _jsx("div", { className: "flex gap-2", children: ["EMT", "AEMT", "Paramedic"].map((level) => (_jsx(Button, { variant: userLevel === level ? "default" : "outline", size: "sm", onClick: () => setUserLevel(level), children: level }, level))) })] }), !selectedScenario && (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredScenarios.map((scenario) => (_jsxs(Card, { className: "cursor-pointer hover:shadow-lg transition-shadow", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [getCategoryIcon(scenario.category), _jsx(CardTitle, { className: "text-lg", children: scenario.title })] }), scenario.completed && _jsx(CheckCircle, { className: "h-5 w-5 text-green-500" })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Badge, { className: getDifficultyColor(scenario.difficulty), children: scenario.difficulty }), _jsx(Badge, { variant: "outline", children: scenario.level }), _jsx(Badge, { variant: "outline", children: scenario.category })] })] }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-muted-foreground mb-3", children: scenario.description }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground mb-4", children: [_jsx(Clock, { className: "h-4 w-4" }), _jsx("span", { children: scenario.duration })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium", children: "Learning Objectives:" }), _jsx("ul", { className: "text-sm space-y-1", children: scenario.objectives.slice(0, 3).map((objective, index) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-primary rounded-full" }), objective] }, index))) })] }), _jsx(Button, { className: "w-full mt-4", onClick: () => setSelectedScenario(scenario), children: "Start Scenario" })] })] }, scenario.id))) })), selectedScenario && !showResults && (_jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { children: selectedScenario.title }), _jsx(Badge, { className: getDifficultyColor(selectedScenario.difficulty), children: selectedScenario.difficulty })] }), _jsx(Progress, { value: ((currentStep + 1) / selectedScenario.steps.length) * 100, className: "w-full" }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Step ", currentStep + 1, " of ", selectedScenario.steps.length] })] }), _jsx(CardContent, { children: selectedScenario.steps[currentStep] && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-muted p-4 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Scenario:" }), _jsx("p", { children: selectedScenario.steps[currentStep].description })] }), selectedScenario.steps[currentStep].options && (_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium", children: "Choose your action:" }), selectedScenario.steps[currentStep].options?.map((option, index) => (_jsx(Button, { variant: userAnswers[selectedScenario.steps[currentStep].id] === option ? "default" : "outline", className: "w-full justify-start text-left", onClick: () => handleAnswerSelect(selectedScenario.steps[currentStep].id, option), children: option }, index)))] })), userAnswers[selectedScenario.steps[currentStep].id] && (_jsxs("div", { className: "bg-blue-50 p-4 rounded-lg", children: [_jsx("h4", { className: "font-medium mb-2", children: "Explanation:" }), _jsx("p", { className: "text-sm", children: selectedScenario.steps[currentStep].explanation })] })), _jsxs("div", { className: "flex justify-between", children: [_jsx(Button, { variant: "outline", onClick: resetScenario, children: "Exit Scenario" }), _jsx(Button, { onClick: handleNextStep, disabled: !userAnswers[selectedScenario.steps[currentStep].id], children: currentStep === selectedScenario.steps.length - 1 ? "Complete" : "Next Step" })] })] })) })] })), showResults && selectedScenario && (_jsxs(Card, { className: "max-w-2xl mx-auto", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Scenario Complete!" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "text-center space-y-4", children: [_jsxs("div", { className: "text-4xl font-bold text-primary", children: [calculateScore(), "%"] }), _jsxs("p", { className: "text-lg", children: ["You scored ", calculateScore(), "% on ", selectedScenario.title] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium", children: "Performance Summary:" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { className: "bg-green-50 p-3 rounded", children: [_jsx("div", { className: "font-semibold text-green-800", children: "Correct" }), _jsx("div", { className: "text-green-600", children: selectedScenario.steps.filter(step => userAnswers[step.id] === step.correctAnswer).length })] }), _jsxs("div", { className: "bg-red-50 p-3 rounded", children: [_jsx("div", { className: "font-semibold text-red-800", children: "Incorrect" }), _jsx("div", { className: "text-red-600", children: selectedScenario.steps.filter(step => userAnswers[step.id] !== step.correctAnswer).length })] }), _jsxs("div", { className: "bg-blue-50 p-3 rounded", children: [_jsx("div", { className: "font-semibold text-blue-800", children: "Total Steps" }), _jsx("div", { className: "text-blue-600", children: selectedScenario.steps.length })] })] })] }), _jsxs("div", { className: "flex gap-3 justify-center", children: [_jsx(Button, { onClick: () => {
                                                setCurrentStep(0);
                                                setUserAnswers({});
                                                setShowResults(false);
                                            }, children: "Try Again" }), _jsx(Button, { variant: "outline", onClick: resetScenario, children: "Choose Another Scenario" })] })] }) })] }))] }));
}
