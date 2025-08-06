import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
export default function ProtocolUpload({ open, onOpenChange }) {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        state: "",
        ageGroup: "adult_pediatric",
        content: "",
    });
    const [preview, setPreview] = useState("");
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/json': ['.json'],
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            const uploadedFile = acceptedFiles[0];
            if (uploadedFile) {
                setFile(uploadedFile);
                setFormData(prev => ({ ...prev, name: uploadedFile.name.split('.')[0] }));
                // Simple preview for text files
                if (uploadedFile.type === 'application/json') {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        try {
                            const content = JSON.parse(e.target?.result);
                            setPreview(JSON.stringify(content, null, 2));
                        }
                        catch (error) {
                            setPreview("Invalid JSON file");
                        }
                    };
                    reader.readAsText(uploadedFile);
                }
                else {
                    setPreview(`File: ${uploadedFile.name} (${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)`);
                }
            }
        },
    });
    const uploadMutation = useMutation({
        mutationFn: async () => {
            const formDataToSend = new FormData();
            if (file) {
                formDataToSend.append('file', file);
            }
            formDataToSend.append('name', formData.name);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('state', formData.state);
            formDataToSend.append('ageGroup', formData.ageGroup);
            formDataToSend.append('content', formData.content || preview);
            formDataToSend.append('userId', '1'); // Mock user ID
            return await apiRequest('POST', '/api/protocols', formDataToSend);
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Protocol uploaded successfully",
            });
            queryClient.invalidateQueries({ queryKey: ['/api/protocols'] });
            queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
            onOpenChange(false);
            resetForm();
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message || "Failed to upload protocol",
                variant: "destructive",
            });
        },
    });
    const resetForm = () => {
        setFile(null);
        setFormData({
            name: "",
            category: "",
            state: "",
            ageGroup: "adult_pediatric",
            content: "",
        });
        setPreview("");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.category) {
            toast({
                title: "Error",
                description: "Please fill in all required fields",
                variant: "destructive",
            });
            return;
        }
        uploadMutation.mutate();
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-2xl", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Upload Protocol" }) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { ...getRootProps(), className: `border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'}`, children: [_jsx("input", { ...getInputProps() }), _jsx(Upload, { className: "mx-auto h-12 w-12 text-muted-foreground mb-4" }), _jsx("h4", { className: "text-lg font-medium mb-2", children: isDragActive ? 'Drop files here' : 'Drop files here or click to browse' }), _jsx("p", { className: "text-muted-foreground", children: "Supports PDF, Word (.docx), and JSON files" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "name", children: "Protocol Name *" }), _jsx(Input, { id: "name", placeholder: "e.g., Cardiac Arrest Protocol", value: formData.name, onChange: (e) => setFormData(prev => ({ ...prev, name: e.target.value })), required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "category", children: "Category *" }), _jsxs(Select, { value: formData.category, onValueChange: (value) => setFormData(prev => ({ ...prev, category: value })), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select Category" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "cardiac", children: "Cardiac" }), _jsx(SelectItem, { value: "respiratory", children: "Respiratory" }), _jsx(SelectItem, { value: "trauma", children: "Trauma" }), _jsx(SelectItem, { value: "pediatric", children: "Pediatric" }), _jsx(SelectItem, { value: "neurological", children: "Neurological" }), _jsx(SelectItem, { value: "toxicology", children: "Toxicology" }), _jsx(SelectItem, { value: "medical", children: "Medical" }), _jsx(SelectItem, { value: "obstetrics", children: "Obstetrics" }), _jsx(SelectItem, { value: "behavioral", children: "Behavioral Health" }), _jsx(SelectItem, { value: "environmental", children: "Environmental" }), _jsx(SelectItem, { value: "burns", children: "Burns" }), _jsx(SelectItem, { value: "overdose", children: "Overdose" }), _jsx(SelectItem, { value: "pain_management", children: "Pain Management" }), _jsx(SelectItem, { value: "airway", children: "Airway Management" }), _jsx(SelectItem, { value: "shock", children: "Shock" }), _jsx(SelectItem, { value: "allergic", children: "Allergic Reactions" }), _jsx(SelectItem, { value: "infectious", children: "Infectious Disease" }), _jsx(SelectItem, { value: "geriatric", children: "Geriatric" }), _jsx(SelectItem, { value: "operations", children: "Operations" }), _jsx(SelectItem, { value: "procedures", children: "Procedures" }), _jsx(SelectItem, { value: "medications", children: "Medications" }), _jsx(SelectItem, { value: "equipment", children: "Equipment" }), _jsx(SelectItem, { value: "communications", children: "Communications" }), _jsx(SelectItem, { value: "transport", children: "Transport" }), _jsx(SelectItem, { value: "documentation", children: "Documentation" }), _jsx(SelectItem, { value: "quality_assurance", children: "Quality Assurance" }), _jsx(SelectItem, { value: "safety", children: "Safety" }), _jsx(SelectItem, { value: "legal", children: "Legal/Ethical" }), _jsx(SelectItem, { value: "special_populations", children: "Special Populations" }), _jsx(SelectItem, { value: "mass_casualty", children: "Mass Casualty" }), _jsx(SelectItem, { value: "hazmat", children: "Hazmat" }), _jsx(SelectItem, { value: "water_rescue", children: "Water Rescue" }), _jsx(SelectItem, { value: "wilderness", children: "Wilderness" }), _jsx(SelectItem, { value: "tactical", children: "Tactical" }), _jsx(SelectItem, { value: "other", children: "Other" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "state", children: "State/Region" }), _jsxs(Select, { value: formData.state, onValueChange: (value) => setFormData(prev => ({ ...prev, state: value })), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select State" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "alabama", children: "Alabama" }), _jsx(SelectItem, { value: "alaska", children: "Alaska" }), _jsx(SelectItem, { value: "arizona", children: "Arizona" }), _jsx(SelectItem, { value: "arkansas", children: "Arkansas" }), _jsx(SelectItem, { value: "california", children: "California" }), _jsx(SelectItem, { value: "colorado", children: "Colorado" }), _jsx(SelectItem, { value: "connecticut", children: "Connecticut" }), _jsx(SelectItem, { value: "delaware", children: "Delaware" }), _jsx(SelectItem, { value: "florida", children: "Florida" }), _jsx(SelectItem, { value: "georgia", children: "Georgia" }), _jsx(SelectItem, { value: "hawaii", children: "Hawaii" }), _jsx(SelectItem, { value: "idaho", children: "Idaho" }), _jsx(SelectItem, { value: "illinois", children: "Illinois" }), _jsx(SelectItem, { value: "indiana", children: "Indiana" }), _jsx(SelectItem, { value: "iowa", children: "Iowa" }), _jsx(SelectItem, { value: "kansas", children: "Kansas" }), _jsx(SelectItem, { value: "kentucky", children: "Kentucky" }), _jsx(SelectItem, { value: "louisiana", children: "Louisiana" }), _jsx(SelectItem, { value: "maine", children: "Maine" }), _jsx(SelectItem, { value: "maryland", children: "Maryland" }), _jsx(SelectItem, { value: "massachusetts", children: "Massachusetts" }), _jsx(SelectItem, { value: "michigan", children: "Michigan" }), _jsx(SelectItem, { value: "minnesota", children: "Minnesota" }), _jsx(SelectItem, { value: "mississippi", children: "Mississippi" }), _jsx(SelectItem, { value: "missouri", children: "Missouri" }), _jsx(SelectItem, { value: "montana", children: "Montana" }), _jsx(SelectItem, { value: "nebraska", children: "Nebraska" }), _jsx(SelectItem, { value: "nevada", children: "Nevada" }), _jsx(SelectItem, { value: "new_hampshire", children: "New Hampshire" }), _jsx(SelectItem, { value: "new_jersey", children: "New Jersey" }), _jsx(SelectItem, { value: "new_mexico", children: "New Mexico" }), _jsx(SelectItem, { value: "new_york", children: "New York" }), _jsx(SelectItem, { value: "north_carolina", children: "North Carolina" }), _jsx(SelectItem, { value: "north_dakota", children: "North Dakota" }), _jsx(SelectItem, { value: "ohio", children: "Ohio" }), _jsx(SelectItem, { value: "oklahoma", children: "Oklahoma" }), _jsx(SelectItem, { value: "oregon", children: "Oregon" }), _jsx(SelectItem, { value: "pennsylvania", children: "Pennsylvania" }), _jsx(SelectItem, { value: "rhode_island", children: "Rhode Island" }), _jsx(SelectItem, { value: "south_carolina", children: "South Carolina" }), _jsx(SelectItem, { value: "south_dakota", children: "South Dakota" }), _jsx(SelectItem, { value: "tennessee", children: "Tennessee" }), _jsx(SelectItem, { value: "texas", children: "Texas" }), _jsx(SelectItem, { value: "utah", children: "Utah" }), _jsx(SelectItem, { value: "vermont", children: "Vermont" }), _jsx(SelectItem, { value: "virginia", children: "Virginia" }), _jsx(SelectItem, { value: "washington", children: "Washington" }), _jsx(SelectItem, { value: "west_virginia", children: "West Virginia" }), _jsx(SelectItem, { value: "wisconsin", children: "Wisconsin" }), _jsx(SelectItem, { value: "wyoming", children: "Wyoming" }), _jsx(SelectItem, { value: "district_of_columbia", children: "District of Columbia" }), _jsx(SelectItem, { value: "puerto_rico", children: "Puerto Rico" }), _jsx(SelectItem, { value: "american_samoa", children: "American Samoa" }), _jsx(SelectItem, { value: "guam", children: "Guam" }), _jsx(SelectItem, { value: "northern_mariana_islands", children: "Northern Mariana Islands" }), _jsx(SelectItem, { value: "us_virgin_islands", children: "US Virgin Islands" }), _jsx(SelectItem, { value: "national", children: "National" }), _jsx(SelectItem, { value: "international", children: "International" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "ageGroup", children: "Applicable To" }), _jsxs(Select, { value: formData.ageGroup, onValueChange: (value) => setFormData(prev => ({ ...prev, ageGroup: value })), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "adult_pediatric", children: "Adult & Pediatric" }), _jsx(SelectItem, { value: "adult", children: "Adult Only" }), _jsx(SelectItem, { value: "pediatric", children: "Pediatric Only" }), _jsx(SelectItem, { value: "geriatric", children: "Geriatric" })] })] })] })] }), preview && (_jsx(Card, { children: _jsxs(CardContent, { className: "p-4", children: [_jsx("h4", { className: "font-medium mb-2", children: "Preview" }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [file && (_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx(FileText, { className: "h-4 w-4 text-red-500" }), _jsx("span", { children: file.name }), _jsxs("span", { className: "text-xs bg-muted px-2 py-1 rounded", children: [(file.size / 1024 / 1024).toFixed(2), " MB"] })] })), _jsx("pre", { className: "whitespace-pre-wrap text-xs bg-muted p-2 rounded max-h-32 overflow-y-auto", children: preview })] })] }) })), _jsxs("div", { className: "flex space-x-3", children: [_jsxs(Button, { type: "submit", disabled: uploadMutation.isPending, className: "flex-1", children: [_jsx(Save, { className: "h-4 w-4 mr-2" }), uploadMutation.isPending ? 'Saving...' : 'Save Protocol'] }), _jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), className: "flex-1", children: "Cancel" })] })] })] }) }));
}
