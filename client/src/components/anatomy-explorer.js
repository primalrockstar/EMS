import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, Brain, Heart, Bone, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { anatomySystems, anatomyQuizzes } from "@/data/anatomy";
export default function AnatomyExplorer({ open, onOpenChange }) {
    const [selectedSystem, setSelectedSystem] = useState(null);
    const [selectedPart, setSelectedPart] = useState(null);
    const [quizMode, setQuizMode] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const handleSystemSelect = (system) => {
        setSelectedSystem(system);
        setSelectedPart(null);
        setQuizMode(false);
    };
    const handlePartClick = (part) => {
        setSelectedPart(part);
    };
    const startQuiz = (systemId) => {
        const quiz = anatomyQuizzes.find(q => q.systemId === systemId);
        if (quiz) {
            setCurrentQuiz(quiz);
            setQuizMode(true);
            setCurrentQuestion(0);
            setScore(0);
            setShowAnswer(false);
            setSelectedAnswer(null);
        }
    };
    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
        setShowAnswer(true);
        if (answer === currentQuiz.questions[currentQuestion].correct) {
            setScore(score + 1);
        }
        setTimeout(() => {
            if (currentQuestion < currentQuiz.questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setShowAnswer(false);
                setSelectedAnswer(null);
            }
            else {
                // Quiz complete
                setShowAnswer(false);
                setSelectedAnswer(null);
            }
        }, 2000);
    };
    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowAnswer(false);
        setSelectedAnswer(null);
    };
    const getSystemIcon = (systemId) => {
        switch (systemId) {
            case 'respiratory': return _jsx(Brain, { className: "h-5 w-5" });
            case 'circulatory': return _jsx(Heart, { className: "h-5 w-5" });
            case 'musculoskeletal': return _jsx(Bone, { className: "h-5 w-5" });
            default: return _jsx(Eye, { className: "h-5 w-5" });
        }
    };
    const getSystemColor = (systemId) => {
        switch (systemId) {
            case 'respiratory': return 'bg-blue-500';
            case 'circulatory': return 'bg-red-500';
            case 'musculoskeletal': return 'bg-yellow-500';
            default: return 'bg-gray-500';
        }
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-6xl max-h-[95vh]", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center", children: [_jsx(Eye, { className: "h-5 w-5 mr-2" }), "Interactive Anatomy Explorer"] }) }), _jsx("div", { className: "h-[80vh] overflow-y-auto", children: !selectedSystem ? (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-muted-foreground", children: "Explore anatomy systems relevant to EMS with interactive diagrams and quizzes." }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: anatomySystems.map((system) => (_jsxs(Card, { className: "cursor-pointer hover:shadow-md transition-shadow", onClick: () => handleSystemSelect(system), children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs(Badge, { className: `${getSystemColor(system.id)} text-white`, children: [getSystemIcon(system.id), _jsx("span", { className: "ml-1", children: "System" })] }) }), _jsx(CardTitle, { className: "text-lg", children: system.name })] }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-muted-foreground mb-3", children: system.description }), _jsxs("div", { className: "bg-blue-50 p-3 rounded-md", children: [_jsx("p", { className: "text-sm font-medium text-blue-800", children: "EMS Relevance:" }), _jsx("p", { className: "text-sm text-blue-700", children: system.emsRelevance })] }), _jsxs("div", { className: "mt-3 text-sm text-muted-foreground", children: [system.parts.length, " anatomical structures"] })] })] }, system.id))) })] })) : (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold", children: selectedSystem.name }), _jsx("p", { className: "text-muted-foreground", children: selectedSystem.description })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "outline", onClick: () => startQuiz(selectedSystem.id), disabled: !anatomyQuizzes.find(q => q.systemId === selectedSystem.id), children: "Take Quiz" }), _jsx(Button, { variant: "outline", onClick: () => setSelectedSystem(null), children: "Back to Systems" })] })] }), !quizMode ? (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Interactive Diagram" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Click on anatomical structures to learn more" })] }), _jsx(CardContent, { children: _jsx("div", { className: "relative bg-gray-50 rounded-lg p-4", style: { height: '500px' }, children: _jsxs("svg", { viewBox: "0 0 100 100", className: "w-full h-full", children: [_jsx("path", { d: "M 50 5 Q 45 5 45 10 L 45 25 Q 45 30 50 30 Q 55 30 55 25 L 55 10 Q 55 5 50 5 Z", fill: "none", stroke: "#E5E7EB", strokeWidth: "0.5" }), _jsx("path", { d: "M 50 30 L 50 70 M 35 45 L 65 45 M 45 95 L 45 70 L 55 70 L 55 95", fill: "none", stroke: "#E5E7EB", strokeWidth: "0.5" }), selectedSystem.parts.map((part) => (_jsx("circle", { cx: part.position.x, cy: part.position.y, r: "3", fill: part.color, stroke: "white", strokeWidth: "0.5", className: "cursor-pointer hover:stroke-2 transition-all", onClick: () => handlePartClick(part) }, part.id)))] }) }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "EMS Relevance" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-sm", children: selectedSystem.emsRelevance }) })] }), selectedPart && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx("div", { className: "w-4 h-4 rounded-full mr-2", style: { backgroundColor: selectedPart.color } }), selectedPart.name] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Description:" }), _jsx("p", { className: "text-sm text-muted-foreground", children: selectedPart.description })] }), _jsxs("div", { className: "bg-red-50 p-3 rounded-md", children: [_jsx("p", { className: "text-sm font-medium text-red-800", children: "EMS Note:" }), _jsx("p", { className: "text-sm text-red-700", children: selectedPart.emsNote })] })] }) })] })), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "All Structures" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-2", children: selectedSystem.parts.map((part) => (_jsxs("div", { className: "flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer", onClick: () => handlePartClick(part), children: [_jsx("div", { className: "w-3 h-3 rounded-full mr-2", style: { backgroundColor: part.color } }), _jsx("span", { className: "text-sm", children: part.name })] }, part.id))) }) })] })] })] })) : (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsx("span", { children: currentQuiz.title }), _jsxs(Badge, { variant: "outline", children: ["Question ", currentQuestion + 1, " of ", currentQuiz.questions.length] })] }) }), _jsx(CardContent, { children: currentQuestion < currentQuiz.questions.length ? (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium", children: currentQuiz.questions[currentQuestion].question }), _jsx("div", { className: "grid grid-cols-1 gap-2", children: currentQuiz.questions[currentQuestion].options.map((option, index) => (_jsxs(Button, { variant: showAnswer
                                                                ? option === currentQuiz.questions[currentQuestion].correct
                                                                    ? "default"
                                                                    : option === selectedAnswer
                                                                        ? "destructive"
                                                                        : "outline"
                                                                : "outline", className: "justify-start h-auto py-3", onClick: () => handleAnswerSelect(option), disabled: showAnswer, children: [showAnswer && option === currentQuiz.questions[currentQuestion].correct && (_jsx(CheckCircle, { className: "h-4 w-4 mr-2" })), showAnswer && option === selectedAnswer && option !== currentQuiz.questions[currentQuestion].correct && (_jsx(XCircle, { className: "h-4 w-4 mr-2" })), option] }, index))) }), showAnswer && (_jsxs("div", { className: "bg-blue-50 p-4 rounded-md", children: [_jsx("p", { className: "text-sm font-medium text-blue-800", children: "Explanation:" }), _jsx("p", { className: "text-sm text-blue-700", children: currentQuiz.questions[currentQuestion].explanation })] }))] })) : (_jsxs("div", { className: "text-center space-y-4", children: [_jsxs("div", { className: "text-3xl font-bold text-green-600", children: [score, " / ", currentQuiz.questions.length] }), _jsxs("div", { className: "text-lg", children: [Math.round((score / currentQuiz.questions.length) * 100), "% Score"] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs(Button, { onClick: resetQuiz, className: "w-full", children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-2" }), "Retake Quiz"] }), _jsx(Button, { variant: "outline", onClick: () => setQuizMode(false), className: "w-full", children: "Back to Anatomy" })] })] })) })] }) }))] })) })] }) }));
}
