"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/pipelines": "Pipelines",
  "/inbox": "Inbox",
  "/leads": "Leads",
  "/settings": "Parametres",
};

export function Header() {
  const pathname = usePathname();
  const title = Object.entries(pageTitles).find(([path]) =>
    pathname.startsWith(path)
  )?.[1] ?? "CRM CheckEasy";

  return (
    <header className="sticky top-0 z-40 h-16 bg-background/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-4 md:px-6">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center text-[10px] p-0">
            2
          </Badge>
        </Button>
      </div>
    </header>
  );
}
