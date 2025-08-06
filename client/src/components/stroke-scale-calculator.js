import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain } from "lucide-react";
export default function StrokeScaleCalculator({ open, onOpenChange }) {
    const [fastResults, setFastResults] = useState({
        face: false,
        arms: false,
        speech: false,
        time: ""
    });
    const [befast, setBefast] = useState({
        balance: false,
        eyes: false,
        face: false,
        arms: false,
        speech: false,
        time: ""
    });
    const calculateFAST = () => {
        const positiveFindings = [fastResults.face, fastResults.arms, fastResults.speech].filter(Boolean).length;
        return {
            score: positiveFindings,
            interpretation: positiveFindings > 0 ? "Positive for stroke" : "Negative for stroke",
            recommendations: positiveFindings > 0 ? [
                "Activate stroke protocol immediately",
                "Note exact time of onset",
                "Prepare for rapid transport",
                "Notify receiving facility",
                "Consider stroke center destination"
            ] : [
                "Continue assessment for other causes",
                "Monitor for symptom development",
                "Document findings thoroughly",
                "Consider other neurological causes"
            ]
        };
    };
    const calculateBEFAST = () => {
        const positiveFindings = [befast.balance, befast.eyes, befast.face, befast.arms, befast.speech].filter(Boolean).length;
        return {
            score: positiveFindings,
            interpretation: positiveFindings > 0 ? "Positive for stroke" : "Negative for stroke",
            recommendations: positiveFindings > 0 ? [
                "Activate stroke protocol immediately",
                "Note exact time of onset",
                "Prepare for rapid transport to stroke center",
                "Notify receiving facility with findings",
                "Consider advanced stroke center if available"
            ] : [
                "Continue comprehensive assessment",
                "Monitor for symptom development",
                "Document all findings",
                "Consider other neurological causes"
            ]
        };
    };
    const reset = () => {
        setFastResults({ face: false, arms: false, speech: false, time: "" });
        setBefast({ balance: false, eyes: false, face: false, arms: false, speech: false, time: "" });
    };
    const fastResult = calculateFAST();
    const befastResult = calculateBEFAST();
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Brain, { className: "h-5 w-5" }), "Stroke Assessment Scale"] }) }), _jsxs(Tabs, { defaultValue: "fast", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "fast", children: "FAST Scale" }), _jsx(TabsTrigger, { value: "befast", children: "BE-FAST Scale" }), _jsx(TabsTrigger, { value: "reference", children: "Reference" })] }), _jsx(TabsContent, { value: "fast", className: "space-y-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "FAST Assessment" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 gap-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", id: "fast-face", checked: fastResults.face, onChange: (e) => setFastResults({ ...fastResults, face: e.target.checked }), className: "h-4 w-4" }), _jsxs("label", { htmlFor: "fast-face", className: "text-sm font-medium", children: [_jsx("strong", { children: "F - Face:" }), " Facial droop, asymmetry, or inability to smile"] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", id: "fast-arms", checked: fastResults.arms, onChange: (e) => setFastResults({ ...fastResults, arms: e.target.checked }), className: "h-4 w-4" }), _jsxs("label", { htmlFor: "fast-arms", className: "text-sm font-medium", children: [_jsx("strong", { children: "A - Arms:" }), " Arm weakness, drift, or inability to raise both arms"] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", id: "fast-speech", checked: fastResults.speech, onChange: (e) => setFastResults({ ...fastResults, speech: e.target.checked }), className: "h-4 w-4" }), _jsxs("label", { htmlFor: "fast-speech", className: "text-sm font-medium", children: [_jsx("strong", { children: "S - Speech:" }), " Slurred speech, difficulty speaking, or understanding"] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "text", id: "fast-time", value: fastResults.time, onChange: (e) => setFastResults({ ...fastResults, time: e.target.value }), placeholder: "Time of onset", className: "p-2 border rounded" }), _jsxs("label", { htmlFor: "fast-time", className: "text-sm font-medium", children: [_jsx("strong", { children: "T - Time:" }), " Note exact time of symptom onset"] })] })] }), _jsxs("div", { className: "mt-4 p-4 bg-gray-50 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "font-semibold", children: ["FAST Score: ", fastResult.score, "/3"] }), _jsx("div", { className: "text-sm text-muted-foreground", children: fastResult.interpretation })] }), _jsx(Badge, { className: fastResult.score > 0 ? "bg-red-500" : "bg-green-500", children: fastResult.score > 0 ? "POSITIVE" : "NEGATIVE" })] }), _jsxs("div", { className: "mt-2", children: [_jsx("h4", { className: "font-semibold mb-1", children: "Recommendations:" }), _jsx("ul", { className: "text-sm space-y-1", children: fastResult.recommendations.map((rec, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary", children: "\u2022" }), _jsx("span", { children: rec })] }, index))) })] })] })] })] }) }), _jsx(TabsContent, { value: "befast", className: "space-y-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "BE-FAST Assessment" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 gap-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", id: "befast-balance", checked: befast.balance, onChange: (e) => setBefast({ ...befast, balance: e.target.checked }), className: "h-4 w-4" }), _jsxs("label", { htmlFor: "befast-balance", className: "text-sm font-medium", children: [_jsx("strong", { children: "B - Balance:" }), " Sudden loss of balance, coordination, or dizziness"] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", id: "befast-eyes", checked: befast.eyes, onChange: (e) => setBefast({ ...befast, eyes: e.target.checked }), className: "h-4 w-4" }), _jsxs("label", { htmlFor: "befast-eyes", className: "text-sm font-medium", children: [_jsx("strong", { children: "E - Eyes:" }), " Sudden vision loss or visual field defects"] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", id: "befast-face", checked: befast.face, onChange: (e) => setBefast({ ...befast, face: e.target.checked }), className: "h-4 w-4" }), _jsxs("label", { htmlFor: "befast-face", className: "text-sm font-medium", children: [_jsx("strong", { children: "F - Face:" }), " Facial droop, asymmetry, or inability to smile"] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", id: "befast-arms", checked: befast.arms, onChange: (e) => setBefast({ ...befast, arms: e.target.checked }), className: "h-4 w-4" }), _jsxs("label", { htmlFor: "befast-arms", className: "text-sm font-medium", children: [_jsx("strong", { children: "A - Arms:" }), " Arm weakness, drift, or inability to raise both arms"] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", id: "befast-speech", checked: befast.speech, onChange: (e) => setBefast({ ...befast, speech: e.target.checked }), className: "h-4 w-4" }), _jsxs("label", { htmlFor: "befast-speech", className: "text-sm font-medium", children: [_jsx("strong", { children: "S - Speech:" }), " Slurred speech, difficulty speaking, or understanding"] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "text", id: "befast-time", value: befast.time, onChange: (e) => setBefast({ ...befast, time: e.target.value }), placeholder: "Time of onset", className: "p-2 border rounded" }), _jsxs("label", { htmlFor: "befast-time", className: "text-sm font-medium", children: [_jsx("strong", { children: "T - Time:" }), " Note exact time of symptom onset"] })] })] }), _jsxs("div", { className: "mt-4 p-4 bg-gray-50 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "font-semibold", children: ["BE-FAST Score: ", befastResult.score, "/5"] }), _jsx("div", { className: "text-sm text-muted-foreground", children: befastResult.interpretation })] }), _jsx(Badge, { className: befastResult.score > 0 ? "bg-red-500" : "bg-green-500", children: befastResult.score > 0 ? "POSITIVE" : "NEGATIVE" })] }), _jsxs("div", { className: "mt-2", children: [_jsx("h4", { className: "font-semibold mb-1", children: "Recommendations:" }), _jsx("ul", { className: "text-sm space-y-1", children: befastResult.recommendations.map((rec, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary", children: "\u2022" }), _jsx("span", { children: rec })] }, index))) })] })] })] })] }) }), _jsx(TabsContent, { value: "reference", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Stroke Assessment Reference" }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "FAST Scale:" }), _jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Widely used for rapid stroke identification" }), _jsxs("ul", { className: "text-sm space-y-1", children: [_jsx("li", { children: "\u2022 Face: Facial droop" }), _jsx("li", { children: "\u2022 Arms: Arm weakness" }), _jsx("li", { children: "\u2022 Speech: Speech difficulty" }), _jsx("li", { children: "\u2022 Time: Time of onset" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "BE-FAST Scale:" }), _jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Enhanced version detecting more stroke types" }), _jsxs("ul", { className: "text-sm space-y-1", children: [_jsx("li", { children: "\u2022 Balance: Sudden loss" }), _jsx("li", { children: "\u2022 Eyes: Vision changes" }), _jsx("li", { children: "\u2022 Face: Facial droop" }), _jsx("li", { children: "\u2022 Arms: Arm weakness" }), _jsx("li", { children: "\u2022 Speech: Speech difficulty" }), _jsx("li", { children: "\u2022 Time: Time of onset" })] })] })] }), _jsxs("div", { className: "mt-4", children: [_jsx("h4", { className: "font-semibold mb-2", children: "Critical Actions:" }), _jsxs("ul", { className: "text-sm space-y-1", children: [_jsx("li", { children: "\u2022 Any positive finding = stroke alert" }), _jsx("li", { children: "\u2022 Document exact time of onset" }), _jsx("li", { children: "\u2022 Transport to stroke center if available" }), _jsx("li", { children: "\u2022 Notify receiving facility immediately" })] })] })] })] }) })] }), _jsx("div", { className: "flex gap-2 mt-4", children: _jsx(Button, { variant: "outline", onClick: reset, className: "flex-1", children: "Reset All" }) })] }) }));
}
