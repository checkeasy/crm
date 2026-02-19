"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Plus, Inbox, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockLeads, mockInboxMessages } from "@/lib/mock-data";

export function WelcomeBanner() {
  const today = new Date();
  const formattedDate = format(today, "EEEE d MMMM yyyy", { locale: fr });

  const unreadCount = mockInboxMessages.filter((m) => m.status === "unread").length;
  const activeLeads = mockLeads.filter((l) => l.status === "active").length;

  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/10 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent p-6 md:p-8">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/5" />
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-primary/3" />
      <div className="pointer-events-none absolute left-1/2 -top-6 h-24 w-24 rounded-full bg-primary/3" />

      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left: Greeting */}
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Bonjour Jean{" "}
            <span className="inline-block animate-[wave_2.5s_ease-in-out_infinite] origin-[70%_70%]" role="img" aria-label="wave">
              👋
            </span>
          </h1>
          <p className="text-sm capitalize text-muted-foreground">
            {formattedDate}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
            {unreadCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                <Bell className="h-3 w-3" />
                {unreadCount} message{unreadCount > 1 ? "s" : ""} non lu{unreadCount > 1 ? "s" : ""}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {activeLeads} lead{activeLeads > 1 ? "s" : ""} actif{activeLeads > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-2">
          <Button size="sm" asChild>
            <a href="/leads?action=new">
              <Plus className="h-4 w-4" />
              Nouveau lead
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="/inbox">
              <Inbox className="h-4 w-4" />
              Voir inbox
              {unreadCount > 0 && (
                <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
