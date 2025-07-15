import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wind, Activity, Calculator } from "lucide-react";

interface MinuteVentilationCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MinuteVentilationCalculator({ open, onOpenChange }: MinuteVentilationCalculatorProps) {
  const [tidalVolume, setTidalVolume] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [patientWeight, setPatientWeight] = useState("");
  const [result, setResult] = useState<{
    minuteVentilation: number;
    normalizedMV: number;
    interpretation: string;
    category: "low" | "normal" | "high";
    recommendations: string[];
  } | null>(null);

  const calculateMinuteVentilation = () => {
    const tv = parseFloat(tidalVolume);
    const rr = parseFloat(respiratoryRate);
    const weight = parseFloat(patientWeight);

    if (isNaN(tv) || isNaN(rr) || tv <= 0 || rr <= 0) {
      alert("Please enter valid tidal volume and respiratory rate values");
      return;
    }

    const minuteVentilation = (tv * rr) / 1000; // Convert to L/min
    let normalizedMV = 0;
    let interpretation = "";
    let category: "low" | "normal" | "high" = "normal";
    let recommendations: string[] = [];

    if (!isNaN(weight) && weight > 0) {
      normalizedMV = minuteVentilation / weight;
      
      if (normalizedMV < 0.06) {
        interpretation = "Low minute ventilation - Hypoventilation";
        category = "low";
        recommendations = [
          "Assess for respiratory depression",
          "Consider assisted ventilation",
          "Check airway patency",
          "Monitor oxygen saturation",
          "Evaluate for narcotic overdose"
        ];
      } else if (normalizedMV >= 0.06 && normalizedMV <= 0.15) {
        interpretation = "Normal minute ventilation";
        category = "normal";
        recommendations = [
          "Continue current monitoring",
          "Maintain spontaneous breathing",
          "Regular assessment of work of breathing",
          "Monitor for changes"
        ];
      } else {
        interpretation = "High minute ventilation - Hyperventilation";
        category = "high";
        recommendations = [
          "Assess for anxiety/pain",
          "Consider metabolic acidosis",
          "Evaluate for hypoxemia",
          "Monitor for respiratory fatigue",
          "Consider sedation if appropriate"
        ];
      }
    } else {
      // Without weight, use absolute values
      if (minuteVentilation < 4) {
        interpretation = "Low minute ventilation - Hypoventilation";
        category = "low";
      } else if (minuteVentilation >= 4 && minuteVentilation <= 10) {
        interpretation = "Normal minute ventilation";
        category = "normal";
      } else {
        interpretation = "High minute ventilation - Hyperventilation";
        category = "high";
      }
      
      recommendations = [
        "Consider patient weight for more accurate assessment",
        "Evaluate clinical context",
        "Monitor respiratory effort",
        "Assess for underlying causes"
      ];
    }

    setResult({
      minuteVentilation,
      normalizedMV,
      interpretation,
      category,
      recommendations
    });
  };

  const reset = () => {
    setTidalVolume("");
    setRespiratoryRate("");
    setPatientWeight("");
    setResult(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "low": return "bg-red-500";
      case "normal": return "bg-green-500";
      case "high": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wind className="h-5 w-5" />
            Minute Ventilation Calculator
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="calculate" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculate">Calculate</TabsTrigger>
            <TabsTrigger value="reference">Reference Values</TabsTrigger>
          </TabsList>

          <TabsContent value="calculate" className="space-y-6">
            {/* Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tidalVolume">Tidal Volume (mL)</Label>
                <Input
                  id="tidalVolume"
                  type="number"
                  placeholder="500"
                  value={tidalVolume}
                  onChange={(e) => setTidalVolume(e.target.value)}
                  min="0"
                  max="3000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="respiratoryRate">Respiratory Rate (breaths/min)</Label>
                <Input
                  id="respiratoryRate"
                  type="number"
                  placeholder="14"
                  value={respiratoryRate}
                  onChange={(e) => setRespiratoryRate(e.target.value)}
                  min="0"
                  max="60"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="patientWeight">Patient Weight (kg) - Optional</Label>
                <Input
                  id="patientWeight"
                  type="number"
                  placeholder="70"
                  value={patientWeight}
                  onChange={(e) => setPatientWeight(e.target.value)}
                  min="0"
                  max="300"
                />
              </div>
            </div>

            {/* Calculation Buttons */}
            <div className="flex gap-2">
              <Button onClick={calculateMinuteVentilation} className="flex-1">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Minute Ventilation
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
                    <Activity className="h-5 w-5" />
                    Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {result.minuteVentilation.toFixed(1)} L/min
                      </div>
                      <div className="text-sm text-muted-foreground">Minute Ventilation</div>
                      {result.normalizedMV > 0 && (
                        <div className="text-sm text-muted-foreground">
                          {(result.normalizedMV * 1000).toFixed(0)} mL/kg/min
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
          </TabsContent>

          <TabsContent value="reference" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Normal Reference Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Adults:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Tidal Volume: 6-8 mL/kg (500-600 mL)</li>
                      <li>• Respiratory Rate: 12-20 breaths/min</li>
                      <li>• Minute Ventilation: 5-8 L/min</li>
                      <li>• Normal: 60-150 mL/kg/min</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Pediatric:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Infant: 6-8 mL/kg TV</li>
                      <li>• Child: 6-8 mL/kg TV</li>
                      <li>• RR varies by age</li>
                      <li>• Higher mL/kg/min than adults</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Formula:</h4>
                  <p className="text-sm">Minute Ventilation = Tidal Volume × Respiratory Rate</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}