import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Flame, Calculator, AlertTriangle, RotateCcw, User } from "lucide-react";
export default function BurnSurfaceCalculator({ open, onOpenChange }) {
    const [patientAge, setPatientAge] = useState("adult");
    const [bodyParts, setBodyParts] = useState({
        head: 0,
        chest: 0,
        abdomen: 0,
        back: 0,
        rightArm: 0,
        leftArm: 0,
        rightLeg: 0,
        leftLeg: 0,
        genitals: 0
    });
    const [burnDepth, setBurnDepth] = useState("second");
    const [calculationHistory, setCalculationHistory] = useState([]);
    const ruleOfNines = {
        adult: {
            head: 9,
            chest: 9,
            abdomen: 9,
            back: 18,
            rightArm: 9,
            leftArm: 9,
            rightLeg: 18,
            leftLeg: 18,
            genitals: 1
        },
        child: {
            head: 18,
            chest: 9,
            abdomen: 9,
            back: 18,
            rightArm: 9,
            leftArm: 9,
            rightLeg: 14,
            leftLeg: 14,
            genitals: 1
        },
        infant: {
            head: 18,
            chest: 9,
            abdomen: 9,
            back: 18,
            rightArm: 9,
            leftArm: 9,
            rightLeg: 14,
            leftLeg: 14,
            genitals: 1
        }
    };
    const bodyPartLabels = {
        head: "Head & Neck",
        chest: "Chest",
        abdomen: "Abdomen",
        back: "Back",
        rightArm: "Right Arm",
        leftArm: "Left Arm",
        rightLeg: "Right Leg",
        leftLeg: "Left Leg",
        genitals: "Genitals"
    };
    const totalBurnArea = Object.entries(bodyParts).reduce((total, [part, percentage]) => {
        return total + (percentage || 0);
    }, 0);
    const updateBodyPart = (part, value) => {
        const numValue = parseFloat(value) || 0;
        const maxValue = ruleOfNines[patientAge][part];
        if (numValue > maxValue) {
            alert(`Maximum value for ${bodyPartLabels[part]} is ${maxValue}%`);
            return;
        }
        setBodyParts(prev => ({
            ...prev,
            [part]: numValue
        }));
    };
    const getBurnSeverity = (percentage) => {
        if (percentage < 10)
            return { level: "Minor", color: "bg-green-500" };
        if (percentage < 20)
            return { level: "Moderate", color: "bg-yellow-500" };
        if (percentage < 30)
            return { level: "Major", color: "bg-orange-500" };
        return { level: "Critical", color: "bg-red-500" };
    };
    const getFluidRequirement = (percentage, weight = 70) => {
        // Parkland Formula: 4 mL × weight (kg) × burn percentage
        // First 24 hours: Half in first 8 hours, half in next 16 hours
        const totalFluid = 4 * weight * percentage;
        const firstEightHours = totalFluid / 2;
        const nextSixteenHours = totalFluid / 2;
        return {
            total: totalFluid,
            firstEightHours,
            nextSixteenHours,
            hourlyRateFirst8: firstEightHours / 8,
            hourlyRateNext16: nextSixteenHours / 16
        };
    };
    const saveCalculation = () => {
        if (totalBurnArea === 0)
            return;
        const calculation = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            patientAge,
            bodyParts: { ...bodyParts },
            totalBurnArea,
            burnDepth,
            severity: getBurnSeverity(totalBurnArea),
            fluidRequirement: getFluidRequirement(totalBurnArea)
        };
        setCalculationHistory(prev => [calculation, ...prev.slice(0, 4)]);
    };
    const clearCalculation = () => {
        setBodyParts({
            head: 0,
            chest: 0,
            abdomen: 0,
            back: 0,
            rightArm: 0,
            leftArm: 0,
            rightLeg: 0,
            leftLeg: 0,
            genitals: 0
        });
        setBurnDepth("second");
    };
    const quickPresets = [
        { name: "Head & Neck", parts: { head: ruleOfNines[patientAge].head } },
        { name: "Torso", parts: { chest: ruleOfNines[patientAge].chest, abdomen: ruleOfNines[patientAge].abdomen } },
        { name: "Both Arms", parts: { rightArm: ruleOfNines[patientAge].rightArm, leftArm: ruleOfNines[patientAge].leftArm } },
        { name: "Both Legs", parts: { rightLeg: ruleOfNines[patientAge].rightLeg, leftLeg: ruleOfNines[patientAge].leftLeg } }
    ];
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-6xl max-h-[90vh] p-0", "aria-describedby": "burn-surface-description", children: [_jsxs(DialogHeader, { className: "p-6 pb-0", children: [_jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Flame, { className: "h-5 w-5 text-orange-500" }), "Burn Surface Area Calculator"] }), _jsx("div", { id: "burn-surface-description", className: "text-sm text-muted-foreground", children: "Calculate burn surface area using the Rule of Nines method" })] }), _jsxs("div", { className: "p-6 pt-0 space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(User, { className: "h-4 w-4" }), "Patient Information"] }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "age", children: "Patient Age Group" }), _jsxs(Select, { value: patientAge, onValueChange: setPatientAge, children: [_jsx(SelectTrigger, { className: "mt-1", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "adult", children: "Adult (>14 years)" }), _jsx(SelectItem, { value: "child", children: "Child (5-14 years)" }), _jsx(SelectItem, { value: "infant", children: "Infant (<5 years)" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "burnDepth", children: "Burn Depth" }), _jsxs(Select, { value: burnDepth, onValueChange: setBurnDepth, children: [_jsx(SelectTrigger, { className: "mt-1", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "first", children: "First Degree (Superficial)" }), _jsx(SelectItem, { value: "second", children: "Second Degree (Partial Thickness)" }), _jsx(SelectItem, { value: "third", children: "Third Degree (Full Thickness)" }), _jsx(SelectItem, { value: "fourth", children: "Fourth Degree (Deep)" })] })] })] })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Calculator, { className: "h-4 w-4" }), "Body Surface Area Assessment"] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6", children: Object.entries(bodyPartLabels).map(([part, label]) => (_jsxs("div", { children: [_jsxs(Label, { htmlFor: part, children: [label, " (Max: ", ruleOfNines[patientAge][part], "%)"] }), _jsxs("div", { className: "flex gap-2 mt-1", children: [_jsx(Input, { id: part, type: "number", min: "0", max: ruleOfNines[patientAge][part], value: bodyParts[part] || "", onChange: (e) => updateBodyPart(part, e.target.value), className: "flex-1" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => updateBodyPart(part, ruleOfNines[patientAge][part].toString()), children: "Max" })] })] }, part))) }), _jsx(Separator, { className: "my-4" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: quickPresets.map((preset) => (_jsx(Button, { variant: "outline", size: "sm", onClick: () => setBodyParts(prev => ({ ...prev, ...preset.parts })), children: preset.name }, preset.name))) })] })] }), totalBurnArea > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Flame, { className: "h-4 w-4" }), "Assessment Results"] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-6xl font-bold text-primary mb-2", children: [totalBurnArea.toFixed(1), "%"] }), _jsx("div", { className: "text-lg text-muted-foreground", children: "Total Body Surface Area" }), _jsxs(Badge, { className: `${getBurnSeverity(totalBurnArea).color} text-white mt-2`, children: [getBurnSeverity(totalBurnArea).level, " Burn"] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "font-medium", children: "Burn Depth:" }), _jsxs("span", { className: "capitalize", children: [burnDepth, " Degree"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "font-medium", children: "Patient Age:" }), _jsx("span", { className: "capitalize", children: patientAge })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-3", children: "Fluid Resuscitation (70kg adult)" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Total 24h fluid:" }), _jsxs("span", { className: "font-medium", children: [getFluidRequirement(totalBurnArea).total.toFixed(0), " mL"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "First 8 hours:" }), _jsxs("span", { className: "font-medium", children: [getFluidRequirement(totalBurnArea).firstEightHours.toFixed(0), " mL"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Next 16 hours:" }), _jsxs("span", { className: "font-medium", children: [getFluidRequirement(totalBurnArea).nextSixteenHours.toFixed(0), " mL"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Rate (first 8h):" }), _jsxs("span", { className: "font-medium", children: [getFluidRequirement(totalBurnArea).hourlyRateFirst8.toFixed(0), " mL/hr"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Rate (next 16h):" }), _jsxs("span", { className: "font-medium", children: [getFluidRequirement(totalBurnArea).hourlyRateNext16.toFixed(0), " mL/hr"] })] })] })] })] }), _jsx("div", { className: "mt-6 bg-red-50 border border-red-200 rounded-lg p-4", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-red-600 mt-0.5" }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-red-800", children: "Emergency Actions Required:" }), _jsxs("ul", { className: "text-sm text-red-700 mt-1 space-y-1", children: [totalBurnArea >= 20 && _jsx("li", { children: "\u2022 Immediate IV access and fluid resuscitation" }), totalBurnArea >= 10 && _jsx("li", { children: "\u2022 Pain management and wound care" }), totalBurnArea >= 15 && _jsx("li", { children: "\u2022 Consider transfer to burn center" }), totalBurnArea >= 30 && _jsx("li", { children: "\u2022 Intensive care monitoring required" }), _jsx("li", { children: "\u2022 Monitor for airway compromise if head/neck involvement" })] })] })] }) })] })] })), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { onClick: saveCalculation, disabled: totalBurnArea === 0, children: "Save Assessment" }), _jsxs(Button, { onClick: clearCalculation, variant: "outline", children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-2" }), "Clear All"] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Rule of Nines Reference" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 text-sm", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Adult (>14 years)" }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Head & Neck:" }), _jsx("span", { children: "9%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Each Arm:" }), _jsx("span", { children: "9%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Chest:" }), _jsx("span", { children: "9%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Abdomen:" }), _jsx("span", { children: "9%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Back:" }), _jsx("span", { children: "18%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Each Leg:" }), _jsx("span", { children: "18%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Genitals:" }), _jsx("span", { children: "1%" })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Child (5-14 years)" }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Head & Neck:" }), _jsx("span", { children: "18%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Each Arm:" }), _jsx("span", { children: "9%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Chest:" }), _jsx("span", { children: "9%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Abdomen:" }), _jsx("span", { children: "9%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Back:" }), _jsx("span", { children: "18%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Each Leg:" }), _jsx("span", { children: "14%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Genitals:" }), _jsx("span", { children: "1%" })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Treatment Guidelines" }), _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "text-green-600", children: "Minor: <10% BSA" }), _jsx("div", { className: "text-yellow-600", children: "Moderate: 10-19% BSA" }), _jsx("div", { className: "text-orange-600", children: "Major: 20-29% BSA" }), _jsx("div", { className: "text-red-600", children: "Critical: \u226530% BSA" })] }), _jsxs("div", { className: "mt-3", children: [_jsx("div", { className: "font-medium", children: "Parkland Formula:" }), _jsx("div", { children: "4 mL \u00D7 Weight (kg) \u00D7 % BSA" }), _jsx("div", { className: "text-muted-foreground", children: "Half in first 8 hours, half in next 16 hours" })] })] })] }) })] }), calculationHistory.length > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Assessment History" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: calculationHistory.map((calc) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-muted rounded-lg", children: [_jsxs("div", { children: [_jsxs("div", { className: "font-medium", children: [calc.totalBurnArea.toFixed(1), "% BSA - ", calc.patientAge] }), _jsx("div", { className: "text-sm text-muted-foreground", children: calc.timestamp })] }), _jsx(Badge, { className: `${calc.severity.color} text-white`, children: calc.severity.level })] }, calc.id))) }) })] }))] })] }) }));
}
