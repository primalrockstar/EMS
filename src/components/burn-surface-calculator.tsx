import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Flame, Calculator, AlertTriangle, RotateCcw, User } from "lucide-react";

interface BurnSurfaceCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BurnSurfaceCalculator({ open, onOpenChange }: BurnSurfaceCalculatorProps) {
  const [patientAge, setPatientAge] = useState("adult");
  const [bodyParts, setBodyParts] = useState({
    head: 0,
    chest: 0,
    abdomen: 0,
    back: 0,
    rightArm: 0,
    leftArm: 0,
    rightLeg: 0,
    leftLeg: 0,
    genitals: 0
  });
  const [burnDepth, setBurnDepth] = useState("second");
  const [calculationHistory, setCalculationHistory] = useState<any[]>([]);

  const ruleOfNines = {
    adult: {
      head: 9,
      chest: 9,
      abdomen: 9,
      back: 18,
      rightArm: 9,
      leftArm: 9,
      rightLeg: 18,
      leftLeg: 18,
      genitals: 1
    },
    child: {
      head: 18,
      chest: 9,
      abdomen: 9,
      back: 18,
      rightArm: 9,
      leftArm: 9,
      rightLeg: 14,
      leftLeg: 14,
      genitals: 1
    },
    infant: {
      head: 18,
      chest: 9,
      abdomen: 9,
      back: 18,
      rightArm: 9,
      leftArm: 9,
      rightLeg: 14,
      leftLeg: 14,
      genitals: 1
    }
  };

  const bodyPartLabels = {
    head: "Head & Neck",
    chest: "Chest",
    abdomen: "Abdomen",
    back: "Back",
    rightArm: "Right Arm",
    leftArm: "Left Arm",
    rightLeg: "Right Leg",
    leftLeg: "Left Leg",
    genitals: "Genitals"
  };

  const totalBurnArea = Object.entries(bodyParts).reduce((total, [part, percentage]) => {
    return total + (percentage || 0);
  }, 0);

  const updateBodyPart = (part: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    const maxValue = ruleOfNines[patientAge as keyof typeof ruleOfNines][part as keyof typeof ruleOfNines.adult];
    
    if (numValue > maxValue) {
      alert(`Maximum value for ${bodyPartLabels[part as keyof typeof bodyPartLabels]} is ${maxValue}%`);
      return;
    }
    
    setBodyParts(prev => ({
      ...prev,
      [part]: numValue
    }));
  };

  const getBurnSeverity = (percentage: number) => {
    if (percentage < 10) return { level: "Minor", color: "bg-green-500" };
    if (percentage < 20) return { level: "Moderate", color: "bg-yellow-500" };
    if (percentage < 30) return { level: "Major", color: "bg-orange-500" };
    return { level: "Critical", color: "bg-red-500" };
  };

  const getFluidRequirement = (percentage: number, weight: number = 70) => {
    // Parkland Formula: 4 mL × weight (kg) × burn percentage
    // First 24 hours: Half in first 8 hours, half in next 16 hours
    const totalFluid = 4 * weight * percentage;
    const firstEightHours = totalFluid / 2;
    const nextSixteenHours = totalFluid / 2;
    
    return {
      total: totalFluid,
      firstEightHours,
      nextSixteenHours,
      hourlyRateFirst8: firstEightHours / 8,
      hourlyRateNext16: nextSixteenHours / 16
    };
  };

  const saveCalculation = () => {
    if (totalBurnArea === 0) return;
    
    const calculation = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      patientAge,
      bodyParts: { ...bodyParts },
      totalBurnArea,
      burnDepth,
      severity: getBurnSeverity(totalBurnArea),
      fluidRequirement: getFluidRequirement(totalBurnArea)
    };

    setCalculationHistory(prev => [calculation, ...prev.slice(0, 4)]);
  };

  const clearCalculation = () => {
    setBodyParts({
      head: 0,
      chest: 0,
      abdomen: 0,
      back: 0,
      rightArm: 0,
      leftArm: 0,
      rightLeg: 0,
      leftLeg: 0,
      genitals: 0
    });
    setBurnDepth("second");
  };

  const quickPresets = [
    { name: "Head & Neck", parts: { head: ruleOfNines[patientAge as keyof typeof ruleOfNines].head } },
    { name: "Torso", parts: { chest: ruleOfNines[patientAge as keyof typeof ruleOfNines].chest, abdomen: ruleOfNines[patientAge as keyof typeof ruleOfNines].abdomen } },
    { name: "Both Arms", parts: { rightArm: ruleOfNines[patientAge as keyof typeof ruleOfNines].rightArm, leftArm: ruleOfNines[patientAge as keyof typeof ruleOfNines].leftArm } },
    { name: "Both Legs", parts: { rightLeg: ruleOfNines[patientAge as keyof typeof ruleOfNines].rightLeg, leftLeg: ruleOfNines[patientAge as keyof typeof ruleOfNines].leftLeg } }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0" aria-describedby="burn-surface-description">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Burn Surface Area Calculator
          </DialogTitle>
          <div id="burn-surface-description" className="text-sm text-muted-foreground">
            Calculate burn surface area using the Rule of Nines method
          </div>
        </DialogHeader>

        <div className="p-6 pt-0 space-y-6">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Patient Age Group</Label>
                  <Select value={patientAge} onValueChange={setPatientAge}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adult">Adult (&gt;14 years)</SelectItem>
                      <SelectItem value="child">Child (5-14 years)</SelectItem>
                      <SelectItem value="infant">Infant (&lt;5 years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="burnDepth">Burn Depth</Label>
                  <Select value={burnDepth} onValueChange={setBurnDepth}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first">First Degree (Superficial)</SelectItem>
                      <SelectItem value="second">Second Degree (Partial Thickness)</SelectItem>
                      <SelectItem value="third">Third Degree (Full Thickness)</SelectItem>
                      <SelectItem value="fourth">Fourth Degree (Deep)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Body Parts Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Body Surface Area Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {Object.entries(bodyPartLabels).map(([part, label]) => (
                  <div key={part}>
                    <Label htmlFor={part}>
                      {label} (Max: {ruleOfNines[patientAge as keyof typeof ruleOfNines][part as keyof typeof ruleOfNines.adult]}%)
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id={part}
                        type="number"
                        min="0"
                        max={ruleOfNines[patientAge as keyof typeof ruleOfNines][part as keyof typeof ruleOfNines.adult]}
                        value={bodyParts[part as keyof typeof bodyParts] || ""}
                        onChange={(e) => updateBodyPart(part, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateBodyPart(part, ruleOfNines[patientAge as keyof typeof ruleOfNines][part as keyof typeof ruleOfNines.adult].toString())}
                      >
                        Max
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => setBodyParts(prev => ({ ...prev, ...preset.parts }))}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {totalBurnArea > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-4 w-4" />
                  Assessment Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-primary mb-2">
                        {totalBurnArea.toFixed(1)}%
                      </div>
                      <div className="text-lg text-muted-foreground">
                        Total Body Surface Area
                      </div>
                      <Badge className={`${getBurnSeverity(totalBurnArea).color} text-white mt-2`}>
                        {getBurnSeverity(totalBurnArea).level} Burn
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Burn Depth:</span>
                        <span className="capitalize">{burnDepth} Degree</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Patient Age:</span>
                        <span className="capitalize">{patientAge}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Fluid Resuscitation (70kg adult)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total 24h fluid:</span>
                        <span className="font-medium">{getFluidRequirement(totalBurnArea).total.toFixed(0)} mL</span>
                      </div>
                      <div className="flex justify-between">
                        <span>First 8 hours:</span>
                        <span className="font-medium">{getFluidRequirement(totalBurnArea).firstEightHours.toFixed(0)} mL</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next 16 hours:</span>
                        <span className="font-medium">{getFluidRequirement(totalBurnArea).nextSixteenHours.toFixed(0)} mL</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rate (first 8h):</span>
                        <span className="font-medium">{getFluidRequirement(totalBurnArea).hourlyRateFirst8.toFixed(0)} mL/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rate (next 16h):</span>
                        <span className="font-medium">{getFluidRequirement(totalBurnArea).hourlyRateNext16.toFixed(0)} mL/hr</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-red-800">Emergency Actions Required:</div>
                      <ul className="text-sm text-red-700 mt-1 space-y-1">
                        {totalBurnArea >= 20 && <li>• Immediate IV access and fluid resuscitation</li>}
                        {totalBurnArea >= 10 && <li>• Pain management and wound care</li>}
                        {totalBurnArea >= 15 && <li>• Consider transfer to burn center</li>}
                        {totalBurnArea >= 30 && <li>• Intensive care monitoring required</li>}
                        <li>• Monitor for airway compromise if head/neck involvement</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={saveCalculation} disabled={totalBurnArea === 0}>
              Save Assessment
            </Button>
            <Button onClick={clearCalculation} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>

          {/* Reference Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Rule of Nines Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Adult (&gt;14 years)</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Head & Neck:</span>
                      <span>9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Each Arm:</span>
                      <span>9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Chest:</span>
                      <span>9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Abdomen:</span>
                      <span>9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Back:</span>
                      <span>18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Each Leg:</span>
                      <span>18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Genitals:</span>
                      <span>1%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Child (5-14 years)</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Head & Neck:</span>
                      <span>18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Each Arm:</span>
                      <span>9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Chest:</span>
                      <span>9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Abdomen:</span>
                      <span>9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Back:</span>
                      <span>18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Each Leg:</span>
                      <span>14%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Genitals:</span>
                      <span>1%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Treatment Guidelines</h4>
                  <div className="space-y-1">
                    <div className="text-green-600">Minor: &lt;10% BSA</div>
                    <div className="text-yellow-600">Moderate: 10-19% BSA</div>
                    <div className="text-orange-600">Major: 20-29% BSA</div>
                    <div className="text-red-600">Critical: ≥30% BSA</div>
                  </div>
                  <div className="mt-3">
                    <div className="font-medium">Parkland Formula:</div>
                    <div>4 mL × Weight (kg) × % BSA</div>
                    <div className="text-muted-foreground">
                      Half in first 8 hours, half in next 16 hours
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
                <CardTitle>Assessment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {calculationHistory.map((calc) => (
                    <div key={calc.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">
                          {calc.totalBurnArea.toFixed(1)}% BSA - {calc.patientAge}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {calc.timestamp}
                        </div>
                      </div>
                      <Badge className={`${calc.severity.color} text-white`}>
                        {calc.severity.level}
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