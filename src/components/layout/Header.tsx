"use client";

import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  ChevronRight,
  Command,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const pageTitles: Record<string, { title: string; parent?: string }> = {
  "/dashboard": { title: "Dashboard" },
  "/pipelines": { title: "Pipelines" },
  "/inbox": { title: "Inbox" },
  "/leads": { title: "Leads" },
  "/settings": { title: "Parametres" },
};

export function Header() {
  const pathname = usePathname();
  const pageInfo = Object.entries(pageTitles).find(([path]) =>
    pathname.startsWith(path)
  )?.[1] ?? { title: "CRM CheckEasy" };

  return (
    <header className="sticky top-0 z-40 h-16 bg-background/70 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 md:px-6">
      {/* Left: Breadcrumb-style title */}
      <div className="flex items-center gap-2 min-w-0">
        <nav className="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
          <span className="hidden sm:inline text-muted-foreground/60 font-medium">
            CheckEasy
          </span>
          <ChevronRight className="hidden sm:inline h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
          <span className="font-semibold text-foreground truncate">
            {pageInfo.title}
          </span>
        </nav>
      </div>

      {/* Center: Search bar (Command+K style) */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <button
          className="w-full flex items-center gap-3 h-9 px-3.5 rounded-lg border border-border/60 bg-muted/40 hover:bg-muted/60 text-muted-foreground transition-all duration-200 group"
          aria-label="Rechercher (Ctrl+K)"
        >
          <Search className="h-4 w-4 shrink-0 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors" />
          <span className="flex-1 text-left text-sm text-muted-foreground/50">
            Rechercher...
          </span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded-md border border-border/60 bg-background/80 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/50">
            <Command className="h-2.5 w-2.5" />
            <span>K</span>
          </kbd>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        {/* Mobile search button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9 text-muted-foreground hover:text-foreground"
          aria-label="Rechercher"
        >
          <Search className="h-4.5 w-4.5" />
        </Button>

        {/* Notification bell */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          <Badge className="absolute -top-0.5 -right-0.5 h-4.5 min-w-4.5 flex items-center justify-center text-[10px] font-bold p-0 bg-[oklch(0.577_0.245_27.325)] text-white border-2 border-background badge-pulse">
            2
          </Badge>
        </Button>

        {/* Separator */}
        <div className="hidden sm:block w-px h-6 bg-border/60 mx-1.5" />

        {/* User avatar button */}
        <button
          className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-muted/60 transition-colors duration-200"
          aria-label="Menu utilisateur"
        >
          <Avatar className="h-8 w-8 ring-2 ring-border/50">
            <AvatarFallback className="bg-gradient-to-br from-[oklch(0.5_0.2_260)] to-[oklch(0.55_0.18_220)] text-white text-xs font-bold">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="hidden lg:flex flex-col items-start">
            <span className="text-xs font-semibold text-foreground leading-tight">Jean Dupont</span>
            <span className="text-[10px] text-muted-foreground leading-tight">Commercial</span>
          </div>
        </button>
      </div>

      {/* Subtle bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.5_0.2_260_/_0.15)] to-transparent" />
    </header>
  );
}
