import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertStudyNotesSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Plus, Search, Edit, Trash2, CheckCircle, Clock, Target, Hash, Award, ChevronRight, Brain, Heart, Activity, Shield, AlertTriangle, Users, Eye, Stethoscope, Pill, Thermometer, Scissors, Siren, Baby, UserCheck, Settings, Truck, Wrench, Radio, Biohazard } from "lucide-react";
export default function StudyNotes({ open, onOpenChange }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [isAddingNote, setIsAddingNote] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { data: studyNotes = [], isLoading } = useQuery({
        queryKey: ["/api/study-notes"],
        enabled: open,
    });
    const form = useForm({
        resolver: zodResolver(insertStudyNotesSchema),
        defaultValues: {
            chapterNumber: 1,
            title: "",
            content: "",
            bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
            tags: [],
            keyPoints: [],
            objectives: [],
            isCompleted: false,
        },
    });
    const createNoteMutation = useMutation({
        mutationFn: async (data) => {
            return await apiRequest("/api/study-notes", "POST", data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/study-notes"] });
            toast({ title: "Study note created successfully!" });
            form.reset();
            setIsAddingNote(false);
        },
        onError: (error) => {
            toast({
                title: "Error creating study note",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    const updateNoteMutation = useMutation({
        mutationFn: async ({ id, updates }) => {
            return await apiRequest(`/api/study-notes/${id}`, "PUT", updates);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/study-notes"] });
            toast({ title: "Study note updated successfully!" });
        },
        onError: (error) => {
            toast({
                title: "Error updating study note",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    const deleteNoteMutation = useMutation({
        mutationFn: async (id) => {
            return await apiRequest(`/api/study-notes/${id}`, "DELETE");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/study-notes"] });
            toast({ title: "Study note deleted successfully!" });
        },
        onError: (error) => {
            toast({
                title: "Error deleting study note",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    const filteredNotes = studyNotes.filter((note) => {
        const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesChapter = selectedChapter ? note.chapterNumber === selectedChapter : true;
        return matchesSearch && matchesChapter;
    });
    const onSubmit = (data) => {
        // Process tags and key points from comma-separated strings
        const processedData = {
            ...data,
            tags: typeof data.tags === 'string' ? data.tags.split(',').map(tag => tag.trim()) : data.tags,
            keyPoints: typeof data.keyPoints === 'string' ? data.keyPoints.split(',').map(point => point.trim()) : data.keyPoints,
            objectives: typeof data.objectives === 'string' ? data.objectives.split(',').map(obj => obj.trim()) : data.objectives,
        };
        createNoteMutation.mutate(processedData);
    };
    const toggleComplete = (note) => {
        updateNoteMutation.mutate({
            id: note.id,
            updates: { isCompleted: !note.isCompleted }
        });
    };
    const chapters = Array.from({ length: 41 }, (_, i) => i + 1);
    const getChapterIcon = (chapterNumber) => {
        const iconMap = {
            1: Siren, 2: Shield, 3: BookOpen, 4: Radio, 5: Hash, 6: Users, 7: Clock, 8: Activity, 9: Users, 10: Stethoscope,
            11: Activity, 12: Pill, 13: AlertTriangle, 14: Heart, 15: BookOpen, 16: Activity, 17: Heart, 18: Brain, 19: Activity, 20: Thermometer,
            21: AlertTriangle, 22: Biohazard, 23: Brain, 24: Users, 25: AlertTriangle, 26: AlertTriangle, 27: Scissors, 28: Eye, 29: Brain, 30: Activity,
            31: Activity, 32: Activity, 33: Thermometer, 34: Baby, 35: Baby, 36: UserCheck, 37: Settings, 38: Truck, 39: Wrench, 40: Radio, 41: Biohazard
        };
        return iconMap[chapterNumber] || BookOpen;
    };
    const getChapterColor = (chapterNumber) => {
        const colors = [
            "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-red-500",
            "bg-teal-500", "bg-indigo-500", "bg-pink-500", "bg-yellow-500", "bg-gray-500"
        ];
        return colors[chapterNumber % colors.length];
    };
    const getChapterCategory = (chapterNumber) => {
        if (chapterNumber <= 9)
            return "Foundation";
        if (chapterNumber <= 14)
            return "Basic Skills";
        if (chapterNumber <= 24)
            return "Medical Emergencies";
        if (chapterNumber <= 33)
            return "Trauma";
        if (chapterNumber <= 36)
            return "Special Populations";
        if (chapterNumber <= 39)
            return "Operations";
        return "Advanced Topics";
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-6xl h-[90vh] flex flex-col", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(BookOpen, { className: "h-5 w-5" }), "Study Notes - Emergency Care & Transportation 12th Edition"] }) }), _jsxs("div", { className: "flex-1 flex gap-4 min-h-0", children: [_jsx("div", { className: "w-64 border-r pr-4", children: _jsxs("div", { className: "space-y-4", children: [_jsxs(Button, { onClick: () => setIsAddingNote(true), className: "w-full", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Study Note"] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Search Notes" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-3 h-4 w-4 text-gray-400" }), _jsx(Input, { placeholder: "Search by title or content...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Filter by Chapter" }), _jsxs("select", { value: selectedChapter || "", onChange: (e) => setSelectedChapter(e.target.value ? parseInt(e.target.value) : null), className: "w-full p-2 border rounded-md", children: [_jsx("option", { value: "", children: "All Chapters" }), chapters.map(chapter => (_jsxs("option", { value: chapter, children: ["Chapter ", chapter] }, chapter)))] })] }), _jsxs("div", { className: "text-sm text-gray-500", children: [_jsxs("p", { children: ["Total Notes: ", studyNotes.length] }), _jsxs("p", { children: ["Completed: ", studyNotes.filter((note) => note.isCompleted).length] })] })] }) }), _jsx("div", { className: "flex-1 min-h-0", children: isAddingNote ? (_jsxs("div", { className: "h-full", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Add New Study Note" }), _jsx(Button, { variant: "outline", onClick: () => setIsAddingNote(false), children: "Cancel" })] }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "chapterNumber", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Chapter Number" }), _jsx(FormControl, { children: _jsx(Input, { type: "number", min: "1", max: "41", placeholder: "1", ...field, onChange: (e) => field.onChange(parseInt(e.target.value)) }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "title", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Chapter Title" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Enter chapter title...", ...field }) }), _jsx(FormMessage, {})] })) })] }), _jsx(FormField, { control: form.control, name: "content", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Study Notes Content" }), _jsx(FormControl, { children: _jsx(Textarea, { placeholder: "Enter your study notes here...", className: "min-h-[200px]", ...field }) }), _jsx(FormMessage, {})] })) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "tags", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Tags (comma-separated)" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "anatomy, assessment, trauma", ...field, value: Array.isArray(field.value) ? field.value.join(', ') : field.value }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "keyPoints", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Key Points (comma-separated)" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "primary assessment, ABCs, scene safety", ...field, value: Array.isArray(field.value) ? field.value.join(', ') : field.value }) }), _jsx(FormMessage, {})] })) })] }), _jsx(Button, { type: "submit", disabled: createNoteMutation.isPending, children: createNoteMutation.isPending ? "Creating..." : "Create Study Note" })] }) })] })) : (_jsx(ScrollArea, { className: "h-full", children: _jsx("div", { className: "space-y-4 pr-4", children: isLoading ? (_jsx("div", { className: "flex items-center justify-center h-32", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) })) : filteredNotes.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-gray-500", children: [_jsx(BookOpen, { className: "h-12 w-12 mx-auto mb-4 text-gray-300" }), _jsx("p", { className: "text-lg font-medium", children: "No study notes found" }), _jsx("p", { className: "text-sm", children: "Add your first note to get started!" })] })) : (_jsx("div", { className: "grid gap-4", children: ["Foundation", "Basic Skills", "Medical Emergencies", "Trauma", "Special Populations", "Operations", "Advanced Topics"].map(category => {
                                            const categoryNotes = filteredNotes.filter((note) => getChapterCategory(note.chapterNumber) === category);
                                            if (categoryNotes.length === 0)
                                                return null;
                                            return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2 pb-2 border-b", children: [_jsx("div", { className: "h-2 w-2 rounded-full bg-blue-500" }), _jsx("h3", { className: "font-semibold text-gray-800", children: category }), _jsxs(Badge, { variant: "outline", className: "text-xs", children: [categoryNotes.length, " chapters"] })] }), _jsx("div", { className: "grid gap-3", children: categoryNotes.map((note) => {
                                                            const IconComponent = getChapterIcon(note.chapterNumber);
                                                            const colorClass = getChapterColor(note.chapterNumber);
                                                            return (_jsxs(Card, { className: "hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: `p-2 rounded-lg ${colorClass} text-white flex-shrink-0`, children: _jsx(IconComponent, { className: "h-5 w-5" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs(CardTitle, { className: "text-lg flex items-center gap-2 mb-1", children: [_jsxs("span", { className: "text-blue-600 font-bold", children: ["Ch ", note.chapterNumber] }), _jsx(ChevronRight, { className: "h-4 w-4 text-gray-400" }), _jsx("span", { className: "truncate", children: note.title }), note.isCompleted && (_jsx(CheckCircle, { className: "h-5 w-5 text-green-500 flex-shrink-0" }))] }), _jsxs(CardDescription, { className: "text-sm text-gray-600 flex items-center gap-1", children: [_jsx(BookOpen, { className: "h-3 w-3" }), "Emergency Care & Transportation 12th Ed"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => toggleComplete(note), className: `${note.isCompleted ? "text-green-600 hover:text-green-700" : "text-gray-400 hover:text-gray-600"} transition-colors`, children: _jsx(CheckCircle, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", className: "text-gray-400 hover:text-blue-600", onClick: () => {
                                                                                                // TODO: Implement edit functionality
                                                                                            }, children: _jsx(Edit, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => deleteNoteMutation.mutate(note.id), className: "text-gray-400 hover:text-red-600", children: _jsx(Trash2, { className: "h-4 w-4" }) })] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("div", { className: "text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg", children: _jsx("div", { className: "prose prose-sm max-w-none", children: note.content.split('\n').map((paragraph, index) => {
                                                                                        if (paragraph.trim() === '')
                                                                                            return null;
                                                                                        if (paragraph.includes(':') && paragraph.length < 100) {
                                                                                            return (_jsx("h4", { className: "font-semibold text-blue-600 mt-3 mb-1 first:mt-0", children: paragraph }, index));
                                                                                        }
                                                                                        if (paragraph.startsWith('•')) {
                                                                                            return (_jsxs("div", { className: "flex items-start gap-2 mb-1", children: [_jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" }), _jsx("span", { children: paragraph.replace('• ', '') })] }, index));
                                                                                        }
                                                                                        return (_jsx("p", { className: "mb-2", children: paragraph }, index));
                                                                                    }) }) }), note.keyPoints && note.keyPoints.length > 0 && (_jsxs("div", { children: [_jsxs("h4", { className: "font-semibold text-sm mb-2 flex items-center gap-1", children: [_jsx(Target, { className: "h-4 w-4 text-blue-500" }), "Key Points"] }), _jsx("ul", { className: "space-y-1 text-sm text-gray-600", children: note.keyPoints.map((point, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" }), _jsx("span", { children: point })] }, index))) })] })), note.objectives && note.objectives.length > 0 && (_jsxs("div", { children: [_jsxs("h4", { className: "font-semibold text-sm mb-2 flex items-center gap-1", children: [_jsx(Award, { className: "h-4 w-4 text-green-500" }), "Learning Objectives"] }), _jsx("ul", { className: "space-y-1 text-sm text-gray-600", children: note.objectives.map((objective, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" }), _jsx("span", { children: objective })] }, index))) })] })), note.tags && note.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-1", children: note.tags.map((tag, index) => (_jsxs(Badge, { variant: "secondary", className: "text-xs flex items-center gap-1", children: [_jsx(Hash, { className: "h-3 w-3" }), tag] }, index))) }))] })] }, note.id));
                                                        }) })] }, category));
                                        }) })) }) })) })] })] }) }));
}
