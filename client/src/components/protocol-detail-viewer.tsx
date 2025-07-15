import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Clock, 
  User, 
  AlertTriangle,
  CheckCircle,
  Info,
  Download,
  Printer,
  Star,
  Heart,
  Activity,
  Stethoscope,
  Shield
} from "lucide-react";

interface ProtocolDetailViewerProps {
  protocolId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProtocolDetailViewer({ protocolId, open, onOpenChange }: ProtocolDetailViewerProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: protocol, isLoading, error } = useQuery({
    queryKey: ["/api/protocols", protocolId],
    queryFn: async () => {
      if (!protocolId) return null;
      const response = await fetch(`/api/protocols/${protocolId}`);
      if (!response.ok) throw new Error("Protocol not found");
      return response.json();
    },
    enabled: !!protocolId && open,
  });

  if (!protocolId || !open) return null;

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !protocol) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Protocol Not Found</h3>
            <p className="text-muted-foreground">
              Unable to load protocol details. Please try again or contact support.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case "cardiac": return Heart;
      case "respiratory": return Activity;
      case "trauma": return AlertTriangle;
      case "pediatric": return User;
      case "operations": return Shield;
      default: return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case "cardiac": return "bg-red-500";
      case "respiratory": return "bg-blue-500";
      case "trauma": return "bg-orange-500";
      case "pediatric": return "bg-green-500";
      case "operations": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const CategoryIcon = getCategoryIcon(protocol.category);

  // Mock detailed protocol content - in production, this would come from the database
  const protocolDetails = {
    overview: protocol.description || "This protocol provides comprehensive guidelines for emergency medical treatment.",
    indications: protocol.indications || [
      "Primary indication for this protocol",
      "Secondary indication when applicable",
      "Special circumstances requiring this protocol"
    ],
    contraindications: protocol.contraindications || [
      "Absolute contraindications",
      "Relative contraindications",
      "Special considerations"
    ],
    procedure: protocol.procedure || [
      "1. Initial assessment and scene safety",
      "2. Primary survey (ABCDE)",
      "3. Obtain baseline vital signs",
      "4. Establish IV access if indicated",
      "5. Administer medications per protocol",
      "6. Continuous monitoring and reassessment",
      "7. Prepare for transport",
      "8. Ongoing care during transport"
    ],
    medications: protocol.medications || [
      {
        name: "Epinephrine",
        dose: "1 mg IV/IO (1:10,000)",
        route: "IV/IO",
        indication: "Cardiac arrest",
        contraindications: "None in cardiac arrest"
      },
      {
        name: "Atropine",
        dose: "0.5 mg IV/IO",
        route: "IV/IO",
        indication: "Bradycardia",
        contraindications: "Tachycardia"
      }
    ],
    equipment: protocol.equipment || [
      "Cardiac monitor/defibrillator",
      "IV supplies",
      "Oxygen delivery system",
      "Airway management equipment",
      "Medications per protocol"
    ],
    specialConsiderations: protocol.specialConsiderations || [
      "Pediatric considerations: Weight-based dosing",
      "Geriatric considerations: Comorbidities",
      "Pregnancy considerations: Positioning",
      "Environmental considerations: Weather/terrain"
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0" aria-describedby="protocol-detail-description">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CategoryIcon className={`h-6 w-6 ${protocol.category === 'cardiac' ? 'text-red-500' : 
                protocol.category === 'respiratory' ? 'text-blue-500' : 
                protocol.category === 'trauma' ? 'text-orange-500' : 
                protocol.category === 'pediatric' ? 'text-green-500' : 
                'text-purple-500'}`} />
              <div>
                <DialogTitle className="text-xl">{protocol.name}</DialogTitle>
                <div id="protocol-detail-description" className="text-sm text-muted-foreground mt-1">
                  {protocol.state} • {protocol.category} • {protocol.scope}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${getCategoryColor(protocol.category)} text-white`}>
                {protocol.category?.toUpperCase()}
              </Badge>
              <Badge variant="outline">
                {protocol.ageGroup || "Adult/Pediatric"}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 pt-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="procedure">Procedure</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="considerations">Special</TabsTrigger>
              <TabsTrigger value="references">References</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[60vh] mt-4">
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Protocol Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{protocolDetails.overview}</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Indications
                        </h4>
                        <ul className="text-sm space-y-1">
                          {protocolDetails.indications.map((indication, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-green-500">•</span>
                              <span>{indication}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          Contraindications
                        </h4>
                        <ul className="text-sm space-y-1">
                          {protocolDetails.contraindications.map((contraindication, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-red-500">•</span>
                              <span>{contraindication}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="procedure" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4" />
                      Step-by-Step Procedure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {protocolDetails.procedure.map((step, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Medications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {protocolDetails.medications.map((med, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{med.name}</h4>
                            <Badge variant="outline">{med.route}</Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="font-medium">Dose:</span> {med.dose}
                            </div>
                            <div>
                              <span className="font-medium">Indication:</span> {med.indication}
                            </div>
                            <div className="md:col-span-2">
                              <span className="font-medium">Contraindications:</span> {med.contraindications}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="equipment" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Required Equipment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {protocolDetails.equipment.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="considerations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Special Considerations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {protocolDetails.specialConsiderations.map((consideration, index) => (
                        <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm">{consideration}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="references" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Protocol Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Last Updated:</span> {protocol.updatedAt ? new Date(protocol.updatedAt).toLocaleDateString() : "Not available"}
                      </div>
                      <div>
                        <span className="font-medium">Version:</span> {protocol.version || "1.0"}
                      </div>
                      <div>
                        <span className="font-medium">State:</span> {protocol.state}
                      </div>
                      <div>
                        <span className="font-medium">Scope:</span> {protocol.scope}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button size="sm" variant="outline">
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                      </Button>
                      <Button size="sm" variant="outline">
                        <Star className="h-4 w-4 mr-2" />
                        Bookmark
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}