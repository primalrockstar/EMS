import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, XCircle, AlertCircle, Play, RotateCcw } from "lucide-react";
import { scenarios, type Scenario } from "@/data/scenarios";

interface ScenarioViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ScenarioViewer({ open, onOpenChange }: ScenarioViewerProps) {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [currentDecision, setCurrentDecision] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCurrentDecision(0);
    setScore(0);
    setAnswers([]);
    setShowFeedback(false);
    setIsComplete(false);
  };

  const handleChoice = (option: string) => {
    if (!selectedScenario) return;

    const currentQuestion = selectedScenario.decisions[currentDecision];
    const isCorrect = option === currentQuestion.correct;
    
    setAnswers([...answers, option]);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      if (currentDecision < selectedScenario.decisions.length - 1) {
        setCurrentDecision(currentDecision + 1);
      } else {
        setIsComplete(true);
      }
    }, 3000);
  };

  const resetScenario = () => {
    setCurrentDecision(0);
    setScore(0);
    setAnswers([]);
    setShowFeedback(false);
    setIsComplete(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Play className="h-5 w-5 mr-2" />
            Interactive Case Scenarios
          </DialogTitle>
        </DialogHeader>

        <div className="h-[70vh] overflow-y-auto">
          {!selectedScenario ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Practice real-world EMS scenarios to improve your clinical decision-making skills.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scenarios.map((scenario) => (
                  <Card 
                    key={scenario.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleScenarioSelect(scenario)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge className={`${getDifficultyColor(scenario.difficulty)} text-white`}>
                          {scenario.difficulty}
                        </Badge>
                        <Badge variant="outline">{scenario.category}</Badge>
                      </div>
                      <CardTitle className="text-lg">{scenario.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {scenario.narrative}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {scenario.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-3 text-sm text-muted-foreground">
                        {scenario.decisions.length} decisions
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedScenario.title}</h2>
                  <Badge className={`${getDifficultyColor(selectedScenario.difficulty)} text-white mt-2`}>
                    {selectedScenario.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={resetScenario}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedScenario(null)}>
                    Back to Scenarios
                  </Button>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.min(currentDecision + 1, selectedScenario.decisions.length)} / {selectedScenario.decisions.length}</span>
                </div>
                <Progress value={(Math.min(currentDecision + 1, selectedScenario.decisions.length) / selectedScenario.decisions.length) * 100} />
              </div>

              {/* Scenario Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
                    Scenario
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{selectedScenario.narrative}</p>
                </CardContent>
              </Card>

              {/* Question or Results */}
              {!isComplete ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Decision {currentDecision + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="font-medium">
                        {selectedScenario.decisions[currentDecision].question}
                      </p>
                      
                      {!showFeedback ? (
                        <div className="grid grid-cols-1 gap-2">
                          {selectedScenario.decisions[currentDecision].options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="justify-start h-auto py-3 px-4 text-left whitespace-normal"
                              onClick={() => handleChoice(option)}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center">
                            {answers[currentDecision] === selectedScenario.decisions[currentDecision].correct ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500 mr-2" />
                            )}
                            <span className={
                              answers[currentDecision] === selectedScenario.decisions[currentDecision].correct
                                ? "text-green-600 font-medium"
                                : "text-red-600 font-medium"
                            }>
                              {answers[currentDecision] === selectedScenario.decisions[currentDecision].correct
                                ? "Correct!"
                                : "Incorrect"
                              }
                            </span>
                          </div>
                          
                          <div className="bg-blue-50 p-3 rounded-md">
                            <p className="text-sm">
                              <strong>Correct Answer:</strong> {selectedScenario.decisions[currentDecision].correct}
                            </p>
                            <p className="text-sm mt-2">
                              <strong>Explanation:</strong> {selectedScenario.decisions[currentDecision].feedback}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      Scenario Complete!
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className={`text-4xl font-bold mb-2 ${getScoreColor((score / selectedScenario.decisions.length) * 100)}`}>
                          {score} / {selectedScenario.decisions.length}
                        </div>
                        <div className={`text-lg ${getScoreColor((score / selectedScenario.decisions.length) * 100)}`}>
                          {Math.round((score / selectedScenario.decisions.length) * 100)}% Score
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button onClick={resetScenario} className="w-full">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Try Again
                        </Button>
                        <Button variant="outline" onClick={() => setSelectedScenario(null)} className="w-full">
                          Choose Another Scenario
                        </Button>
                      </div>
                      
                      <div className="text-sm text-muted-foreground text-center">
                        Review your answers and explanations to improve your understanding.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}