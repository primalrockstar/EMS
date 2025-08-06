import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
export default function PediatricDoseCalculator({ open, onOpenChange }) {
    const [inputs, setInputs] = useState({
        weight: "",
        medication: "",
        weightUnit: "kg",
    });
    const { toast } = useToast();
    const queryClient = useQueryClient();
    // Common pediatric medications with dosing
    const medications = [
        {
            name: "Epinephrine",
            dose: 0.01,
            unit: "mg/kg",
            route: "IV/IO",
            maxDose: 1,
            indication: "Cardiac arrest, anaphylaxis"
        },
        {
            name: "Atropine",
            dose: 0.02,
            unit: "mg/kg",
            route: "IV/IO",
            minDose: 0.1,
            maxDose: 0.5,
            indication: "Bradycardia"
        },
        {
            name: "Amiodarone",
            dose: 5,
            unit: "mg/kg",
            route: "IV/IO",
            maxDose: 300,
            indication: "V-Fib, V-Tach"
        },
        {
            name: "Adenosine",
            dose: 0.1,
            unit: "mg/kg",
            route: "IV/IO",
            maxDose: 6,
            indication: "SVT"
        },
        {
            name: "Midazolam",
            dose: 0.2,
            unit: "mg/kg",
            route: "IV/IM",
            maxDose: 10,
            indication: "Seizures, sedation"
        },
    ];
    const selectedMedication = medications.find(med => med.name === inputs.medication);
    const calculateDose = () => {
        if (!inputs.weight || !selectedMedication)
            return null;
        const weight = parseFloat(inputs.weight);
        if (isNaN(weight) || weight <= 0)
            return null;
        const weightInKg = inputs.weightUnit === "lb" ? weight * 0.453592 : weight;
        let calculatedDose = selectedMedication.dose * weightInKg;
        // Apply min/max constraints
        if (selectedMedication.minDose && calculatedDose < selectedMedication.minDose) {
            calculatedDose = selectedMedication.minDose;
        }
        if (selectedMedication.maxDose && calculatedDose > selectedMedication.maxDose) {
            calculatedDose = selectedMedication.maxDose;
        }
        return {
            dose: calculatedDose.toFixed(2),
            weightKg: weightInKg.toFixed(1),
            unit: selectedMedication.unit.split('/')[0], // Extract unit (mg from mg/kg)
        };
    };
    const result = calculateDose();
    const saveMutation = useMutation({
        mutationFn: async () => {
            return await apiRequest('POST', '/api/calculator-results', {
                calculatorType: 'pediatric_dose',
                inputs: { ...inputs, medication: selectedMedication },
                result: result,
                userId: 1
            });
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Pediatric dose calculation saved successfully",
            });
            queryClient.invalidateQueries({ queryKey: ['/api/calculator-results'] });
            onOpenChange(false);
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message || "Failed to save calculation",
                variant: "destructive",
            });
        },
    });
    const resetInputs = () => {
        setInputs({
            weight: "",
            medication: "",
            weightUnit: "kg",
        });
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-md", "aria-describedby": "pediatric-dose-description", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Pediatric Dose Calculator" }), _jsx("div", { id: "pediatric-dose-description", className: "text-sm text-muted-foreground", children: "Calculate weight-based medication dosing for pediatric patients" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "weight", children: "Patient Weight" }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Input, { id: "weight", type: "number", placeholder: "Enter weight", value: inputs.weight, onChange: (e) => setInputs(prev => ({ ...prev, weight: e.target.value })), className: "flex-1" }), _jsxs(Select, { value: inputs.weightUnit, onValueChange: (value) => setInputs(prev => ({ ...prev, weightUnit: value })), children: [_jsx(SelectTrigger, { className: "w-20", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "kg", children: "kg" }), _jsx(SelectItem, { value: "lb", children: "lb" })] })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "medication", children: "Medication" }), _jsxs(Select, { value: inputs.medication, onValueChange: (value) => setInputs(prev => ({ ...prev, medication: value })), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select medication" }) }), _jsx(SelectContent, { children: medications.map((med) => (_jsx(SelectItem, { value: med.name, children: med.name }, med.name))) })] })] }), selectedMedication && (_jsx(Card, { className: "bg-muted/50", children: _jsx(CardContent, { className: "p-3", children: _jsxs("div", { className: "text-sm space-y-1", children: [_jsxs("div", { children: [_jsx("strong", { children: "Indication:" }), " ", selectedMedication.indication] }), _jsxs("div", { children: [_jsx("strong", { children: "Route:" }), " ", selectedMedication.route] }), _jsxs("div", { children: [_jsx("strong", { children: "Standard Dose:" }), " ", selectedMedication.dose, " ", selectedMedication.unit] }), selectedMedication.maxDose && (_jsxs("div", { children: [_jsx("strong", { children: "Max Dose:" }), " ", selectedMedication.maxDose, " ", selectedMedication.unit.split('/')[0]] }))] }) }) })), result && (_jsx(Card, { className: "bg-primary/10", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-primary mb-1", children: [result.dose, " ", result.unit] }), _jsxs("div", { className: "text-sm text-muted-foreground", children: ["For ", result.weightKg, " kg patient"] }), _jsxs("div", { className: "text-sm text-muted-foreground mt-1", children: ["Route: ", selectedMedication?.route] })] }) })), _jsxs("div", { className: "flex space-x-3", children: [_jsxs(Button, { onClick: () => saveMutation.mutate(), disabled: !result || saveMutation.isPending, className: "flex-1", children: [_jsx(Save, { className: "h-4 w-4 mr-2" }), saveMutation.isPending ? 'Saving...' : 'Save Result'] }), _jsx(Button, { variant: "outline", onClick: resetInputs, className: "flex-1", children: "Reset" })] })] })] }) }));
}
