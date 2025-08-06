import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, AlertTriangle, Info, Clock, FileText, Shield, Pill, BookOpen, Settings, X } from "lucide-react";
export default function RealTimeAlertSystem({ open, onOpenChange }) {
    const [alerts, setAlerts] = useState([]);
    const [settings, setSettings] = useState({
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
        const mockAlerts = [
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
    const getAlertIcon = (type) => {
        switch (type) {
            case 'protocol':
                return _jsx(FileText, { className: "h-4 w-4" });
            case 'certification':
                return _jsx(Shield, { className: "h-4 w-4" });
            case 'medication':
                return _jsx(Pill, { className: "h-4 w-4" });
            case 'training':
                return _jsx(BookOpen, { className: "h-4 w-4" });
            case 'system':
                return _jsx(Settings, { className: "h-4 w-4" });
            default:
                return _jsx(Info, { className: "h-4 w-4" });
        }
    };
    const getPriorityBadge = (priority) => {
        switch (priority) {
            case 'high':
                return _jsx(Badge, { variant: "destructive", children: "High" });
            case 'medium':
                return _jsx(Badge, { variant: "secondary", className: "bg-yellow-100 text-yellow-800", children: "Medium" });
            case 'low':
                return _jsx(Badge, { variant: "outline", children: "Low" });
            default:
                return _jsx(Badge, { variant: "outline", children: "Unknown" });
        }
    };
    const markAsRead = (alertId) => {
        setAlerts(alerts.map(alert => alert.id === alertId ? { ...alert, read: true } : alert));
    };
    const dismissAlert = (alertId) => {
        setAlerts(alerts.filter(alert => alert.id !== alertId));
    };
    const updateSettings = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };
    const unreadCount = alerts.filter(alert => !alert.read).length;
    const highPriorityCount = alerts.filter(alert => alert.priority === 'high' && !alert.read).length;
    const filteredAlerts = alerts.filter(alert => {
        if (!settings.roleBasedFiltering)
            return true;
        // Role-based filtering logic (simplified)
        // In real app, this would check user's role (EMT, AEMT, Paramedic)
        return true;
    });
    const formatTimeAgo = (date) => {
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`;
        }
        else if (diffInMinutes < 1440) {
            return `${Math.floor(diffInMinutes / 60)}h ago`;
        }
        else {
            return `${Math.floor(diffInMinutes / 1440)}d ago`;
        }
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Bell, { className: "h-5 w-5 text-blue-600" }), "Real-Time Alert System", unreadCount > 0 && (_jsxs(Badge, { variant: "destructive", className: "ml-2", children: [unreadCount, " new"] }))] }) }), _jsxs(Tabs, { defaultValue: "alerts", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsxs(TabsTrigger, { value: "alerts", children: ["Active Alerts", highPriorityCount > 0 && (_jsx(Badge, { variant: "destructive", className: "ml-2 text-xs", children: highPriorityCount }))] }), _jsx(TabsTrigger, { value: "settings", children: "Alert Settings" })] }), _jsxs(TabsContent, { value: "alerts", className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-red-600" }), "High Priority"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "text-2xl font-bold text-red-600", children: alerts.filter(a => a.priority === 'high').length }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [_jsx(Bell, { className: "h-4 w-4 text-blue-600" }), "Unread"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "text-2xl font-bold text-blue-600", children: unreadCount }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [_jsx(Clock, { className: "h-4 w-4 text-green-600" }), "Action Required"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "text-2xl font-bold text-green-600", children: alerts.filter(a => a.actionRequired).length }) })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Recent Alerts" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: filteredAlerts.length === 0 ? (_jsx("div", { className: "text-center py-8 text-gray-500", children: "No alerts at this time" })) : (filteredAlerts.map((alert) => (_jsx("div", { className: `border rounded-lg p-4 ${!alert.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`, children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-3 flex-1", children: [_jsx("div", { className: "mt-1", children: getAlertIcon(alert.type) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "font-medium", children: alert.title }), getPriorityBadge(alert.priority), alert.actionRequired && (_jsx(Badge, { variant: "outline", className: "text-xs", children: "Action Required" }))] }), _jsx("p", { className: "text-sm text-gray-600 mb-2", children: alert.message }), _jsxs("div", { className: "flex items-center gap-4 text-xs text-gray-500", children: [_jsx("span", { children: formatTimeAgo(alert.timestamp) }), alert.relatedTo && (_jsxs("span", { children: ["Related to: ", alert.relatedTo] })), alert.expirationDate && (_jsxs("span", { children: ["Expires: ", alert.expirationDate.toLocaleDateString()] }))] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [!alert.read && (_jsx(Button, { size: "sm", variant: "outline", onClick: () => markAsRead(alert.id), children: "Mark Read" })), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => dismissAlert(alert.id), children: _jsx(X, { className: "h-4 w-4" }) })] })] }) }, alert.id)))) }) })] })] }), _jsx(TabsContent, { value: "settings", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Alert Preferences" }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "protocol-updates", children: "Protocol Updates" }), _jsx("p", { className: "text-sm text-gray-600", children: "Get notified when Clark County protocols are updated" })] }), _jsx(Switch, { id: "protocol-updates", checked: settings.protocolUpdates, onCheckedChange: (checked) => updateSettings('protocolUpdates', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "certification-reminders", children: "Certification Reminders" }), _jsx("p", { className: "text-sm text-gray-600", children: "Reminders for certification renewals and training" })] }), _jsx(Switch, { id: "certification-reminders", checked: settings.certificationReminders, onCheckedChange: (checked) => updateSettings('certificationReminders', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "medication-recalls", children: "Medication Recalls" }), _jsx("p", { className: "text-sm text-gray-600", children: "Critical alerts for medication recalls and safety issues" })] }), _jsx(Switch, { id: "medication-recalls", checked: settings.medicationRecalls, onCheckedChange: (checked) => updateSettings('medicationRecalls', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "training-reminders", children: "Training Reminders" }), _jsx("p", { className: "text-sm text-gray-600", children: "Notifications for new learning modules and training" })] }), _jsx(Switch, { id: "training-reminders", checked: settings.trainingReminders, onCheckedChange: (checked) => updateSettings('trainingReminders', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "system-notifications", children: "System Notifications" }), _jsx("p", { className: "text-sm text-gray-600", children: "Maintenance, updates, and system status alerts" })] }), _jsx(Switch, { id: "system-notifications", checked: settings.systemNotifications, onCheckedChange: (checked) => updateSettings('systemNotifications', checked) })] })] }), _jsxs("div", { className: "border-t pt-4", children: [_jsx("h4", { className: "font-medium mb-4", children: "Delivery Preferences" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "push-notifications", children: "Push Notifications" }), _jsx("p", { className: "text-sm text-gray-600", children: "Receive alerts directly in the app" })] }), _jsx(Switch, { id: "push-notifications", checked: settings.pushNotifications, onCheckedChange: (checked) => updateSettings('pushNotifications', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "email-notifications", children: "Email Notifications" }), _jsx("p", { className: "text-sm text-gray-600", children: "Send alerts to your email address" })] }), _jsx(Switch, { id: "email-notifications", checked: settings.emailNotifications, onCheckedChange: (checked) => updateSettings('emailNotifications', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "role-based-filtering", children: "Role-Based Filtering" }), _jsx("p", { className: "text-sm text-gray-600", children: "Only show alerts relevant to your certification level" })] }), _jsx(Switch, { id: "role-based-filtering", checked: settings.roleBasedFiltering, onCheckedChange: (checked) => updateSettings('roleBasedFiltering', checked) })] })] })] })] })] }) })] })] }) }));
}
