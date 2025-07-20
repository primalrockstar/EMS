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
import { BookOpen, Plus, Search, Edit, Trash2, CheckCircle, Clock, Target, Hash, Award, ChevronRight, Brain, Heart, Activity, Shield, AlertTriangle, Users, Zap, Eye, Stethoscope, Pill, Thermometer, Scissors, Car, Siren, Flame, Baby, UserCheck, Settings, Truck, Wrench, Radio, Biohazard } from "lucide-react";

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
    // Process tags, keyPoints, objectives if they are input as comma strings
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
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Study Notes - Emergency Care & Transportation 12th Edition
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex gap-4 min-h-0">
          {/* Sidebar */}
          <div className="w-64 border-r pr-4">
            <div className="space-y-4">
              <Button
                onClick={() => setIsAddingNote(true)}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Study Note
              </Button>

              <div className="space-y-2">
                <Label>Search Notes</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by title or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Filter by Chapter</Label>
                <select
                  value={selectedChapter || ""}
                  onChange={(e) => setSelectedChapter(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">All Chapters</option>
                  {chapters.map(chapter => (
                    <option key={chapter} value={chapter}>
                      Chapter {chapter}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-sm text-gray-500">
                <p>Total Notes: {studyNotes.length}</p>
                <p>Completed: {studyNotes.filter((note: StudyNote) => note.isCompleted).length}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-h-0">
            {isAddingNote ? (
              <div className="h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Add New Study Note</h3>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingNote(false)}
                  >
                    Cancel
                  </Button>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="chapterNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chapter Number</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                max="41"
                                placeholder="1"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chapter Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter chapter title..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Study Notes Content</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your study notes here..."
                              className="min-h-[200px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags (comma-separated)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="anatomy, assessment, trauma"
                                {...field}
                                value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="keyPoints"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Key Points (comma-separated)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="primary assessment, ABCs, scene safety"
                                {...field}
                                value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" disabled={createNoteMutation.isPending}>
                      {createNoteMutation.isPending ? "Creating..." : "Create Study Note"}
                    </Button>
                  </form>
                </Form>
              </div>
            ) : (
              <ScrollArea className="h-full">
                <div className="space-y-4 pr-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : filteredNotes.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">No study notes found</p>
                      <p className="text-sm">Add your first note to get started!</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {/* Group by category */}
                      {["Foundation", "Basic Skills", "Medical Emergencies", "Trauma", "Special Populations", "Operations", "Advanced Topics"].map(category => {
                        const categoryNotes = filteredNotes.filter((note: StudyNote) => getChapterCategory(note.chapterNumber) === category);
                        if (categoryNotes.length === 0) return null;
                        return (
                          <div key={category} className="space-y-3">
                            <div className="flex items-center gap-2 pb-2 border-b">
                              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                              <h3 className="font-semibold text-gray-800">{category}</h3>
                              <Badge variant="outline" className="text-xs">
                                {categoryNotes.length} chapters
                              </Badge>
                            </div>
                            <div className="grid gap-3">
                              {categoryNotes.map((note: StudyNote) => {
                                const IconComponent = getChapterIcon(note.chapterNumber);
                                const colorClass = getChapterColor(note.chapterNumber);
                                return (
                                  <Card key={note.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
                                    <CardHeader className="pb-3">
                                      <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg ${colorClass} text-white flex-shrink-0`}>
                                          <IconComponent className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <CardTitle className="text-lg flex items-center gap-2 mb-1">
                                            <span className="text-blue-600 font-bold">Ch {note.chapterNumber}</span>
                                            <ChevronRight className="h-4 w-4 text-gray-400" />
                                            <span className="truncate">{note.title}</span>
                                            {note.isCompleted && (
                                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                            )}
                                          </CardTitle>
                                          <CardDescription className="text-sm text-gray-600 flex items-center gap-1">
                                            <BookOpen className="h-3 w-3" />
                                            Emergency Care & Transportation 12th Ed
                                          </CardDescription>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleComplete(note)}
                                            className={`${note.isCompleted ? "text-green-600 hover:text-green-700" : "text-gray-400 hover:text-gray-600"} transition-colors`}
                                          >
                                            <CheckCircle className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-400 hover:text-blue-600"
                                            onClick={() => {
                                              // TODO: Implement edit functionality
                                            }}
                                          >
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteNoteMutation.mutate(note.id)}
                                            className="text-gray-400 hover:text-red-600"
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">
                                        <div className="prose prose-sm max-w-none">
                                          {note.content.split('\n').map((paragraph, index) => {
                                            if (paragraph.trim() === '') return null;
                                            if (paragraph.includes(':') && paragraph.length < 100) {
                                              return (
                                                <h4 key={index} className="font-semibold text-blue-600 mt-3 mb-1 first:mt-0">
                                                  {paragraph}
                                                </h4>
                                              );
                                            }
                                            if (paragraph.startsWith('•')) {
                                              return (
                                                <div key={index} className="flex items-start gap-2 mb-1">
                                                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                                                  <span>{paragraph.replace('• ', '')}</span>
                                                </div>
                                              );
                                            }
                                            return (
                                              <p key={index} className="mb-2">
                                                {paragraph}
                                              </p>
                                            );
                                          })}
                                        </div>
                                      </div>
                                      {note.keyPoints && note.keyPoints.length > 0 && (
                                        <div>
                                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                                            <Target className="h-4 w-4 text-blue-500" />
                                            Key Points
                                          </h4>
                                          <ul className="space-y-1 text-sm text-gray-600">
                                            {note.keyPoints.map((point, index) => (
                                              <li key={index} className="flex items-start gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                                                <span>{point}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      {note.objectives && note.objectives.length > 0 && (
                                        <div>
                                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                                            <Award className="h-4 w-4 text-green-500" />
                                            Learning Objectives
                                          </h4>
                                          <ul className="space-y-1 text-sm text-gray-600">
                                            {note.objectives.map((objective, index) => (
                                              <li key={index} className="flex items-start gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                                                <span>{objective}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      {note.tags && note.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                          {note.tags.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs flex items-center gap-1">
                                              <Hash className="h-3 w-3" />
                                              {tag}
                                            </Badge>
                                          ))}
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
