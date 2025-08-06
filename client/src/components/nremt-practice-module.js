import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, BookOpen, Target, Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft, RotateCcw, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
const SCOPE_INFO = {
    EMR: { name: "Emergency Medical Responder", questions: 40, color: "bg-green-500" },
    EMT: { name: "Emergency Medical Technician", questions: 60, color: "bg-blue-500" },
    AEMT: { name: "Advanced Emergency Medical Technician", questions: 50, color: "bg-orange-500" },
    Paramedic: { name: "Paramedic", questions: 50, color: "bg-red-500" }
};
const CONTENT_AREAS = {
    "Airway": "Airway, Respiration & Ventilation",
    "Cardiology": "Cardiology & Resuscitation",
    "Trauma": "Trauma",
    "Medical": "Medical/Obstetrics/Gynecology",
    "Operations": "EMS Operations"
};
export default function NremtPracticeModule({ open, onOpenChange }) {
    const [selectedScope, setSelectedScope] = useState("EMT");
    const [examSession, setExamSession] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const { toast } = useToast();
    const { data: questions, isLoading } = useQuery({
        queryKey: [`/api/nremt-questions/${selectedScope}`],
        enabled: open,
    });
    const saveSessionMutation = useMutation({
        mutationFn: async (sessionData) => {
            const response = await fetch("/api/nremt-sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sessionData),
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/nremt-sessions"] });
            toast({
                title: "Session Saved",
                description: "Your exam session has been saved successfully.",
            });
        },
    });
    // Timer effect
    useEffect(() => {
        let interval;
        if (isTimerRunning && examSession) {
            interval = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, examSession]);
    const startExam = () => {
        if (!questions || questions.length === 0) {
            toast({
                title: "No Questions Available",
                description: "Please select a different scope or try again later.",
                variant: "destructive",
            });
            return;
        }
        const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
        const sessionQuestions = shuffledQuestions.slice(0, SCOPE_INFO[selectedScope].questions);
        setExamSession({
            scope: selectedScope,
            questions: sessionQuestions,
            currentIndex: 0,
            answers: {},
            score: 0,
            timeSpent: 0,
            isComplete: false,
        });
        setTimeElapsed(0);
        setIsTimerRunning(true);
        setShowExplanation(false);
        setSelectedAnswer("");
    };
    const submitAnswer = () => {
        if (!examSession || !selectedAnswer)
            return;
        const currentQuestion = examSession.questions[examSession.currentIndex];
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        const updatedAnswers = {
            ...examSession.answers,
            [examSession.currentIndex]: selectedAnswer,
        };
        setExamSession(prev => ({
            ...prev,
            answers: updatedAnswers,
            score: prev.score + (isCorrect ? 1 : 0),
        }));
        setShowExplanation(true);
    };
    const nextQuestion = () => {
        if (!examSession)
            return;
        const isLastQuestion = examSession.currentIndex === examSession.questions.length - 1;
        if (isLastQuestion) {
            // Complete the exam
            const finalSession = {
                ...examSession,
                isComplete: true,
                timeSpent: timeElapsed,
            };
            setExamSession(finalSession);
            setIsTimerRunning(false);
            // Save session
            saveSessionMutation.mutate({
                scope: examSession.scope,
                totalQuestions: examSession.questions.length,
                correctAnswers: examSession.score + (selectedAnswer === examSession.questions[examSession.currentIndex].correctAnswer ? 1 : 0),
                timeSpent: timeElapsed,
                isPassed: (examSession.score / examSession.questions.length) >= 0.7,
                sessionData: finalSession,
            });
        }
        else {
            setExamSession(prev => ({
                ...prev,
                currentIndex: prev.currentIndex + 1,
            }));
            setSelectedAnswer("");
            setShowExplanation(false);
        }
    };
    const previousQuestion = () => {
        if (!examSession || examSession.currentIndex === 0)
            return;
        setExamSession(prev => ({
            ...prev,
            currentIndex: prev.currentIndex - 1,
        }));
        setSelectedAnswer(examSession.answers[examSession.currentIndex - 1] || "");
        setShowExplanation(false);
    };
    const resetExam = () => {
        setExamSession(null);
        setTimeElapsed(0);
        setIsTimerRunning(false);
        setShowExplanation(false);
        setSelectedAnswer("");
    };
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    const renderQuestion = (question) => {
        switch (question.questionType) {
            case "multiple-choice":
                return (_jsx("div", { className: "space-y-3", children: question.options.map((option, index) => (_jsxs(Button, { variant: selectedAnswer === option ? "default" : "outline", className: `w-full justify-start text-left p-4 h-auto ${selectedAnswer === option ? "bg-blue-500 text-white" : ""}`, onClick: () => setSelectedAnswer(option), disabled: showExplanation, children: [_jsxs("span", { className: "mr-3 font-bold", children: [String.fromCharCode(65 + index), "."] }), option] }, index))) }));
            case "multiple-response":
                return (_jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "Select all correct answers (2-3 options):" }), question.options.map((option, index) => (_jsxs(Button, { variant: selectedAnswer.includes(option) ? "default" : "outline", className: `w-full justify-start text-left p-4 h-auto ${selectedAnswer.includes(option) ? "bg-blue-500 text-white" : ""}`, onClick: () => {
                                const answers = selectedAnswer.split(',').filter(a => a);
                                if (answers.includes(option)) {
                                    setSelectedAnswer(answers.filter(a => a !== option).join(','));
                                }
                                else {
                                    setSelectedAnswer([...answers, option].join(','));
                                }
                            }, disabled: showExplanation, children: [_jsxs("span", { className: "mr-3 font-bold", children: [String.fromCharCode(65 + index), "."] }), option] }, index)))] }));
            default:
                return (_jsx("div", { className: "space-y-3", children: question.options.map((option, index) => (_jsxs(Button, { variant: selectedAnswer === option ? "default" : "outline", className: `w-full justify-start text-left p-4 h-auto ${selectedAnswer === option ? "bg-blue-500 text-white" : ""}`, onClick: () => setSelectedAnswer(option), disabled: showExplanation, children: [_jsxs("span", { className: "mr-3 font-bold", children: [String.fromCharCode(65 + index), "."] }), option] }, index))) }));
        }
    };
    if (isLoading) {
        return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Loading NREMT Practice Module..." }) }), _jsx("div", { className: "flex justify-center items-center py-8", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) })] }) }));
    }
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-5xl max-h-[95vh]", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Brain, { className: "h-6 w-6 text-blue-500" }), "2025 NREMT Practice Exam"] }) }), _jsx(ScrollArea, { className: "h-[80vh]", children: _jsx("div", { className: "p-6 space-y-6", children: !examSession ? (
                        /* Exam Setup */
                        _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Target, { className: "h-5 w-5" }), "Select Scope of Practice"] }) }), _jsx(CardContent, { children: _jsxs(Select, { value: selectedScope, onValueChange: setSelectedScope, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Choose your scope" }) }), _jsx(SelectContent, { children: Object.entries(SCOPE_INFO).map(([key, info]) => (_jsxs(SelectItem, { value: key, children: [info.name, " (", info.questions, " questions)"] }, key))) })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(BookOpen, { className: "h-5 w-5" }), "Exam Information"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Questions:" }), _jsx("span", { children: SCOPE_INFO[selectedScope].questions })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Time Limit:" }), _jsx("span", { children: "No limit (timed)" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Passing Score:" }), _jsx("span", { children: "70%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Format:" }), _jsx("span", { children: "2025 NREMT Style" })] })] }) })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Content Areas" }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: Object.entries(CONTENT_AREAS).map(([key, name]) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: "outline", children: key }), _jsx("span", { className: "text-sm", children: name })] }, key))) }) })] }), _jsx("div", { className: "text-center", children: _jsxs(Button, { onClick: startExam, className: "bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg", children: [_jsx(Trophy, { className: "h-5 w-5 mr-2" }), "Start ", selectedScope, " Practice Exam"] }) })] })) : examSession.isComplete ? (
                        /* Exam Results */
                        _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Trophy, { className: "h-6 w-6 text-yellow-500" }), "Exam Complete!"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "text-center space-y-4", children: [_jsxs("div", { className: "text-6xl font-bold text-blue-500", children: [Math.round((examSession.score / examSession.questions.length) * 100), "%"] }), _jsxs("div", { className: "text-xl", children: [examSession.score, " / ", examSession.questions.length, " correct"] }), _jsx("div", { className: "flex justify-center", children: _jsx(Badge, { className: `text-lg px-4 py-2 ${(examSession.score / examSession.questions.length) >= 0.7
                                                                ? "bg-green-500 text-white"
                                                                : "bg-red-500 text-white"}`, children: (examSession.score / examSession.questions.length) >= 0.7 ? "PASSED" : "FAILED" }) }), _jsxs("div", { className: "text-muted-foreground", children: ["Time: ", formatTime(examSession.timeSpent)] })] }) })] }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsxs(Button, { onClick: resetExam, variant: "outline", children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-2" }), "Take Another Exam"] }), _jsx(Button, { onClick: () => onOpenChange(false), children: "Close" })] })] })) : (
                        /* Active Exam */
                        _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Badge, { className: `${SCOPE_INFO[examSession.scope].color} text-white`, children: examSession.scope }), _jsxs("span", { className: "text-sm text-muted-foreground", children: ["Question ", examSession.currentIndex + 1, " of ", examSession.questions.length] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-4 w-4" }), formatTime(timeElapsed)] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Trophy, { className: "h-4 w-4" }), examSession.score, "/", examSession.currentIndex + (showExplanation ? 1 : 0)] })] })] }), _jsx(Progress, { value: (examSession.currentIndex / examSession.questions.length) * 100, className: "h-2" }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Badge, { variant: "outline", children: examSession.questions[examSession.currentIndex].contentArea }), _jsx(Badge, { variant: "outline", children: examSession.questions[examSession.currentIndex].questionType }), _jsx(Badge, { variant: "outline", children: examSession.questions[examSession.currentIndex].difficulty })] }), examSession.questions[examSession.currentIndex].scenario && (_jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-4", children: [_jsx("p", { className: "text-sm font-medium text-blue-800", children: "Scenario:" }), _jsx("p", { className: "text-sm text-blue-700", children: examSession.questions[examSession.currentIndex].scenario })] })), _jsx(CardTitle, { className: "text-lg", children: examSession.questions[examSession.currentIndex].questionText })] }), _jsx(CardContent, { children: renderQuestion(examSession.questions[examSession.currentIndex]) })] }), showExplanation && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [selectedAnswer === examSession.questions[examSession.currentIndex].correctAnswer ? (_jsx(CheckCircle, { className: "h-5 w-5 text-green-500" })) : (_jsx(XCircle, { className: "h-5 w-5 text-red-500" })), selectedAnswer === examSession.questions[examSession.currentIndex].correctAnswer ? "Correct!" : "Incorrect"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("p", { className: "text-sm", children: [_jsx("span", { className: "font-medium", children: "Correct Answer:" }), " ", examSession.questions[examSession.currentIndex].correctAnswer] }), _jsxs("p", { className: "text-sm", children: [_jsx("span", { className: "font-medium", children: "Explanation:" }), " ", examSession.questions[examSession.currentIndex].explanation] }), examSession.questions[examSession.currentIndex].protocolReference && (_jsxs("p", { className: "text-sm", children: [_jsx("span", { className: "font-medium", children: "Protocol Reference:" }), " ", examSession.questions[examSession.currentIndex].protocolReference] }))] }) })] })), _jsxs("div", { className: "flex justify-between", children: [_jsxs(Button, { variant: "outline", onClick: previousQuestion, disabled: examSession.currentIndex === 0, children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Previous"] }), _jsx("div", { className: "flex gap-2", children: !showExplanation ? (_jsx(Button, { onClick: submitAnswer, disabled: !selectedAnswer, className: "bg-blue-500 hover:bg-blue-600 text-white", children: "Submit Answer" })) : (_jsxs(Button, { onClick: nextQuestion, className: "bg-green-500 hover:bg-green-600 text-white", children: [examSession.currentIndex === examSession.questions.length - 1 ? "Finish Exam" : "Next Question", _jsx(ArrowRight, { className: "h-4 w-4 ml-2" })] })) })] })] })) }) })] }) }));
}
