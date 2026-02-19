"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Kanban,
  Inbox,
  Users,
  Settings,
  LogOut,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { inboxMessages } from "@/components/inbox/mock-data";

const unreadCount = inboxMessages.filter((m) => m.status === "unread").length;

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pipelines", href: "/pipelines", icon: Kanban },
  { name: "Inbox", href: "/inbox", icon: Inbox, badge: unreadCount || undefined },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Parametres", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-50 bg-[oklch(0.18_0.04_260)] overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.22_0.05_260)] via-[oklch(0.18_0.04_260)] to-[oklch(0.14_0.03_260)] pointer-events-none" />
      {/* Faint glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[oklch(0.55_0.2_260_/_0.1)] rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center h-16 px-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[oklch(0.55_0.2_260)] to-[oklch(0.5_0.18_220)] flex items-center justify-center shadow-lg shadow-[oklch(0.55_0.2_260_/_0.3)]">
              <Zap className="h-4.5 w-4.5 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[15px] text-white/95 tracking-tight leading-tight">
                CheckEasy
              </span>
              <span className="text-[10px] font-medium text-white/40 uppercase tracking-widest">
                CRM
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
            Menu
          </p>
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200",
                  isActive
                    ? "bg-white/[0.1] text-white sidebar-glow"
                    : "text-white/55 hover:text-white/90 hover:bg-white/[0.06]"
                )}
              >
                {/* Active left indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[oklch(0.6_0.2_260)]" />
                )}
                <item.icon
                  className={cn(
                    "h-[18px] w-[18px] shrink-0 transition-colors duration-200",
                    isActive
                      ? "text-[oklch(0.7_0.15_260)]"
                      : "text-white/40 group-hover:text-white/70"
                  )}
                />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <Badge
                    className={cn(
                      "h-5 min-w-5 flex items-center justify-center text-[10px] border-0",
                      isActive
                        ? "bg-[oklch(0.55_0.2_260)] text-white"
                        : "bg-white/10 text-white/70"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade CTA */}
        <div className="px-3 pb-3">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[oklch(0.45_0.18_260)] to-[oklch(0.4_0.16_280)] p-4">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[oklch(0.6_0.2_260_/_0.2)] rounded-full blur-xl pointer-events-none -translate-y-4 translate-x-4" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-[oklch(0.85_0.12_85)]" />
                <span className="text-xs font-bold text-white/95 uppercase tracking-wider">Pro</span>
              </div>
              <p className="text-[11px] text-white/60 mb-3 leading-relaxed">
                Debloquez les automatisations et rapports avances.
              </p>
              <button className="w-full py-2 rounded-lg bg-white/15 hover:bg-white/20 text-xs font-semibold text-white transition-all duration-200 backdrop-blur-sm">
                Passer a Pro
              </button>
            </div>
          </div>
        </div>

        {/* User section */}
        <div className="p-3 border-t border-white/[0.08]">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/[0.05] transition-colors duration-200 cursor-pointer">
            <div className="relative">
              <Avatar className="h-8 w-8 ring-2 ring-white/10">
                <AvatarFallback className="bg-gradient-to-br from-[oklch(0.55_0.2_260)] to-[oklch(0.5_0.18_220)] text-white text-xs font-bold">
                  JD
                </AvatarFallback>
              </Avatar>
              {/* Online status dot */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[oklch(0.72_0.19_155)] border-2 border-[oklch(0.18_0.04_260)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-white/90 truncate">Jean Dupont</p>
              <p className="text-[11px] text-white/40 truncate">
                Commercial SaaS
              </p>
            </div>
            <button
              className="text-white/30 hover:text-white/60 transition-colors duration-200"
              aria-label="Se deconnecter"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
