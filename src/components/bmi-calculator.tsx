import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, User, AlertTriangle, RotateCcw } from "lucide-react";

interface BMICalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BMICalculator({ open, onOpenChange }: BMICalculatorProps) {
  const [unitSystem, setUnitSystem] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [results, setResults] = useState({
    bmi: 0,
    category: "",
    healthyWeightRange: { min: 0, max: 0 },
    weightToLose: 0,
    weightToGain: 0
  });
  const [calculationHistory, setCalculationHistory] = useState<any[]>([]);

  const calculateBMI = () => {
    let weightKg = 0;
    let heightM = 0;

    if (unitSystem === "metric") {
      weightKg = parseFloat(weight);
      heightM = parseFloat(height) / 100; // Convert cm to m
    } else {
      weightKg = parseFloat(weight) * 0.453592; // Convert lbs to kg
      const totalInches = parseFloat(feet) * 12 + parseFloat(inches);
      heightM = totalInches * 0.0254; // Convert inches to meters
    }

    if (!weightKg || !heightM || weightKg <= 0 || heightM <= 0) {
      alert("Please enter valid weight and height values");
      return;
    }

    const bmi = weightKg / (heightM * heightM);
    
    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    // Calculate healthy weight range (BMI 18.5-24.9)
    const minHealthyWeight = 18.5 * (heightM * heightM);
    const maxHealthyWeight = 24.9 * (heightM * heightM);

    // Convert back to display units
    const healthyWeightRange = {
      min: unitSystem === "metric" ? minHealthyWeight : minHealthyWeight * 2.20462,
      max: unitSystem === "metric" ? maxHealthyWeight : maxHealthyWeight * 2.20462
    };

    // Calculate weight to lose/gain to reach healthy range
    const currentWeight = unitSystem === "metric" ? weightKg : weightKg * 2.20462;
    let weightToLose = 0;
    let weightToGain = 0;

    if (bmi >= 25) {
      weightToLose = currentWeight - healthyWeightRange.max;
    } else if (bmi < 18.5) {
      weightToGain = healthyWeightRange.min - currentWeight;
    }

    const newResults = {
      bmi: Math.round(bmi * 10) / 10,
      category,
      healthyWeightRange: {
        min: Math.round(healthyWeightRange.min * 10) / 10,
        max: Math.round(healthyWeightRange.max * 10) / 10
      },
      weightToLose: Math.round(weightToLose * 10) / 10,
      weightToGain: Math.round(weightToGain * 10) / 10
    };

    setResults(newResults);

    // Add to history
    const calculation = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      unitSystem,
      weight: unitSystem === "metric" ? weight : weight,
      height: unitSystem === "metric" ? height : `${feet}'${inches}"`,
      results: newResults
    };

    setCalculationHistory(prev => [calculation, ...prev.slice(0, 4)]);
  };

  const clearCalculation = () => {
    setWeight("");
    setHeight("");
    setFeet("");
    setInches("");
    setResults({
      bmi: 0,
      category: "",
      healthyWeightRange: { min: 0, max: 0 },
      weightToLose: 0,
      weightToGain: 0
    });
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return "bg-blue-500";
    if (bmi < 25) return "bg-green-500";
    if (bmi < 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getBMIHealthRisks = (bmi: number) => {
    if (bmi < 18.5) return [
      "Increased risk of osteoporosis",
      "Weakened immune system",
      "Fertility issues",
      "Delayed wound healing"
    ];
    if (bmi < 25) return [
      "Optimal health range",
      "Lower disease risk",
      "Better mobility",
      "Improved longevity"
    ];
    if (bmi < 30) return [
      "Increased risk of heart disease",
      "Higher blood pressure risk",
      "Type 2 diabetes risk",
      "Sleep apnea risk"
    ];
    return [
      "Significantly increased cardiovascular risk",
      "Higher risk of stroke",
      "Increased cancer risk",
      "Joint problems and arthritis"
    ];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0" aria-describedby="bmi-calculator-description">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-pink-500" />
            BMI Calculator
          </DialogTitle>
          <div id="bmi-calculator-description" className="text-sm text-muted-foreground">
            Calculate Body Mass Index and assess health categories
          </div>
        </DialogHeader>

        <div className="p-6 pt-0 space-y-6">
          {/* Input Parameters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Body Measurements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 mb-4">
                <Button
                  variant={unitSystem === "metric" ? "default" : "outline"}
                  onClick={() => setUnitSystem("metric")}
                  className="flex-1"
                >
                  Metric (kg, cm)
                </Button>
                <Button
                  variant={unitSystem === "imperial" ? "default" : "outline"}
                  onClick={() => setUnitSystem("imperial")}
                  className="flex-1"
                >
                  Imperial (lbs, ft/in)
                </Button>
              </div>

              <Tabs value={unitSystem} className="w-full">
                <TabsContent value="metric" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="weight-kg">Weight (kg)</Label>
                      <Input
                        id="weight-kg"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 70.5"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height-cm">Height (cm)</Label>
                      <Input
                        id="height-cm"
                        type="number"
                        placeholder="e.g., 175"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="imperial" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="weight-lbs">Weight (lbs)</Label>
                      <Input
                        id="weight-lbs"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 155"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height-feet">Height (feet)</Label>
                      <Input
                        id="height-feet"
                        type="number"
                        placeholder="e.g., 5"
                        value={feet}
                        onChange={(e) => setFeet(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height-inches">Height (inches)</Label>
                      <Input
                        id="height-inches"
                        type="number"
                        placeholder="e.g., 9"
                        value={inches}
                        onChange={(e) => setInches(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2">
                <Button onClick={calculateBMI} className="flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate BMI
                </Button>
                <Button onClick={clearCalculation} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {results.bmi > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  BMI Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center space-y-4">
                    <div>
                      <div className="text-6xl font-bold text-primary mb-2">
                        {results.bmi}
                      </div>
                      <div className="text-lg text-muted-foreground mb-2">
                        Body Mass Index
                      </div>
                      <Badge className={`${getBMIColor(results.bmi)} text-white`}>
                        {results.category}
                      </Badge>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800 mb-2">
                        Healthy Weight Range
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {results.healthyWeightRange.min} - {results.healthyWeightRange.max}
                      </div>
                      <div className="text-sm text-blue-700">
                        {unitSystem === "metric" ? "kg" : "lbs"}
                      </div>
                    </div>

                    {results.weightToLose > 0 && (
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="font-semibold text-orange-800 mb-2">
                          Weight to Lose
                        </div>
                        <div className="text-2xl font-bold text-orange-600">
                          {results.weightToLose}
                        </div>
                        <div className="text-sm text-orange-700">
                          {unitSystem === "metric" ? "kg" : "lbs"}
                        </div>
                      </div>
                    )}

                    {results.weightToGain > 0 && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="font-semibold text-green-800 mb-2">
                          Weight to Gain
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          {results.weightToGain}
                        </div>
                        <div className="text-sm text-green-700">
                          {unitSystem === "metric" ? "kg" : "lbs"}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      Health Considerations
                    </h4>
                    <div className="space-y-2">
                      {getBMIHealthRisks(results.bmi).map((risk, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-sm">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-yellow-800">Important Notes:</div>
                      <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                        <li>• BMI is a screening tool, not a diagnostic measure</li>
                        <li>• Does not account for muscle mass, bone density, or body composition</li>
                        <li>• Consult healthcare provider for personalized health assessment</li>
                        <li>• Consider waist circumference and other health markers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* BMI Categories Reference */}
          <Card>
            <CardHeader>
              <CardTitle>BMI Categories & Health Risks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Category</th>
                      <th className="text-left p-2">BMI Range</th>
                      <th className="text-left p-2">Health Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">
                        <Badge className="bg-blue-500 text-white">Underweight</Badge>
                      </td>
                      <td className="p-2">Less than 18.5</td>
                      <td className="p-2">Increased risk of malnutrition, osteoporosis</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">
                        <Badge className="bg-green-500 text-white">Normal weight</Badge>
                      </td>
                      <td className="p-2">18.5 - 24.9</td>
                      <td className="p-2">Optimal health range</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">
                        <Badge className="bg-yellow-500 text-white">Overweight</Badge>
                      </td>
                      <td className="p-2">25.0 - 29.9</td>
                      <td className="p-2">Increased risk of cardiovascular disease</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">
                        <Badge className="bg-red-500 text-white">Obese</Badge>
                      </td>
                      <td className="p-2">30.0 and above</td>
                      <td className="p-2">High risk of serious health conditions</td>
                    </tr>
                  </tbody>
                </table>
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
                          {calc.weight} {calc.unitSystem === "metric" ? "kg" : "lbs"} - {calc.height} {calc.unitSystem === "metric" ? "cm" : ""}
                        </div>
                        <div className="text-muted-foreground">
                          {calc.timestamp}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">
                          BMI: {calc.results.bmi}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {calc.results.category}
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