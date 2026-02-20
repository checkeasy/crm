"use client";

import { useState, useMemo, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Inbox as InboxIcon } from "lucide-react";
import { MessageList } from "@/components/inbox/MessageList";
import { MessageDetail } from "@/components/inbox/MessageDetail";
import { getMessagesWithLeads, responseTemplates } from "@/components/inbox/mock-data";
import type { MessageStatus } from "@/lib/types/database";
import { cn } from "@/lib/utils";

type FilterType = "all" | "unread" | "in_progress" | "done";

const filterLabels: Record<FilterType, string> = {
  all: "Tous",
  unread: "Non lus",
  in_progress: "En cours",
  done: "Traites",
};

export default function InboxPage() {
  const [messages, setMessages] = useState(getMessagesWithLeads);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  const unreadCount = useMemo(
    () => messages.filter((m) => m.status === "unread").length,
    [messages]
  );

  const filteredMessages = useMemo(() => {
    if (filter === "all") return messages;
    return messages.filter((m) => m.status === filter);
  }, [messages, filter]);

  const selectedMessage = useMemo(
    () => messages.find((m) => m.id === selectedId),
    [messages, selectedId]
  );

  const handleStatusChange = useCallback(
    (messageId: string, status: MessageStatus) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, status } : m))
      );
    },
    []
  );

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    // Auto-mark as in_progress when opened
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id && m.status === "unread"
          ? { ...m, status: "in_progress" as MessageStatus }
          : m
      )
    );
  }, []);

  const handleBack = useCallback(() => {
    setSelectedId(null);
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">
            Inbox
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Messages entrants centralises.
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="default" className="text-sm shrink-0">
            {unreadCount} non lu{unreadCount > 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {(Object.keys(filterLabels) as FilterType[]).map((f) => {
          const count =
            f === "all"
              ? messages.length
              : messages.filter((m) => m.status === f).length;
          return (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className="min-h-[36px] gap-1.5"
            >
              {filterLabels[f]}
              <span
                className={cn(
                  "inline-flex items-center justify-center text-[10px] font-medium rounded-full w-4 h-4",
                  filter === f
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {count}
              </span>
            </Button>
          );
        })}
      </div>

      {/*
        Two-column layout:
        - Mobile: show list OR detail (single column, toggled by selectedId)
        - Desktop (md+): side-by-side, list fixed width + detail fills remaining space
      */}
      <div className="flex gap-4 flex-1 min-h-0" style={{ minHeight: "calc(100vh - 240px)" }}>
        {/* LEFT — Message list */}
        <div
          className={cn(
            "flex flex-col w-full md:w-[360px] md:shrink-0",
            "border border-border rounded-xl overflow-hidden",
            // On mobile, hide list when a message is selected
            selectedId ? "hidden md:flex" : "flex"
          )}
        >
          <div className="flex-1 overflow-y-auto p-2">
            {filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
                <InboxIcon className="h-10 w-10 opacity-30" />
                <div className="text-center">
                  <p className="text-sm font-medium">Aucun message</p>
                  <p className="text-xs mt-1 opacity-70">
                    Changez le filtre pour voir plus de messages
                  </p>
                </div>
              </div>
            ) : (
              <MessageList
                messages={filteredMessages}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            )}
          </div>
        </div>

        {/* RIGHT — Message detail */}
        <div
          className={cn(
            "flex flex-col flex-1 border border-border rounded-xl overflow-hidden",
            // On mobile, hide detail when nothing is selected
            !selectedId ? "hidden md:flex" : "flex"
          )}
        >
          {selectedMessage ? (
            <div className="flex-1 overflow-y-auto p-4">
              <MessageDetail
                message={selectedMessage}
                templates={responseTemplates}
                allMessages={messages}
                onStatusChange={handleStatusChange}
                onBack={handleBack}
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
              <InboxIcon className="h-12 w-12 mb-3 opacity-20" />
              <p className="text-sm font-medium">Selectionnez un message</p>
              <p className="text-xs mt-1.5 max-w-[240px] leading-relaxed opacity-70">
                Choisissez un message dans la liste pour voir les details et repondre
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
