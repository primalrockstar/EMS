import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Calculator, AlertTriangle, RotateCcw, Gauge } from "lucide-react";
export default function OxygenTankCalculator({ open, onOpenChange }) {
    const [tankSize, setTankSize] = useState("E");
    const [currentPressure, setCurrentPressure] = useState("");
    const [flowRate, setFlowRate] = useState("");
    const [results, setResults] = useState({
        remainingTime: 0,
        remainingVolume: 0,
        consumptionRate: 0,
        timeToEmpty: 0
    });
    const [calculationHistory, setCalculationHistory] = useState([]);
    const tankSpecifications = {
        "D": { capacity: 425, servicePressure: 2200, weight: 3.5, portableUse: true },
        "E": { capacity: 680, servicePressure: 2200, weight: 5.5, portableUse: true },
        "M": { capacity: 3000, servicePressure: 2200, weight: 25, portableUse: false },
        "G": { capacity: 5300, servicePressure: 2200, weight: 45, portableUse: false },
        "H": { capacity: 6900, servicePressure: 2200, weight: 55, portableUse: false },
        "K": { capacity: 6900, servicePressure: 2200, weight: 55, portableUse: false }
    };
    const calculateOxygenDuration = () => {
        const pressure = parseFloat(currentPressure);
        const flow = parseFloat(flowRate);
        if (!pressure || !flow || pressure <= 0 || flow <= 0) {
            alert("Please enter valid pressure and flow rate values");
            return;
        }
        const tankSpec = tankSpecifications[tankSize];
        if (!tankSpec)
            return;
        // Calculate remaining volume: (Current Pressure / Service Pressure) × Tank Capacity
        const remainingVolume = (pressure / tankSpec.servicePressure) * tankSpec.capacity;
        // Calculate remaining time: Remaining Volume / Flow Rate
        const remainingTime = remainingVolume / flow;
        // Calculate consumption rate (L/min)
        const consumptionRate = flow;
        // Calculate time to empty from current pressure
        const timeToEmpty = remainingTime;
        const newResults = {
            remainingTime: Math.max(0, remainingTime),
            remainingVolume: Math.max(0, remainingVolume),
            consumptionRate,
            timeToEmpty: Math.max(0, timeToEmpty)
        };
        setResults(newResults);
        // Add to history
        const calculation = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            tankSize,
            currentPressure: pressure,
            flowRate: flow,
            results: newResults
        };
        setCalculationHistory(prev => [calculation, ...prev.slice(0, 4)]);
    };
    const clearCalculation = () => {
        setCurrentPressure("");
        setFlowRate("");
        setResults({
            remainingTime: 0,
            remainingVolume: 0,
            consumptionRate: 0,
            timeToEmpty: 0
        });
    };
    const formatTime = (minutes) => {
        if (minutes < 60) {
            return `${Math.round(minutes)} min`;
        }
        else {
            const hours = Math.floor(minutes / 60);
            const mins = Math.round(minutes % 60);
            return `${hours}h ${mins}m`;
        }
    };
    const getTimeAlert = (minutes) => {
        if (minutes < 15)
            return { level: "Critical", color: "bg-red-500" };
        if (minutes < 30)
            return { level: "Low", color: "bg-orange-500" };
        if (minutes < 60)
            return { level: "Moderate", color: "bg-yellow-500" };
        return { level: "Good", color: "bg-green-500" };
    };
    const getPressurePercentage = () => {
        if (!currentPressure || !tankSize)
            return 0;
        const pressure = parseFloat(currentPressure);
        const tankSpec = tankSpecifications[tankSize];
        return Math.min(100, (pressure / tankSpec.servicePressure) * 100);
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] p-0", "aria-describedby": "oxygen-tank-description", children: [_jsxs(DialogHeader, { className: "p-6 pb-0", children: [_jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-5 w-5 text-blue-500" }), "Oxygen Tank Duration Calculator"] }), _jsx("div", { id: "oxygen-tank-description", className: "text-sm text-muted-foreground", children: "Calculate remaining oxygen supply time and consumption rates" })] }), _jsxs("div", { className: "p-6 pt-0 space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Calculator, { className: "h-4 w-4" }), "Tank Parameters"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "tankSize", children: "Tank Size" }), _jsxs(Select, { value: tankSize, onValueChange: setTankSize, children: [_jsx(SelectTrigger, { className: "mt-1", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "D", children: "D Tank (425L)" }), _jsx(SelectItem, { value: "E", children: "E Tank (680L)" }), _jsx(SelectItem, { value: "M", children: "M Tank (3000L)" }), _jsx(SelectItem, { value: "G", children: "G Tank (5300L)" }), _jsx(SelectItem, { value: "H", children: "H Tank (6900L)" }), _jsx(SelectItem, { value: "K", children: "K Tank (6900L)" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "pressure", children: "Current Pressure (PSI)" }), _jsx(Input, { id: "pressure", type: "number", placeholder: "e.g., 1500", value: currentPressure, onChange: (e) => setCurrentPressure(e.target.value), className: "mt-1" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "flowRate", children: "Flow Rate (L/min)" }), _jsx(Input, { id: "flowRate", type: "number", step: "0.5", placeholder: "e.g., 2.0", value: flowRate, onChange: (e) => setFlowRate(e.target.value), className: "mt-1" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: calculateOxygenDuration, className: "flex-1", children: [_jsx(Calculator, { className: "h-4 w-4 mr-2" }), "Calculate Duration"] }), _jsxs(Button, { onClick: clearCalculation, variant: "outline", children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-2" }), "Clear"] })] })] })] }), currentPressure && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Gauge, { className: "h-4 w-4" }), "Tank Status"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "font-medium", children: "Tank Pressure" }), _jsxs("span", { className: "text-lg font-bold", children: [currentPressure, " / ", tankSpecifications[tankSize].servicePressure, " PSI"] })] }), _jsx(Progress, { value: getPressurePercentage(), className: "w-full" }), _jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [_jsx("span", { children: "Empty" }), _jsxs("span", { children: [getPressurePercentage().toFixed(1), "% Full"] }), _jsx("span", { children: "Full" })] })] }) })] })), results.remainingTime > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-4 w-4" }), "Duration Results"] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: [_jsxs("div", { className: "text-center p-4 bg-blue-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: formatTime(results.remainingTime) }), _jsx("div", { className: "text-sm text-muted-foreground mb-2", children: "Remaining Time" }), _jsx(Badge, { className: `${getTimeAlert(results.remainingTime).color} text-white`, children: getTimeAlert(results.remainingTime).level })] }), _jsxs("div", { className: "text-center p-4 bg-green-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: Math.round(results.remainingVolume) }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Remaining Volume (L)" })] }), _jsxs("div", { className: "text-center p-4 bg-purple-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: results.consumptionRate }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Flow Rate (L/min)" })] }), _jsxs("div", { className: "text-center p-4 bg-orange-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-orange-600", children: tankSpecifications[tankSize].weight }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Tank Weight (lbs)" })] })] }), _jsx("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-yellow-600 mt-0.5" }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-yellow-800", children: "Usage Recommendations:" }), _jsxs("ul", { className: "text-sm text-yellow-700 mt-1 space-y-1", children: [results.remainingTime < 30 && _jsx("li", { children: "\u2022 Replace or refill tank soon" }), results.remainingTime < 15 && _jsx("li", { children: "\u2022 Critical - immediate replacement needed" }), _jsx("li", { children: "\u2022 Monitor patient response and adjust flow rate as needed" }), _jsx("li", { children: "\u2022 Keep backup oxygen supply available" }), _jsx("li", { children: "\u2022 Document oxygen administration and consumption" })] })] })] }) })] })] })), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Tank Specifications" }) }), _jsx(CardContent, { children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left p-2", children: "Tank Size" }), _jsx("th", { className: "text-left p-2", children: "Capacity (L)" }), _jsx("th", { className: "text-left p-2", children: "Service Pressure (PSI)" }), _jsx("th", { className: "text-left p-2", children: "Weight (lbs)" }), _jsx("th", { className: "text-left p-2", children: "Portable" })] }) }), _jsx("tbody", { children: Object.entries(tankSpecifications).map(([size, spec]) => (_jsxs("tr", { className: `border-b ${tankSize === size ? 'bg-blue-50' : ''}`, children: [_jsx("td", { className: "p-2 font-medium", children: size }), _jsx("td", { className: "p-2", children: spec.capacity }), _jsx("td", { className: "p-2", children: spec.servicePressure }), _jsx("td", { className: "p-2", children: spec.weight }), _jsx("td", { className: "p-2", children: _jsx(Badge, { variant: spec.portableUse ? "default" : "secondary", children: spec.portableUse ? "Yes" : "No" }) })] }, size))) })] }) }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Quick Reference" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Common Flow Rates" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Nasal cannula:" }), _jsx("span", { children: "1-6 L/min" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Simple mask:" }), _jsx("span", { children: "6-10 L/min" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Non-rebreather:" }), _jsx("span", { children: "10-15 L/min" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Bag-valve mask:" }), _jsx("span", { children: "15 L/min" })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Duration Formula" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { children: [_jsx("strong", { children: "Duration (min) = " }), _jsxs("div", { className: "ml-4", children: ["(Current Pressure \u00F7 Service Pressure) \u00D7", _jsx("br", {}), "Tank Capacity \u00F7 Flow Rate"] })] }), _jsx("div", { className: "text-muted-foreground mt-3", children: "Always maintain safety factor and have backup oxygen available" })] })] })] }) })] }), calculationHistory.length > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Calculation History" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: calculationHistory.map((calc) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-muted rounded-lg", children: [_jsxs("div", { className: "text-sm", children: [_jsxs("div", { className: "font-medium", children: [calc.tankSize, " Tank - ", calc.currentPressure, " PSI - ", calc.flowRate, " L/min"] }), _jsx("div", { className: "text-muted-foreground", children: calc.timestamp })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "font-bold text-primary", children: formatTime(calc.results.remainingTime) }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [Math.round(calc.results.remainingVolume), "L remaining"] })] })] }, calc.id))) }) })] }))] })] }) }));
}
