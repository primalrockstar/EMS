import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, Lock, Play, Trophy, Star, Clock, Target } from "lucide-react";
import { learningPaths, availableBadges, getUserProgress } from "@/data/learning-paths";
export default function LearningPaths({ open, onOpenChange }) {
    const [selectedPath, setSelectedPath] = useState(null);
    const userProgress = getUserProgress();
    const handlePathSelect = (path) => {
        setSelectedPath(path);
    };
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner': return 'bg-green-500';
            case 'intermediate': return 'bg-yellow-500';
            case 'advanced': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };
    const getModuleIcon = (type) => {
        switch (type) {
            case 'reference': return _jsx(Star, { className: "h-4 w-4" });
            case 'scenario': return _jsx(Play, { className: "h-4 w-4" });
            case 'simulation': return _jsx(Target, { className: "h-4 w-4" });
            case 'anatomy': return _jsx(Trophy, { className: "h-4 w-4" });
            case 'quiz': return _jsx(CheckCircle, { className: "h-4 w-4" });
            default: return _jsx(Star, { className: "h-4 w-4" });
        }
    };
    const getPathProgress = (path) => {
        const completed = path.modules.filter(m => m.completed).length;
        return (completed / path.modules.length) * 100;
    };
    const getTotalPoints = (path) => {
        return path.modules.reduce((sum, module) => sum + module.points, 0);
    };
    const getEarnedPoints = (path) => {
        return path.modules.filter(m => m.completed).reduce((sum, module) => sum + module.points, 0);
    };
    const isPathUnlocked = (path) => {
        if (path.prerequisites.length === 0)
            return true;
        // Check if all prerequisites are completed
        return path.prerequisites.every(prereq => {
            const prerequisitePath = learningPaths.find(p => p.id === prereq);
            return prerequisitePath && getPathProgress(prerequisitePath) === 100;
        });
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-6xl max-h-[95vh]", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center", children: [_jsx(Trophy, { className: "h-5 w-5 mr-2" }), "Gamified Learning Paths"] }) }), _jsx("div", { className: "h-[80vh] overflow-y-auto", children: !selectedPath ? (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Star, { className: "h-5 w-5 mr-2" }), "Your Progress"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: userProgress.totalPoints }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Total Points" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: userProgress.completedModules }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Modules Completed" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-yellow-600", children: userProgress.earnedBadges }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Badges Earned" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: userProgress.currentLevel }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Current Level" })] })] }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Choose Your Learning Path" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: learningPaths.map((path) => {
                                            const isUnlocked = isPathUnlocked(path);
                                            const progress = getPathProgress(path);
                                            const earnedPoints = getEarnedPoints(path);
                                            const totalPoints = getTotalPoints(path);
                                            return (_jsxs(Card, { className: `cursor-pointer transition-all ${isUnlocked
                                                    ? 'hover:shadow-md'
                                                    : 'opacity-50 cursor-not-allowed'}`, onClick: () => isUnlocked && handlePathSelect(path), children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "text-2xl mr-2", children: path.badge.icon }), _jsx(Badge, { className: `${getDifficultyColor(path.difficulty)} text-white`, children: path.difficulty })] }), !isUnlocked && _jsx(Lock, { className: "h-5 w-5 text-gray-400" })] }), _jsx(CardTitle, { className: "text-lg", children: path.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: path.description })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Progress" }), _jsxs("span", { children: [Math.round(progress), "%"] })] }), _jsx(Progress, { value: progress })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Clock, { className: "h-4 w-4 mr-1 text-gray-400" }), _jsx("span", { children: path.estimatedTime })] }), _jsxs("div", { className: "flex items-center", children: [_jsx(Star, { className: "h-4 w-4 mr-1 text-yellow-500" }), _jsxs("span", { children: [earnedPoints, "/", totalPoints, " pts"] })] })] }), _jsxs("div", { className: "space-y-1", children: [_jsxs("p", { className: "text-sm font-medium", children: ["Modules (", path.modules.length, ")"] }), _jsx("div", { className: "flex flex-wrap gap-1", children: path.modules.map((module) => (_jsxs(Badge, { variant: module.completed ? "default" : "outline", className: "text-xs", children: [module.completed && _jsx(CheckCircle, { className: "h-3 w-3 mr-1" }), getModuleIcon(module.type)] }, module.id))) })] }), path.prerequisites.length > 0 && (_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm font-medium", children: "Prerequisites" }), _jsx("div", { className: "flex flex-wrap gap-1", children: path.prerequisites.map((prereq) => {
                                                                                const prerequisitePath = learningPaths.find(p => p.id === prereq);
                                                                                const isCompleted = prerequisitePath && getPathProgress(prerequisitePath) === 100;
                                                                                return (_jsxs(Badge, { variant: isCompleted ? "default" : "destructive", className: "text-xs", children: [isCompleted && _jsx(CheckCircle, { className: "h-3 w-3 mr-1" }), prerequisitePath?.name || prereq] }, prereq));
                                                                            }) })] }))] }) })] }, path.id));
                                        }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Trophy, { className: "h-5 w-5 mr-2" }), "Available Badges"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: availableBadges.map((badge) => (_jsxs("div", { className: `p-4 rounded-lg border-2 ${badge.earned
                                                    ? 'border-green-300 bg-green-50'
                                                    : 'border-gray-200 bg-gray-50'}`, children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx("span", { className: "text-2xl mr-2", children: badge.icon }), _jsxs("div", { children: [_jsx("div", { className: `font-medium ${badge.earned ? 'text-green-800' : 'text-gray-600'}`, children: badge.name }), badge.earned && (_jsxs("div", { className: "text-xs text-green-600", children: ["Earned ", badge.earnedDate?.toLocaleDateString()] }))] })] }), _jsx("p", { className: `text-sm ${badge.earned ? 'text-green-700' : 'text-gray-500'}`, children: badge.description })] }, badge.id))) }) })] })] })) : (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-2xl font-bold flex items-center", children: [_jsx("span", { className: "text-3xl mr-2", children: selectedPath.badge.icon }), selectedPath.name] }), _jsx("p", { className: "text-muted-foreground", children: selectedPath.description }), _jsxs("div", { className: "flex items-center mt-2 space-x-4", children: [_jsx(Badge, { className: `${getDifficultyColor(selectedPath.difficulty)} text-white`, children: selectedPath.difficulty }), _jsxs("span", { className: "text-sm text-muted-foreground flex items-center", children: [_jsx(Clock, { className: "h-4 w-4 mr-1" }), selectedPath.estimatedTime] })] })] }), _jsx(Button, { variant: "outline", onClick: () => setSelectedPath(null), children: "Back to Paths" })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Path Progress" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Overall Progress" }), _jsxs("span", { children: [Math.round(getPathProgress(selectedPath)), "%"] })] }), _jsx(Progress, { value: getPathProgress(selectedPath) }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Points Earned" }), _jsxs("span", { children: [getEarnedPoints(selectedPath), " / ", getTotalPoints(selectedPath)] })] })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Learning Modules" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: selectedPath.modules.map((module, index) => (_jsx("div", { className: `p-4 rounded-lg border-2 ${module.completed
                                                    ? 'border-green-300 bg-green-50'
                                                    : 'border-gray-200 bg-gray-50'}`, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center mr-3 ${module.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`, children: module.completed ? _jsx(CheckCircle, { className: "h-4 w-4" }) : index + 1 }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: module.name }), _jsxs("div", { className: "text-sm text-muted-foreground capitalize", children: [module.type, " \u2022 ", module.points, " points"] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [getModuleIcon(module.type), _jsx(Button, { size: "sm", variant: module.completed ? "secondary" : "default", disabled: module.completed, children: module.completed ? "Completed" : "Start" })] })] }) }, module.id))) }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Path Completion Reward" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg", children: [_jsx("span", { className: "text-4xl mr-4", children: selectedPath.badge.icon }), _jsxs("div", { children: [_jsx("div", { className: "font-bold text-lg", children: selectedPath.badge.name }), _jsxs("div", { className: "text-sm text-muted-foreground", children: ["Complete all modules to earn this badge and ", getTotalPoints(selectedPath), " points"] })] })] }) })] })] })) })] }) }));
}
