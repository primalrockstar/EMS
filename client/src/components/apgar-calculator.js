import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
export default function ApgarCalculator({ open, onOpenChange }) {
    const [scores, setScores] = useState({
        appearance: 0,
        pulse: 0,
        grimace: 0,
        activity: 0,
        respiratory: 0,
    });
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const getInterpretation = (score) => {
        if (score >= 8)
            return { text: "Normal", color: "text-green-600" };
        if (score >= 4)
            return { text: "Moderately Abnormal", color: "text-yellow-600" };
        return { text: "Severely Abnormal", color: "text-red-600" };
    };
    const interpretation = getInterpretation(totalScore);
    const saveMutation = useMutation({
        mutationFn: async () => {
            return await apiRequest('POST', '/api/calculator-results', {
                calculatorType: 'apgar',
                inputs: scores,
                result: { score: totalScore, interpretation: interpretation.text },
                userId: 1
            });
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "APGAR score saved successfully",
            });
            queryClient.invalidateQueries({ queryKey: ['/api/calculator-results'] });
            onOpenChange(false);
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message || "Failed to save APGAR score",
                variant: "destructive",
            });
        },
    });
    const apgarCriteria = [
        {
            name: "appearance",
            label: "Appearance",
            options: [
                { value: 0, label: "Blue/Pale" },
                { value: 1, label: "Extremities Blue" },
                { value: 2, label: "Pink" },
            ],
        },
        {
            name: "pulse",
            label: "Pulse",
            options: [
                { value: 0, label: "Absent" },
                { value: 1, label: "<100 bpm" },
                { value: 2, label: ">100 bpm" },
            ],
        },
        {
            name: "grimace",
            label: "Grimace",
            options: [
                { value: 0, label: "No Response" },
                { value: 1, label: "Grimace" },
                { value: 2, label: "Cry/Cough" },
            ],
        },
        {
            name: "activity",
            label: "Activity",
            options: [
                { value: 0, label: "Limp" },
                { value: 1, label: "Some Flexion" },
                { value: 2, label: "Active Motion" },
            ],
        },
        {
            name: "respiratory",
            label: "Respiratory",
            options: [
                { value: 0, label: "Absent" },
                { value: 1, label: "Weak Cry" },
                { value: 2, label: "Strong Cry" },
            ],
        },
    ];
    const handleScoreChange = (criterion, value) => {
        setScores(prev => ({ ...prev, [criterion]: value }));
    };
    const resetScores = () => {
        setScores({
            appearance: 0,
            pulse: 0,
            grimace: 0,
            activity: 0,
            respiratory: 0,
        });
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-md", "aria-describedby": "apgar-calculator-description", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "APGAR Score Calculator" }), _jsx("div", { id: "apgar-calculator-description", className: "text-sm text-muted-foreground", children: "Assess newborn health status using the APGAR scoring system" })] }), _jsxs("div", { className: "space-y-4", children: [apgarCriteria.map((criterion) => (_jsxs("div", { children: [_jsxs(Label, { className: "text-sm font-medium mb-2 block", children: [criterion.label, " (0-2)"] }), _jsx("div", { className: "flex space-x-2", children: criterion.options.map((option) => (_jsx(Button, { variant: scores[criterion.name] === option.value ? "default" : "outline", className: "flex-1 text-xs p-2 h-auto", onClick: () => handleScoreChange(criterion.name, option.value), children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "font-medium", children: option.value }), _jsx("div", { className: "text-xs", children: option.label })] }) }, option.value))) })] }, criterion.name))), _jsx(Card, { className: "bg-muted/50", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-primary mb-1", children: ["Score: ", totalScore, "/10"] }), _jsx("div", { className: `text-sm font-medium ${interpretation.color}`, children: interpretation.text })] }) }), _jsxs("div", { className: "flex space-x-3", children: [_jsxs(Button, { onClick: () => saveMutation.mutate(), disabled: saveMutation.isPending, className: "flex-1", children: [_jsx(Save, { className: "h-4 w-4 mr-2" }), saveMutation.isPending ? 'Saving...' : 'Save Result'] }), _jsx(Button, { variant: "outline", onClick: resetScores, className: "flex-1", children: "Reset" })] })] })] }) }));
}
