import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ApgarCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ApgarCalculator({ open, onOpenChange }: ApgarCalculatorProps) {
  const [scores, setScores] = useState({
    appearance: 0,
    pulse: 0,
    grimace: 0,
    activity: 0,
    respiratory: 0,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  const getInterpretation = (score: number) => {
    if (score >= 8) return { text: "Normal", color: "text-green-600" };
    if (score >= 4) return { text: "Moderately Abnormal", color: "text-yellow-600" };
    return { text: "Severely Abnormal", color: "text-red-600" };
  };

  const interpretation = getInterpretation(totalScore);

  const saveMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('POST', '/api/calculator-results', {
        calculatorType: 'apgar',
        inputs: scores,
        result: { score: totalScore, interpretation: interpretation.text },
        userId: 1
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "APGAR score saved successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/calculator-results'] });
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save APGAR score",
        variant: "destructive",
      });
    },
  });

  const apgarCriteria = [
    {
      name: "appearance",
      label: "Appearance",
      options: [
        { value: 0, label: "Blue/Pale" },
        { value: 1, label: "Extremities Blue" },
        { value: 2, label: "Pink" },
      ],
    },
    {
      name: "pulse",
      label: "Pulse",
      options: [
        { value: 0, label: "Absent" },
        { value: 1, label: "<100 bpm" },
        { value: 2, label: ">100 bpm" },
      ],
    },
    {
      name: "grimace",
      label: "Grimace",
      options: [
        { value: 0, label: "No Response" },
        { value: 1, label: "Grimace" },
        { value: 2, label: "Cry/Cough" },
      ],
    },
    {
      name: "activity",
      label: "Activity",
      options: [
        { value: 0, label: "Limp" },
        { value: 1, label: "Some Flexion" },
        { value: 2, label: "Active Motion" },
      ],
    },
    {
      name: "respiratory",
      label: "Respiratory",
      options: [
        { value: 0, label: "Absent" },
        { value: 1, label: "Weak Cry" },
        { value: 2, label: "Strong Cry" },
      ],
    },
  ];

  const handleScoreChange = (criterion: string, value: number) => {
    setScores(prev => ({ ...prev, [criterion]: value }));
  };

  const resetScores = () => {
    setScores({
      appearance: 0,
      pulse: 0,
      grimace: 0,
      activity: 0,
      respiratory: 0,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" aria-describedby="apgar-calculator-description">
        <DialogHeader>
          <DialogTitle>APGAR Score Calculator</DialogTitle>
          <div id="apgar-calculator-description" className="text-sm text-muted-foreground">
            Assess newborn health status using the APGAR scoring system
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {apgarCriteria.map((criterion) => (
            <div key={criterion.name}>
              <Label className="text-sm font-medium mb-2 block">
                {criterion.label} (0-2)
              </Label>
              <div className="flex space-x-2">
                {criterion.options.map((option) => (
                  <Button
                    key={option.value}
                    variant={scores[criterion.name as keyof typeof scores] === option.value ? "default" : "outline"}
                    className="flex-1 text-xs p-2 h-auto"
                    onClick={() => handleScoreChange(criterion.name, option.value)}
                  >
                    <div className="text-center">
                      <div className="font-medium">{option.value}</div>
                      <div className="text-xs">{option.label}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}

          {/* Result */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                Score: {totalScore}/10
              </div>
              <div className={`text-sm font-medium ${interpretation.color}`}>
                {interpretation.text}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button 
              onClick={() => saveMutation.mutate()} 
              disabled={saveMutation.isPending}
              className="flex-1"
            >
              <Save className="h-4 w-4 mr-2" />
              {saveMutation.isPending ? 'Saving...' : 'Save Result'}
            </Button>
            <Button variant="outline" onClick={resetScores} className="flex-1">
              Reset
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
