import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  AlertTriangle, 
  Info, 
  FileText, 
  Clock,
  CheckCircle,
  Users,
  Stethoscope,
  Scale
} from "lucide-react";

interface LegalDisclaimerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LegalDisclaimer({ open, onOpenChange }: LegalDisclaimerProps) {
  const [acknowledged, setAcknowledged] = useState(false);

  const handleAcknowledge = () => {
    setAcknowledged(true);
    localStorage.setItem('promedix-disclaimer-acknowledged', 'true');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0" aria-describedby="legal-disclaimer-description">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Scale className="h-6 w-6 text-blue-600" />
            Legal Disclaimer and Terms of Use
          </DialogTitle>
          <div id="legal-disclaimer-description" className="text-sm text-muted-foreground mt-2">
            Important legal information regarding the use of ProMedix EMS application
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] p-6 pt-0">
          <div className="space-y-6">
            {/* Critical Warning */}
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                <strong className="text-red-600">CRITICAL NOTICE:</strong> This application is designed as an educational 
                and reference tool only. It is NOT intended to replace professional medical judgment, clinical experience, 
                or established emergency medical protocols. Always follow your local EMS protocols, medical director orders, 
                and professional training in emergency situations.
              </AlertDescription>
            </Alert>

            {/* Medical Disclaimer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                  Medical Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">No Medical Advice</h4>
                  <p>
                    ProMedix EMS does not provide medical advice, diagnosis, or treatment recommendations. 
                    The information contained in this application is for educational and reference purposes only. 
                    Users should not rely on this information as a substitute for professional medical judgment 
                    or established emergency medical protocols.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Emergency Situations</h4>
                  <p>
                    In emergency situations, always follow established protocols, contact medical control, 
                    and use clinical judgment. This application should never delay or replace immediate 
                    patient care or emergency response procedures.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Medication Information</h4>
                  <p>
                    Medication dosages, contraindications, and interaction information are provided for 
                    educational purposes only. Always verify dosages with current protocols, medical 
                    control, and established references. Individual patient factors may require 
                    modifications to standard protocols.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Educational Purpose */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Educational Purpose and Scope
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Intended Users</h4>
                  <p>
                    This application is intended for use by licensed Emergency Medical Services (EMS) 
                    professionals, EMS students, and individuals with appropriate medical training. 
                    It is not intended for use by the general public for self-diagnosis or treatment.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Educational Tool</h4>
                  <p>
                    ProMedix EMS serves as a study aid and reference tool to supplement, not replace, 
                    formal EMS education, training, and certification programs. Users should maintain 
                    current certifications and continue professional development.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Clark County EMS Protocols</h4>
                  <p>
                    While this application includes Clark County EMS protocols, users must verify 
                    current protocols with official sources. Protocols may change, and users are 
                    responsible for ensuring they have the most current information.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Accuracy and Liability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-600" />
                  Accuracy and Liability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Information Accuracy</h4>
                  <p>
                    While every effort has been made to ensure the accuracy of the information provided, 
                    ProMedix EMS and its developers make no warranties regarding the completeness, 
                    accuracy, or timeliness of the content. Medical information and protocols may 
                    change over time.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Limitation of Liability</h4>
                  <p>
                    ProMedix EMS, its developers, Guardian Elite Medical Services, and associated 
                    parties shall not be liable for any direct, indirect, incidental, special, 
                    or consequential damages arising from the use or inability to use this application, 
                    including but not limited to patient care decisions or outcomes.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">User Responsibility</h4>
                  <p>
                    Users are solely responsible for verifying information accuracy, maintaining 
                    current certifications, following local protocols, and exercising appropriate 
                    clinical judgment. Users assume all risks associated with the use of this application.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Privacy and Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  Privacy and Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">HIPAA Compliance</h4>
                  <p>
                    This application is designed with HIPAA compliance considerations. However, 
                    users must not enter actual patient information or protected health information 
                    (PHI) into this application. Use only for educational scenarios and reference purposes.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Data Security</h4>
                  <p>
                    While security measures are implemented, users should not store sensitive 
                    or confidential information in this application. The application may collect 
                    usage data for improvement purposes in accordance with privacy policies.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Technical Disclaimer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  Technical Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">System Availability</h4>
                  <p>
                    This application is provided "as is" without warranty of any kind. System 
                    availability, performance, and functionality may vary. Users should not 
                    rely solely on this application in critical situations.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Updates and Changes</h4>
                  <p>
                    The application may be updated, modified, or discontinued without notice. 
                    Users are responsible for ensuring they have current information and protocols 
                    from official sources.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-600" />
                  Contact and Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Developer Information</h4>
                  <p>
                    ProMedix EMS is designed by Shaun Williamson, EMS student at Guardian Elite 
                    Medical Services, Las Vegas, Nevada. For technical support or questions 
                    about the application, contact through official channels.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Emergency Contacts</h4>
                  <p>
                    For medical emergencies, contact 911 or your local emergency services. 
                    For medical direction, contact your local EMS medical control center.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Acknowledgment */}
            <div className="text-center space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>
                  <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
                </p>
                <p>
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                </p>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  By using ProMedix EMS, you acknowledge that you have read, understood, and agree 
                  to be bound by this disclaimer and terms of use. You understand that this application 
                  is for educational and reference purposes only and should not replace professional 
                  medical judgment or established emergency protocols.
                </AlertDescription>
              </Alert>

              <div className="flex justify-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  className="px-8"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAcknowledge}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                  I Acknowledge and Agree
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

// Hook to check if disclaimer has been acknowledged
export function useDisclaimerCheck() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const acknowledged = localStorage.getItem('promedix-disclaimer-acknowledged');
    if (!acknowledged) {
      setShowDisclaimer(true);
    }
  }, []);

  return { showDisclaimer, setShowDisclaimer };
}