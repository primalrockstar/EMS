import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, CheckCircle, Clock, User, Heart, Brain, Zap } from "lucide-react";

interface TrainingScenario {
  id: string;
  title: string;
  description: string;
  difficulty: "Basic" | "Intermediate" | "Advanced";
  duration: string;
  level: "EMT" | "AEMT" | "Paramedic";
  category: "Cardiac" | "Respiratory" | "Trauma" | "Medical" | "Pediatric";
  objectives: string[];
  steps: ScenarioStep[];
  completed: boolean;
  score?: number;
}

interface ScenarioStep {
  id: string;
  description: string;
  type: "assessment" | "intervention" | "decision";
  options?: string[];
  correctAnswer?: string;
  explanation: string;
}

export default function EnhancedTrainingScenarios() {
  const [selectedScenario, setSelectedScenario] = useState<TrainingScenario | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [userLevel, setUserLevel] = useState<"EMT" | "AEMT" | "Paramedic">("EMT");

  const scenarios: TrainingScenario[] = [
    {
      id: "cardiac-arrest",
      title: "Adult Cardiac Arrest",
      description: "Unresponsive adult patient requiring immediate CPR and advanced life support",
      difficulty: "Intermediate",
      duration: "15-20 minutes",
      level: "EMT",
      category: "Cardiac",
      objectives: [
        "Recognize cardiac arrest",
        "Perform high-quality CPR",
        "Use AED effectively",
        "Coordinate team response"
      ],
      steps: [
        {
          id: "scene-safety",
          description: "You arrive at a scene where a 65-year-old male is found unresponsive on the floor. What is your first priority?",
          type: "decision",
          options: ["Check for pulse", "Begin CPR immediately", "Ensure scene safety", "Call for backup"],
          correctAnswer: "Ensure scene safety",
          explanation: "Scene safety is always the first priority. You must ensure the scene is safe before approaching the patient."
        },
        {
          id: "initial-assessment",
          description: "Scene is safe. Patient is unresponsive. What is your next action?",
          type: "assessment",
          options: ["Check for breathing and pulse", "Open airway", "Start compressions", "Attach AED"],
          correctAnswer: "Check for breathing and pulse",
          explanation: "You must assess for signs of life - breathing and pulse - to determine if CPR is needed."
        },
        {
          id: "cpr-initiation",
          description: "Patient has no pulse and is not breathing normally. What should you do?",
          type: "intervention",
          options: ["Give rescue breaths", "Start chest compressions", "Attach AED first", "Check blood pressure"],
          correctAnswer: "Start chest compressions",
          explanation: "High-quality chest compressions should be started immediately for cardiac arrest."
        }
      ],
      completed: false
    },
    {
      id: "respiratory-distress",
      title: "Severe Respiratory Distress",
      description: "Patient experiencing acute respiratory distress with potential airway compromise",
      difficulty: "Advanced",
      duration: "20-25 minutes",
      level: "AEMT",
      category: "Respiratory",
      objectives: [
        "Assess respiratory status",
        "Identify airway compromise",
        "Implement airway management",
        "Monitor treatment effectiveness"
      ],
      steps: [
        {
          id: "primary-assessment",
          description: "42-year-old female presents with severe shortness of breath, tripod positioning, and audible wheezing. What is your immediate concern?",
          type: "assessment",
          options: ["Asthma exacerbation", "Pneumothorax", "Anaphylaxis", "All of the above"],
          correctAnswer: "All of the above",
          explanation: "All these conditions can present with severe respiratory distress and require immediate assessment and treatment."
        }
      ],
      completed: false
    },
    {
      id: "trauma-assessment",
      title: "Multi-System Trauma",
      description: "Motor vehicle collision with multiple injuries requiring systematic assessment",
      difficulty: "Advanced",
      duration: "25-30 minutes",
      level: "Paramedic",
      category: "Trauma",
      objectives: [
        "Perform primary survey",
        "Identify life threats",
        "Prioritize interventions",
        "Manage shock"
      ],
      steps: [
        {
          id: "trauma-survey",
          description: "Multiple vehicle collision. Patient is conscious but appears injured. What is your systematic approach?",
          type: "decision",
          options: ["Head-to-toe assessment", "ABCDE primary survey", "Vital signs first", "Spinal immobilization"],
          correctAnswer: "ABCDE primary survey",
          explanation: "The ABCDE (Airway, Breathing, Circulation, Disability, Exposure) approach ensures systematic identification of life threats."
        }
      ],
      completed: false
    }
  ];

  const filteredScenarios = scenarios.filter(scenario => 
    scenario.level === userLevel || 
    (userLevel === "AEMT" && scenario.level === "EMT") ||
    (userLevel === "Paramedic" && (scenario.level === "EMT" || scenario.level === "AEMT"))
  );

  const handleAnswerSelect = (stepId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [stepId]: answer }));
  };

  const handleNextStep = () => {
    if (selectedScenario && currentStep < selectedScenario.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    if (!selectedScenario) return 0;
    const correctAnswers = selectedScenario.steps.filter(step => 
      userAnswers[step.id] === step.correctAnswer
    ).length;
    return Math.round((correctAnswers / selectedScenario.steps.length) * 100);
  };

  const resetScenario = () => {
    setSelectedScenario(null);
    setCurrentStep(0);
    setUserAnswers({});
    setShowResults(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Cardiac": return <Heart className="h-5 w-5" />;
      case "Respiratory": return <Zap className="h-5 w-5" />;
      case "Trauma": return <AlertTriangle className="h-5 w-5" />;
      case "Medical": return <User className="h-5 w-5" />;
      case "Pediatric": return <User className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Basic": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Selection */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Training Scenarios</h2>
        <div className="flex gap-2">
          {["EMT", "AEMT", "Paramedic"].map((level) => (
            <Button
              key={level}
              variant={userLevel === level ? "default" : "outline"}
              size="sm"
              onClick={() => setUserLevel(level as "EMT" | "AEMT" | "Paramedic")}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>

      {/* Scenario Selection */}
      {!selectedScenario && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScenarios.map((scenario) => (
            <Card key={scenario.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(scenario.category)}
                    <CardTitle className="text-lg">{scenario.title}</CardTitle>
                  </div>
                  {scenario.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={getDifficultyColor(scenario.difficulty)}>
                    {scenario.difficulty}
                  </Badge>
                  <Badge variant="outline">{scenario.level}</Badge>
                  <Badge variant="outline">{scenario.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{scenario.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>{scenario.duration}</span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Learning Objectives:</h4>
                  <ul className="text-sm space-y-1">
                    {scenario.objectives.slice(0, 3).map((objective, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => setSelectedScenario(scenario)}
                >
                  Start Scenario
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Active Scenario */}
      {selectedScenario && !showResults && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedScenario.title}</CardTitle>
              <Badge className={getDifficultyColor(selectedScenario.difficulty)}>
                {selectedScenario.difficulty}
              </Badge>
            </div>
            <Progress 
              value={((currentStep + 1) / selectedScenario.steps.length) * 100} 
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {selectedScenario.steps.length}
            </p>
          </CardHeader>
          <CardContent>
            {selectedScenario.steps[currentStep] && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Scenario:</h3>
                  <p>{selectedScenario.steps[currentStep].description}</p>
                </div>
                
                {selectedScenario.steps[currentStep].options && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Choose your action:</h4>
                    {selectedScenario.steps[currentStep].options?.map((option, index) => (
                      <Button
                        key={index}
                        variant={userAnswers[selectedScenario.steps[currentStep].id] === option ? "default" : "outline"}
                        className="w-full justify-start text-left"
                        onClick={() => handleAnswerSelect(selectedScenario.steps[currentStep].id, option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}

                {userAnswers[selectedScenario.steps[currentStep].id] && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Explanation:</h4>
                    <p className="text-sm">{selectedScenario.steps[currentStep].explanation}</p>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={resetScenario}>
                    Exit Scenario
                  </Button>
                  <Button 
                    onClick={handleNextStep}
                    disabled={!userAnswers[selectedScenario.steps[currentStep].id]}
                  >
                    {currentStep === selectedScenario.steps.length - 1 ? "Complete" : "Next Step"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {showResults && selectedScenario && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Scenario Complete!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-primary">
                {calculateScore()}%
              </div>
              <p className="text-lg">
                You scored {calculateScore()}% on {selectedScenario.title}
              </p>
              <div className="space-y-2">
                <h4 className="font-medium">Performance Summary:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-green-50 p-3 rounded">
                    <div className="font-semibold text-green-800">Correct</div>
                    <div className="text-green-600">
                      {selectedScenario.steps.filter(step => userAnswers[step.id] === step.correctAnswer).length}
                    </div>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <div className="font-semibold text-red-800">Incorrect</div>
                    <div className="text-red-600">
                      {selectedScenario.steps.filter(step => userAnswers[step.id] !== step.correctAnswer).length}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <div className="font-semibold text-blue-800">Total Steps</div>
                    <div className="text-blue-600">{selectedScenario.steps.length}</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => {
                  setCurrentStep(0);
                  setUserAnswers({});
                  setShowResults(false);
                }}>
                  Try Again
                </Button>
                <Button variant="outline" onClick={resetScenario}>
                  Choose Another Scenario
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}