import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Heart, Calculator } from "lucide-react";

interface MAPCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MAPCalculator({ open, onOpenChange }: MAPCalculatorProps) {
  const [systolicBP, setSystolicBP] = useState("");
  const [diastolicBP, setDiastolicBP] = useState("");
  const [result, setResult] = useState<{
    map: number;
    interpretation: string;
    category: "hypotensive" | "normal" | "hypertensive";
    recommendations: string[];
  } | null>(null);

  const calculateMAP = () => {
    const sbp = parseFloat(systolicBP);
    const dbp = parseFloat(diastolicBP);

    if (isNaN(sbp) || isNaN(dbp) || sbp <= 0 || dbp <= 0) {
      alert("Please enter valid systolic and diastolic blood pressure values");
      return;
    }

    if (sbp < dbp) {
      alert("Systolic pressure should be higher than diastolic pressure");
      return;
    }

    const map = dbp + ((sbp - dbp) / 3);
    let interpretation = "";
    let category: "hypotensive" | "normal" | "hypertensive" = "normal";
    let recommendations: string[] = [];

    if (map < 60) {
      interpretation = "Hypotensive - Risk of organ hypoperfusion";
      category = "hypotensive";
      recommendations = [
        "Immediate intervention required",
        "Assess for shock causes",
        "Consider fluid resuscitation",
        "Monitor urine output",
        "Evaluate for vasopressor need"
      ];
    } else if (map >= 60 && map <= 100) {
      interpretation = "Normal - Adequate organ perfusion";
      category = "normal";
      recommendations = [
        "Continue current monitoring",
        "Maintain current treatment",
        "Regular vital sign assessment",
        "Monitor for changes"
      ];
    } else {
      interpretation = "Hypertensive - Elevated perfusion pressure";
      category = "hypertensive";
      recommendations = [
        "Assess for hypertensive emergency",
        "Monitor for end-organ damage",
        "Consider antihypertensive therapy",
        "Neurological assessment",
        "Cardiovascular evaluation"
      ];
    }

    setResult({
      map,
      interpretation,
      category,
      recommendations
    });
  };

  const reset = () => {
    setSystolicBP("");
    setDiastolicBP("");
    setResult(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "hypotensive": return "bg-red-500";
      case "normal": return "bg-green-500";
      case "hypertensive": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Mean Arterial Pressure (MAP) Calculator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="space-y-2">
              <Label htmlFor="diastolicBP">Diastolic Blood Pressure (mmHg)</Label>
              <Input
                id="diastolicBP"
                type="number"
                placeholder="78"
                value={diastolicBP}
                onChange={(e) => setDiastolicBP(e.target.value)}
                min="0"
                max="200"
              />
            </div>
          </div>

          {/* Calculation Buttons */}
          <div className="flex gap-2">
            <Button onClick={calculateMAP} className="flex-1">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate MAP
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
                  <Heart className="h-5 w-5" />
                  Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {result.map.toFixed(0)} mmHg
                    </div>
                    <div className="text-sm text-muted-foreground">Mean Arterial Pressure</div>
                  </div>
                  <div className="text-center">
                    <Badge className={getCategoryColor(result.category)}>
                      {result.category.toUpperCase()}
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
                  MAP = Diastolic BP + (Systolic BP - Diastolic BP) ÷ 3
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Normal Values:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• &lt;60 mmHg: Hypotensive</li>
                  <li>• 60-100 mmHg: Normal</li>
                  <li>• &gt;100 mmHg: Hypertensive</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Clinical Significance:</h4>
                <p className="text-sm text-muted-foreground">
                  MAP represents the average pressure in arteries during one cardiac cycle and is crucial for organ perfusion assessment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}