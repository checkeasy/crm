"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { channelMetrics } from "@/lib/mock-data";
import {
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Globe,
  Linkedin,
  Phone,
  FileText,
  Handshake,
  CalendarDays,
  Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

function formatEur(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function getChannelIcon(source: string): LucideIcon {
  if (source.includes("linkedin")) return Linkedin;
  if (source.includes("phone")) return Phone;
  if (source.includes("form") || source.includes("contact")) return FileText;
  if (source.includes("referral")) return Handshake;
  if (source.includes("partner")) return Users;
  if (source.includes("event")) return CalendarDays;
  if (source.includes("website")) return Globe;
  return Mail;
}

function getPerformanceColor(convRate: number): { bg: string; text: string; bar: string } {
  if (convRate >= 30)
    return {
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      text: "text-emerald-700 dark:text-emerald-400",
      bar: "bg-emerald-500",
    };
  if (convRate >= 15)
    return {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-700 dark:text-blue-400",
      bar: "bg-blue-500",
    };
  if (convRate >= 8)
    return {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      text: "text-amber-700 dark:text-amber-400",
      bar: "bg-amber-500",
    };
  return {
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-700 dark:text-red-400",
    bar: "bg-red-500",
  };
}

export function ChannelMetricsCards() {
  const maxLeads = Math.max(...channelMetrics.map((m) => m.leads));
  const maxRevenue = Math.max(...channelMetrics.map((m) => m.revenue));

  // Sort by revenue desc for better visual hierarchy
  const sorted = [...channelMetrics].sort((a, b) => b.revenue - a.revenue);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Performance par canal</CardTitle>
            <CardDescription className="mt-1">
              Comparaison des canaux d&apos;acquisition
            </CardDescription>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> &gt;30%
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-500" /> 15-30%
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-500" /> 8-15%
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" /> &lt;8%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((m) => {
            const convRate = m.leads > 0 ? (m.converted / m.leads) * 100 : 0;
            const convRateStr = convRate.toFixed(1);
            const perf = getPerformanceColor(convRate);
            const ChannelIcon = getChannelIcon(m.source);
            const leadsBarWidth = (m.leads / maxLeads) * 100;
            const revenueBarWidth = (m.revenue / maxRevenue) * 100;

            return (
              <div
                key={m.source}
                className="group relative overflow-hidden rounded-xl border border-border p-4 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 hover:border-primary/20"
              >
                {/* Header with icon and name */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${perf.bg} transition-transform duration-300 group-hover:scale-110`}>
                    <ChannelIcon className={`h-4.5 w-4.5 ${perf.text}`} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold truncate">{m.label}</h4>
                    <span className={`text-xs font-medium ${perf.text}`}>
                      {convRateStr}% conversion
                    </span>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs mb-3">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">{m.leads} leads</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">{m.converted} convertis</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">{formatEur(m.revenue)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">{m.avgClosingDays}j closing</span>
                  </div>
                </div>

                {/* Mini comparison bars */}
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-0.5">
                      <span>Leads</span>
                      <span>{m.leads}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${perf.bar} transition-all duration-700`}
                        style={{ width: `${leadsBarWidth}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-0.5">
                      <span>Revenu</span>
                      <span>{formatEur(m.revenue)}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${perf.bar} transition-all duration-700 opacity-60`}
                        style={{ width: `${revenueBarWidth}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
