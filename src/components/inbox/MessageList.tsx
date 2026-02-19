"use client";

import { useState } from "react";
import {
  Mail,
  MessageSquare,
  Linkedin,
  Phone,
  Globe,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import type { InboxMessage, Lead } from "@/lib/types/database";

interface ChannelConfig {
  icon: React.ReactNode;
  label: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

function getChannelConfig(channel: string): ChannelConfig {
  switch (channel) {
    case "email":
      return {
        icon: <Mail className="h-3.5 w-3.5" />,
        label: "Email",
        bgClass: "bg-blue-50 dark:bg-blue-950/40",
        textClass: "text-blue-600 dark:text-blue-400",
        borderClass: "border-blue-200 dark:border-blue-800",
      };
    case "linkedin":
      return {
        icon: <Linkedin className="h-3.5 w-3.5" />,
        label: "LinkedIn",
        bgClass: "bg-sky-50 dark:bg-sky-950/40",
        textClass: "text-sky-600 dark:text-sky-400",
        borderClass: "border-sky-200 dark:border-sky-800",
      };
    case "phone":
      return {
        icon: <Phone className="h-3.5 w-3.5" />,
        label: "Tel",
        bgClass: "bg-green-50 dark:bg-green-950/40",
        textClass: "text-green-600 dark:text-green-400",
        borderClass: "border-green-200 dark:border-green-800",
      };
    case "form":
      return {
        icon: <Globe className="h-3.5 w-3.5" />,
        label: "Form",
        bgClass: "bg-violet-50 dark:bg-violet-950/40",
        textClass: "text-violet-600 dark:text-violet-400",
        borderClass: "border-violet-200 dark:border-violet-800",
      };
    default:
      return {
        icon: <MessageSquare className="h-3.5 w-3.5" />,
        label: "Msg",
        bgClass: "bg-muted",
        textClass: "text-muted-foreground",
        borderClass: "border-border",
      };
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "unread":
      return (
        <Badge
          variant="default"
          className="text-[10px] px-1.5 py-0 h-4 rounded-full"
        >
          Non lu
        </Badge>
      );
    case "in_progress":
      return (
        <Badge
          variant="secondary"
          className="text-[10px] px-1.5 py-0 h-4 rounded-full"
        >
          En cours
        </Badge>
      );
    default:
      return (
        <Badge
          variant="outline"
          className="text-[10px] px-1.5 py-0 h-4 rounded-full"
        >
          Traite
        </Badge>
      );
  }
}

interface MessageListProps {
  messages: (InboxMessage & { lead?: Lead })[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function MessageList({
  messages,
  selectedId,
  onSelect,
}: MessageListProps) {
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
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Rechercher un message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 text-sm"
        />
      </div>

      {/* Messages */}
      <div className="space-y-1">
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            Aucun resultat
          </p>
        )}
        {filtered.map((msg) => {
          const isSelected = selectedId === msg.id;
          const isUnread = msg.status === "unread";
          const timeAgo = formatDistanceToNow(new Date(msg.created_at), {
            addSuffix: true,
            locale: fr,
          });
          const channelConfig = getChannelConfig(msg.channel);

          return (
            <button
              key={msg.id}
              onClick={() => onSelect(msg.id)}
              className={cn(
                "w-full text-left rounded-xl border transition-colors min-h-[80px]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                isSelected
                  ? "bg-primary/5 border-primary/25 ring-1 ring-primary/15"
                  : isUnread
                  ? "bg-accent/40 border-border hover:bg-accent/60"
                  : "border-transparent hover:bg-accent/30"
              )}
            >
              {/* Channel-colored left border accent */}
              <div className="flex">
                <div
                  className={cn(
                    "w-1 rounded-l-xl shrink-0 self-stretch",
                    channelConfig.bgClass
                  )}
                  style={{}}
                />
                <div className="flex-1 p-3">
                  <div className="flex items-start gap-2.5">
                    {/* Unread indicator */}
                    <div className="mt-1.5 shrink-0 w-2">
                      {isUnread && (
                        <span className="block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      )}
                    </div>

                    {/* Channel icon badge */}
                    <div
                      className={cn(
                        "mt-0.5 shrink-0 rounded-lg p-1.5 border relative",
                        channelConfig.bgClass,
                        channelConfig.textClass,
                        channelConfig.borderClass
                      )}
                    >
                      {channelConfig.icon}
                      {/* Direction arrow */}
                      {msg.direction === "outbound" ? (
                        <ArrowUpRight className="h-2.5 w-2.5 absolute -bottom-1 -right-1 text-blue-500 bg-background rounded-full" />
                      ) : (
                        <ArrowDownLeft className="h-2.5 w-2.5 absolute -bottom-1 -right-1 text-emerald-500 bg-background rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Subject */}
                      <p
                        className={cn(
                          "text-sm leading-snug truncate",
                          isUnread ? "font-semibold" : "font-medium"
                        )}
                      >
                        {msg.subject ?? "(sans objet)"}
                      </p>

                      {/* Lead name + company */}
                      {msg.lead && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {msg.lead.first_name} {msg.lead.last_name}
                          {msg.lead.company && (
                            <span className="opacity-70">
                              {" "}
                              &middot; {msg.lead.company}
                            </span>
                          )}
                        </p>
                      )}

                      {/* Content preview */}
                      <p className="text-xs text-muted-foreground/80 truncate mt-0.5 leading-relaxed">
                        {msg.content.split("\n")[0]}
                      </p>
                    </div>

                    {/* Time + status — stacked on the right */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0 ml-1">
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                        {timeAgo}
                      </span>
                      {getStatusBadge(msg.status)}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
