import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Calculator, AlertTriangle } from "lucide-react";

interface AnionGapCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AnionGapCalculator({ open, onOpenChange }: AnionGapCalculatorProps) {
  const [sodium, setSodium] = useState("");
  const [chloride, setChloride] = useState("");
  const [bicarbonate, setBicarbonate] = useState("");
  const [albumin, setAlbumin] = useState("");
  const [result, setResult] = useState<{
    anionGap: number;
    correctedGap: number;
    interpretation: string;
    category: "normal" | "high" | "low";
    possibleCauses: string[];
    recommendations: string[];
  } | null>(null);

  const calculateAnionGap = () => {
    const na = parseFloat(sodium);
    const cl = parseFloat(chloride);
    const hco3 = parseFloat(bicarbonate);
    const alb = parseFloat(albumin);

    if (isNaN(na) || isNaN(cl) || isNaN(hco3) || na <= 0 || cl <= 0 || hco3 <= 0) {
      alert("Please enter valid sodium, chloride, and bicarbonate values");
      return;
    }

    const anionGap = na - (cl + hco3);
    let correctedGap = anionGap;
    
    // Albumin correction if provided
    if (!isNaN(alb) && alb > 0) {
      const normalAlbumin = 4.0; // g/dL
      correctedGap = anionGap + (2.5 * (normalAlbumin - alb));
    }

    let interpretation = "";
    let category: "normal" | "high" | "low" = "normal";
    let possibleCauses: string[] = [];
    let recommendations: string[] = [];

    if (correctedGap < 8) {
      interpretation = "Low anion gap - Unusual finding";
      category = "low";
      possibleCauses = [
        "Hypoalbuminemia",
        "Multiple myeloma",
        "Lithium toxicity",
        "Magnesium toxicity",
        "Laboratory error"
      ];
      recommendations = [
        "Verify laboratory values",
        "Check protein levels",
        "Assess medication history",
        "Consider repeat testing"
      ];
    } else if (correctedGap >= 8 && correctedGap <= 12) {
      interpretation = "Normal anion gap";
      category = "normal";
      possibleCauses = [
        "Normal acid-base balance",
        "Non-anion gap metabolic acidosis (if acidotic)"
      ];
      recommendations = [
        "Continue routine monitoring",
        "Assess overall acid-base status",
        "Monitor for changes"
      ];
    } else {
      interpretation = "High anion gap - Metabolic acidosis likely";
      category = "high";
      possibleCauses = [
        "Diabetic ketoacidosis (DKA)",
        "Lactic acidosis",
        "Renal failure",
        "Salicylate poisoning",
        "Methanol/ethylene glycol poisoning",
        "Starvation ketosis"
      ];
      recommendations = [
        "Assess for diabetic ketoacidosis",
        "Check blood glucose and ketones",
        "Evaluate for shock/hypoperfusion",
        "Consider toxic ingestion",
        "Monitor renal function",
        "Urgent medical evaluation needed"
      ];
    }

    setResult({
      anionGap,
      correctedGap,
      interpretation,
      category,
      possibleCauses,
      recommendations
    });
  };

  const reset = () => {
    setSodium("");
    setChloride("");
    setBicarbonate("");
    setAlbumin("");
    setResult(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "low": return "bg-blue-500";
      case "normal": return "bg-green-500";
      case "high": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            Anion Gap Calculator
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="calculate" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculate">Calculate</TabsTrigger>
            <TabsTrigger value="reference">Reference</TabsTrigger>
          </TabsList>

          <TabsContent value="calculate" className="space-y-6">
            {/* Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sodium">Sodium (mEq/L)</Label>
                <Input
                  id="sodium"
                  type="number"
                  placeholder="140"
                  value={sodium}
                  onChange={(e) => setSodium(e.target.value)}
                  min="0"
                  max="200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chloride">Chloride (mEq/L)</Label>
                <Input
                  id="chloride"
                  type="number"
                  placeholder="100"
                  value={chloride}
                  onChange={(e) => setChloride(e.target.value)}
                  min="0"
                  max="150"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bicarbonate">Bicarbonate (mEq/L)</Label>
                <Input
                  id="bicarbonate"
                  type="number"
                  placeholder="24"
                  value={bicarbonate}
                  onChange={(e) => setBicarbonate(e.target.value)}
                  min="0"
                  max="50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="albumin">Albumin (g/dL) - Optional</Label>
                <Input
                  id="albumin"
                  type="number"
                  placeholder="4.0"
                  value={albumin}
                  onChange={(e) => setAlbumin(e.target.value)}
                  min="0"
                  max="6"
                  step="0.1"
                />
              </div>
            </div>

            {/* Calculation Buttons */}
            <div className="flex gap-2">
              <Button onClick={calculateAnionGap} className="flex-1">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Anion Gap
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
                        {result.anionGap.toFixed(1)} mEq/L
                      </div>
                      <div className="text-sm text-muted-foreground">Anion Gap</div>
                      {result.correctedGap !== result.anionGap && (
                        <div className="text-sm text-muted-foreground">
                          Corrected: {result.correctedGap.toFixed(1)} mEq/L
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <Badge className={getCategoryColor(result.category)}>
                        {result.category.toUpperCase()}
                      </Badge>
                      <div className="text-sm mt-1">{result.interpretation}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Possible Causes:</h4>
                      <ul className="space-y-1">
                        {result.possibleCauses.map((cause, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span className="text-sm">{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Recommendations:</h4>
                      <ul className="space-y-1">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reference" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Anion Gap Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Formula:</h4>
                    <p className="text-sm text-muted-foreground">
                      Anion Gap = Na⁺ - (Cl⁻ + HCO₃⁻)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Albumin Correction = AG + 2.5 × (4.0 - albumin)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Normal Values:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Normal: 8-12 mEq/L</li>
                      <li>• High: &gt;12 mEq/L</li>
                      <li>• Low: &lt;8 mEq/L</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">MUDPILES Mnemonic (High AG):</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>M</strong>ethanol</li>
                      <li>• <strong>U</strong>remia</li>
                      <li>• <strong>D</strong>iabetic ketoacidosis</li>
                      <li>• <strong>P</strong>ropylene glycol</li>
                      <li>• <strong>I</strong>soniazid</li>
                      <li>• <strong>L</strong>actic acidosis</li>
                      <li>• <strong>E</strong>thylene glycol</li>
                      <li>• <strong>S</strong>alicylates</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}