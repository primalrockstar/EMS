import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw, ChevronLeft, ChevronRight, Shuffle, Brain, CheckCircle, XCircle, Trophy } from "lucide-react";
export default function FlashcardViewer({ open, onOpenChange }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, total: 0 });
    const [studyMode, setStudyMode] = useState('all');
    const [filterValue, setFilterValue] = useState('');
    const [showStats, setShowStats] = useState(false);
    const { data: flashcards, isLoading } = useQuery({
        queryKey: ["/api/flashcards"],
        queryFn: async () => {
            const response = await fetch("/api/flashcards");
            return response.json();
        },
    });
    const getFilteredCards = () => {
        if (!flashcards)
            return [];
        return flashcards.filter((card) => {
            if (studyMode === 'all')
                return true;
            if (studyMode === 'chapter' && filterValue) {
                return card.chapterNumber === parseInt(filterValue);
            }
            if (studyMode === 'difficulty' && filterValue) {
                return card.difficulty === filterValue;
            }
            if (studyMode === 'scope' && filterValue) {
                return card.tags.some(tag => tag.includes(filterValue));
            }
            return true;
        });
    };
    const filteredCards = getFilteredCards();
    const currentCard = filteredCards[currentIndex];
    const shuffleCards = () => {
        setCurrentIndex(0);
        setIsFlipped(false);
    };
    const nextCard = () => {
        if (filteredCards.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
            setIsFlipped(false);
        }
    };
    const prevCard = () => {
        if (filteredCards.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
            setIsFlipped(false);
        }
    };
    const markCorrect = () => {
        setSessionStats(prev => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
        setTimeout(nextCard, 500);
    };
    const markIncorrect = () => {
        setSessionStats(prev => ({ ...prev, incorrect: prev.incorrect + 1, total: prev.total + 1 }));
        setTimeout(nextCard, 500);
    };
    const resetSession = () => {
        setCurrentIndex(0);
        setIsFlipped(false);
        setSessionStats({ correct: 0, incorrect: 0, total: 0 });
    };
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'basic':
                return 'bg-green-100 text-green-800';
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-800';
            case 'advanced':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const getScopeFromTags = (tags) => {
        if (tags.includes('EMT-B'))
            return 'EMT-B';
        if (tags.includes('AEMT'))
            return 'AEMT';
        if (tags.includes('Paramedic'))
            return 'Paramedic';
        return 'General';
    };
    const getScopeColor = (scope) => {
        switch (scope) {
            case 'EMT-B':
                return 'bg-blue-100 text-blue-800';
            case 'AEMT':
                return 'bg-orange-100 text-orange-800';
            case 'Paramedic':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const accuracy = sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0;
    if (isLoading) {
        return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-4xl", "aria-describedby": "flashcard-loading-description", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Loading Flashcards..." }), _jsx("div", { id: "flashcard-loading-description", className: "text-sm text-muted-foreground", children: "Loading medication flashcards for study" })] }), _jsx("div", { className: "flex items-center justify-center p-8", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) })] }) }));
    }
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] p-0", "aria-describedby": "flashcard-main-description", children: [_jsxs(DialogHeader, { className: "p-6 pb-0", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Brain, { className: "h-5 w-5 text-primary" }), "Medication Flashcards"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => setShowStats(!showStats), children: [_jsx(Trophy, { className: "h-4 w-4 mr-2" }), "Stats"] })] }), _jsx("div", { id: "flashcard-main-description", className: "text-sm text-muted-foreground", children: "Study medication flashcards with multiple modes and progress tracking" })] }), _jsxs("div", { className: "p-6 pt-0", children: [_jsxs("div", { className: "mb-6 grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs(Select, { value: studyMode, onValueChange: (value) => setStudyMode(value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Study mode" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Cards" }), _jsx(SelectItem, { value: "chapter", children: "By Chapter" }), _jsx(SelectItem, { value: "difficulty", children: "By Difficulty" }), _jsx(SelectItem, { value: "scope", children: "By Scope" })] })] }), studyMode !== 'all' && (_jsxs(Select, { value: filterValue, onValueChange: setFilterValue, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: `Select ${studyMode}` }) }), _jsxs(SelectContent, { children: [studyMode === 'chapter' && (_jsx(SelectItem, { value: "12", children: "Chapter 12 - Pharmacology" })), studyMode === 'difficulty' && (_jsxs(_Fragment, { children: [_jsx(SelectItem, { value: "basic", children: "Basic" }), _jsx(SelectItem, { value: "intermediate", children: "Intermediate" }), _jsx(SelectItem, { value: "advanced", children: "Advanced" })] })), studyMode === 'scope' && (_jsxs(_Fragment, { children: [_jsx(SelectItem, { value: "EMT-B", children: "EMT-B" }), _jsx(SelectItem, { value: "AEMT", children: "AEMT" }), _jsx(SelectItem, { value: "Paramedic", children: "Paramedic" })] }))] })] })), _jsxs(Button, { onClick: shuffleCards, variant: "outline", className: "flex items-center gap-2", children: [_jsx(Shuffle, { className: "h-4 w-4" }), "Shuffle"] })] }), showStats && (_jsx(Card, { className: "mb-6 bg-gradient-to-r from-blue-50 to-purple-50", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: sessionStats.correct }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Correct" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-red-600", children: sessionStats.incorrect }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Incorrect" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: sessionStats.total }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Total" })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-2xl font-bold text-purple-600", children: [accuracy, "%"] }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Accuracy" })] })] }), _jsx("div", { className: "mt-4", children: _jsx(Progress, { value: accuracy, className: "w-full" }) })] }) })), _jsxs("div", { className: "mb-6 flex items-center justify-between", children: [_jsxs("div", { className: "text-sm text-muted-foreground", children: ["Card ", currentIndex + 1, " of ", filteredCards.length] }), _jsx(Progress, { value: filteredCards.length > 0 ? ((currentIndex + 1) / filteredCards.length) * 100 : 0, className: "w-32" })] }), currentCard && (_jsx("div", { className: "mb-6", children: _jsxs(Card, { className: `min-h-[400px] cursor-pointer transition-all duration-300 ${isFlipped ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-gradient-to-br from-white to-gray-50'}`, onClick: () => setIsFlipped(!isFlipped), children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { className: getDifficultyColor(currentCard.difficulty), children: currentCard.difficulty }), _jsx(Badge, { className: getScopeColor(getScopeFromTags(currentCard.tags)), children: getScopeFromTags(currentCard.tags) }), _jsx(Badge, { variant: "outline", children: currentCard.category })] }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Click to flip" })] }) }), _jsx(CardContent, { className: "pt-0", children: _jsx("div", { className: "min-h-[300px] flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-semibold mb-4", children: isFlipped ? 'Answer' : 'Question' }), _jsx("div", { className: "text-base leading-relaxed", children: isFlipped ? currentCard.answer : currentCard.question })] }) }) })] }) })), filteredCards.length === 0 && (_jsx(Card, { className: "mb-6", children: _jsx(CardContent, { className: "p-8 text-center", children: _jsx("div", { className: "text-muted-foreground", children: "No flashcards found for the selected filters." }) }) })), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { onClick: prevCard, variant: "outline", size: "sm", disabled: filteredCards.length === 0, children: [_jsx(ChevronLeft, { className: "h-4 w-4" }), "Previous"] }), _jsxs(Button, { onClick: nextCard, variant: "outline", size: "sm", disabled: filteredCards.length === 0, children: ["Next", _jsx(ChevronRight, { className: "h-4 w-4" })] })] }), isFlipped && currentCard && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { onClick: markIncorrect, variant: "outline", size: "sm", className: "text-red-600 hover:text-red-700 hover:bg-red-50", children: [_jsx(XCircle, { className: "h-4 w-4 mr-1" }), "Incorrect"] }), _jsxs(Button, { onClick: markCorrect, variant: "outline", size: "sm", className: "text-green-600 hover:text-green-700 hover:bg-green-50", children: [_jsx(CheckCircle, { className: "h-4 w-4 mr-1" }), "Correct"] })] })), _jsxs(Button, { onClick: resetSession, variant: "outline", size: "sm", className: "text-gray-600 hover:text-gray-700", children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-1" }), "Reset"] })] }), currentCard && (_jsx(Card, { className: "mt-6 bg-muted/20", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "text-sm space-y-2", children: [_jsxs("div", { children: [_jsx("strong", { children: "Chapter:" }), " ", currentCard.chapterNumber] }), _jsxs("div", { children: [_jsx("strong", { children: "Tags:" }), " ", currentCard.tags.join(', ')] }), _jsxs("div", { children: [_jsx("strong", { children: "Study Level:" }), " ", getScopeFromTags(currentCard.tags)] })] }) }) }))] })] }) }));
}
