import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle, AlertCircle, Activity, Heart, RotateCcw, User } from "lucide-react";
import { simulations, type PatientSimulation } from "@/data/simulations";

interface PatientSimulatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PatientSimulator({ open, onOpenChange }: PatientSimulatorProps) {
  const [selectedSimulation, setSelectedSimulation] = useState<PatientSimulation | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleSimulationSelect = (simulation: PatientSimulation) => {
    setSelectedSimulation(simulation);
    setCurrentStep(0);
    setScore(0);
    setSelectedActions([]);
    setShowFeedback(null);
    setIsComplete(false);
  };

  const handleActionSelect = (action: string) => {
    if (!selectedSimulation) return;

    const newSelectedActions = [...selectedActions, action];
    setSelectedActions(newSelectedActions);
    setShowFeedback(selectedSimulation.feedback[action] || "Action completed.");

    // Check if this action is correct for current step
    if (action === selectedSimulation.correctSequence[currentStep]) {
      setScore(score + 1);
      setCurrentStep(currentStep + 1);
    }

    // Check if simulation is complete
    if (currentStep >= selectedSimulation.correctSequence.length - 1) {
      setTimeout(() => {
        setIsComplete(true);
        setShowFeedback(null);
      }, 2000);
    } else {
      setTimeout(() => {
        setShowFeedback(null);
      }, 2000);
    }
  };

  const resetSimulation = () => {
    setCurrentStep(0);
    setScore(0);
    setSelectedActions([]);
    setShowFeedback(null);
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

  const getVitalsColor = (vital: string, value: number | string) => {
    switch (vital) {
      case 'pulse':
        if (typeof value === 'number') {
          if (value < 60 || value > 100) return 'text-red-600';
          return 'text-green-600';
        }
        break;
      case 'resp':
        if (typeof value === 'number') {
          if (value < 12 || value > 20) return 'text-yellow-600';
          return 'text-green-600';
        }
        break;
      case 'spo2':
        if (typeof value === 'number') {
          if (value < 95) return 'text-red-600';
          return 'text-green-600';
        }
        break;
    }
    return 'text-gray-600';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Virtual Patient Simulations
          </DialogTitle>
        </DialogHeader>

        <div className="h-[80vh] overflow-y-auto">
          {!selectedSimulation ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Practice patient assessment and treatment in realistic clinical scenarios.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {simulations.map((simulation) => (
                  <Card 
                    key={simulation.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleSimulationSelect(simulation)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge className={`${getDifficultyColor(simulation.difficulty)} text-white`}>
                          {simulation.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          <User className="h-3 w-3 mr-1" />
                          Patient Sim
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{simulation.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        {simulation.patient}
                      </p>
                      
                      {/* Vital Signs Preview */}
                      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                        <div className="flex items-center">
                          <Heart className="h-3 w-3 mr-1 text-red-500" />
                          <span>HR: {simulation.vitals.pulse}</span>
                        </div>
                        <div className="flex items-center">
                          <Activity className="h-3 w-3 mr-1 text-blue-500" />
                          <span>RR: {simulation.vitals.resp}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs">BP: {simulation.vitals.bp}</span>
                        </div>
                        {simulation.vitals.spo2 && (
                          <div className="flex items-center">
                            <span className="text-xs">SpO2: {simulation.vitals.spo2}%</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {simulation.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
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
                  <h2 className="text-2xl font-bold">{selectedSimulation.title}</h2>
                  <Badge className={`${getDifficultyColor(selectedSimulation.difficulty)} text-white mt-2`}>
                    {selectedSimulation.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={resetSimulation}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedSimulation(null)}>
                    Back to Simulations
                  </Button>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{currentStep} / {selectedSimulation.correctSequence.length}</span>
                </div>
                <Progress value={(currentStep / selectedSimulation.correctSequence.length) * 100} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Patient Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">{selectedSimulation.patient}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedSimulation.initialAssessment}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-red-500" />
                        Vital Signs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Heart Rate:</span>
                          <span className={`text-sm font-medium ${getVitalsColor('pulse', selectedSimulation.vitals.pulse)}`}>
                            {selectedSimulation.vitals.pulse} bpm
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Respiratory Rate:</span>
                          <span className={`text-sm font-medium ${getVitalsColor('resp', selectedSimulation.vitals.resp)}`}>
                            {selectedSimulation.vitals.resp} /min
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Blood Pressure:</span>
                          <span className="text-sm font-medium">{selectedSimulation.vitals.bp} mmHg</span>
                        </div>
                        {selectedSimulation.vitals.temp && (
                          <div className="flex justify-between">
                            <span className="text-sm">Temperature:</span>
                            <span className="text-sm font-medium">{selectedSimulation.vitals.temp}</span>
                          </div>
                        )}
                        {selectedSimulation.vitals.spo2 && (
                          <div className="flex justify-between">
                            <span className="text-sm">SpO2:</span>
                            <span className={`text-sm font-medium ${getVitalsColor('spo2', selectedSimulation.vitals.spo2)}`}>
                              {selectedSimulation.vitals.spo2}%
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  {!isComplete ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>Available Actions</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Select the most appropriate action for this patient
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {selectedSimulation.actions.map((action, index) => (
                            <Button
                              key={index}
                              variant={selectedActions.includes(action) ? "secondary" : "outline"}
                              className="w-full justify-start h-auto py-3 px-4 text-left"
                              onClick={() => handleActionSelect(action)}
                              disabled={selectedActions.includes(action)}
                            >
                              {selectedActions.includes(action) && (
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              )}
                              {action}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                          Simulation Complete!
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center space-y-4">
                          <div className={`text-3xl font-bold ${getScoreColor((score / selectedSimulation.correctSequence.length) * 100)}`}>
                            {score} / {selectedSimulation.correctSequence.length}
                          </div>
                          <div className={`text-lg ${getScoreColor((score / selectedSimulation.correctSequence.length) * 100)}`}>
                            {Math.round((score / selectedSimulation.correctSequence.length) * 100)}% Correct Sequence
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Correct Sequence:</p>
                            <div className="space-y-1">
                              {selectedSimulation.correctSequence.map((action, index) => (
                                <div key={index} className="flex items-center text-sm">
                                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2 text-xs">
                                    {index + 1}
                                  </span>
                                  {action}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button onClick={resetSimulation} className="w-full">
                              <RotateCcw className="h-4 w-4 mr-2" />
                              Try Again
                            </Button>
                            <Button variant="outline" onClick={() => setSelectedSimulation(null)} className="w-full">
                              Choose Another Simulation
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Feedback */}
                  {showFeedback && (
                    <Card className="border-blue-200 bg-blue-50">
                      <CardHeader>
                        <CardTitle className="flex items-center text-blue-700">
                          <AlertCircle className="h-5 w-5 mr-2" />
                          Feedback
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-blue-700">{showFeedback}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}