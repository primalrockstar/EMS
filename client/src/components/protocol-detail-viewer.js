import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, User, AlertTriangle, CheckCircle, Info, Download, Printer, Star, Heart, Activity, Stethoscope, Shield } from "lucide-react";
export default function ProtocolDetailViewer({ protocolId, open, onOpenChange }) {
    const [activeTab, setActiveTab] = useState("overview");
    const { data: protocol, isLoading, error } = useQuery({
        queryKey: ["/api/protocols", protocolId],
        queryFn: async () => {
            if (!protocolId)
                return null;
            const response = await fetch(`/api/protocols/${protocolId}`);
            if (!response.ok)
                throw new Error("Protocol not found");
            return response.json();
        },
        enabled: !!protocolId && open,
    });
    if (!protocolId || !open)
        return null;
    if (isLoading) {
        return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsx(DialogContent, { className: "max-w-4xl max-h-[90vh]", children: _jsx("div", { className: "flex items-center justify-center py-8", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) }) }));
    }
    if (error || !protocol) {
        return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsx(DialogContent, { className: "max-w-4xl max-h-[90vh]", children: _jsxs("div", { className: "text-center py-8", children: [_jsx(AlertTriangle, { className: "h-12 w-12 text-red-500 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "Protocol Not Found" }), _jsx("p", { className: "text-muted-foreground", children: "Unable to load protocol details. Please try again or contact support." })] }) }) }));
    }
    const getCategoryIcon = (category) => {
        switch (category?.toLowerCase()) {
            case "cardiac": return Heart;
            case "respiratory": return Activity;
            case "trauma": return AlertTriangle;
            case "pediatric": return User;
            case "operations": return Shield;
            default: return FileText;
        }
    };
    const getCategoryColor = (category) => {
        switch (category?.toLowerCase()) {
            case "cardiac": return "bg-red-500";
            case "respiratory": return "bg-blue-500";
            case "trauma": return "bg-orange-500";
            case "pediatric": return "bg-green-500";
            case "operations": return "bg-purple-500";
            default: return "bg-gray-500";
        }
    };
    const CategoryIcon = getCategoryIcon(protocol.category);
    // Mock detailed protocol content - in production, this would come from the database
    const protocolDetails = {
        overview: protocol.description || "This protocol provides comprehensive guidelines for emergency medical treatment.",
        indications: protocol.indications || [
            "Primary indication for this protocol",
            "Secondary indication when applicable",
            "Special circumstances requiring this protocol"
        ],
        contraindications: protocol.contraindications || [
            "Absolute contraindications",
            "Relative contraindications",
            "Special considerations"
        ],
        procedure: protocol.procedure || [
            "1. Initial assessment and scene safety",
            "2. Primary survey (ABCDE)",
            "3. Obtain baseline vital signs",
            "4. Establish IV access if indicated",
            "5. Administer medications per protocol",
            "6. Continuous monitoring and reassessment",
            "7. Prepare for transport",
            "8. Ongoing care during transport"
        ],
        medications: protocol.medications || [
            {
                name: "Epinephrine",
                dose: "1 mg IV/IO (1:10,000)",
                route: "IV/IO",
                indication: "Cardiac arrest",
                contraindications: "None in cardiac arrest"
            },
            {
                name: "Atropine",
                dose: "0.5 mg IV/IO",
                route: "IV/IO",
                indication: "Bradycardia",
                contraindications: "Tachycardia"
            }
        ],
        equipment: protocol.equipment || [
            "Cardiac monitor/defibrillator",
            "IV supplies",
            "Oxygen delivery system",
            "Airway management equipment",
            "Medications per protocol"
        ],
        specialConsiderations: protocol.specialConsiderations || [
            "Pediatric considerations: Weight-based dosing",
            "Geriatric considerations: Comorbidities",
            "Pregnancy considerations: Positioning",
            "Environmental considerations: Weather/terrain"
        ]
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-6xl max-h-[90vh] p-0", "aria-describedby": "protocol-detail-description", children: [_jsx(DialogHeader, { className: "p-6 pb-0", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(CategoryIcon, { className: `h-6 w-6 ${protocol.category === 'cardiac' ? 'text-red-500' :
                                            protocol.category === 'respiratory' ? 'text-blue-500' :
                                                protocol.category === 'trauma' ? 'text-orange-500' :
                                                    protocol.category === 'pediatric' ? 'text-green-500' :
                                                        'text-purple-500'}` }), _jsxs("div", { children: [_jsx(DialogTitle, { className: "text-xl", children: protocol.name }), _jsxs("div", { id: "protocol-detail-description", className: "text-sm text-muted-foreground mt-1", children: [protocol.state, " \u2022 ", protocol.category, " \u2022 ", protocol.scope] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { className: `${getCategoryColor(protocol.category)} text-white`, children: protocol.category?.toUpperCase() }), _jsx(Badge, { variant: "outline", children: protocol.ageGroup || "Adult/Pediatric" })] })] }) }), _jsx("div", { className: "p-6 pt-0", children: _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-6", children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "procedure", children: "Procedure" }), _jsx(TabsTrigger, { value: "medications", children: "Medications" }), _jsx(TabsTrigger, { value: "equipment", children: "Equipment" }), _jsx(TabsTrigger, { value: "considerations", children: "Special" }), _jsx(TabsTrigger, { value: "references", children: "References" })] }), _jsxs(ScrollArea, { className: "h-[60vh] mt-4", children: [_jsx(TabsContent, { value: "overview", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Info, { className: "h-4 w-4" }), "Protocol Overview"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: "Description" }), _jsx("p", { className: "text-sm text-muted-foreground", children: protocolDetails.overview })] }), _jsx(Separator, {}), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("h4", { className: "font-semibold mb-2 flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }), "Indications"] }), _jsx("ul", { className: "text-sm space-y-1", children: protocolDetails.indications.map((indication, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-green-500", children: "\u2022" }), _jsx("span", { children: indication })] }, index))) })] }), _jsxs("div", { children: [_jsxs("h4", { className: "font-semibold mb-2 flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-red-500" }), "Contraindications"] }), _jsx("ul", { className: "text-sm space-y-1", children: protocolDetails.contraindications.map((contraindication, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-red-500", children: "\u2022" }), _jsx("span", { children: contraindication })] }, index))) })] })] })] })] }) }), _jsx(TabsContent, { value: "procedure", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Stethoscope, { className: "h-4 w-4" }), "Step-by-Step Procedure"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: protocolDetails.procedure.map((step, index) => (_jsxs("div", { className: "flex items-start gap-3 p-3 bg-muted/50 rounded-lg", children: [_jsx("div", { className: "w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium", children: index + 1 }), _jsx("div", { className: "flex-1", children: _jsx("p", { className: "text-sm", children: step }) })] }, index))) }) })] }) }), _jsx(TabsContent, { value: "medications", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Heart, { className: "h-4 w-4" }), "Medications"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: protocolDetails.medications.map((med, index) => (_jsxs("div", { className: "p-4 border rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h4", { className: "font-semibold", children: med.name }), _jsx(Badge, { variant: "outline", children: med.route })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Dose:" }), " ", med.dose] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Indication:" }), " ", med.indication] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("span", { className: "font-medium", children: "Contraindications:" }), " ", med.contraindications] })] })] }, index))) }) })] }) }), _jsx(TabsContent, { value: "equipment", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Shield, { className: "h-4 w-4" }), "Required Equipment"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2", children: protocolDetails.equipment.map((item, index) => (_jsxs("div", { className: "flex items-center gap-2 p-2 bg-muted/50 rounded", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }), _jsx("span", { className: "text-sm", children: item })] }, index))) }) })] }) }), _jsx(TabsContent, { value: "considerations", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), "Special Considerations"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: protocolDetails.specialConsiderations.map((consideration, index) => (_jsx("div", { className: "p-3 bg-yellow-50 border border-yellow-200 rounded-lg", children: _jsx("p", { className: "text-sm", children: consideration }) }, index))) }) })] }) }), _jsx(TabsContent, { value: "references", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(FileText, { className: "h-4 w-4" }), "Protocol Information"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Last Updated:" }), " ", protocol.updatedAt ? new Date(protocol.updatedAt).toLocaleDateString() : "Not available"] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Version:" }), " ", protocol.version || "1.0"] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "State:" }), " ", protocol.state] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Scope:" }), " ", protocol.scope] })] }), _jsx(Separator, {}), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { size: "sm", variant: "outline", children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Download PDF"] }), _jsxs(Button, { size: "sm", variant: "outline", children: [_jsx(Printer, { className: "h-4 w-4 mr-2" }), "Print"] }), _jsxs(Button, { size: "sm", variant: "outline", children: [_jsx(Star, { className: "h-4 w-4 mr-2" }), "Bookmark"] })] })] })] }) })] })] }) })] }) }));
}
