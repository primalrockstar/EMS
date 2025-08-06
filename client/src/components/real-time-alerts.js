import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bell, AlertTriangle, Info, CheckCircle, Clock, X, Settings, Shield, FileText, Stethoscope } from "lucide-react";
export default function RealTimeAlerts({ userRole, location }) {
    const [alerts, setAlerts] = useState([]);
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
        const mockAlerts = [
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
    const markAsRead = (alertId) => {
        setAlerts(prev => prev.map(alert => alert.id === alertId ? { ...alert, read: true } : alert));
    };
    const dismissAlert = (alertId) => {
        setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    };
    const getAlertIcon = (type) => {
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
    const getSeverityColor = (severity) => {
        switch (severity) {
            case "critical": return "bg-red-500";
            case "urgent": return "bg-orange-500";
            case "info": return "bg-blue-500";
            default: return "bg-gray-500";
        }
    };
    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const diffMs = now.getTime() - timestamp.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays > 0)
            return `${diffDays}d ago`;
        if (diffHours > 0)
            return `${diffHours}h ago`;
        if (diffMins > 0)
            return `${diffMins}m ago`;
        return "Just now";
    };
    const displayedAlerts = showAll ? alerts : alerts.slice(0, 3);
    return (_jsxs(Card, { className: "w-full", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Bell, { className: "h-5 w-5" }), _jsx("span", { children: "Real-Time Alerts" }), unreadAlerts.length > 0 && (_jsx(Badge, { variant: "destructive", className: "ml-2", children: unreadAlerts.length }))] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setShowAll(!showAll), children: showAll ? "Show Less" : "Show All" })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [_jsxs("div", { className: "p-2 bg-red-50 rounded", children: [_jsx("div", { className: "text-lg font-semibold text-red-600", children: criticalAlerts.length }), _jsx("div", { className: "text-xs text-red-500", children: "Critical" })] }), _jsxs("div", { className: "p-2 bg-orange-50 rounded", children: [_jsx("div", { className: "text-lg font-semibold text-orange-600", children: urgentAlerts.length }), _jsx("div", { className: "text-xs text-orange-500", children: "Urgent" })] }), _jsxs("div", { className: "p-2 bg-blue-50 rounded", children: [_jsx("div", { className: "text-lg font-semibold text-blue-600", children: unreadAlerts.length }), _jsx("div", { className: "text-xs text-blue-500", children: "Unread" })] })] }), _jsx("div", { className: "space-y-3", children: displayedAlerts.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [_jsx(CheckCircle, { className: "h-8 w-8 mx-auto mb-2" }), _jsx("p", { children: "No alerts at this time" }), _jsx("p", { className: "text-xs", children: "You're all caught up!" })] })) : (displayedAlerts.map((alert) => {
                            const AlertIcon = getAlertIcon(alert.type);
                            return (_jsx("div", { className: `p-3 rounded-lg border ${!alert.read ? 'bg-blue-50 border-blue-200' : 'bg-muted/50'}`, children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(AlertIcon, { className: `h-5 w-5 mt-1 ${alert.severity === 'critical' ? 'text-red-500' :
                                                alert.severity === 'urgent' ? 'text-orange-500' : 'text-blue-500'}` }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "font-semibold text-sm", children: alert.title }), _jsx(Badge, { className: `${getSeverityColor(alert.severity)} text-white text-xs`, children: alert.severity }), alert.actionRequired && (_jsx(Badge, { variant: "outline", className: "text-xs", children: "Action Required" }))] }), _jsx("p", { className: "text-sm text-muted-foreground mb-2", children: alert.message }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { children: getTimeAgo(alert.timestamp) }), alert.expiresAt && (_jsxs("span", { children: ["\u2022 Expires: ", alert.expiresAt.toLocaleDateString()] }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [!alert.read && (_jsx(Button, { size: "sm", variant: "outline", onClick: () => markAsRead(alert.id), children: "Mark Read" })), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => dismissAlert(alert.id), children: _jsx(X, { className: "h-3 w-3" }) })] })] })] })] }) }, alert.id));
                        })) }), _jsxs(Alert, { className: "border-blue-200 bg-blue-50", children: [_jsx(Shield, { className: "h-4 w-4 text-blue-500" }), _jsxs(AlertDescription, { children: [_jsx("strong", { children: "Clark County EMS System:" }), " Connected to real-time protocol updates and certification tracking. Location: ", location || "Las Vegas, Nevada"] })] })] })] }));
}
