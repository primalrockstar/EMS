import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, AlertCircle, Play, RotateCcw } from "lucide-react";
import { scenarios } from "@/data/scenarios";
export default function ScenarioViewer({ open, onOpenChange }) {
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [currentDecision, setCurrentDecision] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const handleScenarioSelect = (scenario) => {
        setSelectedScenario(scenario);
        setCurrentDecision(0);
        setScore(0);
        setAnswers([]);
        setShowFeedback(false);
        setIsComplete(false);
    };
    const handleChoice = (option) => {
        if (!selectedScenario)
            return;
        const currentQuestion = selectedScenario.decisions[currentDecision];
        const isCorrect = option === currentQuestion.correct;
        setAnswers([...answers, option]);
        if (isCorrect) {
            setScore(score + 1);
        }
        setShowFeedback(true);
        setTimeout(() => {
            setShowFeedback(false);
            if (currentDecision < selectedScenario.decisions.length - 1) {
                setCurrentDecision(currentDecision + 1);
            }
            else {
                setIsComplete(true);
            }
        }, 3000);
    };
    const resetScenario = () => {
        setCurrentDecision(0);
        setScore(0);
        setAnswers([]);
        setShowFeedback(false);
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
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh]", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center", children: [_jsx(Play, { className: "h-5 w-5 mr-2" }), "Interactive Case Scenarios"] }) }), _jsx("div", { className: "h-[70vh] overflow-y-auto", children: !selectedScenario ? (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-muted-foreground", children: "Practice real-world EMS scenarios to improve your clinical decision-making skills." }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: scenarios.map((scenario) => (_jsxs(Card, { className: "cursor-pointer hover:shadow-md transition-shadow", onClick: () => handleScenarioSelect(scenario), children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Badge, { className: `${getDifficultyColor(scenario.difficulty)} text-white`, children: scenario.difficulty }), _jsx(Badge, { variant: "outline", children: scenario.category })] }), _jsx(CardTitle, { className: "text-lg", children: scenario.title })] }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-muted-foreground mb-3 line-clamp-2", children: scenario.narrative }), _jsx("div", { className: "flex flex-wrap gap-1", children: scenario.tags.map((tag, index) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: tag }, index))) }), _jsxs("div", { className: "mt-3 text-sm text-muted-foreground", children: [scenario.decisions.length, " decisions"] })] })] }, scenario.id))) })] })) : (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold", children: selectedScenario.title }), _jsx(Badge, { className: `${getDifficultyColor(selectedScenario.difficulty)} text-white mt-2`, children: selectedScenario.difficulty })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Button, { variant: "outline", onClick: resetScenario, children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-2" }), "Reset"] }), _jsx(Button, { variant: "outline", onClick: () => setSelectedScenario(null), children: "Back to Scenarios" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Progress" }), _jsxs("span", { children: [Math.min(currentDecision + 1, selectedScenario.decisions.length), " / ", selectedScenario.decisions.length] })] }), _jsx(Progress, { value: (Math.min(currentDecision + 1, selectedScenario.decisions.length) / selectedScenario.decisions.length) * 100 })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(AlertCircle, { className: "h-5 w-5 mr-2 text-blue-500" }), "Scenario"] }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-sm leading-relaxed", children: selectedScenario.narrative }) })] }), !isComplete ? (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { children: ["Decision ", currentDecision + 1] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "font-medium", children: selectedScenario.decisions[currentDecision].question }), !showFeedback ? (_jsx("div", { className: "grid grid-cols-1 gap-2", children: selectedScenario.decisions[currentDecision].options.map((option, index) => (_jsx(Button, { variant: "outline", className: "justify-start h-auto py-3 px-4 text-left whitespace-normal", onClick: () => handleChoice(option), children: option }, index))) })) : (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center", children: [answers[currentDecision] === selectedScenario.decisions[currentDecision].correct ? (_jsx(CheckCircle, { className: "h-5 w-5 text-green-500 mr-2" })) : (_jsx(XCircle, { className: "h-5 w-5 text-red-500 mr-2" })), _jsx("span", { className: answers[currentDecision] === selectedScenario.decisions[currentDecision].correct
                                                                        ? "text-green-600 font-medium"
                                                                        : "text-red-600 font-medium", children: answers[currentDecision] === selectedScenario.decisions[currentDecision].correct
                                                                        ? "Correct!"
                                                                        : "Incorrect" })] }), _jsxs("div", { className: "bg-blue-50 p-3 rounded-md", children: [_jsxs("p", { className: "text-sm", children: [_jsx("strong", { children: "Correct Answer:" }), " ", selectedScenario.decisions[currentDecision].correct] }), _jsxs("p", { className: "text-sm mt-2", children: [_jsx("strong", { children: "Explanation:" }), " ", selectedScenario.decisions[currentDecision].feedback] })] })] }))] }) })] })) : (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(CheckCircle, { className: "h-5 w-5 mr-2 text-green-500" }), "Scenario Complete!"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: `text-4xl font-bold mb-2 ${getScoreColor((score / selectedScenario.decisions.length) * 100)}`, children: [score, " / ", selectedScenario.decisions.length] }), _jsxs("div", { className: `text-lg ${getScoreColor((score / selectedScenario.decisions.length) * 100)}`, children: [Math.round((score / selectedScenario.decisions.length) * 100), "% Score"] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs(Button, { onClick: resetScenario, className: "w-full", children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-2" }), "Try Again"] }), _jsx(Button, { variant: "outline", onClick: () => setSelectedScenario(null), className: "w-full", children: "Choose Another Scenario" })] }), _jsx("div", { className: "text-sm text-muted-foreground text-center", children: "Review your answers and explanations to improve your understanding." })] }) })] }))] })) })] }) }));
}
