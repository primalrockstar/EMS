import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, AlertTriangle, CheckCircle, XCircle, RotateCcw } from "lucide-react";

interface GlasgowComaCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GlasgowComaCalculator({ open, onOpenChange }: GlasgowComaCalculatorProps) {
  const [eyeResponse, setEyeResponse] = useState(0);
  const [verbalResponse, setVerbalResponse] = useState(0);
  const [motorResponse, setMotorResponse] = useState(0);
  const [calculationHistory, setCalculationHistory] = useState<any[]>([]);

  const eyeResponses = [
    { value: 4, label: "4 - Spontaneous" },
    { value: 3, label: "3 - To speech" },
    { value: 2, label: "2 - To pain" },
    { value: 1, label: "1 - No response" }
  ];

  const verbalResponses = [
    { value: 5, label: "5 - Oriented" },
    { value: 4, label: "4 - Confused" },
    { value: 3, label: "3 - Inappropriate words" },
    { value: 2, label: "2 - Incomprehensible sounds" },
    { value: 1, label: "1 - No response" }
  ];

  const motorResponses = [
    { value: 6, label: "6 - Obeys commands" },
    { value: 5, label: "5 - Localizes pain" },
    { value: 4, label: "4 - Withdraws from pain" },
    { value: 3, label: "3 - Flexion to pain" },
    { value: 2, label: "2 - Extension to pain" },
    { value: 1, label: "1 - No response" }
  ];

  const totalScore = eyeResponse + verbalResponse + motorResponse;

  const getScoreInterpretation = (score: number) => {
    if (score >= 13) return { 
      level: "Mild", 
      color: "bg-green-500", 
      description: "Mild brain injury" 
    };
    if (score >= 9) return { 
      level: "Moderate", 
      color: "bg-yellow-500", 
      description: "Moderate brain injury" 
    };
    if (score >= 3) return { 
      level: "Severe", 
      color: "bg-red-500", 
      description: "Severe brain injury" 
    };
    return { 
      level: "Invalid", 
      color: "bg-gray-500", 
      description: "Invalid score" 
    };
  };

  const getClinicalActions = (score: number) => {
    if (score >= 13) return [
      "Continue monitoring",
      "Assess for other injuries",
      "Document neurological status",
      "Consider discharge planning"
    ];
    if (score >= 9) return [
      "Frequent neurological checks",
      "Consider CT scan",
      "Monitor for deterioration",
      "Prepare for possible intervention"
    ];
    if (score >= 3) return [
      "Immediate intubation consideration",
      "Emergency CT scan",
      "Neurosurgical consultation",
      "Intensive care monitoring"
    ];
    return ["Complete assessment required"];
  };

  const saveCalculation = () => {
    if (totalScore === 0) return;
    
    const calculation = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      eyeResponse,
      verbalResponse,
      motorResponse,
      totalScore,
      interpretation: getScoreInterpretation(totalScore)
    };

    setCalculationHistory(prev => [calculation, ...prev.slice(0, 4)]);
  };

  const clearCalculation = () => {
    setEyeResponse(0);
    setVerbalResponse(0);
    setMotorResponse(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0" aria-describedby="glasgow-coma-description">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-red-500" />
            Glasgow Coma Scale Calculator
          </DialogTitle>
          <div id="glasgow-coma-description" className="text-sm text-muted-foreground">
            Neurological assessment tool for consciousness level evaluation
          </div>
        </DialogHeader>

        <div className="p-6 pt-0 space-y-6">
          {/* Assessment Components */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Eye Response */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Eye Response</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {eyeResponses.map((response) => (
                  <Button
                    key={response.value}
                    variant={eyeResponse === response.value ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => setEyeResponse(response.value)}
                  >
                    {response.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Verbal Response */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Verbal Response</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {verbalResponses.map((response) => (
                  <Button
                    key={response.value}
                    variant={verbalResponse === response.value ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => setVerbalResponse(response.value)}
                  >
                    {response.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Motor Response */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Motor Response</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {motorResponses.map((response) => (
                  <Button
                    key={response.value}
                    variant={motorResponse === response.value ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => setMotorResponse(response.value)}
                  >
                    {response.label}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          {totalScore > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Assessment Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-primary mb-2">
                        {totalScore}
                      </div>
                      <div className="text-lg text-muted-foreground">
                        Total GCS Score
                      </div>
                      <Badge className={`${getScoreInterpretation(totalScore).color} text-white mt-2`}>
                        {getScoreInterpretation(totalScore).level} - {getScoreInterpretation(totalScore).description}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{eyeResponse}</div>
                        <div className="text-sm text-muted-foreground">Eye</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{verbalResponse}</div>
                        <div className="text-sm text-muted-foreground">Verbal</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{motorResponse}</div>
                        <div className="text-sm text-muted-foreground">Motor</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Clinical Actions
                    </h4>
                    <div className="space-y-2">
                      {getClinicalActions(totalScore).map((action, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={saveCalculation} disabled={totalScore === 0}>
              Save Assessment
            </Button>
            <Button onClick={clearCalculation} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>

          {/* Quick Reference */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Score Ranges</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>13-15:</span>
                      <span className="text-green-600">Mild</span>
                    </div>
                    <div className="flex justify-between">
                      <span>9-12:</span>
                      <span className="text-yellow-600">Moderate</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3-8:</span>
                      <span className="text-red-600">Severe</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Key Points</h4>
                  <ul className="space-y-1">
                    <li>• Lowest possible score: 3</li>
                    <li>• Highest possible score: 15</li>
                    <li>• Intubation often at ≤8</li>
                    <li>• Reassess frequently</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Documentation</h4>
                  <ul className="space-y-1">
                    <li>• Record individual components</li>
                    <li>• Note time of assessment</li>
                    <li>• Document any limitations</li>
                    <li>• Track trends over time</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* History */}
          {calculationHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Assessment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {calculationHistory.map((calc) => (
                    <div key={calc.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">
                          GCS: {calc.totalScore} (E{calc.eyeResponse}V{calc.verbalResponse}M{calc.motorResponse})
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {calc.timestamp}
                        </div>
                      </div>
                      <Badge className={`${calc.interpretation.color} text-white`}>
                        {calc.interpretation.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}