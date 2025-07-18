import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Heart, Calculator, AlertTriangle, RotateCcw } from "lucide-react";

interface CardiacOutputCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CardiacOutputCalculator({ open, onOpenChange }: CardiacOutputCalculatorProps) {
  const [heartRate, setHeartRate] = useState("");
  const [strokeVolume, setStrokeVolume] = useState("");
  const [bloodPressureSystolic, setBloodPressureSystolic] = useState("");
  const [bloodPressureDiastolic, setBloodPressureDiastolic] = useState("");
  const [calculationMethod, setCalculationMethod] = useState("direct");
  const [results, setResults] = useState({
    cardiacOutput: 0,
    cardiacIndex: 0,
    meanArterialPressure: 0,
    strokeVolumeIndex: 0
  });
  const [calculationHistory, setCalculationHistory] = useState<any[]>([]);

  const calculateCardiacOutput = () => {
    const hr = parseFloat(heartRate);
    const sv = parseFloat(strokeVolume);
    const sysBP = parseFloat(bloodPressureSystolic);
    const diaBP = parseFloat(bloodPressureDiastolic);

    if (!hr || !sv || hr <= 0 || sv <= 0) {
      alert("Please enter valid heart rate and stroke volume");
      return;
    }

    // Cardiac Output = Heart Rate × Stroke Volume
    const cardiacOutput = (hr * sv) / 1000; // Convert to L/min
    
    // Cardiac Index = Cardiac Output / BSA (assuming average BSA of 1.7 m²)
    const cardiacIndex = cardiacOutput / 1.7;

    // Mean Arterial Pressure = (Systolic + 2×Diastolic) / 3
    const meanArterialPressure = sysBP && diaBP ? (sysBP + 2 * diaBP) / 3 : 0;

    // Stroke Volume Index = Stroke Volume / BSA
    const strokeVolumeIndex = sv / 1.7;

    const newResults = {
      cardiacOutput: Math.round(cardiacOutput * 100) / 100,
      cardiacIndex: Math.round(cardiacIndex * 100) / 100,
      meanArterialPressure: Math.round(meanArterialPressure),
      strokeVolumeIndex: Math.round(strokeVolumeIndex)
    };

    setResults(newResults);

    // Add to history
    const calculation = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      heartRate: hr,
      strokeVolume: sv,
      systolicBP: sysBP,
      diastolicBP: diaBP,
      results: newResults
    };

    setCalculationHistory(prev => [calculation, ...prev.slice(0, 4)]);
  };

  const clearCalculation = () => {
    setHeartRate("");
    setStrokeVolume("");
    setBloodPressureSystolic("");
    setBloodPressureDiastolic("");
    setResults({
      cardiacOutput: 0,
      cardiacIndex: 0,
      meanArterialPressure: 0,
      strokeVolumeIndex: 0
    });
  };

  const getCardiacOutputInterpretation = (co: number) => {
    if (co >= 4.0 && co <= 8.0) return { level: "Normal", color: "bg-green-500" };
    if (co < 4.0) return { level: "Low", color: "bg-red-500" };
    if (co > 8.0) return { level: "High", color: "bg-orange-500" };
    return { level: "Invalid", color: "bg-gray-500" };
  };

  const getCardiacIndexInterpretation = (ci: number) => {
    if (ci >= 2.5 && ci <= 4.0) return { level: "Normal", color: "bg-green-500" };
    if (ci < 2.5) return { level: "Low", color: "bg-red-500" };
    if (ci > 4.0) return { level: "High", color: "bg-orange-500" };
    return { level: "Invalid", color: "bg-gray-500" };
  };

  const getMAPInterpretation = (map: number) => {
    if (map >= 70 && map <= 100) return { level: "Normal", color: "bg-green-500" };
    if (map < 70) return { level: "Low", color: "bg-red-500" };
    if (map > 100) return { level: "High", color: "bg-orange-500" };
    return { level: "Invalid", color: "bg-gray-500" };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0" aria-describedby="cardiac-output-description">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Cardiac Output Calculator
          </DialogTitle>
          <div id="cardiac-output-description" className="text-sm text-muted-foreground">
            Calculate cardiac output, cardiac index, and related hemodynamic parameters
          </div>
        </DialogHeader>

        <div className="p-6 pt-0 space-y-6">
          {/* Input Parameters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Hemodynamic Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
                  <Input
                    id="heartRate"
                    type="number"
                    placeholder="e.g., 72"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="strokeVolume">Stroke Volume (mL)</Label>
                  <Input
                    id="strokeVolume"
                    type="number"
                    placeholder="e.g., 70"
                    value={strokeVolume}
                    onChange={(e) => setStrokeVolume(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="systolic">Systolic BP (mmHg)</Label>
                  <Input
                    id="systolic"
                    type="number"
                    placeholder="e.g., 120"
                    value={bloodPressureSystolic}
                    onChange={(e) => setBloodPressureSystolic(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="diastolic">Diastolic BP (mmHg)</Label>
                  <Input
                    id="diastolic"
                    type="number"
                    placeholder="e.g., 80"
                    value={bloodPressureDiastolic}
                    onChange={(e) => setBloodPressureDiastolic(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateCardiacOutput} className="flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
                <Button onClick={clearCalculation} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {results.cardiacOutput > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Calculation Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {results.cardiacOutput}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Cardiac Output (L/min)
                    </div>
                    <Badge className={`${getCardiacOutputInterpretation(results.cardiacOutput).color} text-white`}>
                      {getCardiacOutputInterpretation(results.cardiacOutput).level}
                    </Badge>
                  </div>

                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {results.cardiacIndex}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Cardiac Index (L/min/m²)
                    </div>
                    <Badge className={`${getCardiacIndexInterpretation(results.cardiacIndex).color} text-white`}>
                      {getCardiacIndexInterpretation(results.cardiacIndex).level}
                    </Badge>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {results.meanArterialPressure}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Mean Arterial Pressure (mmHg)
                    </div>
                    <Badge className={`${getMAPInterpretation(results.meanArterialPressure).color} text-white`}>
                      {getMAPInterpretation(results.meanArterialPressure).level}
                    </Badge>
                  </div>

                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {results.strokeVolumeIndex}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Stroke Volume Index (mL/m²)
                    </div>
                    <Badge variant="outline">
                      Normal: 33-47
                    </Badge>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-yellow-800">Clinical Considerations:</div>
                      <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                        <li>• Cardiac output depends on heart rate, stroke volume, and venous return</li>
                        <li>• Normal resting cardiac output: 4-8 L/min</li>
                        <li>• Cardiac index accounts for body surface area</li>
                        <li>• Consider patient's clinical condition and other vital signs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reference Values */}
          <Card>
            <CardHeader>
              <CardTitle>Normal Values & Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Normal Ranges</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Cardiac Output:</span>
                      <span>4.0-8.0 L/min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cardiac Index:</span>
                      <span>2.5-4.0 L/min/m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stroke Volume:</span>
                      <span>60-80 mL</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mean Arterial Pressure:</span>
                      <span>70-100 mmHg</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Formulas Used</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Cardiac Output:</strong> HR × SV
                    </div>
                    <div>
                      <strong>Cardiac Index:</strong> CO / BSA
                    </div>
                    <div>
                      <strong>MAP:</strong> (SBP + 2×DBP) / 3
                    </div>
                    <div>
                      <strong>SV Index:</strong> SV / BSA
                    </div>
                    <div className="text-muted-foreground">
                      *BSA assumed as 1.7 m² for average adult
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* History */}
          {calculationHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Calculation History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {calculationHistory.map((calc) => (
                    <div key={calc.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="text-sm">
                        <div className="font-medium">
                          HR: {calc.heartRate} BPM, SV: {calc.strokeVolume} mL
                        </div>
                        <div className="text-muted-foreground">
                          {calc.timestamp}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">
                          CO: {calc.results.cardiacOutput} L/min
                        </div>
                        <div className="text-sm text-muted-foreground">
                          CI: {calc.results.cardiacIndex} L/min/m²
                        </div>
                      </div>
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