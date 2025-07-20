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
import { insertStudyNotesSchema, type StudyNote } from "../../shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen, Plus, Search, Edit, Trash2, CheckCircle, Clock, Target, Hash, Award, ChevronRight, Brain, Heart, Activity, Shield, AlertTriangle, Users, Zap, Eye, Stethoscope, Pill, Thermometer, Scissors, Car, Siren, Flame, Baby, UserCheck, Settings, Truck, Wrench, Radio, Biohazard
} from "lucide-react";

interface StudyNotesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function StudyNotes({ open, onOpenChange }: StudyNotesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: studyNotes = [], isLoading } = useQuery({
    queryKey: ["/api/study-notes"],
    enabled: open,
  });

  const form = useForm<z.infer<typeof insertStudyNotesSchema>>({
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
    mutationFn: async (data: z.infer<typeof insertStudyNotesSchema>) => {
      return await apiRequest("/api/study-notes", "POST", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/study-notes"] });
      toast({ title: "Study note created successfully!" });
      form.reset();
      setIsAddingNote(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error creating study note",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<StudyNote> }) => {
      return await apiRequest(`/api/study-notes/${id}`, "PUT", updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/study-notes"] });
      toast({ title: "Study note updated successfully!" });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating study note",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/study-notes/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/study-notes"] });
      toast({ title: "Study note deleted successfully!" });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting study note",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const filteredNotes = studyNotes.filter((note: StudyNote) => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChapter = selectedChapter ? note.chapterNumber === selectedChapter : true;
    return matchesSearch && matchesChapter;
  });

  const onSubmit = (data: z.infer<typeof insertStudyNotesSchema>) => {
    const processedData = {
      ...data,
      tags: typeof data.tags === 'string' ? data.tags.split(',').map(tag => tag.trim()) : data.tags,
      keyPoints: typeof data.keyPoints === 'string' ? data.keyPoints.split(',').map(point => point.trim()) : data.keyPoints,
      objectives: typeof data.objectives === 'string' ? data.objectives.split(',').map(obj => obj.trim()) : data.objectives,
    };
    createNoteMutation.mutate(processedData);
  };

  const toggleComplete = (note: StudyNote) => {
    updateNoteMutation.mutate({
      id: note.id,
      updates: { isCompleted: !note.isCompleted },
    });
  };

  const chapters = Array.from({ length: 41 }, (_, i) => i + 1);

  const getChapterIcon = (chapterNumber: number) => {
    const iconMap: { [key: number]: any } = {
      1: Siren, 2: Shield, 3: BookOpen, 4: Radio, 5: Hash, 6: Users, 7: Clock, 8: Activity, 9: Users, 10: Stethoscope,
      11: Activity, 12: Pill, 13: AlertTriangle, 14: Heart, 15: BookOpen, 16: Activity, 17: Heart, 18: Brain, 19: Activity, 20: Thermometer,
      21: AlertTriangle, 22: Biohazard, 23: Brain, 24: Users, 25: AlertTriangle, 26: AlertTriangle, 27: Scissors, 28: Eye, 29: Brain, 30: Activity,
      31: Activity, 32: Activity, 33: Thermometer, 34: Baby, 35: Baby, 36: UserCheck, 37: Settings, 38: Truck, 39: Wrench, 40: Radio, 41: Biohazard
    };
    return iconMap[chapterNumber] || BookOpen;
  };

  const getChapterColor = (chapterNumber: number) => {
    const colors = [
      "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-red-500",
      "bg-teal-500", "bg-indigo-500", "bg-pink-500", "bg-yellow-500", "bg-gray-500"
    ];
    return colors[chapterNumber % colors.length];
  };

  const getChapterCategory = (chapterNumber: number) => {
    if (chapterNumber <= 9) return "Foundation";
    if (chapterNumber <= 14) return "Basic Skills";
    if (chapterNumber <= 24) return "Medical Emergencies";
    if (chapterNumber <= 33) return "Trauma";
    if (chapterNumber <= 36) return "Special Populations";
    if (chapterNumber <= 39) return "Operations";
    return "Advanced Topics";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader>
         
