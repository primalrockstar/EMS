import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Droplets, Calculator, Clock } from "lucide-react";

interface ParklandFormulaCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ParklandFormulaCalculator({ open, onOpenChange }: ParklandFormulaCalculatorProps) {
  const [weight, setWeight] = useState("");
  const [burnPercentage, setBurnPercentage] = useState("");
  const [timeSinceBurn, setTimeSinceBurn] = useState("");
  const [result, setResult] = useState<{
    totalFluid: number;
    first8Hours: number;
    second8Hours: number;
    third8Hours: number;
    hourlyRate: number;
    recommendations: string[];
  } | null>(null);

  const calculateParkland = () => {
    const wt = parseFloat(weight);
    const burnPct = parseFloat(burnPercentage);
    const timeSince = parseFloat(timeSinceBurn);

    if (isNaN(wt) || isNaN(burnPct) || wt <= 0 || burnPct <= 0 || burnPct > 100) {
      alert("Please enter valid weight and burn percentage values");
      return;
    }

    if (isNaN(timeSince) || timeSince < 0 || timeSince > 24) {
      alert("Please enter valid time since burn (0-24 hours)");
      return;
    }

    // Parkland Formula: 4 mL × weight (kg) × % burn
    const totalFluid = 4 * wt * burnPct;
    
    // First 8 hours gets 50% of total fluid
    const first8Hours = totalFluid * 0.5;
    
    // Second and third 8 hours get 25% each
    const second8Hours = totalFluid * 0.25;
    const third8Hours = totalFluid * 0.25;

    // Calculate hourly rate for first 8 hours
    const hourlyRate = first8Hours / 8;

    let recommendations = [
      "Use lactated Ringer's solution as primary fluid",
      "Monitor urine output (goal: 0.5-1 mL/kg/hr)",
      "Assess for compartment syndrome",
      "Consider escharotomy if circulation compromised",
      "Monitor for signs of fluid overload"
    ];

    if (burnPct >= 20) {
      recommendations.push("Consider transfer to burn center");
      recommendations.push("Aggressive fluid resuscitation required");
    }

    if (burnPct >= 50) {
      recommendations.push("High mortality risk - intensive care required");
      recommendations.push("Consider early intubation");
    }

    if (timeSince > 2) {
      recommendations.push("Delayed resuscitation - adjust fluid calculations");
      recommendations.push("Consider increased fluid requirements");
    }

    setResult({
      totalFluid,
      first8Hours,
      second8Hours,
      third8Hours,
      hourlyRate,
      recommendations
    });
  };

  const reset = () => {
    setWeight("");
    setBurnPercentage("");
    setTimeSinceBurn("");
    setResult(null);
  };

  const getBurnSeverity = (percentage: number) => {
    if (percentage < 10) return { severity: "Minor", color: "bg-yellow-500" };
    if (percentage < 20) return { severity: "Moderate", color: "bg-orange-500" };
    if (percentage < 50) return { severity: "Major", color: "bg-red-500" };
    return { severity: "Critical", color: "bg-red-700" };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5" />
            Parkland Formula Calculator
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
                <Label htmlFor="weight">Patient Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="0"
                  max="300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="burnPercentage">% Total Body Surface Area Burned</Label>
                <Input
                  id="burnPercentage"
                  type="number"
                  placeholder="20"
                  value={burnPercentage}
                  onChange={(e) => setBurnPercentage(e.target.value)}
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="timeSinceBurn">Time Since Burn (hours)</Label>
                <Input
                  id="timeSinceBurn"
                  type="number"
                  placeholder="2"
                  value={timeSinceBurn}
                  onChange={(e) => setTimeSinceBurn(e.target.value)}
                  min="0"
                  max="24"
                />
              </div>
            </div>

            {/* Calculation Buttons */}
            <div className="flex gap-2">
              <Button onClick={calculateParkland} className="flex-1">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Fluid Requirements
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
                    <Droplets className="h-5 w-5" />
                    Fluid Resuscitation Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {result.totalFluid.toFixed(0)} mL
                      </div>
                      <div className="text-sm text-muted-foreground">Total 24-hour fluid</div>
                    </div>
                    <div className="text-center">
                      {burnPercentage && (
                        <Badge className={getBurnSeverity(parseFloat(burnPercentage)).color}>
                          {getBurnSeverity(parseFloat(burnPercentage)).severity}
                        </Badge>
                      )}
                      <div className="text-sm mt-1">Burn severity</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          First 8 Hours
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold">{result.first8Hours.toFixed(0)} mL</div>
                        <div className="text-sm text-muted-foreground">
                          {result.hourlyRate.toFixed(0)} mL/hr
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Second 8 Hours
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold">{result.second8Hours.toFixed(0)} mL</div>
                        <div className="text-sm text-muted-foreground">
                          {(result.second8Hours / 8).toFixed(0)} mL/hr
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Third 8 Hours
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold">{result.third8Hours.toFixed(0)} mL</div>
                        <div className="text-sm text-muted-foreground">
                          {(result.third8Hours / 8).toFixed(0)} mL/hr
                        </div>
                      </CardContent>
                    </Card>
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
                <CardTitle>Parkland Formula Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Formula:</h4>
                    <p className="text-sm text-muted-foreground">
                      Total Fluid = 4 mL × Weight (kg) × % TBSA Burned
                    </p>
                    <p className="text-sm text-muted-foreground">
                      • First 8 hours: 50% of total fluid
                    </p>
                    <p className="text-sm text-muted-foreground">
                      • Second 8 hours: 25% of total fluid
                    </p>
                    <p className="text-sm text-muted-foreground">
                      • Third 8 hours: 25% of total fluid
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Burn Severity:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Minor: &lt;10% TBSA</li>
                      <li>• Moderate: 10-20% TBSA</li>
                      <li>• Major: 20-50% TBSA</li>
                      <li>• Critical: &gt;50% TBSA</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Monitoring:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Urine output: 0.5-1 mL/kg/hr</li>
                      <li>• Use lactated Ringer's solution</li>
                      <li>• Adjust based on patient response</li>
                      <li>• Monitor for compartment syndrome</li>
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