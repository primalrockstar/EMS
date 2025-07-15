import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Eye, Download, Edit, WifiOff, ArrowLeft } from "lucide-react";
import ProtocolUpload from "@/components/protocol-upload";

// Helper functions for protocol-specific content
const getProtocolSpecificIndications = (protocol: any) => {
  if (!protocol) return null;
  
  const protocolName = protocol.name?.toLowerCase() || '';
  
  if (protocolName.includes('dnr') || protocolName.includes('do not resuscitate')) {
    return [
      'Valid DNR/POLST order present',
      'Patient or legal guardian request',
      'Terminal condition with poor prognosis',
      'Irreversible condition with no benefit from resuscitation'
    ];
  }
  
  if (protocolName.includes('cardiac arrest')) {
    return [
      'Unresponsive patient with no pulse',
      'No breathing or agonal respirations',
      'Witnessed or unwitnessed cardiac arrest',
      'Return of spontaneous circulation (ROSC)'
    ];
  }
  
  if (protocolName.includes('chest pain') || protocolName.includes('acs')) {
    return [
      'Chest pain or discomfort',
      'Signs and symptoms of acute coronary syndrome',
      'History of cardiac disease with new symptoms',
      'Referred pain to arms, jaw, or back'
    ];
  }
  
  if (protocolName.includes('respiratory distress')) {
    return [
      'Difficulty breathing or shortness of breath',
      'Abnormal respiratory rate or effort',
      'Cyanosis or decreased oxygen saturation',
      'Use of accessory muscles for breathing'
    ];
  }
  
  if (protocolName.includes('stroke') || protocolName.includes('cva')) {
    return [
      'Sudden onset of neurological symptoms',
      'Altered mental status or confusion',
      'Facial drooping or weakness',
      'Speech difficulties or slurred speech'
    ];
  }
  
  if (protocolName.includes('trauma')) {
    return [
      'Mechanism of injury suggests trauma',
      'Visible injuries or deformities',
      'Signs of internal bleeding',
      'Altered mental status from injury'
    ];
  }
  
  if (protocolName.includes('seizure')) {
    return [
      'Witnessed seizure activity',
      'Postictal state following seizure',
      'Status epilepticus (continuous seizure)',
      'First-time seizure with unknown cause'
    ];
  }
  
  if (protocolName.includes('allergic') || protocolName.includes('anaphylaxis')) {
    return [
      'Known allergen exposure',
      'Skin reactions (hives, swelling)',
      'Respiratory distress from allergic reaction',
      'Systemic allergic reaction symptoms'
    ];
  }
  
  if (protocolName.includes('overdose') || protocolName.includes('poisoning')) {
    return [
      'Suspected drug overdose',
      'Poisoning from ingestion',
      'Altered mental status from substances',
      'Witnessed substance abuse'
    ];
  }
  
  if (protocolName.includes('pediatric')) {
    return [
      'Patient under 18 years of age',
      'Pediatric-specific medical emergency',
      'Age-appropriate assessment findings',
      'Parental or guardian consent considerations'
    ];
  }
  
  return [
    'Clinical presentation consistent with protocol',
    'Patient meets protocol criteria',
    'Medical emergency requiring intervention',
    'Appropriate for EMS response level'
  ];
};

const getProtocolSpecificContraindications = (protocol: any) => {
  if (!protocol) return null;
  
  const protocolName = protocol.name?.toLowerCase() || '';
  
  if (protocolName.includes('dnr') || protocolName.includes('do not resuscitate')) {
    return [
      'No valid DNR/POLST documentation',
      'Questionable validity of DNR order',
      'Family objection to DNR status',
      'Reversible cause of arrest identified'
    ];
  }
  
  if (protocolName.includes('cardiac arrest')) {
    return [
      'Valid DNR/POLST order in place',
      'Signs of prolonged down time',
      'Obvious signs of death',
      'Unsafe scene conditions'
    ];
  }
  
  if (protocolName.includes('chest pain') || protocolName.includes('acs')) {
    return [
      'Allergy to aspirin or nitroglycerin',
      'Hypotension or shock',
      'Recent use of erectile dysfunction medications',
      'Severe bleeding or trauma'
    ];
  }
  
  if (protocolName.includes('respiratory distress')) {
    return [
      'Upper airway obstruction',
      'Tension pneumothorax',
      'Severe hypotension',
      'Allergy to bronchodilators'
    ];
  }
  
  return [
    'Patient refusal of treatment',
    'Contraindications to specific medications',
    'Unsafe scene conditions',
    'Outside scope of practice'
  ];
};

const getProtocolSpecificMedications = (protocol: any) => {
  if (!protocol) return null;
  
  const protocolName = protocol.name?.toLowerCase() || '';
  
  if (protocolName.includes('dnr') || protocolName.includes('do not resuscitate')) {
    return null; // No medications for DNR protocol
  }
  
  if (protocolName.includes('cardiac arrest')) {
    return [
      'Epinephrine 1:10,000 (1mg IV/IO)',
      'Amiodarone 300mg IV/IO',
      'Atropine 1mg IV/IO',
      'Sodium Bicarbonate 1mEq/kg IV/IO'
    ];
  }
  
  if (protocolName.includes('chest pain') || protocolName.includes('acs')) {
    return [
      'Aspirin 324mg PO (chewed)',
      'Nitroglycerin 0.4mg SL',
      'Morphine 2-4mg IV',
      'Oxygen as needed'
    ];
  }
  
  if (protocolName.includes('respiratory distress')) {
    return [
      'Albuterol 2.5mg via nebulizer',
      'Ipratropium 0.5mg via nebulizer',
      'Epinephrine 1:1000 (0.3mg IM)',
      'Methylprednisolone 125mg IV'
    ];
  }
  
  if (protocolName.includes('stroke') || protocolName.includes('cva')) {
    return [
      'Dextrose 50% (25g IV) if hypoglycemic',
      'Thiamine 100mg IV',
      'Oxygen as needed',
      'Normal saline for IV access'
    ];
  }
  
  if (protocolName.includes('seizure')) {
    return [
      'Lorazepam 2-4mg IV/IO',
      'Midazolam 5-10mg IM',
      'Dextrose 50% (25g IV) if hypoglycemic',
      'Thiamine 100mg IV'
    ];
  }
  
  if (protocolName.includes('allergic') || protocolName.includes('anaphylaxis')) {
    return [
      'Epinephrine 1:1000 (0.3mg IM)',
      'Diphenhydramine 25-50mg IV/IM',
      'Methylprednisolone 125mg IV',
      'Albuterol 2.5mg via nebulizer'
    ];
  }
  
  if (protocolName.includes('overdose') || protocolName.includes('poisoning')) {
    return [
      'Naloxone 0.4-2mg IV/IM/IN',
      'Flumazenil 0.2mg IV (if benzodiazepine)',
      'Activated charcoal 1g/kg PO',
      'Normal saline for IV access'
    ];
  }
  
  if (protocolName.includes('trauma')) {
    return [
      'Normal saline or lactated ringers',
      'Morphine 2-4mg IV for pain',
      'Fentanyl 1-2mcg/kg IV',
      'Tranexamic acid 1g IV (if available)'
    ];
  }
  
  return [
    'Normal saline for IV access',
    'Oxygen as clinically indicated',
    'Dextrose 50% if hypoglycemic',
    'Standard supportive medications'
  ];
};

const getProtocolSpecificEquipment = (protocol: any) => {
  if (!protocol) return null;
  
  const protocolName = protocol.name?.toLowerCase() || '';
  
  if (protocolName.includes('dnr') || protocolName.includes('do not resuscitate')) {
    return null; // No special equipment for DNR protocol
  }
  
  if (protocolName.includes('cardiac arrest')) {
    return [
      'Cardiac monitor/defibrillator',
      'Advanced airway equipment',
      'IV/IO access supplies',
      'Mechanical CPR device (if available)',
      'End-tidal CO2 monitor'
    ];
  }
  
  if (protocolName.includes('chest pain') || protocolName.includes('acs')) {
    return [
      '12-lead ECG machine',
      'Cardiac monitor',
      'IV supplies',
      'Oxygen delivery system',
      'Blood pressure cuff'
    ];
  }
  
  if (protocolName.includes('respiratory distress')) {
    return [
      'Pulse oximeter',
      'Nebulizer equipment',
      'Advanced airway kit',
      'Oxygen delivery devices',
      'Bag-valve mask'
    ];
  }
  
  if (protocolName.includes('stroke') || protocolName.includes('cva')) {
    return [
      'Blood glucose meter',
      'Blood pressure cuff',
      'Pulse oximeter',
      'IV supplies',
      'Stroke assessment scale'
    ];
  }
  
  if (protocolName.includes('trauma')) {
    return [
      'Spinal immobilization equipment',
      'Splinting materials',
      'Hemorrhage control supplies',
      'IV/IO access equipment',
      'Trauma dressings'
    ];
  }
  
  if (protocolName.includes('seizure')) {
    return [
      'IV/IO access supplies',
      'Blood glucose meter',
      'Suction equipment',
      'Oxygen delivery system',
      'Protective padding'
    ];
  }
  
  return [
    'Standard EMS assessment equipment',
    'Vital signs monitoring devices',
    'Basic life support equipment',
    'Patient transport equipment'
  ];
};

export default function Protocols() {
  const [showUpload, setShowUpload] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const [selectedProtocol, setSelectedProtocol] = useState<any>(null);
  const [showProtocolDetail, setShowProtocolDetail] = useState(false);

  const { data: protocols, isLoading } = useQuery({
    queryKey: ["/api/protocols", { userId: 1, category: categoryFilter !== "all" ? categoryFilter : undefined, state: stateFilter !== "all" ? stateFilter : undefined }],
    queryFn: async () => {
      const params = new URLSearchParams({
        userId: "1",
        ...(categoryFilter !== "all" && { category: categoryFilter }),
        ...(stateFilter !== "all" && { state: stateFilter }),
      });
      const response = await fetch(`/api/protocols?${params}`);
      return response.json();
    },
  });

  const categoryColors = {
    "Adult Treatment": "bg-red-500",
    "Pediatric Treatment": "bg-green-500",
    "Operations": "bg-gray-500",
    "Procedures": "bg-blue-500",
    cardiac: "bg-red-500",
    respiratory: "bg-blue-500", 
    trauma: "bg-orange-500",
    pediatric: "bg-purple-500",
    neurological: "bg-green-500",
    toxicology: "bg-yellow-500",
  };

  const filteredProtocols = protocols?.filter((protocol: any) =>
    protocol.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Protocol Management
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Manage your uploaded protocols and access standard EMS protocols
          </p>
        </div>
        <Button 
          onClick={() => setShowUpload(true)}
          className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Upload Protocol
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search protocols..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Adult Treatment">Adult Treatment</SelectItem>
                <SelectItem value="Pediatric Treatment">Pediatric Treatment</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
                <SelectItem value="Procedures">Procedures</SelectItem>
                <SelectItem value="cardiac">Cardiac</SelectItem>
                <SelectItem value="respiratory">Respiratory</SelectItem>
                <SelectItem value="trauma">Trauma</SelectItem>
                <SelectItem value="neurological">Neurological</SelectItem>
                <SelectItem value="toxicology">Toxicology</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="Nevada">Nevada</SelectItem>
                <SelectItem value="California">California</SelectItem>
                <SelectItem value="Texas">Texas</SelectItem>
                <SelectItem value="Florida">Florida</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Ohio">Ohio</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Protocol List - Compact Table Format */}
      {isLoading ? (
        <div className="text-center py-8">Loading protocols...</div>
      ) : filteredProtocols?.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              {searchTerm ? "No protocols found matching your search." : "No protocols found. Upload your first protocol to get started."}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Protocol</th>
                    <th className="text-left p-4 font-medium">Category</th>
                    <th className="text-left p-4 font-medium">State</th>
                    <th className="text-left p-4 font-medium">Updated</th>
                    <th className="text-center p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProtocols?.map((protocol: any) => (
                    <tr key={protocol.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <div className="font-medium text-foreground mb-1">{protocol.name}</div>
                          <div className="flex items-center space-x-2 mb-1">
                            {protocol.scope && (
                              <Badge variant="secondary" className="text-xs">
                                {protocol.scope}
                              </Badge>
                            )}
                            {protocol.ageGroup && (
                              <Badge variant="outline" className="text-xs">
                                {protocol.ageGroup.replace('_', ' & ')}
                              </Badge>
                            )}
                            {protocol.isOffline && (
                              <Badge className="bg-green-500 text-white text-xs">
                                <WifiOff className="h-3 w-3 mr-1" />
                                Offline
                              </Badge>
                            )}
                          </div>
                          {protocol.description && (
                            <div className="text-xs text-muted-foreground line-clamp-1">
                              {protocol.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge 
                          className={`${categoryColors[protocol.category as keyof typeof categoryColors] || 'bg-gray-500'} text-white text-xs`}
                        >
                          {protocol.category.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="text-xs">
                          {protocol.state || "Generic"}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(protocol.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              setSelectedProtocol(protocol);
                              setShowProtocolDetail(true);
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              // Create a downloadable link
                              const element = document.createElement('a');
                              const file = new Blob([protocol.content || `${protocol.name}\n\n${protocol.description || 'No content available'}`], {type: 'text/plain'});
                              element.href = URL.createObjectURL(file);
                              element.download = `${protocol.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
                              document.body.appendChild(element);
                              element.click();
                              document.body.removeChild(element);
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedProtocol(protocol);
                              setShowUpload(true);
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <ProtocolUpload open={showUpload} onOpenChange={setShowUpload} />
      
      {/* Protocol Detail Dialog */}
      <Dialog open={showProtocolDetail} onOpenChange={setShowProtocolDetail}>
        <DialogContent className="max-w-6xl max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowProtocolDetail(false)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div>
                  <DialogTitle className="text-xl font-bold">{selectedProtocol?.name}</DialogTitle>
                  <DialogDescription>
                    Comprehensive EMS protocol details and procedures
                  </DialogDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={`${categoryColors[selectedProtocol?.category as keyof typeof categoryColors] || 'bg-gray-500'} text-white`}>
                  {selectedProtocol?.category}
                </Badge>
                <Badge variant="outline">
                  {selectedProtocol?.state || "Generic"}
                </Badge>
                {selectedProtocol?.scope && (
                  <Badge className="bg-blue-500 text-white">
                    {selectedProtocol?.scope}
                  </Badge>
                )}
              </div>
            </div>
          </DialogHeader>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="procedures">Procedure</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="special">Special</TabsTrigger>
              <TabsTrigger value="references">References</TabsTrigger>
            </TabsList>
            
            <ScrollArea className="max-h-[60vh] mt-4">
              <TabsContent value="overview" className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <h3 className="text-lg font-semibold">Protocol Overview</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">What is this protocol?</h4>
                  <div className="bg-muted p-4 rounded-md border-l-4 border-blue-500">
                    <p className="text-sm text-muted-foreground mb-3">
                      {selectedProtocol?.description || "This protocol provides comprehensive guidance for emergency medical services personnel."}
                    </p>
                    <div className="text-sm">
                      <strong>Full Protocol Details:</strong>
                      <div className="mt-2 whitespace-pre-wrap font-mono text-xs bg-background p-3 rounded border max-h-40 overflow-y-auto">
                        {selectedProtocol?.content || "No detailed content available for this protocol."}
                      </div>
                    </div>
                  </div>
                </div>
                
                {getProtocolSpecificIndications(selectedProtocol) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Indications
                      </h4>
                      <ul className="text-sm space-y-1">
                        {getProtocolSpecificIndications(selectedProtocol)?.map((indication, index) => (
                          <li key={index}>• {indication}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        Contraindications
                      </h4>
                      <ul className="text-sm space-y-1">
                        {getProtocolSpecificContraindications(selectedProtocol)?.map((contraindication, index) => (
                          <li key={index}>• {contraindication}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Protocol Information</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div><strong>Category:</strong> {selectedProtocol?.category}</div>
                    <div><strong>State:</strong> {selectedProtocol?.state || "Generic"}</div>
                    <div><strong>Age Group:</strong> {selectedProtocol?.ageGroup?.replace('_', ' & ') || 'All ages'}</div>
                    <div><strong>Scope:</strong> {selectedProtocol?.scope || 'All levels'}</div>
                    <div><strong>Last Updated:</strong> {selectedProtocol?.updatedAt ? new Date(selectedProtocol.updatedAt).toLocaleDateString() : 'N/A'}</div>
                    <div><strong>Version:</strong> 2025.1</div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="procedures" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Step-by-Step Procedures</h4>
                  <div className="bg-muted p-4 rounded-md">
                    <div className="whitespace-pre-wrap text-sm font-mono">
                      {selectedProtocol?.content || "No detailed procedures available for this protocol."}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Special Considerations</h4>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-3 rounded-md">
                    <div className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">⚠️ WARNINGS:</div>
                    <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                      <li>• Always follow local protocols and medical direction</li>
                      <li>• Consider patient allergies and contraindications</li>
                      <li>• Monitor for adverse reactions</li>
                      <li>• Document all interventions and patient responses</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="medications" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Protocol-Specific Medications</h4>
                  {getProtocolSpecificMedications(selectedProtocol) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-muted p-4 rounded-md">
                        <h5 className="font-medium mb-2">Medications for {selectedProtocol?.name}</h5>
                        <ul className="text-sm space-y-1">
                          {getProtocolSpecificMedications(selectedProtocol)?.map((medication, index) => (
                            <li key={index}>• {medication}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-muted p-4 rounded-md">
                        <h5 className="font-medium mb-2">Dosing Guidelines</h5>
                        <div className="text-sm space-y-2">
                          <div><strong>Adult:</strong> Follow standard protocols</div>
                          <div><strong>Pediatric:</strong> Calculate by weight</div>
                          <div><strong>Geriatric:</strong> Consider reduced doses</div>
                          <div><strong>Pregnancy:</strong> Category B/C considerations</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted p-4 rounded-md text-center">
                      <p className="text-sm text-muted-foreground">
                        No specific medications required for this protocol.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="equipment" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Required Equipment</h4>
                  {getProtocolSpecificEquipment(selectedProtocol) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-muted p-4 rounded-md">
                        <h5 className="font-medium mb-2">Equipment for {selectedProtocol?.name}</h5>
                        <ul className="text-sm space-y-1">
                          {getProtocolSpecificEquipment(selectedProtocol)?.map((equipment, index) => (
                            <li key={index}>• {equipment}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-muted p-4 rounded-md">
                        <h5 className="font-medium mb-2">Equipment Checks</h5>
                        <div className="text-sm space-y-1">
                          <div>• Ensure all equipment is functional</div>
                          <div>• Check expiration dates</div>
                          <div>• Verify proper calibration</div>
                          <div>• Test battery levels</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted p-4 rounded-md text-center">
                      <p className="text-sm text-muted-foreground">
                        No specific equipment required for this protocol beyond standard EMS supplies.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="special" className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  <h3 className="text-lg font-semibold">Special Considerations</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      Age-Specific Considerations
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Pediatric:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• Weight-based dosing calculations</li>
                          <li>• Age-appropriate assessment techniques</li>
                          <li>• Special equipment sizing</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Geriatric:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• Reduced medication clearance</li>
                          <li>• Increased fall risk</li>
                          <li>• Polypharmacy considerations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Environmental Factors
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• Weather and temperature considerations</li>
                      <li>• Scene safety and hazardous materials</li>
                      <li>• Resource availability and transport time</li>
                      <li>• Communication with receiving facility</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Legal and Ethical Considerations
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• Informed consent requirements</li>
                      <li>• DNR/POLST documentation</li>
                      <li>• Mandatory reporting obligations</li>
                      <li>• Documentation requirements</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="references" className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                  <h3 className="text-lg font-semibold">References & Resources</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Clinical Guidelines</h4>
                    <ul className="text-sm space-y-2">
                      <li>• American Heart Association (AHA) Guidelines</li>
                      <li>• Emergency Nurses Association (ENA) Standards</li>
                      <li>• National Association of EMS Physicians (NAEMSP)</li>
                      <li>• ProMedix EMS Protocol Manual 2025</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Supporting Literature</h4>
                    <ul className="text-sm space-y-2">
                      <li>• Emergency Care and Transportation of the Sick and Injured (AAOS)</li>
                      <li>• Paramedic Practice Today: Above and Beyond</li>
                      <li>• Evidence-based Emergency Medicine Guidelines</li>
                      <li>• Pediatric Emergency Medicine References</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Online Resources</h4>
                    <ul className="text-sm space-y-2">
                      <li>• National Registry of Emergency Medical Technicians (NREMT)</li>
                      <li>• Emergency Medical Services Authority (EMSA)</li>
                      <li>• Centers for Disease Control and Prevention (CDC)</li>
                      <li>• Nevada State Office of Emergency Medical Services</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <div className="text-sm space-y-2">
                      <div><strong>Medical Director:</strong> Contact through ProMedix EMS</div>
                      <div><strong>Protocol Questions:</strong> Medical control consultation</div>
                      <div><strong>Emergency:</strong> Direct physician consultation via radio/phone</div>
                      <div><strong>Updates:</strong> Monitor ProMedix EMS for protocol revisions</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
