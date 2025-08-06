import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, Activity, Thermometer, Clock, Search, Pin } from "lucide-react";
export default function QuickAccessWidget({ userRole, userTier = "basic", onProtocolClick, onCalculatorClick }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [pinnedItems, setPinnedItems] = useState([
        "cardiac-arrest",
        "trauma-field-triage",
        "apgar-calculator"
    ]);
    // Clark County specific protocols by scope
    const protocolsByScope = {
        EMR: [
            { id: "cardiac-arrest", name: "Cardiac Arrest", category: "cardiac", urgent: true },
            { id: "trauma-field-triage", name: "Trauma Field Triage", category: "trauma", urgent: true },
            { id: "respiratory-distress", name: "Respiratory Distress", category: "respiratory", urgent: false }
        ],
        EMT: [
            { id: "cardiac-arrest", name: "Cardiac Arrest", category: "cardiac", urgent: true },
            { id: "trauma-field-triage", name: "Trauma Field Triage", category: "trauma", urgent: true },
            { id: "respiratory-distress", name: "Respiratory Distress", category: "respiratory", urgent: false },
            { id: "stroke-protocol", name: "Stroke Protocol", category: "neurological", urgent: true },
            { id: "allergic-reaction", name: "Allergic Reaction", category: "allergy", urgent: false }
        ],
        AEMT: [
            { id: "cardiac-arrest", name: "Cardiac Arrest", category: "cardiac", urgent: true },
            { id: "trauma-field-triage", name: "Trauma Field Triage", category: "trauma", urgent: true },
            { id: "respiratory-distress", name: "Respiratory Distress", category: "respiratory", urgent: false },
            { id: "stroke-protocol", name: "Stroke Protocol", category: "neurological", urgent: true },
            { id: "allergic-reaction", name: "Allergic Reaction", category: "allergy", urgent: false },
            { id: "iv-therapy", name: "IV Therapy", category: "procedure", urgent: false },
            { id: "medication-admin", name: "Medication Administration", category: "medication", urgent: false }
        ],
        Paramedic: [
            { id: "cardiac-arrest", name: "Cardiac Arrest", category: "cardiac", urgent: true },
            { id: "trauma-field-triage", name: "Trauma Field Triage", category: "trauma", urgent: true },
            { id: "respiratory-distress", name: "Respiratory Distress", category: "respiratory", urgent: false },
            { id: "stroke-protocol", name: "Stroke Protocol", category: "neurological", urgent: true },
            { id: "allergic-reaction", name: "Allergic Reaction", category: "allergy", urgent: false },
            { id: "iv-therapy", name: "IV Therapy", category: "procedure", urgent: false },
            { id: "medication-admin", name: "Medication Administration", category: "medication", urgent: false },
            { id: "advanced-airway", name: "Advanced Airway", category: "procedure", urgent: true },
            { id: "stemi-protocol", name: "STEMI Protocol", category: "cardiac", urgent: true }
        ]
    };
    const quickCalculators = [
        { id: "apgar", name: "APGAR Score", icon: Activity, urgent: true, tier: "all" },
        { id: "pediatric-dose", name: "Pediatric Dose", icon: Thermometer, urgent: true, tier: "all" },
        { id: "iv-drip", name: "IV Drip Rate", icon: Clock, urgent: false, tier: "all" },
        { id: "glasgow-coma", name: "Glasgow Coma", icon: Heart, urgent: true, tier: "all" },
        { id: "bmi", name: "BMI Calculator", icon: Activity, urgent: false, tier: "basic" },
        { id: "cardiac-output", name: "Cardiac Output", icon: Heart, urgent: true, tier: "basic" },
        { id: "burn-surface", name: "Burn Surface", icon: Activity, urgent: true, tier: "basic" },
        { id: "oxygen-tank", name: "Oxygen Tank", icon: Clock, urgent: false, tier: "basic" }
    ];
    // Filter calculators based on user tier
    const filteredCalculators = quickCalculators.filter(calc => calc.tier === "all" || (calc.tier === "basic" && userTier === "basic"));
    console.log("QuickAccessWidget - userTier:", userTier);
    console.log("QuickAccessWidget - filteredCalculators:", filteredCalculators.map(c => c.name));
    const categoryColors = {
        cardiac: "bg-red-500",
        trauma: "bg-orange-500",
        respiratory: "bg-blue-500",
        neurological: "bg-purple-500",
        allergy: "bg-yellow-500",
        procedure: "bg-green-500",
        medication: "bg-pink-500"
    };
    const filteredProtocols = protocolsByScope[userRole].filter(protocol => protocol.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const pinnedProtocols = filteredProtocols.filter(p => pinnedItems.includes(p.id));
    const urgentProtocols = filteredProtocols.filter(p => p.urgent && !pinnedItems.includes(p.id));
    const regularProtocols = filteredProtocols.filter(p => !p.urgent && !pinnedItems.includes(p.id));
    const togglePin = (itemId) => {
        setPinnedItems(prev => prev.includes(itemId)
            ? prev.filter(id => id !== itemId)
            : [...prev, itemId]);
    };
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(CardTitle, { className: "text-base font-semibold", children: ["Quick Access - ", userRole] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Badge, { variant: "outline", className: "text-xs w-fit", children: "Clark County EMS" }), _jsx(Badge, { variant: userTier === "basic" ? "default" : "secondary", className: `text-xs w-fit ${userTier === "basic" ? "bg-blue-500" : "bg-green-500"}`, children: userTier === "basic" ? "Basic Mode" : "Pro Mode" })] })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" }), _jsx(Input, { placeholder: "Search protocols...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10" })] })] }), _jsxs(CardContent, { className: "space-y-4", children: [pinnedProtocols.length > 0 && (_jsxs("div", { children: [_jsxs("h4", { className: "text-sm font-semibold mb-2 flex items-center gap-2", children: [_jsx(Pin, { className: "h-4 w-4" }), "Pinned"] }), _jsx("div", { className: "space-y-2", children: pinnedProtocols.map((protocol) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "flex-1 justify-start text-left min-w-0", onClick: () => onProtocolClick(protocol.id), children: [_jsx("div", { className: `w-3 h-3 rounded-full ${categoryColors[protocol.category]} mr-2 shrink-0` }), _jsx("span", { className: "truncate", children: protocol.name })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => togglePin(protocol.id), children: _jsx(Pin, { className: "h-4 w-4 fill-current" }) })] }, protocol.id))) })] })), urgentProtocols.length > 0 && (_jsxs("div", { children: [_jsxs("h4", { className: "text-sm font-semibold mb-2 flex items-center gap-2", children: [_jsx(Heart, { className: "h-4 w-4 text-red-500" }), "Critical Protocols"] }), _jsx("div", { className: "space-y-2", children: urgentProtocols.map((protocol) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "flex-1 justify-start text-left min-w-0 border-red-200 hover:bg-red-50", onClick: () => onProtocolClick(protocol.id), children: [_jsx("div", { className: `w-3 h-3 rounded-full ${categoryColors[protocol.category]} mr-2 shrink-0` }), _jsx("span", { className: "truncate", children: protocol.name })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => togglePin(protocol.id), children: _jsx(Pin, { className: "h-4 w-4" }) })] }, protocol.id))) })] })), _jsxs("div", { children: [_jsxs("h4", { className: "text-sm font-semibold mb-2 flex items-center gap-2", children: [_jsx(Activity, { className: "h-4 w-4" }), "Quick Calculators (", userTier, " mode)"] }), userTier === "pro" && (_jsxs("div", { className: "mb-2 space-y-2", children: [_jsx(Button, { variant: "secondary", size: "sm", onClick: () => {
                                            console.log("TEST BUTTON CLICKED - Pro mode test");
                                            alert("Pro mode test button clicked!");
                                        }, children: "Test Pro Mode Click" }), _jsx("button", { className: "px-3 py-1 bg-blue-500 text-white rounded text-sm", onClick: () => {
                                            console.log("HTML BUTTON CLICKED");
                                            alert("HTML button clicked!");
                                        }, children: "HTML Button Test" })] })), _jsx("div", { className: "grid grid-cols-2 gap-2", children: filteredCalculators.length > 0 ? (filteredCalculators.map((calc) => (_jsxs(Button, { variant: "outline", size: "sm", className: `justify-start text-left min-w-0 ${calc.urgent ? 'border-orange-200 hover:bg-orange-50' : ''}`, onClick: (e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        console.log("QuickAccessWidget - Calculator clicked:", calc.id);
                                        console.log("QuickAccessWidget - About to call onCalculatorClick");
                                        onCalculatorClick(calc.id);
                                        console.log("QuickAccessWidget - Called onCalculatorClick");
                                    }, children: [_jsx(calc.icon, { className: "h-4 w-4 mr-2 shrink-0" }), _jsx("span", { className: "truncate", children: calc.name })] }, calc.id)))) : (_jsxs("div", { className: "col-span-2 text-sm text-muted-foreground text-center py-4", children: ["No calculators available for ", userTier, " mode"] })) })] }), regularProtocols.length > 0 && (_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-semibold mb-2", children: "Standard Protocols" }), _jsx("div", { className: "space-y-2", children: regularProtocols.map((protocol) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "flex-1 justify-start text-left min-w-0", onClick: () => onProtocolClick(protocol.id), children: [_jsx("div", { className: `w-3 h-3 rounded-full ${categoryColors[protocol.category]} mr-2 shrink-0` }), _jsx("span", { className: "truncate", children: protocol.name })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => togglePin(protocol.id), children: _jsx(Pin, { className: "h-4 w-4" }) })] }, protocol.id))) })] }))] })] }));
}
