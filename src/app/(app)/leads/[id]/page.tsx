"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Building2,
  Calendar,
  Globe,
  StickyNote,
  User,
  Hash,
  RefreshCw,
  MessageSquare,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  mockLeads,
  mockActivities,
  pipelineStages,
  sourceLabels,
  commercialUsers,
} from "@/lib/mock-data";
import { LeadScoreBadge, getScoreColor, getScoreLabel, getScoreLabelColor } from "@/components/leads/LeadScoreBadge";
import { LeadSourceIcon } from "@/components/leads/LeadSourceIcon";
import { LeadStageBadge, PipelineProgress } from "@/components/leads/LeadStageBadge";
import { LeadStatusBadge } from "@/components/leads/LeadStatusBadge";
import { ActivityTimeline } from "@/components/leads/ActivityTimeline";
import { cn } from "@/lib/utils";

function getAvatarGradient(name: string): string {
  const gradients = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-blue-500",
    "from-amber-500 to-orange-500",
    "from-teal-500 to-emerald-500",
  ];
  const index = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % gradients.length;
  return gradients[index];
}

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const leadIndex = mockLeads.findIndex((l) => l.id === id);
  const lead = leadIndex !== -1 ? mockLeads[leadIndex] : null;

  const prevLead = leadIndex > 0 ? mockLeads[leadIndex - 1] : null;
  const nextLead = leadIndex < mockLeads.length - 1 ? mockLeads[leadIndex + 1] : null;

  const leadActivities = useMemo(
    () =>
      lead
        ? mockActivities.filter((a) => a.lead_id === lead.id)
        : [],
    [lead]
  );

  const assignedUser = lead?.assigned_to
    ? commercialUsers.find((u) => u.id === lead.assigned_to) ?? null
    : null;

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <User className="h-7 w-7 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">Lead introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Le lead avec l&apos;identifiant &quot;{id}&quot; n&apos;existe pas.
        </p>
        <Link href="/leads" className="mt-6">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4" />
            Retour aux leads
          </Button>
        </Link>
      </div>
    );
  }

  const fullName = `${lead.first_name} ${lead.last_name}`;
  const initials = `${lead.first_name.charAt(0)}${lead.last_name.charAt(0)}`.toUpperCase();

  return (
    <div className="space-y-6">
      {/* Navigation bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/leads">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
              Leads
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-5" />
          <span className="text-sm text-muted-foreground">{fullName}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-xs"
            disabled={!prevLead}
            onClick={() => prevLead && router.push(`/leads/${prevLead.id}`)}
            aria-label="Lead precedent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-xs"
            disabled={!nextLead}
            onClick={() => nextLead && router.push(`/leads/${nextLead.id}`)}
            aria-label="Lead suivant"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column - 2/3 */}
        <div className="space-y-6 lg:col-span-2">
          {/* Lead info card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                {/* Avatar */}
                <Avatar className="h-16 w-16 shrink-0">
                  <AvatarFallback
                    className={cn(
                      "bg-gradient-to-br text-lg font-bold text-white",
                      getAvatarGradient(fullName)
                    )}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                  {/* Name + badges */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold">{fullName}</h2>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] font-semibold uppercase tracking-wider",
                          lead.lead_type === "b2b"
                            ? "border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                            : "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
                        )}
                      >
                        {lead.lead_type.toUpperCase()}
                      </Badge>
                      <LeadStatusBadge status={lead.status} showIcon />
                    </div>
                    {lead.company && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {lead.company}
                      </p>
                    )}
                  </div>

                  {/* Contact details */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-2 rounded-md p-2 text-sm transition-colors hover:bg-accent"
                      >
                        <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="truncate text-primary underline-offset-4 hover:underline">
                          {lead.email}
                        </span>
                      </a>
                    )}
                    {lead.phone && (
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-2 rounded-md p-2 text-sm transition-colors hover:bg-accent"
                      >
                        <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="text-primary underline-offset-4 hover:underline">
                          {lead.phone}
                        </span>
                      </a>
                    )}
                    <div className="flex items-center gap-2 p-2 text-sm">
                      <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>{lead.company ?? "Particulier"}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 text-sm">
                      <Hash className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>
                        {lead.nb_properties} bien{lead.nb_properties > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-2 text-sm">
                      <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <LeadSourceIcon source={lead.source} size="md" />
                    </div>
                    <div className="flex items-center gap-2 p-2 text-sm">
                      <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>
                        Cree{" "}
                        {format(new Date(lead.created_at), "d MMMM yyyy", {
                          locale: fr,
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Notes */}
                  {lead.notes && (
                    <>
                      <Separator />
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          <StickyNote className="h-3 w-3" />
                          Notes
                        </div>
                        <p className="text-sm leading-relaxed text-foreground/80">
                          {lead.notes}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageSquare className="h-4 w-4" />
                Historique des activites
                {leadActivities.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {leadActivities.length}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityTimeline activities={leadActivities} />
            </CardContent>
          </Card>
        </div>

        {/* Right column - 1/3 */}
        <div className="space-y-6">
          {/* Score card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Score du lead</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <LeadScoreBadge score={lead.score} size="lg" />
                <p className="mt-3 text-xs text-muted-foreground text-center">
                  Derniere mise a jour:{" "}
                  {formatDistanceToNow(new Date(lead.updated_at), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pipeline stage card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Etape du pipeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <LeadStageBadge stage={lead.pipeline_stage} size="md" />
              <Separator />
              <PipelineProgress
                currentStage={lead.pipeline_stage}
                stages={pipelineStages}
              />
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lead.email && (
                <Button className="w-full justify-start" size="sm" asChild>
                  <a href={`mailto:${lead.email}`}>
                    <Mail className="h-4 w-4" />
                    Envoyer un email
                  </a>
                </Button>
              )}
              {lead.phone && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                  asChild
                >
                  <a href={`tel:${lead.phone}`}>
                    <Phone className="h-4 w-4" />
                    Appeler
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                <StickyNote className="h-4 w-4" />
                Ajouter une note
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                <RefreshCw className="h-4 w-4" />
                Changer l&apos;etape
              </Button>
            </CardContent>
          </Card>

          {/* Assignment card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Assignation</CardTitle>
            </CardHeader>
            <CardContent>
              {assignedUser ? (
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {assignedUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{assignedUser.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {assignedUser.role}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-4 text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Non assigne</p>
                  <Button variant="outline" size="xs" className="mt-3">
                    Assigner
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
