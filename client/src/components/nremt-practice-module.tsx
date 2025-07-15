import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Timer, Trophy, BookOpen, Target, Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft, RotateCcw, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

interface NremtPracticeModuleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface NremtQuestion {
  id: number;
  scope: string;
  contentArea: string;
  questionType: string;
  questionText: string;
  scenario?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  protocolReference?: string;
  calculatorLink?: string;
  difficulty: string;
  tags: string[];
}

interface ExamSession {
  scope: string;
  questions: NremtQuestion[];
  currentIndex: number;
  answers: Record<number, string>;
  score: number;
  timeSpent: number;
  isComplete: boolean;
}

const SCOPE_INFO = {
  EMR: { name: "Emergency Medical Responder", questions: 40, color: "bg-green-500" },
  EMT: { name: "Emergency Medical Technician", questions: 60, color: "bg-blue-500" },
  AEMT: { name: "Advanced Emergency Medical Technician", questions: 50, color: "bg-orange-500" },
  Paramedic: { name: "Paramedic", questions: 50, color: "bg-red-500" }
};

const CONTENT_AREAS = {
  "Airway": "Airway, Respiration & Ventilation",
  "Cardiology": "Cardiology & Resuscitation", 
  "Trauma": "Trauma",
  "Medical": "Medical/Obstetrics/Gynecology",
  "Operations": "EMS Operations"
};

export default function NremtPracticeModule({ open, onOpenChange }: NremtPracticeModuleProps) {
  const [selectedScope, setSelectedScope] = useState<string>("EMT");
  const [examSession, setExamSession] = useState<ExamSession | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { toast } = useToast();

  const { data: questions, isLoading } = useQuery({
    queryKey: [`/api/nremt-questions/${selectedScope}`],
    enabled: open,
  });

  const saveSessionMutation = useMutation({
    mutationFn: async (sessionData: any) => {
      const response = await fetch("/api/nremt-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionData),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/nremt-sessions"] });
      toast({
        title: "Session Saved",
        description: "Your exam session has been saved successfully.",
      });
    },
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && examSession) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, examSession]);

  const startExam = () => {
    if (!questions || questions.length === 0) {
      toast({
        title: "No Questions Available",
        description: "Please select a different scope or try again later.",
        variant: "destructive",
      });
      return;
    }

    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    const sessionQuestions = shuffledQuestions.slice(0, SCOPE_INFO[selectedScope as keyof typeof SCOPE_INFO].questions);
    
    setExamSession({
      scope: selectedScope,
      questions: sessionQuestions,
      currentIndex: 0,
      answers: {},
      score: 0,
      timeSpent: 0,
      isComplete: false,
    });
    setTimeElapsed(0);
    setIsTimerRunning(true);
    setShowExplanation(false);
    setSelectedAnswer("");
  };

  const submitAnswer = () => {
    if (!examSession || !selectedAnswer) return;

    const currentQuestion = examSession.questions[examSession.currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    const updatedAnswers = {
      ...examSession.answers,
      [examSession.currentIndex]: selectedAnswer,
    };

    setExamSession(prev => ({
      ...prev!,
      answers: updatedAnswers,
      score: prev!.score + (isCorrect ? 1 : 0),
    }));

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (!examSession) return;

    const isLastQuestion = examSession.currentIndex === examSession.questions.length - 1;
    
    if (isLastQuestion) {
      // Complete the exam
      const finalSession = {
        ...examSession,
        isComplete: true,
        timeSpent: timeElapsed,
      };
      setExamSession(finalSession);
      setIsTimerRunning(false);
      
      // Save session
      saveSessionMutation.mutate({
        scope: examSession.scope,
        totalQuestions: examSession.questions.length,
        correctAnswers: examSession.score + (selectedAnswer === examSession.questions[examSession.currentIndex].correctAnswer ? 1 : 0),
        timeSpent: timeElapsed,
        isPassed: (examSession.score / examSession.questions.length) >= 0.7,
        sessionData: finalSession,
      });
    } else {
      setExamSession(prev => ({
        ...prev!,
        currentIndex: prev!.currentIndex + 1,
      }));
      setSelectedAnswer("");
      setShowExplanation(false);
    }
  };

  const previousQuestion = () => {
    if (!examSession || examSession.currentIndex === 0) return;
    
    setExamSession(prev => ({
      ...prev!,
      currentIndex: prev!.currentIndex - 1,
    }));
    setSelectedAnswer(examSession.answers[examSession.currentIndex - 1] || "");
    setShowExplanation(false);
  };

  const resetExam = () => {
    setExamSession(null);
    setTimeElapsed(0);
    setIsTimerRunning(false);
    setShowExplanation(false);
    setSelectedAnswer("");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderQuestion = (question: NremtQuestion) => {
    switch (question.questionType) {
      case "multiple-choice":
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? "default" : "outline"}
                className={`w-full justify-start text-left p-4 h-auto ${
                  selectedAnswer === option ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setSelectedAnswer(option)}
                disabled={showExplanation}
              >
                <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>
        );
      
      case "multiple-response":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-3">
              Select all correct answers (2-3 options):
            </p>
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer.includes(option) ? "default" : "outline"}
                className={`w-full justify-start text-left p-4 h-auto ${
                  selectedAnswer.includes(option) ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => {
                  const answers = selectedAnswer.split(',').filter(a => a);
                  if (answers.includes(option)) {
                    setSelectedAnswer(answers.filter(a => a !== option).join(','));
                  } else {
                    setSelectedAnswer([...answers, option].join(','));
                  }
                }}
                disabled={showExplanation}
              >
                <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>
        );
      
      default:
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? "default" : "outline"}
                className={`w-full justify-start text-left p-4 h-auto ${
                  selectedAnswer === option ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setSelectedAnswer(option)}
                disabled={showExplanation}
              >
                <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Loading NREMT Practice Module...</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-500" />
            2025 NREMT Practice Exam
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[80vh]">
          <div className="p-6 space-y-6">
            {!examSession ? (
              /* Exam Setup */
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Select Scope of Practice
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select value={selectedScope} onValueChange={setSelectedScope}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your scope" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(SCOPE_INFO).map(([key, info]) => (
                            <SelectItem key={key} value={key}>
                              {info.name} ({info.questions} questions)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Exam Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Questions:</span>
                          <span>{SCOPE_INFO[selectedScope as keyof typeof SCOPE_INFO].questions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time Limit:</span>
                          <span>No limit (timed)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Passing Score:</span>
                          <span>70%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Format:</span>
                          <span>2025 NREMT Style</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Content Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(CONTENT_AREAS).map(([key, name]) => (
                        <div key={key} className="flex items-center gap-2">
                          <Badge variant="outline">{key}</Badge>
                          <span className="text-sm">{name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button
                    onClick={startExam}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg"
                  >
                    <Trophy className="h-5 w-5 mr-2" />
                    Start {selectedScope} Practice Exam
                  </Button>
                </div>
              </div>
            ) : examSession.isComplete ? (
              /* Exam Results */
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-6 w-6 text-yellow-500" />
                      Exam Complete!
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="text-6xl font-bold text-blue-500">
                        {Math.round((examSession.score / examSession.questions.length) * 100)}%
                      </div>
                      <div className="text-xl">
                        {examSession.score} / {examSession.questions.length} correct
                      </div>
                      <div className="flex justify-center">
                        <Badge 
                          className={`text-lg px-4 py-2 ${
                            (examSession.score / examSession.questions.length) >= 0.7 
                              ? "bg-green-500 text-white" 
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {(examSession.score / examSession.questions.length) >= 0.7 ? "PASSED" : "FAILED"}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">
                        Time: {formatTime(examSession.timeSpent)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-center gap-4">
                  <Button onClick={resetExam} variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Take Another Exam
                  </Button>
                  <Button onClick={() => onOpenChange(false)}>
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              /* Active Exam */
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge className={`${SCOPE_INFO[examSession.scope as keyof typeof SCOPE_INFO].color} text-white`}>
                      {examSession.scope}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Question {examSession.currentIndex + 1} of {examSession.questions.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {formatTime(timeElapsed)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      {examSession.score}/{examSession.currentIndex + (showExplanation ? 1 : 0)}
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <Progress 
                  value={(examSession.currentIndex / examSession.questions.length) * 100}
                  className="h-2"
                />

                {/* Question */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">
                        {examSession.questions[examSession.currentIndex].contentArea}
                      </Badge>
                      <Badge variant="outline">
                        {examSession.questions[examSession.currentIndex].questionType}
                      </Badge>
                      <Badge variant="outline">
                        {examSession.questions[examSession.currentIndex].difficulty}
                      </Badge>
                    </div>
                    {examSession.questions[examSession.currentIndex].scenario && (
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <p className="text-sm font-medium text-blue-800">Scenario:</p>
                        <p className="text-sm text-blue-700">
                          {examSession.questions[examSession.currentIndex].scenario}
                        </p>
                      </div>
                    )}
                    <CardTitle className="text-lg">
                      {examSession.questions[examSession.currentIndex].questionText}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderQuestion(examSession.questions[examSession.currentIndex])}
                  </CardContent>
                </Card>

                {/* Explanation */}
                {showExplanation && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {selectedAnswer === examSession.questions[examSession.currentIndex].correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        {selectedAnswer === examSession.questions[examSession.currentIndex].correctAnswer ? "Correct!" : "Incorrect"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          <span className="font-medium">Correct Answer:</span> {examSession.questions[examSession.currentIndex].correctAnswer}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Explanation:</span> {examSession.questions[examSession.currentIndex].explanation}
                        </p>
                        {examSession.questions[examSession.currentIndex].protocolReference && (
                          <p className="text-sm">
                            <span className="font-medium">Protocol Reference:</span> {examSession.questions[examSession.currentIndex].protocolReference}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={previousQuestion}
                    disabled={examSession.currentIndex === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="flex gap-2">
                    {!showExplanation ? (
                      <Button
                        onClick={submitAnswer}
                        disabled={!selectedAnswer}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Submit Answer
                      </Button>
                    ) : (
                      <Button
                        onClick={nextQuestion}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        {examSession.currentIndex === examSession.questions.length - 1 ? "Finish Exam" : "Next Question"}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}