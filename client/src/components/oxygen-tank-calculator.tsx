import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Calculator, AlertTriangle, RotateCcw, Gauge } from "lucide-react";

interface OxygenTankCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OxygenTankCalculator({ open, onOpenChange }: OxygenTankCalculatorProps) {
  const [tankSize, setTankSize] = useState("E");
  const [currentPressure, setCurrentPressure] = useState("");
  const [flowRate, setFlowRate] = useState("");
  const [results, setResults] = useState({
    remainingTime: 0,
    remainingVolume: 0,
    consumptionRate: 0,
    timeToEmpty: 0
  });
  const [calculationHistory, setCalculationHistory] = useState<any[]>([]);

  const tankSpecifications = {
    "D": { capacity: 425, servicePressure: 2200, weight: 3.5, portableUse: true },
    "E": { capacity: 680, servicePressure: 2200, weight: 5.5, portableUse: true },
    "M": { capacity: 3000, servicePressure: 2200, weight: 25, portableUse: false },
    "G": { capacity: 5300, servicePressure: 2200, weight: 45, portableUse: false },
    "H": { capacity: 6900, servicePressure: 2200, weight: 55, portableUse: false },
    "K": { capacity: 6900, servicePressure: 2200, weight: 55, portableUse: false }
  };

  const calculateOxygenDuration = () => {
    const pressure = parseFloat(currentPressure);
    const flow = parseFloat(flowRate);
    
    if (!pressure || !flow || pressure <= 0 || flow <= 0) {
      alert("Please enter valid pressure and flow rate values");
      return;
    }

    const tankSpec = tankSpecifications[tankSize as keyof typeof tankSpecifications];
    if (!tankSpec) return;

    // Calculate remaining volume: (Current Pressure / Service Pressure) × Tank Capacity
    const remainingVolume = (pressure / tankSpec.servicePressure) * tankSpec.capacity;
    
    // Calculate remaining time: Remaining Volume / Flow Rate
    const remainingTime = remainingVolume / flow;
    
    // Calculate consumption rate (L/min)
    const consumptionRate = flow;
    
    // Calculate time to empty from current pressure
    const timeToEmpty = remainingTime;

    const newResults = {
      remainingTime: Math.max(0, remainingTime),
      remainingVolume: Math.max(0, remainingVolume),
      consumptionRate,
      timeToEmpty: Math.max(0, timeToEmpty)
    };

    setResults(newResults);

    // Add to history
    const calculation = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      tankSize,
      currentPressure: pressure,
      flowRate: flow,
      results: newResults
    };

    setCalculationHistory(prev => [calculation, ...prev.slice(0, 4)]);
  };

  const clearCalculation = () => {
    setCurrentPressure("");
    setFlowRate("");
    setResults({
      remainingTime: 0,
      remainingVolume: 0,
      consumptionRate: 0,
      timeToEmpty: 0
    });
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${Math.round(minutes)} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = Math.round(minutes % 60);
      return `${hours}h ${mins}m`;
    }
  };

  const getTimeAlert = (minutes: number) => {
    if (minutes < 15) return { level: "Critical", color: "bg-red-500" };
    if (minutes < 30) return { level: "Low", color: "bg-orange-500" };
    if (minutes < 60) return { level: "Moderate", color: "bg-yellow-500" };
    return { level: "Good", color: "bg-green-500" };
  };

  const getPressurePercentage = () => {
    if (!currentPressure || !tankSize) return 0;
    const pressure = parseFloat(currentPressure);
    const tankSpec = tankSpecifications[tankSize as keyof typeof tankSpecifications];
    return Math.min(100, (pressure / tankSpec.servicePressure) * 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0" aria-describedby="oxygen-tank-description">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Oxygen Tank Duration Calculator
          </DialogTitle>
          <div id="oxygen-tank-description" className="text-sm text-muted-foreground">
            Calculate remaining oxygen supply time and consumption rates
          </div>
        </DialogHeader>

        <div className="p-6 pt-0 space-y-6">
          {/* Input Parameters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Tank Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="tankSize">Tank Size</Label>
                  <Select value={tankSize} onValueChange={setTankSize}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="D">D Tank (425L)</SelectItem>
                      <SelectItem value="E">E Tank (680L)</SelectItem>
                      <SelectItem value="M">M Tank (3000L)</SelectItem>
                      <SelectItem value="G">G Tank (5300L)</SelectItem>
                      <SelectItem value="H">H Tank (6900L)</SelectItem>
                      <SelectItem value="K">K Tank (6900L)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="pressure">Current Pressure (PSI)</Label>
                  <Input
                    id="pressure"
                    type="number"
                    placeholder="e.g., 1500"
                    value={currentPressure}
                    onChange={(e) => setCurrentPressure(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="flowRate">Flow Rate (L/min)</Label>
                  <Input
                    id="flowRate"
                    type="number"
                    step="0.5"
                    placeholder="e.g., 2.0"
                    value={flowRate}
                    onChange={(e) => setFlowRate(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateOxygenDuration} className="flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Duration
                </Button>
                <Button onClick={clearCalculation} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tank Status */}
          {currentPressure && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  Tank Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Tank Pressure</span>
                    <span className="text-lg font-bold">
                      {currentPressure} / {tankSpecifications[tankSize as keyof typeof tankSpecifications].servicePressure} PSI
                    </span>
                  </div>
                  <Progress value={getPressurePercentage()} className="w-full" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Empty</span>
                    <span>{getPressurePercentage().toFixed(1)}% Full</span>
                    <span>Full</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {results.remainingTime > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Duration Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatTime(results.remainingTime)}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Remaining Time
                    </div>
                    <Badge className={`${getTimeAlert(results.remainingTime).color} text-white`}>
                      {getTimeAlert(results.remainingTime).level}
                    </Badge>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(results.remainingVolume)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Remaining Volume (L)
                    </div>
                  </div>

                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {results.consumptionRate}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Flow Rate (L/min)
                    </div>
                  </div>

                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {tankSpecifications[tankSize as keyof typeof tankSpecifications].weight}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tank Weight (lbs)
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-yellow-800">Usage Recommendations:</div>
                      <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                        {results.remainingTime < 30 && <li>• Replace or refill tank soon</li>}
                        {results.remainingTime < 15 && <li>• Critical - immediate replacement needed</li>}
                        <li>• Monitor patient response and adjust flow rate as needed</li>
                        <li>• Keep backup oxygen supply available</li>
                        <li>• Document oxygen administration and consumption</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tank Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Tank Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Tank Size</th>
                      <th className="text-left p-2">Capacity (L)</th>
                      <th className="text-left p-2">Service Pressure (PSI)</th>
                      <th className="text-left p-2">Weight (lbs)</th>
                      <th className="text-left p-2">Portable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(tankSpecifications).map(([size, spec]) => (
                      <tr key={size} className={`border-b ${tankSize === size ? 'bg-blue-50' : ''}`}>
                        <td className="p-2 font-medium">{size}</td>
                        <td className="p-2">{spec.capacity}</td>
                        <td className="p-2">{spec.servicePressure}</td>
                        <td className="p-2">{spec.weight}</td>
                        <td className="p-2">
                          <Badge variant={spec.portableUse ? "default" : "secondary"}>
                            {spec.portableUse ? "Yes" : "No"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Reference */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Common Flow Rates</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Nasal cannula:</span>
                      <span>1-6 L/min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Simple mask:</span>
                      <span>6-10 L/min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Non-rebreather:</span>
                      <span>10-15 L/min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bag-valve mask:</span>
                      <span>15 L/min</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Duration Formula</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Duration (min) = </strong>
                      <div className="ml-4">
                        (Current Pressure ÷ Service Pressure) ×<br />
                        Tank Capacity ÷ Flow Rate
                      </div>
                    </div>
                    <div className="text-muted-foreground mt-3">
                      Always maintain safety factor and have backup oxygen available
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
                          {calc.tankSize} Tank - {calc.currentPressure} PSI - {calc.flowRate} L/min
                        </div>
                        <div className="text-muted-foreground">
                          {calc.timestamp}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">
                          {formatTime(calc.results.remainingTime)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {Math.round(calc.results.remainingVolume)}L remaining
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