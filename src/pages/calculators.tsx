import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Baby, Weight, Droplets, Brain, Heart, Flame, Clock, Activity, Zap, Stethoscope, AlertTriangle } from "lucide-react";
import ApgarCalculator from "@/components/apgar-calculator";
import PediatricDoseCalculator from "@/components/pediatric-dose-calculator";
import IVDripCalculator from "@/components/iv-drip-calculator";
import GlasgowComaCalculator from "@/components/glasgow-coma-calculator";
import CardiacOutputCalculator from "@/components/cardiac-output-calculator";
import BurnSurfaceCalculator from "@/components/burn-surface-calculator";
import OxygenTankCalculator from "@/components/oxygen-tank-calculator";
import BMICalculator from "@/components/bmi-calculator";
import AnionGapCalculator from "@/components/anion-gap-calculator";
import MapCalculator from "@/components/map-calculator";
import MinuteVentilationCalculator from "@/components/minute-ventilation-calculator";
import ParklandFormulaCalculator from "@/components/parkland-formula-calculator";
import PediatricWeightEstimator from "@/components/pediatric-weight-estimator";
import ShockIndexCalculator from "@/components/shock-index-calculator";
import StrokeScaleCalculator from "@/components/stroke-scale-calculator";

export default function Calculators() {
  const [showApgar, setShowApgar] = useState(false);
  const [showPediatricDose, setShowPediatricDose] = useState(false);
  const [showIVDrip, setShowIVDrip] = useState(false);
  const [showGlasgowComa, setShowGlasgowComa] = useState(false);
  const [showCardiacOutput, setShowCardiacOutput] = useState(false);
  const [showBurnSurface, setShowBurnSurface] = useState(false);
  const [showOxygenTank, setShowOxygenTank] = useState(false);
  const [showBMI, setShowBMI] = useState(false);
  const [showAnionGap, setShowAnionGap] = useState(false);
  const [showMAP, setShowMAP] = useState(false);
  const [showMinuteVentilation, setShowMinuteVentilation] = useState(false);
  const [showParklandFormula, setShowParklandFormula] = useState(false);
  const [showPediatricWeight, setShowPediatricWeight] = useState(false);
  const [showShockIndex, setShowShockIndex] = useState(false);
  const [showStrokeScale, setShowStrokeScale] = useState(false);

  const calculators = [
    {
      name: "APGAR Score",
      description: "Newborn assessment tool",
      icon: Baby,
      color: "bg-blue-500",
      onClick: () => setShowApgar(true),
    },
    {
      name: "Pediatric Dose",
      description: "Weight-based medication dosing",
      icon: Weight,
      color: "bg-orange-500",
      onClick: () => setShowPediatricDose(true),
    },
    {
      name: "IV Drip Rate",
      description: "Intravenous fluid calculations",
      icon: Droplets,
      color: "bg-green-500",
      onClick: () => setShowIVDrip(true),
    },
    {
      name: "Glasgow Coma Scale",
      description: "Neurological assessment",
      icon: Brain,
      color: "bg-red-500",
      onClick: () => setShowGlasgowComa(true),
    },
    {
      name: "Cardiac Output",
      description: "Heart function calculations",
      icon: Heart,
      color: "bg-purple-500",
      onClick: () => setShowCardiacOutput(true),
    },
    {
      name: "Burn Surface Area",
      description: "Rule of nines calculation",
      icon: Flame,
      color: "bg-yellow-500",
      onClick: () => setShowBurnSurface(true),
    },
    {
      name: "Oxygen Tank Duration",
      description: "O2 supply time remaining",
      icon: Clock,
      color: "bg-indigo-500",
      onClick: () => setShowOxygenTank(true),
    },
    {
      name: "Body Mass Index",
      description: "BMI calculation and classification",
      icon: Calculator,
      color: "bg-pink-500",
      onClick: () => setShowBMI(true),
    },
    {
      name: "Anion Gap",
      description: "Electrolyte balance assessment",
      icon: Droplets,
      color: "bg-teal-500",
      onClick: () => setShowAnionGap(true),
    },
    {
      name: "Mean Arterial Pressure",
      description: "MAP calculation and assessment",
      icon: Activity,
      color: "bg-cyan-500",
      onClick: () => setShowMAP(true),
    },
    {
      name: "Minute Ventilation",
      description: "Respiratory volume calculations",
      icon: Activity,
      color: "bg-emerald-500",
      onClick: () => setShowMinuteVentilation(true),
    },
    {
      name: "Parkland Formula",
      description: "Burn fluid resuscitation",
      icon: Flame,
      color: "bg-amber-500",
      onClick: () => setShowParklandFormula(true),
    },
    {
      name: "Pediatric Weight Estimator",
      description: "Age-based weight estimation",
      icon: Baby,
      color: "bg-sky-500",
      onClick: () => setShowPediatricWeight(true),
    },
    {
      name: "Shock Index",
      description: "Hemodynamic assessment",
      icon: Zap,
      color: "bg-rose-500",
      onClick: () => setShowShockIndex(true),
    },
    {
      name: "Stroke Scale",
      description: "Neurological stroke assessment",
      icon: Brain,
      color: "bg-violet-500",
      onClick: () => setShowStrokeScale(true),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Medical Calculators</h1>
        <p className="text-muted-foreground">
          Essential EMS calculators for field use and clinical decision making
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {calculators.map((calculator) => {
          const Icon = calculator.icon;
          return (
            <Card key={calculator.name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Button
                  onClick={calculator.onClick}
                  className={`w-full ${calculator.color} text-white hover:opacity-90 h-auto p-6 flex flex-col items-center space-y-4`}
                >
                  <Icon className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-semibold text-lg">{calculator.name}</div>
                    <div className="text-sm opacity-90 mt-1">{calculator.description}</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Calculations */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Calculations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Your recent calculations will appear here
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <ApgarCalculator open={showApgar} onOpenChange={setShowApgar} />
      <PediatricDoseCalculator open={showPediatricDose} onOpenChange={setShowPediatricDose} />
      <IVDripCalculator open={showIVDrip} onOpenChange={setShowIVDrip} />
      <GlasgowComaCalculator open={showGlasgowComa} onOpenChange={setShowGlasgowComa} />
      <CardiacOutputCalculator open={showCardiacOutput} onOpenChange={setShowCardiacOutput} />
      <BurnSurfaceCalculator open={showBurnSurface} onOpenChange={setShowBurnSurface} />
      <OxygenTankCalculator open={showOxygenTank} onOpenChange={setShowOxygenTank} />
      <BMICalculator open={showBMI} onOpenChange={setShowBMI} />
      <AnionGapCalculator open={showAnionGap} onOpenChange={setShowAnionGap} />
      <MapCalculator open={showMAP} onOpenChange={setShowMAP} />
      <MinuteVentilationCalculator open={showMinuteVentilation} onOpenChange={setShowMinuteVentilation} />
      <ParklandFormulaCalculator open={showParklandFormula} onOpenChange={setShowParklandFormula} />
      <PediatricWeightEstimator open={showPediatricWeight} onOpenChange={setShowPediatricWeight} />
      <ShockIndexCalculator open={showShockIndex} onOpenChange={setShowShockIndex} />
      <StrokeScaleCalculator open={showStrokeScale} onOpenChange={setShowStrokeScale} />
    </div>
  );
}
