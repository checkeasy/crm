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

  const handleStatusChange = useCallback((messageId: string, status: MessageStatus) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, status } : m))
    );
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    // Mark as read if unread
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id && m.status === "unread" ? { ...m, status: "in_progress" as MessageStatus } : m
      )
    );
  }, []);

  const handleBack = useCallback(() => {
    setSelectedId(null);
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Inbox</h2>
          <p className="text-muted-foreground text-sm">
            Messages entrants centralises.
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="default" className="text-sm">
            {unreadCount} non lu{unreadCount > 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 flex-wrap">
        {(Object.keys(filterLabels) as FilterType[]).map((f) => {
          const count = f === "all" ? messages.length : messages.filter((m) => m.status === f).length;
          return (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className="h-8"
            >
              {filterLabels[f]}
              <span className="ml-1.5 text-[10px] opacity-70">{count}</span>
            </Button>
          );
        })}
      </div>

      {/* Two column layout */}
      <div className="flex gap-4 min-h-[calc(100vh-220px)]">
        {/* Left: Message list */}
        <div
          className={cn(
            "w-full md:w-[380px] md:shrink-0 border border-border rounded-lg overflow-y-auto p-2",
            selectedId && "hidden md:block"
          )}
        >
          {filteredMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <InboxIcon className="h-10 w-10 mb-3 opacity-50" />
              <p className="text-sm">Aucun message</p>
            </div>
          ) : (
            <MessageList
              messages={filteredMessages}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          )}
        </div>

        {/* Right: Message detail */}
        <div
          className={cn(
            "flex-1 border border-border rounded-lg p-4 overflow-y-auto",
            !selectedId && "hidden md:flex md:items-center md:justify-center"
          )}
        >
          {selectedMessage ? (
            <MessageDetail
              message={selectedMessage}
              templates={responseTemplates}
              allMessages={messages}
              onStatusChange={handleStatusChange}
              onBack={handleBack}
            />
          ) : (
            <div className="text-center text-muted-foreground">
              <InboxIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Selectionnez un message</p>
              <p className="text-xs mt-1">Choisissez un message dans la liste pour voir les details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
