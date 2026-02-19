"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Puzzle,
  Database,
  Home,
  Calendar,
  MessageSquare,
  Phone,
  Check,
  ExternalLink,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type IntegrationStatus = "connected" | "available" | "not_connected" | "coming_soon";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: IntegrationStatus;
}

const integrations: Integration[] = [
  {
    id: "supabase",
    name: "Supabase",
    description: "Base de donnees, authentification et stockage temps reel.",
    icon: Database,
    status: "connected",
  },
  {
    id: "lodgify",
    name: "Lodgify PMS",
    description: "Synchronisation des biens et reservations depuis Lodgify.",
    icon: Home,
    status: "available",
  },
  {
    id: "airbnb",
    name: "Airbnb Calendar",
    description: "Import automatique du calendrier de reservations Airbnb.",
    icon: Calendar,
    status: "available",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Notifications et alertes directement dans vos canaux Slack.",
    icon: MessageSquare,
    status: "not_connected",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Envoi de messages automatises aux leads via WhatsApp.",
    icon: Phone,
    status: "coming_soon",
  },
];

const statusConfig: Record<
  IntegrationStatus,
  { label: string; className: string; dotColor: string }
> = {
  connected: {
    label: "Connecte",
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    dotColor: "bg-emerald-500",
  },
  available: {
    label: "Disponible",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    dotColor: "bg-blue-500",
  },
  not_connected: {
    label: "Non connecte",
    className: "bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400",
    dotColor: "bg-gray-400",
  },
  coming_soon: {
    label: "Bientot",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    dotColor: "bg-amber-500",
  },
};

const buttonConfig: Record<
  IntegrationStatus,
  { label: string; variant: "default" | "outline" | "secondary" | "ghost"; disabled: boolean }
> = {
  connected: { label: "Configurer", variant: "outline", disabled: false },
  available: { label: "Connecter", variant: "default", disabled: false },
  not_connected: { label: "Connecter", variant: "outline", disabled: false },
  coming_soon: { label: "Bientot", variant: "ghost", disabled: true },
};

export function IntegrationsTab() {
  const handleAction = (integration: Integration) => {
    if (integration.status === "connected") {
      toast.success("Configuration ouverte", {
        description: `Parametres de ${integration.name} en cours de chargement.`,
      });
    } else if (integration.status === "available" || integration.status === "not_connected") {
      toast.success("Connexion initiee", {
        description: `Redirection vers l'authentification ${integration.name}...`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Puzzle className="size-5 text-primary" />
            Integrations
          </CardTitle>
          <CardDescription>
            Connectez vos outils pour automatiser votre workflow.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            const status = statusConfig[integration.status];
            const button = buttonConfig[integration.status];

            return (
              <div
                key={integration.id}
                className={cn(
                  "flex items-center gap-4 rounded-lg border border-border p-4 transition-colors",
                  integration.status === "coming_soon"
                    ? "opacity-70"
                    : "hover:bg-accent/30"
                )}
              >
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-lg",
                    integration.status === "connected"
                      ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      {integration.name}
                    </p>
                    <Badge
                      variant="secondary"
                      className={cn("gap-1 text-[10px]", status.className)}
                    >
                      <span className={cn("size-1.5 rounded-full", status.dotColor)} />
                      {status.label}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {integration.description}
                  </p>
                </div>

                <Button
                  variant={button.variant}
                  size="sm"
                  disabled={button.disabled}
                  onClick={() => handleAction(integration)}
                  className="shrink-0 gap-1.5"
                >
                  {integration.status === "connected" && <Check className="size-3.5" />}
                  {integration.status === "coming_soon" && <Clock className="size-3.5" />}
                  {(integration.status === "available" || integration.status === "not_connected") && (
                    <ExternalLink className="size-3.5" />
                  )}
                  {button.label}
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
