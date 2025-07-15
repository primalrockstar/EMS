import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  Clock, 
  FileText, 
  Shield, 
  Pill, 
  BookOpen,
  Settings,
  X
} from "lucide-react";

interface RealTimeAlertSystemProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Alert {
  id: string;
  type: 'protocol' | 'certification' | 'medication' | 'system' | 'training';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired: boolean;
  expirationDate?: Date;
  relatedTo?: string;
}

interface AlertSettings {
  protocolUpdates: boolean;
  certificationReminders: boolean;
  medicationRecalls: boolean;
  systemNotifications: boolean;
  trainingReminders: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  roleBasedFiltering: boolean;
}

export default function RealTimeAlertSystem({ open, onOpenChange }: RealTimeAlertSystemProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [settings, setSettings] = useState<AlertSettings>({
    protocolUpdates: true,
    certificationReminders: true,
    medicationRecalls: true,
    systemNotifications: true,
    trainingReminders: true,
    emailNotifications: false,
    pushNotifications: true,
    roleBasedFiltering: true
  });

  // Mock alerts data
  useEffect(() => {
    const mockAlerts: Alert[] = [
      {
        id: "1",
        type: "protocol",
        priority: "high",
        title: "Clark County Protocol Update",
        message: "Adult Cardiac Arrest Protocol has been updated with new compression guidelines. Review required by all EMTs.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
        actionRequired: true,
        relatedTo: "Adult Cardiac Arrest Protocol"
      },
      {
        id: "2",
        type: "certification",
        priority: "medium",
        title: "EMT Certification Renewal",
        message: "Your EMT certification expires in 30 days. Schedule renewal training soon.",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: false,
        actionRequired: true,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      {
        id: "3",
        type: "medication",
        priority: "high",
        title: "Medication Recall Alert",
        message: "Lot #XYZ123 of Epinephrine auto-injectors has been recalled. Check your supplies immediately.",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        read: true,
        actionRequired: true,
        relatedTo: "Epinephrine"
      },
      {
        id: "4",
        type: "training",
        priority: "low",
        title: "New Learning Module Available",
        message: "Chapter 25: Trauma Overview module has been updated with new content and case studies.",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        read: false,
        actionRequired: false,
        relatedTo: "Trauma Overview"
      },
      {
        id: "5",
        type: "system",
        priority: "medium",
        title: "System Maintenance Scheduled",
        message: "ProMedixEMS will undergo maintenance on Friday from 2-4 AM. Limited functionality expected.",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        read: true,
        actionRequired: false
      }
    ];

    setAlerts(mockAlerts);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'protocol':
        return <FileText className="h-4 w-4" />;
      case 'certification':
        return <Shield className="h-4 w-4" />;
      case 'medication':
        return <Pill className="h-4 w-4" />;
      case 'training':
        return <BookOpen className="h-4 w-4" />;
      case 'system':
        return <Settings className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const updateSettings = (key: keyof AlertSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const unreadCount = alerts.filter(alert => !alert.read).length;
  const highPriorityCount = alerts.filter(alert => alert.priority === 'high' && !alert.read).length;

  const filteredAlerts = alerts.filter(alert => {
    if (!settings.roleBasedFiltering) return true;
    
    // Role-based filtering logic (simplified)
    // In real app, this would check user's role (EMT, AEMT, Paramedic)
    return true;
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            Real-Time Alert System
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="alerts">
              Active Alerts
              {highPriorityCount > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {highPriorityCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings">Alert Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-4">
            {/* Alert Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    High Priority
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {alerts.filter(a => a.priority === 'high').length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Bell className="h-4 w-4 text-blue-600" />
                    Unread
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {unreadCount}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    Action Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {alerts.filter(a => a.actionRequired).length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alert List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAlerts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No alerts at this time
                    </div>
                  ) : (
                    filteredAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`border rounded-lg p-4 ${
                          !alert.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="mt-1">
                              {getAlertIcon(alert.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{alert.title}</h4>
                                {getPriorityBadge(alert.priority)}
                                {alert.actionRequired && (
                                  <Badge variant="outline" className="text-xs">
                                    Action Required
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {alert.message}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>{formatTimeAgo(alert.timestamp)}</span>
                                {alert.relatedTo && (
                                  <span>Related to: {alert.relatedTo}</span>
                                )}
                                {alert.expirationDate && (
                                  <span>Expires: {alert.expirationDate.toLocaleDateString()}</span>
                                )}
                              </div>
                            </div>
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
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Alert Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="protocol-updates">Protocol Updates</Label>
                      <p className="text-sm text-gray-600">
                        Get notified when Clark County protocols are updated
                      </p>
                    </div>
                    <Switch
                      id="protocol-updates"
                      checked={settings.protocolUpdates}
                      onCheckedChange={(checked) => updateSettings('protocolUpdates', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="certification-reminders">Certification Reminders</Label>
                      <p className="text-sm text-gray-600">
                        Reminders for certification renewals and training
                      </p>
                    </div>
                    <Switch
                      id="certification-reminders"
                      checked={settings.certificationReminders}
                      onCheckedChange={(checked) => updateSettings('certificationReminders', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="medication-recalls">Medication Recalls</Label>
                      <p className="text-sm text-gray-600">
                        Critical alerts for medication recalls and safety issues
                      </p>
                    </div>
                    <Switch
                      id="medication-recalls"
                      checked={settings.medicationRecalls}
                      onCheckedChange={(checked) => updateSettings('medicationRecalls', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="training-reminders">Training Reminders</Label>
                      <p className="text-sm text-gray-600">
                        Notifications for new learning modules and training
                      </p>
                    </div>
                    <Switch
                      id="training-reminders"
                      checked={settings.trainingReminders}
                      onCheckedChange={(checked) => updateSettings('trainingReminders', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="system-notifications">System Notifications</Label>
                      <p className="text-sm text-gray-600">
                        Maintenance, updates, and system status alerts
                      </p>
                    </div>
                    <Switch
                      id="system-notifications"
                      checked={settings.systemNotifications}
                      onCheckedChange={(checked) => updateSettings('systemNotifications', checked)}
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-4">Delivery Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-gray-600">
                          Receive alerts directly in the app
                        </p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => updateSettings('pushNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-gray-600">
                          Send alerts to your email address
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => updateSettings('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="role-based-filtering">Role-Based Filtering</Label>
                        <p className="text-sm text-gray-600">
                          Only show alerts relevant to your certification level
                        </p>
                      </div>
                      <Switch
                        id="role-based-filtering"
                        checked={settings.roleBasedFiltering}
                        onCheckedChange={(checked) => updateSettings('roleBasedFiltering', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}