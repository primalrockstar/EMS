import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Eye, Download, Edit, WifiOff, ArrowLeft } from "lucide-react";
import ProtocolUpload from "@/components/protocol-upload";
// Helper functions for protocol-specific content
const getProtocolSpecificIndications = (protocol) => {
    if (!protocol)
        return null;
    const protocolName = protocol.name?.toLowerCase() || '';
    if (protocolName.includes('dnr') || protocolName.includes('do not resuscitate')) {
        return [
            'Valid DNR/POLST order present',
            'Patient or legal guardian request',
            'Terminal condition with poor prognosis',
            'Irreversible condition with no benefit from resuscitation'
        ];
    }
    if (protocolName.includes('cardiac arrest')) {
        return [
            'Unresponsive patient with no pulse',
            'No breathing or agonal respirations',
            'Witnessed or unwitnessed cardiac arrest',
            'Return of spontaneous circulation (ROSC)'
        ];
    }
    if (protocolName.includes('chest pain') || protocolName.includes('acs')) {
        return [
            'Chest pain or discomfort',
            'Signs and symptoms of acute coronary syndrome',
            'History of cardiac disease with new symptoms',
            'Referred pain to arms, jaw, or back'
        ];
    }
    if (protocolName.includes('respiratory distress')) {
        return [
            'Difficulty breathing or shortness of breath',
            'Abnormal respiratory rate or effort',
            'Cyanosis or decreased oxygen saturation',
            'Use of accessory muscles for breathing'
        ];
    }
    if (protocolName.includes('stroke') || protocolName.includes('cva')) {
        return [
            'Sudden onset of neurological symptoms',
            'Altered mental status or confusion',
            'Facial drooping or weakness',
            'Speech difficulties or slurred speech'
        ];
    }
    if (protocolName.includes('trauma')) {
        return [
            'Mechanism of injury suggests trauma',
            'Visible injuries or deformities',
            'Signs of internal bleeding',
            'Altered mental status from injury'
        ];
    }
    if (protocolName.includes('seizure')) {
        return [
            'Witnessed seizure activity',
            'Postictal state following seizure',
            'Status epilepticus (continuous seizure)',
            'First-time seizure with unknown cause'
        ];
    }
    if (protocolName.includes('allergic') || protocolName.includes('anaphylaxis')) {
        return [
            'Known allergen exposure',
            'Skin reactions (hives, swelling)',
            'Respiratory distress from allergic reaction',
            'Systemic allergic reaction symptoms'
        ];
    }
    if (protocolName.includes('overdose') || protocolName.includes('poisoning')) {
        return [
            'Suspected drug overdose',
            'Poisoning from ingestion',
            'Altered mental status from substances',
            'Witnessed substance abuse'
        ];
    }
    if (protocolName.includes('pediatric')) {
        return [
            'Patient under 18 years of age',
            'Pediatric-specific medical emergency',
            'Age-appropriate assessment findings',
            'Parental or guardian consent considerations'
        ];
    }
    return [
        'Clinical presentation consistent with protocol',
        'Patient meets protocol criteria',
        'Medical emergency requiring intervention',
        'Appropriate for EMS response level'
    ];
};
const getProtocolSpecificContraindications = (protocol) => {
    if (!protocol)
        return null;
    const protocolName = protocol.name?.toLowerCase() || '';
    if (protocolName.includes('dnr') || protocolName.includes('do not resuscitate')) {
        return [
            'No valid DNR/POLST documentation',
            'Questionable validity of DNR order',
            'Family objection to DNR status',
            'Reversible cause of arrest identified'
        ];
    }
    if (protocolName.includes('cardiac arrest')) {
        return [
            'Valid DNR/POLST order in place',
            'Signs of prolonged down time',
            'Obvious signs of death',
            'Unsafe scene conditions'
        ];
    }
    if (protocolName.includes('chest pain') || protocolName.includes('acs')) {
        return [
            'Allergy to aspirin or nitroglycerin',
            'Hypotension or shock',
            'Recent use of erectile dysfunction medications',
            'Severe bleeding or trauma'
        ];
    }
    if (protocolName.includes('respiratory distress')) {
        return [
            'Upper airway obstruction',
            'Tension pneumothorax',
            'Severe hypotension',
            'Allergy to bronchodilators'
        ];
    }
    return [
        'Patient refusal of treatment',
        'Contraindications to specific medications',
        'Unsafe scene conditions',
        'Outside scope of practice'
    ];
};
const getProtocolSpecificMedications = (protocol) => {
    if (!protocol)
        return null;
    const protocolName = protocol.name?.toLowerCase() || '';
    if (protocolName.includes('dnr') || protocolName.includes('do not resuscitate')) {
        return null; // No medications for DNR protocol
    }
    if (protocolName.includes('cardiac arrest')) {
        return [
            'Epinephrine 1:10,000 (1mg IV/IO)',
            'Amiodarone 300mg IV/IO',
            'Atropine 1mg IV/IO',
            'Sodium Bicarbonate 1mEq/kg IV/IO'
        ];
    }
    if (protocolName.includes('chest pain') || protocolName.includes('acs')) {
        return [
            'Aspirin 324mg PO (chewed)',
            'Nitroglycerin 0.4mg SL',
            'Morphine 2-4mg IV',
            'Oxygen as needed'
        ];
    }
    if (protocolName.includes('respiratory distress')) {
        return [
            'Albuterol 2.5mg via nebulizer',
            'Ipratropium 0.5mg via nebulizer',
            'Epinephrine 1:1000 (0.3mg IM)',
            'Methylprednisolone 125mg IV'
        ];
    }
    if (protocolName.includes('stroke') || protocolName.includes('cva')) {
        return [
            'Dextrose 50% (25g IV) if hypoglycemic',
            'Thiamine 100mg IV',
            'Oxygen as needed',
            'Normal saline for IV access'
        ];
    }
    if (protocolName.includes('seizure')) {
        return [
            'Lorazepam 2-4mg IV/IO',
            'Midazolam 5-10mg IM',
            'Dextrose 50% (25g IV) if hypoglycemic',
            'Thiamine 100mg IV'
        ];
    }
    if (protocolName.includes('allergic') || protocolName.includes('anaphylaxis')) {
        return [
            'Epinephrine 1:1000 (0.3mg IM)',
            'Diphenhydramine 25-50mg IV/IM',
            'Methylprednisolone 125mg IV',
            'Albuterol 2.5mg via nebulizer'
        ];
    }
    if (protocolName.includes('overdose') || protocolName.includes('poisoning')) {
        return [
            'Naloxone 0.4-2mg IV/IM/IN',
            'Flumazenil 0.2mg IV (if benzodiazepine)',
            'Activated charcoal 1g/kg PO',
            'Normal saline for IV access'
        ];
    }
    if (protocolName.includes('trauma')) {
        return [
            'Normal saline or lactated ringers',
            'Morphine 2-4mg IV for pain',
            'Fentanyl 1-2mcg/kg IV',
            'Tranexamic acid 1g IV (if available)'
        ];
    }
    return [
        'Normal saline for IV access',
        'Oxygen as clinically indicated',
        'Dextrose 50% if hypoglycemic',
        'Standard supportive medications'
    ];
};
const getProtocolSpecificEquipment = (protocol) => {
    if (!protocol)
        return null;
    const protocolName = protocol.name?.toLowerCase() || '';
    if (protocolName.includes('dnr') || protocolName.includes('do not resuscitate')) {
        return null; // No special equipment for DNR protocol
    }
    if (protocolName.includes('cardiac arrest')) {
        return [
            'Cardiac monitor/defibrillator',
            'Advanced airway equipment',
            'IV/IO access supplies',
            'Mechanical CPR device (if available)',
            'End-tidal CO2 monitor'
        ];
    }
    if (protocolName.includes('chest pain') || protocolName.includes('acs')) {
        return [
            '12-lead ECG machine',
            'Cardiac monitor',
            'IV supplies',
            'Oxygen delivery system',
            'Blood pressure cuff'
        ];
    }
    if (protocolName.includes('respiratory distress')) {
        return [
            'Pulse oximeter',
            'Nebulizer equipment',
            'Advanced airway kit',
            'Oxygen delivery devices',
            'Bag-valve mask'
        ];
    }
    if (protocolName.includes('stroke') || protocolName.includes('cva')) {
        return [
            'Blood glucose meter',
            'Blood pressure cuff',
            'Pulse oximeter',
            'IV supplies',
            'Stroke assessment scale'
        ];
    }
    if (protocolName.includes('trauma')) {
        return [
            'Spinal immobilization equipment',
            'Splinting materials',
            'Hemorrhage control supplies',
            'IV/IO access equipment',
            'Trauma dressings'
        ];
    }
    if (protocolName.includes('seizure')) {
        return [
            'IV/IO access supplies',
            'Blood glucose meter',
            'Suction equipment',
            'Oxygen delivery system',
            'Protective padding'
        ];
    }
    return [
        'Standard EMS assessment equipment',
        'Vital signs monitoring devices',
        'Basic life support equipment',
        'Patient transport equipment'
    ];
};
export default function Protocols() {
    const [showUpload, setShowUpload] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [stateFilter, setStateFilter] = useState("all");
    const [selectedProtocol, setSelectedProtocol] = useState(null);
    const [showProtocolDetail, setShowProtocolDetail] = useState(false);
    const { data: protocols, isLoading } = useQuery({
        queryKey: ["/api/protocols", { userId: 1, category: categoryFilter !== "all" ? categoryFilter : undefined, state: stateFilter !== "all" ? stateFilter : undefined }],
        queryFn: async () => {
            const params = new URLSearchParams({
                userId: "1",
                ...(categoryFilter !== "all" && { category: categoryFilter }),
                ...(stateFilter !== "all" && { state: stateFilter }),
            });
            const response = await fetch(`/api/protocols?${params}`);
            return response.json();
        },
    });
    const categoryColors = {
        "Adult Treatment": "bg-red-500",
        "Pediatric Treatment": "bg-green-500",
        "Operations": "bg-gray-500",
        "Procedures": "bg-blue-500",
        cardiac: "bg-red-500",
        respiratory: "bg-blue-500",
        trauma: "bg-orange-500",
        pediatric: "bg-purple-500",
        neurological: "bg-green-500",
        toxicology: "bg-yellow-500",
    };
    const filteredProtocols = protocols?.filter((protocol) => protocol.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "Protocol Management" }), _jsx("p", { className: "text-muted-foreground mt-3 text-lg", children: "Manage your uploaded protocols and access standard EMS protocols" })] }), _jsxs(Button, { onClick: () => setShowUpload(true), className: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Upload Protocol"] })] }), _jsx(Card, { className: "mb-6", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search protocols...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10" })] }), _jsxs(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [_jsx(SelectTrigger, { className: "w-full sm:w-48", children: _jsx(SelectValue, { placeholder: "All Categories" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Categories" }), _jsx(SelectItem, { value: "Adult Treatment", children: "Adult Treatment" }), _jsx(SelectItem, { value: "Pediatric Treatment", children: "Pediatric Treatment" }), _jsx(SelectItem, { value: "Operations", children: "Operations" }), _jsx(SelectItem, { value: "Procedures", children: "Procedures" }), _jsx(SelectItem, { value: "cardiac", children: "Cardiac" }), _jsx(SelectItem, { value: "respiratory", children: "Respiratory" }), _jsx(SelectItem, { value: "trauma", children: "Trauma" }), _jsx(SelectItem, { value: "neurological", children: "Neurological" }), _jsx(SelectItem, { value: "toxicology", children: "Toxicology" })] })] }), _jsxs(Select, { value: stateFilter, onValueChange: setStateFilter, children: [_jsx(SelectTrigger, { className: "w-full sm:w-48", children: _jsx(SelectValue, { placeholder: "All States" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All States" }), _jsx(SelectItem, { value: "Nevada", children: "Nevada" }), _jsx(SelectItem, { value: "California", children: "California" }), _jsx(SelectItem, { value: "Texas", children: "Texas" }), _jsx(SelectItem, { value: "Florida", children: "Florida" }), _jsx(SelectItem, { value: "New York", children: "New York" }), _jsx(SelectItem, { value: "Ohio", children: "Ohio" })] })] })] }) }) }), isLoading ? (_jsx("div", { className: "text-center py-8", children: "Loading protocols..." })) : filteredProtocols?.length === 0 ? (_jsx(Card, { children: _jsx(CardContent, { className: "p-8 text-center", children: _jsx("div", { className: "text-muted-foreground", children: searchTerm ? "No protocols found matching your search." : "No protocols found. Upload your first protocol to get started." }) }) })) : (_jsx(Card, { children: _jsx(CardContent, { className: "p-0", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-muted/50", children: _jsxs("tr", { children: [_jsx("th", { className: "text-left p-4 font-medium", children: "Protocol" }), _jsx("th", { className: "text-left p-4 font-medium", children: "Category" }), _jsx("th", { className: "text-left p-4 font-medium", children: "State" }), _jsx("th", { className: "text-left p-4 font-medium", children: "Updated" }), _jsx("th", { className: "text-center p-4 font-medium", children: "Actions" })] }) }), _jsx("tbody", { children: filteredProtocols?.map((protocol) => (_jsxs("tr", { className: "border-b hover:bg-muted/30 transition-colors", children: [_jsx("td", { className: "p-4", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("div", { className: "font-medium text-foreground mb-1", children: protocol.name }), _jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [protocol.scope && (_jsx(Badge, { variant: "secondary", className: "text-xs", children: protocol.scope })), protocol.ageGroup && (_jsx(Badge, { variant: "outline", className: "text-xs", children: protocol.ageGroup.replace('_', ' & ') })), protocol.isOffline && (_jsxs(Badge, { className: "bg-green-500 text-white text-xs", children: [_jsx(WifiOff, { className: "h-3 w-3 mr-1" }), "Offline"] }))] }), protocol.description && (_jsx("div", { className: "text-xs text-muted-foreground line-clamp-1", children: protocol.description }))] }) }), _jsx("td", { className: "p-4", children: _jsx(Badge, { className: `${categoryColors[protocol.category] || 'bg-gray-500'} text-white text-xs`, children: protocol.category.toUpperCase() }) }), _jsx("td", { className: "p-4", children: _jsx(Badge, { variant: "outline", className: "text-xs", children: protocol.state || "Generic" }) }), _jsx("td", { className: "p-4 text-sm text-muted-foreground", children: new Date(protocol.updatedAt).toLocaleDateString() }), _jsx("td", { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-center space-x-1", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
                                                                setSelectedProtocol(protocol);
                                                                setShowProtocolDetail(true);
                                                            }, className: "h-8 w-8 p-0", children: _jsx(Eye, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
                                                                // Create a downloadable link
                                                                const element = document.createElement('a');
                                                                const file = new Blob([protocol.content || `${protocol.name}\n\n${protocol.description || 'No content available'}`], { type: 'text/plain' });
                                                                element.href = URL.createObjectURL(file);
                                                                element.download = `${protocol.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
                                                                document.body.appendChild(element);
                                                                element.click();
                                                                document.body.removeChild(element);
                                                            }, className: "h-8 w-8 p-0", children: _jsx(Download, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
                                                                setSelectedProtocol(protocol);
                                                                setShowUpload(true);
                                                            }, className: "h-8 w-8 p-0", children: _jsx(Edit, { className: "h-4 w-4" }) })] }) })] }, protocol.id))) })] }) }) }) })), _jsx(ProtocolUpload, { open: showUpload, onOpenChange: setShowUpload }), _jsx(Dialog, { open: showProtocolDetail, onOpenChange: setShowProtocolDetail, children: _jsxs(DialogContent, { className: "max-w-6xl max-h-[90vh]", children: [_jsx(DialogHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => setShowProtocolDetail(false), children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back"] }), _jsxs("div", { children: [_jsx(DialogTitle, { className: "text-xl font-bold", children: selectedProtocol?.name }), _jsx(DialogDescription, { children: "Comprehensive EMS protocol details and procedures" })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Badge, { className: `${categoryColors[selectedProtocol?.category] || 'bg-gray-500'} text-white`, children: selectedProtocol?.category }), _jsx(Badge, { variant: "outline", children: selectedProtocol?.state || "Generic" }), selectedProtocol?.scope && (_jsx(Badge, { className: "bg-blue-500 text-white", children: selectedProtocol?.scope }))] })] }) }), _jsxs(Tabs, { defaultValue: "overview", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-6", children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "procedures", children: "Procedure" }), _jsx(TabsTrigger, { value: "medications", children: "Medications" }), _jsx(TabsTrigger, { value: "equipment", children: "Equipment" }), _jsx(TabsTrigger, { value: "special", children: "Special" }), _jsx(TabsTrigger, { value: "references", children: "References" })] }), _jsxs(ScrollArea, { className: "max-h-[60vh] mt-4", children: [_jsxs(TabsContent, { value: "overview", className: "space-y-4", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx("div", { className: "w-3 h-3 bg-blue-500 rounded-full mr-3" }), _jsx("h3", { className: "text-lg font-semibold", children: "Protocol Overview" })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "font-semibold mb-2", children: "What is this protocol?" }), _jsxs("div", { className: "bg-muted p-4 rounded-md border-l-4 border-blue-500", children: [_jsx("p", { className: "text-sm text-muted-foreground mb-3", children: selectedProtocol?.description || "This protocol provides comprehensive guidance for emergency medical services personnel." }), _jsxs("div", { className: "text-sm", children: [_jsx("strong", { children: "Full Protocol Details:" }), _jsx("div", { className: "mt-2 whitespace-pre-wrap font-mono text-xs bg-background p-3 rounded border max-h-40 overflow-y-auto", children: selectedProtocol?.content || "No detailed content available for this protocol." })] })] })] }), getProtocolSpecificIndications(selectedProtocol) && (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800", children: [_jsxs("h4", { className: "font-semibold mb-3 flex items-center", children: [_jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full mr-2" }), "Indications"] }), _jsx("ul", { className: "text-sm space-y-1", children: getProtocolSpecificIndications(selectedProtocol)?.map((indication, index) => (_jsxs("li", { children: ["\u2022 ", indication] }, index))) })] }), _jsxs("div", { className: "bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800", children: [_jsxs("h4", { className: "font-semibold mb-3 flex items-center", children: [_jsx("span", { className: "w-2 h-2 bg-red-500 rounded-full mr-2" }), "Contraindications"] }), _jsx("ul", { className: "text-sm space-y-1", children: getProtocolSpecificContraindications(selectedProtocol)?.map((contraindication, index) => (_jsxs("li", { children: ["\u2022 ", contraindication] }, index))) })] })] })), _jsxs("div", { className: "bg-muted p-4 rounded-lg", children: [_jsx("h4", { className: "font-semibold mb-3", children: "Protocol Information" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("strong", { children: "Category:" }), " ", selectedProtocol?.category] }), _jsxs("div", { children: [_jsx("strong", { children: "State:" }), " ", selectedProtocol?.state || "Generic"] }), _jsxs("div", { children: [_jsx("strong", { children: "Age Group:" }), " ", selectedProtocol?.ageGroup?.replace('_', ' & ') || 'All ages'] }), _jsxs("div", { children: [_jsx("strong", { children: "Scope:" }), " ", selectedProtocol?.scope || 'All levels'] }), _jsxs("div", { children: [_jsx("strong", { children: "Last Updated:" }), " ", selectedProtocol?.updatedAt ? new Date(selectedProtocol.updatedAt).toLocaleDateString() : 'N/A'] }), _jsxs("div", { children: [_jsx("strong", { children: "Version:" }), " 2025.1"] })] })] })] }), _jsxs(TabsContent, { value: "procedures", className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-3", children: "Step-by-Step Procedures" }), _jsx("div", { className: "bg-muted p-4 rounded-md", children: _jsx("div", { className: "whitespace-pre-wrap text-sm font-mono", children: selectedProtocol?.content || "No detailed procedures available for this protocol." }) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Special Considerations" }), _jsxs("div", { className: "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-3 rounded-md", children: [_jsx("div", { className: "font-medium text-yellow-800 dark:text-yellow-200 mb-1", children: "\u26A0\uFE0F WARNINGS:" }), _jsxs("ul", { className: "text-sm text-yellow-700 dark:text-yellow-300 space-y-1", children: [_jsx("li", { children: "\u2022 Always follow local protocols and medical direction" }), _jsx("li", { children: "\u2022 Consider patient allergies and contraindications" }), _jsx("li", { children: "\u2022 Monitor for adverse reactions" }), _jsx("li", { children: "\u2022 Document all interventions and patient responses" })] })] })] })] }), _jsx(TabsContent, { value: "medications", className: "space-y-4", children: _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-3", children: "Protocol-Specific Medications" }), getProtocolSpecificMedications(selectedProtocol) ? (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-muted p-4 rounded-md", children: [_jsxs("h5", { className: "font-medium mb-2", children: ["Medications for ", selectedProtocol?.name] }), _jsx("ul", { className: "text-sm space-y-1", children: getProtocolSpecificMedications(selectedProtocol)?.map((medication, index) => (_jsxs("li", { children: ["\u2022 ", medication] }, index))) })] }), _jsxs("div", { className: "bg-muted p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Dosing Guidelines" }), _jsxs("div", { className: "text-sm space-y-2", children: [_jsxs("div", { children: [_jsx("strong", { children: "Adult:" }), " Follow standard protocols"] }), _jsxs("div", { children: [_jsx("strong", { children: "Pediatric:" }), " Calculate by weight"] }), _jsxs("div", { children: [_jsx("strong", { children: "Geriatric:" }), " Consider reduced doses"] }), _jsxs("div", { children: [_jsx("strong", { children: "Pregnancy:" }), " Category B/C considerations"] })] })] })] })) : (_jsx("div", { className: "bg-muted p-4 rounded-md text-center", children: _jsx("p", { className: "text-sm text-muted-foreground", children: "No specific medications required for this protocol." }) }))] }) }), _jsx(TabsContent, { value: "equipment", className: "space-y-4", children: _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-3", children: "Required Equipment" }), getProtocolSpecificEquipment(selectedProtocol) ? (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-muted p-4 rounded-md", children: [_jsxs("h5", { className: "font-medium mb-2", children: ["Equipment for ", selectedProtocol?.name] }), _jsx("ul", { className: "text-sm space-y-1", children: getProtocolSpecificEquipment(selectedProtocol)?.map((equipment, index) => (_jsxs("li", { children: ["\u2022 ", equipment] }, index))) })] }), _jsxs("div", { className: "bg-muted p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Equipment Checks" }), _jsxs("div", { className: "text-sm space-y-1", children: [_jsx("div", { children: "\u2022 Ensure all equipment is functional" }), _jsx("div", { children: "\u2022 Check expiration dates" }), _jsx("div", { children: "\u2022 Verify proper calibration" }), _jsx("div", { children: "\u2022 Test battery levels" })] })] })] })) : (_jsx("div", { className: "bg-muted p-4 rounded-md text-center", children: _jsx("p", { className: "text-sm text-muted-foreground", children: "No specific equipment required for this protocol beyond standard EMS supplies." }) }))] }) }), _jsxs(TabsContent, { value: "special", className: "space-y-4", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx("div", { className: "w-3 h-3 bg-orange-500 rounded-full mr-3" }), _jsx("h3", { className: "text-lg font-semibold", children: "Special Considerations" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800", children: [_jsxs("h4", { className: "font-semibold mb-3 flex items-center", children: [_jsx("span", { className: "w-2 h-2 bg-orange-500 rounded-full mr-2" }), "Age-Specific Considerations"] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("strong", { children: "Pediatric:" }), _jsxs("ul", { className: "mt-1 space-y-1", children: [_jsx("li", { children: "\u2022 Weight-based dosing calculations" }), _jsx("li", { children: "\u2022 Age-appropriate assessment techniques" }), _jsx("li", { children: "\u2022 Special equipment sizing" })] })] }), _jsxs("div", { children: [_jsx("strong", { children: "Geriatric:" }), _jsxs("ul", { className: "mt-1 space-y-1", children: [_jsx("li", { children: "\u2022 Reduced medication clearance" }), _jsx("li", { children: "\u2022 Increased fall risk" }), _jsx("li", { children: "\u2022 Polypharmacy considerations" })] })] })] })] }), _jsxs("div", { className: "bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800", children: [_jsxs("h4", { className: "font-semibold mb-3 flex items-center", children: [_jsx("span", { className: "w-2 h-2 bg-purple-500 rounded-full mr-2" }), "Environmental Factors"] }), _jsxs("ul", { className: "text-sm space-y-1", children: [_jsx("li", { children: "\u2022 Weather and temperature considerations" }), _jsx("li", { children: "\u2022 Scene safety and hazardous materials" }), _jsx("li", { children: "\u2022 Resource availability and transport time" }), _jsx("li", { children: "\u2022 Communication with receiving facility" })] })] }), _jsxs("div", { className: "bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800", children: [_jsxs("h4", { className: "font-semibold mb-3 flex items-center", children: [_jsx("span", { className: "w-2 h-2 bg-blue-500 rounded-full mr-2" }), "Legal and Ethical Considerations"] }), _jsxs("ul", { className: "text-sm space-y-1", children: [_jsx("li", { children: "\u2022 Informed consent requirements" }), _jsx("li", { children: "\u2022 DNR/POLST documentation" }), _jsx("li", { children: "\u2022 Mandatory reporting obligations" }), _jsx("li", { children: "\u2022 Documentation requirements" })] })] })] })] }), _jsxs(TabsContent, { value: "references", className: "space-y-4", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx("div", { className: "w-3 h-3 bg-gray-500 rounded-full mr-3" }), _jsx("h3", { className: "text-lg font-semibold", children: "References & Resources" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-muted p-4 rounded-lg", children: [_jsx("h4", { className: "font-semibold mb-3", children: "Clinical Guidelines" }), _jsxs("ul", { className: "text-sm space-y-2", children: [_jsx("li", { children: "\u2022 American Heart Association (AHA) Guidelines" }), _jsx("li", { children: "\u2022 Emergency Nurses Association (ENA) Standards" }), _jsx("li", { children: "\u2022 National Association of EMS Physicians (NAEMSP)" }), _jsx("li", { children: "\u2022 ProMedix EMS Protocol Manual 2025" })] })] }), _jsxs("div", { className: "bg-muted p-4 rounded-lg", children: [_jsx("h4", { className: "font-semibold mb-3", children: "Supporting Literature" }), _jsxs("ul", { className: "text-sm space-y-2", children: [_jsx("li", { children: "\u2022 Emergency Care and Transportation of the Sick and Injured (AAOS)" }), _jsx("li", { children: "\u2022 Paramedic Practice Today: Above and Beyond" }), _jsx("li", { children: "\u2022 Evidence-based Emergency Medicine Guidelines" }), _jsx("li", { children: "\u2022 Pediatric Emergency Medicine References" })] })] }), _jsxs("div", { className: "bg-muted p-4 rounded-lg", children: [_jsx("h4", { className: "font-semibold mb-3", children: "Online Resources" }), _jsxs("ul", { className: "text-sm space-y-2", children: [_jsx("li", { children: "\u2022 National Registry of Emergency Medical Technicians (NREMT)" }), _jsx("li", { children: "\u2022 Emergency Medical Services Authority (EMSA)" }), _jsx("li", { children: "\u2022 Centers for Disease Control and Prevention (CDC)" }), _jsx("li", { children: "\u2022 Nevada State Office of Emergency Medical Services" })] })] }), _jsxs("div", { className: "bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800", children: [_jsx("h4", { className: "font-semibold mb-3", children: "Contact Information" }), _jsxs("div", { className: "text-sm space-y-2", children: [_jsxs("div", { children: [_jsx("strong", { children: "Medical Director:" }), " Contact through ProMedix EMS"] }), _jsxs("div", { children: [_jsx("strong", { children: "Protocol Questions:" }), " Medical control consultation"] }), _jsxs("div", { children: [_jsx("strong", { children: "Emergency:" }), " Direct physician consultation via radio/phone"] }), _jsxs("div", { children: [_jsx("strong", { children: "Updates:" }), " Monitor ProMedix EMS for protocol revisions"] })] })] })] })] })] })] })] }) })] }));
}
