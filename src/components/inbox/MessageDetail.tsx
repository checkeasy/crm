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
  User,
  CheckCircle,
  Clock,
  UserPlus,
  ArrowLeft,
  Home,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";
import { ComposeReply } from "./ComposeReply";
import type { InboxMessage, Lead, Template, MessageStatus } from "@/lib/types/database";

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

  // Get conversation history for this lead
  const conversationHistory = lead
    ? allMessages
        .filter((m) => m.lead_id === lead.id)
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    : [message];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start gap-3 pb-4 border-b border-border">
        {onBack && (
          <Button variant="ghost" size="icon" className="md:hidden shrink-0" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base truncate">{message.subject ?? "(sans objet)"}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {format(new Date(message.created_at), "d MMMM yyyy 'a' HH:mm", { locale: fr })}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Status actions */}
          {message.status !== "in_progress" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange(message.id, "in_progress")}
            >
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              En cours
            </Button>
          )}
          {message.status !== "done" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange(message.id, "done")}
            >
              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
              Traite
            </Button>
          )}
          {/* Assign */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                Assigner
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Assigner a</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Jean Dupont (Chasseur)</DropdownMenuItem>
              <DropdownMenuItem>Marc Lefevre (Architecte)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Lead info card */}
      {lead && (
        <Card className="mt-4 py-3">
          <CardContent className="flex items-center gap-4 flex-wrap">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-medium text-primary">
                {lead.first_name[0]}{lead.last_name[0]}
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-medium text-sm">
                {lead.first_name} {lead.last_name}
              </p>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <Badge variant={lead.lead_type === "b2b" ? "default" : "secondary"} className="text-[10px]">
                  {lead.lead_type.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="text-[10px]">Score: {lead.score}</Badge>
                {lead.pipeline_stage_id && (
                  <Badge variant="outline" className="text-[10px]">
                    Etape: {lead.pipeline_stage_id}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Home className="h-3.5 w-3.5" />
              {lead.nb_properties} bien{lead.nb_properties > 1 ? "s" : ""}
            </div>
            {lead.company && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                {lead.company}
              </div>
            )}
            {lead.email && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                {lead.email}
              </div>
            )}
            {lead.phone && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                {lead.phone}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Conversation history */}
      <div className="flex-1 overflow-y-auto mt-4 space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
          <User className="h-4 w-4" />
          Historique ({conversationHistory.length} message{conversationHistory.length > 1 ? "s" : ""})
        </h4>
        {conversationHistory.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-lg border p-3 ${
              msg.direction === "outbound"
                ? "bg-primary/5 border-primary/10 ml-6"
                : "bg-card border-border mr-6"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium">
                {msg.direction === "outbound" ? "Vous" : (lead ? `${lead.first_name} ${lead.last_name}` : "Contact")}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true, locale: fr })}
              </span>
            </div>
            <p className="text-sm whitespace-pre-line">{msg.content}</p>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      {/* Reply area */}
      <ComposeReply templates={templates} lead={lead} />
    </div>
  );
}
