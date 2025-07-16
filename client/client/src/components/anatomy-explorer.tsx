import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Brain, Heart, Bone, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { anatomySystems, anatomyQuizzes, type AnatomySystem, type AnatomyPart } from "@/data/anatomy";

interface AnatomyExplorerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AnatomyExplorer({ open, onOpenChange }: AnatomyExplorerProps) {
  const [selectedSystem, setSelectedSystem] = useState<AnatomySystem | null>(null);
  const [selectedPart, setSelectedPart] = useState<AnatomyPart | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSystemSelect = (system: AnatomySystem) => {
    setSelectedSystem(system);
    setSelectedPart(null);
    setQuizMode(false);
  };

  const handlePartClick = (part: AnatomyPart) => {
    setSelectedPart(part);
  };

  const startQuiz = (systemId: string) => {
    const quiz = anatomyQuizzes.find(q => q.systemId === systemId);
    if (quiz) {
      setCurrentQuiz(quiz);
      setQuizMode(true);
      setCurrentQuestion(0);
      setScore(0);
      setShowAnswer(false);
      setSelectedAnswer(null);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowAnswer(true);
    
    if (answer === currentQuiz.questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < currentQuiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowAnswer(false);
        setSelectedAnswer(null);
      } else {
        // Quiz complete
        setShowAnswer(false);
        setSelectedAnswer(null);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
  };

  const getSystemIcon = (systemId: string) => {
    switch (systemId) {
      case 'respiratory': return <Brain className="h-5 w-5" />;
      case 'circulatory': return <Heart className="h-5 w-5" />;
      case 'musculoskeletal': return <Bone className="h-5 w-5" />;
      default: return <Eye className="h-5 w-5" />;
    }
  };

  const getSystemColor = (systemId: string) => {
    switch (systemId) {
      case 'respiratory': return 'bg-blue-500';
      case 'circulatory': return 'bg-red-500';
      case 'musculoskeletal': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Interactive Anatomy Explorer
          </DialogTitle>
        </DialogHeader>

        <div className="h-[80vh] overflow-y-auto">
          {!selectedSystem ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Explore anatomy systems relevant to EMS with interactive diagrams and quizzes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {anatomySystems.map((system) => (
                  <Card 
                    key={system.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleSystemSelect(system)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge className={`${getSystemColor(system.id)} text-white`}>
                          {getSystemIcon(system.id)}
                          <span className="ml-1">System</span>
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{system.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        {system.description}
                      </p>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-blue-800">EMS Relevance:</p>
                        <p className="text-sm text-blue-700">{system.emsRelevance}</p>
                      </div>
                      <div className="mt-3 text-sm text-muted-foreground">
                        {system.parts.length} anatomical structures
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
                  <h2 className="text-2xl font-bold">{selectedSystem.name}</h2>
                  <p className="text-muted-foreground">{selectedSystem.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => startQuiz(selectedSystem.id)}
                    disabled={!anatomyQuizzes.find(q => q.systemId === selectedSystem.id)}
                  >
                    Take Quiz
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedSystem(null)}>
                    Back to Systems
                  </Button>
                </div>
              </div>

              {!quizMode ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Interactive Diagram */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Interactive Diagram</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Click on anatomical structures to learn more
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="relative bg-gray-50 rounded-lg p-4" style={{ height: '500px' }}>
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          {/* Simple human body outline */}
                          <path
                            d="M 50 5 Q 45 5 45 10 L 45 25 Q 45 30 50 30 Q 55 30 55 25 L 55 10 Q 55 5 50 5 Z"
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M 50 30 L 50 70 M 35 45 L 65 45 M 45 95 L 45 70 L 55 70 L 55 95"
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="0.5"
                          />
                          
                          {/* Anatomical parts */}
                          {selectedSystem.parts.map((part) => (
                            <circle
                              key={part.id}
                              cx={part.position.x}
                              cy={part.position.y}
                              r="3"
                              fill={part.color}
                              stroke="white"
                              strokeWidth="0.5"
                              className="cursor-pointer hover:stroke-2 transition-all"
                              onClick={() => handlePartClick(part)}
                            />
                          ))}
                        </svg>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Part Information */}
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>EMS Relevance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{selectedSystem.emsRelevance}</p>
                      </CardContent>
                    </Card>

                    {selectedPart && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <div 
                              className="w-4 h-4 rounded-full mr-2"
                              style={{ backgroundColor: selectedPart.color }}
                            />
                            {selectedPart.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium">Description:</p>
                              <p className="text-sm text-muted-foreground">{selectedPart.description}</p>
                            </div>
                            <div className="bg-red-50 p-3 rounded-md">
                              <p className="text-sm font-medium text-red-800">EMS Note:</p>
                              <p className="text-sm text-red-700">{selectedPart.emsNote}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Card>
                      <CardHeader>
                        <CardTitle>All Structures</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {selectedSystem.parts.map((part) => (
                            <div
                              key={part.id}
                              className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                              onClick={() => handlePartClick(part)}
                            >
                              <div 
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: part.color }}
                              />
                              <span className="text-sm">{part.name}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Quiz Interface */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{currentQuiz.title}</span>
                        <Badge variant="outline">
                          Question {currentQuestion + 1} of {currentQuiz.questions.length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {currentQuestion < currentQuiz.questions.length ? (
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">
                            {currentQuiz.questions[currentQuestion].question}
                          </h3>
                          
                          <div className="grid grid-cols-1 gap-2">
                            {currentQuiz.questions[currentQuestion].options.map((option: string, index: number) => (
                              <Button
                                key={index}
                                variant={
                                  showAnswer
                                    ? option === currentQuiz.questions[currentQuestion].correct
                                      ? "default"
                                      : option === selectedAnswer
                                      ? "destructive"
                                      : "outline"
                                    : "outline"
                                }
                                className="justify-start h-auto py-3"
                                onClick={() => handleAnswerSelect(option)}
                                disabled={showAnswer}
                              >
                                {showAnswer && option === currentQuiz.questions[currentQuestion].correct && (
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                )}
                                {showAnswer && option === selectedAnswer && option !== currentQuiz.questions[currentQuestion].correct && (
                                  <XCircle className="h-4 w-4 mr-2" />
                                )}
                                {option}
                              </Button>
                            ))}
                          </div>

                          {showAnswer && (
                            <div className="bg-blue-50 p-4 rounded-md">
                              <p className="text-sm font-medium text-blue-800">Explanation:</p>
                              <p className="text-sm text-blue-700">
                                {currentQuiz.questions[currentQuestion].explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center space-y-4">
                          <div className="text-3xl font-bold text-green-600">
                            {score} / {currentQuiz.questions.length}
                          </div>
                          <div className="text-lg">
                            {Math.round((score / currentQuiz.questions.length) * 100)}% Score
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button onClick={resetQuiz} className="w-full">
                              <RotateCcw className="h-4 w-4 mr-2" />
                              Retake Quiz
                            </Button>
                            <Button variant="outline" onClick={() => setQuizMode(false)} className="w-full">
                              Back to Anatomy
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}