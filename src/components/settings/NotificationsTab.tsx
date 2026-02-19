"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bell, Mail, Smartphone, MessageSquare } from "lucide-react";
import { ToggleSwitch } from "@/components/settings/ToggleSwitch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  channels: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

const initialNotifications: NotificationSetting[] = [
  {
    id: "new-lead",
    title: "Nouveau lead entrant",
    description: "Recevez une alerte quand un nouveau lead est cree dans le CRM.",
    enabled: true,
    channels: { email: true, push: true, sms: false },
  },
  {
    id: "assigned-lead",
    title: "Lead assigne a moi",
    description: "Notification quand un lead vous est attribue par un collegue.",
    enabled: true,
    channels: { email: true, push: true, sms: false },
  },
  {
    id: "unread-inbox",
    title: "Message inbox non lu",
    description: "Alerte pour les messages non lus depuis plus de 2 heures.",
    enabled: true,
    channels: { email: true, push: true, sms: false },
  },
  {
    id: "stale-lead",
    title: "Lead inactif (stale)",
    description: "Rappel quand un lead n'a pas ete contacte depuis 7 jours.",
    enabled: true,
    channels: { email: true, push: false, sms: false },
  },
  {
    id: "score-change",
    title: "Score lead change",
    description: "Notification quand le score d'un lead augmente ou baisse significativement.",
    enabled: false,
    channels: { email: false, push: false, sms: false },
  },
  {
    id: "daily-digest",
    title: "Resume quotidien",
    description: "Recevez un resume chaque matin avec les KPIs de la veille.",
    enabled: false,
    channels: { email: false, push: false, sms: false },
  },
];

const channelConfig = [
  { key: "email" as const, label: "Email", icon: Mail },
  { key: "push" as const, label: "Push", icon: Smartphone },
  { key: "sms" as const, label: "SMS", icon: MessageSquare },
];

export function NotificationsTab() {
  const [notifications, setNotifications] = useState<NotificationSetting[]>(initialNotifications);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const newEnabled = !n.enabled;
          toast.success(
            newEnabled ? "Notification activee" : "Notification desactivee",
            { description: n.title }
          );
          return {
            ...n,
            enabled: newEnabled,
            channels: newEnabled ? n.channels : { email: false, push: false, sms: false },
          };
        }
        return n;
      })
    );
  };

  const toggleChannel = (notifId: string, channel: "email" | "push" | "sms") => {
    setNotifications((prev) =>
      prev.map((n) => {
        if (n.id === notifId && n.enabled) {
          return {
            ...n,
            channels: { ...n.channels, [channel]: !n.channels[channel] },
          };
        }
        return n;
      })
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="size-5 text-primary" />
            Preferences de notifications
          </CardTitle>
          <CardDescription>
            Choisissez quelles alertes recevoir et par quel canal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {notifications.map((notif, index) => (
            <div key={notif.id}>
              <div className="flex items-start justify-between gap-4 py-4">
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="space-y-0.5">
                      <p className={cn(
                        "text-sm font-medium",
                        notif.enabled ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {notif.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notif.description}
                      </p>
                    </div>
                  </div>
                  {/* Channel checkboxes */}
                  <div className="flex items-center gap-4 pl-0.5 pt-1">
                    {channelConfig.map(({ key, label, icon: Icon }) => (
                      <label
                        key={key}
                        className={cn(
                          "flex cursor-pointer items-center gap-1.5 text-xs transition-colors",
                          notif.enabled
                            ? "text-muted-foreground hover:text-foreground"
                            : "pointer-events-none text-muted-foreground/40"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={notif.channels[key]}
                          onChange={() => toggleChannel(notif.id, key)}
                          disabled={!notif.enabled}
                          className="size-3.5 rounded border-input accent-primary"
                          aria-label={`${label} pour ${notif.title}`}
                        />
                        <Icon className="size-3" />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 pt-0.5">
                  <ToggleSwitch
                    enabled={notif.enabled}
                    onToggle={() => toggleNotification(notif.id)}
                    label={`Activer ${notif.title}`}
                  />
                </div>
              </div>
              {index < notifications.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
