"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Users, UserPlus, Shield, Eye, Pencil } from "lucide-react";
import { commercialUsers } from "@/lib/mock-data";
import { toast } from "sonner";

const roleDescriptions: Record<string, string> = {
  Chasseur: "Prospection, qualification et closing de nouveaux clients.",
  Architecte: "Demos techniques, onboarding et accompagnement client.",
};

const roleColors: Record<string, string> = {
  Chasseur: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Architecte: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

const permissions = [
  {
    role: "Chasseur",
    icon: Eye,
    capabilities: [
      "Voir et editer les leads assignes",
      "Envoyer des messages depuis l'inbox",
      "Acceder au pipeline B2B et B2C",
      "Voir le dashboard personnel",
    ],
  },
  {
    role: "Architecte",
    icon: Pencil,
    capabilities: [
      "Voir et editer tous les leads",
      "Planifier et realiser des demos",
      "Gerer les templates de messages",
      "Acceder aux rapports et analytics",
    ],
  },
];

export function TeamTab() {
  return (
    <div className="space-y-6">
      {/* Team members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="size-5 text-primary" />
            Membres de l&apos;equipe
          </CardTitle>
          <CardDescription>
            Votre equipe commerciale CheckEasy.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {commercialUsers.map((user) => {
            const initials = user.name
              .split(" ")
              .map((n) => n.charAt(0))
              .join("")
              .toUpperCase();

            return (
              <div
                key={user.id}
                className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-accent/30"
              >
                <div className="relative">
                  <Avatar size="lg">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online status dot */}
                  <span
                    className="absolute bottom-0 right-0 block size-3 rounded-full border-2 border-card bg-emerald-500"
                    aria-label="En ligne"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      {user.name}
                    </p>
                    <span className="flex size-2 rounded-full bg-emerald-500" aria-hidden="true" />
                    <span className="text-xs text-emerald-600 dark:text-emerald-400">
                      En ligne
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {roleDescriptions[user.role] || user.role}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className={roleColors[user.role] || ""}
                >
                  {user.role}
                </Badge>
              </div>
            );
          })}

          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => {
                toast.success("Invitation envoyee", {
                  description: "Un lien d'invitation a ete copie dans le presse-papier.",
                });
              }}
            >
              <UserPlus className="size-4" />
              Inviter un membre
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Role permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="size-5 text-primary" />
            Permissions par role
          </CardTitle>
          <CardDescription>
            Chaque role dispose d&apos;un ensemble de permissions specifiques.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {permissions.map((perm, index) => {
            const Icon = perm.icon;
            return (
              <div key={perm.role}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-muted-foreground" />
                    <p className="text-sm font-semibold text-foreground">{perm.role}</p>
                  </div>
                  <ul className="space-y-1 pl-6">
                    {perm.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <span className="flex size-1.5 shrink-0 rounded-full bg-primary/60" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
                {index < permissions.length - 1 && <Separator className="mt-4" />}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
