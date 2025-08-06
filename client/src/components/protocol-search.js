import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, Clock, Heart, Activity, Thermometer, Brain, Flame, Stethoscope, Zap } from "lucide-react";
export default function ProtocolSearch({ open, onOpenChange }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedUrgency, setSelectedUrgency] = useState("all");
    const { data: protocols, isLoading } = useQuery({
        queryKey: ["/api/protocols", searchTerm, selectedCategory],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (searchTerm)
                params.append("search", searchTerm);
            if (selectedCategory !== "all")
                params.append("category", selectedCategory);
            const response = await fetch(`/api/protocols?${params}`);
            return response.json();
        },
    });
    const categories = [
        { id: "all", name: "All Categories", icon: Filter },
        { id: "cardiac", name: "Cardiac", icon: Heart },
        { id: "respiratory", name: "Respiratory", icon: Activity },
        { id: "trauma", name: "Trauma", icon: Flame },
        { id: "neurological", name: "Neurological", icon: Brain },
        { id: "pediatric", name: "Pediatric", icon: Thermometer },
        { id: "toxicology", name: "Toxicology", icon: Zap },
        { id: "procedure", name: "Procedures", icon: Stethoscope }
    ];
    const urgencyLevels = [
        { id: "all", name: "All Urgency" },
        { id: "critical", name: "Critical" },
        { id: "urgent", name: "Urgent" },
        { id: "standard", name: "Standard" }
    ];
    const getCategoryColor = (category) => {
        const colors = {
            cardiac: "bg-red-500",
            respiratory: "bg-blue-500",
            trauma: "bg-orange-500",
            neurological: "bg-purple-500",
            pediatric: "bg-green-500",
            toxicology: "bg-yellow-500",
            procedure: "bg-pink-500"
        };
        return colors[category] || "bg-gray-500";
    };
    const getUrgencyColor = (urgency) => {
        const colors = {
            critical: "bg-red-500",
            urgent: "bg-orange-500",
            standard: "bg-green-500"
        };
        return colors[urgency] || "bg-gray-500";
    };
    const filteredProtocols = protocols?.filter((protocol) => {
        const matchesSearch = protocol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            protocol.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || protocol.category === selectedCategory;
        const matchesUrgency = selectedUrgency === "all" || protocol.urgency === selectedUrgency;
        return matchesSearch && matchesCategory && matchesUrgency;
    }) || [];
    const handleProtocolClick = (protocol) => {
        // Navigate to protocol detail or open modal
        window.location.href = `/protocols/${protocol.id}`;
    };
    const highlightSearchTerm = (text, term) => {
        if (!term)
            return text;
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] p-0", "aria-describedby": "protocol-search-description", children: [_jsxs(DialogHeader, { className: "p-6 pb-0", children: [_jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Search, { className: "h-5 w-5" }), "Protocol Search & Navigation"] }), _jsx("div", { id: "protocol-search-description", className: "text-sm text-muted-foreground", children: "Search and filter Clark County EMS protocols with decision-tree navigation" })] }), _jsxs(Card, { className: "w-full max-w-4xl mx-auto border-0 shadow-none", children: [_jsxs(CardHeader, { className: "hidden", children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Search, { className: "h-5 w-5" }), "Protocol Search & Navigation"] }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Search and filter Clark County EMS protocols with decision-tree navigation" })] }), _jsxs(CardContent, { className: "space-y-6 p-6", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" }), _jsx(Input, { placeholder: "Search protocols (e.g., 'chest pain', 'STEMI', 'trauma')...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Category" }), _jsx("div", { className: "grid grid-cols-4 gap-2", children: categories.map((category) => (_jsxs(Button, { variant: selectedCategory === category.id ? "default" : "outline", size: "sm", className: "h-auto p-2 flex flex-col items-center gap-1", onClick: () => setSelectedCategory(category.id), children: [_jsx(category.icon, { className: "h-4 w-4" }), _jsx("span", { className: "text-xs", children: category.name })] }, category.id))) })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Urgency" }), _jsx("div", { className: "grid grid-cols-4 gap-2", children: urgencyLevels.map((level) => (_jsx(Button, { variant: selectedUrgency === level.id ? "default" : "outline", size: "sm", onClick: () => setSelectedUrgency(level.id), children: level.name }, level.id))) })] })] }), _jsx(Separator, {}), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "text-lg font-semibold", children: ["Search Results (", filteredProtocols.length, ")"] }), searchTerm && (_jsxs(Badge, { variant: "outline", children: ["Searching for: \"", searchTerm, "\""] }))] }), isLoading ? (_jsx("div", { className: "text-center py-8", children: "Loading protocols..." })) : filteredProtocols.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(Search, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }), _jsx("p", { className: "text-muted-foreground", children: "No protocols found matching your criteria" }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Try different search terms or filter options" })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: filteredProtocols.map((protocol) => (_jsx(Card, { className: "hover:shadow-md transition-shadow cursor-pointer", children: _jsxs(CardContent, { className: "p-4", onClick: () => handleProtocolClick(protocol), children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${getCategoryColor(protocol.category)}` }), _jsx("h4", { className: "font-semibold text-sm", children: protocol.name })] }), _jsxs("div", { className: "flex gap-1", children: [_jsx(Badge, { variant: "secondary", className: `${getUrgencyColor(protocol.urgency)} text-white text-xs`, children: protocol.urgency }), _jsx(Badge, { variant: "outline", className: "text-xs", children: protocol.category })] })] }), _jsx("p", { className: "text-sm text-muted-foreground mb-3", children: protocol.description || "No description available" }), _jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsxs("span", { children: ["Updated: ", protocol.updatedAt ? new Date(protocol.updatedAt).toLocaleDateString() : "N/A"] })] }), _jsxs("div", { children: ["Scope: ", protocol.scope || "All"] })] })] }) }, protocol.id))) }))] }), searchTerm.toLowerCase().includes("chest pain") && (_jsxs(Card, { className: "bg-blue-50 border-blue-200", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [_jsx(Heart, { className: "h-4 w-4 text-red-500" }), "Decision Tree: Chest Pain"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", className: "text-xs", children: "STEMI Protocol" }), _jsx("span", { children: "\u2192 ST elevation, new LBBB" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", className: "text-xs", children: "Cardiac Protocol" }), _jsx("span", { children: "\u2192 Troponin positive, unstable" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", className: "text-xs", children: "Chest Pain Protocol" }), _jsx("span", { children: "\u2192 Stable, unclear etiology" })] })] }) })] }))] })] })] }) }));
}
