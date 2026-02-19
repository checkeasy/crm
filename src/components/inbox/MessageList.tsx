"use client";

import { useState } from "react";
import { Mail, MessageSquare, Linkedin, Phone, Globe, ArrowUpRight, ArrowDownLeft, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import type { InboxMessage, Lead } from "@/lib/types/database";

function getChannelIcon(channel: string) {
  switch (channel) {
    case "email": return <Mail className="h-4 w-4" />;
    case "linkedin": return <Linkedin className="h-4 w-4" />;
    case "phone": return <Phone className="h-4 w-4" />;
    case "form": return <Globe className="h-4 w-4" />;
    default: return <MessageSquare className="h-4 w-4" />;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "unread":
      return <Badge variant="default" className="text-[10px] px-1.5 py-0">Non lu</Badge>;
    case "in_progress":
      return <Badge variant="secondary" className="text-[10px] px-1.5 py-0">En cours</Badge>;
    default:
      return <Badge variant="outline" className="text-[10px] px-1.5 py-0">Traite</Badge>;
  }
}

interface MessageListProps {
  messages: (InboxMessage & { lead?: Lead })[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function MessageList({ messages, selectedId, onSelect }: MessageListProps) {
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? messages.filter((msg) => {
        const q = search.toLowerCase();
        return (
          (msg.subject ?? "").toLowerCase().includes(q) ||
          msg.content.toLowerCase().includes(q) ||
          (msg.lead?.first_name ?? "").toLowerCase().includes(q) ||
          (msg.lead?.last_name ?? "").toLowerCase().includes(q) ||
          (msg.lead?.company ?? "").toLowerCase().includes(q)
        );
      })
    : messages;

  return (
    <div className="space-y-2">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8 h-8 text-sm"
        />
      </div>

      {/* Messages */}
      <div className="space-y-1">
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-6">Aucun resultat</p>
        )}
        {filtered.map((msg) => {
          const isSelected = selectedId === msg.id;
          const isUnread = msg.status === "unread";
          const timeAgo = formatDistanceToNow(new Date(msg.created_at), { addSuffix: true, locale: fr });

          return (
            <button
              key={msg.id}
              onClick={() => onSelect(msg.id)}
              className={cn(
                "w-full text-left p-3 rounded-lg border transition-colors",
                isSelected
                  ? "bg-primary/5 border-primary/20 ring-1 ring-primary/10"
                  : "border-transparent hover:bg-accent/50",
                isUnread && !isSelected && "bg-accent/30"
              )}
            >
              <div className="flex items-start gap-2.5">
                {/* Blue dot for unread */}
                <div className="mt-1.5 shrink-0 w-2">
                  {isUnread && (
                    <span className="block w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>

                {/* Channel icon + direction */}
                <div className="mt-0.5 text-muted-foreground shrink-0 relative">
                  {getChannelIcon(msg.channel)}
                  {msg.direction === "outbound" ? (
                    <ArrowUpRight className="h-2.5 w-2.5 absolute -bottom-0.5 -right-0.5 text-blue-500" />
                  ) : (
                    <ArrowDownLeft className="h-2.5 w-2.5 absolute -bottom-0.5 -right-0.5 text-emerald-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Subject */}
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={cn("text-sm truncate", isUnread ? "font-semibold" : "font-medium")}>
                      {msg.subject ?? "(sans objet)"}
                    </span>
                  </div>

                  {/* Lead name + company */}
                  {msg.lead && (
                    <p className="text-xs text-muted-foreground truncate">
                      {msg.lead.first_name} {msg.lead.last_name}
                      {msg.lead.company && ` - ${msg.lead.company}`}
                    </p>
                  )}

                  {/* Preview */}
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {msg.content.split("\n")[0]}
                  </p>
                </div>

                {/* Time + status */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    {timeAgo}
                  </span>
                  {getStatusBadge(msg.status)}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
