import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Play, CheckCircle, Clock, GraduationCap, Heart, Shield, Baby, AlertTriangle, Zap, Activity, Eye, Trophy, FileText, Brain, Users, Briefcase, Lock, Calculator, Pill } from "lucide-react";
import ScenarioViewer from "@/components/scenario-viewer";
import PatientSimulator from "@/components/patient-simulator";
import AnatomyExplorer from "@/components/anatomy-explorer";
import LearningPaths from "@/components/learning-paths";
import StudyNotes from "@/components/study-notes";
import FlashcardViewer from "@/components/flashcard-viewer-fixed";
import { useUserTier } from "@/hooks/useUserTier";
import { useLocation } from "wouter";
import NremtPracticeModule from "@/components/nremt-practice-module";
import PCRDocumentationApp from "@/components/pcr-documentation-app";

export default function Learning() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [scenarioViewerOpen, setScenarioViewerOpen] = useState(false);
  const [patientSimulatorOpen, setPatientSimulatorOpen] = useState(false);
  const [anatomyExplorerOpen, setAnatomyExplorerOpen] = useState(false);
  const [learningPathsOpen, setLearningPathsOpen] = useState(false);
  const [studyNotesOpen, setStudyNotesOpen] = useState(false);
  const [flashcardViewerOpen, setFlashcardViewerOpen] = useState(false);
  const [nremtPracticeOpen, setNremtPracticeOpen] = useState(false);
  const [pcrDocumentationOpen, setPcrDocumentationOpen] = useState(false);
  
  const { userTier, switchTier, isBasic, isPro } = useUserTier();
  const [, setLocation] = useLocation();

  const { data: modules, isLoading } = useQuery({
    queryKey: ["/api/learning-modules"],
    enabled: isBasic, // Only load modules for Basic tier
  });

  // Filter modules by type - Pro tier has no learning modules
  const basicModules = modules?.filter((module: any) => module.moduleNumber === 0) || [];

  const getGuideIcon = (title: string) => {
    if (title.includes("First Aid")) return <Shield className="h-5 w-5" />;
    if (title.includes("Adult CPR")) return <Heart className="h-5 w-5" />;
    if (title.includes("Pediatric")) return <Baby className="h-5 w-5" />;
    return <BookOpen className="h-5 w-5" />;
  };

  const getGuideColor = (title: string) => {
    if (title.includes("First Aid")) return "bg-green-500";
    if (title.includes("Adult CPR")) return "bg-red-500";
    if (title.includes("Pediatric")) return "bg-blue-500";
    return "bg-gray-500";
  };

  const renderGuideContent = (guide: any) => {
    if (!guide.content) return null;
    
    const content = typeof guide.content === 'string' ? JSON.parse(guide.content) : guide.content;
    
    if (guide.title.includes("First Aid")) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                  When to Call 911
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{content.when911}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Shield className="h-5 w-5 mr-2 text-blue-500" />
                  Primary Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{content.emergencyPriorities}</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="bleeding" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="bleeding">Bleeding</TabsTrigger>
              <TabsTrigger value="burns">Burns</TabsTrigger>
              <TabsTrigger value="choking">Choking</TabsTrigger>
              <TabsTrigger value="emergencies">Emergencies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bleeding" className="space-y-4">
              <Card>
                <CardHeader><CardTitle>Minor Cuts</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.bleeding.minor}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Severe Bleeding</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.bleeding.severe}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Nosebleeds</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.bleeding.nosebleeds}</p></CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="burns" className="space-y-4">
              <Card>
                <CardHeader><CardTitle>First-Degree Burns</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.burns.firstDegree}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Second-Degree Burns</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.burns.secondDegree}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Third-Degree Burns</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.burns.thirdDegree}</p></CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="choking" className="space-y-4">
              <Card>
                <CardHeader><CardTitle>Adult Choking</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.choking.adult}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Infant Choking</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.choking.infant}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Unconscious Choking</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.choking.unconscious}</p></CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="emergencies" className="space-y-4">
              <Card>
                <CardHeader><CardTitle>Heart Attack</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.heartAttack}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Stroke (FAST)</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.stroke}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Allergic Reactions</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm"><strong>Mild:</strong> {content.allergicReactions.mild}</p>
                  <p className="text-sm mt-2"><strong>Severe:</strong> {content.allergicReactions.severe}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      );
    }
    
    if (guide.title.includes("Adult CPR")) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  When to Use CPR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{content.when}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  Before You Begin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{content.beforeBegin}</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="technique" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="technique">Technique</TabsTrigger>
              <TabsTrigger value="breathing">With Breathing</TabsTrigger>
              <TabsTrigger value="aed">AED Use</TabsTrigger>
            </TabsList>
            
            <TabsContent value="technique" className="space-y-4">
              <Card>
                <CardHeader><CardTitle>Hand Placement</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.handPlacement}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Compression Technique</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.technique}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Hands-Only CPR</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.handsOnly}</p></CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="breathing" className="space-y-4">
              <Card>
                <CardHeader><CardTitle>CPR with Rescue Breathing (30:2)</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.withBreathing}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Important Reminders</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.reminders}</p></CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="aed" className="space-y-4">
              <Card>
                <CardHeader><CardTitle>AED Steps</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.aed}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Special Considerations</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.specialConsiderations}</p></CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      );
    }
    
    if (guide.title.includes("Pediatric")) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Baby className="h-5 w-5 mr-2 text-blue-500" />
                  Age Groups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{content.ageGroups}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                  When to Use CPR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{content.when}</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="infant" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="infant">Infant CPR</TabsTrigger>
              <TabsTrigger value="child">Child CPR</TabsTrigger>
              <TabsTrigger value="differences">Key Differences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="infant" className="space-y-4">
              <Card>
                <CardHeader><CardTitle>Hand Placement</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.infant.handPlacement}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Technique</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.infant.technique}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Rescue Breaths</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.infant.breaths}</p></CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="child" className="space-y-4">
              <Card>
                <CardHeader><CardTitle>Hand Placement</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.child.handPlacement}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Technique</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.child.technique}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Rescue Breaths</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.child.breaths}</p></CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="differences" className="space-y-4">
              <Card>
                <CardHeader><CardTitle>Infant Differences</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.differences}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>AED Use</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.aed}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Two-Person CPR</CardTitle></CardHeader>
                <CardContent><p className="text-sm">{content.twoPerson}</p></CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Content available for this guide. Click to expand sections.
        </p>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading learning modules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">EMS Learning Center</h1>
        <p className="text-muted-foreground">
          Two-mode educational system: Basic for students, Pro for field professionals
        </p>
        
        {/* Mode Selection */}
        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm font-medium">Current Mode:</span>
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={isBasic ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                switchTier('basic');
                setLocation('/');
              }}
              className={isBasic ? "bg-blue-500 text-white hover:bg-blue-600" : ""}
            >
              <Users className="h-4 w-4 mr-2" />
              Basic (Student)
            </Button>
            <Button
              variant={isPro ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                switchTier('pro');
                setLocation('/pro');
              }}
              className={isPro ? "bg-green-500 text-white hover:bg-green-600" : ""}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Pro (Field Professional)
            </Button>
          </div>
        </div>
      </div>

      {/* Conditional Content Based on Tier */}
      {isBasic ? (
        <div className="space-y-8">

        {/* Basic Tier Educational Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Medical Reference Guides
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Essential emergency medical reference guides for EMS students and professionals
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {basicModules.map((guide: any) => (
                  <Card key={guide.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge className={`${getGuideColor(guide.title)} text-white`}>
                          {getGuideIcon(guide.title)}
                          <span className="ml-1">Reference Guide</span>
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{guide.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {guide.tags?.map((tag: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Action */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              className="w-full"
                              onClick={() => setSelectedGuide(guide)}
                            >
                              <BookOpen className="h-4 w-4 mr-2" />
                              View Guide
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh]">
                            <DialogHeader>
                              <DialogTitle className="flex items-center">
                                {getGuideIcon(guide.title)}
                                <span className="ml-2">{guide.title}</span>
                              </DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="h-[70vh]">
                              <div className="p-4">
                                {renderGuideContent(guide)}
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interactive Learning Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Interactive Learning Tools
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Practice with realistic scenarios and decision trees to build critical thinking skills
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <Button 
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  onClick={() => setScenarioViewerOpen(true)}
                >
                  <Play className="h-6 w-6" />
                  <span>Case Scenarios</span>
                </Button>
                <Button 
                  className="h-20 flex flex-col items-center justify-center space-y-2" 
                  variant="outline"
                  onClick={() => setPatientSimulatorOpen(true)}
                >
                  <Activity className="h-6 w-6" />
                  <span>Patient Simulations</span>
                </Button>
                <Button 
                  className="h-20 flex flex-col items-center justify-center space-y-2" 
                  variant="outline"
                  onClick={() => setAnatomyExplorerOpen(true)}
                >
                  <Eye className="h-6 w-6" />
                  <span>Anatomy Explorer</span>
                </Button>
                <Button 
                  className="h-20 flex flex-col items-center justify-center space-y-2" 
                  variant="outline"
                  onClick={() => setLearningPathsOpen(true)}
                >
                  <Trophy className="h-6 w-6" />
                  <span>Learning Paths</span>
                </Button>
                <Button 
                  className="h-20 flex flex-col items-center justify-center space-y-2" 
                  variant="outline"
                  onClick={() => setStudyNotesOpen(true)}
                >
                  <FileText className="h-6 w-6" />
                  <span>Study Notes</span>
                </Button>
                <Button 
                  className="h-20 flex flex-col items-center justify-center space-y-2" 
                  variant="outline"
                  onClick={() => setFlashcardViewerOpen(true)}
                >
                  <Brain className="h-6 w-6" />
                  <span>Flashcards</span>
                </Button>
                <Button 
                  className="h-20 flex flex-col items-center justify-center space-y-2" 
                  variant="outline"
                  onClick={() => setNremtPracticeOpen(true)}
                >
                  <GraduationCap className="h-6 w-6" />
                  <span>NREMT Practice</span>
                </Button>
                <Button 
                  className="h-20 flex flex-col items-center justify-center space-y-2" 
                  variant="outline"
                  onClick={() => setPcrDocumentationOpen(true)}
                >
                  <FileText className="h-6 w-6" />
                  <span>PCR Documentation</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Pro Tier - No Learning Content */
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Professional Field Tools
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Advanced tools for field professionals - no educational content
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Lock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Pro Mode - Field Tools Only</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Pro mode provides field-ready tools and protocols without educational content. 
                  Access advanced calculators, protocol management, and professional references through the main navigation.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <div className="p-4 border rounded-lg">
                    <Calculator className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                    <h4 className="font-medium">Advanced Calculators</h4>
                    <p className="text-sm text-muted-foreground">Field-ready medical calculators</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <FileText className="h-8 w-8 mx-auto text-green-500 mb-2" />
                    <h4 className="font-medium">Protocol Management</h4>
                    <p className="text-sm text-muted-foreground">Professional protocol tools</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Pill className="h-8 w-8 mx-auto text-red-500 mb-2" />
                    <h4 className="font-medium">Medication Reference</h4>
                    <p className="text-sm text-muted-foreground">Quick drug reference</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button 
                    onClick={() => switchTier('basic')}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Switch to Basic for Educational Content
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Interactive Learning Modals - Only show for Basic tier */}
      {isBasic && (
        <>
          <ScenarioViewer 
            open={scenarioViewerOpen} 
            onOpenChange={setScenarioViewerOpen} 
          />
          <PatientSimulator 
            open={patientSimulatorOpen} 
            onOpenChange={setPatientSimulatorOpen} 
          />
          <AnatomyExplorer 
            open={anatomyExplorerOpen} 
            onOpenChange={setAnatomyExplorerOpen} 
          />
          <LearningPaths 
            open={learningPathsOpen} 
            onOpenChange={setLearningPathsOpen} 
          />
          <StudyNotes 
            open={studyNotesOpen} 
            onOpenChange={setStudyNotesOpen} 
          />
          <FlashcardViewer 
            open={flashcardViewerOpen} 
            onOpenChange={setFlashcardViewerOpen} 
          />
          <NremtPracticeModule 
            open={nremtPracticeOpen} 
            onOpenChange={setNremtPracticeOpen} 
          />
          <PCRDocumentationApp 
            open={pcrDocumentationOpen} 
            onOpenChange={setPcrDocumentationOpen} 
          />
        </>
      )}
    </div>
  );
}
