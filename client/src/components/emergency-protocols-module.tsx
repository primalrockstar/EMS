import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  Heart, 
  Stethoscope, 
  Brain, 
  Shield, 
  Users, 
  Timer,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

interface EmergencyProtocolsModuleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Protocol {
  id: string;
  title: string;
  scope: string;
  category: string;
  objective: string;
  procedure: string[];
  equipment: string[];
  considerations: {
    pediatric?: string;
    geriatric?: string;
    pregnant?: string;
  };
  complications: string[];
  contraindications: string[];
  followUp: string[];
}

export default function EmergencyProtocolsModule({ open, onOpenChange }: EmergencyProtocolsModuleProps) {
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);

  const protocols: Protocol[] = [
    // EMR Level Protocols
    {
      id: "emr-1",
      title: "Scene Safety and Body Substance Isolation (BSI)",
      scope: "EMR",
      category: "Safety",
      objective: "Ensure a safe environment for providers, patients, and bystanders before initiating care.",
      procedure: [
        "Assess scene for hazards: environmental (fire, downed power lines, chemical spills), human (violence, crowds), or structural (unstable buildings)",
        "Don appropriate PPE based on risk: gloves (always), mask/eye protection (for respiratory or splash risks), gown (for heavy bleeding or infectious disease)",
        "Establish a safe zone; coordinate with law enforcement, fire, or hazmat teams if needed",
        "Use reflective vests or flares for traffic control in roadway incidents",
        "In mass casualty incidents (MCIs), initiate triage (e.g., START: Simple Triage and Rapid Treatment) to prioritize patients"
      ],
      equipment: ["PPE (gloves, mask, goggles, gown)", "traffic cones/flares", "radio for communication"],
      considerations: {
        pediatric: "Use calm, age-appropriate communication to reduce fear",
        geriatric: "Assess for mobility issues or confusion that may affect scene safety",
        pregnant: "Ensure safe positioning (e.g., left lateral tilt if needed during transport)"
      },
      complications: ["Failure to identify hazards (e.g., carbon monoxide in confined spaces) risks provider injury"],
      contraindications: ["None; safety is non-negotiable"],
      followUp: [
        "Continuously reassess scene during care (e.g., changing weather, crowd behavior)",
        "Document hazards and safety measures in patient care report (PCR)",
        "Relay safety concerns to incoming EMS units or incident command"
      ]
    },
    {
      id: "emr-2",
      title: "Primary Assessment and Initial Stabilization",
      scope: "EMR",
      category: "Assessment",
      objective: "Identify and address immediate life threats (airway, breathing, circulation).",
      procedure: [
        "Assess responsiveness using AVPU scale (Alert, Verbal, Pain, Unresponsive)",
        "Airway: Open with head-tilt/chin-lift (jaw-thrust if cervical spine injury suspected)",
        "Breathing: Check rate and quality; initiate ventilations with pocket mask if absent or inadequate (10-12 breaths/min for adults)",
        "Circulation: Check pulse (carotid for adults, brachial for infants); control severe bleeding with direct pressure, pressure dressings, or commercial tourniquets",
        "Perform rapid trauma sweep (<60 seconds) to identify major injuries",
        "Expose patient to assess injuries, but prevent hypothermia (cover with blanket)"
      ],
      equipment: ["Pocket mask", "tourniquets", "sterile gauze", "trauma shears", "pulse oximeter (if available)"],
      considerations: {
        pediatric: "Use Pediatric Assessment Triangle (appearance, work of breathing, circulation) for rapid assessment",
        geriatric: "Atypical presentations (e.g., altered mental status from sepsis or hypoperfusion) are common",
        pregnant: "Assess for trauma to abdomen; prioritize left lateral positioning if hypotensive"
      },
      complications: ["Missed injuries (e.g., internal bleeding) or improper airway management can worsen outcomes"],
      contraindications: ["Avoid unnecessary spinal manipulation if no trauma is suspected to prevent patient discomfort"],
      followUp: [
        "Relay primary assessment findings (AVPU, ABCs, major injuries) to incoming EMS units",
        "Document vital signs, interventions, and times in the patient care report (PCR)",
        "Prepare patient for rapid handover (e.g., position for transport, secure belongings)"
      ]
    },
    {
      id: "emr-3",
      title: "Cardiopulmonary Resuscitation (CPR) and AED Use",
      scope: "EMR",
      category: "Cardiac",
      objective: "Restore circulation and oxygenation in cardiac arrest.",
      procedure: [
        "Confirm unresponsiveness (tap and shout) and absence of pulse (check carotid for 5-10 seconds in adults, brachial in infants)",
        "Initiate high-quality CPR: 100-120 compressions/min, 2-2.4 inches depth (adults), 1.5 inches (infants), 2 inches (children), allow full chest recoil, minimize interruptions (<10 seconds)",
        "Apply automated external defibrillator (AED) as soon as available; follow voice prompts for rhythm analysis and shock delivery",
        "Continue CPR cycles (30:2 compressions:ventilations for single rescuer; 15:2 for pediatric two-rescuer)",
        "For pediatric patients, use pediatric AED pads or settings (1-8 years); manual compressions for infants"
      ],
      equipment: ["AED", "pocket mask with one-way valve", "barrier device", "gloves"],
      considerations: {
        pediatric: "Adjust compression depth and rate (100-120/min); use two thumbs-encircling technique for infants with two rescuers",
        geriatric: "Be cautious of rib fractures; adjust compression force if frail",
        pregnant: "Perform manual uterine displacement (leftward) during CPR to improve venous return"
      },
      complications: ["Inadequate compression depth/rate, interruptions, or improper AED pad placement can reduce survival odds"],
      contraindications: ["Do not initiate CPR in obvious death (e.g., rigor mortis, lividity, decapitation) per local protocol"],
      followUp: [
        "Continue CPR until higher-level providers take over, return of spontaneous circulation (ROSC), or termination per medical direction",
        "Document CPR start/stop times, AED shocks, and patient response in PCR",
        "Provide emotional support to bystanders/family"
      ]
    },

    // EMT Level Protocols
    {
      id: "emt-1",
      title: "Oxygen Therapy and Respiratory Support",
      scope: "EMT",
      category: "Respiratory",
      objective: "Correct hypoxia and support patients in respiratory distress.",
      procedure: [
        "Assess respiratory status: rate (normal 12-20/min adults), depth, effort, SpO2 (target ≥94%)",
        "Administer oxygen via nasal cannula (2-6 L/min) for mild hypoxia or non-rebreather mask (10-15 L/min) for severe hypoxia (SpO2 <94% or distress)",
        "For inadequate ventilation (e.g., apnea, respiratory rate <8/min), use bag-valve-mask (BVM) with 15 L/min oxygen, delivering 10-12 breaths/min (adults) or 12-20 breaths/min (pediatrics)",
        "Position patient to optimize breathing (e.g., semi-Fowler's for dyspnea, recovery position for unconscious with adequate breathing)"
      ],
      equipment: ["Pulse oximeter", "oxygen tank", "nasal cannula", "non-rebreather mask", "BVM", "suction device"],
      considerations: {
        pediatric: "Use pediatric-sized masks; deliver 8-10 mL/kg tidal volume to avoid barotrauma",
        geriatric: "Titrate oxygen in COPD patients (target SpO2 88-92%) to avoid suppressing respiratory drive",
        pregnant: "Ensure high-flow oxygen in late pregnancy to support fetal oxygenation"
      },
      complications: ["Over-ventilation can cause gastric distension or barotrauma; high-flow oxygen in COPD may suppress respiratory drive"],
      contraindications: ["Avoid high-flow oxygen in rare cases (e.g., paraquat poisoning, bleomycin-treated patients)"],
      followUp: [
        "Reassess SpO2, respiratory rate, and lung sounds every 5 minutes",
        "Document oxygen delivery method, flow rate, and patient response",
        "Prepare for rapid transport if respiratory distress persists"
      ]
    },
    {
      id: "emt-2",
      title: "Spinal Immobilization",
      scope: "EMT",
      category: "Trauma",
      objective: "Prevent further spinal cord injury in suspected spinal trauma.",
      procedure: [
        "Maintain manual cervical spine stabilization during initial assessment",
        "Apply rigid cervical collar (sized appropriately) and secure patient to long backboard or scoop stretcher",
        "Use padding (e.g., under head, shoulders) to maintain neutral spine alignment",
        "Secure torso, pelvis, and extremities with straps; log-roll with at least two providers if movement is needed",
        "Reassess neurological status (motor/sensory function in extremities) before and after immobilization"
      ],
      equipment: ["Cervical collar", "long backboard", "straps", "padding", "head blocks"],
      considerations: {
        pediatric: "Use pediatric-specific equipment; children have proportionally larger heads requiring modified positioning",
        geriatric: "Account for kyphosis or other spinal deformities; pad appropriately for comfort",
        pregnant: "Tilt backboard 15 degrees to left to prevent supine hypotensive syndrome"
      },
      complications: ["Over-immobilization can cause pressure sores, respiratory compromise, or increased pain"],
      contraindications: ["Penetrating trauma to neck generally does not require cervical collar unless neurological deficits present"],
      followUp: [
        "Monitor airway and breathing closely; be prepared to remove collar if vomiting occurs",
        "Document mechanism of injury and neurological assessment findings",
        "Communicate spinal precautions to receiving facility"
      ]
    },

    // AEMT Level Protocols
    {
      id: "aemt-1",
      title: "Advanced Airway Management",
      scope: "AEMT",
      category: "Airway",
      objective: "Establish and maintain definitive airway control in patients requiring advanced intervention.",
      procedure: [
        "Assess need for advanced airway: inability to maintain airway, inadequate ventilation despite BVM, anticipated clinical course",
        "Pre-oxygenate with 100% oxygen for 3-5 minutes if possible",
        "Consider supraglottic airway device (King LT, LMA) as first-line advanced airway",
        "If endotracheal intubation indicated: use direct laryngoscopy, visualize vocal cords, insert tube, confirm placement with waveform capnography",
        "Secure airway device and reassess ventilation and oxygenation"
      ],
      equipment: ["Supraglottic airways", "laryngoscope", "endotracheal tubes", "stylet", "capnography", "suction"],
      considerations: {
        pediatric: "Use age-appropriate equipment sizing; consider uncuffed tubes for children <8 years",
        geriatric: "May have difficult airway anatomy; consider alternative approaches",
        pregnant: "Rapid sequence intubation often needed due to increased aspiration risk"
      },
      complications: ["Esophageal intubation, aspiration, hypoxia during attempts, dental trauma"],
      contraindications: ["Severe facial trauma may require surgical airway by physician"],
      followUp: [
        "Continuous monitoring with capnography and pulse oximetry",
        "Reassess tube position with patient movement",
        "Document airway management attempts and outcomes"
      ]
    },

    // Paramedic Level Protocols
    {
      id: "paramedic-1",
      title: "Advanced Cardiac Life Support (ACLS)",
      scope: "Paramedic",
      category: "Cardiac",
      objective: "Provide comprehensive advanced cardiac life support for cardiac arrest and unstable arrhythmias.",
      procedure: [
        "Confirm cardiac arrest and begin high-quality CPR immediately",
        "Analyze rhythm: VF/VT (shockable) vs PEA/Asystole (non-shockable)",
        "For VF/VT: Defibrillate with biphasic 120-200J or monophasic 360J, resume CPR immediately",
        "Administer epinephrine 1 mg IV/IO every 3-5 minutes",
        "For VF/VT: Consider amiodarone 300 mg IV/IO after 3rd shock, then 150 mg if needed",
        "Identify and treat reversible causes (4 H's and 4 T's): Hypoxia, Hypovolemia, Hydrogen ions, Hypo/hyperkalemia, Tension pneumothorax, Tamponade, Toxins, Thrombosis"
      ],
      equipment: ["Defibrillator/monitor", "IV/IO access", "advanced medications", "airway equipment", "capnography"],
      considerations: {
        pediatric: "Use pediatric doses: epinephrine 0.01 mg/kg, amiodarone 5 mg/kg; energy doses 2-4 J/kg",
        geriatric: "Consider underlying conditions and medication interactions",
        pregnant: "Perform manual uterine displacement; consider perimortem cesarean section if >20 weeks gestation"
      },
      complications: ["Medication errors, inadequate CPR quality, failure to identify reversible causes"],
      contraindications: ["DNR orders, obvious death, or futile resuscitation per medical direction"],
      followUp: [
        "Post-ROSC care: target temperature management, blood pressure support, ventilation management",
        "Rapid transport to appropriate facility for post-cardiac arrest care",
        "Detailed documentation of timeline, interventions, and outcomes"
      ]
    },
    {
      id: "paramedic-2",
      title: "Rapid Sequence Intubation (RSI)",
      scope: "Paramedic",
      category: "Airway",
      objective: "Perform endotracheal intubation with pharmacological assistance in patients requiring definitive airway control.",
      procedure: [
        "Assess for RSI indications: inability to protect airway, failure to oxygenate/ventilate, anticipated clinical course",
        "Pre-oxygenate with 100% oxygen for 3-5 minutes",
        "Administer sedative (etomidate 0.3 mg/kg or ketamine 1-2 mg/kg IV) followed immediately by paralytic (succinylcholine 1-1.5 mg/kg or rocuronium 1-1.2 mg/kg)",
        "Apply cricoid pressure (if trained and per protocol)",
        "Perform direct laryngoscopy, visualize vocal cords, and insert endotracheal tube",
        "Confirm placement with waveform capnography, bilateral breath sounds, and chest rise"
      ],
      equipment: ["RSI medications", "laryngoscope", "endotracheal tubes", "capnography", "backup airway devices"],
      considerations: {
        pediatric: "Weight-based dosing; consider atropine premedication to prevent bradycardia",
        geriatric: "Reduce induction agent doses; consider comorbidities",
        pregnant: "Rapid desaturation; consider reduced doses and positioning"
      },
      complications: ["Failed intubation, aspiration, hypotension, bradycardia, can't intubate/can't ventilate scenario"],
      contraindications: ["Known difficult airway without backup plan, severe facial trauma, suspected epiglottitis in children"],
      followUp: [
        "Continuous monitoring with capnography and vital signs",
        "Sedation and analgesia post-intubation as needed",
        "Document indication, medications used, number of attempts, and complications"
      ]
    }
  ];

  const getProtocolsByScope = (scope: string) => {
    return protocols.filter(protocol => protocol.scope === scope);
  };

  const getScopeIcon = (scope: string) => {
    switch (scope) {
      case "EMR":
        return <Shield className="h-4 w-4" />;
      case "EMT":
        return <Stethoscope className="h-4 w-4" />;
      case "AEMT":
        return <Heart className="h-4 w-4" />;
      case "Paramedic":
        return <Brain className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getScopeBadgeColor = (scope: string) => {
    switch (scope) {
      case "EMR":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "EMT":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "AEMT":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "Paramedic":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Emergency Protocols Module
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-1 min-h-0">
          {!selectedProtocol ? (
            <div className="flex-1 p-6">
              <Tabs defaultValue="EMR" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="EMR" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    EMR
                  </TabsTrigger>
                  <TabsTrigger value="EMT" className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    EMT
                  </TabsTrigger>
                  <TabsTrigger value="AEMT" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    AEMT
                  </TabsTrigger>
                  <TabsTrigger value="Paramedic" className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Paramedic
                  </TabsTrigger>
                </TabsList>

                {["EMR", "EMT", "AEMT", "Paramedic"].map((scope) => (
                  <TabsContent key={scope} value={scope} className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getProtocolsByScope(scope).map((protocol) => (
                        <Card key={protocol.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedProtocol(protocol)}>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{protocol.title}</CardTitle>
                              <Badge className={getScopeBadgeColor(protocol.scope)}>
                                {getScopeIcon(protocol.scope)}
                                <span className="ml-1">{protocol.scope}</span>
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{protocol.category}</p>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">{protocol.objective}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          ) : (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-2">
                  <Button variant="outline" onClick={() => setSelectedProtocol(null)}>
                    ← Back to Protocols
                  </Button>
                  <Badge className={getScopeBadgeColor(selectedProtocol.scope)}>
                    {getScopeIcon(selectedProtocol.scope)}
                    <span className="ml-1">{selectedProtocol.scope}</span>
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold">{selectedProtocol.title}</h2>
                <p className="text-muted-foreground">{selectedProtocol.category}</p>
              </div>

              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {/* Objective */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Objective
                    </h3>
                    <p className="text-sm">{selectedProtocol.objective}</p>
                  </div>

                  <Separator />

                  {/* Procedure */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Timer className="h-5 w-5 text-blue-500" />
                      Procedure
                    </h3>
                    <ol className="space-y-2">
                      {selectedProtocol.procedure.map((step, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </span>
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <Separator />

                  {/* Equipment */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-500" />
                      Equipment
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProtocol.equipment.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Special Considerations */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Info className="h-5 w-5 text-cyan-500" />
                      Special Considerations
                    </h3>
                    <div className="space-y-3">
                      {selectedProtocol.considerations.pediatric && (
                        <div>
                          <h4 className="font-medium text-sm text-blue-700">Pediatric:</h4>
                          <p className="text-sm text-muted-foreground">{selectedProtocol.considerations.pediatric}</p>
                        </div>
                      )}
                      {selectedProtocol.considerations.geriatric && (
                        <div>
                          <h4 className="font-medium text-sm text-orange-700">Geriatric:</h4>
                          <p className="text-sm text-muted-foreground">{selectedProtocol.considerations.geriatric}</p>
                        </div>
                      )}
                      {selectedProtocol.considerations.pregnant && (
                        <div>
                          <h4 className="font-medium text-sm text-pink-700">Pregnant Patients:</h4>
                          <p className="text-sm text-muted-foreground">{selectedProtocol.considerations.pregnant}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Complications */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      Potential Complications
                    </h3>
                    <ul className="space-y-1">
                      {selectedProtocol.complications.map((complication, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          {complication}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  {/* Contraindications */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      Contraindications
                    </h3>
                    <ul className="space-y-1">
                      {selectedProtocol.contraindications.map((contraindication, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-yellow-500 mt-1">•</span>
                          {contraindication}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  {/* Follow-up */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Follow-up Actions
                    </h3>
                    <ul className="space-y-1">
                      {selectedProtocol.followUp.map((action, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}