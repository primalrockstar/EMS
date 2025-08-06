import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, Search, Plus, X, Clock, User } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
export default function MedicationInteractionChecker({ open, onOpenChange }) {
    const [selectedMedications, setSelectedMedications] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [patientInfo, setPatientInfo] = useState({
        age: "",
        weight: "",
        allergies: ""
    });
    const [administrationLog, setAdministrationLog] = useState([]);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    // Fetch Clark County approved medications
    const { data: medications = [] } = useQuery({
        queryKey: ["/api/medications"],
        enabled: open,
    });
    // Filter medications based on search
    const filteredMedications = medications.filter((med) => med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (med.category && med.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (med.scope && med.scope.toLowerCase().includes(searchTerm.toLowerCase())));
    // Clark County EMS medication interactions (based on actual medication database)
    const clarkCountyInteractions = [
        {
            id: "1",
            drug1: "Aspirin",
            drug2: "Warfarin",
            severity: "major",
            description: "Increased risk of bleeding",
            clinicalEffects: "May increase anticoagulant effects leading to bleeding complications",
            management: "Monitor INR closely, consider alternative antiplatelet therapy"
        },
        {
            id: "2",
            drug1: "Morphine",
            drug2: "Lorazepam",
            severity: "major",
            description: "Enhanced CNS depression",
            clinicalEffects: "Increased sedation, respiratory depression",
            management: "Use with extreme caution, monitor respiratory status"
        },
        {
            id: "3",
            drug1: "Epinephrine",
            drug2: "Propranolol",
            severity: "moderate",
            description: "Reduced effectiveness of epinephrine",
            clinicalEffects: "Beta-blocker may reduce epinephrine effectiveness",
            management: "Consider higher doses of epinephrine if needed"
        },
        {
            id: "4",
            drug1: "Fentanyl",
            drug2: "Midazolam",
            severity: "major",
            description: "Synergistic CNS and respiratory depression",
            clinicalEffects: "Severe sedation, respiratory depression, potential coma",
            management: "Reduce doses, continuous monitoring, have naloxone/flumazenil ready"
        },
        {
            id: "5",
            drug1: "Naloxone",
            drug2: "Morphine",
            severity: "major",
            description: "Opioid antagonist reversal",
            clinicalEffects: "Naloxone will reverse morphine effects, potential withdrawal",
            management: "Monitor for return of pain, respiratory depression after naloxone wears off"
        },
        {
            id: "6",
            drug1: "Adenosine",
            drug2: "Theophylline",
            severity: "moderate",
            description: "Reduced adenosine effectiveness",
            clinicalEffects: "Methylxanthines block adenosine receptors",
            management: "May require higher adenosine doses"
        },
        {
            id: "7",
            drug1: "Succinylcholine",
            drug2: "Atracurium",
            severity: "major",
            description: "Prolonged neuromuscular blockade",
            clinicalEffects: "Extended paralysis, respiratory compromise",
            management: "Avoid combination, ensure adequate ventilation"
        },
        {
            id: "8",
            drug1: "Dopamine",
            drug2: "Norepinephrine",
            severity: "moderate",
            description: "Additive vasopressor effects",
            clinicalEffects: "Severe hypertension, arrhythmias",
            management: "Monitor blood pressure closely, reduce doses if needed"
        },
        {
            id: "9",
            drug1: "Amiodarone",
            drug2: "Digoxin",
            severity: "major",
            description: "Increased digoxin levels",
            clinicalEffects: "Digoxin toxicity, arrhythmias",
            management: "Monitor digoxin levels, reduce digoxin dose"
        },
        {
            id: "10",
            drug1: "Lidocaine",
            drug2: "Propranolol",
            severity: "moderate",
            description: "Increased lidocaine toxicity",
            clinicalEffects: "Enhanced CNS and cardiac effects",
            management: "Monitor for lidocaine toxicity signs"
        }
    ];
    // Check for interactions using fuzzy matching and partial name recognition
    const checkInteractions = () => {
        const interactions = [];
        for (let i = 0; i < selectedMedications.length; i++) {
            for (let j = i + 1; j < selectedMedications.length; j++) {
                const drug1 = selectedMedications[i];
                const drug2 = selectedMedications[j];
                // Check for exact matches first
                let interaction = clarkCountyInteractions.find(int => (int.drug1 === drug1 && int.drug2 === drug2) ||
                    (int.drug1 === drug2 && int.drug2 === drug1));
                // If no exact match, check for partial/fuzzy matches
                if (!interaction) {
                    interaction = clarkCountyInteractions.find(int => (drug1.toLowerCase().includes(int.drug1.toLowerCase()) && drug2.toLowerCase().includes(int.drug2.toLowerCase())) ||
                        (drug1.toLowerCase().includes(int.drug2.toLowerCase()) && drug2.toLowerCase().includes(int.drug1.toLowerCase())) ||
                        (int.drug1.toLowerCase().includes(drug1.toLowerCase()) && int.drug2.toLowerCase().includes(drug2.toLowerCase())) ||
                        (int.drug2.toLowerCase().includes(drug1.toLowerCase()) && int.drug1.toLowerCase().includes(drug2.toLowerCase())));
                }
                if (interaction) {
                    interactions.push(interaction);
                }
            }
        }
        return interactions;
    };
    const interactions = checkInteractions();
    const addMedication = (medicationName) => {
        if (!selectedMedications.includes(medicationName)) {
            setSelectedMedications([...selectedMedications, medicationName]);
        }
    };
    const removeMedication = (medicationName) => {
        setSelectedMedications(selectedMedications.filter(med => med !== medicationName));
    };
    const logMedication = useMutation({
        mutationFn: async (logData) => {
            // In real app, this would save to database
            const newLog = {
                ...logData,
                id: Date.now().toString(),
                timestamp: new Date()
            };
            setAdministrationLog([...administrationLog, newLog]);
            return newLog;
        },
        onSuccess: () => {
            toast({
                title: "Medication Logged",
                description: "Medication administration has been recorded",
            });
        },
    });
    const getSeverityBadge = (severity) => {
        switch (severity) {
            case 'major':
                return _jsxs(Badge, { variant: "destructive", className: "flex items-center gap-1", children: [_jsx(AlertTriangle, { className: "h-3 w-3" }), "Major"] });
            case 'moderate':
                return _jsxs(Badge, { variant: "secondary", className: "flex items-center gap-1 bg-yellow-100 text-yellow-800", children: [_jsx(AlertTriangle, { className: "h-3 w-3" }), "Moderate"] });
            case 'minor':
                return _jsxs(Badge, { variant: "outline", className: "flex items-center gap-1", children: [_jsx(AlertTriangle, { className: "h-3 w-3" }), "Minor"] });
            default:
                return null;
        }
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-orange-600" }), "Medication Interaction Checker"] }) }), _jsxs(Tabs, { defaultValue: "checker", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "checker", children: "Interaction Checker" }), _jsx(TabsTrigger, { value: "patient", children: "Patient Information" }), _jsx(TabsTrigger, { value: "log", children: "Administration Log" })] }), _jsxs(TabsContent, { value: "checker", className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "medication-search", children: "Search Clark County Approved Medications" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-3 h-4 w-4 text-gray-400" }), _jsx(Input, { id: "medication-search", placeholder: "Search medications...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-sm", children: "Available Medications" }) }), _jsx(CardContent, { className: "space-y-2 max-h-60 overflow-y-auto", children: filteredMedications.length === 0 ? (_jsx("p", { className: "text-gray-500 text-center py-8", children: searchTerm ? 'No medications match your search' : 'Loading medications...' })) : (filteredMedications.map((med) => (_jsxs("div", { className: "flex items-center justify-between p-2 border rounded", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: med.name }), _jsx("p", { className: "text-sm text-gray-600", children: med.scope || med.category || 'EMS Medication' })] }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => addMedication(med.name), disabled: selectedMedications.includes(med.name), children: _jsx(Plus, { className: "h-4 w-4" }) })] }, med.id)))) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-sm", children: "Selected Medications" }) }), _jsx(CardContent, { className: "space-y-2 max-h-60 overflow-y-auto", children: selectedMedications.length === 0 ? (_jsx("p", { className: "text-gray-500 text-center py-8", children: "No medications selected" })) : (selectedMedications.map((med, index) => (_jsxs("div", { className: "flex items-center justify-between p-2 border rounded", children: [_jsx("span", { className: "font-medium", children: med }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => removeMedication(med), children: _jsx(X, { className: "h-4 w-4" }) })] }, index)))) })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [interactions.length === 0 ? (_jsx(CheckCircle, { className: "h-5 w-5 text-green-600" })) : (_jsx(AlertTriangle, { className: "h-5 w-5 text-orange-600" })), "Interaction Analysis", _jsxs(Badge, { variant: "outline", className: "ml-2", children: [selectedMedications.length, " medications selected"] })] }) }), _jsx(CardContent, { children: selectedMedications.length < 2 ? (_jsxs(Alert, { children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: "Select at least 2 medications to check for interactions." })] })) : interactions.length === 0 ? (_jsxs(Alert, { children: [_jsx(CheckCircle, { className: "h-4 w-4" }), _jsxs(AlertDescription, { children: ["No significant drug interactions detected with selected medications.", _jsxs("div", { className: "mt-2 text-xs text-gray-600", children: ["Checked combinations: ", selectedMedications.map((med, i) => selectedMedications.slice(i + 1).map(med2 => `${med} + ${med2}`).join(', ')).filter(Boolean).join(', ') || 'None'] })] })] })) : (_jsx("div", { className: "space-y-4", children: interactions.map((interaction) => (_jsxs(Alert, { className: "border-orange-200", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "font-medium", children: [interaction.drug1, " + ", interaction.drug2] }), getSeverityBadge(interaction.severity)] }), _jsx("p", { className: "text-sm", children: interaction.description }), _jsxs("details", { className: "text-sm", children: [_jsx("summary", { className: "font-medium cursor-pointer", children: "Clinical Effects & Management" }), _jsxs("div", { className: "mt-2 space-y-1", children: [_jsxs("p", { children: [_jsx("strong", { children: "Effects:" }), " ", interaction.clinicalEffects] }), _jsxs("p", { children: [_jsx("strong", { children: "Management:" }), " ", interaction.management] })] })] })] }) })] }, interaction.id))) })) })] })] }), _jsx(TabsContent, { value: "patient", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(User, { className: "h-5 w-5" }), "Patient Information"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "age", children: "Age" }), _jsx(Input, { id: "age", type: "number", value: patientInfo.age, onChange: (e) => setPatientInfo({ ...patientInfo, age: e.target.value }), placeholder: "Patient age" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "weight", children: "Weight (kg)" }), _jsx(Input, { id: "weight", type: "number", value: patientInfo.weight, onChange: (e) => setPatientInfo({ ...patientInfo, weight: e.target.value }), placeholder: "Patient weight" })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "allergies", children: "Known Allergies" }), _jsx(Input, { id: "allergies", value: patientInfo.allergies, onChange: (e) => setPatientInfo({ ...patientInfo, allergies: e.target.value }), placeholder: "List known allergies" })] })] })] }) }), _jsx(TabsContent, { value: "log", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-5 w-5" }), "Medication Administration Log"] }) }), _jsx(CardContent, { children: administrationLog.length === 0 ? (_jsx("p", { className: "text-gray-500 text-center py-8", children: "No medications logged yet" })) : (_jsx("div", { className: "space-y-4", children: administrationLog.map((log) => (_jsxs("div", { className: "border rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h4", { className: "font-medium", children: log.medicationName }), _jsx(Badge, { variant: "outline", children: log.route })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm text-gray-600", children: [_jsxs("div", { children: [_jsx("strong", { children: "Dosage:" }), " ", log.dosage] }), _jsxs("div", { children: [_jsx("strong", { children: "Time:" }), " ", log.timestamp.toLocaleTimeString()] }), _jsxs("div", { children: [_jsx("strong", { children: "Administered by:" }), " ", log.administeredBy] }), _jsxs("div", { children: [_jsx("strong", { children: "Date:" }), " ", log.timestamp.toLocaleDateString()] })] }), log.notes && (_jsxs("div", { className: "mt-2 text-sm", children: [_jsx("strong", { children: "Notes:" }), " ", log.notes] }))] }, log.id))) })) })] }) })] })] }) }));
}
