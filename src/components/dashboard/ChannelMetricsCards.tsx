"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { channelMetrics } from "@/lib/mock-data";
import { TrendingUp, Users, Clock, DollarSign } from "lucide-react";

function formatEur(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

export function ChannelMetricsCards() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Performance par canal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {channelMetrics.map((m) => {
            const convRate = m.leads > 0 ? ((m.converted / m.leads) * 100).toFixed(1) : "0";
            return (
              <div
                key={m.source}
                className="rounded-lg border border-border p-4 space-y-3"
              >
                <div className="font-medium text-sm">{m.label}</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    <span>{m.leads} leads</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>{convRate}% conv.</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <DollarSign className="h-3.5 w-3.5" />
                    <span>{formatEur(m.revenue)} MRR</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{m.avgClosingDays}j closing</span>
                  </div>
                </div>
                {/* Mini progress bar for conversion */}
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-primary transition-all"
                    style={{ width: `${Math.min(parseFloat(convRate), 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
