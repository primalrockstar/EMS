import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Baby, Weight, Droplets, Brain, Heart, Flame, Clock } from "lucide-react";
import ApgarCalculator from "@/components/apgar-calculator";
import PediatricDoseCalculator from "@/components/pediatric-dose-calculator";
import IVDripCalculator from "@/components/iv-drip-calculator";
import GlasgowComaCalculator from "@/components/glasgow-coma-calculator";
import CardiacOutputCalculator from "@/components/cardiac-output-calculator";
import BurnSurfaceCalculator from "@/components/burn-surface-calculator";
import OxygenTankCalculator from "@/components/oxygen-tank-calculator";
import BMICalculator from "@/components/bmi-calculator";
export default function Calculators() {
    const [showApgar, setShowApgar] = useState(false);
    const [showPediatricDose, setShowPediatricDose] = useState(false);
    const [showIVDrip, setShowIVDrip] = useState(false);
    const [showGlasgowComa, setShowGlasgowComa] = useState(false);
    const [showCardiacOutput, setShowCardiacOutput] = useState(false);
    const [showBurnSurface, setShowBurnSurface] = useState(false);
    const [showOxygenTank, setShowOxygenTank] = useState(false);
    const [showBMI, setShowBMI] = useState(false);
    const calculators = [
        {
            name: "APGAR Score",
            description: "Newborn assessment tool",
            icon: Baby,
            color: "bg-blue-500",
            onClick: () => setShowApgar(true),
        },
        {
            name: "Pediatric Dose",
            description: "Weight-based medication dosing",
            icon: Weight,
            color: "bg-orange-500",
            onClick: () => setShowPediatricDose(true),
        },
        {
            name: "IV Drip Rate",
            description: "Intravenous fluid calculations",
            icon: Droplets,
            color: "bg-green-500",
            onClick: () => setShowIVDrip(true),
        },
        {
            name: "Glasgow Coma Scale",
            description: "Neurological assessment",
            icon: Brain,
            color: "bg-red-500",
            onClick: () => setShowGlasgowComa(true),
        },
        {
            name: "Cardiac Output",
            description: "Heart function calculations",
            icon: Heart,
            color: "bg-purple-500",
            onClick: () => setShowCardiacOutput(true),
        },
        {
            name: "Burn Surface Area",
            description: "Rule of nines calculation",
            icon: Flame,
            color: "bg-yellow-500",
            onClick: () => setShowBurnSurface(true),
        },
        {
            name: "Oxygen Tank Duration",
            description: "O2 supply time remaining",
            icon: Clock,
            color: "bg-indigo-500",
            onClick: () => setShowOxygenTank(true),
        },
        {
            name: "Body Mass Index",
            description: "BMI calculation and classification",
            icon: Calculator,
            color: "bg-pink-500",
            onClick: () => setShowBMI(true),
        },
    ];
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-2", children: "Medical Calculators" }), _jsx("p", { className: "text-muted-foreground", children: "Essential EMS calculators for field use and clinical decision making" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: calculators.map((calculator) => {
                    const Icon = calculator.icon;
                    return (_jsx(Card, { className: "hover:shadow-md transition-shadow", children: _jsx(CardContent, { className: "p-6", children: _jsxs(Button, { onClick: calculator.onClick, className: `w-full ${calculator.color} text-white hover:opacity-90 h-auto p-6 flex flex-col items-center space-y-4`, children: [_jsx(Icon, { className: "h-8 w-8" }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "font-semibold text-lg", children: calculator.name }), _jsx("div", { className: "text-sm opacity-90 mt-1", children: calculator.description })] })] }) }) }, calculator.name));
                }) }), _jsxs(Card, { className: "mt-8", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Recent Calculations" }) }), _jsx(CardContent, { children: _jsx("div", { className: "text-center py-8 text-muted-foreground", children: "Your recent calculations will appear here" }) })] }), _jsx(ApgarCalculator, { open: showApgar, onOpenChange: setShowApgar }), _jsx(PediatricDoseCalculator, { open: showPediatricDose, onOpenChange: setShowPediatricDose }), _jsx(IVDripCalculator, { open: showIVDrip, onOpenChange: setShowIVDrip }), _jsx(GlasgowComaCalculator, { open: showGlasgowComa, onOpenChange: setShowGlasgowComa }), _jsx(CardiacOutputCalculator, { open: showCardiacOutput, onOpenChange: setShowCardiacOutput }), _jsx(BurnSurfaceCalculator, { open: showBurnSurface, onOpenChange: setShowBurnSurface }), _jsx(OxygenTankCalculator, { open: showOxygenTank, onOpenChange: setShowOxygenTank }), _jsx(BMICalculator, { open: showBMI, onOpenChange: setShowBMI })] }));
}
