import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Baby, Weight, Calculator } from "lucide-react";

interface PediatricWeightEstimatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PediatricWeightEstimator({ open, onOpenChange }: PediatricWeightEstimatorProps) {
  const [age, setAge] = useState("");
  const [ageUnit, setAgeUnit] = useState("years");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{
    estimatedWeight: number;
    method: string;
    ageCategory: string;
    recommendations: string[];
  } | null>(null);

  const calculateWeight = () => {
    const ageValue = parseFloat(age);
    
    if (isNaN(ageValue) || ageValue <= 0) {
      alert("Please enter a valid age");
      return;
    }

    let ageInYears = ageValue;
    if (ageUnit === "months") {
      ageInYears = ageValue / 12;
    }

    let estimatedWeight = 0;
    let method = "";
    let ageCategory = "";
    let recommendations: string[] = [];

    if (ageInYears < 1) {
      // Infants (0-12 months)
      const ageInMonths = ageUnit === "months" ? ageValue : ageValue * 12;
      if (ageInMonths <= 6) {
        estimatedWeight = 3.5 + (0.7 * ageInMonths); // Birth weight + 0.7 kg per month
        method = "Infant formula (0-6 months)";
      } else {
        estimatedWeight = 3.5 + (0.7 * 6) + (0.5 * (ageInMonths - 6)); // First 6 months + 0.5 kg per month
        method = "Infant formula (6-12 months)";
      }
      ageCategory = "Infant";
      recommendations = [
        "Verify with parent/caregiver if possible",
        "Use length-based tape if available",
        "Consider gestational age for premature infants",
        "Monitor for dehydration signs"
      ];
    } else if (ageInYears <= 10) {
      // Children (1-10 years) - APLS formula
      estimatedWeight = (2 * ageInYears) + 8;
      method = "APLS formula (Age × 2 + 8)";
      ageCategory = "Child";
      recommendations = [
        "Verify with parent/caregiver if possible",
        "Use Broselow tape if available",
        "Consider nutritional status",
        "Adjust for obesity/malnutrition if obvious"
      ];
    } else if (ageInYears <= 14) {
      // Adolescents (11-14 years) - Modified formula
      estimatedWeight = (3 * ageInYears) + 7;
      method = "Modified formula (Age × 3 + 7)";
      ageCategory = "Adolescent";
      recommendations = [
        "Consider growth spurt variations",
        "Verify with patient if conscious",
        "Use visual estimation as backup",
        "Consider body habitus"
      ];
    } else {
      // 15+ years - Adult estimation
      estimatedWeight = 70; // Average adult weight
      method = "Adult average (70 kg)";
      ageCategory = "Adult";
      recommendations = [
        "Use visual estimation for body habitus",
        "Consider patient history if available",
        "Adjust for obvious obesity/underweight",
        "Use standard adult dosing"
      ];
    }

    setResult({
      estimatedWeight,
      method,
      ageCategory,
      recommendations
    });
  };

  const reset = () => {
    setAge("");
    setHeight("");
    setResult(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "infant": return "bg-pink-500";
      case "child": return "bg-blue-500";
      case "adolescent": return "bg-purple-500";
      case "adult": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Baby className="h-5 w-5" />
            Pediatric Weight Estimator
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="age" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="age">Age-Based</TabsTrigger>
            <TabsTrigger value="reference">Reference Table</TabsTrigger>
          </TabsList>

          <TabsContent value="age" className="space-y-6">
            {/* Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="5"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ageUnit">Age Unit</Label>
                <select
                  id="ageUnit"
                  value={ageUnit}
                  onChange={(e) => setAgeUnit(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>

            {/* Calculation Buttons */}
            <div className="flex gap-2">
              <Button onClick={calculateWeight} className="flex-1">
                <Calculator className="h-4 w-4 mr-2" />
                Estimate Weight
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
                    <Weight className="h-5 w-5" />
                    Estimated Weight
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {result.estimatedWeight.toFixed(1)} kg
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ({(result.estimatedWeight * 2.2).toFixed(1)} lbs)
                      </div>
                    </div>
                    <div className="text-center">
                      <Badge className={getCategoryColor(result.ageCategory)}>
                        {result.ageCategory}
                      </Badge>
                      <div className="text-sm mt-1">{result.method}</div>
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
                <CardTitle>Quick Reference Table</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Age-Based Formulas:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 0-6 months: 3.5 + (0.7 × months)</li>
                      <li>• 6-12 months: 7.7 + (0.5 × months after 6)</li>
                      <li>• 1-10 years: (Age × 2) + 8</li>
                      <li>• 11-14 years: (Age × 3) + 7</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Common Weights:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Newborn: 3.5 kg (7.7 lbs)</li>
                      <li>• 6 months: 7.7 kg (17 lbs)</li>
                      <li>• 1 year: 10 kg (22 lbs)</li>
                      <li>• 2 years: 12 kg (26 lbs)</li>
                      <li>• 5 years: 18 kg (40 lbs)</li>
                      <li>• 10 years: 28 kg (62 lbs)</li>
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