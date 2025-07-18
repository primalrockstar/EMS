import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Clock, 
  X,
  Settings,
  Shield,
  FileText,
  Calendar,
  Stethoscope
} from "lucide-react";

interface RealTimeAlert {
  id: string;
  type: "protocol_update" | "certification_expiry" | "medication_recall" | "training_due" | "system_update" | "emergency_alert";
  severity: "critical" | "urgent" | "info";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired: boolean;
  expiresAt?: Date;
  relatedItems?: string[];
}

interface RealTimeAlertsProps {
  userRole: "EMR" | "EMT" | "AEMT" | "Paramedic";
  location: string;
}

export default function RealTimeAlerts({ userRole, location }: RealTimeAlertsProps) {
  const [alerts, setAlerts] = useState<RealTimeAlert[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    protocolUpdates: true,
    certificationReminders: true,
    medicationRecalls: true,
    trainingDue: true,
    systemUpdates: false,
    emergencyAlerts: true
  });

  // Mock real-time alerts - in production, these would come from WebSocket or Server-Sent Events
  useEffect(() => {
    const mockAlerts: RealTimeAlert[] = [
      {
        id: "1",
        type: "protocol_update",
        severity: "urgent",
        title: "Clark County Protocol Update",
        message: "Cardiac Arrest Protocol v2.1 has been updated with new CPR guidelines. Review required within 24 hours.",
        timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        read: false,
        actionRequired: true,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        relatedItems: ["cardiac-arrest-protocol"]
      },
      {
        id: "2",
        type: "certification_expiry",
        severity: "critical",
        title: "EMT Certification Expiring",
        message: "Your EMT certification expires in 15 days. Schedule renewal training immediately.",
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        read: false,
        actionRequired: true,
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        relatedItems: ["certification-renewal"]
      },
      {
        id: "3",
        type: "medication_recall",
        severity: "urgent",
        title: "Medication Recall Alert",
        message: "Epinephrine auto-injectors lot #EPI2024-001 recalled due to dosage inconsistency. Check inventory.",
        timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        read: false,
        actionRequired: true,
        relatedItems: ["epinephrine"]
      },
      {
        id: "4",
        type: "training_due",
        severity: "info",
        title: "Monthly Training Due",
        message: "Complete your monthly airway management training by end of week.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: true,
        actionRequired: false,
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        relatedItems: ["airway-management"]
      },
      {
        id: "5",
        type: "system_update",
        severity: "info",
        title: "App Update Available",
        message: "ProMedix EMS v3.2.1 is available with improved calculator accuracy and new features.",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        read: true,
        actionRequired: false,
        relatedItems: ["app-update"]
      }
    ];

    // Filter alerts based on user role and settings
    const filteredAlerts = mockAlerts.filter(alert => {
      switch (alert.type) {
        case "protocol_update":
          return alertSettings.protocolUpdates;
        case "certification_expiry":
          return alertSettings.certificationReminders;
        case "medication_recall":
          return alertSettings.medicationRecalls;
        case "training_due":
          return alertSettings.trainingDue;
        case "system_update":
          return alertSettings.systemUpdates;
        case "emergency_alert":
          return alertSettings.emergencyAlerts;
        default:
          return true;
      }
    });

    setAlerts(filteredAlerts);
  }, [alertSettings, userRole, location]);

  const unreadAlerts = alerts.filter(alert => !alert.read);
  const criticalAlerts = alerts.filter(alert => alert.severity === "critical");
  const urgentAlerts = alerts.filter(alert => alert.severity === "urgent");

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "protocol_update": return FileText;
      case "certification_expiry": return Shield;
      case "medication_recall": return AlertTriangle;
      case "training_due": return Stethoscope;
      case "system_update": return Settings;
      case "emergency_alert": return Bell;
      default: return Info;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500";
      case "urgent": return "bg-orange-500";
      case "info": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMins > 0) return `${diffMins}m ago`;
    return "Just now";
  };

  const displayedAlerts = showAll ? alerts : alerts.slice(0, 3);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <span>Real-Time Alerts</span>
            {unreadAlerts.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadAlerts.length}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show All"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Alert Summary */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-2 bg-red-50 rounded">
            <div className="text-lg font-semibold text-red-600">{criticalAlerts.length}</div>
            <div className="text-xs text-red-500">Critical</div>
          </div>
          <div className="p-2 bg-orange-50 rounded">
            <div className="text-lg font-semibold text-orange-600">{urgentAlerts.length}</div>
            <div className="text-xs text-orange-500">Urgent</div>
          </div>
          <div className="p-2 bg-blue-50 rounded">
            <div className="text-lg font-semibold text-blue-600">{unreadAlerts.length}</div>
            <div className="text-xs text-blue-500">Unread</div>
          </div>
        </div>

        {/* Alert List */}
        <div className="space-y-3">
          {displayedAlerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
              <p>No alerts at this time</p>
              <p className="text-xs">You're all caught up!</p>
            </div>
          ) : (
            displayedAlerts.map((alert) => {
              const AlertIcon = getAlertIcon(alert.type);
              return (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${!alert.read ? 'bg-blue-50 border-blue-200' : 'bg-muted/50'}`}
                >
                  <div className="flex items-start gap-3">
                    <AlertIcon className={`h-5 w-5 mt-1 ${
                      alert.severity === 'critical' ? 'text-red-500' :
                      alert.severity === 'urgent' ? 'text-orange-500' : 'text-blue-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{alert.title}</h4>
                        <Badge className={`${getSeverityColor(alert.severity)} text-white text-xs`}>
                          {alert.severity}
                        </Badge>
                        {alert.actionRequired && (
                          <Badge variant="outline" className="text-xs">
                            Action Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {alert.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{getTimeAgo(alert.timestamp)}</span>
                          {alert.expiresAt && (
                            <span>• Expires: {alert.expiresAt.toLocaleDateString()}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {!alert.read && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAsRead(alert.id)}
                            >
                              Mark Read
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => dismissAlert(alert.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Clark County Specific Alert */}
        <Alert className="border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4 text-blue-500" />
          <AlertDescription>
            <strong>Clark County EMS System:</strong> Connected to real-time protocol updates and certification tracking. 
            Location: {location || "Las Vegas, Nevada"}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}