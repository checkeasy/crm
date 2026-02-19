"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Linkedin,
  Globe,
  CheckCircle,
  Clock,
  UserPlus,
  ArrowLeft,
  Home,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";
import { ComposeReply } from "./ComposeReply";
import type { InboxMessage, Lead, Template, MessageStatus } from "@/lib/types/database";
import { cn } from "@/lib/utils";

function getChannelIcon(channel: string, className = "h-4 w-4") {
  switch (channel) {
    case "email":
      return <Mail className={className} />;
    case "linkedin":
      return <Linkedin className={className} />;
    case "phone":
      return <Phone className={className} />;
    case "form":
      return <Globe className={className} />;
    default:
      return <MessageSquare className={className} />;
  }
}

function getChannelLabel(channel: string): string {
  const labels: Record<string, string> = {
    email: "Email",
    linkedin: "LinkedIn",
    phone: "Telephone",
    form: "Formulaire",
    other: "Autre",
  };
  return labels[channel] ?? channel;
}

interface MessageDetailProps {
  message: InboxMessage & { lead?: Lead };
  templates: Template[];
  allMessages: (InboxMessage & { lead?: Lead })[];
  onStatusChange: (messageId: string, status: MessageStatus) => void;
  onBack?: () => void;
}

export function MessageDetail({
  message,
  templates,
  allMessages,
  onStatusChange,
  onBack,
}: MessageDetailProps) {
  const lead = message.lead;

  const conversationHistory = lead
    ? allMessages
        .filter((m) => m.lead_id === lead.id)
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
    : [message];

  return (
    <div className="flex flex-col h-full gap-0">
      {/* Header */}
      <div className="flex items-start gap-2 pb-3 border-b border-border">
        {/* Back button — visible only on mobile */}
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden shrink-0 min-h-[44px] min-w-[44px] -ml-2 mt-0.5"
            onClick={onBack}
            aria-label="Retour a la liste"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        <div className="flex-1 min-w-0">
          {/* Channel + direction indicator */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              {getChannelIcon(message.channel, "h-3.5 w-3.5")}
              {getChannelLabel(message.channel)}
            </span>
            <span className="text-muted-foreground/40">&middot;</span>
            <span className="inline-flex items-center gap-0.5 text-xs text-muted-foreground">
              {message.direction === "outbound" ? (
                <>
                  <ArrowUpRight className="h-3 w-3 text-blue-500" />
                  Envoye
                </>
              ) : (
                <>
                  <ArrowDownLeft className="h-3 w-3 text-emerald-500" />
                  Recu
                </>
              )}
            </span>
          </div>
          <h3 className="font-semibold text-base leading-snug truncate">
            {message.subject ?? "(sans objet)"}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {format(new Date(message.created_at), "d MMMM yyyy 'a' HH:mm", {
              locale: fr,
            })}
          </p>
        </div>

        {/* Action buttons — wrap on mobile */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          {message.status !== "in_progress" && (
            <Button
              variant="outline"
              size="sm"
              className="min-h-[36px] h-auto"
              onClick={() => onStatusChange(message.id, "in_progress")}
            >
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline ml-1.5">En cours</span>
            </Button>
          )}
          {message.status !== "done" && (
            <Button
              variant="outline"
              size="sm"
              className="min-h-[36px] h-auto"
              onClick={() => onStatusChange(message.id, "done")}
            >
              <CheckCircle className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline ml-1.5">Traite</span>
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="min-h-[36px] h-auto">
                <UserPlus className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden sm:inline ml-1.5">Assigner</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Assigner a</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="min-h-[36px]">
                Jean Dupont (Chasseur)
              </DropdownMenuItem>
              <DropdownMenuItem className="min-h-[36px]">
                Marc Lefevre (Architecte)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Lead info card */}
      {lead && (
        <Card className="mt-3 border-border/70">
          <CardContent className="p-3">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-primary">
                  {lead.first_name[0]}
                  {lead.last_name[0]}
                </span>
              </div>

              {/* Name + badges */}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm leading-snug">
                  {lead.first_name} {lead.last_name}
                </p>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <Badge
                    variant={lead.lead_type === "b2b" ? "default" : "secondary"}
                    className="text-[10px] px-1.5 h-4"
                  >
                    {lead.lead_type.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 h-4">
                    Score {lead.score}
                  </Badge>
                </div>
              </div>

              {/* Contact details */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Home className="h-3.5 w-3.5 shrink-0" />
                  {lead.nb_properties} bien{lead.nb_properties > 1 ? "s" : ""}
                </span>
                {lead.company && (
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate max-w-[140px]">{lead.company}</span>
                  </span>
                )}
                {lead.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate max-w-[160px]">{lead.email}</span>
                  </span>
                )}
                {lead.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    {lead.phone}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conversation history */}
      <div className="flex-1 overflow-y-auto mt-4 space-y-3 min-h-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Historique &middot; {conversationHistory.length} message
          {conversationHistory.length > 1 ? "s" : ""}
        </p>
        {conversationHistory.map((msg) => {
          const isOutbound = msg.direction === "outbound";
          return (
            <div
              key={msg.id}
              className={cn(
                "rounded-xl border p-3 text-sm",
                isOutbound
                  ? "bg-primary/5 border-primary/15 ml-4 sm:ml-8"
                  : "bg-card border-border mr-4 sm:mr-8"
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold flex items-center gap-1.5">
                  {isOutbound ? (
                    <>
                      <ArrowUpRight className="h-3 w-3 text-blue-500" />
                      Vous
                    </>
                  ) : (
                    <>
                      <ArrowDownLeft className="h-3 w-3 text-emerald-500" />
                      {lead
                        ? `${lead.first_name} ${lead.last_name}`
                        : "Contact"}
                    </>
                  )}
                </span>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                  {formatDistanceToNow(new Date(msg.created_at), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </span>
              </div>
              <p className="text-sm whitespace-pre-line leading-relaxed text-foreground/90">
                {msg.content}
              </p>
            </div>
          );
        })}
      </div>

      <Separator className="my-3" />

      {/* Reply area */}
      <ComposeReply templates={templates} lead={lead} />
    </div>
  );
}
