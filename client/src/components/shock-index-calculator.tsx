import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Heart, Calculator } from "lucide-react";

interface ShockIndexCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ShockIndexCalculator({ open, onOpenChange }: ShockIndexCalculatorProps) {
  const [heartRate, setHeartRate] = useState("");
  const [systolicBP, setSystolicBP] = useState("");
  const [result, setResult] = useState<{
    shockIndex: number;
    interpretation: string;
    severity: "normal" | "mild" | "moderate" | "severe";
    recommendations: string[];
  } | null>(null);

  const calculateShockIndex = () => {
    const hr = parseFloat(heartRate);
    const sbp = parseFloat(systolicBP);

    if (isNaN(hr) || isNaN(sbp) || hr <= 0 || sbp <= 0) {
      alert("Please enter valid heart rate and systolic blood pressure values");
      return;
    }

    const shockIndex = hr / sbp;
    let interpretation = "";
    let severity: "normal" | "mild" | "moderate" | "severe" = "normal";
    let recommendations: string[] = [];

    if (shockIndex < 0.6) {
      interpretation = "Normal - No significant shock";
      severity = "normal";
      recommendations = [
        "Continue routine monitoring",
        "Maintain current treatment plan",
        "Reassess vital signs regularly"
      ];
    } else if (shockIndex >= 0.6 && shockIndex < 0.8) {
      interpretation = "Mild shock - Early compensated stage";
      severity = "mild";
      recommendations = [
        "Increase monitoring frequency",
        "Evaluate for underlying causes",
        "Consider fluid resuscitation",
        "Prepare for potential deterioration"
      ];
    } else if (shockIndex >= 0.8 && shockIndex < 1.0) {
      interpretation = "Moderate shock - Compensated stage";
      severity = "moderate";
      recommendations = [
        "Initiate aggressive fluid resuscitation",
        "Consider blood products if hemorrhagic",
        "Frequent vital sign monitoring",
        "Prepare for advanced interventions"
      ];
    } else {
      interpretation = "Severe shock - Decompensated stage";
      severity = "severe";
      recommendations = [
        "Immediate aggressive resuscitation",
        "Consider vasopressors",
        "Blood product administration",
        "Urgent surgical consultation if trauma",
        "Continuous monitoring required"
      ];
    }

    setResult({
      shockIndex,
      interpretation,
      severity,
      recommendations
    });
  };

  const reset = () => {
    setHeartRate("");
    setSystolicBP("");
    setResult(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "normal": return "bg-green-500";
      case "mild": return "bg-yellow-500";
      case "moderate": return "bg-orange-500";
      case "severe": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Shock Index Calculator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
              <Input
                id="heartRate"
                type="number"
                placeholder="72"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                min="0"
                max="300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="systolicBP">Systolic Blood Pressure (mmHg)</Label>
              <Input
                id="systolicBP"
                type="number"
                placeholder="116"
                value={systolicBP}
                onChange={(e) => setSystolicBP(e.target.value)}
                min="0"
                max="300"
              />
            </div>
          </div>

          {/* Calculation Buttons */}
          <div className="flex gap-2">
            <Button onClick={calculateShockIndex} className="flex-1">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Shock Index
            </Button>
            <Button variant="outline" onClick={reset}>
              Reset
            </Button>
          </div>

          {/* Results */}
          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {result.shockIndex.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">Shock Index</div>
                  </div>
                  <div className="text-center">
                    <Badge className={getSeverityColor(result.severity)}>
                      {result.severity.toUpperCase()}
                    </Badge>
                    <div className="text-sm mt-1">{result.interpretation}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Clinical Recommendations:</h4>
                  <ul className="space-y-1">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reference Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reference Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold">Formula:</h4>
                <p className="text-sm text-muted-foreground">
                  Shock Index = Heart Rate ÷ Systolic Blood Pressure
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Interpretation:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• &lt;0.6: Normal</li>
                  <li>• 0.6-0.8: Mild shock</li>
                  <li>• 0.8-1.0: Moderate shock</li>
                  <li>• &gt;1.0: Severe shock</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Clinical Significance:</h4>
                <p className="text-sm text-muted-foreground">
                  Shock Index is a sensitive indicator of hemodynamic compromise, often elevated before traditional vital signs show abnormalities.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}