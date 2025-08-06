import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Droplets, Calculator, Clock, AlertCircle, RotateCcw } from "lucide-react";
export default function IVDripCalculator({ open, onOpenChange }) {
    const [volumeToInfuse, setVolumeToInfuse] = useState("");
    const [infusionTime, setInfusionTime] = useState("");
    const [timeUnit, setTimeUnit] = useState("hours");
    const [dropFactor, setDropFactor] = useState("15");
    const [results, setResults] = useState({
        flowRate: 0,
        dropsPerMinute: 0,
        totalTime: 0,
        infusionRate: 0
    });
    const [calculationHistory, setCalculationHistory] = useState([]);
    const dropFactors = [
        { value: "10", label: "10 gtt/mL (Standard)" },
        { value: "15", label: "15 gtt/mL (Standard)" },
        { value: "20", label: "20 gtt/mL (Standard)" },
        { value: "60", label: "60 gtt/mL (Micro-drip)" }
    ];
    const calculateDripRate = () => {
        const volume = parseFloat(volumeToInfuse);
        const time = parseFloat(infusionTime);
        const factor = parseFloat(dropFactor);
        if (!volume || !time || volume <= 0 || time <= 0) {
            alert("Please enter valid positive numbers for volume and time");
            return;
        }
        // Convert time to minutes
        const timeInMinutes = timeUnit === "hours" ? time * 60 : time;
        const timeInHours = timeUnit === "hours" ? time : time / 60;
        // Calculate flow rate (mL/min)
        const flowRate = volume / timeInMinutes;
        // Calculate drops per minute
        const dropsPerMinute = Math.round((volume * factor) / timeInMinutes);
        // Calculate infusion rate (mL/hr)
        const infusionRate = Math.round(volume / timeInHours);
        const newResults = {
            flowRate: Math.round(flowRate * 100) / 100,
            dropsPerMinute,
            totalTime: timeInMinutes,
            infusionRate
        };
        setResults(newResults);
        // Add to history
        const calculation = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            volume,
            time,
            timeUnit,
            dropFactor: factor,
            results: newResults
        };
        setCalculationHistory(prev => [calculation, ...prev.slice(0, 4)]);
    };
    const clearCalculation = () => {
        setVolumeToInfuse("");
        setInfusionTime("");
        setTimeUnit("hours");
        setDropFactor("15");
        setResults({
            flowRate: 0,
            dropsPerMinute: 0,
            totalTime: 0,
            infusionRate: 0
        });
    };
    const getDripRateCategory = (dropsPerMinute) => {
        if (dropsPerMinute < 10)
            return { label: "Very Slow", color: "bg-blue-500" };
        if (dropsPerMinute < 30)
            return { label: "Slow", color: "bg-green-500" };
        if (dropsPerMinute < 60)
            return { label: "Moderate", color: "bg-yellow-500" };
        if (dropsPerMinute < 100)
            return { label: "Fast", color: "bg-orange-500" };
        return { label: "Very Fast", color: "bg-red-500" };
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] p-0", "aria-describedby": "iv-drip-calculator-description", children: [_jsxs(DialogHeader, { className: "p-6 pb-0", children: [_jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Droplets, { className: "h-5 w-5 text-blue-500" }), "IV Drip Rate Calculator"] }), _jsx("div", { id: "iv-drip-calculator-description", className: "text-sm text-muted-foreground", children: "Calculate intravenous fluid drip rates and infusion parameters" })] }), _jsxs("div", { className: "p-6 pt-0 space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Calculator, { className: "h-4 w-4" }), "Calculation Parameters"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "volume", children: "Volume to Infuse (mL)" }), _jsx(Input, { id: "volume", type: "number", placeholder: "e.g., 1000", value: volumeToInfuse, onChange: (e) => setVolumeToInfuse(e.target.value), className: "mt-1" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "time", children: "Infusion Time" }), _jsxs("div", { className: "flex gap-2 mt-1", children: [_jsx(Input, { id: "time", type: "number", placeholder: "e.g., 8", value: infusionTime, onChange: (e) => setInfusionTime(e.target.value), className: "flex-1" }), _jsxs(Select, { value: timeUnit, onValueChange: setTimeUnit, children: [_jsx(SelectTrigger, { className: "w-32", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "hours", children: "Hours" }), _jsx(SelectItem, { value: "minutes", children: "Minutes" })] })] })] })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx(Label, { htmlFor: "dropFactor", children: "Drop Factor" }), _jsxs(Select, { value: dropFactor, onValueChange: setDropFactor, children: [_jsx(SelectTrigger, { className: "mt-1", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: dropFactors.map((factor) => (_jsx(SelectItem, { value: factor.value, children: factor.label }, factor.value))) })] })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: calculateDripRate, className: "flex-1", children: [_jsx(Calculator, { className: "h-4 w-4 mr-2" }), "Calculate"] }), _jsxs(Button, { onClick: clearCalculation, variant: "outline", children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-2" }), "Clear"] })] })] })] }), results.dropsPerMinute > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Droplets, { className: "h-4 w-4" }), "Calculation Results"] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: [_jsxs("div", { className: "text-center p-4 bg-blue-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: results.dropsPerMinute }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Drops per minute" })] }), _jsxs("div", { className: "text-center p-4 bg-green-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: results.flowRate }), _jsx("div", { className: "text-sm text-muted-foreground", children: "mL per minute" })] }), _jsxs("div", { className: "text-center p-4 bg-purple-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: results.infusionRate }), _jsx("div", { className: "text-sm text-muted-foreground", children: "mL per hour" })] }), _jsxs("div", { className: "text-center p-4 bg-orange-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-orange-600", children: Math.round(results.totalTime) }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Total minutes" })] })] }), _jsx("div", { className: "flex items-center justify-center gap-2 mb-4", children: _jsxs(Badge, { className: `${getDripRateCategory(results.dropsPerMinute).color} text-white`, children: [getDripRateCategory(results.dropsPerMinute).label, " Drip Rate"] }) }), _jsx("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-yellow-600 mt-0.5" }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-yellow-800", children: "Clinical Notes:" }), _jsxs("ul", { className: "text-sm text-yellow-700 mt-1 space-y-1", children: [_jsx("li", { children: "\u2022 Monitor patient regularly during infusion" }), _jsx("li", { children: "\u2022 Adjust rate if patient shows signs of fluid overload" }), _jsx("li", { children: "\u2022 Verify drop factor with IV tubing packaging" }), _jsx("li", { children: "\u2022 Consider patient condition and fluid tolerance" })] })] })] }) })] })] })), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-4 w-4" }), "Quick Reference"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Common Drop Factors" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Standard IV tubing:" }), _jsx("span", { children: "10-20 gtt/mL" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Micro-drip tubing:" }), _jsx("span", { children: "60 gtt/mL" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Blood tubing:" }), _jsx("span", { children: "10-15 gtt/mL" })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Typical Infusion Rates" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Maintenance fluid:" }), _jsx("span", { children: "75-125 mL/hr" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Fluid resuscitation:" }), _jsx("span", { children: "250-500 mL/hr" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Blood transfusion:" }), _jsx("span", { children: "100-200 mL/hr" })] })] })] })] }) })] }), calculationHistory.length > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Recent Calculations" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: calculationHistory.map((calc) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-muted rounded-lg", children: [_jsxs("div", { className: "text-sm", children: [_jsxs("div", { className: "font-medium", children: [calc.volume, " mL over ", calc.time, " ", calc.timeUnit] }), _jsx("div", { className: "text-muted-foreground", children: calc.timestamp })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "font-bold text-primary", children: [calc.results.dropsPerMinute, " gtt/min"] }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [calc.results.infusionRate, " mL/hr"] })] })] }, calc.id))) }) })] }))] })] }) }));
}
