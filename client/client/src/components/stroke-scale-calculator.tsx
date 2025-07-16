import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, AlertTriangle, Calculator } from "lucide-react";

interface StrokeScaleCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function StrokeScaleCalculator({ open, onOpenChange }: StrokeScaleCalculatorProps) {
  const [fastResults, setFastResults] = useState({
    face: false,
    arms: false,
    speech: false,
    time: ""
  });
  const [befast, setBefast] = useState({
    balance: false,
    eyes: false,
    face: false,
    arms: false,
    speech: false,
    time: ""
  });

  const calculateFAST = () => {
    const positiveFindings = [fastResults.face, fastResults.arms, fastResults.speech].filter(Boolean).length;
    return {
      score: positiveFindings,
      interpretation: positiveFindings > 0 ? "Positive for stroke" : "Negative for stroke",
      recommendations: positiveFindings > 0 ? [
        "Activate stroke protocol immediately",
        "Note exact time of onset",
        "Prepare for rapid transport",
        "Notify receiving facility",
        "Consider stroke center destination"
      ] : [
        "Continue assessment for other causes",
        "Monitor for symptom development",
        "Document findings thoroughly",
        "Consider other neurological causes"
      ]
    };
  };

  const calculateBEFAST = () => {
    const positiveFindings = [befast.balance, befast.eyes, befast.face, befast.arms, befast.speech].filter(Boolean).length;
    return {
      score: positiveFindings,
      interpretation: positiveFindings > 0 ? "Positive for stroke" : "Negative for stroke",
      recommendations: positiveFindings > 0 ? [
        "Activate stroke protocol immediately",
        "Note exact time of onset",
        "Prepare for rapid transport to stroke center",
        "Notify receiving facility with findings",
        "Consider advanced stroke center if available"
      ] : [
        "Continue comprehensive assessment",
        "Monitor for symptom development",
        "Document all findings",
        "Consider other neurological causes"
      ]
    };
  };

  const reset = () => {
    setFastResults({ face: false, arms: false, speech: false, time: "" });
    setBefast({ balance: false, eyes: false, face: false, arms: false, speech: false, time: "" });
  };

  const fastResult = calculateFAST();
  const befastResult = calculateBEFAST();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Stroke Assessment Scale
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="fast" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="fast">FAST Scale</TabsTrigger>
            <TabsTrigger value="befast">BE-FAST Scale</TabsTrigger>
            <TabsTrigger value="reference">Reference</TabsTrigger>
          </TabsList>

          <TabsContent value="fast" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>FAST Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="fast-face"
                      checked={fastResults.face}
                      onChange={(e) => setFastResults({...fastResults, face: e.target.checked})}
                      className="h-4 w-4"
                    />
                    <label htmlFor="fast-face" className="text-sm font-medium">
                      <strong>F - Face:</strong> Facial droop, asymmetry, or inability to smile
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="fast-arms"
                      checked={fastResults.arms}
                      onChange={(e) => setFastResults({...fastResults, arms: e.target.checked})}
                      className="h-4 w-4"
                    />
                    <label htmlFor="fast-arms" className="text-sm font-medium">
                      <strong>A - Arms:</strong> Arm weakness, drift, or inability to raise both arms
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="fast-speech"
                      checked={fastResults.speech}
                      onChange={(e) => setFastResults({...fastResults, speech: e.target.checked})}
                      className="h-4 w-4"
                    />
                    <label htmlFor="fast-speech" className="text-sm font-medium">
                      <strong>S - Speech:</strong> Slurred speech, difficulty speaking, or understanding
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      id="fast-time"
                      value={fastResults.time}
                      onChange={(e) => setFastResults({...fastResults, time: e.target.value})}
                      placeholder="Time of onset"
                      className="p-2 border rounded"
                    />
                    <label htmlFor="fast-time" className="text-sm font-medium">
                      <strong>T - Time:</strong> Note exact time of symptom onset
                    </label>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">FAST Score: {fastResult.score}/3</div>
                      <div className="text-sm text-muted-foreground">{fastResult.interpretation}</div>
                    </div>
                    <Badge className={fastResult.score > 0 ? "bg-red-500" : "bg-green-500"}>
                      {fastResult.score > 0 ? "POSITIVE" : "NEGATIVE"}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold mb-1">Recommendations:</h4>
                    <ul className="text-sm space-y-1">
                      {fastResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="befast" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>BE-FAST Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="befast-balance"
                      checked={befast.balance}
                      onChange={(e) => setBefast({...befast, balance: e.target.checked})}
                      className="h-4 w-4"
                    />
                    <label htmlFor="befast-balance" className="text-sm font-medium">
                      <strong>B - Balance:</strong> Sudden loss of balance, coordination, or dizziness
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="befast-eyes"
                      checked={befast.eyes}
                      onChange={(e) => setBefast({...befast, eyes: e.target.checked})}
                      className="h-4 w-4"
                    />
                    <label htmlFor="befast-eyes" className="text-sm font-medium">
                      <strong>E - Eyes:</strong> Sudden vision loss or visual field defects
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="befast-face"
                      checked={befast.face}
                      onChange={(e) => setBefast({...befast, face: e.target.checked})}
                      className="h-4 w-4"
                    />
                    <label htmlFor="befast-face" className="text-sm font-medium">
                      <strong>F - Face:</strong> Facial droop, asymmetry, or inability to smile
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="befast-arms"
                      checked={befast.arms}
                      onChange={(e) => setBefast({...befast, arms: e.target.checked})}
                      className="h-4 w-4"
                    />
                    <label htmlFor="befast-arms" className="text-sm font-medium">
                      <strong>A - Arms:</strong> Arm weakness, drift, or inability to raise both arms
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="befast-speech"
                      checked={befast.speech}
                      onChange={(e) => setBefast({...befast, speech: e.target.checked})}
                      className="h-4 w-4"
                    />
                    <label htmlFor="befast-speech" className="text-sm font-medium">
                      <strong>S - Speech:</strong> Slurred speech, difficulty speaking, or understanding
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      id="befast-time"
                      value={befast.time}
                      onChange={(e) => setBefast({...befast, time: e.target.value})}
                      placeholder="Time of onset"
                      className="p-2 border rounded"
                    />
                    <label htmlFor="befast-time" className="text-sm font-medium">
                      <strong>T - Time:</strong> Note exact time of symptom onset
                    </label>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">BE-FAST Score: {befastResult.score}/5</div>
                      <div className="text-sm text-muted-foreground">{befastResult.interpretation}</div>
                    </div>
                    <Badge className={befastResult.score > 0 ? "bg-red-500" : "bg-green-500"}>
                      {befastResult.score > 0 ? "POSITIVE" : "NEGATIVE"}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold mb-1">Recommendations:</h4>
                    <ul className="text-sm space-y-1">
                      {befastResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reference" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Stroke Assessment Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">FAST Scale:</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Widely used for rapid stroke identification
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Face: Facial droop</li>
                      <li>• Arms: Arm weakness</li>
                      <li>• Speech: Speech difficulty</li>
                      <li>• Time: Time of onset</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">BE-FAST Scale:</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Enhanced version detecting more stroke types
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Balance: Sudden loss</li>
                      <li>• Eyes: Vision changes</li>
                      <li>• Face: Facial droop</li>
                      <li>• Arms: Arm weakness</li>
                      <li>• Speech: Speech difficulty</li>
                      <li>• Time: Time of onset</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Critical Actions:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Any positive finding = stroke alert</li>
                    <li>• Document exact time of onset</li>
                    <li>• Transport to stroke center if available</li>
                    <li>• Notify receiving facility immediately</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 mt-4">
          <Button variant="outline" onClick={reset} className="flex-1">
            Reset All
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}