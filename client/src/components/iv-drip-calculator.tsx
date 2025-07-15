import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Droplets, Calculator, Clock, AlertCircle, RotateCcw } from "lucide-react";

interface IVDripCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function IVDripCalculator({ open, onOpenChange }: IVDripCalculatorProps) {
  const [volumeToInfuse, setVolumeToInfuse] = useState("");
  const [infusionTime, setInfusionTime] = useState("");
  const [timeUnit, setTimeUnit] = useState("hours");
  const [dropFactor, setDropFactor] = useState("15");
  const [results, setResults] = useState({
    flowRate: 0,
    dropsPerMinute: 0,
    totalTime: 0,
    infusionRate: 0
  });
  const [calculationHistory, setCalculationHistory] = useState<any[]>([]);

  const dropFactors = [
    { value: "10", label: "10 gtt/mL (Standard)" },
    { value: "15", label: "15 gtt/mL (Standard)" },
    { value: "20", label: "20 gtt/mL (Standard)" },
    { value: "60", label: "60 gtt/mL (Micro-drip)" }
  ];

  const calculateDripRate = () => {
    const volume = parseFloat(volumeToInfuse);
    const time = parseFloat(infusionTime);
    const factor = parseFloat(dropFactor);

    if (!volume || !time || volume <= 0 || time <= 0) {
      alert("Please enter valid positive numbers for volume and time");
      return;
    }

    // Convert time to minutes
    const timeInMinutes = timeUnit === "hours" ? time * 60 : time;
    const timeInHours = timeUnit === "hours" ? time : time / 60;

    // Calculate flow rate (mL/min)
    const flowRate = volume / timeInMinutes;

    // Calculate drops per minute
    const dropsPerMinute = Math.round((volume * factor) / timeInMinutes);

    // Calculate infusion rate (mL/hr)
    const infusionRate = Math.round(volume / timeInHours);

    const newResults = {
      flowRate: Math.round(flowRate * 100) / 100,
      dropsPerMinute,
      totalTime: timeInMinutes,
      infusionRate
    };

    setResults(newResults);

    // Add to history
    const calculation = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      volume,
      time,
      timeUnit,
      dropFactor: factor,
      results: newResults
    };

    setCalculationHistory(prev => [calculation, ...prev.slice(0, 4)]);
  };

  const clearCalculation = () => {
    setVolumeToInfuse("");
    setInfusionTime("");
    setTimeUnit("hours");
    setDropFactor("15");
    setResults({
      flowRate: 0,
      dropsPerMinute: 0,
      totalTime: 0,
      infusionRate: 0
    });
  };

  const getDripRateCategory = (dropsPerMinute: number) => {
    if (dropsPerMinute < 10) return { label: "Very Slow", color: "bg-blue-500" };
    if (dropsPerMinute < 30) return { label: "Slow", color: "bg-green-500" };
    if (dropsPerMinute < 60) return { label: "Moderate", color: "bg-yellow-500" };
    if (dropsPerMinute < 100) return { label: "Fast", color: "bg-orange-500" };
    return { label: "Very Fast", color: "bg-red-500" };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0" aria-describedby="iv-drip-calculator-description">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            IV Drip Rate Calculator
          </DialogTitle>
          <div id="iv-drip-calculator-description" className="text-sm text-muted-foreground">
            Calculate intravenous fluid drip rates and infusion parameters
          </div>
        </DialogHeader>

        <div className="p-6 pt-0 space-y-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Calculation Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="volume">Volume to Infuse (mL)</Label>
                  <Input
                    id="volume"
                    type="number"
                    placeholder="e.g., 1000"
                    value={volumeToInfuse}
                    onChange={(e) => setVolumeToInfuse(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="time">Infusion Time</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="time"
                      type="number"
                      placeholder="e.g., 8"
                      value={infusionTime}
                      onChange={(e) => setInfusionTime(e.target.value)}
                      className="flex-1"
                    />
                    <Select value={timeUnit} onValueChange={setTimeUnit}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="minutes">Minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="dropFactor">Drop Factor</Label>
                  <Select value={dropFactor} onValueChange={setDropFactor}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dropFactors.map((factor) => (
                        <SelectItem key={factor.value} value={factor.value}>
                          {factor.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateDripRate} className="flex-1">
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

          {/* Results Section */}
          {results.dropsPerMinute > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Calculation Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {results.dropsPerMinute}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Drops per minute
                    </div>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {results.flowRate}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      mL per minute
                    </div>
                  </div>

                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {results.infusionRate}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      mL per hour
                    </div>
                  </div>

                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {Math.round(results.totalTime)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total minutes
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mb-4">
                  <Badge className={`${getDripRateCategory(results.dropsPerMinute).color} text-white`}>
                    {getDripRateCategory(results.dropsPerMinute).label} Drip Rate
                  </Badge>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-yellow-800">Clinical Notes:</div>
                      <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                        <li>• Monitor patient regularly during infusion</li>
                        <li>• Adjust rate if patient shows signs of fluid overload</li>
                        <li>• Verify drop factor with IV tubing packaging</li>
                        <li>• Consider patient condition and fluid tolerance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Reference */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Quick Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Common Drop Factors</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Standard IV tubing:</span>
                      <span>10-20 gtt/mL</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Micro-drip tubing:</span>
                      <span>60 gtt/mL</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Blood tubing:</span>
                      <span>10-15 gtt/mL</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Typical Infusion Rates</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Maintenance fluid:</span>
                      <span>75-125 mL/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fluid resuscitation:</span>
                      <span>250-500 mL/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Blood transfusion:</span>
                      <span>100-200 mL/hr</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calculation History */}
          {calculationHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Calculations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {calculationHistory.map((calc) => (
                    <div key={calc.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="text-sm">
                        <div className="font-medium">
                          {calc.volume} mL over {calc.time} {calc.timeUnit}
                        </div>
                        <div className="text-muted-foreground">
                          {calc.timestamp}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">
                          {calc.results.dropsPerMinute} gtt/min
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {calc.results.infusionRate} mL/hr
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